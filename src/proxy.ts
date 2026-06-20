import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const EUR_COUNTRIES = new Set([
  "AT", "BE", "BG", "CY", "CZ", "DE", "DK", "EE", "ES", "FI", "FR",
  "GR", "HR", "HU", "IE", "IT", "LT", "LU", "LV", "MT", "NL", "PL",
  "PT", "RO", "SE", "SI", "SK", "CH", "NO", "IS", "LI",
]);

interface GeoPayload {
  country?: string;
  city?: string;
  region?: string;
  latitude?: string;
  longitude?: string;
}

function getCountryCode(request: NextRequest): string | null {
  // Vercel edge runtime geo — available at runtime, may not be typed
  const geo: GeoPayload | undefined = (
    request as unknown as Record<string, unknown>
  )["geo"] as GeoPayload | undefined;
  if (geo?.country) return geo.country;

  // Cloudflare
  const cfIpCountry = request.headers.get("CF-IPCountry");
  if (cfIpCountry) return cfIpCountry;

  // Vercel
  const vercelCountry = request.headers.get("x-vercel-ip-country");
  if (vercelCountry) return vercelCountry;

  return null;
}

export function proxy(request: NextRequest) {
  const countryCode = getCountryCode(request);

  let region: string;

  if (countryCode === "BD") {
    region = "bd";
  } else if (countryCode && EUR_COUNTRIES.has(countryCode)) {
    region = "eur";
  } else if (countryCode) {
    region = "global";
  } else {
    const lang = request.headers.get("accept-language")?.toLowerCase() ?? "";
    if (lang.includes("bn") || lang.includes("bd")) {
      region = "bd";
    } else if (
      /(de|fr|es|it|nl|sv|no|fi|da|pt|pl|hu|cs|sk|sl|hr|ro|bg|el|et|lv|lt)/.test(
        lang,
      )
    ) {
      region = "eur";
    } else {
      region = "global";
    }
  }

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-region-code", region);

  return NextResponse.next({
    request: { headers: requestHeaders },
  });
}

export const config = {
  matcher: [
    "/((?!_next|api|favicon.ico|static|images|fonts|robots\\.txt|sitemap\\.xml).*)",
  ],
};
