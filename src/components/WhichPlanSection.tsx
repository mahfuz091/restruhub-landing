import Image from "next/image";
import { ChevronRight } from "./Icons";

const CHOICES = [
  "You primarily need Google review management",
  "You want AI-generated replies in your brand voice",
  "You prefer month-to-month flexibility (no contracts)",
  "You're budget-conscious ($15 vs $399+/month)",
  "You want setup in minutes, not weeks",
];

function CheckBadge() {
  return (
    <span className="flex size-6 shrink-0 items-center justify-center rounded-[8px] border border-black/[0.06] bg-[#ececec]">
      <span className="flex size-[18px] items-center justify-center rounded-[6px] bg-[#f8f8f8] shadow-[0px_1.7px_3.6px_rgba(0,0,0,0.05)] ring-1 ring-inset ring-white/60">
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden>
          <path
            d="M2 5.2 4.1 7.3 8 3"
            stroke="#15161e"
            strokeOpacity="0.75"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </span>
  );
}

const CTA_CLASS =
  "flex h-14 w-full items-center justify-center gap-1 rounded-[8px] border-[1.1px] border-black/10 bg-white text-[18px] font-medium text-[#001f0f] transition-all duration-300 group-hover:border-transparent group-hover:bg-[linear-gradient(180deg,#00b67a_0%,#017952_100%)] group-hover:text-white group-hover:shadow-[0px_6.6px_13.2px_rgba(0,0,0,0.12),0px_2.2px_5.5px_rgba(0,0,0,0.1)] sm:text-[20px]";

interface PlanCardProps {
  badgeLabel: string;
  badgeClass: string;
  price: string;
  title: string;
  cta: React.ReactNode;
}

function PlanCard({
  badgeLabel,
  badgeClass,
  price,
  title,
  cta,
}: PlanCardProps) {
  return (
    <div className="group flex flex-1 flex-col items-center gap-6 rounded-[16px] border-[2.2px] border-transparent bg-white p-4 transition-colors duration-300 hover:border-[#009f6b] sm:gap-8">
      <div className="flex w-full flex-col gap-4">
        {/* header / price card */}
        <div className="relative flex w-full flex-col items-start overflow-hidden rounded-[16px] bg-white p-4 shadow-[0px_5.5px_12.1px_rgba(0,0,0,0.02),0px_0px_1.1px_rgba(207,207,207,0.22)]">
          <div className="pointer-events-none absolute -bottom-24 left-1/2 h-[420px] w-[460px] -translate-x-1/2">
            <Image
              src="/images/restruhub-vs-podium/ellipse-glow.svg"
              alt=""
              width={460}
              height={420}
              className="size-full object-contain"
              aria-hidden
            />
          </div>
          <div className="relative flex w-full flex-col items-center gap-4 rounded-[14px] border border-[#f8f8f8] bg-[#fbfbfb] px-1 py-2.5 shadow-[inset_0px_-4.4px_4.4px_rgba(255,255,255,0.25)]">
            <div className="flex w-full flex-col gap-4">
              <span
                className={`inline-flex w-fit items-center justify-center rounded-full px-3 py-2.5 text-[14px] font-semibold uppercase leading-none tracking-[-0.08px] sm:text-[16px] ${badgeClass}`}
              >
                {badgeLabel}
              </span>
              <p className="text-[#001f0f]">
                <span className="font-[family-name:var(--font-radio-canada-big)] text-[36px] font-semibold leading-[48px] tracking-[-0.18px] sm:text-[40px]">
                  {price}
                </span>
                <span className="text-[16px] font-normal leading-[26px] text-[#7c8380] sm:text-[18px]">
                  /Monthly
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* feature list */}
        <div className="flex w-full flex-col gap-4 p-4">
          <p className="text-[16px] font-medium leading-[26px] text-[#191919] sm:text-[18px]">
            {title}
          </p>
          <ul className="flex flex-col gap-4">
            {CHOICES.map((c) => (
              <li key={c} className="flex items-center gap-2">
                <CheckBadge />
                <span className="flex-1 text-[15px] font-normal leading-[24px] text-[#15161e] sm:text-[16px]">
                  {c}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {cta}
    </div>
  );
}

export default function WhichPlanSection() {
  return (
    <section className="bg-[#f7f7f7] py-12 sm:py-20 lg:py-[150px]">
      <div className="mx-auto flex w-full max-w-[1320px] flex-col items-center gap-10 px-5 sm:gap-[44px] sm:px-6 2xl:px-0">
        <h2
          data-split
          className="font-[family-name:var(--font-radio-canada-big)] text-center text-[26px] font-semibold leading-[1.15] tracking-[-0.01em] text-[#001f0f] md:text-[36px] lg:text-[44px] xl:text-[56px]"
        >
          Which One Is Right for You?
        </h2>

        <div
          data-reveal-stagger
          className="flex w-full flex-col items-stretch gap-6 md:flex-row md:gap-[30px]"
        >
          <PlanCard
            badgeLabel="Best for Small Businesses"
            badgeClass="bg-[#f37927] text-white"
            price="$29"
            title="Choose RestruHub If..."
            cta={
              <a
                href="https://dashboard.restruhub.com/"
                target="_blank"
                rel="noopener noreferrer"
                className={CTA_CLASS}
              >
                Start Now
                <ChevronRight width={20} height={20} />
              </a>
            }
          />
          <PlanCard
            badgeLabel="Best for Larger Businesses"
            badgeClass="bg-[#e2e2e2] text-[#2b2d2c]"
            price="$399"
            title="Choose Podium If..."
            cta={
              <a href="#" className={CTA_CLASS}>
                View Podium Pricing
                <ChevronRight width={20} height={20} />
              </a>
            }
          />
        </div>
      </div>
    </section>
  );
}
