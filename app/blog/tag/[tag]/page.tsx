import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getAllTags,
  getPostsByTag,
  getTagBySlug,
  slugify,
} from "@/lib/mdx";
import PostCard from "@/components/blog/PostCard";
import JsonLd from "@/components/JsonLd";
import Header from "@/components/Header";
import { SITE_CONFIG } from "@/lib/constants";

interface PageProps {
  params: Promise<{ tag: string }>;
}

export async function generateStaticParams() {
  const tags = getAllTags();
  return tags.map((tag) => ({ tag: slugify(tag) }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { tag: slug } = await params;
  const tagName = getTagBySlug(slug);

  if (!tagName) {
    return { title: "Tag Not Found | Kanika Batra" };
  }

  return {
    title: `Articles tagged "${tagName}" | Kanika Batra`,
    description: `Read Kanika Batra's articles about ${tagName}. Dark psychology insights and strategic thinking.`,
    alternates: {
      canonical: `${SITE_CONFIG.url}/blog/tag/${slug}`,
    },
    openGraph: {
      title: `${tagName} | Kanika Batra Blog`,
      description: `Articles about ${tagName} by Kanika Batra.`,
      type: "website",
    },
  };
}

export default async function TagPage({ params }: PageProps) {
  const { tag: slug } = await params;
  const tagName = getTagBySlug(slug);

  if (!tagName) {
    notFound();
  }

  const posts = getPostsByTag(tagName);

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `Articles tagged "${tagName}"`,
    description: `Articles about ${tagName} by Kanika Batra.`,
    url: `${SITE_CONFIG.url}/blog/tag/${slug}`,
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: posts.length,
      itemListElement: posts.map((post, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `${SITE_CONFIG.url}/blog/${post.slug}`,
        name: post.frontmatter.title,
      })),
    },
  };

  return (
    <>
      <JsonLd data={collectionSchema} />
      <div className="min-h-screen bg-deep-black">
        <Header />

        <main className="pt-32 pb-24">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <nav className="mb-8 text-sm text-text-gray/60">
              <Link
                href="/"
                className="hover:text-accent-gold transition-colors"
              >
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
              <span className="text-text-gray">{tagName}</span>
            </nav>

            <div className="mb-16">
              <h1 className="text-4xl md:text-5xl font-extralight text-white mb-4">
                {tagName}
              </h1>
              <p className="text-text-gray text-lg">
                {posts.length} article{posts.length !== 1 ? "s" : ""}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
              {posts.map((post, index) => (
                <PostCard key={post.slug} post={post} index={index} />
              ))}
            </div>

            <div className="mt-16 text-center">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 px-8 py-3 text-sm font-medium uppercase tracking-wider text-accent-gold border border-accent-gold/30 rounded-full hover:bg-accent-gold/10 transition-all"
              >
                View All Articles
              </Link>
            </div>
          </div>
        </main>

        <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
          <div className="absolute top-1/4 -left-32 w-96 h-96 bg-accent-burgundy/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-accent-gold/5 rounded-full blur-[120px]" />
        </div>
      </div>
    </>
  );
}
