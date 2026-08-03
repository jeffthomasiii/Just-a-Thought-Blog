# Just A Thought Author Social API

This Cloudflare Worker generates platform-specific captions directly inside the Just A Thought Author Tool. It keeps the OpenAI API key out of the public GitHub Pages site and uses OpenAI Structured Outputs so the browser receives validated caption data without copied prompts or manual JSON handling.

## What it accepts

The Worker only accepts requests from `https://justathoughtblog.org`, only accepts Just A Thought Blog article URLs, limits supported platforms, caps request size, and applies a Cloudflare rate-limit binding.

This is cost-abuse protection, not user authentication. Because login is intentionally deferred, someone who discovers and directly calls the Worker could still consume API usage. Keep a low OpenAI project budget and usage alert in place. Add Cloudflare Access before introducing publishing, private drafts, stored history, or other privileged actions.

## Deploy

From this directory:

```bash
npm install
npx wrangler login
npx wrangler secret put OPENAI_API_KEY
npm run deploy
```

Wrangler will return a URL similar to:

```text
https://jat-author-social-api.<your-workers-subdomain>.workers.dev
```

Add that complete URL to the repository root `_config.yml`:

```yaml
author_social_api_url: "https://jat-author-social-api.<your-workers-subdomain>.workers.dev"
```

Commit the `_config.yml` change and allow GitHub Pages to rebuild.

## Local development

Create `cloudflare/author-social-api/.dev.vars`:

```text
OPENAI_API_KEY=your-key-here
```

Do not commit `.dev.vars` or any API key.

Run:

```bash
npm install
npm run dev
```

For local browser testing, temporarily change `ALLOWED_ORIGIN` in `wrangler.jsonc` to the exact local origin being used. Restore the production origin before deployment.

## Production configuration

- `OPENAI_API_KEY`: encrypted Worker secret.
- `OPENAI_MODEL`: defaults to `gpt-5-mini`.
- `ALLOWED_ORIGIN`: defaults to `https://justathoughtblog.org`.
- `CAPTION_RATE_LIMITER`: six generation requests per minute per Cloudflare location.

## Expected response

```json
{
  "captions": {
    "facebook": "...",
    "threads": "..."
  }
}
```
