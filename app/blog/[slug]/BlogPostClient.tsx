"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Header from "@/components/Header";
import AuthorBio from "@/components/AuthorBio";
import Disclaimer from "@/components/Disclaimer";
import RelatedPosts, {
  Breadcrumbs,
  PostNavigation,
} from "@/components/RelatedPosts";
import BookPromo from "@/components/blog/BookPromo";
import InlineCoachingCTA from "@/components/blog/InlineCoachingCTA";
import TableOfContents from "@/components/blog/TableOfContents";
import SocialShareButtons from "@/components/blog/SocialShareButtons";
import NewsletterForm from "@/components/NewsletterForm";
import type { PostMeta } from "@/lib/mdx";
import { SITE_CONFIG } from "@/lib/constants";

interface RelatedPost {
  slug: string;
  title: string;
  excerpt: string;
  coverImage?: string;
  category?: string;
  publishedAt: string;
}

interface BlogPostClientProps {
  post: PostMeta;
  rawContent: string;
  children: React.ReactNode;
  relatedPosts?: RelatedPost[];
  previousPost?: { slug: string; title: string } | null;
  nextPost?: { slug: string; title: string } | null;
}

export default function BlogPostClient({
  post,
  rawContent,
  children,
  relatedPosts,
  previousPost,
  nextPost,
}: BlogPostClientProps) {
  const postUrl = `${SITE_CONFIG.url}/blog/${post.slug}`;
  const wordCount = rawContent.split(/\s+/).length;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.frontmatter.title,
    description: post.frontmatter.excerpt,
    image: post.frontmatter.coverImage,
    datePublished: post.frontmatter.publishedAt,
    dateModified: post.frontmatter.updatedAt || post.frontmatter.publishedAt,
    wordCount,
    articleSection: post.frontmatter.category,
    keywords: post.frontmatter.tags?.join(", "),
    thumbnailUrl: post.frontmatter.coverImage,
    author: {
      "@type": "Person",
      name: post.frontmatter.author || SITE_CONFIG.name,
      url: `${SITE_CONFIG.url}/about`,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.url,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": postUrl,
    },
  };

  return (
    <div className="min-h-screen bg-deep-black">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <Header />

      <article className="pt-24 pb-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Breadcrumbs
              items={[
                { label: "Home", href: "/" },
                { label: "Blog", href: "/blog" },
                {
                  label: post.frontmatter.category,
                  href: `/blog/category/${post.frontmatter.category.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}`,
                },
                { label: post.frontmatter.title },
              ]}
              className="mb-4"
            />

            <header className="mb-8">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="px-3 py-1 text-xs font-medium uppercase tracking-wider text-accent-gold bg-accent-gold/10 rounded-full border border-accent-gold/20">
                  {post.frontmatter.category}
                </span>
                <span className="text-sm text-text-gray">
                  {post.readingTime}
                </span>
              </div>

              <h1 className="text-2xl md:text-3xl lg:text-4xl font-extralight text-white mb-4 leading-tight tracking-tight">
                {post.frontmatter.title}
              </h1>

              <p className="text-base md:text-lg text-text-gray leading-relaxed mb-6">
                {post.frontmatter.excerpt}
              </p>

              <div className="flex items-center justify-between pb-6 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-accent-gold to-accent-burgundy flex items-center justify-center">
                    <span className="text-white text-sm font-medium">KB</span>
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium">
                      {post.frontmatter.author || "Kanika Batra"}
                    </p>
                    <time className="text-text-gray text-xs">
                      {new Date(
                        post.frontmatter.publishedAt,
                      ).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </time>
                  </div>
                </div>
                <SocialShareButtons
                  title={post.frontmatter.title}
                  url={postUrl}
                />
              </div>
            </header>

            <div className="lg:grid lg:grid-cols-[200px_1fr] lg:gap-12 max-w-none">
              <TableOfContents content={rawContent} />

              <div className="max-w-3xl">
                {children}

                <footer className="mt-20 pt-12 border-t border-white/10">
                  <div className="flex flex-wrap gap-3 mb-12">
                    {post.frontmatter.tags.map((tag) => (
                      <Link
                        key={tag}
                        href={`/blog/tag/${tag.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}`}
                        className="px-4 py-2 text-sm text-text-gray bg-white/5 rounded-full border border-white/10 hover:border-accent-gold/50 hover:text-accent-gold transition-all duration-300"
                      >
                        #{tag}
                      </Link>
                    ))}
                  </div>

                  <div className="space-y-16">
                    <AuthorBio variant="full" />

                    <div className="py-12 px-8 rounded-2xl bg-gradient-to-br from-deep-navy/50 to-accent-burgundy/20 border border-white/10 text-center">
                      <p className="text-accent-gold uppercase tracking-[0.2em] text-xs mb-3">
                        Weekly Insights
                      </p>
                      <h3 className="text-xl font-extralight text-white mb-2">
                        Get more like this
                      </h3>
                      <p className="text-text-gray text-sm mb-6 max-w-md mx-auto">
                        Psychology insights delivered weekly. No spam.
                        Unsubscribe anytime.
                      </p>
                      <NewsletterForm />
                    </div>

                    <Disclaimer variant="compact" />

                    {["Dark Psychology", "Psychology Education"].includes(
                      post.frontmatter.category,
                    ) ? (
                      <InlineCoachingCTA />
                    ) : (
                      <BookPromo variant="full" />
                    )}

                    <PostNavigation
                      previousPost={previousPost}
                      nextPost={nextPost}
                    />

                    {relatedPosts && relatedPosts.length > 0 && (
                      <RelatedPosts
                        posts={relatedPosts}
                        title="Continue Reading"
                      />
                    )}
                  </div>
                </footer>
              </div>
            </div>
          </motion.div>
        </div>
      </article>

      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-accent-burgundy/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/3 -right-32 w-96 h-96 bg-accent-gold/5 rounded-full blur-[120px]" />
      </div>
    </div>
  );
}
