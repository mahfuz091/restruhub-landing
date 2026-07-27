import CampaignCta from "./CampaignCta";

const STEPS = [
  { title: "Sign up", sub: "Free, no card." },
  { title: "Connect Google", sub: "One Click" },
  { title: "Add Restaurant", sub: "Pick Your Spot" },
  { title: "Done!", sub: "It Runs Itself." },
];

export default function CampaignHowItWorks() {
  return (
    <section className="w-full px-5 pt-8 sm:px-8 sm:pt-10 lg:px-12 xl:px-24 2xl:pt-20">
      <div className="mx-auto w-full max-w-[1248px] text-center">
        <div>
          <h2 className="h-sec">
            So <span className="g">Easy, Anyone</span> Can Do It
          </h2>
          <p className="lead mt-3">No tech skills. Nothing to install.</p>
        </div>

        <div className="mt-11 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, i) => (
            <div key={step.title} className="step justify-center text-center">
              <span className="step-num">{i + 1}</span>
              <h3 className="step-title">{step.title}</h3>
              <p className="step-sub">{step.sub}</p>
            </div>
          ))}
        </div>

        <div className="mt-11 flex justify-center">
          <CampaignCta label="Start free — takes 2 minutes" />
        </div>
      </div>
    </section>
  );
}
