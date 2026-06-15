---
name: gsap-animation-system
description: How site-wide GSAP scroll animations work — marker attributes + single client engine
metadata:
  type: project
---

Site-wide GSAP animation is driven by ONE client engine, `src/components/SiteAnimations.tsx` (mounted once in `src/app/layout.tsx`). Server components stay server components — they only carry static marker attributes the engine reads:

- `data-split[="words"]` — main heading; SplitText masked line (or word) rise, expo.out (one per section, largest heading only)
- `data-reveal[="up|left|right|scale|fade|clip|blur"]` + optional `data-reveal-delay="0.2"` — single block animates in (clip = image wipe, needs `overflow-hidden` wrapper)
- `data-reveal-stagger` — container whose DIRECT CHILDREN reveal in sequence
- `data-count` (+ `data-count-prefix`/`data-count-suffix`) — number counts up
- `data-parallax="0.15"` — scrub parallax (native scroll, no ScrollSmoother). NOTE: don't combine with a Tailwind `scale`/`transform` class on the same element — both fight over `transform`.
- `data-float` — gentle continuous float (decor); `data-marquee="40"` — infinite horizontal scroll (auto-duplicates children, px/sec)
- `data-tilt="8"` — pointer 3D tilt; `data-magnetic` — pointer-follow (primary CTAs `.btn-cta--primary` get magnetic automatically)
- `data-navbar` — sticky header condense on scroll

**To animate a new section, add these attributes — do NOT write new GSAP code.** Never put `data-reveal`/`data-split` on a direct child of a `data-reveal-stagger` container (double-hide).

No-FOUC: globals.css pre-hides marked elements under `html.gsap`; an inline `<body>` script in layout.tsx adds `gsap` before paint and a 2.5s failsafe strips it if the engine never boots. `prefers-reduced-motion` reveals everything with no motion. Full GSAP incl. premium plugins (ScrollTrigger, SplitText) ships free in the installed `gsap` 3.15 package. Decision: native scroll, no ScrollSmoother (keeps sticky navbar + anchor links intact).
