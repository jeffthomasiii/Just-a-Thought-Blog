(function () {
  'use strict';
  var KEY = 'jat-saved-thoughts-v1';
  var CACHE = 'jat-saved-articles-v2';
  function read() { try { return JSON.parse(localStorage.getItem(KEY) || '[]'); } catch (e) { return []; } }
  function write(items) { localStorage.setItem(KEY, JSON.stringify(items)); }
  function isSaved(url) { return read().some(function (item) { return item.url === url; }); }
  function setButton(button, saved) { button.classList.toggle('is-saved', saved); button.setAttribute('aria-pressed', saved ? 'true' : 'false'); button.innerHTML = saved ? '<i class="fas fa-bookmark" aria-hidden="true"></i><span>Saved offline</span>' : '<i class="far fa-bookmark" aria-hidden="true"></i><span>Save</span>'; }
  function sameOriginAsset(url) { try { var parsed = new URL(url, window.location.href); return parsed.origin === window.location.origin ? parsed.href : ''; } catch (e) { return ''; } }
  async function cacheArticle(url) {
    if (!('caches' in window)) return false;
    try {
      var cache = await caches.open(CACHE);
      var response = await fetch(url, { cache: 'reload' });
      if (!response.ok) throw new Error('Article unavailable');
      await cache.put(url, response.clone());
      var html = await response.text();
      var doc = new DOMParser().parseFromString(html, 'text/html');
      var assets = [];
      doc.querySelectorAll('img[src], source[src], link[rel="stylesheet"][href], script[src]').forEach(function (node) {
        var value = node.getAttribute('src') || node.getAttribute('href');
        var asset = sameOriginAsset(value);
        if (asset && assets.indexOf(asset) < 0) assets.push(asset);
      });
      await Promise.all(assets.map(function (asset) { return cache.add(asset).catch(function () {}); }));
      return true;
    } catch (e) { return false; }
  }
  function uncacheArticle(url) { if (!('caches' in window)) return; caches.open(CACHE).then(function (cache) { return cache.delete(url); }).catch(function () {}); }
  function meta(property) { var node = document.querySelector('meta[property="' + property + '"]'); return node ? node.content : ''; }
  function bind(button, data) {
    setButton(button, isSaved(data.url));
    button.addEventListener('click', async function () {
      var items = read(); var index = items.findIndex(function (item) { return item.url === data.url; });
      if (index >= 0) {
        items.splice(index, 1); write(items); uncacheArticle(data.url); setButton(button, false);
      } else {
        button.disabled = true; button.innerHTML = '<span>Saving…</span>';
        var cached = await cacheArticle(data.url);
        data.offline = cached;
        items.unshift(data); write(items); setButton(button, true); button.disabled = false;
        if (!cached) button.title = 'Saved to your list. Open this reflection online once before relying on offline access.';
      }
      window.dispatchEvent(new CustomEvent('jat:saved-changed'));
    });
  }
  function installPostSave() {
    var body = document.querySelector('.jat-post-body');
    if (!body || document.querySelector('[data-jat-save]')) return;
    var intro = document.querySelector('.jat-post-intro');
    var title = intro && intro.querySelector('h1') ? intro.querySelector('h1').textContent.trim() : document.title;
    var subtitle = intro && intro.querySelector('.subheading') ? intro.querySelector('.subheading').textContent.trim() : '';
    var date = intro && intro.querySelector('.meta') ? intro.querySelector('.meta').textContent.replace(/\s+/g, ' ').trim() : '';
    var data = { url: window.location.pathname, title: title, subtitle: subtitle, image: meta('og:image'), date: date };
    var row = document.createElement('div'); row.className = 'jat-app-save-row'; row.innerHTML = '<span class="jat-app-save-row__label">Keep this reflection for later — even offline</span><button class="jat-app-save-button" type="button" data-jat-save></button>';
    body.parentNode.insertBefore(row, body); bind(row.querySelector('[data-jat-save]'), data);
  }
  document.querySelectorAll('[data-jat-save][data-url]').forEach(function (button) { bind(button, { url: button.dataset.url, title: button.dataset.title, subtitle: button.dataset.subtitle || '', image: button.dataset.image || '', date: button.dataset.date || '' }); });
  function renderSaved() {
    var root = document.querySelector('[data-jat-saved-list]'); if (!root) return; var items = read(); var empty = document.querySelector('[data-jat-saved-empty]');
    if (!items.length) { root.innerHTML = ''; if (empty) empty.hidden = false; return; } if (empty) empty.hidden = true;
    root.innerHTML = items.map(function (item) {
      var image = item.image ? '<span class="jat-saved-card__image" style="background-image:url(\'' + item.image.replace(/'/g, '%27') + '\')" aria-hidden="true"></span>' : '';
      var status = item.offline === true ? 'Available offline' : 'Saved';
      var icon = item.offline === true ? 'fa-check-circle' : 'fa-bookmark';
      return '<article class="jat-saved-card"><a class="jat-saved-card__link" href="' + item.url + '">' + image + '<span class="jat-saved-card__copy"><small>' + (item.date || 'Saved reflection') + '</small><strong>' + item.title + '</strong>' + (item.subtitle ? '<span>' + item.subtitle + '</span>' : '') + '<em class="jat-saved-card__offline"><i class="fas ' + icon + '" aria-hidden="true"></i> ' + status + '</em></span></a><button class="jat-saved-card__remove" type="button" data-remove-url="' + item.url + '" aria-label="Remove ' + item.title.replace(/"/g, '&quot;') + ' from Saved Thoughts"><i class="fas fa-bookmark" aria-hidden="true"></i></button></article>';
    }).join('');
    root.querySelectorAll('[data-remove-url]').forEach(function (button) { button.addEventListener('click', function () { var url = button.dataset.removeUrl; write(read().filter(function (item) { return item.url !== url; })); uncacheArticle(url); renderSaved(); }); });
  }
  async function migrateSaved() {
    if (!navigator.onLine) return;
    var items = read(); var changed = false;
    for (var i = 0; i < items.length; i += 1) {
      if (items[i].offline === true) continue;
      items[i].offline = await cacheArticle(items[i].url);
      changed = true;
    }
    if (changed) { write(items); renderSaved(); }
  }
  installPostSave(); renderSaved(); migrateSaved(); window.addEventListener('online', migrateSaved); window.addEventListener('jat:saved-changed', renderSaved);
})();