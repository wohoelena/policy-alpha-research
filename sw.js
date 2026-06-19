const CACHE_NAME = "policy-alpha-research-v101-robot-insight";
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
  "/articles/from-certification-to-cash-flow-evtol.html",
  "/articles/zh-from-certification-to-cash-flow-evtol.html",
  "/articles/zh-hant-from-certification-to-cash-flow-evtol.html",
  "/articles/ja-from-certification-to-cash-flow-evtol.html",
  "/articles/ko-from-certification-to-cash-flow-evtol.html",
  "/articles/de-from-certification-to-cash-flow-evtol.html",
  "/articles/fr-from-certification-to-cash-flow-evtol.html",
  "/articles/industrial-policy-global-champions.html",
  "/articles/zh-industrial-policy-global-champions.html",
  "/articles/zh-hant-industrial-policy-global-champions.html",
  "/articles/ja-industrial-policy-global-champions.html",
  "/articles/ko-industrial-policy-global-champions.html",
  "/articles/de-industrial-policy-global-champions.html",
  "/articles/fr-industrial-policy-global-champions.html",
  "/articles/robot-economics-when-do-humanoid-robots-become-cheaper.html",
  "/articles/zh-robot-economics-when-do-humanoid-robots-become-cheaper.html",
  "/articles/zh-hant-robot-economics-when-do-humanoid-robots-become-cheaper.html",
  "/articles/ja-robot-economics-when-do-humanoid-robots-become-cheaper.html",
  "/articles/ko-robot-economics-when-do-humanoid-robots-become-cheaper.html",
  "/articles/de-robot-economics-when-do-humanoid-robots-become-cheaper.html",
  "/articles/fr-robot-economics-when-do-humanoid-robots-become-cheaper.html",
  "/themes.html",
  "/zh-themes.html",
  "/methodology.html",
  "/zh-methodology.html",
  "/styles.css?v=20260609-ehang-ui-v3",
  "/styles.css?v=20260616-industrial-policy-v1",
  "/styles.css?v=20260616-industrial-policy-v2",
  "/script.js?v=20260609-ehang-popup-v2",
  "/script.js?v=20260616-industrial-policy-v1",
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
  "/assets/social/ehang-evtol-share-card.png",
  "/assets/social/zh-ehang-evtol-share-card.png",
  "/assets/social/industrial-policy-global-champions-share-card.svg",
  "/assets/social/industrial-policy-global-champions-share-card.png",
  "/assets/social/industrial-policy-global-champions-share-card.jpg",
  "/assets/social/zh-industrial-policy-global-champions-share-card.svg",
  "/assets/social/zh-industrial-policy-global-champions-share-card.png",
  "/assets/social/zh-industrial-policy-global-champions-share-card.jpg",
  "/assets/social/zh-hant-industrial-policy-global-champions-share-card.svg",
  "/assets/social/zh-hant-industrial-policy-global-champions-share-card.png",
  "/assets/social/zh-hant-industrial-policy-global-champions-share-card.jpg",
  "/assets/social/ja-industrial-policy-global-champions-share-card.svg",
  "/assets/social/ja-industrial-policy-global-champions-share-card.png",
  "/assets/social/ja-industrial-policy-global-champions-share-card.jpg",
  "/assets/social/ko-industrial-policy-global-champions-share-card.svg",
  "/assets/social/ko-industrial-policy-global-champions-share-card.png",
  "/assets/social/ko-industrial-policy-global-champions-share-card.jpg",
  "/assets/social/de-industrial-policy-global-champions-share-card.svg",
  "/assets/social/de-industrial-policy-global-champions-share-card.png",
  "/assets/social/de-industrial-policy-global-champions-share-card.jpg",
  "/assets/social/fr-industrial-policy-global-champions-share-card.svg",
  "/assets/social/fr-industrial-policy-global-champions-share-card.png",
  "/assets/social/fr-industrial-policy-global-champions-share-card.jpg",
  "/reports/nvidia-research-elena-zhang.pdf",
  "/reports/ehang-evtol-policy-alpha-june-2026.pdf",
  "/reports/ehang-public-source-dcf-model-policy-alpha.xlsx",
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
