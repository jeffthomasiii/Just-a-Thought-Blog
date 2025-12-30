---
layout: page
title: Search
permalink: /search/
---

<div class="search-wrap">
  <input id="search-input" type="search" placeholder="Search posts..." autocomplete="off" />
  <p id="search-meta" style="margin-top: .75rem;"></p>
  <ul id="search-results"></ul>
</div>

<script src="https://cdn.jsdelivr.net/npm/lunr/lunr.min.js"></script>
<script src="{{ '/assets/js/search.js' | relative_url }}"></script>
