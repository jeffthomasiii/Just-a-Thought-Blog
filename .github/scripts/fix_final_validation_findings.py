from __future__ import annotations

import re
from pathlib import Path

# One-time deterministic cleanup for the final repository validation pass.
POSTS = Path("_posts")

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
    "/img/posts/bg-when-growth-feels-like-trespassing.jpg": "/img/posts/bg-post.jpg",
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
}

STACKEDIT_RE = re.compile(r"\n?<!--\s*stackedit_data:.*?-->\s*", re.IGNORECASE | re.DOTALL)
EMPTY_SCRIPTURE_RE = re.compile(r"(?m)^scripture:\s*(?:null|~|\[\]|['\"]{2})?\s*\n")


def add_subtitle_if_missing(front: str) -> str:
    if re.search(r"(?m)^subtitle:\s*\S", front):
        return front
    description = re.search(r"(?m)^description:\s*(.+)$", front)
    title = re.search(r"(?m)^title:\s*(.+)$", front)
    value = description.group(1).strip() if description else (title.group(1).strip() if title else '"A Just A Thought reflection"')
    title_match = re.search(r"(?m)^title:.*$", front)
    if not title_match:
        return front
    insert_at = title_match.end()
    return front[:insert_at] + f"\nsubtitle: {value}" + front[insert_at:]


def process(path: Path) -> bool:
    original = path.read_text(encoding="utf-8-sig")
    text = STACKEDIT_RE.sub("\n", original)
    for old, new in ASSET_REPLACEMENTS.items():
        text = text.replace(old, new)

    if text.startswith("---\n"):
        end = text.find("\n---\n", 4)
        if end != -1:
            front = text[4:end]
            body = text[end + 5 :]
            front = EMPTY_SCRIPTURE_RE.sub("", front)
            front = add_subtitle_if_missing(front)
            text = "---\n" + front.rstrip() + "\n---\n" + body.lstrip("\n")

    if text != original:
        path.write_text(text, encoding="utf-8")
        return True
    return False


def main() -> None:
    changed = []
    for path in sorted(POSTS.glob("*.md")):
        if process(path):
            changed.append(str(path))
    print(f"Updated {len(changed)} post files.")
    for item in changed:
        print(item)


if __name__ == "__main__":
    main()
