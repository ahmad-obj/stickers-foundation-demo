# Verification / 15 November 2026

Current composition/motion refinement evidence is in [verification-v1.1.md](verification-v1.1.md). The checks below describe the preceding approved implementation.

The completed local implementation is a static Next.js export. Production output is in `out/`; the development source is in `src/`.

| Check | Evidence / result |
| --- | --- |
| Production build | `next build` passed; static homepage, not-found page and robots.txt generated. |
| TypeScript | `tsc --noEmit` passed. |
| ESLint | `eslint .` passed. |
| Quotation unit tests | 5 passed: full requirements, Unicode, punctuation/newlines, optional unknown values, whitespace validation and destination validation. |
| Production browser journeys | 10 passed against the exported site with Playwright and system Chromium. |
| Automated accessibility | axe WCAG 2/2.1 A/AA checks passed at desktop and mobile sizes and with the photo viewer open. This is automated evidence, not a claim of complete WCAG certification. |
| Responsive checks | No horizontal overflow at 320, 360, 390, 768, 1024, 1440 and 1920px. |
| Image loading | All gallery/sample images load; source variants never exceed original resolution. |
| Browser errors | No page/console errors in the tested production journeys. |
| Reduced motion | Hero animation disabled under the browser's reduced-motion preference. |
| Visual audit | Desktop1440, tablet768, mobile390, small mobile360; hero and full-page captures plus gallery filter, viewer, material tab, quote preview, mobile menu and keyboard focus state inspected. |
| Design detector | One manual Impeccable scan returned an empty finding list. |
| Lockfile | Frozen pnpm lockfile-only verification passed. |
| Independent review | Full visual/code review, correction of one keyboard handoff finding, and a `ship` verdict pass for that resolved finding. Details in `design-review.md`. |

## Customer journeys

Vehicle customer: filter to the scooter, enlarge, dismiss with Escape and restore focus, reopen and request the relevant service. Restaurant: signage selection, blank-description validation, dimensions and quantity, Urdu and punctuation preserved in a WhatsApp draft. Interior customer: wall gallery and wallpaper service inquiry. Location-only visitor: mobile navigation to address, exact-place directions and direct phone/email. Mobile entry: responsive header, fast primary actions and a functional menu. Material choice: keyboard tabs and selected material carried into the quote without discarding project details.

No messages were sent. The browser tests intercept `window.open` to inspect the WhatsApp URL and structured text. They assert phone, email, Maps and social destinations; they do not claim an external app actually delivered a message or route.

## Defects found and corrected

- Hero framing initially cropped the top of the sign. Portrait framing now retains it.
- Fixed-height material frames originally used a CSS grid with intrinsic image minimum sizing. The patterns photo could overflow. A failing browser regression reproduced the problem (510px solid image in a430px frame). All three images now fit430px desktop /310px mobile frames with `object-fit:contain`; the regression passes.
- Custom inquiry navigation initially scrolled without moving keyboard focus. Enter then Tab returned to Services. A regression failed first; the link now focuses the quotation service selector after state/dialog changes, and Tab moves to the description while preserving values. Both service and viewer inquiry paths pass.
- Native full-page Chromium captures over8000px occasionally omitted repeated photo textures although real viewport captures were correct. Tall mobile evidence now joins unmodified viewport captures at measured scroll offsets. Header position is temporarily static only during those full-page captures; separate hero/menu screenshots preserve the actual sticky header appearance. No application image workaround was introduced.

## Performance and limits

Lighthouse lab reports are retained in this directory. `lighthouse-mobile.json` is the final isolated local run; `lighthouse-isolated-mobile.json` and `lighthouse-contended-mobile.json` preserve earlier runs and variability. The contention run overlapped several screenshot browsers and scored79 performance, while isolated runs scored98–100. Local scores do not guarantee field performance on a real phone or production network. CLS was0 in the recorded runs. The demo intentionally disallows indexing, reducing the SEO score; indexing and the final metadata origin are configurable before an approved launch.

Tests used system Chromium with mobile viewport emulation, not physical iOS/Android devices or Safari/Firefox. Email/WhatsApp app configuration, actual external delivery and final hosting cache policy still depend on the deployment environment. A retained local preview process expired during one test attempt, causing connection-refused failures before application loading; restarting the preview and rerunning the full suite passed10/10.

Before public launch: confirm the intended WhatsApp number, obtain approval of the supplied recreated transparent logo, clear commercial photo reuse, and have the business confirm contact/service details. The demo remains local and unindexed. No production credentials, external records, prices, testimonials or business statistics were invented.
