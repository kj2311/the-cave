/* ============================================================
   sw.js — offline shell.

   Bump CACHE when any precached file changes, otherwise the
   old version is served from cache forever.
   ============================================================ */

const CACHE = 'cave-v1';

const SHELL = [
  './',
  'index.html',
  'manifest.webmanifest',
  'css/app.css',
  'js/app.js',
  'js/ui.js',
  'js/store.js',
  'js/drills/index.js',
  'js/drills/_shared.js',
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
  'icons/icon-32.png',
  'icons/icon-192.png',
  'icons/icon-512.png',
  'icons/icon-maskable-512.png',
  'icons/apple-touch-icon.png',
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE)
      // addAll is all-or-nothing; add individually so one bad path
      // cannot break the whole install.
      .then(c => Promise.all(SHELL.map(u => c.add(u).catch(err => console.warn('[sw] skip', u, err)))))
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
