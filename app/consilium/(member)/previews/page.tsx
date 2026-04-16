import Link from "next/link";
import { requireServerAuth } from "@/lib/auth/server-auth";
import { getUpcomingPosts } from "@/lib/mdx";
import { Clock, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Previews — The Consilium | Kanika Batra",
  description:
    "Read upcoming posts inside the Consilium before the public sees them.",
};

export default async function PreviewsPage() {
  await requireServerAuth("/consilium/previews");
  const upcoming = getUpcomingPosts(60);

  return (
    <div className="max-w-3xl mx-auto px-3 sm:px-4 py-6 sm:py-10 lg:py-14">
      {/* Heading */}
      <header className="mb-10">
        <p className="text-warm-gold/90 uppercase tracking-[0.3em] text-xs sm:text-sm mb-3">
          Consilium · Early Access
        </p>
        <h1 className="text-3xl sm:text-4xl font-extralight tracking-wider uppercase gradient-text-gold mb-3">
          Previews
        </h1>
        <div className="w-12 h-px bg-warm-gold/50 mb-4" />
        <p className="text-text-gray font-light leading-relaxed max-w-xl">
          Finished posts on their way to the public blog. You read them
          first — days or weeks before anyone else. Same words, earlier
          seat.
        </p>
      </header>

      {upcoming.length === 0 ? (
        <div className="text-center py-20 border border-warm-gold/15 rounded-2xl bg-deep-black/40">
          <Clock className="w-10 h-10 text-text-gray/40 mx-auto mb-4" strokeWidth={1.25} />
          <p className="text-text-gray font-light">
            Nothing scheduled right now.
          </p>
          <p className="text-text-gray/60 text-xs mt-1">
            New previews land as Kanika writes them.
          </p>
        </div>
      ) : (
        <div className="space-y-3 sm:space-y-4">
          {upcoming.map((post) => {
            const publishDate = new Date(post.frontmatter.publishedAt);
            const daysOut = Math.max(
              0,
              Math.ceil(
                (publishDate.getTime() - Date.now()) /
                  (1000 * 60 * 60 * 24),
              ),
            );
            const dateLabel = publishDate.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            });
            return (
              <Link
                key={post.slug}
                href={`/consilium/previews/${post.slug}`}
                className="group block rounded-2xl border border-warm-gold/15 bg-deep-black/40 p-5 sm:p-6 hover:border-warm-gold/40 hover:bg-deep-black/60 hover:shadow-[0_8px_32px_-12px_rgba(212,175,55,0.25)] transition-all duration-300"
              >
                {/* Meta row */}
                <div className="flex items-center gap-3 mb-3 flex-wrap">
                  <span className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.22em] text-warm-gold bg-warm-gold/10 border border-warm-gold/30 rounded-full px-2.5 py-1 font-medium">
                    <Clock size={11} strokeWidth={1.75} />
                    {daysOut === 0
                      ? "Goes public today"
                      : daysOut === 1
                        ? "Goes public tomorrow"
                        : `Goes public in ${daysOut} days · ${dateLabel}`}
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.18em] text-text-gray/60">
                    {post.frontmatter.category}
                  </span>
                  <span className="text-[10px] text-text-gray/50">
                    {post.readingTime}
                  </span>
                </div>

                {/* Title */}
                <h2 className="text-lg sm:text-xl font-light text-text-light mb-2 group-hover:text-warm-gold transition-colors">
                  {post.frontmatter.title}
                </h2>

                {/* Excerpt */}
                <p className="text-sm text-text-gray font-light leading-relaxed mb-3 line-clamp-3">
                  {post.frontmatter.excerpt}
                </p>

                {/* CTA */}
                <span className="inline-flex items-center gap-1.5 text-xs text-warm-gold/80 group-hover:text-warm-gold transition-colors tracking-[0.15em] uppercase">
                  Read now
                  <ArrowRight
                    size={12}
                    strokeWidth={1.5}
                    className="transition-transform group-hover:translate-x-0.5"
                  />
                </span>
              </Link>
            );
          })}
        </div>
      )}

      {/* Footer explainer */}
      <section className="mt-12 p-6 rounded-2xl border border-warm-gold/10 bg-deep-black/30 text-center">
        <p className="text-xs text-text-gray/70 font-light leading-relaxed max-w-lg mx-auto">
          These posts are scheduled for public release. When the date passes,
          they move to{" "}
          <Link href="/blog" className="text-warm-gold/80 hover:text-warm-gold">
            the blog
          </Link>{" "}
          and drop off this list.
        </p>
      </section>
    </div>
  );
}
