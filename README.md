# Just A Thought

> Reflecting on faith, life, and the thoughts that shape us.

**Live site:** https://justathoughtblog.org

**Just A Thought (JAT)** is a reflective Christian publication by Jeff Thomas III. It explores faith, Scripture, marriage, leadership, culture, technology, camping, creation, and ordinary life through honest processing, biblical conviction, practical wisdom, and humble invitation.

The website domain retains “blog,” but **Blog is no longer part of the formal brand name**.

The goal is not to win arguments, manufacture controversy, or present every thought as a final answer. The goal is to slow down, pay attention, think biblically, and invite readers into meaningful reflection.

Most reflective posts close with:

> “…just a thought.”

## Purpose

Just A Thought exists to help readers slow down, reflect honestly, and consider life, faith, marriage, leadership, culture, technology, camping, and creation through a thoughtful Christian lens.

The publication should remain reflective without becoming overly polished, biblically grounded without becoming heavy-handed, honest without becoming careless, compassionate without avoiding conviction, personal without becoming performative, and inviting rather than argumentative.

## Primary Topics

- Faith and Scripture
- Biblical marriage and relationships
- Leadership, character, and personal growth
- Culture, discernment, and identity
- Technology, artificial intelligence, and ethical reflection
- RV camping, creation, rest, and slowing down
- Devotionals, small-group reflections, and resource-style content

## Editorial Voice

The writing should feel like a thoughtful conversation with someone who has been processing something deeply and now wants to share it honestly.

The voice should be reflective, warm, honest, conversational, biblically grounded, compassionate, clear, relatable, and convictional without becoming combative.

For substantial drafting, revision, or archive work, follow `docs/authorship-authentic-voice-standard.md`. The default JAT fingerprint is:

> event/catalyst → observation → question → processing → Scripture, experience, person, or source enters the conversation → thought develops → provisional reflection

Structure should follow the thought rather than forcing every article into the same template.

## Scripture

Scripture should shape the reflection rather than decorate it. Represent passages accurately and in context, distinguish exegesis from application and analogy, and do not strengthen a theological claim beyond what the text establishes.

## Content Architecture

Published post front matter is the content database for Just A Thought. Metadata fields have separate responsibilities and should not be used interchangeably.

### Article Types

Article Types are stored in Jekyll's `categories` field. A post uses exactly one official Article Type:

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

Canonical taxonomy rules live in:

- `docs/content-architecture.md`
- `docs/collection-definitions.md`
- `docs/tag-taxonomy.md`

## YAML Front Matter

Use this structure as the starting point and remove optional fields when they do not apply:

```yaml
---
layout: post
title: "Your Post Title Here"
subtitle: "Optional Subtitle Here"
description: "Optional meta description for SEO and cards"
date: YYYY-MM-DD
author: Jeff Thomas III
contributors:
  - Contributor Name
categories:
  - reflection
collections:
  - faith
tags:
  - specific-tag
excerpt: "Short summary that teases the post."
image: /img/posts/your-post-image.jpg
background: /img/posts/bg-your-post-image.jpg
scripture:
  - 1 Peter 1:14-16
series: "Series Title Here"
series_order: 1
audio_file: /audio/posts/example-reflection.mp3
audio_duration: "8 min"
---
```

Use exactly one official Article Type, the smallest useful set of Reader Collections, normalized tags, and a YAML array for Scripture. Validate YAML before publishing.

## File Naming

Posts belong in `_posts/` and use:

```text
YYYY-MM-DD-post-title.md
```

Use lowercase, hyphenated filenames for new content and imagery.

## Image and Visual Direction

Images should support the reflection rather than compete with it. Favor natural, warm, reflective, calm, slightly cinematic imagery that feels honest rather than staged.

Generated editorial images should normally contain no text, logo, or watermark. The visual identity uses warm neutral backgrounds, olive accents, charcoal/deep ink text, restrained warm highlights, generous whitespace, and an editorial reading hierarchy.

## Brand Standards

The repository is the canonical home for current JAT brand and editorial standards.

### Visual identity

- `docs/brand/brand-identity-standard.md` — brand name, purpose, positioning, visual personality, colors, typography, imagery, and brand governance
- `docs/brand/logo-usage-guide.md` — current logo-mark, dark-mode, podcast, favicon, and implementation rules
- `docs/brand/brand-asset-inventory.md` — canonical, specialized, alternate, and legacy asset status

### Editorial identity

- `docs/editorial-style-guide.md` — recurring editorial conventions, Scripture, prose, metadata, and quality review
- `docs/authorship-authentic-voice-standard.md` — authoritative standard for preserving JAT authorship, provenance, and reflective voice

### Content architecture

- `docs/content-architecture.md`
- `docs/collection-definitions.md`
- `docs/tag-taxonomy.md`

When older documentation or examples conflict with these canonical standards, follow the current repository implementation and the applicable canonical document.

## Current Logo Implementation

The website header and footer use the same canonical light/dark logo-mark family:

```text
Light: /img/brand/logos/logo-mark/light/just-a-thought-mark-256px.webp
Dark:  /img/brand/logos/logo-mark/dark/just-a-thought-mark-dark-256px.webp
```

The current full podcast identity is:

```text
/img/brand/logos/JAT_Podcast_Logo.png
```

See the logo guide and asset inventory before introducing another logo file into site code.

## Repository Structure

The site is powered by **Jekyll** and hosted with **GitHub Pages**, using a heavily customized version of the Start Bootstrap Clean Blog Jekyll theme.

| Type | Location | Description |
|---|---|---|
| Posts | `_posts/` | Published Markdown reflections |
| Drafts | `_drafts/` | Unpublished drafts |
| Layouts | `_layouts/` | Page and post templates |
| Includes | `_includes/` | Navigation, footer, scripts, reusable components |
| Styles | `_sass/`, `assets/` | Shared design system and compiled assets |
| Images | `img/` | Brand, page, post, and social imagery |
| Audio | `audio/` | Optional recorded reflection files |
| Configuration | `_config.yml` | Site metadata and build settings |
| Documentation | `docs/` | Canonical standards, implementation notes, and project history |

## Local Development

```bash
bundle install
bundle exec jekyll serve --force_polling
```

Open `http://localhost:4000`.

## Publishing Workflow

1. Create a dedicated branch from `master`.
2. Add or edit content and related assets.
3. Validate front matter and image paths.
4. Preview locally when practical.
5. Review editorial voice, Article Type, Collections, tags, Scripture, contributors, series metadata, and imagery.
6. Confirm reflective posts end with “…just a thought.” unless an exception applies.
7. Open a pull request into `master`.
8. Confirm the protected Jekyll build passes.
9. Review the deployed page after merging.

Do not make routine content or code changes directly on `master`.

## Current Direction

JAT is evolving from a date-first personal blog into a curated reflective library. Current and planned work includes stronger collection/topic discovery, series and reading paths, the Audio Companion and podcast extension, downloadable resources, continued taxonomy governance, image optimization, and additional social/Open Graph refinement.

## Contact

Thoughtful feedback can be shared through the site's Contact page.

## License and Attribution

The theme was originally forked from Start Bootstrap Clean Blog. Content, writing, original images, and customizations are © Jeff Thomas III unless otherwise noted. All rights reserved. Guest and contributor content remains credited to its respective author.