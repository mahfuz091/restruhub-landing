import { Inter, Bricolage_Grotesque, Syne } from "next/font/google";
import CampaignHeader from "@/components/campaign/CampaignHeader";
import CampaignFooter from "@/components/campaign/CampaignFooter";
import "./campaign.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  display: "swap",
});

/**
 * Campaign route group — its own header/footer and type stack, separate from
 * the main marketing site. Nothing here changes the URL: `(campaign)/campaign`
 * still resolves to `/campaign`.
 */
export default function CampaignLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div
      className={`campaign ${inter.variable} ${bricolage.variable} ${syne.variable} flex min-h-screen flex-col`}
    >
      <CampaignHeader />
      <main className="flex-1">{children}</main>
      <CampaignFooter />
    </div>
  );
}
