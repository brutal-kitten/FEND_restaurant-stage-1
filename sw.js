let staticCacheName = 'v1';

let urlsToCache = ['/', 'js/main.js', 'css/styles.css', 'img/', ''];

self.addEventListener('install', function(event) {
    event.waitUntil(caches.open(staticCacheName).then(function(cache) {
      cache.addAll(urlsToCache);
    }));
});

function noConnectionResponse(event) {
  return new Response(caches.match(event.request).then(function(response) {
    if (response) {
      return response;
    } else {
      return new Response("Sorry, not found");
      }
  }));
}

self.addEventListener('fetch', function (event) {
  console.log('here');
  let requestToFetch = event.request.clone();
  event.respondWith(
    fetch(requestToFetch).then(function (response) {
      if(response.status != 400) {
        let responseToCache = response.clone();
        caches.open(staticCacheName).then(function(cache){
          cache.put(event.request, responseToCache);
        });
        return response;
      };
    })
  );
});

/**
  event.respondWith(
  //  fetch(event.request).then(function (response) {
    //  if(response.status == 404) {
    //    noConnectionResponse(event);
//} else {
          event.waitUntil(caches.open(staticCacheName).then(function(cache) {
            cache.put(event.request, response.clone());
            return response;
        }))
      )
    // }
    }
  )
//  );
//});
**/
