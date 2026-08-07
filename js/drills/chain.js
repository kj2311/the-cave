/* ============================================================
   chain.js — DEDUCTION

   Two questions per case. First the conclusion, then the part
   most people skip: which single observation actually carried
   it. Getting the right answer for the wrong reason scores half.
   ============================================================ */

import { h, ICONS, buzz } from '../ui.js';
import { CASES } from '../data/cases.js';
import { pickUnseen } from '../store.js';
import { caseFile } from '../content.js';
import { hud, choices, reveal, nextBtn, dossier } from './shared.js';
import { t, tips } from '../i18n.js';

/** More case files per sitting as the level climbs. */
const perRunFor = (level) => (level >= 7 ? 5 : level >= 4 ? 4 : 3);

export default {
  id: 'chain',
  name: 'The Chain',
  discipline: 'deduction',
  icon: ICONS.chain,
  blurb: 'Read the scene. Reach only as far as the evidence goes.',
  length: '5 min',

  mount(root, ctx) {
    const cases = pickUnseen('cases', CASES, perRunFor(ctx.level)).map(caseFile);
    const bar = hud(cases.length * 2);
    let step = 0;
    const score = { got: 0, of: cases.length * 2 };
    let cancelled = false;

    intro();

    function intro() {
      root.replaceChildren(
        h('div.fade-in.stack',
          h('div.panel',
            h('div.label', t('chain.head')),
            h('h2', { style: { margin: '8px 0 10px' } }, t('chain.files', { lvl: ctx.level, n: cases.length })),
            h('p.prose', t('chain.intro')),
            h('p.prose', t('chain.intro2')),
          ),
          nextBtn(t('chain.open'), () => runCase(0)),
        ),
      );
    }

    function runCase(i) {
      if (cancelled) return;
      if (i >= cases.length) return done();

      const c = cases[i];
      bar.set(step);

      const file = dossier({
        kind: t('doc.caseFile'),
        no: t('doc.no', { n: i + 1, of: cases.length }),
        stamp: t('doc.open'),
        title: c.title,
        lede: c.scene,
        factsLabel: t('doc.observations'),
        facts: c.facts,
      });

      const holder = h('div');

      root.replaceChildren(
        h('div.fade-in.stack',
          bar.el,
          file.el,
          h('div.panel', h('h3', c.question)),
          holder,
        ),
      );

      holder.appendChild(choices(c.options, (correct) => {
        if (correct) score.got += 1;
        step += 1;
        bar.set(step);
        holder.appendChild(nextBtn(t('chain.whichCarried'), () => askKey(i)));
      }));
    }

    function askKey(i) {
      if (cancelled) return;
      const c = cases[i];
      const holder = h('div');

      const file = dossier({
        kind: t('doc.caseFile'),
        no: t('doc.no', { n: i + 1, of: cases.length }),
        stamp: t('doc.open'),
        title: c.title,
        factsLabel: t('doc.observations'),
        facts: c.facts,
        onPickFact: (idx) => choose(idx),
      });

      root.replaceChildren(
        h('div.fade-in.stack',
          bar.el,
          h('div.panel',
            h('h3', t('chain.decisive')),
            h('p.prose', { style: { fontSize: '13.5px', marginTop: '6px' } }, t('chain.decisiveSub')),
          ),
          file.el,
          holder,
        ),
      );

      function choose(idx) {
        const items = file.factEls;
        items.forEach(li => { li.classList.remove('is-pickable'); li.onclick = null; });

        const right = idx === c.key;
        buzz(right ? 14 : [10, 40, 10]);
        if (right) score.got += 1;

        // The wrong pick gets ruled out in pen; the decisive one gets the
        // highlighter, which is the whole gesture this drill is teaching.
        if (!right) items[idx].classList.add('is-struck');
        items[c.key].classList.add('is-key');
        file.el.appendChild(h('div.dossier__note', t('doc.decisive')));

        step += 1;
        bar.set(step);

        holder.replaceChildren(
          reveal(right ? t('chain.correct', { n: c.key + 1 }) : t('chain.wasObs', { n: c.key + 1 }), c.explain),
          reveal(t('chain.principle'), c.principle),
          nextBtn(i === cases.length - 1 ? t('drill.seeResults') : t('chain.nextCase'), () => runCase(i + 1)),
        );
      }
    }

    function done() {
      ctx.finish({
        pct: score.got / score.of,
        stats: [
          { k: t('stat.score'), v: `${score.got}/${score.of}` },
          { k: t('stat.cases'), v: cases.length },
          { k: t('stat.remaining'), v: Math.max(0, CASES.length - cases.length) },
        ],
        note: tips('chain')[0],
      });
    }

    return () => { cancelled = true; };
  },
};
