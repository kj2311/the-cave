/* ============================================================
   palace.js — MEMORY

   Ordered recall. At low levels the drill names a locus above
   each item, teaching the method of loci by scaffolding it,
   then withdraws the support as the level rises.
   ============================================================ */

import { h, ICONS, shuffle, sampleUnique, pick } from '../ui.js';
import { NOUNS, LOCI_ROUTES } from '../data/words.js';
import { nextBtn, countdown } from './shared.js';
import { t } from '../i18n.js';

const TIPS = [
  'Absurd beats sensible. An anchor smashing through your front door survives; an anchor resting beside it does not.',
  'Make the image interact with the place. Objects that merely sit somewhere vanish.',
  'Add one non-visual sense — a sound, a smell, a texture. Multi-sensory images are far more durable.',
  'Scale it. Enormous or tiny, never actual size.',
  'If a link breaks on recall, do not force it. Move to the next locus and come back — the gap usually fills itself.',
];

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

    const items = sampleUnique(NOUNS, count);
    const route = pick(LOCI_ROUTES);
    let cancelled = false;
    let stopCountdown = null;
    let timer = null;

    intro();

    function intro() {
      root.replaceChildren(
        h('div.fade-in.stack',
          h('div.panel',
            h('div.label', 'Memory · The Palace'),
            h('h2', { style: { margin: '8px 0 10px' } }, `Level ${level} — ${count} items`),
            h('p.prose', `Items appear one at a time, ${(showMs / 1000).toFixed(1)} seconds each. Afterwards you rebuild the sequence in order.`),
            h('p.prose', scaffold
              ? 'Each item is paired with a place on a route. Put the item there as a picture — moving, absurd, interacting with the place.'
              : 'No route is given this time. Use one of your own and place each item as you go.'),
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
              { k: 'In place', v: `${exact}/${items.length}` },
              { k: 'Run', v: run },
              { k: 'Level', v: level },
            ],
            note: pick(TIPS),
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
