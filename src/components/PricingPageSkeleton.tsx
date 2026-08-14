import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

function SkeletonLine({ className = "" }: { className?: string }) {
  return <div className={`skeleton-block rounded-full ${className}`.trim()} />;
}

function SkeletonCard({ highlighted = false }: { highlighted?: boolean }) {
  return (
    <div
      className={`relative flex flex-col rounded-[28px] p-7 sm:p-8 ${
        highlighted
          ? "border-2 border-[#064E3B] shadow-xl bg-white"
          : "border border-neutral-200/90 shadow-sm bg-white"
      }`}
    >
      {highlighted && (
        <div className="-top-3.5 right-8 absolute bg-[#064E3B]/20 rounded-full w-28 h-6" />
      )}

      <div className="flex items-center gap-2 mb-5">
        <SkeletonLine className="w-24 h-6" />
      </div>

      <div className="flex items-baseline gap-2 mb-3">
        <SkeletonLine className="w-32 h-10" />
      </div>
      <SkeletonLine className="w-full h-4 mb-2" />
      <SkeletonLine className="w-4/5 h-4 mb-6" />

      <div className="flex flex-col flex-1 gap-3.5 mb-8">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="flex items-center gap-3">
            <div className="skeleton-block rounded-full w-5 h-5 shrink-0" />
            <SkeletonLine className="flex-1 rounded-full h-4" />
          </div>
        ))}
      </div>

      <div className="mt-auto">
        <div className="skeleton-block rounded-full w-full h-12" />
        <SkeletonLine className="mx-auto mt-3 w-32 h-3" />
      </div>
    </div>
  );
}

export default function PricingPageSkeleton() {
  return (
    <div className="flex flex-col bg-white min-h-screen">
      <Navbar />
      <main className="flex-1">
        <section className="bg-cover bg-no-repeat bg-bottom py-10 sm:py-12 lg:py-[45px] pricing-skeleton-banner">
          <div className="flex flex-col items-center mx-auto px-5 sm:px-6 lg:px-0 w-full max-w-[1320px] text-center">
            <SkeletonLine className="rounded-[999px] w-full max-w-[420px] h-[29px] md:h-[40px] lg:h-[48px] 2xl:h-[62px]" />
          </div>
        </section>

        <section className="bg-white py-12 sm:py-16 2xl:py-20">
          <div className="mx-auto px-5 sm:px-6 lg:px-8 w-full max-w-[1320px]">
            <div className="mx-auto max-w-[700px] text-center">
              <SkeletonLine className="mx-auto rounded-[999px] w-full max-w-[500px] h-10 sm:h-12" />
              <SkeletonLine className="mx-auto mt-4 w-full max-w-[440px] h-4" />
            </div>

            <div className="flex justify-center mt-8 sm:mt-10 mb-10">
              <div className="inline-flex p-1 border border-neutral-200/80 rounded-full shadow-sm">
                <div className="flex gap-2">
                  <div className="skeleton-block rounded-full w-28 sm:w-32 h-10" />
                  <div className="skeleton-block rounded-full w-28 sm:w-32 h-10" />
                </div>
              </div>
            </div>

            <div className="gap-6 lg:gap-8 grid grid-cols-1 md:grid-cols-3 max-w-6xl mx-auto">
              <SkeletonCard />
              <SkeletonCard highlighted />
              <SkeletonCard />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
