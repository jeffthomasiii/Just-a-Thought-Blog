(function () {
  'use strict';

  var INDEX_URL = '/assets/data/scripture-index.json';

  function list(value) {
    return Array.isArray(value) ? value : [];
  }

  function scoreMapMatch(values, scoreMap, multiplier) {
    return list(values).reduce(function (total, value) {
      return total + ((scoreMap[value] || 0) * multiplier);
    }, 0);
  }

  function daysOld(dateString) {
    var time = Date.parse(dateString);
    if (!Number.isFinite(time)) return 3650;
    return Math.max(0, (Date.now() - time) / 86400000);
  }

  function freshnessBonus(candidate) {
    var age = daysOld(candidate.date);
    if (age <= 30) return 3;
    if (age <= 90) return 2;
    if (age <= 365) return 1;
    return 0;
  }

  function scoreCandidate(candidate, affinity) {
    var score = 1;

    score += scoreMapMatch(candidate.collections, affinity.collections || {}, 1.0);
    score += scoreMapMatch(candidate.categories, affinity.categories || {}, 0.85);
    score += scoreMapMatch(candidate.tags, affinity.tags || {}, 0.45);
    score += freshnessBonus(candidate);

    if (affinity.articles && affinity.articles[candidate.url]) {
      score *= 0.72;
    }

    if (candidate.scripture && affinity.scriptures && affinity.scriptures[candidate.scripture]) {
      score *= 0.82;
    }

    return Math.max(score, 0.1);
  }

  function weightedPick(scored) {
    if (!scored.length) return null;

    var top = scored
      .slice()
      .sort(function (a, b) { return b.score - a.score; })
      .slice(0, Math.min(8, scored.length));

    var total = top.reduce(function (sum, item) { return sum + item.score; }, 0);
    var target = Math.random() * total;

    for (var i = 0; i < top.length; i += 1) {
      target -= top[i].score;
      if (target <= 0) return top[i];
    }

    return top[0];
  }

  function recommend(candidates) {
    if (!Array.isArray(candidates) || !candidates.length) return null;

    var profile = window.JATReaderProfile;
    var affinity = profile && typeof profile.getAffinity === 'function'
      ? profile.getAffinity()
      : { categories: {}, collections: {}, tags: {}, articles: {}, scriptures: {} };

    var scored = candidates
      .filter(function (candidate) { return candidate && candidate.scripture && candidate.url; })
      .map(function (candidate) {
        return {
          candidate: candidate,
          score: scoreCandidate(candidate, affinity)
        };
      });

    var picked = weightedPick(scored);
    return picked ? {
      article: picked.candidate,
      score: picked.score
    } : null;
  }

  function loadCandidates() {
    return window.fetch(INDEX_URL, { credentials: 'same-origin' })
      .then(function (response) {
        if (!response.ok) throw new Error('Unable to load Scripture index.');
        return response.json();
      });
  }

  function recommendFromSite() {
    return loadCandidates().then(recommend);
  }

  window.JATScriptureRecommender = {
    recommend: recommend,
    loadCandidates: loadCandidates,
    recommendFromSite: recommendFromSite
  };
})();
