import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import BackgroundEffects from "@/components/BackgroundEffects";
import TellPlayer from "@/components/tells/TellPlayer";
import { getTellBySlug } from "@/lib/tells/db";
import { resolveTellContext } from "@/lib/tells/auth-context";
import { checkMembership } from "@/lib/community/membership";
import { TRACK_LABELS } from "@/lib/tells/types";

export const dynamic = "force-dynamic";

/**
 * /tells/[slug], an individual Tell deep page.
 *
 * Public, anonymous-friendly, server-rendered for SEO and shareability.
 * Useful for:
 *   - History page links ("Open" past Tell)
 *   - Twitter/IG link-out from "I just got Tell 247 right"
 *   - Search indexing the question + artifact
 *
 * Only PUBLISHED Tells are reachable. Draft/Review/Scheduled return 404
 * so a leaked URL does not surface a half-baked Tell.
 */

interface PageParams {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PageParams): Promise<Metadata> {
  const { slug } = await params;
  const tell = await getTellBySlug(slug);
  if (!tell) {
    return { title: "Tell not found" };
  }
  return {
    title: `Tell ${String(tell.number).padStart(3, "0")} | Train Your Instincts`,
    description: tell.question,
    alternates: {
      canonical: `https://kanikarose.com/tells/${slug}`,
    },
    openGraph: {
      title: `Tell ${String(tell.number).padStart(3, "0")} · ${TRACK_LABELS[tell.track]}`,
      description: tell.question,
      url: `https://kanikarose.com/tells/${slug}`,
      type: "article",
      images: [
        {
          url: `/api/tells/${tell.id}/og`,
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `Tell ${String(tell.number).padStart(3, "0")} · ${TRACK_LABELS[tell.track]}`,
      description: tell.question,
      images: [`/api/tells/${tell.id}/og`],
    },
  };
}

export default async function TellSlugPage({ params }: PageParams) {
  const { slug } = await params;
  const tell = await getTellBySlug(slug);
  if (!tell) notFound();

  // Same membership-aware footer as /tells: members do not see the
  // $29/mo upsell on a deep-page they hit from a share link.
  const ctx = await resolveTellContext();
  const { isMember } = ctx.userId
    ? await checkMembership(ctx.userId)
    : { isMember: false };
  const surface = isMember ? "member" : "public";

  return (
    <>
      <BackgroundEffects />
      <Header />
      <main className="relative z-10 min-h-screen pt-28 pb-16">
        <div className="max-w-3xl mx-auto px-4">
          <Link
            href="/tells"
            className="inline-flex items-center gap-2 text-text-gray hover:text-accent-gold text-sm mb-6"
          >
            <ArrowLeft size={14} /> Today&rsquo;s Tell
          </Link>
        </div>
        <TellPlayer tell={tell} surface={surface} />
      </main>
    </>
  );
}
