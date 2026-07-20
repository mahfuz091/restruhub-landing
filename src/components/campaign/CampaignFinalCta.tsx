import CampaignCta from "./CampaignCta";

export default function CampaignFinalCta() {
  return (
    <section id="cta" className="w-full px-5 pt-[120px] sm:px-8">
      <div className="mx-auto flex w-full max-w-[774px] flex-col items-center text-center">
        <h2
          className="h-hero w-full"
          style={{ fontSize: "clamp(32px,5.6vw,56px)" }}
        >
          Stop worrying about your reviews.
        </h2>
        <p className="lead mt-5 w-full max-w-[620px]">
          Let RestruHub handle them for you — starting today, free.
        </p>
        <CampaignCta label="Try it free for 14 days" className="mt-8" />
        <p className="note mt-6">No credit card · Set up in minutes</p>
      </div>
    </section>
  );
}
