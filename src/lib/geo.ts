/**
 * Region primitives shared by the proxy (edge), the server pages and the
 * client-side detector. Keep this file free of `next/headers` and any other
 * runtime-specific import so every environment can pull it in.
 */

export type Region = "bd" | "eur" | "global";

/** EU + EEA/EFTA country codes — the markets that are billed in EUR. */
export const EUR_COUNTRIES = new Set([
  // EU / EEA / EFTA
  "AT", "BE", "BG", "CY", "CZ", "DE", "DK", "EE", "ES", "FI", "FR",
  "GR", "HR", "HU", "IE", "IT", "LT", "LU", "LV", "MT", "NL", "PL",
  "PT", "RO", "SE", "SI", "SK", "CH", "NO", "IS", "LI",
  // Other European countries & territories
  "GB", "AD", "AL", "BA", "BY", "GI", "FO", "GG", "IM", "JE", "MC",
  "MD", "ME", "MK", "RS", "SM", "UA", "VA", "XK", "AX", "SJ",
]);

/**
 * Languages that only point at a EUR market when the locale carries no country
 * subtag. A country subtag always wins — `es-MX` and `fr-CA` are not EUR.
 */
const EUR_LANGUAGES = new Set([
  "de", "fr", "es", "it", "nl", "sv", "no", "fi", "da", "pt", "pl",
  "hu", "cs", "sk", "sl", "hr", "ro", "bg", "el", "et", "lv", "lt",
  "ga", "mt", "is",
]);

export function isRegion(value: unknown): value is Region {
  return value === "bd" || value === "eur" || value === "global";
}

/** Maps an ISO-3166 alpha-2 country code to a market region. */
export function regionFromCountry(country: string | null | undefined): Region | null {
  if (!country) return null;
  const code = country.toUpperCase();
  if (code === "BD") return "bd";
  if (EUR_COUNTRIES.has(code)) return "eur";
  return "global";
}

/**
 * Last-resort detection from `Accept-Language`. Parses the header into BCP-47
 * tags instead of substring matching, so `es-MX` resolves to "global" rather
 * than being swallowed by a bare `es` match.
 */
export function regionFromAcceptLanguage(header: string | null | undefined): Region {
  const tags = (header ?? "")
    .split(",")
    .map((part) => part.split(";")[0].trim())
    .filter(Boolean);

  for (const tag of tags) {
    const [rawLang, ...subtags] = tag.split("-");
    const lang = rawLang.toLowerCase();
    const country = subtags.find((part) => part.length === 2)?.toUpperCase();

    if (lang === "bn" || country === "BD") return "bd";
    // An explicit country subtag is stronger evidence than the language.
    if (country) return EUR_COUNTRIES.has(country) ? "eur" : "global";
    if (EUR_LANGUAGES.has(lang)) return "eur";
  }

  return "global";
}
