type Row = { category: string; restru: string; podium: string };

const rows: Row[] = [
  {
    category: "Modern Dashboard Layout",
    restru: "Modern dashboard designed for clear pipeline visibility",
    podium: "Customizable dashboards with multiple views and modules",
  },
  {
    category: "User-Friendly Interface",
    restru: "Simple interface for managing deals and contacts",
    podium: "Flexible interface with learning curve for advanced use",
  },
  {
    category: "Customization Level",
    restru: "Basic configuration for sales workflows",
    podium: "High customization across fields, modules, and automation",
  },
  {
    category: "Setup Complexity",
    restru: "Quick setup with minimal configuration",
    podium: "Setup required for workflows, modules, and custom processes",
  },
  {
    category: "Automation Capability",
    restru: "Automates tasks, reminders, and follow-ups",
    podium: "Advanced automation with rules, blueprints, and processes",
  },
  {
    category: "Integration Ecosystem",
    restru: "Core integrations such as email and calendar sync",
    podium: "Wide integration ecosystem including Zoho apps and third-party tools",
  },
  {
    category: "Pricing Approach",
    restru: "Single flat per-seat pricing plan",
    podium: "Tiered pricing with features distributed across plans",
  },
];

export default function StrengthsTable() {
  return (
    <section className="py-12 sm:py-20 lg:py-[150px]">
      <div className="mx-auto w-full max-w-[1320px] px-5 sm:px-6 2xl:px-0">
        <div className="flex flex-col items-center gap-8 sm:gap-10 lg:gap-11">
          {/* header */}
          <h2
            data-split
            className="mx-auto max-w-[880px] text-center font-[family-name:var(--font-radio-canada-big)] text-[26px] font-semibold leading-[1.15] tracking-[-0.01em] text-[#001f0f] md:text-[36px] lg:text-[44px] xl:text-[56px]"
          >
            Strengths And Limitations Of RestruHub Vs Podium
          </h2>

          {/* ── responsive table (scrolls horizontally on small screens) ── */}
          <div className="w-full overflow-x-auto">
            <div className="relative w-full min-w-[680px]">
              {/* highlighted RestruHub column */}
              <div
                className="pointer-events-none absolute inset-y-0 left-1/3 z-0 w-1/3 rounded-[12px] bg-[#00b67a] drop-shadow-[0px_4px_17px_rgba(0,0,0,0.07)]"
                aria-hidden
              />
              <div className="relative z-10 grid grid-cols-3 overflow-hidden rounded-[12px] border border-[#d9d9d9]">
                {/* header */}
                <div className="flex items-center border-b border-[#d9d9d9] bg-[#f6f6f6] p-4 text-[16px] font-medium leading-[24px] text-[#001f0f] sm:p-5 sm:text-[20px] sm:leading-[28px]">
                  Category
                </div>
                <div className="flex items-center justify-center border-b border-[#d9d9d9] p-4 text-center text-[16px] font-semibold leading-[24px] text-white sm:p-5 sm:text-[20px] sm:leading-[28px]">
                  RestruHub
                </div>
                <div className="flex items-center justify-center border-b border-[#d9d9d9] bg-[#f6f6f6] p-4 text-center text-[16px] font-medium leading-[24px] text-[#001f0f] sm:p-5 sm:text-[20px] sm:leading-[28px]">
                  Podium
                </div>

                {/* rows */}
                {rows.map((r, i) => {
                  const last = i === rows.length - 1;
                  const line = last ? "" : "border-b border-[#d9d9d9]";
                  return (
                    <div key={r.category} className="contents">
                      <div className={`flex items-center p-4 text-[15px] leading-[22px] text-[#001f0f] sm:p-5 sm:text-[18px] sm:leading-[26px] ${line}`}>
                        {r.category}
                      </div>
                      <div className={`flex items-center p-4 text-[15px] leading-[22px] text-white sm:px-10 sm:py-5 sm:text-[16px] ${line}`}>
                        {r.restru}
                      </div>
                      <div className={`flex items-center p-4 text-[15px] leading-[22px] text-[#4c4f4e] sm:px-10 sm:py-5 sm:text-[16px] ${line}`}>
                        {r.podium}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
