/* ============================================================
   app.js — router, views, boot.
   ============================================================ */

import {
  h, svg, ICONS, toast, render, pick, fmtDate, ringSvg, sparkline, buzz,
} from './ui.js';
import {
  DISCIPLINES, get, reset, dayKey, levelFromXp, rank,
  liveStreak, ensureDaily, dailyComplete, recordRun, addLog, deleteLog,
  markRead, exportJson, importJson, missionDone,
  drillLevel, toNextLevel, drillScores, activity, recentAverage, trend,
  MAX_LEVEL, MASTERY,
} from './store.js';
import { DRILLS, byId, drillIds } from './drills/index.js';
import { LESSONS } from './data/lessons.js';
import { MISSIONS, TIERS } from './data/missions.js';
import { mdish } from './drills/_shared.js';

const QUOTES = [
  'Everyone is telling you something. Almost nobody is saying it.',
  'The room was talking before anyone opened their mouth.',
  'Certainty is a feeling. Evidence is a different thing entirely.',
  'You are not bad at noticing. You have never been taught an order to notice in.',
  'Learn what a person is like when nothing is at stake. That is the whole trick.',
  'A conclusion you cannot break is not a conclusion.',
  'Watch the people who are not being watched.',
  'The pause does more work than the sentence.',
  'What is missing has a shape. Learn to see the shape.',
  'Being right is style. Being calm is the technique.',
];

let cleanup = null;

/* ============================================================
   HOME
   ============================================================ */

function viewHome() {
  const s = get();
  const daily = ensureDaily(drillIds());
  const r = rank();
  const streak = liveStreak();
  const complete = dailyComplete();

  const done = new Set(daily.done);
  const progress = daily.drills.length ? done.size / daily.drills.length : 0;

  const briefing = h('div.briefing',
    h('div.briefing__date',
      h('span.label', new Date().toLocaleDateString(undefined, { weekday: 'long', day: 'numeric', month: 'long' })),
      h('span.label', r.name),
    ),
    h('div.row',
      h('div.grow',
        h('h1', complete ? 'Protocol complete.' : streak > 0 ? 'Back again.' : 'Come in.'),
        h('p.prose', { style: { marginTop: '6px' } },
          complete
            ? 'Three systems trained today. Anything further is surplus.'
            : `${daily.drills.length - done.size} of ${daily.drills.length} sessions left in today\'s protocol.`),
      ),
      h('div', { style: { position: 'relative', flex: 'none' } },
        ringSvg(progress, 62, 5),
        h('div', {
          style: {
            position: 'absolute', inset: '0', display: 'grid', placeItems: 'center',
            fontFamily: 'var(--mono)', fontSize: '15px', color: 'var(--silver-hi)',
          },
        }, `${done.size}/${daily.drills.length}`),
      ),
    ),
    h('div.briefing__quote', pick(QUOTES)),
  );

  const protocol = daily.drills.map(id => {
    const d = byId(id);
    return d ? drillCard(d, done.has(id)) : null;
  }).filter(Boolean);

  const nodes = [
    briefing,
    h('div.section-head', h('span.label', "Today's protocol")),
    ...protocol,
  ];

  if (complete) {
    nodes.push(h('div.panel', { style: { marginTop: '12px' } },
      h('div.row',
        h('span.chip.chip--accent', 'Complete'),
        h('span.faint', { style: { fontSize: '13.5px' } }, `Streak at ${streak} day${streak === 1 ? '' : 's'}.`),
      ),
    ));
  }

  const todays = MISSIONS[hashDay() % MISSIONS.length];
  nodes.push(
    h('div.section-head', h('span.label', 'Field assignment')),
    h(`button.drill.${DISCIPLINES[todays.discipline].cls}`,
      { type: 'button', onclick: () => go(`#/mission/${todays.id}`) },
      h('span.drill__glyph', svg(ICONS.spark, 19)),
      h('span.grow',
        h('div.drill__name', todays.title),
        h('div.drill__sub', `${TIERS[todays.tier].name} · ${DISCIPLINES[todays.discipline].name} · ${todays.time}`),
      ),
      missionDone(todays.id)
        ? h('span.drill__tick', svg(ICONS.check, 17))
        : h('span.drill__chev', svg(ICONS.chevron, 17)),
    ),
  );

  if (!isStandalone()) nodes.push(installNote());

  render(h('div.fade-in', nodes), { title: 'THE CAVE' });
  setTab('#/home');
}

function hashDay() {
  return dayKey().split('-').reduce((a, n) => a * 31 + Number(n), 11);
}

function drillCard(d, isDone) {
  const lvl = drillLevel(d.id);
  return h(`button.drill.${DISCIPLINES[d.discipline].cls}${isDone ? '.is-done' : ''}`,
    { type: 'button', onclick: () => go(`#/drill/${d.id}`) },
    h('span.drill__glyph', svg(d.icon, 21)),
    h('span.grow',
      h('div.drill__name', d.name),
      h('div.drill__sub', `${DISCIPLINES[d.discipline].name} · Level ${lvl} · ${d.length}`),
    ),
    isDone
      ? h('span.drill__tick', svg(ICONS.check, 18))
      : h('span.drill__chev', svg(ICONS.chevron, 18)),
  );
}

function installNote() {
  const ios = /iphone|ipad|ipod/i.test(navigator.userAgent);
  return h('div.install-note',
    ios
      ? h('div', h('b', 'Install this.'), ' Tap the Share button in Safari, scroll down, and choose ',
          h('b', 'Add to Home Screen'), '. It then opens full screen, works with no signal, and keeps your progress.')
      : h('div', h('b', 'Install this.'), ' Use your browser menu and choose ',
          h('b', 'Install app'), ' or ', h('b', 'Add to Home Screen'), ' to run it full screen and offline.'),
  );
}

/* ============================================================
   TRAIN
   ============================================================ */

function viewTrain() {
  const s = get();
  const byDiscipline = {};
  for (const d of DRILLS) (byDiscipline[d.discipline] ||= []).push(d);

  const nodes = [
    h('div.panel',
      h('div.label', 'Training'),
      h('h2', { style: { margin: '8px 0 8px' } }, 'Six systems'),
      h('p.prose', `Each drill scales with you, up to level ${MAX_LEVEL}. Two runs at ${Math.round(MASTERY * 100)}% or better move it up — more items, less time, fewer cues, a bigger board.`),
      h('p.prose.faint', { style: { fontSize: '13.5px' } }, 'Turning up counts for XP. Only doing well makes it harder.'),
    ),
  ];

  for (const [key, meta] of Object.entries(DISCIPLINES)) {
    const list = byDiscipline[key] || [];
    if (!list.length) continue;
    const lv = levelFromXp(s.xp[key] || 0);
    nodes.push(
      h(`div.section-head.${meta.cls}`,
        h('span.label', meta.name),
        h('span.label', { style: { color: 'var(--accent)' } }, `LV ${lv.level}`),
      ),
      h('p.faint', { style: { fontSize: '13px', margin: '0 2px 10px' } }, meta.tag),
      ...list.map(d => {
        const runs = s.runs[d.id] || 0;
        const best = s.bests[d.id];
        const lvl = drillLevel(d.id);
        const toNext = toNextLevel(d.id);
        return h(`button.drill.${meta.cls}`, { type: 'button', onclick: () => go(`#/drill/${d.id}`) },
          h('span.drill__glyph', svg(d.icon, 21)),
          h('span.grow',
            h('div.row',
              h('div.drill__name.grow', d.name),
              h('span.chip.chip--accent', `LV ${lvl}`),
            ),
            h('div.drill__sub', d.blurb),
            h('div.drill__sub', { style: { marginTop: '4px', opacity: .8 } },
              `${runs} run${runs === 1 ? '' : 's'}`,
              best !== undefined ? ` · best ${Math.round(best * 100)}%` : '',
              toNext === 0
                ? ' · at the ceiling'
                : ` · ${toNext} more strong run${toNext === 1 ? '' : 's'} to level ${lvl + 1}`),
          ),
          h('span.drill__chev', svg(ICONS.chevron, 18)),
        );
      }),
    );
  }

  render(h('div.fade-in', nodes), { title: 'TRAINING' });
  setTab('#/train');
}

/* ============================================================
   CODEX
   ============================================================ */

function viewCodex() {
  const s = get();
  const nodes = [
    h('div.panel',
      h('div.label', 'Codex'),
      h('h2', { style: { margin: '8px 0 8px' } }, 'The written material'),
      h('p.prose', 'Read these in any order. Every claim in here is one you can act on; where the popular version of an idea is wrong, it says so.'),
    ),
    h('div.section-head', h('span.label', `${LESSONS.length} entries`)),
    ...LESSONS.map(l => {
      const meta = DISCIPLINES[l.discipline];
      const isRead = s.read.includes(l.id);
      return h(`button.lesson-card.${meta.cls}${isRead ? '.is-read' : ''}`,
        { type: 'button', onclick: () => go(`#/codex/${l.id}`) },
        h('div.lesson-card__t', l.title),
        h('div.lesson-card__d', l.teaser),
        h('div.lesson-card__m',
          h('span.chip.chip--accent', meta.name),
          h('span.chip', `${l.mins} min`),
          isRead ? h('span.chip.chip--accent', 'Read') : null,
        ),
      );
    }),
  ];
  render(h('div.fade-in', nodes), { title: 'CODEX' });
  setTab('#/codex');
}

function viewLesson(id) {
  const l = LESSONS.find(x => x.id === id);
  if (!l) return go('#/codex');
  const meta = DISCIPLINES[l.discipline];
  markRead(l.id);

  const blocks = l.body.map(b => {
    if (b.h) return h('h2', b.h);
    if (b.p) return h('p', { html: mdish(b.p) });
    if (b.ul) return h('ul', ...b.ul.map(li => h('li', { html: mdish(li) })));
    if (b.pull) return h('div.pull', { html: mdish(b.pull) });
    if (b.myth) return h('div.reveal.reveal--myth',
      h('div.reveal__title', 'Correction'), h('div', { html: mdish(b.myth) }));
    return null;
  }).filter(Boolean);

  const idx = LESSONS.indexOf(l);
  const next = LESSONS[idx + 1];

  render(
    h(`div.fade-in.${meta.cls}`,
      h('div.row', { style: { marginBottom: '14px' } },
        h('span.chip.chip--accent', meta.name),
        h('span.chip', `${l.mins} min read`),
      ),
      h('h1', l.title),
      h('div.article.prose', { style: { marginTop: '16px' } }, blocks),
      h('div', { style: { marginTop: '28px' } },
        next
          ? h('button.btn.btn--ghost.btn--block', { type: 'button', onclick: () => go(`#/codex/${next.id}`) }, `Next — ${next.title}`)
          : h('button.btn.btn--ghost.btn--block', { type: 'button', onclick: () => go('#/codex') }, 'Back to the codex'),
      ),
    ),
    { title: 'CODEX', back: () => go('#/codex') },
  );
  setTab('#/codex');
}

/* ============================================================
   FIELD LOG
   ============================================================ */

function viewLog() {
  const s = get();
  const done = new Set(s.missions);

  const byTier = { 1: [], 2: [], 3: [] };
  for (const m of MISSIONS) byTier[m.tier].push(m);

  // One mission is put forward each day so there is always a default move.
  const todays = MISSIONS[hashDay() % MISSIONS.length];

  const nodes = [
    h('div.panel',
      h('div.label', 'Field work'),
      h('h2', { style: { margin: '10px 0 10px' } }, 'Assignments'),
      h('p.prose', 'The drills build the mechanism. These put it outside, where it is harder and where it counts. Every one ends in a written debrief — the training is in the noticing afterwards.'),
    ),

    h('div.section-head', h('span.label', 'Put forward today')),
    missionCard(todays, done.has(todays.id)),
  ];

  for (const tier of [1, 2, 3]) {
    nodes.push(
      h('div.section-head',
        h('span.label', TIERS[tier].name),
        h('span.label', `${byTier[tier].filter(m => done.has(m.id)).length}/${byTier[tier].length}`),
      ),
      h('p.faint', { style: { fontSize: '13px', margin: '0 0 12px' } }, TIERS[tier].note),
      ...byTier[tier].map(m => missionCard(m, done.has(m.id))),
    );
  }

  nodes.push(
    h('div.section-head', h('span.label', `Filed — ${s.log.length}`)),
    h('div.panel', s.log.length
      ? s.log.map(e => h('div.entry',
          h('div.row.row--between',
            h('span.entry__d', fmtDate(e.ts)),
            h('button.btn.btn--ghost.btn--sm', {
              type: 'button',
              onclick: () => {
                if (!confirm('Delete this entry?')) return;
                deleteLog(e.ts);
                viewLog();
              },
            }, 'Delete'),
          ),
          h('div.entry__q', e.prompt),
          h('div.entry__b', e.body),
        ))
      : h('div.empty', 'Nothing filed yet')),
  );

  render(h('div.fade-in', nodes), { title: 'FIELD' });
  setTab('#/log');
}

function missionCard(m, isDone) {
  const meta = DISCIPLINES[m.discipline];
  return h(`button.mission.${meta.cls}${isDone ? '.is-done' : ''}`,
    { type: 'button', onclick: () => go(`#/mission/${m.id}`) },
    h('div.mission__top',
      h('span.mission__no', TIERS[m.tier].name.replace('Tier ', '')),
      h('span.mission__t', m.title),
    ),
    h('div.mission__b', m.brief.length > 120 ? m.brief.slice(0, 118) + '…' : m.brief),
    h('div.mission__m',
      h('span.chip', meta.name),
      h('span.chip', m.time),
      isDone ? h('span.chip.chip--accent', 'Filed') : null,
    ),
  );
}

function viewMission(id) {
  const m = MISSIONS.find(x => x.id === id);
  if (!m) return go('#/log');
  const meta = DISCIPLINES[m.discipline];
  const isDone = missionDone(m.id);

  const field = h('textarea.field', {
    placeholder: 'Answer the debrief. Write what actually happened, not what should have.',
    rows: 6,
  });

  const saveBtn = h('button.btn.btn--primary.btn--block', { type: 'button' }, 'File the debrief');
  saveBtn.addEventListener('click', () => {
    const body = field.value.trim();
    if (!body) return toast('Nothing written yet.');
    addLog(`${m.title} — ${m.debrief}`, body, m.id);
    buzz(14);
    toast('Filed.');
    go('#/log');
  });

  render(
    h(`div.fade-in.${meta.cls}`,
      h('div.row', { style: { marginBottom: '16px' } },
        h('span.chip.chip--accent', TIERS[m.tier].name),
        h('span.chip', meta.name),
        h('span.chip', m.time),
        isDone ? h('span.chip.chip--accent', 'Filed') : null,
      ),
      h('h1', m.title),
      h('p.prose', { style: { marginTop: '14px' } }, m.brief),

      h('div.section-head', h('span.label', 'Method')),
      h('ol.steps', ...m.steps.map(s => h('li', s))),

      h('div.section-head', h('span.label', 'Debrief')),
      h('div.reveal', h('div.reveal__title', 'Answer this'), h('div', m.debrief)),

      h('div', { style: { marginTop: '14px' } }, field),
      h('div', { style: { marginTop: '10px' } }, saveBtn),
      h('div', { style: { marginTop: '8px' } },
        h('button.btn.btn--ghost.btn--block', { type: 'button', onclick: () => go('#/log') }, 'Back')),
    ),
    { title: 'ASSIGNMENT', back: () => go('#/log') },
  );
  setTab('#/log');
}

/* ============================================================
   PROFILE
   ============================================================ */

function viewProfile() {
  const s = get();
  const r = rank();
  const streak = liveStreak();
  const runs = Object.values(s.runs).reduce((a, b) => a + b, 0);

  const toNext = r.next ? r.next.at - r.total : 0;
  const spanStart = r.at;
  const spanEnd = r.next ? r.next.at : r.total;
  const rankPct = r.next ? (r.total - spanStart) / (spanEnd - spanStart) : 1;

  const meters = Object.entries(DISCIPLINES).map(([key, meta]) => {
    const lv = levelFromXp(s.xp[key] || 0);
    return h(`div.meter.${meta.cls}`,
      h('span.meter__dot'),
      h('span.meter__name', meta.name),
      h('span.meter__bar', h('span.meter__fill', { style: { width: `${Math.round(lv.pct * 100)}%` } })),
      h('span.meter__lv', `L${lv.level}`),
    );
  });

  const exportBtn = h('button.btn.btn--ghost.btn--block', { type: 'button' }, 'Export progress');
  exportBtn.addEventListener('click', () => {
    const text = exportJson();
    const blob = new Blob([text], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = h('a', { href: url, download: `the-cave-${dayKey()}.json` });
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 2000);
    navigator.clipboard?.writeText(text).then(
      () => toast('Downloaded, and copied to the clipboard.'),
      () => toast('Downloaded.'),
    );
  });

  const importInput = h('input', {
    type: 'file', accept: 'application/json,.json', style: { display: 'none' },
  });
  importInput.addEventListener('change', async () => {
    const file = importInput.files?.[0];
    if (!file) return;
    try {
      importJson(await file.text());
      toast('Progress restored.');
      go('#/home');
    } catch (e) {
      toast('That file is not a Cave backup.');
    }
  });

  const importBtn = h('button.btn.btn--ghost.btn--block', {
    type: 'button', onclick: () => importInput.click(),
  }, 'Restore from file');

  // Destructive, so it is marked by a dashed edge rather than by colour.
  const resetBtn = h('button.btn.btn--ghost.btn--block', {
    type: 'button',
    style: { borderStyle: 'dashed', borderColor: 'var(--steel)', color: 'var(--steel)' },
    onclick: () => {
      if (!confirm('Wipe all progress, logs and history? This cannot be undone.')) return;
      reset();
      toast('Everything cleared.');
      go('#/home');
    },
  }, 'Wipe everything');

  render(
    h('div.fade-in',
      h('div.panel', { style: { textAlign: 'center', padding: '24px 18px' } },
        h('div.label', 'Rank'),
        h('h1', { style: { margin: '8px 0 4px', fontSize: '30px' } }, r.name),
        h('div.faint.mono', { style: { fontSize: '12px' } }, `${r.total} XP total`),
        h('div.bar', { style: { margin: '16px 0 8px' } },
          h('div.bar__fill', { style: { width: `${Math.round(rankPct * 100)}%` } })),
        h('div.label', r.next ? `${toNext} XP to ${r.next.name}` : 'Top rank held'),
      ),

      h('div.result-grid', { style: { marginTop: '12px' } },
        h('div.stat', h('div.stat__v', streak), h('div.stat__k', 'Day streak')),
        h('div.stat', h('div.stat__v', s.streak.best || 0), h('div.stat__k', 'Best streak')),
        h('div.stat', h('div.stat__v', runs), h('div.stat__k', 'Sessions')),
      ),

      h('div.section-head', h('span.label', 'Last 28 days')),
      h('div.panel', activityStrip()),

      h('div.section-head', h('span.label', 'Systems')),
      h('div.panel', meters),

      h('div.section-head', h('span.label', 'Drill by drill')),
      ...DRILLS.map(drillProgressCard),

      h('div.section-head', h('span.label', 'Recent')),
      h('div.panel', s.history.length
        ? h('div', ...s.history.slice(-8).reverse().map(x => {
            const d = byId(x.drill);
            return h('div.row.row--between', { style: { padding: '7px 0' } },
              h('span', { style: { fontSize: '14px' } }, d ? d.name : x.drill),
              h('span.mono.faint', { style: { fontSize: '12px' } },
                `${fmtDate(x.ts)} · ${Math.round(x.pct * 100)}%  +${x.xp}`),
            );
          }))
        : h('div.empty', 'No sessions yet.')),

      h('div.section-head', h('span.label', 'Your data')),
      h('div.panel',
        h('p.prose', { style: { fontSize: '13.5px' } },
          'Everything lives on this device only. Nothing is uploaded, and there is no account. That also means clearing your browser data clears this — export a copy if it matters to you.'),
        h('div.stack', { style: { marginTop: '14px' } }, exportBtn, importBtn, importInput, resetBtn),
      ),

      h('div.center.faint.mono', { style: { marginTop: '22px', fontSize: '10.5px', letterSpacing: '.16em' } },
        'THE CAVE · v1.0'),
    ),
    { title: 'PROGRESS' },
  );
  setTab('#/profile');
}

/** A day-by-day strip of training activity — intensity by session count. */
function activityStrip() {
  const days = activity(28);
  const max = Math.max(1, ...days.map(d => d.count));
  const cells = days.map(d => {
    const intensity = d.count === 0 ? 0 : 0.28 + 0.72 * (d.count / max);
    return h('span.spark-day', {
      title: `${d.key} — ${d.count} session${d.count === 1 ? '' : 's'}`,
      style: {
        background: d.count
          ? `rgba(242, 244, 247, ${intensity.toFixed(2)})`
          : 'var(--line)',
      },
    });
  });
  const total = days.reduce((a, b) => a + b.count, 0);
  const active = days.filter(d => d.count).length;
  return h('div',
    h('div.spark-grid', cells),
    h('div.row.row--between', { style: { marginTop: '12px' } },
      h('span.label', `${active} of 28 days`),
      h('span.label', `${total} session${total === 1 ? '' : 's'}`),
    ),
  );
}

/** Per-drill progress: level, path to the next one, trend, sparkline. */
function drillProgressCard(d) {
  const s = get();
  const meta = DISCIPLINES[d.discipline];
  const runs = s.runs[d.id] || 0;
  const lvl = drillLevel(d.id);
  const toNext = toNextLevel(d.id);
  const best = s.bests[d.id];
  const avg = recentAverage(d.id);
  const tr = trend(d.id);
  const line = sparkline(drillScores(d.id));

  if (!runs) {
    return h(`div.panel.${meta.cls}`,
      h('div.row',
        h('span.drill__glyph', svg(d.icon, 20)),
        h('span.grow', h('div.drill__name', d.name), h('div.drill__sub', 'Not attempted yet')),
        h('span.chip', 'LV 1'),
      ),
    );
  }

  const arrow = tr === null ? null
    : tr > 0.04 ? h('span', { style: { color: 'var(--silver-hi)' } }, '↑ improving')
    : tr < -0.04 ? h('span', { style: { color: 'var(--steel)' } }, '↓ slipping')
    : h('span.faint', '▬ steady');

  return h(`div.panel.${meta.cls}`,
    h('div.row',
      h('span.drill__glyph', svg(d.icon, 20)),
      h('span.grow',
        h('div.drill__name', d.name),
        h('div.drill__sub', `${meta.name} · ${runs} run${runs === 1 ? '' : 's'}`),
      ),
      line,
    ),
    h('div.row', { style: { marginTop: '13px', gap: '8px' } },
      h('span.chip.chip--accent', `LEVEL ${lvl}`),
      best !== undefined ? h('span.chip', `best ${Math.round(best * 100)}%`) : null,
      avg !== null ? h('span.chip', `last 5 ${Math.round(avg * 100)}%`) : null,
    ),
    h('div.row.row--between', { style: { marginTop: '11px', fontSize: '12.5px' } },
      h('span.faint',
        toNext === 0
          ? `Level ${MAX_LEVEL} — the ceiling`
          : `${toNext} more run${toNext === 1 ? '' : 's'} at ${Math.round(MASTERY * 100)}%+ to reach level ${lvl + 1}`),
      arrow,
    ),
    h('div.bar', { style: { marginTop: '9px' } },
      h('div.bar__fill', { style: { width: `${Math.round((lvl / MAX_LEVEL) * 100)}%` } })),
  );
}

/* ============================================================
   DRILL RUNNER
   ============================================================ */

function viewDrill(id) {
  const d = byId(id);
  if (!d) return go('#/train');

  const root = h('div');
  const level = drillLevel(d.id);

  render(root, {
    title: d.name.toUpperCase(),
    focusMode: true,
    back: () => {
      if (confirm('Leave the session? Progress in this run is lost.')) go('#/train');
    },
  });

  cleanup = d.mount(root, {
    level,
    finish: (result) => {
      const outcome = recordRun(d.id, d.discipline, result.pct, result.baseXp || 40);
      showResult(d, result, outcome);
    },
  });
}

/** Where this run leaves you: level, distance to the next, recent shape. */
function progressStrip(d, outcome) {
  const lvl = drillLevel(d.id);
  const line = sparkline(drillScores(d.id), { w: 104, hgt: 28 });

  return h('div.panel', { style: { marginTop: '12px' } },
    h('div.row.row--between',
      h('div',
        h('div.label', 'Difficulty'),
        h('div', { style: { marginTop: '5px', fontSize: '15px' } }, `Level ${lvl} of ${MAX_LEVEL}`),
      ),
      line,
    ),
    h('div.bar', { style: { marginTop: '11px' } },
      h('div.bar__fill', { style: { width: `${Math.round((lvl / MAX_LEVEL) * 100)}%` } })),
    h('div.faint', { style: { marginTop: '9px', fontSize: '12.5px' } },
      outcome.toNext === 0
        ? 'You are at the ceiling for this drill.'
        : outcome.strongRun
          ? `Counted as a strong run. ${outcome.toNext} more to level ${lvl + 1}.`
          : `Below ${Math.round(MASTERY * 100)}%, so it does not count towards the next level. ${outcome.toNext} strong run${outcome.toNext === 1 ? '' : 's'} needed.`),
  );
}

function showResult(d, result, outcome) {
  const meta = DISCIPLINES[d.discipline];
  const pctNum = Math.round(result.pct * 100);
  const verdict =
    pctNum >= 90 ? 'Clean.' :
    pctNum >= 70 ? 'Solid.' :
    pctNum >= 45 ? 'Workable.' :
    'Rough — which is the point of doing it again.';

  render(
    h(`div.fade-in.${meta.cls}`,
      h('div.panel', { style: { textAlign: 'center', padding: '26px 18px' } },
        h('div.label', `${meta.name} · ${d.name}`),
        h('div.result-score', { style: { margin: '12px 0 4px' } }, `${pctNum}%`),
        h('div.dim', verdict),
        h('div', { style: { marginTop: '16px' } },
          h('span.xp-pop', `+${outcome.xp} XP`),
        ),
        outcome.drillLevelUp
          ? h('div', { style: { marginTop: '10px' } },
              h('span.chip.chip--accent', `${d.name} is now level ${outcome.drillLevelUp} — it gets harder from here`))
          : null,
        outcome.levelUp
          ? h('div', { style: { marginTop: '10px' } },
              h('span.chip.chip--accent', `${meta.name} reached level ${outcome.levelUp}`))
          : null,
        outcome.best && pctNum > 0
          ? h('div', { style: { marginTop: '10px' } }, h('span.chip.chip--accent', 'Personal best'))
          : null,
      ),

      progressStrip(d, outcome),

      result.stats
        ? h('div.result-grid', ...result.stats.map(st =>
            h('div.stat', h('div.stat__v', String(st.v)), h('div.stat__k', st.k))))
        : null,

      result.note
        ? h('div.reveal', { style: { marginTop: '14px' } },
            h('div.reveal__title', 'Take this with you'),
            h('div', { html: mdish(result.note) }))
        : null,

      dailyComplete()
        ? h('div.panel', { style: { marginTop: '14px', textAlign: 'center' } },
            h('div.label', { style: { color: 'var(--silver-hi)' } }, 'Protocol complete'),
            h('p.prose', { style: { marginTop: '8px' } }, `Streak at ${outcome.streak} day${outcome.streak === 1 ? '' : 's'}.`))
        : null,

      h('div.stack', { style: { marginTop: '20px' } },
        h('button.btn.btn--primary.btn--block', { type: 'button', onclick: () => go(`#/drill/${d.id}`) }, 'Run it again'),
        h('button.btn.btn--ghost.btn--block', { type: 'button', onclick: () => go('#/home') }, 'Back to the cave'),
      ),
    ),
    { title: 'RESULT', focusMode: false },
  );
  setTab('#/home');
  buzz([12, 60, 12]);
}

/* ============================================================
   ROUTER
   ============================================================ */

const ROUTES = [
  [/^#\/home$/,            () => viewHome()],
  [/^#\/train$/,           () => viewTrain()],
  [/^#\/codex$/,           () => viewCodex()],
  [/^#\/codex\/(.+)$/,     (m) => viewLesson(m[1])],
  [/^#\/log$/,             () => viewLog()],
  [/^#\/mission\/(.+)$/,   (m) => viewMission(m[1])],
  [/^#\/profile$/,         () => viewProfile()],
  [/^#\/drill\/(.+)$/,     (m) => viewDrill(m[1])],
];

/** Navigating to the hash you are already on still re-runs the view,
    which is what "Run it again" needs. */
function go(hash) {
  if (location.hash === hash) route();
  else location.hash = hash;
}

function route() {
  if (cleanup) { try { cleanup(); } catch {} cleanup = null; }
  const hash = location.hash || '#/home';
  for (const [re, fn] of ROUTES) {
    const m = hash.match(re);
    if (m) return fn(m);
  }
  viewHome();
}

function setTab(hash) {
  document.querySelectorAll('.tab').forEach(t => {
    t.classList.toggle('is-active', t.dataset.route === hash);
  });
}

function isStandalone() {
  return window.matchMedia?.('(display-mode: standalone)').matches || navigator.standalone === true;
}

/* ============================================================
   BOOT
   ============================================================ */

document.querySelectorAll('.tab').forEach(t => {
  t.addEventListener('click', () => go(t.dataset.route));
});

window.addEventListener('hashchange', route);

if (!location.hash) location.hash = '#/home';
route();

// Stop iOS rubber-banding the whole document while still allowing
// scrollable regions to scroll normally.
document.addEventListener('touchmove', (e) => {
  if (e.touches.length > 1) e.preventDefault();
}, { passive: false });

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js').catch(err => console.warn('[cave] sw failed', err));
  });
}
