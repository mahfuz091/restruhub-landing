import Image from "next/image";
import CampaignCta from "./CampaignCta";

export default function CampaignProblem() {
  return (
    <section className="w-full px-5 sm:px-6 lg:px-6">
      <div className="panel panel-1 mx-auto w-full max-w-[1392px]">
        <div className="mx-auto flex max-w-[1192px] flex-col-reverse items-center gap-10 lg:flex-row lg:gap-10 2xl:gap-[73px]">
          <div className="w-full lg:w-[500px] lg:flex-shrink-0 2xl:w-[618px]">
            <Image
              src="/images/campaign/review-read.png"
              alt="Person reading reviews on their phone outside a restaurant"
              width={618}
              height={562}
              className="block h-auto w-full object-cover lg:h-[340px] 2xl:h-auto"
              style={{ borderRadius: "24px" }}
            />
          </div>
          <div className="w-full text-center lg:flex-1 lg:text-left">
            <h2 className="h-sec">
              People read your <span className="g">reviews before</span> they
              walk in.
            </h2>
            <p className="lead mx-auto mt-4 max-w-[501px] lg:mx-0">
              Every unanswered review quietly costs you customers. They think
              you don&apos;t care and pick somewhere else.
            </p>
            <CampaignCta label="Try it free for 14 days" className="mt-12 sm:mt-8 2xl:mt-12" />
          </div>
        </div>
      </div>
    </section>
  );
}
