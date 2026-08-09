document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("jat-listen-search");
  const topicSelect = document.getElementById("jat-listen-topic");
  const formatSelect = document.getElementById("jat-listen-format");
  const sortSelect = document.getElementById("jat-listen-sort");
  const resetButton = document.getElementById("jat-listen-filter-reset");
  const countMessage = document.getElementById("jat-listen-filter-count");
  const emptyState = document.getElementById("jat-listen-empty");
  const grid = document.getElementById("jat-listen-grid");
  const toggleButton = document.getElementById("jat-listen-library-toggle");
  const toggleWrap = document.getElementById("jat-listen-library-toggle-wrap");
  const cards = Array.from(document.querySelectorAll("[data-listen-card]"));
  const preferenceStorageKey = "jat-listen-library-preferences";
  const urlParameterNames = ["q", "topic", "format", "sort"];
  const collapsedLimit = 6;
  let libraryExpanded = false;

  if (!searchInput || !topicSelect || !formatSelect || !sortSelect || !resetButton || !grid || cards.length === 0) return;

  function normalize(value) {
    return (value || "").toLowerCase().trim();
  }

  function hasOption(select, value) {
    return Array.from(select.options).some(function (option) {
      return option.value === value;
    });
  }

  function hasLibraryUrlState() {
    const parameters = new URLSearchParams(window.location.search);
    return urlParameterNames.some(function (name) {
      return parameters.has(name);
    });
  }

  function restoreUrlState() {
    const parameters = new URLSearchParams(window.location.search);
    const query = parameters.get("q");
    const topic = parameters.get("topic");
    const format = parameters.get("format");
    const sort = parameters.get("sort");

    searchInput.value = typeof query === "string" ? query : "";
    topicSelect.value = typeof topic === "string" && hasOption(topicSelect, topic) ? topic : "";
    formatSelect.value = typeof format === "string" && hasOption(formatSelect, format) ? format : "";
    sortSelect.value = typeof sort === "string" && hasOption(sortSelect, sort) ? sort : "newest";
  }

  function syncUrlState() {
    if (!window.history || typeof window.history.replaceState !== "function") return;

    const url = new URL(window.location.href);
    const query = searchInput.value.trim();

    if (query) url.searchParams.set("q", query);
    else url.searchParams.delete("q");

    if (topicSelect.value) url.searchParams.set("topic", topicSelect.value);
    else url.searchParams.delete("topic");

    if (formatSelect.value) url.searchParams.set("format", formatSelect.value);
    else url.searchParams.delete("format");

    if (sortSelect.value && sortSelect.value !== "newest") url.searchParams.set("sort", sortSelect.value);
    else url.searchParams.delete("sort");

    window.history.replaceState({}, "", `${url.pathname}${url.search}${url.hash}`);
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

  function hasActiveDiscoveryState() {
    return Boolean(
      normalize(searchInput.value) ||
      normalize(topicSelect.value) ||
      normalize(formatSelect.value) ||
      sortSelect.value !== "newest"
    );
  }

  function updateToggle(totalMatches) {
    if (!toggleButton || !toggleWrap) return;

    const shouldShowToggle = !hasActiveDiscoveryState() && totalMatches > collapsedLimit;
    toggleWrap.hidden = !shouldShowToggle;

    if (!shouldShowToggle) return;

    toggleButton.setAttribute("aria-expanded", libraryExpanded ? "true" : "false");
    toggleButton.textContent = libraryExpanded ? "Show Fewer Reflections" : `Show More Reflections (${totalMatches - collapsedLimit})`;
  }

  function updateLibrary(options) {
    const shouldSave = !options || options.save !== false;
    const shouldSyncUrl = !options || options.syncUrl !== false;
    const query = normalize(searchInput.value);
    const topic = normalize(topicSelect.value);
    const format = normalize(formatSelect.value);
    const discoveryActive = hasActiveDiscoveryState();
    let matchedCount = 0;
    let displayedCount = 0;

    sortCards();

    cards.forEach(function (card) {
      const searchText = normalize(card.dataset.search);
      const categories = normalize(card.dataset.categories).split("|").filter(Boolean);
      const cardFormat = normalize(card.dataset.format);
      const matchesQuery = !query || searchText.includes(query);
      const matchesTopic = !topic || categories.includes(topic);
      const matchesFormat = !format || cardFormat === format;
      const isMatch = matchesQuery && matchesTopic && matchesFormat;

      if (isMatch) matchedCount += 1;

      const shouldDisplayMatch = isMatch && (discoveryActive || libraryExpanded || matchedCount <= collapsedLimit);
      card.hidden = !shouldDisplayMatch;
      if (shouldDisplayMatch) displayedCount += 1;
    });

    if (countMessage) {
      if (!discoveryActive && !libraryExpanded && matchedCount > collapsedLimit) {
        countMessage.textContent = `Showing ${displayedCount} of ${matchedCount} reflections.`;
      } else {
        countMessage.textContent = `Showing ${displayedCount} ${displayedCount === 1 ? "reflection" : "reflections"}.`;
      }
    }

    if (emptyState) emptyState.hidden = matchedCount !== 0;
    resetButton.disabled = !query && !topic && !format && sortSelect.value === "newest";
    updateToggle(matchedCount);

    if (shouldSave) savePreferences();
    if (shouldSyncUrl) syncUrlState();
  }

  searchInput.addEventListener("input", function () {
    libraryExpanded = false;
    updateLibrary();
  });
  topicSelect.addEventListener("change", function () {
    libraryExpanded = false;
    updateLibrary();
  });
  formatSelect.addEventListener("change", function () {
    libraryExpanded = false;
    updateLibrary();
  });
  sortSelect.addEventListener("change", function () {
    libraryExpanded = false;
    updateLibrary();
  });
  resetButton.addEventListener("click", function () {
    searchInput.value = "";
    topicSelect.value = "";
    formatSelect.value = "";
    sortSelect.value = "newest";
    libraryExpanded = false;
    clearSavedPreferences();
    updateLibrary({ save: false });
    searchInput.focus();
  });

  if (toggleButton) {
    toggleButton.addEventListener("click", function () {
      libraryExpanded = !libraryExpanded;
      updateLibrary({ save: false, syncUrl: false });
      if (!libraryExpanded) {
        document.getElementById("reflection-library")?.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  }

  window.addEventListener("popstate", function () {
    restoreUrlState();
    libraryExpanded = false;
    updateLibrary({ save: false, syncUrl: false });
  });

  if (hasLibraryUrlState()) restoreUrlState();
  else restorePreferences();

  updateLibrary({ save: false, syncUrl: false });
});
