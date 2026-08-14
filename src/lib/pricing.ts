"use server";

import type { Region } from "./geo";

export type BillingCycle = "monthly" | "half-yearly" | "yearly";

export interface PricingPlan {
  _id: string;
  name: string;
  market: "global" | "bd";
  description: string;
  monthlyPrice?: number | null;
  halfYearlyPrice?: number | null;
  yearlyPrice?: number | null;
  monthlyPriceEur?: number | null;
  halfYearlyPriceEur?: number | null;
  yearlyPriceEur?: number | null;
  /** ISO-4217 code straight from the API — drives the symbol shown. */
  currency: string;
  pricingType: string;
  billingOptions: BillingCycle[];
  features: string[];
  /** `url` lets the API override the CTA target per plan (e.g. per country). */
  cta: { label: string; type: string; url?: string };
  highlight: boolean;
  isPopular?: boolean;
  yearlyOfferPercentage?: number | null;
  customPricingLabel?: string;
  trialDays?: number | null;
  order?: number;
  maxUsers?: number;
  reviewsPerMonth?: number;
}

// Accept either spelling — deployments have shipped with both. A relative
// value is useless here: this runs on the server, where fetch needs an origin.
const API_BASE_URL = (
  process.env.NEXT_SERVER_API_URL ??
  process.env.NEXT_PUBLIC_SERVER_API_URL ??
  ""
).replace(/\/+$/, "");

const bdFallbackPlans: PricingPlan[] = [
  {
    _id: "fallback-bd-starter",
    name: "Starter",
    market: "bd",
    description: "Perfect for getting started",
    currency: "BDT",
    pricingType: "free_trial",
    billingOptions: ["monthly", "yearly"],
    features: [
      "Auto-reply to your Google reviews",
      "1 restaurant",
      "Up to 30 reviews a month",
      "Basic insights dashboard",
      "Email alerts",
    ],
    cta: { label: "Start Free", type: "primary" },
    highlight: false,
    trialDays: 14,
    order: 0,
  },
  {
    _id: "fallback-bd-professional",
    name: "Professional",
    market: "bd",
    description: "Everything you need to grow",
    monthlyPrice: 990,
    yearlyPrice: 9900,
    currency: "BDT",
    pricingType: "fixed",
    billingOptions: ["monthly", "yearly"],
    features: [
      "Up to 3 restaurants",
      "Up to 200 reviews a month",
      "Auto-reply to all reviews, good and bad",
      "Full insights: what's working, what's not",
      "Instant alerts & priority support",
    ],
    cta: { label: "Purchase Now", type: "primary" },
    highlight: true,
    isPopular: true,
    yearlyOfferPercentage: 35,
    order: 1,
  },
  {
    _id: "fallback-bd-enterprise",
    name: "Enterprise",
    market: "bd",
    description:
      "Built for owners managing multiple restaurants or growing brands from one place.",
    monthlyPrice: 2990,
    yearlyPrice: 29900,
    currency: "BDT",
    pricingType: "fixed",
    billingOptions: ["monthly", "yearly"],
    features: [
      "Unlimited restaurants",
      "All locations in one dashboard",
      "Advanced reports & exports",
      "White-label options",
      "Dedicated account manager",
    ],
    cta: { label: "Purchase Now", type: "primary" },
    highlight: false,
    yearlyOfferPercentage: 35,
    order: 2,
  },
];

const globalFallbackPlans: PricingPlan[] = [
  {
    _id: "fallback-en-starter",
    name: "Starter",
    market: "global",
    description: "Perfect for getting started",
    currency: "USD",
    pricingType: "free_trial",
    billingOptions: ["monthly", "yearly"],
    features: [
      "Auto-reply to your Google reviews",
      "1 restaurant",
      "Up to 30 reviews a month",
      "Basic insights dashboard",
      "Email alerts",
    ],
    cta: { label: "Start Free", type: "primary" },
    highlight: false,
    trialDays: 14,
    order: 0,
  },
  {
    _id: "fallback-en-pro",
    name: "Professional",
    market: "global",
    description: "Everything you need to grow",
    monthlyPrice: 29,
    yearlyPrice: 290,
    monthlyPriceEur: 27,
    yearlyPriceEur: 270,
    currency: "USD",
    pricingType: "fixed",
    billingOptions: ["monthly", "yearly"],
    features: [
      "Up to 3 restaurants",
      "Up to 200 reviews a month",
      "Auto-reply to all reviews, good and bad",
      "Full insights: what's working, what's not",
      "Instant alerts & priority support",
    ],
    cta: { label: "Purchase Now", type: "primary" },
    highlight: true,
    isPopular: true,
    yearlyOfferPercentage: 35,
    order: 1,
  },
  {
    _id: "fallback-en-enterprise",
    name: "Enterprise",
    market: "global",
    description:
      "Built for owners managing multiple restaurants or growing brands from one place.",
    monthlyPrice: 99,
    yearlyPrice: 990,
    monthlyPriceEur: 99,
    yearlyPriceEur: 990,
    currency: "USD",
    pricingType: "fixed",
    billingOptions: ["monthly", "yearly"],
    features: [
      "Unlimited restaurants",
      "All locations in one dashboard",
      "Advanced reports & exports",
      "White-label options",
      "Dedicated account manager",
    ],
    cta: { label: "Purchase Now", type: "primary" },
    highlight: false,
    yearlyOfferPercentage: 35,
    order: 2,
  },
];

function sortPlans(plans: PricingPlan[]): PricingPlan[] {
  return plans.slice().sort((a, b) => (a.order ?? 9999) - (b.order ?? 9999));
}

export async function fetchPlans(region: Region): Promise<PricingPlan[]> {
  const fallback = sortPlans(
    region === "bd" ? bdFallbackPlans : globalFallbackPlans,
  );

  if (!API_BASE_URL.startsWith("http")) {
    console.error(
      "[pricing] NEXT_SERVER_API_URL is missing or not absolute — serving fallback plans.",
    );
    return fallback;
  }

  try {
    const res = await fetch(
      `${API_BASE_URL}/auth/pricing-plans?region=${region}`,
      {
        headers: { "x-region-code": region },
        cache: "no-store",
      },
    );
    if (!res.ok) {
      console.error(`[pricing] API responded ${res.status} for region ${region}`);
      return fallback;
    }
    const json = (await res.json()) as { data?: PricingPlan[] };
    const plans = json.data;
    if (!Array.isArray(plans) || plans.length === 0) return fallback;
    return sortPlans(plans);
  } catch (error) {
    console.error("[pricing] plan fetch failed:", error);
    return fallback;
  }
}
