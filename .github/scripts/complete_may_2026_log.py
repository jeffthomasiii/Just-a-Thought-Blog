from pathlib import Path

root = Path(__file__).resolve().parents[2]
log_path = root / "docs/migration/migration-log.md"
text = log_path.read_text(encoding="utf-8")
marker = "\n\n## Future Development"

sections = r'''

### April 2026

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

- `2aa47676aee9ef23b1d762012cf262d4ac8388e6`

Notes:

- Audited and migrated all four April 2026 posts.
- Normalized the first four installments of `Known & Loved`, preserving series orders 1–4.
- Assigned the `reflection` article type and supported `faith` and `marriage` reader journeys.
- Standardized tags, converted the populated Scripture field to a YAML array, and removed residual StackEdit metadata and the stray closing comment marker.
- Restored published article bodies from `master` and preserved filenames and image paths.
- Full Jekyll build verification remains pending.

### May 2026

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

- `ec3b68f1070de690178cbf250927c39d7b180ea7`
- `dde7f3b7b06b3ee13ae941064d11aa316bb10599`

Notes:

- Audited and migrated both May 2026 posts.
- Completed the `Known & Loved` series with series order 5.
- Normalized `Strong Enough to Be Gentle: The Lie of the Lone Wolf` as a reflection in the `faith`, `leadership`, and `marriage` reader journeys.
- Standardized tags, split combined Scripture metadata into YAML array entries, and removed residual StackEdit metadata.
- Preserved published article bodies, filenames, image paths, and URLs.
- Full Jekyll build verification remains pending.
'''

if "### May 2026" not in text:
    if marker not in text:
        raise RuntimeError("Future Development marker not found")
    text = text.replace(marker, sections + marker, 1)
    log_path.write_text(text, encoding="utf-8")

(root / ".github/scripts/complete_may_2026_log.py").unlink(missing_ok=True)
(root / ".github/workflows/complete-may-2026-log.yml").unlink(missing_ok=True)
