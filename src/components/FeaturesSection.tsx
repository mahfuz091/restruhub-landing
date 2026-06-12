import Image from "next/image";
import { ChevronRight } from "./Icons";

const perks = [
  "Improve Local SEO Rankings",
  "Build Customer Loyalty",
  "Increase Brand Trust",
  "Save Hours Every Week",
  "Maintain Consistent Brand Voice",
  "Handle Negative Reviews Professionally",
];

export default function FeaturesSection() {
  return (
    <section className="bg-[#f7f7f7] py-12 sm:py-20 lg:py-[150px]">
      <div className="mx-auto w-full max-w-[1320px] px-5 sm:px-6 2xl:px-0">
        <div className="flex flex-col items-center justify-between gap-12 lg:flex-row lg:gap-10">
          {/* left */}
          <div className="flex w-full flex-col gap-8 lg:min-w-0 lg:flex-1 lg:gap-10">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-4">
                <h2 className="font-[family-name:var(--font-radio-canada-big)] text-[26px] font-bold leading-[1.1] tracking-[-0.01em] text-[var(--color-ink)] md:text-[36px] lg:text-[44px] xl:text-[56px]">
                  Powerful Features Built for Growing Businesses
                </h2>
                <p className="max-w-[585px] text-[14px] font-medium leading-[1.7] tracking-[-0.01em] text-[var(--color-ink-soft)] sm:text-[18px]">
                  Businesses that reply consistently appear more active,
                  trustworthy, and customer-focused.
                </p>
              </div>

              <ul className="flex flex-col gap-3.5">
                {perks.map((p) => (
                  <li key={p} className="flex items-center gap-3">
                    <Image
                      src="/images/reply-generator/check.svg"
                      alt=""
                      width={20}
                      height={20}
                      className="size-5 shrink-0"
                      aria-hidden
                    />
                    <span className="text-[15px] leading-[24px] text-[var(--color-ink-soft)] sm:text-[16px]">
                      {p}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTAs */}
            <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
              <a
                href="#"
                className="btn-cta btn-cta--primary inline-flex h-14 w-full items-center justify-center whitespace-nowrap rounded-full px-8 text-[16px] font-medium text-white sm:h-16 sm:w-auto sm:text-[18px]"
              >
                <span className="btn-cta__inner">
                  <span className="btn-cta__text">
                    <span>Start Free Trial</span>
                    <span className="btn-arrow">
                      <ChevronRight width={20} height={20} />
                    </span>
                  </span>
                </span>
              </a>
              <a
                href="#"
                className="btn-cta btn-cta--secondary inline-flex h-14 w-full items-center justify-center whitespace-nowrap rounded-full px-8 text-[16px] font-medium sm:h-16 sm:w-auto sm:text-[18px]"
              >
                <span className="btn-cta__inner">
                  <span className="btn-cta__text">
                    <span>Book a Demo</span>
                    <span className="btn-arrow">
                      <ChevronRight width={20} height={20} />
                    </span>
                  </span>
                </span>
              </a>
            </div>
          </div>

          {/* right mockup */}
          <div className="mx-auto w-full max-w-[634px] lg:mx-0 lg:min-w-0 lg:flex-1">
            <Image
              src="/images/reply-generator/features-mockup.png"
              alt="RestruHub automated reply settings"
              width={634}
              height={614}
              className="h-auto w-full rounded-[30px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
