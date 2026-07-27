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
  title:
    "RestruHub — Never let another review on your restaurant sit unanswered on Google",
  description:
    "RestruHub answers every Google review for your restaurant automatically, in your own voice, and shows you what guests really think. Free for 14 days, no card required.",
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
