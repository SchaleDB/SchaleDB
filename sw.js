/**
 * Schale DB Service Worker
 * Enables resources to be cached longer than basic HTTP cache 
 * Also enables installable PWA support
 * Update 22/08/2022: Changed to cache only images & static resources
 */

const staticCacheVer = 3;
const staticCacheName = `schale-static-v${staticCacheVer}`;
const currentCacheList = [];


self.addEventListener('install', (e) => {
    console.log('[SW] Installed');
    e.waitUntil((async () => {
        self.skipWaiting();
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
    e.respondWith((async () => {

        if (e.request.method != 'GET') {return await fetch(e.request);}
        
        const r = await caches.match(e.request);
        if (r) {return r;}

        const response = await fetch(e.request);
        if (response.ok && response.type == 'basic') {
            const requestURL = new URL(e.request.url);
            if (requestURL.pathname.includes('/images/') || requestURL.pathname.includes('/lib/') || requestURL.pathname.includes('/fonts/')) {
                const staticCache = await caches.open(staticCacheName);
                try {
                    staticCache.put(e.request, response.clone());
                }
                catch (error) {
                    console.log(error)
                }
            }
        }
        return response;
    })());
});