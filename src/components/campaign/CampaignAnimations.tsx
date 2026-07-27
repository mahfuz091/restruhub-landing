"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Campaign motion — a direct port of the standalone sales page's main.js.
 *
 * The site-wide engine (SiteAnimations) uses different easings, triggers and
 * a batch reveal, so it is deliberately not reused here: the campaign page has
 * its own orchestrated hero timeline, per-image rises and step-number pop.
 * Campaign markup carries no `data-reveal` markers, so SiteAnimations is a
 * no-op on this route and the two engines never fight over the same element.
 *
 * Pre-hide lives in campaign.css under `html.canim`, added before first paint
 * by the inline script in the campaign layout. The class is dropped here in the
 * same synchronous block that creates the tweens, so `gsap.from()` reads the
 * real end state (not the pre-hidden `opacity: 0`) and nothing ever flashes.
 */

const EASE = "power3.out";

type FadeUpOpts = {
  y?: number;
  duration?: number;
  stagger?: number;
  trigger?: Element;
  start?: string;
};

export default function CampaignAnimations() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>(".campaign");
    if (!root) return;

    const html = document.documentElement;
    (window as unknown as { __campaignAnim?: boolean }).__campaignAnim = true;

    // Drop the pre-hide first: gsap.from() must capture the natural end state.
    html.classList.remove("canim");

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const sections = Array.from(
        root.querySelectorAll<HTMLElement>("main > section"),
      );
      const hero = sections[0];
      if (!hero) return;

      /* ---------- Hero: orchestrated load-in ---------- */
      const tl = gsap.timeline({ defaults: { ease: EASE, duration: 0.9 } });
      tl.from(hero.querySelector(".badge"), {
        y: 18,
        opacity: 0,
        duration: 0.6,
      })
        .from(hero.querySelector(".h-hero"), { y: 34, opacity: 0 }, "-=0.35")
        .from(hero.querySelector(".lead"), { y: 24, opacity: 0 }, "-=0.6")
        .from(
          hero.querySelector(".cta"),
          { y: 20, opacity: 0, scale: 0.96 },
          "-=0.55",
        )
        .from(
          hero.querySelector(".note"),
          { y: 14, opacity: 0, duration: 0.6 },
          "-=0.6",
        );

      /* ---------- Hero glow: ambient float + scroll parallax ---------- */
      gsap.to(".glow-l", {
        y: 34,
        duration: 6,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
      gsap.to(".glow-r", {
        y: -34,
        duration: 7,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
      gsap.to(".glow", {
        yPercent: 24,
        ease: "none",
        scrollTrigger: {
          trigger: hero,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      /* ---------- Helpers ---------- */
      const fadeUp = (els: ArrayLike<Element>, opts: FadeUpOpts = {}) => {
        const targets = Array.from(els).filter(Boolean);
        if (!targets.length) return;
        gsap.from(targets, {
          opacity: 0,
          y: opts.y ?? 40,
          duration: opts.duration ?? 0.85,
          ease: EASE,
          stagger: opts.stagger ?? 0.1,
          // 'top bottom-=60' fires the instant an element enters from the
          // bottom edge — reachable for every section, including those pinned
          // to the page bottom (avoids the ScrollTrigger footer trap).
          scrollTrigger: {
            trigger: opts.trigger ?? targets[0],
            start: opts.start ?? "top bottom-=60",
            once: true,
          },
        });
      };

      /* ---------- Per-section reveals ---------- */
      sections.forEach((sec, i) => {
        if (i === 0) return; // hero handled above

        // images: rise + settle, each on its own trigger
        sec.querySelectorAll("img").forEach((img) => {
          gsap.from(img, {
            opacity: 0,
            y: 56,
            scale: 0.97,
            duration: 1,
            ease: EASE,
            scrollTrigger: {
              trigger: img,
              start: "top bottom-=40",
              once: true,
            },
          });
        });

        // text / interactive blocks: staggered fade-up
        const blocks = sec.querySelectorAll(
          ".h-hero, .h-sec, .h-feat, .badge, .lead, .cta, .tick, .step, .note",
        );
        fadeUp(blocks, {
          trigger: sec,
          start: "top bottom-=60",
          stagger: 0.09,
        });

        // FAQ rows: the list is taller than the viewport, so a section-level
        // trigger would burn the reveal on rows the reader can't see yet —
        // each row gets its own trigger instead.
        sec.querySelectorAll(".faq-item").forEach((item) => {
          fadeUp([item], { y: 28, duration: 0.7 });
        });
      });

      /* ---------- Step cards: extra pop on the number ---------- */
      gsap.utils.toArray<HTMLElement>(".step").forEach((step) => {
        const num = step.querySelector(".step-num");
        if (!num) return;
        gsap.from(num, {
          scale: 0.4,
          opacity: 0,
          duration: 0.6,
          ease: "back.out(2)",
          scrollTrigger: { trigger: step, start: "top bottom-=40", once: true },
        });
      });

      /* ---------- Footer: gentle fade-up ---------- */
      const footer = root.querySelector("footer .footer-bar");
      if (footer) {
        gsap.from(footer, {
          opacity: 0,
          y: 30,
          duration: 0.8,
          ease: EASE,
          scrollTrigger: {
            trigger: footer,
            start: "top bottom-=20",
            once: true,
          },
        });
      }

      /* CTA hover is handled purely in CSS (Hyperion fill-wipe + label roll).
         No JS-driven movement. */

      ScrollTrigger.refresh();
    }, root);

    // recompute once images/fonts finish loading (layout can shift)
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);

    return () => {
      window.removeEventListener("load", onLoad);
      ctx.revert();
    };
  }, []);

  return null;
}
