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
| 2025-08-18 | Guarding the Garden of Your Marriage | reflection | faith, marriage | — | Audited |
| 2025-08-20 | Pursuing Peace on Purpose | reflection | faith, leadership | — | Audited |
| 2025-08-22 | The Villain in Us All | reflection | faith | The Daily Death of Pride (proposed prelude) | Audited |
| 2025-08-26 | Conspiracy and Trust | reflection | faith, culture | — | Audited |
| 2025-08-28 | The Level Ground at the Cross | reflection | faith | — | Audited |
| 2025-09 | Leading Where It Matters Most | reflection | leadership, marriage, faith | — | Audited |
| 2025-09 | The Measure of Success | reflection | leadership, faith | — | Audited |
| 2025-09 | When Life Gets Full | reflection | faith, creation | — | Audited |
| 2025-09 | Strong Enough to Be Gentle | reflection | faith, marriage, leadership | — | Audited |
| 2025-09 | Why Hope Matters More Than We Realize | reflection | faith | — | Audited |
| 2025-09 | Created, Fallen, Restored | bible-study | faith | — | Audited |
| 2025-10-01 | When Her Growth Matters More Than My Credit | reflection | faith, marriage | — | Audited |
| 2025-10-03 | Stay Teachable | reflection | faith, leadership | 10 Skills Every Man Should Have | Audited |
| 2025-10-05 | No Rush: Road Trips and Marriage | reflection | faith, marriage, creation | — | Audited |
| 2025-10-07 | Trust Grows in the Hard Conversations | reflection | faith, marriage | — | Audited |
| 2025-10-10 | Words and Numbers Matter | reflection | faith, leadership | 10 Skills Every Man Should Have | Audited |
| 2025-10-15 | Real Victories | reflection | faith, leadership | — | Audited |
| 2025-10-17 | Master Yourself Before Leading Others | reflection | faith, leadership | 10 Skills Every Man Should Have | Audited |
| 2025-10-22 | Joy Is Contagious | reflection | faith, marriage | — | Audited |
| 2025-10-24 | Strong Enough to Serve | reflection | faith, leadership | 10 Skills Every Man Should Have | Audited |
| 2025-10-26 | The Work of Keeping Warm | reflection | faith, marriage | — | Audited |
| 2025-10-29 | You Can’t Love Christ and Hate His Church | reflection | faith, culture | — | Audited |
| 2025-10-31 | The Quiet Confidence of Self-Reliance | reflection | faith, leadership, marriage | 10 Skills Every Man Should Have | Audited |

## October 2025 Migration Details

| Date | Post | Proposed Tags | Scripture Array | Migration Notes |
|---|---|---|---|---|
| 2025-10-01 | When Her Growth Matters More Than My Credit | `humility`, `pride`, `communication`, `spiritual-growth`, `biblical-marriage`, `encouragement` | `1 Corinthians 3:6` | Replace subject categories with `reflection`; normalize Scripture scalar. |
| 2025-10-03 | Stay Teachable | `teachability`, `humility`, `lifelong-learning`, `wisdom`, `character`, `spiritual-growth` | `Proverbs 1:5` | Preserve series order 2; remove StackEdit metadata comment. |
| 2025-10-05 | No Rush: Road Trips and Marriage | `biblical-marriage`, `patience`, `slowing-down`, `road-trips`, `camping`, `travel`, `oneness`, `marital-growth` | `Genesis 2:24`; `Ecclesiastes 3:1` | Normalize contributor list for Samatra Thomas and split Scripture references. |
| 2025-10-07 | Trust Grows in the Hard Conversations | `biblical-marriage`, `trust`, `communication`, `honesty`, `vulnerability`, `marital-conflict`, `forgiveness`, `intimacy` | `Proverbs 24:26`; `Ephesians 4:32` | Preserve external source link; verify or soften unsupported conflict-statistic wording during cleanup. |
| 2025-10-10 | Words and Numbers Matter | `competence`, `literacy`, `numeracy`, `responsibility`, `wisdom`, `stewardship`, `communication`, `financial-literacy` | `Proverbs 4:7` | Preserve series order 3. |
| 2025-10-15 | Real Victories | `perseverance`, `confidence`, `humility`, `spiritual-growth`, `endurance`, `faithfulness`, `entitlement` | `James 1:3`; `Philippians 4:13` | Remove redundant `faith` tag; retain the opening quote as unattributed unless a source is verified; remove StackEdit comment. |
| 2025-10-17 | Master Yourself Before Leading Others | `self-control`, `emotional-discipline`, `mental-discipline`, `servant-leadership`, `patience`, `anger`, `fruit-of-the-spirit`, `emotional-maturity` | `Proverbs 16:32`; `Galatians 5:22-23` | Preserve series order 4. |
| 2025-10-22 | Joy Is Contagious | `joy`, `gratitude`, `emotional-contagion`, `complaining`, `fruit-of-the-spirit`, `marital-connection`, `encouragement` | `Proverbs 17:22`; `Galatians 5:22` | Normalize contributor list for Samatra Thomas; verify Harvard/University of California research attribution during editorial cleanup. |
| 2025-10-24 | Strong Enough to Serve | `physical-strength`, `endurance`, `service`, `stewardship`, `discipline`, `servant-leadership`, `manhood` | `1 Corinthians 9:27`; `1 Timothy 4:8` | Preserve series order 5; remove StackEdit metadata comment. |
| 2025-10-26 | The Work of Keeping Warm | `biblical-marriage`, `intentionality`, `rekindling`, `affection`, `marital-connection`, `service`, `humility` | `Romans 12:10-11`; `Song of Solomon 8:6-7` | Correct doubled `.md.md` filename only with URL protection; repair missing punctuation in “warm—you”; remove StackEdit comment. |
| 2025-10-29 | You Can’t Love Christ and Hate His Church | `church`, `body-of-christ`, `bride-of-christ`, `covenant`, `grace`, `church-hurt`, `christian-community`, `sanctification` | `Ephesians 5:25-32`; `1 Corinthians 3:16`; `Ephesians 1:22-23` | Standardize closing phrase; review several absolute theological statements for the approved humble-claim standard without changing the article’s central argument. |
| 2025-10-31 | The Quiet Confidence of Self-Reliance | `self-reliance`, `competence`, `responsibility`, `stewardship`, `practical-skills`, `household-management`, `service`, `preparedness` | `Proverbs 27:23` | Preserve series order 6. |

## Remaining Audit Queue

- [x] October 2025
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
- [ ] Correct `2025-10-26-the-work-of-keeping-warm.md.md` without breaking the published URL
- [ ] Remove residual StackEdit metadata comments from audited posts
- [ ] Review image files currently stored inside `_posts`
- [ ] Verify source attribution for research claims and lengthy quotations noted during audit
- [ ] Standardize closing phrase capitalization and punctuation where noted

## Migration Progress

| Stage | Progress |
|---|---:|
| Architecture | 100% |
| Taxonomy | 100% |
| Content audit | In progress through October 2025 |
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
