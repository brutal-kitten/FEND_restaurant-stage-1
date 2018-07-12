let staticCacheName = 'v2';

let urlsToCache = ['/', 'js/main.js', 'css/styles.css', 'img/', ''];

self.addEventListener('install', function(event) {
    event.waitUntil(caches.open(staticCacheName).then(function(cache) {
      cache.addAll(urlsToCache);
    }));
});

self.addEventListener('fetch', function (event) {
  console.log('here');
  let requestToFetch = event.request.clone();
  event.respondWith(
    fetch(requestToFetch).then(function (response) {
      if(response.status != 400 && (response)) {
        let responseToCache = response.clone();
        caches.open(staticCacheName).then(function(cache){
          cache.put(event.request, responseToCache);
        });
        return response;
      } else {
         return new Response("Sorry, not found");
       };
     }).catch(function() {
       return caches.match(event.request);
     })

  );
});
