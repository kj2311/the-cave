/* ============================================================
   content.js — language overlays for authored content.

   Long-form content lives in English in js/data/. A translation
   file supplies an overlay keyed by id; anything it does not
   cover falls through to the English original, so a partial
   translation degrades gracefully instead of blanking the app.
   ============================================================ */

import { getLang } from './i18n.js';
import { MISSIONS_NL } from './data/missions.nl.js';

const OVERLAYS = {
  nl: { missions: MISSIONS_NL },
};

function overlay(bucket, item) {
  const lang = getLang();
  if (lang === 'en') return item;
  const table = OVERLAYS[lang]?.[bucket];
  const patch = table?.[item.id];
  return patch ? { ...item, ...patch } : item;
}

export const mission = (m) => overlay('missions', m);

/** True when the item has no translation in the active language. */
export function untranslated(bucket, item) {
  const lang = getLang();
  if (lang === 'en') return false;
  return !OVERLAYS[lang]?.[bucket]?.[item.id];
}
