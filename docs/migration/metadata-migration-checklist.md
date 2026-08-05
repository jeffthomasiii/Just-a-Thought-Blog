# Just A Thought Metadata Migration Checklist

**Status:** Active  
**Branch:** `content-architecture-v1-1`  
**Architecture:** `docs/content-architecture.md`  
**Last updated:** 2026-08-05

## Purpose

This document is the execution board for migrating every published post to the approved Just A Thought content architecture.

The architecture is frozen during migration. New ideas should be recorded separately and must not interrupt this work.

## Definition of Done

A post is migration-complete only when all applicable checks pass:

- [ ] Article Type stored in `categories`
- [ ] Reader Collections stored in `collections`
- [ ] Tags normalized to lowercase kebab case
- [ ] Scripture stored as a YAML array
- [ ] Series metadata normalized when applicable
- [ ] Contributor metadata normalized when applicable
- [ ] Required image fields verified
- [ ] YAML parses successfully
- [ ] Existing URL remains valid
- [ ] Jekyll build passes

## Status Key

- `Audited` — proposed metadata has been reviewed in the content audit
- `Pending audit` — post still requires classification and metadata review
- `Migrated` — front matter has been updated
- `Validated` — YAML and site build have passed

## Audited Posts

| Date | Post | Article Type | Reader Collections | Series | Status |
|---|---|---|---|---|---|
| 2025-06-11 | Why Another Blog? And Why This One Might Actually Matter | reflection | faith, marriage, leadership, technology, culture, creation | — | Audited |
| 2025-06-14 | Filling the Mind, Not Emptying It | devotional | faith | — | Audited |
| 2025-06-18 | Whose Order Are You Following? | reflection | faith, marriage, leadership | — | Audited |
| 2025-07-01 | Clothed in Strength: When a Woman Laughs at the Future | devotional | faith | — | Audited |
| 2025-07-01 | Marriage IS Ministry | reflection | faith, marriage | — | Audited |
| 2025-07-07 | Speak Life Over Them | series-introduction | faith, marriage | Speak Life Over Them | Audited |
| 2025-07-09 | Husbands, Speak Life When She Forgets Who She Is | reflection | faith, marriage | Speak Life Over Them | Audited |
| 2025-07-11 | Wives, Speak Life When He Feels the Weight of It All | reflection | faith, marriage | Speak Life Over Them | Audited |
| 2025-07-14 | Thinking Out Loud, Why I Blog | reflection | faith, leadership | — | Audited |
| 2025-07-18 | Hearing My Words Out Loud | reflection | technology, culture | — | Audited |
| 2025-07-21 | When Silence Isn’t Submission | reflection | faith, culture, leadership | — | Audited |
| 2025-07-23 | Spiritual Sweat | devotional | faith | — | Audited |
| 2025-07-25 | Guard Your Heart: Check Your Desires Early | reflection | faith, culture | — | Audited |
| 2025-07-28 | Between Pines and Shorelines | reflection | creation, marriage, faith | — | Audited |
| 2025-07-30 | What Does It Mean to Be Holy? | reflection | faith | — | Audited |
| 2025-08-01 | What the Four Horsemen Can’t Kill, If God Is in the Marriage | reflection | faith, marriage | — | Audited |
| 2025-08-04 | The Deep Is Where You Grow | reflection | faith | — | Audited |
| 2025-08-06 | The Power of a Look | reflection | faith, culture | — | Audited |
| 2025-08-08 | Do It Anyway: Becoming Who You Are, Not What They Deserve | reflection | faith, marriage, leadership | — | Audited |
| 2025-08-11 | Say It So They Hear You | reflection | leadership, technology, faith | — | Audited |
| 2025-08-13 | Let Them Talk—Let God Speak | devotional | faith, leadership | — | Audited |
| 2025-08-15 | Tuned Together: What Praying Out Loud Does for Your Marriage | reflection | faith, marriage | — | Audited |
| 2025-08 | Guarding the Garden of Your Marriage | reflection | faith, marriage | — | Audited |
| 2025-08 | Pursuing Peace on Purpose | reflection | faith, leadership | — | Audited |
| 2025-08 | The Villain in Us All | reflection | faith | The Daily Death of Pride (proposed prelude) | Audited |
| 2025-08 | Conspiracy and Trust | reflection | faith, culture | — | Audited |
| 2025-08 | The Level Ground at the Cross | reflection | faith | — | Audited |
| 2025-09 | Leading Where It Matters Most | reflection | leadership, marriage, faith | — | Audited |
| 2025-09 | The Measure of Success | reflection | leadership, faith | — | Audited |
| 2025-09 | When Life Gets Full | reflection | faith, creation | — | Audited |
| 2025-09 | Strong Enough to Be Gentle | reflection | faith, marriage, leadership | — | Audited |
| 2025-09 | Why Hope Matters More Than We Realize | reflection | faith | — | Audited |
| 2025-09 | Created, Fallen, Restored | bible-study | faith | — | Audited |

## Remaining Audit Queue

- [ ] October 2025
- [ ] November 2025
- [ ] December 2025
- [ ] January 2026
- [ ] February 2026
- [ ] March 2026
- [ ] April 2026
- [ ] May 2026
- [ ] June 2026
- [ ] July 2026
- [ ] August 2026

## Known Migration Issues

- [ ] Resolve filename/front-matter date mismatch for `Speak Life Over Them`
- [ ] Normalize the three `Speak Life Over Them` posts with structured series metadata
- [ ] Repair malformed categories and excerpt typo in `Hearing My Words Out Loud`
- [ ] Repair corrupted body text in `When Silence Isn’t Submission`
- [ ] Normalize Samatra Thomas contributor metadata where applicable
- [ ] Review inconsistent filenames separately before any rename
- [ ] Review image files currently stored inside `_posts`
- [ ] Verify source attribution for research claims and lengthy quotations noted during audit

## Migration Progress

| Stage | Progress |
|---|---:|
| Architecture | 100% |
| Taxonomy | 100% |
| Content audit | In progress |
| Front matter migration | 0% |
| Validation | 0% |
| Collection pages | 0% |
| Discovery features | 0% |

## Execution Order

1. Complete the remaining audit queue.
2. Update all post front matter in one controlled migration.
3. Validate YAML and run the Jekyll build.
4. Resolve migration issues that affect the build or reader experience.
5. Build the six collection pages: Faith, Marriage, Leadership, Technology, Culture, and Creation.
