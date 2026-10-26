# QA_CHECKLIST — Definition of Done (v4: content-first)

A task is complete only when the Next.js source builds to a working static export and these checks are addressed. Report which checks were actually run; never say all passed without testing.

## Cleanup of retired references
- [ ] `docs/references.md` and `docs/design-direction.json` deleted if present; not restored from the spec pack.
- [ ] Legacy design-reference URLs, obsolete design-crawl instructions and links to deleted reference docs removed from repository instructions.
- [ ] Only retired design reference materials removed; actual website source, evidence, content and assets preserved.

## Source and release
- [ ] `npm run dev` serves `http://127.0.0.1:4173`.
- [ ] `npm run check` and `npm run build` pass; `out/` contains a working static export.
- [ ] `.openai/hosting.json` points to `out/`; generated files remain untracked.
- [ ] React Bits and minwang.dev inform the design; no premium/proprietary code or asset is copied.
- [ ] Push only the dedicated redesign branch to GitHub. The user has authorized production updates, but verify the new build before publishing.

## Visual direction
- [ ] Dark navy is the default theme; the light theme is available and readable.
- [ ] Hero mesh supports the headline without obscuring text in either theme.
- [ ] Accent mint and warm horizon glow stay legible and deliberate.
- [ ] Career horizon fills its own section and progresses only with scrolling; contact is a separate section.
- [ ] Body text, links, buttons and focus indicators maintain reasonable contrast in both themes.
- [ ] Review the actual local preview on desktop and mobile.

## Content architecture and creative expansion
- [ ] Read `docs/CONTENT_ARCHITECTURE.md`, make a section-by-section keep/adapt/merge decision based on existing evidence before writing UI.
- [ ] Add genuine VI/EN editorial/SEO approach copy beyond the CV; avoid repeating employment bullets in Hero, Process and Skills.
- [ ] Skills uses Problem → Approach → Typical output (or equally clear framing), not another CV timeline.
- [ ] Process content communicates a methodology, not fictional client milestones.
- [ ] Features 17's curved horizon and dawn follow the three verified roles on desktop and mobile; no invented office/timezone claims, no repeated flipping-card deck.
- [ ] Comparison uses accurate, easy-to-scan period data; slider is optional and only used if usable and meaningful; no fake slider.
- [ ] Footer contains only actual links; fewer than five columns is explicitly correct.
- [ ] Unverified project cases, screenshots, testimonials and dates are tracked in `docs/CONTENT_GAPS.md`, never rendered as empty public cards.
- [ ] Delivery report distinguishes verified data, new editorial writing and deferred evidence-dependent modules.

## UI and behavior
- [ ] Navigation active underline updates after section scroll, click, resize, font load, VI/EN change.
- [ ] Mobile drawer opens/closes with tap/click, Escape, backdrop, anchor click; focus return works.
- [ ] Hero soft mesh animates without obstructing legibility; animates less or stops in reduced motion.
- [ ] Editorial approach remains concise, meaningful and responsive.
- [ ] If the optional case comparison slider is used, drag works with pointer/touch.
- [ ] If slider is used, keyboard Left/Right, Shift+arrows, Home/End and proper slider semantics update; if omitted no dummy controls.
- [ ] Comparison exposes *all* actual values without a drag interaction (accessible summary/table).
- [ ] Process shows 3 connected, readable steps with checklist details.
- [ ] Skills has 4 manual accessible tabs; autopilot pauses appropriately and stops after manual choice.
- [ ] Writing shows 3 authentic published links; horizontal swipe and prev/next controls work.
- [ ] Experience section shows 3 real stages with correct dates/employer, without duplicating the Process interaction.
- [ ] Contact methods are 3 actual functional destinations; phone/mail/LinkedIn retained.
- [ ] Footer has only real navigation links and copyright year; back-to-top works; no forced empty columns.

## Content integrity
- [ ] Both VI and EN cover **all newly added visible interface strings**, no untranslated fragments.
- [ ] Q3 2025 vs Q3 2026 metrics match `docs/CONTENT_SPEC.md` exactly.
- [ ] Negative impressions context (`−5.0%`) remains visible.
- [ ] The sitewide team-level attribution disclaimer remains prominently available.
- [ ] Client identity stays confidential; no client URL or secret export is added.
- [ ] No fabricated testimonials, awards, precise publication dates, business results or project durations.
- [ ] Career current role is shown as ongoing (Oct 2026 context), not ended in future Nov 2026.
- [ ] Navigation anchors work locally; published-writing/contact external URLs match CONTENT_SPEC exactly (inspect href values without opening external sites).

## Responsive
- [ ] Desktop 1440×900 (or close): alignment and typography polished.
- [ ] Tablet 768×1024 (or close): no cramped 4-column blocks or hidden controls.
- [ ] Mobile 390×844 and 320–375px width: no page-wide horizontal overflow; name and data labels not clipped.
- [ ] Mobile compare slider does not prevent ordinary page scroll; article carousel swipe operates horizontally.
- [ ] No stacking, overlap or unreadable sections when browser text zoom is increased to 200%.

## Accessibility and SEO
- [ ] One H1; well-structured H2/H3; all content selectable, crawlable DOM text.
- [ ] Active nav/links and action buttons accessible via keyboard; visible focus ring.
- [ ] Tabs correctly manage `aria-selected`, `aria-controls` and focus.
- [ ] When a slider exists, it has `role=slider`, readable aria labels and updated aria values; otherwise the comparison uses semantic non-slider controls.
- [ ] No critical content hidden with JS disabled (test manually or by static inspection).
- [ ] With `prefers-reduced-motion: reduce`: no looping mesh, light sweep, autoplay, or scroll hijack; content still readable.
- [ ] Existing title/meta description and meaningful link text retained or improved; no duplicates or empty anchors.
- [ ] Contrast and touch targets are reasonable (target >=44px).

## Technical sanity
- [ ] No HTML/CSS syntax errors; no TypeScript or runtime errors during initial load, language toggle, nav use, tabs and slider.
- [ ] No broken assets, local 404s or new heavy remote media dependencies.
- [ ] `npm run dev` confirmed or clearly report test limitation.
- [ ] Code is legible enough for later editing; constants/data separate from interaction logic when practical.
- [ ] Changes summarized by file, key interactions implemented, tests performed, known limitations and future optional refinements.
