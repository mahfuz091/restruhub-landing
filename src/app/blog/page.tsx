/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import PageBanner from "@/components/PageBanner";
import BlogListSection from "@/components/BlogListSection";
import Footer from "@/components/Footer";
import { postList } from "@/app/actions/blog/blog.actions";
import { blogCategoryList } from "@/app/actions/blog/blogCategory";
import { mapDbPost } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog: Google Business Profile & Review Management Guide",
  description:
    "Explore RestruHub's blog for expert tips on Google Business Profile optimization, review management, and customer engagement strategies.",
};

export const revalidate = 30;

export default async function BlogPage() {
  const [blogsResponse, categoriesResponse] = await Promise.all([
    postList(),
    blogCategoryList(),
  ]);

  const dbPosts =
    blogsResponse.success && blogsResponse.post?.postsWithContentObj
      ? blogsResponse.post.postsWithContentObj
      : [];
  const posts = dbPosts.map(mapDbPost);

  const categories =
    categoriesResponse.success && Array.isArray((categoriesResponse as any).blogCategory)
      ? (categoriesResponse as any).blogCategory.map((c: any) => c.name)
      : [];
  const topics = ["All Blogs", ...categories];

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />
      <main className="flex-1">
        <PageBanner breadcrumb="Blog & Resources" title="Our Blog & Resources" />
        <BlogListSection posts={posts} topics={topics} />
      </main>
      <Footer />
    </div>
  );
}
