/* ============================================================
   Service Worker — NutriSaúde PWA
   Cache offline e performance
============================================================ */

const CACHE_NAME = 'nutrisaude-v8';
const ASSETS = [
  '/',
  '/index.html',
  '/css/style.css?v=8',
  '/js/storage.js',
  '/js/alimentos.js',
  '/js/receitas.js',
  '/js/nutricao.js',
  '/js/progresso.js',
  '/js/receitas_db.js',
  '/js/app.js',
  '/js/saude.js',
  '/manifest.json',
  '/icons/icon-192.svg',
  '/icons/icon-512.svg'
];

// Instala: cacheia todos os assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

// Ativa: limpa caches antigos
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys
        .filter(k => k !== CACHE_NAME)
        .map(k => caches.delete(k))
      )
    ).then(() => self.clients.claim())
  );
});

// Fetch: cache first, fallback to network
self.addEventListener('fetch', event => {
  // Ignora requests que não são GET
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then(cached => {
      // Retorna do cache se disponível
      if (cached) {
        // Atualiza cache em background (stale-while-revalidate)
        event.waitUntil(
          fetch(event.request)
            .then(response => {
              if (response.ok) {
                caches.open(CACHE_NAME)
                  .then(cache => cache.put(event.request, response));
              }
            })
            .catch(() => {}) // ignora erros de rede
        );
        return cached;
      }
      // Não está no cache: busca na rede
      return fetch(event.request)
        .then(response => {
          if (response.ok) {
            const clone = response.clone();
            caches.open(CACHE_NAME)
              .then(cache => cache.put(event.request, clone));
          }
          return response;
        })
        .catch(() => {
          // Offline e não está no cache: retorna página principal
          if (event.request.mode === 'navigate') {
            return caches.match('/');
          }
        });
    })
  );
});
