import Image from "next/image";
import { ChevronRight } from "./Icons";

export default function CTASaveSection() {
  return (
    <section className="relative overflow-hidden bg-[#f6f6f6] pt-12 sm:pt-20 lg:pt-[150px]">
      {/* blurred gradient backdrop (warm-left / green-right glow) */}
      <Image
        src="/images/restruhub-vs-podium/cta-bg.png"
        alt=""
        width={1920}
        height={856}
        aria-hidden
        priority
        className="pointer-events-none absolute bottom-0 left-0 z-0 w-full select-none"
      />

      <div className="relative z-10 mx-auto w-full max-w-[1320px] px-5 sm:px-6 2xl:px-0">
        <div className="flex flex-col items-center">
          {/* header */}
          <div className="flex flex-col items-center gap-5 text-center sm:gap-6">
            <h2
              className="mx-auto max-w-[820px] font-[family-name:var(--font-radio-canada-big)] text-[26px] font-semibold leading-[1.15] tracking-[-0.01em] text-[#001f0f] md:text-[36px] lg:text-[44px] xl:text-[56px]"
              data-split
            >
              Ready to Save{" "}
              <span className="text-[#009f6b]">$4,440 Per Year?</span>
            </h2>
            <p
              className="mx-auto max-w-[775px] text-[15px] font-medium leading-[1.7] tracking-[-0.01em] text-[#2b2d2c] sm:text-[18px]"
              data-reveal
            >
              See what customers are actually complaining about and fix issues
              before they affect your rating, reputation, and future customers
              with RestroHub.
            </p>
            <a
              href="/pricing"
              data-reveal
              data-reveal-delay="0.2"
              className="btn-cta btn-cta--primary mt-2 inline-flex h-14 items-center justify-center whitespace-nowrap rounded-full px-8 text-[16px] font-medium text-white sm:h-16 sm:text-[18px]"
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

          {/* dashboard mockup */}
          <div
            className="relative mt-12 w-full max-w-[1125px] sm:mt-16"
            data-reveal="scale"
          >
            <Image
              src="/images/restruhub-vs-podium/cta-dashboard.png"
              alt="RestruHub review manager dashboard"
              width={1125}
              height={423}
              className="h-auto w-full"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
