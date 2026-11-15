# v1.1 composition and motion refinement

Authority: user-supplied implementation plan, 15 November 2026.

- Baseline: 6 quotation tests pass. Before captures: .impeccable/v11-before.
- Work in place: workspace has no Git metadata; worktrees and commits do not apply.
- Preserve brand, authentic photos, business content, local-only/unindexed scope and inquiry data.
- Tasks: remove studio; hero composition/depth; portfolio and mobile services; state/menu/viewer motion; documentation and full verification.
- Shared interfaces: QuoteLink → QuoteForm → quote message; remove optional concept from all three together. Hero pointer owns only presentation-frame and letter CSS variables. Menu/viewer exits retain native focus/inert behavior.

- Implemented studio removal across page, links, form/event/message types and source files. Removed concept-specific tests.
- Implemented ref/rAF hero depth, frame tilt, bounded entrance; accessible split heading and once-only heading reveals.
- Balanced portfolio columns, mobile panel imagery, form readability, active nav, reversible menu, viewer exits/swipes/single-photo controls implemented.
- Baseline behavioral failures reproduced: no image inside mobile service panel; single-photo cycling not disabled. Follow-up mobile viewport regression reproduced image y=-42.9 under sticky header; settling then revealing the selected service corrects its position.
- Initial full browser run: 15/17 passed; failures were a selector matching an SVG alongside the image and old image traversal attempting to scroll hidden panel images. Narrowed image query and only traverse visible images.
- Second full browser run: 18/19 passed; remaining geometry assertion used transformed bounding boxes while pointer tilt was active. Measure layout dimensions (offsetWidth/offsetHeight), since presentation tilt intentionally changes painted bounds.
- Production build and TypeScript/lint passed before the mobile reveal correction; final verification pending.

Final review and follow-up:
- Independent reviewer: two Important findings (filter reversal, mobile header quote/menu) and a proximity-geometry finding originally Minor. Re-graded the latter for the signature interaction: stale geometry violates pointer proximity after ordinary scrolling; invalidate then measure once instead of reading layout every frame. All three failed first and pass their covering regressions.
- Real-pointer follow-up reproduced native View Transition overlays swallowing clicks. Fixed snapshot pointer-events; regression RED→GREEN. Programmatic state-only checks had missed the hit-testing behavior.
- Mobile quote geometry follow-up reproduced heading y=-167px after closing the menu. The corrected regression waits for smooth scrolling to settle, avoiding a transient passing position. Resolve open-menu native anchors only after the180ms collapse; menu reversal cancels the pending destination.
- Standardized native input/select minimum height to54px after measuring browser select48px versus input50.1px with a48px minimum. Desktop14px text and mobile16px retained.
- No irreversible integration actions: workspace has no Git metadata. Keep source and evidence in place.
- Read-only reviewer set aside zero-duration CDP/Playwright tap delivery as browser-tooling behavior; natural-duration CDP touch dismissal passes. Physical Safari/screen readers/external delivery remain outside this local verification. Screenshot replacement is resolved by final regenerated evidence.
- Design detector:87 advisory documented-context findings only, all contextual type steps or existing colours; raw JSON retained. No new visual system or dependency introduced.
- Final preview expired: production browser/capture rerun returned ERR_CONNECTION_REFUSED before application loading. Restarted the preview and repeated affected checks; do not treat that aborted run as application evidence.

Complete:5/5 quotation tests;23/23 final production journeys including axe; TypeScript, ESLint and static build pass. Final isolated mobile Lighthouse92/100/100, CLS0. Captures refreshed at1440/1024/768/390/360; additional13-width geometry, real touch, nav tracking and pointer evidence saved. Final suite/captures rerun after preview restart. No deferred findings or deployment.

Final audit lifecycle correction: run local server and Lighthouse together; robots request200 and robots audit pass. Final performance92/accessibility100/best-practices100, LCP0.9s/TBT350ms/CLS0. Temporary audit server stopped after completion.

Hero feedback: user requested a more obvious colour/motion response instead of raising letters. Implemented one continuous pointer-following ink band with registered yellow inverse lettering. Removed lift/turn/offset calculations; now two bounded clip edges update through rAF. Preserved entrance, frame response, touch/reduced-motion behavior, selector and accessible heading name. Updated behavior/scroll tests RED→GREEN; inspected desktop band screenshot and responsive captures. No new dependency or deployment.
