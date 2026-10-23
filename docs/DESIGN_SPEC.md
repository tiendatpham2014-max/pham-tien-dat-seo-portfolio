# DESIGN_SPEC — SEO Executive Portfolio, v1.2 (muted art + content-first adaptation)

**Implementation brief:** evolve the existing Phạm Tiến Đạt / Dat Pham bilingual portfolio into a premium, editorial one-page experience with graceful motion, proof-led content, and a clear contact action. **Read `docs/CONTENT_ARCHITECTURE.md` first for the editorial decision on each of the nine reference patterns. Content relevance takes precedence over mechanically implementing every decorative block.** No external source or design reference lookup is necessary or allowed.

## 0. Foundation

### Keep existing project identity
- Existing static entry point: `dist/index.html` with HTML, CSS, inline JS, VI/EN strings.
- No portrait necessary. Do not generate a stock photo, fake client logo or fake social testimonial.
- Respect site as of Oct 23, 2026 and keep public evidence accurate.
- Keep semantic HTML, descriptive headings, accessible links and indexable text.

### Visual language
- Direction: editorial / quietly high-end / technical credibility / human and approachable.
- Typography: preserve existing Gambarino display serif and General Sans sans-serif when available; use elegant system fallbacks. Avoid 5+ font sizes fighting each other.
- **Mandatory art direction: Muted Editorial / soft, harmonious, low-glare.** The site must feel calm, grounded and pleasantly subdued rather than bright white, saturated, neon, glossy or overly dark. Treat this as a hard acceptance condition, not an optional aesthetic suggestion.
- **Base palette (preferred design tokens):** `--ground: #D6D2CA` (warm stone, primary page background); `--paper: #E2DED6` (soft ivory, elevated sections); `--field: #C8C6BE` (subtle card/alternating surface); `--ink: #202726` (soft near-black text); `--quiet: #4F5A56` (secondary text); `--dark: #202C2C` (deep slate, strategic contrast); `--light-ink: #E2DED6` (text on dark); `--accent: #315F63` (muted teal for standard text/links on light surfaces); `--accent-light: #A9C8C6` (details/links on dark); `--lavender-muted: #A9A7B4` (decorative only). These values are starting design targets; small calibrated adjustments are permitted to satisfy contrast, never vivid substitutions. Existing colors may be migrated carefully; do not require an abrupt sitewide rewrite.
- **Surface distribution:** predominantly mid-tone warm neutral surfaces (roughly 60–70% of page), selective deep slate chapters (roughly 20–30%), small restrained accent details (roughly 5–10%). These are visual targets, not strict pixel quotas. Use dark sections for the evidence/case study and contact; do not make the full site dark mode.
- **Brightness discipline:** no pure-white (`#fff`) full-width section, blinding glow, stark black-and-white bands or washed-out pale-blue blocks. Avoid gradients that increase the perceived brightness compared with the warm stone base. Favor matte/soft surfaces, slightly warm undertones and controlled contrast.
- **Accent discipline:** teal and dusty lavender are accents, not large solid backgrounds or luminous UI lights. If cyan/lavender tint appears in the hero mesh, keep it desaturated, low-opacity, and blended with warm stone. No neon, electric blue, hot pink, high-saturation violet, oversaturated gradients, giant glassmorphism stacks, bouncing icons or excessive shadows.
- **Text readability:** WCAG AA for normal text where possible; do NOT lower text contrast to make it look soft. The suggested `#315F63` is intended for links/text on `#D6D2CA`; light accents are decorative on pale surfaces unless their contrast is independently checked. Clarity comes from restrained background colors, not faint typography.
- **Section transitions:** avoid hard alternating light/dark stripes at every section. Use subtle shade differences between neighboring light chapters; reserve dark slate for purposeful chapter emphasis and give comfortable visual breathing room before/after it.
- Gutter: `clamp(20px, 3.1vw, 48px)`; max content width 1440–1680px. Vertical section spacing ~100–180px desktop / 72–104px mobile, adjusted by content density.
- Use oversized serif headings balanced with compact, factual sans-serif descriptions.
- Border radius: mostly 0–16px (controlled; not rounded-pill cards everywhere). Hairline dividers, considered whitespace, subtle editorial numbering and source labels.
- Use gentle transitions between warm stone and soft-ivory chapters; the evidence/case study remains deep slate for contrast, contact may return to slate, and the rest should feel balanced and cohesive. The hero uses a **tonal, matte mesh**, never a luminous pastel wash.
- Anchors: `#top`, `#work`, `#process`, `#skills`, `#writing`, `#journey`, `#contact`. Support older anchor semantics as necessary.

### Page order & section composition
1. Navigation — slim anchored navbar, active traveling underline and slide-in mobile drawer.
2. Hero — living flowing mesh gradient beneath hero statement.
3. Short editorial approach — current introduction, no unnecessary elaborate motion.
4. Selected work / evidence — real metric case study plus clear accessible period comparison; split slider is **conditional**, not compulsory if it undermines interpretation.
5. SEO work process — 3-phase timeline / checklist cards.
6. Capabilities — auto-cycling tabs for four SEO competency groups.
7. Published writing — horizontally browsable social-post-inspired editorial article cards.
8. Experience — concise career timeline/rail with 3 verified stages; illuminated horizon is **optional**, never forced when redundant with Process.
9. Contact — centered statement plus 3 contact-method icon cards.
10. Footer — short grouped links/footer (2–3 useful groups; 5-column reference must not create filler).

This order may be adjusted to support an editorial story. **The nine design references are a vocabulary, not nine mandatory independent UI blocks.** Functional areas must be covered, but redundant/unsupported visual treatments may be simplified or omitted following the decisions in `CONTENT_ARCHITECTURE.md`. No empty public sections, placeholder text or fabricated case studies.

## 1. Navigation — slim hairline with traveling active indicator

**Desktop design**
- Top nav at page start, use sticky header on scroll with near-opaque paper backdrop and subtle bottom hairline (avoid large opaque bars).
- Left: `Đạt Phạm` wordmark linking to `#top`.
- Center/right: work, process, skills, writing, experience, contact anchors. Preserve VI/EN language control toward far right.
- Active item: a **single thin underline** travels from previously active link to new link. Prefer measuring active link rects and smoothly updating one absolute indicator; CSS pseudo-element per item is acceptable fallback if measurement is fragile.
- Active state determined by current section on scroll, not only last clicked link. Navigation remains clickable and keyboard-operable.

**Mobile design**
- Wordmark + language switch + menu button in a compact top row.
- Accessible drawer slides in from the right (or bottom if better on tiny phones), with backdrop, animated entry and vertically stacked section links.
- Drawer opens/closes via toggle; closes on Escape, backdrop, anchor selection; focus moves inside on open and is returned on close. Lock background scroll while open.
- No horizontal page overflow. Header should remain visible without swallowing screen real estate.

## 2. Hero — full-screen statement over fluid mesh gradient

**Layout**
- First fold = viewport-friendly hero `min-height: calc(100svh - header)`; initial viewport communicates immediately who the person is and what they do.
- Large display typography: `Phạm Tiến Đạt` / `Dat Pham` (name consistent with current bilingual behavior), professional label `SEO Executive`, concise value proposition and location.
- CTAs: primary `Xem dự án / View work` -> `#work`; secondary `Liên hệ / Contact` -> `#contact`. Optional low-key scroll hint.
- Keep editorial restraint: do not overlay unrelated floating app cards, generated portrait, decorative brand logos or misleading metric tickers.

**Mesh animation (defined from scratch)**
- Compose 2–3 broad overlapping radial gradients over warm-stone `#D6D2CA`, creating a low-contrast, muted and mostly neutral flowing mesh. Use muted teal, desaturated mist gray-blue and smoky lavender as barely visible color clouds. Keep tinted layer opacity roughly 0.08–0.20 as an initial target, reducing it if the hero looks visibly bright or busy; avoid large white/ice-blue hotspots.
- Use background layers or positioned pseudo-elements inside the hero with blur and transformed/animated position. Motion should resemble slow fluid displacement, never flashing or hard stops.
- Avoid expensive blur or filters on full-page layers if mobile performance suffers; CSS transform of constrained layers is preferred.
- Keep the hero foreground legible at all times using dark ink on a stable warm neutral base. Do not brighten the entire hero or use glow/white spotlights behind the title. Use a nearly-neutral scrim only if needed for readable text.
- On load: eyebrow, title, subtitle, CTAs enter in restrained stagger; no letter-by-letter waterfall.

## 3. Editorial introduction — approach
- Preserve authentic existing concept: search intent + content + data.
- Two-column typographic composition on desktop; stack on mobile.
- One clear statement and one concise paragraph, not a wall of tool badges.
- Simple one-time scroll reveal. This section bridges hero and evidence.

## 4. Case study + period comparison — accessible period comparison, optional split reveal

**Core ethical framing**
- This is an anonymized team/sitewide GSC trend comparison between **Q3 2025** and **Q3 2026**, NOT a proof that one person's action caused the change.
- Label left `Q3 2025 / Earlier period`; label right `Q3 2026 / Later period`, NOT `Before my SEO / After my SEO`.
- Keep original chart/toggle or improve it; never erase accurate negative context: impressions are DOWN 5.0%.

**Conditional split-wipe UI**
- **Content-first decision:** implement the draggable split only when it makes the Q3 data more understandable at a glance. If text gets obscured, comparison geometry is confusing or the implementation becomes decorative, replace it with clear side-by-side metric cards/table and simple metric selector. Do not create an inert fake slider. Explain choice in implementation report.
- If split-wipe is chosen: one wide comparison canvas with left and right visually matched panels. The right view is clipped by a vertical divider; initial divider at 50%.
- **When a slider is used:** a small handle centered on divider advertises drag affordance. Text `Kéo để so sánh / Drag to compare` appears as helper label.
- Same metrics in same order both sides, ensuring valid comparison. Suggested 4 metrics: clicks, impressions, CTR, average position. Use exact approved values in `CONTENT_SPEC.md`.
- Include accessible non-slider HTML table or equivalently visible summary below so reading the data does not require pointer drag. This is **mandatory**.
- The graphical comparison can use bars or numbers but must not imply disjoint scale bases; if bars are used, both periods share a metric-specific reference scale.
- **If a handle is actually implemented:** support keyboard arrows ±5%, Shift+arrows ±10%, Home=0, End=100, and proper `role=slider` / aria labels; mobile touch drag must not block normal vertical scrolling. Do not add slider-specific ARIA when using the alternative side-by-side cards/table.
- Place two short paragraphs: what changed, and limitations / attribution. Preserve existing metric tabs if valuable; prevent controls from fighting for attention.
- No fabricated audit screenshots, rankings screenshots or before/after page designs.

## 5. Process — 3 connected timeline milestones + checklists

**Visual**
- Clear heading: `Cách tôi triển khai SEO / How I approach SEO`.
- Three numbered timeline pills/cards connected by a thin dotted path that reads left-to-right on desktop and top-to-bottom on mobile. **This is the main expressive timeline; keep career visuals quieter to avoid duplication.**
- Step cards have small illustrative details (index numbers, mini status elements) but not fictitious product UI.

**Steps**
1. `Research & audit` — intent, keyword clusters, crawl/index assessment; checklist shows 2–3 concrete tasks.
2. `Implement & optimize` — content briefs, on-page editing, internal linking, technical recommendations; checklist shows 2–3 tasks.
3. `Measure & iterate` — GSC/GA4 validation, compare periods, refine based on evidence; checklist shows 2–3 tasks.

**Behavior**
- Connecting line reveals gently as section enters viewport. Cards lift/fade sequentially. On desktop, small active dot tracks progression on scroll; no mandatory click interaction.
- Checkmarks indicate *stages in a work process*, not claimed finished achievements for a named client.
- Each card is readable with JS off.

## 6. Capabilities — auto-cycling feature tabs

**Layout**
- Heading left or above, horizontal tabs / vertical rail depending on viewport.
- Four tabs: `Technical SEO`, `Content Strategy`, `Analytics`, `Workflow & Automation` (translate for VI).
- One active tab with an animated progress bar and adjacent content panel: **Problem → Approach → Typical output** from `CONTENT_ARCHITECTURE.md`, short description and quiet tool tags where verified. Avoid duplicating job titles or the Experience section.
- Text and small conceptual diagrams are enough; no invented product screenshot.

**Interactions**
- Tabs switch manually by click / Enter / Space / arrow keys; automatic cycle every ~6–8s when visible and user has not interacted.
- Pause on hover/focus, and when document is hidden; stop autoplay for reduced motion and after manual navigation (until explicit optional resume).
- Transitions use quick crossfade/translate, with only one main active panel visually displayed.
- Implement accessible tabs using `role=tablist`, `role=tab`, `aria-selected`, `aria-controls`, managed tabIndex and panel role.
- On narrow screens, horizontally scrollable tab list or accordion variant; do not squeeze four long labels into one row.

## 7. Published writing — social-card-inspired horizontal rail

**Important semantic adaptation**
- This is a presentation pattern resembling short social posts, **not social proof/testimonials**. It showcases actual authored articles, with no fabricated quotes, avatars, likes, reactions, shares or review counts.
- Use verified 3 Primas article titles and URLs from `CONTENT_SPEC.md`.

**Visual**
- 3 editorial cards visible in a responsive track: source/category label, article title, short factual summary (or topic), `Read article ↗`, optional abstract typographic art instead of fake thumbnails.
- On desktop show 2–3 partial cards and breathing space; on mobile show ~1.1 cards so swipe affordance is clear.
- Optional manual previous/next arrows and discreet progress indicator. No loud infinite autoplay.

**Behavior**
- `scroll-snap-type: x mandatory` on track, touch-swipe native. Prev/next use smooth scroll by card width, disable appropriately at edges or wrap *only* if fully handled.
- Full card or read CTA goes to existing real article. External links `target=_blank rel=noopener noreferrer`.
- A separate clear `View all writing` link goes to real author page.
- Hover: border/background lift and arrow translate; focus-visible equally obvious.
- All cards must be present in DOM and readable with JS off; this section is not a quote rotator.

## 8. Experience — timeline with moving illuminated horizon

**Design concept**
- The original globe/global-office metaphor is **not backed by this portfolio content**. Use a quiet, professional three-stage career rail instead. Only borrow a subtle horizon/light motion if it adds clarity; do not implement globe imagery, location nodes or office time zones.
- Optional only: a very subdued dawn-like tonal highlight on a minimal rail. Prefer a static rule and staggered one-time reveal when Process already has connecting paths. Avoid glowing sunrise or bright beam.
- Milestone cards: `SEO Intern`, `SEO Contributor`, `SEO Executive`; show correct dates, organization and 2–3 factual responsibilities from content spec.
- At desktop, a wide rail/path connects three aligned milestones; use calm horizon gradient and small moving light highlight. At mobile, convert to a vertical timeline, left rule and stacked readable cards; drop nonessential background art.

**Behavior**
- Scroll reveals each milestone in sensible order and animates progress along the timeline.
- One slow light sweep may loop on desktop only while section is visible, no flashing; do not invent exact per-project durations.
- Duration data = employment periods provided, not estimates for unnamed projects. Never show an end date in November 2026 as completed.
- Avoid misleading implication of three employers: the stages relate to Primas Group as in the existing source.

## 9. Contact — centered 3 icon method cards

**Visual**
- Centered heading + plain-language invitation; three square-ish contact cards in a tidy row, stack on narrow screens.
- Methods: `Email`, `LinkedIn`, `Phone` based on links already in current HTML. GitHub may be included as a small supplemental text link only if a valid public profile destination is wanted; do not expose the private repo as a showcase.
- Each card: recognizable simple inline SVG icon, short heading, exact address/handle/number already public, and visible click destination. No fake scheduler or nonfunctional contact form.

**Behavior**
- On hover/focus: card subtly lifts, border/accent transitions, arrow moves. Hover treatment should shift one muted tone rather than flash lighter or produce glowing outlines. No background particle animation.
- `mailto:`, external LinkedIn, and `tel:` links remain usable on desktop and mobile.

## 10. Footer — airy multi-column sitemap, scaled to a personal site

**Visual**
- Quiet closing section with thin divider; large personal wordmark/initials in one zone, lightweight grouped links in other zones.
- A 5-column sitemap is oversized for this one-page portfolio. Prefer 2–3 meaningful link groups with no empty columns. A small social row can sit below if there are real links. No fabricated legal/policy pages.
- On mobile, stack groups in 2 columns or 1 column and keep links comfortably tappable.
- Small bottom row: copyright year computed dynamically, name, location and back-to-top link.

**Behavior**
- Hover underline sweep or small color shift. No massive parallax.

## Responsive behavior
- >=1200px: spacious editorial grids, large display headline, full rail/card compositions.
- 768–1199px: reduce gutters, scale type, likely two visible writing cards, compact header.
- <=767px: single-column sections, mobile drawer, one article card + peek, vertical journey timeline, stacked contact cards, comparison draggable without sideways overflow.
- <=390px: wordmark and language switch remain usable, no clipped names, metrics/tables scroll locally rather than make page wider.
- Use `svh`/`dvh` carefully; prevent mobile address bar viewport jumps and overly tall empty hero.

## SEO / semantic / accessibility acceptance
- One H1, descriptive H2 per chapter, no headings skipped solely for visual styling.
- Preserve correct title/meta description and bilingual UI; optionally update og tags only if the project already supports them.
- Interactive elements use native button/anchor or correct ARIA; focus visible; no clickable `div` without proper semantics.
- Avoid fake clickable controls; each rendered CTA must work.
- Motion must not gate core content. Support reduced motion and no-JS readable fallback.
- Touch controls >=44px effective target. AA text contrast where feasible.
- Do not request remote images or external design libraries. Existing hosted fonts may remain, but no new design-asset fetch during implementation.

## Content enrichment rule
- This is **not a CV-to-website transcription**. Take professional facts from `CONTENT_SPEC.md`, then create new editorial/methodology content from the VI/EN copy bank in `CONTENT_ARCHITECTURE.md` where appropriate. The extra content must not claim past accomplishments or published outputs without supporting evidence.
- Add optional short insights on indexability, keyword-to-page mapping and measurement only when they help interpret the portfolio. Do not turn conceptual examples into named case studies.
- Keep **unverified but potentially valuable work** as documented draft slots in `CONTENT_GAPS.md`, **not empty UI**. No blank placeholders on the live site.
- When a pattern has no genuine content, simplify, merge or omit the decorative pattern rather than fill it with unrelated content.

## Out of scope
- Real contact form backend, CMS, blog backend, dashboard API, sign-in, e-commerce, fabricated team testimonials, unlicensed component source, global stack migration, live deployment.
