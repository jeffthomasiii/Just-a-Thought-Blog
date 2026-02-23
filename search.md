---
layout: page
title: Search
permalink: /search/
background: /img/posts/bg-search.jpg
---

<div class="search-wrap">
  <div class="search-input">
    <input id="search-input" type="search" placeholder="Search posts..." autocomplete="off" />
  </div>

  <div class="search-filters">
    <select id="category-filter">
      <option value="">All categories</option>
    </select>

    <select id="tag-filter">
      <option value="">All tags</option>
    </select>

    <button id="clear-filters" type="button">Clear</button>
  </div>

  <p id="search-meta" style="margin-top: .75rem;"></p>
  <ul id="search-results"></ul>
</div>

<script src="https://cdn.jsdelivr.net/npm/lunr/lunr.min.js"></script>
<script src="{{ '/assets/js/search.js' | relative_url }}"></script>
<!--stackedit_data:
eyJoaXN0b3J5IjpbMTQ2Nzg2MTIyMCwxMTcxNjU5MTY3XX0=
-->