/* ============================================================
   sweep.js — OBSERVATION

   A scene is exposed for a few seconds, then taken away and
   questioned. Everything is generated, so it never repeats.

   Objects vary by shape and by fill rather than by colour. The
   app is monochrome, and fill is the harder discrimination.
   ============================================================ */

import { h, ICONS, rand, shuffle, sampleUnique } from '../ui.js';
import { hud, choices, nextBtn, countdown } from './shared.js';
import { t } from '../i18n.js';

const INK = '#f2f4f7';
const VOID = '#08080a';

const FILLS = ['solid', 'hollow', 'hatched', 'dotted', 'split', 'double'];
const SHAPES = ['circle', 'square', 'triangle', 'diamond', 'hexagon', 'cross'];

/** The board grows with the level, so object counts can keep climbing. */
function gridFor(level) {
  if (level >= 6) return { cols: 5, rows: 5 };
  if (level >= 4) return { cols: 5, rows: 4 };
  return { cols: 4, rows: 4 };
}

const SHAPE_D = {
  circle:   'M50 20 A30 30 0 1 1 49.9 20 Z',
  square:   'M22 22 H78 V78 H22 Z',
  triangle: 'M50 18 L82 76 H18 Z',
  diamond:  'M50 16 L84 50 L50 84 L16 50 Z',
  hexagon:  'M50 16 L80 33 L80 67 L50 84 L20 67 L20 33 Z',
  cross:    'M40 16 H60 V40 H84 V60 H60 V84 H40 V60 H16 V40 H40 Z',
};

/**
 * Ids inside inline SVG share one document-wide namespace, so every
 * pattern and mask needs a per-cell suffix or the cells collide.
 */
function shapeMarkup(shape, fill, ring, uid) {
  const d = SHAPE_D[shape];
  let defs = '';
  let body = '';

  switch (fill) {
    case 'solid':
      body = `<path d="${d}" fill="${INK}"/>`;
      break;
    case 'hollow':
      body = `<path d="${d}" fill="none" stroke="${INK}" stroke-width="8"/>`;
      break;
    case 'hatched':
      defs = `<pattern id="h${uid}" width="9" height="9" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                <rect width="9" height="9" fill="${VOID}"/>
                <rect width="4" height="9" fill="${INK}"/>
              </pattern>`;
      body = `<path d="${d}" fill="url(#h${uid})" stroke="${INK}" stroke-width="3"/>`;
      break;
    case 'dotted':
      defs = `<pattern id="d${uid}" width="11" height="11" patternUnits="userSpaceOnUse">
                <rect width="11" height="11" fill="${VOID}"/>
                <circle cx="5.5" cy="5.5" r="2.9" fill="${INK}"/>
              </pattern>`;
      body = `<path d="${d}" fill="url(#d${uid})" stroke="${INK}" stroke-width="3"/>`;
      break;
    case 'split':
      defs = `<mask id="m${uid}"><rect x="0" y="0" width="50" height="100" fill="#fff"/></mask>`;
      body = `<path d="${d}" fill="${INK}" mask="url(#m${uid})"/>
              <path d="${d}" fill="none" stroke="${INK}" stroke-width="4"/>`;
      break;
    case 'double':
      body = `<path d="${d}" fill="none" stroke="${INK}" stroke-width="5"/>
              <g transform="translate(50,50) scale(.48) translate(-50,-50)">
                <path d="${d}" fill="${INK}"/>
              </g>`;
      break;
  }

  const halo = ring
    ? `<circle cx="50" cy="50" r="46" fill="none" stroke="${INK}" stroke-width="3" stroke-dasharray="7 6"/>`
    : '';

  return `<svg viewBox="0 0 100 100"><defs>${defs}</defs>${halo}${body}</svg>`;
}

function buildScene(level) {
  const { cols, rows } = gridFor(level);
  const count = Math.min(cols * rows - 2, 6 + level * 2);
  const cells = shuffle([...Array(cols * rows).keys()]).slice(0, count);
  const fillSet = FILLS.slice(0, Math.min(FILLS.length, 2 + level));
  const shapeSet = SHAPES.slice(0, Math.min(SHAPES.length, 3 + level));

  const objects = cells.map((idx, i) => ({
    idx,
    uid: i,
    row: Math.floor(idx / cols) + 1,
    col: (idx % cols) + 1,
    shape: shapeSet[rand(shapeSet.length)],
    fill: fillSet[rand(fillSet.length)],
    ring: false,
  }));

  // From level 2 one object is marked, which gives a "which one was marked" question.
  if (level >= 2 && objects.length) objects[rand(objects.length)].ring = true;

  return { objects, fillSet, shapeSet, count, cols, rows };
}

function sceneNode(scene) {
  const grid = h('div.scene', { style: { gridTemplateColumns: `repeat(${scene.cols}, 1fr)` } });
  const byIdx = new Map(scene.objects.map(o => [o.idx, o]));
  for (let i = 0; i < scene.cols * scene.rows; i++) {
    const o = byIdx.get(i);
    grid.appendChild(h('div.scene__cell', o ? { html: shapeMarkup(o.shape, o.fill, o.ring, o.uid) } : null));
  }
  return grid;
}

/* ---------- questions ---------- */

function numberOptions(correct, spread = 3) {
  const set = new Set([correct]);
  let guard = 0;
  while (set.size < 4 && guard++ < 60) {
    const v = correct + (rand(spread * 2 + 1) - spread);
    if (v >= 0) set.add(v);
  }
  let v = correct + 1;
  while (set.size < 4) set.add(v++);
  return [...set].map(n => ({ t: String(n), ok: n === correct }));
}

const cap = s => s.charAt(0).toUpperCase() + s.slice(1);

function buildQuestions(scene, level) {
  const { objects } = scene;
  const qs = [];

  const fillCounts = {};
  const shapeCounts = {};
  for (const o of objects) {
    fillCounts[o.fill] = (fillCounts[o.fill] || 0) + 1;
    shapeCounts[o.shape] = (shapeCounts[o.shape] || 0) + 1;
  }

  qs.push({
    stem: 'How many objects were in the scene in total?',
    options: numberOptions(objects.length, 3),
  });

  const presentFills = Object.keys(fillCounts);
  if (presentFills.length) {
    const f = presentFills[rand(presentFills.length)];
    qs.push({
      stem: `How many ${f} objects were there?`,
      options: numberOptions(fillCounts[f], 3),
    });
  }

  if (objects.length) {
    const o = objects[rand(objects.length)];
    const wrong = SHAPES.filter(s => s !== o.shape);
    qs.push({
      stem: `What was in row ${o.row}, column ${o.col}? (counting from the top left)`,
      options: shuffle([
        { t: cap(o.shape), ok: true },
        ...sampleUnique(wrong, 3).map(s => ({ t: cap(s), ok: false })),
      ]),
    });
  }

  const absent = SHAPES.filter(s => !shapeCounts[s]);
  const present = Object.keys(shapeCounts);
  if (absent.length && present.length >= 3) {
    qs.push({
      stem: 'Which of these did NOT appear anywhere in the scene?',
      options: shuffle([
        { t: cap(absent[rand(absent.length)]), ok: true },
        ...sampleUnique(present, 3).map(s => ({ t: cap(s), ok: false })),
      ]),
    });
  }

  if (present.length) {
    const s = present[rand(present.length)];
    qs.push({
      stem: `How many ${s}s were there?`,
      options: numberOptions(shapeCounts[s], 3),
    });
  }

  const marked = objects.find(o => o.ring);
  if (marked) {
    const others = SHAPES.filter(s => s !== marked.shape);
    qs.push({
      stem: 'One object was circled by a dashed ring. What shape was it?',
      options: shuffle([
        { t: cap(marked.shape), ok: true },
        ...sampleUnique(others, 3).map(s => ({ t: cap(s), ok: false })),
      ]),
    });
  }

  const sortedFills = Object.entries(fillCounts).sort((a, b) => b[1] - a[1]);
  if (sortedFills.length >= 3 && sortedFills[0][1] > sortedFills[1][1]) {
    qs.push({
      stem: 'Which fill appeared most often?',
      options: shuffle([
        { t: cap(sortedFills[0][0]), ok: true },
        ...sortedFills.slice(1, 4).map(([n]) => ({ t: cap(n), ok: false })),
      ]),
    });
  }

  return shuffle(qs).slice(0, Math.min(qs.length, 3 + Math.ceil(level / 2)));
}

const TIPS = [
  'Scan in a fixed order — left to right, top to bottom. A random scan loses most of the grid.',
  'Name each object silently as you see it. Verbalising forces encoding; passive looking does not.',
  'Count first, then detail. A total you are sure of anchors everything else.',
  'Your first glance gets the least processing, not the most. Go back to where you started.',
  'Group by fill rather than by position — a chunk of four hollows survives better than four coordinates.',
];

/* ---------- drill ---------- */

export default {
  id: 'sweep',
  name: 'Sweep',
  discipline: 'observation',
  icon: ICONS.eye,
  blurb: 'Take in a scene at a glance, then answer for it.',
  length: '2 min',

  mount(root, ctx) {
    const level = ctx.level;
    const exposure = Math.max(2900, 10000 - level * 900);
    const scene = buildScene(level);
    const questions = buildQuestions(scene, level);
    let cancelled = false;
    let stopCountdown = null;
    let expTimer = null;

    intro();

    function intro() {
      root.replaceChildren(
        h('div.fade-in.stack',
          h('div.panel',
            h('div.label', 'Observation · Sweep'),
            h('h2', { style: { margin: '10px 0 12px' } }, `Level ${level}`),
            h('p.prose', `A scene of ${scene.count} objects appears for ${(exposure / 1000).toFixed(1)} seconds. Then it is gone and the questions begin. You will not know in advance what is asked.`),
            h('p.prose', 'Objects differ by shape and by fill — solid, hollow, hatched, dotted, split, double.'),
            h('div.reveal',
              h('div.reveal__title', t('drill.beforeStart')),
              h('div', TIPS[rand(TIPS.length)]),
            ),
          ),
          nextBtn(t('drill.begin'), () => run()),
        ),
      );
    }

    function run() {
      const stage = h('div.stage.stage--tall');
      root.replaceChildren(h('div.fade-in.stack', stage));
      stopCountdown = countdown(stage, 3, () => expose(stage));
    }

    function expose(stage) {
      if (cancelled) return;
      const bar = h('div.hud__fill', { style: { width: '100%', transition: `width ${exposure}ms linear` } });
      const meter = h('div.hud__bar', { style: { marginBottom: '14px' } }, bar);
      stage.replaceChildren(sceneNode(scene));
      root.replaceChildren(h('div.stack', meter, stage));
      requestAnimationFrame(() => { bar.style.width = '0%'; });
      expTimer = setTimeout(() => ask(0, []), exposure);
    }

    function ask(i, results) {
      if (cancelled) return;
      if (i >= questions.length) return done(results);

      const q = questions[i];
      const bar = hud(questions.length);
      bar.set(i);

      const holder = h('div');
      root.replaceChildren(h('div.fade-in.stack',
        bar.el,
        h('div.panel', h('h3', q.stem)),
        holder,
      ));

      holder.appendChild(choices(q.options, (correct) => {
        results.push(correct);
        holder.appendChild(nextBtn(
          i === questions.length - 1 ? t('drill.seeResults') : t('drill.next'),
          () => ask(i + 1, results),
        ));
      }));
    }

    function done(results) {
      const right = results.filter(Boolean).length;
      ctx.finish({
        pct: right / questions.length,
        stats: [
          { k: 'Correct', v: `${right}/${questions.length}` },
          { k: 'Objects', v: scene.count },
          { k: 'Exposure', v: `${(exposure / 1000).toFixed(1)}s` },
        ],
        note: TIPS[rand(TIPS.length)],
      });
    }

    return () => {
      cancelled = true;
      stopCountdown?.();
      clearTimeout(expTimer);
    };
  },
};
