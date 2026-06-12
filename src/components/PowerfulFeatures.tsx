import Image from "next/image";
import { CheckIcon, ChevronRight } from "./Icons";
import BookDemoButton from "./BookDemoButton";

const points = [
  "Improve Local SEO Rankings",
  "Build Customer Loyalty",
  "Increase Brand Trust",
  "Save Hours Every Week",
  "Maintain Consistent Brand Voice",
  "Handle Negative Reviews Professionally",
];

export default function PowerfulFeatures() {
  return (
    <section className="bg-[#f4f5f4]">
      <div className="mx-auto w-full max-w-[1320px] px-5 py-12 sm:px-6 sm:py-20 lg:py-[150px] 2xl:px-0">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-[69px]">
          {/* left */}
          <div className="flex flex-col gap-8 lg:max-w-[616px] lg:flex-1 lg:gap-[42px]">
            <div className="flex flex-col gap-8 sm:gap-[42px]">
              <div className="flex flex-col gap-4 sm:gap-[36px]">
                <h2 className="font-[family-name:var(--font-radio-canada-big)] text-[26px] font-semibold leading-[1.15] tracking-[-0.01em] text-[#001f0f] md:text-[36px] lg:text-[44px] xl:text-[56px]">
                  Powerful Features Built for Growing Businesses
                </h2>
                <p className="max-w-[585px] text-[15px] font-medium leading-[1.7] tracking-[-0.01em] text-[#2b2d2c] sm:text-[18px]">
                  Businesses that reply consistently appear more active,
                  trustworthy, and customer-focused.
                </p>
              </div>

              <ul className="flex flex-col gap-[14px]">
                {points.map((p) => (
                  <li key={p} className="flex items-center gap-3">
                    <span className="flex size-5 shrink-0 items-center justify-center rounded-[6px] bg-[#c7fad2]">
                      <CheckIcon width={12} height={12} />
                    </span>
                    <span className="text-[15px] leading-[24px] text-[#001f0f] sm:text-[16px]">
                      {p}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTAs */}
            <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
              <a
                href="/pricing"
                className="btn-cta btn-cta--primary inline-flex h-14 items-center justify-center whitespace-nowrap rounded-full px-8 text-[16px] font-medium text-white sm:h-16 sm:text-[18px]"
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
              <BookDemoButton className="btn-cta btn-cta--secondary inline-flex h-14 items-center justify-center whitespace-nowrap rounded-full px-8 text-[16px] font-medium text-[#001f0f] sm:h-16 sm:text-[18px]" />
            </div>
          </div>

          {/* right collage */}
          <div className="lg:flex-1">
            <Image
              src="/images/powerful-features-mockup.png"
              alt="RestruHub feature preview"
              width={635}
              height={614}
              className="mx-auto h-auto w-full max-w-[635px] rounded-[20px]"
              priority={false}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
