import { headers } from "next/headers";

export type Region = "bd" | "eur" | "global";

const EUR_COUNTRIES = new Set([
  "AT", "BE", "BG", "CY", "CZ", "DE", "DK", "EE", "ES", "FI", "FR",
  "GR", "HR", "HU", "IE", "IT", "LT", "LU", "LV", "MT", "NL", "PL",
  "PT", "RO", "SE", "SI", "SK", "CH", "NO", "IS", "LI",
]);

export { EUR_COUNTRIES };

/**
 * Server-side region detection from the incoming request headers.
 * Detection order:
 *   1. x-region-code header (set by middleware or CDN)
 *   2. Accept-Language header heuristic
 *   3. Falls back to "global"
 */
export async function getRegionFromRequest(): Promise<Region> {
  try {
    const h = await headers();
    const headerRegion = h.get("x-region-code");
    if (headerRegion === "bd" || headerRegion === "eur" || headerRegion === "global") {
      return headerRegion as Region;
    }
    const lang = h.get("accept-language")?.toLowerCase() ?? "";
    if (lang.includes("bn") || lang.includes("bd")) return "bd";
    if (/(de|fr|es|it|nl|sv|no|fi|da|pt|pl|hu|cs|sk|sl|hr|ro|bg|el|et|lv|lt)/.test(lang))
      return "eur";
    return "global";
  } catch {
    return "global";
  }
}
