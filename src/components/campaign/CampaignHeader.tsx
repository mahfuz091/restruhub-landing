import Image from "next/image";
import Link from "next/link";
import CampaignCta from "./CampaignCta";

/** Campaign-only header: logo + a single conversion CTA, no site nav. */
export default function CampaignHeader() {
  return (
    <header
      className="sticky top-0 z-50 w-full"
      style={{ background: "#FAFAFA" }}
    >
      <div className="mx-auto flex w-full max-w-[1440px] items-center justify-between px-5 py-3 sm:px-8 lg:px-12 xl:px-24">
        <Link href="/" className="flex flex-shrink-0 items-center">
          <Image
            src="/images/campaign/logo.svg"
            alt="RestruHub"
            width={222}
            height={32}
            priority
            className="logo-img block"
          />
        </Link>
        <CampaignCta
          label="Try Free"
          size="sm"
          style={{ padding: "12px 28px", fontSize: "17px" }}
        />
      </div>
    </header>
  );
}
