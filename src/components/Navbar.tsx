import Image from "next/image";
import Link from "next/link";
import MobileMenu from "./MobileMenu";

const NAV_LINKS = [
  { label: "Home", href: "#" },
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "pricing" },
  { label: "Resource", href: "blog" },
];

export default function Navbar() {
  return (
    <header className="top-0 z-40 sticky bg-white/90 backdrop-blur border-line/60 border-b w-full">
      <nav className="flex justify-between items-center mx-auto px-5 sm:px-6 lg:px-10 max-w-330 h-16 sm:h-17.5">
        <Link
          href="/"
          aria-label="RestruHub home"
          className="flex items-center"
        >
          <Image
            src="/images/logo.svg"
            alt="RestruHub"
            width={153}
            height={22}
            priority
          />
        </Link>

        <ul className="hidden md:flex items-center gap-12">
          {NAV_LINKS.map((l) => (
            <li key={l.label}>
              <Link
                href={l.href}
                className="font-normal text-[16px] text-ink hover:text-brand-deep transition-colors"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <Link
            href="#get-started"
            className="hidden md:inline-flex justify-center items-center shadow-[0_8px_24px_-12px_rgba(0,31,15,0.55)] px-5 sm:px-7 rounded-full h-10.5 sm:h-11.5 font-medium text-[14px] text-white sm:text-[16px] btn-cta btn-cta--dark"
          >
            <span className="btn-cta__inner">
              <span className="btn-cta__text">
                <span>Get Started</span>
              </span>
            </span>
          </Link>

          <MobileMenu />
        </div>
      </nav>
    </header>
  );
}
