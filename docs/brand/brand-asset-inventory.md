# Just A Thought — Brand Asset Inventory

**Status:** Canonical inventory  
**Updated:** 2026-08-10

This inventory records the intended status of JAT logo assets in `/img/brand/logos/`. It exists to prevent old filenames or visually similar files from becoming accidental sources of truth.

For usage rules, see `logo-usage-guide.md`.

## Status Definitions

- **Canonical** — current approved source for the documented use.
- **Specialized** — current approved asset for a narrow use.
- **Alternate** — usable where intentionally selected, but not the default site identity.
- **Legacy / deprecated** — retained for compatibility/history; do not introduce into new implementations.
- **Review** — present in the repository but not yet formally assigned a current role.

## Canonical Site Logo Mark

### Light family — Canonical

```text
/img/brand/logos/logo-mark/light/
```

Contains the approved transparent light-mode mark and proportional PNG/WebP derivatives.

Primary website source:

```text
just-a-thought-mark-256px.webp
```

Use for the light-mode navbar and footer.

### Dark family — Canonical

```text
/img/brand/logos/logo-mark/dark/
```

Contains the approved transparent dark-mode mark and proportional PNG/WebP derivatives.

Primary website source:

```text
just-a-thought-mark-dark-256px.webp
```

Use for the dark-mode navbar and footer.

## Podcast Assets

### `JAT_Podcast_Logo.png` — Canonical

```text
/img/brand/logos/JAT_Podcast_Logo.png
```

Current full podcast identity. Use consistently on the Homepage Podcast Spotlight, Listen page, podcast landing experiences, and other full podcast-brand placements.

### `just-a-thought-podcast-icon.png` — Specialized

Compact podcast-specific icon/avatar asset. Use only where the full podcast logo is inappropriate because of space or format.

### `just-a-thought-podcast-logo.png` — Legacy / deprecated

Older podcast logo filename referenced by previous site code and CSS. Do not use in new code. Replace stale references with `JAT_Podcast_Logo.png` where the full podcast identity is intended.

## Favicon / Small-App Assets

### `favicon-lightbulb-dove.png` — Current implementation asset; specialized

Used by existing favicon/head implementation unless and until the favicon system is deliberately revised.

### `just-a-thought-favicon.png` — Legacy / review

Previously used as a general-purpose site mark in navbar/footer code. It must **not** be used as a substitute for the canonical header/footer logo mark.

If it remains part of the favicon system, document that use explicitly during a future favicon audit.

## Other Existing Brand Assets

### `just-a-thought-Logo-mark.png` — Alternate / source-history

Standalone mark retained at the root logo level. Primary site implementation should use the canonical derivatives in `logo-mark/light/` and `logo-mark/dark/`.

### `just-a-thought-icon.png` — Alternate

General icon-only asset. Do not substitute it for the canonical site header/footer mark without an intentional brand decision.

### `just-a-thought-logo-secondary.png` — Alternate

Secondary logo treatment. Not the default navbar/footer identity.

### `just-a-thought-logo-horizontal-transparent-hd.png` — Alternate

Horizontal transparent treatment available for intentional wide-format applications. It is not the current navbar source.

### `just-a-thought-jat-monogram-transparent-hd.png` — Specialized / alternate

JAT monogram for contexts where the audience already understands the abbreviation or the full brand name appears nearby. Not a primary public introduction to the brand.

### `jat-olive-branch.png` — Specialized visual element

Olive-branch brand motif. Treat as a supporting visual element rather than a standalone replacement for the JAT logo.

## Canonical Website Mapping

| Context | Light | Dark |
|---|---|---|
| Navbar | `logo-mark/light/just-a-thought-mark-256px.webp` | `logo-mark/dark/just-a-thought-mark-dark-256px.webp` |
| Footer | `logo-mark/light/just-a-thought-mark-256px.webp` | `logo-mark/dark/just-a-thought-mark-dark-256px.webp` |
| Homepage Podcast Spotlight | `JAT_Podcast_Logo.png` | Same asset unless a future approved theme variant is created |
| Listen page podcast identity | `JAT_Podcast_Logo.png` | Same asset unless a future approved theme variant is created |

## Repository Hygiene

Legacy assets do not need to be deleted merely because they are deprecated. They may remain to avoid breaking old content or for historical reference.

However:

- new code must not introduce deprecated filenames;
- old references should be removed when encountered and verified;
- CSS `content: url(...)` rules must be included in logo-reference audits because they can override correct HTML image sources;
- a filename's presence in the repository is not proof that it is current;
- when a canonical asset changes, update this inventory in the same branch/PR.

## Future Asset Work

When the favicon, social avatar, Open Graph, print, SVG, or other asset systems are formally finalized, add them here with explicit status and canonical paths rather than relying on folder contents alone.