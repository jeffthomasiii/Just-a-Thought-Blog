# Copilot Instructions for Just A Thought Blog

This repository is the live source for **Just A Thought Blog**, a reflective Christian publication built with Jekyll and GitHub Pages and published at `https://justathoughtblog.org`.

## General Workflow

- Do not make routine changes directly on `master`.
- Create a focused feature, content, setup, fix, or documentation branch.
- Inspect the current repository structure and follow established patterns before changing code or content.
- Avoid broad refactors unless they are explicitly requested and the affected routes can be validated together.
- Do not introduce dependencies unless they are clearly necessary and approved.
- Do not commit secrets, tokens, credentials, private data, or machine-specific paths.
- Keep changes small, reviewable, and easy to explain.
- Preserve working reader-facing behavior while making targeted improvements.

## Site Structure

- `_posts/` contains published posts.
- `_drafts/` contains unpublished drafts.
- `_layouts/` contains page and post templates.
- `_includes/` contains reusable navigation, footer, script, and component markup.
- `_sass/` contains the shared design system and page-specific Sass.
- `assets/` contains compiled entry points, scripts, and supporting assets.
- `img/` contains brand, page, post, and social imagery.
- `audio/` contains optional recorded reflections.
- `docs/` contains current technical references and historical project records.

## Local Development

Install dependencies when needed:

```bash
bundle install
```

Use the confirmed local preview command:

```bash
bundle exec jekyll serve --force_polling
```

Open:

```text
http://localhost:4000
```

The site uses an empty `baseurl` and a root custom-domain configuration. Do not use the former `/Just-a-Thought-Blog/` local path unless testing an older branch that still requires it.

## Brand and Editorial Voice

Just A Thought Blog should feel reflective, warm, honest, conversational, biblically grounded, compassionate, clear, and convictional without becoming combative.

For blog writing and editing:

- Preserve Jeff Thomas III’s natural voice.
- Write in complete paragraphs that develop a thought.
- Avoid repeated one-sentence paragraphs and social-media-style dramatic fragments.
- Avoid generic, artificial, overly polished, or performative language.
- Avoid clichés and excessive Christian jargon.
- Keep the writing accessible to thoughtful Christian readers.
- Prefer warmth, clarity, humility, substance, and honest tension over cleverness.
- Do not turn reflective prose into bullet-point teaching unless requested.
- Do not remove nuance merely to make the writing shorter or smoother.

Most reflective posts should end with the exact line:

> “…just a thought.”

Do not require that closing for guest posts, formal resources, or pieces where pastoral sensitivity calls for a different ending.

## Post Structure

Most reflective posts follow this journey:

1. Hook
2. Context and Reflection
3. Development
4. Resolution or Open-Ended Reflection
5. Signature Closing
6. Optional Reader Prompt

The structure should guide the reader without making every post feel formulaic.

## Theological Care

When handling Scripture, theology, or Christian teaching:

- Do not invent Bible references.
- Do not quote Scripture unless the wording and translation are supplied or verified.
- Let Scripture shape the reflection rather than merely decorating it.
- Distinguish biblical teaching, interpretation, wisdom principle, personal conviction, and application.
- Avoid doctrinal claims broader than the passage supports.
- Acknowledge debated interpretations and genuine uncertainty.
- Do not present personal preferences as biblical requirements.
- Preserve theological accuracy over rhetorical impact.

## Front Matter and Taxonomy

- Preserve existing front matter unless a change is requested or required for correctness.
- Use lowercase, hyphenated values for stored categories and tags.
- Reuse established taxonomy rather than creating small variations.
- Distinguish stored values from reader-facing labels, such as `biblical-marriage` displayed as “Biblical Marriage.”
- Use `contributors` for shared writing credit.
- Use `series` and `series_order` only for structured series.
- Use `audio_file` and `audio_duration` only when a recorded audio companion exists.
- Confirm descriptions and excerpts remain concise enough for cards, search, and social sharing.

## Content Changes

When editing posts:

- Preserve the author’s meaning and voice.
- Suggest or explain substantial changes rather than silently rewriting the piece into a different style.
- Keep final content suitable for a public Christian publication.
- Verify internal links, image paths, dates, Scripture references, series ordering, and metadata.
- Use the exact file extension that exists in the repository.

## Design System

The visual direction is a calm Christian editorial journal:

- Warm cream and parchment surfaces
- Olive accents
- Charcoal or deep-ink text
- Muted gold used sparingly
- Playfair Display for prominent editorial headings
- Generous whitespace
- Rectangular cards and controls with restrained corner rounding
- Quiet, natural, slightly cinematic imagery

Use the current shared design tokens and page archetypes before introducing new page-specific systems. Preserve responsive behavior, dark mode, keyboard focus, heading order, and readable contrast.

## Code and Layout Changes

When changing HTML, CSS, Sass, Liquid, or JavaScript:

- Follow existing naming and formatting patterns.
- Keep selectors scoped to the intended page or component.
- Avoid unscoped rules that can affect navigation, footer, posts, or unrelated pages.
- Prefer existing semantic design tokens and shared components.
- Test the site locally when practical.
- Watch for broken links, image paths, Liquid output, duplicate IDs, base URL assumptions, and responsive overflow.
- Avoid deleting inherited theme or compatibility rules without evidence that all dependent routes have migrated.

## Validation

For reader-facing changes, validate as applicable:

- Jekyll and Sass build
- Desktop, tablet, and mobile layouts
- Light and dark modes
- Keyboard navigation and visible focus
- Heading order and landmarks
- Link destinations
- Image alternatives and decorative-image handling
- Search, pagination, series ordering, or Audio Companion behavior affected by the change

## Git Behavior

When asked to make changes:

- Work on a dedicated branch.
- Summarize the files changed and why.
- Explain how the change was validated.
- Open a pull request into `master` when explicitly requested.
- Default pull requests to draft unless the user asks for ready-for-review status.
- Do not merge, delete branches, or force-update refs unless explicitly instructed.

## Safety for the Live Site

This is a live public repository. Treat every change as potentially reader-facing.

- Prefer focused commits with clear messages.
- Avoid unrelated cleanup in a content or bug-fix branch.
- Do not alter deployment, custom-domain, analytics, layout, include, or shared Sass files without understanding the impact.
- Keep planned features honest. Do not present podcast episodes, downloads, newsletter signup, or other unavailable functionality as active.