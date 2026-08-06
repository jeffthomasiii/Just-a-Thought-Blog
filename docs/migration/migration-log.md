# Just A Thought Metadata Migration Log

## Purpose

This document records implementation progress for the Just A Thought metadata migration.

## Status

| Phase | Status |
|---|:---:|
| Architecture | Complete |
| Taxonomy | Complete |
| Audit | Complete |
| Metadata Migration | In Progress |
| Validation | In Progress |
| Collection Pages | Pending |
| Discovery | Pending |

## Monthly Progress

### June 2025

Status: Complete

- [x] Front matter updated
- [x] YAML validated
- [x] Article Types normalized
- [x] Collections added
- [x] Tags standardized
- [x] Scripture converted to YAML arrays
- [x] Contributors verified
- [x] Series verified
- [x] Images verified against existing paths
- [ ] Jekyll build verified

Commits:

- `22d68655109b6f20c02af05ed9e633df9c35e28c`
- `23910b520074fe3a48376799989a091a33507393`
- `b7d1c067018b472e43e0cbcfaba7fd38c61ca6a4`

Notes:

- Migrated all three June 2025 posts.
- Added missing required front matter fields.
- Preserved published article bodies while removing residual StackEdit metadata from the introductory post.
- Full Jekyll build validation remains pending until a broader migration checkpoint.

### July 2025

Status: Complete

- [x] Front matter updated
- [x] YAML validated
- [x] Article Types normalized
- [x] Collections added
- [x] Tags standardized
- [x] Scripture converted to YAML arrays
- [x] Contributors verified
- [x] Series verified
- [x] Images normalized to required front matter fields
- [ ] Jekyll build verified

Commits:

- `c08e5de76d7eb1ebaad4143055ffe047d973693a`
- `e5f27d2b656ff121c3d4318a217a34b136596f85`
- `fee3d97fc2e19889e0f391b780595ab47e16332d`
- `60a4f2619939d16b3c6b402e5a9b51420c8416bb`
- `a1675fb3bbfaacfb7d35a1a20cb409bee2540629`
- `55b275904070058a26cd46cefc4db2735ab180c0`
- `275ed5a402a595e4a19bfb27c1f6f0dc0049d357`
- `87a5a4c2ca2fe220d9a345fef723c292963aecc5`
- `035042d8a2fd81c44a8473405eac2256500ab246`
- `382350c82b77de040c4236ed6eba4c449e79472b`
- `249f29dc2139051479aed1c12a2acfd46749a3f5`
- `7f6ddbc832a465b82bdde1f971622fbc13aa974e`

Notes:

- Migrated all twelve July 2025 posts.
- Added structured metadata for the three-part `Speak Life Over Them` series.
- Corrected the introductory series post date to match its published filename date.
- Normalized Samatra Thomas as a contributor on `Between Pines and Shorelines`.
- Repaired malformed front matter in `Hearing My Words Out Loud` and normalized its excerpt.
- Article bodies were preserved; previously identified editorial and body-text issues remain deferred.
- Full Jekyll build validation remains pending until a broader migration checkpoint.

### August 2025

Status: Complete

- [x] Front matter updated
- [x] YAML validated
- [x] Article Types normalized
- [x] Collections added
- [x] Tags standardized
- [x] Scripture converted to YAML arrays
- [x] Contributors verified
- [x] Series verified
- [x] Images normalized to required front matter fields
- [ ] Jekyll build verified

Commits:

- `3ef61f7caeafce31b59120453a4484052f1498f3`
- `b763ea43617c4bd35c9e4eb753fa54f7bd0f8c31`
- `0d609317132381a0f18a83e5086894492e695fa6`
- `f0725a355d7c95febefe143999c2f9fdc9cf5488`
- `d5e96dfb3a90417d1c9e9aa145e4467378af0f60`
- `a580f63d6a9b32bbe3d5396bf1c9458387b435a3`
- `ef967c1c374d378a416070ff644a9a89605c401a`
- `397e0811adf14c34cac5c85cfd4a45cf16a8ca05`
- `1b06f22c764f12f564233db3e8879521672f389e`
- `131d711ebd807fa901e6dda5a619872af0c96f20`
- `012012f37626a5da32f4d5f777dcd45002eb2c54`
- `301fe1ab9b18a1fd4391f1fc6f9659b7b6a6d4a6`

Notes:

- Migrated all twelve August 2025 posts.
- Moved camping-related content into the `creation` reader journey rather than treating camping as a collection.
- Normalized faith-and-culture reflections into both `faith` and `culture` collections where appropriate.
- Added `leadership` and `technology` collections only where the reader journey is supported by the article content.
- Converted all Scripture metadata to YAML arrays and removed obsolete `header-image` fields where present.
- Article bodies were preserved; previously identified editorial and body-text issues remain deferred.
- Full Jekyll build validation remains pending until a broader migration checkpoint.

### September 2025

Status: Complete

- [x] Front matter updated
- [x] YAML validated
- [x] Article Types normalized
- [x] Collections added
- [x] Tags standardized
- [x] Scripture converted to YAML arrays
- [x] Contributors verified
- [x] Series verified
- [x] Images normalized to required front matter fields
- [ ] Jekyll build verified

Commits:

- `834ea16747d7e19b9de61b971540b0fb6d0e3b98`
- `70f2e8ed0941b79f432e9055136012f721c06361`
- `36432cda29bb64fe88f64a65e366298755f3a522`
- `c1885020a5b16d55aff168b77fcff43b3a92b1cc`

Notes:

- Audited and migrated all fourteen September 2025 posts.
- Restored every September article body from `master` before applying metadata-only changes, correcting the earlier accidental body modification in `The Woman You Gave Me`.
- Normalized the two-part `Love & Respect; More Than a Cycle` series and the opening installment of `10 Skills Every Man Should Have`.
- Moved camping and outdoor content into the `creation` reader journey and applied `technology`, `culture`, `marriage`, and `leadership` collections where supported by each article.
- Converted Scripture metadata to YAML arrays, removed obsolete `header-image` fields, and removed residual StackEdit metadata.
- The controlled migration workflow completed successfully; full Jekyll build verification remains pending.

### October 2025

Status: Complete

- [x] Front matter updated
- [x] YAML validated
- [x] Article Types normalized
- [x] Collections added
- [x] Tags standardized
- [x] Scripture converted to YAML arrays
- [x] Contributors verified
- [x] Series verified
- [x] Images normalized to required front matter fields
- [ ] Jekyll build verified

Commits:

- `a012973ee66f68dd53d10dca43cccc1518508d18`
- `72a9a303bd20c292c41497eb48cdebb830895e42`
- `25a899dfcc2cd90e24c5680323fe9f36baa04ddd`
- `fbe4ab2a1b88567d4e656b8a4ae8bbab78885eeb`
- `63b7840b4767f72a018da3465c003253390a3b33`
- `dc41442675b113efbce0cb47db586ee4f296e8ac`
- `8ec2ac49b649114d19e652538caee08e19a3fbf8`
- `236adb6923cef05e8e6addbc684fe7e735bcccf7`
- `f93160a1f4c61c568873687509e4609df3d8809a`
- `e4659d2f1a78ce3f95520d82be474bba1327bcee`
- `d5f5205a45d3249da094fc935b32d7f540316d53`
- `8ae977b33dc5c6e18cc36d6139cf2ddeba1bbfba`

Notes:

- Migrated all twelve October 2025 posts.
- Normalized five entries in the `10 Skills Every Man Should Have` series, covering series orders 2–6.
- Normalized Samatra Thomas as a contributor on `No Rush: Road Trips and Marriage` and `Joy Is Contagious`.
- Placed the road-trip and camping context in `No Rush: Road Trips and Marriage` within the `creation` reader journey.
- Preserved the `.md.md` filename anomaly for `The Work of Keeping Warm` for later URL-safe cleanup.
- Removed residual StackEdit metadata where present.
- Article bodies were preserved; previously identified editorial and body-text issues remain deferred.
- Full Jekyll build validation remains pending until a broader migration checkpoint.

### November 2025

Status: Complete

- [x] Front matter updated
- [x] YAML validated
- [x] Article Types normalized
- [x] Collections added
- [x] Tags standardized
- [x] Scripture converted to YAML arrays
- [x] Contributors verified
- [x] Series verified
- [x] Images normalized to required front matter fields
- [ ] Jekyll build verified

Commits:

- `e49ba55045c7ffd3892c29ed0b2892d3cb3fb696`
- `8aac455f674da3ecbdd2d8c25c35d59f8a9f8607`
- `c7fb40b2a5f5ca7f39b2649f1a43747cdc737a7b`
- `f16d63b7e1cf35a4dc5359df8c7f92726f64bb6b`
- `b65eea5d7e3cad8f2edf41aa42ff98fe6e0ad03e`
- `632dae6ee477a4e4b3728486573dfd2d235acaa5`
- `95c7c6d03e74d349781e61dbfb04099debc8273e`
- `0eda4efb8420073fa7e65ebc89a07c2ea79f88ab`
- `f653d1a2180e4e81a34627ca30ae57c65c2c1540`
- `0ff34eb8abdaeaf83d5f5dffcd47ae3c849d3b95`
- `951353746c9cd9f97eda43206e3378e5b640fee2`
- `3e59c9e47ed1938ed3d54ddefcf0fb6928420adb`
- `7289b3e4f91bcaa4a19470f87af862f900f91b4e`

Notes:

- Migrated all thirteen November 2025 posts.
- Continued the `10 Skills Every Man Should Have` series through its final four installments.
- Normalized all five entries in `The Practice of Holy Thinking` series.
- Added the `Character Before Competence` series metadata to `You Can't Fake Care`.
- Removed empty contributor fields and residual StackEdit metadata where present.
- Article bodies were preserved; previously identified editorial and body-text issues remain deferred.
- Full Jekyll build validation remains pending until a broader migration checkpoint.

### December 2025

Status: Complete

- [x] Front matter updated
- [x] YAML validated
- [x] Article Types normalized
- [x] Collections added
- [x] Tags standardized
- [x] Scripture converted to YAML arrays
- [x] Contributors verified
- [x] Series verified
- [x] Images normalized to required front matter fields
- [ ] Jekyll build verified

Commits:

- `e8534608c121284080151ea3905989cfff20152d`
- `f059538e386e023a38c4ad7fc324a6cdffd59d5d`
- `b3e17470ab0a9decb2a99955a1c7dd4350829a4e`
- `dadffe90a4a91a919bda2bb95ba2173e83854600`
- `c96667c106e2e2b630c493d6345c2e13f6d44d27`
- `9e27acad4d11d881138abd67609545e6b28b57ab`
- `6c0704ccf90d79893ebe310acd600709c4720519`
- `1c43c5b340dc1bb40865cb00a36123f6fc7e55d2`
- `12ce9a52fe3e014ae64614791883e53ba9d8915a`
- `fdd97807a96ff3c712dac7db6336250c13930a94`
- `17e70b3b770ae9c2d2ce8d0cea82901b0cd46cd8`
- `d33a40f739009b78a5db16c8882c2d1eac346b84`
- `156b2fac5ae375d875f89ec4f93ed148a5daa26d`
- `8e9f8f5e3f1b7de2aedab1639e543281210f6850`
- `070e676fc8efc00d428f3a4c4f1080a87f7b144e`

Notes:

- Migrated all fifteen December 2025 posts.
- Completed the `10 Skills Every Man Should Have` series metadata with its concluding installment.
- Normalized all nine entries in the `Lead Like This` series, including its introduction and closing reflection.
- Normalized Samatra Thomas as a contributor on `The Mind I Fell For`.
- Removed empty contributor and series fields and residual StackEdit metadata where present.
- Preserved existing filenames, including the Unicode ellipsis in `Before You Lead Anyone…`, to avoid changing published URLs.
- Article bodies were preserved; editorial quality review remains deferred.
- Full Jekyll build validation remains pending until a broader migration checkpoint.

### January 2026

Status: Complete

- [x] Front matter updated
- [x] YAML validated
- [x] Article Types normalized
- [x] Collections added
- [x] Tags standardized
- [x] Scripture converted to YAML arrays
- [x] Contributors verified
- [x] Series verified
- [x] Images normalized to required front matter fields
- [ ] Jekyll build verified

Commits:

- `b2c97ca9ed0048a9f9680053878a0019f5fefd06`

Notes:

- Audited and migrated all fourteen January 2026 posts.
- Restored each published article body from `master` before applying metadata-only changes.
- Normalized every post to the `reflection` article type and assigned supported `faith`, `marriage`, `leadership`, and `culture` reader journeys.
- Standardized tags, corrected the January 2 date format, converted populated Scripture fields to YAML arrays, and removed empty optional fields and residual StackEdit metadata.
- Preserved existing filenames and image paths to avoid changing published URLs or asset references.
- The controlled migration workflow completed successfully; full Jekyll build verification remains pending.

## Future Development

Deferred until after metadata migration:

- Editorial quality review
- Voice consistency review
- Paragraph flow review
- Cornerstone article expansion
- AI-style writing review
