import { redirect } from "next/navigation";
import Navbar from "@/components/Navbar";
import PageBanner from "@/components/PageBanner";
import PricingPlansEn from "@/components/PricingPlansEn";
import RiskFreeSection from "@/components/RiskFreeSection";
import FaqSection from "@/components/FaqSection";
import Footer from "@/components/Footer";
import { getRegionFromRequest } from "@/lib/region";
import { fetchPlans } from "@/lib/pricing";

export default async function PricingPageEn() {
  const region = await getRegionFromRequest();

  if (region === "bd") {
    redirect("/pricing");
  }

  const plans = await fetchPlans(region);

  return (
    <div className="flex flex-col bg-white min-h-screen">
      <Navbar />
      <main className="flex-1">
        <PageBanner breadcrumb="Pricing" title="Simple, Transparent Pricing" />
        <PricingPlansEn plans={plans} initialRegion={region} />
        <RiskFreeSection />
        <FaqSection />
      </main>
      <Footer />
    </div>
  );
}
