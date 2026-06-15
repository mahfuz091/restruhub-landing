"use client";

import { useState, useMemo } from "react";
import { ChevronRight } from "./Icons";

const HOURLY_RATE = 30;
const PRO_YEARLY_COST = 348;

export default function Calculator() {
  const [reviews, setReviews] = useState(70);
  const [minutes, setMinutes] = useState(5);

  const stats = useMemo(() => {
    const totalMinutes = reviews * minutes;
    const hours = totalMinutes / 60;
    const money = hours * HOURLY_RATE;
    const roi = (money * 12) / PRO_YEARLY_COST;
    return {
      hours: hours % 1 === 0 ? `${hours}h` : `${hours.toFixed(1)}h`,
      money: `$${Math.round(money)}`,
      roi: `${roi.toFixed(1)}x`,
    };
  }, [reviews, minutes]);

  const reviewPercent = ((reviews - 5) / (200 - 5)) * 100;
  const minutePercent = ((minutes - 2) / (15 - 2)) * 100;

  return (
    <section className="bg-white px-5 pb-20 pt-0 sm:px-6 lg:px-10 lg:pb-[150px] lg:pt-0">
      <div className="mx-auto max-w-[1320px]">
        <div
          className="relative overflow-hidden rounded-[20px] p-6 sm:p-8 lg:p-10"
          style={{
            backgroundImage: "url(/images/calculator-bg.png)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* badge */}
          <span className="inline-block rounded-full bg-[#e6f5f0] px-3 py-1.5 text-[14px] font-semibold leading-[22px] text-[var(--color-brand-deep)]">
            WORTH IT FOR YOUR BUSINESS?
          </span>

          {/* heading */}
          <h2
            data-split
            className="mt-4 font-[family-name:var(--font-radio-canada-big)] text-[28px] font-bold leading-[36px] text-[var(--color-ink)] sm:text-[32px] sm:leading-[40px] lg:mt-6 lg:text-[40px] lg:leading-[48px]">
            Calculate Your Monthly ROI
          </h2>

          <p
            data-reveal
            className="mt-3 max-w-[728px] text-[15px] leading-[24px] text-[var(--color-ink-soft)] sm:mt-4 sm:text-[16px] sm:leading-[26px] lg:text-[18px]">
            Adjust the numbers to estimate how much time your business saves
            with automated support and organized knowledge management.
          </p>

          {/* sliders */}
          <div className="mt-6 flex flex-col gap-4 sm:mt-8 sm:gap-8 lg:mt-10">
            {/* review per month */}
            <div>
              {/* mobile: label + value row */}
              <div className="flex items-center justify-between sm:hidden">
                <span className="text-[16px] font-medium leading-[28px] text-[var(--color-ink-soft)]">
                  Review per month
                </span>
                <span className="text-[20px] font-semibold leading-[36px] text-[#009f6b]">
                  {reviews}
                </span>
              </div>
              {/* desktop: label + slider + value in one row */}
              <div className="mt-2 sm:mt-0 sm:flex sm:items-start sm:gap-6 lg:gap-8">
                <span className="hidden shrink-0 text-[20px] font-medium leading-[28px] text-[var(--color-ink-soft)] sm:block sm:w-[200px] lg:w-[240px] lg:text-[22px]">
                  Review per month
                </span>
                <div className="relative flex-1">
                  <input
                    type="range"
                    min={5}
                    max={200}
                    value={reviews}
                    onChange={(e) => setReviews(Number(e.target.value))}
                    className="calc-slider w-full"
                    style={{ "--val": `${reviewPercent}%` } as React.CSSProperties}
                  />
                  <div className="mt-1.5 flex justify-between text-[14px] text-[var(--color-ink-soft)] sm:text-[16px] lg:text-[18px]">
                    <span>5</span>
                    <span>200</span>
                  </div>
                </div>
                <span className="hidden w-[80px] shrink-0 pt-0.5 text-right text-[26px] font-semibold leading-[28px] text-[#009f6b] sm:block lg:w-[100px] lg:text-[28px]">
                  {reviews}
                </span>
              </div>
            </div>

            {/* minutes per review */}
            <div>
              {/* mobile: label + value row */}
              <div className="flex items-start justify-between sm:hidden">
                <div>
                  <span className="block text-[16px] font-medium leading-[28px] text-[var(--color-ink-soft)]">
                    Minutes per review
                  </span>
                  <span className="block text-[14px] leading-[24px] text-[#7c8380]">
                    (read + reply)
                  </span>
                </div>
                <span className="text-[20px] font-semibold leading-[36px] text-[#009f6b]">
                  {minutes} min
                </span>
              </div>
              {/* desktop: label + slider + value in one row */}
              <div className="mt-2 sm:mt-0 sm:flex sm:items-start sm:gap-6 lg:gap-8">
                <div className="hidden shrink-0 sm:block sm:w-[200px] lg:w-[240px]">
                  <span className="block text-[20px] font-medium leading-[28px] text-[var(--color-ink-soft)] lg:text-[22px]">
                    Minutes per review
                  </span>
                  <span className="block text-[14px] leading-[24px] text-[#7c8380] sm:text-[16px]">
                    (read + reply)
                  </span>
                </div>
                <div className="relative flex-1">
                  <input
                    type="range"
                    min={2}
                    max={15}
                    value={minutes}
                    onChange={(e) => setMinutes(Number(e.target.value))}
                    className="calc-slider w-full"
                    style={{ "--val": `${minutePercent}%` } as React.CSSProperties}
                  />
                  <div className="mt-1.5 flex justify-between text-[14px] text-[var(--color-ink-soft)] sm:text-[16px] lg:text-[18px]">
                    <span>2 min</span>
                    <span>15 min</span>
                  </div>
                </div>
                <span className="hidden w-[80px] shrink-0 pt-0.5 text-right text-[26px] font-semibold leading-[28px] text-[#009f6b] sm:block lg:w-[100px] lg:text-[28px]">
                  {minutes} min
                </span>
              </div>
            </div>
          </div>

          {/* results — 2+1 on mobile, 3-col on sm+ */}
          <div className="mt-6 overflow-hidden rounded-[20px] border border-white bg-[rgba(255,255,255,0.2)] backdrop-blur-[22px] sm:mt-8 lg:mt-10">
            <div
              data-reveal-stagger
              className="grid grid-cols-2 sm:grid-cols-3">
              <div className="flex flex-col gap-2 border-r border-white p-4 sm:gap-3 sm:p-6 lg:p-8">
                <span className="text-[28px] font-semibold leading-[1.15] text-[#009f6b] sm:text-[36px] lg:text-[48px] lg:leading-[56px]">
                  {stats.hours}
                </span>
                <span className="text-[13px] leading-[1.3] text-[var(--color-ink-soft)] sm:text-[16px] sm:leading-[24px] lg:text-[20px] lg:leading-[28px]">
                  Hours Saved / Month
                </span>
              </div>
              <div className="flex flex-col gap-2 p-4 sm:gap-3 sm:border-r sm:border-white sm:p-6 lg:p-8">
                <span className="text-[28px] font-semibold leading-[1.15] text-[#009f6b] sm:text-[36px] lg:text-[48px] lg:leading-[56px]">
                  {stats.money}
                </span>
                <span className="text-[13px] leading-[1.3] text-[var(--color-ink-soft)] sm:text-[16px] sm:leading-[24px] lg:text-[20px] lg:leading-[28px]">
                  Money Saved / Month
                </span>
              </div>
              <div className="col-span-2 flex flex-col items-center gap-2 border-t border-white p-4 sm:col-span-1 sm:gap-3 sm:border-t-0 sm:p-6 lg:p-8">
                <span className="text-[28px] font-semibold leading-[1.15] text-[#009f6b] sm:text-[36px] lg:text-[48px] lg:leading-[56px]">
                  {stats.roi}
                </span>
                <span className="text-[13px] leading-[1.3] text-[var(--color-ink-soft)] sm:text-[16px] sm:leading-[24px] lg:text-[20px] lg:leading-[28px]">
                  Return on PRO Yearly
                </span>
              </div>
            </div>
          </div>

          {/* footer */}
          <div
            data-reveal
            className="mt-5 flex flex-col gap-4 sm:mt-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-[572px] text-[14px] leading-[22px] text-[var(--color-ink-soft)]">
              Includes time saved from answering repetitive questions, organizing
              documentation, and reducing manual support work.
            </p>
            <a
              href="/pricing"
              className="btn-cta btn-cta--primary inline-flex h-12 w-fit items-center justify-center whitespace-nowrap rounded-full px-8 text-[15px] font-medium text-white sm:h-14 sm:text-[16px] lg:h-16 lg:text-[18px]"
            >
              <span className="btn-cta__inner">
                <span className="btn-cta__text">
                  <span>Start Free Trial</span>
                  <span className="btn-arrow">
                    <ChevronRight width={20} height={20} />
                  </span>
                </span>
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
