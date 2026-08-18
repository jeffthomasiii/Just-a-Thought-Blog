# Personalized Scripture — Implementation Checkpoint

**Date:** 2026-08-18  
**Branch:** `agent/personalized-scripture-foundation`  
**Draft PR:** #85

## Current State

The personalized **Scripture To Sit With** prototype is functional locally.

Implemented and tested:

- Anonymous reader history is stored in browser `localStorage`.
- The reader profile records article URL/title, categories, collections, tags, Scripture metadata, timestamps, and view counts.
- A generated Scripture/article index provides recommendation candidates from JAT articles that contain Scripture metadata.
- The recommendation engine scores candidates using the reader's local history, with weighting for collections, categories, tags, recency, previously viewed articles, and previously surfaced Scripture.
- Controlled randomness is included so the highest-scoring candidate is not always shown.
- The homepage Scripture card now updates dynamically.
- Scripture text is resolved through the current prototype Bible API and cached locally.
- The prototype translation has been changed from World English Bible to **King James Version (KJV)**.
- The translation is identified in the displayed citation.
- Scripture display is capped at approximately 34 words.
- Scripture typography has been reduced so longer passages fit the homepage card more comfortably.
- The revised card has been visually checked in both light and dark mode and currently looks good.
- The original authored Romans 12:2 card remains the fallback if personalization or Scripture resolution fails.

## Translation Direction

KJV is the temporary prototype translation because it is preferable to the World English Bible for JAT at this stage.

Longer term, the preferred direction is to support **ESV** or **LSB**, with ESV currently the strongest fit for the site's broad-reader, clear, accessible presentation. Any future implementation needs to respect the translation provider's licensing and API requirements.

## Testing Still Required

The next test is a **controlled marriage-reflection relevance test**.

Testing procedure when work resumes:

1. Clear `jat-readerProfileV1` from Local Storage.
2. Clear `jat-scriptureTextCacheV1` if a completely clean Scripture-text test is desired.
3. Browse only marriage-related reflections for a deliberate sample, likely around five articles.
4. Return to the homepage.
5. Refresh the homepage multiple times and record the Scripture selections.
6. Confirm that marriage-related Scripture is strongly favored.
7. Confirm the system does **not collapse into repeatedly showing the same verse or passage**.
8. Confirm controlled randomness still provides useful variation while remaining relevant.
9. Repeat later with another collection, such as faith, leadership, or technology, to compare behavior.

## Local Testing Environment — Resume Steps

The local test environment can be shut down now. To resume later:

```powershell
cd C:\GitHub\Just-a-Thought-Blog
git fetch origin
git switch agent/personalized-scripture-foundation
git pull
bundle install
bundle exec jekyll serve --force_polling
```

Then open:

```text
http://localhost:4000
```

If the branch is already checked out and dependencies are unchanged, the shorter restart is normally sufficient:

```powershell
cd C:\GitHub\Just-a-Thought-Blog
git pull
bundle exec jekyll serve --force_polling
```

To stop the local Jekyll server, use `Ctrl+C` in the terminal running it.

## Immediate Next Step

Resume with the controlled marriage-reflection relevance test before further tuning the weighting algorithm or moving the feature toward production.
