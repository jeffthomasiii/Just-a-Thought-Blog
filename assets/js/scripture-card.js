(function () {
  'use strict';

  var CACHE_KEY = 'jat-scriptureTextCacheV1';
  var API_BASE = 'https://bible-api.com/';
  var TRANSLATION = 'web';
  var MAX_WORDS = 34;

  function readCache() {
    try {
      return JSON.parse(window.localStorage.getItem(CACHE_KEY) || '{}');
    } catch (error) {
      return {};
    }
  }

  function writeCache(cache) {
    try {
      window.localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
    } catch (error) {
      // Local storage may be disabled. The card can still use the live response.
    }
  }

  function cleanText(text) {
    return String(text || '')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function excerpt(text) {
    var words = cleanText(text).split(' ').filter(Boolean);
    if (words.length <= MAX_WORDS) return words.join(' ');
    return words.slice(0, MAX_WORDS).join(' ') + '…';
  }

  function resolveReference(reference) {
    var cache = readCache();
    var cacheId = TRANSLATION + ':' + reference;

    if (cache[cacheId] && cache[cacheId].text) {
      return Promise.resolve(cache[cacheId]);
    }

    var url = API_BASE + encodeURIComponent(reference) + '?translation=' + encodeURIComponent(TRANSLATION);
    return window.fetch(url)
      .then(function (response) {
        if (!response.ok) throw new Error('Unable to resolve Scripture text.');
        return response.json();
      })
      .then(function (payload) {
        var resolved = {
          reference: payload.reference || reference,
          text: cleanText(payload.text),
          translationId: payload.translation_id || TRANSLATION,
          translationName: payload.translation_name || 'World English Bible'
        };
        cache[cacheId] = resolved;
        writeCache(cache);
        return resolved;
      });
  }

  function render(recommendation, passage) {
    var card = document.querySelector('[data-jat-scripture-card]');
    if (!card) return;

    var text = card.querySelector('[data-jat-scripture-text]');
    var cite = card.querySelector('[data-jat-scripture-reference]');
    if (!text || !cite) return;

    text.textContent = excerpt(passage.text);
    cite.textContent = passage.reference || recommendation.reference;

    card.setAttribute('data-jat-scripture-article', recommendation.article.url || '');
    card.setAttribute('data-jat-scripture-article-title', recommendation.article.title || '');
    card.setAttribute('data-jat-scripture-translation', passage.translationName || '');
  }

  function init() {
    var card = document.querySelector('[data-jat-scripture-card]');
    if (!card || !window.JATScriptureRecommender) return;

    window.JATScriptureRecommender.recommendFromSite()
      .then(function (recommendation) {
        if (!recommendation || !recommendation.reference) return null;
        return resolveReference(recommendation.reference)
          .then(function (passage) {
            render(recommendation, passage);
          });
      })
      .catch(function (error) {
        // Preserve the authored fallback card if personalization or the text source fails.
        if (window.console && console.debug) {
          console.debug('[JAT] Personalized Scripture fallback retained.', error);
        }
      });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
