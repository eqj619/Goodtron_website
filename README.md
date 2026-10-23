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

The testimonial renders only in development until `TESTIMONIAL.approved` is set to `true` for a real, approved customer quote.
