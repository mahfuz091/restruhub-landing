import { headers } from "next/headers";
import { EUR_COUNTRIES, isRegion, regionFromAcceptLanguage } from "./geo";
import type { Region } from "./geo";

export type { Region };
export { EUR_COUNTRIES };

/**
 * Server-side region detection from the incoming request headers.
 * Detection order:
 *   1. x-region-code header (set by the proxy or the CDN)
 *   2. Accept-Language header heuristic
 *   3. Falls back to "global"
 */
export async function getRegionFromRequest(): Promise<Region> {
  try {
    const h = await headers();
    const headerRegion = h.get("x-region-code");
    if (isRegion(headerRegion)) return headerRegion;
    return regionFromAcceptLanguage(h.get("accept-language"));
  } catch {
    return "global";
  }
}
