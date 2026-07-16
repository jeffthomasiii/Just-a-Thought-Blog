# DS-09 — Series Page Alignment Notes

**Status:** In progress  
**Branch:** `agent/ds-09-series-alignment`

## Existing behavior to preserve

- Series are discovered dynamically by grouping published posts on the `series` front-matter value.
- Blank or missing series values are excluded from the page.
- Posts within each series are sorted by `series_order` when present.
- `Created, Fallen, Restored` is preferred as the featured series when it exists; otherwise the first available series is used.
- Series cards link to native expandable `<details>` reading lists.
- Each reading-list item links directly to its published post.

## Implementation direction

- Assign Series to the shared editorial landing-page archetype.
- Replace the older hero and nested featured block with one framed split hero using the featured series image and metadata.
- Preserve the 1280px editorial-board container and shared kicker, divider, button, panel, card, and status components.
- Redesign the All Series area as an intentional editorial card grid without changing its dynamic Liquid data source.
- Redesign the reading lists while preserving native `<details>` behavior, series anchors, post order, and direct links.
- Remove reader-facing explanations about front matter, `series:`, and `series_order`.
- Improve fallback language and visual treatment when descriptions or images are missing.
- Consolidate Reading Pathways into one cohesive closing panel.
- Add explicit responsive image ratios and dark-mode treatments.

## Validation pending

- Protected Jekyll and Sass production build.
- Confirmation that every published series and every series post remains present.
- Confirmation that post order remains consistent with `series_order`.
- Featured-series selection and fallback behavior.
- Series card anchors and expandable reading lists.
- Desktop, tablet, and mobile visual review.
- Light- and dark-mode review.
- Long title, missing image, missing description, and varying post-count review.
- Keyboard operation and visible focus for links and `<summary>` controls.
- Heading hierarchy, landmarks, labels, and accessible expanded-state behavior.
- Regression review for Home, Resources, Podcast, About, and global navigation/footer.

## Deferred

- Individual per-series landing pages remain out of scope.
- Changes to post front matter or series membership remain out of scope unless validation reveals a content defect.
- Search or filtering within Series remains out of scope.
- Category archive pages remain out of scope.
