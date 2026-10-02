/* ============================================================
   body.js — the physical side of the cave.

   An eight-week phase of strength, speed, power, running and
   skills, logged set by set. Everything lives inside the main
   state (state.body), so the existing export, restore and wipe
   cover it, and nothing leaves the device.

   Running paces are never hard-coded: they are derived from the
   user's own 8 km time with the VDOT formula of Daniels and
   Gilbert, so they move as the user does.
   ============================================================ */

import { h, svg, ICONS, PICTOS, toast, render, buzz } from './ui.js';
import { t, getLang } from './i18n.js';
import { get, save, touchStreak, dayKey } from './store.js';
import { mdish } from './drills/shared.js';
import {
  WEEKDAY_SESSION, SESSIONS, REST_TEXT, WARM, EASY_MIN, QUALITY, SPRINTS, EX, RULES,
} from './data/body.js';
import { BODY_NL } from './data/body.nl.js';

/* ---------- wiring ---------- */

let nav = {
  go: (hash) => { location.hash = hash; },
  setTab: () => {},
  paintStreak: () => {},
};

/** app.js hands over its router so this module never imports it back. */
export function initBody(n) { nav = { ...nav, ...n }; }

const DAY_IDS = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
const JS_DAY = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
const WEEKS = [1, 2, 3, 4, 5, 6, 7, 8];

/** The week and day on screen. Null means "follow today". */
const sel = { week: null, day: null };
let editingStart = false;
const chrome = { weeks: null, days: null };

export function resetBodySelection() { sel.week = null; sel.day = null; }

/* ---------- state ---------- */

function B() {
  const s = get();
  if (!s.body || typeof s.body !== 'object') s.body = {};
  const b = s.body;
  if (!b.logs || typeof b.logs !== 'object') b.logs = {};
  if (b.start === undefined) b.start = null;
  if (b.base8k === undefined) b.base8k = '';
  return b;
}

/* Typing writes after a short pause. Only a pending change is ever flushed,
   so leaving the app never writes a stale copy over newer data. */
let saveTimer = 0;
let pending = false;
function saveSoon() {
  pending = true;
  clearTimeout(saveTimer);
  saveTimer = setTimeout(() => { pending = false; save(); }, 300);
}
function saveNow() {
  clearTimeout(saveTimer);
  pending = false;
  save();
}
function flush() {
  if (pending) saveNow();
}
// iOS can suspend a home-screen app without warning; write before it goes.
document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'hidden') flush(); });
window.addEventListener('pagehide', flush);

const docId = (w, d) => `w${w}-${d}`;

function doc(w, d, create = false) {
  const logs = B().logs;
  const id = docId(w, d);
  if (!logs[id] && create) logs[id] = { ex: {}, done: false };
  return logs[id] || null;
}

function entry(w, d, key) {
  const x = doc(w, d);
  return x && x.ex ? x.ex[key] : undefined;
}

function setVal(w, d, path, value) {
  let o = doc(w, d, true);
  for (let i = 0; i < path.length - 1; i++) {
    const k = path[i];
    if (o[k] == null || typeof o[k] !== 'object') o[k] = typeof path[i + 1] === 'number' ? [] : {};
    o = o[k];
  }
  o[path[path.length - 1]] = value;
  saveSoon();
}

const filled = (v) => v !== '' && v != null && v !== false;

function hasData(en) {
  if (!en) return false;
  return Object.keys(en).some((k) => {
    // Warm-up ticks are not training data: they never make a session count.
    if (k === 'alt' || k === 'level' || k === 'wu') return false;
    const v = en[k];
    if (Array.isArray(v)) {
      return v.some((s) => s != null && (typeof s === 'object' ? Object.values(s).some(filled) : filled(s)));
    }
    return filled(v);
  });
}

const docHasData = (x) => !!(x && x.ex && Object.values(x.ex).some(hasData));

function svOf(en, arr, i, f) {
  const a = en && en[arr];
  const s = a && a[i];
  if (s == null) return '';
  if (f) return s[f] == null ? '' : s[f];
  return s;
}

/* ---------- numbers and time ---------- */

const nlOn = () => getLang() === 'nl';

function num(v) {
  if (v == null) return null;
  const s = String(v).trim().replace(',', '.');
  if (s === '') return null;
  const n = Number(s);
  return Number.isFinite(n) ? n : null;
}

/** Number in the active locale: 67,5 in Dutch, 67.5 in English. */
function nf(n, dec) {
  if (n == null) return '–';
  let s = dec != null ? n.toFixed(dec) : String(Math.round(n * 100) / 100);
  if (nlOn()) s = s.replace('.', ',');
  return s.replace('-', '−');
}

/** "45:26", "45.26", "45,26" or "1:02:03" → seconds. A bare number is minutes. */
function parseTime(v) {
  if (v == null) return null;
  const s = String(v).trim().replace(/[.,]/g, ':');
  if (!s) return null;
  const p = s.split(':').map(Number);
  if (p.some((x) => !Number.isFinite(x))) return null;
  if (p.length === 1) return p[0] * 60;
  if (p.length === 2) return p[0] * 60 + p[1];
  if (p.length === 3) return p[0] * 3600 + p[1] * 60 + p[2];
  return null;
}

function mmss(sec) {
  if (sec == null) return '–';
  const r = Math.round(sec);
  const hh = Math.floor(r / 3600);
  const mm = Math.floor((r % 3600) / 60);
  const ss = r % 60;
  return (hh ? `${hh}:${String(mm).padStart(2, '0')}` : String(mm)) + ':' + String(ss).padStart(2, '0');
}

const paceTxt = (spk) => (spk == null ? '–' : `${mmss(spk)}/km`);
const paceRange = ([a, b]) => `${mmss(a)}–${mmss(b)}/km`;

const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

/* ---------- today ---------- */

function startMonday() {
  const st = B().start;
  if (!st || !/^\d{4}-\d{2}-\d{2}$/.test(st)) return null;
  const [y, m, d] = st.split('-').map(Number);
  const s = new Date(y, m - 1, d);
  // Weeks run Monday to Sunday, whichever day the user picked.
  s.setDate(s.getDate() - ((s.getDay() + 6) % 7));
  return s;
}

export function bodyToday() {
  const now = new Date();
  const day = JS_DAY[now.getDay()];
  const sm = startMonday();
  if (!sm) return { day, week: null, before: null, after: false };
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const days = Math.round((today - sm) / 86400000);
  if (days < 0) return { day, week: null, before: -days, after: false };
  const week = Math.floor(days / 7) + 1;
  if (week > 8) return { day, week: null, before: null, after: true };
  return { day, week, before: null, after: false };
}

function ensureSel() {
  if (sel.week && sel.day) return;
  const td = bodyToday();
  sel.day = td.day;
  sel.week = td.week || (td.after ? 8 : 1);
}

/* ---------- the programme ---------- */

function sessionOf(w, d) {
  if (d === 'fri') return w === 1 || w === 8 ? 'tests' : 'rest';
  if (d === 'sun') return 'rest';
  return WEEKDAY_SESSION[d];
}

/** Key into EX (and into the Dutch overlay) for a day's exercise list. */
function groupOf(w, d) {
  const sid = sessionOf(w, d);
  if (sid === 'rest') return d === 'fri' ? 'restFri' : null;
  return sid;
}

function exListOf(w, d) {
  const g = groupOf(w, d);
  return g ? EX[g] || [] : [];
}

const isTestDay = (w, d) => {
  const sid = sessionOf(w, d);
  return sid === 'tests'
    || (sid === 'power' && (w === 1 || w === 8))
    || (sid === 'speed' && (w === 2 || w === 8))
    || (sid === 'quality' && w === 8);
};

/* Dutch overlay lookups. Anything missing falls through to English. */
const nlEx = (g, id) => (nlOn() ? (BODY_NL.ex[g] || {})[id] || {} : {});
const sessName = (sid) => (nlOn() && BODY_NL.sessions[sid]?.name) || SESSIONS[sid].name;
const sessFocus = (sid) => (nlOn() && BODY_NL.sessions[sid]?.focus) || SESSIONS[sid].focus;
const restText = (d) => (nlOn() && BODY_NL.restText[d]) || REST_TEXT[d];
const warmText = (sid) => (nlOn() && BODY_NL.warm[sid]) || WARM[sid];
const qualityText = (w) => (nlOn() && BODY_NL.quality[w - 1]) || QUALITY[w - 1].txt;
const sprintText = (w) => (nlOn() && BODY_NL.sprints[w - 1]) || SPRINTS[w - 1].txt;

function rulesBlocks() {
  if (!nlOn()) return RULES;
  return BODY_NL.rules.map((b, i) => {
    if (!b.sources) return b;
    const en = RULES[i] && RULES[i].sources ? RULES[i].sources : [];
    return { sources: b.sources.map((s, j) => ({ ...en[j], ...s })) };
  });
}

/** The week's version of an exercise: deload sets, early RIR, swaps. */
function eff(base, w) {
  const o = { ...base };
  if (base.sets) {
    o.setsLabel = base.setsTxt || String(base.sets);
    o.minSets = parseInt(o.setsLabel, 10);
    if (w === 4 && !base.noDeload) {
      const dl = base.dl != null ? base.dl : Math.max(1, Math.round(base.sets * 0.65));
      o.sets = dl;
      o.setsLabel = base.dlTxt || String(dl);
      o.minSets = parseInt(o.setsLabel, 10);
    }
  }
  if (base.rir) o.rirLabel = w === 4 ? '3+' : (base.compound && w <= 2 ? '2–3' : base.rir);
  return o;
}

function resolve(ex, w, d) {
  let base = ex;
  if (ex.swap && ex.swap.weeks.includes(w)) {
    base = { ...ex, ...ex.swap.ex };
    delete base.swap;
  }
  const key = base.id;
  const en = entry(w, d, key) || {};
  const altOn = !!(en.alt && ex.alt);
  if (altOn) base = { ...base, ...ex.alt };
  const o = eff(base, w);
  const tr = nlEx(groupOf(w, d), key);
  if (tr.presc) o.presc = tr.presc;
  if (tr.dist) o.dist = tr.dist;
  if (altOn) o.note = tr.altNote || ex.alt.note;
  else if (tr.note) o.note = tr.note;
  return { key, en, o, altOn };
}

/** Most recent earlier session of the same exercise. Skips the deload. */
function prevFor(key, w, d, altOn) {
  for (let pw = w - 1; pw >= 1; pw--) {
    if (pw === 4 && w !== 4) continue;
    const en = entry(pw, d, key);
    if (en && hasData(en) && !!en.alt === !!altOn) return { w: pw, en };
  }
  return null;
}

const rangeTxt = (a, b) => (a === b ? String(a) : `${a}–${b}`);

function stepTxt(step) {
  if (!step) return '';
  if (Array.isArray(step)) return `+${nf(step[0])}–${nf(step[1])} kg`;
  return t(`body.up.${step}`);
}

function prescOf(o) {
  if (o.id === 'mu') return t('body.mu.presc', { n: o.setsLabel });
  const parts = [];
  if (o.presc) parts.push(o.presc);
  else if (o.type === 'load' || o.type === 'reps') {
    parts.push(`${o.setsLabel} × ${rangeTxt(o.reps[0], o.reps[1])}${o.perLeg ? ` ${t('body.perLeg')}` : ''}`);
  } else if (o.type === 'hold') parts.push(`${o.setsLabel} × ${o.secs[0]}–${o.secs[1]} s`);
  else if (o.type === 'carry') parts.push(`${o.setsLabel} × ${o.dist}`);
  if (o.rirLabel) parts.push(`RIR ${o.rirLabel}`);
  if (o.rest && !o.presc) parts.push(t('body.rest', { r: o.rest }));
  return parts.join(' · ');
}

function kgTxt(k, plus) {
  if (k == null) return '–';
  if (plus) return k === 0 ? 'BW' : `${k > 0 ? '+' : ''}${nf(k)} kg`;
  return `${nf(k)} kg`;
}

/** What last time says about this time. */
function hintFor(o, prev, w) {
  if (!prev) return null;
  const pe = prev.en;
  const lead = t('body.hint.wk', { w: prev.w });
  switch (o.type) {
    case 'load': {
      const sets = (pe.s || []).filter((s) => s && num(s.kg) != null && num(s.reps) != null);
      if (!sets.length) return null;
      const kg = sets.map((s) => num(s.kg));
      const reps = sets.map((s) => num(s.reps));
      const same = kg.every((k) => k === kg[0]);
      const txt = lead + (same
        ? `${kgTxt(kg[0], o.plus)} × ${reps.join('/')}`
        : sets.map((s) => `${kgTxt(num(s.kg), o.plus)} × ${num(s.reps)}`).join(', '));
      if (w === 4) return { txt: `${txt} · ${t('body.hint.deload')}` };
      if (same && sets.length >= o.minSets && reps.every((r) => r >= o.reps[1])) {
        return { up: true, txt, step: t('body.hint.now', { step: stepTxt(o.step) }) };
      }
      return { txt: `${txt} → ${t('body.hint.same')}` };
    }
    case 'carry': {
      const sets = (pe.s || []).filter((s) => s && num(s.kg) != null);
      if (!sets.length) return null;
      return { txt: lead + sets.map((s) => `${nf(num(s.kg))} kg${num(s.m) != null ? ` × ${nf(num(s.m))} m` : ''}`).join(', ') };
    }
    case 'reps':
    case 'hold': {
      const f = o.type === 'hold' ? 'sec' : 'reps';
      const vals = (pe.s || []).map((s) => (s ? num(s[f]) : null)).filter((v) => v != null);
      if (!vals.length) return null;
      const txt = lead + (pe.level ? `${pe.level} · ` : '') + vals.map((v) => nf(v)).join('/') + (f === 'sec' ? ' s' : '');
      if (w === 4) return { txt };
      if (o.id === 'mu') {
        if (pe.level === 'Clean' && vals.length >= 3 && vals.every((v) => v >= 1)) return { up: true, txt, step: t('body.hint.muClean') };
        if (pe.level === 'Band-assisted' && vals.length >= 3 && vals.every((v) => v >= 2)) return { up: true, txt, step: t('body.hint.muBand') };
        return { txt };
      }
      const top = o.type === 'hold' ? o.secs[1] : o.reps[1];
      if (o.up && vals.length >= o.minSets && vals.every((v) => v >= top)) return { up: true, txt, step: t(`body.up.${o.up}`) };
      return { txt };
    }
    case 'skill': {
      const b = num(pe.best);
      return b != null ? { txt: t('body.hint.hold', { w: prev.w, s: nf(b) }) } : null;
    }
    case 'jump': {
      const b = num(pe.best);
      return b != null ? { txt: `${lead}${nf(b)} cm` } : null;
    }
    case 'single': {
      const v = num(pe.v);
      return v != null ? { txt: `${lead}${nf(v)}${o.unit === 's' ? ' s' : ''}` } : null;
    }
    case 'hold3': {
      const b = best3(pe);
      return b != null ? { txt: `${lead}${nf(b)} s` } : null;
    }
    case 'times': {
      const ts = (pe.t || []).map(num).filter((v) => v != null && v > 0);
      return ts.length ? { txt: t('body.hint.fastest', { w: prev.w, s: nf(Math.min(...ts), 2) }) } : null;
    }
    case 'run': {
      if (o.runKey === 'wed') return null;
      const m = num(pe.min);
      const k = num(pe.km);
      return m && k ? { txt: `${lead}${nf(m)} min · ${nf(k)} km · ${paceTxt((m * 60) / k)}` } : null;
    }
    default:
      return null;
  }
}

/* ---------- paces ---------- */

/** VDOT from a race: Daniels & Gilbert's oxygen-cost and drop-off curves. */
function vdotFor(meters, sec) {
  const tMin = sec / 60;
  const v = meters / tMin;
  const vo2 = -4.6 + 0.182258 * v + 0.000104 * v * v;
  const pct = 0.8 + 0.1894393 * Math.exp(-0.012778 * tMin) + 0.2989558 * Math.exp(-0.1932605 * tMin);
  return vo2 / pct;
}

/** Seconds per km at a fraction of VDOT. */
function secPerKmAt(vdot, frac) {
  const c = 4.6 + vdot * frac;
  const v = (-0.182258 + Math.sqrt(0.182258 * 0.182258 + 4 * 0.000104 * c)) / (2 * 0.000104);
  return 60000 / v;
}

/**
 * Training paces from the most recent 8 km time: the week-8 test if it
 * has been run, otherwise the baseline. Easy 64–72% of VDOT, threshold
 * 88%, interval 97.5% — rounded to 5 s, which is as precise as a run is.
 */
export function paces() {
  const test = parseTime((entry(8, 'wed', 'run') || {}).time);
  const base = parseTime(B().base8k);
  const sec = test || base;
  if (!sec || sec < 20 * 60 || sec > 90 * 60) return null;
  const v = vdotFor(8000, sec);
  const f5 = (x) => Math.floor(x / 5) * 5;
  const c5 = (x) => Math.ceil(x / 5) * 5;
  const r5 = (x) => Math.round(x / 5) * 5;
  const T = r5(secPerKmAt(v, 0.88));
  const I = r5(secPerKmAt(v, 0.975));
  return { vdot: v, E: [f5(secPerKmAt(v, 0.72)), c5(secPerKmAt(v, 0.64))], T: [T - 5, T + 5], I: [I - 5, I + 5] };
}

function runLines(o, w) {
  const p = paces();
  if (o.runKey === 'wed') {
    const q = QUALITY[w - 1];
    if (q.zone === 'test') return { lines: [qualityText(w), t('body.q.test')], needPaces: false };
    const zone = `${t(`body.zone.${q.zone}`)}${p ? ` ${paceRange(p[q.zone])}` : ''} · ${t(`body.zone.rpe${q.zone}`)}`;
    return { lines: [qualityText(w), zone], needPaces: !p };
  }
  const line = `${t('body.run.easy', { min: EASY_MIN[o.runKey][w - 1] })} · ${p ? `${paceRange(p.E)} · ` : ''}${t('body.run.talk')}`;
  return { lines: [line], needPaces: !p };
}

function paceLive(en, isTest) {
  if (isTest) {
    const tt = parseTime(en.time);
    return tt ? t('body.pace.test', { time: mmss(tt), p: paceTxt(tt / 8) }) : t('body.pace.testEmpty');
  }
  const m = num(en.min);
  const k = num(en.km);
  return m && k ? t('body.pace.avg', { p: paceTxt((m * 60) / k) }) : t('body.pace.empty');
}

/** Best timed 20 m. In test weeks only the three all-out reps count. */
function sprintBest(w, en) {
  const sp = SPRINTS[w - 1];
  const ts = (en && en.t) || [];
  const vals = [];
  sp.reps.forEach((dist, i) => {
    if (dist !== '20' || (sp.test && i < 2)) return;
    const v = num(ts[i]);
    if (v != null && v > 0) vals.push(v);
  });
  return vals.length ? Math.min(...vals) : null;
}

function sprintLive(w, en) {
  const sp = SPRINTS[w - 1];
  if (sp.test) {
    const b = sprintBest(w, en);
    return b == null ? t('body.sprint.bestEmpty') : t('body.sprint.best', { s: nf(b, 2) });
  }
  const ts = ((en && en.t) || []).map(num).filter((v) => v != null && v > 0);
  return ts.length ? t('body.sprint.fastest', { s: nf(Math.min(...ts), 2) }) : t('body.sprint.optional');
}

function best3(en) {
  const v = ((en && en.t) || []).map(num).filter((x) => x != null && x > 0);
  return v.length ? Math.max(...v) : null;
}

/* ---------- inputs ---------- */

function numInput({ w, d, path, value, ph, mode = 'decimal', label = null, onChange }) {
  const el = h('input.num', {
    type: 'text',
    inputmode: mode,
    autocomplete: 'off',
    autocorrect: 'off',
    spellcheck: 'false',
    enterkeyhint: 'next',
    placeholder: filled(ph) ? String(ph) : '–',
    'aria-label': label,
  });
  el.value = value == null ? '' : String(value);
  el.addEventListener('input', () => {
    setVal(w, d, path, el.value);
    if (onChange) onChange();
  });
  // Enter moves down the sheet, the way a logbook is filled in.
  el.addEventListener('keydown', (e) => {
    if (e.key !== 'Enter') return;
    e.preventDefault();
    const all = [...document.querySelectorAll('.body input.num')];
    const i = all.indexOf(el);
    if (i >= 0 && all[i + 1]) all[i + 1].focus();
    else el.blur();
  });
  return el;
}

const cell = (label, input, strong = false) =>
  h(`label.bcell${strong ? '.is-strong' : ''}`, h('span.bcell__k', label), input);

function inputsFor(o, en, pe, w, d, key, onChange, live) {
  const P = (...rest) => ['ex', key, ...rest];
  switch (o.type) {
    case 'load':
    case 'carry': {
      const n = o.sets;
      const f2 = o.type === 'carry' ? 'm' : 'reps';
      const kgLabel = o.plus ? '+kg' : 'kg';
      const grid = h('div.bsets', { style: { '--n': String(n) } });
      grid.appendChild(h('span'));
      for (let i = 0; i < n; i++) grid.appendChild(h('span.bsets__hd', `S${i + 1}`));
      grid.appendChild(h('span.bsets__lg', kgLabel));
      for (let i = 0; i < n; i++) {
        grid.appendChild(numInput({
          w, d, path: P('s', i, 'kg'), value: svOf(en, 's', i, 'kg'), ph: svOf(pe, 's', i, 'kg'),
          mode: 'decimal', label: `S${i + 1} ${kgLabel}`, onChange,
        }));
      }
      grid.appendChild(h('span.bsets__lg', f2 === 'm' ? 'm' : 'reps'));
      for (let i = 0; i < n; i++) {
        grid.appendChild(numInput({
          w, d, path: P('s', i, f2), value: svOf(en, 's', i, f2), ph: svOf(pe, 's', i, f2),
          mode: 'numeric', label: `S${i + 1} ${f2}`, onChange,
        }));
      }
      return grid;
    }
    case 'reps':
    case 'hold': {
      const f = o.type === 'hold' ? 'sec' : 'reps';
      return h('div.bcells', Array.from({ length: o.sets }, (_, i) =>
        cell(`S${i + 1} · ${f}`, numInput({
          w, d, path: P('s', i, f), value: svOf(en, 's', i, f), ph: svOf(pe, 's', i, f), mode: 'numeric', onChange,
        }))));
    }
    case 'times':
      return h('div.bcells', Array.from({ length: o.sets }, (_, i) =>
        cell(`R${i + 1} · sec`, numInput({
          w, d, path: P('t', i), value: svOf(en, 't', i), ph: svOf(pe, 't', i), mode: 'decimal', onChange,
        }))));
    case 'sprint': {
      const sp = SPRINTS[w - 1];
      const out = h('p.bx__live');
      const refresh = () => { out.textContent = sprintLive(w, entry(w, d, key) || {}); };
      refresh();
      live.push(refresh);
      const cells = sp.reps.map((dist, i) => {
        const tag = sp.test ? ` · ${i < 2 ? '90%' : t('body.sprint.test')}` : '';
        return cell(`${dist} m${tag}`, numInput({
          w, d, path: P('t', i), value: svOf(en, 't', i), ph: 'sec', mode: 'decimal', onChange,
        }), !!(sp.test && i >= 2));
      });
      return h('div', h('div.bcells', cells), out);
    }
    case 'skill':
      return h('div.bcells.bcells--wide',
        cell(t('body.f.practised'), numInput({ w, d, path: P('min'), value: en.min, ph: pe && pe.min, mode: 'numeric', onChange })),
        cell(t('body.f.bestHold'), numInput({ w, d, path: P('best'), value: en.best, ph: pe && pe.best, mode: 'numeric', onChange })));
    case 'jump':
      return h('div.bcells.bcells--wide',
        cell(t('body.f.jump'), numInput({ w, d, path: P('best'), value: en.best, ph: pe && pe.best, mode: 'numeric', onChange }), true));
    case 'single':
      return h('div.bcells.bcells--wide',
        cell(o.unit === 's' ? t('body.f.secs') : t('body.f.count'),
          numInput({ w, d, path: P('v'), value: en.v, ph: pe && pe.v, mode: 'numeric', onChange }), true));
    case 'hold3':
      return h('div.bcells', [0, 1, 2].map((i) =>
        cell(t('body.f.attempt', { n: i + 1 }), numInput({
          w, d, path: P('t', i), value: svOf(en, 't', i), ph: svOf(pe, 't', i), mode: 'numeric', onChange,
        }))));
    case 'check': {
      const paint = (btn, on) => {
        btn.className = `btn btn--sm ${on ? 'btn--primary' : 'btn--ghost'}`;
        btn.setAttribute('aria-pressed', String(on));
        btn.textContent = on ? `✓ ${t('body.check.done')}` : t('body.check.do');
      };
      const btn = h('button', { type: 'button' });
      paint(btn, !!en.done);
      btn.addEventListener('click', () => {
        const on = !(entry(w, d, key) || {}).done;
        setVal(w, d, P('done'), on);
        paint(btn, on);
        onChange();
      });
      return h('div.bx__check', btn);
    }
    case 'run': {
      const q = o.runKey === 'wed' ? QUALITY[w - 1] : null;
      const isTest = !!(q && q.zone === 'test');
      const out = h('p.bx__live');
      const refresh = () => { out.textContent = paceLive(entry(w, d, key) || {}, isTest); };
      refresh();
      live.push(refresh);
      const cells = isTest
        ? h('div.bcells.bcells--wide',
            cell(t('body.f.time'), numInput({ w, d, path: P('time'), value: en.time, ph: 'mm.ss', mode: 'decimal', onChange }), true))
        : h('div.bcells.bcells--3',
            cell(t('body.f.min'), numInput({ w, d, path: P('min'), value: en.min, ph: pe && pe.min, mode: 'decimal', onChange })),
            cell('km', numInput({ w, d, path: P('km'), value: en.km, ph: pe && pe.km, mode: 'decimal', onChange })),
            cell('RPE 1–10', numInput({ w, d, path: P('rpe'), value: en.rpe, ph: pe && pe.rpe, mode: 'numeric', onChange })));
      return h('div', cells, out);
    }
    default:
      return null;
  }
}

/* ---------- one exercise ---------- */

function exPanel(ex, w, d) {
  const r = resolve(ex, w, d);
  const { o, en, key } = r;
  const prev = prevFor(key, w, d, r.altOn);
  const pe = prev ? prev.en : null;
  const live = [];
  let panel = null;
  let levelSel = null;

  const keepLevel = () => {
    if (levelSel && levelSel.value && !(entry(w, d, key) || {}).level) {
      setVal(w, d, ['ex', key, 'level'], levelSel.value);
    }
  };
  const onChange = () => {
    keepLevel();
    live.forEach((fn) => fn());
    refreshChrome();
  };

  const kids = [
    h('div.bx__head',
      o.tag ? h('span.bx__tag', o.tag) : null,
      h('h3.bx__name', o.name),
      o.optional ? h('span.chip', t('body.optional')) : null,
      o.test ? h('span.chip.chip--accent', t('body.test')) : null,
    ),
  ];

  if (o.type === 'run') {
    const rl = runLines(o, w);
    rl.lines.forEach((ln) => kids.push(h('p.bx__presc', ln)));
    if (rl.needPaces) kids.push(h('p.bx__note', t('body.paces.need')));
  } else if (o.type === 'sprint') {
    kids.push(h('p.bx__presc', `${sprintText(w)} · ${t('body.sprint.rest')}`));
  } else {
    const p = prescOf(o);
    if (p) kids.push(h('p.bx__presc', p));
  }
  if (o.note) kids.push(h('p.bx__note', o.note));

  const hint = hintFor(o, prev, w);
  const canFill = (o.type === 'load' || o.type === 'carry') && pe && !(en.s || []).some((s) => s && filled(s.kg));
  if (hint || canFill) {
    const row = h(`div.bx__hint${hint && hint.up ? '.is-up' : ''}`);
    if (hint) {
      row.appendChild(h('span', hint.txt));
      if (hint.step) row.appendChild(h('span.bx__up', `↑ ${hint.step}`));
    }
    if (canFill) {
      row.appendChild(h('button.btn.btn--ghost.btn--sm', {
        type: 'button',
        onclick: () => {
          fillPrev(ex, w, d);
          panel.replaceWith(exPanel(ex, w, d));
          refreshChrome();
        },
      }, t('body.fill', { w: prev.w })));
    }
    kids.push(row);
  }

  // Heavy lifts get their ramp-up sets, worked out from the working weight.
  if (o.type === 'load' && o.compound) {
    const wu = warmBlock(o, w, d, key, r.altOn, () => workKg(o, entry(w, d, key) || {}, prev, hint));
    live.push(wu.paint);
    kids.push(wu.el);
  }

  if (o.levels) {
    const cur = en.level || (pe && pe.level) || '';
    levelSel = h('select.bsel', { 'aria-label': t('body.variant') },
      h('option', { value: '' }, t('body.choose')),
      o.levels.map((l) => h('option', { value: l }, l)));
    levelSel.value = cur;
    levelSel.addEventListener('change', () => setVal(w, d, ['ex', key, 'level'], levelSel.value));
    kids.push(h('label.bx__lvl', h('span.label', t('body.variant')), levelSel));
  }

  if (ex.alt) {
    kids.push(h('div.bx__alt', h('button.btn.btn--ghost.btn--sm', {
      type: 'button',
      onclick: () => {
        setVal(w, d, ['ex', key, 'alt'], !r.altOn);
        panel.replaceWith(exPanel(ex, w, d));
      },
    }, r.altOn ? t('body.alt.back', { name: ex.name }) : t('body.alt.to', { name: ex.alt.name }))));
  }

  kids.push(inputsFor(o, en, pe, w, d, key, onChange, live));
  panel = h(`div.panel.bx${o.optional ? '.is-optional' : ''}`, kids);
  return panel;
}

/* ---------- warm-up sets ---------- */

/*
  Ramp-up sets before a heavy lift: rising weight, falling reps, nothing
  tiring. Barbell lifts start at the empty bar (squat at 80 kg:
  bar × 8 → 40 × 5 → 55 × 3 → 67.5 × 1–2, as in the rules); the trap bar
  starts at about 40%; weighted pull-ups and dips start at bodyweight and
  ramp the added kilos. Without a working weight the sheet shows the
  percentages instead.
*/
const BAR = 20;
const roundTo = (x, step) => Math.round(x / step) * step;

const WU_SCHEMES = {
  barbell: [[0, '8'], [0.5, '5'], [0.7, '3'], [0.85, '1–2']],   // 0 = the empty bar
  trapbar: [[0.4, '5'], [0.6, '3'], [0.8, '1–2']],
  rdl:     [[0, '8'], [0.5, '5'], [0.75, '3']],
  plus:    [[0, '5'], [0.5, '3'], [0.8, '1']],                  // 0 = bodyweight
};

function wuKind(o, altOn) {
  if (o.plus) return 'plus';
  if (o.id === 'tbdl') return altOn ? 'rdl' : 'trapbar';
  return 'barbell';
}

/** The weight the warm-up climbs towards: today's heaviest typed set, else
    last time's top set, plus a step when the hint says go heavier. */
function workKg(o, en, prev, hint) {
  const kgs = (s) => (s || []).map((x) => (x ? num(x.kg) : null)).filter((v) => v != null);
  const now = kgs(en.s);
  if (now.length) return Math.max(...now);
  if (!prev) return null;
  const then = kgs(prev.en.s);
  if (!then.length) return null;
  let k = Math.max(...then);
  if (hint && hint.up && Array.isArray(o.step)) k += o.step[0];
  return k;
}

function warmupSets(kind, work) {
  const scheme = WU_SCHEMES[kind];
  const plus = kind === 'plus';
  const base = plus ? 'BW' : t('body.wu.bar');
  if (work == null) {
    return scheme.map(([f, reps]) => ({
      txt: `${f === 0 ? base : `${plus ? '+' : ''}${Math.round(f * 100)}%`} × ${reps}`,
    }));
  }
  const step = plus ? 1.25 : 2.5;
  const out = [];
  let last = null;
  for (const [f, reps] of scheme) {
    if (f === 0) {
      // At or below the empty bar, one easy set is the whole warm-up.
      if (!plus && work <= BAR) return [{ txt: `${base} × 10` }];
      out.push({ txt: `${base} × ${reps}` });
      last = plus ? 0 : BAR;
      continue;
    }
    const kg = roundTo(work * f, step);
    if (plus ? kg < 2.5 : kg < BAR) continue;   // lighter than the bar, or a token plate
    if (last != null && kg <= last) continue;    // no repeated weights
    if (kg >= work) continue;                    // never at working weight
    last = kg;
    out.push({ txt: `${plus ? '+' : ''}${nf(kg)} kg × ${reps}` });
  }
  return out.length ? out : [{ txt: `${base} × 10` }];
}

/** A row of tappable warm-up sets. Ticks are kept, but never count as data. */
function warmBlock(o, w, d, key, altOn, getWork) {
  const wrap = h('div.bwu');
  const paint = () => {
    const work = getWork();
    const sets = warmupSets(wuKind(o, altOn), work);
    const ticks = (entry(w, d, key) || {}).wu || [];
    wrap.replaceChildren(
      h('div.bwu__k',
        h('span.label', t('body.wu')),
        h('span.bwu__note', work == null ? t('body.wu.need') : t('body.wu.note'))),
      h('div.bwu__sets', sets.map((s, i) => {
        const on = !!ticks[i];
        const b = h('button.bwu__set', { type: 'button', 'aria-pressed': String(on) },
          on ? h('span.bwu__tick', '✓') : null, s.txt);
        b.addEventListener('click', () => {
          const cur = !!((entry(w, d, key) || {}).wu || [])[i];
          setVal(w, d, ['ex', key, 'wu', i], !cur);
          buzz(8);
          paint();
        });
        return b;
      })),
    );
  };
  paint();
  return { el: wrap, paint };
}

/** Copy last session's weights into the empty kg fields. Reps stay blank. */
function fillPrev(ex, w, d) {
  const r = resolve(ex, w, d);
  const prev = prevFor(r.key, w, d, r.altOn);
  if (!prev) return;
  const known = (prev.en.s || []).filter((s) => s && filled(s.kg));
  for (let i = 0; i < r.o.sets; i++) {
    if (filled(svOf(r.en, 's', i, 'kg'))) continue;
    let v = svOf(prev.en, 's', i, 'kg');
    if (!filled(v) && known.length) v = known[known.length - 1].kg;
    if (filled(v)) setVal(w, d, ['ex', r.key, 's', i, 'kg'], v);
  }
}

/* ---------- week and day strips ---------- */

function weekStrip() {
  const td = bodyToday();
  return h('div.bweeks', { role: 'group', 'aria-label': 'Week' }, WEEKS.map((w) => {
    const tag = w === 1 ? t('body.tag.start') : w === 4 ? t('body.tag.deload') : w === 8 ? t('body.tag.test') : '';
    const has = DAY_IDS.some((d) => {
      const x = doc(w, d);
      return x && (x.done || docHasData(x));
    });
    return h(`button.bweek${td.week === w ? '.is-now' : ''}${has ? '.has-data' : ''}`, {
      type: 'button',
      'aria-pressed': String(sel.week === w),
      'aria-label': `Week ${w}${tag ? `, ${tag}` : ''}`,
      onclick: () => { sel.week = w; viewBody(); },
    }, h('b', String(w)), h('span', tag));
  }));
}

function dayStrip() {
  const td = bodyToday();
  return h('div.bdays', { role: 'group', 'aria-label': t('body.dayGroup') }, DAY_IDS.map((d) => {
    const x = doc(sel.week, d);
    const done = !!(x && x.done);
    const sid = sessionOf(sel.week, d);
    return h(`button.bday${td.week === sel.week && td.day === d ? '.is-now' : ''}${sid === 'rest' ? '.is-rest' : ''}`, {
      type: 'button',
      'aria-pressed': String(sel.day === d),
      'aria-label': `${t(`body.dl.${d}`)}, ${sessName(sid)}${done ? `, ${t('body.done.yes')}` : ''}`,
      onclick: () => { sel.day = d; viewBody(); },
    }, h('b', t(`body.d.${d}`)), h('span', done ? '✓' : docHasData(x) ? '·' : ''));
  }));
}

function refreshChrome() {
  if (chrome.weeks && chrome.weeks.isConnected) {
    const n = weekStrip();
    chrome.weeks.replaceWith(n);
    chrome.weeks = n;
  }
  if (chrome.days && chrome.days.isConnected) {
    const n = dayStrip();
    chrome.days.replaceWith(n);
    chrome.days = n;
  }
}

/* ---------- the day's notes ---------- */

function banners(w, d) {
  const out = [];
  const sid = sessionOf(w, d);
  const training = ['power', 'upperA', 'quality', 'upperB', 'speed'].includes(sid);
  if (w === 4 && training) out.push(t('body.b.deload'));
  if (w <= 2 && (sid === 'power' || sid === 'upperA' || sid === 'upperB')) out.push(t('body.b.base'));
  if (sid === 'power' && (w === 1 || w === 8)) out.push(t(w === 1 ? 'body.b.jump1' : 'body.b.jump8'));
  if (sid === 'tests') out.push(t('body.b.fri'));
  if (sid === 'speed' && w === 1) out.push(t('body.b.sprint1'));
  if (sid === 'speed' && (w === 2 || w === 8)) out.push(t('body.b.sprintTest'));
  if (sid === 'quality' && w === 8) out.push(t('body.b.run8'));
  return out;
}

function doneBlock(w, d) {
  const x = doc(w, d);
  const done = !!(x && x.done);
  const btn = h(`button.btn.btn--block${done ? '.btn--ghost' : '.btn--primary'}`, {
    type: 'button', 'aria-pressed': String(done),
  }, done ? `✓ ${t('body.done.yes')}` : t('body.done'));
  const wrap = h('div.bdone', btn, done ? h('p.faint.bdone__note', t('body.done.undo')) : null);
  btn.addEventListener('click', () => {
    const y = doc(w, d, true);
    y.done = !y.done;
    y.doneAt = y.done ? Date.now() : null;
    saveNow();
    if (y.done) {
      const td = bodyToday();
      if (td.week === w && td.day === d) {
        touchStreak();
        nav.paintStreak();
        toast(t('body.done.toast'));
      } else {
        toast(t('body.done.toastPast'));
      }
      buzz([12, 60, 12]);
    }
    wrap.replaceWith(doneBlock(w, d));
    refreshChrome();
  });
  return wrap;
}

function startPanel() {
  const b = B();
  const input = h('input.bdate', { type: 'date', 'aria-label': t('body.start.title') });
  // Today is the likeliest answer; one tap on Save and the week starts.
  input.value = b.start || dayKey();
  const saveBtn = h('button.btn.btn--primary.btn--block', { type: 'button' }, t('body.start.save'));
  saveBtn.addEventListener('click', () => {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(input.value)) {
      toast(t('body.start.pick'));
      return;
    }
    b.start = input.value;
    saveNow();
    editingStart = false;
    resetBodySelection();
    viewBody();
  });
  const cancel = b.start
    ? h('button.btn.btn--ghost.btn--block', { type: 'button', onclick: () => { editingStart = false; viewBody(); } }, t('body.start.cancel'))
    : null;
  return h('div.panel.bstart',
    h('div.label', t('body.phase')),
    h('h2', { style: { margin: '8px 0' } }, t('body.start.title')),
    h('p.prose', t('body.start.note')),
    h('div.stack', { style: { marginTop: '14px' } }, input, saveBtn, cancel));
}

function linkRow(hash, title, sub) {
  return h('button.drill.d-body', { type: 'button', onclick: () => nav.go(hash) },
    h('span.grow', h('div.drill__name', title), h('div.drill__sub', sub)),
    h('span.drill__chev', svg(ICONS.chevron, 18)));
}

/* ============================================================
   VIEWS
   ============================================================ */

export function viewBody() {
  ensureSel();
  const b = B();
  const td = bodyToday();
  const w = sel.week;
  const d = sel.day;
  const sid = sessionOf(w, d);
  const meta = SESSIONS[sid];
  const isToday = td.week === w && td.day === d;

  const nodes = [];
  if (!b.start || editingStart) nodes.push(startPanel());

  nodes.push(h('div.briefing.bbrief',
    h('div.briefing__date',
      h('span.label', `${t(`body.dl.${d}`)} · ${t('body.weekOf', { n: w })}`),
      h('span.label', isToday ? t('body.today') : ''),
    ),
    h('h1', sessName(sid)),
    h('p.prose', { style: { marginTop: '8px' } }, sid === 'rest' ? restText(d) : sessFocus(sid)),
    h('div.row.bbrief__chips',
      meta.dur ? h('span.chip', meta.dur) : null,
      isTestDay(w, d) ? h('span.chip.chip--accent', t('body.testDay')) : null,
      w === 4 && sid !== 'rest' && sid !== 'tests' ? h('span.chip', t('body.deload')) : null,
    ),
  ));

  chrome.weeks = weekStrip();
  chrome.days = dayStrip();
  nodes.push(h('div.bnav', chrome.weeks, chrome.days));

  if (b.start && !editingStart) {
    let status = '';
    if (td.week) status = t('body.status.week', { n: td.week, day: t(`body.dl.${td.day}`).toLowerCase() });
    else if (td.before != null) status = t('body.start.in', { n: td.before });
    else if (td.after) status = t('body.start.done');
    const back = td.week && !isToday
      ? h('button.btn.btn--ghost.btn--sm', { type: 'button', onclick: () => { resetBodySelection(); viewBody(); } }, t('body.toToday'))
      : null;
    if (status) nodes.push(h('div.row.row--between.bstatus', h('span.label', status), back));
  }

  banners(w, d).forEach((txt) => nodes.push(h('div.reveal', h('div', txt))));

  if (WARM[sid]) {
    nodes.push(h('details.bwarm',
      h('summary', h('span.label', t('body.warmup'))),
      h('p.prose', warmText(sid))));
  }

  const list = exListOf(w, d);
  if (list.length) {
    nodes.push(h('div.section-head',
      h('span.label', t('body.session')),
      h('span.label', t('body.exCount', { n: list.length }))));
    list.forEach((ex) => nodes.push(exPanel(ex, w, d)));
  }
  if (sid !== 'rest') nodes.push(doneBlock(w, d));

  nodes.push(
    h('div.section-head', h('span.label', t('body.more'))),
    linkRow('#/body/tests', t('body.link.tests'), t('body.link.testsSub')),
    linkRow('#/body/progress', t('body.link.prog'), t('body.link.progSub')),
    linkRow('#/body/rules', t('body.link.rules'), t('body.link.rulesSub')),
  );
  if (b.start && !editingStart) {
    nodes.push(h('div', { style: { marginTop: '12px' } },
      h('button.btn.btn--ghost.btn--block', { type: 'button', onclick: () => { editingStart = true; viewBody(); } }, t('body.start.change'))));
  }

  render(h('div.fade-in.body', nodes), { title: t('title.body') });
  nav.setTab('#/body');
}

/* ---------- tests ---------- */

function topSet(w, d, key) {
  const en = entry(w, d, key);
  if (!en || !en.s || en.alt) return null;
  let best = null;
  en.s.forEach((s) => {
    if (!s) return;
    const k = num(s.kg);
    const r = num(s.reps);
    if (k == null || r == null || r < 1) return;
    if (!best || k > best.kg || (k === best.kg && r > best.reps)) best = { kg: k, reps: r };
  });
  return best;
}

function topSetWeeks(ws, d, key) {
  let best = null;
  ws.forEach((w) => {
    const x = topSet(w, d, key);
    if (x && (!best || x.kg > best.kg || (x.kg === best.kg && x.reps > best.reps))) best = x;
  });
  return best;
}

function skillStr(w, d, key) {
  const en = entry(w, d, key);
  if (!en) return null;
  const vals = (en.s || []).map((s) => (s ? num(filled(s.reps) ? s.reps : s.sec) : null)).filter((v) => v != null);
  if (!en.level && !vals.length) return null;
  return `${en.level || '?'}${vals.length ? ` · ${nf(Math.max(...vals))}${key === 'fl' ? ' s' : ''}` : ''}`;
}

/** Better inverts to solid, worse is dashed and dimmer — never a hue. */
function delta(a, b, better, fmt) {
  if (a == null || b == null) return null;
  const dv = b - a;
  if (Math.abs(dv) < 1e-9) return h('span.chip', t('body.same'));
  const good = better === 'up' ? dv > 0 : dv < 0;
  return h(`span.chip${good ? '.chip--better' : '.chip--worse'}`,
    `${dv > 0 ? '+' : '−'}${fmt(Math.abs(dv))}`,
    h('span.sr', ` ${good ? t('body.better') : t('body.worse')}`));
}

export function viewBodyTests() {
  const b = B();
  const rows = [];

  const base8 = parseTime(b.base8k);
  const fin8 = parseTime((entry(8, 'wed', 'run') || {}).time);
  const baseInput = h('input.num.num--inline', {
    type: 'text', inputmode: 'decimal', autocomplete: 'off', placeholder: 'mm.ss', 'aria-label': t('body.tests.base8k'),
  });
  baseInput.value = b.base8k || '';
  baseInput.addEventListener('input', () => { B().base8k = baseInput.value; saveSoon(); });
  baseInput.addEventListener('change', () => { flush(); viewBodyTests(); });
  rows.push({ name: '8 km', when: t('body.w.run8'), baseNode: baseInput, fin: fin8 != null ? mmss(fin8) : null, delta: delta(base8, fin8, 'down', mmss) });

  const s2 = sprintBest(2, entry(2, 'sat', 'sprint'));
  const s8 = sprintBest(8, entry(8, 'sat', 'sprint'));
  rows.push({ name: t('body.t.sprint'), when: t('body.w.sprint'), base: s2 != null ? `${nf(s2, 2)} s` : null, fin: s8 != null ? `${nf(s8, 2)} s` : null, delta: delta(s2, s8, 'down', (x) => `${nf(x, 2)} s`) });

  const j1 = num((entry(1, 'mon', 'bj') || {}).best);
  const j8 = num((entry(8, 'mon', 'bj') || {}).best);
  rows.push({ name: 'Broad jump', when: t('body.w.bj'), base: j1 != null ? `${nf(j1)} cm` : null, fin: j8 != null ? `${nf(j8)} cm` : null, delta: delta(j1, j8, 'up', (x) => `${nf(x)} cm`) });

  const p1 = num((entry(1, 'fri', 'maxpu') || {}).v);
  const p8 = num((entry(8, 'fri', 'maxpu') || {}).v);
  rows.push({ name: 'Max strict pull-ups', when: t('body.w.fri'), base: p1 != null ? nf(p1) : null, fin: p8 != null ? nf(p8) : null, delta: delta(p1, p8, 'up', (x) => nf(x)) });

  const g1 = num((entry(1, 'fri', 'hang') || {}).v);
  const g8 = num((entry(8, 'fri', 'hang') || {}).v);
  rows.push({ name: 'Dead hang', when: t('body.w.fri'), base: g1 != null ? `${nf(g1)} s` : null, fin: g8 != null ? `${nf(g8)} s` : null, delta: delta(g1, g8, 'up', (x) => `${nf(x)} s`) });

  const hs1 = best3(entry(1, 'fri', 'hsfree'));
  const hs8 = best3(entry(8, 'fri', 'hsfree'));
  rows.push({ name: t('body.t.hs'), when: t('body.w.fri'), base: hs1 != null ? `${nf(hs1)} s` : null, fin: hs8 != null ? `${nf(hs8)} s` : null, delta: delta(hs1, hs8, 'up', (x) => `${nf(x)} s`) });

  [['Weighted pull-up', 'tue', 'wpu', true], ['Weighted dip', 'tue', 'dip', true], ['Bench press', 'thu', 'bench', false], ['Back squat', 'mon', 'squat', false]]
    .forEach(([name, d, key, plus]) => {
      const a = topSetWeeks([1, 2], d, key);
      const z = topSet(8, d, key);
      let dl = null;
      if (a && z) dl = a.kg !== z.kg ? delta(a.kg, z.kg, 'up', (v) => `${nf(v)} kg`) : delta(a.reps, z.reps, 'up', (v) => `${v} ${t('body.reps', { n: v })}`);
      rows.push({ name, when: t('body.w.strength'), base: a ? `${kgTxt(a.kg, plus)} × ${a.reps}` : null, fin: z ? `${kgTxt(z.kg, plus)} × ${z.reps}` : null, delta: dl });
    });

  [['Muscle-up', 'thu', 'mu'], ['HSPU', 'tue', 'hspu'], ['Front lever', 'thu', 'fl']].forEach(([name, d, key]) => {
    rows.push({ name, when: t('body.w.skill'), base: skillStr(1, d, key), fin: skillStr(8, d, key), delta: null });
  });

  const dash = () => h('span.faint', '–');
  const table = h('table.btable',
    h('thead', h('tr',
      h('th', { scope: 'col' }, t('body.tests.col.test')),
      h('th', { scope: 'col' }, t('body.tests.col.base')),
      h('th', { scope: 'col' }, t('body.tests.col.final')))),
    h('tbody', rows.map((r) => h('tr',
      h('th', { scope: 'row' }, r.name, h('small', r.when)),
      h('td', r.baseNode || (r.base != null ? r.base : dash())),
      h('td', h('div.bstack', r.fin != null ? h('span', r.fin) : dash(), r.delta))))));

  render(h('div.fade-in.body',
    h('div.panel',
      h('div.label', t('body.tests.label')),
      h('h2', { style: { margin: '8px 0' } }, t('body.tests.heading')),
      h('p.prose', t('body.tests.intro'))),
    h('div.panel.btable-wrap', table),
    h('div.reveal', h('div.reveal__title', t('body.tests.howTitle')), h('div', t('body.tests.how'))),
  ), { title: t('title.bodyTests'), back: () => nav.go('#/body') });
  nav.setTab('#/body');
}

/* ---------- progress ---------- */

const topKg = (w, d, key) => {
  const x = topSet(w, d, key);
  return x ? x.kg : null;
};

function bestHS(w) {
  const vals = [];
  ['mon', 'tue', 'thu', 'fri', 'sat'].forEach((d) => {
    const v = num((entry(w, d, 'hs') || {}).best);
    if (v != null && v > 0) vals.push(v);
  });
  const x = best3(entry(w, 'fri', 'hsfree'));
  if (x != null) vals.push(x);
  return vals.length ? Math.max(...vals) : null;
}

const METRICS = [
  { name: () => 'Weighted pull-up', unit: 'kg', plus: true, better: 'up', get: (w) => topKg(w, 'tue', 'wpu') },
  { name: () => 'Weighted dip', unit: 'kg', plus: true, better: 'up', get: (w) => topKg(w, 'tue', 'dip') },
  { name: () => 'Bench press', unit: 'kg', better: 'up', get: (w) => topKg(w, 'thu', 'bench') },
  { name: () => 'Back squat', unit: 'kg', better: 'up', get: (w) => topKg(w, 'mon', 'squat') },
  { name: () => 'Broad jump', unit: 'cm', better: 'up', get: (w) => { const v = num((entry(w, 'mon', 'bj') || {}).best); return v != null && v > 0 ? v : null; } },
  { name: () => t('body.t.sprint'), unit: 's', dec: 2, better: 'down', get: (w) => sprintBest(w, entry(w, 'sat', 'sprint')) },
  { name: () => t('body.t.hs'), unit: 's', better: 'up', get: bestHS },
];

function fmtM(m, v) {
  if (m.unit === 'kg') return kgTxt(v, m.plus);
  if (m.unit === 's') return `${nf(v, m.dec)} s`;
  return `${nf(v)} ${m.unit}`;
}

function fmtAbs(m, x) {
  if (m.unit === 'kg') return `${nf(x)} kg`;
  if (m.unit === 's') return `${nf(x, m.dec)} s`;
  return `${nf(x)} ${m.unit}`;
}

/** Eight weeks on one hairline axis; the latest week is the bright point. */
function sparkBody(m) {
  const pts = WEEKS.map((w) => ({ w, v: m.get(w) })).filter((p) => p.v != null);
  if (!pts.length) return null;
  const W = 300;
  const H = 64;
  const px = 10;
  const py = 10;
  const vs = pts.map((p) => p.v);
  const lo = Math.min(...vs);
  const hi = Math.max(...vs);
  const x = (w) => px + ((w - 1) * (W - 2 * px)) / 7;
  const y = (v) => (hi === lo ? H / 2 : py + (1 - (v - lo) / (hi - lo)) * (H - 2 * py - 6));

  let inner = `<line class="bspark__base" x1="${px}" x2="${W - px}" y1="${H - 2}" y2="${H - 2}"/>`;
  WEEKS.forEach((w) => { inner += `<line class="bspark__tick" x1="${x(w)}" x2="${x(w)}" y1="${H - 6}" y2="${H - 2}"/>`; });
  if (pts.length > 1) {
    inner += `<polyline class="bspark__line" points="${pts.map((p) => `${x(p.w).toFixed(1)},${y(p.v).toFixed(1)}`).join(' ')}"/>`;
  }
  pts.forEach((p, i) => {
    const last = i === pts.length - 1;
    inner += `<circle class="bspark__pt${last ? ' is-last' : ''}" cx="${x(p.w).toFixed(1)}" cy="${y(p.v).toFixed(1)}" r="${last ? 3.4 : 2.4}"><title>${esc(`Week ${p.w}: ${fmtM(m, p.v)}`)}</title></circle>`;
  });

  const el = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  el.setAttribute('viewBox', `0 0 ${W} ${H}`);
  el.setAttribute('class', 'bspark');
  el.setAttribute('role', 'img');
  el.setAttribute('aria-label', m.name());
  el.innerHTML = inner;
  return { el, first: pts[0], last: pts[pts.length - 1] };
}

export function viewBodyProgress() {
  const cards = METRICS.map((m) => {
    const sp = sparkBody(m);
    if (!sp) {
      return h('div.panel.bmetric',
        h('div.row', h('span.grow', h('div.drill__name', m.name()), h('div.drill__sub', t('body.prog.none')))));
    }
    const moved = sp.first.w !== sp.last.w;
    return h('div.panel.bmetric.d-body',
      h('div.row',
        h('span.grow',
          h('div.drill__name', m.name()),
          h('div.drill__sub', moved ? t('body.prog.range', { a: sp.first.w, b: sp.last.w }) : t('body.weekOf', { n: sp.last.w }))),
        h('div.bstack.bmetric__right',
          h('span.bmetric__v', fmtM(m, sp.last.v)),
          moved ? delta(sp.first.v, sp.last.v, m.better, (v) => fmtAbs(m, v)) : null)),
      sp.el,
      h('div.baxis', h('span', 'wk 1'), h('span', 'wk 8')));
  });

  const dash = () => h('span.faint', '–');
  const all = h('details.ball',
    h('summary', h('span.label', t('body.prog.all'))),
    h('div.btable-wrap',
      h('table.btable.btable--weeks',
        h('thead', h('tr', h('th', { scope: 'col' }, t('body.prog.measure')), WEEKS.map((w) => h('th', { scope: 'col' }, String(w))))),
        h('tbody', METRICS.map((m) => h('tr',
          h('th', { scope: 'row' }, m.name()),
          WEEKS.map((w) => { const v = m.get(w); return h('td', v == null ? dash() : fmtM(m, v)); })))))));

  render(h('div.fade-in.body',
    h('div.panel',
      h('div.label', t('body.prog.label')),
      h('h2', { style: { margin: '8px 0' } }, t('body.prog.heading')),
      h('p.prose', t('body.prog.intro'))),
    h('div', { style: { marginTop: '10px' } }, cards),
    all,
  ), { title: t('title.bodyProgress'), back: () => nav.go('#/body') });
  nav.setTab('#/body');
}

/* ---------- rules ---------- */

export function viewBodyRules() {
  const blocks = rulesBlocks().map((bl) => {
    if (bl.h) return h('h2', bl.h);
    if (bl.p) return h('p', { html: mdish(bl.p) });
    if (bl.ul) return h('ul', bl.ul.map((li) => h('li', { html: mdish(li) })));
    if (bl.sources) {
      return h('ul.bsources', bl.sources.map((s) => h('li',
        h('span', s.t),
        ' ',
        s.u ? h('a', { href: s.u, target: '_blank', rel: 'noopener' }, s.a) : h('span.bsources__a', s.a))));
    }
    return null;
  });
  render(h('div.fade-in.body',
    h('div.row', { style: { marginBottom: '14px' } }, h('span.chip.chip--accent', t('body.phase'))),
    h('h1', t('body.rules.heading')),
    h('div.article.prose', { style: { marginTop: '16px' } }, blocks),
  ), { title: t('title.bodyRules'), back: () => nav.go('#/body') });
  nav.setTab('#/body');
}

/* ---------- home ---------- */

/** Today's session as one row on the home screen. */
export function bodyHomeNodes() {
  const b = B();
  const td = bodyToday();
  let title;
  let sub;
  let done = false;
  let quiet = false;
  if (!b.start) {
    title = t('body.home.set');
    sub = t('body.home.setSub');
  } else if (td.before != null) {
    title = t('body.start.in', { n: td.before });
    sub = t('body.phase');
  } else if (td.after) {
    title = t('body.start.done');
    sub = t('body.phase');
  } else {
    const sid = sessionOf(td.week, td.day);
    const meta = SESSIONS[sid];
    title = sessName(sid);
    sub = `${t('body.weekOf', { n: td.week })}${meta.dur ? ` · ${meta.dur}` : ''}`;
    const x = doc(td.week, td.day);
    done = !!(x && x.done);
    quiet = sid === 'rest';
  }
  return [
    h('div.section-head', h('span.label', t('home.body'))),
    h(`button.drill.d-body${done || quiet ? '.is-done' : ''}`, {
      type: 'button',
      onclick: () => { resetBodySelection(); nav.go('#/body'); },
    },
    h('span.drill__glyph', svg(PICTOS.body, 20)),
    h('span.grow', h('div.drill__name', title), h('div.drill__sub', sub)),
    done ? h('span.drill__tick', svg(ICONS.check, 18)) : h('span.drill__chev', svg(ICONS.chevron, 18))),
  ];
}
