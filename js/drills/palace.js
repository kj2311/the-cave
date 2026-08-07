/* ============================================================
   palace.js — MEMORY

   Ordered recall. At low levels the drill names a locus above
   each item, teaching the method of loci by scaffolding it,
   then withdraws the support as the level rises.
   ============================================================ */

import { h, ICONS, shuffle, sampleUnique, pick } from '../ui.js';
import { nouns, lociRoutes } from '../content.js';
import { nextBtn, countdown } from './shared.js';
import { t, tips } from '../i18n.js';


export default {
  id: 'palace',
  name: 'The Palace',
  discipline: 'memory',
  icon: ICONS.palace,
  blurb: 'Hold a sequence, then give it back in order.',
  length: '3 min',

  mount(root, ctx) {
    const level = ctx.level;
    const count = 5 + level * 2;                       // 7 → 21 items
    const showMs = Math.max(700, 1800 - level * 150);
    const scaffold = level <= 2;

    const items = sampleUnique(nouns(), count);
    const route = pick(lociRoutes());
    let cancelled = false;
    let stopCountdown = null;
    let timer = null;

    intro();

    function intro() {
      root.replaceChildren(
        h('div.fade-in.stack',
          h('div.panel',
            h('div.label', t('palace.head')),
            h('h2', { style: { margin: '8px 0 10px' } }, t('palace.items', { lvl: level, n: count })),
            h('p.prose', t('palace.intro', { s: (showMs / 1000).toFixed(1) })),
            h('p.prose', scaffold
              ? t('palace.introScaffold')
              : t('palace.introFree')),
            scaffold ? h('div.reveal',
              h('div.reveal__title', t('palace.route')),
              h('div', route.slice(0, count).join('  →  ')),
            ) : null,
          ),
          nextBtn(t('drill.begin'), () => run()),
        ),
      );
    }

    function run() {
      const stage = h('div.stage.stage--tall');
      root.replaceChildren(h('div.fade-in.stack', stage));
      stopCountdown = countdown(stage, 3, () => show(stage, 0));
    }

    function show(stage, i) {
      if (cancelled) return;
      if (i >= items.length) return recall();

      stage.replaceChildren(
        h('div.center',
          scaffold ? h('div.label', { style: { marginBottom: '14px' } }, route[i % route.length]) : null,
          h('div.flashcard', items[i]),
          h('div.label', { style: { marginTop: '18px' } }, `${i + 1} / ${items.length}`),
        ),
      );
      timer = setTimeout(() => show(stage, i + 1), showMs);
    }

    function recall() {
      if (cancelled) return;
      const chosen = [];
      const slots = h('div.token-pool', { style: { minHeight: '46px' } });
      const pool = h('div.token-pool');
      const submit = h('button.btn.btn--primary.btn--block', {
        type: 'button', disabled: true, style: { marginTop: '18px' },
      }, t('palace.submit'));

      const poolBtns = shuffle(items).map(word => {
        const b = h('button.token', { type: 'button' }, word);
        b.addEventListener('click', () => {
          if (b.classList.contains('is-used')) return;
          b.classList.add('is-used');
          chosen.push(word);
          paint();
        });
        return b;
      });
      pool.replaceChildren(...poolBtns);

      function paint() {
        slots.replaceChildren(...chosen.map((w, i) => {
          // Not named `t` — that would shadow the translation helper.
          const tok = h('button.token', { type: 'button' },
            h('span.faint.mono', { style: { marginRight: '7px', fontSize: '11px' } }, i + 1), w);
          tok.addEventListener('click', () => {
            chosen.splice(i, 1);
            const back = poolBtns.find(b => b.textContent === w && b.classList.contains('is-used'));
            back?.classList.remove('is-used');
            paint();
          });
          return tok;
        }));
        if (!chosen.length) slots.replaceChildren(h('div.token.token--slot', t('palace.slot')));
        submit.disabled = chosen.length !== items.length;
      }
      paint();

      submit.addEventListener('click', () => grade(chosen));

      root.replaceChildren(
        h('div.fade-in.stack',
          h('div.panel',
            h('div.label', t('palace.recall')),
            h('h3', { style: { margin: '8px 0 4px' } }, t('palace.rebuild')),
            h('p.prose', { style: { fontSize: '13.5px' } }, t('palace.takeBack')),
          ),
          h('div.panel', slots),
          h('div.panel', pool),
          submit,
        ),
      );
    }

    function grade(chosen) {
      const exact = chosen.filter((w, i) => w === items[i]).length;

      // Longest run from the start — order is the point of the drill.
      let run = 0;
      while (run < items.length && chosen[run] === items[run]) run += 1;

      const list = h('div.token-pool', ...items.map((w, i) => h(
        `button.token.${chosen[i] === w ? 'is-right' : 'is-wrong'}`,
        { type: 'button', disabled: true },
        h('span.faint.mono', { style: { marginRight: '7px', fontSize: '11px' } }, i + 1), w,
      )));

      root.replaceChildren(
        h('div.fade-in.stack',
          h('div.panel',
            h('div.label', t('palace.was')),
            h('div', { style: { marginTop: '12px' } }, list),
          ),
          nextBtn(t('drill.continue'), () => ctx.finish({
            pct: exact / items.length,
            stats: [
              { k: t('stat.inPlace'), v: `${exact}/${items.length}` },
              { k: t('stat.run'), v: run },
              { k: t('stat.level'), v: level },
            ],
            note: pick(tips('palace')),
          })),
        ),
      );
    }

    return () => {
      cancelled = true;
      stopCountdown?.();
      clearTimeout(timer);
    };
  },
};
