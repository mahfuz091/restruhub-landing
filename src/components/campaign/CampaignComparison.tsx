import Image from "next/image";

const ALT = "Manual reply versus RestruHub reply comparison";

/** Manual-vs-RestruHub graphic — wide artwork on desktop, tall on mobile. */
export default function CampaignComparison() {
  return (
    <section className="w-full px-5 pt-5 pb-12 sm:px-8">
      <div className="mx-auto hidden w-full max-w-[1123px] lg:block">
        <Image
          src="/images/campaign/hero-thumbnail.svg"
          alt={ALT}
          width={1124}
          height={840}
          className="block h-auto w-full"
        />
      </div>
      <Image
        src="/images/campaign/mobile-hero-thumbnail.svg"
        alt={ALT}
        width={362}
        height={923}
        className="mx-auto block h-auto w-full max-w-[362px] lg:hidden"
      />
    </section>
  );
}
