import { ChevronRight } from "./Icons";

type Cell = { ok?: boolean; title: string; note?: string };
type Row = { feature: string; restru: Cell; podium: Cell };

const rows: Row[] = [
  {
    feature: "Monthly Price",
    restru: { ok: true, title: "From $15", note: "RepliFast is up to 23x cheaper" },
    podium: { title: "$399+/mo (quote-based)" },
  },
  {
    feature: "Annual Contract",
    restru: { ok: true, title: "Not required", note: "Month-to-month flexibility" },
    podium: { title: "Required" },
  },
  {
    feature: "Setup Time",
    restru: { ok: true, title: "~2 minutes", note: "Get started immediately" },
    podium: { title: "2+ weeks" },
  },
  {
    feature: "Free Plan",
    restru: { ok: true, title: "Free plan available", note: "Try RepliFast at no cost" },
    podium: { title: "No free plan" },
  },
  {
    feature: "Google Review Focus",
    restru: { ok: true, title: "Primary feature", note: "We do one thing exceptionally well" },
    podium: { title: "One feature among many" },
  },
  {
    feature: "SMS, Payments & Webchat",
    restru: { ok: false, title: "Not included" },
    podium: { ok: true, title: "Included", note: "Podium is an all-in-one platform" },
  },
  {
    feature: "Multi-location Pricing",
    restru: { ok: true, title: "$15/additional location", note: "Transparent per-location pricing" },
    podium: { title: "Enterprise pricing" },
  },
];

function Mark({ ok }: { ok: boolean }) {
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center rounded-full p-[5px] ${
        ok ? "bg-[#c7fad2]" : "bg-[#ffdada]"
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

/* value cell content shared by desktop + mobile */
function ValueCell({ cell }: { cell: Cell }) {
  // plain grey value (no icon) — Podium default style
  if (cell.ok === undefined) {
    return (
      <p className="text-[16px] leading-[22px] text-[#4c4f4e]">{cell.title}</p>
    );
  }
  return (
    <div className="flex flex-col items-center justify-center gap-2.5">
      <div className="flex items-center justify-center gap-2.5">
        <Mark ok={cell.ok} />
        <p className="text-[18px] font-semibold leading-[26px] text-[#001f0f]">
          {cell.title}
        </p>
      </div>
      {cell.note && (
        <p className="text-[16px] leading-[22px] text-[#4c4f4e]">{cell.note}</p>
      )}
    </div>
  );
}

export default function ComparisonTable() {
  return (
    <section className="py-12 sm:py-20 lg:py-[150px]">
      <div className="mx-auto w-full max-w-[1320px] px-5 sm:px-6 2xl:px-0">
        <div className="flex flex-col items-center gap-8 sm:gap-10 lg:gap-10">
          {/* header */}
          <div className="flex flex-col items-center gap-3 text-center sm:gap-4">
            <h2 className="mx-auto max-w-[880px] font-[family-name:var(--font-radio-canada-big)] text-[26px] font-semibold leading-[1.15] tracking-[-0.01em] text-[#001f0f] md:text-[36px] lg:text-[44px] xl:text-[56px]">
              Feature-by-Feature Comparison
            </h2>
            <p className="max-w-[585px] text-[15px] font-medium leading-[1.7] tracking-[-0.01em] text-[#2b2d2c] sm:text-[18px]">
              See exactly what you get (and what you don&apos;t) with each
              platform.
            </p>
          </div>

          {/* ── responsive table (scrolls horizontally on small screens) ── */}
          <div className="w-full overflow-x-auto">
            <div className="relative w-full min-w-[680px]">
              {/* highlighted RestruHub column */}
              <div
                className="pointer-events-none absolute inset-y-0 left-1/3 z-0 w-1/3 rounded-[12px] bg-white drop-shadow-[0px_4px_17px_rgba(0,0,0,0.07)]"
                aria-hidden
              />
              <div className="relative z-10 grid grid-cols-3 overflow-hidden rounded-[12px] border border-[#d9d9d9]">
                {/* header */}
                <div className="flex items-center border-b border-[#d9d9d9] bg-[#f6f6f6] p-4 text-[16px] font-medium leading-[24px] text-[#001f0f] sm:p-5 sm:text-[20px] sm:leading-[28px]">
                  Feature
                </div>
                <div className="flex items-center justify-center border-b border-[#d9d9d9] p-4 text-center text-[16px] font-semibold leading-[24px] text-[#009f6b] sm:p-5 sm:text-[20px] sm:leading-[28px]">
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
                    <div key={r.feature} className="contents">
                      <div className={`flex items-start p-4 text-[15px] leading-[22px] text-[#001f0f] sm:p-5 sm:text-[18px] sm:leading-[26px] ${line}`}>
                        {r.feature}
                      </div>
                      <div className={`flex items-center justify-center p-4 text-center sm:p-5 ${line}`}>
                        <ValueCell cell={r.restru} />
                      </div>
                      <div className={`flex items-center justify-center p-4 text-center sm:p-5 ${line}`}>
                        <ValueCell cell={r.podium} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* CTA */}
          <a
            href="#"
            className="btn-cta btn-cta--primary inline-flex h-14 items-center justify-center whitespace-nowrap rounded-full px-8 text-[16px] font-medium text-white sm:h-16 sm:text-[18px]"
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
