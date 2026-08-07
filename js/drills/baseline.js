/* ============================================================
   baseline.js — READING PEOPLE

   Every item is the same shape on purpose: here is a person's
   normal, here is a moment, what actually changed. The wrong
   answers are the popular ones.
   ============================================================ */

import { h, ICONS } from '../ui.js';
import { BASELINES } from '../data/people.js';
import { pickUnseen } from '../store.js';
import { baselineItem } from '../content.js';
import { hud, choices, reveal, nextBtn, dossier, dossierSection } from './shared.js';
import { t, tips } from '../i18n.js';

const perRunFor = (level) => (level >= 5 ? 5 : 4);

export default {
  id: 'baseline',
  name: 'Baseline',
  discipline: 'people',
  icon: ICONS.face,
  blurb: 'Learn the normal. Then read the departure from it.',
  length: '4 min',

  mount(root, ctx) {
    const items = pickUnseen('baselines', BASELINES, perRunFor(ctx.level)).map(baselineItem);
    const bar = hud(items.length);
    let right = 0;
    let cancelled = false;

    intro();

    function intro() {
      root.replaceChildren(
        h('div.fade-in.stack',
          h('div.panel',
            h('div.label', t('baseline.head')),
            h('h2', { style: { margin: '8px 0 10px' } }, t('baseline.count', { lvl: ctx.level, n: items.length })),
            h('p.prose', t('baseline.intro')),
            h('div.reveal.reveal--myth',
              h('div.reveal__title', t('baseline.groundRule')),
              h('div', t('baseline.rule')),
            ),
          ),
          nextBtn(t('drill.begin'), () => ask(0)),
        ),
      );
    }

    function ask(i) {
      if (cancelled) return;
      if (i >= items.length) return done();

      const it = items[i];
      bar.set(i);
      const holder = h('div');

      const file = dossier({
        kind: t('doc.subjectFile'),
        no: t('doc.no', { n: i + 1, of: items.length }),
        stamp: t('doc.onFile'),
        extra: [
          ...dossierSection(t('doc.baselineSec'), it.baseline),
          ...dossierSection(t('doc.momentSec'), it.moment),
        ],
      });

      root.replaceChildren(
        h('div.fade-in.stack',
          bar.el,
          file.el,
          h('div.panel', h('h3', it.question)),
          holder,
        ),
      );

      holder.appendChild(choices(it.options, (correct) => {
        if (correct) right += 1;
        bar.set(i + 1);
        holder.appendChild(reveal(t('baseline.reading'), it.explain));
        if (it.myth) holder.appendChild(reveal(t('baseline.mythTitle'), it.myth, 'reveal--myth'));
        holder.appendChild(nextBtn(i === items.length - 1 ? t('drill.seeResults') : t('drill.next'), () => ask(i + 1)));
      }));
    }

    function done() {
      ctx.finish({
        pct: right / items.length,
        stats: [
          { k: t('stat.correct'), v: `${right}/${items.length}` },
          { k: t('stat.pool'), v: BASELINES.length },
          { k: t('stat.rule'), v: 'B·C·T' },
        ],
        note: tips('baseline')[0],
      });
    }

    return () => { cancelled = true; };
  },
};
