# 🕊️ Just A Thought Blog — Complete Formatting & Style Guide


## 🩉 1. YAML FRONT MATTER TEMPLATE

Every post **must begin** with this block of YAML between triple dashes `---` at the top of the file.

```yaml
---
layout: post
title: "Your Post Title Here"
subtitle: "Optional Subtitle Here"
description: "Optional meta description for SEO and social cards (1–2 sentences)"
date: YYYY-MM-DD
author: Jeff Thomas III
categories:
  - faith          # or marriage / tech / camping / leadership / culture
  - reflection
tags:
  - tag-one
  - tag-two
  - tag-three
excerpt: "Short teaser (1–2 sentences) for previews and cards."
image: /img/posts/your-post-image.jpg              # Square/rectangular OG/social preview
background: /img/posts/bg-your-post-image.jpg      # Wide hero header background
scripture: "Optional Scripture Reference (e.g., 1 Peter 1:14–16 ESV)"
contributors: [Samatra Thomas]                     # optional list for shared writing credit
series: "Series Title Here"                        # optional if part of a series
series_order: 1                                    # optional for ordering within a series
---
```

**Tips:**

* Keep YAML indentation consistent (2 spaces for nested lists).
* Use lowercase, hyphen-separated filenames:
  Example: `2025-10-07-marriage-as-work.md`
* `image` = social preview (square/rectangle).
  `background` = hero header (wide, cinematic).
  No text on images.


## 🧱 2. STANDARD BLOG STRUCTURE (MARKDOWN BODY)

All *Just A Thought* posts follow a **structured narrative flow** for consistency and emotional pacing.

### **Structure Overview**

1. **Hook (1–3 sentences)**

   * Start with a relatable story, tension, or question.
   * Avoid announcing the topic directly; let it unfold naturally.

2. **Context & Reflection**

   * Explain what prompted the post (a verse, conversation, quote, or moment).
   * Introduce Scripture or life observation that grounds the theme.

3. **Development**

   * Build on the idea thoughtfully.
   * Blend biblical truth, personal insight, and cultural reflection.
   * Use short sections (2–5 sentences each).

4. **Resolution or Open Reflection**

   * Offer closure or pose a final question.
   * End with the phrase **"…just a thought."**

5. **(Optional) Reader Prompt**

   * Encourage reflection or invite comments.
   * Example:

     > What helps you stay grounded when life feels hurried?


### **Markdown Example**

```markdown
### When the Fire Feels Like Work

It’s funny how love starts as a spark but is sustained by tending the flame.  
When the honeymoon ends, many discover that marriage isn’t effortless—it’s intentional.

R. Kent Hughes once wrote, *“In the fire of new love, marriage seems as easy as falling off a log. Actually, it is as easy as staying on a log.”*  
That line stuck with me. Because staying requires balance, focus, and often, humility.

Marriage asks for more than emotion—it asks for endurance.  
The same heat that refines gold also reveals weakness, and what we do with that weakness shapes our union.

So if you’re in a season where marriage feels like work, take heart.  
That work is the evidence that love is being tested, purified, and made strong.

…just a thought.

---

**Reflection:**  
What part of marriage has taught you the most about selflessness lately?
```


## 🪶 3. MARKDOWN FORMATTING RULES

| **Element**     | **How to Use It**                                                      | **Example**                                            |
| --------------- | ---------------------------------------------------------------------- | ------------------------------------------------------ |
| Headings        | Use `###` for section headers only (not `#` or `##`)                   | `### When Love Requires Work`                          |
| Bold            | For emphasis, not emotion                                              | `**intentional love**`                                 |
| Italic          | For quotes, Scripture, or light emphasis                               | `*“Love bears all things…”*`                           |
| Blockquotes     | For Scripture, quotes, or reflections                                  | `> “Be holy, for I am holy.” (1 Peter 1:16 ESV)`       |
| Lists           | Use for clear points (bulleted, never numbered)                        | `- Faith requires action`                              |
| Horizontal Rule | Use `---` only for separation before reader prompts or Scripture lists | `---`                                                  |
| Scripture       | Include translation (ESV preferred)                                    | `(Romans 12:10 ESV)`                                   |
| Links           | Markdown links, descriptive text only                                  | `[read more here](https://justathoughtblog.org/about)` |
| Image           | Use only for posts’ featured visuals, not inline unless symbolic       | `![alt text](/img/posts/image.jpg)`                    |
| Em dash         | Use sparingly — prefer commas or periods                               | ✅ *“Love endures through challenge.”*                  |
| Ellipses        | Use for tone, not as filler                                            | `…just a thought.`                                     |


## 🎨 4. IMAGE STYLE & NAMING CONVENTIONS

| **Type**                | **Purpose**                        | **Filename**                       | **Prompt Style**                                                               |
| ----------------------- | ---------------------------------- | ---------------------------------- | ------------------------------------------------------------------------------ |
| **Header Background**   | Hero image at top (wide cinematic) | `/img/posts/bg-title-keywords.jpg` | “Wide, cinematic landscape with painterly texture, natural tones, no text.”    |
| **Social Preview (OG)** | Square/rectangle image for cards   | `/img/posts/title-keywords.jpg`    | “Symbolic painterly illustration representing the theme, soft tones, no text.” |

**Image Notes**

* No text overlays.
* Consistent *painterly*, *natural*, *reflective* aesthetic.
* Dominant tones: olive green, muted blue, warm earth, soft gold.
* Save images in `.jpg` format for consistency.
* Include alt text for accessibility if inserted in body.


## ✍️ 5. STYLE & VOICE GUIDELINES

| **Aspect**               | **Guideline**                                                                                |
| ------------------------ | -------------------------------------------------------------------------------------------- |
| **Tone**                 | Reflective, honest, faith-informed, and compassionate. Avoid being preachy or academic.      |
| **Audience**             | Everyday Christians and reflective readers seeking growth, not debate.                       |
| **Length**               | 700–1,200 words typical; 1,500 max for series or teaching posts.                             |
| **Pacing**               | Vary sentence length for rhythm. Read aloud before publishing.                               |
| **Paragraphs**           | 3–5 lines max. White space aids readability.                                                 |
| **Ending**               | Always include the ellipsis phrase: `…just a thought.`                                       |
| **Guest Posts**          | Omit the “just a thought” line and note author under `contributors:`.                        |
| **Scripture References** | Use ESV unless context requires another. Always cite.                                        |
| **SEO Tip**              | Use conversational title + subtle keyword (e.g., *“Trust Grows in the Hard Conversations”*). |


## 🗂️ 6. FILE NAMING & FOLDER STRUCTURE

```
/_ posts/
  ├── 2025-10-07-marriage-as-work.md
  ├── 2025-10-05-road-trip-vs-destination.md
  └── 2025-09-19-trust-grows-in-the-hard-conversations.md

/img/posts/
  ├── marriage-as-work.jpg
  ├── bg-marriage-as-work.jpg
  ├── road-trip-vs-destination.jpg
  └── bg-road-trip-vs-destination.jpg
```


## 🧬 7. CREATION WORKFLOW (RECOMMENDED)

1. **Brainstorm:** Draft story ideas or reflections.
2. **Draft:** Write post in Markdown, following structure & style.
3. **Refine:** Lightly edit for tone and pacing (don’t over-polish).
4. **Add YAML Front Matter.**
5. **Generate Image  Prompts & create Image Files.**
6. **Commit to GitHub:**

   * Save under `_posts/` with correct filename.
   * Push to main branch to publish.
7. **Verify:** Check rendering, spacing, and image load.


## 💡 8. QUICK-REFERENCE SNIPPETS

**End-of-Post Line**

```markdown
…just a thought.
```

**Scripture Blockquote Example**

```markdown
> “For the whole law is fulfilled in one word: ‘You shall love your neighbor as yourself.’”  
> *(Galatians 5:14 ESV)*
```

**Series Note Example**

```yaml
series: "Love What God Loves, Hate What God Hates"
series_order: 2
```
