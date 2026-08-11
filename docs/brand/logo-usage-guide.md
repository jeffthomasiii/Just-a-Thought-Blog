# Just A Thought — Logo & Mark Usage Guide

**Status:** Canonical  
**Updated:** 2026-08-10

This guide defines current logo usage for **Just A Thought (JAT)**. It replaces older guidance that treated “Blog” as part of the formal brand name or pointed site components to legacy logo files.

For broader identity rules, see `brand-identity-standard.md`. For the repository inventory and legacy status of individual files, see `brand-asset-inventory.md`.

## 1. Core Rule

Use the current approved artwork exactly as supplied. Do not redraw, simplify, recolor, crop, distort, rotate, add effects to, or reconstruct the logo mark for routine use.

The approved light and dark logo marks are separate artworks. **Do not generate dark mode with CSS filters, inversion, or automatic recoloring.**

## 2. Canonical Logo Mark

The canonical JAT mark is the lightbulb/dove/olive-branch artwork.

### Light mode

Repository folder:

```text
/img/brand/logos/logo-mark/light/
```

Website default:

```text
/img/brand/logos/logo-mark/light/just-a-thought-mark-256px.webp
```

Use on light, cream, parchment, and other backgrounds where the light artwork maintains appropriate contrast.

### Dark mode

Repository folder:

```text
/img/brand/logos/logo-mark/dark/
```

Website default:

```text
/img/brand/logos/logo-mark/dark/just-a-thought-mark-dark-256px.webp
```

Use on dark-mode and deep-background interfaces.

The dark artwork is an approved companion mark, not a modified-on-the-fly version of the light mark.

## 3. Available Logo-Mark Sizes

The logo-mark folders contain proportional PNG derivatives for common sizes from 16px through 2048px, plus lossless WebP derivatives for key web sizes.

For normal website interface use, prefer the **256px WebP** and let CSS control displayed dimensions. Use 512px or 1024px assets only where a larger or high-density placement genuinely requires them.

Do not create a new raster file merely to match every CSS display size.

## 4. Website Header

The JAT website header/navigation uses the canonical logo-mark family, paired with the current text/wordmark treatment in the interface.

Use:

```text
Light: /img/brand/logos/logo-mark/light/just-a-thought-mark-256px.webp
Dark:  /img/brand/logos/logo-mark/dark/just-a-thought-mark-dark-256px.webp
```

The theme controls which approved artwork is visible. The mark should switch with the site theme rather than being recolored.

Do not substitute the favicon, podcast logo, monogram, or a legacy logo for the navigation mark.

## 5. Website Footer

The footer uses the **same canonical light/dark logo-mark family as the header**. This keeps the site identity consistent from entry to exit.

Use the same 256px WebP source files unless a future implementation establishes a documented reason for a different derivative.

The footer should not independently introduce another JAT logo variant.

## 6. Podcast Identity

Canonical podcast logo:

```text
/img/brand/logos/JAT_Podcast_Logo.png
```

Use this same asset anywhere the current podcast identity is presented, including:

- Homepage Podcast Spotlight
- Listen page podcast section
- Podcast landing experiences
- Podcast promotional graphics where the full podcast identity is appropriate

Do not use the retired `just-a-thought-podcast-logo.png` filename in new code or documentation.

The podcast is a JAT brand extension. Its identity may include microphone/audio imagery while remaining visually connected to the parent brand.

## 7. Podcast Icon

`just-a-thought-podcast-icon.png` remains a specialized compact podcast asset where an icon/avatar treatment is specifically needed. It is not a substitute for `JAT_Podcast_Logo.png` in full podcast-brand placements.

## 8. Favicon

Favicons are a separate functional asset class from the site logo mark.

Do not assume that the navbar/footer mark and favicon must use the same source file. Favicons should be optimized for very small browser/app contexts and should be referenced intentionally from the site's head metadata.

Current favicon files should be treated according to actual site implementation and the asset inventory. If the favicon system is revised, update both the implementation and this guide in the same change.

## 9. Other Logo Assets

The repository contains additional wordmarks, horizontal logos, icons, monograms, and historical variants. Their presence in `/img/brand/logos/` does **not** automatically make them canonical for primary site use.

Before using an alternate asset, check `brand-asset-inventory.md` for its status.

General rule:

- **Canonical** — approved for the documented use.
- **Specialized** — approved for a narrow context.
- **Alternate** — available but not the default identity.
- **Legacy / deprecated** — retained for compatibility or history; do not introduce into new work.

## 10. Clear Space and Proportion

Preserve the artwork's original proportions. Never stretch the mark independently in width or height.

Allow enough surrounding space that the branch, bulb, and dove remain visually distinct from adjacent text, borders, controls, or photography. Do not crowd the mark into a container merely to maximize its size.

## 11. Backgrounds

Choose the approved light or dark artwork based on contrast and theme.

Avoid placing either mark over visually busy photography unless the mark remains clearly legible without adding unapproved effects. Prefer a calm surface or dedicated brand area.

## 12. Prohibited Treatments

Do not:

- redraw or reinterpret the dove, bulb, or branch;
- alter the mark's colors for routine applications;
- use CSS filters to manufacture a theme variant;
- stretch or squash the artwork;
- remove or rearrange elements;
- add drop shadows, outlines, bevels, glows, or gradients not present in the approved source;
- place “Blog” back into the formal JAT identity;
- use the podcast logo as the general site logo;
- use a favicon as a substitute for the canonical header/footer mark;
- revive a legacy filename merely because old code or documentation references it.

## 13. Implementation Examples

### Liquid image path

```liquid
{{ '/img/brand/logos/logo-mark/light/just-a-thought-mark-256px.webp' | relative_url }}
```

### Theme-aware markup pattern

Use two approved image sources and allow the site's theme classes to control visibility. Do not alter either image through filters.

## 14. Governance

When changing a logo implementation:

1. use an approved asset from the canonical inventory;
2. update all related contexts that should remain consistent;
3. search the repository for stale references and CSS `content: url(...)` overrides;
4. verify light and dark modes;
5. verify the generated site/preview rather than only the source markup;
6. update this guide and the asset inventory if the canonical system changed.

The repository implementation and these canonical brand documents should tell the same story.