import { ChevronRight } from "./Icons";

export default function AlternativesHero() {
  return (
    <section className="pt-12 sm:pt-20 lg:pt-[150px]">
      <div className="relative mx-auto w-full max-w-[1320px] px-5 sm:px-6 2xl:px-0">
        <div className="flex flex-col items-center gap-8 text-center sm:gap-10 lg:gap-12">
          <div className="flex flex-col items-center gap-5 sm:gap-6">
            <h1 className="mx-auto max-w-[1060px] font-[family-name:var(--font-radio-canada-big)] text-[26px] font-semibold leading-[1.15] tracking-[-0.01em] text-[#001f0f] md:text-[36px] lg:text-[44px] xl:text-[56px]">
              Top 5 Podium Alternatives{" "}
              <span className="block text-[#009f6b]">Under $50/Month</span>
            </h1>
            <p className="mx-auto max-w-[613px] text-[15px] font-medium leading-[1.7] tracking-[-0.01em] text-[#2b2d2c] sm:text-[18px]">
              Why pay $399 when you can get better review management for under
              $50? We tested the top alternatives so you don&apos;t have to.
            </p>
          </div>

          {/* CTAs */}
          <div className="flex w-full flex-col gap-4 sm:w-auto sm:flex-row sm:gap-6">
            <a
              href="#"
              className="btn-cta btn-cta--primary inline-flex h-14 w-full items-center justify-center whitespace-nowrap rounded-full px-8 text-[16px] font-medium text-white sm:h-16 sm:w-auto sm:text-[18px]"
            >
              <span className="btn-cta__inner">
                <span className="btn-cta__text">
                  <span>Start free, no credit card required</span>
                  <span className="btn-arrow">
                    <ChevronRight width={20} height={20} />
                  </span>
                </span>
              </span>
            </a>
            <a
              href="#"
              className="group inline-flex h-14 w-full items-center justify-center gap-2 whitespace-nowrap rounded-full px-8 text-[16px] font-medium text-[#001f0f] transition-colors hover:text-[#005128] sm:h-16 sm:w-auto sm:text-[18px]"
            >
              <span>View Full Pricing</span>
              <ChevronRight
                width={20}
                height={20}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
