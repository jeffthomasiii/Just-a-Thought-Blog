#!/usr/bin/env python3
from __future__ import annotations

import re
import subprocess
from pathlib import Path

import yaml

ROOT = Path(__file__).resolve().parents[2]
SOURCE = "origin/master"
MAPPINGS = {
    "2026-04-05-Known-&-Loved-The-Question.md": {
        "categories": ["reflection"],
        "collections": ["faith", "marriage"],
        "tags": ["love", "vulnerability", "identity", "intimacy", "relationships"],
        "scripture": ["Psalm 139:1–4"],
    },
    "2026-04-12-known-and-loved-the-illusion-of-love.md": {
        "categories": ["reflection"],
        "collections": ["faith", "marriage"],
        "tags": ["love", "perception", "identity", "vulnerability", "relationships"],
    },
    "2026-04-19-known-and-loved-the-fear-of-being-known.md": {
        "categories": ["reflection"],
        "collections": ["faith", "marriage"],
        "tags": ["vulnerability", "fear", "identity", "intimacy", "relationships"],
    },
    "2026-04-26-known-and-loved-love-in-marriage.md": {
        "categories": ["reflection"],
        "collections": ["faith", "marriage"],
        "tags": ["biblical-marriage", "intimacy", "vulnerability", "communication", "relationships"],
    },
}
ORDER = ["layout", "title", "subtitle", "description", "date", "author", "contributors", "categories", "collections", "tags", "series", "series_order", "scripture", "image", "background", "excerpt", "featured"]
STACKEDIT = re.compile(r"\n*<!--stackedit_data:.*?-->\s*$", re.DOTALL)


def source_file(name: str) -> str:
    return subprocess.check_output(["git", "show", f"{SOURCE}:_posts/{name}"], cwd=ROOT, text=True)


def split_post(text: str):
    if not text.startswith("---\n"):
        raise ValueError("Missing YAML front matter")
    _, front, body = text.split("---", 2)
    return yaml.safe_load(front) or {}, body


def migrate(name: str, mapping: dict) -> None:
    data, body = split_post(source_file(name))
    data.pop("header-image", None)
    for key in ("contributors", "scripture"):
        if data.get(key) in (None, "", []):
            data.pop(key, None)
    data.update(mapping)
    if "scripture" not in mapping and data.get("scripture") in (None, "", []):
        data.pop("scripture", None)
    normalized = {}
    for key in ORDER:
        if key in data and data[key] not in (None, "", []):
            normalized[key] = data[key]
    for key, value in data.items():
        if key not in normalized and value not in (None, "", []):
            normalized[key] = value
    body = STACKEDIT.sub("\n", body).rstrip() + "\n"
    front = yaml.safe_dump(normalized, sort_keys=False, allow_unicode=True, width=1000).rstrip()
    (ROOT / "_posts" / name).write_text(f"---\n{front}\n---\n{body}", encoding="utf-8")


def main() -> None:
    subprocess.run(["git", "fetch", "origin", "master", "--depth=1"], cwd=ROOT, check=True)
    for name, mapping in MAPPINGS.items():
        migrate(name, mapping)
    (ROOT / ".github/scripts/migrate_april_2026.py").unlink(missing_ok=True)
    (ROOT / ".github/workflows/migrate-april-2026.yml").unlink(missing_ok=True)


if __name__ == "__main__":
    main()
