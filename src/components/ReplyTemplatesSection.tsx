"use client";

import { useState } from "react";

type Template = { tone: string; text: string };
type Category = {
  key: string;
  rating: number;
  label: string;
  templates: Template[];
};

const categories: Category[] = [
  {
    key: "5-star",
    rating: 5,
    label: "5-Star Review Replies",
    templates: [
      {
        tone: "friendly",
        text: "Thank you so much for the wonderful 5-star review! We're thrilled you enjoyed your visit and can't wait to welcome you back again soon.",
      },
      {
        tone: "playful",
        text: "Five stars?! You just made our whole team do a little happy dance. Thanks for the love — the next round of good vibes is on us!",
      },
      {
        tone: "professional",
        text: "We sincerely appreciate your 5-star rating and kind words. It's our pleasure to deliver an experience that meets your expectations, and we look forward to serving you again.",
      },
      {
        tone: "warm",
        text: "What a heartfelt review — thank you! Guests like you are the reason we love what we do. We can't wait to share another memorable visit with you.",
      },
      {
        tone: "friendly",
        text: "Thanks a million for the glowing feedback! We're so glad everything hit the mark. See you again very soon!",
      },
      {
        tone: "professional",
        text: "Thank you for taking the time to share such a positive review. Your recognition motivates our team to maintain the highest standards every single day.",
      },
      {
        tone: "warm",
        text: "Your kind words truly made our day. It means the world to us that you felt cared for — you'll always have a seat at our table.",
      },
      {
        tone: "playful",
        text: "Stop it, you're making us blush! Thanks for the five shiny stars — we'll keep the good food and good times coming just for you.",
      },
      {
        tone: "friendly",
        text: "So happy to hear you had a great time with us! Thank you for the support — we appreciate you and hope to see you again soon.",
      },
      {
        tone: "professional",
        text: "We are grateful for your 5-star endorsement. Delivering exceptional service is our priority, and feedback like yours confirms we're on the right track.",
      },
    ],
  },
  {
    key: "4-star",
    rating: 4,
    label: "4-Star Review Replies",
    templates: [
      {
        tone: "friendly",
        text: "Thanks so much for the 4-star review! We're glad you enjoyed your visit, and we'd love to know what would have made it a perfect five next time.",
      },
      {
        tone: "professional",
        text: "Thank you for your thoughtful feedback and positive rating. We value your suggestions and are always working to elevate every detail of your experience.",
      },
      {
        tone: "warm",
        text: "We really appreciate you taking the time to share this. It means a lot that you enjoyed your time with us — we'd be delighted to earn that fifth star on your return.",
      },
      {
        tone: "playful",
        text: "Four stars — we'll happily take it! Now we're on a mission to win over that last one. Come back and let us show you our A-game!",
      },
      {
        tone: "friendly",
        text: "Thank you for the kind review! We're happy you had a good experience and we're already noting your feedback to make the next one even better.",
      },
      {
        tone: "professional",
        text: "We appreciate your balanced and constructive review. Your insights help us refine our service, and we hope to exceed your expectations on your next visit.",
      },
    ],
  },
  {
    key: "3-star",
    rating: 3,
    label: "3-Star Review Replies",
    templates: [
      {
        tone: "professional",
        text: "Thank you for your honest feedback. We're glad some parts of your visit stood out, and we'd welcome the chance to learn how we can improve the rest.",
      },
      {
        tone: "warm",
        text: "We appreciate you sharing your experience with us. It sounds like we got some things right and missed on others — we'd genuinely love another chance to do better.",
      },
      {
        tone: "friendly",
        text: "Thanks for the feedback! We're glad parts of your visit were enjoyable, and we'd really like to hear how we can turn your next one into a five-star experience.",
      },
      {
        tone: "professional",
        text: "Your candid review is valuable to us. We take every comment seriously and are committed to addressing the areas you mentioned so your next visit is much stronger.",
      },
      {
        tone: "warm",
        text: "Thank you for giving us a try and for being honest about it. We'd love to make it right — please reach out so we can welcome you back the way you deserve.",
      },
    ],
  },
  {
    key: "1-2-star",
    rating: 2,
    label: "1-2 Star Review Replies",
    templates: [
      {
        tone: "professional",
        text: "Offer a genuine apology, take accountability, and show willingness to resolve the issue. When appropriate, encourage the customer to continue the conversation.",
      },
      {
        tone: "warm",
        text: "We're truly sorry your experience fell short — that's not the standard we hold ourselves to. Please reach out so we can make this right and earn back your trust.",
      },
      {
        tone: "professional",
        text: "Thank you for bringing this to our attention. We sincerely apologize for the inconvenience and would appreciate the opportunity to discuss and resolve your concerns directly.",
      },
      {
        tone: "warm",
        text: "We hear you, and we're sorry we let you down. Your feedback matters to us, and we'd be grateful for the chance to fix what went wrong and welcome you back.",
      },
      {
        tone: "professional",
        text: "We regret that your visit did not meet expectations. Please contact our team so we can understand what happened and take the right steps to correct it.",
      },
    ],
  },
];

function Star({ filled }: { filled: boolean }) {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill={filled ? "var(--color-warning)" : "#d4d7d4"}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      className="shrink-0"
    >
      <path d="M12 2.5l2.95 6.16 6.8.6c.65.06.91.86.42 1.29l-5.17 4.42 1.58 6.62c.15.63-.53 1.13-1.1.79L12 18.9l-6.48 3.48c-.57.34-1.25-.16-1.1-.79l1.58-6.62L.83 10.55c-.49-.43-.23-1.23.42-1.29l6.8-.6L11 2.5c.27-.57 1.1-.57 1.37 0z" />
    </svg>
  );
}

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((n) => (
        <Star key={n} filled={n <= rating} />
      ))}
    </div>
  );
}

function CopyIcon({ copied }: { copied: boolean }) {
  if (copied) {
    return (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="var(--color-brand, #009f6b)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="M20 6 9 17l-5-5" />
      </svg>
    );
  }
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#7c8380"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect x="9" y="9" width="11" height="11" rx="2.5" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

export default function ReplyTemplatesSection() {
  const [activeKey, setActiveKey] = useState(categories[0].key);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const active = categories.find((c) => c.key === activeKey) ?? categories[0];

  async function handleCopy(id: string, text: string) {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId((cur) => (cur === id ? null : cur)), 1800);
    } catch {
      /* clipboard unavailable */
    }
  }

  return (
    <section className="pb-12 sm:pb-16 lg:pb-[150px]">
      <div className="mx-auto w-full max-w-[1320px] px-5 sm:px-6 2xl:px-0">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-[47px]">
          {/* left — tab selector */}
          <div className="flex flex-col gap-5 lg:sticky lg:top-24 lg:w-[443px] lg:shrink-0 lg:gap-6">
            <h2 className="font-[family-name:var(--font-poppins)] text-[18px] font-medium leading-[26px] text-[#001f0f] sm:text-[22px] sm:leading-[28px]">
              Select a Review Response Template.
            </h2>

            <div
              role="tablist"
              aria-label="Review response categories"
              className="flex gap-4 overflow-x-auto pb-1 lg:flex-col lg:gap-6 lg:overflow-visible lg:pb-0"
            >
              {categories.map((c) => {
                const selected = c.key === activeKey;
                return (
                  <button
                    key={c.key}
                    role="tab"
                    type="button"
                    aria-selected={selected}
                    onClick={() => setActiveKey(c.key)}
                    className={`flex min-w-[240px] shrink-0 cursor-pointer flex-col items-start gap-2.5 rounded-[14px] border p-5 text-left transition-colors lg:min-w-0 lg:w-full ${
                      selected
                        ? "border-[#009f6b] bg-[#cdf1e5]"
                        : "border-[#eaecf0] bg-white hover:border-[#009f6b]/40"
                    }`}
                  >
                    <Stars rating={c.rating} />
                    <span className="font-[family-name:var(--font-poppins)] text-[18px] font-medium leading-[24px] text-[#001f0f] sm:text-[22px] sm:leading-[28px]">
                      {c.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* right — templates list */}
          <div className="flex min-w-0 flex-1 flex-col gap-5 sm:gap-6 lg:max-h-[1900px]">
            <div className="flex shrink-0 flex-col gap-1">
              <Stars rating={active.rating} />
              <h3 className="font-[family-name:var(--font-radio-canada-big)] text-[28px] font-semibold leading-[1.15] text-[#001f0f] sm:text-[34px] md:text-[40px] md:leading-[48px]">
                {active.label}
              </h3>
            </div>

            <div
              role="tabpanel"
              className="flex flex-col gap-5 sm:gap-6 lg:min-h-0 lg:flex-1 lg:overflow-y-auto lg:pr-2 lg:pb-1 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#005128] [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-[#f7f7f7]"
            >
              {active.templates.map((t, i) => {
                const id = `${active.key}-${i}`;
                const copied = copiedId === id;
                return (
                  <div
                    key={id}
                    className="flex items-start gap-4 rounded-[20px] bg-white p-5 drop-shadow-[0px_14px_32px_rgba(0,0,0,0.06)] sm:gap-5 sm:p-6"
                  >
                    <div className="flex min-w-0 flex-1 flex-col gap-3.5 sm:gap-4">
                      <span className="inline-flex w-fit items-center justify-center rounded-full bg-[#cdf1e5] px-2 py-1.5 text-[12px] uppercase leading-[16px] text-[#009f6b]">
                        {t.tone}
                      </span>
                      <p className="text-[16px] leading-[24px] text-[#2b2d2c] sm:text-[18px] sm:leading-[26px]">
                        {t.text}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopy(id, t.text)}
                      aria-label={copied ? "Copied" : "Copy reply"}
                      title={copied ? "Copied" : "Copy reply"}
                      className="shrink-0 cursor-pointer rounded-md p-1 transition-opacity hover:opacity-70"
                    >
                      <CopyIcon copied={copied} />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
