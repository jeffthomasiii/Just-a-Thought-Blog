# Just A Thought Blog — Shared Design System

**Status:** Current reference  
**Originally established:** 2026-07-15  
**Cross-site migration completed:** 2026-07-16  
**Documentation refreshed:** 2026-07-27

## Purpose

This document defines the current shared visual foundation for Just A Thought Blog. It should guide new page, component, and style work without forcing every page into an identical composition.

The site should feel like a calm Christian editorial journal: warm, reflective, mature, uncluttered, and human.

The Home page remains the primary visual baseline. Resources remains the preferred example for adapting that system to an interior editorial landing page.

---

## Canonical Source Files

- `_sass/design-system.scss` — canonical brand, semantic, typography, spacing, border, shape, and focus tokens
- `_sass/page-archetypes.scss` — shared foundations for page families
- `assets/main.scss` — Sass import order
- `_layouts/default.html` — page-archetype and body-class output
- Page-specific Sass partials — scoped adaptations built on the shared system

New shared work should begin in the canonical Sass layer rather than introducing a new parallel token or component system.

---

## Visual Direction

### Brand Colors

- `--jat-color-olive-deep`
- `--jat-color-olive-muted`
- `--jat-color-sage`
- `--jat-color-cream`
- `--jat-color-parchment`
- `--jat-color-ink`
- `--jat-color-gray`
- `--jat-color-gold`
- `--jat-color-paper`

### Semantic Colors

Prefer semantic tokens when the design intent matters more than the literal color:

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

### Recommended Visual Balance

- Warm neutral backgrounds should dominate.
- Charcoal and deep-ink tones should carry most text.
- Olive should function as a meaningful accent rather than a universal fill.
- Muted gold should be used sparingly for highlights, focus, dividers, and small details.
- Shadows should clarify hierarchy rather than decorate every surface.

---

## Layout and Spacing

Canonical width and rhythm tokens include:

- `--jat-width-board`: 1280px editorial frame
- `--jat-width-content`: 1120px content frame
- `--jat-width-reading`: 760px narrative reading width
- `--jat-page-gutter`
- `--jat-panel-gap`
- `--jat-section-space`
- `--jat-panel-padding`

Use the editorial frame for broad page composition, the content frame for repeated cards and functional layouts, and the reading width for sustained narrative prose.

Whitespace is part of the brand. Do not compress pages merely to fit more content above the fold.

---

## Typography

Canonical typography tokens include:

- `--jat-font-display`
- `--jat-font-body`
- `--jat-font-reflective`

General use:

| Purpose | Direction |
|---|---|
| Logo, hero titles, post titles | Playfair Display or the canonical display token |
| Body copy | Source Sans 3, Lora, or the canonical body token |
| Navigation, metadata, controls | Clean readable sans-serif treatment |
| Scripture callouts and reflective quotes | Display or reflective serif treatment |

Typography should feel literary and editorial without becoming ornamental. Body copy should remain comfortable for long-form reading.

---

## Shape and Elevation

- Use square to 4px corners for panels, cards, buttons, fields, and status labels.
- Reserve circles for icons, social controls, and the theme toggle.
- Avoid heavily rounded cards and pill-shaped primary buttons.
- Use low or medium elevation only when it clarifies hierarchy.
- Prefer borders, spacing, and tonal surfaces over heavy shadows.

Canonical tokens include:

- `--jat-radius-none`
- `--jat-radius-subtle`
- `--jat-radius-control`
- `--jat-radius-round`
- `--jat-shadow-low`
- `--jat-shadow-medium`

---

## Shared Components

### Containers

- `.jat-board-container`
- `.jat-container-board`
- `.jat-container-content`
- `.jat-container-reading`
- `.jat-page-frame`

### Editorial Hierarchy

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

### Page Rhythm

- `.jat-page-shell`
- `.jat-page-section`

Use existing shared classes before creating a page-specific equivalent. Add a new shared component only when the pattern genuinely repeats across multiple contexts.

---

## Page Archetypes

Pages opt into a family through front matter:

```yaml
page_archetype: landing
```

The default layout exposes that value as a body class and data attribute.

### Editorial Landing Pages

```yaml
page_archetype: landing
```

Current pages:

- Home
- Resources
- Series
- Podcast

Use for image-led pages with modular editorial sections, framed heroes, and page-specific storytelling or promotional content.

### Collection and Utility Pages

```yaml
page_archetype: collection
```

Current pages:

- Posts
- Search

The Listen library follows the collection-and-utility design principles even where its current implementation uses a dedicated body class and component stack.

Use this family for archives, search, filters, pagination, sorting, and repeated content cards.

### Narrative and Profile Pages

```yaml
page_archetype: profile
```

Current pages:

- About
- Professional Background

Use for personal narrative, author context, professional history, profile facts, and comfortable long-form reading.

### Inherited Utility Pages

Contact and some post or utility templates still retain portions of the inherited Clean Blog system. They should use current brand language and shared tokens where practical, but broad template migration should occur only within a dedicated, validated cleanup project.

---

## Imagery

Images should feel:

- Natural
- Warm
- Reflective
- Calm
- Slightly cinematic
- Relational or creation-centered when appropriate
- Honest rather than heavily staged

Avoid baked-in text, unnecessary logos or watermarks, overly busy backgrounds, and generic prosperity-style Christian stock imagery.

Use wide cinematic crops for heroes and square or 4:5 crops for social and card imagery.

---

## Dark Mode

Shared components should consume semantic tokens so they inherit dark-mode behavior automatically.

Dark mode should remain warm rather than shifting into a cold blue or pure-black technology aesthetic. Use deep warm surfaces, softened off-white text, olive accents, restrained gold, and sufficient contrast.

Page-specific dark-mode rules remain acceptable when the component or page genuinely requires them, but they should remain scoped and should not redefine the entire site.

---

## Accessibility Foundations

The shared system includes a visible `:focus-visible` treatment for links, buttons, inputs, selects, textareas, and summary controls.

Every reader-facing change should still validate:

- One clear `h1`
- Logical heading order
- Keyboard sequence
- Visible focus
- Link purpose
- Alternative text and decorative-image handling
- Color contrast
- Responsive reading order
- No unintended horizontal overflow
- Clear labels and status messaging
- Reduced-motion behavior where animation or smooth scrolling is used

Accessibility should be treated as part of the visual system rather than a final decorative check.

---

## Compatibility and Legacy Rules

Earlier token aliases remain available where inherited styles still depend on them. Examples include:

- `--jat-deep-olive`
- `--jat-olive-deep`
- `--jat-muted-olive`
- `--jat-olive-muted`
- `--jat-charcoal`
- `--jat-ink`
- `--jat-muted-gold`
- `--jat-gold`

Do not use these aliases in new code. Remove them only after all dependent selectors have been migrated and tested.

The Clean Blog vendor layer, `_sass/styles.scss`, `_sass/_dark.scss`, and a limited amount of compatibility CSS remain intentionally because inherited post, Contact, and utility templates still use portions of them.

---

## Change Rules

1. Use canonical tokens and shared components first.
2. Keep page-specific selectors scoped beneath a page or component class.
3. Do not introduce a second shared button, card, container, or typography system without a documented need.
4. Preserve responsive behavior and dark-mode equivalence.
5. Validate desktop, tablet, mobile, keyboard, and focus behavior.
6. Remove legacy rules only after proving that all dependent routes have migrated.
7. Record significant design decisions in `DECISIONS.md`.
8. Update this reference when the implemented system changes.

The migration phase is complete. Future work should maintain and extend the established system rather than continuing to describe current pages as planned migrations.