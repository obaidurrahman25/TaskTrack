
const CACHE_NAME = 'tasktrack';
const cache_assets = [
    '/',
    '/index.js',
    '/App.js',
    '/static/js/bundle.js',
    '/to-do-list',
    // Add other assets you want to cache
  ];

  self.addEventListener('install', (event) => {
    event.waitUntil(
      caches.open(CACHE_NAME)
        .then((cache) => {
          console.log('Opened cache');
          cache.addAll(cache_assets);
        })
        .then(() => self.skipWaiting())
    );
  });

  self.addEventListener('activate', (event) => {
    console.log("Service worker activated");
  });

  self.addEventListener('fetch', (event) => {
    event.respondWith(
      caches.match(event.request)
        .then((response) => {
          if (response) {
            return response;
          }
          return fetch(event.request);
        })
    );
  });