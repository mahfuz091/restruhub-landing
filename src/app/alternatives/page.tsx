import Navbar from "@/components/Navbar";
import PageBanner from "@/components/PageBanner";
import AlternativesHero from "@/components/AlternativesHero";
import WhyLeavingPodium from "@/components/WhyLeavingPodium";
import WhyRecommendSection from "@/components/WhyRecommendSection";
import FeatureComparison from "@/components/FeatureComparison";
import PowerfulFeatures from "@/components/PowerfulFeatures";
import Footer from "@/components/Footer";
import FaqSection from "@/components/FaqSection";
import ReviewsSection from "@/components/ReviewsSection";
import CTASaveSection from "@/components/CTASaveSection";

export default function AlternativesPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />
      <main className="flex-1">
        <PageBanner
          breadcrumb="Alternatives"
          title="Alternatives"
        />
        <AlternativesHero />
        <WhyLeavingPodium />
        <WhyRecommendSection />
        <FeatureComparison />
        <PowerfulFeatures />
          <ReviewsSection />
           <CTASaveSection />
        <FaqSection />
      </main>
      <Footer />
    </div>
  );
}
