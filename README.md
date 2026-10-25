# Goodtron Electronics website

Marketing site for [goodtronsmt.com](https://goodtronsmt.com), built with [Astro](https://astro.build) as a static site. Every page is pre-rendered HTML; the only client-side JavaScript is the two forms (React islands) and a few lines for the mobile menu.

The original React SPA source was recovered from the live site's source maps (see the first commit on `main`).

## Run locally

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # static site in dist/
npm run preview    # serve dist/ locally
```

## Deploy

`dist/` is plain static files — host it anywhere (Cloudflare Pages, Netlify, S3 + CloudFront, …). Build command `npm run build`, output directory `dist`.

The forms post to the existing API at `https://goodtronsmt.com/api`, which accepts cross-origin requests, so the static site does not need to live on the same host as the API.

## Demo

`npm run deploy:demo` builds a noindex copy of the site and publishes it to
https://goodtron-demo.goodtron-website.workers.dev (Cloudflare account eiji.oga@goodtronsmt.com;
run `npx wrangler login` first). The deploy config lives in `deploy/demo/` — don't run
`wrangler` from the repo root, it rewrites the Astro config.

## Environment variables

Put these in `.env` (not committed):

| Variable | Purpose |
| --- | --- |
| `PUBLIC_BACKEND_URL` | Base URL of the API (`/api/quotes`, `/api/contacts`). Defaults to `https://goodtronsmt.com` in production builds and to the local dev server in `npm run dev`, so test submissions never reach production. |
| `PUBLIC_RFQ_UPLOAD_URL` | Optional multipart endpoint that accepts RFQ fields plus `files`. Without it, the RFQ form submits JSON and asks the customer to email their files. |

## Layout

| Path | What |
| --- | --- |
| `src/pages/[...lang]/*.astro` | One file per page; each builds `/page/`, `/ja/page/`, `/zh/page/` |
| `src/layouts/Base.astro` | `<head>` (canonical, hreflang, Open Graph), header, footer |
| `src/components/*.astro` | Static sections (header, footer, trust bar, …) |
| `src/islands/*.jsx`, `src/components/RfqForm.jsx` | Interactive forms, hydrated in the browser |
| `src/lib/site.js` | Company info and all marketing claims |
| `src/locales/{en,ja,zh}.json` | Translations |

## Where content lives

All marketing claims — quick-turn times, inspection and certification badges, the BOM & DFA offer, RFQ options — are in `src/lib/site.js`. Verify them there before publishing.

## Languages

English (default, at `/`), Japanese (`/ja/`), and Simplified Chinese (`/zh/`). Each page has `<html lang>`, canonical and `hreflang` links, and the sitemap lists the language alternates.

- Pages call `getI18n(lang)` from `src/i18n/core.js` → `t("key")`, `tl("list.key")`, `href("/path")`. React islands use `useI18n()` from `src/i18n`.
- English copy that already exists in `src/lib/site.js` is passed as `defaultValue` rather than duplicated in `en.json`; `ja.json` / `zh.json` hold its translations.
- A string missing in Japanese or Chinese falls back to English; a key missing everywhere renders nothing and logs `[i18n] missing key` in development.
- The switcher remembers the choice in `localStorage` (`gt-lang`); a returning visitor who lands on an English URL is forwarded to their language.
- Translated so far: header, footer, home hero / callout / trust bar, Services, Quote and DFA review pages, and the RFQ form. Other sections are English in every language and carry `lang="en"`.
- Keep translated text that mixes inline elements on one line in `.astro` templates — line breaks become spaces, which breaks Japanese and Chinese.

## Old URLs

`/capabilities`, `/process` → `/services/`; `/industries`, `/faq`, `/careers`, `/join-us` → `/`; `/quote-form` → `/quote/`; `/about` (removed page) → `/` (configured in `astro.config.mjs`).
