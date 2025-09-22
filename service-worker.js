const APP_PREFIX = 'CDSS_';
const VERSION = '1.228'; // Update the version when you make changes
const CACHE_NAME = APP_PREFIX + VERSION;

const URLS = [
  '/AbxLinks.json',
  '/Antimicrobial CDSS Frequently Asked Questions.pdf',
  '/AppInstall.html',
  '/AppInstall.jpg',
  '/CDSSLogo.png',
  '/CDSSLogoApp.png',
  '/CDSSLogoLarge.png',
  '/CDSSLogoTab.png',
  '/CDSSVALogo.png',
  '/Disclaimer.html',
  '/Resources.html',
  '/VASeal.jpg',
  '/index.html',
  '/manifest.webmanifest',
  '/service-worker.js',
  
  '/Minneapolis.txml',
  '/MinneapolisCDSS.html',
  '/MinneapolisItemLinks.json',
  '/MinneapolisOMJSON.json',
  '/MinneapolisODJSON.json',

  '/BlackHills.txml',
  '/BlackHillsCDSS.html',
  '/BlackHillsOMJSON.json',
  '/BlackHillsODJSON.json',
    
  '/DesMoinesCDSS.html',
  '/DesMoinesItemLinks.json',
  '/DesMoinesOMJSON.json',
  '/DesMoinesODJSON.json',
      
  '/FargoCDSS.html',
  '/FargoItemLinks.json',
  '/FargoOMJSON.json',
  '/FargoODJSON.json',
  
  '/OmahaCDSS.html',
  '/OmahaItemLinks.json',
  '/OmahaOMJSON.json',
  '/OmahaODJSON.json',
  
  '/SiouxFallsCDSS.html',
  '/SiouxFallsItemLinks.json',
  '/SiouxFallsOMJSON.json',
  '/SiouxFallsODJSON.json',

  '/StCloud.txml',
  '/StCloudCDSS.html',
  '/StCloudItemLinks.json',
  '/StCloudOMJSON.json',
  '/StCloudODJSON.json',

  '/Fonts/PTSerif-Bold.eot',
  '/Fonts/PTSerif-Bold.svg',
  '/Fonts/PTSerif-Bold.ttf',
  '/Fonts/PTSerif-Bold.woff',
  '/Fonts/PTSerif-Bold.woff2',

  '/Fonts/PTSerif-BoldItalic.eot',
  '/Fonts/PTSerif-BoldItalic.svg',
  '/Fonts/PTSerif-BoldItalic.ttf',
  '/Fonts/PTSerif-BoldItalic.woff',
  '/Fonts/PTSerif-BoldItalic.woff2',

  '/Fonts/PTSerif-Italic.eot',
  '/Fonts/PTSerif-Italic.svg',
  '/Fonts/PTSerif-Italic.ttf',
  '/Fonts/PTSerif-Italic.woff',
  '/Fonts/PTSerif-Italic.woff2',

  '/Fonts/PTSerif-Regular.eot',
  '/Fonts/PTSerif-Regular.svg',
  '/Fonts/PTSerif-Regular.ttf',
  '/Fonts/PTSerif-Regular.woff',
  '/Fonts/PTSerif-Regular.woff2',
];

self.addEventListener('install', function (e) {
  console.log('Installing service worker: ' + CACHE_NAME);

  e.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      console.log('Caching files: ' + URLS.join(', '));
      return cache.addAll(URLS);
    })
  );
});

self.addEventListener('activate', function (e) {
  console.log('Activating service worker: ' + CACHE_NAME);

  e.waitUntil(
    caches.keys().then(function (keyList) {
      return Promise.all(keyList.map(function (key) {
        if (key !== CACHE_NAME) {
          console.log('Deleting old cache: ' + key);
          return caches.delete(key);
        }
      }));
    }).then(function () {
      console.log('Service worker activated.');
      return self.clients.claim();
    })
  );
});

self.addEventListener('fetch', function (e) {
  console.log('Fetch request: ' + e.request.url);

  if (!e.request.url.startsWith(self.location.origin)) {
    console.log('Skipping caching for third-party resource: ' + e.request.url);
    return;
  }

  e.respondWith(
    caches.match(e.request).then(function (response) {
      // Reload assets if version has changed.
      const fetchRequest = e.request.clone();

      return (
        response || fetch(fetchRequest).then(function (networkResponse) {
          // Check if we received a valid response
          if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
            return networkResponse;
          }

          const responseToCache = networkResponse.clone();

          caches.open(CACHE_NAME).then(function (cache) {
            cache.put(e.request, responseToCache);
          });

          return networkResponse;
        }).catch(function (error) {
          console.error('Fetch error: ' + error);
        })
      );
    })
  );
});
