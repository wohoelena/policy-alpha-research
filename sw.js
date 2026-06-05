const CACHE_NAME = "policy-alpha-research-v84";
const CORE_ASSETS = [
  "/",
  "/zh.html",
  "/zh-hant.html",
  "/ja.html",
  "/ko.html",
  "/de.html",
  "/fr.html",
  "/articles.html",
  "/disclosures.html",
  "/zh-articles.html",
  "/zh-disclosures.html",
  "/zh-hant-articles.html",
  "/ja-articles.html",
  "/ko-articles.html",
  "/de-articles.html",
  "/fr-articles.html",
  "/articles/nvidia-at-the-tollgate.html",
  "/articles/zh-nvidia-at-the-tollgate.html",
  "/articles/zh-hant-nvidia-at-the-tollgate.html",
  "/articles/ja-nvidia-at-the-tollgate.html",
  "/articles/ko-nvidia-at-the-tollgate.html",
  "/articles/de-nvidia-at-the-tollgate.html",
  "/articles/fr-nvidia-at-the-tollgate.html",
  "/articles/musk-stack-from-code-to-cosmos.html",
  "/articles/zh-musk-stack-from-code-to-cosmos.html",
  "/articles/zh-hant-musk-stack-from-code-to-cosmos.html",
  "/articles/ja-musk-stack-from-code-to-cosmos.html",
  "/articles/ko-musk-stack-from-code-to-cosmos.html",
  "/articles/de-musk-stack-from-code-to-cosmos.html",
  "/articles/fr-musk-stack-from-code-to-cosmos.html",
  "/articles/the-power-constraint-ai-infrastructure-energy-policy-trade.html",
  "/articles/zh-the-power-constraint-ai-infrastructure-energy-policy-trade.html",
  "/articles/zh-hant-the-power-constraint-ai-infrastructure-energy-policy-trade.html",
  "/articles/ja-the-power-constraint-ai-infrastructure-energy-policy-trade.html",
  "/articles/ko-the-power-constraint-ai-infrastructure-energy-policy-trade.html",
  "/articles/de-the-power-constraint-ai-infrastructure-energy-policy-trade.html",
  "/articles/fr-the-power-constraint-ai-infrastructure-energy-policy-trade.html",
  "/themes.html",
  "/zh-themes.html",
  "/methodology.html",
  "/zh-methodology.html",
  "/styles.css?v=20260605-power-constraint-v84",
  "/script.js?v=20260605-power-constraint-v84",
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
  "/assets/social/esg-capital-access-share-card.png",
  "/assets/social/zh-esg-capital-access-share-card.png",
  "/assets/social/nvidia-tollgate-share-card.png",
  "/assets/social/zh-nvidia-tollgate-share-card.png",
  "/assets/social/spacex-musk-stack-share-card-v79.png",
  "/assets/social/zh-spacex-musk-stack-share-card-v79.png",
  "/assets/social/power-constraint-share-card.png",
  "/reports/nvidia-research-elena-zhang.pdf",
  "/reports/musk-stack-full-report.pdf",
  "/reports/musk-stack-issue-brief.pdf",
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
        .catch(() => caches.match(request).then((cached) => cached || caches.match("/"))),
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
