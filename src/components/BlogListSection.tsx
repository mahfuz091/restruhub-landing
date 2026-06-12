import Link from "next/link";
import { AVATAR, type Post } from "@/lib/blog";

function CalendarIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </svg>
  );
}

function ChevronRight({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

function Avatar({ name, size }: { name: string; size: number }) {
  return (
    <span
      className="block shrink-0 overflow-hidden rounded-full border border-[#f3f4f6] p-px"
      style={{ width: size, height: size }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={AVATAR}
        alt={name}
        className="h-full w-full rounded-full object-cover"
      />
    </span>
  );
}

export default function BlogListSection({
  posts,
  topics = ["All Blogs"],
}: {
  posts: Post[];
  topics?: string[];
}) {
  return (
    <section className="mx-auto w-full max-w-[1320px] px-5 py-12 sm:px-6 lg:px-8 lg:py-[150px] 2xl:px-0">
      <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-12">
        {/* Main column */}
        <div className="flex min-w-0 flex-1 flex-col gap-8">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex flex-col items-stretch gap-5 rounded-[12px] border border-black/5 bg-white p-5 transition-shadow hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:p-[25px]"
            >
              <div className="flex min-w-0 flex-1 flex-col">
                {/* author */}
                <div className="flex items-center gap-1.5 pb-3">
                  <Avatar name={post.author} size={20} />
                  <span className="text-[12px] leading-4 text-[#5a6370]">
                    {post.author}
                  </span>
                </div>

                {/* title */}
                <h3 className="pb-3 text-[20px] font-semibold leading-[28px] text-[#181818] sm:text-[24px] sm:leading-[32px]">
                  {post.title}
                </h3>

                {/* excerpt */}
                <p className="pb-6 text-[15px] leading-[26px] text-[#5a6370] sm:text-[15.8px]">
                  {post.excerpt}
                </p>

                {/* meta */}
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                  <span className="flex items-center gap-1.5 text-[12px] leading-4 text-[#5a6370]">
                    <CalendarIcon className="size-3.5 text-[#9aa0a6]" />
                    {post.date}
                  </span>
                  <span className="inline-flex rounded-full bg-[var(--color-brand)] px-3 py-1 text-[10px] font-semibold uppercase leading-[15px] tracking-[0.5px] text-white">
                    {post.category}
                  </span>
                </div>
              </div>

              {/* thumbnail */}
              <div className="aspect-[283/180] w-full shrink-0 overflow-hidden rounded-[12px] sm:w-[260px] lg:w-[283px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={post.image}
                  alt={post.title}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            </Link>
          ))}

          {/* Pagination */}
          <nav className="mt-2 border-t border-[#f3f4f6] pt-8" aria-label="Pagination">
            <div className="flex flex-wrap items-center justify-center gap-4 lg:justify-between">
              <button className="flex cursor-pointer items-center gap-2 rounded-full bg-[#f6f8f4] px-6 py-3 text-[16px] font-medium text-[#7c8380] transition-colors hover:bg-[var(--color-brand-deep)] hover:text-white sm:px-8 sm:py-5 sm:text-[18px]">
                <ChevronRight className="size-5 rotate-180" />
                Previous
              </button>

              <div className="flex items-center gap-2 sm:gap-5">
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <button
                    key={n}
                    aria-current={n === 1 ? "page" : undefined}
                    className={`flex size-12 cursor-pointer items-center justify-center rounded-full text-[16px] font-medium transition-colors sm:size-16 sm:text-[18px] ${
                      n === 1
                        ? "bg-[var(--color-brand-deep)] text-white"
                        : "bg-[#f6f8f4] text-[#001f0f] hover:bg-[var(--color-brand-deep)] hover:text-white"
                    }`}
                  >
                    {n}
                  </button>
                ))}
              </div>

              <button className="flex cursor-pointer items-center gap-2 rounded-full bg-[#f6f8f4] px-6 py-3 text-[16px] font-medium text-[#7c8380] transition-colors hover:bg-[var(--color-brand-deep)] hover:text-white sm:px-8 sm:py-5 sm:text-[18px]">
                Next
                <ChevronRight className="size-5" />
              </button>
            </div>
          </nav>
        </div>

        {/* Sidebar */}
        <aside className="flex w-full shrink-0 flex-col gap-8 lg:sticky lg:top-6 lg:w-[381px]">
          {/* Recent Blogs */}
          <div className="flex flex-col gap-6 rounded-[16px] border border-[#f3f4f6] bg-white p-[25px]">
            <h3 className="flex items-center gap-2 text-[20px] font-semibold leading-7 text-[#181818]">
              <span className="h-6 w-1.5 rounded-full bg-[var(--color-brand)]" />
              Recent Blogs
            </h3>

            <div className="flex flex-col gap-6">
              {posts.slice(0, 4).map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="flex flex-col gap-2"
                >
                  <div className="flex items-center gap-3">
                    <Avatar name={post.author} size={24} />
                    <span className="text-[12px] leading-4 text-[#6a7282]">
                      {post.author}
                    </span>
                  </div>
                  <h4 className="text-[16px] font-semibold leading-[22px] text-[#181818] hover:text-[var(--color-brand)]">
                    {post.title}
                  </h4>
                  <span className="flex items-center gap-2 text-[12px] leading-4 text-[#99a1af]">
                    <CalendarIcon className="size-3 text-[#99a1af]" />
                    {post.date}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Recommended Topics */}
          <div className="flex flex-col gap-4 rounded-[16px] border border-[#f3f4f6] bg-[rgba(24,24,24,0.05)] p-[25px]">
            <h3 className="text-[18px] font-semibold leading-7 text-[#181818]">
              Recommended Topics
            </h3>
            <div className="flex flex-wrap gap-2.5">
              {topics.map((topic, i) => (
                <button
                  key={topic}
                  className={`cursor-pointer rounded-[8px] border px-[13px] py-[7px] text-[14px] font-medium leading-5 transition-colors ${
                    i === 0
                      ? "border-[var(--color-brand)] bg-[var(--color-brand)] text-white shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]"
                      : "border-[#e5e7eb] bg-white text-[#4a5565] hover:border-[var(--color-brand)] hover:text-[var(--color-brand)]"
                  }`}
                >
                  {topic}
                </button>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
