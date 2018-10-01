self.addEventListener('fetch', event => {
	event.respondWith(caches.open('restaurant').then(cache => {
		return cache.match(event.request).then(response => {
			return response || fetch(event.request).then(response => {
				cache.put(event.request, response.clone());
				return response;
			});
		});
	}));
});