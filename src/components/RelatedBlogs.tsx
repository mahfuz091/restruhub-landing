import Link from "next/link";
import { type Post } from "@/lib/blog";

function ArrowUpRight({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M4.5 11.5 11.5 4.5M5.5 4.5h6v6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function RelatedCard({ post }: { post: Post }) {
  const href = `/blog/${post.slug}`;
  return (
    <div className="flex flex-col rounded-[24px] border border-[#f3f4f6] bg-white p-[25px]">
      {/* image + category badge */}
      <Link
        href={href}
        className="relative block aspect-[358/223.75] w-full overflow-hidden rounded-[12px]"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={post.image}
          alt={post.title}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <span className="absolute left-4 top-[17px] inline-flex rounded-full bg-white/90 px-4 py-1 text-[12px] font-bold uppercase leading-4 tracking-[0.6px] text-[#181818] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] backdrop-blur-[6px]">
          {post.category}
        </span>
      </Link>

      {/* body */}
      <div className="flex flex-col pt-4">
        <Link href={href} className="pb-4">
          <h3 className="line-clamp-2 min-h-[50px] text-[20px] font-bold leading-[25px] text-[#181818]">
            {post.title}
          </h3>
        </Link>
        <div className="border-t border-[#f9fafb] pt-5">
          <Link
            href={href}
            className="inline-flex items-center gap-2 text-[14px] font-bold leading-5 text-[var(--color-brand)] transition-colors hover:text-[var(--color-brand-deep)]"
          >
            View Details
            <ArrowUpRight className="size-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function RelatedBlogs({
  posts,
  currentSlug,
}: {
  posts: Post[];
  currentSlug: string;
}) {
  const related = posts.filter((p) => p.slug !== currentSlug).slice(0, 3);
  if (related.length === 0) return null;

  return (
    <section className="mx-auto w-full max-w-[1320px] px-5 sm:px-6 lg:px-8 2xl:px-0">
      <div className="border-t border-[#f3f4f6] pb-12 pt-[60px] sm:pt-[81px] lg:pb-[100px]">
        <div className="flex flex-col gap-8 sm:gap-10">
          {/* header */}
          <div className="flex items-center justify-between gap-4">
            <h2
              className="text-[24px] font-bold leading-[32px] text-[#181818] sm:text-[30px] sm:leading-[36px]"
              data-split
            >
              Related Blogs
            </h2>
            <Link
              href="/blog"
              className="shrink-0 text-[15px] font-bold leading-6 text-[var(--color-brand)] transition-colors hover:text-[var(--color-brand-deep)] sm:text-[16px]"
            >
              View All
            </Link>
          </div>

          {/* grid */}
          <div
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8"
            data-reveal-stagger
          >
            {related.map((p) => (
              <RelatedCard key={p.slug} post={p} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
