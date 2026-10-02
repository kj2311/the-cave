/* ============================================================
   sw.js — offline shell.

   Bump CACHE when any precached file changes, otherwise the
   old version is served from cache forever.
   ============================================================ */

const CACHE = 'cave-v17';

const SHELL = [
  './',
  'index.html',
  'manifest.webmanifest',
  'css/app.css',
  'js/app.js',
  'js/ui.js',
  'js/store.js',
  'js/i18n.js',
  'js/content.js',
  'js/paper.js',
  'js/body.js',
  'js/data/body.js',
  'js/data/body.nl.js',
  'js/data/missions.nl.js',
  'js/data/cases.nl.js',
  'js/data/people.nl.js',
  'js/data/lessons.nl.js',
  'js/drills/index.js',
  'js/drills/shared.js',
  'js/drills/sweep.js',
  'js/drills/palace.js',
  'js/drills/chain.js',
  'js/drills/baseline.js',
  'js/drills/hook.js',
  'js/drills/stillness.js',
  'js/data/cases.js',
  'js/data/people.js',
  'js/data/lessons.js',
  'js/data/words.js',
  'js/data/missions.js',
  'icons/icon-32.png',
  'icons/icon-192.png',
  'icons/icon-512.png',
  'icons/icon-maskable-512.png',
  'icons/apple-touch-icon.png',
  'fonts/special-elite.woff2',
  'fonts/old-standard-tt-700.woff2',
  'img/grain.png',
  'img/wear.png',
  // Archive thumbnails, so the clippings are complete offline. The full-size
  // prints are cached the first time an article is opened.
  'img/codex/l-baseline-s.webp',
  'img/codex/l-loci-s.webp',
  'img/codex/l-room-s.webp',
  'img/codex/l-chain-s.webp',
  'img/codex/l-barnum-s.webp',
  'img/codex/l-attention-s.webp',
  'img/codex/l-blindness-s.webp',
  'img/codex/l-still-s.webp',
  'img/codex/l-jane-s.webp',
  'img/codex/l-names-s.webp',
  'img/codex/l-ethics-s.webp',
  'img/codex/l-toolkit-s.webp',
  'img/codex/l-interview-s.webp',
  'img/codex/l-sources-s.webp',
  // Scene photos for the case files: the deduction drill must work offline.
  'img/cases/chef.webp',
  'img/cases/ice.webp',
  'img/cases/car.webp',
  'img/cases/run.webp',
  'img/cases/interp.webp',
  'img/cases/tanline.webp',
  'img/cases/switch.webp',
  'img/cases/cardstock.webp',
  'img/cases/sugar.webp',
  'img/cases/lighter.webp',
  'img/cases/flowers.webp',
  'img/cases/dust.webp',
  'img/cases/mirror.webp',
  'img/cases/photo.webp',
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE)
      // addAll is all-or-nothing; add individually so one bad path
      // cannot break the whole install. `cache: 'reload'` skips the HTTP
      // cache, so a new version can never precache a stale copy of a file.
      .then(c => Promise.all(SHELL.map(u =>
        c.add(new Request(u, { cache: 'reload' })).catch(err => console.warn('[sw] skip', u, err)))))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);
  if (url.origin !== location.origin) return;

  // Navigations: fresh if possible, shell if not.
  if (req.mode === 'navigate') {
    e.respondWith(
      fetch(req)
        .then(res => {
          const copy = res.clone();
          caches.open(CACHE).then(c => c.put(req, copy));
          return res;
        })
        .catch(() => caches.match('index.html').then(r => r || caches.match('./'))),
    );
    return;
  }

  // Everything else: cache first, then network, and remember it.
  e.respondWith(
    caches.match(req).then(hit => {
      if (hit) return hit;
      return fetch(req).then(res => {
        if (res && res.status === 200 && res.type === 'basic') {
          const copy = res.clone();
          caches.open(CACHE).then(c => c.put(req, copy));
        }
        return res;
      });
    }),
  );
});
