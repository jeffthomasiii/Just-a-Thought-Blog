---
layout: page
title: Search
permalink: /search/
background: /img/posts/bg-search.jpg
---

<div class="search-wrap" style="max-width: 760px; margin: 0 auto;">
  <div style="margin-bottom: 1rem;">
    <input
      id="search-input"
      type="search"
      placeholder="Search posts..."
      autocomplete="off"
      style="
        width: 100%;
        padding: 12px 14px;
        font-size: 16px;
        border: 1px solid rgba(0,0,0,.15);
        border-radius: 6px;
        background: transparent;
      "
    />
  </div>

  <div
    class="search-filters"
    style="display:flex; gap:.75rem; flex-wrap:wrap; align-items:center; margin-bottom: 1rem;"
  >
    <select
      id="category-filter"
      style="
        padding: 10px 12px;
        border: 1px solid rgba(0,0,0,.15);
        border-radius: 6px;
        background: transparent;
        min-width: 180px;
      "
    >
      <option value="">All categories</option>
    </select>

    <select
      id="tag-filter"
      style="
        padding: 10px 12px;
        border: 1px solid rgba(0,0,0,.15);
        border-radius: 6px;
        background: transparent;
        min-width: 180px;
      "
    >
      <option value="">All tags</option>
    </select>

    <button
      id="clear-filters"
      type="button"
      style="
        padding: 10px 14px;
        border: 1px solid rgba(0,0,0,.2);
        border-radius: 6px;
        background: transparent;
        cursor: pointer;
      "
    >
      Clear
    </button>
  </div>

  <p id="search-meta" style="margin: .5rem 0 1.25rem; opacity: .75;"></p>

  <ul id="search-results" style="list-style: none; padding-left: 0; margin: 0;"></ul>
</div>

<script src="https://cdn.jsdelivr.net/npm/lunr/lunr.min.js"></script>
<script src="{{ '/assets/js/search.js' | relative_url }}"></script>
