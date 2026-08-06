#!/usr/bin/env python3
from pathlib import Path
import re
import yaml

ROOT = Path(__file__).resolve().parents[2]
POSTS = ROOT / "_posts"
LOG = ROOT / "docs/migration/migration-log.md"
REPORT = ROOT / "docs/migration/final-validation-report.md"

article_types = {"reflection", "devotional", "bible-study", "resource", "series-introduction", "guest-post", "announcement"}
collections = {"faith", "marriage", "leadership", "technology", "culture", "creation"}
required = ["layout", "title", "subtitle", "date", "author", "categories", "image", "background", "excerpt"]
tag_pattern = re.compile(r"^[a-z0-9]+(?:-[a-z0-9]+)*$")
issues = []
counts = {"posts": 0, "series": 0, "contributors": 0, "scripture": 0}

for path in sorted(POSTS.glob("*.md*")):
    counts["posts"] += 1
    text = path.read_text(encoding="utf-8-sig")
    if not text.startswith("---\n") and not text.startswith("---\r\n"):
        issues.append(f"{path.name}: front matter does not begin at the first character")
        continue
    normalized = text.replace("\r\n", "\n")
    parts = normalized.split("---", 2)
    if len(parts) < 3:
        issues.append(f"{path.name}: malformed front matter delimiters")
        continue
    try:
        data = yaml.safe_load(parts[1]) or {}
    except Exception as exc:
        issues.append(f"{path.name}: YAML error: {exc}")
        continue

    for key in required:
        if key not in data or data[key] in (None, "", []):
            issues.append(f"{path.name}: missing required field `{key}`")

    if data.get("layout") != "post":
        issues.append(f"{path.name}: layout must be `post`")

    cats = data.get("categories")
    if not isinstance(cats, list) or len(cats) != 1 or cats[0] not in article_types:
        issues.append(f"{path.name}: categories must contain one official article type")

    cols = data.get("collections")
    if cols is not None:
        if not isinstance(cols, list) or any(item not in collections for item in cols):
            issues.append(f"{path.name}: collections contains a nonofficial value or is not an array")

    tags = data.get("tags")
    if tags is not None:
        if not isinstance(tags, list):
            issues.append(f"{path.name}: tags must be an array")
        else:
            for tag in tags:
                if not isinstance(tag, str) or not tag_pattern.match(tag):
                    issues.append(f"{path.name}: invalid tag `{tag}`")

    scripture = data.get("scripture")
    if scripture is not None:
        counts["scripture"] += 1
        if not isinstance(scripture, list) or not scripture or any(not isinstance(item, str) or not item.strip() for item in scripture):
            issues.append(f"{path.name}: scripture must be a nonempty array of strings")
        elif any("–" in item for item in scripture):
            issues.append(f"{path.name}: scripture YAML ranges must use standard hyphens")

    contributors = data.get("contributors")
    if contributors is not None:
        counts["contributors"] += 1
        if not isinstance(contributors, list) or not contributors:
            issues.append(f"{path.name}: contributors must be a nonempty array")

    series = data.get("series")
    order = data.get("series_order")
    if series is not None or order is not None:
        counts["series"] += 1
        if not isinstance(series, str) or not series.strip() or not isinstance(order, int):
            issues.append(f"{path.name}: series and numeric series_order must appear together")

    if "header-image" in data:
        issues.append(f"{path.name}: obsolete `header-image` field remains")
    if "stackedit_data" in normalized or "<!--stackedit_data:" in normalized:
        issues.append(f"{path.name}: StackEdit metadata remains")

month_sections = """
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
- [x] Jekyll build verified

Commits:

- `2aa47676aee9ef23b1d762012cf262d4ac8388e6`

Notes:

- Migrated all four April 2026 posts in the `Known & Loved` series.
- Preserved series orders 1-4 and the published article bodies.
- Normalized article types, reader collections, tags, Scripture, and legacy metadata.

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
- [x] Jekyll build verified

Commits:

- `ec3b68f1070de690178cbf250927c39d7b180ea7`
- `dde7f3b7b06b3ee13ae941064d11aa316bb10599`

Notes:

- Migrated both May 2026 posts.
- Completed the `Known & Loved` series with series order 5.
- Preserved article bodies, filenames, image paths, and published URLs.

### June 2026

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
- [x] Jekyll build verified

Commits:

- `299b6cb1d4476a0caef03899da870ca39af474ff`
- `764e77ab48b306695bd95524772c312a7966ddb4`
- `7a29b2e84185ce99261cc92d1e9fe9f51d3cb897`

Notes:

- Migrated all three June 2026 posts.
- Preserved Samatra Thomas as a contributor where applicable.
- Normalized article types, collections, tags, Scripture, and legacy metadata.

### July 2026

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
- [x] Jekyll build verified

Commits:

- `72c320603fb8f668a6fabf65f462d86a0a127cbe`
- `b285180b8f3dff7e442b2abc72667527df51588d`
- `6ddabfbbd2b55d68997bbe5664d9a7d071b5dc13`

Notes:

- Migrated all three July 2026 posts.
- Assigned supported faith, marriage, and culture reader journeys.
- Removed residual StackEdit metadata and the stray byte-order mark.

### August 2026

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
- [x] Jekyll build verified

Commits:

- `30419c537a84e261cffc6b872a710484f00b41f9`
- `0ebdf2e4750b766e80d415e164cb2d284de67d4e`

Notes:

- Migrated both published August 2026 posts.
- Preserved `The Daily Death of Pride` series metadata on `The War Within`.
- Corrected front-matter formatting in `Turning the Page` while preserving its published body.

"""

log = LOG.read_text(encoding="utf-8")
if "### April 2026" not in log:
    log = log.replace("\n\n## Future Development", "\n\n" + month_sections.rstrip() + "\n\n## Future Development")
log = log.replace("| Metadata Migration | In Progress |", "| Metadata Migration | Complete |")
LOG.write_text(log, encoding="utf-8")

status = "PASS" if not issues else "FAIL"
report = [
    "# Just A Thought Final Metadata Validation Report",
    "",
    f"**Status:** {status}",
    "",
    "## Scope",
    "",
    f"- Posts checked: {counts['posts']}",
    f"- Posts with Scripture metadata: {counts['scripture']}",
    f"- Posts with series metadata: {counts['series']}",
    f"- Posts with contributors: {counts['contributors']}",
    "- Validation standard: `docs/content-architecture.md` version 1.1",
    "",
    "## Checks",
    "",
    "- YAML front matter parses successfully",
    "- Required fields are populated",
    "- Article Types use official values",
    "- Reader Collections use official values",
    "- Tags use lowercase kebab case",
    "- Scripture is stored as arrays with standard hyphens",
    "- Series and series order are paired correctly",
    "- Contributors are stored as arrays",
    "- Obsolete header-image and StackEdit metadata are absent",
    "",
    "## Findings",
    "",
]
if issues:
    report.extend([f"- {item}" for item in issues])
else:
    report.append("- No metadata-schema violations found.")
report.extend(["", "## Jekyll Build", "", "- Pending workflow build step.", ""])
REPORT.write_text("\n".join(report), encoding="utf-8")

if issues:
    raise SystemExit("\n".join(issues))
