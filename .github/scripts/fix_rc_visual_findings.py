from pathlib import Path


def replace_once(path: Path, old: str, new: str) -> bool:
    text = path.read_text(encoding="utf-8")
    if new in text:
        return False
    if old not in text:
        raise RuntimeError(f"Expected text not found in {path}: {old[:80]!r}")
    path.write_text(text.replace(old, new, 1), encoding="utf-8")
    return True


def append_once(path: Path, marker: str, addition: str) -> bool:
    text = path.read_text(encoding="utf-8")
    if marker in text:
        return False
    path.write_text(text.rstrip() + "\n\n" + addition.strip() + "\n", encoding="utf-8")
    return True


def main() -> None:
    changed = []

    search = Path("assets/js/search.js")
    if replace_once(
        search,
        '    const action = document.createElement("span");\n    action.className = "jat-text-link";\n    action.setAttribute("aria-hidden", "true");\n    action.textContent = "Read Reflection →";',
        '    const action = document.createElement("a");\n    action.className = "jat-text-link";\n    action.href = doc.url;\n    action.textContent = "Read Reflection →";'
    ):
        changed.append(str(search))

    if replace_once(
        search,
        '  function safeTerms(query) {\n    return query\n      .replace(/[^\\w\\s-]/g, " ")',
        '  function safeTerms(query) {\n    return query\n      .toLocaleLowerCase()\n      .replace(/[^\\w\\s-]/g, " ")'
    ):
        changed.append(str(search))

    head = Path("_includes/head.html")
    early_theme = '''  <script>
    (function () {
      try {
        var storedTheme = localStorage.getItem('theme');
        var prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (storedTheme === 'dark' || (!storedTheme && prefersDark)) {
          document.documentElement.classList.add('dark-mode-pending');
        }
      } catch (error) {
        // Continue with the default light theme when storage is unavailable.
      }
    })();
  </script>
  <style>
    html.dark-mode-pending,
    html.dark-mode-pending body {
      background: #181914;
      color: #F6F1E7;
    }
  </style>
'''
    if replace_once(head, '  <meta name="baseurl" content="{{ site.baseurl }}">\n', '  <meta name="baseurl" content="{{ site.baseurl }}">\n\n' + early_theme):
        changed.append(str(head))

    scripts = Path("_includes/scripts.html")
    if replace_once(
        scripts,
        "      document.body.classList.toggle('dark-mode', isDark);",
        "      document.body.classList.toggle('dark-mode', isDark);\n      document.documentElement.classList.remove('dark-mode-pending');"
    ):
        changed.append(str(scripts))

    main_scss = Path("assets/main.scss")
    css = '''/* Release-candidate visual fixes */
body.dark-mode .jat-search-tools select,
body.dark-mode #category-filter,
body.dark-mode #tag-filter {
  border-color: rgba(214, 179, 107, 0.3);
  background-color: #22251d;
  color: #f6f1e7;
  color-scheme: dark;
}

body.dark-mode .jat-search-tools select option,
body.dark-mode #category-filter option,
body.dark-mode #tag-filter option {
  background-color: #22251d;
  color: #f6f1e7;
}

body.dark-mode .jat-search-tools select:focus,
body.dark-mode #category-filter:focus,
body.dark-mode #tag-filter:focus {
  border-color: #d6b36b;
  outline: none;
  box-shadow: 0 0 0 0.2rem rgba(214, 179, 107, 0.16);
}
'''
    if append_once(main_scss, "/* Release-candidate visual fixes */", css):
        changed.append(str(main_scss))

    post = Path("_posts/2025-12-22-Vision-That-Lasts.md")
    post_text = post.read_text(encoding="utf-8")
    old_asset = "/img/posts/bg-lead-like-this-vision-that-lasts.jpg"
    new_asset = "/img/posts/lead-like-this-intro.jpg"
    if old_asset in post_text:
        post.write_text(post_text.replace(old_asset, new_asset), encoding="utf-8")
        changed.append(str(post))

    print(f"Updated {len(set(changed))} files.")
    for path in sorted(set(changed)):
        print(path)


if __name__ == "__main__":
    main()
