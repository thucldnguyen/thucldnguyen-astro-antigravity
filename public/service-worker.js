// No-op service worker that replaces Gatsby's old SW.
// TEMPORARY: remove after 2026-04-01.
self.addEventListener('install', function () {
    self.skipWaiting();
});

self.addEventListener('activate', function (e) {
    e.waitUntil(
        caches.keys().then(function (names) {
            return Promise.all(
                names.map(function (name) { return caches.delete(name); })
            );
        }).then(function () {
            return self.registration.unregister();
        })
    );
});
