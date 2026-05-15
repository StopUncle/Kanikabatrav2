import { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getPublicPostBySlug,
  getAllPosts,
  getPostsByCategory,
} from "@/lib/mdx";
import type { FaqEntry } from "@/lib/mdx";
import BlogPostClient from "./BlogPostClient";
import PostContent from "@/components/blog/PostContent";
import JsonLd from "@/components/JsonLd";
import { SITE_CONFIG } from "@/lib/constants";

function buildFaqSchema(faq: FaqEntry[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((entry) => ({
      "@type": "Question",
      name: entry.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: entry.a,
      },
    })),
  };
}


interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPublicPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found | Kanika Batra",
    };
  }

  const baseUrl = SITE_CONFIG.url;

  return {
    title: `${post.frontmatter.title} | Kanika Batra`,
    description: post.frontmatter.excerpt,
    keywords: post.frontmatter.tags.join(", "),
    authors: [{ name: post.frontmatter.author || "Kanika Batra" }],
    alternates: {
      canonical: `${baseUrl}/blog/${slug}`,
    },
    openGraph: {
      title: post.frontmatter.title,
      description: post.frontmatter.excerpt,
      type: "article",
      url: `${baseUrl}/blog/${slug}`,
      publishedTime: post.frontmatter.publishedAt,
      modifiedTime: post.frontmatter.updatedAt || post.frontmatter.publishedAt,
      authors: [post.frontmatter.author || "Kanika Batra"],
      images: post.frontmatter.coverImage
        ? [
            {
              url: post.frontmatter.coverImage.startsWith("http")
                ? post.frontmatter.coverImage
                : `${baseUrl}${post.frontmatter.coverImage}`,
              width: 1200,
              height: 630,
              alt: post.frontmatter.title,
            },
          ]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title: post.frontmatter.title,
      description: post.frontmatter.excerpt,
      images: post.frontmatter.coverImage ? [post.frontmatter.coverImage] : [],
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPublicPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const allPosts = getAllPosts();
  const currentIndex = allPosts.findIndex((p) => p.slug === slug);

  const previousPost =
    currentIndex < allPosts.length - 1
      ? {
          slug: allPosts[currentIndex + 1].slug,
          title: allPosts[currentIndex + 1].frontmatter.title,
        }
      : null;

  const nextPost =
    currentIndex > 0
      ? {
          slug: allPosts[currentIndex - 1].slug,
          title: allPosts[currentIndex - 1].frontmatter.title,
        }
      : null;

  const relatedPosts = getPostsByCategory(post.frontmatter.category)
    .filter((p) => p.slug !== slug)
    .slice(0, 3)
    .map((p) => ({
      slug: p.slug,
      title: p.frontmatter.title,
      excerpt: p.frontmatter.excerpt,
      coverImage: p.frontmatter.coverImage,
      category: p.frontmatter.category,
      publishedAt: p.frontmatter.publishedAt,
    }));

  const faqSchema =
    post.frontmatter.faq && post.frontmatter.faq.length > 0
      ? buildFaqSchema(post.frontmatter.faq)
      : null;

  return (
    <>
      {faqSchema && <JsonLd data={faqSchema} />}
      <BlogPostClient
        post={{
          slug: post.slug,
          frontmatter: post.frontmatter,
          readingTime: post.readingTime,
        }}
        rawContent={post.content}
        relatedPosts={relatedPosts}
        previousPost={previousPost}
        nextPost={nextPost}
      >
        <PostContent source={post.content} slug={post.slug} />
      </BlogPostClient>
    </>
  );
}
