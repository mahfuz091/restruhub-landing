import Link from "next/link";

export default function PageBanner({
  breadcrumb,
  title,
}: {
  breadcrumb: string;
  title: string;
}) {
  return (
    <section
      className="bg-cover bg-bottom bg-no-repeat py-12 sm:py-16 lg:py-[100px]"
      style={{ backgroundImage: "url(/images/page-banner.png)" }}
    >
      <div className="mx-auto w-full max-w-[1320px] px-5 text-center sm:px-6 lg:px-0">
        <div
          className="text-[14px] text-[var(--color-ink-soft)] sm:text-[16px]"
          data-reveal
        >
          <Link
            href="/"
            className="font-medium text-[var(--color-brand)] hover:text-[var(--color-brand-deep)]"
          >
            Home
          </Link>
          <span className="mx-2">-</span>
          <span>{breadcrumb}</span>
        </div>

        <h1
          className="mt-4 font-[family-name:var(--font-radio-canada-big)] text-[26px] font-bold leading-[1.1] tracking-[-0.01em] text-[var(--color-ink)] sm:mt-5 md:text-[36px] lg:text-[44px] xl:text-[56px]"
          data-split
        >
          {title}
        </h1>
      </div>
    </section>
  );
}
