import Image from "next/image";

const cards = [
  {
    icon: "/images/hurting/1.svg",
    badge: "MENTIONED 40 TIMES",
    title: "Wait Time Issues",
    body: "Customers are waiting longer than expected",
  },
  {
    icon: "/images/hurting/2.svg",
    badge: "MENTIONS ARE INCREASING",
    title: "Service Quality Dropping",
    body: "Recent reviews highlight slow or inattentive service",
  },
  {
    icon: "/images/hurting/3.svg",
    badge: "MENTIONS RISING",
    title: "Cleanliness Concerns",
    body: "Customers are noticing hygiene issues more often",
  },
];

export default function HurtingSection() {
  return (
    <section className="bg-white pb-20 pt-0 lg:pb-[150px] lg:pt-0">
      <div className="mx-auto w-full max-w-[1320px] px-5 sm:px-6 lg:px-0">
        {/* heading */}
        <div className="mx-auto max-w-[700px] text-center">
          <h2 className="font-[family-name:var(--font-radio-canada-big)] text-[28px] font-bold leading-[1.12] tracking-[-0.01em] text-[var(--color-ink)] sm:text-[36px] md:text-[44px] lg:text-[52px]">
            Know Exactly What Is
            <br />
            <span className="text-[var(--color-brand)]">Hurting Your Rating</span>
          </h2>
          <p className="mx-auto mt-4 max-w-[540px] text-[14px] leading-[22px] text-[var(--color-ink-soft)] sm:mt-5 sm:text-[16px] sm:leading-[26px]">
            No need to read every review or guess what went wrong. RestruHub shows
            the real issues clearly so you can fix them before they affect more
            customers.
          </p>
        </div>

        {/* cards */}
        <div className="mt-8 grid grid-cols-1 gap-4 sm:mt-12 sm:grid-cols-2 sm:gap-5 lg:mt-14 lg:grid-cols-3 lg:gap-6">
          {cards.map((card) => (
            <div
              key={card.title}
              className="flex flex-col rounded-[16px] bg-white p-5 shadow-[0_14px_64px_0_rgba(0,0,0,0.06)] sm:rounded-[20px] sm:p-6 lg:p-7"
            >
              {/* icon + badge row */}
              <div className="flex items-start justify-between">
                <Image
                  src={card.icon}
                  alt=""
                  width={56}
                  height={56}
                  className="h-14 w-14 sm:h-16 sm:w-16"
                />
                <span className="rounded-full bg-[#fff3e0] px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-[var(--color-accent)] sm:text-[12px]">
                  {card.badge}
                </span>
              </div>

              {/* text */}
              <h3 className="mt-6 text-[18px] font-semibold leading-[1.3] text-[var(--color-ink)] sm:mt-8 sm:text-[20px]">
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
