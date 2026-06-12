import Image from "next/image";
import { ClockIcon, StarIcon } from "./Icons";

export type Review = {
  name: string;
  avatar: string;
  rating: 1 | 2 | 3 | 4 | 5;
  postedAgo: string;
  body: string;
  food: number;
  service: number;
  atmosphere: number;
  ownerIcon: string;
  ownerReply: string;
  replyAgo: string;
};

function Stars({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-[1px]">
      {Array.from({ length: 5 }).map((_, i) => (
        <StarIcon key={i} filled={i < count} width={14} height={14} />
      ))}
    </div>
  );
}

function MetricCell({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-center justify-center gap-1 text-[13px]">
      <span className="text-[var(--color-ink-soft)]">{label}:</span>
      <span className="font-semibold text-[var(--color-ink)]">{value}</span>
    </div>
  );
}

export default function ReviewCard({ review }: { review: Review }) {
  return (
    <article className="relative flex h-full w-full flex-col rounded-[18px] bg-white p-4 ring-1 ring-[var(--color-line)]/55 sm:p-5 lg:shadow-[0_24px_60px_-28px_rgba(0,31,15,0.18),0_2px_6px_-2px_rgba(0,31,15,0.05)]">
      <header className="flex items-center gap-3">
        <Image
          src={review.avatar}
          alt={review.name}
          width={44}
          height={44}
          className="h-11 w-11 shrink-0 rounded-full object-cover ring-1 ring-[var(--color-line)]"
        />
        <div className="min-w-0 flex-1">
          <h3 className="text-[15px] font-bold leading-tight text-[var(--color-ink)] sm:text-[16px]">
            {review.name}
          </h3>
          <div className="mt-1 flex items-center gap-1.5 text-[12px] text-[var(--color-ink)] whitespace-nowrap sm:text-[13px] sm:gap-2">
            <Stars count={review.rating} />
            <span className="font-medium">Google</span>
            <span className="inline-flex items-center gap-1 text-[var(--color-ink-soft)]/75">
              <ClockIcon width={13} height={13} />
              <span>{review.postedAgo}</span>
            </span>
          </div>
        </div>
      </header>

      <p className="mt-4 flex-1 text-[13px] leading-[20px] text-[var(--color-ink)] sm:text-[14px] sm:leading-[22px]">
        {review.body}
      </p>

      <div className="mt-4 grid grid-cols-3 items-center rounded-[10px] bg-[#F3F4F1] px-1 py-2.5">
        <div className="flex items-center justify-center border-r border-[var(--color-line)]">
          <MetricCell label="Food" value={review.food} />
        </div>
        <div className="flex items-center justify-center border-r border-[var(--color-line)]">
          <MetricCell label="Service" value={review.service} />
        </div>
        <div className="flex items-center justify-center">
          <MetricCell label="Atmosphere" value={review.atmosphere} />
        </div>
      </div>

      <div className="mt-4 border-t border-[var(--color-line)] pt-4">
        <div className="flex items-center gap-2.5">
          <Image
            src={review.ownerIcon}
            alt="Owner"
            width={36}
            height={36}
            className="h-9 w-9 shrink-0"
          />
          <span className="whitespace-nowrap text-[13px] font-bold text-[var(--color-ink)] sm:text-[14px]">
            Response from the owner
          </span>
          <span className="ml-auto inline-flex items-center gap-1 whitespace-nowrap text-[11px] text-[var(--color-ink-soft)]/80 sm:text-[12px]">
            <ClockIcon width={12} height={12} />
            <span>{review.replyAgo}</span>
          </span>
        </div>
        <p className="mt-2.5 text-[13px] leading-[20px] text-[var(--color-ink)] sm:text-[14px] sm:leading-[22px]">
          {review.ownerReply}
        </p>
      </div>
    </article>
  );
}
