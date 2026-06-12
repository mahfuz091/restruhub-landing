import { ChevronRight } from "./Icons";

type Cell = { icon?: "check" | "x"; value?: string; sub: string };
type Row = { feature: string; cells: [Cell, Cell, Cell, Cell] };

const columns = ["RestruHub", "Birdeye", "Podium", "ReviewTrackers"];

const rows: Row[] = [
  {
    feature: "Free Plan Available",
    cells: [
      { icon: "check", sub: "(5 posts/mo + unlimited drafts)" },
      { icon: "x", sub: "Starts at $200+/mo" },
      { icon: "x", sub: "Starts at $249+/mo" },
      { icon: "x", sub: "Custom pricing" },
    ],
  },
  {
    feature: "Starting Price",
    cells: [
      { value: "$9.99/mo", sub: "Pro unlimited plan" },
      { value: "$200+/mo", sub: "Enterprise pricing" },
      { value: "$249+/mo", sub: "Plus add-ons" },
      { value: "$200+/mo", sub: "Custom quotes only" },
    ],
  },
  {
    feature: "AI Response Generation",
    cells: [
      { value: "< 2 seconds", sub: "Human-sounding replies" },
      { icon: "check", sub: "Template-based" },
      { icon: "check", sub: "Basic suggestions" },
      { icon: "x", sub: "Manual only" },
    ],
  },
  {
    feature: "Direct Post to Google",
    cells: [
      { icon: "check", sub: "One-tap posting" },
      { icon: "check", sub: "Included" },
      { icon: "check", sub: "Included" },
      { icon: "check", sub: "Included" },
    ],
  },
  {
    feature: "Multi-Location Support",
    cells: [
      { value: "Unlimited", sub: "On Pro plan" },
      { value: "Extra cost", sub: "Per location" },
      { value: "Extra cost", sub: "Per location" },
      { value: "Extra cost", sub: "Per location" },
    ],
  },
  {
    feature: "Custom AI Voice",
    cells: [
      { icon: "check", sub: "Tone + custom instructions" },
      { icon: "check", sub: "Templates" },
      { icon: "check", sub: "Basic options" },
      { icon: "x", sub: "Manual responses" },
    ],
  },
  {
    feature: "Setup Time",
    cells: [
      { value: "30 seconds", sub: "Connect & go" },
      { value: "Days", sub: "Onboarding required" },
      { value: "Days", sub: "Sales process" },
      { value: "Days", sub: "Enterprise setup" },
    ],
  },
  {
    feature: "Best For",
    cells: [
      { value: "SMBs", sub: "Local businesses, agencies" },
      { value: "Enterprise", sub: "Large organizations" },
      { value: "Enterprise", sub: "Sales-focused" },
      { value: "Enterprise", sub: "Analytics focus" },
    ],
  },
];

function Mark({ type }: { type: "check" | "x" }) {
  const ok = type === "check";
  return (
    <span
      className={`inline-flex size-[26px] shrink-0 items-center justify-center rounded-full ${
        ok ? "bg-[#c7fad2]" : "bg-[#fde2e2]"
      }`}
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
        {ok ? (
          <path
            d="M3.5 8.5l3 3 6-7"
            stroke="#009f6b"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ) : (
          <path
            d="M4.5 4.5l7 7m0-7l-7 7"
            stroke="#ff383c"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}
      </svg>
    </span>
  );
}

function CellContent({ cell }: { cell: Cell }) {
  return (
    <div className="flex min-w-0 flex-col items-center gap-2 break-words text-center">
      {cell.icon && <Mark type={cell.icon} />}
      {cell.value && (
        <span className="text-[14px] font-semibold leading-[20px] text-[#001f0f] sm:text-[18px] sm:leading-[26px]">
          {cell.value}
        </span>
      )}
      <span className="text-[12px] leading-[17px] text-[#4c4f4e] sm:text-[14px] sm:leading-[22px]">
        {cell.sub}
      </span>
    </div>
  );
}

export default function FeatureComparison() {
  return (
    <section className="py-12 sm:py-20 lg:py-[150px]">
      <div className="mx-auto w-full max-w-[1320px] px-5 sm:px-6 2xl:px-0">
        <div className="flex flex-col items-center">
          {/* header */}
          <div className="flex flex-col items-center gap-3 text-center sm:gap-4">
            <h2 className="font-[family-name:var(--font-radio-canada-big)] text-[26px] font-semibold leading-[1.15] tracking-[-0.01em] text-[#001f0f] md:text-[36px] lg:text-[44px] xl:text-[56px]">
              Feature-by-Feature Comparison
            </h2>
            <p className="text-[15px] font-medium leading-[1.7] tracking-[-0.01em] text-[#2b2d2c] sm:text-[18px]">
              See how all 5 alternatives stack up against each other.
            </p>
          </div>

          {/* table — fluid grid, fits container at every width (no horizontal scroll) */}
          <div className="mt-10 w-full sm:mt-12 lg:mt-[60px]">
            <div className="relative w-full">
              {/* featured RestruHub column — white card, flush with table (col 2 = 22.78%..42.08%) */}
              <div
                aria-hidden
                className="absolute inset-y-0 z-0 rounded-[12px] bg-white drop-shadow-[0px_4px_17px_rgba(0,0,0,0.07)]"
                style={{ left: "22.78%", width: "19.31%" }}
              />

              <div className="relative z-10 grid w-full grid-cols-[minmax(0,1.18fr)_repeat(4,minmax(0,1fr))]">
                {/* header row */}
                <div className="flex min-w-0 items-center break-words border-b border-[#d9d9d9] bg-[#f6f7f6] px-3 py-4 text-[14px] font-semibold leading-[20px] text-[#001f0f] sm:px-5 sm:py-5 sm:text-[18px] sm:leading-[28px]">
                  Feature
                </div>
                {columns.map((c, i) => (
                  <div
                    key={c}
                    className={`flex min-w-0 items-center justify-center break-words border-b border-[#d9d9d9] px-2 py-4 text-center text-[13px] font-semibold leading-[18px] text-[#001f0f] sm:px-4 sm:py-5 sm:text-[18px] sm:leading-[28px] ${
                      i === 0 ? "" : "bg-[#f6f7f6]"
                    }`}
                  >
                    {c}
                  </div>
                ))}

                {/* body rows */}
                {rows.map((r, ri) => {
                  const last = ri === rows.length - 1;
                  const border = "border-b border-[#d9d9d9]";
                  return (
                    <div key={r.feature} className="contents">
                      <div
                        className={`flex min-w-0 items-center break-words px-3 py-5 text-[14px] leading-[20px] text-[#001f0f] sm:px-5 sm:py-6 sm:text-[16px] sm:leading-[24px] ${border}`}
                      >
                        {r.feature}
                      </div>
                      {r.cells.map((cell, i) => (
                        <div
                          key={i}
                          className={`flex min-w-0 items-center justify-center px-2 py-5 sm:px-4 sm:py-6 ${
                            last && i === 0 ? "" : border
                          }`}
                        >
                          <CellContent cell={cell} />
                        </div>
                      ))}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* CTA */}
          <a
            href="#"
            className="btn-cta btn-cta--primary mt-10 inline-flex h-14 items-center justify-center whitespace-nowrap rounded-full px-8 text-[16px] font-medium text-white sm:h-16 sm:text-[18px] lg:mt-12"
          >
            <span className="btn-cta__inner">
              <span className="btn-cta__text">
                <span>See Our Pricing Plan</span>
                <span className="btn-arrow">
                  <ChevronRight width={20} height={20} />
                </span>
              </span>
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
