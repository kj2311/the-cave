/* ============================================================
   shared.js — pieces every drill reuses.
   ============================================================ */

import { h, svg, ICONS, shuffle, buzz } from '../ui.js';

/** Progress strip: "03 / 05" plus a fill bar. */
export function hud(total) {
  const fill = h('div.hud__fill', { style: { width: '0%' } });
  const count = h('span.hud__count', `01 / ${String(total).padStart(2, '0')}`);
  const el = h('div.hud', count, h('div.hud__bar', fill));
  return {
    el,
    set(i) {
      count.textContent = `${String(Math.min(i + 1, total)).padStart(2, '0')} / ${String(total).padStart(2, '0')}`;
      fill.style.width = `${(i / total) * 100}%`;
    },
    done() { fill.style.width = '100%'; },
  };
}

const KEYS = ['A', 'B', 'C', 'D', 'E', 'F'];

/**
 * Multiple choice block.
 * options: [{ t, ok }]  — shuffled on render.
 * onPick(correct, option) fires once; the list then locks and reveals.
 */
export function choices(options, onPick, { reveal = true } = {}) {
  const shuffled = shuffle(options);
  let locked = false;

  const nodes = shuffled.map((o, i) => {
    const key = h('span.opt__key', KEYS[i]);
    const btn = h('button.opt', { type: 'button' }, key, h('span.grow', o.t));
    btn.addEventListener('click', () => {
      if (locked) return;
      locked = true;
      buzz(o.ok ? 14 : [10, 40, 10]);

      if (reveal) {
        nodes.forEach((n, j) => {
          n.classList.add('is-locked');
          if (shuffled[j].ok) n.classList.add('is-right');
          else if (j === i) n.classList.add('is-wrong');
          else n.classList.add('is-muted');
        });
        if (shuffled[i].ok) {
          nodes[i].querySelector('.opt__key').replaceChildren(svg(ICONS.check, 14));
        }
      } else {
        nodes.forEach(n => n.classList.add('is-locked'));
        btn.classList.add('is-picked');
      }
      onPick(!!o.ok, o);
    });
    return btn;
  });

  return h('div', nodes);
}

/** The amber explanation panel shown after an answer. */
export function reveal(title, text, variant = '') {
  return h(`div.reveal${variant ? '.' + variant : ''}`,
    h('div.reveal__title', title),
    h('div', { html: mdish(text) }),
  );
}

/** Minimal inline markdown: **bold**, *emphasis*, ==highlighter==. */
export function mdish(s) {
  return String(s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/==(.+?)==/g, '<mark>$1</mark>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>');
}

/* ---------- the dossier ---------- */

/** A ruled section heading inside a dossier, with its body text. */
export function dossierSection(label, text) {
  return [
    h('div.dossier__rule', label),
    h('p.dossier__lede', { style: { fontSize: '16px', marginTop: '6px' }, html: mdish(text) }),
  ];
}

/**
 * Renders content as a physical document rather than as UI.
 * Returns the element plus the observation nodes, so a caller can
 * highlight or strike one after the fact.
 */
export function dossier({ kind, no, title, stamp, lede, extra, factsLabel, facts, onPickFact }) {
  const factEls = (facts || []).map((f, i) => {
    const li = h('li', { html: mdish(f) });
    if (onPickFact) {
      li.classList.add('is-pickable');
      li.addEventListener('click', () => onPickFact(i));
    }
    return li;
  });

  const el = h('article.dossier',
    h('header.dossier__head',
      h('span.dossier__kind', kind),
      no ? h('span.dossier__no', no) : null,
    ),
    stamp ? h('div.dossier__stamp', stamp) : null,
    title ? h('h2.dossier__title', title) : null,
    lede ? h('p.dossier__lede', { html: mdish(lede) }) : null,
    ...(extra || []),
    facts && facts.length ? h('div.dossier__rule', factsLabel) : null,
    facts && facts.length ? h('ol.dossier__facts', factEls) : null,
  );

  return { el, factEls };
}

/** Big "NEXT" / "FINISH" button. */
export function nextBtn(label, onClick) {
  return h('button.btn.btn--primary.btn--block', {
    type: 'button',
    style: { marginTop: '16px' },
    onclick: onClick,
  }, label);
}

/** 3 - 2 - 1 before a timed exposure. */
export function countdown(stage, from, onDone) {
  const num = h('div.countdown', String(from));
  stage.replaceChildren(num);
  let n = from;
  const id = setInterval(() => {
    n -= 1;
    if (n <= 0) {
      clearInterval(id);
      onDone();
    } else {
      num.textContent = String(n);
      num.style.animation = 'none';
      void num.offsetWidth;
      num.style.animation = 'pop .3s cubic-bezier(.22,.61,.36,1)';
    }
  }, 900);
  return () => clearInterval(id);
}
