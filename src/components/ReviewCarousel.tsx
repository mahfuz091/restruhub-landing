"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import ReviewCard, { type Review } from "./ReviewCard";

export default function ReviewCarousel({ reviews }: { reviews: Review[] }) {
  return (
    <>
      {/* mobile/tablet: swiper */}
      <div className="relative z-10 mt-6 w-full pb-12 sm:mt-10 sm:pb-20 lg:hidden">
        <Swiper
          spaceBetween={16}
          slidesPerView="auto"
          centeredSlides
          slidesOffsetBefore={20}
          slidesOffsetAfter={20}
          className="review-swiper"
        >
          {reviews.map((r) => (
            <SwiperSlide
              key={r.name}
              className="!w-[85vw] max-w-[420px] py-2 sm:!w-[340px]"
            >
              <ReviewCard review={r} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* desktop: static row */}
      <div className="relative z-10 mx-auto mt-14 hidden w-full max-w-[1320px] gap-7 px-10 pb-28 lg:flex">
        {reviews.map((r) => (
          <div key={r.name} className="flex flex-1">
            <ReviewCard review={r} />
          </div>
        ))}
      </div>
    </>
  );
}
