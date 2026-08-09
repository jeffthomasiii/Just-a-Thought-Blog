---
layout: default
title: Search
description: Find reflections by word, phrase, collection, type, theme, or series across the Just A Thought library.
permalink: /search/
page_archetype: collection
---

<header class="jat-collection-hero jat-search-hero jat-page-shell">
  <div class="jat-page-frame jat-search-hero-inner">
    <div class="jat-search-hero-copy">
      <p class="jat-kicker">Search the Library</p>
      <h1>{{ page.title }}</h1>
      <div class="jat-simple-divider" aria-hidden="true"><span></span><span class="jat-leaf">❦</span><span></span></div>
      <p>{{ page.description }}</p>
    </div>
    <div class="jat-search-hero-actions">
      <a class="btn jat-btn jat-btn-secondary" href="{{ '/explore/' | relative_url }}">Explore the Library</a>
    </div>
  </div>
</header>

<main class="jat-collection-main jat-search-main">
  <section class="jat-search-panel jat-panel" aria-labelledby="search-form-heading">
    <div class="jat-search-panel-heading">
      <div>
        <p class="jat-kicker">Find a Specific Thought</p>
        <h2 id="search-form-heading">What are you looking for?</h2>
      </div>
      <p>Search freely, then narrow by the part of life, kind of reflection, theme, or connected series.</p>
    </div>

    <form class="jat-search-form" id="search-form" role="search" novalidate>
      <div class="jat-search-query-field">
        <label for="search-input">Search reflections</label>
        <div class="jat-search-input-wrap">
          <span class="jat-search-input-icon" aria-hidden="true"><i class="fas fa-search"></i></span>
          <input id="search-input" name="q" type="search" placeholder="Try humility, marriage, hope, Romans 12..." autocomplete="off" spellcheck="false" aria-describedby="search-guidance" />
        </div>
      </div>

      <div class="jat-search-filters" aria-label="Search filters">
        <div class="jat-search-field">
          <label for="collection-filter">Collection</label>
          <select id="collection-filter" name="collection">
            <option value="">All collections</option>
          </select>
        </div>

        <div class="jat-search-field">
          <label for="category-filter">Type</label>
          <select id="category-filter" name="type">
            <option value="">All types</option>
          </select>
        </div>

        <div class="jat-search-field">
          <label for="tag-filter">Theme</label>
          <select id="tag-filter" name="theme">
            <option value="">All themes</option>
          </select>
        </div>

        <div class="jat-search-field">
          <label for="series-filter">Series</label>
          <select id="series-filter" name="series">
            <option value="">All series</option>
          </select>
        </div>

        <div class="jat-search-clear-wrap">
          <button class="btn jat-btn jat-btn-secondary" id="clear-filters" type="button">Clear</button>
        </div>
      </div>
    </form>

    <p class="jat-search-guidance" id="search-guidance">Search includes titles, subtitles, excerpts, article text, collections, article types, themes, and series.</p>
  </section>

  <section class="jat-search-results-section" aria-labelledby="search-results-heading">
    <div class="jat-search-results-heading">
      <div>
        <p class="jat-kicker">Library Results</p>
        <h2 id="search-results-heading">Reflections</h2>
      </div>
      <p id="search-meta" class="jat-search-meta" role="status" aria-live="polite">Loading the search index…</p>
    </div>

    <div id="search-state" class="jat-search-state jat-card-surface" aria-live="polite">
      <span class="jat-search-state-mark" aria-hidden="true">❦</span>
      <h3 id="search-state-title">Preparing Search</h3>
      <p id="search-state-copy">The reflection library is loading.</p>
    </div>

    <ol id="search-results" class="jat-search-results" aria-label="Search results"></ol>
  </section>

  <noscript>
    <div class="jat-search-state jat-card-surface">
      <h3>JavaScript is required for search</h3>
      <p>You can still explore every reflection from the <a href="{{ '/posts/' | relative_url }}">Posts archive</a>.</p>
    </div>
  </noscript>
</main>

<script src="https://cdn.jsdelivr.net/npm/lunr/lunr.min.js"></script>
<script src="{{ '/assets/js/search.js' | relative_url }}"></script>
