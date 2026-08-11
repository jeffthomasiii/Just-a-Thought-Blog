# Just A Thought — Logo Implementation Guide

**Status:** Repository implementation reference  
**Updated:** 2026-08-11

This guide documents the logo assets and implementation rules needed to maintain the **Just A Thought (JAT)** website. Broader brand strategy and editorial standards are maintained outside the public repository.

For the repository inventory and legacy status of individual files, see `brand-asset-inventory.md`.

## 1. Core Rule

Use the approved artwork exactly as supplied. Do not redraw, simplify, recolor, crop, distort, rotate, add effects to, or reconstruct the logo mark for routine website use.

The approved light and dark logo marks are separate artworks. **Do not generate dark mode with CSS filters, inversion, or automatic recoloring.**

## 2. Canonical Logo Mark

The canonical site mark is the lightbulb/dove/olive-branch artwork.

### Light mode

```text
/img/brand/logos/logo-mark/light/
```

Website default:

```text
/img/brand/logos/logo-mark/light/just-a-thought-mark-256px.webp
```

### Dark mode

```text
/img/brand/logos/logo-mark/dark/
```

Website default:

```text
/img/brand/logos/logo-mark/dark/just-a-thought-mark-dark-256px.webp
```

The dark artwork is an approved companion mark, not a modified-on-the-fly version of the light mark.

## 3. Available Logo-Mark Sizes

The logo-mark folders contain proportional PNG derivatives for common sizes from 16px through 2048px, plus lossless WebP derivatives for key web sizes.

For normal website interface use, prefer the **256px WebP** and let CSS control displayed dimensions. Use larger derivatives only where a larger or high-density placement genuinely requires them.

Do not create a new raster file merely to match every CSS display size.

## 4. Website Header and Footer

The header/navigation and footer use the same canonical light/dark logo-mark family.

```text
Light: /img/brand/logos/logo-mark/light/just-a-thought-mark-256px.webp
Dark:  /img/brand/logos/logo-mark/dark/just-a-thought-mark-dark-256px.webp
```

The theme controls which approved artwork is visible. Do not substitute the favicon, podcast logo, monogram, or a legacy logo for the navigation/footer mark.

## 5. Podcast Identity

Canonical podcast logo:

```text
/img/brand/logos/JAT_Podcast_Logo.png
```

Use this same asset for the current full podcast identity, including:

- Homepage Podcast Spotlight
- Listen page podcast section
- Podcast landing experiences

Do not use the retired `just-a-thought-podcast-logo.png` filename in new code.

`just-a-thought-podcast-icon.png` remains a specialized compact podcast asset where an icon/avatar treatment is specifically needed.

## 6. Favicon

Favicons are a separate functional asset class from the site logo mark. Do not assume that the navbar/footer mark and favicon must use the same source file.

If the favicon system is revised, update both the implementation and this guide in the same change.

## 7. Other Logo Assets

The repository contains additional wordmarks, horizontal logos, icons, monograms, and historical variants. Their presence in `/img/brand/logos/` does not automatically make them canonical for primary site use.

Check `brand-asset-inventory.md` before using an alternate asset.

## 8. Proportion and Backgrounds

Preserve the artwork's original proportions. Never stretch the mark independently in width or height.

Allow enough surrounding space that the branch, bulb, and dove remain visually distinct from adjacent text, borders, controls, or photography.

Choose the approved light or dark artwork based on contrast and theme. Avoid placing either mark over visually busy photography unless it remains clearly legible without adding unapproved effects.

## 9. Prohibited Treatments

Do not:

- redraw or reinterpret the dove, bulb, or branch;
- alter the mark's colors for routine applications;
- use CSS filters to manufacture a theme variant;
- stretch or squash the artwork;
- remove or rearrange elements;
- add unapproved shadows, outlines, bevels, glows, or gradients;
- add “Blog” to the current site identity;
- use the podcast logo as the general site logo;
- use a favicon as a substitute for the canonical header/footer mark;
- revive a legacy filename merely because old code references it.

## 10. Implementation Example

```liquid
{{ '/img/brand/logos/logo-mark/light/just-a-thought-mark-256px.webp' | relative_url }}
```

For theme-aware markup, use the two approved image sources and allow the site's theme classes to control visibility. Do not alter either image through filters.

## 11. Change Checklist

When changing a logo implementation:

1. Use an approved asset from the inventory.
2. Update related contexts that should remain consistent.
3. Search the repository for stale references and CSS `content: url(...)` overrides.
4. Verify light and dark modes.
5. Verify the generated site/preview rather than only source markup.
6. Update this guide and the asset inventory if the implementation mapping changed.