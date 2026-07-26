import type { BillingCycle, PricingPlan } from "./pricing";
import type { Region } from "./geo";

export type CurrencyCode = "USD" | "EUR" | "BDT";

const CURRENCY_SYMBOL: Record<CurrencyCode, string> = {
  USD: "$",
  EUR: "€",
  BDT: "৳",
};

export interface PlanPrice {
  amount: number;
  currency: CurrencyCode;
}

function normalizeCurrency(value: string | undefined): CurrencyCode {
  return value === "EUR" || value === "BDT" ? value : "USD";
}

function baseAmount(plan: PricingPlan, cycle: BillingCycle): number | null {
  if (cycle === "monthly") return plan.monthlyPrice ?? null;
  if (cycle === "half-yearly") return plan.halfYearlyPrice ?? null;
  return plan.yearlyPrice ?? null;
}

function eurAmount(plan: PricingPlan, cycle: BillingCycle): number | null {
  if (cycle === "monthly") return plan.monthlyPriceEur ?? null;
  if (cycle === "half-yearly") return plan.halfYearlyPriceEur ?? null;
  return plan.yearlyPriceEur ?? null;
}

/**
 * Resolves the amount together with the currency it is actually denominated
 * in. The two are never mixed: when a EUR market has no `*PriceEur` value we
 * fall back to the plan's base amount AND its base currency, instead of
 * stamping a € sign onto a USD figure.
 */
export function getPlanPrice(
  plan: PricingPlan,
  cycle: BillingCycle,
  region: Region,
): PlanPrice | null {
  if (region === "eur") {
    const eur = eurAmount(plan, cycle);
    if (eur != null) return { amount: eur, currency: "EUR" };
  }
  const base = baseAmount(plan, cycle);
  if (base == null) return null;
  return { amount: base, currency: normalizeCurrency(plan.currency) };
}

export function formatMoney({ amount, currency }: PlanPrice): string {
  return `${CURRENCY_SYMBOL[currency]}${amount.toLocaleString("en-US")}`;
}

/** API sends "free" for the zero-cost tier; the fallback data uses "free_trial". */
export function isFreePlan(plan: PricingPlan): boolean {
  return plan.pricingType === "free" || plan.pricingType === "free_trial";
}

export function isCustomPlan(plan: PricingPlan): boolean {
  return plan.pricingType === "custom";
}

/**
 * Destination for a plan's CTA. Prefers a per-plan URL from the API — that is
 * the hook a country-specific dashboard link would come through — and falls
 * back to the single dashboard origin from the environment.
 */
export function getPlanCtaHref(plan: PricingPlan, dashboardUrl: string): string {
  const planUrl = plan.cta?.url?.trim();
  if (planUrl) return planUrl;
  const origin = dashboardUrl.trim().replace(/\/+$/, "");
  if (!origin) return "#";
  return `${origin}/settings/billing-and-plans`;
}
