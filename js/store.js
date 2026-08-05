/* ============================================================
   store.js — all persistent state. Everything lives on-device
   in localStorage; nothing is ever sent anywhere.
   ============================================================ */

const KEY = 'cave.state.v1';

export const DISCIPLINES = {
  observation: { name: 'Observation', cls: 'd-observation', tag: 'See what others walk past.' },
  memory:      { name: 'Memory',      cls: 'd-memory',      tag: 'Hold it, and get it back.' },
  deduction:   { name: 'Deduction',   cls: 'd-deduction',   tag: 'Build the chain, test the chain.' },
  people:      { name: 'Reading',     cls: 'd-people',      tag: 'Baseline first. Always.' },
  influence:   { name: 'Influence',   cls: 'd-influence',   tag: 'Attention is the only currency.' },
  composure:   { name: 'Composure',   cls: 'd-composure',   tag: 'Nothing works if you are rattled.' },
};

export const RANKS = [
  { at: 0,     name: 'Initiate' },
  { at: 400,   name: 'Watcher' },
  { at: 1200,  name: 'Observer' },
  { at: 2600,  name: 'Reader' },
  { at: 5000,  name: 'Analyst' },
  { at: 9000,  name: 'Interrogator' },
  { at: 15000, name: 'Mentalist' },
];

function blankState() {
  return {
    v: 1,
    createdAt: Date.now(),
    xp: Object.fromEntries(Object.keys(DISCIPLINES).map(k => [k, 0])),
    streak: { count: 0, lastDay: null, best: 0 },
    daily: { day: null, drills: [], done: [] },
    history: [],   // { ts, drill, pct, xp }
    bests: {},     // drillId -> best percentage
    runs: {},      // drillId -> times completed
    log: [],       // { ts, prompt, body }
    read: [],      // lesson ids
    seen: {},      // content ids already served, so items do not repeat
  };
}

let state = load();

function load() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return blankState();
    const parsed = JSON.parse(raw);
    // Merge onto a blank state so new fields appear for existing users.
    return { ...blankState(), ...parsed, xp: { ...blankState().xp, ...(parsed.xp || {}) } };
  } catch {
    return blankState();
  }
}

export function save() {
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch (e) {
    console.warn('[cave] could not persist', e);
  }
}

export function get() { return state; }

export function reset() {
  state = blankState();
  save();
}

/* ---------- dates ---------- */

export function dayKey(d = new Date()) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function daysBetween(a, b) {
  const pa = a.split('-').map(Number);
  const pb = b.split('-').map(Number);
  const da = Date.UTC(pa[0], pa[1] - 1, pa[2]);
  const db = Date.UTC(pb[0], pb[1] - 1, pb[2]);
  return Math.round((db - da) / 86400000);
}

/* ---------- levels ---------- */

export function levelFromXp(xp) {
  let level = 1, need = 120, into = xp;
  while (into >= need) {
    into -= need;
    level += 1;
    need = Math.round(need * 1.28);
  }
  return { level, into, need, pct: need ? into / need : 0 };
}

export function totalXp() {
  return Object.values(state.xp).reduce((a, b) => a + b, 0);
}

export function rank() {
  const t = totalXp();
  let r = RANKS[0], next = null;
  for (let i = 0; i < RANKS.length; i++) {
    if (t >= RANKS[i].at) { r = RANKS[i]; next = RANKS[i + 1] || null; }
  }
  return { ...r, next, total: t };
}

/* ---------- streak ---------- */

export function touchStreak() {
  const today = dayKey();
  const s = state.streak;
  if (s.lastDay === today) return s.count;
  if (s.lastDay && daysBetween(s.lastDay, today) === 1) s.count += 1;
  else s.count = 1;
  s.lastDay = today;
  s.best = Math.max(s.best || 0, s.count);
  save();
  return s.count;
}

/** A streak only counts if it is current — yesterday or today. */
export function liveStreak() {
  const s = state.streak;
  if (!s.lastDay) return 0;
  const gap = daysBetween(s.lastDay, dayKey());
  return gap <= 1 ? s.count : 0;
}

/* ---------- daily protocol ---------- */

/** Deterministic per-day picks, so the protocol is stable all day. */
export function ensureDaily(drillIds) {
  const today = dayKey();
  if (state.daily.day === today && state.daily.drills.length) {
    // Drop ids that no longer exist (drill removed in an update).
    state.daily.drills = state.daily.drills.filter(id => drillIds.includes(id));
    if (state.daily.drills.length) return state.daily;
  }
  const seed = today.split('-').reduce((a, n) => a * 31 + Number(n), 7);
  const pool = [...drillIds];
  const picks = [];
  let s = seed;
  while (picks.length < Math.min(3, pool.length)) {
    s = (s * 1103515245 + 12345) & 0x7fffffff;
    picks.push(pool.splice(s % pool.length, 1)[0]);
  }
  state.daily = { day: today, drills: picks, done: [] };
  save();
  return state.daily;
}

export function markDailyDone(drillId) {
  if (state.daily.day !== dayKey()) return;
  if (state.daily.drills.includes(drillId) && !state.daily.done.includes(drillId)) {
    state.daily.done.push(drillId);
    save();
  }
}

export function dailyComplete() {
  return state.daily.day === dayKey()
    && state.daily.drills.length > 0
    && state.daily.done.length >= state.daily.drills.length;
}

/* ---------- recording a run ---------- */

/**
 * @param {string} drillId
 * @param {string} discipline
 * @param {number} pct  0..1 accuracy for the run
 * @param {number} baseXp  XP at a perfect run
 */
export function recordRun(drillId, discipline, pct, baseXp = 40) {
  const clamped = Math.max(0, Math.min(1, pct));
  // Half the XP is participation; effort still counts on a bad day.
  const xp = Math.round(baseXp * (0.5 + 0.5 * clamped));

  state.xp[discipline] = (state.xp[discipline] || 0) + xp;
  state.runs[drillId] = (state.runs[drillId] || 0) + 1;
  state.bests[drillId] = Math.max(state.bests[drillId] || 0, clamped);
  state.history.push({ ts: Date.now(), drill: drillId, pct: clamped, xp });
  if (state.history.length > 400) state.history = state.history.slice(-400);

  const before = levelFromXp(state.xp[discipline] - xp).level;
  const after = levelFromXp(state.xp[discipline]).level;

  markDailyDone(drillId);
  const streak = touchStreak();
  save();

  return { xp, levelUp: after > before ? after : 0, streak, best: state.bests[drillId] === clamped };
}

/* ---------- content rotation ---------- */

/**
 * Picks unseen items first so hand-written cases do not repeat until the
 * pool is exhausted, then resets.
 */
export function pickUnseen(bucket, items, count) {
  const seen = new Set(state.seen[bucket] || []);
  let fresh = items.filter(i => !seen.has(i.id));
  if (fresh.length < count) {
    state.seen[bucket] = [];
    fresh = items.slice();
  }
  const chosen = [];
  const pool = [...fresh];
  while (chosen.length < Math.min(count, pool.length)) {
    chosen.push(pool.splice(Math.floor(Math.random() * pool.length), 1)[0]);
  }
  state.seen[bucket] = [...(state.seen[bucket] || []), ...chosen.map(c => c.id)];
  save();
  return chosen;
}

/* ---------- log ---------- */

export function addLog(prompt, body) {
  state.log.unshift({ ts: Date.now(), prompt, body });
  if (state.log.length > 500) state.log.length = 500;
  save();
}

export function deleteLog(ts) {
  state.log = state.log.filter(e => e.ts !== ts);
  save();
}

export function markRead(lessonId) {
  if (!state.read.includes(lessonId)) {
    state.read.push(lessonId);
    save();
  }
}

/* ---------- export / import ---------- */

export function exportJson() {
  return JSON.stringify(state, null, 2);
}

export function importJson(text) {
  const parsed = JSON.parse(text);
  if (!parsed || typeof parsed !== 'object' || !parsed.xp) throw new Error('Not a Cave backup file.');
  state = { ...blankState(), ...parsed };
  save();
}
