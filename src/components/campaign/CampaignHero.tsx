import Image from "next/image";
import CampaignCta from "./CampaignCta";

export default function CampaignHero() {
  return (
    <section className="relative w-full overflow-hidden pt-3 pb-3 sm:pt-4 sm:pb-4 2xl:pt-12 2xl:pb-8">
      <Image
        src="/images/campaign/hero-shape-left.svg"
        alt=""
        aria-hidden="true"
        width={637}
        height={957}
        priority
        className="glow glow-l pointer-events-none absolute top-0 -left-40 w-[560px] max-w-none select-none"
      />
      <Image
        src="/images/campaign/hero-shape-right.svg"
        alt=""
        aria-hidden="true"
        width={613}
        height={957}
        priority
        className="glow glow-r pointer-events-none absolute top-0 -right-40 w-[560px] max-w-none select-none"
      />

      <div className="relative mx-auto flex max-w-[1144px] flex-col items-center px-5 text-center sm:px-0">
        <span className="badge">
          <Image
            src="/images/campaign/burger.svg"
            alt=""
            width={20}
            height={20}
            className="tint-green"
          />
          For Restaurant Owners
        </span>

        <h1 className="h-hero mt-4 w-full lg:!text-[53px]">
          <span className="g">Never Let Another Review</span> On Your{" "}
          <br className="hidden md:block" />
          Restaurant Sit Unanswered On Google Again.
        </h1>

        <p className="lead mt-4 w-full max-w-[1040px] lg:!text-[22px]">
          New customers read your reviews before they decide to visit, and no
          reply makes them wonder if you care. RestruHub answers every review
          for you automatically, in your own voice, and shows you what your
          guests really think in one clear dashboard. Start today and watch your
          replies go out, your ratings climb, and your reputation take care of
          itself. Free for 14 days, no card required.
        </p>

        <CampaignCta label="Try it free for 14 days" className="mt-6" />

        <p className="note mt-5">No credit card · Set up in minutes</p>
      </div>
    </section>
  );
}
