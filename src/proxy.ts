import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { regionFromAcceptLanguage, regionFromCountry } from "@/lib/geo";

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
  const region =
    regionFromCountry(getCountryCode(request)) ??
    regionFromAcceptLanguage(request.headers.get("accept-language"));

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
