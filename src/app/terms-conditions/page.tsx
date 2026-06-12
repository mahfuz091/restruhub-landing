import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import PageBanner from "@/components/PageBanner";
import LegalContent from "@/components/LegalContent";
import Footer from "@/components/Footer";

const SITE_URL = "https://restruhub.com";

export const metadata: Metadata = {
  title: "Terms & Conditions | Restruhub – Service Usage Rules",
  description:
    "Review Restruhub's terms and conditions to understand user responsibilities, service usage, payments, and platform policies.",
  alternates: {
    canonical: `${SITE_URL}/terms-conditions`,
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Terms & Conditions | RestruHub",
    description:
      "Read RestruHub's Terms & Conditions for service usage rules, payments, and user responsibilities.",
    url: `${SITE_URL}/terms-conditions`,
    siteName: "RestruHub",
    type: "article",
  },
  twitter: {
    card: "summary",
    title: "Terms & Conditions | RestruHub",
    description:
      "Understand RestruHub's service usage rules, responsibilities, and platform policies.",
  },
};

const sections = [
  {
    title: "Our Service",
    text: `Restruhub is a software tool that helps restaurant owners:
- Manage reviews from Google
- Get AI-generated reply suggestions
- Use manual or automatic approval of review replies

We also offer future tools such as analytics and competitor insights.`,
  },
  {
    title: "User Account",
    text: `You are responsible for keeping your login secure. Do not share access with others. You must use your real restaurant business to connect with our system.`,
  },
  {
    title: "Google Integration",
    text: `When you connect your Google Business Profile:
- We only access public data (reviews, business info)
- We never post replies without your permission (unless you enable auto-mode)
- You can revoke access from your Google Account anytime`,
  },
  {
    title: "Subscription & Cancellation",
    text: `Restruhub is a paid service with no free plan.
You can cancel your subscription at any time from your dashboard. Your access will remain until the end of the billing cycle.
No refunds are provided once a payment is made.`,
  },
  {
    title: "Prohibited Use",
    text: `You agree not to use our platform for illegal or harmful activities.
We reserve the right to suspend any account that violates our terms.`,
  },
  {
    title: "Liability",
    text: `We provide our service "as-is" without guarantees.
We are not responsible for any business loss caused by use or misuse of our platform.`,
  },
  {
    title: "Contact",
    text: `For questions or support, contact us:
support@restruhub.com`,
  },
];

export default function TermsConditionsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />
      <main className="flex-1">
        <PageBanner breadcrumb="Terms & Conditions" title="Terms & Conditions" />
        <LegalContent
          heading="Terms of Service"
          updated="12/11/2025"
          sections={sections}
        />
      </main>
      <Footer />
    </div>
  );
}
