"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  slugifyHeading,
  tocFromBlocks,
  type EditorBlock,
  type Post,
} from "@/lib/blog";

/* -------------------------------- Icons -------------------------------- */

function ChevronDown({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M5 7.5 10 12.5 15 7.5"
        stroke="currentColor"
        strokeWidth="1.67"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function DotIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="8" cy="8" r="3" fill="currentColor" />
    </svg>
  );
}

function ShareIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="18" cy="5" r="3" stroke="currentColor" strokeWidth="2" />
      <circle cx="6" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
      <circle cx="18" cy="19" r="3" stroke="currentColor" strokeWidth="2" />
      <path
        d="m8.6 10.6 6.8-4.2M8.6 13.4l6.8 4.2"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M14 8.5h2.5V5.6c-.43-.06-1.36-.1-2.3-.1-2.28 0-3.84 1.39-3.84 3.95V11H8v3h2.36v7h2.93v-7h2.27l.36-3h-2.63V9.74c0-.87.24-1.24 1.71-1.24Z" />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.53 3h2.94l-6.42 7.34L21.6 21h-5.9l-4.62-6.04L5.78 21H2.83l6.87-7.85L2.4 3h6.05l4.18 5.52L17.53 3Zm-1.03 16.2h1.63L7.6 4.7H5.85L16.5 19.2Z" />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M6.94 8.5H4.06V20h2.88V8.5Zm.18-3.27a1.67 1.67 0 1 0-3.34 0 1.67 1.67 0 0 0 3.34 0ZM20 13.9c0-2.77-1.48-4.06-3.45-4.06-1.59 0-2.3.88-2.7 1.5V8.5H10.9c.04.83 0 11.5 0 11.5h2.96v-6.42c0-.27.02-.53.1-.72.21-.53.7-1.08 1.5-1.08 1.06 0 1.49.8 1.49 1.99V20H20v-6.1Z" />
    </svg>
  );
}

/* ---------------------------- Article blocks ---------------------------- */
/* Renders EditorJS blocks in the article design (header/paragraph/list/
   image/quote/code/table). Paragraph & table cells are HTML. */

const LINK_CLASS =
  "[&_a]:text-[var(--color-brand)] [&_a]:underline [&_a]:decoration-from-font [&_a]:underline-offset-2 hover:[&_a]:text-[var(--color-brand-deep)]";

function renderItemText(item: unknown): string {
  if (typeof item === "string") return item;
  if (item && typeof item === "object") {
    const o = item as { text?: string; content?: string };
    return o.text ?? o.content ?? "";
  }
  return "";
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M20 6 9 17l-5-5"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArticleBlocks({ blocks }: { blocks: EditorBlock[] }) {
  return (
    <div className="flex flex-col">
      {blocks.map((block, i) => {
        const prev = blocks[i - 1];
        const afterHeading = prev?.type === "header";
        const data = block.data || {};

        switch (block.type) {
          case "header": {
            const level = data.level || 2;
            if (level === 2) {
              return (
                <h2
                  key={i}
                  id={block.id || slugifyHeading(String(data.text ?? ""))}
                  className="scroll-mt-28 text-[26px] font-bold leading-[34px] text-[#181818] first:mt-0 mt-12 sm:text-[32px] sm:leading-[42px] lg:text-[36px] lg:leading-[45px]"
                >
                  {data.text}
                </h2>
              );
            }
            if (level === 3) {
              return (
                <h3
                  key={i}
                  id={block.id}
                  className="mt-10 text-[22px] font-bold leading-[30px] text-[#181818] sm:text-[26px] sm:leading-[34px] lg:text-[30px] lg:leading-[37.5px]"
                >
                  {data.text}
                </h3>
              );
            }
            return (
              <h4
                key={i}
                id={block.id}
                className="mt-8 text-[20px] font-bold leading-[28px] text-[#181818] sm:text-[22px] sm:leading-[30px]"
              >
                {data.text}
              </h4>
            );
          }

          case "paragraph": {
            const text: string = data.text ?? "";
            if (!text || text.replace(/<br\s*\/?>/gi, "").trim() === "")
              return null;
            return (
              <p
                key={i}
                className={`${
                  afterHeading ? "mt-5" : "mt-6"
                } ${LINK_CLASS} text-[17px] leading-[28px] text-[#364153] first:mt-0 sm:text-[18px] sm:leading-[30px] lg:text-[20px] lg:leading-[34px]`}
                dangerouslySetInnerHTML={{ __html: text }}
              />
            );
          }

          case "list": {
            const items: unknown[] = data.items || [];
            if (data.style === "ordered") {
              return (
                <ol
                  key={i}
                  className="mt-6 ml-4 list-inside list-decimal space-y-3 text-[17px] leading-[28px] text-[#364153] sm:text-[18px] lg:text-[20px]"
                >
                  {items.map((it, j) => (
                    <li key={j} className="pl-2">
                      {renderItemText(it)}
                    </li>
                  ))}
                </ol>
              );
            }
            return (
              <ul key={i} className="mt-6 space-y-4">
                {items.map((it, j) => (
                  <li
                    key={j}
                    className="flex items-start gap-3 text-[17px] leading-[28px] text-[#364153] sm:text-[18px] lg:text-[20px]"
                  >
                    <CheckIcon className="mt-1 size-5 shrink-0 text-[var(--color-brand)]" />
                    <span>{renderItemText(it)}</span>
                  </li>
                ))}
              </ul>
            );
          }

          case "image": {
            const url = data?.file?.url;
            if (!url) return null;
            return (
              <figure
                key={i}
                className="mt-8 overflow-hidden rounded-[16px] shadow-[0px_8px_30px_rgba(0,0,0,0.06)]"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={url}
                  alt={data.caption || "Blog image"}
                  className="w-full object-cover"
                />
                {data.caption && (
                  <figcaption className="mt-3 text-center text-[14px] italic text-[#9aa0a6]">
                    {data.caption}
                  </figcaption>
                )}
              </figure>
            );
          }

          case "quote":
            return (
              <blockquote
                key={i}
                className={`${LINK_CLASS} mt-8 rounded-r-[16px] border-l-4 border-[var(--color-brand)] bg-[var(--color-brand)]/5 p-6 text-[18px] font-medium italic leading-[30px] text-[#181818] sm:p-8 sm:text-[20px]`}
              >
                <div dangerouslySetInnerHTML={{ __html: data.text ?? "" }} />
                {data.caption && (
                  <cite className="mt-4 block text-[14px] font-bold not-italic text-[#9aa0a6]">
                    — {data.caption}
                  </cite>
                )}
              </blockquote>
            );

          case "code":
            return (
              <pre
                key={i}
                className="mt-8 overflow-x-auto rounded-[12px] bg-[#181818] p-6 font-mono text-[14px] leading-relaxed text-white"
              >
                <code>{data.code}</code>
              </pre>
            );

          case "table":
            return (
              <div
                key={i}
                className="mt-8 overflow-x-auto rounded-[12px] border border-[#f3f4f6] shadow-sm"
              >
                <table className="w-full border-collapse text-left">
                  <tbody className="divide-y divide-[#f3f4f6]">
                    {(data?.content || []).map((row: string[], r: number) => (
                      <tr key={r} className={r % 2 === 0 ? "bg-white" : "bg-[#f9fafb]"}>
                        {row.map((cell, c) => (
                          <td
                            key={c}
                            className="border-x border-[#f3f4f6] p-4 text-[15px] text-[#364153]"
                            dangerouslySetInnerHTML={{ __html: cell }}
                          />
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );

          default:
            return null;
        }
      })}
    </div>
  );
}

/* ------------------------------ TOC widget ------------------------------ */

function TableOfContents({
  items,
  activeId,
  onNavigate,
  defaultOpen = true,
}: {
  items: { id: string; text: string }[];
  activeId: string;
  onNavigate: (id: string) => void;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="overflow-hidden rounded-[16px] border border-[#f3f4f6] bg-white shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full cursor-pointer items-center justify-between bg-[rgba(249,250,251,0.5)] p-5 text-left"
      >
        <span className="text-[16px] font-bold leading-6 text-[#181818]">
          Table of Contents
        </span>
        <ChevronDown
          className={`size-5 text-[#181818] transition-transform duration-200 ${
            open ? "" : "-rotate-90"
          }`}
        />
      </button>

      {open && (
        <nav className="flex flex-col gap-1 px-5 py-2">
          {items.map((item) => {
            const active = item.id === activeId;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate(item.id);
                }}
                className={`flex items-start gap-2 py-3 text-[14px] leading-5 transition-colors ${
                  active
                    ? "font-medium text-[var(--color-brand)]"
                    : "text-[#4a5565] hover:text-[var(--color-brand)]"
                }`}
              >
                <DotIcon
                  className={`mt-[2px] size-4 shrink-0 ${
                    active ? "text-[var(--color-brand)]" : "text-[#9aa0a6]"
                  }`}
                />
                <span>{item.text}</span>
              </a>
            );
          })}
        </nav>
      )}
    </div>
  );
}

/* ----------------------------- Share + CTA ----------------------------- */

function ShareCard() {
  const socials = [
    { Icon: FacebookIcon, label: "Share on Facebook" },
    { Icon: XIcon, label: "Share on X" },
    { Icon: LinkedInIcon, label: "Share on LinkedIn" },
  ];
  return (
    <div className="flex flex-col gap-4 rounded-[16px] bg-[#181818] p-6 shadow-[0px_20px_25px_-5px_rgba(24,24,24,0.1),0px_8px_10px_-6px_rgba(24,24,24,0.1)]">
      <div className="flex items-center gap-2">
        <ShareIcon className="size-3.5 text-white" />
        <span className="text-[14px] font-bold uppercase tracking-[1.4px] text-white">
          Share Story
        </span>
      </div>
      <div className="flex gap-4">
        {socials.map(({ Icon, label }) => (
          <button
            key={label}
            type="button"
            aria-label={label}
            className="flex size-10 cursor-pointer items-center justify-center rounded-[8px] bg-white/10 transition-colors hover:bg-white/20"
          >
            <Icon className="size-[18px] text-white" />
          </button>
        ))}
      </div>
    </div>
  );
}

function GrowCta() {
  return (
    <div className="relative overflow-hidden rounded-[24px] bg-[var(--color-brand)] p-8">
      <div className="pointer-events-none absolute -bottom-10 -right-10 size-32 rounded-full bg-white/10 blur-[20px]" />
      <div className="relative flex flex-col gap-4">
        <h4 className="text-[20px] font-bold leading-7 text-white">
          Want to Grow Your Reviews?
        </h4>
        <p className="text-[14px] leading-5 text-white/80">
          Learn how Restuhub helps 500+ businesses automate their Google reviews.
        </p>
        <Link
          href="/#contact"
          className="flex items-center justify-center rounded-[12px] bg-white py-3 text-[16px] font-bold text-[var(--color-brand)] transition-colors hover:bg-white/90"
        >
          Free Consultation
        </Link>
      </div>
    </div>
  );
}

/* ------------------------------ Main view ------------------------------ */

export default function BlogArticle({
  post,
  blocks,
  lastUpdate,
}: {
  post: Post;
  blocks: EditorBlock[];
  lastUpdate: string;
}) {
  const tocItems = useMemo(() => tocFromBlocks(blocks), [blocks]);
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    setActiveId(tocItems[0]?.id ?? "");
  }, [tocItems]);

  useEffect(() => {
    const headings = tocItems
      .map((t) => document.getElementById(t.id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-112px 0px -65% 0px", threshold: 0 }
    );

    headings.forEach((h) => observer.observe(h));
    return () => observer.disconnect();
  }, [tocItems]);

  const handleNavigate = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 100;
    window.scrollTo({ top, behavior: "smooth" });
    setActiveId(id);
  };

  return (
    <section className="mx-auto w-full max-w-[1320px] px-5 py-12 sm:px-6 lg:px-8 lg:py-[150px] 2xl:px-0">
      <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-16">
        {/* Sidebar — desktop */}
        <aside className="hidden shrink-0 lg:block lg:w-[306px]">
          <div className="sticky top-6 flex flex-col gap-8">
            <div className="flex flex-col gap-6">
              {tocItems.length > 0 && (
                <TableOfContents
                  items={tocItems}
                  activeId={activeId}
                  onNavigate={handleNavigate}
                />
              )}
              <ShareCard />
            </div>
            <GrowCta />
          </div>
        </aside>

        {/* Article */}
        <article className="min-w-0 flex-1 lg:max-w-[896px]">
          {/* Header */}
          <header className="flex flex-col">
            <h1
              className="border-b border-[#f3f4f6] pb-4 text-[26px] font-bold leading-[34px] text-[#181818] sm:text-[28px] sm:leading-[38px] lg:text-[30px] lg:leading-[37.5px]"
              data-split
            >
              {post.title}
            </h1>
            <p className="pt-4 text-[14px] leading-5 text-[#6a7282]">
              Last Update: {lastUpdate}
            </p>
          </header>

          {/* Banner image */}
          <div
            className="mt-6 overflow-hidden rounded-[24px] shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)]"
            data-reveal="scale"
          >
            <div className="relative aspect-[895/470] w-full">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={post.image}
                alt={post.title}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          </div>

          {/* TOC — mobile (below banner, matches reference) */}
          {tocItems.length > 0 && (
            <div className="mt-8 lg:hidden">
              <TableOfContents
                items={tocItems}
                activeId={activeId}
                onNavigate={handleNavigate}
                defaultOpen={false}
              />
            </div>
          )}

          {/* Body */}
          <div className="mt-8 lg:mt-10">
            <ArticleBlocks blocks={blocks} />
          </div>

          {/* Share + CTA — mobile */}
          <div className="mt-12 flex flex-col gap-6 lg:hidden">
            <ShareCard />
            <GrowCta />
          </div>
        </article>
      </div>
    </section>
  );
}
