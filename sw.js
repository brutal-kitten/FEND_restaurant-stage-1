let staticCacheName = 'v3';

let urlsToCache = ['/', 'js/main.js', 'css/styles.css', 'img/', 'https://maps.googleapis.com/maps/api/js?key=AIzaSyD5Ns3nRSYw0-ydAGkx_4mzUM-BykeoIXg&libraries=places&callback=initMap'];

self.addEventListener('install', function(event) {
    event.waitUntil(caches.open(staticCacheName).then(function(cache) {
      cache.addAll(urlsToCache);
    }));
});

self.addEventListener('fetch', function (event) {

  let requestToFetch = event.request.clone();
  event.respondWith(
    fetch(requestToFetch).then(function (response) {
      if(response.status === 404) {
        return new Response("Sorry, not found");
      } else {
        // clone the response because it will be consumed it the proces of caching
        let responseToCache = response.clone();
        //cache the response
        caches.open(staticCacheName).then(function(cache) {
          cache.put(event.request, responseToCache);
        });
        //show response to user
        return response;
      };
     }).catch(function() {
       //if there is no connnection  show the cached page
       return caches.match(event.request);
     })

  );
});
