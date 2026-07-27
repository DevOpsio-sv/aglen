import fs from "node:fs";
import path from "node:path";

// ─────────────────────────────────────────────────────────────
// The service worker, written at build time.
//
// It is generated rather than kept in public/ for one reason: Vite content-
// hashes the bundle, so a static file cannot know what to precache, and a
// precache list that goes stale is worse than none. Generating it here means
// the cache name carries the build's own hash — a deploy makes a new cache and
// the old one is deleted on activate, which is the whole of the invalidation
// story and the part that usually goes wrong.
//
// Strategies, and why each is the one it is:
//
//   • Navigation (HTML) — network first, cache second, offline page last. This
//     site's argument is that a correction supersedes and the page you read is
//     the current one; serving a cached page to somebody who has signal would
//     quietly break that. Cache is the fallback, never the default.
//   • Hashed bundles and fonts — cache first. The filename changes when the
//     content does, so a hit is always correct and a miss falls to the network.
//   • Images — cache first. They keep their source filename, so this is the one
//     place a stale asset is possible; a week is what `_headers` already grants
//     the HTTP cache, and the SW cache is dropped wholesale on the next deploy.
//   • Everything else — straight to the network, uncached.
//
// Nothing is precached beyond the shell and one offline page per language: a
// visitor who reads three guides at home has three guides in the canyon, and a
// visitor who reads none has not been made to download the site.
// ─────────────────────────────────────────────────────────────

/** The hashed entry bundles Vite emitted, so the shell survives with no signal. */
function shellAssets(distDir) {
  const assetsDir = path.join(distDir, "assets");
  if (!fs.existsSync(assetsDir)) return [];
  return fs
    .readdirSync(assetsDir)
    .filter((name) => /^index-.*\.(js|css)$/.test(name))
    .map((name) => `/assets/${name}`);
}

/** A build identity: the entry bundle names already change whenever the code does. */
function buildId(assets) {
  const stamp = assets.join("|");
  let hash = 0;
  for (let index = 0; index < stamp.length; index += 1) {
    hash = (hash * 31 + stamp.charCodeAt(index)) >>> 0;
  }
  return hash.toString(36);
}

const OFFLINE_COPY = {
  bg: { title: "Няма връзка", body: "Тази страница не е запазена на устройството. Свържете се с интернет или се върнете към страница, която вече сте отваряли.", retry: "Опитай отново" },
  en: { title: "No connection", body: "This page is not stored on your device. Connect to the internet, or go back to a page you have already opened.", retry: "Try again" },
  de: { title: "Keine Verbindung", body: "Diese Seite ist nicht auf dem Gerät gespeichert. Stellen Sie eine Verbindung her oder kehren Sie zu einer bereits geöffneten Seite zurück.", retry: "Erneut versuchen" },
  fr: { title: "Pas de connexion", body: "Cette page n'est pas enregistrée sur votre appareil. Connectez-vous à Internet ou revenez à une page déjà ouverte.", retry: "Réessayer" },
  es: { title: "Sin conexión", body: "Esta página no está guardada en el dispositivo. Conéctese a internet o vuelva a una página que ya haya abierto.", retry: "Reintentar" },
  it: { title: "Nessuna connessione", body: "Questa pagina non è salvata sul dispositivo. Collegatevi a internet o tornate a una pagina già aperta.", retry: "Riprova" },
  ro: { title: "Fără conexiune", body: "Această pagină nu este salvată pe dispozitiv. Conectați-vă la internet sau reveniți la o pagină deja deschisă.", retry: "Încearcă din nou" },
  tr: { title: "Bağlantı yok", body: "Bu sayfa cihazınızda saklı değil. İnternete bağlanın ya da daha önce açtığınız bir sayfaya dönün.", retry: "Yeniden dene" },
  el: { title: "Χωρίς σύνδεση", body: "Αυτή η σελίδα δεν είναι αποθηκευμένη στη συσκευή. Συνδεθείτε στο διαδίκτυο ή γυρίστε σε σελίδα που έχετε ήδη ανοίξει.", retry: "Δοκιμάστε ξανά" },
  ru: { title: "Нет соединения", body: "Эта страница не сохранена на устройстве. Подключитесь к интернету или вернитесь на страницу, которую уже открывали.", retry: "Повторить" },
  ja: { title: "接続がありません", body: "このページは端末に保存されていません。インターネットに接続するか、すでに開いたことのあるページに戻ってください。", retry: "再試行" },
  sr: { title: "Нема везе", body: "Ова страница није сачувана на уређају. Повежите се на интернет или се вратите на страницу коју сте већ отварали.", retry: "Покушај поново" },
  zh: { title: "没有网络连接", body: "本页未保存在此设备上。请连接网络，或返回你已经打开过的页面。", retry: "重试" },
  hu: { title: "Nincs kapcsolat", body: "Ez az oldal nincs eltárolva az eszközön. Csatlakozzon az internethez, vagy térjen vissza egy már megnyitott oldalra.", retry: "Újra" },
};

function offlinePage(language, css) {
  const copy = OFFLINE_COPY[language] ?? OFFLINE_COPY.en;
  return `<!doctype html>
<html lang="${language}">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="robots" content="noindex" />
<title>${copy.title}</title>
${css ? `<link rel="stylesheet" href="${css}" />` : ""}
</head>
<body>
<main class="section-shell offline-shell">
  <h1 class="offline-title">${copy.title}</h1>
  <p class="offline-body">${copy.body}</p>
  <p class="offline-action"><a class="button primary" href="/${language}/">${copy.retry}</a></p>
</main>
</body>
</html>
`;
}

/**
 * Writes `dist/sw.js` and one offline page per language. Returns what it wrote,
 * so the build can say so out loud.
 */
export function writeServiceWorker(distDir, languages) {
  const assets = shellAssets(distDir);
  const css = assets.find((asset) => asset.endsWith(".css"));
  const version = buildId(assets);

  for (const language of languages) {
    fs.writeFileSync(path.join(distDir, `offline-${language}.html`), offlinePage(language, css));
  }

  const offlinePages = languages.map((language) => `/offline-${language}.html`);
  const precache = [...assets, ...offlinePages];

  const source = `// Generated by scripts/lib/service-worker.mjs — do not edit dist/sw.js by hand.
const VERSION = ${JSON.stringify(version)};
const CACHE = "aglen-" + VERSION;
const PRECACHE = ${JSON.stringify(precache, null, 2)};
const LANGUAGES = ${JSON.stringify(languages)};
const DEFAULT_LANGUAGE = "bg";

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(PRECACHE)).then(() => self.skipWaiting()),
  );
});

// One cache per build. Everything older goes on activate, which is the entire
// invalidation strategy and the reason there is no manifest to keep in step.
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE).map((key) => caches.delete(key))))
      .then(() => self.clients.claim()),
  );
});

function offlineFor(url) {
  const segment = url.pathname.split("/")[1];
  const language = LANGUAGES.includes(segment) ? segment : DEFAULT_LANGUAGE;
  return "/offline-" + language + ".html";
}

const IMMUTABLE = /^\\/assets\\/(index-|fonts\\/)/;
const IMAGE = /\\.(png|jpe?g|webp|svg|avif)$/i;

async function networkFirst(request) {
  const cache = await caches.open(CACHE);
  try {
    const response = await fetch(request);
    if (response && response.ok) cache.put(request, response.clone());
    return response;
  } catch (error) {
    const hit = await cache.match(request);
    if (hit) return hit;
    const fallback = await cache.match(offlineFor(new URL(request.url)));
    return fallback ?? Response.error();
  }
}

async function cacheFirst(request) {
  const cache = await caches.open(CACHE);
  const hit = await cache.match(request);
  if (hit) return hit;
  const response = await fetch(request);
  if (response && response.ok) cache.put(request, response.clone());
  return response;
}

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  // A page: always try the network first. A correction that supersedes has to
  // be able to reach somebody who has signal.
  if (request.mode === "navigate") {
    event.respondWith(networkFirst(request));
    return;
  }

  if (IMMUTABLE.test(url.pathname) || IMAGE.test(url.pathname)) {
    event.respondWith(cacheFirst(request));
  }
});
`;

  fs.writeFileSync(path.join(distDir, "sw.js"), source);
  return { version, precached: precache.length, offlinePages: offlinePages.length };
}
