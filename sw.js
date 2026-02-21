const CACHE_NAME = "pwa-eletrico-v4";

const FILES_TO_CACHE = [
  "/pwaeletrico/",
  "/pwaeletrico/index.html",
  "/pwaeletrico/app_updated.js",
  "/pwaeletrico/styles.css",
  "/pwaeletrico/html2pdf.bundle.min.js",
  "/pwaeletrico/icon-192.png",
  "/pwaeletrico/icon-512.png"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(FILES_TO_CACHE))
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
