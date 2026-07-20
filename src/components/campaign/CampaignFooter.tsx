import Link from "next/link";

const SOCIALS = [
  {
    href: "https://www.facebook.com/people/Restruhub/61585172453445/",
    label: "Facebook",
    className: "social fb",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="#fff">
        <path d="M15 3h-3a5 5 0 0 0-5 5v3H4v4h3v6h4v-6h3l1-4h-4V8a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    href: "https://www.instagram.com/restruhub/",
    label: "Instagram",
    className: "social",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="3" width="18" height="18" rx="5" stroke="#fff" strokeWidth="1.8" />
        <circle cx="12" cy="12" r="4" stroke="#fff" strokeWidth="1.8" />
        <circle cx="17.5" cy="6.5" r="1.2" fill="#fff" />
      </svg>
    ),
  },
];

/** Campaign-only footer: legal + socials, no sitemap columns. */
export default function CampaignFooter() {
  return (
    <footer className="w-full px-5 pt-[80px] pb-8 sm:px-6 lg:px-[60px]">
      <div
        data-reveal
        className="footer-bar mx-auto flex w-full max-w-[1320px] flex-col items-center justify-between gap-4 sm:flex-row"
      >
        <p className="footer-copy">© 2026 RestruHub. All rights reserved.</p>
        <div className="footer-links">
          <Link href="/privacy-policy" className="footer-link">
            Privacy Policy
          </Link>
          <Link href="/terms-conditions" className="footer-link">
            Terms &amp; Conditions
          </Link>
        </div>
        <div className="flex items-center gap-4">
          {SOCIALS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              className={s.className}
            >
              {s.icon}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
