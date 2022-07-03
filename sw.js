/**
 * Schale DB Service Worker
 * Enables resources to be cached longer than basic HTTP cache 
 * Also enables installable PWA support
 */

// data cache version should match common.js
const dataCacheVer = 9;
const imgCacheVer = 1;

const dataCacheName = `schale-data-v${dataCacheVer}`;

// don't precache language-specific files
const dataPreCacheFiles = [
    './data/common.json',
    './data/crafting.json',
    './data/localization.json',
    './data/raids.json',
    './data/summons.json',
];

const coreCacheName = `schale-core-v${dataCacheVer}`;
const corePreCacheFiles = [
    './',
    './html/craft.html',
    './html/home.html',
    './html/items.html',
    './html/raids.html',
    './html/stages.html',
    './html/students.html',
    './css/main.css',
    './js/common.min.js',
];

const imageCacheName = `schale-images-v${imgCacheVer}`;
const currentCacheList = []


self.addEventListener('install', (e) => {
    console.log('[SW] Installed');
    e.waitUntil((async () => {
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
        //remove old caches
        caches.keys().then((keys) => {
            return Promise.all(keys.map((key) => {
                if (!currentCacheList.includes(key)) {
                    console.log(`[SW] Purging outdated cache ${key}`);
                    return caches.delete(key);
                }
            }));
        });
        self.skipWaiting();
    })());
});

self.addEventListener('fetch', (e) => {
    //console.log(`[SW] Fetching Resource ${e.request.url}`);
    e.respondWith((async () => {
        //console.log(e.request)
        if (e.request.method != 'GET') {return await fetch(e.request);}
        const hasQuery = e.request.url.includes('?');
        const r = await caches.match(e.request, {ignoreSearch: hasQuery});
        
        if (r) { 
            //console.log(`[SW] Fetched cached resource: ${e.request.url}`);
            return r;
        }
        const response = await fetch(e.request);

        if (response.type == 'basic') {
            //cache same origin files
            const requestURL = new URL(e.request.url);
            if (requestURL.pathname.startsWith('/images/')) {
                const imageCache = await caches.open(imageCacheName);
                //console.log(`[SW] Caching new image resource: ${e.request.url}`);
                imageCache.put(e.request, response.clone());
            } else if (requestURL.pathname.startsWith('/data/')) {
                const dataCache = await caches.open(dataCacheName);
                //console.log(`[SW] Caching new data resource: ${e.request.url}`);
                try {
                    dataCache.put(e.request, response.clone());
                }
                catch (error) {
                    console.log(error)
                }
            } else {
                const coreCache = await caches.open(coreCacheName);
                //console.log(`[SW] Caching new app shell/other resource: ${e.request.url}`);
                try {
                    coreCache.put(e.request, response.clone());
                }
                catch (error) {
                    console.log(error)
                }
            }
        }
        return response;
    })());
});