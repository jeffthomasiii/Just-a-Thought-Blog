(async function () {
  const input = document.getElementById("search-input");
  const resultsEl = document.getElementById("search-results");
  const metaEl = document.getElementById("search-meta");

  if (!input || !resultsEl) return;

  const res = await fetch(`${window.location.origin}${(document.querySelector('meta[name="baseurl"]')?.content || "")}/search.json`.replace(/\/{2,}/g, "/"));
  const data = await res.json();

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
        categories: (doc.categories || []).join(" ")
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

  function renderResults(list) {
    resultsEl.innerHTML = "";
    if (!list.length) {
      metaEl.textContent = "No results.";
      return;
    }
    metaEl.textContent = `${list.length} result${list.length === 1 ? "" : "s"}.`;

    list.slice(0, 20).forEach((item) => {
      const doc = data.find((d) => d.id.toString() === item.ref.toString());
      if (!doc) return;

      const li = document.createElement("li");
      li.style.margin = "0.75rem 0";

      li.innerHTML = `
        <a href="${doc.url}" style="font-weight: 600; text-decoration: underline;">
          ${escapeHtml(doc.title)}
        </a>
        ${doc.excerpt ? `<div style="margin-top: .25rem; opacity: .85;">${escapeHtml(doc.excerpt)}</div>` : ""}
      `;
      resultsEl.appendChild(li);
    });
  }

  function runSearch(q) {
    const query = (q || "").trim();
    if (query.length < 2) {
      resultsEl.innerHTML = "";
      metaEl.textContent = "Type at least 2 characters.";
      return;
    }

    // Lunr special chars can break queries; basic safe transform:
    const safe = query.replace(/[^\w\s\-]/g, " ").trim();

    // Boost title matches
    const results = idx.query(function (builder) {
      safe.split(/\s+/).forEach((term) => {
        builder.term(term, { boost: 10, fields: ["title"] });
        builder.term(term, { boost: 4, fields: ["tags", "categories"] });
        builder.term(term, { boost: 2, fields: ["excerpt"] });
        builder.term(term, { boost: 1, fields: ["content"] });
      });
    });

    renderResults(results);
  }

  input.addEventListener("input", (e) => runSearch(e.target.value));
  metaEl.textContent = "Type at least 2 characters.";
})();
