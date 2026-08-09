(async function () {
  "use strict";

  const form = document.getElementById("search-form");
  const input = document.getElementById("search-input");
  const resultsEl = document.getElementById("search-results");
  const metaEl = document.getElementById("search-meta");
  const stateEl = document.getElementById("search-state");
  const stateTitleEl = document.getElementById("search-state-title");
  const stateCopyEl = document.getElementById("search-state-copy");
  const collectionFilter = document.getElementById("collection-filter");
  const categoryFilter = document.getElementById("category-filter");
  const tagFilter = document.getElementById("tag-filter");
  const seriesFilter = document.getElementById("series-filter");
  const clearBtn = document.getElementById("clear-filters");

  if (!input || !resultsEl || !metaEl || !stateEl || !stateTitleEl || !stateCopyEl) return;

  const baseurl = document.querySelector('meta[name="baseurl"]')?.content || "";
  const indexPath = `${baseurl}/search.json`.replace(/\/{2,}/g, "/");
  const resultLimit = 30;
  const lowSignalThemes = new Set([
    "christian-living",
    "spiritual-growth",
    "discipleship",
    "faith",
    "marriage",
    "leadership",
    "technology",
    "culture",
    "creation"
  ]);
  let data = [];
  let index = null;
  let inputTimer = null;

  function normalizeList(value) {
    if (Array.isArray(value)) return value.filter(Boolean).map(String);
    if (!value) return [];
    return [String(value)];
  }

  function uniqueSorted(values) {
    return [...new Set(values.filter(Boolean).map(String))].sort((a, b) => a.localeCompare(b));
  }

  function displayLabel(value) {
    return String(value || "")
      .split("-")
      .filter(Boolean)
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" ");
  }

  function setBusy(isBusy) {
    resultsEl.setAttribute("aria-busy", isBusy ? "true" : "false");
  }

  function clearResults() {
    resultsEl.replaceChildren();
  }

  function showState(kind, title, copy) {
    clearResults();
    stateEl.hidden = false;
    stateEl.dataset.state = kind;
    stateTitleEl.textContent = title;
    stateCopyEl.textContent = copy;
  }

  function hideState() {
    stateEl.hidden = true;
    stateEl.removeAttribute("data-state");
  }

  function populateSelect(select, values, formatter = displayLabel) {
    if (!select) return;
    values.forEach((value) => {
      const option = document.createElement("option");
      option.value = value;
      option.textContent = formatter(value);
      select.appendChild(option);
    });
  }

  function hasOption(select, value) {
    if (!select || !value) return false;
    return [...select.options].some((option) => option.value === value);
  }

  function readUrlState() {
    const params = new URLSearchParams(window.location.search);
    const query = params.get("q") || "";
    const collection = params.get("collection") || "";
    const type = params.get("type") || params.get("category") || "";
    const theme = params.get("theme") || params.get("tag") || "";
    const series = params.get("series") || "";

    input.value = query;
    if (collectionFilter) collectionFilter.value = hasOption(collectionFilter, collection) ? collection : "";
    if (categoryFilter) categoryFilter.value = hasOption(categoryFilter, type) ? type : "";
    if (tagFilter) tagFilter.value = hasOption(tagFilter, theme) ? theme : "";
    if (seriesFilter) seriesFilter.value = hasOption(seriesFilter, series) ? series : "";
  }

  function syncUrlState() {
    const params = new URLSearchParams();
    const query = input.value.trim();
    const collection = collectionFilter?.value?.trim() || "";
    const type = categoryFilter?.value?.trim() || "";
    const theme = tagFilter?.value?.trim() || "";
    const series = seriesFilter?.value?.trim() || "";

    if (query) params.set("q", query);
    if (collection) params.set("collection", collection);
    if (type) params.set("type", type);
    if (theme) params.set("theme", theme);
    if (series) params.set("series", series);

    const nextUrl = `${window.location.pathname}${params.toString() ? `?${params.toString()}` : ""}${window.location.hash}`;
    window.history.replaceState({ query, collection, type, theme, series }, "", nextUrl);
  }

  function matchesFilters(doc) {
    const collection = collectionFilter?.value?.trim() || "";
    const type = categoryFilter?.value?.trim() || "";
    const theme = tagFilter?.value?.trim() || "";
    const series = seriesFilter?.value?.trim() || "";
    const collections = normalizeList(doc.collections);
    const categories = normalizeList(doc.categories);
    const tags = normalizeList(doc.tags);

    if (collection && !collections.includes(collection)) return false;
    if (type && !categories.includes(type)) return false;
    if (theme && !tags.includes(theme)) return false;
    if (series && doc.series !== series) return false;
    return true;
  }

  function createLabel(text) {
    const label = document.createElement("span");
    label.textContent = text;
    return label;
  }

  function createResultCard(doc) {
    const item = document.createElement("li");
    item.className = "jat-search-result-item";

    const article = document.createElement("article");
    article.className = "jat-search-result jat-card-surface";

    const labels = document.createElement("div");
    labels.className = "jat-search-result-labels";

    const collections = normalizeList(doc.collections);
    const categories = normalizeList(doc.categories);
    const tags = normalizeList(doc.tags).filter((tag) => !lowSignalThemes.has(tag));
    if (collections[0]) labels.appendChild(createLabel(displayLabel(collections[0])));
    if (categories[0]) labels.appendChild(createLabel(displayLabel(categories[0])));
    if (doc.series) labels.appendChild(createLabel(`Series: ${doc.series}`));
    tags.slice(0, 2).forEach((tag) => labels.appendChild(createLabel(displayLabel(tag))));
    if (labels.childElementCount) article.appendChild(labels);

    const heading = document.createElement("h3");
    const link = document.createElement("a");
    link.href = doc.url;
    link.textContent = doc.title || "Untitled reflection";
    heading.appendChild(link);
    article.appendChild(heading);

    if (doc.subtitle) {
      const subtitle = document.createElement("p");
      subtitle.className = "jat-search-result-subtitle";
      subtitle.textContent = doc.subtitle;
      article.appendChild(subtitle);
    }

    if (doc.excerpt) {
      const excerpt = document.createElement("p");
      excerpt.className = "jat-search-result-excerpt";
      excerpt.textContent = doc.excerpt;
      article.appendChild(excerpt);
    }

    const footer = document.createElement("div");
    footer.className = "jat-search-result-footer";

    if (doc.date_display) {
      const date = document.createElement("time");
      date.dateTime = doc.date || "";
      date.textContent = doc.date_display;
      footer.appendChild(date);
    }

    const action = document.createElement("a");
    action.className = "jat-text-link";
    action.href = doc.url;
    action.textContent = "Read Reflection →";
    footer.appendChild(action);

    article.appendChild(footer);
    item.appendChild(article);
    return item;
  }

  function describeFilters() {
    const parts = [];
    const collection = collectionFilter?.value?.trim() || "";
    const type = categoryFilter?.value?.trim() || "";
    const theme = tagFilter?.value?.trim() || "";
    const series = seriesFilter?.value?.trim() || "";
    if (collection) parts.push(`collection “${displayLabel(collection)}”`);
    if (type) parts.push(`type “${displayLabel(type)}”`);
    if (theme) parts.push(`theme “${displayLabel(theme)}”`);
    if (series) parts.push(`series “${series}”`);
    return parts;
  }

  function renderResults(documents, query) {
    clearResults();

    if (!documents.length) {
      const filterDescription = describeFilters();
      const context = [query ? `“${query}”` : "", ...filterDescription].filter(Boolean).join(" with ");
      metaEl.textContent = "No matching reflections.";
      showState(
        "empty",
        "No reflections matched",
        context
          ? `Try a broader phrase or clear one of the filters applied to ${context}.`
          : "Try a broader phrase or explore the full library."
      );
      return;
    }

    hideState();
    const shown = documents.slice(0, resultLimit);
    const fragment = document.createDocumentFragment();
    shown.forEach((doc) => fragment.appendChild(createResultCard(doc)));
    resultsEl.appendChild(fragment);

    const filterDescription = describeFilters();
    const queryNote = query ? ` for “${query}”` : "";
    const filterNote = filterDescription.length ? ` in ${filterDescription.join(" and ")}` : "";
    const limitNote = documents.length > resultLimit ? ` Showing the first ${resultLimit}.` : "";
    metaEl.textContent = `${documents.length} reflection${documents.length === 1 ? "" : "s"}${queryNote}${filterNote}.${limitNote}`;
  }

  function safeTerms(query) {
    return query
      .toLocaleLowerCase()
      .replace(/[^\w\s-]/g, " ")
      .trim()
      .split(/\s+/)
      .filter(Boolean);
  }

  function processTerms(terms) {
    if (!index?.pipeline) return terms;
    return terms.flatMap((term) => index.pipeline.runString(term)).filter(Boolean);
  }

  function queryIndex(terms, mode) {
    if (!terms.length || !index) return [];

    return index.query((builder) => {
      terms.forEach((term) => {
        const titleOptions = { boost: 12, fields: ["title"], usePipeline: false };
        const supportingOptions = { boost: 6, fields: ["subtitle", "tags", "collections", "categories", "series"], usePipeline: false };
        const excerptOptions = { boost: 3, fields: ["excerpt"], usePipeline: false };
        const contentOptions = { boost: 1, fields: ["content"], usePipeline: false };

        if (mode === "prefix") {
          titleOptions.wildcard = lunr.Query.wildcard.TRAILING;
          supportingOptions.wildcard = lunr.Query.wildcard.TRAILING;
          excerptOptions.wildcard = lunr.Query.wildcard.TRAILING;
          contentOptions.wildcard = lunr.Query.wildcard.TRAILING;
        } else {
          titleOptions.editDistance = 1;
          supportingOptions.editDistance = 1;
          excerptOptions.editDistance = 1;
          contentOptions.editDistance = 1;
        }

        builder.term(term, titleOptions);
        builder.term(term, supportingOptions);
        builder.term(term, excerptOptions);
        builder.term(term, contentOptions);
      });
    });
  }

  function searchDocuments(query) {
    const allowedIds = new Set(data.filter(matchesFilters).map((doc) => String(doc.id)));
    if (!query) return data.filter((doc) => allowedIds.has(String(doc.id)));

    const processedTerms = processTerms(safeTerms(query));
    if (!processedTerms.length || !index) return [];

    const prefixMatches = queryIndex(processedTerms, "prefix");
    const fuzzyTerms = processedTerms.filter((term) => term.length >= 5);
    const fuzzyMatches = queryIndex(fuzzyTerms, "fuzzy");
    const combinedMatches = [];
    const seenRefs = new Set();

    [...prefixMatches, ...fuzzyMatches].forEach((match) => {
      const ref = String(match.ref);
      if (!allowedIds.has(ref) || seenRefs.has(ref)) return;
      seenRefs.add(ref);
      combinedMatches.push(match);
    });

    const documentsById = new Map(data.map((doc) => [String(doc.id), doc]));
    return combinedMatches.map((match) => documentsById.get(String(match.ref))).filter(Boolean);
  }

  function runSearch(options = {}) {
    const { syncUrl = true } = options;
    const query = input.value.trim();
    const collection = collectionFilter?.value?.trim() || "";
    const type = categoryFilter?.value?.trim() || "";
    const theme = tagFilter?.value?.trim() || "";
    const series = seriesFilter?.value?.trim() || "";
    const hasFilters = Boolean(collection || type || theme || series);

    if (syncUrl) syncUrlState();

    if (query.length === 1) {
      metaEl.textContent = "Enter at least two characters.";
      showState("guidance", "Keep typing", "Search terms need at least two characters before the library can be searched.");
      return;
    }

    if (!query && !hasFilters) {
      metaEl.textContent = `${data.length} reflections available.`;
      showState("guidance", "Begin with a thought", "Search by a word or phrase, or choose a collection, type, theme, or series to browse related reflections.");
      return;
    }

    setBusy(true);
    try {
      renderResults(searchDocuments(query), query);
    } catch (error) {
      console.error("Search query error:", error);
      metaEl.textContent = "The search could not be completed.";
      showState("error", "Search needs another try", "Clear the search and try a simpler word or phrase.");
    } finally {
      setBusy(false);
    }
  }

  try {
    if (typeof lunr === "undefined") throw new Error("Lunr failed to load.");

    const response = await fetch(indexPath, { cache: "no-store" });
    if (!response.ok) throw new Error(`Index fetch failed: ${response.status} ${response.statusText}`);

    data = await response.json();
    data = data.map((doc) => ({
      ...doc,
      categories: normalizeList(doc.categories),
      collections: normalizeList(doc.collections),
      tags: normalizeList(doc.tags),
      series: doc.series || ""
    }));

    index = lunr(function () {
      this.ref("id");
      this.field("title");
      this.field("subtitle");
      this.field("excerpt");
      this.field("content");
      this.field("tags");
      this.field("collections");
      this.field("categories");
      this.field("series");

      data.forEach((doc) => {
        this.add({
          id: doc.id,
          title: doc.title || "",
          subtitle: doc.subtitle || "",
          excerpt: doc.excerpt || "",
          content: doc.content || "",
          tags: doc.tags.join(" "),
          collections: doc.collections.join(" "),
          categories: doc.categories.join(" "),
          series: doc.series || ""
        });
      });
    });

    populateSelect(collectionFilter, uniqueSorted(data.flatMap((doc) => doc.collections)));
    populateSelect(categoryFilter, uniqueSorted(data.flatMap((doc) => doc.categories)));
    populateSelect(
      tagFilter,
      uniqueSorted(data.flatMap((doc) => doc.tags).filter((tag) => !lowSignalThemes.has(tag)))
    );
    populateSelect(seriesFilter, uniqueSorted(data.map((doc) => doc.series)), (value) => value);

    readUrlState();
    runSearch({ syncUrl: false });
  } catch (error) {
    console.error("Search index error:", error, "Tried:", indexPath);
    metaEl.textContent = "The search index could not be loaded.";
    showState("error", "Search is temporarily unavailable", "Please use Explore or the Posts archive while the search index is unavailable.");
    return;
  }

  form?.addEventListener("submit", (event) => {
    event.preventDefault();
    window.clearTimeout(inputTimer);
    runSearch();
  });

  input.addEventListener("input", () => {
    window.clearTimeout(inputTimer);
    inputTimer = window.setTimeout(() => runSearch(), 140);
  });

  collectionFilter?.addEventListener("change", () => runSearch());
  categoryFilter?.addEventListener("change", () => runSearch());
  tagFilter?.addEventListener("change", () => runSearch());
  seriesFilter?.addEventListener("change", () => runSearch());

  clearBtn?.addEventListener("click", () => {
    window.clearTimeout(inputTimer);
    input.value = "";
    if (collectionFilter) collectionFilter.value = "";
    if (categoryFilter) categoryFilter.value = "";
    if (tagFilter) tagFilter.value = "";
    if (seriesFilter) seriesFilter.value = "";
    runSearch();
    input.focus();
  });

  window.addEventListener("popstate", () => {
    readUrlState();
    runSearch({ syncUrl: false });
  });
})();
