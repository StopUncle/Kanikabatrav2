import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import BackgroundEffects from "@/components/BackgroundEffects";
import RadarChart from "@/components/quiz/RadarChart";
import { PERSONALITY_PROFILES } from "@/lib/quiz-data";
import { getPublicQuizResult } from "@/lib/quiz/share";

export const dynamic = "force-dynamic";

interface PageParams {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: PageParams): Promise<Metadata> {
  const { id } = await params;
  const result = await getPublicQuizResult(id);
  const profile = result ? PERSONALITY_PROFILES[result.primaryType] : null;

  const title = profile
    ? `${profile.name} | Dark Mirror Assessment`
    : "Dark Mirror Assessment";
  const description = profile
    ? `${profile.tagline} See where you land across the six axes of dark psychology.`
    : "Find out which personality archetype drives your behavior across six axes of dark psychology.";
  const ogImage = `/api/og/quiz/${id}`;

  return {
    title,
    description,
    alternates: { canonical: `https://kanikarose.com/quiz/results/${id}` },
    openGraph: {
      title,
      description,
      url: `https://kanikarose.com/quiz/results/${id}`,
      type: "article",
      images: [{ url: ogImage, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function SharedQuizResultPage({ params }: PageParams) {
  const { id } = await params;
  const result = await getPublicQuizResult(id);
  const profile = result ? PERSONALITY_PROFILES[result.primaryType] : null;
  const secondaryProfile = result?.secondaryType
    ? PERSONALITY_PROFILES[result.secondaryType]
    : null;

  return (
    <>
      <BackgroundEffects />
      <Header />
      <main className="min-h-screen pt-24 pb-16 relative z-10">
        <div className="container mx-auto px-4 max-w-3xl">
          {result && profile ? (
            <>
              <div className="text-center mb-10">
                <div className="inline-block mb-4 px-4 py-2 border border-accent-gold/30 rounded-full">
                  <span className="text-accent-gold text-sm tracking-[0.2em] uppercase">
                    Dark Mirror Assessment
                  </span>
                </div>
                <h1 className="text-3xl sm:text-5xl font-extralight text-white mb-4">
                  <span className="text-accent-gold">{profile.name}</span>
                </h1>
                <p className="text-xl text-text-gray font-light italic">
                  &quot;{profile.tagline}&quot;
                </p>
                {secondaryProfile && (
                  <p className="text-text-gray text-sm mt-4">
                    Secondary type: {secondaryProfile.name}
                  </p>
                )}
              </div>

              <div className="p-8 bg-deep-black/50 border border-accent-gold/20 rounded-lg mb-12">
                <RadarChart scores={result.scores} />
              </div>

              <div className="rounded-xl border border-accent-gold/30 bg-accent-gold/[0.04] p-8 text-center">
                <p className="text-white font-light text-lg mb-2">
                  Most people never learn this about themselves.
                </p>
                <p className="text-text-gray text-sm mb-6 max-w-md mx-auto leading-relaxed">
                  Take the Dark Mirror Assessment and see where you land across
                  all six axes, including your neurotypical baseline.
                </p>
                <Link
                  href="/quiz/take"
                  className="inline-flex items-center gap-2 px-8 py-3.5 bg-accent-gold text-deep-black font-medium tracking-wider uppercase text-sm rounded-full hover:bg-accent-gold/90 transition-all"
                >
                  Take the assessment
                  <ArrowRight size={16} />
                </Link>
              </div>
            </>
          ) : (
            <div className="text-center py-24">
              <div className="inline-block mb-6 px-4 py-2 border border-accent-gold/30 rounded-full">
                <span className="text-accent-gold text-sm tracking-[0.2em] uppercase">
                  Result Not Found
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extralight text-white mb-4">
                This result is no longer available
              </h1>
              <p className="text-text-gray font-light mb-8 max-w-lg mx-auto">
                Find out which personality archetype drives your behavior with
                the Dark Mirror Assessment.
              </p>
              <Link
                href="/quiz/take"
                className="inline-flex items-center gap-2 px-10 py-4 bg-accent-gold text-deep-black font-medium text-lg tracking-wider uppercase rounded-full hover:bg-accent-gold/90 transition-all"
              >
                Take the assessment
                <ArrowRight size={18} />
              </Link>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
