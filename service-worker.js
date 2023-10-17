
const GHPATH = 'https://github.com/AntimicrobialCDSS/AntimicrobialCDSS.github.io/blob/main';
// Change to a different app prefix name
const APP_PREFIX = 'my_awesome_';
const VERSION = 'version_02';

// The files to make available for offline use. make sure to add 
// others to this list
const URLS = [
  '${GHPATH}/AbxLinks.json',
  '${GHPATH}/index.html',
  '${GHPATH}/CDSSLogo.png',
  '${GHPATH}/CDSSLogoTab.png',
  '${GHPATH}/CDSSVALogo.png',
  '${GHPATH}/VASeal.jpg',
  
  '${GHPATH}/MinneapolisCDSSV1.html',
  '${GHPATH}/MinneapolisItemLinks.json',
  '${GHPATH}/MinneapolisOMJSON.json',
  '${GHPATH}/MinneapolisODJSON.json',
  
  '${GHPATH}/DesMoinesCDSSV1.html',
   '${GHPATH}/DesMoinesItemLinks.json',
  '${GHPATH}/DesMoinesOMJSON.json',
  '${GHPATH}/DesMoinesODJSON.json',
  
  '${GHPATH}/OmahaCDSSV1.html',
  '${GHPATH}/OmahaItemLinks.json',
  '${GHPATH}/OmahaOMJSON.json',
  '${GHPATH}/OmahaODJSON.json',
  
  '${GHPATH}/SiouxFallsCDSSV1.html',
  '${GHPATH}/SiouxFallsItemLinks.json',
  '${GHPATH}/SiouxFallsOMJSON.json',
  '${GHPATH}/SiouxFallsODJSON.json',

  '${GHPATH}/StCloudCDSSV1.html',
  '${GHPATH}/StCloudItemLinks.json',
  '${GHPATH}/StCloudOMJSON.json',
  '${GHPATH}/StCloudODJSON.json',
  
]

const CACHE_NAME = APP_PREFIX + VERSION
self.addEventListener('fetch', function (e) {
  console.log('Fetch request : ' + e.request.url);
  e.respondWith(
    caches.match(e.request).then(function (request) {
      if (request) {
        console.log('Responding with cache : ' + e.request.url);
        return request
      } else {
        console.log('File is not cached, fetching : ' + e.request.url);
        return fetch(e.request)
      }
    })
  )
})

self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      console.log('Installing cache : ' + CACHE_NAME);
      return cache.addAll(URLS)
    })
  )
})

self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then(function (keyList) {
      var cacheWhitelist = keyList.filter(function (key) {
        return key.indexOf(APP_PREFIX)
      })
      cacheWhitelist.push(CACHE_NAME);
      return Promise.all(keyList.map(function (key, i) {
        if (cacheWhitelist.indexOf(key) === -1) {
          console.log('Deleting cache : ' + keyList[i]);
          return caches.delete(keyList[i])
        }
      }))
    })
  )
})
