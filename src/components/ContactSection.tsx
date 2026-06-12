import BookDemoButton from "./BookDemoButton";

const locations = [
  {
    icon: "/images/contact/icon-usa.svg",
    title: "USA",
    address: "1309 Coffeen Avenue STE 1200, Sheridan, Wyoming 82801",
    phone: "+12325 66545842",
  },
  {
    icon: "/images/contact/icon-portugal.svg",
    title: "Portugal",
    address: "1309 Coffeen Avenue STE 1200, Sheridan, Wyoming 82801",
    phone: "+12325 66545842",
  },
  {
    icon: "/images/contact/icon-dhaka.svg",
    title: "Dhaka",
    address: "০৭/৩, পুরানা পল্টন লাইন, প্রিতম জামান টাওয়ার, ঢাকা।",
    phone: "+12325 66545842",
  },
];

const pills = [
  { icon: "/images/contact/pill-1.svg", label: "Auto Review Generate", className: "left-0 top-[12%] sm:-left-4" },
  { icon: "/images/contact/pill-2.svg", label: "Instant Auto Reply", className: "right-0 top-[58%] sm:-right-6" },
  { icon: "/images/contact/pill-3.svg", label: "Manually Automation", className: "bottom-[6%] left-1/4" },
];

function ChevronRight({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

export default function ContactSection() {
  return (
    <section className="mx-auto w-full max-w-[1320px] px-4 py-10 sm:px-6 lg:px-8 lg:py-[140px] 2xl:px-0">
      <div className="relative overflow-hidden rounded-[24px] bg-[#103b2d] px-5 py-12 sm:px-10 sm:py-16 lg:px-16 lg:py-20">
        {/* world map backdrop */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/contact/world-map.png"
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 w-[1070px] max-w-none -translate-x-1/2 -translate-y-1/2 mix-blend-luminosity"
        />
        {/* decorative swoosh */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/contact/swoosh.svg"
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-40 left-1/2 w-[2000px] max-w-none -translate-x-1/2 opacity-30"
        />

        <div className="relative flex flex-col items-center">
          {/* Heading */}
          <h2 className="text-center font-[family-name:var(--font-radio-canada-big)] text-[32px] font-semibold leading-[1.15] text-white sm:text-[44px] lg:text-[56px] lg:leading-[64px]">
            Get in Touch Now for <span className="text-[#04e49b]">Business</span>
          </h2>

          {/* Email pill */}
          <div className="mt-6 inline-flex items-center gap-2.5 rounded-[20px] border-[3px] border-white px-4 py-3 sm:mt-8 sm:px-5 sm:py-4">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#04e49b] sm:size-12">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/contact/email-icon.svg" alt="" className="size-5 sm:size-6" />
            </span>
            <a
              href="mailto:support@restruhub.com"
              className="font-[family-name:var(--font-radio-canada-big)] text-[18px] text-white sm:text-[24px]"
            >
              support@restruhub.com
            </a>
          </div>

          {/* Address bar */}
          <div className="mt-10 grid w-full grid-cols-1 gap-8 rounded-[20px] border-[3px] border-white bg-black/50 px-5 py-8 sm:mt-12 sm:px-6 md:grid-cols-3 md:gap-6">
            {locations.map((loc) => (
              <div key={loc.title} className="flex items-start gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={loc.icon}
                  alt=""
                  className="size-[90px] shrink-0 lg:size-[130px]"
                />
                <div className="flex min-w-0 flex-col gap-2.5">
                  <p className="text-[22px] font-semibold leading-[1.28] text-[#04e49b] lg:text-[24px]">
                    {loc.title}
                  </p>
                  <p className="text-[15px] font-medium leading-[1.56] text-white lg:text-[16px]">
                    {loc.address}
                  </p>
                  <a
                    href={`tel:${loc.phone.replace(/\s+/g, "")}`}
                    className="text-[15px] font-semibold leading-[1.56] text-white transition-colors hover:text-[#04e49b] lg:text-[16px]"
                  >
                    {loc.phone}
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom: phone mockup + details */}
          <div className="mt-12 grid w-full grid-cols-1 items-center gap-10 lg:mt-16 lg:grid-cols-2 lg:gap-12">
            {/* Phone mockup with floating pills */}
            <div className="relative order-2 mx-auto -mb-12 w-full max-w-[440px] self-end sm:-mb-16 lg:order-1 lg:-mb-20">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/contact/phone-mockup.png"
                alt="RestruHub mobile app"
                className="block w-full align-bottom"
              />
              {pills.map((pill) => (
                <div
                  key={pill.label}
                  className={`absolute flex items-center gap-1.5 rounded-full bg-black/40 px-3 py-2 backdrop-blur-sm sm:px-4 sm:py-3 ${pill.className}`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={pill.icon} alt="" className="size-4 sm:size-5" />
                  <span className="whitespace-nowrap text-[13px] text-white sm:text-[16px]">
                    {pill.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Details */}
            <div className="order-1 flex flex-col items-start gap-6 lg:order-2 lg:gap-7">
              <h3 className="font-[family-name:var(--font-radio-canada-big)] text-[40px] font-semibold leading-[1.1] text-white sm:text-[48px] lg:text-[56px] lg:leading-[64px]">
                Details for the{" "}
                <span className="font-[family-name:var(--font-dancing-script)] font-bold text-[#ea701f]">
                  Startups
                </span>
              </h3>
              <p className="text-[16px] font-medium leading-[1.7] tracking-[-0.09px] text-[#f6f8f4] sm:text-[18px]">
                Interested in learning more about us? Our company deck provides an
                in-depth look into our agency, the projects we&apos;ve tackled, the
                solutions we offer, and the culture we cultivate.
              </p>
              <BookDemoButton className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#00b67a] to-[#00cd65] px-7 py-4 text-[16px] font-medium text-white transition-transform hover:scale-[1.03] sm:px-8 sm:py-5 sm:text-[18px]">
                Book A Demo
                <ChevronRight className="size-5 transition-transform group-hover:translate-x-0.5" />
              </BookDemoButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
