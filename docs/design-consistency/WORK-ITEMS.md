# Design Consistency Work Items

This file contains the detailed scope for each numbered work item in the Design Consistency Roadmap.

Update the **Status** field as work progresses. Record completed implementation details in `CHANGELOG.md` and significant design decisions in `DECISIONS.md`.

---

# DS-01 — Consolidate the shared design system and page archetypes

**Phase:** 0 — Establish the standard  
**Status:** Not started  
**Priority:** Critical  
**Depends on:** None

## Objective

Create one shared design foundation before completing the remaining page redesigns. Reduce duplicated tokens, conflicting containers, overlapping button systems, page-specific global selectors, and inline reusable styles.

## Current condition

The site currently distributes visual rules across:

- `_sass/styles.scss`
- `_sass/visual-board-home.scss`
- `_sass/dark.scss`
- `assets/css/jat-pages.css`
- `assets/css/jat-dark-pages.css`
- Page-specific polish files
- Inline styles in layouts, pages, the footer, and generated Search results

The systems use overlapping variables and different conventions, including duplicate names such as `--jat-deep-olive` and `--jat-olive-deep`, plus different maximum container widths.

## Scope

- [ ] Establish one canonical source for brand color tokens.
- [ ] Standardize token names for olive, sage, cream, parchment, charcoal, gray, gold, borders, and shadows.
- [ ] Establish a consistent 1280px editorial page frame based on Home and Resources.
- [ ] Define narrower reading widths within the page frame where needed.
- [ ] Define shared typography for kickers, hero titles, section headings, card titles, body copy, metadata, quotes, and buttons.
- [ ] Define one primary and one secondary rectangular button system.
- [ ] Define shared text-link, divider, panel, card, image, status-label, and metadata components.
- [ ] Establish square-to-4px corner rules and restrained shadow rules.
- [ ] Reserve circular shapes for icons and controls.
- [ ] Define shared spacing values for heroes, panels, section gaps, card gaps, and content padding.
- [ ] Define the three page archetypes in reusable classes or layouts.
- [ ] Define shared desktop, tablet, and mobile breakpoints.
- [ ] Define equivalent light- and dark-mode treatments.
- [ ] Identify legacy classes that remain temporarily supported.
- [ ] Add comments documenting migration dependencies before removing legacy CSS.
- [ ] Move reusable inline styles into shared classes where practical.

## Likely files

- `_sass/styles.scss`
- `_sass/visual-board-home.scss`
- `_sass/dark.scss`
- `assets/main.scss`
- `assets/css/jat-pages.css`
- `assets/css/jat-dark-pages.css`
- Page-specific CSS files

## Acceptance criteria

- [ ] Shared tokens have one canonical name and source.
- [ ] Home and Resources remain visually stable.
- [ ] Shared buttons, kickers, panels, borders, and container widths render consistently.
- [ ] Page archetypes are clearly represented in code or documented classes.
- [ ] No page-level global selector unintentionally changes navigation, footer, or unrelated pages.
- [ ] Light and dark modes pass desktop, tablet, and mobile checks.

## Out of scope

- Rewriting page content
- Completing page-specific redesigns
- Removing legacy styles before dependent pages migrate

---

# DS-02 — Refine the Home page baseline

**Phase:** 0 — Establish the standard  
**Status:** Not started  
**Priority:** High  
**Depends on:** DS-01

## Objective

Clean up the Home page so it becomes the intentional, reader-facing visual baseline for the rest of the site.

## Scope

- [ ] Replace the visible `Homepage Hero` kicker with reader-facing copy.
- [ ] Remove the duplicated `Latest Reflection` label within the latest-post card.
- [ ] Standardize the podcast name as `Just A Thought — The Podcast`.
- [ ] Review all `Coming Soon` messaging and reduce unnecessary repetition.
- [ ] Replace topic-card `href="#"` behavior with either real destinations or non-link coming-soon cards.
- [ ] Ensure coming-soon elements do not imply unavailable functionality.
- [ ] Confirm latest-post image fallback behavior.
- [ ] Confirm all homepage card links, buttons, and hover states.
- [ ] Confirm hero and panel spacing against the shared design system.
- [ ] Confirm tablet and mobile stacking order.
- [ ] Confirm dark-mode equivalents for every homepage panel.
- [ ] Confirm image crops do not hide essential focal points.

## Likely files

- `_layouts/home.html`
- `_sass/visual-board-home.scss`
- `_sass/dark.scss`
- Relevant image assets

## Acceptance criteria

- [ ] No internal design-development labels remain visible.
- [ ] No duplicated section label appears within one component.
- [ ] No empty or placeholder link behaves like a functional destination.
- [ ] Naming matches the official brand kit.
- [ ] Home remains the strongest visual baseline across desktop, tablet, mobile, light mode, and dark mode.

## Out of scope

- Building topic archive pages
- Launching the podcast or newsletter
- Rewriting recent post content

---

# DS-03 — Correct global navigation and footer consistency

**Phase:** 0 — Establish the standard  
**Status:** Not started  
**Priority:** High  
**Depends on:** DS-01

## Objective

Make the navigation and footer reliable, consistent, accessible, and aligned with the current site structure.

## Scope

- [ ] Verify direct destinations for Home, Posts, Series, Podcast, Resources, About, and Search.
- [ ] Correct footer links that currently route Podcast or Resources through Search queries instead of direct pages.
- [ ] Add an active-page navigation state.
- [ ] Confirm the `Latest Reflection` action points to the intended destination.
- [ ] Confirm navigation spacing at desktop and collapsed mobile widths.
- [ ] Confirm the theme toggle has correct labels and visible focus states.
- [ ] Confirm keyboard access for the collapsed menu.
- [ ] Add `Professional Background` beneath the footer About column after DS-06 is complete.
- [ ] Review footer language for formal brand-name consistency.
- [ ] Review newsletter placeholder language so it does not imply an active form.
- [ ] Confirm social icons have accessible labels.
- [ ] Confirm light- and dark-mode contrast.

## Likely files

- `_includes/navbar.html`
- `_includes/footer.html`
- `_sass/visual-board-home.scss`
- `_sass/styles.scss`
- `_sass/dark.scss`

## Acceptance criteria

- [ ] Every navigation and footer link reaches the intended direct destination.
- [ ] Current-page state is visually clear and accessible.
- [ ] Navigation remains usable at all supported widths.
- [ ] Footer content is consistent with actual available features.
- [ ] Keyboard and dark-mode checks pass.

## Out of scope

- Adding new social platforms
- Implementing a newsletter provider
- Adding CV to the main navigation

---

# DS-04 — Redesign the Posts archive

**Phase:** 1 — Highest-impact pages  
**Status:** Not started  
**Priority:** Critical  
**Depends on:** DS-01, DS-02, DS-03

## Objective

Replace the inherited Clean Blog archive presentation with a branded editorial collection page that helps readers discover and browse reflections.

## Current condition

The current page renders a linear sequence of post titles, subtitles, excerpts, metadata, dividers, and pagination. It does not use the featured images, framed cards, wider editorial grid, or hierarchy established on Home.

## Scope

- [ ] Create a compact editorial collection-page hero.
- [ ] Add a short page description that explains what readers will find.
- [ ] Feature the newest reflection with image, category, title, excerpt, date, and reading time.
- [ ] Present remaining posts in a two- or three-column desktop grid.
- [ ] Use consistent card images with reliable fallbacks.
- [ ] Show restrained category or series labels.
- [ ] Display title, excerpt, date, reading time, and optional series information consistently.
- [ ] Preserve pagination.
- [ ] Create clear Newer and Older navigation using the shared button system.
- [ ] Add a visible path to Search.
- [ ] Ensure card markup invokes the intended shared archive classes.
- [ ] Confirm cards remain readable when excerpts or images are missing.
- [ ] Confirm responsive grid behavior.
- [ ] Confirm dark-mode card and metadata contrast.

## Likely files

- `posts/index.html`
- Shared collection-page layout or include created under DS-01
- `_sass/styles.scss`
- `_sass/dark.scss`
- Optional archive-specific stylesheet or include

## Acceptance criteria

- [ ] Posts looks intentionally related to Home without duplicating Home.
- [ ] Featured and standard cards have predictable content hierarchy.
- [ ] Pagination remains functional.
- [ ] Missing images or excerpts do not break the layout.
- [ ] Desktop, tablet, mobile, keyboard, and dark-mode checks pass.

## Out of scope

- Creating category archive pages
- Rewriting post excerpts in bulk
- Changing post URLs

---

# DS-05 — Redesign the Search experience

**Phase:** 1 — Highest-impact pages  
**Status:** Not started  
**Priority:** High  
**Depends on:** DS-01, DS-03

## Objective

Preserve the existing Lunr search functionality while rebuilding the interface and generated results to match the collection and utility page system.

## Scope

- [ ] Create a compact, text-led editorial hero.
- [ ] Place the search field and filters in one bordered parchment panel.
- [ ] Make the search field the dominant control.
- [ ] Style category and tag filters consistently.
- [ ] Style Clear as a shared secondary action.
- [ ] Remove reusable inline styles from generated result markup.
- [ ] Render results as clean branded rows or horizontal cards.
- [ ] Include title, excerpt, category or tags, date, and reading time where available.
- [ ] Add loading, ready, empty, no-results, and index-error states.
- [ ] Read the `q` URL parameter and populate/run the search automatically.
- [ ] Ensure footer or internal search-query links work as expected.
- [ ] Preserve HTML escaping and safe query handling.
- [ ] Add visible keyboard focus states.
- [ ] Confirm filter behavior at narrow widths.
- [ ] Confirm dark-mode form and result contrast.

## Likely files

- `search.md`
- `assets/js/search.js`
- `_sass/styles.scss`
- `_sass/dark.scss`
- Optional Search-specific stylesheet
- `search.json` if additional metadata is required

## Acceptance criteria

- [ ] Direct search URLs such as `/search/?q=Podcast` populate and run correctly.
- [ ] Search results use shared site classes rather than inline presentation styles.
- [ ] Search remains functional with filters.
- [ ] All interface states are understandable and visually consistent.
- [ ] Keyboard, mobile, and dark-mode checks pass.

## Out of scope

- Replacing Lunr with an external search provider
- Searching unpublished drafts
- Adding analytics tracking unless handled separately

---

# DS-06 — Rebuild CV as Professional Background

**Phase:** 1 — Highest-impact pages  
**Status:** Not started  
**Priority:** Critical  
**Depends on:** DS-01, DS-03

## Objective

Replace the old embedded standalone CV document with a valid, scoped, branded professional-profile page while keeping `/cv/` as the URL.

## Current condition

The current page uses `layout: page` and then embeds a second `DOCTYPE`, `html`, and `head` structure inside the page content. It also applies unscoped CSS to `body`, `.container`, headings, links, and lists, which can affect global site elements.

The professional information also requires a factual refresh.

## Scope — structure and design

- [ ] Remove embedded document-level HTML.
- [ ] Create a dedicated CV layout or fully scoped `.jat-cv-page` design.
- [ ] Use `Professional Background` as the reader-facing page label while retaining `/cv/`.
- [ ] Build a professional-profile hero with name, current title, location, short summary, and contact actions.
- [ ] Use shared typography, colors, buttons, borders, spacing, navigation, and footer.
- [ ] Organize the page into clear professional sections.
- [ ] Add print styles for a clean résumé-style output.
- [ ] Ensure navigation and footer are not affected by CV styles.
- [ ] Add a link from About and the footer rather than the main navigation.

## Scope — content review

- [ ] Update years of AECO experience to the current verified value.
- [ ] Verify current employer and title.
- [ ] Verify degree name and institution wording.
- [ ] Separate active certifications from former or expired certifications.
- [ ] Update Autodesk product terminology where names have changed.
- [ ] Refresh current responsibilities and areas of expertise.
- [ ] Refresh leadership and professional affiliations.
- [ ] Refresh speaking engagements and writing credits.
- [ ] Review technical proficiency list for relevance and current naming.
- [ ] Remove unsupported or outdated claims.

## Recommended sections

- Professional Summary
- Current Role
- Career Experience
- Leadership and Affiliations
- Speaking and Writing
- Education
- Certifications
- Technical Expertise

## Likely files

- `cv.html`
- New or updated CV layout/include
- Shared narrative/profile styles
- Print stylesheet
- `_includes/footer.html`
- `about.html`

## Acceptance criteria

- [ ] The page contains valid Jekyll page content without nested document structure.
- [ ] All page styles are scoped.
- [ ] Professional facts have been reviewed and updated.
- [ ] Active and former certifications are clearly distinguished.
- [ ] The web page and print output are both readable.
- [ ] The page is linked from About and the footer, not the primary navigation.
- [ ] Desktop, tablet, mobile, keyboard, print, and dark-mode checks pass.

## Out of scope

- Creating a downloadable PDF unless separately approved
- Turning About into a résumé
- Adding CV to the main navigation

---

# DS-07 — Redesign the About page

**Phase:** 2 — Narrative and landing pages  
**Status:** Not started  
**Priority:** High  
**Depends on:** DS-01, DS-02, DS-03, DS-06

## Objective

Retain the strong existing About-page writing while redesigning the page as a visual author-and-mission experience rather than a long generic text column.

## Scope

- [ ] Create a narrative/profile hero with a warm portrait or reflective personal image.
- [ ] Introduce Just A Thought and Jeff Thomas III without duplicating the Home hero.
- [ ] Preserve the core existing copy unless edits improve structure or remove repetition.
- [ ] Create a distinct `Hi, I’m Jeff` author-profile section.
- [ ] Present `Why I Write` as a framed editorial section.
- [ ] Present `What You’ll Find Here` as a restrained topic grid or two-column list.
- [ ] Present `What I Believe About This Space` as a full-width parchment statement.
- [ ] Retain the closing `…just a thought.`
- [ ] Add a secondary `Professional Background` action linking to `/cv/`.
- [ ] Review image treatment and captions.
- [ ] Confirm comfortable reading width and paragraph rhythm.
- [ ] Confirm mobile order and dark-mode behavior.

## Likely files

- `about.html`
- Shared narrative/profile layout or classes
- About-specific image assets
- `_sass/styles.scss`
- `_sass/dark.scss`

## Acceptance criteria

- [ ] About introduces both the publication and Jeff clearly.
- [ ] The page feels personal and reflective rather than résumé-like.
- [ ] Existing brand-aligned writing is retained where possible.
- [ ] Professional Background is accessible without appearing in the main navigation.
- [ ] Desktop, tablet, mobile, keyboard, and dark-mode checks pass.

## Out of scope

- Rewriting the CV
- Adding a complete personal biography timeline
- Adding unrelated professional portfolio content

---

# DS-08 — Align the Podcast page

**Phase:** 2 — Narrative and landing pages  
**Status:** Not started  
**Priority:** Medium  
**Depends on:** DS-01, DS-02, DS-03

## Objective

Bring the Podcast page into the Home/Resources editorial landing-page family while keeping it honest and complete before launch.

## Scope

- [ ] Use the formal name `Just A Thought — The Podcast` throughout.
- [ ] Replace the older landing-page hero with a framed editorial-board split hero.
- [ ] Use podcast cover art or current editorial photography intentionally.
- [ ] Keep one concise `What to Expect` panel.
- [ ] Keep one sample episode or episode-format panel.
- [ ] Remove or revise `Get Notified` language until a real notification mechanism exists.
- [ ] Remove language inviting readers to join an email list when no active form exists.
- [ ] End with a clear action to read current reflections or browse Series.
- [ ] Reduce repetitive `Coming Soon` messaging.
- [ ] Preserve the calm, conversational, lightly produced positioning.
- [ ] Prepare the structure so it can later become an episode archive.
- [ ] Confirm responsive media behavior and dark-mode contrast.

## Likely files

- `podcast.html`
- `assets/css/jat-podcast-polish.css`
- `assets/css/jat-pages.css` during migration
- Shared editorial landing-page styles
- Podcast image assets

## Acceptance criteria

- [ ] Podcast feels complete and credible before launch.
- [ ] The page no longer promises unavailable notification functionality.
- [ ] The page shares the Home/Resources visual language.
- [ ] Future episode listings can be added without another full structural redesign.
- [ ] Desktop, tablet, mobile, keyboard, and dark-mode checks pass.

## Out of scope

- Publishing episodes
- Implementing podcast hosting or feeds
- Implementing an email provider

---

# DS-09 — Align the Series page

**Phase:** 2 — Narrative and landing pages  
**Status:** Not started  
**Priority:** High  
**Depends on:** DS-01, DS-02, DS-03

## Objective

Retain the useful dynamic series functionality while migrating the page into the Home/Resources editorial landing-page family.

## Scope

- [ ] Convert the featured-series area into a framed split hero.
- [ ] Use the 1280px editorial board container.
- [ ] Adopt shared kicker, divider, button, panel, and card components.
- [ ] Preserve automatic grouping by `series` front matter.
- [ ] Preserve sorting by `series_order`.
- [ ] Preserve series cards and expandable reading lists.
- [ ] Remove reader-facing implementation notes about front matter and generation mechanics.
- [ ] Improve featured-series fallback behavior when descriptions or images are missing.
- [ ] Present Reading Pathways as one cohesive closing panel or intentional set of related cards.
- [ ] Confirm anchor navigation and expanded details behavior.
- [ ] Confirm long series titles and varying post counts.
- [ ] Confirm responsive grids and dark-mode contrast.

## Likely files

- `series.html`
- `assets/css/jat-series-polish.css`
- `assets/css/jat-pages.css` during migration
- Shared editorial landing-page styles

## Acceptance criteria

- [ ] Dynamic series functionality is preserved.
- [ ] Reader-facing copy describes content rather than implementation mechanics.
- [ ] Series shares the Home/Resources design language without becoming a Home clone.
- [ ] Cards and reading lists remain usable with different content lengths.
- [ ] Desktop, tablet, mobile, keyboard, anchor-navigation, and dark-mode checks pass.

## Out of scope

- Reorganizing existing post series assignments
- Rewriting every series description
- Creating a separate page for every series

---

# DS-10 — Validate Resources and complete cross-site QA

**Phase:** 3 — Validation  
**Status:** Not started  
**Priority:** Critical  
**Depends on:** DS-01 through DS-09

## Objective

Confirm Resources remains aligned after design-system consolidation and validate consistency, accessibility, responsiveness, and functionality across all public pages.

## Scope — Resources validation

- [ ] Confirm Resources remains the preferred interior landing-page example.
- [ ] Confirm hero, panels, cards, status labels, images, and calls to action use shared components.
- [ ] Shorten or consolidate repetitive coming-soon explanation if needed.
- [ ] Confirm planned resource cards communicate whether they are interactive.
- [ ] Confirm image crops and section heights at tablet widths.
- [ ] Confirm dark-mode behavior after shared-style consolidation.

## Scope — cross-site validation

Review:

- [ ] Home
- [ ] Posts
- [ ] Series
- [ ] Podcast
- [ ] Resources
- [ ] About
- [ ] Search
- [ ] CV / Professional Background

Validate:

- [ ] Typography hierarchy
- [ ] Color and contrast
- [ ] Container widths
- [ ] Hero spacing
- [ ] Panel and card spacing
- [ ] Buttons and text links
- [ ] Borders, corners, and shadows
- [ ] Navigation active states
- [ ] Footer destinations
- [ ] Image crops and alternative text
- [ ] Keyboard focus order and visible focus
- [ ] Heading hierarchy
- [ ] Desktop layout
- [ ] Tablet layout
- [ ] Mobile layout
- [ ] Light mode
- [ ] Dark mode
- [ ] Broken links
- [ ] Empty or placeholder links
- [ ] Search URL queries
- [ ] Pagination
- [ ] Print output for CV

## Legacy cleanup

- [ ] Remove obsolete styles only after confirming no page depends on them.
- [ ] Remove superseded page-specific polish rules.
- [ ] Remove redundant inline styles.
- [ ] Confirm CSS import order.
- [ ] Confirm no dead image assets are referenced.
- [ ] Record retained legacy dependencies and reasons.

## Acceptance criteria

- [ ] Every public page belongs clearly to one of the three page archetypes.
- [ ] Shared components behave consistently.
- [ ] No known broken or misleading navigation remains.
- [ ] Light and dark modes are complete.
- [ ] Responsive and accessibility checks are documented.
- [ ] Changelog and decision log are current.
- [ ] Remaining deferred work is explicitly documented.

## Out of scope

- New content categories
- Newsletter implementation
- Podcast launch
- Large-scale post-content editing
