from pathlib import Path

root = Path(__file__).resolve().parents[2]
log = root / "docs" / "migration" / "migration-log.md"
text = log.read_text(encoding="utf-8")
section = '''### January 2026

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

'''
marker = "## Future Development"
if "### January 2026" not in text:
    text = text.replace(marker, section + marker)
    log.write_text(text, encoding="utf-8")
(root / ".github" / "scripts" / "update_january_2026_log.py").unlink(missing_ok=True)
(root / ".github" / "workflows" / "update-january-2026-log.yml").unlink(missing_ok=True)
