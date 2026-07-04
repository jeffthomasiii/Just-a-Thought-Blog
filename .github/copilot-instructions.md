# Copilot Instructions for Just A Thought Blog

This repository is the live source for the Just A Thought Blog, a reflective, faith-informed personal blog built with Jekyll and GitHub Pages.

## General workflow

* Do not make changes directly on `main`.
* Prefer working on feature, draft, setup, or test branches.
* Before making code or content changes, inspect the existing structure and follow the current patterns.
* Avoid broad refactors unless explicitly requested.
* Do not introduce new dependencies unless clearly necessary and approved.
* Do not commit secrets, API keys, tokens, credentials, or machine-specific paths.
* Keep changes small, reviewable, and easy to explain.

## Site structure

This is a Jekyll-style blog. Preserve the existing folder structure.

* `_posts` is for published posts.
* `_drafts` is for draft posts.
* `_layouts` is for layout templates.
* `_includes` is for reusable template pieces.
* `_sass` is for Sass styling.
* `assets` and `img` are for site assets.
* `docs` is for setup notes and reference documentation.

## Local development

The confirmed local preview command is:

```
bundle exec jekyll serve --force_polling
```

The confirmed local preview URL is:

```
http://localhost:4000/Just-a-Thought-Blog/
```

Do not assume the site previews at `/` because this repository uses a GitHub Pages-style base URL.

## Writing style

For blog writing and editing:

* Use a reflective, thoughtful, pastoral tone.
* Write clearly and naturally.
* Avoid overly short, choppy, one-sentence paragraphs.
* Avoid language that sounds generic, artificial, or overly polished.
* Avoid clichés and excessive Christian jargon.
* Keep the writing accessible for thoughtful Christian readers.
* Prefer warmth, clarity, humility, and substance over cleverness.
* Preserve the author’s voice rather than rewriting everything into a generic style.

## Theological care

When handling Scripture, theology, or Christian teaching:

* Do not invent Bible references.
* Do not quote Scripture unless the wording and translation are supplied or verified.
* Distinguish clearly between direct biblical teaching, interpretation, application, and personal reflection.
* Avoid making doctrinal claims that are broader than the passage supports.
* Preserve theological accuracy over rhetorical impact.
* Be careful with passages that involve debated theological interpretations.
* When uncertain, say what is uncertain rather than overstating the point.

## Content changes

When editing posts:

* Preserve front matter unless a change is specifically requested.
* Preserve the author’s voice.
* Suggest improvements before making large rewrites.
* Do not change the meaning of a post merely to make it sound smoother.
* Keep final content suitable for publication on a public Christian blog.
* Do not remove nuance unless the user explicitly asks for a shorter or simpler version.
* Do not turn reflective writing into bullet-point teaching unless requested.

## Code and layout changes

When changing HTML, CSS, Sass, Liquid, or JavaScript:

* Follow existing naming and formatting patterns.
* Keep changes small and explainable.
* Test the site locally after changes when practical.
* Watch for broken links, broken image paths, and base URL issues.
* Avoid changing shared layouts or includes unless the impact is understood.
* Avoid visual redesigns unless specifically requested.

## Git behavior

When asked to make changes:

* Summarize what files were changed.
* Explain how to test the change.
* Recommend reviewing the diff before committing.
* Do not push changes unless explicitly instructed.
* Do not merge branches unless explicitly instructed.
* Do not delete branches unless explicitly instructed.

## Safety for the live blog

This is a live personal blog repository. Treat changes as potentially public-facing.

* Prefer draft branches for writing work.
* Prefer setup branches for tooling work.
* Prefer small commits with clear messages.
* Avoid changing deployment-related files unless the user specifically asks.
* Avoid changing `_config.yml`, layouts, includes, or Sass files without explaining the likely impact.
