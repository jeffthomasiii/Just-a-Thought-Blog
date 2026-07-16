# Just A Thought Blog — Design Consistency Roadmap

**Status:** Final cross-site validation underway  
**Owner:** Jeff Thomas III  
**Repository:** `jeffthomasiii/Just-a-Thought-Blog`  
**Baseline:** Home page and Resources page editorial-board design system  
**Last updated:** 2026-07-16

## Purpose

This roadmap provides a systematic process for bringing the public pages of Just A Thought Blog into a consistent visual and brand system without making every page look identical.

The Home page establishes the primary visual standard. The Resources page demonstrates how that system can be adapted to an interior landing page. Other pages should share the same typography, colors, spacing, component language, navigation, footer, and responsive behavior while retaining page-specific structure and purpose.

## Why this documentation exists

GitHub Issues are currently disabled in this repository. This folder serves as the repository-native work tracker until Issues are enabled.

The documentation is designed to record:

- What needs to change
- Why the change is needed
- Which files are likely involved
- What is intentionally out of scope
- How completion will be validated
- What was actually changed
- Which design decisions were made or deferred

## Tracking files

- [Detailed Work Items](WORK-ITEMS.md)
- [Shared Design System](DESIGN-SYSTEM.md)
- [Implementation Changelog](CHANGELOG.md)
- [Design Decision Log](DECISIONS.md)

## Page archetypes

The site will use three related page families.

### 1. Editorial landing pages

**Pages:** Home, Resources, Series, Podcast

Shared characteristics:

- 1280px editorial board container
- Framed split hero where appropriate
- Small uppercase kicker
- Playfair Display page title
- Muted-gold and olive divider treatment
- Editorial photography
- Modular bordered sections
- Page-specific cards and content patterns

### 2. Collection and utility pages

**Pages:** Posts, Search

Shared characteristics:

- Compact editorial hero
- Strong functional hierarchy
- Wider content area
- Consistent archive and result cards
- Filters, search, and pagination where appropriate
- Less decorative content than landing pages

### 3. Narrative and profile pages

**Pages:** About, CV / Professional Background

Shared characteristics:

- Personal or contextual hero
- Comfortable reading width
- Wider visual sections between narrative passages
- Pull quotes, profile facts, and supporting images
- Clear relationship between Jeff Thomas III and the Just A Thought publication

## Work sequence

| ID | Work item | Phase | Status |
|---|---|---:|---|
| DS-01 | Consolidate shared design system and page archetypes | 0 | Complete |
| DS-02 | Refine Home page baseline | 0 | Complete |
| DS-03 | Correct global navigation and footer consistency | 0 | Complete |
| DS-04 | Redesign Posts archive | 1 | Complete |
| DS-05 | Redesign Search experience | 1 | Complete |
| DS-06 | Rebuild CV as Professional Background | 1 | Complete |
| DS-07 | Redesign About page | 2 | Complete |
| DS-08 | Align Podcast page | 2 | Complete |
| DS-09 | Align Series page | 2 | Complete |
| DS-10 | Validate Resources and complete cross-site QA | 3 | In progress |

## Recommended implementation order

### Phase 0 — Establish the standard

1. DS-01: Consolidate shared design system and page archetypes
2. DS-02: Refine Home page baseline
3. DS-03: Correct global navigation and footer consistency

### Phase 1 — Highest-impact pages

1. DS-04: Redesign Posts archive
2. DS-05: Redesign Search experience
3. DS-06: Rebuild CV as Professional Background

### Phase 2 — Narrative and landing pages

1. DS-07: Redesign About page
2. DS-08: Align Podcast page
3. DS-09: Align Series page

### Phase 3 — Validation

1. DS-10: Validate Resources and complete cross-site QA

## Standard workflow for each work item

1. Update the work item status in `WORK-ITEMS.md` to **In progress**.
2. Create a dedicated branch using a descriptive name.
3. Limit the branch and pull request to one work item unless two items are technically inseparable.
4. Capture before screenshots at desktop, tablet, and mobile widths.
5. Implement the scoped changes.
6. Validate light mode, dark mode, keyboard navigation, links, and responsive behavior.
7. Open a pull request that references the work item ID in the title and description.
8. Add an entry to `CHANGELOG.md` describing what actually changed.
9. Add or update any significant design decision in `DECISIONS.md`.
10. Update the work item status to **Complete** only after the pull request is merged.

## Pull request naming convention

Use the work item ID at the beginning of the title.

Examples:

- `DS-01 Consolidate shared design tokens and components`
- `DS-04 Redesign Posts archive`
- `DS-06 Rebuild Professional Background page`

## Branch naming convention

Examples:

- `agent/ds-01-shared-design-system`
- `agent/ds-04-posts-archive`
- `agent/ds-06-professional-background`

## Completion evidence

Every completed work item should record:

- Branch name
- Pull request number or URL
- Files changed
- Components added, replaced, or retired
- Content changes, if any
- Design decisions made
- Deferred work
- Desktop validation
- Tablet validation
- Mobile validation
- Dark-mode validation
- Accessibility validation
- Before and after screenshots

## Status definitions

- **Not started:** Documented but no implementation branch exists.
- **In progress:** A branch or active pull request exists.
- **Review:** Implementation is complete and awaiting review or validation.
- **Blocked:** Work cannot proceed until a dependency or decision is resolved.
- **Complete:** Pull request merged, validation recorded, and changelog updated.
- **Deferred:** Intentionally postponed with the reason recorded.

## Guiding principles

- Consistency does not mean sameness.
- Shared components should support page purpose rather than erase it.
- The Home page is the visual baseline, not a template to duplicate literally.
- Resources is the preferred example for adapting the Home system to an interior landing page.
- Posts, Search, and CV represent the largest remaining design gaps.
- Series and Podcast should retain their useful page-specific functionality.
- About should remain personal and reflective rather than becoming a résumé.
- The site should feel warm, editorial, peaceful, mature, and uncluttered.
- Typography, spacing, navigation, buttons, colors, borders, and responsive behavior should be predictable across the site.
