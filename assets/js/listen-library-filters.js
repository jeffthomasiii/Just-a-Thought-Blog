document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("jat-listen-search");
  const topicSelect = document.getElementById("jat-listen-topic");
  const formatSelect = document.getElementById("jat-listen-format");
  const sortSelect = document.getElementById("jat-listen-sort");
  const resetButton = document.getElementById("jat-listen-filter-reset");
  const countMessage = document.getElementById("jat-listen-filter-count");
  const emptyState = document.getElementById("jat-listen-empty");
  const grid = document.getElementById("jat-listen-grid");
  const cards = Array.from(document.querySelectorAll("[data-listen-card]"));
  const preferenceStorageKey = "jat-listen-library-preferences";

  if (!searchInput || !topicSelect || !formatSelect || !sortSelect || !resetButton || !grid || cards.length === 0) return;

  function normalize(value) {
    return (value || "").toLowerCase().trim();
  }

  function hasOption(select, value) {
    return Array.from(select.options).some(function (option) {
      return option.value === value;
    });
  }

  function restorePreferences() {
    try {
      const saved = window.localStorage.getItem(preferenceStorageKey);
      if (!saved) return;

      const preferences = JSON.parse(saved);
      if (!preferences || typeof preferences !== "object") return;

      if (typeof preferences.query === "string") searchInput.value = preferences.query;
      if (typeof preferences.topic === "string" && hasOption(topicSelect, preferences.topic)) {
        topicSelect.value = preferences.topic;
      }
      if (typeof preferences.format === "string" && hasOption(formatSelect, preferences.format)) {
        formatSelect.value = preferences.format;
      }
      if (typeof preferences.sort === "string" && hasOption(sortSelect, preferences.sort)) {
        sortSelect.value = preferences.sort;
      }
    } catch (error) {
      // The library remains fully usable when storage is blocked or malformed.
    }
  }

  function savePreferences() {
    try {
      window.localStorage.setItem(
        preferenceStorageKey,
        JSON.stringify({
          query: searchInput.value,
          topic: topicSelect.value,
          format: formatSelect.value,
          sort: sortSelect.value
        })
      );
    } catch (error) {
      // Current-page filtering still works when storage is unavailable.
    }
  }

  function clearSavedPreferences() {
    try {
      window.localStorage.removeItem(preferenceStorageKey);
    } catch (error) {
      // Nothing else is required when storage is unavailable.
    }
  }

  function getDateValue(card) {
    const value = Date.parse(card.dataset.date || "");
    return Number.isFinite(value) ? value : 0;
  }

  function getDurationValue(card) {
    const value = Number.parseFloat(card.dataset.duration || "");
    return Number.isFinite(value) ? value : 0;
  }

  function hasKnownDuration(card) {
    return card.dataset.durationKnown === "true";
  }

  function sortCards() {
    const mode = sortSelect.value;
    const sortedCards = cards.slice().sort(function (a, b) {
      if (mode === "oldest") return getDateValue(a) - getDateValue(b);
      if (mode === "newest") return getDateValue(b) - getDateValue(a);

      const aKnown = hasKnownDuration(a);
      const bKnown = hasKnownDuration(b);

      if (aKnown !== bKnown) return aKnown ? -1 : 1;
      if (!aKnown && !bKnown) return getDateValue(b) - getDateValue(a);

      if (mode === "longest") return getDurationValue(b) - getDurationValue(a);
      return getDurationValue(a) - getDurationValue(b);
    });

    sortedCards.forEach(function (card) {
      grid.appendChild(card);
    });
  }

  function updateLibrary(options) {
    const shouldSave = !options || options.save !== false;
    const query = normalize(searchInput.value);
    const topic = normalize(topicSelect.value);
    const format = normalize(formatSelect.value);
    let visibleCount = 0;

    sortCards();

    cards.forEach(function (card) {
      const searchText = normalize(card.dataset.search);
      const categories = normalize(card.dataset.categories).split("|").filter(Boolean);
      const cardFormat = normalize(card.dataset.format);
      const matchesQuery = !query || searchText.includes(query);
      const matchesTopic = !topic || categories.includes(topic);
      const matchesFormat = !format || cardFormat === format;
      const isVisible = matchesQuery && matchesTopic && matchesFormat;

      card.hidden = !isVisible;
      if (isVisible) visibleCount += 1;
    });

    if (countMessage) {
      countMessage.textContent = `Showing ${visibleCount} ${visibleCount === 1 ? "reflection" : "reflections"}.`;
    }

    if (emptyState) emptyState.hidden = visibleCount !== 0;
    resetButton.disabled = !query && !topic && !format && sortSelect.value === "newest";

    if (shouldSave) savePreferences();
  }

  searchInput.addEventListener("input", updateLibrary);
  topicSelect.addEventListener("change", updateLibrary);
  formatSelect.addEventListener("change", updateLibrary);
  sortSelect.addEventListener("change", updateLibrary);
  resetButton.addEventListener("click", function () {
    searchInput.value = "";
    topicSelect.value = "";
    formatSelect.value = "";
    sortSelect.value = "newest";
    clearSavedPreferences();
    updateLibrary({ save: false });
    searchInput.focus();
  });

  restorePreferences();
  updateLibrary({ save: false });
});
