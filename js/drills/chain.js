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
import { hud, choices, reveal, nextBtn } from './shared.js';
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

      const factList = h('ol.facts', ...c.facts.map(f => h('li', f)));
      const holder = h('div');

      root.replaceChildren(
        h('div.fade-in.stack',
          bar.el,
          h('div.panel',
            h('div.label', t('chain.case', { n: i + 1, title: c.title })),
            h('p.case-scene', { style: { marginTop: '10px' } }, c.scene),
            factList,
          ),
          h('div.panel', h('h3', c.question)),
          holder,
        ),
      );

      holder.appendChild(choices(c.options, (correct) => {
        if (correct) score.got += 1;
        step += 1;
        bar.set(step);
        holder.appendChild(nextBtn(t('chain.whichCarried'), () => askKey(i, factList)));
      }));
    }

    function askKey(i, factList) {
      if (cancelled) return;
      const c = cases[i];
      const holder = h('div');

      const items = c.facts.map((f, idx) => {
        const li = h('li.is-pickable', f);
        li.addEventListener('click', () => choose(idx));
        return li;
      });
      const list = h('ol.facts', ...items);

      root.replaceChildren(
        h('div.fade-in.stack',
          bar.el,
          h('div.panel',
            h('div.label', t('chain.case', { n: i + 1, title: c.title })),
            h('h3', { style: { margin: '8px 0 4px' } }, t('chain.decisive')),
            h('p.prose', { style: { fontSize: '13.5px' } }, t('chain.decisiveSub')),
            list,
          ),
          holder,
        ),
      );

      function choose(idx) {
        items.forEach(li => { li.classList.remove('is-pickable'); li.onclick = null; });
        items[c.key].classList.add('is-key');
        const right = idx === c.key;
        buzz(right ? 14 : [10, 40, 10]);
        if (right) score.got += 1;
        else { items[idx].style.borderStyle = 'dashed'; items[idx].style.opacity = '.5'; }

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
