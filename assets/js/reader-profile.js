(function () {
  'use strict';

  var STORAGE_KEY = 'jat.readerProfile.v1';
  var MAX_HISTORY = 50;

  function emptyProfile() {
    return {
      version: 1,
      history: [],
      updatedAt: null
    };
  }

  function readProfile() {
    try {
      var raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return emptyProfile();
      var parsed = JSON.parse(raw);
      if (!parsed || !Array.isArray(parsed.history)) return emptyProfile();
      return parsed;
    } catch (error) {
      return emptyProfile();
    }
  }

  function writeProfile(profile) {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
      return true;
    } catch (error) {
      return false;
    }
  }

  function normalizeList(value) {
    if (!Array.isArray(value)) return [];
    return value
      .filter(function (item) { return typeof item === 'string' && item.trim(); })
      .map(function (item) { return item.trim().toLowerCase(); });
  }

  function normalizePage(page) {
    if (!page || !page.url) return null;
    return {
      url: String(page.url),
      title: page.title ? String(page.title) : '',
      categories: normalizeList(page.categories),
      tags: normalizeList(page.tags),
      collections: normalizeList(page.collections),
      scripture: page.scripture ? String(page.scripture) : ''
    };
  }

  function recordPageView(page) {
    var normalized = normalizePage(page);
    if (!normalized) return false;

    var profile = readProfile();
    var now = new Date().toISOString();
    var existingIndex = profile.history.findIndex(function (entry) {
      return entry.url === normalized.url;
    });

    var entry = normalized;
    entry.lastViewedAt = now;
    entry.viewCount = 1;

    if (existingIndex >= 0) {
      var existing = profile.history.splice(existingIndex, 1)[0];
      entry.firstViewedAt = existing.firstViewedAt || existing.lastViewedAt || now;
      entry.viewCount = (Number(existing.viewCount) || 1) + 1;
    } else {
      entry.firstViewedAt = now;
    }

    profile.history.unshift(entry);
    profile.history = profile.history.slice(0, MAX_HISTORY);
    profile.updatedAt = now;
    return writeProfile(profile);
  }

  function addScore(bucket, key, amount) {
    if (!key) return;
    bucket[key] = (bucket[key] || 0) + amount;
  }

  function recencyWeight(index) {
    if (index < 5) return 1;
    if (index < 15) return 0.75;
    if (index < 30) return 0.5;
    return 0.25;
  }

  function getAffinity() {
    var history = readProfile().history;
    var affinity = {
      categories: {},
      collections: {},
      tags: {},
      articles: {},
      scriptures: {}
    };

    history.forEach(function (entry, index) {
      var recency = recencyWeight(index);
      var repeat = Math.min(Number(entry.viewCount) || 1, 4);
      var multiplier = recency * (1 + ((repeat - 1) * 0.15));

      (entry.collections || []).forEach(function (value) {
        addScore(affinity.collections, value, 5 * multiplier);
      });
      (entry.categories || []).forEach(function (value) {
        addScore(affinity.categories, value, 4 * multiplier);
      });
      (entry.tags || []).forEach(function (value) {
        addScore(affinity.tags, value, 2 * multiplier);
      });
      addScore(affinity.articles, entry.url, 1 * multiplier);
      if (entry.scripture) addScore(affinity.scriptures, entry.scripture, 1 * multiplier);
    });

    return affinity;
  }

  function getHistory() {
    return readProfile().history.slice();
  }

  function clear() {
    try {
      window.localStorage.removeItem(STORAGE_KEY);
      return true;
    } catch (error) {
      return false;
    }
  }

  function recordCurrentPage() {
    var node = document.getElementById('jat-reader-page-data');
    if (!node) return;
    try {
      recordPageView(JSON.parse(node.textContent));
    } catch (error) {
      // Invalid page metadata should never interfere with reading the article.
    }
  }

  window.JATReaderProfile = {
    recordPageView: recordPageView,
    getHistory: getHistory,
    getAffinity: getAffinity,
    clear: clear
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', recordCurrentPage, { once: true });
  } else {
    recordCurrentPage();
  }
})();
