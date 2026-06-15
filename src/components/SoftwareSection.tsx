import Image from "next/image";

const restruFeatures = [
  "Free forever plan",
  "Pro at $29/month",
  "30-second setup",
  "No card required",
  "Cancel anytime",
];

const competitors = [
  {
    icon: "/images/software/birdeye.svg",
    name: "Birdeye",
    desc: "Enterprise review management",
    price: "$299–699/mo",
    note: "per location fees",
  },
  {
    icon: "/images/software/podium.svg",
    name: "Owner.com",
    desc: "Restaurant marketing platform",
    price: "$399+/mo",
    note: "platform add-ons",
  },
  {
    icon: "/images/software/review-traacker.svg",
    name: "ReviewTrackers",
    desc: "Enterprise review management",
    price: "$259–599/mo",
    note: "per location pricing",
  },
];

export default function SoftwareSection() {
  return (
    <section className="bg-white py-20 lg:py-[150px]">
      <div className="mx-auto w-full max-w-[1320px] px-5 sm:px-6 lg:px-0">
        {/* header row */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <h2
            data-split
            className="max-w-[600px] font-[family-name:var(--font-radio-canada-big)] text-[28px] font-bold leading-[1.1] tracking-[-0.01em] text-[var(--color-ink)] sm:text-[36px] md:text-[44px] lg:text-[52px]">
            Best Restaurant Review{" "}
            <span className="text-[var(--color-brand)]">Management Software</span>{" "}
            2026
          </h2>
          <p
            data-reveal
            className="max-w-[420px] text-[14px] leading-[22px] text-[var(--color-ink-soft)] sm:text-[16px] sm:leading-[26px]">
            How does RestruHub compare to enterprise review management platforms
            like Birdeye, Owner.com, and ReviewTrackers? Here&apos;s a practical
            breakdown for restaurants and local businesses.
          </p>
        </div>

        {/* cards row */}
        <div
          data-reveal-stagger
          className="mt-8 flex flex-col gap-5 sm:mt-12 lg:mt-14 lg:flex-row lg:gap-6">
          {/* RestruHub card */}
          <div
            className="flex flex-col overflow-hidden rounded-[20px] lg:w-[38%]"
            style={{
              backgroundImage: "url(/images/software/green-bg.png)",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {/* header */}
            <div className="flex items-center gap-4 p-6 sm:p-8">
              <Image
                src="/images/software/logo.svg"
                alt="RestruHub"
                width={56}
                height={56}
                className="h-14 w-14 rounded-[14px]"
              />
              <div>
                <h3 className="text-[22px] font-semibold text-white sm:text-[24px]">
                  RestruHub
                </h3>
                <p className="text-[14px] text-white/60">That&apos;s us</p>
              </div>
            </div>

            {/* divider */}
            <div className="mx-6 h-px bg-white/20 sm:mx-8" />

            {/* features list */}
            <div className="flex flex-1 flex-col px-6 pb-4 pt-5 sm:px-8 sm:pb-5 sm:pt-6">
              <ul className="flex flex-col gap-5">
                {restruFeatures.map((f) => (
                  <li key={f} className="flex items-center gap-3">
                    <Image
                      src="/images/software/cheeck.svg"
                      alt=""
                      width={24}
                      height={24}
                      className="h-6 w-6 shrink-0"
                    />
                    <span className="text-[16px] font-medium text-white sm:text-[18px]">
                      {f}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* divider */}
            <div className="mx-6 h-px bg-white/20 sm:mx-8" />

            {/* best for badge */}
            <div className="flex items-center gap-2.5 px-6 py-5 sm:px-8 sm:py-6">
              <Image
                src="/images/software/star.svg"
                alt=""
                width={24}
                height={24}
                className="h-6 w-6"
              />
              <span className="text-[15px] text-white sm:text-[16px]">
                <strong className="text-[#ffd700]">Best for</strong>{" "}small &amp; medium business
              </span>
            </div>
          </div>

          {/* Enterprise alternatives card */}
          <div
            className="flex flex-1 flex-col overflow-hidden rounded-[20px] border border-[var(--color-line)]/40 p-6 sm:p-8"
            style={{
              backgroundImage: "url(/images/software/software-bg.png)",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <h3 className="text-[20px] font-semibold text-[var(--color-ink)] sm:text-[22px]">
              Enterprise Alternatives
            </h3>

            <div className="mt-6 flex flex-col gap-5 sm:mt-8">
              {competitors.map((c, i) => (
                <div
                  key={c.name}
                  className={`flex items-center gap-4 ${
                    i < competitors.length - 1
                      ? "border-b border-[var(--color-line)]/40 pb-5"
                      : ""
                  }`}
                >
                  <Image
                    src={c.icon}
                    alt={c.name}
                    width={44}
                    height={44}
                    className="h-11 w-11 shrink-0 rounded-full"
                  />
                  <div className="flex-1">
                    <p className="text-[16px] font-semibold text-[var(--color-ink)] sm:text-[17px]">
                      {c.name}
                    </p>
                    <p className="text-[13px] text-[var(--color-ink-soft)] sm:text-[14px]">
                      {c.desc}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-[16px] font-semibold text-[var(--color-ink)] sm:text-[17px]">
                      {c.price}
                    </p>
                    <p className="text-[13px] text-[var(--color-ink-soft)] sm:text-[14px]">
                      {c.note}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <p className="mt-6 flex items-start gap-2 text-[12px] italic leading-[18px] text-[var(--color-ink-soft)] sm:mt-8 sm:text-[13px] sm:leading-[20px]">
              <span className="mt-0.5 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-[var(--color-ink-soft)]/40 text-[10px] not-italic">
                i
              </span>
              Great for enterprise brands with complex workflows. Often expensive
              and unnecessary for most independent restaurants and local
              businesses.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
