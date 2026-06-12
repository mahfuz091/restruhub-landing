const stats = [
  { value: "$399", color: "#009f6b", label: "Monthly price for Podium Core plan" },
  { value: "87%", color: "#ff383c", label: "Of features go unused by small businesses" },
  { value: "Annual", color: "#009f6b", label: "Contracts lock you in for 12+ months" },
];

export default function WhyLeavingPodium() {
  return (
    <section className="relative isolate py-12 sm:py-20 lg:py-[150px]">
      {/* teal glow in gap between hero CTAs and heading (figma: 849x219, #00B67A, opacity .36, blur 90) */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[50px] -z-10 h-[219px] w-[min(849px,90%)] -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-[#00b67a] opacity-[0.36] blur-[90px]"
      />

      <div className="mx-auto w-full max-w-[1320px] px-5 sm:px-6 2xl:px-0">
        <div className="flex flex-col items-center gap-10 sm:gap-11">
          <h2 className="mx-auto max-w-[900px] text-center font-[family-name:var(--font-radio-canada-big)] text-[26px] font-semibold leading-[1.15] tracking-[-0.01em] text-[#001f0f] md:text-[36px] lg:text-[44px] xl:text-[56px]">
            Why Are Businesses Leaving Podium?
          </h2>

          <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-3">
            {stats.map((s) => (
              <div
                key={s.label}
                className="flex min-h-[160px] flex-col items-center justify-center gap-3 rounded-[20px] bg-white p-6 text-center drop-shadow-[0px_14px_32px_rgba(0,0,0,0.06)]"
              >
                <span
                  className="font-[family-name:var(--font-poppins)] text-[40px] font-semibold leading-[1.1] sm:text-[48px] sm:leading-[56px]"
                  style={{ color: s.color }}
                >
                  {s.value}
                </span>
                <span className="max-w-[334px] text-[16px] leading-[1.4] text-[#2b2d2c] sm:text-[20px] sm:leading-[28px]">
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
