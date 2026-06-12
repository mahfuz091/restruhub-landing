"use client";

import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faInstagram } from "@fortawesome/free-brands-svg-icons";

const allLinks = [
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "How It Works", href: "#how" },
  { label: "Get a Demo", href: "#demo" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "/contact" },
  { label: "Support", href: "#support" },
  { label: "Privacy Policy", href: "#privacy" },
  { label: "Terms of Service", href: "#terms" },
];

const columns = [
  allLinks.slice(0, 3),
  allLinks.slice(3, 6),
  allLinks.slice(6, 9),
];

export default function Footer() {
  return (
    <footer
      className="bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url(/images/footer-bg.png)" }}
    >
      <div className="mx-auto w-full max-w-[1320px] px-5 sm:px-6 lg:px-0">
        {/* main footer */}
        <div className="flex flex-col gap-8 py-10 sm:py-14 lg:flex-row lg:items-start lg:justify-between lg:py-16">
          {/* left — logo + description */}
          <div className="max-w-[480px]">
            <Image
              src="/images/footer-logo.svg"
              alt="RestruHub"
              width={280}
              height={40}
              className="h-10 w-auto sm:h-12"
            />
            <p className="mt-4 text-[14px] leading-[22px] text-[var(--color-ink-soft)] sm:mt-6 sm:text-[16px] sm:leading-[26px]">
              See what customers are actually complaining about and fix issues
              before they affect your rating, reputation, and future customers
              with RestruHub.
            </p>
          </div>

          {/* links — single column on mobile, 3 columns on lg */}
          <div className="flex flex-col gap-3 lg:hidden">
            {allLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-[16px] font-medium text-[var(--color-ink)] transition-colors hover:text-[var(--color-brand-deep)]"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden lg:flex lg:gap-20">
            {columns.map((col, i) => (
              <ul key={i} className="flex flex-col gap-4">
                {col.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-[16px] text-[var(--color-ink)] transition-colors hover:text-[var(--color-brand-deep)]"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>

        {/* divider */}
        <div className="h-px bg-[#D9D9D9]" />

        {/* bottom bar */}
        <div className="flex flex-col gap-4 py-6 sm:flex-row-reverse sm:items-center sm:justify-between sm:py-8">
          {/* social icons */}
          <div className="flex items-center gap-3">
            <a
              href="#"
              aria-label="Facebook"
              className="group flex h-11 w-11 items-center justify-center rounded-full border-[1.5px] border-ink transition-all duration-300 hover:border-brand-deep hover:bg-brand-deep"
            >
              <FontAwesomeIcon icon={faFacebookF} className="h-4 w-4 text-ink transition-colors duration-300 group-hover:text-white" />
            </a>
            <a
              href="#"
              aria-label="Instagram"
              className="group flex h-11 w-11 items-center justify-center rounded-full border-[1.5px] border-ink transition-all duration-300 hover:border-brand-deep hover:bg-brand-deep"
            >
              <FontAwesomeIcon icon={faInstagram} className="h-5 w-5 text-ink transition-colors duration-300 group-hover:text-white" />
            </a>
          </div>

          <p className="text-[13px] text-[var(--color-ink-soft)] sm:text-[14px]">
            &copy; 2026 RestruHub. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
