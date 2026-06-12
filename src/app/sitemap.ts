export const dynamic = "force-dynamic";

import { MetadataRoute } from "next";
import { postList } from "./actions/blog/blog.actions";


export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://restruhub.com";
  const blogsResponse = await postList();
    const post = blogsResponse?.post?.postsWithContentObj || [];
    const blogUrls = Array.isArray(post)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ? post.map((blog: any) => ({
          url: `${baseUrl}/blog/${blog.postSlug}`,
          lastModified: new Date(blog.updatedAt || blog.createdAt),
        }))
      : [];

  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/`, changeFrequency: "daily", priority: 1 },
    { url: `${baseUrl}/pricing`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/en/pricing`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${baseUrl}/alternatives`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/restruhub-vs-podium`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/reply-generator`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/reply-templates`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/contact`, changeFrequency: "yearly", priority: 0.5 },
    { url: `${baseUrl}/blog`, changeFrequency: "daily", priority: 0.8 },
    { url: `${baseUrl}/privacy-policy`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/terms-conditions`, changeFrequency: "yearly", priority: 0.3 },
  ].map((page) => ({ ...page, lastModified: now }) as MetadataRoute.Sitemap[number]);

  return [...staticPages, ...blogUrls];
}
