# Just A Thought Blog — Shared Design System

**Related work item:** DS-01  
**Status:** Initial implementation  
**Last updated:** 2026-07-15

## Purpose

This document defines the shared visual foundation for Just A Thought Blog. It should guide all page work without forcing every page into an identical composition.

The Home page remains the primary visual baseline. Resources remains the preferred example for adapting the editorial-board system to an interior landing page.

## Source files

- `_sass/design-system.scss` — canonical tokens and shared components
- `_sass/page-archetypes.scss` — shared page-family foundations
- `assets/main.scss` — import order
- `_layouts/default.html` — exposes page archetypes on the body element

## Import strategy

The shared design system currently loads after the legacy global and Home styles and before dark-mode overrides:

```scss
@import "styles";
@import "visual-board-home";
@import "design-system";
@import "page-archetypes";
@import "dark";
```

This order is intentional during migration. It lets the canonical shared layer stabilize common components without prematurely deleting styles still required by Posts, Search, About, Series, Podcast, and CV.

## Canonical token naming

New code should use semantic or canonical tokens from `_sass/design-system.scss`.

### Brand colors

- `--jat-color-olive-deep`
- `--jat-color-olive-muted`
- `--jat-color-sage`
- `--jat-color-cream`
- `--jat-color-parchment`
- `--jat-color-ink`
- `--jat-color-gray`
- `--jat-color-gold`
- `--jat-color-paper`

### Semantic colors

Prefer these when the intent matters more than the specific color:

- `--jat-surface-page`
- `--jat-surface-panel`
- `--jat-surface-card`
- `--jat-surface-emphasis`
- `--jat-text-primary`
- `--jat-text-secondary`
- `--jat-text-muted`
- `--jat-action-primary`
- `--jat-action-hover`
- `--jat-accent-highlight`
- `--jat-border-subtle`
- `--jat-border-strong`

### Layout and spacing

- `--jat-width-board`: 1280px editorial frame
- `--jat-width-content`: 1120px content frame
- `--jat-width-reading`: 760px narrative reading width
- `--jat-page-gutter`
- `--jat-panel-gap`
- `--jat-section-space`
- `--jat-panel-padding`

### Shape and elevation

- `--jat-radius-none`
- `--jat-radius-subtle`
- `--jat-radius-control`
- `--jat-radius-round`
- `--jat-shadow-low`
- `--jat-shadow-medium`

### Typography

- `--jat-font-display`
- `--jat-font-body`
- `--jat-font-reflective`

## Legacy compatibility aliases

The shared token file temporarily maps earlier naming conventions to the canonical tokens. Examples include:

- `--jat-deep-olive`
- `--jat-olive-deep`
- `--jat-muted-olive`
- `--jat-olive-muted`
- `--jat-charcoal`
- `--jat-ink`
- `--jat-muted-gold`
- `--jat-gold`

Do not use these aliases in new code. Remove them only after all dependent legacy styles have migrated.

## Shared components

### Containers

- `.jat-board-container` or `.jat-container-board`
- `.jat-container-content`
- `.jat-container-reading`
- `.jat-page-frame`

### Editorial hierarchy

- `.jat-kicker`
- `.jat-simple-divider`
- `.jat-leaf`

### Actions

- `.jat-button-row`
- `.jat-btn`
- `.jat-btn-primary`
- `.jat-btn-secondary`
- `.jat-text-link`

### Surfaces

- `.jat-panel`
- `.jat-panel--padded`
- `.jat-panel--parchment`
- `.jat-card-surface`
- `.jat-status-label`

### Page rhythm

- `.jat-page-shell`
- `.jat-page-section`

## Page archetypes

Pages opt into a page family through front matter:

```yaml
page_archetype: landing
```

The default layout renders this as:

```html
<body class="jat-archetype-landing" data-page-archetype="landing">
```

### Editorial landing pages

```yaml
page_archetype: landing
```

Current pages:

- Home
- Resources

Planned migrations:

- Series
- Podcast

Use for image-led pages with modular editorial sections.

### Collection and utility pages

```yaml
page_archetype: collection
```

Planned pages:

- Posts
- Search

Use for archives, filters, search results, and repeated content cards.

### Narrative and profile pages

```yaml
page_archetype: profile
```

Planned pages:

- About
- Professional Background / CV

Use for personal narrative, author context, professional history, and comfortable long-form reading.

## Shape rules

- Use square to 4px corners for panels, cards, buttons, and status labels.
- Reserve circles for icons, social controls, and the theme toggle.
- Avoid heavily rounded cards and pill-shaped primary buttons.
- Use shadows sparingly and only where elevation clarifies hierarchy.

## Dark mode

The canonical design system changes semantic tokens on `body.dark-mode`. New shared components should consume semantic tokens so they inherit dark-mode behavior automatically.

Page-specific dark-mode CSS remains temporarily necessary for older page systems. It should be retired only after those pages migrate.

## Accessibility foundations

The shared system includes a visible `:focus-visible` treatment for links, buttons, inputs, selects, text areas, and summary controls.

Each page implementation must still validate:

- Heading order
- Keyboard sequence
- Link purpose
- Alternative text
- Color contrast
- Responsive reading order

## Migration rules

1. Do not remove legacy styles merely because a shared replacement exists.
2. Migrate a page to shared classes first.
3. Validate desktop, tablet, mobile, light mode, and dark mode.
4. Remove only the legacy rules proven unused after migration.
5. Record removed or retained dependencies in `CHANGELOG.md`.
6. Record significant visual decisions in `DECISIONS.md`.

## Current migration status

### Migrated to archetype metadata and shared semantic classes

- Home
- Resources

### Still dependent on legacy page systems

- Posts
- Search
- About
- Series
- Podcast
- CV / Professional Background

### Known temporary dependencies

- `_sass/styles.scss` still contains earlier root variables and shared component rules.
- `_sass/visual-board-home.scss` still contains hard-coded values and duplicate Home component definitions.
- `assets/css/jat-pages.css` still defines the older landing-page system used by Series and Podcast.
- `assets/css/jat-dark-pages.css` remains necessary for legacy dark-mode support.
- Page-specific polish files remain necessary until their related work items are complete.
- The Home layout retains page-specific inline styles that should be evaluated during DS-02.

These dependencies are intentional during the non-breaking migration and are not the preferred location for new shared design rules.
