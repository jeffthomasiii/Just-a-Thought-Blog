# Design Consistency Decision Log

Use this file to preserve significant design and implementation decisions made during the Design Consistency Roadmap.

A decision record should explain not only what was selected, but why it was selected, what alternatives were considered, and what consequences follow from the choice.

## Decision template

```markdown
## D-XXX — Decision title

**Date:** YYYY-MM-DD  
**Status:** Proposed | Accepted | Superseded | Deferred  
**Related work item:** DS-XX

### Context

What problem or choice required a decision?

### Decision

What was selected?

### Rationale

Why was this selected?

### Alternatives considered

- Alternative one
- Alternative two

### Consequences

- Positive consequence
- Constraint or tradeoff

### Follow-up

- Any future review or implementation action
```

---

## D-001 — Use Home as the primary visual baseline

**Date:** 2026-07-15  
**Status:** Accepted  
**Related work item:** DS-01

### Context

The site contains multiple overlapping design systems created during different phases of the redesign. A clear baseline is required before individual pages are updated.

### Decision

Use the current Home page editorial-board system as the primary visual baseline for typography, color, component language, framing, spacing, and overall tone.

### Rationale

The Home page most clearly expresses the intended Just A Thought identity: warm, editorial, peaceful, mature, image-led, and restrained.

### Alternatives considered

- Continue the inherited Clean Blog page system as the baseline.
- Use the older rounded landing-page system used by Podcast and Series.
- Design a completely new fourth system.

### Consequences

- Existing pages will migrate toward the Home visual language.
- Home must be refined before it is treated as final.
- Page-specific layouts remain permitted when they use shared tokens and components.

### Follow-up

- Complete DS-01 and DS-02 before major page redesigns.

---

## D-002 — Use Resources as the interior landing-page reference

**Date:** 2026-07-15  
**Status:** Accepted  
**Related work item:** DS-01, DS-10

### Context

Interior landing pages need to relate to Home without duplicating the exact Home content arrangement.

### Decision

Use Resources as the preferred example for adapting the Home editorial-board system to an interior landing page.

### Rationale

Resources uses the Home board hero, 1280px container, shared buttons, kickers, thin borders, rectangular cards, split-image sections, and dedicated dark-mode treatment.

### Alternatives considered

- Use Podcast as the landing-page standard.
- Use Series as the landing-page standard.
- Create unrelated page-specific systems.

### Consequences

- Podcast and Series migrated toward the Resources structure while retaining unique content and functionality.
- Resources was revalidated after shared CSS consolidation.

### Follow-up

- Maintain Resources through the shared Sass stack and recheck it whenever core landing-page components change.

---

## D-003 — Maintain three page archetypes

**Date:** 2026-07-15  
**Status:** Accepted  
**Related work item:** DS-01

### Context

Using one identical page template would create consistency but weaken the distinct purpose of archive, search, narrative, profile, and promotional pages.

### Decision

Maintain three related page archetypes:

1. Editorial landing pages
2. Collection and utility pages
3. Narrative and profile pages

### Rationale

This creates visual consistency while preserving functional and editorial differences between pages.

### Alternatives considered

- Use one universal template for every page.
- Continue building a separate design system for every page.

### Consequences

- Shared tokens and components become more important than identical layouts.
- Each page must be assigned clearly to one archetype.

### Follow-up

- Document reusable classes or layouts during DS-01.

---

## D-004 — Keep CV outside the primary navigation

**Date:** 2026-07-15  
**Status:** Accepted  
**Related work item:** DS-03, DS-06, DS-07

### Context

The CV is useful professional background but is not a primary reader-facing content category of the blog.

### Decision

Retain `/cv/`, present it as `Professional Background`, and link it from About and the footer rather than the main navigation.

### Rationale

This keeps the main navigation focused on the publication while making Jeff Thomas III's professional background accessible to readers, event organizers, clients, and collaborators.

### Alternatives considered

- Restore CV as a main navigation item.
- Remove the CV entirely.
- Place the full CV content inside About.

### Consequences

- About remains personal and reflective rather than résumé-like.
- The CV can use a professional profile layout without competing with blog content.

### Follow-up

- Maintain the About and footer links as professional facts change.

---

## D-005 — Use documentation tracking while GitHub Issues are disabled

**Date:** 2026-07-15  
**Status:** Accepted  
**Related work item:** DS-00

### Context

GitHub rejected issue creation because Issues are disabled in the repository. A durable repo-native tracking method is still required.

### Decision

Track the initiative through versioned Markdown documents in `docs/design-consistency/`, dedicated implementation branches, pull requests, a changelog, and this decision log.

### Rationale

The documentation remains reviewable, version-controlled, and directly connected to the implementation history through commits and pull requests.

### Alternatives considered

- Keep the plan only in chat.
- Use an external task manager.
- Enable Issues before documenting any work.

### Consequences

- Status updates require edits to the roadmap documents.
- Pull requests become the primary discussion and implementation record.
- The documents can later be converted into Issues if repository Issues are enabled.

### Follow-up

- Reconsider issue-based tracking if Issues are enabled in the future.

---

## D-006 — Introduce the shared design system through an additive migration

**Date:** 2026-07-15  
**Status:** Accepted  
**Related work item:** DS-01

### Context

Home, Resources, Series, Podcast, Posts, Search, About, and CV depended on overlapping style files created during different design phases. Removing or rewriting those styles in one change would have created a high risk of regressions across pages that had not yet been redesigned.

### Decision

Introduce `_sass/design-system.scss` and `_sass/page-archetypes.scss` as the canonical shared layer, load them after the existing global and Home styles, and retain compatibility aliases and legacy page styles until each dependent page migrates.

### Rationale

An additive migration established one preferred source for new work while protecting current pages. It allowed each page archetype to migrate and be validated independently.

### Alternatives considered

- Remove all duplicate variables and styles in DS-01.
- Rewrite every public page in one pull request.
- Leave the current systems unchanged until every page could be redesigned simultaneously.

### Consequences

- The repository temporarily contains canonical and legacy rules.
- New shared work uses canonical tokens and classes.
- Import order remains part of the compatibility contract.
- Proven page-specific legacy layers can be removed as dependent pages migrate.

### Follow-up

- Use D-007 to govern the remaining inherited-template cleanup after DS-10.

---

## D-007 — Prefer evidence-based legacy cleanup over broad deletion

**Date:** 2026-07-16  
**Status:** Accepted  
**Related work item:** DS-10

### Context

After all eight roadmap pages migrated, the repository still contained a standalone Resources stylesheet and broad inherited files used by Clean Blog, posts, contact, and utility templates. Some selectors in the broad files are no longer used by the eight primary pages, but those files also support pages outside the final QA matrix.

### Decision

Remove superseded page-specific layers when their replacement and dependency boundaries are proven. Retain broad foundational files until a dedicated inherited-template cleanup can test every dependent route.

During DS-10:

- Remove `assets/css/jat-resources.css` and its page-level loading.
- Move Resources into the shared Sass stack.
- Remove Resources inline presentation rules and height-based media behavior.
- Retain the Clean Blog vendor layer, `_sass/styles.scss`, and `_sass/_dark.scss`.
- Retain data-driven Home image values selected by Liquid.

### Rationale

The Resources layer had a clear replacement and a narrow dependency boundary. The broad legacy files do not. Deleting isolated selectors from foundational files would produce little reader-facing benefit while increasing regression risk for inherited templates outside the eight-page roadmap.

### Alternatives considered

- Remove every selector not used by the eight primary pages.
- Leave the superseded Resources stylesheet in place.
- Rewrite post, contact, and utility templates during DS-10.

### Consequences

- The final design-consistency roadmap removes a confirmed redundant stylesheet without overextending its scope.
- A small amount of compatibility CSS remains intentionally.
- Future cleanup must include post, contact, and utility templates in its test matrix.

### Follow-up

- Create a separate legacy-CSS reduction project only when inherited templates can be migrated and tested together.
