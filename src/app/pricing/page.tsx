"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Navbar from "@/components/Navbar";
import PageBanner from "@/components/PageBanner";
import PricingPlans from "@/components/PricingPlans";
import RiskFreeSection from "@/components/RiskFreeSection";
import FaqSection from "@/components/FaqSection";
import Footer from "@/components/Footer";
import { getRegion } from "@/lib/client-side-region";
import { fetchPlans } from "@/lib/pricing";
import type { PricingPlan } from "@/lib/pricing";

export default function PricingPage() {
  const router = useRouter();

  const [plans, setPlans] = useState<PricingPlan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function initialize() {
      const region = await getRegion();

      if (region !== "bd") {
        router.replace("/en/pricing");
        return;
      }

      console.log("Fetching pricing plans for region:", region);

      const pricingPlans = await fetchPlans("bd");

      setPlans(pricingPlans);
      setLoading(false);
    }

    initialize();
  }, [router]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading...
      </div>
    );
  }

  const dashboardUrl = process.env.NEXT_PUBLIC_DASHBOARD_URL ?? "";

  return (
    <div className="flex flex-col bg-white min-h-screen">
      <Navbar />

      <main className="flex-1">
        <PageBanner breadcrumb="Pricing" title="Simple, Transparent Pricing" />

        <PricingPlans plans={plans} dashboardUrl={dashboardUrl} />

        <RiskFreeSection />
        <FaqSection />
      </main>

      <Footer />
    </div>
  );
}
