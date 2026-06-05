const CACHE_NAME = 'quantum-store-v1';

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim());
});

self.addEventListener('fetch', (event) => {
  // Pass through all requests. We only need the service worker to exist to trigger PWA installability.
  event.respondWith(fetch(event.request).catch(() => {
    // If fetch fails (offline), try cache as a fallback if anything was cached
    return caches.match(event.request);
  }));
});
