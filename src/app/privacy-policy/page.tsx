import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import PageBanner from "@/components/PageBanner";
import LegalContent from "@/components/LegalContent";
import Footer from "@/components/Footer";

const SITE_URL = "https://restruhub.com";

export const metadata: Metadata = {
  title: "Privacy Policy | Restruhub – Data Protection & User Privacy",
  description:
    "Learn how Restruhub collects, uses, and protects your data. We are committed to privacy, security, and safe handling of your information.",
  alternates: {
    canonical: `${SITE_URL}/privacy-policy`,
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Privacy Policy | RestruHub",
    description:
      "Learn how RestruHub protects your data and respects your privacy.",
    url: `${SITE_URL}/privacy-policy`,
    siteName: "RestruHub",
    type: "article",
  },
  twitter: {
    card: "summary",
    title: "Privacy Policy | RestruHub",
    description:
      "Understand how RestruHub collects and protects your personal information.",
  },
};

const sections = [
  {
    title: "Who We Are",
    text: `Restruhub is a service offered by Shahinul LLC (United States) that helps restaurant owners manage and reply to customer reviews using AI assistance.
We are committed to protecting your privacy and complying with GDPR where applicable.`,
  },
  {
    title: "What Information We Collect",
    text: `We collect:
- Your name, email, account details
- Restaurant/business details
- Google Business Profile data (if connected)
- IP address and basic analytics data`,
  },
  {
    title: "Why We Collect This Data",
    text: `We collect this data to:
- Allow login via Google OAuth
- Fetch & display reviews
- Generate AI-based reply drafts
- Improve platform performance
- Provide support and ensure security`,
  },
  {
    title: "Google Account & OAuth Access",
    text: `If you connect Google Business Profile:
- We access minimum required data only
- We never post without your permission (unless auto-reply is enabled)
- We follow Google API Services User Data Policy
You may revoke access anytime from Google Account settings.`,
  },
  {
    title: "Data Sharing",
    text: `We do not sell, rent, or share your data with any third parties.
Your data is used only to provide our services.`,
  },
  {
    title: "How We Store & Protect Data",
    text: `We use:
- Secure cloud infrastructure
- SSL encryption
- Strict access controls`,
  },
  {
    title: "Your Rights (Under GDPR)",
    text: `EU/EEA users may:
- Access their data
- Correct or delete data
- Withdraw consent anytime
Contact: support@restruhub.com`,
  },
  {
    title: "Data Retention",
    text: `We store your data only as long as needed.
If you cancel your account, all data will be deleted within 30 days.`,
  },
  {
    title: "Cookie Policy",
    text: `We use cookies for improving user experience and analytics.
By continuing to use the website, you agree to our Privacy Policy.`,
  },
  {
    title: "Refund Policy",
    text: `Restruhub does not offer refunds after purchase.
You may cancel anytime, but unused days are not refunded.`,
  },
  {
    title: "Contact Us",
    text: `If you have any questions:
Email: support@restruhub.com
Response time: 24–48 hours.`,
  },
];

export default function PrivacyPolicyPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />
      <main className="flex-1">
        <PageBanner breadcrumb="Privacy Policy" title="Privacy Policy" />
        <LegalContent
          heading="Privacy Policy"
          updated="12/11/2025"
          sections={sections}
        />
      </main>
      <Footer />
    </div>
  );
}
