import Image from "next/image";
import { ChevronRight } from "./Icons";

export default function CtaSection() {
  return (
    <section
      className="bg-cover bg-center bg-no-repeat pb-0 pt-20 lg:pt-[150px]"
      style={{ backgroundImage: "url(/images/cta-bg.png)" }}
    >
      <div className="mx-auto w-full max-w-[1320px] px-5 sm:px-6 lg:px-0">
        {/* text content */}
        <div className="mx-auto max-w-[760px] text-center">
          <h2 className="font-[family-name:var(--font-radio-canada-big)] text-[28px] font-bold leading-[1.12] tracking-[-0.01em] text-[var(--color-ink)] sm:text-[36px] md:text-[44px] lg:text-[52px]">
            Stop Letting Bad Reviews
            <br />
            <span className="text-[var(--color-brand)]">
              Affect Your Revenue Growth
            </span>
          </h2>

          <p className="mx-auto mt-4 max-w-[620px] text-[14px] leading-[22px] text-[var(--color-ink-soft)] sm:mt-6 sm:text-[16px] sm:leading-[26px] lg:text-[18px] lg:leading-[28px]">
            See what customers are actually complaining about and fix issues
            before they affect your rating, reputation, and future customers
            with RestruHub.
          </p>

          {/* CTA button */}
          <div className="mt-6 sm:mt-8">
            <a
              href="/pricing"
              className="btn-cta btn-cta--primary inline-flex h-14 items-center justify-center whitespace-nowrap rounded-full px-8 text-[16px] font-medium text-white sm:h-16 sm:px-10 sm:text-[18px]"
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
          </div>
        </div>

        {/* dashboard thumbnail */}
        <div className="mx-auto mt-10 max-w-[1140px] overflow-hidden rounded-t-[16px] shadow-[0_14px_64px_0_rgba(0,0,0,0.1)] sm:mt-14 sm:rounded-t-[20px] lg:mt-16 lg:rounded-t-[24px]">
          <Image
            src="/images/cta-thumbnail.png"
            alt="RestruHub dashboard showing review manager, ratings overview, and AI replies"
            width={1140}
            height={400}
            className="h-auto w-full object-cover object-top"
          />
        </div>
      </div>
    </section>
  );
}
