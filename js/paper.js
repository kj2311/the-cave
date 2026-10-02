/* ============================================================
   paper.js — the physical furniture of the mental side:
   torn newspaper clippings, tape, rubber stamps, label tape.

   Tears are random but seeded by the item's id, so a clipping
   tears the same way every time it is drawn.
   ============================================================ */

import { h } from './ui.js';

/** Small seeded PRNG (mulberry32 over an FNV-1a hash of the seed). */
export function rng(seed) {
  let a = 2166136261;
  for (const ch of String(seed)) { a ^= ch.charCodeAt(0); a = Math.imul(a, 16777619); }
  return () => {
    a = (a + 0x6D2B79F5) | 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** A slight, stable tilt for something lying on the desk. */
export function tilt(seed, max = 0.7) {
  const r = rng(`tilt:${seed}`);
  return `${((r() * 2 - 1) * max).toFixed(2)}deg`;
}

/** One torn edge: points along x (percent) with a depth (px) that wanders
    like a real tear, with the odd deeper bite. */
function edge(r, depth) {
  const pts = [];
  let x = 0;
  let y = r() * depth;
  while (x < 100) {
    pts.push([x, y]);
    x += 1.1 + r() * 3.4;
    y += (r() - 0.5) * depth * 0.95;
    if (r() < 0.07) y = depth * (0.75 + r() * 0.25);
    y = Math.max(0, Math.min(depth, y));
  }
  pts.push([100, y]);
  return pts;
}

/**
 * clip-path polygons for a clipping torn along the top and/or bottom.
 * Returns { rim, paper }: the rim is the pale fibre of the tear, the
 * paper is cut 1–3 px deeper so the fibre shows along every edge.
 */
export function tear(seed, { top = true, bottom = true, depth = 7 } = {}) {
  const r = rng(`tear:${seed}`);
  const T = top ? edge(r, depth) : null;
  const B = bottom ? edge(r, depth) : null;
  const fT = T ? T.map(() => 1 + r() * 2.2) : null;
  const fB = B ? B.map(() => 1 + r() * 2.2) : null;
  const build = (fibre) => {
    const pts = [];
    if (T) T.forEach(([x, y], i) => pts.push(`${x.toFixed(2)}% ${(y + (fibre ? fT[i] : 0)).toFixed(1)}px`));
    else pts.push('0% 0%', '100% 0%');
    if (B) [...B].reverse().forEach(([x, y], j) => {
      const i = B.length - 1 - j;
      pts.push(`${x.toFixed(2)}% calc(100% - ${(y + (fibre ? fB[i] : 0)).toFixed(1)}px)`);
    });
    else pts.push('100% 100%', '0% 100%');
    return `polygon(${pts.join(', ')})`;
  };
  return { rim: build(false), paper: build(true) };
}

/** A strip of tape across an edge. */
export function tape(seed, where = 'top') {
  const r = rng(`tape:${seed}`);
  const x = where === 'left' ? 14 + r() * 8 : where === 'right' ? 78 + r() * 8 : 34 + r() * 32;
  return h('span.tape', {
    'aria-hidden': 'true',
    style: { '--x': `${x.toFixed(1)}%`, '--tr': `${((r() * 2 - 1) * 4).toFixed(1)}deg` },
  });
}

/**
 * A newspaper clipping. `tag` is 'button' for a clipping you can open.
 * Content goes inside the paper layer; tape sits outside the tear so it
 * is never clipped.
 */
export function clipping({ seed, tag = 'div', cls = '', rot = null, tapes = ['top'], props = {}, depth = 7, top = true, bottom = true }, ...kids) {
  const { rim, paper } = tear(seed, { top, bottom, depth });
  const el = h(`${tag}.clip${cls ? '.' + cls : ''}`, {
    ...props,
    style: { '--rot': rot == null ? tilt(seed) : rot, ...(props.style || {}) },
  },
    h('span.clip__rim', { 'aria-hidden': 'true', style: { clipPath: rim, webkitClipPath: rim } }),
    h('div.clip__paper', { style: { clipPath: paper, webkitClipPath: paper } }, kids),
    tapes.map((w) => tape(`${seed}:${w}`, w)),
  );
  if (tag === 'button') el.type = 'button';
  return el;
}

/** A rubber stamp. `land` presses it down with a short animation. */
export function stamp(text, { rot = null, big = false, double = false, land = false, cls = '' } = {}) {
  return h(`span.stamp${big ? '.stamp--big' : ''}${double ? '.stamp--double' : ''}${land ? '.stamp--land' : ''}${cls ? '.' + cls : ''}`,
    { style: rot != null ? { '--rot': rot } : null }, text);
}

/** Label-maker tape for a section lying on the desk. */
export function dymo(text, count = null) {
  return h('div.dymo', h('span', text), count != null ? h('span.dymo__n', String(count)) : null);
}
