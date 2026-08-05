/* ============================================================
   ui.js — tiny DOM layer. No framework, no build step.
   ============================================================ */

/** Hyperscript: h('div.panel', {onclick}, 'text', child) */
export function h(spec, props, ...kids) {
  const [tagPart, ...classes] = String(spec).split('.');
  const tag = tagPart || 'div';
  const el = document.createElement(tag);
  if (classes.length) el.className = classes.join(' ');

  if (props && (typeof props !== 'object' || props instanceof Node || Array.isArray(props))) {
    kids.unshift(props);
    props = null;
  }

  if (props) {
    for (const [k, v] of Object.entries(props)) {
      if (v === null || v === undefined || v === false) continue;
      if (k === 'class') el.className += (el.className ? ' ' : '') + v;
      else if (k === 'html') el.innerHTML = v;
      else if (k === 'style' && typeof v === 'object') setStyle(el, v);
      else if (k.startsWith('on') && typeof v === 'function') el.addEventListener(k.slice(2), v);
      else if (k === 'dataset') Object.assign(el.dataset, v);
      else if (v === true) el.setAttribute(k, '');
      else el.setAttribute(k, v);
    }
  }

  add(el, kids);
  return el;
}

/** Custom properties need setProperty; assigning to style[--x] is ignored. */
function setStyle(el, obj) {
  for (const [k, v] of Object.entries(obj)) {
    if (v === null || v === undefined) continue;
    if (k.startsWith('--')) el.style.setProperty(k, v);
    else el.style[k] = v;
  }
}

function add(el, kids) {
  for (const kid of kids) {
    if (kid === null || kid === undefined || kid === false) continue;
    if (Array.isArray(kid)) add(el, kid);
    else if (kid instanceof Node) el.appendChild(kid);
    else el.appendChild(document.createTextNode(String(kid)));
  }
}

export function svg(paths, size = 24) {
  const wrap = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  wrap.setAttribute('viewBox', '0 0 24 24');
  wrap.setAttribute('width', size);
  wrap.setAttribute('height', size);
  wrap.setAttribute('aria-hidden', 'true');
  wrap.innerHTML = paths;
  return wrap;
}

export const ICONS = {
  chevron: '<path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>',
  check:   '<path d="M4 12.5l5 5L20 6.5" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>',
  eye:     '<path d="M2 12s3.8-6.5 10-6.5S22 12 22 12s-3.8 6.5-10 6.5S2 12 2 12z" fill="none" stroke="currentColor" stroke-width="1.7"/><circle cx="12" cy="12" r="2.7" fill="currentColor"/>',
  palace:  '<path d="M4 20V9.5L12 4l8 5.5V20" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><path d="M9 20v-5h6v5M4 20h16" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/>',
  chain:   '<path d="M9.5 14.5a3.5 3.5 0 0 1 0-5l2-2a3.5 3.5 0 0 1 5 5l-1 1" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/><path d="M14.5 9.5a3.5 3.5 0 0 1 0 5l-2 2a3.5 3.5 0 0 1-5-5l1-1" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/>',
  face:    '<circle cx="12" cy="12" r="8.5" fill="none" stroke="currentColor" stroke-width="1.7"/><circle cx="9.2" cy="10.3" r="1.1" fill="currentColor"/><circle cx="14.8" cy="10.3" r="1.1" fill="currentColor"/><path d="M8.8 15.2c1.9 1.3 4.5 1.3 6.4 0" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/>',
  hook:    '<path d="M12 20V9a3.5 3.5 0 1 1 7 0" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/><path d="M8 17.2 12 21l4-3.8" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>',
  still:   '<circle cx="12" cy="12" r="8.5" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M12 7.5V12l3 2" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>',
  spark:   '<path d="M12 3l1.9 5.6L19.5 10l-5.6 1.9L12 17.5l-1.9-5.6L4.5 10l5.6-1.4z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>',
  book:    '<path d="M5 4h9a3 3 0 0 1 3 3v13H8a3 3 0 0 1-3-3z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/>',
  lock:    '<rect x="5" y="10.5" width="14" height="9.5" rx="2" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5" fill="none" stroke="currentColor" stroke-width="1.7"/>',
  empty:   '<circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="1.5" stroke-dasharray="3 3"/>',
};

/* ---------- toast ---------- */

let toastTimer = null;
export function toast(msg, ms = 2400) {
  const el = document.getElementById('toast');
  if (!el) return;
  el.textContent = msg;
  el.classList.add('is-up');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('is-up'), ms);
}

/* ---------- haptics (iOS ignores this, Android honours it) ---------- */

export function buzz(pattern = 12) {
  try { navigator.vibrate?.(pattern); } catch {}
}

/* ---------- view mounting ---------- */

const viewEl = () => document.getElementById('view');

export function render(node, { focusMode = false, title = 'THE CAVE', back = null } = {}) {
  const v = viewEl();
  v.replaceChildren();
  v.classList.toggle('is-focus', focusMode);
  v.appendChild(node);
  v.scrollTop = 0;
  window.scrollTo(0, 0);

  document.getElementById('topTitle').textContent = title;
  document.getElementById('tabbar').hidden = focusMode;

  const backBtn = document.getElementById('backBtn');
  backBtn.hidden = !back;
  backBtn.onclick = back || null;
}

/* ---------- timing helpers ---------- */

export const wait = (ms) => new Promise(r => setTimeout(r, ms));

/** Cancellable interval bag — drills register timers so navigation cleans up. */
export function timers() {
  const ids = [];
  return {
    after(fn, ms) { const id = setTimeout(fn, ms); ids.push(id); return id; },
    every(fn, ms) { const id = setInterval(fn, ms); ids.push(id); return id; },
    clear() { ids.forEach(id => { clearTimeout(id); clearInterval(id); }); ids.length = 0; },
  };
}

/* ---------- misc ---------- */

export const rand = (n) => Math.floor(Math.random() * n);
export const pick = (arr) => arr[rand(arr.length)];

export function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = rand(i + 1);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function sampleUnique(arr, n) {
  return shuffle(arr).slice(0, Math.min(n, arr.length));
}

export function fmtDate(ts) {
  return new Date(ts).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' });
}

/**
 * Small score-over-time line. `values` are 0..1, oldest first.
 * Returns null when there is not enough history to say anything.
 */
export function sparkline(values, { w = 88, hgt = 26, color = 'var(--accent, var(--amber))' } = {}) {
  if (!values || values.length < 2) return null;
  const pad = 3;
  const stepX = (w - pad * 2) / (values.length - 1);
  const y = v => pad + (1 - Math.max(0, Math.min(1, v))) * (hgt - pad * 2);
  const pts = values.map((v, i) => `${(pad + i * stepX).toFixed(1)},${y(v).toFixed(1)}`);

  const el = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  el.setAttribute('width', w);
  el.setAttribute('height', hgt);
  el.setAttribute('viewBox', `0 0 ${w} ${hgt}`);
  el.setAttribute('aria-hidden', 'true');
  el.style.display = 'block';

  const last = values[values.length - 1];
  el.innerHTML = `
    <polyline points="${pts.join(' ')}" fill="none" stroke="${color}" stroke-width="1.6"
              stroke-linecap="round" stroke-linejoin="round" opacity=".85"/>
    <circle cx="${(pad + (values.length - 1) * stepX).toFixed(1)}" cy="${y(last).toFixed(1)}" r="2.4" fill="${color}"/>`;
  return el;
}

export function ringSvg(pct, size = 62, stroke = 5) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const el = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  el.setAttribute('width', size);
  el.setAttribute('height', size);
  el.setAttribute('viewBox', `0 0 ${size} ${size}`);
  el.setAttribute('class', 'ring');
  el.innerHTML = `
    <circle class="ring__track" cx="${size/2}" cy="${size/2}" r="${r}" fill="none" stroke-width="${stroke}"/>
    <circle class="ring__fill" cx="${size/2}" cy="${size/2}" r="${r}" fill="none" stroke-width="${stroke}"
            stroke-linecap="round" stroke-dasharray="${c}" stroke-dashoffset="${c * (1 - Math.max(0, Math.min(1, pct)))}"
            transform="rotate(-90 ${size/2} ${size/2})"/>`;
  return el;
}
