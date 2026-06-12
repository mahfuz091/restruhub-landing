import Image from "next/image";

export default function InfographSection() {
  return (
    <section className="bg-[#F7F7F7] py-20 lg:py-[150px]">
      <div className="mx-auto w-full max-w-[1320px] px-5 sm:px-6 lg:px-0">
        {/* heading */}
        <div className="mx-auto max-w-[700px] text-center">
          <h2 className="font-[family-name:var(--font-radio-canada-big)] text-[28px] font-bold leading-[1.12] tracking-[-0.01em] text-[var(--color-ink)] sm:text-[36px] md:text-[44px] lg:text-[52px]">
            How Your Rating Improves
            <br />
            <span className="text-[var(--color-brand)]">
              Over Time With RestruHub
            </span>
          </h2>
        </div>

        {/* infograph */}
        <div className="mt-8 flex justify-center sm:mt-12 lg:mt-16">
          <Image
            src="/images/rating-improvement-infograph.svg"
            alt="RestruHub rating improvement cycle — Issues are found, reviews get responses, problems get fixed, ratings improve over time"
            width={900}
            height={900}
            className="h-auto w-full max-w-[900px]"
          />
        </div>
      </div>
    </section>
  );
}
