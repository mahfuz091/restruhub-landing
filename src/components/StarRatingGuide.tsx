const cards = [
  {
    label: "1-2",
    rating: 2,
    title: "1–2 Star Reviews: Respond with Care and Resolution",
    desc: "Offer a genuine apology, take accountability, and show willingness to resolve the issue. When appropriate, encourage the customer to continue the conversation .",
  },
  {
    label: "04",
    rating: 4,
    title: "4-Star Reviews: Thank Them and Address Opportunities",
    desc: "Appreciate the customer’s positive comments while recognizing any suggestions or concerns they mentioned. This demonstrates that you value constructive feedback and",
  },
  {
    label: "03",
    rating: 3,
    title: "3-Star Reviews: Recognize the Experience and Encourage a Return",
    desc: "Thank the customer for sharing their honest opinion and acknowledge that their experience could have been better. Let them know you appreciate the feedback would welcome",
  },
  {
    label: "05",
    rating: 5,
    title: "5-Star Reviews: Show Appreciation with Personal Touch",
    desc: "Express sincere gratitude and reference specific points from the customer’s review. This makes your response feel authentic and shows customers that their feedback truly",
  },
];

function Star({ filled }: { filled: boolean }) {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill={filled ? "var(--color-warning)" : "#d4d7d4"}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      className="shrink-0"
    >
      <path d="M12 2.5l2.95 6.16 6.8.6c.65.06.91.86.42 1.29l-5.17 4.42 1.58 6.62c.15.63-.53 1.13-1.1.79L12 18.9l-6.48 3.48c-.57.34-1.25-.16-1.1-.79l1.58-6.62L.83 10.55c-.49-.43-.23-1.23.42-1.29l6.8-.6L11 2.5c.27-.57 1.1-.57 1.37 0z" />
    </svg>
  );
}

export default function StarRatingGuide() {
  return (
    <section className="bg-[#f7f7f7] py-12 sm:py-20 lg:py-[100px]">
      <div className="mx-auto w-full max-w-[1320px] px-5 sm:px-6 2xl:px-0">
        {/* header */}
        <div className="mx-auto flex max-w-[851px] flex-col items-center gap-4 text-center">
          <h2
            data-split
            className="font-[family-name:var(--font-radio-canada-big)] text-[26px] font-bold leading-[1.15] tracking-[-0.01em] text-[var(--color-ink)] md:text-[36px] lg:text-[44px] xl:text-[56px]"
          >
            How to Reply to Every Star Rating
          </h2>
          <p
            data-reveal
            className="text-[14px] font-medium leading-[1.7] tracking-[-0.01em] text-[var(--color-ink-soft)] sm:text-[18px]"
          >
            Different ratings need different response strategies. Here&apos;s how
            to handle each one effectively.
          </p>
        </div>

        {/* grid */}
        <div
          data-reveal-stagger
          className="mt-10 grid grid-cols-1 gap-6 sm:mt-12 lg:grid-cols-2 lg:gap-10"
        >
          {cards.map((c) => (
            <div
              key={c.label}
              className="flex items-start gap-4 rounded-[20px] bg-white p-5 drop-shadow-[0px_14px_32px_rgba(0,0,0,0.06)] sm:gap-5 sm:p-6"
            >
              {/* number + stars column */}
              <div className="flex shrink-0 flex-col items-start justify-between self-stretch">
                <span className="font-[family-name:var(--font-radio-canada-big)] text-[44px] font-semibold leading-[1.1] text-[#cdf1e5] sm:text-[64px] sm:leading-[72px]">
                  {c.label}
                </span>
                <div className="mt-4 flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <Star key={n} filled={n <= c.rating} />
                  ))}
                </div>
              </div>

              {/* text column */}
              <div className="flex flex-1 flex-col gap-3 sm:gap-4">
                <h3 className="text-[18px] font-medium leading-[1.3] text-[var(--color-ink)] sm:text-[22px] sm:leading-[28px]">
                  {c.title}
                </h3>
                <p className="text-[15px] leading-[1.5] text-[var(--color-ink-soft)] sm:text-[16px] sm:leading-[24px]">
                  {c.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
