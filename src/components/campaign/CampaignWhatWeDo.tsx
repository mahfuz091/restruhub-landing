import Image from "next/image";

export default function CampaignWhatWeDo() {
  return (
    <section className="w-full px-5 pt-10 sm:px-8 sm:pt-12 lg:px-12 xl:px-24 2xl:pt-[100px]">
      <div className="mx-auto w-full max-w-[1120px]">
        <div className="max-w-[720px]">
          <h2 className="h-sec">
            What <span className="g">RestruHub</span> does
          </h2>
          <p className="lead mt-4">Two simple things, both on autopilot.</p>
        </div>

        {/* Row 1: text left, image right */}
        <div className="mt-12 flex flex-col items-center gap-10 sm:mt-8 lg:flex-row lg:items-center lg:gap-12 2xl:mt-12 2xl:gap-[103px]">
          <div className="w-full lg:flex-1">
            <Image
              src="/images/campaign/does-icon-1.svg"
              alt=""
              width={56}
              height={56}
              className="block"
            />
            <h3 className="h-feat mt-4">Replies to every review</h3>
            <p className="lead mt-4 max-w-[499px]">
              It answers each Google review in your own friendly voice. You
              don&apos;t touch a thing.
            </p>
          </div>
          <div className="feature-card w-full lg:w-[430px] lg:flex-shrink-0 2xl:w-[518px]">
            <Image
              src="/images/campaign/does-1.png"
              alt="Phone showing an automatic reply to a Google review"
              width={518}
              height={401}
            />
          </div>
        </div>

        {/* Row 2: image left, text right */}
        <div className="mt-14 flex flex-col-reverse items-center gap-10 sm:mt-8 lg:flex-row lg:items-center lg:gap-12 2xl:mt-14 2xl:gap-[103px]">
          <div className="feature-card w-full lg:w-[430px] lg:flex-shrink-0 2xl:w-[518px]">
            <Image
              src="/images/campaign/does-2.png"
              alt="Dashboard highlighting areas needing attention from reviews"
              width={518}
              height={401}
            />
          </div>
          <div className="w-full lg:flex-1">
            <Image
              src="/images/campaign/does-icon-2.svg"
              alt=""
              width={56}
              height={56}
              className="block"
            />
            <h3 className="h-feat mt-4">Shows what guests think</h3>
            <p className="lead mt-4 max-w-[499px]">
              One easy score for your restaurant — what&apos;s great, and what
              to fix.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
