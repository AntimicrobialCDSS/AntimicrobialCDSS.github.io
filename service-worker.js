const GHPATH = 'https://github.com/AntimicrobialCDSS/AntimicrobialCDSS.github.io/blob/main';
const APP_PREFIX = 'my_awesome_';
const VERSION = 'version_02';

const URLS = [
  '/AbxLinks.json',
  '/index.html',
  '/CDSSLogo.png',
  '/CDSSLogoTab.png',
  '/CDSSVALogo.png',
  '/VASeal.jpg',
  
  '/MinneapolisCDSSV1.html',
  '/MinneapolisItemLinks.json',
  '/MinneapolisOMJSON.json',
  '/MinneapolisODJSON.json',
];

const CACHE_NAME = APP_PREFIX + VERSION;

self.addEventListener('fetch', function (e) {
  console.log('Fetch request: ' + e.request.url);

  e.respondWith(
    caches.match(e.request).then(function (response) {
      if (response) {
        console.log('Responding with cache: ' + e.request.url);
        return response;
      } else {
        console.log('File is not cached, fetching: ' + e.request.url);

        // Attempt to fetch the resource and handle errors
        return fetch(e.request).then(function (response) {
          if (!response || response.status !== 200 || response.type !== 'basic') {
            console.error('Fetch failed for: ' + e.request.url);
            return response;
          }

          // Clone the response before caching and returning it
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then(function (cache) {
            cache.put(e.request, responseToCache);
          });

          return response;
        }).catch(function (error) {
          console.error('Fetch error: ' + error);
        });
      }
    })
  );
});

self.addEventListener('install', function (e) {
  console.log('Installing service worker: ' + CACHE_NAME);

  e.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(URLS).then(function () {
        console.log('Cached files: ' + URLS.join(', '));
      });
    })
  );
});

self.addEventListener('activate', function (e) {
  console.log('Activating service worker: ' + CACHE_NAME);

  e.waitUntil(
    caches.keys().then(function (keyList) {
      return Promise.all(keyList.map(function (key) {
        if (key !== CACHE_NAME) {
          console.log('Deleting cache: ' + key);
          return caches.delete(key);
        }
      }));
    })
  );
});

