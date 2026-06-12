import Image from "next/image";

const features = [
  {
    icon: "/images/reply-generator/icon-sentiment.svg",
    title: "Smart Sentiment Analysis",
    desc: "Automatically detect positive, neutral, and negative customer sentiment.",
  },
  {
    icon: "/images/reply-generator/icon-language.svg",
    title: "Multi-Language Support",
    desc: "Reply to reviews in multiple languages automatically.",
  },
  {
    icon: "/images/reply-generator/icon-alerts.svg",
    title: "Instant Review Alerts",
    desc: "Receive notifications whenever new reviews are posted.",
  },
  {
    icon: "/images/reply-generator/icon-analytics.svg",
    title: "Analytics Dashboard",
    desc: "Track response rates, customer sentiment, and reputation growth.",
  },
];

export default function WhyRepliesSection() {
  return (
    <section className="pb-12 sm:pb-20 lg:pb-[100px]">
      <div className="mx-auto w-full max-w-[1320px] px-5 sm:px-6 2xl:px-0">
        {/* header */}
        <div className="mx-auto flex max-w-[860px] flex-col items-center gap-4 text-center">
          <h2 className="font-[family-name:var(--font-radio-canada-big)] text-[26px] font-bold leading-[1.15] tracking-[-0.01em] text-[var(--color-ink)] md:text-[36px] lg:text-[44px] xl:text-[56px]">
            Why Your Replies Win Customers
          </h2>
          <p className="max-w-[576px] text-[14px] font-medium leading-[1.7] tracking-[-0.01em] text-[var(--color-ink-soft)] sm:text-[18px]">
            Responding to reviews isn&apos;t just about reputation it directly
            impacts customer confidence and local search visibility.
          </p>
        </div>

        {/* content */}
        <div className="mt-10 flex flex-col items-stretch gap-8 sm:mt-12 min-[1200px]:flex-row min-[1200px]:items-end min-[1200px]:gap-[56px]">
          {/* left mockup */}
          <div className="mx-auto w-full max-w-[664px] min-[1200px]:mx-0 min-[1200px]:w-[664px] min-[1200px]:shrink-0">
            <Image
              src="/images/reply-generator/why-replies-mockup.png"
              alt="RestruHub AI reply workflow"
              width={664}
              height={642}
              className="h-auto w-full rounded-[32px]"
              priority
            />
          </div>

          {/* right feature cards */}
          <div className="flex flex-1 flex-col gap-5 lg:gap-6">
            {features.map((f) => (
              <div
                key={f.title}
                className="flex items-start gap-4 rounded-[20px] bg-white p-5 drop-shadow-[0px_14px_32px_rgba(0,0,0,0.06)] sm:gap-5 sm:p-6"
              >
                <Image
                  src={f.icon}
                  alt=""
                  width={88}
                  height={88}
                  className="size-[64px] shrink-0 sm:size-[88px]"
                  aria-hidden
                />
                <div className="flex flex-col gap-3 sm:gap-4">
                  <h3 className="text-[18px] font-medium leading-[1.3] text-[var(--color-ink)] sm:text-[22px] sm:leading-[28px]">
                    {f.title}
                  </h3>
                  <p className="text-[15px] leading-[1.5] text-[var(--color-ink-soft)] sm:text-[18px] sm:leading-[26px]">
                    {f.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
