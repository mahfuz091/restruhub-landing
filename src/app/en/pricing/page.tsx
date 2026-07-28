import { redirect } from "next/navigation";
import Navbar from "@/components/Navbar";
import PageBanner from "@/components/PageBanner";
import PricingPlansEn from "@/components/PricingPlansEn";
import RegionGuard from "@/components/RegionGuard";
import RegionRedirectScript from "@/components/RegionRedirectScript";
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
  const dashboardUrl = process.env.NEXT_PUBLIC_DASHBOARD_URL ?? "";

  return (
    <>
      {/* Header detection cannot see the timezone. These two catch the BD
          visitors it resolved as "global": the script redirects before this
          page paints, the guard covers what only an IP lookup can settle. */}
      <RegionRedirectScript block="bd" redirectTo="/pricing" />

      <div className="flex flex-col bg-white min-h-screen">
        <RegionGuard allow={["eur", "global"]} redirectTo="/pricing" />
        <Navbar />
        <main className="flex-1">
          <PageBanner breadcrumb="Pricing" title="Simple, Transparent Pricing" />
          <PricingPlansEn
            plans={plans}
            initialRegion={region}
            dashboardUrl={dashboardUrl}
          />
          <RiskFreeSection />
          <FaqSection />
        </main>
        <Footer />
      </div>
    </>
  );
}
