import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPillarBySlug, getAllPillars } from "@/lib/pillars";
import { getPostsByCategory } from "@/lib/mdx";
import PostContent from "@/components/blog/PostContent";
import JsonLd from "@/components/JsonLd";
import Header from "@/components/Header";
import Link from "next/link";
import { SITE_CONFIG } from "@/lib/constants";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const pillars = getAllPillars();
  return pillars.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const pillar = getPillarBySlug(slug);

  if (!pillar) {
    return { title: "Guide Not Found | Kanika Batra" };
  }

  const baseUrl = SITE_CONFIG.url;

  return {
    title: `${pillar.frontmatter.title} | Kanika Batra`,
    description: pillar.frontmatter.excerpt,
    keywords: pillar.frontmatter.tags.join(", "),
    authors: [{ name: "Kanika Batra" }],
    alternates: {
      canonical: `${baseUrl}/guide/${slug}`,
    },
    openGraph: {
      title: pillar.frontmatter.title,
      description: pillar.frontmatter.excerpt,
      type: "article",
      url: `${baseUrl}/guide/${slug}`,
      publishedTime: pillar.frontmatter.publishedAt,
      modifiedTime:
        pillar.frontmatter.updatedAt || pillar.frontmatter.publishedAt,
      images: pillar.frontmatter.coverImage
        ? [
            {
              url: pillar.frontmatter.coverImage.startsWith("http")
                ? pillar.frontmatter.coverImage
                : `${baseUrl}${pillar.frontmatter.coverImage}`,
              width: 1200,
              height: 630,
              alt: pillar.frontmatter.title,
            },
          ]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title: pillar.frontmatter.title,
      description: pillar.frontmatter.excerpt,
    },
  };
}

export default async function GuidePage({ params }: PageProps) {
  const { slug } = await params;
  const pillar = getPillarBySlug(slug);

  if (!pillar) {
    notFound();
  }

  const relatedPosts = getPostsByCategory(pillar.frontmatter.category)
    .filter((p) => !p.frontmatter.isPillar)
    .slice(0, 6);

  const baseUrl = SITE_CONFIG.url;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: pillar.frontmatter.title,
    description: pillar.frontmatter.excerpt,
    datePublished: pillar.frontmatter.publishedAt,
    dateModified:
      pillar.frontmatter.updatedAt || pillar.frontmatter.publishedAt,
    author: {
      "@type": "Person",
      name: "Kanika Batra",
      url: baseUrl,
    },
    publisher: {
      "@type": "Organization",
      name: "Kanika Batra",
      url: baseUrl,
    },
    mainEntityOfPage: `${baseUrl}/guide/${slug}`,
    wordCount: pillar.content.split(/\s+/).length,
    articleSection: pillar.frontmatter.category,
  };

  return (
    <>
      <JsonLd data={articleSchema} />
      <div className="min-h-screen bg-deep-black">
        <Header />

        <article className="pt-24 pb-24">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            {/* Breadcrumbs */}
            <nav className="mb-6 text-sm text-text-gray/60">
              <Link href="/" className="hover:text-accent-gold transition-colors">
                Home
              </Link>
              <span className="mx-2">/</span>
              <Link
                href="/blog"
                className="hover:text-accent-gold transition-colors"
              >
                Blog
              </Link>
              <span className="mx-2">/</span>
              <span className="text-text-gray">Guide</span>
            </nav>

            {/* Header */}
            <header className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 text-xs font-medium uppercase tracking-wider text-deep-black bg-accent-gold rounded-full">
                  Complete Guide
                </span>
                <span className="text-sm text-text-gray">
                  {pillar.readingTime}
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extralight text-white mb-6 leading-tight">
                {pillar.frontmatter.title}
              </h1>

              <p className="text-lg text-text-gray leading-relaxed mb-6">
                {pillar.frontmatter.excerpt}
              </p>

              <div className="flex items-center gap-3 pb-6 border-b border-white/10">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-accent-gold to-accent-burgundy flex items-center justify-center">
                  <span className="text-white text-sm font-medium">KB</span>
                </div>
                <div>
                  <p className="text-white text-sm font-medium">Kanika Batra</p>
                  <time className="text-text-gray text-xs">
                    {new Date(
                      pillar.frontmatter.publishedAt,
                    ).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                </div>
              </div>
            </header>

            {/* Content */}
            <div className="mb-16">
              <PostContent source={pillar.content} />
            </div>

            {/* Related Articles */}
            {relatedPosts.length > 0 && (
              <section className="pt-12 border-t border-white/10">
                <h2 className="text-2xl font-light text-white mb-8">
                  Related Articles
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {relatedPosts.map((post) => (
                    <Link
                      key={post.slug}
                      href={`/blog/${post.slug}`}
                      className="block p-5 rounded-xl border border-white/[0.06] hover:border-accent-gold/20 transition-colors"
                    >
                      <span className="text-xs text-accent-gold/60 uppercase tracking-wider">
                        {post.frontmatter.category}
                      </span>
                      <h3 className="text-white font-light mt-2 mb-2 leading-snug">
                        {post.frontmatter.title}
                      </h3>
                      <p className="text-text-gray/60 text-sm line-clamp-2">
                        {post.frontmatter.excerpt}
                      </p>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </div>
        </article>

        <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
          <div className="absolute top-1/4 -left-32 w-96 h-96 bg-accent-burgundy/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/3 -right-32 w-96 h-96 bg-accent-gold/5 rounded-full blur-[120px]" />
        </div>
      </div>
    </>
  );
}
