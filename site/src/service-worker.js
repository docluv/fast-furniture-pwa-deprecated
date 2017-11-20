importScripts('sw/workbox-sw.prod.v2.1.1.js');

const workboxSW = new WorkboxSW({
    clientsClaim: true,
    skipWaiting: true
});
//Create a constant with the number of seconds in a day
const oneday = 60 * 60 * 24;


workboxSW.precache([]);

workboxSW.router.registerRoute('/product/(.*)',
    workboxSW.strategies.cacheFirst({
        cacheName: 'product-html',
        cacheExpiration: {
            "maxEntries": 20,
            "maxAgeSeconds": oneday
        },
        cacheableResponse: { statuses: [0, 200] }
    })
);


workboxSW.router.registerRoute('/images/(.jpg)',
    workboxSW.strategies.cacheFirst({
        cacheName: 'product-images',
        cacheExpiration: {
            "maxEntries": 40,
            "maxAgeSeconds": oneday
        },
        cacheableResponse: { statuses: [0, 200] }
    })
);


workboxSW.router.registerRoute('/category/(.*)',
    workboxSW.strategies.cacheFirst({
        cacheName: 'category-html',
        cacheExpiration: {
            "maxEntries": 20,
            "maxAgeSeconds": oneday
        },
        cacheableResponse: { statuses: [0, 200] }
    })
);

