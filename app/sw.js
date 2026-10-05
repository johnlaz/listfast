// ListFast service worker. Keep CACHE in step with APP_VERSION in index.html.
const CACHE = 'listfast-v1.3';
const ASSETS = ['./', './index.html', './manifest.json', './icon-192.png', './icon-512.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
});

// Update flow: the page shows an "update ready" toast and asks us to activate.
self.addEventListener('message', e => {
  if (e.data === 'SKIP_WAITING') self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  const url = new URL(req.url);
  // Never touch API calls, image generators, fonts or anything cross-origin / non-GET.
  if (req.method !== 'GET' || url.origin !== self.location.origin) return;

  if (req.mode === 'navigate' || url.pathname.endsWith('.html')) {
    // Network-first (3s timeout) so a weak signal falls back to the cached app.
    e.respondWith(
      new Promise(resolve => {
        const t = setTimeout(() => caches.match('./index.html').then(r => r && resolve(r)), 3000);
        fetch(req).then(res => {
          clearTimeout(t);
          const copy = res.clone();
          caches.open(CACHE).then(c => c.put('./index.html', copy));
          resolve(res);
        }).catch(() => { clearTimeout(t); caches.match('./index.html').then(r => resolve(r || Response.error())); });
      })
    );
  } else {
    // Cache-first for local static assets.
    e.respondWith(caches.match(req).then(r => r || fetch(req)));
  }
});
