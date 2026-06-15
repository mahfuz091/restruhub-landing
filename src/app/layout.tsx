import type { Metadata } from "next";
import { Poppins, Radio_Canada_Big, Dancing_Script } from "next/font/google";
import "./globals.css";
import SiteAnimations from "@/components/SiteAnimations";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const radioCanadaBig = Radio_Canada_Big({
  variable: "--font-radio-canada-big",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const dancingScript = Dancing_Script({
  variable: "--font-dancing-script",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "RestruHub — Stop Losing Customers From Unanswered Reviews",
  description:
    "RestruHub helps you reply to every review, understand what customers are unhappy about, and fix issues before they affect your rating and reputation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${poppins.variable} ${radioCanadaBig.variable} ${dancingScript.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-white text-ink">
        {/* Pre-paint: enable GSAP reveal pre-hide; strip it if the engine
            never boots (JS error / disabled) so content can't stay hidden. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){var d=document.documentElement;if(!matchMedia('(prefers-reduced-motion: reduce)').matches){d.classList.add('gsap');setTimeout(function(){if(!window.__gsapReady){d.classList.remove('gsap')}},2500)}})();",
          }}
        />
        <SiteAnimations />
        {children}
      </body>
    </html>
  );
}
