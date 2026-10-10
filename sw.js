// 自動生成（scripts/serviceWorker.ts）。手で編集しない。
const CACHE = "droneslate-f2a3dbf293a4";
const FILES = ["./","./assets/index-BAubaO1q.js","./assets/index-Cu_A0WE9.css","./index.html","./icons/apple-touch-icon.png","./icons/icon-192.png","./icons/icon-512.png","./icons/icon-maskable-512.png","./manifest.webmanifest"];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(FILES)));
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key.startsWith("droneslate-") && key !== CACHE)
            .map((key) => caches.delete(key)),
        ),
      )
      .then(() => self.clients.claim()),
  );
});

// 利用者が「更新する」を押したときだけ、待機中の新しい版に切り替える
self.addEventListener("message", (event) => {
  if (event.data === "skipWaiting") self.skipWaiting();
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET") return;
  if (new URL(request.url).origin !== self.location.origin) return;
  event.respondWith(
    (async () => {
      const cache = await caches.open(CACHE);
      const hit = await cache.match(request, { ignoreSearch: true });
      if (hit) return hit;
      // 画面の読み込みは、どの URL で来ても手元の index.html を返す
      if (request.mode === "navigate") {
        const page = await cache.match("./index.html");
        if (page) return page;
      }
      return fetch(request);
    })(),
  );
});
