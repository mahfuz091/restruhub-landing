"use client";

import { useEffect, useState } from "react";
import type { PricingPlan, BillingCycle } from "@/lib/pricing";
import type { Region } from "@/lib/geo";
import { getRegion } from "@/lib/client-side-region";
import { getPlanCtaHref, isFreePlan } from "@/lib/currency";

type CheckoutCurrency = "usd" | "eur";
type DisplayCurrency = "USD" | "EUR" | "BDT";

const CURRENCY_SYMBOL: Record<DisplayCurrency, string> = {
  USD: "$",
  EUR: "€",
  BDT: "৳",
};

interface Props {
  plans: PricingPlan[];
  initialRegion: Region;
  dashboardUrl: string;
}

export default function PricingPlansEn({
  plans,
  initialRegion,
  dashboardUrl,
}: Props) {
  const [billingCycle, setBillingCycle] = useState<BillingCycle>("monthly");
  const [selectedCurrency, setSelectedCurrency] =
    useState<CheckoutCurrency>("eur");
  const [region, setRegion] = useState<Region>(initialRegion);

  useEffect(() => {
    getRegion()
      .then((r) => {
        if (r === "eur") {
          setRegion("eur");
          setSelectedCurrency("eur");
        } else if (r === "global") {
          setRegion("global");
          setSelectedCurrency("usd");
        }
      })
      .catch(() => {});
  }, []);

  const sortedPlans = [...plans].sort(
    (a, b) => (a.order ?? 0) - (b.order ?? 0),
  );

  const yearlyOfferPercentage =
    sortedPlans.find(
      (p) =>
        typeof p.yearlyOfferPercentage === "number" &&
        (p.yearlyOfferPercentage ?? 0) > 0,
    )?.yearlyOfferPercentage ?? null;

  const showCurrencySelector =
    region === "global" &&
    sortedPlans.some(
      (plan) =>
        plan.market === "global" &&
        [
          plan.monthlyPriceEur,
          plan.halfYearlyPriceEur,
          plan.yearlyPriceEur,
        ].some((value) => value != null),
    );

  const getDisplayCurrency = (plan: PricingPlan): DisplayCurrency => {
    if (plan.market === "global") {
      return selectedCurrency === "eur" ? "EUR" : "USD";
    }
    return (plan.currency as DisplayCurrency) || "USD";
  };

  const getRawYearlyPrice = (plan: PricingPlan): number | null => {
    if (plan.market === "global" && selectedCurrency === "eur") {
      return plan.yearlyPriceEur ?? null;
    }
    return plan.yearlyPrice ?? null;
  };

  const calculatePrice = (plan: PricingPlan): number | null => {
    if (plan.pricingType === "free_trial") return 0;
    if (plan.market === "global" && selectedCurrency === "eur") {
      if (billingCycle === "yearly") {
        const rawYearly = plan.yearlyPriceEur ?? null;
        if (
          rawYearly != null &&
          typeof plan.yearlyOfferPercentage === "number" &&
          plan.yearlyOfferPercentage > 0
        ) {
          return (
            Math.round(
              rawYearly * (1 - plan.yearlyOfferPercentage / 100) * 100,
            ) / 100
          );
        }
        return rawYearly;
      }
      if (billingCycle === "half-yearly")
        return plan.halfYearlyPriceEur ?? null;
      return plan.monthlyPriceEur ?? null;
    }

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

    return getRawYearlyPrice(plan);
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
    const symbol = CURRENCY_SYMBOL[getDisplayCurrency(plan)] ?? "$";
    return {
      priceStr: price.toLocaleString("en-US", {
        minimumFractionDigits: price % 1 === 0 ? 0 : 2,
        maximumFractionDigits: 2,
      }),
      symbolStr: symbol,
      isFree: false,
    };
  };

  const gridCols =
    sortedPlans.length <= 2 ? "sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3";

  return (
    <section className="bg-white py-12 sm:py-16 2xl:py-20">
      <div className="mx-auto px-5 sm:px-6 lg:px-8 w-full max-w-[1320px]">
        {/* Header */}
        <div className="mx-auto max-w-[700px] text-center">
          <h2
            data-split
            className="font-[family-name:var(--font-radio-canada-big)] font-bold text-[28px] text-[var(--color-ink)] sm:text-[36px] md:text-[44px] lg:text-[52px] leading-[1.12] tracking-[-0.01em]"
          >
            Choose a plan that&apos;s{" "}
            <span className="text-[var(--color-brand)]">right for you</span>
          </h2>
          <p
            data-reveal
            className="mx-auto mt-4 sm:mt-5 max-w-[600px] text-[14px] text-[var(--color-ink-soft)] sm:text-[16px] leading-[22px] sm:leading-[26px]"
          >
            Choose a plan that works best for your team - upgrade, downgrade, or
            cancel anytime.
          </p>
        </div>

        {/* Top Toggle Control */}
        <div className="flex flex-col items-center gap-4 mt-8 sm:mt-10 mb-10">
          <div className="inline-flex items-center bg-white p-1 rounded-full border border-neutral-200/80 shadow-sm">
            <button
              type="button"
              onClick={() => setBillingCycle("monthly")}
              className={`px-6 py-2.5 rounded-full font-semibold text-sm transition-all duration-200 cursor-pointer ${
                billingCycle === "monthly"
                  ? "bg-[#064E3B] text-white shadow-sm"
                  : "text-neutral-600 hover:text-neutral-900"
              }`}
            >
              Monthly
            </button>
            <button
              type="button"
              onClick={() => setBillingCycle("yearly")}
              className={`px-5 py-2.5 rounded-full font-semibold text-sm transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                billingCycle === "yearly"
                  ? "bg-[#064E3B] text-white shadow-sm"
                  : "text-neutral-600 hover:text-neutral-900"
              }`}
            >
              <span>Yearly</span>
              {yearlyOfferPercentage != null && yearlyOfferPercentage > 0 && (
                <span className="bg-[#D1FAE5] text-[#059669] text-xs font-bold px-2.5 py-0.5 rounded-full">
                  Save {yearlyOfferPercentage}%
                </span>
              )}
            </button>
          </div>

          {showCurrencySelector && (
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                Currency:
              </span>
              {(
                [
                  { value: "eur", symbol: "€ EUR" },
                  { value: "usd", symbol: "$ USD" },
                ] as const
              ).map(({ value, symbol }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setSelectedCurrency(value)}
                  className={`px-3 py-1 rounded-full text-xs font-semibold transition cursor-pointer ${
                    selectedCurrency === value
                      ? "bg-[#064E3B] text-white"
                      : "bg-white text-neutral-600 border border-neutral-200 hover:bg-neutral-50"
                  }`}
                >
                  {symbol}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Pricing Cards Grid */}
        <div
          data-reveal-stagger
          className={`grid grid-cols-1 gap-6 lg:gap-8 max-w-6xl mx-auto items-stretch ${gridCols}`}
        >
          {sortedPlans.map((plan, planIndex) => {
            const { priceStr, symbolStr, isFree } = formatPrice(plan);
            const originalPrice = calculateOriginalPrice(plan);
            const isHighlighted = Boolean(plan.isPopular);
            const ctaHref = getPlanCtaHref(plan, dashboardUrl, billingCycle);

            // Header for feature list
            const getFeatureHeader = () => {
              if (planIndex > 0 && sortedPlans[planIndex - 1]?.name) {
                return `EVERYTHING IN ${sortedPlans[planIndex - 1].name.toUpperCase()}, PLUS:`;
              }
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
                          /{billingCycle === "yearly" ? "year" : "month"}
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
                    {plan.features.map((feature, i) => (
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
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action Button & Footer Subtext */}
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

                  {/* Subtext below button */}
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
