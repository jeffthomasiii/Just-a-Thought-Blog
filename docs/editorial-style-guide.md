# Just A Thought Editorial Style Guide

**Version:** 1.0  
**Status:** Canonical  
**Adopted:** 2026-08-04

This guide governs article voice, structure, formatting, metadata, and recurring editorial decisions for Just A Thought.

## Voice

Writing should remain:

- reflective and honest rather than preachy
- biblically grounded without becoming heavy-handed
- personal without becoming performative
- compassionate when addressing complexity
- clear and conversational rather than overly polished

Do not invent personal stories, experiences, conversations, or details. Clearly identify illustrative, composite, or hypothetical stories.

When Scripture does not make a conclusion explicit, use appropriately humble language such as “I believe,” “it seems,” or “one possible reason.” Definitive statements are appropriate when the biblical text is explicit.

## Standard Article Structure

### Hook

Open with one to three sentences that introduce a relatable story, question, tension, or observation.

### Context and Reflection

Explain what prompted the thought. Draw from Scripture, personal experience, relationships, work, culture, technology, or creation as appropriate.

### Development

Unpack the idea carefully. Consider theological, relational, practical, cultural, or philosophical dimensions without forcing certainty beyond what the source material supports.

### Resolution or Open-Ended Reflection

Offer meaningful closure, a next step, or a question that remains open.

### Closing

Posts by Jeff Thomas III should end with:

> …just a thought.

Guest posts are exempt unless the contributor chooses to use it.

### Reader Prompt

An optional reflective question may follow the article. It is included in the published body word count.

## Natural Prose

Write in paragraphs that develop complete thoughts. Most paragraphs should contain three to six sentences unless a shorter paragraph serves the narrative.

Avoid stacking dramatic one-sentence paragraphs. Emphasis should come from progression and clarity rather than social-media-style fragmentation.

Use short paragraphs for screen readability, but do not sacrifice natural essay flow.

## Word Count

Count the published body from the opening hook through the “…just a thought.” closing, including an optional reader prompt. Exclude front matter, title, subtitle, description, excerpt, metadata, and image captions.

- Brief reflections and devotionals: 700–1,100 words
- Standard articles: 1,200–1,800 words
- Series installments and deeper theological reflections: 1,600–2,200 words
- Cornerstone resources and detailed guides: 2,200–3,500 words

Most articles should land between 1,200 and 2,000 words. These are editorial ranges rather than quotas.

## Scripture

- Represent passages accurately and in context.
- Identify the translation when directly quoting Scripture.
- Avoid implying that an application is the passage's exclusive meaning when it is not.
- Distinguish interpretation from personal reflection.
- Use standard Bible-book names in front matter.
- Store references as a YAML list.

Example:

```yaml
scripture:
  - Proverbs 18:21
  - James 1:19
  - James 3:1-12
  - Ephesians 4:29
```

## Quotations and Sources

- Attribute all quotations.
- Link or cite research claims, statistics, books, and external frameworks where feasible.
- Avoid lengthy quotations when a concise excerpt and paraphrase will serve the reader.
- Verify wording and source details before publication.
- Do not present an illustrative story as a factual event.

## Capitalization and Terminology

- Capitalize Scripture, Bible, Gospel when referring to the Christian message, and Church when referring to the universal body of Christ. Use lowercase church for a local congregation or building unless part of a proper name.
- Capitalize pronouns for God only when preserving a quoted translation or the established voice of a post. Maintain consistency within each article.
- Prefer `biblical marriage` when discussing the scriptural vision of marriage.
- Use `Christ-centered` and `God-given` with hyphens when used as compound modifiers.
- Use `Bible study` in prose and `bible-study` as the article-type slug.
- Use `artificial intelligence` on first reference and `AI` thereafter when appropriate.

## Punctuation and Typography

- Use em dashes sparingly.
- Prefer commas, periods, or parentheses when they read more naturally.
- Use typographic apostrophes and quotation marks in article prose.
- Use a standard hyphen in YAML slugs and Scripture ranges.
- Avoid ellipses as a substitute for clear transitions. The required closing phrase remains an intentional exception.

## Headings

- Use descriptive headings that help readers follow the thought.
- Do not over-section short posts.
- Posts longer than 2,200 words should have clear sectioning.
- Use sentence case for article section headings unless a title requires otherwise.

## Front Matter

Follow the canonical field responsibilities in `docs/content-architecture.md`.

### Required fields

```yaml
layout: post
title: "Post Title"
date: YYYY-MM-DD
author: Jeff Thomas III
categories:
  - reflection
collections:
  - faith
tags:
  - specific-tag
excerpt: "Short summary"
```

### Optional fields

```yaml
subtitle: "Optional subtitle"
description: "Optional meta description"
contributors:
  - Contributor Name
image: /img/posts/post-image.jpg
background: /img/posts/bg-post-image.jpg
scripture:
  - Scripture Reference
series: "Series Title"
series_order: 1
```

Omit optional fields when unused. Do not leave blank keys.

### YAML conventions

- Use spaces, never tabs.
- Use two-space indentation for lists.
- Use hyphenated lists rather than asterisks.
- Quote titles, subtitles, descriptions, excerpts, series names, and strings containing punctuation that YAML may interpret.
- Keep categories, collections, and tags lowercase.
- Use one editorial type in `categories` unless a documented exception is approved.
- Validate YAML before publishing.

## Images

- Store post images under `/img/posts/`.
- Use a descriptive lowercase kebab-case filename.
- `image` is the article and social-preview image.
- `background` is the wide hero image.
- Do not store image files inside `_posts`.

## Filenames

Use:

```text
YYYY-MM-DD-lowercase-kebab-case-title.md
```

Avoid uppercase letters, ampersands, typographic punctuation, ellipses, spaces, and doubled extensions.

Do not rename a published post without considering URL preservation and redirects.

## Series

- Use the exact same `series` string across all installments.
- Use numeric `series_order` values.
- Use `0` for a genuine prelude when needed.
- A series introduction uses the `series-introduction` article type.

## Quality Review

Before publication:

1. Read the article aloud for natural pacing.
2. Confirm the central thought is clear.
3. Verify Scripture, quotations, and factual claims.
4. Check that theological certainty matches what the text supports.
5. Confirm the closing phrase is present unless it is a guest post.
6. Validate YAML.
7. Check image paths and filenames.
8. Review categories, collections, tags, series, and Scripture against the canonical taxonomy.
