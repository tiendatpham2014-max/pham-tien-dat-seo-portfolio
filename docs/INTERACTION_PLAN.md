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
- VI and EN now have separate static URLs, route metadata and reciprocal language alternates.

## 2. Skills scroll sequence

The four Skills groups now appear as sequential articles during ordinary page scroll. All Problem, Approach, Typical output and tool details remain visible in the document in VI/EN. A sticky introduction is used only on wide screens; reduced motion and no-JS leave every article readable. The published-writing rows retain their original links at a smaller scale.

- Compare keyboard, touch, reduced motion, VI/EN and dark/light before extending this pattern to other sections.
- Consider scroll progress only where it communicates actual reading progress. Consider an animated background in one secondary section without replacing the established hero or career scene.
- Do not run the `animate all` CLI against the current project: it has no shadcn component configuration to transform. Install or adapt a specific component only when its use is chosen.
- Page transitions become relevant only if the portfolio gains separate project or writing pages.

## 3. Evaluate Three.js separately

The interactive SEO atlas is a conceptual Three.js scene, not measured search data. Its chunk loads only as the section approaches view; a static fallback remains. The scene pauses offscreen or while the page is hidden, respects reduced motion and disposes GPU resources on teardown.

For any further expansion, compare field performance on a low-end phone. Keep the hero and career horizon on their existing implementations.

- Prototype one isolated, clearly illustrative visual only if the desired effect cannot be achieved cleanly with the existing Canvas or CSS. Do not present generated shapes as measured GSC data.
- Load the scene only where needed, provide a static fallback, pause when off screen or hidden, respect reduced motion, and release renderer resources on teardown.
- Compare mobile frame rate, loading cost and readability before deciding whether the scene belongs in the website.

References: https://animate-ui.com/docs/installation and https://github.com/mrdoob/three.js/.

## Rebuild pass: responsive spatial story and shared preferences

- The SEO atlas now uses one morphing 3D model with attached route lines, scroll progression and direct interaction across desktop, tablet and mobile. The text legibility gradients remain.
- Vietnamese first-person copy in the introduction and contact now uses `mình`; the English copy stays concise and balanced. Project attribution and measured claims are unchanged.
- `SitePreferences` owns VI/EN and dark/light selection in React. All sections rendered by the portfolio page read their VI/EN copy from React context. The GSC metric picker also owns its selected metric in React, so changing language does not reset the selection. The legacy language field was removed from the shared mutable state; browser metadata and the document language mirror React's selection for menu and slider accessibility. DOM helpers do not rewrite translated section text.
- The atlas uses a capped pixel ratio and draws only while scrolling or orbiting changes the view. Links and intent contours use lightweight 3D geometry so their stroke stays legible at mobile sizes. Sustained slow frames lower resolution; after movement settles, the sharp frame returns. The WebGL fallback remains. This is an adaptive safeguard, not a measured low-end-device benchmark.

## Language route migration

- `/` is Vietnamese and `/en/` is English. Each static page declares its own HTML language, title, description, canonical, Open Graph URL and ProfilePage URL. Both pages and the sitemap carry reciprocal `hreflang` links.
- The VI/EN control changes the URL and React copy without replaying the intro; refreshing either URL renders the correct language from the initial HTML. Browser back/forward updates the selected language.

## Implemented 3D direction — continuous SEO map

The owner selected the first proposed direction and later requested it in this build alongside the language architecture update.

- Keep the existing five conceptual stages: queries, intent, structure, measurement and decision. They form one changing 3D space rather than five nearly identical planes.
- As the visitor scrolls, dispersed query signals gather inside four intent contours, connect to page-shaped structure nodes, form four labelled metric panels (clicks, impressions, CTR and position), and reveal a brighter priority route. The panels identify what to read; their equal grids do not depict values or trends. One set of nodes and attached links morphs continuously; drag and direct waypoint selection remain available.
- Keep stage labels connected to the active geometry on desktop, tablet and mobile. Preserve VI/EN copy, dark/light themes, keyboard access, reduced motion and a readable fallback.
- The scene represents a method, not measured GSC data. Do not invent client results or show illustrative geometry as factual metrics.
- Reuse the current adaptive rendering and fallback. A successful build does not establish frame rate on a physical low-end phone. No content or case expansion is bundled with this direction.
