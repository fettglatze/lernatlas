// Service Worker: macht Lernatlas offline nutzbar.
// Beim Installieren landen alle eigenen Dateien im Cache. Online wird immer zuerst das Netz
// gefragt (so gibt es nie veraltete Inhalte), offline antwortet der Cache.
// Externe Seiten (YouTube, Prüfungsarchive, Schriften von Google) werden nicht zwischengespeichert.

// PRECACHE-START – erzeugt von tools/pwa/build_sw.py, nicht von Hand ändern
const VERSION = '88d1ffb71211';
const FILES = [
  "./",
  "assets/css/main.css",
  "assets/icons/apple-touch-icon.png",
  "assets/icons/icon-192.png",
  "assets/icons/icon-512.png",
  "assets/icons/icon-maskable-512.png",
  "assets/js/app.js",
  "assets/js/cards.js",
  "assets/js/exercise.js",
  "assets/js/plan.js",
  "assets/js/render.js",
  "assets/js/search.js",
  "assets/js/store.js",
  "data/abi-focus.js",
  "data/catalog.js",
  "data/content/_helpers.js",
  "data/content/aufgabentypen.js",
  "data/content/biologie-oberstufe.js",
  "data/content/biologie.js",
  "data/content/chemie-oberstufe.js",
  "data/content/chemie.js",
  "data/content/deutsch-abitur.js",
  "data/content/deutsch-sprache.js",
  "data/content/deutsch-texte.js",
  "data/content/englisch-abitur.js",
  "data/content/englisch-grammar.js",
  "data/content/englisch-skills.js",
  "data/content/erdkunde.js",
  "data/content/franzoesisch.js",
  "data/content/geschichte.js",
  "data/content/gesellschaft.js",
  "data/content/index.js",
  "data/content/informatik.js",
  "data/content/latein.js",
  "data/content/mathe-algebra.js",
  "data/content/mathe-analysis.js",
  "data/content/mathe-daten.js",
  "data/content/mathe-geometrie.js",
  "data/content/mathe-oberstufe.js",
  "data/content/mathe-zahlen.js",
  "data/content/mathe.js",
  "data/content/musisch.js",
  "data/content/naturwissenschaften.js",
  "data/content/paedagogik-psychologie.js",
  "data/content/physik-oberstufe.js",
  "data/content/physik.js",
  "data/content/politik.js",
  "data/content/praxis.js",
  "data/content/spanisch.js",
  "data/content/sprachen.js",
  "data/content/videos.js",
  "data/content/werte.js",
  "data/content/wirtschaft.js",
  "data/exam-files.js",
  "data/exam-pages.js",
  "data/exam-practice.js",
  "data/exams.js",
  "data/land-info.js",
  "data/sources.js",
  "index.html",
  "manifest.webmanifest"
];
// PRECACHE-END

const CACHE = `lernatlas-${VERSION}`;

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(FILES)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys()
    .then((keys) => Promise.all(keys.filter((k) => k.startsWith('lernatlas-') && k !== CACHE).map((k) => caches.delete(k))))
    .then(() => self.clients.claim()));
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== self.location.origin) return;
  e.respondWith(
    fetch(req)
      .then((res) => {
        if (res.ok) { const copy = res.clone(); caches.open(CACHE).then((c) => c.put(req, copy)); }
        return res;
      })
      .catch(() => caches.match(req, { ignoreSearch: true })
        .then((hit) => hit || (req.mode === 'navigate' ? caches.match('index.html') : Response.error()))),
  );
});
