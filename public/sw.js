self.addEventListener('install', function (e) {
    self.skipWaiting();
});

self.addEventListener('activate', function (e) {
    self.registration.unregister()
        .then(function () {
            console.log('Service Worker unregistered');
        });
});
