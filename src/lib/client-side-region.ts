export type Region = "bd" | "eur" | "global";

const CACHE_KEY = "app_user_region";
const CACHE_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours

// Timezones that unambiguously map to Bangladesh
const BD_TIMEZONES = new Set(["Asia/Dhaka", "Asia/Dacca"]);

// BCP-47 locale prefixes that indicate Bengali / Bangladesh
const BD_LOCALE_PREFIXES = ["bn-BD", "bn_BD", "bn-bd"];

// EU + EEA/EFTA country codes
const EUR_COUNTRIES = new Set([
  "AT",
  "BE",
  "BG",
  "CY",
  "CZ",
  "DE",
  "DK",
  "EE",
  "ES",
  "FI",
  "FR",
  "GR",
  "HR",
  "HU",
  "IE",
  "IT",
  "LT",
  "LU",
  "LV",
  "MT",
  "NL",
  "PL",
  "PT",
  "RO",
  "SE",
  "SI",
  "SK",
  "CH",
  "NO",
  "IS",
  "LI",
]);

interface RegionCache {
  region: Region;
  cachedAt: number;
}

function readCache(): Region | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const parsed: RegionCache = JSON.parse(raw);
    if (Date.now() - parsed.cachedAt < CACHE_TTL_MS) return parsed.region;
    // Expired — remove it
    localStorage.removeItem(CACHE_KEY);
  } catch {
    // corrupted — ignore
  }
  return null;
}

function writeCache(region: Region): void {
  try {
    localStorage.setItem(
      CACHE_KEY,
      JSON.stringify({ region, cachedAt: Date.now() } satisfies RegionCache),
    );
  } catch {
    // storage unavailable — ignore
  }
}

/**
 * Instant detection using browser-native Intl APIs — no network call.
 * Returns null when the signals are inconclusive.
 */
function detectRegionFromBrowser(): Region | null {
  try {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (BD_TIMEZONES.has(timezone)) return "bd";
    if (timezone.startsWith("Europe/")) return "eur";
  } catch {
    // Intl not available
  }

  try {
    const locales = [navigator.language, ...(navigator.languages ?? [])];
    for (const locale of locales) {
      if (BD_LOCALE_PREFIXES.some((prefix) => locale.startsWith(prefix))) {
        return "bd";
      }
    }
  } catch {
    // navigator not available
  }

  return null; // inconclusive
}

/**
 * IP geolocation fallback — used only when browser signals are inconclusive.
 * Uses three providers for resilience; all work from browser without CORS issues.
 */
async function detectRegionFromIP(): Promise<Region> {
  const providers: Array<() => Promise<string | null>> = [
    // Cloudflare trace — extremely reliable, plain-text response
    async () => {
      const res = await fetch("https://cloudflare.com/cdn-cgi/trace", {
        signal: AbortSignal.timeout(5000),
      });
      const text = await res.text();
      const match = text.match(/^loc=([A-Z]{2})/m);
      return match?.[1] ?? null;
    },
    // country.is — simple JSON, no auth required
    async () => {
      const res = await fetch("https://api.country.is/", {
        signal: AbortSignal.timeout(5000),
      });
      const data = await res.json();
      return (data?.country as string) ?? null;
    },
    // GeoJS — another free provider
    async () => {
      const res = await fetch("https://get.geojs.io/v1/ip/country.json", {
        signal: AbortSignal.timeout(5000),
      });
      const data = await res.json();
      return (data?.country as string) ?? null;
    },
  ];

  for (const provider of providers) {
    try {
      const code = await provider();
      if (!code) continue;
      if (code === "BD") return "bd";
      if (EUR_COUNTRIES.has(code)) return "eur";
      return "global";
    } catch {
      // try next provider
    }
  }

  return "global"; // all providers failed
}

/**
 * Returns the user's market region ("bd" | "eur" | "global").
 *
 * Detection order:
 *   1. localStorage cache (24 h TTL)
 *   2. Browser timezone / locale  (instant, no network)
 *   3. IP geolocation with three provider fallbacks
 *
 * Result is cached in localStorage for 24 hours.
 */
export async function getRegion(): Promise<Region> {
  const cached = readCache();
  if (cached !== null) return cached;

  const browserRegion = detectRegionFromBrowser();
  if (browserRegion !== null) {
    writeCache(browserRegion);
    return browserRegion;
  }

  const ipRegion = await detectRegionFromIP();
  writeCache(ipRegion);
  return ipRegion;
}
