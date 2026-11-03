# Interaction plan

The existing portfolio remains the baseline. The bilingual hero composition was stabilized before the first library pilot.

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

Implemented: the four Skills groups use Animate UI Tabs with a moving selection and sliding panels. Selection is manual, keyboard accessible and follows reduced-motion preferences. This section now owns its React state; the existing VI/EN switch notifies it when language changes.

- Start with one interaction, such as Skills tabs or the mobile navigation. Compare keyboard, touch, reduced motion, VI/EN and dark/light before extending it.
- Consider scroll progress only where it communicates actual reading progress. Consider an animated background in one secondary section without replacing the established hero or career scene.
- Do not run the `animate all` CLI against the current project: it has no shadcn component configuration to transform. Install or adapt a specific component only when its use is chosen.
- Page transitions become relevant only if the portfolio gains separate project or writing pages.

## 3. Evaluate Three.js separately

Implemented as a constrained pilot in Skills: an orthographic, flat signal-flow illustration. It represents the conceptual sequence named under each group, not measured search data. The Three.js chunk loads only as the section approaches view; SVG remains as the static fallback. The scene pauses offscreen or while the page is hidden, respects reduced motion and disposes GPU resources on teardown.

Next evaluation: compare field performance on a low-end phone before extending the scene. Keep the hero and career horizon on their existing implementations.

- Prototype one isolated, clearly illustrative visual only if the desired effect cannot be achieved cleanly with the existing Canvas or CSS. Do not present generated shapes as measured GSC data.
- Load the scene only where needed, provide a static fallback, pause when off screen or hidden, respect reduced motion, and release renderer resources on teardown.
- Compare mobile frame rate, loading cost and readability before deciding whether the scene belongs in the website.

References: https://animate-ui.com/docs/installation and https://github.com/mrdoob/three.js/.

## Rebuild pass: responsive spatial story and shared preferences

- The SEO atlas keeps the five connected 3D planes, route lines, scroll progression and direct interaction on desktop and tablet. Tablet uses a wider camera view and a text legibility gradient, without removing the route geometry.
- Vietnamese first-person copy in the introduction and contact now uses `mình`; the English copy stays concise and balanced. Project attribution and measured claims are unchanged.
- `SitePreferences` owns VI/EN and dark/light selection in React. Existing static sections still receive translation through the DOM adapter while the navigation, Skills and SEO atlas read the shared React state.
- Narrow or constrained devices start at a lower pixel ratio and a 30 fps cap; sustained slow frames lower resolution and the cap to 24 fps. The WebGL fallback remains. This is an adaptive safeguard, not a measured low-end-device benchmark.

## Later phase

- Evaluate separate VI and EN URLs, metadata and language alternates as one SEO migration. Do not change routing in this rebuild pass.
