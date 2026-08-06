#!/usr/bin/env python3
from __future__ import annotations

import re
import subprocess
from pathlib import Path

import yaml

ROOT = Path(__file__).resolve().parents[2]
SOURCE = "origin/master"

COLLECTIONS = {
    "2026-01-02-Sometimes-Failure-Isnt-the-Worst-Outcome.md": ["faith", "leadership"],
    "2026-01-05-light-shines-through-the-clouds.md": ["faith", "culture"],
    "2026-01-07-when-light-feels-like-a-mirror.md": ["faith", "culture"],
    "2026-01-09-standing-ready-for-quiet-battles.md": ["faith", "leadership"],
    "2026-01-12-The-Quiet-Weight-of-Integrity.md": ["faith", "leadership"],
    "2026-01-14-truthing-in-love.md": ["faith", "culture"],
    "2026-01-16-the-problem-of-complaining.md": ["faith", "culture"],
    "2026-01-19-The-Poison-We-Keep-Drinking.md": ["faith", "culture"],
    "2026-01-21-what-marriage-is-for.md": ["faith", "marriage"],
    "2026-01-23-when-the-vineyard-exposes-my-math.md": ["faith"],
    "2026-01-25-marriage-teaches-us-how-to-love-other-people.md": ["faith", "marriage"],
    "2026-01-27-when-growth-feels-like-trespassing.md": ["faith", "leadership"],
    "2026-01-29-marriage-as-a-picture-of-christ-and-the-church.md": ["faith", "marriage"],
    "2026-01-31-where-i-stand.md": ["faith", "culture"],
}

TAG_OVERRIDES = {
    "2026-01-02-Sometimes-Failure-Isnt-the-Worst-Outcome.md": ["discernment", "failure", "trust", "spiritual-growth", "obedience"],
    "2026-01-05-light-shines-through-the-clouds.md": ["light", "darkness", "courage", "faithfulness", "christian-living"],
    "2026-01-07-when-light-feels-like-a-mirror.md": ["light-of-the-world", "spiritual-growth", "holiness", "conviction", "christian-witness"],
    "2026-01-09-standing-ready-for-quiet-battles.md": ["spiritual-warfare", "readiness", "faithfulness", "discernment", "perseverance"],
    "2026-01-12-The-Quiet-Weight-of-Integrity.md": ["integrity", "character", "leadership", "faithfulness", "accountability"],
    "2026-01-14-truthing-in-love.md": ["truth-in-love", "communication", "grace", "discernment", "christian-living"],
    "2026-01-16-the-problem-of-complaining.md": ["complaining", "gratitude", "contentment", "speech", "spiritual-growth"],
    "2026-01-19-The-Poison-We-Keep-Drinking.md": ["offense", "forgiveness", "bitterness", "healing", "spiritual-growth"],
    "2026-01-21-what-marriage-is-for.md": ["biblical-marriage", "sanctification", "spiritual-formation", "faithfulness", "covenant"],
    "2026-01-23-when-the-vineyard-exposes-my-math.md": ["grace", "fairness", "comparison", "kingdom-of-god", "humility"],
    "2026-01-25-marriage-teaches-us-how-to-love-other-people.md": ["biblical-marriage", "love", "spiritual-formation", "relationships", "grace"],
    "2026-01-27-when-growth-feels-like-trespassing.md": ["growth", "change", "boundaries", "courage", "spiritual-formation"],
    "2026-01-29-marriage-as-a-picture-of-christ-and-the-church.md": ["biblical-marriage", "gospel", "covenant", "christ-and-the-church", "sacrificial-love"],
    "2026-01-31-where-i-stand.md": ["conviction", "faith", "culture", "discernment", "christian-witness"],
}

ORDER = [
    "layout", "title", "subtitle", "description", "date", "author", "contributors",
    "categories", "collections", "tags", "series", "series_order", "scripture",
    "image", "background", "excerpt", "featured",
]
STACKEDIT_RE = re.compile(r"\n*<!--stackedit_data:.*?-->\s*$", re.DOTALL)
TRANSLATION_RE = re.compile(r"\s+(?:ESV|NIV|KJV|NKJV|CSB|LSB|NASB|NLT)$", re.I)


def source_file(filename: str) -> str:
    return subprocess.check_output(["git", "show", f"{SOURCE}:_posts/{filename}"], cwd=ROOT, text=True)


def split_post(text: str) -> tuple[dict, str]:
    if not text.startswith("---\n"):
        raise ValueError("Post does not start with YAML front matter")
    _, front, body = text.split("---", 2)
    return yaml.safe_load(front) or {}, body


def normalize_scripture(value) -> list[str]:
    if not value:
        return []
    if isinstance(value, list):
        parts = value
    else:
        parts = re.split(r"\s*;\s*|\s*,\s*(?=[1-3]?\s*[A-Z][a-z]+\s+\d)", str(value))
    result = []
    for part in parts:
        item = str(part).strip()
        item = re.sub(r"\s+[–—-]\s+.*$", "", item)
        item = TRANSLATION_RE.sub("", item).strip()
        if item and item not in result:
            result.append(item)
    return result


def ordered(data: dict) -> dict:
    result = {}
    for key in ORDER:
        if key in data and data[key] not in (None, "", []):
            result[key] = data[key]
    for key, value in data.items():
        if key not in result and value not in (None, "", []):
            result[key] = value
    return result


def migrate(filename: str) -> None:
    data, body = split_post(source_file(filename))
    data.pop("header-image", None)
    if data.get("contributors") == []:
        data.pop("contributors", None)
    if data.get("subtitle") == "":
        data.pop("subtitle", None)
    data["date"] = filename[:10]
    data["categories"] = ["reflection"]
    data["collections"] = COLLECTIONS[filename]
    data["tags"] = TAG_OVERRIDES[filename]
    scripture = normalize_scripture(data.get("scripture"))
    if scripture:
        data["scripture"] = scripture
    else:
        data.pop("scripture", None)
    body = STACKEDIT_RE.sub("\n", body).rstrip() + "\n"
    front = yaml.safe_dump(ordered(data), sort_keys=False, allow_unicode=True, width=1000).rstrip()
    (ROOT / "_posts" / filename).write_text(f"---\n{front}\n---\n{body}", encoding="utf-8")


def main() -> None:
    subprocess.run(["git", "fetch", "origin", "master", "--depth=1"], cwd=ROOT, check=True)
    for filename in COLLECTIONS:
        migrate(filename)
    (ROOT / ".github" / "scripts" / "migrate_january_2026.py").unlink(missing_ok=True)
    (ROOT / ".github" / "workflows" / "migrate-january-2026.yml").unlink(missing_ok=True)


if __name__ == "__main__":
    main()
