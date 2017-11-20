
var version = "v1",
    precache_urls = [
        "http://fonts.googleapis.com/css?family=Open+Sans:400italic,700italic,400,600,700,800",
        "http://fonts.googleapis.com/css?family=Open+Sans+Condensed:700",
        "css/bootstrap.min.css",
        "css/site.css",
        "js/jquery.small.js",
        "js/bootstrap.min.js",
        "js/app.js",
        "/",
        "/404",
        "/categories",
        "/contact",
        "/cart"
    ],
    preCacheName = "precache-" + version;

self.addEventListener('install', function (event) {

    event.waitUntil(
        caches.open(preCacheName).then(function (cache) {

            return cache.addAll(precache_urls);

        }));

});


self.addEventListener('activate', function (event) {

    console.log("service worker activated");

});