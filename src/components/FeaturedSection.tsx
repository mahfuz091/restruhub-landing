import Image from "next/image";

const features = [
  {
    image: "/images/featured/1.svg",
    title: "Handle Reviews And Fix Issues Fast",
    description:
      "RestruHub replies to every review in a natural, professional tone, so nothing gets ignored and your customers always feel heard.",
    bullets: [
      "Automatic replies for every review",
      "Full control when you want to step in",
      "Consistent tone that matches your brand",
    ],
    imageFirst: false,
  },
  {
    image: "/images/featured/2.svg",
    title: "Know What Is Going Wrong Before It Gets Worse",
    description:
      "RestruHub highlights repeated complaints and problem areas, so you can take action before they affect your reputation and customer experience.",
    bullets: [
      "Detect repeated issues across reviews",
      "Clear view of what needs attention",
      "Instant alerts when something goes wrong",
    ],
    imageFirst: true,
  },
];

export default function FeaturedSection() {
  return (
    <section className="bg-white pb-20 pt-0 lg:pb-[150px] lg:pt-0">
      <div className="mx-auto w-full max-w-[1320px] px-5 sm:px-6 lg:px-0">
        {/* section heading */}
        <div className="mx-auto max-w-[700px] text-center">
          <h2 className="font-[family-name:var(--font-radio-canada-big)] text-[28px] font-bold leading-[1.12] tracking-[-0.01em] text-[var(--color-ink)] sm:text-[36px] md:text-[44px] lg:text-[52px]">
            Every Review Handled.
            <br />
            <span className="text-[var(--color-brand)]">
              Every Issue Made Clear
            </span>
          </h2>
        </div>

        {/* feature rows */}
        <div className="mt-10 flex flex-col gap-10 sm:mt-16 sm:gap-16 lg:mt-20 lg:gap-20">
          {features.map((feature) => (
            <div
              key={feature.title}
              className={`flex flex-col items-center gap-8 lg:flex-row lg:items-center lg:gap-16 ${
                feature.imageFirst ? "" : "lg:flex-row-reverse"
              }`}
            >
              {/* image */}
              <div className="w-full max-w-[500px] shrink-0 lg:w-[50%] lg:max-w-none">
                <Image
                  src={feature.image}
                  alt={feature.title}
                  width={664}
                  height={600}
                  className="h-auto w-full rounded-[24px] sm:rounded-[32px]"
                />
              </div>

              {/* text content */}
              <div className="flex-1">
                <h3 className="text-[24px] font-medium leading-[1.15] tracking-[-0.01em] text-[var(--color-ink)] sm:text-[28px] lg:text-[36px] lg:leading-[44px]">
                  {feature.title}
                </h3>

                <p className="mt-4 text-[15px] leading-[24px] text-[var(--color-ink-soft)] sm:text-[16px] sm:leading-[26px] lg:mt-5 lg:text-[18px] lg:leading-[28px]">
                  {feature.description}
                </p>

                <ul className="mt-6 flex flex-col gap-3 sm:mt-8 lg:mt-10">
                  {feature.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="flex items-center gap-3 text-[15px] leading-[24px] text-[var(--color-ink)] sm:text-[16px] lg:text-[18px]"
                    >
                      <span className="h-3 w-3 shrink-0 rounded-full border-[1.5px] border-[var(--color-ink-soft)]" />
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
