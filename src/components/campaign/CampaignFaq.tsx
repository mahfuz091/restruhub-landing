const FAQS = [
  {
    q: "Is it really free?",
    a: "Yes. 14 days completely free, and no card needed to start. Keep it only if you love it.",
  },
  {
    q: "Will replies sound like a robot?",
    a: "No. They sound warm and personal, like you wrote them. You pick the tone — friendly or professional.",
  },
  {
    q: "I'm not good with tech. Is it hard?",
    a: "Not at all. Sign up, connect Google, done. If you can use Instagram, you can use this.",
  },
  {
    q: "Can I check replies before they post?",
    a: "If you want to. It runs on its own by default, but you can switch on approval anytime.",
  },
];

export default function CampaignFaq() {
  return (
    <section className="w-full px-5 pt-[120px] sm:px-8">
      <div className="mx-auto w-full max-w-[999px]">
        <h2 className="h-sec text-center">
          <span className="g">Questions?</span> We&apos;ve got you.
        </h2>

        <div className="mt-10 flex flex-col gap-4">
          {FAQS.map((item) => (
            <div key={item.q} className="faq-item">
              <p className="faq-q">{item.q}</p>
              <p className="faq-a">{item.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
