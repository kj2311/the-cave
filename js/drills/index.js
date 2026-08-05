/* ============================================================
   drills/index.js — the registry.

   Adding a drill: write the module, import it, drop it in the
   array. Everything else (daily protocol, levels, XP, stats)
   picks it up automatically.
   ============================================================ */

import sweep from './sweep.js';
import palace from './palace.js';
import chain from './chain.js';
import baseline from './baseline.js';
import hook from './hook.js';
import stillness from './stillness.js';

export const DRILLS = [sweep, palace, chain, baseline, hook, stillness];

export const byId = (id) => DRILLS.find(d => d.id === id);

export const drillIds = () => DRILLS.map(d => d.id);
