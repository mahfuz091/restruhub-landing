"use client";

import { useState } from "react";
import type { PricingPlan, BillingCycle } from "@/lib/pricing";
import { getPlanCtaHref, isFreePlan } from "@/lib/currency";

const CYCLE_LABEL: Record<BillingCycle, string> = {
  monthly: "Monthly",
  "half-yearly": "Half-Yearly",
  yearly: "Yearly",
};

const CYCLE_SUFFIX: Record<BillingCycle, string> = {
  monthly: "month",
  "half-yearly": "6 months",
  yearly: "year",
};

function getFeatures(plan: PricingPlan): string[] {
  const extras: string[] = [];
  if (typeof plan.maxUsers === "number")
    extras.push(`সর্বোচ্চ ${plan.maxUsers} জন ব্যবহারকারী`);
  if (typeof plan.reviewsPerMonth === "number")
    extras.push(`${plan.reviewsPerMonth} রিভিউ/মাস`);
  return [...extras, ...plan.features];
}

interface Props {
  plans: PricingPlan[];
  dashboardUrl: string;
}

export default function PricingPlans({ plans, dashboardUrl }: Props) {
  const paidPlans = plans.filter((p) => !isFreePlan(p));

  const availableCycles: BillingCycle[] = Array.from(
    new Set(paidPlans.flatMap((p) => p.billingOptions)),
  ).filter((c): c is BillingCycle =>
    ["monthly", "half-yearly", "yearly"].includes(c),
  );

  const [billingCycle, setBillingCycle] = useState<BillingCycle>(
    availableCycles[0] ?? "yearly",
  );

  const sortedPlans = [...plans].sort(
    (a, b) => (a.order ?? 0) - (b.order ?? 0),
  );

  const yearlyOfferPercentage =
    sortedPlans.find(
      (p) =>
        typeof p.yearlyOfferPercentage === "number" &&
        (p.yearlyOfferPercentage ?? 0) > 0,
    )?.yearlyOfferPercentage ?? null;

  const calculatePrice = (plan: PricingPlan): number | null => {
    if (plan.pricingType === "free_trial") return 0;

    if (billingCycle === "yearly") {
      const rawYearly = plan.yearlyPrice ?? null;
      if (
        rawYearly != null &&
        typeof plan.yearlyOfferPercentage === "number" &&
        plan.yearlyOfferPercentage > 0
      ) {
        return (
          Math.round(rawYearly * (1 - plan.yearlyOfferPercentage / 100) * 100) /
          100
        );
      }
      return rawYearly;
    }
    if (billingCycle === "half-yearly") return plan.halfYearlyPrice ?? null;
    return plan.monthlyPrice ?? null;
  };

  const calculateOriginalPrice = (plan: PricingPlan): number | null => {
    if (billingCycle !== "yearly") return null;
    if (plan.pricingType === "free_trial") return null;
    if (
      typeof plan.yearlyOfferPercentage !== "number" ||
      plan.yearlyOfferPercentage <= 0
    ) {
      return null;
    }
    return plan.yearlyPrice ?? null;
  };

  const formatPrice = (
    plan: PricingPlan,
  ): { priceStr: string; symbolStr: string; isFree: boolean } => {
    if (
      plan.pricingType === "free_trial" ||
      plan.customPricingLabel?.toLowerCase() === "free"
    ) {
      return { priceStr: "Free", symbolStr: "", isFree: true };
    }
    const price = calculatePrice(plan);
    if (price == null) {
      return {
        priceStr: plan.customPricingLabel || "Custom",
        symbolStr: "",
        isFree: false,
      };
    }
    return {
      priceStr: price.toLocaleString("en-US", {
        minimumFractionDigits: price % 1 === 0 ? 0 : 2,
        maximumFractionDigits: 2,
      }),
      symbolStr: "৳",
      isFree: false,
    };
  };

  const gridCols =
    sortedPlans.length <= 2 ? "sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3";

  return (
    <section className="bg-white py-12 sm:py-16 2xl:py-20">
      <div className="mx-auto px-5 sm:px-6 lg:px-8 w-full max-w-[1320px]">
        {/* Heading */}
        <div className="mx-auto max-w-[700px] text-center">
          <h2
            data-split
            className="font-[family-name:var(--font-radio-canada-big)] font-bold text-[28px] text-[var(--color-ink)] sm:text-[36px] md:text-[44px] 2xl:text-[52px] leading-[1.12] tracking-[-0.01em]"
          >
            আপনার প্রয়োজনে{" "}
            <span className="text-[var(--color-brand)]">সঠিক প্ল্যান</span> বেছে
            নিন
          </h2>
          <p
            data-reveal
            className="mx-auto mt-4 sm:mt-5 max-w-[600px] text-[14px] text-[var(--color-ink-soft)] sm:text-[16px] leading-[22px] sm:leading-[26px]"
          >
            নমনীয় ও স্বচ্ছ মূল্য নির্ধারণ — আপনার ব্যবসার সাথে বাড়তে পারে।
          </p>
        </div>

        {/* Tab toggle */}
        {availableCycles.length > 1 && (
          <div className="flex justify-center mt-8 sm:mt-10 mb-10">
            <div className="inline-flex items-center bg-white p-1 rounded-full border border-neutral-200/80 shadow-sm">
              {availableCycles.map((cycle) => {
                const isYearly = cycle === "yearly";
                const isSelected = billingCycle === cycle;
                return (
                  <button
                    key={cycle}
                    type="button"
                    onClick={() => setBillingCycle(cycle)}
                    className={`px-6 py-2.5 rounded-full font-semibold text-sm transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                      isSelected
                        ? "bg-[#064E3B] text-white shadow-sm"
                        : "text-neutral-600 hover:text-neutral-900"
                    }`}
                  >
                    <span>{CYCLE_LABEL[cycle]}</span>
                    {isYearly &&
                      yearlyOfferPercentage != null &&
                      yearlyOfferPercentage > 0 && (
                        <span className="bg-[#D1FAE5] text-[#059669] text-xs font-bold px-2.5 py-0.5 rounded-full">
                          Save {yearlyOfferPercentage}%
                        </span>
                      )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Plan cards */}
        <div
          data-reveal-stagger
          className={`grid grid-cols-1 gap-6 lg:gap-8 max-w-6xl mx-auto items-stretch ${gridCols}`}
        >
          {sortedPlans.map((plan, planIndex) => {
            const { priceStr, symbolStr, isFree } = formatPrice(plan);
            const originalPrice = calculateOriginalPrice(plan);
            const isHighlighted = Boolean(plan.isPopular);
            const features = getFeatures(plan);
            const ctaHref = getPlanCtaHref(plan, dashboardUrl, billingCycle);

            // Header for feature list
            const getFeatureHeader = () => {
              if (planIndex === 1) return "EVERYTHING IN FREE TRIAL, PLUS:";
              if (planIndex === 2) return "EVERYTHING IN PREVIOUS PLAN, PLUS:";
              return null;
            };
            const featureHeader = getFeatureHeader();

            return (
              <div
                key={plan._id}
                className={`flex flex-col justify-between bg-white rounded-[28px] p-7 sm:p-8 transition-all duration-200 relative ${
                  isHighlighted
                    ? "border-2 border-[#064E3B] shadow-xl"
                    : "border border-neutral-200/90 shadow-sm hover:shadow-md"
                }`}
              >
                {/* Floating Most Popular Badge */}
                {Boolean(plan.isPopular) && (
                  <div className="absolute -top-3.5 right-8 bg-[#064E3B] text-white text-[11px] font-bold tracking-wider px-4 py-1 rounded-full uppercase shadow-sm">
                    MOST POPULAR
                  </div>
                )}

                <div>
                  {/* Badge Tag & Save % Badge */}
                  <div className="flex items-center gap-2 mb-5 flex-wrap">
                    <div className="bg-[#D1F4E0] text-[#047857] text-[11px] font-bold tracking-wider px-3 py-1 rounded-full uppercase w-fit">
                      {plan.name}
                    </div>
                    {billingCycle === "yearly" &&
                      typeof plan.yearlyOfferPercentage === "number" &&
                      plan.yearlyOfferPercentage > 0 && (
                        <div className="bg-[#FEF3C7] text-[#D97706] text-[11px] font-bold tracking-wider px-2.5 py-1 rounded-full uppercase w-fit">
                          Save {plan.yearlyOfferPercentage}%
                        </div>
                      )}
                  </div>

                  {/* Price Display */}
                  <div className="mb-3">
                    {isFree ? (
                      <h3 className="text-4xl font-extrabold text-[#064E3B] tracking-tight">
                        Free
                      </h3>
                    ) : (
                      <div className="flex items-baseline flex-wrap gap-x-2">
                        {originalPrice != null && (
                          <span className="text-lg font-semibold text-neutral-400 line-through">
                            {symbolStr}
                            {originalPrice.toLocaleString("en-US")}
                          </span>
                        )}
                        <span className="text-4xl font-extrabold text-neutral-900 tracking-tight">
                          {symbolStr}
                          {priceStr}
                        </span>
                        <span className="text-neutral-500 text-sm font-normal ml-1">
                          /{CYCLE_SUFFIX[billingCycle]}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-sm text-neutral-500 mb-6 leading-relaxed font-normal min-h-[40px]">
                    {plan.description}
                  </p>

                  {/* Features Header if applicable */}
                  {featureHeader && (
                    <p className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider mb-4">
                      {featureHeader}
                    </p>
                  )}

                  {/* Features List */}
                  <ul className="space-y-3.5 mb-8">
                    {features.map((f, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-[#D1F4E0] text-[#047857] flex items-center justify-center shrink-0 mt-0.5">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="12"
                            height="12"
                            viewBox="0 0 12 12"
                            fill="none"
                          >
                            <path
                              d="M10 3L4.5 8.5L2 6"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                        <span className="text-sm font-medium text-neutral-700 leading-snug">
                          {f}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA */}
                <div>
                  <a
                    target="_blank"
                    href={ctaHref}
                    className={`w-full font-semibold py-3.5 px-6 rounded-full transition-all duration-200 flex items-center justify-center gap-1.5 text-sm cursor-pointer ${
                      isHighlighted
                        ? "bg-[#064E3B] text-white hover:bg-[#043D2E] shadow-sm"
                        : "bg-[#D1F4E0] text-[#064E3B] hover:bg-[#BBF0D3]"
                    }`}
                  >
                    <span>{plan.cta?.label || "Start Free"}</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </a>

                  {/* Subtext */}
                  <p className="text-xs text-neutral-500 text-center mt-3 font-normal">
                    Free 14-day trial · No card
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
