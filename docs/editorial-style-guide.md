# Just A Thought Editorial Style Guide

**Version:** 1.1  
**Status:** Canonical  
**Adopted:** 2026-08-04  
**Updated:** 2026-08-11

This guide governs recurring article voice, structure, formatting, metadata, and editorial decisions for **Just A Thought**.

For substantial drafting, revision, or archive remediation, `docs/authorship-authentic-voice-standard.md` is the authoritative voice-preservation rubric and supplements this guide.

## Voice

Writing should remain:

- reflective and honest rather than preachy;
- biblically grounded without becoming heavy-handed;
- personal without becoming performative;
- compassionate when addressing complexity;
- clear and conversational rather than overly polished;
- convictional without becoming combative.

Do not invent personal stories, experiences, conversations, feelings, motivations, spiritual experiences, or details.

When Scripture or evidence does not make a conclusion explicit, use appropriately humble language such as “I believe,” “it seems,” or “one possible reason.” Definitive statements are appropriate when the source genuinely establishes them.

## JAT Fingerprint

When it naturally fits the thought, preserve this movement:

> event/catalyst → observation → question → processing → Scripture, experience, person, or source enters the conversation → thought develops → provisional reflection

This is a fingerprint, not a mandatory template.

Default toward **Reflection Mode**, allowing readers to see the thought develop. Use **Teaching Mode** when exegesis, theology, history, instruction, technical explanation, or argument genuinely requires it.

## Flexible Article Structure

The traditional structure remains a guide:

### Hook / Catalyst

Begin with the real story, question, tension, observation, Scripture, conversation, sermon, source, or experience when one exists. Never manufacture a personal hook.

### Context and Reflection

Explain what prompted the thought and why it stayed with Jeff.

### Development

Unpack the idea carefully. Consider theological, relational, practical, cultural, or philosophical dimensions without forcing certainty beyond what the source material supports.

### Resolution or Open-Ended Reflection

Offer meaningful closure, a next step, a question that remains open, or an appropriately provisional conclusion.

### Closing

Most author-written reflections should end with:

> …just a thought.

Exceptions include guest posts, formal resources rather than reflections, and pieces where pastoral sensitivity calls for another ending.

### Reader Prompt

A reflective question is optional, not automatic. Include one only when it genuinely helps continue the thought.

Do not force articles into three points, equally sized sections, perfectly resolved lessons, or a repeated visible template.

## Natural Prose

Write in paragraphs that develop complete thoughts. Most paragraphs should contain three to six sentences unless a shorter paragraph genuinely serves the narrative.

Allow natural variation in paragraph and section length. Avoid stacking dramatic one-sentence paragraphs, rhetorical triples, repeated contrasts, and social-media-style fragmentation.

Emphasis should come primarily from progression and clarity.

## Word Count

Count the published body from the opening hook through the “…just a thought.” closing, including an optional reader prompt. Exclude front matter, title, subtitle, description, excerpt, metadata, and image captions.

- Brief reflections and devotionals: 700–1,100 words
- Standard articles: 1,200–1,800 words
- Series installments and deeper theological reflections: 1,600–2,200 words
- Cornerstone resources and detailed guides: 2,200–3,500 words

Most articles should land between 1,200 and 2,000 words. These are editorial ranges rather than quotas. Never pad or compress a thought merely to meet a range.

## Scripture

- Represent passages accurately and in context.
- Identify the translation when directly quoting Scripture.
- Distinguish exegesis from application and application from analogy.
- Distinguish theological synthesis from explicit biblical statements.
- Do not imply that an application is the passage's exclusive meaning when it is not.
- Avoid proof-texting and unsupported claims about God's or a biblical character's motives.
- Do not overstate Greek or Hebrew word meanings.
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

## Quotations, Sources, and Provenance

- Attribute quotations.
- Link or cite research claims, statistics, books, sermons, podcasts, and external frameworks where feasible.
- Preserve provenance when another person or source materially shaped the thought.
- Distinguish what a source establishes from Jeff's application, interpretation, synthesis, or reflection.
- Avoid lengthy quotations when a concise excerpt and paraphrase will serve the reader.
- Verify wording and source details before publication.
- Do not present an illustrative or composite story as a factual event.

## Capitalization and Terminology

- The formal brand name is **Just A Thought**, not “Just A Thought Blog.” The domain may retain “blog.”
- Capitalize Scripture and Bible.
- Capitalize Gospel when referring to the Christian message.
- Use Church for the universal body of Christ when that distinction is intended; use lowercase church for a local congregation/building unless part of a proper name.
- Capitalize pronouns for God only when preserving a quoted translation or the established voice of a post; maintain consistency within the article.
- Prefer `biblical marriage` when discussing the scriptural vision of marriage.
- Use `Christ-centered` and `God-given` as compound modifiers.
- Use `Bible study` in prose and `bible-study` as the article-type slug.
- Use `artificial intelligence` on first reference and `AI` thereafter when appropriate.

## Punctuation and Typography

- Use em dashes sparingly.
- Prefer commas, periods, or parentheses when they read more naturally.
- Use typographic apostrophes and quotation marks in article prose.
- Use a standard hyphen in YAML slugs and Scripture ranges.
- Avoid ellipses as a substitute for clear transitions. The signature closing remains an intentional exception.

## Headings

- Use descriptive headings that help readers follow the thought.
- Do not over-section short posts.
- Longer pieces should have enough sectioning to support reading without turning the article into an outline.
- Use sentence case for article section headings unless a title requires otherwise.

## Front Matter

Follow the canonical field responsibilities in `docs/content-architecture.md` and the current repository taxonomy.

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
- Use descriptive lowercase kebab-case filenames.
- `image` is the article/social-preview image.
- `background` is the wide hero image.
- Do not store image files inside `_posts`.
- Follow `docs/brand/brand-identity-standard.md` for visual direction.

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

1. Ask why the article exists and confirm the real catalyst is visible when appropriate.
2. Read the article aloud for natural pacing.
3. Confirm the central thought is clear without becoming artificially resolved.
4. Verify Scripture, quotations, provenance, and factual claims.
5. Check that theological certainty matches what the text supports.
6. Check for conspicuous fragmentation, symmetry, genericity, excessive polish, template visibility, and overstatement.
7. Confirm the closing phrase is present when appropriate.
8. Validate YAML.
9. Check image paths and filenames.
10. Review categories, collections, tags, series, and Scripture against the canonical taxonomy.

If the article passes these checks, do not keep polishing merely for the sake of polish.