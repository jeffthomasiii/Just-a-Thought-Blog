---
layout: page
title: Search
permalink: /search/
---

<div class="search-wrap">
  <div class="form-group">
    <input id="search-input" class="form-control" type="search" placeholder="Search posts..." autocomplete="off" />
  </div>

  <div class="form-group" style="display:flex; gap:.5rem; flex-wrap:wrap; margin-top:.75rem;">
    <select id="category-filter" class="form-control" style="max-width: 240px;">
      <option value="">All categories</option>
    </select>

    <select id="tag-filter" class="form-control" style="max-width: 240px;">
      <option value="">All tags</option>
    </select>

    <button id="clear-filters" type="button" class="btn btn-outline-secondary">Clear</button>
  </div>

  <p id="search-meta" class="text-muted" style="margin-top: .75rem;"></p>
  <ul id="search-results"></ul>
</div>

<script src="https://cdn.jsdelivr.net/npm/lunr/lunr.min.js"></script>
<script src="{{ '/assets/js/search.js' | relative_url }}"></script>
