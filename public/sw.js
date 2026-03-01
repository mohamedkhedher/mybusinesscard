// Service Worker for Mohamed Khedher PWA
// Caches core assets and provides offline support

const CACHE_VERSION = 'v1';
const STATIC_CACHE = `static-${CACHE_VERSION}`;
const RUNTIME_CACHE = `runtime-${CACHE_VERSION}`;

const PRECACHE_URLS = [
    '/',
    '/offline',
    '/manifest.webmanifest',
];

// Install: precache core assets
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(STATIC_CACHE).then((cache) => {
            return cache.addAll(PRECACHE_URLS);
        }).then(() => self.skipWaiting())
    );
});

// Activate: clean old caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames
                    .filter((name) => name !== STATIC_CACHE && name !== RUNTIME_CACHE)
                    .map((name) => caches.delete(name))
            );
        }).then(() => self.clients.claim())
    );
});

// Fetch: serve from cache with fallback strategies
self.addEventListener('fetch', (event) => {
    const { request } = event;
    const url = new URL(request.url);

    // Skip non-GET requests
    if (request.method !== 'GET') return;
    // Skip API requests (don't cache)
    if (url.pathname.startsWith('/api/')) return;
    // Skip chrome-extension
    if (url.protocol === 'chrome-extension:') return;

    // Fonts & static assets: Cache First
    if (
        url.hostname.includes('fonts.googleapis.com') ||
        url.hostname.includes('fonts.gstatic.com') ||
        url.pathname.startsWith('/icons/') ||
        url.pathname.match(/\.(png|jpg|jpeg|svg|ico|webp)$/)
    ) {
        event.respondWith(cacheFirst(request, RUNTIME_CACHE));
        return;
    }

    // Next.js static chunks: Cache First
    if (url.pathname.startsWith('/_next/static/')) {
        event.respondWith(cacheFirst(request, RUNTIME_CACHE));
        return;
    }

    // HTML pages: Network First with offline fallback
    event.respondWith(networkFirst(request));
});

async function cacheFirst(request, cacheName) {
    const cached = await caches.match(request);
    if (cached) return cached;
    try {
        const response = await fetch(request);
        if (response.ok) {
            const cache = await caches.open(cacheName);
            cache.put(request, response.clone());
        }
        return response;
    } catch {
        return new Response('Offline', { status: 503 });
    }
}

async function networkFirst(request) {
    try {
        const response = await fetch(request);
        if (response.ok) {
            const cache = await caches.open(RUNTIME_CACHE);
            cache.put(request, response.clone());
        }
        return response;
    } catch {
        const cached = await caches.match(request);
        if (cached) return cached;
        // Try offline page
        const offlinePage = await caches.match('/offline');
        return offlinePage || new Response('You are offline', {
            status: 503,
            headers: { 'Content-Type': 'text/plain' },
        });
    }
}
