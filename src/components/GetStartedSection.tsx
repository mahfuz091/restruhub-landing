import Image from "next/image";

const steps = [
  {
    img: "/images/reply-generator/step-01.png",
    step: "STEP 01",
    active: false,
    title: "Connect Your Google Reviews",
    desc: "Link your Google Business profile in a few clicks",
  },
  {
    img: "/images/reply-generator/step-02.png",
    step: "STEP 02",
    active: true,
    title: "RestroHub Starts Working",
    desc: "Review are analyzed and replies are handled automatically",
  },
  {
    img: "/images/reply-generator/step-03.png",
    step: "STEP 03",
    active: false,
    title: "Take Action When Needed",
    desc: "Fix issues that matter and improve your customer experience",
  },
];

export default function GetStartedSection() {
  return (
    <section className="py-12 sm:py-20 lg:py-[100px]">
      <div className="mx-auto w-full max-w-[1320px] px-5 sm:px-6 2xl:px-0">
        <div className="flex flex-col gap-10">
          {/* header */}
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <h2 className="max-w-[640px] font-[family-name:var(--font-radio-canada-big)] text-[26px] font-bold leading-[1.15] tracking-[-0.01em] text-[var(--color-ink)] md:text-[36px] lg:text-[44px] xl:text-[56px]">
              Get Started In Minutes{" "}
              <span className="text-[#009f6b]">With Restruhub</span>
            </h2>
            <p className="max-w-[400px] text-[16px] leading-[24px] text-[var(--color-ink-soft)] sm:text-[18px] sm:leading-[26px]">
              No complicated setup or training. Connect your account and
              everything starts working in the background.
            </p>
          </div>

          {/* cards */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {steps.map((s) => (
              <div
                key={s.step}
                className="flex flex-col gap-6 rounded-[20px] bg-white p-6 drop-shadow-[0px_14px_32px_rgba(0,0,0,0.06)]"
              >
                <div className="relative aspect-[376/280] w-full overflow-hidden rounded-[12px] bg-[#f7f7f7]">
                  <Image
                    src={s.img}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 376px"
                    className="object-cover"
                    aria-hidden
                  />
                </div>

                <span
                  className={`inline-flex w-fit items-center justify-center rounded-[6px] px-2 py-1 text-[16px] font-semibold leading-[24px] ${
                    s.active
                      ? "bg-[#009f6b] text-white"
                      : "bg-[#f0f0f0] text-[#7c8380]"
                  }`}
                >
                  {s.step}
                </span>

                <div className="flex flex-col gap-2">
                  <h3 className="max-w-[280px] text-[22px] font-medium leading-[28px] text-[var(--color-ink)]">
                    {s.title}
                  </h3>
                  <p className="text-[18px] leading-[26px] text-[var(--color-ink-soft)]">
                    {s.desc}
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
