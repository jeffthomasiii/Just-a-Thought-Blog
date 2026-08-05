# Just A Thought Content Architecture

**Version:** 1.1  
**Status:** Canonical  
**Adopted:** 2026-08-04  
**Revised:** 2026-08-05

## Purpose

Just A Thought is a growing library of thoughtful, biblically grounded writing rather than a chronological blog alone. Readers should be able to discover content by editorial format, reader journey, specific theme, series, and Scripture.

Published post front matter is the single source of truth. The site will not require a separate database of existing or future posts.

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

Throughout editorial documentation and planning, use the term **Article Type** rather than Category. Jekyll will continue storing article types in the `categories` field.

## Article Types

Article types describe editorial format. They are stored in Jekyll's `categories` field. A post should normally have one article type.

Official values:

- `reflection`
- `devotional`
- `bible-study`
- `resource`
- `series-introduction`
- `guest-post`
- `announcement`

### Reflection

A thoughtful essay that connects Scripture, personal experience, relationships, work, culture, technology, creation, or ordinary life.

### Devotional

A focused, usually shorter piece centered on a biblical passage and its spiritual application.

### Bible Study

A deeper exegetical, theological, historical, linguistic, or contextual exploration of Scripture.

### Resource

A practical reference such as a guide, reading plan, workbook, study aid, or downloadable tool.

### Series Introduction

The opening article that frames the purpose, scope, and direction of a series.

### Guest Post

An article written primarily by a contributor other than Jeff Thomas III.

### Announcement

Site, ministry, publication, or project news. Use sparingly.

## Reader Collections

Collections are broad reader-facing pathways. A post may belong to multiple collections when the overlap is central and useful.

Official values:

- `faith`
- `marriage`
- `leadership`
- `technology`
- `culture`
- `camping`

Collections drive homepage topic cards, collection landing pages, and related-content pathways.

### Faith

Scripture, discipleship, prayer, spiritual formation, Christian living, theology, and walking with Christ in ordinary life.

### Marriage

Biblical marriage, covenant, communication, unity, intimacy, conflict, sacrifice, and relational growth between spouses.

### Leadership

Character, influence, responsibility, mentoring, stewardship, workplace leadership, ministry leadership, and servant leadership.

### Technology

Artificial intelligence, architecture and design technology, digital tools, innovation, ethics, and navigating technological change.

### Culture

Books, ideas, media, politics, public life, discernment, social questions, and faithful cultural engagement.

### Camping

Camping, travel, outdoor life, creation, rest, quiet, adventure, and reflections shaped by time away from ordinary routines.

A post does not need to be primarily about camping to belong here, but the outdoor setting or experience should meaningfully shape the reflection.

## Tags

Tags identify specific ideas, themes, practices, audiences, tensions, passages, or subjects.

Rules:

- Use lowercase.
- Use kebab case for multiword tags.
- Prefer specific terms over broad labels.
- Avoid duplicate meanings and spelling variants.
- Avoid using collection names as tags unless the tag adds a distinct meaning.
- Prefer stable concepts that can connect multiple posts.

Examples:

- `biblical-marriage`
- `identity-in-christ`
- `spiritual-growth`
- `artificial-intelligence`
- `servant-leadership`
- `biblical-meditation`

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

Use standard English Bible-book names. Use an en dash in published prose when appropriate, but use a standard hyphen in YAML ranges for predictable processing.

## Contributors

Use machine-readable contributor metadata.

```yaml
author: Jeff Thomas III
contributors:
  - Samatra Thomas
```

Do not place contributor credits inside the `author` string.

## Standard Front Matter Order

```yaml
---
layout: post
title: "Post Title"
subtitle: "Optional subtitle"
description: "Optional description"
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
excerpt: "Short summary"
image: /img/posts/post-image.jpg
background: /img/posts/bg-post-image.jpg
scripture:
  - Scripture Reference
series: "Optional Series Title"
series_order: 1
---
```

Omit optional fields when they do not apply. Do not leave empty keys solely to preserve the template.

## Classification Test

Use these questions in order when classifying a post:

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

The purpose is not to maximize clicks. It is to help readers continue thinking through naturally related ideas.

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

Changes to official article types or reader collections require an update to this document and an entry in the changelog.

### Changelog

#### 1.1 — 2026-08-05

- Adopted **Article Type** as the editorial term for values stored in `categories`.
- Clarified the separate responsibilities of article types and reader collections.
- Standardized the sixth homepage reader collection as `camping` rather than `creation`.
- Added collection definitions and a classification test.

#### 1.0 — 2026-08-04

- Established front matter as the content database.
- Defined article types through `categories`.
- Defined six reader collections.
- Established tag, Scripture, series, and contributor conventions.
