/* ============================================================
   baseline.js — READING PEOPLE

   Every item is the same shape on purpose: here is a person's
   normal, here is a moment, what actually changed. The wrong
   answers are the popular ones.
   ============================================================ */

import { h, ICONS } from '../ui.js';
import { BASELINES } from '../data/people.js';
import { pickUnseen } from '../store.js';
import { hud, choices, reveal, nextBtn } from './_shared.js';

const perRunFor = (level) => (level >= 5 ? 5 : 4);

export default {
  id: 'baseline',
  name: 'Baseline',
  discipline: 'people',
  icon: ICONS.face,
  blurb: 'Learn the normal. Then read the departure from it.',
  length: '4 min',

  mount(root, ctx) {
    const items = pickUnseen('baselines', BASELINES, perRunFor(ctx.level));
    const bar = hud(items.length);
    let right = 0;
    let cancelled = false;

    intro();

    function intro() {
      root.replaceChildren(
        h('div.fade-in.stack',
          h('div.panel',
            h('div.label', 'Reading · Baseline'),
            h('h2', { style: { margin: '8px 0 10px' } }, `Level ${ctx.level} — ${items.length} observations`),
            h('p.prose', 'You get a person\'s established normal, then a single moment. Identify what genuinely departed from the baseline.'),
            h('div.reveal.reveal--myth',
              h('div.reveal__title', 'Ground rule'),
              h('div', 'No behaviour means "lying". Several answers in this drill are the popular reading, and they are wrong. Deviation locates a topic; it never delivers a verdict.'),
            ),
          ),
          nextBtn('Begin', () => ask(0)),
        ),
      );
    }

    function ask(i) {
      if (cancelled) return;
      if (i >= items.length) return done();

      const it = items[i];
      bar.set(i);
      const holder = h('div');

      root.replaceChildren(
        h('div.fade-in.stack',
          bar.el,
          h('div.panel',
            h('div.label', 'Baseline'),
            h('p.case-scene', { style: { marginTop: '9px' } }, it.baseline),
          ),
          h('div.panel',
            h('div.label', { style: { color: 'var(--silver-hi)' } }, 'The moment'),
            h('p.case-scene', { style: { marginTop: '9px' } }, it.moment),
          ),
          h('div.panel', h('h3', it.question)),
          holder,
        ),
      );

      holder.appendChild(choices(it.options, (correct) => {
        if (correct) right += 1;
        bar.set(i + 1);
        holder.appendChild(reveal('Reading', it.explain));
        if (it.myth) holder.appendChild(reveal('The popular version is wrong', it.myth, 'reveal--myth'));
        holder.appendChild(nextBtn(i === items.length - 1 ? 'See results' : 'Next', () => ask(i + 1)));
      }));
    }

    function done() {
      ctx.finish({
        pct: right / items.length,
        stats: [
          { k: 'Correct', v: `${right}/${items.length}` },
          { k: 'Pool', v: BASELINES.length },
          { k: 'Rule', v: 'B·C·T' },
        ],
        note: 'Baseline, cluster, timing. A signal has to clear all three before it is worth anything.',
      });
    }

    return () => { cancelled = true; };
  },
};
