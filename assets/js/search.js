(async function () {
  "use strict";

  const form = document.getElementById("search-form");
  const input = document.getElementById("search-input");
  const resultsEl = document.getElementById("search-results");
  const metaEl = document.getElementById("search-meta");
  const stateEl = document.getElementById("search-state");
  const stateTitleEl = document.getElementById("search-state-title");
  const stateCopyEl = document.getElementById("search-state-copy");
  const categoryFilter = document.getElementById("category-filter");
  const tagFilter = document.getElementById("tag-filter");
  const clearBtn = document.getElementById("clear-filters");

  if (!input || !resultsEl || !metaEl || !stateEl || !stateTitleEl || !stateCopyEl) return;

  const baseurl = document.querySelector('meta[name="baseurl"]')?.content || "";
  const indexPath = `${baseurl}/search.json`.replace(/\/{2,}/g, "/");
  const resultLimit = 30;
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

  function populateSelect(select, values) {
    if (!select) return;

    values.forEach((value) => {
      const option = document.createElement("option");
      option.value = value;
      option.textContent = value;
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
    const category = params.get("category") || "";
    const tag = params.get("tag") || "";

    input.value = query;
    if (categoryFilter) categoryFilter.value = hasOption(categoryFilter, category) ? category : "";
    if (tagFilter) tagFilter.value = hasOption(tagFilter, tag) ? tag : "";
  }

  function syncUrlState() {
    const params = new URLSearchParams();
    const query = input.value.trim();
    const category = categoryFilter?.value?.trim() || "";
    const tag = tagFilter?.value?.trim() || "";

    if (query) params.set("q", query);
    if (category) params.set("category", category);
    if (tag) params.set("tag", tag);

    const nextUrl = `${window.location.pathname}${params.toString() ? `?${params.toString()}` : ""}${window.location.hash}`;
    window.history.replaceState({ query, category, tag }, "", nextUrl);
  }

  function matchesFilters(doc) {
    const category = categoryFilter?.value?.trim() || "";
    const tag = tagFilter?.value?.trim() || "";
    const categories = normalizeList(doc.categories);
    const tags = normalizeList(doc.tags);

    if (category && !categories.includes(category)) return false;
    if (tag && !tags.includes(tag)) return false;
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

    const categories = normalizeList(doc.categories);
    const tags = normalizeList(doc.tags);
    if (categories[0]) labels.appendChild(createLabel(categories[0]));
    if (doc.series) labels.appendChild(createLabel(`Series: ${doc.series}`));
    tags.slice(0, 2).forEach((tag) => labels.appendChild(createLabel(tag)));
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
    const category = categoryFilter?.value?.trim() || "";
    const tag = tagFilter?.value?.trim() || "";
    if (category) parts.push(`category “${category}”`);
    if (tag) parts.push(`tag “${tag}”`);
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
          : "Try a broader phrase or explore the complete Posts archive."
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
        const supportingOptions = { boost: 6, fields: ["subtitle", "tags", "categories", "series"], usePipeline: false };
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
    const category = categoryFilter?.value?.trim() || "";
    const tag = tagFilter?.value?.trim() || "";
    const hasFilters = Boolean(category || tag);

    if (syncUrl) syncUrlState();

    if (query.length === 1) {
      metaEl.textContent = "Enter at least two characters.";
      showState("guidance", "Keep typing", "Search terms need at least two characters before the archive can be searched.");
      return;
    }

    if (!query && !hasFilters) {
      metaEl.textContent = `${data.length} reflections available.`;
      showState("guidance", "Begin with a thought", "Search by a word or phrase, or choose a category or tag to browse related reflections.");
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
      tags: normalizeList(doc.tags),
      series: doc.series || "",
    }));

    index = lunr(function () {
      this.ref("id");
      this.field("title");
      this.field("subtitle");
      this.field("excerpt");
      this.field("content");
      this.field("tags");
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
          categories: doc.categories.join(" "),
          series: doc.series || "",
        });
      });
    });

    populateSelect(categoryFilter, uniqueSorted(data.flatMap((doc) => doc.categories)));
    populateSelect(tagFilter, uniqueSorted(data.flatMap((doc) => doc.tags)));
    readUrlState();
    runSearch({ syncUrl: false });
  } catch (error) {
    console.error("Search index error:", error, "Tried:", indexPath);
    metaEl.textContent = "The search index could not be loaded.";
    showState("error", "Search is temporarily unavailable", "Please use the Posts archive while the search index is unavailable.");
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

  categoryFilter?.addEventListener("change", () => runSearch());
  tagFilter?.addEventListener("change", () => runSearch());

  clearBtn?.addEventListener("click", () => {
    window.clearTimeout(inputTimer);
    input.value = "";
    if (categoryFilter) categoryFilter.value = "";
    if (tagFilter) tagFilter.value = "";
    runSearch();
    input.focus();
  });

  window.addEventListener("popstate", () => {
    readUrlState();
    runSearch({ syncUrl: false });
  });
})();
