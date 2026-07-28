import { cookies, headers } from "next/headers";
import { EUR_COUNTRIES, isRegion, regionFromAcceptLanguage } from "./geo";
import type { Region } from "./geo";

export type { Region };
export { EUR_COUNTRIES };

/** Must match CACHE_KEY in client-side-region.ts. */
export const REGION_COOKIE = "app_user_region";

/**
 * Server-side region detection.
 * Detection order:
 *   1. Region cookie written by the browser detector — the strongest signal,
 *      because only the browser can see the timezone. Checked first: the proxy
 *      always sets x-region-code, so a header-first order would mean the
 *      browser's answer never wins.
 *   2. x-region-code header (set by the proxy from CDN geo headers)
 *   3. Accept-Language heuristic
 *   4. Falls back to "global"
 */
export async function getRegionFromRequest(): Promise<Region> {
  try {
    const cookieRegion = (await cookies()).get(REGION_COOKIE)?.value;
    if (isRegion(cookieRegion)) return cookieRegion;
  } catch {
    // cookies() unavailable in this context — fall through to headers
  }

  try {
    const h = await headers();
    const headerRegion = h.get("x-region-code");
    if (isRegion(headerRegion)) return headerRegion;
    return regionFromAcceptLanguage(h.get("accept-language"));
  } catch {
    return "global";
  }
}
