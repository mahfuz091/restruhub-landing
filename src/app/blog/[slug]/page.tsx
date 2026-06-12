/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BlogArticle from "@/components/BlogArticle";
import RelatedBlogs from "@/components/RelatedBlogs";
import { getPostBySlug, postList } from "@/app/actions/blog/blog.actions";
import { mapDbPost, daysAgo, type EditorBlock } from "@/lib/blog";

export const revalidate = 60;

export async function generateStaticParams() {
  const res = await postList();
  const posts = res.success && res.post?.postsWithContentObj
    ? res.post.postsWithContentObj
    : [];
  return posts.map((p) => ({ slug: p.postSlug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const result = await getPostBySlug(slug);
  if (!result.success || !result.post) {
    return { title: "Blog not found — RestruHub" };
  }
  const post = result.post;
  return {
    title: `${post.metaTitle || post.title} — RestruHub`,
    description: post.metaDescription || post.shortDesc || "",
    openGraph: {
      title: post.metaTitle || post.title,
      description: post.metaDescription || post.shortDesc || "",
      images: post.bannerImage
        ? [{ url: post.bannerImage, alt: post.bannerAltText || post.title }]
        : [],
      type: "article",
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const [result, allRes] = await Promise.all([getPostBySlug(slug), postList()]);

  if (!result.success || !result.post) notFound();

  const dbPost = result.post;
  const post = mapDbPost(dbPost);
  const blocks: EditorBlock[] = Array.isArray(dbPost.content?.blocks)
    ? dbPost.content.blocks
    : [];

  const allPosts =
    allRes.success && allRes.post?.postsWithContentObj
      ? allRes.post.postsWithContentObj.map(mapDbPost)
      : [];

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />
      <main className="flex-1">
        <BlogArticle
          post={post}
          blocks={blocks}
          lastUpdate={daysAgo(dbPost.updatedAt)}
        />
        <RelatedBlogs posts={allPosts} currentSlug={post.slug} />
      </main>
      <Footer />
    </div>
  );
}
