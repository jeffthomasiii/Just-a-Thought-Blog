# Just A Thought Tag Taxonomy

**Version:** 1.0  
**Status:** Canonical  
**Adopted:** 2026-08-04

Tags identify specific ideas that connect articles across collections, article types, and series.

## Naming Rules

- Use lowercase.
- Use kebab case for multiword tags.
- Prefer nouns or stable concepts.
- Prefer one approved term over several near-synonyms.
- Do not use spaces, title case, underscores, or sentence-like tags.
- Do not add a collection name as a tag unless it carries a meaning distinct from collection membership.
- Add a new tag only when it is likely to apply to more than one article or provides meaningful discovery value.

## Preferred Core Tags

### Faith and formation

- `biblical-meditation`
- `christian-living`
- `discipleship`
- `obedience`
- `prayer`
- `repentance`
- `sanctification`
- `scripture`
- `spiritual-disciplines`
- `spiritual-formation`
- `spiritual-growth`
- `trust`
- `wisdom`

### Character and inner life

- `courage`
- `discernment`
- `dying-to-self`
- `fear`
- `grace`
- `godly-character`
- `holiness`
- `humility`
- `identity-in-christ`
- `integrity`
- `perseverance`
- `pride`
- `self-control`
- `self-examination`
- `surrender`

### Marriage and relationships

- `biblical-marriage`
- `communication`
- `conflict-resolution`
- `covenant`
- `encouragement`
- `forgiveness`
- `husbands`
- `intimacy`
- `marital-conflict`
- `marital-connection`
- `praying-together`
- `reconciliation`
- `sacrificial-love`
- `spiritual-intimacy`
- `unity`
- `wives`

### Leadership and work

- `audience-awareness`
- `clarity`
- `leadership-development`
- `mentoring`
- `public-speaking`
- `servant-leadership`
- `stewardship`
- `teaching`
- `technical-communication`
- `workplace-conflict`

### Technology and culture

- `artificial-intelligence`
- `bim`
- `blogging`
- `content-creation`
- `digital-tools`
- `media`
- `notebooklm`
- `podcasting`
- `politics`
- `public-witness`
- `technology-ethics`
- `worldview`

### Creation and rest

- `camping`
- `creation`
- `nature`
- `outdoors`
- `rest`
- `rhythms`
- `stillness`
- `travel`
- `travel-trailer`

### Scripture books and passages

Bible-book tags use common lowercase kebab-case names:

- `genesis`
- `psalms`
- `proverbs`
- `matthew`
- `romans`
- `ephesians`
- `hebrews`
- `james`
- `first-peter`
- `first-timothy`
- `second-samuel`

Use a chapter-specific tag only when a chapter is a recurring body of content, such as `psalm-119`, `proverbs-31`, or `ephesians-5`.

## Approved Replacements

Use the preferred tag at right:

| Avoid | Use |
|---|---|
| `ai` | `artificial-intelligence` |
| `biblical marriage` | `biblical-marriage` |
| `christian living` | `christian-living` |
| `spiritual growth` | `spiritual-growth` |
| `spiritual-discipline` | `spiritual-disciplines` |
| `spiritual-practices` | `spiritual-disciplines` |
| `speaking life` | `speaking-life` |
| `public` + `speaking` | `public-speaking` |
| `audience` + `awareness` | `audience-awareness` |
| `1 Peter` | `first-peter` |
| `1 Timothy` | `first-timothy` |
| `2 Samuel` | `second-samuel` |
| `gottman` | `gottman-method` |
| `reflection` | use article type `reflection` unless the concept of reflection itself is central |
| `faith` | use collection `faith` |
| `leadership` | use collection `leadership` unless the article discusses leadership as a specific subject and no narrower tag applies |
| `marriage` | use collection `marriage`; use `biblical-marriage` when the theological vision of marriage is central |

## Tag Selection Rules

For a normal post:

- Aim for 5–10 meaningful tags.
- Use fewer when the article is narrow.
- Avoid padding with vague terms.
- Include a Bible-book tag when a book meaningfully shapes the article.
- Include both a broad concept and a specific concept only when each supports discovery.

Example:

```yaml
tags:
  - pride
  - humility
  - discipleship
  - sanctification
  - dying-to-self
  - spiritual-growth
```

## Adding a New Tag

Before adding a new tag:

1. Check whether an approved tag already covers the idea.
2. Confirm the term is specific and reusable.
3. Prefer the language readers are likely to recognize.
4. Add the term and any avoided aliases to this document.
5. Normalize prior posts that use an equivalent term.

## Governance

This document is a controlled vocabulary, not a closed list. New tags may be introduced as the library grows, but spelling and meaning should be documented before broad use.
