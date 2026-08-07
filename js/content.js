/* ============================================================
   content.js — language overlays for authored content.

   Authored content lives in English in js/data/. A translation
   file supplies an overlay keyed by id; anything it does not
   cover falls through to the English original, so a partial
   translation degrades gracefully instead of blanking the app.

   Correctness data — which option is `ok`, which fact is the
   `key` — never appears in a translation. Overlays carry plain
   strings in the same order and are merged onto the original,
   so a translation can never change an answer.
   ============================================================ */

import { getLang } from './i18n.js';
import { MISSIONS_NL } from './data/missions.nl.js';
import { CASES_NL } from './data/cases.nl.js';
import { BASELINES_NL, COLDREADS_NL, TECHNIQUES_NL } from './data/people.nl.js';
import { LESSONS_NL } from './data/lessons.nl.js';

const OVERLAYS = {
  nl: {
    missions: MISSIONS_NL,
    cases: CASES_NL,
    baselines: BASELINES_NL,
    coldreads: COLDREADS_NL,
    lessons: LESSONS_NL,
    techniques: TECHNIQUES_NL,
  },
};

function patch(bucket, id) {
  const lang = getLang();
  if (lang === 'en') return null;
  return OVERLAYS[lang]?.[bucket]?.[id] || null;
}

/** Maps translated option text onto the originals, preserving `ok`. */
function mergeOptions(base, translated) {
  if (!Array.isArray(translated)) return base;
  return base.map((o, i) => (translated[i] ? { ...o, t: translated[i] } : o));
}

export function mission(m) {
  const p = patch('missions', m.id);
  return p ? { ...m, ...p } : m;
}

export function caseFile(c) {
  const p = patch('cases', c.id);
  if (!p) return c;
  return { ...c, ...p, options: mergeOptions(c.options, p.options), key: c.key };
}

export function baselineItem(b) {
  const p = patch('baselines', b.id);
  if (!p) return b;
  return { ...b, ...p, options: mergeOptions(b.options, p.options) };
}

export function coldReadItem(c) {
  const p = patch('coldreads', c.id);
  if (!p) return c;
  return { ...c, ...p, options: mergeOptions(c.options, p.options), tech: c.tech };
}

export function technique(key, fallback) {
  const table = getLang() === 'en' ? null : OVERLAYS[getLang()]?.techniques;
  return table?.[key] || fallback;
}

export function lesson(l) {
  const p = patch('lessons', l.id);
  return p ? { ...l, ...p } : l;
}
