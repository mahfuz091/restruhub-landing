"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const steps = [
  {
    image: "/images/steps/1.png",
    step: "STEP 01",
    active: false,
    title: "Connect Your Google Reviews",
    body: "Link your Google Business profile in a few clicks",
  },
  {
    image: "/images/steps/2.png",
    step: "STEP 02",
    active: true,
    title: "RestruHub Starts Working",
    body: "Reviews are analyzed and replies are handled automatically",
  },
  {
    image: "/images/steps/3.png",
    step: "STEP 03",
    active: false,
    title: "Take Action When Needed",
    body: "Fix issues that matter and improve your customer experience",
  },
];

function StepCard({ s }: { s: (typeof steps)[0] }) {
  return (
    <div className="flex h-full flex-col rounded-[16px] bg-white p-4 shadow-none sm:rounded-[20px] sm:p-5 lg:shadow-[0_14px_64px_0_rgba(0,0,0,0.06)]">
      <div className="overflow-hidden rounded-[12px] sm:rounded-[16px]">
        <Image
          src={s.image}
          alt={s.title}
          width={440}
          height={320}
          className="h-auto w-full object-cover"
        />
      </div>

      <div className="mt-5 sm:mt-6">
        <span
          className={`inline-block rounded-[6px] px-2.5 py-1 text-[12px] font-semibold uppercase tracking-wide sm:text-[13px] ${
            s.active
              ? "bg-[var(--color-brand)] text-white"
              : "bg-[#f0f0f0] text-[var(--color-ink-soft)]"
          }`}
        >
          {s.step}
        </span>
      </div>

      <h3 className="mt-3 text-[20px] font-semibold leading-[1.25] text-[var(--color-ink)] sm:text-[22px] lg:text-[24px]">
        {s.title}
      </h3>
      <p className="mt-2 text-[14px] leading-[22px] text-[var(--color-ink-soft)] sm:text-[16px] sm:leading-[26px]">
        {s.body}
      </p>
    </div>
  );
}

export default function StepsSection() {
  return (
    <section className="bg-white py-20 lg:py-[150px]">
      <div className="mx-auto w-full max-w-[1320px] px-5 sm:px-6 lg:px-0">
        {/* header row */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <h2 className="max-w-[680px] font-[family-name:var(--font-radio-canada-big)] text-[28px] font-bold leading-[1.1] tracking-[-0.01em] text-[var(--color-ink)] sm:text-[36px] md:text-[44px] lg:text-[52px]">
            Get Started In Minutes{" "}
            <br className="hidden lg:block" />
            <span className="text-[var(--color-brand)]">With RestruHub</span>
          </h2>
          <p className="max-w-[380px] text-[14px] leading-[22px] text-[var(--color-ink-soft)] sm:text-[16px] sm:leading-[26px]">
            No complicated setup or training. Connect your account and everything
            starts working in the background.
          </p>
        </div>

        {/* mobile: swiper */}
        <div className="mt-8 sm:mt-12 lg:hidden">
          <Swiper
            modules={[Pagination]}
            pagination={{ clickable: true }}
            spaceBetween={16}
            slidesPerView={1}
            className="steps-swiper !pb-12"
          >
            {steps.map((s) => (
              <SwiperSlide key={s.step}>
                <StepCard s={s} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* desktop: grid */}
        <div className="mt-14 hidden lg:grid lg:grid-cols-3 lg:gap-7">
          {steps.map((s) => (
            <StepCard key={s.step} s={s} />
          ))}
        </div>
      </div>
    </section>
  );
}
