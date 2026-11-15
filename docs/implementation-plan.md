# Stickers Corporation implementation plan

Goal: deliver a premium, honest local business site with real asset presentation and useful quotation inquiries.

Architecture: statically rendered Next.js App Router page with isolated header, portfolio, service, material and quote client components. One content module records verified information and sources. Pure quote formatting functions are independently testable. No server, database or third-party scripts.

- [x] Discover repository, skills and tools; read original business website; inventory supplied archives and logo.
- [x] Evaluate three hero concepts; establish typography, palette, grid, motion and mobile design in DESIGN.md.
- [x] Process assets with Pillow: preserve source files, detect duplicate hashes/perceptual similarities, generate WebP variants without upscaling, retain provenance and write audit.
- [x] Build static foundation, metadata, self-hosted fonts, nav and editorial hero.
- [x] Build filterable gallery and native lightbox; service discovery; real material selector.
- [x] Test quote data formatting and encoded WhatsApp URL, then implement accessible form with email fallback and explicit draft semantics.
- [x] Add concise about, direct contacts, social and Maps directions.
- [x] Production build, TypeScript, ESLint, automated journey and accessibility checks.
- [x] Inspect actual desktop, tablet, small-mobile and full-page screenshots; refine composition, crops and reachable interaction states.
- [x] Performance audit, independent finish review, handoff and deployment instructions. Public deployment awaits rights and business confirmation.

Review focus: no accidental WhatsApp sending; preserve Unicode and special characters; reject whitespace-only description; no lost form values after service navigation; keyboard modal dismissal and focus return; no hidden navigation on mobile; source image resolution and uncropped viewer; no invented project provenance; reduced motion; small-screen overflow.
