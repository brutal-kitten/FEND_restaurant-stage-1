let staticCacheName = 'v1';

let urlsToCache = ['/', 'js/main.js', 'css/styles.css', 'img/', ''];

self.addEventListener('install', function(event) {
    event.waitUntil(caches.open(staticCacheName).then(function(cache) {
      cache.addAll(urlsToCache);
    }));
});
