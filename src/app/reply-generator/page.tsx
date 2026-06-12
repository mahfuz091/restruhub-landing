import Navbar from "@/components/Navbar";
import PageBanner from "@/components/PageBanner";
import ReplyGenerator from "@/components/ReplyGenerator";
import WhyRepliesSection from "@/components/WhyRepliesSection";
import StarRatingGuide from "@/components/StarRatingGuide";
import GetStartedSection from "@/components/GetStartedSection";
import TrustSection from "@/components/TrustSection";
import Footer from "@/components/Footer";
import FaqSection from "@/components/FaqSection";

export default function ReplyGeneratorPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />
      <main className="flex-1">
        <PageBanner
          breadcrumb="AI Google Reply Assistant"
          title="Free AI Review Reply Generator"
        />
        <ReplyGenerator />
        <WhyRepliesSection />
        <StarRatingGuide />
        <GetStartedSection />
        <TrustSection />
        <FaqSection />
      </main>
      <Footer />
    </div>
  );
}
