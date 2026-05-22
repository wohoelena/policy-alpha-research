const CACHE_NAME = "policy-alpha-research-v7";
const CORE_ASSETS = [
  "/",
  "/index.html",
  "/zh.html",
  "/articles.html",
  "/zh-articles.html",
  "/methodology.html",
  "/zh-methodology.html",
  "/styles.css?v=20260522-seo-structure",
  "/script.js?v=20260522-zh-insight-title",
  "/site.webmanifest",
  "/sitemap.xml",
  "/feed.xml",
  "/llms.txt",
  "/humans.txt",
  "/favicon.ico",
  "/assets/policy-alpha-logo.png",
  "/assets/app-icon-192.png",
  "/assets/app-icon-512.png",
  "/assets/social/lithium-share-card.png",
  "/assets/social/zh-lithium-share-card.png",
  "/assets/social/ai-infrastructure-share-card.png",
  "/assets/social/zh-ai-infrastructure-share-card.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(CORE_ASSETS)),
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))),
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  const request = event.request;
  const isPageRequest =
    request.mode === "navigate" ||
    (request.headers.get("accept") || "").includes("text/html");

  if (isPageRequest) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
          return response;
        })
        .catch(() => caches.match(request).then((cached) => cached || caches.match("/index.html"))),
    );
    return;
  }

  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached;
      return fetch(request).then((response) => {
        const copy = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
        return response;
      });
    }),
  );
});
