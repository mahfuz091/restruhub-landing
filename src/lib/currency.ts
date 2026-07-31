import type { BillingCycle, PricingPlan } from "./pricing";
import type { Region } from "./geo";

/** Whatever ISO-4217 code the API sends. Not a closed set — the API owns it. */
export type CurrencyCode = string;

/**
 * Symbols we can render. A code that is missing here is not an error: the
 * amount is printed with the bare ISO code instead, so a new currency added
 * server-side shows up correctly rather than wearing the wrong symbol.
 */
const CURRENCY_SYMBOL: Record<string, string> = {
  USD: "$",
  EUR: "€",
  BDT: "৳",
  GBP: "£",
  INR: "₹",
  AUD: "A$",
  CAD: "C$",
};

export interface PlanPrice {
  amount: number;
  currency: CurrencyCode;
}

/** Trusts the API's code; only normalises casing/whitespace. */
function normalizeCurrency(value: string | undefined): CurrencyCode {
  const code = value?.trim().toUpperCase();
  return code || "USD";
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
 * Resolves the amount together with the currency it is actually denominated in.
 * When region is "eur", returns the EUR price if available (or base price)
 * formatted with the EUR currency code so the Euro symbol (€) is displayed.
 */
export function getPlanPrice(
  plan: PricingPlan,
  cycle: BillingCycle,
  region: Region,
): PlanPrice | null {
  if (region === "eur") {
    const eur = eurAmount(plan, cycle);
    if (eur != null) return { amount: eur, currency: "EUR" };
    const base = baseAmount(plan, cycle);
    if (base != null) return { amount: base, currency: "EUR" };
    return null;
  }

  const currency = normalizeCurrency(plan.currency);
  const base = baseAmount(plan, cycle);
  if (base == null) return null;
  return { amount: base, currency };
}

export function formatMoney({ amount, currency }: PlanPrice): string {
  const value = amount.toLocaleString("en-US");
  const symbol = CURRENCY_SYMBOL[currency];
  return symbol ? `${symbol}${value}` : `${currency} ${value}`;
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
