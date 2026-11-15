# v1.1 composition and motion verification — 15 November 2026

The approved typography, paper/ink/yellow palette, authentic photographs and business copy are preserved. The sticker studio, its links, drag hook, styles, concept-specific tests and quotation field/event/message integration are removed. The hero’s secondary action requests a quote. The static export remains local with `noindex, nofollow` and a disallowing robots file; no messages were sent or deployment performed.

## Implementation

The hero uses a 1.25fr / 1fr desktop grid, a fluid 32–64px gap, centred framing and a contained 3:4 stage capped at min(600px, 62vh). Its manual selector retains service-aware inquiries. Split lettering has a single accessible heading name; its 550ms entrance plus stagger ends at 902ms. Fine hover pointers now drive a visible yellow-on-ink sweep across stationary letters, retaining 3° frame perspective. This supersedes the earlier lift/rotation following the user’s feedback. Exit settles over 500ms. Scroll invalidates geometry; the next pointer event measures once. There is no idle animation loop or added animation dependency.

Supporting headings have once-only masked reveals (550ms, 12px, capped stagger); paragraphs remain static. Portfolio imagery retains source orientation in balanced columns, with one mobile column in DOM/keyboard order. Image scale 1.02, title underline and inquiry arrow move together. Services retain desktop sticky imagery; mobile shows a contained image inside its selected explanation and brings that service below the header when the accordion settles. Materials and hero selectors fade outgoing/incoming content together and cancel pending swaps on reversal; inquiries use the latest requested context.

Form fields use 14px desktop text / 12px labels and consistent 54px minimum controls, retaining 16px mobile fields. About and quotation align to the shared grid. Navigation tracks the active section; the mobile menu reverses its 250ms entrance / 180ms exit and closes from every destination, including the persistent quote action. The native viewer retains visible controls, keyboard navigation, focus restoration and source access, adds touch swipes and250 / 180ms entrance/exit, and disables cycling for one-photo categories. Reduced motion removes decorative animation and hover/press transforms, transition durations/delays and deferred selection changes.

## Evidence

| Check | Result |
| --- | --- |
| Quotation tests | 5 passed; Unicode, punctuation/newlines, complete requirements, optional uncertainty and destination validation retained. |
| TypeScript / ESLint | Passed on the final source. |
| Static production build | Passed; homepage, not-found page and robots generated in `out/`. |
| Production browser suite | **23 passed** against the rebuilt static export. Includes quotation handoff/retained input, gallery, selectors, menu, viewer, mobile service visibility, pointer bounds and live reduced motion. |
| Axe | Desktop/mobile WCAG2/2.1 A/AA plus open viewer checks pass within the production suite. |
| Responsive geometry | 13 widths: 320,360,390,600,767,768,820,900,1024,1200,1440,1680,1920px. Document width equals viewport width throughout; stage respects its height cap. |
| Visual evidence | Before: `.impeccable/v11-before`; after: `.impeccable/v11-after`. Desktop 1440, intermediate 1024, tablet 768, mobile 390 and small mobile 360, plus state captures and hero pointer/rest. No broken images or page errors in capture measurements. |
| Touch / motion | Actual CDP horizontal touch swipe advances to the scooter; a natural-duration touch closes the viewer. Touch does not activate the hero ink sweep. Menu ends at 0px height and becomes inert. Active navigation follows all five destinations. See `motion-measurements.json`. |
| Studio removal | Source, tests and capture routine search finds no studio/attached-concept/quotation remnants. Business custom-sticker services remain. |
| Design detector | One manual scan: 87 advisory frontmatter-token findings (83 contextual font-size uses and 4 existing colour uses), no non-advisory findings. Preserved contextual typography and existing rule/backdrop colours are documented in DESIGN.md; field roles are explicit. Raw results retained in the after-capture directory. |
| Production Lighthouse | **92 performance / 100 accessibility / 100 best practices; CLS 0.** Report in `lighthouse-v1.1-mobile.json`. |

## Regressions found and corrected

- Mobile image existed inside its panel but could finish above the sticky header after the previous service collapsed (measured y=-42.9px). A viewport regression failed first. The selected service is now revealed once its grid transition settles, immediately for reduced motion.
- All→Vehicle→All during a pending native transition discarded the final request because the committed filter still read All. A failing reversal regression now passes; a synchronous requested-selection ref guards requests.
- The native View Transition overlay intercepted actual pointer clicks despite programmatic filter tests passing. A real mouse-click regression failed first. Transition pseudo-elements now ignore pointer input, allowing the live filters to interrupt snapshots.
- The persistent header quote action left the mobile menu open at the inquiry destination. Failing regressions now pass with menu closure included in that destination’s handler and native anchor resolution after collapse, which keeps the inquiry heading below the settled header. All open-menu destinations share that path.
- Scrolling within the hero left cached letter positions stale. A failing regression now passes after invalidating geometry on scroll and measuring before the next pointer update.

Initial test-only corrections: image-role queries also matched decorative SVGs, old image traversal tried to scroll hidden panels, and a layout-stability assertion measured intentionally tilted painted bounds. The corrected tests target photographs, visible image loading and actual layout dimensions. These are documented to distinguish test assumptions from application defects.

## Review and limits

A separate read-only reviewer inspected code, requirements and screenshots and reproduced the filter reversal, mobile quote/menu and pointer-geometry defects. All were addressed with regressions observed failing first. The pointer-geometry finding was graded higher for this implementation because precise proximity is the signature interaction; remeasurement occurs only after invalidation. No minor issues remain deferred.

The reviewer independently confirmed indexing stays disabled, studio source references are removed, destination links work and touch swipe/natural-duration dismissal work. Zero-duration Playwright taps immediately after CDP swipes generated pointer events without a browser click; no application workaround was added because natural touch delivery succeeds. Screenshot replacement during review is resolved by the final captures. Physical Safari/iOS/Android devices, screen-reader speech, WhatsApp/email delivery and image reuse rights were not exercised by this local refinement.

The screenshot routine joins unmodified viewport frames for pages taller than 8000px. Sticky positioning is temporarily made relative only for full-page assembly/section evidence, then restored; independent hero/menu/service viewport captures retain the live header. Earlier baseline screenshots came from development; final evidence uses the production export. No business photograph was edited.

No Git metadata exists in this workspace; changes and evidence remain in place without commits, a branch, PR or deployment.

Tooling note: the Impeccable context loader reports an older PRODUCT.md schema (optional `init`) and an available skill update from v4.7.0 to v4.9.0. Neither is required for this refinement; PRODUCT.md remains unchanged.

## Final measured results

Isolated mobile Lighthouse: performance 92, accessibility 100, best practices 100, SEO 66 (indexing intentionally disabled). LCP 0.9 s; TBT 350 ms; CLS 0. The earlier run overlapping other browser work scored 93 performance and is retained as `lighthouse-v1.1-contended-mobile.json`. These are local lab measurements, not field guarantees.

An interim audit lost its robots.txt fetch when the preview expired. The final audit kept the local server alive in the same process lifecycle: a direct request returned 200 with `User-Agent: *` / `Disallow: /`, and Lighthouse’s robots audit passed. See `robots-response.json` in the evidence directory.

Final outcome: 5 quotation tests and 23 production browser journeys pass; TypeScript, ESLint, static build and axe pass. Capture measurements show no overflow, broken images or page errors at all five photographed widths. Additional 13-width geometry and real-touch evidence are retained in `motion-measurements.json`. One final preview process expired, causing connection-refused failures before app loading; after restarting it, the full 23-test suite and captures passed.

## Hero ink-sweep follow-up

At the user’s request, the hover lift/rotation was replaced with an obvious pointer-following colour inversion. One continuous dark band reveals yellow lettering across “WE CREATE.”; an identical decorative text layer keeps glyphs registered and both sides of the wipe legible. The band follows horizontally in 240ms and clears over 500ms, while the letters stay stationary. The existing entrance, restrained photo-frame tilt and manual selector remain. Reduced motion hides the ink layer; touch retains the composed hero.

The updated regressions cover pointer tracking, reversal/exit, stationary glyphs, one accessible heading name, live reduced motion and geometry after scrolling. Both changed tests failed before the new implementation and passed afterward. Fresh desktop 1440 / tablet 768 / mobile 390 rest, left/middle/right and reduced-motion captures are in `.impeccable/hero-ink/`; measurements report no overflow or page errors. Final follow-up verification: all 23 production browser journeys (including axe), 5 quotation tests, TypeScript, ESLint and the production build pass. Earlier Lighthouse measurements describe the preceding v1.1 refinement and were not rerun for this bounded hover change.

## Button-effects follow-up

Implemented the three approved variants: directional yellow fill on primary actions, masked rolling labels on text actions, and magnetic footer/portfolio arrows. Action labels and destinations are preserved; inverse copies are hidden from assistive technology. Native click, modified-click, quotation focus handoff and form submission handlers remain on their original controls.

Verification: 24 production browser journeys pass, including the new pointer/focus/reduced-motion regression and existing axe/mobile/inquiry journeys. The new test failed first against the ordinary button markup. Five quotation tests, ESLint and production build/TypeScript pass. Desktop and mobile captures were inspected under `.impeccable/buttons/`. No animation dependency or deployment was introduced.

## Expanded controls, highlights and viewport arrivals

Extended rolling labels to desktop/mobile navigation, hero selectors/context links, filters, material tabs, gallery expansion, email, footer phone/social/contact links and back-to-top. Stable project headings, explanatory copy, logo and viewer navigation retain their established behavior. The service strip uses a directional ink wipe with yellow text, keeping each service’s quotation prefilling and focus handoff.

The registered pointer-following ink effect now covers “happen.” and both footer statement lines. Headings and hero entry wait for viewport arrival; offscreen headings are armed without replaying on exit. The new full-line masked entrance is 700ms with 100ms stagger capped at 250ms. Footer groups reveal independently using a 650ms mask and 22px settle, so mobile groups animate when each actually arrives. Reduced motion shows content immediately; keyboard focus reveals footer groups immediately. No animation dependency or business-content change was introduced.

Final verification: 26 production browser journeys pass (including axe), 5 quotation tests pass, TypeScript/build and ESLint pass. Both new regressions failed first before implementation. Captures at 1440 / 1024 / 768 / 390 / 320px show no document overflow or page errors; specific arrival, service-strip, “happen” and footer ink states are in `.impeccable/expanded-motion/`. The independent read-only review found no material findings and also checked narrow footer geometry.

An initial production axe run caught low contrast during the footer’s temporary opacity fade. Replaced fading with full-contrast clip reveals; the unchanged axe journey passed in the final full suite. Typography remains registered through colour transitions, duplicate artwork is hidden from assistive technology, and destination URLs/customer-entered inquiry requirements are preserved.

## Text-only headline sweep

Added a transparent-background variation of the registered ink sweep to unhighlighted H1/H2/H3 titles, including project/viewer, service/material and form headings. Deep cobalt follows the pointer across the glyphs; backgrounds remain unchanged. Yellow-highlighted titles retain their prior inversion. Generated decorative copy preserves original DOM text, semantic names and native button behavior. Dynamic titles reset their geometry; touch/reduced motion keep static text.

Verification: 27 production browser journeys pass, including axe and the new text-only colour/background/name/exit/reduced-motion regression, which failed before implementation. Existing material/viewer text assertions exposed duplicate DOM text in the first variation; switched its decorative layer to generated text and reran the full suite successfully. ESLint, TypeScript and production build pass. Desktop hover captures plus five-width quote captures in `.impeccable/text-ink/` show no horizontal overflow or page errors. Calculated cobalt contrast is 7.03:1 on paper, 6.46:1 on wash and 6.38:1 on yellow. No dependency or deployment was added.
