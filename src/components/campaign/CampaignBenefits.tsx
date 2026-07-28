import Image from "next/image";
import CampaignCta from "./CampaignCta";

const BENEFITS = [
  "Every review answered within minutes",
  "Sounds like you warm, personal, on-brand",
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
    <section className="w-full px-5 pt-8 sm:px-6 sm:pt-10 lg:px-6 2xl:pt-20">
      <div className="panel panel-2 mx-auto w-full max-w-[1392px]">
        <div className="mx-auto flex max-w-[1192px] flex-col items-center gap-10 lg:flex-row lg:items-center lg:gap-8 2xl:gap-[58px]">
          {/* Text */}
          <div className="w-full lg:flex-1">
            <h2 className="h-sec">
              More Reviews. Better Rating.{" "}
              <span className="g">More Bookings.</span>
            </h2>
            <p className="lead mt-3">
              Restaurants that reply to reviews rank higher on Google and win
              more walk-ins. RestruHub makes that automatic so your reputation
              grows while you focus on the food.
            </p>
            <div className="mt-5 flex flex-col gap-3">
              {BENEFITS.map((text) => (
                <div key={text} className="tick">
                  <Tick />
                  {text}
                </div>
              ))}
            </div>
            <CampaignCta label="Try it free for 14 days" className="mt-6" />
          </div>
          {/* Image */}
          <div className="w-full lg:w-[500px] lg:flex-shrink-0 2xl:w-[518px]">
            <Image
              src="/images/campaign/booking.png"
              alt="Auto-reply rules and instant alerts dashboard"
              width={518}
              height={562}
              className="block h-auto w-full object-cover lg:h-[560px] 2xl:h-auto"
              style={{ borderRadius: "24px" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
