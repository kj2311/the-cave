/* ============================================================
   stillness.js — COMPOSURE

   Stroop interference with rule switching. Trains the thing
   that holds "I do not know yet" against the pull of an
   automatic answer — and unlike most of this app, it produces
   a hard number you can watch move.
   ============================================================ */

import { h, ICONS, rand, pick } from '../ui.js';
import { hud, nextBtn, countdown } from './_shared.js';

const INKS = [
  { n: 'RED',   v: '#ff5f5f' },
  { n: 'GREEN', v: '#56d98a' },
  { n: 'CYAN',  v: '#45d6e8' },
  { n: 'AMBER', v: '#f5a623' },
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
      let rule = 'INK';
      let until = canSwitch ? 5 + rand(3) : n + 1;
      for (let i = 0; i < n; i++) {
        if (i === until) {
          rule = rule === 'INK' ? 'WORD' : 'INK';
          until = i + 5 + rand(3);
        }
        const congruent = Math.random() < 0.3;
        const word = INKS[rand(INKS.length)];
        const ink = congruent ? word : pick(INKS.filter(c => c.n !== word.n));
        out.push({ word, ink, rule, congruent });
      }
      return out;
    }

    function intro() {
      root.replaceChildren(
        h('div.fade-in.stack',
          h('div.panel',
            h('div.label', 'Composure · Stillness'),
            h('h2', { style: { margin: '8px 0 10px' } }, `Level ${level} — ${trials} trials`),
            h('p.prose', 'A colour word appears, printed in a colour. Under the rule ', h('b', { style: { color: 'var(--amber)' } }, 'INK'), ', tap the colour it is printed in — ignore what it says.'),
            switching
              ? h('p.prose', 'From this level the rule switches without warning to ', h('b', { style: { color: 'var(--cyan)' } }, 'WORD'), ', where you tap what it says and ignore the ink. Watch the banner.')
              : h('p.prose', 'The rule stays on INK for the whole run at this level.'),
            h('p.prose.faint', { style: { fontSize: '13.5px' } }, `${(LIMIT_MS / 1000).toFixed(1)} seconds per trial. A miss counts the same as a wrong answer.`),
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

      const banner = h('div.chip',
        { style: changed
            ? { color: 'var(--amber)', borderColor: 'var(--amber)', background: 'var(--amber-ghost)' }
            : null },
        changed ? 'RULE CHANGED → ' + t.rule : 'RULE · ' + t.rule);

      const stage = h('div.stage',
        h('div.stroop', { style: { color: t.ink.v } }, t.word.n));

      const correctName = t.rule === 'INK' ? t.ink.n : t.word.n;
      const shown = Date.now();
      let answered = false;

      const swatches = h('div.swatches', ...INKS.map(c => {
        const b = h('button.swatch', { type: 'button' },
          h('span.swatch__dot', { style: { background: c.v } }), c.n);
        b.addEventListener('click', () => answer(c.n));
        return b;
      }));

      root.replaceChildren(
        h('div.stack',
          bar.el,
          h('div.row', banner, h('div.grow'), h('div.timer', `${i + 1}/${seq.length}`)),
          stage,
          swatches,
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

        stage.style.borderColor = ok ? 'var(--green)' : 'var(--red)';
        setTimeout(() => trial(i + 1), 190);
      }
    }

    function done() {
      const hits = results.filter(r => r.ok);
      const rts = hits.map(r => r.rt).sort((a, b) => a - b);
      const median = rts.length ? rts[Math.floor(rts.length / 2)] : 0;

      // Interference cost: how much slower the incongruent trials ran.
      const con = hits.filter(r => r.congruent).map(r => r.rt);
      const inc = hits.filter(r => !r.congruent).map(r => r.rt);
      const avg = a => a.length ? Math.round(a.reduce((x, y) => x + y, 0) / a.length) : 0;
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
