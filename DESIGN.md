---
name: Stickers Corporation / The Print Lab
description: Expressive physical printing, grounded in warm paper, ink and signal yellow.
colors:
  paper: "#f3f2ec"
  ink: "#22231f"
  accent: "#f3ed38"
  print-ink: "{colors.accent}"
  muted: "#64645c"
  line: "#d4d4ca"
  wash: "#e9e9e0"
  error: "#a02525"
  button-hover: "#44453d"
  field-rule: "#9b9b90"
  accent-rule: "#b9b529"
  viewer-backdrop: "rgb(20 21 18 / .84)"
typography:
  display:
    fontFamily: "Barlow Condensed, sans-serif"
    fontSize: "clamp(52px, 7.1vw, 116px)"
    fontWeight: 800
    lineHeight: 0.97
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "Barlow Condensed, sans-serif"
    fontSize: "clamp(46px, 5.4vw, 84px)"
    fontWeight: 800
    lineHeight: 0.98
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Manrope, sans-serif"
    fontSize: "clamp(21px, 2vw, 30px)"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "-0.025em"
  body:
    fontFamily: "Manrope, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: "Manrope, sans-serif"
    fontSize: "11px"
    fontWeight: 600
    letterSpacing: "0.08em"
  field:
    fontFamily: "Manrope, sans-serif"
    fontSize: "14px"
    lineHeight: "1.65"
  field-label:
    fontFamily: "Manrope, sans-serif"
    fontSize: "12px"
    fontWeight: 600
  mobile-field:
    fontFamily: "Manrope, sans-serif"
    fontSize: "16px"
  button:
    fontFamily: "Manrope, sans-serif"
    fontSize: "13px"
    fontWeight: 600
    lineHeight: 1.4
rounded:
  square: "0"
  circle: "50%"
spacing:
  compact: "8px"
  small: "12px"
  control: "16px"
  standard: "20px"
  field: "24px"
  section-gap: "32px"
  gutter: "clamp(20px, 4.2vw, 72px)"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    typography: "{typography.button}"
    rounded: "{rounded.square}"
    padding: "16px 24px"
  button-primary-hover:
    backgroundColor: "{colors.button-hover}"
  text-link:
    textColor: "{colors.ink}"
    typography: "{typography.button}"
    padding: "8px 0"
  icon-button:
    textColor: "{colors.ink}"
    rounded: "{rounded.circle}"
    width: "44px"
    height: "44px"
  icon-button-hover:
    backgroundColor: "{colors.wash}"
  filter:
    textColor: "{colors.ink}"
    rounded: "{rounded.square}"
    padding: "10px 18px"
  filter-selected:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
  field:
    textColor: "{colors.ink}"
    rounded: "{rounded.square}"
    padding: "13px 0"
  material-tab:
    textColor: "{colors.ink}"
    padding: "18px 0 20px"
  project-photo:
    backgroundColor: "{colors.wash}"
    rounded: "{rounded.square}"
    width: "100%"
---

# Design System: Stickers Corporation

## Overview

**Creative North Star: "The Print Lab"**

An expressive print studio built from warm paper, dense ink typography and signal yellow. The original business logo and authentic photographs carry the brand; sharp framing recalls physical sheets, vinyl and signage. The world is confident and tactile, with quiet controls around visually varied work.

Condensed display type gives headlines the force of printed lettering. Manrope keeps descriptions, navigation and inquiries clear. Spacious editorial layouts alternate with compact service indexes; photographed finishes supply their own colour rather than being simulated by decorative effects.

**Key Characteristics:**
- Warm light surfaces with a single signal-yellow accent.
- Condensed, heavy display type paired with restrained body and interface type.
- Square physical-print framing, fine rules and authentic photographs.
- One pointer-responsive ink-inversion hero; restrained heading reveals and purposeful state transitions.

This document records the implemented local website. Token frontmatter is normative; component and responsive details below describe how those tokens are applied. Product facts and the local-only deployment scope remain in PRODUCT.md.

## Colors

Warm neutral surfaces make signal yellow feel like a printed highlight, while photographs retain their own colour.

### Primary
- **Signal Yellow** (`accent`): highlighted headline blocks, service-strip hover, the contact closing and draft-ready status.

### Neutral
- **Warm Paper** (`paper`): page, navigation, viewer and reversed control text.
- **Print Ink** (`ink`): primary text, filled action buttons, selected gallery filters and focus outlines.
- **Supporting Ink** (`muted`): descriptions, metadata, provenance and placeholders.
- **Paper Rule** (`line`): section dividers, gallery toolbar and service rows.
- **Sample Wash** (`wash`): materials section, image mats, inquiry preview and icon hover.
- **Action Hover Ink** (`button-hover`): primary-button hover.

### Feedback
- **Correction Red** (`error`): invalid field underline and its associated validation message; never the sole error indicator.

**The Physical Evidence Rule.** Use real photographs for work and material finishes. Keep source access visible in the viewer and preserve image proportions when inspection matters.

## Typography

**Display Font:** self-hosted Barlow Condensed, sans-serif fallback (800).
**Body and UI Font:** self-hosted Manrope variable, sans-serif fallback (400–700).

The pairing makes headings feel cut and printed while keeping compact supporting copy legible. There is no additional mono or ornamental UI face.

- **Display:** frontmatter `display` governs the desktop hero's first line. The second line is (1.22em), on a square yellow block. At widths up to (1199px) the base becomes (7vw); up to (900px), (6.65vw); up to (767px), `clamp(52px, 11.5vw, 86px)`; up to (374px), (11.4vw). At (1680px) and above the first line is capped at (116px).
- **Headline:** `headline` is the shared section scale. Mobile section headings are individually tuned around (44–48px); the inquiry and closing statements intentionally remain larger.
- **Title:** `title` is the gallery caption hierarchy. Mobile gallery captions use (24px). Material titles use the display face, (44px) desktop and (36px) mobile, with intermediate sizes at tablet widths.
- **Body:** `body` is the page default. Paragraphs commonly use (12–15px), restrained line lengths around (35–54ch), and muted ink; the hero copy uses line-height (1.8).
- **Label:** `label` is uppercase with tracking. Metadata variations are (9–11px), clearly subordinate to captions and actions.
- **Controls:** buttons and text links use the `button` role. Body/UI weights above 400 signal control, label or heading hierarchy rather than decoration.

The preserved contextual type steps are (8, 9, 10, 11, 12, 13, 14, 15, 16, 18, 20, 21, 22, 24, 30, 34, 36, 38, 44, 45, 46, 48, 52, 58, 65, 66, 70, 76, 78, 84, 86, 104, 108, 116, 140px). These include responsive display endpoints and small provenance/caption roles; they are not a replacement global scale. The manual detector flags contextual sizes absent from its frontmatter ramp; they are retained deliberately under the approved typography brief. Field roles are now explicit in frontmatter.

**The Ink Hierarchy Rule.** Reserve Barlow Condensed 800 for major statements and selected service headings; use Manrope for reading, labels and controls.

## Layout

A centred wrapper is capped at (1680px), including its fluid gutter. This is a mixed editorial grid rather than a uniform card deck. The desktop hero pairs text and a centred portrait presentation frame at (1.25fr / 1fr), with a fluid (32–64px) gap. The photo stage follows its (3 / 4) frame up to the smaller of (600px) and (62vh), and contains the complete photograph. The gallery uses two balanced CSS columns with no negative margins, consistent (48px) card spacing and source-appropriate landscape/portrait ratios. Reading and keyboard order flow down the first column, then down the second; mobile uses the same DOM order in one column. About and quotation use equal desktop columns and the shared gutter/gap; the footer retains its established composition. Service, material and inquiry areas have their own two-column proportions.

Common spacing steps are extracted in frontmatter. Main desktop sections use roughly (100–116px) vertical separation; mobile sections compress to roughly (58–66px). Field groups keep (24px) separation and the action buttons use a minimum height of (54px).

At (1199px) and below, location text leaves the header and layouts tighten. At (900px), the header height becomes (74px), with smaller gaps and imagery. At (767px), the header is (72px), gutters become (22px), the main layouts stack, the gallery loses its offsets, the desktop service visual is hidden and the selected image appears inside its expanded panel, field pairs become single columns, and contact details stack. Gallery filters and material tabs scroll horizontally rather than squeezing their labels. The hero retains a contained portrait (3 / 4) stage after the early action row, subject to the same height cap. At (374px), gutters become (18px) and small-screen header/type spacing tightens. Above (900px), the sticky header height is (84px).

Anchor offset accounts for the header plus (20px). Inquiry links transfer keyboard focus to the service selector after their selected context commits, including after closing the photo viewer. They scroll smoothly unless reduced motion is requested.

## Elevation & Depth

The system has no box-shadow vocabulary. Fine rules, warm tonal layers and substantial spacing establish depth; photographs provide physical texture. The native modal occupies the browser top layer and dims its backdrop with `rgb(20 21 18 / .84)`. The header uses stacking level (20); the skip link uses (50). The mobile menu expands within the header flow with a reversible grid transition.

**The Flat Sheet Rule.** Use fine borders, tonal surfaces and spacing to separate content. Do not add raised card shadows.

## Shapes

Cards, image frames, highlighted words, buttons, fields and filter controls remain square. Circles are reserved for icon controls, the photo-open affordance, material swatches and the directional contact control. Borders are generally (1px); selected material tabs use a (2px) bottom rule. Photos are clipped only by their rectangular display frames; the viewer shows the complete image with `object-fit: contain`.

## Components

### Buttons and links

Filled actions use ink on paper with the primary dimensions in frontmatter. Hover changes the ink shade; press scales the action to (.98). Text links keep a fine bottom rule, a (12px) icon gap and a small diagonal arrow shift on hover. Icon buttons are (44px) circles with a wash hover; the mobile menu control narrows to (38px). Buttons, links and focusable non-field elements receive a (2px) ink focus outline offset by (5px).

### Navigation

The sticky paper header preserves the original logo, compact Manrope navigation and an underlined inquiry action. Desktop navigation links are (12px / 600) with an animated fine underline for hover, focus and the active section, tracked through IntersectionObserver. At mobile widths a labelled toggle exposes an in-flow menu, updates `aria-expanded`, and keeps closed contents inert. Escape, a destination selection or a home selection closes it. Escape returns focus to its toggle; switching to desktop resets the open state. Selecting a destination from an open menu resolves its native anchor after the (180ms) collapse so the changing header height does not hide the destination; reopening cancels pending navigation. Entrance is (250ms), exit (180ms); closed links become inert immediately. The focused skip link appears above the page. A quote action remains visible beside the mobile menu.

### Gallery filters, photographs and viewer

Filters are rectangular pressed-state buttons, distinct from tabs. The selected filter reverses to paper-on-ink; hover adds a fine border. Cards have no surrounding surface, border or shadow: the photograph, caption and inquiry arrow do the work. Images scale to (1.02) on card hover/focus over (800ms), coordinated with title underline and inquiry-arrow movement; the circular plus affordance turns and becomes yellow. The initial all-work view shows four photographs and expands to six; a category displays relevant images.

The native dialog uses a paper surface, full uncropped photograph, a labelled close control, previous/next controls, source link and service inquiry. Its image height is (62dvh), reduced to (48dvh) on mobile; its caption/actions stack on mobile. Escape retains native dialog behaviour; left/right arrows cycle through visible photographs. Background scroll is locked while it is open. Opening takes (250ms), closing (180ms); Escape, backdrop and the close control share the exit path. Inquiry navigation closes immediately to preserve its focus handoff. Horizontal touch swipes of at least (50px), dominant over vertical travel, cycle photos; vertical gestures and pinch zoom remain available. Cycling controls are disabled for a single-photo category. Dismissal restores the opener’s focus.

### Services and tags

Service rows are separated by fine rules. Full-width heading buttons expose `aria-expanded` and swap plus/minus icons. One panel is open at a time and the active service changes the adjacent image or yellow type panel. Small descriptive service tags use a bottom rule rather than pills. Desktop service imagery sticks below the header and fades out/in with selection. Mobile places the relevant contained photograph or existing type panel within each expanded service explanation. Once the accordion has settled, the selected service is brought beneath the header so its image and explanation are discoverable together; reduced motion reveals it immediately. Closed panels are inert and hidden from assistive technology.

### Materials and tabs

The materials area uses wash, real sample photography and a text-led description. Tabs combine circular solid/pattern/photo swatches with text. Selection is a heavier label and ink bottom rule; keyboard arrows wrap between tabs, Home/End reach the endpoints, and roving focus keeps only the active tab in the tab order. The labelled panel is keyboard focusable. Image and copy fade together (120ms out, 280ms in); rapid changes cancel the pending swap, and inquiry actions always use the latest requested selection. The sample uses `object-fit: contain`; mobile keeps the photograph above copy. The patterned swatch is a compact selector symbol, not a substitute for photographed stock.

### Inquiry fields and feedback

Inputs, selects and textarea are transparent, square and underlined. Desktop fields are (14px) with (12px) labels, (13px) vertical padding and a minimum height of (54px); the textarea has a minimum height of (95px). Mobile field text is (16px), avoiding browser zoom, with smaller placeholder text. Field focus receives a (2px) outline offset by (3px). The invalid description gets a red underline and an associated alert, then receives focus; only that description is required.

The native disclosure previews the inquiry in a wash panel. Submission prepares a WhatsApp draft and reveals a yellow confirmation with a reopening link. It does not indicate that a message has been sent. Contextual inquiries prefill the service/material and keep the form editable; email uses the same project details.

### Motion

Native CSS uses `cubic-bezier(.16, 1, .3, 1)` throughout directed motion. The hero first line settles over (550ms); the highlighted lettering enters letter by letter over (550ms), with (28ms) stagger and (100ms) initial delay, ending at (902ms). The frame reveals over (700ms) with (100ms) delay. The manual selector never advances automatically.

The signature interaction is a pointer-following ink sweep across “WE CREATE.” A continuous solid ink band follows the pointer, turning the covered lettering yellow, with its edges wiping open and closed over (240ms). The foreground and inverse copy share the same glyph geometry; clipping reveals text and background together, preserving contrast throughout. Letters stay in place. Exit clears the ink over (500ms). The photograph’s presentation frame retains its restrained tilt, capped at (3°) on either axis. This replaces the earlier 6px letter lift / 2° rotation at the user’s request for a more obvious colour response.

The effect uses native CSS clip paths and bounded requestAnimationFrame writes, with no animation package. It applies only to precise hover pointers; touch retains the entrance and manual selector. Pointer exit, cancellation, scrolling, window blur and a reduced-motion preference change reset it. Geometry is measured on entry/resize and the first pointer input after scrolling. A frame is requested only when input changes; no idle animation loop runs. Reduced motion hides the decorative ink layer entirely.


Section headings now wait for viewport arrival before a once-only masked line reveal: (700ms), full-line travel, with (100ms) stagger capped at (250ms). IntersectionObserver arms offscreen headings and starts at 12% visibility with a 32px bottom inset. Default markup stays visible without scripting; reduced motion reveals immediately. The hero entrance is gated by the same viewport lifecycle, including when arriving from a deep link. Paragraphs remain static. Gallery filtering keeps interruptible native View Transitions with an immediate unsupported-browser fallback. Snapshot pseudo-elements ignore pointer input so filters remain clickable during the animation; a synchronous requested-selection ref preserves reversals before React commits. There is no general scroll-out animation.

Under `prefers-reduced-motion: reduce`, all animations and decorative hover/press transforms are removed, transition durations and delays become zero, and automatic scrolling is immediate. Information and state remain visible without movement.

## Do's and Don'ts

### Do:
- **Do** retain the original logo and let authentic imagery supply additional colour.
- **Do** use the paper, ink and accent roles consistently, with muted text for supporting context.
- **Do** keep controls square, except circular icon controls and material swatches.
- **Do** preserve visible keyboard focus, tab semantics, explicit field labels and the reduced-motion response.
- **Do** show full photographs in the viewer and keep provenance accessible.
- **Do** describe the inquiry action as preparing a draft; retain editable fields and the preview.

### Don't:
- **Don't** introduce gradient panels, glass effects or raised card shadows into this flat print system.
- **Don't** turn material finishes into decorative synthetic renders or imply unverified project ownership.
- **Don't** use pill-shaped filters or rounded cards in place of the established rectangular framing.
- **Don't** hide inquiry actions on mobile or flatten the headline into an unreadable single line.
- **Don't** add scroll hijacking, continuous motion or movement under reduced-motion preferences.

## Button motion variants

Filled primary actions use a squeegee-style yellow pass over ink. The entry edge follows the pointer; keyboard focus uses the same colour response. A registered decorative copy reveals ink text on yellow together, preserving contrast and a single accessible name. The fill takes 420ms and reverses on exit.

Text actions (header quote, contextual inquiries, call/directions links) use one masked label feeding upward in 360ms, with a diagonal arrow exit/re-entry. Adjacent dynamic text fragments are grouped into one label so spacing and the accessible name remain natural. Labels retain their original wording.

Portfolio inquiry circles and the large closing arrow use bounded magnetic movement: the control travels up to 8px and its arrow another 4px. Ink/yellow hover and focus states make the circular targets explicit. Pointer updates use refs and a single requested frame, with resets on exit, scrolling, cancellation, blur and preference changes. Viewer navigation, gallery filters and material tabs retain quieter feedback. Touch suppresses magnetic/rolling movement; reduced motion removes decorative movement and keeps immediate colour feedback. No dependency was added.


## Expanded interaction and footer refinement

Rolling labels extend to main/mobile navigation, hero selectors and contextual inquiry, gallery filters/expansion, material tabs, email and footer contacts/social/back-to-top. Long project titles, service explanations and identifying icons retain stable reading geometry. Selection semantics and disabled viewer controls remain explicit.

The four service-strip links use a directional dark-ink wipe with yellow inverse lettering and a coordinated arrow feed, adapting the reveal language explored in [Codrops Creative Link Effects](https://tympanus.net/Development/CreativeLinkEffects/). Their entry direction follows the pointer; focus uses the same colour response. These are our native CSS adaptations, with no external animation package.

The hero-style ink sweep is shared by “happen.” and the footer headline. Each highlighted word/line uses registered duplicate typography hidden from assistive technology; pointer updates are bounded by requestAnimationFrame and remeasure after scroll/resize.

Footer contact groups and the final rule row reveal individually when they reach the viewport, using a 650ms masked opening and 22px settle. Text stays at full contrast through the reveal. Keyboard focus reveals a group immediately. Contact underlines draw in, labels roll, social icons tilt slightly and the closing arrow retains its magnetism. No looping footer animation or scroll-out hiding is introduced.


## Text-only headline ink

Unhighlighted H1/H2/H3 titles now share a pointer-following text-only colour pass in deep cobalt (`print-ink`, #234f9b). This covers the opening first line, section headings, project/viewer titles, material/service headings, form title and footer utility headings. Backgrounds remain transparent and unchanged; yellow-highlighted titles retain their existing ink/yellow inversion.

The decorative text layer uses a clipped generated copy of the same string, preserving the original DOM text and accessible name. It follows the pointer in 240ms and clears in 500ms, with no glyph movement. Material/viewer title changes reset its cached geometry. Touch and reduced-motion preferences retain static original text. Calculated cobalt contrast is 7.03:1 on paper, 6.46:1 on wash and 6.38:1 on yellow. No gradient, extra panel or animation package is added.


Headline hover colour correction: at the user’s request, the text-only sweep now uses the existing signal yellow (`--accent`, #f3ed38) instead of cobalt. Backgrounds and highlighted-title inversion are unchanged. This supersedes the cobalt colour/contrast description above.

The yellow text pass covers the underlying dark glyph antialiasing with a subpixel same-colour stroke, preventing a dark fringe. It adds no box, shadow or contrasting outline.
