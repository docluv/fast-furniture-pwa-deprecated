module.exports = {
  "globDirectory": ".\\",
  "globPatterns": [
    "css/**/*.css",
    "js/**/*.js",
    "index.html",
    "404/index.html",
    "categories/index.html",
    "contact/index.html",
    "fallback/index.html",
    "settings/index.html",
    "categories/index.html",
    "category/index.html",
    "product-template.html",
    "api/products/35.json",
    "fallback.html"],
  "swSrc": "service-worker.js",
  "swDest": "service-worker-workbox.js",
  "globIgnores": [
    "workbox-cli-config.js",
    "images/**/*.*",
    "product/**/*.*",
    "sw/**/*.*"
  ]
};
