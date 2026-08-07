from __future__ import annotations

import json
import re
from pathlib import Path

POSTS = Path("_posts")
LIST_KEYS = {"categories", "collections", "tags", "contributors"}
KEY_RE = re.compile(r"^([A-Za-z_][A-Za-z0-9_-]*):(?:\s*(.*))?$")
ITEM_RE = re.compile(r"^\s*-\s*(.*?)\s*$")
STACKEDIT_RE = re.compile(r"\n?<!--\s*stackedit_data:.*?-->\s*", re.IGNORECASE | re.DOTALL)
SCRIPTURE_RE = re.compile(r"^(?:[1-3]\s+)?[A-Z][A-Za-z]+(?:\s+(?:of\s+)?[A-Z][A-Za-z]+)*\s+\d", re.UNICODE)

ASSET_REPLACEMENTS = {
    "/img/posts/intro-blog-post-candle-scenedefault-og.jpg": "/img/posts/intro-blog-post-candle-scene.jpg",
    "/img/posts/bg-clothed-in-strength.jpg": "/img/posts/clothed-in-strength.jpg",
    "/img/posts/bg-marriage-is-ministry.jpg": "/img/posts/marriage-is-ministry.jpg",
    "/img/posts/bg-speak-life-over-them.jpg": "/img/posts/speak-life-over-them.jpg",
    "/img/posts/bg-speak-life-over-her.jpg": "/img/posts/speak-life-over-her.jpg",
    "/img/posts/bg-speak-life-over-him.jpg": "/img/posts/speak-life-over-him.jpg",
    "/img/posts/bg-thinking-out-loud.jpg": "/img/posts/thinking-out-loud.jpg",
    "/img/posts/hearing-my-words-out-loud.png": "/img/posts/bg-hearing-my-words-out-loud.png",
    "/img/posts/bg-when-silence-isnt-submission.jpg": "/img/posts/when-silence-isnt-submission.jpg",
    "/img/posts/bg-spiritual-sweat.jpg": "/img/posts/spiritual-sweat.jpg",
    "/img/posts/bg-between-pines-and-shorelines.jpg": "/img/posts/between-pines-and-shorelines.jpg",
    "/img/posts/big-words-small-impact.jpg": "/img/posts/bg-say-it-so-they-hear-you.jpg",
    "/img/posts/villain-in-us-all.jpg": "/img/posts/bg-villain-in-us-all.jpg",
    "/img/posts/conspiracy-and-trust.jpg": "/img/posts/bg-conspiracy-and-trust.jpg",
    "/img/posts/god-has-no-favorites.jpg": "/img/posts/bg-god-has-no-favorites.jpg",
    "/img/posts/the-woman-you-gave-me.jpg": "/img/posts/bg-the-woman-you-gave-me.jpg",
    "/img/posts/progress-not-perfection.jpg": "/img/posts/bg-progress-not-perfection.jpg",
    "/img/posts/energize-love-and-respect.jpg": "/img/posts/default-og.jpg",
    "/img/posts/bg-energize-love-and-respect.jpg": "/img/posts/default-og.jpg",
    "/img/posts/thinking-christianly.jpg": "/img/thinking-christianly.jpg",
    "/img/posts/bg-thinking-christianly.jpg": "/img/bg-thinking-christianly.jpg",
    "/img/posts/lead-like-this-serve-not-control.jpg": "/img/posts/bg-lead-like-this-serve-not-control.jpg",
    "/img/posts/lead-like-this-humble-not-hidden.jpg": "/img/posts/bg-lead-like-this-humble-not-hidden.jpg",
    "/img/posts/lead-like-this-listening-leader.jpg": "/img/posts/bg-lead-like-this-listening-leader.jpg",
    "/img/posts/lead-like-this-fruit-not-fire.jpg": "/img/posts/bg-lead-like-this-fruit-not-fire.jpg",
    "/img/posts/lead-like-this-vision-that-lasts.jpg": "/img/posts/bg-lead-like-this-vision-that-lasts.jpg",
    "/img/posts/lead-like-this-letting-go.jpg": "/img/posts/bg-lead-like-this-letting-go.jpg",
    "/img/posts/eths-letting-go.jpg": "/img/posts/bg-lead-like-this-letting-go.jpg",
    "/img/posts/lead-like-this-leader-god-trusts.jpg": "/img/posts/bg-lead-like-this-leader-god-trusts.jpg",
    "/img/posts/-lead-like-this-leader-god-trusts.jpg": "/img/posts/bg-lead-like-this-leader-god-trusts.jpg",
    "/img/posts/lead-like-this-closing-reflection.jpg": "/img/posts/bg-lead-like-this-closing-reflection.jpg",
    "/img/posts/when-growth-feels-like-trespassing.jpg": "/img/posts/default-og.jpg",
    "/img/posts/bg-when-growth-feels-like-trespassing.jpg": "/img/bg-post.jpg",
    "/img/posts/the-god-who-sees-the-hidden-work.jpg": "/img/posts/header-the-god-who-sees-the-hidden-work.jpg",
    "/img/posts/the-quiet-replacement.jpg": "/img/posts/header-the-quiet-replacement.jpg",
    "/img/posts/the-paradox-of-pain.jpg": "/img/posts/bg-the-paradox-of-pain.jpg",
    "/img/posts/the-servant-not-the-shepherd.jpg": "/img/posts/header-the-servant-not-the-shepherd.jpg",
    "/img/posts/bg-when-the-accuser-speaks.jpg": "/img/posts/bg-when-the-accuser-speaks-hero.jpg",
    "/img/posts/modern-tools-ancient-mission.jpg": "/img/posts/header-modern-tools-ancient-mission.jpg",
    "/img/posts/ai-and-the-great-commission.jpg": "/img/posts/header-ai-and-the-great-commission.jpg",
    "/img/posts/the-illusion-of-love.jpg": "/img/posts/bg-the-illusion-of-love.jpg",
    "/img/posts/the-fear-of-being-known.jpg": "/img/posts/bg-the-fear-of-being-known.jpg",
    "/img/posts/love-in-marriage.jpg": "/img/posts/bg-love-in-marriage.jpg",
    "/img/posts/fully-known-fully-loved.jpg": "/img/posts/bg-fully-known-fully-loved.jpg",
    "/img/posts/bg-post.jpg": "/img/bg-post.jpg",
}


def clean_value(value: str) -> str:
    value = value.strip()
    if len(value) >= 2 and value[0] == value[-1] and value[0] in "\"'":
        return value[1:-1]
    return value


def is_scripture(value: str) -> bool:
    return bool(SCRIPTURE_RE.match(clean_value(value)))


def repair_front_matter(front: str) -> str:
    lines = front.splitlines()
    output: list[str] = []
    scriptures: list[str] = []
    current_key: str | None = None

    for line in lines:
        key_match = KEY_RE.match(line)
        if key_match:
            key = key_match.group(1)
            value = (key_match.group(2) or "").strip()
            current_key = key

            if key == "scripture":
                if value and clean_value(value).lower() not in {"null", "~", "[]", ""}:
                    scriptures.append(clean_value(value))
                continue

            if key in {"image", "background"} and " - " in value:
                parts = value.split(" - ")
                asset = parts[0].rstrip()
                refs = [part.strip() for part in parts[1:] if is_scripture(part.strip())]
                if refs:
                    value = asset
                    scriptures.extend(clean_value(ref) for ref in refs)
                    line = f"{key}: {value}"

            output.append(line)
            continue

        item_match = ITEM_RE.match(line)
        if item_match:
            item = clean_value(item_match.group(1))
            if current_key == "scripture":
                scriptures.append(item)
            elif current_key == "tags" and is_scripture(item):
                scriptures.append(item)
            elif current_key in LIST_KEYS:
                output.append(line)
            else:
                scriptures.append(item)
            continue

        output.append(line)

    unique_refs: list[str] = []
    for ref in scriptures:
        ref = ref.strip()
        if ref and ref not in unique_refs:
            unique_refs.append(ref)

    if unique_refs:
        scripture_lines = ["scripture:"] + [f"  - {json.dumps(ref, ensure_ascii=False)}" for ref in unique_refs]
        insert_at = next((i for i, line in enumerate(output) if line.startswith("excerpt:")), len(output))
        output[insert_at:insert_at] = scripture_lines

    return "\n".join(output).rstrip()


def process(path: Path) -> bool:
    original = path.read_text(encoding="utf-8-sig")
    text = STACKEDIT_RE.sub("\n", original)
    for old, new in ASSET_REPLACEMENTS.items():
        text = text.replace(old, new)

    if text.startswith("---\n"):
        end = text.find("\n---\n", 4)
        if end != -1:
            front = repair_front_matter(text[4:end])
            body = text[end + 5 :].lstrip("\n")
            text = f"---\n{front}\n---\n{body}"

    if text != original:
        path.write_text(text, encoding="utf-8")
        return True
    return False


def main() -> None:
    changed = [str(path) for path in sorted(POSTS.glob("*.md")) if process(path)]
    print(f"Updated {len(changed)} post files.")
    for item in changed:
        print(item)


if __name__ == "__main__":
    main()
