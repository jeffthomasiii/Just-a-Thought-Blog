(function () {
  'use strict';

  if (!('serviceWorker' in navigator)) return;

  window.addEventListener('load', function () {
    var baseUrlMeta = document.querySelector('meta[name="baseurl"]');
    var baseUrl = baseUrlMeta ? baseUrlMeta.getAttribute('content') : '';
    var serviceWorkerUrl = (baseUrl || '') + '/service-worker.js';

    navigator.serviceWorker.register(serviceWorkerUrl).catch(function (error) {
      console.warn('Just A Thought service worker registration failed:', error);
    });
  });
})();
