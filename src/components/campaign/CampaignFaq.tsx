const FAQS = [
  {
    q: "Is it really free?",
    a: "Yes. You get 14 days completely free, and we don't ask for a credit card to start. Keep it only if you love it.",
  },
  {
    q: "Will the replies sound like a robot?",
    a: "No. They sound warm and personal, like you wrote them yourself. You can set the tone to match your restaurant: friendly or professional.",
  },
  {
    q: "I'm not good with tech. Is it hard to set up?",
    a: "Not at all. Sign up, connect your Google account, add your restaurant, and you're done. If you can use Instagram, you can use RestruHub.",
  },
  {
    q: "How long does setup take?",
    a: "About two minutes. Once you connect Google, RestruHub starts working on its own, nothing to install.",
  },
  {
    q: "Can I review replies before they go live?",
    a: "If you want to. By default it replies automatically, but you can switch on approval mode anytime and check each reply first with one tap.",
  },
  {
    q: "Does it reply to bad reviews too?",
    a: "Yes! And that's where it matters most. It responds to negative reviews politely and professionally, which protects your reputation and shows new customers you care.",
  },
  {
    q: "Will this help me show up higher on Google?",
    a: "Replying to reviews is something Google rewards. Staying active and responsive helps your visibility, and it builds trust with customers reading before they visit.",
  },
  {
    q: "What if I have more than one location?",
    a: "No problem. RestruHub works across multiple restaurants from one dashboard, so you can manage every location in one place.",
  },
  {
    q: "What happens when my free trial ends?",
    a: "Nothing automatic. Since there's no card on file, you won't be charged. If you'd like to keep going, you simply choose a plan. If not, no worries.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Yes, anytime, with no contract and no lock-in. You're always in control.",
  },
];

export default function CampaignFaq() {
  return (
    <section className="w-full px-5 pt-8 sm:px-8 sm:pt-10 2xl:pt-20">
      <div className="mx-auto w-full max-w-[999px]">
        <h2 className="h-sec text-center">
          <span className="g">Questions?</span> We&apos;ve Got You.
        </h2>

        <div className="mt-8 flex flex-col gap-3">
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
