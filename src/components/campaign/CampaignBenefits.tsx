import Image from "next/image";
import CampaignCta from "./CampaignCta";

const BENEFITS = [
  "Every review answered within minutes",
  "Sounds like you — warm, personal, on-brand",
  "Weekly sentiment insights, in plain English",
  "Works with your Google Business Profile in one click",
];

function Tick() {
  return (
    <span className="tick-box">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
        <path
          d="M5 12.5l4.5 4.5L19 7"
          stroke="#fff"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

export default function CampaignBenefits() {
  return (
    <section className="w-full px-5 pt-[120px] sm:px-6 lg:px-6">
      <div className="panel panel-2 mx-auto w-full max-w-[1392px]">
        <div className="mx-auto flex max-w-[1192px] flex-col items-center gap-12 lg:flex-row lg:items-center lg:gap-[73px]">
          {/* Text */}
          <div data-reveal-stagger className="w-full lg:w-[594px] lg:flex-shrink-0">
            <h2 className="h-sec">
              More reviews. Better rating. <span className="g">More bookings.</span>
            </h2>
            <p className="lead mt-4">
              Restaurants that reply to reviews rank higher on Google and win more
              walk-ins. RestruHub makes that automatic so your reputation grows while you
              focus on the food.
            </p>
            <div className="mt-6 flex flex-col gap-4">
              {BENEFITS.map((text) => (
                <div key={text} className="tick">
                  <Tick />
                  {text}
                </div>
              ))}
            </div>
            <CampaignCta label="Try it free for 14 days" className="mt-8" />
          </div>
          {/* Image */}
          <div data-reveal="right" className="w-full lg:w-[518px] lg:flex-shrink-0">
            <Image
              src="/images/campaign/booking.png"
              alt="Auto-reply rules and instant alerts dashboard"
              width={518}
              height={562}
              className="block h-auto w-full"
              style={{ borderRadius: "24px" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
