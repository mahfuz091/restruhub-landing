import Image from "next/image";

const cards = [
  {
    icon: "/images/review-section/1.svg",
    title: "Missed Responses",
    body: "Missed responses make your restaurant look inactive and uncaring. Customers often choose places that engage and respond quickly to feedback.",
  },
  {
    icon: "/images/review-section/2.svg",
    title: "Repeated Complaints",
    body: "When the same complaint appears again and again, it signals a real problem. Without action, it keeps hurting your rating.",
  },
  {
    icon: "/images/review-section/3.svg",
    title: "Lower Visibility",
    body: "Lower ratings reduce your visibility on Google. Fewer people discover your restaurant when competitors with better reviews appear above you.",
  },
  {
    icon: "/images/review-section/4.svg",
    title: "Bad Reviews Drive Customers Away",
    body: "One bad review can influence many decisions. If it stays unanswered, it keeps pushing potential customers toward competitors.",
  },
  {
    icon: "/images/review-section/5.svg",
    title: "Customer Expectations",
    body: "Customers expect acknowledgement when they leave feedback. Silence feels dismissive and reduces the chances that they will return or recommend your restaurant.",
  },
  {
    icon: "/images/review-section/6.svg",
    title: "Small Issues Add Up",
    body: "Small issues like wait times or service delays add up over time. They slowly shape how customers see your restaurant experience.",
  },
];

export default function ReviewsSection() {
  return (
    <section className="bg-white py-12 sm:py-20 lg:py-[150px]">
      <div className="mx-auto w-full max-w-[1320px] px-5 sm:px-6 lg:px-0">
        {/* heading */}
        <div className="mx-auto max-w-[680px] text-center">
          <h2 className="font-[family-name:var(--font-radio-canada-big)] text-[26px] font-semibold leading-[1.15] text-[var(--color-ink)] md:text-[36px] lg:text-[44px] xl:text-[56px]">
            Reviews Decide Who{" "}
            <br />
            <span className="text-[var(--color-brand)]">Gets Customers</span>
          </h2>
          <p className="mx-auto mt-4 max-w-[580px] text-[14px] leading-[22px] text-[var(--color-ink-soft)] sm:mt-6 sm:text-[16px] sm:leading-[26px]">
            Most customers check reviews before choosing where to eat. Ignoring
            feedback and repeated issues reduces trust, lowers ratings, and sends
            potential customers to competitors.
          </p>
        </div>

        {/* grid */}
        <div className="mt-8 flex flex-col gap-4 sm:mt-14 sm:grid sm:grid-cols-2 sm:gap-4 lg:mt-16 lg:grid-cols-3 lg:gap-5">
          {cards.map((card) => (
            <div
              key={card.title}
              className="review-card group relative flex flex-col overflow-hidden rounded-[20px] bg-[#f6f8f4] bg-cover bg-center p-4 sm:p-6 lg:rounded-[20px] lg:p-7"
              style={{
                backgroundImage: "url(/images/review-section/review-normal-bg.png)",
              }}
            >
              {/* mobile: icon + title row | desktop: icon stacked above */}
              <div className="flex items-center gap-4 lg:flex-col lg:items-start lg:gap-0">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[9px] bg-[rgba(0,31,15,0.06)] transition-colors duration-300 group-hover:bg-[var(--color-brand-deep)] sm:h-14 sm:w-14 sm:rounded-[14px] lg:mb-6 lg:h-14 lg:w-14 lg:rounded-[16px]">
                  <Image
                    src={card.icon}
                    alt=""
                    width={30}
                    height={30}
                    className="h-[30px] w-[30px] transition-all duration-300 group-hover:brightness-0 group-hover:invert sm:h-8 sm:w-8"
                  />
                </div>

                <h3 className="text-[18px] font-medium leading-[22px] text-[var(--color-ink)] sm:text-[19px] sm:leading-[30px] lg:text-[20px]">
                  {card.title}
                </h3>
              </div>

              <p className="mt-4 text-[14px] leading-[22px] text-[var(--color-ink-soft)] sm:mt-4 sm:text-[14px] sm:leading-[23px] lg:text-[15px] lg:leading-[24px]">
                {card.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
