#!/usr/bin/env python3
from __future__ import annotations

import re
import subprocess
from pathlib import Path

import yaml

ROOT = Path(__file__).resolve().parents[2]
BRANCH_SOURCE = "origin/master"

MAPPINGS = {
    "2025-09-01-the-woman-you-gave-me.md": {
        "categories": ["reflection"],
        "collections": ["faith", "marriage", "leadership"],
        "tags": ["responsibility", "biblical-marriage", "husbands", "servant-leadership", "accountability"],
        "scripture": ["Genesis 3:12", "Ephesians 5:25"],
    },
    "2025-09-02-progress-not-perfection.md": {
        "categories": ["reflection"],
        "collections": ["faith", "technology", "leadership"],
        "tags": ["grace", "spiritual-growth", "bim", "faithfulness", "continuous-improvement"],
        "scripture": ["Philippians 1:6"],
    },
    "2025-09-04-you-him-and-i.md": {
        "categories": ["reflection"],
        "collections": ["faith", "marriage"],
        "tags": ["biblical-marriage", "god-centered-marriage", "covenant", "christ-and-the-church", "spiritual-unity"],
        "scripture": ["Genesis 2:24", "1 John 4:8", "Ephesians 5:32", "Ecclesiastes 4:12"],
    },
    "2025-09-06-he-said-she-said-and-what-god-said.md": {
        "categories": ["reflection"],
        "collections": ["faith", "marriage"],
        "tags": ["communication", "biblical-marriage", "listening", "relationships", "conflict-resolution"],
        "scripture": ["James 1:19", "Ephesians 4:29", "Proverbs 18:21", "John 1:14"],
    },
    "2025-09-08-When-Listening-Matters-Most.md": {
        "categories": ["reflection"],
        "collections": ["faith", "marriage", "leadership"],
        "tags": ["listening", "communication", "biblical-marriage", "love", "servant-leadership"],
        "scripture": ["James 1:19"],
    },
    "2025-09-10-the-space-between.md": {
        "categories": ["reflection"],
        "collections": ["faith", "marriage", "creation"],
        "tags": ["grace", "spiritual-formation", "perseverance", "sanctification", "hiking"],
        "scripture": ["Hebrews 12:2", "Philippians 3:14", "Ephesians 2:8"],
    },
    "2025-09-12-when-your-heart-talks-back.md": {
        "categories": ["reflection"],
        "collections": ["faith", "culture"],
        "tags": ["proverbs-4-23", "heart-brain-connection", "spiritual-growth", "neuroscience", "discernment"],
        "scripture": ["Proverbs 4:23"],
    },
    "2025-09-15-the-cycle-we-dont-see-until-were-in-it.md": {
        "categories": ["reflection"],
        "collections": ["faith", "marriage"],
        "tags": ["love-and-respect", "biblical-marriage", "conflict-cycles", "grace", "relationships"],
        "scripture": ["Ephesians 4:26–27"],
    },
    "2025-09-17-how-to-energize-the-love-and-respect-you-already-have.md": {
        "categories": ["reflection"],
        "collections": ["faith", "marriage"],
        "tags": ["love-and-respect", "biblical-marriage", "gratitude", "listening", "spiritual-intimacy"],
        "scripture": ["Ephesians 5:33"],
    },
    "2025-09-19-from-backyard-to-backroads.md": {
        "categories": ["reflection"],
        "collections": ["creation", "marriage"],
        "tags": ["camping", "adventure", "biblical-marriage", "growth", "outdoor-life"],
        "scripture": ["Ecclesiastes 3:1"],
    },
    "2025-09-22-When-Hustle-Costs-Too-Much.md": {
        "categories": ["reflection"],
        "collections": ["faith", "culture", "leadership"],
        "tags": ["hustle-culture", "rest", "wisdom", "success", "stewardship"],
        "scripture": ["Proverbs 23:4", "Luke 5:16", "Matthew 25:23"],
    },
    "2025-09-24-wrestling-with-god.md": {
        "categories": ["reflection"],
        "collections": ["faith"],
        "tags": ["jacob", "struggle", "blessing", "spiritual-formation", "surrender"],
        "scripture": ["Genesis 32:22–32"],
    },
    "2025-09-26-10-Skills-Every-Man-Should-Have.md": {
        "categories": ["reflection"],
        "collections": ["faith", "leadership"],
        "tags": ["manhood", "life-skills", "responsibility", "character", "mentorship"],
        "scripture": ["Proverbs 16:32", "2 Timothy 2:2"],
    },
    "2025-09-29-leading-where-it-matters-most.md": {
        "categories": ["reflection"],
        "collections": ["faith", "marriage", "leadership"],
        "tags": ["servant-leadership", "biblical-marriage", "integrity", "humility", "accountability"],
        "scripture": ["1 Timothy 3:4–5", "Proverbs 29:18", "Joshua 24:15", "Proverbs 20:7", "Ephesians 5:25", "Joshua 1:9", "James 1:19", "Hebrews 13:17"],
    },
}

ORDER = [
    "layout", "title", "subtitle", "description", "date", "author", "contributors",
    "categories", "collections", "tags", "series", "series_order", "scripture",
    "image", "background", "excerpt", "featured",
]

STACKEDIT_RE = re.compile(r"\n*<!--stackedit_data:.*?-->\s*$", re.DOTALL)


def source_file(path: str) -> str:
    return subprocess.check_output(
        ["git", "show", f"{BRANCH_SOURCE}:_posts/{path}"], cwd=ROOT, text=True
    )


def split_post(text: str) -> tuple[dict, str]:
    if not text.startswith("---\n"):
        raise ValueError("Post does not start with YAML front matter")
    _, front, body = text.split("---", 2)
    data = yaml.safe_load(front) or {}
    return data, body


def ordered_metadata(data: dict, mapping: dict) -> dict:
    data.pop("header-image", None)
    if data.get("contributors") == []:
        data.pop("contributors", None)
    data.update(mapping)
    result = {}
    for key in ORDER:
        if key in data and data[key] not in (None, "", []):
            result[key] = data[key]
    for key, value in data.items():
        if key not in result and value not in (None, "", []):
            result[key] = value
    return result


def migrate(filename: str, mapping: dict) -> None:
    original = source_file(filename)
    data, body = split_post(original)
    body = STACKEDIT_RE.sub("\n", body).rstrip() + "\n"
    metadata = ordered_metadata(data, mapping)
    front = yaml.safe_dump(
        metadata,
        sort_keys=False,
        allow_unicode=True,
        width=1000,
        default_flow_style=False,
    ).rstrip()
    destination = ROOT / "_posts" / filename
    destination.write_text(f"---\n{front}\n---\n{body}", encoding="utf-8")


def main() -> None:
    subprocess.run(["git", "fetch", "origin", "master", "--depth=1"], cwd=ROOT, check=True)
    for filename, mapping in MAPPINGS.items():
        migrate(filename, mapping)

    # Remove this one-time migration machinery from the resulting commit.
    (ROOT / ".github" / "scripts" / "migrate_september_2025.py").unlink(missing_ok=True)
    (ROOT / ".github" / "workflows" / "migrate-september-2025.yml").unlink(missing_ok=True)


if __name__ == "__main__":
    main()
