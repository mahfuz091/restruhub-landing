type LegalSection = {
  title: string;
  text: string;
};

const EMAIL_RE = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/g;

function renderText(text: string) {
  return text.split("\n").map((line, i) => {
    const isBullet = line.trimStart().startsWith("-");
    const content = isBullet ? line.trimStart().slice(1).trim() : line;

    const parts = content.split(EMAIL_RE).map((part, j) =>
      EMAIL_RE.test(part) ? (
        <a
          key={j}
          href={`mailto:${part.trim()}`}
          className="text-[var(--color-brand)] underline transition hover:text-[var(--color-brand-deep)]"
        >
          {part.trim()}
        </a>
      ) : (
        <span key={j}>{part}</span>
      )
    );

    if (isBullet) {
      return (
        <span key={i} className="flex items-start gap-2.5 py-0.5">
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-brand)]" />
          <span>{parts}</span>
        </span>
      );
    }

    if (line.trim() === "") return <span key={i} className="block h-3" />;

    return (
      <span key={i} className="block py-0.5">
        {parts}
      </span>
    );
  });
}

export default function LegalContent({
  heading,
  updated,
  sections,
}: {
  heading: string;
  updated: string;
  sections: LegalSection[];
}) {
  return (
    <section className="bg-white py-12 sm:py-16 lg:py-20">
      <div className="mx-auto w-full max-w-[860px] px-5 sm:px-6 lg:px-0">
        <h2 className="font-[family-name:var(--font-radio-canada-big)] text-[26px] font-bold leading-[1.15] tracking-[-0.01em] text-[var(--color-ink)] sm:text-[32px]">
          {heading}
        </h2>
        <p className="mt-2 text-[14px] text-[var(--color-ink-soft)]">
          Last updated: {updated}
        </p>

        <div className="mt-10 space-y-9">
          {sections.map((sec) => (
            <div
              key={sec.title}
              className="rounded-2xl border border-[var(--color-line)] bg-[var(--color-card)] p-6 sm:p-7"
            >
              <h3 className="font-[family-name:var(--font-radio-canada-big)] text-[19px] font-semibold text-[var(--color-ink)] sm:text-[21px]">
                {sec.title}
              </h3>
              <div className="mt-3 text-[15px] leading-relaxed text-[var(--color-ink-soft)]">
                {renderText(sec.text)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
