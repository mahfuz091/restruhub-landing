import Navbar from "@/components/Navbar";
import PageBanner from "@/components/PageBanner";
import ReplyTemplatesHero from "@/components/ReplyTemplatesHero";
import ReplyTemplatesSection from "@/components/ReplyTemplatesSection";
import FeaturesSection from "@/components/FeaturesSection";
import PowerfulFeatures from "@/components/PowerfulFeatures";
import Footer from "@/components/Footer";
import FaqSection from "@/components/FaqSection";

export default function ReplyGeneratorPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />
      <main className="flex-1">
        <PageBanner
          breadcrumb="100 Reply Templates"
          title="100 Reply Templates"
        />
        <ReplyTemplatesHero />
        <ReplyTemplatesSection />
        <FeaturesSection />
        {/* <PowerfulFeatures /> */}
        <FaqSection />
      </main>
      <Footer />
    </div>
  );
}
