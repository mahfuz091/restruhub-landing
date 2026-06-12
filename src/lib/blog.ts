/* eslint-disable @typescript-eslint/no-explicit-any */
import type { PostWithRelations } from "@/app/actions/blog/blog.actions";

/* ------------------------------ UI card type ------------------------------ */

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  category: string;
  author: string;
};

export const AUTHOR = "Restuhub Team";
export const AVATAR = "/images/blog/avatar.png";
export const CATEGORY = "Restaurant Review Management";

/* ----------------------------- DB → UI mapping ---------------------------- */

export function formatDate(date: Date | string): string {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function daysAgo(date: Date | string): string {
  const diffMs = Date.now() - new Date(date).getTime();
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  if (days <= 0) return "Today";
  if (days === 1) return "1 day ago";
  if (days < 7) return `${days} days ago`;
  const weeks = Math.floor(days / 7);
  return `${weeks} week${weeks > 1 ? "s" : ""} ago`;
}

export function mapDbPost(p: PostWithRelations): Post {
  return {
    slug: p.postSlug,
    title: p.title,
    excerpt: p.shortDesc || p.metaDescription || "",
    image: p.bannerImage,
    date: formatDate(p.createdAt),
    category: p.BlogCategory?.name || CATEGORY,
    author: p.author?.name || AUTHOR,
  };
}

/* --------------------------- EditorJS content ----------------------------- */

export type EditorBlock = {
  id?: string;
  type: string;
  data: any;
};

export type EditorContent = { blocks?: EditorBlock[] };

export type TocItem = { id: string; text: string };

export function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

/** Build TOC from level-2 EditorJS header blocks (anchors use block id). */
export function tocFromBlocks(blocks: EditorBlock[]): TocItem[] {
  return blocks
    .filter((b) => b.type === "header" && b.data?.level === 2)
    .map((b, i) => ({
      id: b.id || slugifyHeading(b.data?.text ?? `section-${i}`),
      text: String(b.data?.text ?? ""),
    }));
}
