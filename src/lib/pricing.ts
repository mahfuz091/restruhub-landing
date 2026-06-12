import type { Region } from "./region";

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
  currency: "USD" | "EUR" | "BDT";
  pricingType: string;
  billingOptions: BillingCycle[];
  features: string[];
  cta: { label: string; type: string };
  highlight: boolean;
  customPricingLabel?: string;
  trialDays?: number | null;
  order?: number;
  maxUsers?: number;
  reviewsPerMonth?: number;
}

const API_BASE_URL = process.env.NEXT_SERVER_API_URL ?? "/api";

const bdFallbackPlans: PricingPlan[] = [
  {
    _id: "fallback-bd-free",
    name: "Free Trial",
    market: "bd",
    description:
      "রেস্টুরেন্ট রিভিউ ম্যানেজমেন্ট ১৪ দিন বিনামূল্যে ব্যবহার করুন।",
    currency: "BDT",
    pricingType: "free_trial",
    billingOptions: [],
    features: [
      "1 restaurant",
      "150 reviews/month",
      "Smart reply suggestion",
      "Basic insights",
      "Email alerts",
    ],
    cta: { label: "Free Trial শুরু করুন", type: "primary" },
    highlight: false,
    trialDays: 14,
    maxUsers: 3,
    reviewsPerMonth: 150,
    order: 0,
  },
  {
    _id: "fallback-bd-single",
    name: "Single Location",
    market: "bd",
    description: "একটি রেস্টুরেন্টের সব রিভিউ ও ফিডব্যাক ম্যানেজ করতে।",
    halfYearlyPrice: 4200,
    yearlyPrice: 7200,
    currency: "BDT",
    pricingType: "fixed",
    billingOptions: ["half-yearly", "yearly"],
    features: [
      "1 business location",
      "150 reviews/month",
      "Smart reply suggestion",
      "Sentiment insights",
      "Instant alerts",
      "Up to 3 team members",
    ],
    cta: { label: "Purchase Now", type: "primary" },
    highlight: false,
    maxUsers: 3,
    reviewsPerMonth: 150,
    order: 1,
  },
  {
    _id: "fallback-bd-multi",
    name: "Multi Location",
    market: "bd",
    description: "একাধিক রেস্টুরেন্ট এক জায়গা থেকে ম্যানেজ করতে।",
    halfYearlyPrice: 10800,
    yearlyPrice: 18000,
    currency: "BDT",
    pricingType: "fixed",
    billingOptions: ["half-yearly", "yearly"],
    features: [
      "Up to 5 restaurants",
      "900 reviews/month",
      "All locations dashboard",
      "Auto-reply",
      "Activity tracking",
      "Download reports",
    ],
    cta: { label: "Purchase Now", type: "primary" },
    highlight: true,
    maxUsers: 5,
    reviewsPerMonth: 900,
    order: 2,
  },
  {
    _id: "fallback-bd-enterprise",
    name: "Enterprise",
    market: "bd",
    description: "বড় রেস্টুরেন্ট চেইনের জন্য সম্পূর্ণ সমাধান।",
    currency: "BDT",
    customPricingLabel: "Custom Pricing",
    pricingType: "custom",
    billingOptions: [],
    features: [
      "Unlimited restaurants",
      "Unlimited reviews",
      "Dedicated support",
      "Advanced reports",
      "Instant alerts",
    ],
    cta: { label: "Contact / Demo", type: "secondary" },
    highlight: false,
    order: 3,
  },
];

const globalFallbackPlans: PricingPlan[] = [
  {
    _id: "fallback-en-free",
    name: "Free Trial",
    market: "global",
    description:
      "Try the full review management experience for one restaurant — free for 14 days.",
    currency: "USD",
    pricingType: "free_trial",
    billingOptions: [],
    features: [
      "1 location",
      "20–30 reviews/month",
      "Auto-reply for positive reviews",
      "Manage all reviews",
      "Basic insights",
      "Email alerts",
    ],
    cta: { label: "Get Started", type: "primary" },
    highlight: false,
    trialDays: 14,
    maxUsers: 1,
    reviewsPerMonth: 30,
    order: 0,
  },
  {
    _id: "fallback-en-pro",
    name: "Professional",
    market: "global",
    description: "Everything you need to grow your restaurant's reputation.",
    monthlyPrice: 29,
    yearlyPrice: 290,
    monthlyPriceEur: 27,
    yearlyPriceEur: 270,
    currency: "USD",
    pricingType: "fixed",
    billingOptions: ["monthly", "yearly"],
    features: [
      "Up to 3 locations",
      "300 reviews/month",
      "Auto-reply for all reviews",
      "Full control of bad reviews",
      "Priority support",
      "Analytics dashboard",
      "Team collaboration",
    ],
    cta: { label: "Start Free Trial", type: "primary" },
    highlight: true,
    maxUsers: 3,
    reviewsPerMonth: 300,
    order: 2,
  },
  {
    _id: "fallback-en-enterprise",
    name: "Enterprise",
    market: "global",
    description:
      "For restaurant chains and growing businesses that need full control.",
    currency: "USD",
    customPricingLabel: "Custom Pricing",
    pricingType: "custom",
    billingOptions: [],
    features: [
      "Unlimited restaurants",
      "Unlimited reviews",
      "Dedicated account manager",
      "Advanced reports",
      "White-label options",
      "24/7 dedicated support",
    ],
    cta: { label: "Contact Sales", type: "secondary" },
    highlight: false,
    order: 3,
  },
];

function sortPlans(plans: PricingPlan[]): PricingPlan[] {
  return plans.slice().sort((a, b) => (a.order ?? 9999) - (b.order ?? 9999));
}

export async function fetchPlans(region: Region): Promise<PricingPlan[]> {
  const fallback = region === "bd" ? bdFallbackPlans : globalFallbackPlans;
  try {
    const res = await fetch(
      `${API_BASE_URL}/auth/pricing-plans?region=${region}`,
      {
        headers: { "x-region-code": region },
        cache: "no-store",
      },
    );
    if (!res.ok) return sortPlans([]);
    const json = (await res.json()) as { data?: PricingPlan[] };
    const plans = json.data;
    if (!Array.isArray(plans) || plans.length === 0) return sortPlans([]);
    return sortPlans(plans);
  } catch {
    return sortPlans([]);
  }
}
