import CampaignCta from "./CampaignCta";

const STEPS = [
  { title: "Sign up", sub: "Free, no card." },
  { title: "Connect Google", sub: "One Click" },
  { title: "Add Restaurant", sub: "Pick Your Spot" },
  { title: "Done!", sub: "It Runs Itself." },
];

export default function CampaignHowItWorks() {
  return (
    <section className="w-full px-5 pt-10 sm:px-8 sm:pt-12 lg:px-12 xl:px-24 2xl:pt-[100px]">
      <div className="mx-auto w-full max-w-[1248px] text-center">
        <div>
          <h2 className="h-sec">
            So <span className="g">easy, anyone</span> can do it
          </h2>
          <p className="lead mt-4">No tech skills. Nothing to install.</p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 text-left sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, i) => (
            <div key={step.title} className="step">
              <span className="step-num">{i + 1}</span>
              <h3 className="step-title">{step.title}</h3>
              <p className="step-sub">{step.sub}</p>
            </div>
          ))}
        </div>

        <div className="mt-14 flex justify-center">
          <CampaignCta label="Start free — takes 2 minutes" />
        </div>
      </div>
    </section>
  );
}
