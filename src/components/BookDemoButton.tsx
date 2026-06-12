"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ChevronRight } from "./Icons";

const CALENDLY_URL = "https://calendly.com/restruhub/30min";

declare global {
  interface Window {
    Calendly?: {
      initInlineWidget: (opts: {
        url: string;
        parentElement: HTMLElement;
      }) => void;
    };
  }
}

function ensureCalendlyAssets(onReady: () => void) {
  const cssId = "calendly-widget-css";
  if (!document.getElementById(cssId)) {
    const link = document.createElement("link");
    link.id = cssId;
    link.rel = "stylesheet";
    link.href = "https://assets.calendly.com/assets/external/widget.css";
    document.head.appendChild(link);
  }

  if (window.Calendly) {
    onReady();
    return;
  }

  const scriptId = "calendly-widget-js";
  const existing = document.getElementById(scriptId) as HTMLScriptElement | null;
  if (existing) {
    existing.addEventListener("load", onReady, { once: true });
    return;
  }

  const script = document.createElement("script");
  script.id = scriptId;
  script.src = "https://assets.calendly.com/assets/external/widget.js";
  script.async = true;
  script.addEventListener("load", onReady, { once: true });
  document.body.appendChild(script);
}

export default function BookDemoButton({
  className = "",
  label = "Book a Demo",
  children,
}: {
  className?: string;
  label?: string;
  children?: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const widgetRef = useRef<HTMLDivElement>(null);

  useEffect(() => setMounted(true), []);

  // init Calendly inline widget when modal opens
  useEffect(() => {
    if (!open) return;

    let cancelled = false;
    ensureCalendlyAssets(() => {
      if (cancelled || !widgetRef.current || !window.Calendly) return;
      widgetRef.current.innerHTML = "";
      window.Calendly.initInlineWidget({
        url: CALENDLY_URL,
        parentElement: widgetRef.current,
      });
    });

    return () => {
      cancelled = true;
    };
  }, [open]);

  // lock body scroll + ESC close while modal open
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={className}>
        {children ?? (
          <span className="btn-cta__inner">
            <span className="btn-cta__text">
              <span>{label}</span>
              <span className="btn-arrow">
                <ChevronRight width={20} height={20} />
              </span>
            </span>
          </span>
        )}
      </button>

      {mounted && open && createPortal(
        <div
          className="fixed inset-0 z-[9999] flex items-start justify-center overflow-y-auto bg-black/60 p-4 backdrop-blur-sm sm:p-6"
          onClick={() => setOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Book a demo"
        >
          <div
            className="relative mt-4 w-full max-w-[1000px] overflow-hidden rounded-2xl bg-white shadow-2xl sm:mt-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-[var(--color-ink)] shadow transition hover:bg-white"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              >
                <line x1="3" y1="3" x2="13" y2="13" />
                <line x1="13" y1="3" x2="3" y2="13" />
              </svg>
            </button>
            <div
              ref={widgetRef}
              className="h-[80vh] min-h-[560px] w-full"
              style={{ minWidth: "320px" }}
            />
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
