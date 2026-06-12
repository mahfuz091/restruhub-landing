import Image from "next/image";

const cards = [
  {
    icon: "/images/risk-free/1.svg",
    title: "No credit card required",
    body: "Get started with confidence — no credit card required.",
  },
  {
    icon: "/images/risk-free/2.svg",
    title: "14-day free trial",
    body: "Try our platform completely risk-free with a 14-day free trial and no credit card required to get started.",
  },
  {
    icon: "/images/risk-free/3.svg",
    title: "30-day money-back guarantee",
    body: "Experience our service with total peace of mind. our 30-day money-back guarantee has you covered.",
  },
];

export default function RiskFreeSection() {
  return (
    <section className="bg-[#F7F7F7] py-20 lg:py-[150px]">
      <div className="mx-auto w-full max-w-[1320px] px-5 sm:px-6 lg:px-0">
        <h2 className="text-center font-[family-name:var(--font-radio-canada-big)] text-[28px] font-bold leading-[1.12] tracking-[-0.01em] text-[var(--color-ink)] sm:text-[36px] md:text-[44px] lg:text-[52px]">
          Start Risk-Free Today
        </h2>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:mt-12 sm:grid-cols-2 sm:gap-5 lg:mt-14 lg:grid-cols-3 lg:gap-6">
          {cards.map((card) => (
            <div
              key={card.title}
              className="flex flex-col rounded-[16px] bg-white p-5 shadow-[0_14px_64px_0_rgba(0,0,0,0.06)] sm:rounded-[20px] sm:p-6 lg:p-7"
            >
              <Image
                src={card.icon}
                alt=""
                width={88}
                height={88}
                className="h-14 w-14 sm:h-16 sm:w-16 lg:h-[88px] lg:w-[88px]"
              />

              <h3 className="mt-10 text-[17px] font-semibold leading-[1.3] text-[var(--color-ink)] sm:text-[18px] lg:mt-[80px] lg:text-[20px]">
                {card.title}
              </h3>
              <p className="mt-2 text-[14px] leading-[22px] text-[var(--color-ink-soft)] sm:mt-3 sm:text-[15px] sm:leading-[24px]">
                {card.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
