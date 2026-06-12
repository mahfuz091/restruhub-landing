import Navbar from "@/components/Navbar";
import PageBanner from "@/components/PageBanner";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />
      <main className="flex-1">
        <PageBanner breadcrumb="Contact us" title="Contact us" />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
