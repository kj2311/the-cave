/* ============================================================
   app.js — router, views, boot.
   ============================================================ */

import {
  h, svg, ICONS, PICTOS, toast, render, pick, fmtDate, ringSvg, sparkline, buzz,
} from './ui.js';
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

/** Discipline and drill display names for the active language. */
const dName = (key) => t(`disc.${key}`);
const dTag = (key) => t(`disc.${key}.tag`);
const drillName = (d) => t(`drill.${d.id}.name`);
const drillBlurb = (d) => t(`drill.${d.id}.blurb`);

/** Static chrome lives in index.html, so it is painted from JS on boot
    and again whenever the language changes. */
function paintChrome() {
  const labels = {
    '#/home': 'tab.home', '#/train': 'tab.train', '#/codex': 'tab.codex',
    '#/log': 'tab.field', '#/profile': 'tab.you',
  };
  document.querySelectorAll('.tab').forEach(tab => {
    const key = labels[tab.dataset.route];
    if (key) tab.querySelector('span').textContent = t(key);
  });
  document.documentElement.lang = getLang();
}

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
      h('span.label', new Date().toLocaleDateString(locale(), { weekday: 'long', day: 'numeric', month: 'long' })),
      h('span.label', t(`rank.${r.name}`)),
    ),
    h('div.row',
      h('div.grow',
        h('h1', complete ? t('home.complete') : streak > 0 ? t('home.back') : t('home.first')),
        h('p.prose', { style: { marginTop: '6px' } },
          complete
            ? t('home.completeSub')
            : t('home.left', { n: daily.drills.length - done.size, m: daily.drills.length })),
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
    h('div.section-head', h('span.label', t('home.protocol'))),
    ...protocol,
  ];

  if (complete) {
    nodes.push(h('div.panel', { style: { marginTop: '12px' } },
      h('div.row',
        h('span.chip.chip--accent', t('home.completeChip')),
        h('span.faint', { style: { fontSize: '13.5px' } }, t('home.streakAt', { n: streak })),
      ),
    ));
  }

  const todays = MISSIONS[hashDay() % MISSIONS.length];
  const tm = mission(todays);
  nodes.push(
    h('div.section-head', h('span.label', t('home.assignment'))),
    h(`button.drill.${DISCIPLINES[todays.discipline].cls}`,
      { type: 'button', onclick: () => go(`#/mission/${todays.id}`) },
      h('span.drill__glyph', svg(PICTOS[todays.discipline], 20)),
      h('span.grow',
        h('div.drill__name', tm.title),
        h('div.drill__sub', `${t(`tier.${todays.tier}`)} · ${dName(todays.discipline)} · ${tm.time}`),
      ),
      missionDone(todays.id)
        ? h('span.drill__tick', svg(ICONS.check, 17))
        : h('span.drill__chev', svg(ICONS.chevron, 17)),
    ),
  );

  if (!isStandalone()) nodes.push(installNote());

  render(h('div.fade-in', nodes), { title: t('title.home') });
  setTab('#/home');
}

function hashDay() {
  return dayKey().split('-').reduce((a, n) => a * 31 + Number(n), 11);
}

function drillCard(d, isDone) {
  const lvl = drillLevel(d.id);
  return h(`button.drill.${DISCIPLINES[d.discipline].cls}${isDone ? '.is-done' : ''}`,
    { type: 'button', onclick: () => go(`#/drill/${d.id}`) },
    h('span.drill__glyph', svg(PICTOS[d.discipline], 20)),
    h('span.grow',
      h('div.drill__name', drillName(d)),
      h('div.drill__sub', `${dName(d.discipline)} · ${t('train.level', { n: lvl })} · ${d.length}`),
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
      ? h('div', h('b', t('install.title')), t('install.ios'),
          h('b', t('install.iosBold')), t('install.iosEnd'))
      : h('div', h('b', t('install.title')), t('install.other'),
          h('b', t('install.otherBold')), t('install.otherOr'),
          h('b', t('install.iosBold')), t('install.otherEnd')),
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
      h('div.label', t('train.label')),
      h('h2', { style: { margin: '8px 0 8px' } }, t('train.heading')),
      h('p.prose', t('train.intro', { max: MAX_LEVEL, mastery: Math.round(MASTERY * 100) })),
      h('p.prose.faint', { style: { fontSize: '13.5px' } }, t('train.intro2')),
    ),
  ];

  for (const [key, meta] of Object.entries(DISCIPLINES)) {
    const list = byDiscipline[key] || [];
    if (!list.length) continue;
    const lv = levelFromXp(s.xp[key] || 0);
    nodes.push(
      h(`div.section-head.${meta.cls}`,
        h('span.label', dName(key)),
        h('span.label', { style: { color: 'var(--gold)' } }, t('train.lv', { n: lv.level })),
      ),
      h('p.faint', { style: { fontSize: '13px', margin: '0 2px 10px' } }, dTag(key)),
      ...list.map(d => {
        const runs = s.runs[d.id] || 0;
        const best = s.bests[d.id];
        const lvl = drillLevel(d.id);
        const toNext = toNextLevel(d.id);
        return h(`button.drill.${meta.cls}`, { type: 'button', onclick: () => go(`#/drill/${d.id}`) },
          h('span.drill__glyph', svg(PICTOS[d.discipline], 20)),
          h('span.grow',
            h('div.row',
              h('div.drill__name.grow', drillName(d)),
              h('span.chip.chip--accent', t('train.lv', { n: lvl })),
            ),
            h('div.drill__sub', drillBlurb(d)),
            h('div.drill__sub', { style: { marginTop: '4px', opacity: .8 } },
              t('train.runs', { n: runs }),
              best !== undefined ? t('train.best', { p: Math.round(best * 100) }) : '',
              toNext === 0
                ? t('train.ceiling')
                : t('train.toNext', { n: toNext, lvl: lvl + 1 })),
          ),
          h('span.drill__chev', svg(ICONS.chevron, 18)),
        );
      }),
    );
  }

  render(h('div.fade-in', nodes), { title: t('title.train') });
  setTab('#/train');
}

/* ============================================================
   CODEX
   ============================================================ */

function viewCodex() {
  const s = get();
  const nodes = [
    h('div.panel',
      h('div.label', t('codex.label')),
      h('h2', { style: { margin: '8px 0 8px' } }, t('codex.heading')),
      h('p.prose', t('codex.intro')),
    ),
    h('div.section-head', h('span.label', t('codex.entries', { n: LESSONS.length }))),
    ...LESSONS.map(raw => {
      const l = lesson(raw);
      const meta = DISCIPLINES[raw.discipline];
      const isRead = s.read.includes(raw.id);
      return h(`button.lesson-card.${meta.cls}${isRead ? '.is-read' : ''}`,
        { type: 'button', onclick: () => go(`#/codex/${raw.id}`) },
        h('div.lesson-card__t', l.title),
        h('div.lesson-card__d', l.teaser),
        h('div.lesson-card__m',
          h('span.chip.chip--accent', dName(l.discipline)),
          h('span.chip', t('codex.mins', { n: l.mins })),
          isRead ? h('span.chip.chip--accent', t('codex.read')) : null,
        ),
      );
    }),
  ];
  render(h('div.fade-in', nodes), { title: t('title.codex') });
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
    if (b.myth) return h('div.reveal.reveal--myth',
      h('div.reveal__title', 'Correction'), h('div', { html: mdish(b.myth) }));
    return null;
  }).filter(Boolean);

  const idx = LESSONS.indexOf(raw);
  const next = LESSONS[idx + 1] ? lesson(LESSONS[idx + 1]) : null;

  render(
    h(`div.fade-in.${meta.cls}`,
      h('div.row', { style: { marginBottom: '14px' } },
        h('span.chip.chip--accent', dName(l.discipline)),
        h('span.chip', t('codex.minRead', { n: l.mins })),
      ),
      h('h1', l.title),
      h('div.article.prose', { style: { marginTop: '16px' } }, blocks),
      h('div', { style: { marginTop: '28px' } },
        next
          ? h('button.btn.btn--ghost.btn--block', { type: 'button', onclick: () => go(`#/codex/${next.id}`) }, t('codex.next', { title: next.title }))
          : h('button.btn.btn--ghost.btn--block', { type: 'button', onclick: () => go('#/codex') }, t('codex.back')),
      ),
    ),
    { title: t('title.codex'), back: () => go('#/codex') },
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
      h('div.label', t('field.label')),
      h('h2', { style: { margin: '10px 0 10px' } }, t('field.heading')),
      h('p.prose', t('field.intro')),
    ),

    h('div.section-head', h('span.label', t('field.today'))),
    missionCard(todays, done.has(todays.id)),
  ];

  for (const tier of [1, 2, 3]) {
    nodes.push(
      h('div.section-head',
        h('span.label', t(`tier.${tier}`)),
        h('span.label', `${byTier[tier].filter(m => done.has(m.id)).length}/${byTier[tier].length}`),
      ),
      h('p.faint', { style: { fontSize: '13px', margin: '0 0 12px' } }, t(`tier.${tier}note`)),
      ...byTier[tier].map(m => missionCard(m, done.has(m.id))),
    );
  }

  nodes.push(
    h('div.section-head', h('span.label', t('field.filed', { n: s.log.length }))),
    h('div.panel', s.log.length
      ? s.log.map(e => h('div.entry',
          h('div.row.row--between',
            h('span.entry__d', fmtDate(e.ts)),
            h('button.btn.btn--ghost.btn--sm', {
              type: 'button',
              onclick: () => {
                if (!confirm(t('field.deleteConfirm'))) return;
                deleteLog(e.ts);
                viewLog();
              },
            }, t('field.delete')),
          ),
          h('div.entry__q', e.prompt),
          h('div.entry__b', e.body),
        ))
      : h('div.empty', t('field.nothing'))),
  );

  render(h('div.fade-in', nodes), { title: t('title.field') });
  setTab('#/log');
}

function missionCard(m, isDone) {
  const meta = DISCIPLINES[m.discipline];
  const tm = mission(m);
  return h(`button.mission.${meta.cls}${isDone ? '.is-done' : ''}`,
    { type: 'button', onclick: () => go(`#/mission/${m.id}`) },
    h('div.mission__top',
      h('span.mission__no', t(`tier.${m.tier}`).replace(/^(Tier|Niveau)\s*/, '')),
      h('span.mission__t', tm.title),
    ),
    h('div.mission__b', tm.brief.length > 120 ? tm.brief.slice(0, 118) + '…' : tm.brief),
    h('div.mission__m',
      h('span.chip', dName(m.discipline)),
      h('span.chip', tm.time),
      isDone ? h('span.chip.chip--accent', t('mission.filed')) : null,
    ),
  );
}

function viewMission(id) {
  const raw = MISSIONS.find(x => x.id === id);
  if (!raw) return go('#/log');
  const m = mission(raw);
  const meta = DISCIPLINES[raw.discipline];
  const isDone = missionDone(raw.id);

  const field = h('textarea.field', { placeholder: t('mission.placeholder'), rows: 6 });

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
    h(`div.fade-in.${meta.cls}`,
      h('div.row', { style: { marginBottom: '16px' } },
        h('span.chip.chip--accent', t(`tier.${raw.tier}`)),
        h('span.chip', dName(raw.discipline)),
        h('span.chip', m.time),
        isDone ? h('span.chip.chip--accent', t('mission.filed')) : null,
      ),
      h('h1', m.title),
      h('p.prose', { style: { marginTop: '14px' } }, m.brief),

      h('div.section-head', h('span.label', t('mission.method'))),
      h('ol.steps', ...m.steps.map(s => h('li', s))),

      h('div.section-head', h('span.label', t('mission.debrief'))),
      h('div.reveal', h('div.reveal__title', t('mission.answerThis')), h('div', m.debrief)),

      h('div', { style: { marginTop: '14px' } }, field),
      h('div', { style: { marginTop: '10px' } }, saveBtn),
      h('div', { style: { marginTop: '8px' } },
        h('button.btn.btn--ghost.btn--block', { type: 'button', onclick: () => go('#/log') }, t('mission.back'))),
    ),
    { title: t('title.mission'), back: () => go('#/log') },
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
      h('span.meter__name', dName(key)),
      h('span.meter__bar', h('span.meter__fill', { style: { width: `${Math.round(lv.pct * 100)}%` } })),
      h('span.meter__lv', `L${lv.level}`),
    );
  });

  // Language switcher. Repaints the static chrome and re-renders in place.
  const langRow = h('div.row', { style: { gap: '8px', marginTop: '12px' } },
    ...Object.entries(LANGS).map(([code, meta]) =>
      h(`button.btn.btn--sm${getLang() === code ? '.btn--primary' : '.btn--ghost'}`,
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

  const exportBtn = h('button.btn.btn--ghost.btn--block', { type: 'button' }, t('data.export'));
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

  const importBtn = h('button.btn.btn--ghost.btn--block', {
    type: 'button', onclick: () => importInput.click(),
  }, t('data.restore'));

  // Destructive, so it is marked by a dashed edge rather than by colour.
  const resetBtn = h('button.btn.btn--ghost.btn--block', {
    type: 'button',
    style: { borderStyle: 'dashed', borderColor: 'var(--steel)', color: 'var(--steel)' },
    onclick: () => {
      if (!confirm(t('data.wipeConfirm'))) return;
      reset();
      toast(t('data.wiped'));
      go('#/home');
    },
  }, t('data.wipe'));

  render(
    h('div.fade-in',
      h('div.panel', { style: { textAlign: 'center', padding: '24px 18px' } },
        h('div.label', t('progress.rank')),
        h('h1', { style: { margin: '8px 0 4px', fontSize: '30px' } }, t(`rank.${r.name}`)),
        h('div.faint.mono', { style: { fontSize: '12px' } }, t('progress.xpTotal', { n: r.total })),
        h('div.bar', { style: { margin: '16px 0 8px' } },
          h('div.bar__fill', { style: { width: `${Math.round(rankPct * 100)}%` } })),
        h('div.label', r.next
          ? t('progress.xpTo', { n: toNext, rank: t(`rank.${r.next.name}`) })
          : t('progress.topRank')),
      ),

      h('div.result-grid', { style: { marginTop: '12px' } },
        h('div.stat', h('div.stat__v', streak), h('div.stat__k', t('progress.dayStreak'))),
        h('div.stat', h('div.stat__v', s.streak.best || 0), h('div.stat__k', t('progress.bestStreak'))),
        h('div.stat', h('div.stat__v', runs), h('div.stat__k', t('progress.sessions'))),
      ),

      h('div.section-head', h('span.label', t('progress.last28'))),
      h('div.panel', activityStrip()),

      h('div.section-head', h('span.label', t('progress.systems'))),
      h('div.panel', meters),

      h('div.section-head', h('span.label', t('progress.drillByDrill'))),
      ...DRILLS.map(drillProgressCard),

      h('div.section-head', h('span.label', t('settings.label'))),
      h('div.panel',
        h('div.label', t('settings.language')),
        langRow,
        h('p.prose.faint', { style: { fontSize: '13px', marginTop: '12px' } }, t('settings.languageNote')),
      ),

      h('div.section-head', h('span.label', t('progress.recent'))),
      h('div.panel', s.history.length
        ? h('div', ...s.history.slice(-8).reverse().map(x => {
            const d = byId(x.drill);
            return h('div.row.row--between', { style: { padding: '7px 0' } },
              h('span', { style: { fontSize: '14px' } }, d ? d.name : x.drill),
              h('span.mono.faint', { style: { fontSize: '12px' } },
                `${fmtDate(x.ts)} · ${Math.round(x.pct * 100)}%  +${x.xp}`),
            );
          }))
        : h('div.empty', t('progress.noSessions'))),

      h('div.section-head', h('span.label', t('data.label'))),
      h('div.panel',
        h('p.prose', { style: { fontSize: '13.5px' } }, t('data.note')),
        h('div.stack', { style: { marginTop: '14px' } }, exportBtn, importBtn, importInput, resetBtn),
      ),

      h('div.center.faint.mono', { style: { marginTop: '22px', fontSize: '10.5px', letterSpacing: '.16em' } },
        'THE CAVE · v1.0'),
    ),
    { title: t('title.progress') },
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
      h('span.label', t('progress.ofDays', { n: active })),
      h('span.label', t('progress.sessionCount', { n: total })),
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
        h('span.drill__glyph', svg(PICTOS[d.discipline], 20)),
        h('span.grow', h('div.drill__name', drillName(d)), h('div.drill__sub', t('progress.notAttempted'))),
        h('span.chip', t('train.lv', { n: 1 })),
      ),
    );
  }

  const arrow = tr === null ? null
    : tr > 0.04 ? h('span', { style: { color: 'var(--silver-hi)' } }, t('progress.improving'))
    : tr < -0.04 ? h('span', { style: { color: 'var(--steel)' } }, t('progress.slipping'))
    : h('span.faint', t('progress.steady'));

  return h(`div.panel.${meta.cls}`,
    h('div.row',
      h('span.drill__glyph', svg(PICTOS[d.discipline], 20)),
      h('span.grow',
        h('div.drill__name', drillName(d)),
        h('div.drill__sub', `${dName(d.discipline)} · ${t('train.runs', { n: runs })}`),
      ),
      line,
    ),
    h('div.row', { style: { marginTop: '13px', gap: '8px' } },
      h('span.chip.chip--accent', t('train.lv', { n: lvl })),
      best !== undefined ? h('span.chip', `${Math.round(best * 100)}%`) : null,
      avg !== null ? h('span.chip', `⌀ ${Math.round(avg * 100)}%`) : null,
    ),
    h('div.row.row--between', { style: { marginTop: '11px', fontSize: '12.5px' } },
      h('span.faint',
        toNext === 0
          ? t('progress.atCeiling', { max: MAX_LEVEL })
          : t('progress.needMore', { n: toNext, mastery: Math.round(MASTERY * 100), lvl: lvl + 1 })),
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

/** Where this run leaves you: level, distance to the next, recent shape. */
function progressStrip(d, outcome) {
  const lvl = drillLevel(d.id);
  const line = sparkline(drillScores(d.id), { w: 104, hgt: 28 });

  return h('div.panel', { style: { marginTop: '12px' } },
    h('div.row.row--between',
      h('div',
        h('div.label', t('result.difficulty')),
        h('div', { style: { marginTop: '5px', fontSize: '15px' } }, t('result.levelOf', { n: lvl, max: MAX_LEVEL })),
      ),
      line,
    ),
    h('div.bar', { style: { marginTop: '11px' } },
      h('div.bar__fill', { style: { width: `${Math.round((lvl / MAX_LEVEL) * 100)}%` } })),
    h('div.faint', { style: { marginTop: '9px', fontSize: '12.5px' } },
      outcome.toNext === 0
        ? t('result.ceiling')
        : outcome.strongRun
          ? t('result.strongRun', { n: outcome.toNext, lvl: lvl + 1 })
          : t('result.weakRun', { mastery: Math.round(MASTERY * 100), n: outcome.toNext })),
  );
}

function showResult(d, result, outcome) {
  const meta = DISCIPLINES[d.discipline];
  const pctNum = Math.round(result.pct * 100);
  const verdict =
    pctNum >= 90 ? t('result.clean') :
    pctNum >= 70 ? t('result.solid') :
    pctNum >= 45 ? t('result.workable') :
    t('result.rough');

  render(
    h(`div.fade-in.${meta.cls}`,
      h('div.panel', { style: { textAlign: 'center', padding: '26px 18px' } },
        h('div.label', `${dName(d.discipline)} · ${drillName(d)}`),
        h('div.result-score', { style: { margin: '12px 0 4px' } }, `${pctNum}%`),
        h('div.dim', verdict),
        h('div', { style: { marginTop: '16px' } },
          h('span.xp-pop', t('result.xp', { n: outcome.xp })),
        ),
        outcome.drillLevelUp
          ? h('div', { style: { marginTop: '10px' } },
              h('span.chip.chip--accent', t('result.drillLevelUp', { name: drillName(d), n: outcome.drillLevelUp })))
          : null,
        outcome.levelUp
          ? h('div', { style: { marginTop: '10px' } },
              h('span.chip.chip--accent', t('result.disciplineLevelUp', { name: dName(d.discipline), n: outcome.levelUp })))
          : null,
        outcome.best && pctNum > 0
          ? h('div', { style: { marginTop: '10px' } }, h('span.chip.chip--accent', t('result.personalBest')))
          : null,
      ),

      progressStrip(d, outcome),

      result.stats
        ? h('div.result-grid', ...result.stats.map(st =>
            h('div.stat', h('div.stat__v', String(st.v)), h('div.stat__k', st.k))))
        : null,

      result.note
        ? h('div.reveal', { style: { marginTop: '14px' } },
            h('div.reveal__title', t('result.takeaway')),
            h('div', { html: mdish(result.note) }))
        : null,

      dailyComplete()
        ? h('div.panel', { style: { marginTop: '14px', textAlign: 'center' } },
            h('div.label', { style: { color: 'var(--silver-hi)' } }, t('result.protocolComplete')),
            h('p.prose', { style: { marginTop: '8px' } }, t('home.streakAt', { n: outcome.streak })))
        : null,

      h('div.stack', { style: { marginTop: '20px' } },
        h('button.btn.btn--primary.btn--block', { type: 'button', onclick: () => go(`#/drill/${d.id}`) }, t('result.again')),
        h('button.btn.btn--ghost.btn--block', { type: 'button', onclick: () => go('#/home') }, t('result.backHome')),
      ),
    ),
    { title: t('title.result'), focusMode: false },
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
