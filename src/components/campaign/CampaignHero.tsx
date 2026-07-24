import Image from "next/image";
import CampaignCta from "./CampaignCta";

export default function CampaignHero() {
  return (
    <section className="relative w-full overflow-hidden pt-4 pb-4 sm:pt-5 sm:pb-5 2xl:pt-[60px] 2xl:pb-10">
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

      <div className="relative mx-auto flex max-w-[1144px] flex-col items-center px-5 text-center sm:px-8">
        <span className="badge">
          <Image
            src="/images/campaign/burger.svg"
            alt=""
            width={20}
            height={20}
            className="tint-green"
          />
          For restaurant owners
        </span>

        <h1 className="h-hero mt-5 w-full">
          We reply to your Restaurants
          <br className="hidden md:block" />
          <span className="g"> Google reviews</span> for you
        </h1>

        <p className="lead mt-5 w-full max-w-[720px]">
          You run the restaurant. RestruHub handles every review automatically,
          in your voice.
        </p>

        <CampaignCta label="Try it free for 14 days" className="mt-8" />

        <p className="note mt-6">No credit card · Set up in minutes</p>
      </div>
    </section>
  );
}
