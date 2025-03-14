const cacheName = "CustomerTransformation-TheBadGastein-0.4.0";
const contentToCache = [
  "Build/DopeSlopes.loader.js",
  "Build/DopeSlopes.framework.js",
  "Build/DopeSlopes.data",
  "Build/DopeSlopes.wasm",
  "TemplateData/style.css"
];

// Cache core files on install
self.addEventListener("install", (e) => {
  e.waitUntil(
    (async () => {
      const cache = await caches.open(cacheName);
      await cache.addAll(contentToCache);
      console.log("[SW] Cached core Unity files");
    })()
  );
});

// Always fetch from network except for those core files
self.addEventListener("fetch", (e) => {
  // If it's one of our pre-cached files, serve from cache
  if (contentToCache.some((url) => e.request.url.endsWith(url))) {
    e.respondWith(caches.match(e.request));
    return;
  }

  // Everything else always goes to the network
  e.respondWith(fetch(e.request));
});
