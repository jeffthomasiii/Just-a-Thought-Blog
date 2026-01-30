(async function () {
  const input = document.getElementById("search-input");
  const resultsEl = document.getElementById("search-results");
  const metaEl = document.getElementById("search-meta");

  // Optional (won't break anything if missing)
  const categoryFilter = document.getElementById("category-filter");
  const tagFilter = document.getElementById("tag-filter");
  const clearBtn = document.getElementById("clear-filters");

  if (!input || !resultsEl || !metaEl) return;

  // Base URL (important for GitHub Pages project sites)
  const baseurl = document.querySelector('meta[name="baseurl"]')?.content || "";

  // SAFER: build a relative path, not a full URL, and only normalize the path
  const indexPath = `${baseurl}/search.json`.replace(/\/{2,}/g, "/");

  let data = [];
  try {
    const res = await fetch(indexPath, { cache: "no-store" });
    if (!res.ok) throw new Error(`Index fetch failed: ${res.status} ${res.statusText}`);
    data = await res.json();
  } catch (err) {
    metaEl.textContent = "Search index failed to load.";
    resultsEl.innerHTML = "";
    // Helpful breadcrumb for you while testing:
    console.error("Search index error:", err, "Tried:", indexPath);
    return;
  }

  // Build Lunr index
  const idx = lunr(function () {
    this.ref("id");
    this.field("title");
    this.field("subtitle");
    this.field("excerpt");
    this.field("content");
    this.field("tags");
    this.field("categories");

    data.forEach((doc) => {
      this.add({
        id: doc.id,
        title: doc.title || "",
        subtitle: doc.subtitle || "",
        excerpt: doc.excerpt || "",
        content: doc.content || "",
        tags: (doc.tags || []).join(" "),
        categories: (doc.categories || []).join(" "),
      });
    });
  });

  function escapeHtml(str) {
    return (str || "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function uniqSorted(arr) {
    return [...new Set(arr.filter(Boolean).map((v) => v.toString()))].sort((a, b) =>
      a.localeCompare(b)
    );
  }

  function populateFilters() {
    if (categoryFilter) {
      const cats = uniqSorted(data.flatMap((d) => d.categories || []));
      cats.forEach((cat) => {
        const opt = document.createElement("option");
        opt.value = cat;
        opt.textContent = cat;
        categoryFilter.appendChild(opt);
      });
    }

    if (tagFilter) {
      const tags = uniqSorted(data.flatMap((d) => d.tags || []));
      tags.forEach((tag) => {
        const opt = document.createElement("option");
        opt.value = tag;
        opt.textContent = tag;
        tagFilter.appendChild(opt);
      });
    }
  }

  populateFilters();

  function matchesFilters(doc) {
    const cat = categoryFilter?.value?.trim() || "";
    const tag = tagFilter?.value?.trim() || "";

    if (cat && !(doc.categories || []).includes(cat)) return false;
    if (tag && !(doc.tags || []).includes(tag)) return false;
    return true;
  }

  function renderResults(list) {
    resultsEl.innerHTML = "";

    const activeCat = categoryFilter?.value?.trim() || "";
    const activeTag = tagFilter?.value?.trim() || "";

    if (!list.length) {
      metaEl.textContent =
        activeCat || activeTag ? "No results for the current filters." : "No results.";
      return;
    }

    const filterNote =
      activeCat || activeTag
        ? ` (filtered${activeCat ? ` • ${activeCat}` : ""}${activeTag ? ` • ${activeTag}` : ""})`
        : "";

    metaEl.textContent = `${list.length} result${list.length === 1 ? "" : "s"}.${filterNote}`;

    list.slice(0, 20).forEach((item) => {
      const doc = data.find((d) => d.id.toString() === item.ref.toString());
      if (!doc) return;

      const li = document.createElement("li");
      li.style.margin = "0.75rem 0";

      li.innerHTML = `
        <a href="${doc.url}" style="font-weight: 600; text-decoration: underline;">
          ${escapeHtml(doc.title)}
        </a>
        ${
          doc.excerpt
            ? `<div style="margin-top: .25rem; opacity: .85;">${escapeHtml(doc.excerpt)}</div>`
            : ""
        }
      `;

      resultsEl.appendChild(li);
    });
  }

  function runSearch(q) {
    const query = (q || "").trim();

    const hasFilters =
      (categoryFilter?.value?.trim() || "") || (tagFilter?.value?.trim() || "");

    if (query.length < 2) {
      resultsEl.innerHTML = "";
      metaEl.textContent = hasFilters
        ? "Type at least 2 characters to search within the selected filters."
        : "Type at least 2 characters.";
      return;
    }

    // Lunr special chars can break queries; basic safe transform:
    const safe = query.replace(/[^\w\s\-]/g, " ").trim();
    if (!safe) {
      resultsEl.innerHTML = "";
      metaEl.textContent = "Try a different search term.";
      return;
    }

    const allowedIds = new Set(data.filter(matchesFilters).map((d) => d.id.toString()));

    const results = idx
      .query(function (builder) {
        safe.split(/\s+/).forEach((term) => {
          builder.term(term, { boost: 10, fields: ["title"] });
          builder.term(term, { boost: 4, fields: ["tags", "categories"] });
          builder.term(term, { boost: 2, fields: ["excerpt"] });
          builder.term(term, { boost: 1, fields: ["content"] });
        });
      })
      .filter((r) => allowedIds.has(r.ref.toString()));

    renderResults(results);
  }

  // Event listeners (this is the part that looked cut off in your paste)
  input.addEventListener("input", (e) => runSearch(e.target.value));
  categoryFilter?.addEventListener("change", () => runSearch(input.value));
  tagFilter?.addEventListener("change", () => runSearch(input.value));

  clearBtn?.addEventListener("click", () => {
    input.value = "";
    if (categoryFilter) categoryFilter.value = "";
    if (tagFilter) tagFilter.value = "";
    resultsEl.innerHTML = "";
    metaEl.textContent = "Type at least 2 characters.";
    input.focus();
  });

  metaEl.textContent = "Type at least 2 characters.";
})();
