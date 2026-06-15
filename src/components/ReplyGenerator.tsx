"use client";

import Image from "next/image";
import { useState } from "react";

const TONES = [
  "Friendly - Casual and approachable",
  "Professional - Formal and polished",
  "Apologetic - Sincere and understanding",
  "Grateful - Warm and appreciative",
];

const INDUSTRIES = [
  "General (no specific industry)",
  "Restaurant / Food Service",
  "Hotel / Hospitality",
  "Retail / E-commerce",
  "Healthcare",
  "Professional Services",
];

function StarSquare({
  active,
  onClick,
}: {
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Rating star"
      className={`flex h-[52px] w-[52px] items-center justify-center rounded-md border transition-colors ${
        active
          ? "border-[var(--color-accent)] bg-[#fde9d6]"
          : "border-transparent bg-[#f0f0f0] hover:bg-[#e6e6e6]"
      }`}
    >
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill={active ? "var(--color-accent)" : "#9aa39e"}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M12 2.5l2.95 6.16 6.8.6c.65.06.91.86.42 1.29l-5.17 4.42 1.58 6.62c.15.63-.53 1.13-1.1.79L12 18.9l-6.48 3.48c-.57.34-1.25-.16-1.1-.79l1.58-6.62L.83 10.55c-.49-.43-.23-1.23.42-1.29l6.8-.6L11 2.5c.27-.57 1.1-.57 1.37 0z" />
      </svg>
    </button>
  );
}

function ChevronDown() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[var(--color-ink-soft)]"
    >
      <path
        d="M5 7.5L10 12.5L15 7.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SparkleIcon() {
  return (
    <Image
      src="/images/ai.svg"
      alt=""
      width={22}
      height={22}
      aria-hidden
    />
  );
}

export default function ReplyGenerator() {
  const [review, setReview] = useState("");
  const [tone, setTone] = useState(TONES[0]);
  const [industry, setIndustry] = useState(INDUSTRIES[0]);
  const [business, setBusiness] = useState("");
  const [rating, setRating] = useState(1);

  return (
    <section className="py-12 sm:py-20 lg:py-[100px]">
      <div className="mx-auto w-full max-w-[1320px] px-5 sm:px-6 xl:px-0">
        <div className="mx-auto max-w-[920px] text-center">
          <h2
            data-split
            className="max-w-[910px] font-[family-name:var(--font-radio-canada-big)] text-[26px] font-bold leading-[1.15] tracking-[-0.01em] text-[var(--color-ink)] md:text-[36px] lg:text-[44px] xl:text-[56px]"
          >
            AI-Powered{" "}
            <span className="text-[var(--color-brand)]">
              Google Review Replies
            </span>{" "}
            for Modern Businesses
          </h2>
          <p
            data-reveal
            data-reveal-delay="0.15"
            className="mx-auto mt-5 max-w-[820px] text-[14px] leading-[1.7] text-[var(--color-ink-soft)] sm:text-[16px]"
          >
            Respond to every customer review with smart, personalized, and
            professional AI-generated replies in seconds. RestruHub helps
            businesses save time, improve reputation, and build stronger
            customer trust without sounding robotic.
          </p>
        </div>

        <div
          data-reveal="scale"
          className="mx-auto mt-10 max-w-[1180px] rounded-[20px] bg-[#f3f4f1] p-5 sm:mt-12 sm:p-8 lg:p-10"
        >
          <label className="block">
            <span className="block text-[14px] font-semibold text-[var(--color-ink)] sm:text-[15px]">
              Paste the Google review you want to reply to:
            </span>
            <textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="Write your review here"
              rows={6}
              className="mt-3 w-full resize-none rounded-[12px] border border-[var(--color-line)] bg-white px-5 py-4 text-[14px] text-[var(--color-ink)] placeholder:text-[#9aa39e] focus:border-[var(--color-brand)] focus:outline-none sm:text-[15px]"
            />
          </label>

          <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-3">
            <Field label="Reply Tone:">
              <div className="relative">
                <select
                  value={tone}
                  onChange={(e) => setTone(e.target.value)}
                  className="w-full appearance-none rounded-[12px] border border-[var(--color-line)] bg-white px-4 py-3.5 pr-10 text-[14px] text-[var(--color-ink)] focus:border-[var(--color-brand)] focus:outline-none sm:text-[15px]"
                >
                  {TONES.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
                <ChevronDown />
              </div>
            </Field>

            <Field label="Industry (optional):">
              <div className="relative">
                <select
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  className="w-full appearance-none rounded-[12px] border border-[var(--color-line)] bg-white px-4 py-3.5 pr-10 text-[14px] text-[var(--color-ink)] focus:border-[var(--color-brand)] focus:outline-none sm:text-[15px]"
                >
                  {INDUSTRIES.map((i) => (
                    <option key={i}>{i}</option>
                  ))}
                </select>
                <ChevronDown />
              </div>
            </Field>

            <Field label="Business Name (optional):">
              <input
                type="text"
                value={business}
                onChange={(e) => setBusiness(e.target.value)}
                placeholder="e.g., Joe's Coffee Shop"
                className="w-full rounded-[12px] border border-[var(--color-line)] bg-white px-4 py-3.5 text-[14px] text-[var(--color-ink)] placeholder:text-[#9aa39e] focus:border-[var(--color-brand)] focus:outline-none sm:text-[15px]"
              />
            </Field>
          </div>

          <div className="mt-7 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div>
              <span className="block text-[14px] font-semibold text-[var(--color-ink)] sm:text-[15px]">
                Review Rating:
              </span>
              <div className="mt-3 flex items-center gap-3">
                {[1, 2, 3, 4, 5].map((n) => (
                  <StarSquare
                    key={n}
                    active={n <= rating}
                    onClick={() => setRating(n)}
                  />
                ))}
              </div>
            </div>

            <div className="flex w-full flex-col items-stretch md:w-auto md:items-end">
              <button
                type="button"
                className="btn-cta btn-cta--primary inline-flex items-center justify-center rounded-full px-8 py-4 text-[15px] font-semibold sm:px-12 sm:py-[18px] sm:text-[16px]"
              >
                <span className="btn-cta__inner">
                  <span className="btn-cta__text">
                    <SparkleIcon />
                    <span>Generate AI Reply</span>
                  </span>
                </span>
              </button>
              <p className="mt-3 text-[12px] text-[var(--color-mute)] sm:text-[13px] md:text-right">
                5 free generations per day • Powered by OpenAI GPT-4
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <span className="mb-3 block text-[14px] font-semibold text-[var(--color-ink)] sm:text-[15px]">
        {label}
      </span>
      {children}
    </div>
  );
}
