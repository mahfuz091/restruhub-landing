"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

/**
 * Single client-side animation engine for the whole site.
 *
 * Server components stay server components — they only carry static marker
 * attributes that this engine reads on mount:
 *
 *   data-reveal[="up|left|right|scale|fade|clip|blur"]  one element animates in
 *   data-reveal-stagger                          direct children reveal in sequence
 *   data-reveal-delay="0.2"                       extra start delay (seconds)
 *   data-split[="words"]                          heading split into masked lines/words
 *   data-count[="1234"]                           number counts up (value from attr or text)
 *   data-count-suffix / data-count-prefix         text wrapped around the number
 *   data-parallax="0.2"                           scrub parallax (fraction of height)
 *   data-float                                     gentle continuous float (decor)
 *   data-marquee[="40"]                            infinite horizontal scroll of children
 *   data-tilt                                     pointer-follow 3D tilt
 *   data-magnetic                                 pointer-follow magnetic effect
 *   data-navbar                                   sticky header — condense on scroll
 *
 * Primary CTAs (.btn-cta--primary) get the magnetic effect automatically.
 *
 * Pre-hide for marked elements lives in globals.css under `html.gsap` so there
 * is never a flash of un-animated content. `prefers-reduced-motion` short-circuits
 * everything and the CSS reveals all marked elements at full opacity.
 */

const EASE = "power4.out";

let registered = false;
function ensureRegistered() {
  if (registered) return;
  gsap.registerPlugin(ScrollTrigger, SplitText);
  registered = true;
}

export default function SiteAnimations() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    (window as unknown as { __gsapReady?: boolean }).__gsapReady = true;

    if (reduced) return; // CSS already shows everything; do no motion.

    ensureRegistered();

    const ctx = gsap.context(() => {
      // ── Single-element reveals (batched for performance + local stagger) ──
      ScrollTrigger.batch("[data-reveal]", {
        start: "top 86%",
        once: true,
        onEnter: (batch) =>
          batch.forEach((el) => {
            const node = el as HTMLElement;
            const delay = parseFloat(node.dataset.revealDelay || "0");
            const kind = node.dataset.reveal || "";
            gsap.to(node, {
              opacity: 1,
              x: 0,
              y: 0,
              scale: 1,
              ...(kind === "clip" ? { clipPath: "inset(0% 0% 0% 0%)" } : {}),
              ...(kind === "blur" ? { filter: "blur(0px)" } : {}),
              duration: kind === "clip" ? 1.2 : 1.05,
              delay,
              ease: kind === "clip" ? "expo.out" : EASE,
              overwrite: true,
              onComplete: () => {
                if (kind === "blur") node.style.filter = "";
              },
            });
          }),
      });

      // ── Staggered groups — children animate together when the group enters ──
      gsap.utils
        .toArray<HTMLElement>("[data-reveal-stagger]")
        .forEach((group) => {
          const delay = parseFloat(group.dataset.revealDelay || "0");
          gsap.to(Array.from(group.children), {
            opacity: 1,
            x: 0,
            y: 0,
            scale: 1,
            duration: 1,
            delay,
            ease: EASE,
            stagger: 0.09,
            scrollTrigger: { trigger: group, start: "top 85%", once: true },
          });
        });

      // ── Parallax (scrub) ──
      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
        const amount = parseFloat(el.dataset.parallax || "0.2");
        gsap.fromTo(
          el,
          { yPercent: -amount * 50 },
          {
            yPercent: amount * 50,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      });

      // ── Gentle continuous float (decorative) ──
      gsap.utils.toArray<HTMLElement>("[data-float]").forEach((el, i) => {
        gsap.to(el, {
          y: "+=14",
          duration: 2.6 + (i % 3) * 0.4,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });
      });

      // ── Infinite marquee ──
      gsap.utils.toArray<HTMLElement>("[data-marquee]").forEach((track) => {
        const speed = parseFloat(track.dataset.marquee || "40"); // px/sec
        const original = Array.from(track.children) as HTMLElement[];
        if (!original.length) return;
        // Duplicate children once so the loop is seamless.
        original.forEach((c) => track.appendChild(c.cloneNode(true)));
        const half = track.scrollWidth / 2;
        gsap.set(track, { willChange: "transform" });
        const tween = gsap.to(track, {
          x: -half,
          duration: half / speed,
          ease: "none",
          repeat: -1,
          modifiers: { x: gsap.utils.unitize((x: number) => x % half) },
        });
        track.addEventListener("pointerenter", () => tween.timeScale(0.25));
        track.addEventListener("pointerleave", () => tween.timeScale(1));
      });

      // ── Count-up numbers ──
      gsap.utils.toArray<HTMLElement>("[data-count]").forEach((el) => {
        const raw = el.dataset.count || el.textContent || "0";
        const end = parseFloat(raw.replace(/[^0-9.]/g, "")) || 0;
        const decimals = (raw.split(".")[1] || "").length;
        const prefix = el.dataset.countPrefix || "";
        const suffix = el.dataset.countSuffix || "";
        const obj = { v: 0 };
        el.textContent = `${prefix}0${suffix}`;
        gsap.to(obj, {
          v: end,
          duration: 1.8,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
          onUpdate: () => {
            el.textContent = `${prefix}${obj.v
              .toFixed(decimals)
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}${suffix}`;
          },
        });
      });

      // ── 3D pointer tilt ──
      gsap.utils.toArray<HTMLElement>("[data-tilt]").forEach((el) => {
        const max = parseFloat(el.dataset.tilt || "8");
        gsap.set(el, {
          transformPerspective: 900,
          transformStyle: "preserve-3d",
        });
        const rx = gsap.quickTo(el, "rotationX", {
          duration: 0.5,
          ease: "power3",
        });
        const ry = gsap.quickTo(el, "rotationY", {
          duration: 0.5,
          ease: "power3",
        });
        el.addEventListener("pointermove", (e) => {
          const r = el.getBoundingClientRect();
          const px = (e.clientX - r.left) / r.width - 0.5;
          const py = (e.clientY - r.top) / r.height - 0.5;
          rx(-py * max * 2);
          ry(px * max * 2);
        });
        el.addEventListener("pointerleave", () => {
          rx(0);
          ry(0);
        });
      });

      // ── Magnetic pointer-follow (explicit markers + primary CTAs) ──
      const magnets = new Set<HTMLElement>([
        ...gsap.utils.toArray<HTMLElement>("[data-magnetic]"),
        ...gsap.utils.toArray<HTMLElement>(".btn-cta--primary"),
      ]);
      magnets.forEach((el) => {
        const xTo = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3" });
        const yTo = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3" });
        const strength = parseFloat(el.dataset.magnetic || "0.3");
        el.addEventListener("pointermove", (e) => {
          const r = el.getBoundingClientRect();
          xTo((e.clientX - (r.left + r.width / 2)) * strength);
          yTo((e.clientY - (r.top + r.height / 2)) * strength);
        });
        el.addEventListener("pointerleave", () => {
          xTo(0);
          yTo(0);
        });
      });

      // ── Sticky navbar condense on scroll ──
      const nav = document.querySelector<HTMLElement>("[data-navbar]");
      if (nav) {
        ScrollTrigger.create({
          start: "top -80",
          end: 99999,
          onUpdate: (self) =>
            nav.classList.toggle("is-scrolled", self.scroll() > 80),
        });
      }

      // ── Split-text headings — after fonts settle ──
      // Default (plain `data-split`): the section-title color sweep — each
      // character starts dim and lights up to its real color left-to-right,
      // tied to scroll (scrub). `data-split="words"` / `"lines"` opt into the
      // masked rise instead (used by the hero).
      const runSplits = () => {
        gsap.utils.toArray<HTMLElement>("[data-split]").forEach((el) => {
          const mode = el.dataset.split; // '', 'words', 'lines'

          if (mode === "words" || mode === "lines") {
            const byLines = mode === "lines";
            SplitText.create(el, {
              type: "words,lines",
              mask: "lines",
              autoSplit: true,
              onSplit(self) {
                gsap.set(el, { opacity: 1 });
                const targets = byLines ? self.lines : self.words;
                return gsap.from(targets, {
                  yPercent: 110,
                  opacity: 0,
                  duration: byLines ? 1.05 : 0.85,
                  ease: "power4.out",
                  stagger: byLines ? 0.14 : 0.045,
                  scrollTrigger: { trigger: el, start: "top 85%", once: true },
                });
              },
            });
            return;
          }

          // Line-by-line wipe — each line reveals left-to-right via clip-path
          // over a dim clone sitting underneath, tied to scroll (scrub). The
          // real (top) line keeps every per-span colour intact.
          const dim = el.dataset.dim || "rgba(0, 31, 15, 0.16)";
          SplitText.create(el, {
            type: "lines",
            linesClass: "split-line",
            autoSplit: true,
            onSplit(self) {
              gsap.set(el, { opacity: 1 });
              self.lines.forEach((line) => {
                const node = line as HTMLElement;
                // Dim clone underneath shows the not-yet-revealed text.
                const clone = node.cloneNode(true) as HTMLElement;
                clone.setAttribute("aria-hidden", "true");
                clone.style.position = "absolute";
                clone.style.left = "0";
                clone.style.top = "0";
                clone.style.pointerEvents = "none";
                clone.style.color = dim;
                clone
                  .querySelectorAll<HTMLElement>("*")
                  .forEach((c) => (c.style.color = dim));

                const wrap = document.createElement("span");
                wrap.style.position = "relative";
                wrap.style.display = "inline-block";
                node.parentNode?.insertBefore(wrap, node);
                wrap.appendChild(clone);
                node.style.position = "relative";
                wrap.appendChild(node);
              });
              return gsap.fromTo(
                self.lines,
                { clipPath: "inset(0 100% 0 0)" },
                {
                  clipPath: "inset(0 0% 0 0)",
                  ease: "none",
                  stagger: 0.25,
                  scrollTrigger: {
                    trigger: el,
                    start: "top 85%",
                    end: "top 40%",
                    scrub: 0.8,
                  },
                },
              );
            },
          });
        });
        ScrollTrigger.refresh();
      };

      if (document.fonts?.status === "loaded") runSplits();
      else (document.fonts?.ready || Promise.resolve()).then(runSplits);
    });

    // Drop the `html.gsap` pre-hide class after the initial reveal pass so
    // that streaming content (e.g. loading.tsx → page.tsx swap) is not
    // permanently invisible. The class is re-added on every navigation by
    // the layout's inline script, so this only affects the current page.
    const removeGsapClassTimer = window.setTimeout(() => {
      document.documentElement.classList.remove("gsap");
    }, 0);

    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);

    return () => {
      window.clearTimeout(removeGsapClassTimer);
      window.removeEventListener("load", onLoad);
      ctx.revert();
    };
  }, [pathname]);

  return null;
}
