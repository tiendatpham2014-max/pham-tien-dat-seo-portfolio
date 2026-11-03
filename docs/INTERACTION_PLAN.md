# Interaction plan

The existing portfolio remains the baseline. New interface libraries are evaluated only after the bilingual hero composition passes visual review.

## 0. Stabilize the hero before new effects

- Center the name, role and tagline as one group in the hero content area, independently of the bottom links.
- Compare visual weight and spacing in VI and EN, dark and light, on desktop, tablet and narrow phones.
- Check for clipped text, overlap, horizontal scrolling and reduced-motion behavior.
- Keep the current hero waves and scroll-driven career horizon while evaluating other effects.

## 1. Prepare the interface architecture

- Move language and theme state out of the global DOM initializer into React-owned section state incrementally. Preserve server-rendered content, metadata and the existing VI/EN switch.
- Gather reusable motion timing, color and spacing values into shared tokens so both themes use the same interaction rules.
- Keep animation code close to the section that owns it; retain a shared controller only for genuinely page-wide behavior.
- Evaluate separate VI and EN URLs with appropriate metadata and language alternates as a distinct SEO change.

## 2. Pilot Animate UI

- Start with one interaction, such as Skills tabs or the mobile navigation. Compare keyboard, touch, reduced motion, VI/EN and dark/light before extending it.
- Consider scroll progress only where it communicates actual reading progress. Consider an animated background in one secondary section without replacing the established hero or career scene.
- Do not run the `animate all` CLI against the current project: it has no shadcn component configuration to transform. Install or adapt a specific component only when its use is chosen.
- Page transitions become relevant only if the portfolio gains separate project or writing pages.

## 3. Evaluate Three.js separately

- Prototype one isolated, clearly illustrative visual only if the desired effect cannot be achieved cleanly with the existing Canvas or CSS. Do not present generated shapes as measured GSC data.
- Load the scene only where needed, provide a static fallback, pause when off screen or hidden, respect reduced motion, and release renderer resources on teardown.
- Compare mobile frame rate, loading cost and readability before deciding whether the scene belongs in the website.

References: https://animate-ui.com/docs/installation and https://github.com/mrdoob/three.js/.
