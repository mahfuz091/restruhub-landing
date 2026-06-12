import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import ReviewsSection from "@/components/ReviewsSection";
import Calculator from "@/components/Calculator";
import FeaturedSection from "@/components/FeaturedSection";
import ImprovementSection from "@/components/ImprovementSection";
import SoftwareSection from "@/components/SoftwareSection";
import PricingTable from "@/components/PricingTable";
import HurtingSection from "@/components/HurtingSection";
import InfographSection from "@/components/InfographSection";
import StepsSection from "@/components/StepsSection";
import CtaSection from "@/components/CtaSection";
import FaqSection from "@/components/FaqSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <ReviewsSection />
        <Calculator />
        <div id="features" className="scroll-mt-20">
          <FeaturedSection />
        </div>
        <ImprovementSection />
        <SoftwareSection />
        <PricingTable />
        <HurtingSection />
        <InfographSection />
        <div id="how" className="scroll-mt-20">
          <StepsSection />
        </div>
        <div id="get-started" className="scroll-mt-20">
          <CtaSection />
        </div>
        <div id="faq" className="scroll-mt-20">
          <FaqSection />
        </div>
      </main>
      <Footer />
    </div>
  );
}
