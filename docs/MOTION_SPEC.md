# MOTION_SPEC — interaction & animation contracts, v1.2 (calm / conditional patterns)

> Cập nhật 23/10/2026: yêu cầu mới ưu tiên cảnh chữ lớn theo cuộn và thẻ kinh nghiệm xếp lớp. Xem `DARK_REFERENCE_PASS.md` cùng source `190-search-scene.css`, `105-search-scene.js`, `185-dark-direction.css`; các ngưỡng "visual calm" bên dưới là hướng dẫn trước đó.

Purpose: deliver motion that supports comprehension and perceived quality. **Not every pattern is mandatory:** implement only the interactions that the final editorial architecture uses (`docs/CONTENT_ARCHITECTURE.md`). No inert controls or animation added to meet a block count. **Values below are intentionally chosen implementation targets**, not claimed measurements copied from any proprietary source. Behavior is implemented with local CSS and TypeScript client modules.

**Visual calm is mandatory:** motion should be noticed as polish, not as light or movement competing with content. Muted Editorial means low luminance variation, low saturation, gentle pacing and no attention-grabbing shine. See `docs/DESIGN_SPEC.md` palette and brightness discipline.

## 1. Global motion tokens

```css
:root {
  --m-ease-out: cubic-bezier(.16, 1, .3, 1);
  --m-ease-in-out: cubic-bezier(.65, 0, .35, 1);
  --m-fast: 180ms;
  --m-base: 320ms;
  --m-reveal: 700ms;
  --m-slow: 1100ms;
  --m-stagger: 110ms;
  --m-shift: 24px;
}
```

- Hover/focus micro-interactions: 160–260ms, ease-out; transforms usually translateY(-2px to -3px), scale <=1.01. Prefer understated border/tint changes to dramatic lifts. Never make text unreadable during hover.
- Primary entrance reveals: opacity `0→1`, translateY `20–26px→0`, 600–800ms. One play only.
- Stagger within groups: 90–150ms between items, cap overall entrance sequence to ~1.2s.
- Large content transitions: 450–650ms. Avoid simultaneous parallax, zoom and blur.
- 3D tilt, cursor trails, sudden scroll hijacking, aggressive spring bounce: not allowed.
- Use `IntersectionObserver` for reveal and active section tracking; prefer CSS animations for ambient layers.
- Render core content visibly by default; append `.js-motion` only if initialization succeeds. On JS failure never leave invisible content.

## 2. Header / active underline

- Active underline: height 2px, accent color, positioned beneath current nav label; travel via `transform: translateX(...)` and width, transition 300–420ms using `--m-ease-out`.
- On resize, font load and language switch, recompute x/width of active link.
- Scroll-driven active section: `IntersectionObserver` root margins roughly `-25% 0px -60% 0px`; fallback to nearest section top if observers yield no active item. Throttle expensive layout reads.
- Sticky header on scroll: background opacity / thin border fades over ~180ms; avoid overusing `backdrop-filter` on mobile.
- Mobile drawer: 300–380ms translateX(100%→0) + overlay opacity 0→~0.45. Close reverses. Drawer must unmount/hide/focus-guard appropriately; focus-trap or equivalent robust management, Escape closes and focus returns to trigger. Body scroll lock while active.

## 3. Hero mesh gradient

**Composition:** 2–3 *very faint* color clouds over warm stone `#D6D2CA`: muted teal-gray, desaturated mist blue and dusty lavender-gray. Prefer pseudo-elements with animated transform and broad radial gradients. Target color-layer alpha roughly `0.08–0.20` (adjust by eye), with neutral matte background always predominant. Avoid bright sky-blue / white centers, color-bloom, glow, bloom filters and high-opacity gradient stops.

**Loops (desktop):**
- Layer A: `(x:-5%, y:0%, rotation:-5deg, scale:1) → (x:8%, y:5%, rotation:7deg, scale:1.1) → initial` over 18s alternate ease-in-out.
- Layer B: `(x:5%, y:-6%, rotation:3deg, scale:1.08) → (x:-6%, y:7%, rotation:-8deg, scale:1) → initial` over 23s alternate ease-in-out.
- Layer C: `(x:-3%, y:7%, scale:1) → (x:6%, y:-4%, scale:1.06) → initial` over 27s alternate ease-in-out.
- An alternative mesh solution is acceptable if it produces the same restrained and continuous visual impression at much lower cost.
- No flashing opacity, full-screen hue rotation or abrupt loop seam. Do not animate brightness, contrast, saturation, hue or glowing shadows to create the mesh; use very slow small-position changes instead. Set `pointer-events:none` and `aria-hidden=true` on decorative layer.
- Mobile: reduce layers / blur strength / motion amplitude. Pause/offload ambient movement on devices performing poorly where practical; never allow it to obscure text.

**Load entrance:**
- Eyebrow `0ms`; title `120ms`; subtitle `260ms`; CTA group `400ms`. Use 650–800ms each; visual intro <=1.3s total.
- Optional tiny arrow/scroll hint pulses at very low amplitude <=4px over 3–4s, disabled in reduced motion.
- The SEO decision lab uses one illustrative situation. Its question, reading and output change only when the visitor chooses a stage or presses the next arrow; the progress line and background focus follow that choice. Reduced motion keeps every stage usable without the text transition.

## 4. Editorial intro

- Heading and body reveal once at intersection threshold ~0.12, 700ms translateY 24px + opacity.
- On mobile no elaborate horizontal translation.

## 5. Case metrics & optional split comparison slider

- **Only apply the slider specifications below if a real draggable slider was selected because it helps understanding.** Otherwise, create accessible matched-period cards/table without fake handle/slider ARIA. Period data and attribution remain mandatory in either design.

**Data and geometry:**
- Comparison frame left/right share exact width and matching markup. Divider `--split:50%`; update clip width or clip-path by percentage. Keep layout stable, no text reflow while dragging.
- Slider state range `[0,100]`, initialized at 50, hard-clamped to range. Pointer position relative to comparison container using `getBoundingClientRect()`; supports mouse, touch and pen with Pointer Events.
- Pointer handling: call `setPointerCapture` on handle, update on `pointermove` while captured, release on up/cancel. On browsers without pointer capture, document-level temporary listeners acceptable. Limit updates to one requestAnimationFrame per frame.
- Keyboard: ArrowLeft/Right ±5, Shift+Arrow ±10, Home 0, End 100. Update `aria-valuenow`, `aria-valuetext` in current locale. Visible focus ring.
- Separator is always clearly visible; no zero contrast handle. Underlying transparent overlays must not swallow links or keyboard access.
- Visual drag response immediate; no easing lag while pointer is dragging. On first reveal, optional tiny 50%→54%→50% demonstration for a single cycle only if reduced motion is off and before any interaction. Not essential.
- Data counters do NOT spin with invented random values. Original metrics can crossfade on tab change in 180ms; never obscure attribution footnote.

## 6. Process milestone timeline

- Section enters: connecting dotted line may reveal over 900ms with background-size/scaleX; individual numbered nodes appear in 120ms stagger.
- Step cards use opacity + translateY(16px), 550–650ms. On mobile card sequence triggers as cards individually enter rather than all at once.
- Active node/connector can update to reflect scroll progress, but it must not imply a business outcome or checkmark completion.
- No automatic card cycling; user scroll determines progress.

## 7. Capability tabs / controlled autoplay

- Default first active tab: `Technical SEO`; use semantic tabs.
- Autoplay interval suggested `7000ms` **only when** section intersects viewport >=0.4, document visible, pointer not hovering, focus not in tab section, no reduced motion, and no user manual selection in this session.
- On direct user tab interaction, stop autoplay for remaining session/page lifetime; don't surprise the visitor by moving content while they read.
- Transition: old panel opacity 1→0 160–200ms, new panel opacity 0→1 and translateY(8px→0) 250–350ms. Ensure no overlapping content leaks into focus/accessibility tree. CSS `display:none`/`hidden` for inactive panel after transition, or implement instant swap + fade-in; avoid simultaneous aria-visible duplicates.
- Progress bar for autoplay: linear fill 0→100 over 7s; reset on advance; freeze when paused; hide for reduced motion.
- On mobile tab labels can horizontally scroll; support touch and keyboard; do not auto-swipe whole page.
- ArrowLeft/Right moves focus and activates adjacent tabs, Home/End first/last; adjust roving tabIndex.

## 8. Writing article rail

- Native horizontal scrolling plus CSS `scroll-snap-type:x mandatory`; articles `scroll-snap-align:start`.
- Prev/next button scrolls by one card width + gap using `scrollBy` or `scrollTo`; disable at edges when reliably detectable.
- Mobile swipe must work with native scrolling; `touch-action:pan-x` on track where appropriate, not on entire page.
- On `prefers-reduced-motion`, use instant scrolling and no entrance stagger beyond simple opacity.
- Cards hover: translateY(-2px) and a slightly darker/lighter *muted* tint/border over 200ms; article arrow translateX(3px) 180ms. No flash or glow. No perpetual automatic movement of cards.
- On keyboard navigation, ensure focused article is scrolled into view. Optional progress dots should reflect actual scroll and not be dead controls.

## 9. Experience scroll-linked horizon

- Features 17 is the primary motion reference for this section. A dawn travels over a curved planet as the viewer reads the three career roles. Process keeps its separate checklist timeline.

- Desktop: the dawn position is driven by scroll progress; milestone labels brighten in sequence. No automatic looping.
- Scroll entry: milestones reveal in order; connecting path/line activates as section moves through view. Prefer scroll-based class changes or intersection events, not heavy 60fps JS.
- Responsive mobile: the same horizon and active role share one scroll-linked scene; the light follows scroll without looping.
- The sky and role text share one sticky wrapper contained by the Experience section. The wrapper leaves before the independent Contact section begins, so neither scene nor contact cards overlap the other.
- Every timeline item stays in DOM, visible in reduced-motion/no-JS environments.
- Avoid unsupported city/office labels, faux project-year durations and fictional progress percentages.

## 10. Contact cards & footer

- Contact: at intersection one-time reveal with 100ms stagger; hover/focus changes card border by one muted tone and translateY(-2px) over 220ms; arrows move ~3px. No luminous outlines or bright-white card flashes.
- Footer: simple divider/wordmark fade once; links underline/ink transition in 180ms. Never animate every link indefinitely.

## 11. Reduced motion / accessibility / lifecycle

Implement both CSS and JS checks.

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
  .js-motion .inview { opacity: 1 !important; transform: none !important; }
}
```

- `matchMedia('(prefers-reduced-motion: reduce)')`: disable all ambient loops, automated tabs and optional demo motions. Respect runtime changes if feasible.
- Pause any expensive ambient animation and timers on `document.visibilityState === 'hidden'`.
- Do not lock normal page scrolling or hijack wheel events. Don't rely on hover to reveal essential text.
- Respect keyboard focus; transitions must not trap screen readers in visually hidden panels.
- Support `:focus-visible` with >=3px perceptible outline.

## 12. Performance boundaries

- Aim for smooth 60fps on a mid-range laptop; no hard guarantee of frame rate in all hardware.
- Prefer GPU-friendly `transform`/`opacity`; minimize paint-heavy `filter:blur`, `box-shadow` and `clip-path` animation on full viewport surfaces.
- No WebGL/canvas/3D runtime required; no added npm dependencies just for animation.
- For observers/listeners, clean up and avoid duplicate initialization, especially after VI/EN toggle.
- Images/assets lazy-load if introduced; no fake stock images. Avoid CLS via stable heights/widths.
- Do not make animation quality more important than content clarity and working links.

## 13. Concrete acceptance scenarios

1. Start page; hero appears readable immediately while its soft mesh moves smoothly (reduced-motion: still).
2. Scroll; underline follows currently seen section; language toggle changes nav widths without misalignment.
3. Open mobile nav by keyboard; drawer gets focus; Escape closes and returns focus; anchor click closes and scrolls.
4. Compare periods using a readable table. **If** a slider is built, touch drag, keyboard arrows/Home/End and ARIA values must work; never require dragging to read the data.
5. Capability tab auto-progresses only under safe conditions; stops after manual selection and under reduced-motion.
6. Writing rail swipes; article URLs work; cards are not fabricated testimonials.
7. Career rail/timeline is legible with JS disabled/reduced-motion, avoids redundant motion and shows no invented dates.
8. Scroll to contact; `mailto`, `tel` and LinkedIn are functional.
