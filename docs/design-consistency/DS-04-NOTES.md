# DS-04 — Posts Archive Redesign Notes

**Status:** In progress  
**Branch:** `agent/ds-04-posts-archive`

## Implemented

- Replaced the inherited generic page layout with the shared collection-page archetype.
- Added a compact editorial archive hero with a direct Search action.
- Featured the newest reflection on the first archive page.
- Added a consistent two-column card grid for the remaining paginated posts.
- Preserved the existing five-post Jekyll pagination model and URLs.
- Added category, series, date, and estimated reading-time metadata.
- Added reliable image handling using each post's `image`, then `background`, then a branded fallback surface.
- Added consistent excerpt truncation so different post lengths do not destabilize the grid.
- Added branded Newer and Older pagination controls with a visible page count.
- Added responsive desktop, tablet, and mobile layouts.
- Added semantic dark-mode treatments through the shared token system.

## Validation pending

- Jekyll and Sass production build.
- First-page featured-post rendering.
- Later pagination-page rendering.
- Featured and card image fallbacks.
- Category, series, excerpt, and reading-time output.
- Newer and Older pagination destinations.
- Search destination.
- Desktop, tablet, and mobile visual review.
- Light- and dark-mode review.
- Keyboard and visible-focus review.
- Heading hierarchy and landmark review.

## Deferred

- Category archive pages remain out of scope.
- Bulk excerpt rewriting remains out of scope.
- Search interface redesign remains DS-05.
- Post URLs and individual post layouts are unchanged.
