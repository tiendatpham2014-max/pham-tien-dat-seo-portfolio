# QA_CHECKLIST — Definition of Done (v4: content-first)

A task is complete only when the site works in the existing static setup and these checks are addressed. Report which checks were actually run; never say all passed without testing.

## Cleanup of retired references
- [ ] `docs/references.md` and `docs/design-direction.json` deleted if present; not restored from the spec pack.
- [ ] Legacy design-reference URLs, obsolete design-crawl instructions and links to deleted reference docs removed from repository instructions.
- [ ] Only retired design reference materials removed; actual website source, evidence, content and assets preserved.

## Source preservation
- [ ] Read existing `dist/index.html`, its i18n strings and local hosting setup first.
- [ ] Existing local entry runs using `npm run dev` and serves `http://localhost:4173`.
- [ ] No migration to React/Vite/Next or new packages unless indispensable and explained.
- [ ] `.openai/hosting.json` untouched unless absolutely necessary.
- [ ] No external design/reference websites opened or crawled; no premium/proprietary code imported.
- [ ] Do not touch main or existing production. After tests, push only the **dedicated redesign branch** authorized by the user; deploy preview/staging only when it is safely separate from production.

## Soft / muted visual direction (mandatory)
- [ ] Backgrounds use warm-stone and soft-ivory neutrals rather than full-page pure white; no glaring pastel or neon sections.
- [ ] Hero mesh stays subtle, matte, low-opacity and secondary to the headline; no luminous cyan/purple spots or glowing headline effects.
- [ ] Accent teal/lavender stays restrained; no bright white card flashes or glow on hover.
- [ ] Dark slate sections provide deliberate contrast without turning the entire site into dark mode or creating harsh light/dark stripes.
- [ ] Normal body text, links, buttons and focus indicators maintain WCAG AA contrast where possible despite a soft palette.
- [ ] Review the actual local preview on desktop and mobile; if a section looks too bright, saturated or visually noisy, refine palette and motion before calling the redesign finished.

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
- [ ] No HTML/CSS syntax errors; no JS runtime errors during initial load, language toggle, nav use, tabs and slider.
- [ ] No broken assets, local 404s or new heavy remote media dependencies.
- [ ] `npm run dev` confirmed or clearly report test limitation.
- [ ] Code is legible enough for later editing; constants/data separate from interaction logic when practical.
- [ ] Changes summarized by file, key interactions implemented, tests performed, known limitations and future optional refinements.
