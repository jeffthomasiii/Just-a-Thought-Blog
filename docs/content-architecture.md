# Just A Thought Content Architecture

**Version:** 1.3  
**Status:** Canonical implementation reference  
**Adopted:** 2026-08-04  
**Revised:** 2026-08-11

## Purpose

Just A Thought is a growing library of thoughtful, biblically grounded writing rather than a chronological blog alone. Readers should be able to discover content by editorial format, reader journey, specific theme, series, and Scripture.

Published post front matter is the single source of truth for site content architecture. The site does not require a separate database of existing or future posts.

## Metadata Responsibilities

Each field has one responsibility:

| Internal concept | Front matter field | Question it answers |
|---|---|---|
| Article Type | `categories` | What kind of article is this? |
| Reader Collection | `collections` | Where should readers discover it? |
| Topic Tag | `tags` | What specific ideas does it explore? |
| Series | `series` | What larger intentional conversation does it belong to? |
| Scripture | `scripture` | Which biblical passages are central to it? |

Metadata should not duplicate the responsibility of another field.

Throughout documentation and planning, use the term **Article Type** rather than Category. Jekyll continues storing article types in the `categories` field.

## Canonical Taxonomy Registry

The taxonomy has three layers with different governance rules:

1. **Article Types** are a closed controlled vocabulary.
2. **Reader Collections** are a closed controlled vocabulary.
3. **Topic Tags** are a controlled but extensible vocabulary.

New Article Types or Reader Collections require an architecture revision. New tags may be introduced as the library grows, but should follow the tag governance rules and be documented in `docs/tag-taxonomy.md`.

## Article Types

Every standard post must have exactly one Article Type:

- `reflection`
- `devotional`
- `bible-study`
- `resource`
- `series-introduction`
- `guest-post`
- `announcement`

### Reflection
A thoughtful essay connecting Scripture, experience, relationships, work, culture, technology, creation, or ordinary life.

### Devotional
A focused, usually shorter piece centered on a biblical passage and its spiritual application.

### Bible Study
A deeper exegetical, theological, historical, linguistic, or contextual exploration of Scripture.

### Resource
A practical reference such as a guide, reading plan, workbook, study aid, or downloadable tool.

### Series Introduction
The opening article that frames the purpose, scope, and direction of a series.

### Guest Post
An article written primarily by a contributor other than Jeff Thomas III. Guest status is derived from the `author` field; do not add a separate `guest: true` flag.

### Announcement
Site, ministry, publication, or project news. Use sparingly.

## Reader Collections

Official values, in canonical order:

1. `faith`
2. `marriage`
3. `leadership`
4. `technology`
5. `culture`
6. `creation`

Collections drive homepage topic cards, collection landing pages, and related-content pathways. A post may belong to multiple collections when the overlap is central and useful.

Detailed inclusion and exclusion guidance is maintained in `docs/collection-definitions.md`.

### Collection Assignment Principles

1. Assign the smallest useful set of collections.
2. Prefer relevance over completeness.
3. A post may have one collection.
4. Two collections are common when the overlap is substantial.
5. Three collections should be uncommon and clearly justified.
6. Collection placement may change when an article is substantially revised.
7. Homepage collection pages may feature or curate posts independently of chronology.

## Tags

Tags identify specific ideas, themes, practices, audiences, tensions, passages, or subjects.

Tags are a **controlled but extensible vocabulary** maintained in `docs/tag-taxonomy.md`.

Rules:

- Use lowercase.
- Use kebab case for multiword tags.
- Prefer specific terms over broad labels.
- Avoid duplicate meanings and spelling variants.
- Avoid using collection names as tags unless the tag adds a distinct meaning.
- Prefer stable concepts that can connect multiple posts.
- Aim for 5–10 meaningful tags for a normal post.
- Add a new tag only when it is reusable or provides meaningful discovery value.

## Metadata Responsibility Rule

- broad editorial format → **Article Type** / `categories`
- curated reader pathway → **Reader Collection** / `collections`
- granular reusable concept → **Topic Tag** / `tags`
- ordered body of writing → **Series** / `series`
- primary writer → **Author** / `author`
- material co-participant → **Contributor** / `contributors`

Do not use one field merely because another field seems inconvenient.

## Series

Series metadata is independent of article types, collections, and tags.

```yaml
series: "The Daily Death of Pride"
series_order: 1
```

Series order must be numeric. A prelude may use `0`.

## Scripture

Scripture references should be stored as a YAML array, even when only one reference is present.

```yaml
scripture:
  - Hebrews 10:19-25
  - Hebrews 11:1-12:2
  - James 1:2-27
```

Use standard English Bible-book names and a standard hyphen in YAML ranges for predictable processing.

## Authorship and Contributors

The `author` field identifies the primary writer and owner of the article.

```yaml
author: Jeff Thomas III
```

A guest author is any primary author other than Jeff Thomas III. Guest status is derived from `author`; do not introduce a redundant `guest` boolean.

Use `contributors` for people who made a material contribution without being the primary author.

## Front Matter Field Classes

JAT classifies front matter by **publication use**, not merely by what Jekyll or YAML technically requires.

### Core Fields

Core Fields are used on every standard JAT publication:

```yaml
---
layout: post
title: "Post Title"
subtitle: "Post subtitle"
description: "Meta description"
date: YYYY-MM-DD
author: Jeff Thomas III
categories:
  - reflection
collections:
  - faith
tags:
  - specific-tag
excerpt: "Short summary"
image: /img/posts/post-image.jpg
background: /img/posts/bg-post-image.jpg
---
```

`subtitle`, `description`, `image`, and `background` are Core Fields for JAT even though Jekyll may technically render a post without them.

### Conditional Fields

Use these when the content or publishing context calls for them, and omit them when they do not apply:

```yaml
contributors:
  - Contributor Name
scripture:
  - Scripture Reference
series: "Series Title"
series_order: 1
audio_file: /audio/posts/example-reflection.mp3
audio_duration: "8 min"
```

Do not leave blank keys solely to preserve a template. Do not use `series_order` without `series`.

## Classification Test

1. **Article Type:** What editorial form best describes the finished piece?
2. **Reader Collections:** Which homepage pathways would reasonably help a reader discover it?
3. **Tags:** Which specific, reusable ideas distinguish it from other posts in those collections?
4. **Series:** Does it belong to an intentional, named reading sequence?
5. **Scripture:** Which passages are central enough to support future Scripture browsing?

A Christian worldview alone does not automatically place every post in the Faith collection. Faith should be central to the article's subject, development, or application.

## Recommendation Priority

Future related-content scoring should generally prioritize:

1. Same series
2. Shared collections
3. Shared tags
4. Same article type
5. Shared Scripture book or passage
6. Editorial overrides

The purpose is to help readers continue through naturally related ideas.

## Browse Paths

The site should eventually support browsing by:

- Reader collection
- Article type
- Series
- Scripture
- Tag
- Search
- Curated reading path

## Governance

Changes to official Article Types or Reader Collections require an intentional architecture revision and corresponding review of affected site logic and content. Tag additions and aliases are governed by `docs/tag-taxonomy.md`.

This repository document is an implementation reference. Broader JAT editorial and organizational standards are maintained outside the public repository.

### Changelog

#### 1.3 — 2026-08-11

- Reclassified front matter as Core Fields and Conditional Fields based on JAT publication use rather than Jekyll technical requirements.
- Confirmed `subtitle`, `description`, `image`, and `background` as Core Fields.
- Scoped this document to public website content architecture and implementation.

#### 1.2 — 2026-08-07

- Added the Canonical Taxonomy Registry and clarified closed versus extensible vocabularies.
- Confirmed that `categories` stores exactly one Article Type.
- Confirmed the six official Reader Collections and canonical order.
- Defined tag registry classes and governance.
- Clarified guest-author derivation from the `author` field.
- Confirmed Scripture as a YAML array of references.

#### 1.1 — 2026-08-05

- Adopted **Article Type** as the editorial term for values stored in `categories`.
- Confirmed `creation` as the sixth reader collection.

#### 1.0 — 2026-08-04

- Established front matter as the content database.
- Defined article types, reader collections, tags, Scripture, series, and contributor conventions.