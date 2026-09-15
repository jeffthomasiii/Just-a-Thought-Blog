(function () {
  'use strict';
  function isApp() { return window.matchMedia('(display-mode: standalone)').matches || document.documentElement.classList.contains('jat-app-mode') || document.documentElement.classList.contains('jat-ios-standalone'); }
  if (!isApp()) return;
  var banner = document.createElement('div');
  banner.className = 'jat-connection-banner';
  banner.setAttribute('role', 'status');
  banner.setAttribute('aria-live', 'polite');
  banner.hidden = true;
  document.body.appendChild(banner);
  var timer;
  function update() {
    clearTimeout(timer);
    if (!navigator.onLine) {
      banner.textContent = 'You’re offline. Saved Thoughts remain available.';
      banner.classList.add('is-offline');
      banner.hidden = false;
      return;
    }
    if (banner.classList.contains('is-offline')) {
      banner.textContent = 'You’re back online.';
      banner.classList.remove('is-offline');
      banner.classList.add('is-online');
      banner.hidden = false;
      timer = setTimeout(function () { banner.hidden = true; banner.classList.remove('is-online'); }, 3000);
    }
  }
  window.addEventListener('offline', update);
  window.addEventListener('online', update);
  update();
})();