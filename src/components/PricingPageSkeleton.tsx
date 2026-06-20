import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

function SkeletonLine({ className = "" }: { className?: string }) {
  return <div className={`skeleton-block rounded-full ${className}`.trim()} />;
}

function SkeletonCard({ highlighted = false }: { highlighted?: boolean }) {
  return (
    <div
      className={`relative flex flex-col rounded-[20px] border border-[#D9D9D9] p-5 sm:p-6 lg:p-7 ${
        highlighted ? "pricing-skeleton-card--featured" : "bg-white"
      }`}
    >
      {highlighted && (
        <div className="top-4 right-4 absolute bg-white/55 rounded-full w-24 h-10" />
      )}

      <SkeletonLine className="w-28 h-8" />
      <div className="flex items-end gap-3 mt-6">
        <SkeletonLine className="w-36 h-12" />
        <SkeletonLine className="mb-1 w-20 h-5" />
      </div>
      <SkeletonLine className="mt-4 w-full h-4" />
      <SkeletonLine className="mt-3 w-4/5 h-4" />

      <div className="bg-[#D9D9D9] my-7 w-full h-px" />

      <div className="flex flex-col flex-1 gap-4">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="flex items-center gap-3">
            <div className="skeleton-block rounded-full w-6 h-6" />
            <SkeletonLine className="flex-1 rounded-full h-4" />
          </div>
        ))}
      </div>

      <div className="mt-8">
        <div className="skeleton-block rounded-full w-full h-14 sm:h-16" />
      </div>
    </div>
  );
}

export default function PricingPageSkeleton() {
  return (
    <div className="flex flex-col bg-white min-h-screen">
      <Navbar />
      <main className="flex-1">
        <section className="bg-cover bg-no-repeat bg-bottom py-12 sm:py-16 lg:py-[100px] pricing-skeleton-banner">
          <div className="flex flex-col items-center mx-auto px-5 sm:px-6 lg:px-0 w-full max-w-[1320px] text-center">
            <SkeletonLine className="w-36 sm:w-44 h-4 sm:h-5" />
            <SkeletonLine className="mt-5 rounded-[999px] w-full max-w-[640px] h-10 sm:h-14" />
          </div>
        </section>

        <section className="bg-white py-20 lg:py-[150px]">
          <div className="mx-auto px-5 sm:px-6 lg:px-0 w-full max-w-[1320px]">
            <div className="mx-auto max-w-[760px] text-center">
              <SkeletonLine className="mx-auto rounded-[999px] w-full max-w-[620px] h-10 sm:h-12" />
              <SkeletonLine className="mx-auto mt-5 w-full max-w-[540px] h-4" />
              <SkeletonLine className="mx-auto mt-3 w-4/5 max-w-[460px] h-4" />
            </div>

            <div className="flex justify-center mt-10 sm:mt-12">
              <div className="p-1 border border-[#D9D9D9] rounded-full">
                <div className="flex gap-2">
                  <div className="skeleton-block rounded-full w-28 sm:w-32 h-11" />
                  <div className="skeleton-block rounded-full w-28 sm:w-32 h-11" />
                  <div className="skeleton-block rounded-full w-28 sm:w-32 h-11" />
                </div>
              </div>
            </div>

            <div className="gap-6 lg:gap-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-10 sm:mt-12">
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
