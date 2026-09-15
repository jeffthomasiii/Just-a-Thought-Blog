(function () {
  'use strict';
  var KEY = 'jat-saved-thoughts-v1';
  function read() { try { return JSON.parse(localStorage.getItem(KEY) || '[]'); } catch (e) { return []; } }
  function write(items) { localStorage.setItem(KEY, JSON.stringify(items)); }
  function isSaved(url) { return read().some(function (item) { return item.url === url; }); }
  function setButton(button, saved) {
    button.classList.toggle('is-saved', saved);
    button.setAttribute('aria-pressed', saved ? 'true' : 'false');
    button.innerHTML = saved ? '<i class="fas fa-bookmark" aria-hidden="true"></i><span>Saved</span>' : '<i class="far fa-bookmark" aria-hidden="true"></i><span>Save</span>';
  }
  function cacheArticle(url) {
    if (!('caches' in window)) return;
    caches.open('jat-saved-articles-v1').then(function (cache) { return cache.add(url); }).catch(function () {});
  }
  function uncacheArticle(url) {
    if (!('caches' in window)) return;
    caches.open('jat-saved-articles-v1').then(function (cache) { return cache.delete(url); }).catch(function () {});
  }
  document.querySelectorAll('[data-jat-save]').forEach(function (button) {
    var data = { url: button.dataset.url, title: button.dataset.title, subtitle: button.dataset.subtitle || '', image: button.dataset.image || '', date: button.dataset.date || '' };
    setButton(button, isSaved(data.url));
    button.addEventListener('click', function () {
      var items = read();
      var index = items.findIndex(function (item) { return item.url === data.url; });
      if (index >= 0) { items.splice(index, 1); write(items); uncacheArticle(data.url); setButton(button, false); }
      else { items.unshift(data); write(items); cacheArticle(data.url); setButton(button, true); }
      window.dispatchEvent(new CustomEvent('jat:saved-changed'));
    });
  });
  function renderSaved() {
    var root = document.querySelector('[data-jat-saved-list]');
    if (!root) return;
    var items = read();
    var empty = document.querySelector('[data-jat-saved-empty]');
    if (!items.length) { root.innerHTML = ''; if (empty) empty.hidden = false; return; }
    if (empty) empty.hidden = true;
    root.innerHTML = items.map(function (item) {
      var image = item.image ? '<span class="jat-saved-card__image" style="background-image:url(\'' + item.image.replace(/'/g, '%27') + '\')" aria-hidden="true"></span>' : '';
      return '<article class="jat-saved-card"><a class="jat-saved-card__link" href="' + item.url + '">' + image + '<span class="jat-saved-card__copy"><small>' + (item.date || 'Saved reflection') + '</small><strong>' + item.title + '</strong>' + (item.subtitle ? '<span>' + item.subtitle + '</span>' : '') + '</span></a><button class="jat-saved-card__remove" type="button" data-remove-url="' + item.url + '" aria-label="Remove ' + item.title + ' from Saved Thoughts"><i class="fas fa-bookmark" aria-hidden="true"></i></button></article>';
    }).join('');
    root.querySelectorAll('[data-remove-url]').forEach(function (button) { button.addEventListener('click', function () { var url = button.dataset.removeUrl; write(read().filter(function (item) { return item.url !== url; })); uncacheArticle(url); renderSaved(); }); });
  }
  renderSaved();
  window.addEventListener('jat:saved-changed', renderSaved);
})();