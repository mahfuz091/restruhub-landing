"use client";

import { useState } from "react";
import Image from "next/image";

const steps = [
  {
    icon: "/images/improvment/1.svg",
    title: "Customer Leaves A Review",
    body: "A new review comes in from your customer.",
  },
  {
    icon: "/images/improvment/2.svg",
    title: "Instant Response Is Sent",
    body: "Every review gets a natural, timely reply without your involvement.",
  },
  {
    icon: "/images/improvment/3.svg",
    title: "Issues Are Detected Automatically",
    body: "The system identifies repeated complaints and highlights what needs attention.",
  },
  {
    icon: "/images/improvment/4.svg",
    title: "You Take Action And Improve",
    body: "Fix the issue early and improve your customer experience and rating over time.",
  },
];

export default function ImprovementSection() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section className="bg-[#f3f4f1] py-20 lg:py-[150px]">
      <div className="mx-auto w-full max-w-[1320px] px-5 sm:px-6 lg:px-0">
        {/* heading */}
        <div className="mx-auto max-w-[680px] text-center">
          <h2 className="font-[family-name:var(--font-radio-canada-big)] text-[28px] font-bold leading-[1.12] tracking-[-0.01em] text-[var(--color-ink)] sm:text-[36px] md:text-[44px] lg:text-[52px]">
            From Review To
            <br />
            <span className="text-[var(--color-brand)]">Real Improvement</span>
          </h2>
          <p className="mx-auto mt-4 max-w-[520px] text-[14px] leading-[22px] text-[var(--color-ink-soft)] sm:mt-5 sm:text-[16px] sm:leading-[26px]">
            Everything works together in the background so you can focus on your
            restaurant
          </p>
        </div>

        {/* mobile: vertical timeline */}
        <div className="relative mt-8 sm:mt-12 lg:hidden">
          {/* continuous dashed line */}
          <div className="absolute bottom-0 left-[14px] top-0 w-0 border-l-[2px] border-dashed border-[#d0d3d1]" />

          <div className="flex flex-col gap-4">
            {steps.map((step, i) => (
              <div key={step.title} className="flex items-center gap-4">
                {/* dot */}
                <div className="relative z-10 flex w-[30px] shrink-0 items-center justify-center">
                  <div className={`h-[18px] w-[18px] rounded-full shadow-[0_0_0_5px_#f3f4f1] transition-colors duration-300 ${
                    active === i ? "bg-[var(--color-brand-deep)]" : "bg-[#b8bbb9]"
                  }`} />
                </div>

                {/* card */}
                <div
                  className="flex flex-1 flex-col rounded-[16px] bg-white p-4"
                  onTouchStart={() => setActive(i)}
                  onTouchEnd={() => setActive(null)}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[10px] bg-[#F6F8F4]">
                      <Image
                        src={step.icon}
                        alt=""
                        width={28}
                        height={28}
                        className="h-7 w-7"
                      />
                    </div>
                    <h3 className="text-[17px] font-medium leading-[1.25] text-[var(--color-ink)]">
                      {step.title}
                    </h3>
                  </div>
                  <p className="mt-3 text-[14px] leading-[22px] text-[var(--color-ink-soft)]">
                    {step.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* desktop: horizontal grid */}
        <div className="mt-14 hidden lg:block">
          <div className="grid grid-cols-4 gap-5">
            {steps.map((step, i) => (
              <div
                key={step.title}
                className="group flex flex-col rounded-[20px] bg-white p-6"
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
              >
                <div className={`mb-6 flex h-14 w-14 items-center justify-center rounded-[12px] transition-colors duration-300 ${
                  active === i ? "bg-[var(--color-brand-deep)]" : "bg-[#F6F8F4]"
                }`}>
                  <Image
                    src={step.icon}
                    alt=""
                    width={28}
                    height={28}
                    className={`h-8 w-8 transition-all duration-300 ${
                      active === i ? "brightness-0 invert" : ""
                    }`}
                  />
                </div>

                <h3 className="text-[20px] font-medium leading-[1.25] text-[var(--color-ink)]">
                  {step.title}
                </h3>

                <p className="mt-3 text-[15px] leading-[24px] text-[var(--color-ink-soft)]">
                  {step.body}
                </p>
              </div>
            ))}
          </div>

          {/* progress dots */}
          <div className="mt-8 flex items-center justify-center">
            {steps.map((_, i) => (
              <div key={i} className="flex items-center">
                <div
                  className={`h-6 w-6 shrink-0 rounded-full transition-colors duration-300 ${
                    active === i ? "bg-[var(--color-brand-deep)]" : "bg-[#d9d9d9]"
                  }`}
                />
                {i < steps.length - 1 && (
                  <svg width="240" height="2" className="shrink-0" viewBox="0 0 240 2">
                    <line x1="0" y1="1" x2="240" y2="1" stroke="#7C8380" strokeDasharray="7 7" />
                  </svg>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
