import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPostBySlug, getAllPosts, getPostsByCategory } from "@/lib/mdx";
import BlogPostClient from "./BlogPostClient";
import PostContent from "@/components/blog/PostContent";
import JsonLd from "@/components/JsonLd";
import { SITE_CONFIG } from "@/lib/constants";

const SOCIOPATH_FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Do sociopaths feel anything?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, but not the full range of human emotions. Sociopaths typically feel anger, boredom, satisfaction, excitement, contempt, and possessiveness. They generally do not feel guilt, remorse, emotional empathy, or love in the traditional sense.",
      },
    },
    {
      "@type": "Question",
      name: "Can sociopaths love?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sociopaths experience attachment to certain people — individuals they want to keep in their life, whose company they prefer, whose wellbeing matters to them. Whether this constitutes love depends on your definition. It may be a form of possession, convenience, and habit rather than the warm, selfless feeling others describe.",
      },
    },
    {
      "@type": "Question",
      name: "How is a sociopath diagnosed?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The formal diagnosis is Antisocial Personality Disorder (ASPD). It requires a documented pattern of behavior from age 15+, evidence of conduct disorder before age 15, multiple assessments ruling out other conditions, and consistent presentation across different evaluators. It is not a diagnosis given lightly.",
      },
    },
    {
      "@type": "Question",
      name: "Are sociopaths dangerous?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "It depends on context. Most sociopaths never commit violent crimes. They may be skilled manipulators and strategic thinkers, but 'dangerous' is contextual. In dating, they may not provide the emotional depth some partners need. Professionally, they can be formidable competitors.",
      },
    },
    {
      "@type": "Question",
      name: "Can sociopathy be cured?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. ASPD is not an illness in the traditional sense — it's a different neurological operating system. Behavior can be modified through incentive structures, social strategies can be learned, and impulse control can be developed, but the underlying neurological differences remain.",
      },
    },
    {
      "@type": "Question",
      name: "What should I do if I'm dating a sociopath?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Decide what you actually need from a relationship. If you need deep emotional intimacy, traditional romantic love, or a partner who prioritizes your feelings, it likely won't work. If you want consistency, direct communication, and a partner who isn't emotionally needy, it might work. Know what you're getting and manage expectations.",
      },
    },
  ],
};


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
  const post = getPostBySlug(slug);

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
  const post = getPostBySlug(slug);

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

  const hasFaqSchema = slug === "sociopath-questions-answered";

  return (
    <>
      {hasFaqSchema && <JsonLd data={SOCIOPATH_FAQ_SCHEMA} />}
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
        <PostContent source={post.content} />
      </BlogPostClient>
    </>
  );
}
