import Image from "next/image";

const features = [
  {
    icon: "/images/restruhub-vs-podium/icon-crm.svg",
    title: "Execution-First CRM Design",
    desc: "RestruHub keeps everything in one place — so every reply, task, and insight moves your reputation forward.",
  },
  {
    icon: "/images/restruhub-vs-podium/icon-setup.svg",
    title: "Reduced Setup Dependency",
    desc: "RestruHub works out of the box — no complex setup, no workflow builders, just sign in and start managing your reviews.",
  },
  {
    icon: "/images/restruhub-vs-podium/icon-workspace.svg",
    title: "Single Workspace Data Model",
    desc: "Reviews, replies, complaints, and insights — all in one place, no app-switching, no tab juggling.",
  },
  {
    icon: "/images/restruhub-vs-podium/icon-complexity.svg",
    title: "Controlled System Complexity",
    desc: "RestruHub stays focused on what matters — restaurant reputation — so there's nothing to maintain, configure, or figure out.",
  },
];

export default function WhyPreferSection() {
  return (
    <section className="pb-12 sm:pb-20 lg:pb-[150px]">
      <div className="mx-auto w-full max-w-[1320px] px-5 sm:px-6 2xl:px-0">
        {/* header */}
        <div className="mx-auto flex max-w-[880px] flex-col items-center text-center">
          <h2
            data-split
            className="font-[family-name:var(--font-radio-canada-big)] text-[26px] font-semibold leading-[1.15] tracking-[-0.01em] text-[var(--color-ink)] md:text-[36px] lg:text-[44px] xl:text-[56px]"
          >
            Why Businesses Prefer Restruhub Over Podium
          </h2>
        </div>

        {/* content */}
        <div className="mt-10 flex flex-col items-stretch gap-8 sm:mt-12 min-[1200px]:flex-row min-[1200px]:items-center min-[1200px]:gap-[56px]">
          {/* left mockup */}
          <div
            data-reveal="left"
            className="mx-auto w-full max-w-[664px] min-[1200px]:mx-0 min-[1200px]:w-[664px] min-[1200px]:shrink-0"
          >
            <Image
              src="/images/restruhub-vs-podium/why-prefer-mockup.png"
              alt="RestruHub AI reply workflow"
              width={664}
              height={726}
              className="h-auto w-full rounded-[32px]"
            />
          </div>

          {/* right feature cards */}
          <div
            data-reveal-stagger
            className="flex flex-1 flex-col gap-5 lg:gap-6"
          >
            {features.map((f) => (
              <div
                key={f.title}
                className="flex items-start gap-4 rounded-[20px] bg-white p-5 drop-shadow-[0px_14px_32px_rgba(0,0,0,0.06)] sm:gap-5 sm:p-6"
              >
                <Image
                  src={f.icon}
                  alt=""
                  width={88}
                  height={88}
                  className="size-[64px] shrink-0 sm:size-[88px]"
                  aria-hidden
                />
                <div className="flex flex-col gap-3 sm:gap-4">
                  <h3 className="text-[18px] font-medium leading-[1.3] text-[var(--color-ink)] sm:text-[22px] sm:leading-[28px]">
                    {f.title}
                  </h3>
                  <p className="text-[15px] leading-[1.5] text-[var(--color-ink-soft)] sm:text-[18px] sm:leading-[26px]">
                    {f.desc}
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
