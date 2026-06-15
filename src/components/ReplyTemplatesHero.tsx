const stats = [
  { value: "85%", label: "Faster Review Management" },
  { value: "4X", label: "More Reviews Responded To" },
  { value: "35%", label: "Increase in Customer Engagement" },
];

export default function ReplyTemplatesHero() {
  return (
    <section className="py-12 sm:py-16 lg:py-[150px]">
      <div className="mx-auto w-full max-w-[1320px] px-5 sm:px-6 2xl:px-0">
        <div className="flex flex-col items-center gap-8 sm:gap-10">
          {/* header */}
          <div className="flex flex-col items-center gap-4 text-center sm:gap-6">
            <h1
              data-split
              className="max-w-[989px] font-[family-name:var(--font-radio-canada-big)] text-[26px] font-bold leading-[1.15] tracking-[-0.01em] text-[var(--color-ink)] md:text-[36px] lg:text-[44px] xl:text-[56px]"
            >
              Choose from 100 free Google Review Reply Templates
            </h1>
            <p
              data-reveal
              data-reveal-delay="0.15"
              className="max-w-[1190px] text-[14px] font-medium leading-[1.7] tracking-[-0.01em] text-[var(--color-ink-soft)] sm:text-[18px]"
            >
              Ready-made professional replies for every review rating. Save
              valuable time and respond confidently without starting from
              scratch. Discover how review responses can improve your local SEO
              visibility.
            </p>
          </div>

          {/* stats bar */}
          <div
            className="relative w-full overflow-hidden rounded-[20px] border border-white/80"
            style={{
              background:
                "radial-gradient(130% 150% at 0% 0%, rgba(0,159,107,0.12), transparent 45%), radial-gradient(130% 150% at 100% 100%, rgba(0,159,107,0.12), transparent 45%), rgba(0,159,107,0.04)",
            }}
          >
            <div
              data-reveal-stagger
              className="relative grid grid-cols-1 divide-y divide-white/60 sm:grid-cols-3 sm:divide-x sm:divide-y-0"
            >
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="flex min-h-[140px] flex-col items-center justify-center gap-3 p-6 text-center sm:min-h-[160px] sm:p-8"
                >
                  <span className="font-[family-name:var(--font-poppins)] text-[36px] font-semibold leading-[1.1] text-[#009f6b] sm:text-[48px] sm:leading-[56px]">
                    {s.value}
                  </span>
                  <span className="text-[16px] leading-[1.4] text-[var(--color-ink-soft)] sm:text-[20px] sm:leading-[28px]">
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
