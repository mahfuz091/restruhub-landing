"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronRight } from "./Icons";
import type { PricingPlan, BillingCycle } from "@/lib/pricing";

const CYCLE_LABEL: Record<BillingCycle, string> = {
  monthly: "Monthly",
  "half-yearly": "Half-Yearly",
  yearly: "Yearly",
};

const CYCLE_SUFFIX: Record<BillingCycle, string> = {
  monthly: "/ প্রতি মাসে",
  "half-yearly": "/ প্রতি ৬ মাসে",
  yearly: "/ প্রতি বছরে",
};

function getPriceBdt(plan: PricingPlan, cycle: BillingCycle): number | null {
  if (cycle === "monthly") return plan.monthlyPrice ?? null;
  if (cycle === "half-yearly") return plan.halfYearlyPrice ?? null;
  return plan.yearlyPrice ?? null;
}

function formatPrice(plan: PricingPlan, cycle: BillingCycle): string {
  if (plan.pricingType === "free_trial") {
    return plan.customPricingLabel?.trim() || "Free";
  }
  if (plan.pricingType === "custom") {
    return plan.customPricingLabel?.trim() || "Custom Pricing";
  }
  const price = getPriceBdt(plan, cycle);
  if (price == null) return plan.customPricingLabel?.trim() || "—";
  return `৳${price.toLocaleString()}`;
}

function getPriceSuffix(plan: PricingPlan, cycle: BillingCycle): string | null {
  if (plan.pricingType === "free_trial") {
    return plan.trialDays ? `${plan.trialDays} দিন বিনামূল্যে` : null;
  }
  if (plan.pricingType === "custom") return null;
  return CYCLE_SUFFIX[cycle];
}

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
}

export default function PricingPlans({ plans }: Props) {
  const paidPlans = plans.filter((p) => p.pricingType !== "free_trial");

  const availableCycles: BillingCycle[] = Array.from(
    new Set(paidPlans.flatMap((p) => p.billingOptions)),
  ).filter((c): c is BillingCycle =>
    ["monthly", "half-yearly", "yearly"].includes(c),
  );

  const [tab, setTab] = useState<BillingCycle>(availableCycles[0] ?? "yearly");

  const gridCols =
    plans.length === 1
      ? "sm:grid-cols-1 max-w-lg mx-auto"
      : plans.length === 2
        ? "sm:grid-cols-2"
        : "sm:grid-cols-2 lg:grid-cols-3";

  return (
    <section className="bg-white py-20 lg:py-[150px]">
      <div className="mx-auto px-5 sm:px-6 lg:px-0 w-full max-w-[1320px]">
        {/* heading */}
        <div className="mx-auto max-w-[700px] text-center">
          <h2
            data-split
            className="font-[family-name:var(--font-radio-canada-big)] font-bold text-[28px] text-[var(--color-ink)] sm:text-[36px] md:text-[44px] lg:text-[52px] leading-[1.12] tracking-[-0.01em]"
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

        {/* tab toggle — only shown when there are multiple billing cycles */}
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
          className={`mt-10 grid grid-cols-1 gap-6 sm:mt-12 lg:gap-8 ${gridCols}`}
        >
          {plans.map((plan) => {
            const priceText = formatPrice(plan, tab);
            const suffix = getPriceSuffix(plan, tab);
            const features = getFeatures(plan);
            const isPrimary = plan.highlight || plan.cta.type === "primary";

            return (
              <div
                key={plan._id}
                className="flex flex-col bg-white border border-[#D9D9D9] rounded-[20px]"
              >
                {/* header */}
                <div className="p-3 sm:p-4">
                  <div className="flex sm:flex-row flex-col sm:justify-between sm:items-center gap-3 sm:gap-4 bg-gradient-to-br from-[#f6faf8] to-[#f0f4f1] p-4 sm:p-5 lg:p-6 border border-[#e0ebe4] rounded-[16px] lg:rounded-[18px]">
                    <div>
                      <h3 className="font-semibold text-[20px] text-[var(--color-ink)] sm:text-[24px] lg:text-[28px]">
                        {plan.name}
                      </h3>
                      <p className="mt-1 sm:mt-2 text-[13px] text-[var(--color-ink-soft)] sm:text-[14px] leading-[20px] sm:leading-[22px]">
                        {plan.description}
                      </p>
                    </div>
                    <div className="sm:text-right shrink-0">
                      <span className="font-bold text-[28px] text-[var(--color-brand)] sm:text-[36px] lg:text-[44px]">
                        {priceText}
                      </span>
                      {suffix && (
                        <span className="sm:block ml-2 sm:ml-0 text-[13px] text-[var(--color-ink-soft)] sm:text-[14px]">
                          {suffix}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* features */}
                <div className="flex flex-col flex-1 p-5 sm:p-6 lg:p-8">
                  <ul className="flex flex-col gap-4">
                    {features.map((f) => (
                      <li key={f} className="flex items-center gap-3">
                        <Image
                          src="/images/check-background.svg"
                          alt=""
                          width={28}
                          height={28}
                          className="w-7 h-7 shrink-0"
                        />
                        <span className="text-[15px] text-[var(--color-ink)] sm:text-[16px]">
                          {f}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <a
                    target="_blank"
                    href={`${process.env.NEXT_DASHBOARD_URL ?? "#"}/settings/billing-and-plans`}
                    className={`btn-cta mt-8 flex h-14 items-center justify-center rounded-full text-[15px] font-medium sm:mt-10 sm:h-16 sm:text-[16px] ${
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
