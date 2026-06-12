import { ChevronRight } from "./Icons";

const stats = [
  { value: "85%", label: "Faster Review Management" },
  { value: "4X", label: "More Reviews Responded To" },
  { value: "35%", label: "Increase in Customer Engagement" },
];

export default function PriceComparisonHero() {
  return (
    <section className="py-16 sm:py-20 lg:py-[150px]">
      <div className="mx-auto w-full max-w-[1320px] px-5 sm:px-6 2xl:px-0">
        <div className="flex flex-col items-stretch gap-16 lg:gap-[100px]">
          {/* header */}
          <div className="flex flex-col items-center gap-8 sm:gap-10 lg:gap-12">
            <div className="flex flex-col items-center gap-5 text-center sm:gap-6">
              <h1 className="mx-auto max-w-[1060px] font-[family-name:var(--font-radio-canada-big)] text-[26px] font-semibold leading-[1.15] tracking-[-0.01em] text-[#001f0f] md:text-[36px] lg:text-[44px] xl:text-[56px]">
                Why pay <span className="text-[#ff383c]">$399</span> when you can
                get better Google review replies from{" "}
                <span className="text-[#009f6b]">$15</span>?
              </h1>
              <p className="mx-auto max-w-[996px] text-[15px] font-medium leading-[1.7] tracking-[-0.01em] text-[#2b2d2c] sm:text-[18px]">
                Most reputation management tools charge enterprise prices for
                features small restaurants don&apos;t need. RestruHub gives you
                smart, professional review replies — faster, more personal, and
                starting at just $15 a month. Same results. A fraction of the
                cost.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex w-full flex-col gap-4 sm:w-auto sm:flex-row sm:gap-6">
              <a
                href="/pricing"
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
                href="/pricing"
                className="btn-cta btn-cta--outline inline-flex h-14 w-full items-center justify-center whitespace-nowrap rounded-full px-8 text-[16px] font-medium text-[#001f0f] sm:h-16 sm:w-auto sm:text-[18px]"
              >
                <span className="btn-cta__inner">
                  <span className="btn-cta__text">
                    <span>View Full Pricing</span>
                    <span className="btn-arrow">
                      <ChevronRight width={20} height={20} />
                    </span>
                  </span>
                </span>
              </a>
            </div>
          </div>

          {/* stats */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {stats.map((s) => (
              <div
                key={s.label}
                className="flex min-h-[160px] flex-col items-center justify-center gap-3 rounded-[20px] bg-white p-6 text-center drop-shadow-[0px_14px_32px_rgba(0,0,0,0.06)]"
              >
                <span className="font-[family-name:var(--font-poppins)] text-[40px] font-semibold leading-[1.1] text-[#009f6b] sm:text-[48px] sm:leading-[56px]">
                  {s.value}
                </span>
                <span className="text-[16px] leading-[1.4] text-[#2b2d2c] sm:text-[20px] sm:leading-[28px]">
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
