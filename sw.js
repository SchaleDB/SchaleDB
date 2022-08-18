/**
 * Schale DB Service Worker
 * Enables resources to be cached longer than basic HTTP cache 
 * Also enables installable PWA support
 */

// cache versions should match common.js
const dataCacheVer = 27;
const staticCacheVer = 1;

const dataCacheName = `schale-data-v${dataCacheVer}`;

// don't precache language-specific files
const dataPreCacheFiles = [
    './data/common.min.json',
    './data/crafting.min.json',
    './data/raids.min.json',
    './data/summons.min.json',
];

const coreCacheName = `schale-core-v${dataCacheVer}`;
const corePreCacheFiles = [
    './',
    './html/craft.html?v=' + dataCacheVer,
    './html/home.html?v=' + dataCacheVer,
    './html/items.html?v=' + dataCacheVer,
    './html/raids.html?v=' + dataCacheVer,
    './html/stages.html?v=' + dataCacheVer,
    './html/students.html?v=' + dataCacheVer,
    './css/main.css?v=' + dataCacheVer,
    './js/common.min.js?v=' + dataCacheVer,
    './manifest.json',
    './favicon.png',
];

const staticCacheName = `schale-static-v${staticCacheVer}`;
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
        const staticCache = await caches.open(staticCacheName);
        currentCacheList.push(staticCacheName);
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

        if (response.ok && response.type == 'basic') {
            //cache same origin files
            const requestURL = new URL(e.request.url);
            if (requestURL.pathname.includes('/images/') || requestURL.pathname.includes('/lib/') || requestURL.pathname.includes('/fonts/')) {
                const staticCache = await caches.open(staticCacheName);
                //console.log(`[SW] Caching new static resource: ${e.request.url}`);
                try {
                    staticCache.put(e.request, response.clone());
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