import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { requireServerAuth } from "@/lib/auth/server-auth";
import { getPostBySlug } from "@/lib/mdx";
import PostContent from "@/components/blog/PostContent";
import { ArrowLeft, Clock, Calendar } from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) {
    return { title: "Preview. The Consilium" };
  }
  return {
    title: `${post.frontmatter.title}. Preview | The Consilium`,
    description: post.frontmatter.excerpt,
    // Don't let the public blog and the preview both become canonical.
    // Previews are behind auth, so we tell crawlers not to index them.
    robots: { index: false, follow: false },
  };
}

export default async function PreviewDetailPage({ params }: PageProps) {
  const { slug } = await params;
  await requireServerAuth(`/consilium/previews/${slug}`);

  const post = getPostBySlug(slug);
  if (!post) notFound();

  const publishDate = new Date(post.frontmatter.publishedAt);
  const now = new Date();

  // If the post has already gone public, send the member to the real
  // blog page, no reason to keep showing it as a preview.
  if (publishDate <= now) {
    redirect(`/blog/${slug}`);
  }

  const daysOut = Math.max(
    0,
    Math.ceil(
      (publishDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24),
    ),
  );
  const dateLabel = publishDate.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="max-w-3xl mx-auto px-3 sm:px-4 py-6 sm:py-8 lg:py-12">
      {/* Back nav */}
      <Link
        href="/consilium/previews"
        className="inline-flex items-center gap-1.5 text-sm text-text-gray hover:text-warm-gold transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to previews
      </Link>

      {/* Preview banner, non-hideable cue that this content isn't
          public yet. Reinforces the member benefit on every page view. */}
      <div className="mb-6 rounded-2xl border border-warm-gold/30 bg-warm-gold/5 px-5 py-4">
        <div className="flex items-center gap-2 mb-1.5">
          <Clock size={14} strokeWidth={1.5} className="text-warm-gold" />
          <p className="text-[10px] uppercase tracking-[0.3em] text-warm-gold font-medium">
            Members Only · Preview
          </p>
        </div>
        <p className="text-sm text-text-light font-light">
          This post goes public on{" "}
          <span className="text-warm-gold font-medium">{dateLabel}</span>
          {daysOut > 0 && (
            <>
              {" "}
              <span className="text-text-gray">
               , {daysOut} {daysOut === 1 ? "day" : "days"} from now.
              </span>
            </>
          )}
        </p>
      </div>

      {/* Title + meta */}
      <header className="mb-8 pb-6 border-b border-warm-gold/15">
        <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.22em] text-text-gray/70 mb-4 flex-wrap">
          <span className="text-warm-gold/90">{post.frontmatter.category}</span>
          <span className="text-text-gray/40">·</span>
          <span>{post.readingTime}</span>
          <span className="text-text-gray/40">·</span>
          <span className="inline-flex items-center gap-1">
            <Calendar size={11} strokeWidth={1.5} />
            {dateLabel}
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extralight tracking-wide leading-tight text-text-light">
          {post.frontmatter.title}
        </h1>
        {post.frontmatter.excerpt && (
          <p className="mt-4 text-lg text-text-gray font-light leading-relaxed italic">
            {post.frontmatter.excerpt}
          </p>
        )}
      </header>

      {/* Body */}
      <PostContent source={post.content} />

      {/* Footer, back to the list */}
      <div className="mt-12 pt-6 border-t border-warm-gold/10 flex items-center justify-between">
        <Link
          href="/consilium/previews"
          className="inline-flex items-center gap-1.5 text-sm text-text-gray hover:text-warm-gold transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          All previews
        </Link>
        <span className="text-xs text-text-gray/60">
          Goes public {dateLabel}
        </span>
      </div>
    </div>
  );
}
