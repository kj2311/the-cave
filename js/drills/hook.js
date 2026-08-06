/* ============================================================
   hook.js — INFLUENCE

   Cold reading mechanics, taught from the defensive side: spot
   the device, name it, and it stops working on you.
   ============================================================ */

import { h, ICONS } from '../ui.js';
import { COLDREADS, TECHNIQUES } from '../data/people.js';
import { pickUnseen } from '../store.js';
import { hud, choices, reveal, nextBtn } from './shared.js';

const perRunFor = (level) => (level >= 5 ? 5 : 4);

export default {
  id: 'hook',
  name: 'The Hook',
  discipline: 'influence',
  icon: ICONS.hook,
  blurb: 'Take apart the tricks that work on everyone, including you.',
  length: '4 min',

  mount(root, ctx) {
    const items = pickUnseen('coldreads', COLDREADS, perRunFor(ctx.level));
    const bar = hud(items.length);
    let right = 0;
    let cancelled = false;

    intro();

    function intro() {
      root.replaceChildren(
        h('div.fade-in.stack',
          h('div.panel',
            h('div.label', 'Influence · The Hook'),
            h('h2', { style: { margin: '8px 0 10px' } }, `Level ${ctx.level} — ${items.length} devices`),
            h('p.prose', 'These are the mechanics behind psychics, fraudsters and bad-faith persuasion. They are taught here so that they can never be run on you unnoticed.'),
            h('div.reveal',
              h('div.reveal__title', 'The test that matters'),
              h('div', 'Could that statement have been visibly wrong? If not, no information passed — no matter how accurate it felt.'),
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
      const tech = TECHNIQUES[it.tech];
      bar.set(i);
      const holder = h('div');

      root.replaceChildren(
        h('div.fade-in.stack',
          bar.el,
          h('div.panel',
            h('div.label', 'Subject'),
            h('p.case-scene', { style: { marginTop: '9px' } }, it.subject),
          ),
          h('div.panel', h('h3', it.question)),
          holder,
        ),
      );

      holder.appendChild(choices(it.options, (correct) => {
        if (correct) right += 1;
        bar.set(i + 1);
        if (tech) holder.appendChild(reveal(tech.name, tech.note));
        holder.appendChild(reveal('Why it works', it.explain));
        holder.appendChild(nextBtn(i === items.length - 1 ? 'See results' : 'Next', () => ask(i + 1)));
      }));
    }

    function done() {
      ctx.finish({
        pct: right / items.length,
        stats: [
          { k: 'Correct', v: `${right}/${items.length}` },
          { k: 'Devices', v: Object.keys(TECHNIQUES).length },
          { k: 'Pool', v: COLDREADS.length },
        ],
        note: 'Would this still be acceptable to them if they could see exactly what you were doing? That is the whole ethics of it.',
      });
    }

    return () => { cancelled = true; };
  },
};
