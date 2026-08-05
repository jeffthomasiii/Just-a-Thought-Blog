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
| 2025-11-04 | Walking with God, and with His People | reflection | faith | — | Audited |
| 2025-11-07 | People Over Projects | reflection | faith, leadership | 10 Skills Every Man Should Have | Audited |
| 2025-11-10 | Fail Fast, Grow Forward | reflection | faith, leadership | — | Audited |
| 2025-11-12 | Christianity Without Christian Minds | reflection | faith, culture | — | Audited |
| 2025-11-14 | Prepared to Help | reflection | faith, leadership | 10 Skills Every Man Should Have | Audited |
| 2025-11-16 | You Can’t Fake Care | reflection | faith, leadership | Character Before Competence | Audited |
| 2025-11-18 | What Paul Meant in His World | reflection | faith, culture | The Practice of Holy Thinking | Audited |
| 2025-11-20 | Whatever Is True: What These Words Really Say | bible-study | faith | The Practice of Holy Thinking | Audited |
| 2025-11-21 | Strength with Restraint | reflection | faith, leadership | 10 Skills Every Man Should Have | Audited |
| 2025-11-22 | The Mind of Christ in the Mind of Man | devotional | faith | The Practice of Holy Thinking | Audited |
| 2025-11-24 | Thinking Christianly in a Secular Age | reflection | faith, culture, technology | The Practice of Holy Thinking | Audited |
| 2025-11-26 | Training Your Thoughts Toward the Good | devotional | faith | The Practice of Holy Thinking | Audited |
| 2025-11-28 | The Legacy of Mentorship | reflection | faith, leadership | 10 Skills Every Man Should Have | Audited |

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

## November 2025 Migration Details

| Date | Post | Proposed Tags | Scripture Array | Migration Notes |
|---|---|---|---|---|
| 2025-11-04 | Walking with God, and with His People | `christian-community`, `fellowship`, `friendship`, `discipleship`, `church`, `spiritual-formation`, `belonging` | `Acts 2:42-47`; `Proverbs 27:17`; `Exodus 20:1-17` | Replace subject categories with `reflection`; normalize `Christian living`; remove StackEdit metadata comment; verify the R. Kent Hughes quotation and soften absolute claims where needed. |
| 2025-11-07 | People Over Projects | `relationships`, `empathy`, `humility`, `presence`, `listening`, `encouragement`, `servant-leadership`, `manhood` | `Ephesians 4:2-3` | Preserve series order 7; normalize categories and Scripture scalar. |
| 2025-11-10 | Fail Fast, Grow Forward | `failure`, `growth`, `resilience`, `grace`, `repentance`, `perseverance`, `leadership`, `humility` | `Proverbs 24:16` | Remove quotation text from Scripture metadata; review claims about Peter, Moses, and Paul for precision; soften the closing statement about what God expects and builds. |
| 2025-11-12 | Christianity Without Christian Minds | `christian-thinking`, `renewed-mind`, `discernment`, `spiritual-growth`, `biblical-worldview`, `discipleship`, `culture`, `mind-of-christ` | `Romans 12:2`; `1 Corinthians 2:16`; `Matthew 22:37` | Verify the R. Kent Hughes quotation and source; repair stray punctuation; remove StackEdit comment; review broad claims about the Church and culture. |
| 2025-11-14 | Prepared to Help | `preparedness`, `first-aid`, `emergency-readiness`, `responsibility`, `service`, `competence`, `stewardship`, `manhood` | `Proverbs 22:3` | Preserve series order 8; normalize categories and Scripture scalar; verify or remove the unattributed family rescue story. |
| 2025-11-16 | You Can’t Fake Care | `authenticity`, `genuine-care`, `empathy`, `emotional-intelligence`, `influence`, `servant-leadership`, `trust`, `character` | `Romans 12:9` | Preserve series order 1; remove empty contributor list; verify Paul Ekman and Daniel Goleman research claims; review absolute claims that people can always detect insincerity. |
| 2025-11-18 | What Paul Meant in His World | `philippians`, `historical-context`, `roman-culture`, `christian-thinking`, `holy-thinking`, `discipleship`, `truth`, `spiritual-formation` | `Philippians 4:8` | Preserve series order 1; remove empty contributor list and StackEdit comment; repair corrupted spacing; verify imprisonment, Roman virtue, and philosophical-vocabulary claims. |
| 2025-11-20 | Whatever Is True: What These Words Really Say | `philippians`, `word-study`, `greek`, `christian-thinking`, `truth`, `virtue`, `spiritual-formation`, `biblical-interpretation` | `Philippians 4:8` | Classify as `bible-study`; preserve series order 2; remove empty contributor list and StackEdit comment; verify lexical definitions and avoid overstating semantic ranges. |
| 2025-11-21 | Strength with Restraint | `strength`, `self-control`, `self-defense`, `de-escalation`, `preparedness`, `discipline`, `responsibility`, `manhood` | `Proverbs 25:28` | Preserve series order 9; normalize categories and Scripture scalar; review weapons language for responsible framing; verify or remove the unattributed parking-lot story. |
| 2025-11-22 | The Mind of Christ in the Mind of Man | `philippians`, `mind-of-christ`, `surrender`, `renewed-mind`, `holy-thinking`, `spiritual-formation`, `union-with-christ`, `holy-spirit` | `Philippians 4:8`; `Philippians 2:5`; `1 Corinthians 2:16`; `Romans 12:2` | Classify as `devotional`; preserve series order 3; remove empty contributor list; repair missing punctuation; review claims about indwelling, union, and the Spirit’s role using the humble-claim standard. |
| 2025-11-24 | Thinking Christianly in a Secular Age | `philippians`, `christian-thinking`, `digital-culture`, `algorithms`, `distraction`, `discernment`, `spiritual-formation`, `biblical-worldview` | `Philippians 4:8` | Preserve series order 4; add Technology collection; remove empty contributor list and StackEdit comment; repair multiple missing spaces; review Roman-culture comparison. |
| 2025-11-26 | Training Your Thoughts Toward the Good | `philippians`, `thought-life`, `spiritual-discipline`, `renewed-mind`, `holy-thinking`, `surrender`, `peace`, `spiritual-formation` | `Philippians 4:8`; `2 Corinthians 10:5` | Classify as `devotional`; preserve series order 5; remove empty contributor list and StackEdit comment; repair missing spaces; review statements about mental discipline and spiritual formation. |
| 2025-11-28 | The Legacy of Mentorship | `mentorship`, `discipleship`, `legacy`, `wisdom`, `teaching`, `lifelong-learning`, `service`, `manhood` | `2 Timothy 2:2` | Preserve series order 10; normalize categories and Scripture scalar. |

## Remaining Audit Queue

- [x] October 2025
- [x] November 2025
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
- [ ] Normalize inconsistent title-case filenames from November 2025 without changing published URLs
- [ ] Remove residual StackEdit metadata comments from audited posts
- [ ] Remove empty contributor arrays where no contributor applies
- [ ] Repair corrupted spacing and punctuation in `The Practice of Holy Thinking` series
- [ ] Review image files currently stored inside `_posts`
- [ ] Verify source attribution for research claims and lengthy quotations noted during audit
- [ ] Verify Greek word-study and historical-context claims in the Philippians series
- [ ] Review self-defense and weapons language for responsible framing
- [ ] Standardize closing phrase capitalization and punctuation where noted

## Migration Progress

| Stage | Progress |
|---|---:|
| Architecture | 100% |
| Taxonomy | 100% |
| Content audit | In progress through November 2025 |
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
