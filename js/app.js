/* ============================================================
   app.js — router, views, boot.
   ============================================================ */

import {
  h, svg, ICONS, PICTOS, toast, render, pick, fmtDate, sparkline, buzz,
} from './ui.js';
import { clipping, stamp, dymo, tilt } from './paper.js';
import { t, getLang, setLang, LANGS, locale } from './i18n.js';
import {
  DISCIPLINES, get, reset, dayKey, levelFromXp, rank,
  liveStreak, ensureDaily, dailyComplete, recordRun, addLog, deleteLog,
  markRead, exportJson, importJson, missionDone,
  drillLevel, toNextLevel, drillScores, activity, recentAverage, trend,
  MAX_LEVEL, MASTERY,
} from './store.js';
import { DRILLS, byId, drillIds } from './drills/index.js';
import { LESSONS } from './data/lessons.js';
import { MISSIONS } from './data/missions.js';
import { mission, lesson } from './content.js';
import { mdish } from './drills/shared.js';
import {
  initBody, viewBody, viewBodyTests, viewBodyProgress, viewBodyRules, bodyHomeNodes,
} from './body.js';

const QUOTES = {
  en: [
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
  ],
  nl: [
    'Iedereen vertelt je iets. Bijna niemand zegt het hardop.',
    'De kamer vertelde al iets voordat iemand iets zei.',
    'Zeker weten is een gevoel. Bewijs is iets heel anders.',
    'Je bent niet slecht in opletten. Niemand leerde je ooit waar je eerst moet kijken.',
    'Leer hoe iemand is als er niets op het spel staat. Dat is de hele truc.',
    'Kun je je conclusie niet onderuit halen? Dan is het geen conclusie.',
    'Kijk naar de mensen naar wie niemand kijkt.',
    'Een stilte zegt vaak meer dan de zin.',
    'Wat ontbreekt, heeft ook een vorm. Leer die vorm zien.',
    'Gelijk hebben is mooi. Kalm blijven is de echte kunst.',
  ],
};

let cleanup = null;

/** Discipline and drill display names for the active language. */
const dName = (key) => t(`disc.${key}`);
const dTag = (key) => t(`disc.${key}.tag`);
const drillName = (d) => t(`drill.${d.id}.name`);
const drillBlurb = (d) => t(`drill.${d.id}.blurb`);

/** Static chrome lives in index.html, so it is painted from JS on boot
    and again whenever the language changes. */
function paintChrome() {
  const labels = {
    '#/home': 'tab.home', '#/train': 'tab.train', '#/body': 'tab.body',
    '#/codex': 'tab.codex', '#/log': 'tab.field', '#/profile': 'tab.you',
  };
  document.querySelectorAll('.tab').forEach(tab => {
    const key = labels[tab.dataset.route];
    if (key) tab.querySelector('span').textContent = t(key);
  });
  document.documentElement.lang = getLang();
}

/** The streak counter in the top bar. Cold when no day is running. */
function paintStreak() {
  const n = liveStreak();
  const num = document.getElementById('streakNum');
  if (num) num.textContent = String(n);
  document.getElementById('topStreak')?.classList.toggle('is-cold', n === 0);
}

/* ============================================================
   HOME — the day's memo
   ============================================================ */

function viewHome() {
  const s = get();
  const daily = ensureDaily(drillIds());
  const r = rank();
  const streak = liveStreak();
  const complete = dailyComplete();
  const done = new Set(daily.done);
  const totalRuns = Object.values(s.runs).reduce((a, b) => a + b, 0);

  // The first unfinished drill of the day is the one thing to do next.
  const nextId = daily.drills.find(id => !done.has(id)) || null;
  const nextDrill = nextId ? byId(nextId) : null;

  const rows = daily.drills.map((id) => {
    const d = byId(id);
    if (!d) return null;
    const isDone = done.has(id);
    const isNext = id === nextId;
    return h('li', h(`button.check-row${isDone ? '.is-done' : ''}${isNext ? '.is-next' : ''}`,
      { type: 'button', onclick: () => go(`#/drill/${d.id}`) },
      h('span.check-row__box', isDone ? svg(ICONS.check, 19) : null),
      h('span.grow',
        h('div.check-row__name', isNext ? h('mark', drillName(d)) : drillName(d)),
        h('div.check-row__sub', `${dName(d.discipline)} · ${t('train.level', { n: drillLevel(d.id) })} · ${d.length}`),
      ),
      h('span.check-row__glyph', svg(PICTOS[d.discipline], 22)),
    ));
  });

  // One primary action, always. Never make someone choose where to start.
  const cta = nextDrill
    ? h('button.btn.btn--ink.btn--block.memo__cta', {
        type: 'button',
        onclick: () => go(`#/drill/${nextDrill.id}`),
      }, done.size === 0
        ? t('home.beginWith', { name: drillName(nextDrill), len: nextDrill.length })
        : t('home.continueWith', { name: drillName(nextDrill), len: nextDrill.length }))
    : h('button.btn.btn--pen.btn--block.memo__cta', {
        type: 'button', onclick: () => go('#/train'),
      }, t('home.extra'));

  const memo = h('section.paper.sheet.sheet--holes.memo',
    h('header.sheet__head',
      h('span', t('home.memo')),
      h('span', new Date().toLocaleDateString(locale(), { weekday: 'short', day: 'numeric', month: 'short' })),
    ),
    complete ? stamp(t('home.completeChip'), { big: true, double: true, cls: 'memo__stamp' }) : null,
    h('h1.memo__title', complete ? t('home.complete') : streak > 0 ? t('home.back') : t('home.first')),
    h('p.memo__sub', complete
      ? t('home.completeSub')
      : t('home.left', { n: daily.drills.length - done.size, m: daily.drills.length })),
    h('ol.checklist', rows),
    cta,
    // Shown until the first session is finished, then never again.
    totalRuns === 0
      ? h('div.memo__how',
          h('p', { html: mdish(t('home.new1')) }),
          h('p', { html: mdish(t('home.new2')) }),
          h('p', { html: mdish(t('home.new3')) }),
          h('p.typed', t('home.newHint')))
      : null,
    h('div.sheet__rule', `${t('progress.rank')}: ${t(`rank.${r.name}`)} · ${t('home.streakShort', { n: streak })}`),
  );

  const quote = clipping({ seed: `quote:${dayKey()}`, cls: 'quote-clip', tapes: ['left'], rot: tilt(dayKey(), 1.4), depth: 6 },
    h('p', { style: { margin: '0' } }, `“${pick(QUOTES[getLang()] || QUOTES.en)}”`));

  const todays = MISSIONS[hashDay() % MISSIONS.length];

  const nodes = [
    memo,
    quote,
    // The physical session for today sits beside the mental protocol.
    h('div.desk__body', ...bodyHomeNodes()),
    dymo(t('home.assignment')),
    missionSlip(todays, missionDone(todays.id)),
  ];

  if (!isStandalone()) nodes.push(installNote());

  render(h('div.fade-in.desk', nodes), { title: t('title.home') });
  setTab('#/home');
}

function hashDay() {
  return dayKey().split('-').reduce((a, n) => a * 31 + Number(n), 11);
}

function installNote() {
  const ios = /iphone|ipad|ipod/i.test(navigator.userAgent);
  return h('div.paper.paper--card.sheet',
    h('p.sheet__small', { style: { margin: '0' } },
      ios
        ? [h('b', t('install.title')), t('install.ios'), h('b', t('install.iosBold')), t('install.iosEnd')]
        : [h('b', t('install.title')), t('install.other'), h('b', t('install.otherBold')), t('install.otherOr'),
           h('b', t('install.iosBold')), t('install.otherEnd')]),
  );
}

/* ============================================================
   TRAIN — one folder per skill
   ============================================================ */

function viewTrain() {
  const s = get();

  const nodes = [
    h('section.paper.sheet',
      h('header.sheet__head', h('span', t('train.label')), h('span', t('train.count', { n: DRILLS.length }))),
      h('h1.sheet__title', t('train.heading')),
      h('p.sheet__text', t('train.intro', { max: MAX_LEVEL, mastery: Math.round(MASTERY * 100) })),
      h('p.sheet__small', t('train.intro2')),
    ),
  ];

  for (const [key, meta] of Object.entries(DISCIPLINES)) {
    for (const d of DRILLS.filter(x => x.discipline === key)) {
      const runs = s.runs[d.id] || 0;
      const best = s.bests[d.id];
      const lvl = drillLevel(d.id);
      const toNext = toNextLevel(d.id);
      nodes.push(h(`button.folder.paper.paper--card.${meta.cls}`,
        { type: 'button', onclick: () => go(`#/drill/${d.id}`) },
        h('span.folder__tab', dName(key)),
        h('div.folder__row',
          h('span.folder__glyph', svg(PICTOS[key], 26)),
          h('span.grow',
            h('div.folder__name', drillName(d)),
            h('div.folder__tag', dTag(key)),
          ),
          h('span.folder__lvl', t('train.lv', { n: lvl })),
        ),
        h('div.folder__b', drillBlurb(d)),
        h('div.folder__m',
          t('train.runs', { n: runs }),
          best !== undefined ? t('train.best', { p: Math.round(best * 100) }) : '',
          toNext === 0 ? t('train.ceiling') : t('train.toNext', { n: toNext, lvl: lvl + 1 })),
      ));
    }
  }

  render(h('div.fade-in.desk', nodes), { title: t('title.train') });
  setTab('#/train');
}

/* ============================================================
   CODEX — a file of newspaper clippings
   ============================================================ */

function viewCodex() {
  const s = get();
  const nodes = [
    h('section.paper.sheet',
      h('header.sheet__head', h('span', t('codex.label')), h('span', t('codex.entries', { n: LESSONS.length }))),
      h('h1.sheet__title', t('codex.heading')),
      h('p.sheet__text', t('codex.intro')),
    ),
    ...LESSONS.map((raw, i) => {
      const l = lesson(raw);
      const isRead = s.read.includes(raw.id);
      return clipping({
        seed: raw.id,
        tag: 'button',
        cls: `${DISCIPLINES[raw.discipline].cls}${isRead ? '.is-read' : ''}`,
        props: { onclick: () => go(`#/codex/${raw.id}`) },
      },
        h('div.clip__folio', h('span', dName(l.discipline)), h('span', t('codex.no', { n: i + 1 }))),
        h('h2.clip__head', l.title),
        h('p.clip__deck', l.teaser),
        h('div.clip__foot',
          h('span.clip__mins', t('codex.mins', { n: l.mins })),
          isRead ? stamp(t('codex.read'), { rot: tilt(`read:${raw.id}`, 10) }) : null),
      );
    }),
  ];
  render(h('div.fade-in.desk', nodes), { title: t('title.codex') });
  setTab('#/codex');
}

function viewLesson(id) {
  const raw = LESSONS.find(x => x.id === id);
  if (!raw) return go('#/codex');
  const l = lesson(raw);
  const meta = DISCIPLINES[raw.discipline];
  markRead(raw.id);

  const blocks = l.body.map(b => {
    if (b.h) return h('h2', b.h);
    if (b.p) return h('p', { html: mdish(b.p) });
    if (b.ul) return h('ul', ...b.ul.map(li => h('li', { html: mdish(li) })));
    if (b.pull) return h('div.pull', { html: mdish(b.pull) });
    if (b.myth) return h('div.myth', h('span.myth__t', t('codex.myth')), h('div', { html: mdish(b.myth) }));
    return null;
  }).filter(Boolean);

  const idx = LESSONS.indexOf(raw);
  const next = LESSONS[idx + 1] ? lesson(LESSONS[idx + 1]) : null;

  render(
    h(`div.fade-in.desk.${meta.cls}`,
      clipping({ seed: `article:${raw.id}`, cls: 'article-clip', rot: '0deg', tapes: ['left', 'right'], depth: 8 },
        h('div.clip__folio', h('span', dName(l.discipline)), h('span', t('codex.minRead', { n: l.mins }))),
        h('h1.clip__head', l.title),
        h('p.clip__deck', l.teaser),
        h('div.news', blocks),
      ),
      next
        ? h('button.btn.btn--ghost.btn--block', { type: 'button', onclick: () => go(`#/codex/${next.id}`) }, t('codex.next', { title: next.title }))
        : h('button.btn.btn--ghost.btn--block', { type: 'button', onclick: () => go('#/codex') }, t('codex.back')),
    ),
    { title: t('title.codex'), back: () => go('#/codex') },
  );
  setTab('#/codex');
}

/* ============================================================
   FIELD — assignment slips and the logbook
   ============================================================ */

function viewLog() {
  const s = get();
  const done = new Set(s.missions);

  const byTier = { 1: [], 2: [], 3: [] };
  for (const m of MISSIONS) byTier[m.tier].push(m);

  // One mission is put forward each day so there is always a default move.
  const todays = MISSIONS[hashDay() % MISSIONS.length];

  const nodes = [
    h('section.paper.sheet',
      h('header.sheet__head', h('span', t('field.label')), h('span', `${done.size}/${MISSIONS.length}`)),
      h('h1.sheet__title', t('field.heading')),
      h('p.sheet__text', t('field.intro')),
    ),
    dymo(t('field.today')),
    missionSlip(todays, done.has(todays.id)),
  ];

  for (const tier of [1, 2, 3]) {
    nodes.push(
      dymo(t(`tier.${tier}`), `${byTier[tier].filter(m => done.has(m.id)).length}/${byTier[tier].length}`),
      h('p.desk__note', t(`tier.${tier}note`)),
      ...byTier[tier].map(m => missionSlip(m, done.has(m.id))),
    );
  }

  nodes.push(
    dymo(t('field.logbook'), s.log.length),
    h('section.notebook', s.log.length
      ? s.log.map(e => h('div.log-entry',
          h('div.log-entry__d',
            h('span', fmtDate(e.ts)),
            h('button.log-del', {
              type: 'button',
              onclick: () => {
                if (!confirm(t('field.deleteConfirm'))) return;
                deleteLog(e.ts);
                viewLog();
              },
            }, t('field.delete')),
          ),
          h('div.log-entry__q', e.prompt),
          h('div.log-entry__b', e.body),
        ))
      : h('div.notebook__empty', t('field.nothing'))),
  );

  render(h('div.fade-in.desk', nodes), { title: t('title.field') });
  setTab('#/log');
}

/** An assignment slip, torn off the pad. */
function missionSlip(m, isDone) {
  const tm = mission(m);
  return h(`button.slip${isDone ? '.is-done' : ''}.${DISCIPLINES[m.discipline].cls}`,
    { type: 'button', onclick: () => go(`#/mission/${m.id}`) },
    h('div.slip__top', h('span', t('doc.assignment')), h('span', t(`tier.${m.tier}`))),
    h('div.slip__t', tm.title),
    h('div.slip__b', tm.brief.length > 120 ? tm.brief.slice(0, 118) + '…' : tm.brief),
    h('div.slip__m',
      h('span', `${dName(m.discipline)} · ${tm.time}`),
      isDone ? stamp(t('mission.filed'), { rot: tilt(`done:${m.id}`, 9) }) : null),
  );
}

function viewMission(id) {
  const raw = MISSIONS.find(x => x.id === id);
  if (!raw) return go('#/log');
  const m = mission(raw);
  const meta = DISCIPLINES[raw.discipline];
  const isDone = missionDone(raw.id);

  const field = h('textarea.field.field--paper', { placeholder: t('mission.placeholder'), rows: 7 });

  const saveBtn = h('button.btn.btn--primary.btn--block', { type: 'button' }, t('mission.file'));
  saveBtn.addEventListener('click', () => {
    const body = field.value.trim();
    if (!body) return toast(t('mission.empty'));
    addLog(`${m.title} — ${m.debrief}`, body, raw.id);
    buzz(14);
    toast(t('mission.saved'));
    go('#/log');
  });

  render(
    h(`div.fade-in.desk.${meta.cls}`,
      h('article.paper.sheet.sheet--holes',
        h('header.sheet__head', h('span', t('doc.assignment')), h('span', t(`tier.${raw.tier}`))),
        isDone ? stamp(t('doc.filed'), { big: true, cls: 'memo__stamp' }) : null,
        h('h1.sheet__title', m.title),
        h('p.sheet__small.typed', `${dName(raw.discipline)} · ${m.time}`),
        h('p.sheet__text', { style: { marginTop: '10px' } }, m.brief),
        h('div.sheet__rule', t('mission.method')),
        h('ol.steps-typed', ...m.steps.map(st => h('li', st))),
        h('div.sheet__rule', t('mission.debrief')),
        h('p.debrief-q', m.debrief),
      ),
      field,
      h('div.stack', saveBtn,
        h('button.btn.btn--ghost.btn--block', { type: 'button', onclick: () => go('#/log') }, t('mission.back'))),
    ),
    { title: t('title.mission'), back: () => go('#/log') },
  );
  setTab('#/log');
}

/* ============================================================
   PROFILE — the personnel file
   ============================================================ */

function viewProfile() {
  const s = get();
  const r = rank();
  const streak = liveStreak();
  const runs = Object.values(s.runs).reduce((a, b) => a + b, 0);

  const toNext = r.next ? r.next.at - r.total : 0;
  const rankPct = r.next ? (r.total - r.at) / (r.next.at - r.at) : 1;
  const fileNo = String(Math.floor((s.createdAt || 0) / 86400000) % 10000).padStart(4, '0');

  const skills = Object.keys(DISCIPLINES).map((key) => {
    const lv = levelFromXp(s.xp[key] || 0);
    return h('div.skill-row',
      h('span.skill-row__n', dName(key)),
      h('div.inkbar', h('div.inkbar__fill', { style: { width: `${Math.round(lv.pct * 100)}%` } })),
      h('span.skill-row__lv', t('train.lv', { n: lv.level })),
    );
  });

  // Language switcher. Repaints the static chrome and re-renders in place.
  const langRow = h('div.row', { style: { gap: '8px', marginTop: '10px' } },
    ...Object.entries(LANGS).map(([code, meta]) =>
      h(`button.btn.btn--sm${getLang() === code ? '.btn--ink' : '.btn--pen'}`,
        {
          type: 'button',
          style: { flex: '1' },
          onclick: () => {
            if (getLang() === code) return;
            setLang(code);
            paintChrome();
            viewProfile();
          },
        }, meta.name)),
  );

  const exportBtn = h('button.btn.btn--pen.btn--block', { type: 'button' }, t('data.export'));
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
      () => toast(t('data.downloadedCopied')),
      () => toast(t('data.downloaded')),
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
      toast(t('data.restored'));
      go('#/home');
    } catch (e) {
      toast(t('data.badFile'));
    }
  });

  const importBtn = h('button.btn.btn--pen.btn--block', {
    type: 'button', onclick: () => importInput.click(),
  }, t('data.restore'));

  // Destructive, so it is marked by a dashed edge rather than by colour.
  const resetBtn = h('button.btn.btn--pen.btn--block', {
    type: 'button',
    style: { borderStyle: 'dashed' },
    onclick: () => {
      if (!confirm(t('data.wipeConfirm'))) return;
      reset();
      toast(t('data.wiped'));
      go('#/home');
    },
  }, t('data.wipe'));

  render(
    h('div.fade-in.desk',
      h('section.paper.sheet.sheet--holes',
        h('header.sheet__head', h('span', t('pf.title')), h('span', `${t('pf.no')} ${fileNo}`)),
        h('div.pf__rank',
          h('span.typed', { style: { fontSize: '13px', color: 'var(--ink-3)' } }, `${t('progress.rank')}:`),
          stamp(t(`rank.${r.name}`), { big: true, double: true }),
        ),
        h('div.pf__xp', r.next
          ? `${t('progress.xpTotal', { n: r.total })} · ${t('progress.xpTo', { n: toNext, rank: t(`rank.${r.next.name}`) })}`
          : `${t('progress.xpTotal', { n: r.total })} · ${t('progress.topRank')}`),
        h('div.inkbar', h('div.inkbar__fill', { style: { width: `${Math.round(rankPct * 100)}%` } })),
        h('table.pf__table', h('tbody', h('tr',
          h('td', h('div.pf__v', String(streak)), h('div.pf__k', t('progress.dayStreak'))),
          h('td', h('div.pf__v', String(s.streak.best || 0)), h('div.pf__k', t('progress.bestStreak'))),
          h('td', h('div.pf__v', String(runs)), h('div.pf__k', t('progress.sessions'))),
        ))),
        h('div.sheet__rule', t('progress.systems')),
        skills,
      ),

      activitySheet(),

      dymo(t('progress.drillByDrill')),
      ...DRILLS.map(drillProgressCard),

      h('section.paper.sheet',
        h('header.sheet__head', h('span', t('progress.recent')), h('span', '')),
        s.history.length
          ? s.history.slice(-8).reverse().map(x => {
              const d = byId(x.drill);
              return h('div.recent-row',
                h('span', d ? drillName(d) : x.drill),
                h('span.recent-row__m', `${fmtDate(x.ts)} · ${Math.round(x.pct * 100)}% · +${x.xp}`),
              );
            })
          : h('p.sheet__small', { style: { marginTop: '10px' } }, t('progress.noSessions')),
      ),

      h('section.paper.paper--card.sheet',
        h('header.sheet__head', h('span', t('settings.label')), h('span', t('settings.language'))),
        langRow,
        h('p.sheet__small', { style: { marginTop: '10px' } }, t('settings.languageNote')),
      ),

      h('section.paper.paper--card.sheet',
        h('header.sheet__head', h('span', t('data.label')), h('span', '')),
        h('p.sheet__small', { style: { marginTop: '10px' } }, t('data.note')),
        h('div.stack', { style: { marginTop: '14px' } }, exportBtn, importBtn, importInput, resetBtn),
      ),

      h('div.center.faint.mono', { style: { fontSize: '10.5px', letterSpacing: '.16em' } }, 'THE CAVE · v1.1'),
    ),
    { title: t('title.progress') },
  );
  setTab('#/profile');
}

/** The last 28 days as a calendar page, each training day stamped in ink. */
function activitySheet() {
  const days = activity(28);
  const max = Math.max(1, ...days.map(d => d.count));
  const today = dayKey();
  const cells = days.map(d => {
    const o = d.count === 0 ? 0 : 0.38 + 0.62 * (d.count / max);
    return h(`div.cal__d${d.key === today ? '.is-today' : ''}`,
      { title: t('progress.dayCount', { d: d.key, n: d.count }) },
      String(d.day),
      h('i', { style: { '--o': o.toFixed(2), '--r': tilt(`cal:${d.key}`, 8) } }));
  });
  const total = days.reduce((a, b) => a + b.count, 0);
  const active = days.filter(d => d.count).length;
  return h('section.paper.sheet',
    h('header.sheet__head', h('span', t('progress.last28')), h('span', t('progress.ofDays', { n: active }))),
    h('div.cal', { style: { marginTop: '12px' } }, cells),
    h('div.cal__foot', h('span', t('progress.sessionCount', { n: total })), h('span', t('progress.inkKey'))),
  );
}

/** Per-drill progress: level, path to the next one, trend, sparkline. */
function drillProgressCard(d) {
  const s = get();
  const runs = s.runs[d.id] || 0;
  const lvl = drillLevel(d.id);
  const toNext = toNextLevel(d.id);
  const best = s.bests[d.id];
  const avg = recentAverage(d.id);
  const tr = trend(d.id);
  const line = runs ? sparkline(drillScores(d.id), { color: 'var(--ink-black)' }) : null;

  const arrow = tr === null ? null
    : tr > 0.04 ? t('progress.improving')
    : tr < -0.04 ? t('progress.slipping')
    : t('progress.steady');

  return h(`section.paper.paper--card.sheet.pcard.${DISCIPLINES[d.discipline].cls}`,
    h('div.pcard__row',
      h('span.folder__glyph', svg(PICTOS[d.discipline], 24)),
      h('span.grow',
        h('div.folder__name', { style: { fontSize: '18px' } }, drillName(d)),
        h('div.folder__tag', runs ? `${dName(d.discipline)} · ${t('train.runs', { n: runs })}` : t('progress.notAttempted')),
      ),
      line,
      h('span.folder__lvl', t('train.lv', { n: lvl })),
    ),
    runs
      ? h('div.pcard__m',
          best !== undefined ? h('span', `${t('progress.best')} ${Math.round(best * 100)}%`) : null,
          avg !== null ? h('span', `${t('progress.avg')} ${Math.round(avg * 100)}%`) : null,
          arrow ? h('span', arrow) : null)
      : null,
    runs
      ? h('div.pcard__note', toNext === 0
          ? t('progress.atCeiling', { max: MAX_LEVEL })
          : t('progress.needMore', { n: toNext, mastery: Math.round(MASTERY * 100), lvl: lvl + 1 }))
      : null,
    h('div.inkbar', { style: { marginTop: '10px' } },
      h('div.inkbar__fill', { style: { width: `${Math.round((lvl / MAX_LEVEL) * 100)}%` } })),
  );
}

/* ============================================================
   DRILL RUNNER
   ============================================================ */

function viewDrill(id) {
  const d = byId(id);
  if (!d) return go('#/train');

  // Everything a drill draws lands on the desk as paperwork (.case).
  const root = h(`div.case.${DISCIPLINES[d.discipline].cls}`);
  const level = drillLevel(d.id);

  render(root, {
    title: drillName(d).toUpperCase(),
    focusMode: true,
    back: () => {
      if (confirm(t('result.leaveConfirm'))) go('#/train');
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

/** The result, filed as a report. */
function showResult(d, result, outcome) {
  const meta = DISCIPLINES[d.discipline];
  const pctNum = Math.round(result.pct * 100);
  const band = pctNum >= 90 ? 'clean' : pctNum >= 70 ? 'solid' : pctNum >= 45 ? 'workable' : 'rough';
  const lvl = drillLevel(d.id);
  const line = sparkline(drillScores(d.id), { w: 104, hgt: 28, color: 'var(--ink-black)' });

  const stamps = [
    outcome.drillLevelUp ? stamp(t('result.drillLevelUp', { name: drillName(d), n: outcome.drillLevelUp }), { land: true }) : null,
    outcome.levelUp ? stamp(t('result.disciplineLevelUp', { name: dName(d.discipline), n: outcome.levelUp }), { land: true }) : null,
    outcome.best && pctNum > 0 ? stamp(t('result.personalBest'), { land: true, double: true }) : null,
  ].filter(Boolean);

  render(
    h(`div.fade-in.desk.case.${meta.cls}`,
      h('article.paper.sheet.sheet--holes.report',
        h('header.sheet__head', h('span', t('result.report')), h('span', drillName(d))),
        h('div.report__score',
          h('div.report__pct', `${pctNum}%`),
          stamp(t(`result.s.${band}`), { big: true, double: band === 'clean', land: true, rot: '-8deg' }),
        ),
        h('p.report__verdict', `${t(`result.${band}`)} ${t('result.xp', { n: outcome.xp })}.`),
        stamps.length ? h('div.report__stamps', stamps) : null,

        result.stats
          ? h('table.report__table', { style: { marginTop: '16px' } }, h('tbody', h('tr',
              ...result.stats.map(st => h('td', h('div.pf__v', { style: { fontSize: '20px' } }, String(st.v)), h('div.pf__k', st.k))))))
          : null,

        h('div.sheet__rule', t('result.difficulty')),
        h('div.report__level',
          h('span.typed', t('result.levelOf', { n: lvl, max: MAX_LEVEL })),
          line,
        ),
        h('div.inkbar', h('div.inkbar__fill', { style: { width: `${Math.round((lvl / MAX_LEVEL) * 100)}%` } })),
        h('p.report__note',
          outcome.toNext === 0
            ? t('result.ceiling')
            : outcome.strongRun
              ? t('result.strongRun', { n: outcome.toNext, lvl: lvl + 1 })
              : t('result.weakRun', { mastery: Math.round(MASTERY * 100), n: outcome.toNext })),

        result.note
          ? [h('div.sheet__rule', t('result.takeaway')), h('p.sheet__text', { html: mdish(result.note) })]
          : null,

        dailyComplete()
          ? [h('div.sheet__rule', t('result.protocolComplete')),
             h('p.sheet__text', t('home.streakAt', { n: outcome.streak }))]
          : null,
      ),

      h('div.stack',
        h('button.btn.btn--primary.btn--block', { type: 'button', onclick: () => go(`#/drill/${d.id}`) }, t('result.again')),
        h('button.btn.btn--ghost.btn--block', { type: 'button', onclick: () => go('#/home') }, t('result.backHome')),
      ),
    ),
    { title: t('title.result'), focusMode: false },
  );
  setTab('#/home');
  paintStreak();
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
  [/^#\/body$/,            () => viewBody()],
  [/^#\/body\/tests$/,     () => viewBodyTests()],
  [/^#\/body\/progress$/,  () => viewBodyProgress()],
  [/^#\/body\/rules$/,     () => viewBodyRules()],
];

/** Navigating to the hash you are already on still re-runs the view,
    which is what "Run it again" needs. */
function go(hash) {
  if (location.hash === hash) route();
  else location.hash = hash;
}

function route() {
  if (cleanup) { try { cleanup(); } catch {} cleanup = null; }
  paintStreak();
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

initBody({ go, setTab, paintStreak });
paintChrome();
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
