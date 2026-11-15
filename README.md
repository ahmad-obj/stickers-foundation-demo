# Stickers Corporation

A local client acquisition demo for Weberaise. Editorial print-studio art direction: bold condensed type, warm paper, signal yellow, and the real business photo collection.

## Run

Node.js 22+ and pnpm 11.20+:

```sh
pnpm install --frozen-lockfile
pnpm dev
```

Open http://localhost:3000. For the production export:

```sh
pnpm build
pnpm start
```

`pnpm preview` serves the same `out/` export at http://localhost:3001. No database, server functions, API keys or accounts are needed.

## Features

- Responsive navigation, service index and direct location access.
- Category-filtered photo gallery, expanded collection and keyboard-accessible native photo viewer with source links.
- Six service families with accurate explanations and inquiry actions.
- Real vinyl sample browser with keyboard-operated tabs.
- Quote builder: description, service, dimensions, quantity, finish, timing and name; editable preview; structured WhatsApp draft; email alternative. Service links preserve entered project details.
- Clickable phones, email, social profiles and exact-place Google Maps directions.
- Reduced-motion support, visible keyboard focus, semantic structure, local fonts, responsive optimized imagery, metadata and factual local business JSON-LD.

## Configuration and confirmation

Copy `.env.example` to `.env.local` if changing defaults. Rebuild after changing public environment variables.

`NEXT_PUBLIC_WHATSAPP_NUMBER` defaults to `923455130004`, the first mobile published by the business. Its WhatsApp registration has **not** been independently verified. Confirm the correct number with the owner. Use international digits only. The site prepares a draft; nothing sends automatically. Customers attach artwork in WhatsApp, and prices/availability are discussed with the shop.

`NEXT_PUBLIC_SITE_URL` must be the final HTTPS origin for correct social share metadata. `NEXT_PUBLIC_INDEXABLE` defaults to false; the demo has noindex/nofollow metadata and disallows crawling. Set it to true only when approved for public production.

Before public deployment, obtain commercial image reuse permission, confirm approval of the supplied recreated transparent logo, and have the business confirm its contact details and service descriptions. No opening hours, prices, testimonials or project ownership claims have been invented. Source and attribution documentation: [asset audit](docs/asset-audit.md), `docs/asset-manifest.json`, and `assets/originals/google-maps/sources_and_attribution.*`.

## Deploy

Build and upload the **contents of `out/`** to any static host. It includes HTML, fonts, optimized images and bundled scripts. Keep the directory structure. Configure a real 404 response for unknown paths; this is a statically exported Next.js site, not an SPA requiring every URL to rewrite to index.html.

The `_headers` file supplies caching/security headers on Netlify and Cloudflare Pages. On other hosts configure equivalent headers: immutable one-year caching for hashed `/_next/static/` files and one-day/revalidation caching for `/images/`. HTTPS is required for a public production site. The repository has not been publicly deployed.

## Checks and screenshots

```sh
pnpm test
pnpm lint
pnpm typecheck
pnpm build
# With the exported site running at :3001:
TEST_BASE_URL=http://localhost:3001 pnpm test:e2e
node scripts/capture-review.mjs
```

Browser tests use the system Chromium at `/usr/bin/chromium`; set `CHROMIUM_PATH` to another installation, or adjust `playwright.config.ts` to use Playwright's downloaded Chromium. The test suite intercepts WhatsApp opening and never sends a message.

Screenshot evidence is in `.impeccable/review/`. The capture script uses Pillow to join real viewport screenshots for very tall mobile pages, avoiding a Chromium capture defect. Lighthouse mobile report is in `docs/lighthouse-mobile.json`; lab scores are local measurements, not field performance guarantees. The SEO score is intentionally reduced by the demo's indexing restriction. Test summary and limitations are recorded in `docs/verification.md`.

Regenerate photo variants with `python scripts/process-assets.py` (Pillow required). Original images are preserved outside `public/`. Font licenses are beside the fonts. To regenerate the social card, run `node scripts/capture-social.mjs` with a local preview running, then rebuild.

## Skills and tools used

Design Taste Frontend, Frontend UI Engineering, Impeccable, Font Pairing, Motion Design, brainstorming/planning and verification workflows, systematic debugging, React best-practices review, and Sites guidance for local/static work. Tooling: Next.js/React/TypeScript, native CSS animation/dialog, Phosphor icons, Pillow, Context7 and local Next.js docs, web research, Playwright with system Chromium, axe-core and Lighthouse. No stock or generated project photography, WebGL, animation framework, backend or tracking scripts.
