"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronRight } from "./Icons";
import type { PricingPlan, BillingCycle } from "@/lib/pricing";
import type { Region } from "@/lib/region";

const CYCLE_LABEL: Record<BillingCycle, string> = {
  monthly: "Monthly",
  "half-yearly": "Half-Yearly",
  yearly: "Yearly",
};

const CYCLE_PERIOD: Record<BillingCycle, string> = {
  monthly: "/Monthly",
  "half-yearly": "/6 Months",
  yearly: "/Yearly",
};

// Tier badge colors keyed by plan order (0=free, 1=starter, 2=pro, 3=enterprise, 4+=fallback)
const TIER_COLORS: Record<number, string> = {
  0: "bg-[var(--color-accent)] text-white",
  1: "bg-[#35ABFF] text-white",
  2: "bg-[#FF3460] text-white",
  3: "bg-[#0088FF] text-white",
};
const TIER_COLOR_FALLBACK = "bg-[#525252] text-white";

function getTierColor(plan: PricingPlan, index: number): string {
  const key = plan.order ?? index;
  return TIER_COLORS[key] ?? TIER_COLOR_FALLBACK;
}

function getPriceValue(
  plan: PricingPlan,
  cycle: BillingCycle,
  region: Region,
): number | null {
  const useEur = region === "eur";
  if (cycle === "monthly")
    return useEur
      ? (plan.monthlyPriceEur ?? plan.monthlyPrice ?? null)
      : (plan.monthlyPrice ?? null);
  if (cycle === "half-yearly")
    return useEur
      ? (plan.halfYearlyPriceEur ?? plan.halfYearlyPrice ?? null)
      : (plan.halfYearlyPrice ?? null);
  return useEur
    ? (plan.yearlyPriceEur ?? plan.yearlyPrice ?? null)
    : (plan.yearlyPrice ?? null);
}

function formatPrice(
  plan: PricingPlan,
  cycle: BillingCycle,
  region: Region,
): string {
  if (plan.pricingType === "free_trial")
    return plan.customPricingLabel?.trim() || "Free";
  if (plan.pricingType === "custom")
    return plan.customPricingLabel?.trim() || "Custom Pricing";
  const value = getPriceValue(plan, cycle, region);
  if (value == null) return plan.customPricingLabel?.trim() || "—";
  const symbol = region === "eur" ? "€" : "$";
  return `${symbol}${value.toLocaleString()}`;
}

function getFeatures(plan: PricingPlan): string[] {
  const extras: string[] = [];
  if (typeof plan.maxUsers === "number")
    extras.push(`Up to ${plan.maxUsers.toLocaleString()} users`);
  if (typeof plan.reviewsPerMonth === "number")
    extras.push(`Up to ${plan.reviewsPerMonth.toLocaleString()} reviews/month`);
  return [...extras, ...plan.features];
}

interface Props {
  plans: PricingPlan[];
  initialRegion: Region;
}

export default function PricingPlansEn({ plans, initialRegion }: Props) {
  const paidPlans = plans.filter((p) => p.pricingType !== "free_trial");

  const availableCycles: BillingCycle[] = Array.from(
    new Set(paidPlans.flatMap((p) => p.billingOptions)),
  ).filter((c): c is BillingCycle =>
    ["monthly", "half-yearly", "yearly"].includes(c),
  );

  const [tab, setTab] = useState<BillingCycle>(availableCycles[0] ?? "monthly");
  const [region] = useState<Region>(initialRegion);

  const gridCols =
    plans.length <= 2 ? "sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3";

  return (
    <section className="bg-white py-20 lg:py-[150px]">
      <div className="mx-auto px-5 sm:px-6 lg:px-0 w-full max-w-[1320px]">
        {/* heading */}
        <div className="mx-auto max-w-[700px] text-center">
          <h2
            data-split
            className="font-[family-name:var(--font-radio-canada-big)] font-bold text-[28px] text-[var(--color-ink)] sm:text-[36px] md:text-[44px] lg:text-[52px] leading-[1.12] tracking-[-0.01em]"
          >
            Choose the{" "}
            <span className="text-[var(--color-brand)]">Right Plan</span> for
            Your Needs
          </h2>
          <p
            data-reveal
            className="mx-auto mt-4 sm:mt-5 max-w-[600px] text-[14px] text-[var(--color-ink-soft)] sm:text-[16px] leading-[22px] sm:leading-[26px]"
          >
            Take your business to the next level with flexible, transparent
            pricing adaptable to your needs.
          </p>
        </div>

        {/* tab toggle */}
        {availableCycles.length > 1 && (
          <div className="flex justify-center mt-8 sm:mt-10">
            <div className="inline-flex p-1 border border-[#D9D9D9] rounded-full">
              {availableCycles.map((cycle) => (
                <button
                  key={cycle}
                  onClick={() => setTab(cycle)}
                  className={`rounded-full px-6 py-2.5 text-[14px] font-medium transition-all duration-300 sm:px-8 sm:text-[16px] ${
                    tab === cycle
                      ? "bg-[var(--color-brand-deep)] text-white"
                      : "text-[var(--color-ink-soft)] hover:text-[var(--color-ink)]"
                  }`}
                >
                  {CYCLE_LABEL[cycle]}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* plan cards */}
        <div
          data-reveal-stagger
          className={`mt-10 grid grid-cols-1 gap-6 sm:mt-12 sm:gap-5 lg:gap-6 ${gridCols}`}
        >
          {plans.map((plan, index) => {
            const priceText = formatPrice(plan, tab, region);
            const period =
              plan.pricingType === "free_trial" || plan.pricingType === "custom"
                ? null
                : CYCLE_PERIOD[tab];
            const features = getFeatures(plan);
            const tierColor = getTierColor(plan, index);
            const isPrimary = plan.highlight || plan.cta.type === "primary";

            return (
              <div
                key={plan._id}
                className={`relative flex flex-col rounded-[20px] border border-[#D9D9D9] ${
                  plan.highlight
                    ? "bg-cover bg-center bg-no-repeat"
                    : "bg-white"
                }`}
                style={
                  plan.highlight
                    ? { backgroundImage: "url(/images/pricing-bg.png)" }
                    : undefined
                }
              >
                {/* popular badge */}
                {plan.highlight && (
                  <Image
                    src="/images/most-popular.svg"
                    alt="Most Popular"
                    width={131}
                    height={132}
                    className="-top-[12px] -right-[12px] z-10 absolute w-[110px] sm:w-[120px] lg:w-[140px] h-auto"
                  />
                )}

                {/* header */}
                <div className="p-5 sm:p-6 lg:p-7">
                  <span
                    className={`inline-block rounded-full px-4 py-1.5 text-[12px] font-bold uppercase tracking-wider ${tierColor}`}
                  >
                    {plan.name}
                  </span>

                  <div className="mt-4">
                    <span className="font-bold text-[36px] text-[var(--color-ink)] sm:text-[44px] lg:text-[52px]">
                      {priceText}
                    </span>
                    {period && (
                      <span className="text-[16px] text-[var(--color-ink-soft)] sm:text-[18px]">
                        {period}
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-[14px] text-[var(--color-ink-soft)] sm:text-[15px]">
                    {plan.description}
                  </p>
                </div>

                {/* divider */}
                <div className="bg-[#D9D9D9] mx-5 sm:mx-6 lg:mx-7 h-px" />

                {/* features */}
                <div className="flex flex-col flex-1 p-5 sm:p-6 lg:p-7">
                  <ul className="flex flex-col gap-3.5">
                    {features.map((f) => (
                      <li key={f} className="flex items-start gap-3">
                        <Image
                          src="/images/check-background.svg"
                          alt=""
                          width={22}
                          height={22}
                          className="mt-0.5 w-[22px] h-[22px] shrink-0"
                        />
                        <span className="text-[14px] text-[var(--color-ink)] sm:text-[15px] leading-[22px]">
                          {f}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA */}
                <div className="p-5 sm:p-6 lg:p-7">
                  <a
                    target="_blank"
                    href={`${process.env.NEXT_DASHBOARD_URL ?? "#"}/settings/billing-and-plans`}
                    className={`btn-cta flex h-14 items-center justify-center rounded-full text-[15px] font-medium sm:h-16 sm:text-[16px] ${
                      isPrimary
                        ? "btn-cta--primary text-white"
                        : "btn-cta--outline border-[1.5px] border-[var(--color-brand-deep)] text-[var(--color-brand-deep)]"
                    }`}
                  >
                    <span className="btn-cta__inner">
                      <span className="btn-cta__text">
                        <span>{plan.cta.label}</span>
                        <span className="btn-arrow">
                          <ChevronRight width={18} height={18} />
                        </span>
                      </span>
                    </span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
