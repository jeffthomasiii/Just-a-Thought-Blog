#!/usr/bin/env python3
from __future__ import annotations

# Repository-wide validation for the completed metadata migration.
from collections import defaultdict
from pathlib import Path
import re
import sys

import yaml

ROOT = Path(__file__).resolve().parents[2]
POSTS = ROOT / "_posts"

ARTICLE_TYPES = {
    "reflection",
    "devotional",
    "bible-study",
    "resource",
    "series-introduction",
    "guest-post",
    "announcement",
}
COLLECTIONS = {"faith", "marriage", "leadership", "technology", "culture", "creation"}
REQUIRED = {
    "layout",
    "title",
    "subtitle",
    "date",
    "author",
    "categories",
    "image",
    "background",
    "excerpt",
}
TAG_RE = re.compile(r"^[a-z0-9]+(?:-[a-z0-9]+)*$")

errors: list[str] = []
warnings: list[str] = []
series_entries: dict[str, list[tuple[int, str]]] = defaultdict(list)
post_count = 0


def fail(path: Path, message: str) -> None:
    errors.append(f"{path.relative_to(ROOT)}: {message}")


def parse_post(path: Path) -> dict:
    text = path.read_text(encoding="utf-8-sig")
    if not text.startswith("---"):
        fail(path, "missing opening YAML delimiter")
        return {}
    parts = text.split("---", 2)
    if len(parts) < 3:
        fail(path, "missing closing YAML delimiter")
        return {}
    try:
        data = yaml.safe_load(parts[1]) or {}
    except yaml.YAMLError as exc:
        fail(path, f"invalid YAML: {exc}")
        return {}
    if not isinstance(data, dict):
        fail(path, "front matter must be a YAML mapping")
        return {}
    if "stackedit_data" in text.lower():
        fail(path, "residual StackEdit metadata found")
    return data


for path in sorted(POSTS.glob("*.md*")):
    post_count += 1
    data = parse_post(path)
    if not data:
        continue

    missing = sorted(key for key in REQUIRED if key not in data or data[key] in (None, "", []))
    if missing:
        fail(path, f"missing required field(s): {', '.join(missing)}")

    if data.get("layout") != "post":
        fail(path, "layout must be 'post'")

    categories = data.get("categories")
    if not isinstance(categories, list) or len(categories) != 1:
        fail(path, "categories must be a one-item YAML array")
    elif categories[0] not in ARTICLE_TYPES:
        fail(path, f"unsupported article type: {categories[0]!r}")

    collections = data.get("collections")
    if collections is not None:
        if not isinstance(collections, list) or not collections:
            fail(path, "collections must be a non-empty YAML array when present")
        else:
            invalid = [value for value in collections if value not in COLLECTIONS]
            if invalid:
                fail(path, f"unsupported collection value(s): {invalid}")
            if len(collections) != len(set(collections)):
                fail(path, "collections contains duplicate values")

    tags = data.get("tags")
    if tags is not None:
        if not isinstance(tags, list) or not tags:
            fail(path, "tags must be a non-empty YAML array when present")
        else:
            invalid_tags = [tag for tag in tags if not isinstance(tag, str) or not TAG_RE.fullmatch(tag)]
            if invalid_tags:
                fail(path, f"tags must use lowercase kebab case: {invalid_tags}")
            if len(tags) != len(set(tags)):
                fail(path, "tags contains duplicate values")

    scripture = data.get("scripture")
    if scripture is not None:
        if not isinstance(scripture, list) or not scripture:
            fail(path, "scripture must be a non-empty YAML array when present")
        elif any(not isinstance(item, str) or not item.strip() for item in scripture):
            fail(path, "scripture entries must be non-empty strings")

    contributors = data.get("contributors")
    if contributors is not None:
        if not isinstance(contributors, list) or not contributors:
            fail(path, "contributors must be a non-empty YAML array when present")

    series = data.get("series")
    order = data.get("series_order")
    if (series is None) != (order is None):
        fail(path, "series and series_order must appear together")
    elif series is not None:
        if not isinstance(series, str) or not series.strip():
            fail(path, "series must be a non-empty string")
        if not isinstance(order, int) or isinstance(order, bool) or order < 0:
            fail(path, "series_order must be a non-negative integer")
        else:
            series_entries[series].append((order, path.name))

    for field in ("image", "background"):
        value = data.get(field)
        if isinstance(value, str) and value.startswith("/"):
            asset = ROOT / value.lstrip("/")
            if not asset.is_file():
                fail(path, f"{field} asset does not exist: {value}")
        elif value not in (None, ""):
            fail(path, f"{field} must be a root-relative path")

for series, entries in sorted(series_entries.items()):
    orders = [order for order, _ in entries]
    duplicates = sorted({order for order in orders if orders.count(order) > 1})
    if duplicates:
        files = ", ".join(name for _, name in entries)
        errors.append(f"series {series!r}: duplicate series_order values {duplicates} across {files}")
    if len(entries) > 1:
        expected_start = 0 if 0 in orders else 1
        expected = list(range(expected_start, max(orders) + 1))
        if sorted(orders) != expected:
            errors.append(f"series {series!r}: non-contiguous order {sorted(orders)}; expected {expected}")

print(f"Validated {post_count} post files.")
print(f"Validated {len(series_entries)} named series.")

if warnings:
    print("\nWarnings:")
    for item in warnings:
        print(f"- {item}")

if errors:
    print(f"\nValidation failed with {len(errors)} error(s):")
    for item in errors:
        print(f"- {item}")
    sys.exit(1)

print("Metadata, taxonomy, image paths, and series ordering passed validation.")
