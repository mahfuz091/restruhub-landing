"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Features", href: "/#features" },
  { label: "Pricing", href: "/pricing" },
  { label: "Resource", href: "/blog" },
];

function Overlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const bgGlowRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ paused: true });

      tl.set(containerRef.current, { visibility: "visible" });

      // bg curtain drops
      tl.fromTo(
        bgRef.current,
        { scaleY: 0, transformOrigin: "top center" },
        { scaleY: 1, duration: 0.5, ease: "power3.inOut" }
      );

      // glow gradient fades in
      tl.fromTo(
        bgGlowRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.6, ease: "power2.out" },
        "-=0.2"
      );

      // header slides down
      tl.fromTo(
        headerRef.current,
        { y: -30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.45, ease: "power3.out" },
        "-=0.3"
      );

      // nav links stagger
      const validLinks = linksRef.current.filter(Boolean);
      validLinks.forEach((link, i) => {
        const textSpan = link?.querySelector(".nav-text");
        if (!textSpan) return;

        tl.fromTo(
          link,
          { visibility: "hidden" },
          { visibility: "visible", duration: 0.01 },
          0.45 + i * 0.08
        );

        tl.fromTo(
          textSpan,
          { y: 60, opacity: 0, rotateX: -40 },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: 0.7,
            ease: "power3.out",
          },
          0.45 + i * 0.08
        );
      });

      // CTA pops up
      tl.fromTo(
        ctaRef.current,
        { y: 30, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.4)" },
        "-=0.3"
      );

      // tagline
      tl.fromTo(
        taglineRef.current,
        { y: 15, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, ease: "power2.out" },
        "-=0.2"
      );

      tlRef.current = tl;
    }, containerRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!tlRef.current) return;

    if (open) {
      tlRef.current.timeScale(1).play();
    } else {
      tlRef.current.timeScale(1.8).reverse();
    }
  }, [open]);

  return (
    <div
      ref={containerRef}
      className="invisible fixed inset-0 z-[100] flex flex-col"
    >
      {/* bg curtain */}
      <div
        ref={bgRef}
        className="absolute inset-0 bg-[var(--color-ink)]"
        style={{ transform: "scaleY(0)" }}
      />

      {/* gradient glow */}
      <div
        ref={bgGlowRef}
        className="absolute inset-0 opacity-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(0,182,122,0.08) 0%, transparent 70%), radial-gradient(ellipse 60% 40% at 80% 100%, rgba(0,81,40,0.12) 0%, transparent 60%)",
        }}
      />

      {/* header */}
      <div
        ref={headerRef}
        className="relative z-10 flex h-16 items-center justify-between px-5 opacity-0 sm:px-6"
      >
        <Image
          src="/images/logo.svg"
          alt="RestruHub"
          width={120}
          height={18}
          className="brightness-0 invert"
        />
        <button
          onClick={onClose}
          aria-label="Close menu"
          className="group flex h-10 w-10 items-center justify-center rounded-full border border-white/15 transition-all duration-300 hover:border-white/30 hover:bg-white/10"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            stroke="rgba(255,255,255,0.7)"
            strokeWidth="1.5"
            strokeLinecap="round"
            className="transition-all duration-300 group-hover:rotate-90 group-hover:stroke-white"
          >
            <line x1="3" y1="3" x2="15" y2="15" />
            <line x1="15" y1="3" x2="3" y2="15" />
          </svg>
        </button>
      </div>

      {/* centered nav */}
      <nav className="relative z-10 flex flex-1 flex-col items-center justify-center gap-2 px-6">
        {NAV_LINKS.map((link, i) => (
          <Link
            key={link.label}
            href={link.href}
            onClick={onClose}
            ref={(el) => { linksRef.current[i] = el; }}
            className="nav-overlay-link group invisible relative overflow-hidden py-3 text-center"
            style={{ perspective: "600px" }}
          >
            <span className="nav-text block font-[family-name:var(--font-radio-canada-big)] text-[34px] font-bold leading-none tracking-[-0.01em] text-white/80 transition-colors duration-300 group-hover:text-white">
              {link.label}
            </span>
          </Link>
        ))}
      </nav>

      {/* bottom */}
      <div className="relative z-10 flex flex-col items-center gap-6 px-6 pb-10">
        <Link
          ref={ctaRef}
          href="/#get-started"
          onClick={onClose}
          className="flex h-13 w-full max-w-[260px] items-center justify-center rounded-full bg-[var(--color-brand)] text-[15px] font-semibold text-white opacity-0 transition-all duration-300 hover:bg-[#00c987] hover:shadow-[0_0_40px_rgba(0,182,122,0.35)]"
        >
          Get Started
        </Link>

        <div
          ref={taglineRef}
          className="flex items-center gap-4 text-[12px] tracking-[0.08em] uppercase text-white/25 opacity-0"
        >
          <span>Review Management</span>
          <span className="h-1 w-1 rounded-full bg-white/25" />
          <span>Made Simple</span>
        </div>
      </div>
    </div>
  );
}

export default function MobileMenu() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        className="flex h-10 w-10 items-center justify-center rounded-lg md:hidden"
      >
        <div className="flex w-5 flex-col gap-[5px]">
          <span className="h-[2px] w-full rounded-full bg-[var(--color-ink)]" />
          <span className="h-[2px] w-3.5 rounded-full bg-[var(--color-ink)]" />
        </div>
      </button>

      {mounted && createPortal(
        <Overlay open={open} onClose={close} />,
        document.body
      )}
    </>
  );
}
