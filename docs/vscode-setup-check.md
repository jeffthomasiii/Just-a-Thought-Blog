# VS Code Setup Check

This document records the confirmed local development setup for Just A Thought Blog.

## Verified Tools

The project uses:

- VS Code
- Git
- Ruby
- Bundler
- Jekyll
- Node.js and npm where required by supporting tools

## Local Preview

Install Ruby dependencies when needed:

```bash
bundle install
```

Run:

```bash
bundle exec jekyll serve --force_polling
```

Then open:

```text
http://localhost:4000
```

The current `_config.yml` uses an empty `baseurl` for the custom root domain. The former local path at `/Just-a-Thought-Blog/` applies only to older repository configurations.