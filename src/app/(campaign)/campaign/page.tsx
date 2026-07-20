import type { Metadata } from "next";
import CampaignHero from "@/components/campaign/CampaignHero";
import CampaignComparison from "@/components/campaign/CampaignComparison";
import CampaignProblem from "@/components/campaign/CampaignProblem";
import CampaignWhatWeDo from "@/components/campaign/CampaignWhatWeDo";
import CampaignBenefits from "@/components/campaign/CampaignBenefits";
import CampaignHowItWorks from "@/components/campaign/CampaignHowItWorks";
import CampaignFaq from "@/components/campaign/CampaignFaq";
import CampaignFinalCta from "@/components/campaign/CampaignFinalCta";

export const metadata: Metadata = {
  title: "RestruHub — We reply to your restaurant's Google reviews for you",
  description:
    "RestruHub automatically replies to every Google review for your restaurant, in your own voice. Try it free for 14 days — no credit card.",
};

export default function CampaignPage() {
  return (
    <>
      <CampaignHero />
      <CampaignComparison />
      <CampaignProblem />
      <CampaignWhatWeDo />
      <CampaignBenefits />
      <CampaignHowItWorks />
      <CampaignFaq />
      <CampaignFinalCta />
    </>
  );
}
