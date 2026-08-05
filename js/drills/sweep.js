/* ============================================================
   sweep.js — OBSERVATION

   A scene is exposed for a few seconds, then taken away and
   questioned. Everything is generated, so it never repeats.
   ============================================================ */

import { h, ICONS, rand, shuffle, sampleUnique } from '../ui.js';
import { hud, choices, nextBtn, countdown } from './_shared.js';

const COLORS = [
  { n: 'Amber',  v: '#f5a623' },
  { n: 'Cyan',   v: '#45d6e8' },
  { n: 'Green',  v: '#56d98a' },
  { n: 'Violet', v: '#a78bfa' },
  { n: 'Rose',   v: '#f472b6' },
  { n: 'White',  v: '#dbe5ee' },
];

const SHAPES = ['circle', 'square', 'triangle', 'diamond', 'hexagon', 'cross'];
const COLS = 4, ROWS = 4;

function shapeMarkup(shape, color, ring) {
  const f = `fill="${color}"`;
  let body;
  switch (shape) {
    case 'circle':   body = `<circle cx="50" cy="50" r="30" ${f}/>`; break;
    case 'square':   body = `<rect x="22" y="22" width="56" height="56" rx="7" ${f}/>`; break;
    case 'triangle': body = `<path d="M50 18 L82 76 H18 Z" ${f}/>`; break;
    case 'diamond':  body = `<path d="M50 16 L84 50 L50 84 L16 50 Z" ${f}/>`; break;
    case 'hexagon':  body = `<path d="M50 16 L80 33 L80 67 L50 84 L20 67 L20 33 Z" ${f}/>`; break;
    case 'cross':    body = `<path d="M40 16h20v24h24v20H60v24H40V60H16V40h24z" ${f}/>`; break;
    default:         body = '';
  }
  const halo = ring ? `<circle cx="50" cy="50" r="44" fill="none" stroke="${color}" stroke-width="4" stroke-dasharray="6 5" opacity=".85"/>` : '';
  return `<svg viewBox="0 0 100 100">${halo}${body}</svg>`;
}

function buildScene(level) {
  const count = Math.min(COLS * ROWS - 2, 6 + level * 2);
  const cells = shuffle([...Array(COLS * ROWS).keys()]).slice(0, count);
  const palette = COLORS.slice(0, Math.min(COLORS.length, 3 + level));
  const shapeSet = SHAPES.slice(0, Math.min(SHAPES.length, 3 + level));

  const objects = cells.map(idx => ({
    idx,
    row: Math.floor(idx / COLS) + 1,
    col: (idx % COLS) + 1,
    shape: shapeSet[rand(shapeSet.length)],
    color: palette[rand(palette.length)],
    ring: false,
  }));

  // From level 2 one object is marked, which gives a "which one was marked" question.
  if (level >= 2 && objects.length) objects[rand(objects.length)].ring = true;

  return { objects, palette, shapeSet, count };
}

function sceneNode(scene) {
  const grid = h('div.scene', { style: { gridTemplateColumns: `repeat(${COLS}, 1fr)` } });
  const byIdx = new Map(scene.objects.map(o => [o.idx, o]));
  for (let i = 0; i < COLS * ROWS; i++) {
    const o = byIdx.get(i);
    grid.appendChild(h('div.scene__cell', o ? { html: shapeMarkup(o.shape, o.color.v, o.ring) } : null));
  }
  return grid;
}

/* ---------- questions ---------- */

function numberOptions(correct, spread = 4) {
  const set = new Set([correct]);
  let guard = 0;
  while (set.size < 4 && guard++ < 60) {
    const d = rand(spread * 2 + 1) - spread;
    const v = correct + d;
    if (v >= 0) set.add(v);
  }
  let v = correct + 1;
  while (set.size < 4) set.add(v++);
  return [...set].map(n => ({ t: String(n), ok: n === correct }));
}

function buildQuestions(scene, level) {
  const { objects } = scene;
  const qs = [];

  const colorCounts = {};
  const shapeCounts = {};
  for (const o of objects) {
    colorCounts[o.color.n] = (colorCounts[o.color.n] || 0) + 1;
    shapeCounts[o.shape] = (shapeCounts[o.shape] || 0) + 1;
  }

  // total
  qs.push({
    stem: 'How many objects were in the scene in total?',
    options: numberOptions(objects.length, 3),
  });

  // count of one colour that was present
  const presentColors = Object.keys(colorCounts);
  if (presentColors.length) {
    const c = presentColors[rand(presentColors.length)];
    qs.push({
      stem: `How many ${c.toLowerCase()} objects were there?`,
      options: numberOptions(colorCounts[c], 3),
    });
  }

  // shape at a specific position
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

  // a shape that never appeared
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

  // count of one shape
  if (present.length) {
    const s = present[rand(present.length)];
    qs.push({
      stem: `How many ${s}s were there?`,
      options: numberOptions(shapeCounts[s], 3),
    });
  }

  // the marked object
  const marked = objects.find(o => o.ring);
  if (marked) {
    const others = COLORS.filter(c => c.n !== marked.color.n);
    qs.push({
      stem: 'One object had a dashed ring around it. What colour was it?',
      options: shuffle([
        { t: marked.color.n, ok: true },
        ...sampleUnique(others, 3).map(c => ({ t: c.n, ok: false })),
      ]),
    });
  }

  // most common colour, only when there is a clear winner
  const sortedColors = Object.entries(colorCounts).sort((a, b) => b[1] - a[1]);
  if (sortedColors.length >= 3 && sortedColors[0][1] > sortedColors[1][1]) {
    qs.push({
      stem: 'Which colour appeared most often?',
      options: shuffle([
        { t: sortedColors[0][0], ok: true },
        ...sortedColors.slice(1, 4).map(([n]) => ({ t: n, ok: false })),
      ]),
    });
  }

  return shuffle(qs).slice(0, Math.min(6, 4 + Math.floor(level / 2)));
}

const cap = s => s.charAt(0).toUpperCase() + s.slice(1);

const TIPS = [
  'Scan in a fixed order — left to right, top to bottom. A random scan loses most of the grid.',
  'Name each object silently as you see it. Verbalising forces encoding; passive looking does not.',
  'Count first, then detail. A total you are sure of anchors everything else.',
  'Your first glance gets the least processing, not the most. Go back to where you started.',
  'Group by colour rather than by position — colour chunks survive better than coordinates.',
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
    const exposure = Math.max(3200, 9500 - level * 1100);
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
            h('h2', { style: { margin: '8px 0 10px' } }, `Level ${level}`),
            h('p.prose', `A scene of ${scene.count} objects appears for ${(exposure / 1000).toFixed(1)} seconds. Then it is gone and the questions begin. You will not know in advance what is asked.`),
            h('div.reveal',
              h('div.reveal__title', 'Before you start'),
              h('div', TIPS[rand(TIPS.length)]),
            ),
          ),
          nextBtn('Begin', () => run()),
        ),
      );
    }

    function run() {
      const stage = h('div.stage.stage--tall');
      root.replaceChildren(h('div.fade-in.stack', stage));
      stopCountdown = countdown(stage, 3, expose.bind(null, stage));
    }

    function expose(stage) {
      if (cancelled) return;
      const bar = h('div.hud__fill', { style: { width: '100%', transition: `width ${exposure}ms linear` } });
      const meter = h('div.hud__bar', { style: { marginBottom: '12px' } }, bar);
      stage.replaceChildren(sceneNode(scene));
      root.replaceChildren(h('div.stack', meter, stage));
      requestAnimationFrame(() => { bar.style.width = '0%'; });
      expTimer = setTimeout(() => ask(0, []), exposure);
    }

    async function ask(i, results) {
      if (cancelled) return;
      if (i >= questions.length) return done(results);

      const q = questions[i];
      const bar = hud(questions.length);
      bar.set(i);

      const holder = h('div');
      const wrap = h('div.fade-in.stack',
        bar.el,
        h('div.panel', h('h3', q.stem)),
        holder,
      );
      root.replaceChildren(wrap);

      const list = choices(q.options, (correct) => {
        results.push(correct);
        holder.appendChild(nextBtn(
          i === questions.length - 1 ? 'See results' : 'Next',
          () => ask(i + 1, results),
        ));
      });
      holder.appendChild(list);
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
