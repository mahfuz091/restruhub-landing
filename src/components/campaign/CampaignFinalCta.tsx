import CampaignCta from "./CampaignCta";

export default function CampaignFinalCta() {
  return (
    <section id="cta" className="w-full px-5 pt-8 sm:px-8 sm:pt-10 2xl:pt-20">
      <div className="mx-auto flex w-full max-w-[774px] flex-col items-center text-center">
        <h2
          className="h-hero w-full"
          style={{ fontSize: "clamp(32px,5.6vw,56px)" }}
        >
          Stop Worrying About
          <br className="hidden sm:block" /> Your Reviews.
        </h2>
        <p className="lead mt-4 w-full max-w-[650px]">
          Let RestruHub handle them for you starting today, free.
        </p>
        <CampaignCta label="Try it free for 7 days" className="mt-6" />
        <p className="note mt-5">No credit card · Set up in minutes</p>
      </div>
    </section>
  );
}
