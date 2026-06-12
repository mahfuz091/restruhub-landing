import { CheckIcon, ChevronRight } from "./Icons";

const features = [
  "Starting at just $15/month (Starter) or $29/month (Pro)",
  "AI-generated replies with brand voice",
  "~2-minute setup, no contracts",
  "Auto-approve rules for hands-off operation",
];

const specs = [
  { label: "Setup time:", value: "~2 minutes" },
  { label: "Free plan:", value: "Included" },
  { label: "Contract:", value: "None" },
  { label: "AI Engine:", value: "Advanced LLM" },
  { label: "Cancel anytime", value: "" },
];

function CheckBadge() {
  return (
    <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-white">
      <CheckIcon />
    </span>
  );
}

export default function WhyRecommendSection() {
  return (
    <section className="py-12 sm:py-20 lg:py-[150px]">
      <div className="mx-auto w-full max-w-[1320px] px-5 sm:px-6 2xl:px-0">
        {/* header */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-10">
          <h2 className="max-w-[640px] font-[family-name:var(--font-radio-canada-big)] text-[26px] font-semibold leading-[1.15] tracking-[-0.01em] text-[#001f0f] md:text-[36px] lg:text-[44px] xl:text-[56px]">
            Why We Recommend RestruHub
          </h2>
          <p className="max-w-[489px] text-[15px] leading-[24px] text-[#2b2d2c] sm:text-[16px]">
            How does ReplyOnTheFly compare to enterprise review management
            platforms like Birdeye, Podium, and ReviewTrackers? Here&apos;s an
            honest breakdown.
          </p>
        </div>

        {/* cards */}
        <div className="mt-10 flex flex-col gap-6 lg:mt-12 lg:flex-row lg:items-stretch">
          {/* left card */}
          <div
            className="overflow-hidden rounded-[20px] p-6 sm:p-8 lg:w-[781px] lg:shrink-0"
            style={{
              background:
                "radial-gradient(70% 75% at 10% 6%, rgba(160,190,135,0.5), transparent 62%), radial-gradient(80% 85% at 100% 100%, rgba(140,198,170,0.45), transparent 60%), linear-gradient(135deg, #e8eddf 0%, #eef0ea 48%, #e6ece0 100%)",
            }}
          >
            <h3 className="font-[family-name:var(--font-poppins)] text-[22px] font-semibold leading-[1.25] text-[#001f0f] sm:text-[28px] sm:leading-[36px]">
              Best for Small Businesses Who Want Simplicity
            </h3>
            <p className="mt-8 max-w-[663px] text-[15px] leading-[24px] text-[#2b2d2c] sm:text-[16px]">
              RepliFast isn&apos;t trying to be everything. It focuses on one
              thing: helping you reply to Google reviews efficiently using AI
              that actually sounds like you. At $29/month with no contracts,
              it&apos;s the most affordable option that doesn&apos;t sacrifice
              quality.
            </p>

            <ul className="mt-8 flex flex-col">
              {features.map((f, i) => (
                <li key={f}>
                  {i > 0 && (
                    <hr className="border-t border-[rgba(0,31,15,0.08)]" />
                  )}
                  <div className="flex items-center gap-4 py-3">
                    <CheckBadge />
                    <span className="text-[15px] leading-[24px] text-[#001f0f] sm:text-[16px]">
                      {f}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* right card */}
          <div
            className="flex flex-1 flex-col overflow-hidden rounded-[20px]"
            style={{
              background:
                "linear-gradient(150deg, #1a9a61 0%, #00794e 38%, #00563a 68%, #00402b 100%)",
            }}
          >
            {/* price */}
            <div className="border-b border-white/20 px-6 py-6 sm:px-8">
              <p className="text-white">
                <span className="font-[family-name:var(--font-radio-canada-big)] text-[44px] font-semibold leading-[1.1] sm:text-[56px] sm:leading-[64px]">
                  $399
                </span>
                <span className="text-[18px] text-[#e2e2e2]">/Monthly</span>
              </p>
              <div className="mt-2.5 flex flex-col gap-1">
                <span className="text-[16px] leading-[24px] text-white">
                  Starter plan • Pro at $29/mo
                </span>
                <span className="text-[14px] leading-[22px] text-[#d9d9d9]">
                  vs. Podium at $399/mo (23x cheaper)
                </span>
              </div>
            </div>

            {/* specs */}
            <div className="flex flex-col gap-5 border-b border-white/20 px-6 py-6 sm:px-8">
              {specs.map((s) => (
                <div
                  key={s.label}
                  className="flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3">
                    <CheckBadge />
                    <span className="text-[16px] leading-[26px] text-white sm:text-[18px]">
                      {s.label}
                    </span>
                  </div>
                  {s.value && (
                    <span className="text-right text-[16px] leading-[26px] text-white sm:text-[18px]">
                      {s.value}
                    </span>
                  )}
                </div>
              ))}
            </div>

            {/* cta */}
            <div className="px-6 py-6 sm:px-8">
              <a
                href="#"
                className="btn-cta btn-cta--primary inline-flex h-16 items-center justify-center whitespace-nowrap rounded-full px-8 text-[18px] font-medium text-white"
              >
                <span className="btn-cta__inner">
                  <span className="btn-cta__text">
                    <span>Get Started Now</span>
                    <span className="btn-arrow">
                      <ChevronRight width={20} height={20} />
                    </span>
                  </span>
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
