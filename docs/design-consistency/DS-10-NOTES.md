# DS-10 — Resources Validation and Cross-Site QA Notes

**Status:** In progress  
**Branch:** `agent/ds-10-final-qa`

## Resources review

- Confirm Resources remains the preferred interior landing-page example.
- Verify the hero, panels, cards, status labels, images, and actions against the shared component system.
- Review repeated `Coming Soon` language and consolidate it where useful.
- Confirm planned resource cards are clearly non-interactive.
- Review hero and section image proportions at desktop, tablet, and mobile widths.
- Confirm light- and dark-mode behavior after all shared-style migrations.
- Review the separate `jat-resources.css` layer and inline background-image declarations for maintainability.

## Cross-site QA matrix

Review Home, Posts, Series, Podcast, Resources, About, Search, and Professional Background for:

- Typography hierarchy and reading rhythm.
- Semantic color and contrast.
- Container widths, hero spacing, panels, cards, borders, shadows, and buttons.
- Navigation active states and footer destinations.
- Image proportions, crops, and alternative-text treatment.
- Heading hierarchy, landmarks, unique IDs, and accessible labels.
- Keyboard order and visible focus.
- Desktop, tablet, and mobile layouts.
- Light and dark modes.
- Broken, empty, placeholder, or misleading links.
- Search URL restoration and filtering.
- Posts archive pagination.
- Professional Background print output.

## Legacy cleanup review

- Identify obsolete selectors only after confirming no compiled page depends on them.
- Remove superseded page-specific polish rules where safe.
- Remove redundant inline styles where they no longer provide data-driven values.
- Confirm the final Sass import order.
- Confirm referenced images exist and document intentionally retained legacy dependencies.

## Completion requirements

- Resources remains a strong branded landing page after any targeted corrections.
- Every public page clearly belongs to one of the three page archetypes.
- Shared components behave consistently across all eight primary public pages.
- No known broken or misleading navigation remains.
- Light mode, dark mode, responsive behavior, and accessibility checks are documented.
- The roadmap, changelog, decision log, and deferred-work record are current.
