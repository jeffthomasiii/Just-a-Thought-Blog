# Just A Thought Metadata Migration

**Architecture version:** 1.0  
**Working branch:** `feature/content-library-foundation`  
**Pull request:** #63

This document tracks the conversion of published posts to the canonical content architecture. The post front matter remains the single source of truth; this file records migration status and issues that require separate editorial or technical review.

## Status key

- **Migrated** — front matter conforms to Content Architecture v1.0.
- **Audited** — proposed metadata has been reviewed but not yet written.
- **Pending** — not yet fully reviewed.
- **Needs review** — migration is blocked by a date, URL, factual, editorial, or file issue.

## Migration rules

- `categories` stores one editorial type.
- `collections` stores one or more reader journeys.
- `tags` use lowercase kebab case and avoid duplicating collections.
- `series` and `series_order` are added only for intentional sequences.
- `scripture` should be a YAML list when references are available.
- Existing filenames are not renamed during metadata migration because that may alter published URLs.
- Body-copy corrections are tracked separately unless a clear typo prevents the article from reading correctly.

## Published-post tracker

| Post | Article type | Collections | Status | Notes |
|---|---|---|---|---|
| Why Another Blog? And Why This One Might Actually Matter | reflection | faith, marriage, leadership, technology, culture, creation | Migrated | Foundational welcome post; intentional exception appearing in all six collections. |
| Filling the Mind, Not Emptying It | devotional | faith | Audited | Normalize Scripture and spiritual-discipline tags. |
| Whose Order Are You Following? | reflection | faith, marriage, leadership | Audited | Replace subject-style categories with article type. |
| Clothed in Strength: When a Woman Laughs at the Future | devotional | faith | Audited | Standardize Proverbs 31 and scripture-study tags. |
| Marriage IS Ministry | reflection | faith, marriage | Audited | Add covenant, spiritual-formation, and dying-to-self tags. |
| Speak Life Over Them | series-introduction | faith, marriage | Needs review | Filename date and front-matter date differ; establish canonical publication date before migration. |
| Husbands, Speak Life When She Forgets Who She Is | reflection | faith, marriage | Audited | Add Speak Life Over Them series metadata, order 2. |
| Wives, Speak Life When He Feels the Weight of It All | reflection | faith, marriage | Audited | Add Speak Life Over Them series metadata, order 3. |
| Thinking Out Loud, Why I Blog | reflection | faith, leadership | Audited | Normalize Personal Reflection category. |
| Hearing My Words Out Loud | reflection | technology, culture | Needs review | Current categories are malformed; excerpt also contains a spacing typo. |
| When Silence Isn’t Submission | reflection | faith, culture, leadership | Needs review | Body contains corrupted text; filename uses a typographic apostrophe. |
| Spiritual Sweat | devotional | faith | Audited | Replace generic discipline tag with spiritual-disciplines. |
| Guard Your Heart: Check Your Desires Early | reflection | faith, culture | Audited | Add temptation and discernment; normalize category. |
| Between Pines and Shorelines | reflection | creation, marriage, faith | Audited | Normalize Samatra Thomas as a contributor; map former Camping collection to Creation. |
| What Does It Mean to Be Holy? | reflection | faith | Audited | Replace site-name category; normalize Scripture-book tag. |
| What the Four Horsemen Can’t Kill, If God Is in the Marriage | reflection | faith, marriage | Needs review | Source-check research claims and clarify theological implications before body edits. |
| The Deep Is Where You Grow | reflection | faith | Audited | Add Samatra Thomas as contributor; correct description punctuation during migration. |
| The Power of a Look | reflection | faith, culture | Needs review | Verify quotation length and source attribution. |
| Do It Anyway: Becoming Who You Are, Not What They Deserve | reflection | faith, marriage, leadership | Audited | Marriage remains a collection rather than editorial type. |
| Say It So They Hear You | reflection | leadership, technology, faith | Audited | Correct malformed category and minor capitalization typo. |
| Let Them Talk—Let God Speak | devotional | faith, leadership | Needs review | Clarify whether the Leah account is factual, composite, or illustrative. |
| Tuned Together: What Praying Out Loud Does for Your Marriage | reflection | faith, marriage | Needs review | Review use of Matthew 18:19 and clarify story provenance. |
| Guarding the Garden of Your Marriage | reflection | faith, marriage | Audited | Strong candidate for future Marriage collection feature. |
| Pursuing Peace on Purpose | reflection | faith, leadership | Audited | Peacemaking and reconciliation pathway. |
| The Villain in Us All | reflection | faith | Needs review | Related to The Daily Death of Pride, but series membership/order requires an editorial decision. |
| Conspiracy and Trust | reflection | faith, culture | Audited | Discernment, media, fear, and truth. |
| The Level Ground at the Cross | reflection | faith | Audited | Candidate for a future cornerstone or Start Here pathway. |

## Next migration sequence

1. Migrate the four remaining unblocked June and early-July posts.
2. Resolve the publication date for `Speak Life Over Them` before changing its metadata.
3. Migrate the two companion Speak Life posts with consistent series metadata.
4. Continue chronologically, separating metadata-only updates from posts requiring editorial review.
5. Run the required site build after each logical batch.
