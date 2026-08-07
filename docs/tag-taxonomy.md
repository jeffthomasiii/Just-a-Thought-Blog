# Just A Thought Tag Taxonomy

**Version:** 1.1  
**Status:** Canonical  
**Adopted:** 2026-08-04  
**Revised:** 2026-08-07

Tags identify specific ideas that connect articles across Reader Collections, Article Types, and Series.

The tag vocabulary is **controlled but extensible**. Unlike Article Types and Reader Collections, it is not a closed list.

## Registry Model

The canonical tag vocabulary has four parts:

1. **Preferred Core Tags** — stable, broadly reusable terms that should be preferred whenever they fit.
2. **Approved Extended Tags** — narrower terms already used intentionally in migrated or newly published content.
3. **Scripture Tags** — Bible-book and recurring passage tags.
4. **Approved Replacements / Aliases** — deprecated or inconsistent forms mapped to the preferred term.

### Migration Compatibility Rule

Any normalized lowercase kebab-case tag already present in the migration-complete v2026.08 corpus remains an approved tag unless this document explicitly deprecates or replaces it.

This rule protects the taxonomy work completed across the migrated library and prevents the registry from invalidating existing posts simply because every migrated tag is not repeated in the Preferred Core list below.

## Naming Rules

- Use lowercase.
- Use kebab case for multiword tags.
- Prefer nouns or stable concepts.
- Prefer one approved term over several near-synonyms.
- Do not use spaces, title case, underscores, or sentence-like tags.
- Do not add a Reader Collection name as a tag unless it carries a meaning distinct from collection membership.
- Do not use an Article Type as a tag merely to repeat `categories`.
- Add a new tag only when it is likely to apply to more than one article or provides meaningful discovery value.
- Prefer durable concepts over temporary wording.

## Preferred Core Tags

### Faith and Formation

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

### Character and Inner Life

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

### Marriage and Relationships

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

### Leadership and Work

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

### Technology and Culture

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

### Creation and Rest

- `camping`
- `creation`
- `nature`
- `outdoors`
- `rest`
- `rhythms`
- `stillness`
- `travel`
- `travel-trailer`

## Approved Extended Tags

The migration established many useful tags that are narrower than the Preferred Core vocabulary. These remain valid and should be reused when they accurately describe a new post.

The following terms are explicitly confirmed through the v2026.08 migration audit or subsequent published content:

### Faith, Theology, and Christian Community

- `belonging`
- `biblical-interpretation`
- `biblical-worldview`
- `body-of-christ`
- `bride-of-christ`
- `christian-community`
- `christian-thinking`
- `church`
- `church-hurt`
- `faithfulness`
- `fellowship`
- `fruit-of-the-spirit`
- `holy-thinking`
- `mind-of-christ`
- `renewed-mind`
- `truth`
- `virtue`

### Character, Growth, and Inner Life

- `anger`
- `authenticity`
- `confidence`
- `discipline`
- `emotional-discipline`
- `emotional-maturity`
- `empathy`
- `endurance`
- `entitlement`
- `failure`
- `genuine-care`
- `growth`
- `honesty`
- `intentionality`
- `joy`
- `lifelong-learning`
- `mental-discipline`
- `patience`
- `preparedness`
- `resilience`
- `responsibility`
- `self-reliance`
- `service`
- `strength`
- `teachability`
- `vulnerability`

### Marriage and Relationships

- `affection`
- `friendship`
- `marital-growth`
- `oneness`
- `rekindling`
- `relationships`
- `speaking-life`

### Leadership, Work, and Practical Formation

- `competence`
- `emotional-intelligence`
- `financial-literacy`
- `first-aid`
- `household-management`
- `influence`
- `literacy`
- `manhood`
- `numeracy`
- `practical-skills`
- `presence`
- `slowing-down`

### Technology, Publishing, and Craftsmanship

- `collaboration`
- `content-architecture`
- `craftsmanship`
- `library`
- `thoughtful-work`
- `vision`

These six terms were confirmed in the published 2026-08-07 article **Building What No One Sees** and are now part of the approved vocabulary.

### Culture, Communication, and Public Life

- `biblical-worldview`
- `culture`
- `de-escalation`
- `emotional-contagion`
- `listening`
- `roman-culture`
- `self-defense`

### Creation, Travel, and Place

- `road-trips`

This list is intentionally allowed to grow. The migration-compatibility rule above remains authoritative for normalized tags already present in the v2026.08 corpus even when they are not individually repeated here.

## Scripture Books and Passages

Bible-book tags use common lowercase kebab-case names.

Approved examples include:

- `genesis`
- `psalms`
- `proverbs`
- `matthew`
- `romans`
- `ephesians`
- `philippians`
- `hebrews`
- `james`
- `first-peter`
- `first-timothy`
- `second-samuel`

Use a chapter-specific tag only when a chapter is a recurring body of content, such as:

- `psalm-119`
- `proverbs-31`
- `ephesians-5`

Do not create a chapter tag simply because a single article cites the chapter.

## Approved Replacements and Aliases

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
| `reflection` | use Article Type `reflection` unless reflection itself is the subject |
| `faith` | use Reader Collection `faith` |
| `leadership` | use Reader Collection `leadership` unless leadership itself is a specific subject and no narrower tag applies |
| `marriage` | use Reader Collection `marriage`; use `biblical-marriage` when the theological vision of marriage is central |

## Tag Selection Rules

For a normal post:

- Aim for 5–10 meaningful tags.
- Use fewer when the article is narrow.
- Avoid padding with vague terms.
- Include a Bible-book tag when a book meaningfully shapes the article.
- Include both a broad concept and a specific concept only when each supports discovery.
- Reuse an existing approved term rather than creating a near-synonym.

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
2. Confirm the term is specific and reusable or provides meaningful discovery value.
3. Prefer language readers are likely to recognize.
4. Confirm it does not duplicate an Article Type or Reader Collection responsibility.
5. Add the term to the appropriate registry section in this document.
6. Add any avoided aliases when useful.
7. Normalize prior posts only when they use a genuinely equivalent term and the change does not create unnecessary migration churn.

## Governance

This document is a controlled vocabulary, not a closed list.

- Existing normalized migrated tags remain valid unless explicitly deprecated.
- New tags may be introduced as the library grows.
- Spelling and meaning should be documented before broad use.
- Article Types and Reader Collections are governed separately by `docs/content-architecture.md` and must not be expanded through tags.

## Changelog

### 1.1 — 2026-08-07

- Defined the four-part tag registry model.
- Added the migration-compatibility rule to preserve normalized tags from the v2026.08 migration.
- Added an Approved Extended Tags section based on migration records and current published content.
- Approved `collaboration`, `content-architecture`, `craftsmanship`, `library`, `thoughtful-work`, and `vision` from **Building What No One Sees**.
- Clarified the boundary between tags, Article Types, and Reader Collections.

### 1.0 — 2026-08-04

- Established naming rules, Preferred Core Tags, Scripture-tag conventions, aliases, selection rules, and tag governance.
