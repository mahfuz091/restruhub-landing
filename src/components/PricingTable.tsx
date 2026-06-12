"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ChevronRight } from "./Icons";

const columns = ["RestruHub", "Birdeye", "Owner.com", "ReviewTrackers"];

type CellValue = { icon?: "check" | "cross"; bold?: string; sub?: string };

const rows: { feature: string; cells: CellValue[] }[] = [
  {
    feature: "Free Plan Available",
    cells: [
      { icon: "check", sub: "Free starter access" },
      { icon: "cross", sub: "No free plan" },
      { icon: "cross", sub: "No free plan" },
      { icon: "cross", sub: "Custom pricing" },
    ],
  },
  {
    feature: "Starting Price",
    cells: [
      { bold: "$29/mo", sub: "Simple restaurant pricing" },
      { bold: "$299+/mo", sub: "Enterprise pricing" },
      { bold: "$399+/mo", sub: "Growth-focused pricing" },
      { bold: "$259+/mo", sub: "Custom enterprise quotes" },
    ],
  },
  {
    feature: "AI Review Replies",
    cells: [
      { bold: "Instant Auto Replies", sub: "Human-sounding responses" },
      { icon: "check", sub: "AI + templates" },
      { icon: "check", sub: "AI-assisted replies" },
      { icon: "cross", sub: "Basic/manual workflows" },
    ],
  },
  {
    feature: "Direct Google Posting",
    cells: [
      { icon: "check", sub: "Included" },
      { icon: "check", sub: "Included" },
      { icon: "check", sub: "Included" },
      { icon: "check", sub: "Included" },
    ],
  },
  {
    feature: "Multi-Location Support",
    cells: [
      { bold: "Included", sub: "No extra location fee" },
      { bold: "Extra cost", sub: "Per location" },
      { bold: "Higher-tier plans", sub: "Per location" },
      { bold: "Extra cost", sub: "Per location" },
    ],
  },
  {
    feature: "Issue Detection",
    cells: [
      { bold: "Built-in complaint tracking" },
      { bold: "Advanced analytics" },
      { bold: "Limited review insights" },
      { bold: "Analytics-focused" },
    ],
  },
  {
    feature: "Custom Brand Tone",
    cells: [
      { bold: "AI tone customization" },
      { bold: "Template customization" },
      { bold: "Brand voice tools" },
      { bold: "Limited" },
    ],
  },
  {
    feature: "Setup Time",
    cells: [
      { bold: "Under 1 minute", sub: "Connect & start" },
      { bold: "Days", sub: "Lengthy onboarding" },
      { bold: "Days", sub: "Moderate setup" },
      { bold: "Days", sub: "Enterprise setup" },
    ],
  },
  {
    feature: "Best For",
    cells: [
      { bold: "Restaurants & SMBs" },
      { bold: "Enterprise", sub: "Large enterprise brands" },
      { bold: "Multi-location", sub: "Restaurant growth" },
      { bold: "Enterprise", sub: "Analytics teams" },
    ],
  },
  {
    feature: "Ease of Use",
    cells: [
      { bold: "Simple & focused" },
      { bold: "Feature-heavy" },
      { bold: "Marketing-heavy" },
      { bold: "Dashboard-heavy" },
    ],
  },
];

function Cell({ value }: { value: CellValue }) {
  return (
    <div className="flex flex-col items-center gap-1 text-center">
      {value.icon && (
        <Image
          src={`/images/pricing-table/${value.icon === "check" ? "check" : "cross"}.svg`}
          alt=""
          width={26}
          height={26}
          className="h-[26px] w-[26px]"
        />
      )}
      {value.bold && (
        <span className="text-[14px] font-semibold text-[var(--color-ink)] lg:text-[15px]">
          {value.bold}
        </span>
      )}
      {value.sub && (
        <span className="text-[12px] text-[var(--color-ink-soft)] lg:text-[13px]">
          {value.sub}
        </span>
      )}
    </div>
  );
}

export default function PricingTable() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollPct, setScrollPct] = useState(0);

  const onScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setScrollPct(max > 0 ? el.scrollLeft / max : 0);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [onScroll]);

  return (
    <section className="bg-white pb-20 pt-0 lg:pb-[150px] lg:pt-0">
      <div className="mx-auto w-full max-w-[1320px] px-5 sm:px-6 lg:px-0">
        {/* table card */}
        <div ref={scrollRef} className="pricing-scroll overflow-x-auto rounded-[20px] border border-[#D9D9D9]">
          <table className="w-full min-w-[800px] border-collapse">
            {/* header */}
            <thead>
              <tr className="border-b border-[#D9D9D9] bg-[#F6F6F6]">
                <th className="w-[18%] p-4 text-left text-[15px] font-semibold text-[var(--color-ink)] lg:p-5 lg:text-[16px]">
                  Featurer
                </th>
                {columns.map((col, i) => (
                  <th
                    key={col}
                    className={`w-[20.5%] p-4 text-center text-[15px] font-semibold text-[var(--color-ink)] lg:p-5 lg:text-[16px] ${
                      i === 0 ? "bg-[#f9faf7]" : ""
                    }`}
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>

            {/* body */}
            <tbody>
              {rows.map((row) => (
                <tr
                  key={row.feature}
                  className="border-b border-[#D9D9D9] last:border-b-0"
                >
                  <td className="p-4 text-[14px] font-medium text-[var(--color-ink)] lg:px-5 lg:py-6 lg:text-[15px]">
                    {row.feature}
                  </td>
                  {row.cells.map((cell, i) => (
                    <td
                      key={i}
                      className={`p-4 lg:px-5 lg:py-6 ${i === 0 ? "bg-[#f9faf7]" : ""}`}
                    >
                      <Cell value={cell} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* scroll indicator — mobile only */}
        <div className="mt-4 h-[6px] overflow-hidden rounded-full bg-[#e2e2e2] lg:hidden">
          <div
            className="h-full rounded-full bg-[var(--color-brand)] transition-[width] duration-100"
            style={{ width: `${Math.max(30, scrollPct * 100)}%` }}
          />
        </div>

        {/* CTA */}
        <div className="mt-8 flex justify-center sm:mt-10">
          <a
            href="/pricing"
            className="btn-cta btn-cta--primary inline-flex h-14 items-center justify-center whitespace-nowrap rounded-full px-8 text-[16px] font-medium text-white sm:h-16 sm:text-[18px]"
          >
            <span className="btn-cta__inner">
              <span className="btn-cta__text">
                <span>See Our Pricing Plan</span>
                <span className="btn-arrow">
                  <ChevronRight width={20} height={20} />
                </span>
              </span>
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
