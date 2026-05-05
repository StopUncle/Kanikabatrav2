"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { m } from "framer-motion";
import Link from "next/link";
import Header from "@/components/Header";
import BackgroundEffects from "@/components/BackgroundEffects";
import {
  CovertNarcissistDiagnosis,
  CovertNarcissistScores,
  TIER_PROFILES,
  COVERT_NARCISSIST_QUIZ_INFO,
} from "@/lib/quiz-covert-narcissist-data";
import {
  ShieldAlert,
  EyeOff,
  ArrowRight,
  RefreshCw,
  BookOpen,
  Crown,
} from "lucide-react";

interface StoredResult {
  scores: CovertNarcissistScores;
  diagnosis: CovertNarcissistDiagnosis;
  answers: Record<number, 1 | 2 | 3 | 4 | 5>;
  completedAt: string;
}

const TIER_LABELS: Record<string, string> = {
  low: "Low",
  average: "Average",
  high: "High",
  "very-high": "Very High",
};

const TIER_COLORS: Record<
  string,
  { text: string; bg: string; border: string; bar: string }
> = {
  low: {
    text: "text-emerald-300",
    bg: "bg-emerald-400/10",
    border: "border-emerald-400/30",
    bar: "bg-emerald-400/70",
  },
  average: {
    text: "text-text-gray",
    bg: "bg-white/5",
    border: "border-white/15",
    bar: "bg-accent-gold/70",
  },
  high: {
    text: "text-amber-300",
    bg: "bg-amber-400/10",
    border: "border-amber-400/30",
    bar: "bg-amber-400/70",
  },
  "very-high": {
    text: "text-rose-300",
    bg: "bg-rose-400/10",
    border: "border-rose-400/30",
    bar: "bg-rose-400/70",
  },
};

export default function CovertNarcissistResultsPage() {
  const router = useRouter();
  const [result, setResult] = useState<StoredResult | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const raw = sessionStorage.getItem("covertNarcissistQuizResults");
    if (!raw) {
      router.replace("/quiz/covert-narcissist");
      return;
    }
    try {
      const parsed = JSON.parse(raw) as StoredResult;
      setResult(parsed);
    } catch {
      router.replace("/quiz/covert-narcissist");
    } finally {
      setLoading(false);
    }
  }, [router]);

  if (loading || !result) {
    return (
      <div className="min-h-screen bg-deep-black flex items-center justify-center">
        <p className="text-text-gray text-sm">Loading your result…</p>
      </div>
    );
  }

  const { diagnosis } = result;
  const profile = TIER_PROFILES[diagnosis.tier];
  const tierColor = TIER_COLORS[diagnosis.tier]!;
  const fillPct = Math.round(((diagnosis.rawScore - 10) / (50 - 10)) * 100);

  return (
    <>
      <BackgroundEffects />
      <Header />
      <main className="min-h-screen pt-24 pb-16 relative z-10">
        <div className="container mx-auto px-4 max-w-3xl">
          <m.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 flex items-start gap-3 rounded-lg border border-accent-burgundy/40 bg-accent-burgundy/5 px-4 py-3"
          >
            <ShieldAlert
              size={16}
              strokeWidth={1.5}
              className="text-accent-burgundy/80 shrink-0 mt-0.5"
            />
            <p className="text-text-gray text-xs leading-relaxed">
              <span className="text-accent-burgundy/90 font-medium">
                Educational use only.
              </span>{" "}
              The HSNS is a research instrument, not a diagnostic one.
              Vulnerable narcissism is a construct in the literature,
              not a separate DSM diagnosis. Calibrated against the
              Hendin &amp; Cheek 1997 reference norms (n=535, M=26.7,
              SD=6.6).
            </p>
          </m.div>

          {/* Headline */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-block mb-4 px-4 py-2 border border-accent-gold/30 rounded-full">
              <span className="text-accent-gold text-xs tracking-[0.25em] uppercase">
                Your tier
              </span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extralight text-white mb-3 tracking-wide">
              {diagnosis.headline}
            </h1>
            <p className="text-lg sm:text-xl text-accent-gold font-light italic">
              {diagnosis.tagline}
            </p>
          </m.div>

          {/* Score card */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mb-12 p-6 rounded-xl border border-accent-gold/20 bg-deep-black/50"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full flex items-center justify-center bg-accent-gold/10">
                  <EyeOff size={16} className="text-accent-gold" />
                </div>
                <div>
                  <div className="text-white text-sm font-light">
                    Hypersensitive Narcissism (HSNS)
                  </div>
                  <div className="text-text-gray/60 text-[10px] uppercase tracking-wider">
                    Vulnerable narcissism
                  </div>
                </div>
              </div>
              <span
                className={`px-2 py-0.5 rounded-full text-[10px] uppercase tracking-wider border ${tierColor.text} ${tierColor.bg} ${tierColor.border}`}
              >
                {TIER_LABELS[diagnosis.tier]!}
              </span>
            </div>

            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-4xl font-extralight text-white tabular-nums">
                {diagnosis.rawScore}
              </span>
              <span className="text-text-gray/60 text-xs">/ 50</span>
              <span className="ml-auto text-text-gray text-xs tabular-nums">
                {diagnosis.percentile}th percentile
              </span>
            </div>

            <div className="h-2 bg-white/5 rounded-full overflow-hidden">
              <m.div
                className={`h-full rounded-full ${tierColor.bar}`}
                initial={{ width: 0 }}
                animate={{ width: `${fillPct}%` }}
                transition={{ duration: 0.8, delay: 0.3 }}
              />
            </div>
          </m.div>

          {/* Tier profile */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-12 p-6 sm:p-8 rounded-xl border border-accent-gold/25 bg-deep-black/60"
          >
            <div className="text-center mb-6">
              <div className="text-accent-gold text-[10px] tracking-[0.3em] uppercase mb-2">
                Tier read
              </div>
              <h2 className="text-2xl sm:text-3xl font-light text-white mb-2">
                {profile.name}
              </h2>
              <p className="text-accent-gold/80 italic text-sm">
                {profile.tagline}
              </p>
            </div>

            <div className="space-y-5 text-text-gray text-sm sm:text-[15px] leading-relaxed">
              <p>{profile.description}</p>
              <div>
                <h3 className="text-white text-sm uppercase tracking-wider mb-2 font-medium">
                  What this looks like in your own life
                </h3>
                <p>{profile.selfPattern}</p>
              </div>
              <div>
                <h3 className="text-white text-sm uppercase tracking-wider mb-2 font-medium">
                  What this looks like to other people
                </h3>
                <p>{profile.externalRead}</p>
              </div>
              <div>
                <h3 className="text-white text-sm uppercase tracking-wider mb-2 font-medium">
                  Three places this shows up
                </h3>
                <ul className="space-y-2 list-disc pl-5 marker:text-accent-gold/60">
                  {profile.blindSpots.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-white text-sm uppercase tracking-wider mb-2 font-medium">
                  What to do with this
                </h3>
                <p>{profile.whatNext}</p>
              </div>
            </div>
          </m.div>

          {/* Triangulation prompt */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-12 p-5 rounded-xl border border-accent-gold/30 bg-accent-gold/5"
          >
            <p className="text-text-gray text-sm leading-relaxed">
              <span className="text-accent-gold font-medium">
                Triangulate the read:
              </span>{" "}
              The HSNS measures vulnerable narcissism only. To map the
              full narcissism axis, take the{" "}
              <Link
                href="/quiz/narcissist"
                className="text-accent-gold hover:text-accent-gold/80 underline"
              >
                Narcissist Test (NPI-40)
              </Link>{" "}
              for grandiose narcissism. The two scores together are
              substantially more informative than either alone, high
              HSNS + low NPI is classical covert; both high is the rare
              and high-cost &ldquo;malignant&rdquo; / exhibitionistic-vulnerable
              blend (Pincus et al. 2009).
            </p>
          </m.div>

          {/* Consilium nudge for High + Very High */}
          {(diagnosis.tier === "high" || diagnosis.tier === "very-high") && (
            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mb-12 p-6 rounded-xl border border-accent-gold/40 bg-gradient-to-br from-accent-gold/5 to-deep-black/60"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-accent-gold/15 shrink-0">
                  <Crown size={18} className="text-accent-gold" />
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-light text-lg mb-2">
                    The Consilium has threads built for this configuration.
                  </h3>
                  <p className="text-text-gray text-sm leading-relaxed mb-4">
                    Vulnerable narcissism is the configuration most
                    likely to be misdiagnosed as anxiety or depression
                    and treated as those things, which entrenches it.
                    The Consilium has, by deliberate design, threads
                    dedicated to this exact pattern, run by an author
                    with an adjacent diagnosis (ASPD, not NPD). $29 a
                    month. The first month is typically the most useful.
                  </p>
                  <Link
                    href="/consilium"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent-gold/15 hover:bg-accent-gold/25 text-accent-gold border border-accent-gold/40 rounded text-sm tracking-wider uppercase transition-all"
                  >
                    See the Consilium
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </m.div>
          )}

          {/* Related */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="grid sm:grid-cols-2 gap-4 mb-12"
          >
            <Link
              href="/quiz/narcissist"
              className="block p-5 bg-deep-black/40 border border-accent-gold/15 rounded-xl hover:border-accent-gold/40 hover:bg-deep-black/60 transition-all group"
            >
              <RefreshCw size={18} className="text-accent-gold/70 mb-2" />
              <div className="text-accent-gold/70 text-[10px] uppercase tracking-[0.2em] mb-1">
                Companion quiz
              </div>
              <h3 className="text-white text-base font-light mb-2 group-hover:text-accent-gold transition-colors">
                The Narcissist Test (NPI-40)
              </h3>
              <p className="text-text-gray text-sm leading-relaxed">
                The grandiose-narcissism companion. Take this next to
                triangulate the full narcissism axis.
              </p>
            </Link>
            <Link
              href="/book"
              className="block p-5 bg-deep-black/40 border border-accent-gold/15 rounded-xl hover:border-accent-gold/40 hover:bg-deep-black/60 transition-all group"
            >
              <BookOpen size={18} className="text-accent-gold/70 mb-2" />
              <div className="text-accent-gold/70 text-[10px] uppercase tracking-[0.2em] mb-1">
                Long form
              </div>
              <h3 className="text-white text-base font-light mb-2 group-hover:text-accent-gold transition-colors">
                The Sociopathic Dating Bible
              </h3>
              <p className="text-text-gray text-sm leading-relaxed">
                The chapter on the covert pattern was written by an
                author with an adjacent diagnosis and reads from the
                inside on the contempt-for-the-needy mechanic.
              </p>
            </Link>
          </m.div>

          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.65 }}
            className="text-center text-sm text-text-gray/70"
          >
            <Link
              href="/quiz/covert-narcissist/take"
              className="hover:text-accent-gold transition-colors"
            >
              Retake the assessment
            </Link>
            <span className="mx-3 text-text-gray/30">·</span>
            <Link
              href="/quiz/covert-narcissist"
              className="hover:text-accent-gold transition-colors"
            >
              About this test
            </Link>
          </m.div>

          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.75 }}
            className="mt-8 text-center"
          >
            <p className="text-text-gray/50 text-[11px] leading-relaxed max-w-xl mx-auto">
              Norms calibrated against {COVERT_NARCISSIST_QUIZ_INFO.basedOn}
            </p>
          </m.div>
        </div>
      </main>
    </>
  );
}
