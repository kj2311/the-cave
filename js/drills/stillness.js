/* ============================================================
   stillness.js — COMPOSURE

   A word naming a direction is shown together with an arrow
   pointing somewhere else. Depending on the rule in force you
   answer to one and suppress the other, and the rule switches
   without warning.

   This is the same interference the Stroop task measures —
   reading is automatic in a literate adult, so obeying the
   arrow means actively overriding the word — but it needs no
   colour, which this app does not have.
   ============================================================ */

import { h, ICONS, rand, pick } from '../ui.js';
import { hud, nextBtn, countdown } from './_shared.js';

const DIRS = [
  { n: 'LEFT',  rot: 180 },
  { n: 'RIGHT', rot: 0 },
  { n: 'UP',    rot: -90 },
  { n: 'DOWN',  rot: 90 },
];

/** The answer window closes faster as the level climbs. */
const limitFor = (level) => Math.max(1300, 3200 - level * 200);

const TIPS = [
  'Slowing your breathing before a hard question buys you working memory. Four in, six or eight out.',
  'The pause you are afraid of is about a quarter as long from the outside as it feels from the inside.',
  'Putting a feeling into words measurably reduces its intensity. Naming it beats trying to suppress it.',
  'Suppressing the obvious answer is the same muscle whether the pull is a word, a hunch, or a satisfying conclusion.',
  'Speed without accuracy is not composure. Get it right, then get it quick.',
];

function arrowSvg(rot) {
  return `<svg viewBox="0 0 100 100" style="transform:rotate(${rot}deg)">
    <path d="M14 50 H74" fill="none" stroke="currentColor" stroke-width="9" stroke-linecap="square"/>
    <path d="M60 28 L86 50 L60 72 Z" fill="currentColor"/>
  </svg>`;
}

export default {
  id: 'stillness',
  name: 'Stillness',
  discipline: 'composure',
  icon: ICONS.still,
  blurb: 'Hold the rule while everything pulls the other way.',
  length: '2 min',

  mount(root, ctx) {
    const level = ctx.level;
    const trials = 20 + level * 3;
    const switching = level >= 3;
    const LIMIT_MS = limitFor(level);

    const seq = buildTrials(trials, switching);
    const bar = hud(trials);
    const results = [];
    let cancelled = false;
    let stopCountdown = null;
    let timeoutId = null;
    let lastRule = null;

    intro();

    function buildTrials(n, canSwitch) {
      const out = [];
      let rule = 'ARROW';
      let until = canSwitch ? 5 + rand(3) : n + 1;
      for (let i = 0; i < n; i++) {
        if (i === until) {
          rule = rule === 'ARROW' ? 'WORD' : 'ARROW';
          until = i + 5 + rand(3);
        }
        const congruent = Math.random() < 0.3;
        const word = DIRS[rand(DIRS.length)];
        const arrow = congruent ? word : pick(DIRS.filter(d => d.n !== word.n));
        out.push({ word, arrow, rule, congruent });
      }
      return out;
    }

    function intro() {
      root.replaceChildren(
        h('div.fade-in.stack',
          h('div.panel',
            h('div.label', 'Composure · Stillness'),
            h('h2', { style: { margin: '10px 0 12px' } }, `Level ${level} — ${trials} trials`),
            h('p.prose', 'A direction word appears above an arrow, and they usually disagree. Under the rule ',
              h('strong', 'ARROW'), ', answer where the arrow points and ignore the word.'),
            switching
              ? h('p.prose', 'From this level the rule switches without warning to ', h('strong', 'WORD'),
                  ', where you answer what the word says and ignore the arrow. Watch the banner.')
              : h('p.prose', 'The rule stays on ARROW for the whole run at this level.'),
            h('p.prose.faint', { style: { fontSize: '14px' } },
              `${(LIMIT_MS / 1000).toFixed(1)} seconds per trial. A miss counts the same as a wrong answer.`),
          ),
          nextBtn('Begin', () => run()),
        ),
      );
    }

    function run() {
      const stage = h('div.stage');
      root.replaceChildren(h('div.fade-in.stack', stage));
      stopCountdown = countdown(stage, 3, () => trial(0));
    }

    function trial(i) {
      if (cancelled) return;
      if (i >= seq.length) return done();

      const t = seq[i];
      bar.set(i);
      const changed = lastRule !== null && lastRule !== t.rule;
      lastRule = t.rule;

      const banner = h(`div.chip${changed ? '.chip--accent' : ''}`,
        changed ? `RULE CHANGED → ${t.rule}` : `RULE · ${t.rule}`);

      const stage = h('div.stage',
        h('div.center',
          h('div.conflict-word', t.word.n),
          h('div.conflict-arrow', { style: { marginTop: '18px' }, html: arrowSvg(t.arrow.rot) }),
        ),
      );

      const correctName = t.rule === 'ARROW' ? t.arrow.n : t.word.n;
      const shown = Date.now();
      let answered = false;

      const pad = h('div.swatches', ...DIRS.map(dir => {
        const b = h('button.swatch', { type: 'button' }, dir.n);
        b.addEventListener('click', () => answer(dir.n));
        return b;
      }));

      root.replaceChildren(
        h('div.stack',
          bar.el,
          h('div.row', banner, h('div.grow'), h('div.timer', `${i + 1}/${seq.length}`)),
          stage,
          pad,
        ),
      );

      timeoutId = setTimeout(() => answer(null), LIMIT_MS);

      function answer(name) {
        if (answered || cancelled) return;
        answered = true;
        clearTimeout(timeoutId);
        const rt = Date.now() - shown;
        const ok = name === correctName;
        results.push({ ok, rt, congruent: t.congruent, timedOut: name === null });

        // Feedback without colour: the frame either brightens or goes dim.
        stage.style.borderColor = ok ? 'var(--silver-hi)' : 'var(--rule)';
        stage.style.opacity = ok ? '1' : '.45';
        setTimeout(() => trial(i + 1), 190);
      }
    }

    function done() {
      const hits = results.filter(r => r.ok);
      const rts = hits.map(r => r.rt).sort((a, b) => a - b);
      const median = rts.length ? rts[Math.floor(rts.length / 2)] : 0;

      const con = hits.filter(r => r.congruent).map(r => r.rt);
      const inc = hits.filter(r => !r.congruent).map(r => r.rt);
      const avg = a => (a.length ? Math.round(a.reduce((x, y) => x + y, 0) / a.length) : 0);
      const cost = con.length && inc.length ? avg(inc) - avg(con) : null;

      ctx.finish({
        pct: hits.length / results.length,
        stats: [
          { k: 'Accuracy', v: `${Math.round((hits.length / results.length) * 100)}%` },
          { k: 'Median', v: `${median}ms` },
          { k: 'Interference', v: cost === null ? '—' : `${cost > 0 ? '+' : ''}${cost}ms` },
        ],
        note: pick(TIPS),
      });
    }

    return () => {
      cancelled = true;
      stopCountdown?.();
      clearTimeout(timeoutId);
    };
  },
};
