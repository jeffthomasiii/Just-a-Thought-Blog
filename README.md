# Just A Thought

**Live site:** justathoughtblog.org

**Just A Thought (JAT)** is a reflective Christian publication by Jeff Thomas III. The website is powered by Jekyll and GitHub Pages and has evolved from a date-first personal blog toward a curated library organized through Article Types, Reader Collections, tags, series, Scripture, and search.

The website domain retains “blog,” but **Blog is not part of the current formal brand name**.

## Repository Purpose

This public repository contains the website source, published content, assets, build configuration, and the implementation documentation needed to maintain the site.

JAT's broader organizational, editorial, authorship, theological, and brand-governance standards are maintained separately from the public code repository. Repository documentation should therefore describe how the website is implemented rather than expose the complete internal publishing and editorial process.

## Content Architecture

Published post front matter is the content database for Just A Thought. Metadata fields have separate responsibilities and should not be used interchangeably.

### Article Types

Article Types are stored in Jekyll's `categories` field. A standard post uses exactly one official Article Type:

- `reflection`
- `devotional`
- `bible-study`
- `resource`
- `series-introduction`
- `guest-post`
- `announcement`

### Reader Collections

Official Reader Collections are:

- `faith`
- `marriage`
- `leadership`
- `technology`
- `culture`
- `creation`

Collections are broad, overlapping reader pathways. They are not Article Types.

### Topic Tags

Tags describe specific reusable ideas within and across collections. Use lowercase kebab case and reuse the canonical vocabulary whenever possible.

Implementation taxonomy is documented in:

- `docs/content-architecture.md`
- `docs/collection-definitions.md`
- `docs/tag-taxonomy.md`

## Front Matter

JAT distinguishes between **Core Fields** used on every standard publication and **Conditional Fields** used when the content or publishing context calls for them.

### Core Fields

```yaml
---
layout: post
title: "Your Post Title Here"
subtitle: "Your subtitle here"
description: "Meta description for search and previews"
date: YYYY-MM-DD
author: Jeff Thomas III
categories:
  - reflection
collections:
  - faith
tags:
  - specific-tag
excerpt: "Short editorial summary or invitation."
image: /img/posts/your-post-image.jpg
background: /img/posts/bg-your-post-image.jpg
---
```

### Conditional Fields

```yaml
contributors:
  - Contributor Name
scripture:
  - 1 Peter 1:14-16
series: "Series Title Here"
series_order: 1
audio_file: /audio/posts/example-reflection.mp3
audio_duration: "8 min"
```

Omit conditional fields when they do not apply rather than leaving blank keys. Use exactly one official Article Type, the smallest useful set of Reader Collections, normalized tags, and a YAML array for Scripture.

## File Naming

Posts belong in `_posts/` and use:

```text
YYYY-MM-DD-post-title.md
```

Use lowercase, hyphenated filenames for new content and imagery.

## Logo Implementation

The website header and footer use the same canonical light/dark logo-mark family:

```text
Light: /img/brand/logos/logo-mark/light/just-a-thought-mark-256px.webp
Dark:  /img/brand/logos/logo-mark/dark/just-a-thought-mark-dark-256px.webp
```

The current full podcast identity is:

```text
/img/brand/logos/JAT_Podcast_Logo.png
```

Implementation references:

- `docs/brand/logo-usage-guide.md`
- `docs/brand/brand-asset-inventory.md`

## Repository Structure

| Type | Location | Description |
|---|---|---|
| Posts | `_posts/` | Published Markdown articles |
| Drafts | `_drafts/` | Unpublished drafts |
| Layouts | `_layouts/` | Page and post templates |
| Includes | `_includes/` | Navigation, footer, scripts, reusable components |
| Styles | `_sass/`, `assets/` | Shared design system and compiled assets |
| Images | `img/` | Brand, page, post, and social imagery |
| Audio | `audio/` | Optional recorded reflection files |
| Configuration | `_config.yml` | Site metadata and build settings |
| Documentation | `docs/` | Implementation standards, architecture, notes, and project history |

## Local Development

```bash
bundle install
bundle exec jekyll serve --force_polling
```

Open `http://localhost:4000`.

## Development Workflow

1. Create a dedicated branch from `master`.
2. Make the content, code, or asset changes.
3. Validate front matter and asset paths where applicable.
4. Preview locally or through the branch workflow when practical.
5. Open a pull request into `master`.
6. Confirm the protected Jekyll build passes.
7. Review the deployed site after merging.

Do not make routine content or code changes directly on `master`.

## Current Direction

Current and planned site work includes stronger collection/topic discovery, series and reading paths, the Audio Companion and podcast extension, downloadable resources, image optimization, and additional social/Open Graph refinement.

## License and Attribution

The theme was originally forked from Start Bootstrap Clean Blog. Content, writing, original images, and customizations are © Jeff Thomas III unless otherwise noted. All rights reserved. Guest and contributor content remains credited to its respective author.