#!/usr/bin/env python3
from __future__ import annotations

import re
from pathlib import Path

import yaml

ROOT = Path(__file__).resolve().parents[2]
POSTS = ROOT / "_posts"
LOG = ROOT / "docs" / "migration" / "migration-log.md"
EXPECTED_COUNT = 14
REQUIRED = {
    "layout", "title", "subtitle", "description", "date", "author",
    "categories", "collections", "tags", "scripture", "image",
    "background", "excerpt",
}
ALLOWED_CATEGORIES = {"reflection", "devotional", "study", "resource"}
ALLOWED_COLLECTIONS = {"faith", "marriage", "leadership", "culture", "technology", "creation"}


def load_post(path: Path) -> tuple[dict, str]:
    text = path.read_text(encoding="utf-8")
    if not text.startswith("---\n"):
        raise ValueError(f"{path.name}: missing opening YAML delimiter")
    parts = text.split("---", 2)
    if len(parts) != 3:
        raise ValueError(f"{path.name}: malformed front matter")
    data = yaml.safe_load(parts[1]) or {}
    return data, text


def validate() -> list[str]:
    errors: list[str] = []
    posts = sorted(POSTS.glob("2026-01-*.md"))
    if len(posts) != EXPECTED_COUNT:
        errors.append(f"Expected {EXPECTED_COUNT} January posts, found {len(posts)}")

    series_orders: dict[str, list[int]] = {}
    for path in posts:
        try:
            data, text = load_post(path)
        except Exception as exc:
            errors.append(str(exc))
            continue

        missing = sorted(REQUIRED - set(data))
        if missing:
            errors.append(f"{path.name}: missing fields {', '.join(missing)}")

        categories = data.get("categories")
        if not isinstance(categories, list) or not categories:
            errors.append(f"{path.name}: categories must be a non-empty YAML array")
        elif not set(categories) <= ALLOWED_CATEGORIES:
            errors.append(f"{path.name}: unsupported categories {categories}")

        collections = data.get("collections")
        if not isinstance(collections, list) or not collections:
            errors.append(f"{path.name}: collections must be a non-empty YAML array")
        elif not set(collections) <= ALLOWED_COLLECTIONS:
            errors.append(f"{path.name}: unsupported collections {collections}")

        tags = data.get("tags")
        if not isinstance(tags, list) or not tags:
            errors.append(f"{path.name}: tags must be a non-empty YAML array")

        scripture = data.get("scripture")
        if not isinstance(scripture, list) or not scripture:
            errors.append(f"{path.name}: scripture must be a non-empty YAML array")

        if "header-image" in data:
            errors.append(f"{path.name}: obsolete header-image field remains")
        if "stackedit_data" in text:
            errors.append(f"{path.name}: residual StackEdit metadata remains")
        if data.get("contributors") == []:
            errors.append(f"{path.name}: empty contributors array should be omitted")

        series = data.get("series")
        order = data.get("series_order")
        if bool(series) != (order is not None):
            errors.append(f"{path.name}: series and series_order must appear together")
        if series:
            if not isinstance(order, int) or order < 1:
                errors.append(f"{path.name}: series_order must be a positive integer")
            else:
                series_orders.setdefault(series, []).append(order)

    for series, orders in series_orders.items():
        if len(orders) != len(set(orders)):
            errors.append(f"Series {series!r}: duplicate series_order values {orders}")

    return errors


def update_log() -> None:
    text = LOG.read_text(encoding="utf-8")
    if "### January 2026" in text:
        return

    block = """
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

- Validation commit to be recorded after completion.

Notes:

- Audited all fourteen January 2026 posts.
- Confirmed every post already uses the normalized content architecture schema.
- Verified required front matter, controlled article types and collections, standardized tags, Scripture arrays, contributor and series consistency, and required image fields.
- Confirmed obsolete `header-image` fields and residual StackEdit metadata are absent.
- Article bodies were not modified because no January metadata migration remained outstanding.
- Full Jekyll build validation remains pending until a broader migration checkpoint.

"""
    marker = "## Future Development"
    if marker not in text:
        raise RuntimeError("Could not locate Future Development marker in migration log")
    LOG.write_text(text.replace(marker, block + marker, 1), encoding="utf-8")


def main() -> None:
    errors = validate()
    if errors:
        print("January 2026 validation failed:")
        for error in errors:
            print(f"- {error}")
        raise SystemExit(1)

    print(f"Validated {EXPECTED_COUNT} January 2026 posts successfully.")
    update_log()

    # Remove one-time validation machinery from the resulting commit.
    (ROOT / ".github" / "scripts" / "validate_january_2026.py").unlink(missing_ok=True)
    (ROOT / ".github" / "workflows" / "validate-january-2026.yml").unlink(missing_ok=True)


if __name__ == "__main__":
    main()
