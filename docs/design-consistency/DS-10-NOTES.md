# DS-10 — Resources Validation and Cross-Site QA Notes

**Status:** In progress  
**Branch:** `agent/ds-10-final-qa`

## Resources corrections implemented

- Retained Resources as the preferred example of an interior editorial landing page.
- Moved Resources presentation from `assets/css/jat-resources.css` into the shared Sass compilation order.
- Removed the page-specific stylesheet link and deleted the superseded standalone CSS file.
- Added a page body class so every Resources presentation selector is scoped.
- Replaced inline background-image blocks with proportional `<img>` elements.
- Added explicit desktop, tablet, and mobile aspect ratios for hero, planned-resource, and design-principle imagery.
- Replaced repeated `Coming Soon` language with one `In Development` section and `Planned` card labels.
- Clarified that planned cards are previews rather than active downloads.
- Added section heading IDs and `aria-labelledby` relationships.
- Retained the current resource concepts, descriptions, formats, and available-now actions.
- Added all four Resources images to the rendered validation artifact.

## Cross-site validation in progress

Primary pages:

- Home
- Posts
- Series
- Podcast
- Resources
- About
- Search
- Professional Background

Checks:

- Archetype and body-class assignment
- Heading and landmark structure
- Navigation active states
- Footer destinations
- Empty, placeholder, and broken internal links
- Desktop, tablet, and mobile overflow
- Light- and dark-mode presentation
- Image sizing, crops, and alternative-text treatment
- Keyboard order and visible focus
- Search URL state and result behavior
- Posts pagination
- Series anchors and expandable reading lists
- Professional Background print output
- CSS import order and selector scope
- Safe legacy cleanup and documented retained dependencies

## Deferred by scope

- Newsletter implementation
- Podcast launch, feeds, and episode publishing
- New category or topic archive pages
- Large-scale editing of existing post content
- Individual per-series landing pages
