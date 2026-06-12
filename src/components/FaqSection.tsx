const faqs = [
  {
    q: "Do I need technical skills to use RestruHub?",
    a: "Not at all. You just connect your Google Business profile, and everything starts working automatically. The interface is simple, and you can manage everything without any technical knowledge or training.",
  },
  {
    q: "Will replies sound natural or automated?",
    a: "Replies are written in a natural, human tone based on the review. You can also adjust tone settings to match your brand, and edit or approve responses anytime before they are published.",
  },
  {
    q: "Can I control or edit the responses?",
    a: "Yes. You can review, edit, or approve every reply before it goes live. If you prefer, you can also enable automatic replies for faster responses while still keeping full control whenever needed.",
  },
  {
    q: "How does RestruHub find issues in reviews?",
    a: "RestruHub analyzes all your reviews and identifies repeated patterns like wait time, service quality, or cleanliness. It highlights what customers mention most, so you can clearly see what needs attention without reading everything manually.",
  },
  {
    q: "Will this actually help improve my rating?",
    a: "By responding consistently and fixing real issues, your customer experience improves. Over time, this leads to better reviews, higher ratings, and more trust from new customers choosing where to eat.",
  },
  {
    q: "How quickly can I get started?",
    a: "You can get started in just a few minutes. Connect your Google account, and RestruHub begins analyzing reviews and preparing responses right away without any complex setup process.",
  },
  {
    q: "Is this suitable for small restaurants?",
    a: "Yes. Whether you manage one location or multiple, RestruHub helps you stay on top of reviews, save time, and improve your reputation without needing extra staff or resources.",
  },
];

export default function FaqSection() {
  return (
    <section className="bg-white py-12 sm:py-20 lg:py-[150px]">
      <div className="mx-auto w-full max-w-[1320px] px-5 sm:px-6 lg:px-0">
        {/* heading */}
        <div className="text-center">
          <h2 className="font-[family-name:var(--font-radio-canada-big)] text-[26px] font-bold leading-[1.12] tracking-[-0.01em] text-[var(--color-ink)] md:text-[36px] lg:text-[44px] xl:text-[56px]">
            Frequently Asked
            <br />
            <span className="text-[var(--color-brand)]">Questions</span>
          </h2>
        </div>

        {/* grid */}
        <div className="mt-8 grid grid-cols-1 gap-4 sm:mt-12 sm:grid-cols-2 sm:gap-5 lg:mt-14 lg:gap-6">
          {faqs.map((faq) => (
            <div
              key={faq.q}
              className="rounded-[16px] bg-[#F6F6F6] p-5 sm:rounded-[20px] sm:p-6 lg:p-7"
            >
              <h3 className="text-[16px] font-semibold leading-[1.4] text-[var(--color-ink)] sm:text-[17px] lg:text-[18px]">
                {faq.q}
              </h3>
              <p className="mt-3 text-[14px] leading-[22px] text-[var(--color-ink-soft)] sm:text-[15px] sm:leading-[24px]">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
