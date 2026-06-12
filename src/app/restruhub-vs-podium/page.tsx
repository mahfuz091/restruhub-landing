import Navbar from "@/components/Navbar";
import PageBanner from "@/components/PageBanner";
import PriceComparisonHero from "@/components/PriceComparisonHero";
import ComparisonTable from "@/components/ComparisonTable";
import StrengthsTable from "@/components/StrengthsTable";
import WhyPreferSection from "@/components/WhyPreferSection";
import WhichPlanSection from "@/components/WhichPlanSection";
import CTASaveSection from "@/components/CTASaveSection";
import Footer from "@/components/Footer";
import FaqSection from "@/components/FaqSection";

export default function RestruhubVsPodiumPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />
      <main className="flex-1">
        <PageBanner
          breadcrumb="RestruHub vs Podium"
          title="RestruHub vs Podium"
        />
        <PriceComparisonHero />
        <WhyPreferSection />
        <ComparisonTable />
        <WhichPlanSection />
        <StrengthsTable />
        <CTASaveSection />
        <FaqSection />
      </main>
      <Footer />
    </div>
  );
}
