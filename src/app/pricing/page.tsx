import { redirect } from "next/navigation";
import Navbar from "@/components/Navbar";
import PageBanner from "@/components/PageBanner";
import PricingPlans from "@/components/PricingPlans";
import RiskFreeSection from "@/components/RiskFreeSection";
import FaqSection from "@/components/FaqSection";
import Footer from "@/components/Footer";
import { getRegionFromRequest } from "@/lib/region";
import { fetchPlans } from "@/lib/pricing";

export default async function PricingPage() {
  const region = await getRegionFromRequest();

  if (region !== "bd") {
    redirect("/en/pricing");
  }

  const plans = await fetchPlans("bd");

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />
      <main className="flex-1">
        <PageBanner breadcrumb="Pricing" title="Simple, Transparent Pricing" />
        <PricingPlans plans={plans} />
        <RiskFreeSection />
        <FaqSection />
      </main>
      <Footer />
    </div>
  );
}
