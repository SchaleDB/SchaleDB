/**
 * Schale DB Service Worker
 * Enables resources to be cached longer than basic HTTP cache 
 * Also enables installable PWA support
 */

// cache versions should match common.js
const dataCacheVer = 13;
const coreCacheVer = 13;
const imgCacheVer = 2;

const dataCacheName = `schale-data-v${dataCacheVer}`;

// don't precache language-specific files
const dataPreCacheFiles = [
    './data/common.json',
    './data/crafting.json',
    './data/localization.json',
    './data/raids.json',
    './data/summons.json',
];

const coreCacheName = `schale-core-v${coreCacheVer}`;
const corePreCacheFiles = [
    './?v=' + coreCacheVer,
    './html/craft.html?v=' + coreCacheVer,
    './html/home.html?v=' + coreCacheVer,
    './html/items.html?v=' + coreCacheVer,
    './html/raids.html?v=' + coreCacheVer,
    './html/stages.html?v=' + coreCacheVer,
    './html/students.html?v=' + coreCacheVer,
    './css/main.css?v=' + coreCacheVer,
    './js/common.min.js?v=' + coreCacheVer,
    './manifest.json',
    './favicon.png',
];

const imageCacheName = `schale-images-v${imgCacheVer}`;
const currentCacheList = []


self.addEventListener('install', (e) => {
    console.log('[SW] Installed');
    e.waitUntil((async () => {
        self.skipWaiting();
        const dataCache = await caches.open(dataCacheName);
        currentCacheList.push(dataCacheName)
        console.log('[SW] Caching Data Files');
        await dataCache.addAll(dataPreCacheFiles.map((v) => v + `?v=${dataCacheVer}`));
        const coreCache = await caches.open(coreCacheName);
        currentCacheList.push(coreCacheName)
        console.log('[SW] Caching App Shell Files');
        await coreCache.addAll(corePreCacheFiles);
        const imageCache = await caches.open(imageCacheName);
        currentCacheList.push(imageCacheName);
    })());
});

self.addEventListener('activate', (e) => {
    console.log('[SW] Activated');
    e.waitUntil(
        //remove old caches
        caches.keys().then((keys) => {
            return Promise.all(keys.map((key) => {
                if (!currentCacheList.includes(key)) {
                    console.log(`[SW] Purging outdated cache ${key}`);
                    return caches.delete(key);
                }
            }));
        })
    )
})

self.addEventListener('fetch', (e) => {
    //console.log(`[SW] Fetching Resource ${e.request.url}`);
    e.respondWith((async () => {
        //console.log(e.request)
        if (e.request.method != 'GET') {return await fetch(e.request);}
        const hasQuery = e.request.url.includes('/?');
        const r = await caches.match(e.request, {ignoreSearch: hasQuery});
        
        if (r) { 
            //console.log(`[SW] Fetched cached resource: ${e.request.url}`);
            return r;
        }
        const response = await fetch(e.request);

        if (response.type == 'basic') {
            //cache same origin files
            const requestURL = new URL(e.request.url);
            if (requestURL.pathname.includes('/images/')) {
                const imageCache = await caches.open(imageCacheName);
                //console.log(`[SW] Caching new image resource: ${e.request.url}`);
                try {
                    imageCache.put(e.request, response.clone());
                }
                catch (error) {
                    console.log(error)
                }
            } else if (requestURL.pathname.includes('/data/')) {
                const dataCache = await caches.open(dataCacheName);
                //console.log(`[SW] Caching new data resource: ${e.request.url}`);
                try {
                    dataCache.put(e.request, response.clone());
                }
                catch (error) {
                    console.log(error)
                }
            }
        }
        return response;
    })());
});