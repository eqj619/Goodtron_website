# Goodtron Electronics website

Marketing site for [goodtronsmt.com](https://goodtronsmt.com). React 19 + React Router 7 + Tailwind 3, built with Vite.

The source was recovered from the live site's source maps (see the first commit on `main`); the build setup was recreated around it.

## Run locally

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build in dist/
npm run preview    # serve dist/ locally
```

## Environment variables

Put these in `.env.local` (not committed):

| Variable | Purpose |
| --- | --- |
| `REACT_APP_BACKEND_URL` | Base URL of the API (`/api/quotes`, `/api/contacts`). Production uses `https://goodtronsmt.com`. Leave unset locally so test submissions don't reach production. |
| `REACT_APP_RFQ_UPLOAD_URL` | Optional multipart endpoint that accepts RFQ fields plus `files`. Without it, the RFQ form submits JSON and asks the customer to email their files. |

## Where content lives

All marketing claims — quick-turn times, inspection and certification badges, case studies, the testimonial, the BOM & DFA offer, RFQ options — are in `src/lib/site.js`. Verify them there before publishing.

About page copy — including the Daley Chak profile and the values (AOI, X-ray, IPC-A-610) — is in `src/locales/*.json` under `about`; verify it in all three languages.

The testimonial renders only in development until `TESTIMONIAL.approved` is set to `true` for a real, approved customer quote.

## Languages

English (default), Japanese, and Simplified Chinese. The visitor's choice is saved in `localStorage` (`gt-lang`) and sets `<html lang>` to `en` / `ja` / `zh-CN`.

- Strings live in `src/locales/{en,ja,zh}.json`; components call `t("key")` from `useI18n()` (`src/i18n/index.jsx`).
- English copy that already exists in `src/lib/site.js` is passed as `defaultValue` rather than duplicated in `en.json`; `ja.json` / `zh.json` hold its translations.
- A string missing in Japanese or Chinese falls back to English; a key missing everywhere renders nothing and logs `[i18n] missing key` in development.
- Translated so far: header, footer, home hero / callout / trust bar, About page, Quote page, and the RFQ form. Other sections render in English in every language.
