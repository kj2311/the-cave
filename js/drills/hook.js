/* ============================================================
   hook.js — INFLUENCE

   Cold reading mechanics, taught from the defensive side: spot
   the device, name it, and it stops working on you.
   ============================================================ */

import { h, ICONS } from '../ui.js';
import { COLDREADS, TECHNIQUES } from '../data/people.js';
import { pickUnseen } from '../store.js';
import { coldReadItem, technique } from '../content.js';
import { hud, choices, reveal, nextBtn, dossier } from './shared.js';
import { t, tips } from '../i18n.js';

const perRunFor = (level) => (level >= 5 ? 5 : 4);

export default {
  id: 'hook',
  name: 'The Hook',
  discipline: 'influence',
  icon: ICONS.hook,
  blurb: 'Take apart the tricks that work on everyone, including you.',
  length: '4 min',

  mount(root, ctx) {
    const items = pickUnseen('coldreads', COLDREADS, perRunFor(ctx.level)).map(coldReadItem);
    const bar = hud(items.length);
    let right = 0;
    let cancelled = false;

    intro();

    function intro() {
      root.replaceChildren(
        h('div.fade-in.stack',
          h('div.panel',
            h('div.label', t('hook.head')),
            h('h2', { style: { margin: '8px 0 10px' } }, t('hook.count', { lvl: ctx.level, n: items.length })),
            h('p.prose', t('hook.intro')),
            h('div.reveal',
              h('div.reveal__title', t('hook.test')),
              h('div', t('hook.testText')),
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
      const tech = technique(it.tech, TECHNIQUES[it.tech]);
      bar.set(i);
      const holder = h('div');

      const file = dossier({
        kind: t('doc.subjectFile'),
        no: t('doc.no', { n: i + 1, of: items.length }),
        stamp: t('doc.onFile'),
        lede: it.subject,
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
        if (tech) holder.appendChild(reveal(tech.name, tech.note));
        holder.appendChild(reveal(t('hook.why'), it.explain));
        holder.appendChild(nextBtn(i === items.length - 1 ? t('drill.seeResults') : t('drill.next'), () => ask(i + 1)));
      }));
    }

    function done() {
      ctx.finish({
        pct: right / items.length,
        stats: [
          { k: t('stat.correct'), v: `${right}/${items.length}` },
          { k: t('stat.devices'), v: Object.keys(TECHNIQUES).length },
          { k: t('stat.pool'), v: COLDREADS.length },
        ],
        note: tips('hook')[0],
      });
    }

    return () => { cancelled = true; };
  },
};
