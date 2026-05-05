"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { m } from "framer-motion";
import Link from "next/link";
import Header from "@/components/Header";
import BackgroundEffects from "@/components/BackgroundEffects";
import {
  DatingDiagnosis,
  DatingScores,
  QUADRANT_PROFILES,
  BEHAVIOURAL_TIER_SUMMARY,
  INTERNAL_TIER_SUMMARY,
  DATING_QUIZ_INFO,
} from "@/lib/quiz-dating-sociopath-data";
import {
  ShieldAlert,
  Eye,
  Heart,
  ArrowRight,
  RefreshCw,
  BookOpen,
  Phone,
} from "lucide-react";

interface StoredResult {
  scores: DatingScores;
  diagnosis: DatingDiagnosis;
  answers: Record<number, 0 | 1 | 2>;
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

export default function DatingSociopathResultsPage() {
  const router = useRouter();
  const [result, setResult] = useState<StoredResult | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const raw = sessionStorage.getItem("datingSociopathQuizResults");
    if (!raw) {
      router.replace("/quiz/dating-sociopath");
      return;
    }
    try {
      const parsed = JSON.parse(raw) as StoredResult;
      setResult(parsed);
    } catch {
      router.replace("/quiz/dating-sociopath");
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
  const profile = QUADRANT_PROFILES[diagnosis.quadrant];
  const behColor = TIER_COLORS[diagnosis.behavioural.tier]!;
  const intColor = TIER_COLORS[diagnosis.internal.tier]!;
  const behFill = Math.round((diagnosis.behavioural.rawScore / 20) * 100);
  const intFill = Math.round((diagnosis.internal.rawScore / 20) * 100);

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
              This quiz cannot diagnose your partner or your relationship.
              Only a licensed clinician with a full history can diagnose
              any personality disorder.
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
                Your configuration
              </span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extralight text-white mb-3 tracking-wide">
              {diagnosis.headline}
            </h1>
            <p className="text-lg sm:text-xl text-accent-gold font-light italic">
              {diagnosis.tagline}
            </p>
          </m.div>

          {/* Two axis bars */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="grid sm:grid-cols-2 gap-4 mb-8"
          >
            {/* Behavioural */}
            <div className="p-5 rounded-xl border border-accent-gold/20 bg-deep-black/50">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center bg-rose-400/10">
                    <Eye size={16} className="text-rose-300" />
                  </div>
                  <div>
                    <div className="text-white text-sm font-light">
                      Behavioural Red Flags
                    </div>
                    <div className="text-text-gray/60 text-[10px] uppercase tracking-wider">
                      Visible
                    </div>
                  </div>
                </div>
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] uppercase tracking-wider border ${behColor.text} ${behColor.bg} ${behColor.border}`}
                >
                  {TIER_LABELS[diagnosis.behavioural.tier]!}
                </span>
              </div>
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-3xl font-extralight text-white tabular-nums">
                  {diagnosis.behavioural.rawScore}
                </span>
                <span className="text-text-gray/60 text-xs">/ 20</span>
              </div>
              <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                <m.div
                  className={`h-full rounded-full ${behColor.bar}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${behFill}%` }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                />
              </div>
              <p className="text-text-gray text-xs leading-relaxed mt-3">
                {BEHAVIOURAL_TIER_SUMMARY[diagnosis.behavioural.tier]}
              </p>
            </div>

            {/* Internal */}
            <div className="p-5 rounded-xl border border-accent-gold/20 bg-deep-black/50">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center bg-amber-400/10">
                    <Heart size={16} className="text-amber-300" />
                  </div>
                  <div>
                    <div className="text-white text-sm font-light">
                      Internal Red Flags
                    </div>
                    <div className="text-text-gray/60 text-[10px] uppercase tracking-wider">
                      Felt
                    </div>
                  </div>
                </div>
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] uppercase tracking-wider border ${intColor.text} ${intColor.bg} ${intColor.border}`}
                >
                  {TIER_LABELS[diagnosis.internal.tier]!}
                </span>
              </div>
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-3xl font-extralight text-white tabular-nums">
                  {diagnosis.internal.rawScore}
                </span>
                <span className="text-text-gray/60 text-xs">/ 20</span>
              </div>
              <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                <m.div
                  className={`h-full rounded-full ${intColor.bar}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${intFill}%` }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                />
              </div>
              <p className="text-text-gray text-xs leading-relaxed mt-3">
                {INTERNAL_TIER_SUMMARY[diagnosis.internal.tier]}
              </p>
            </div>
          </m.div>

          {/* Safety callout, surfaces above the long-form for high-score quadrants */}
          {diagnosis.surfaceSafetyCallout && (
            <m.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="mb-12 p-5 rounded-xl border border-rose-400/40 bg-rose-400/5"
            >
              <div className="flex items-start gap-3">
                <Phone
                  size={18}
                  strokeWidth={1.5}
                  className="text-rose-300/80 shrink-0 mt-1"
                />
                <div>
                  <h3 className="text-rose-300/90 text-sm font-medium uppercase tracking-wider mb-2">
                    If you are in danger right now
                  </h3>
                  <p className="text-text-gray text-sm leading-relaxed">
                    Your score is in a range where the partner-detection
                    literature recommends contacting a domestic violence
                    service before acting on the result. US: National
                    DV Hotline 1-800-799-7233. UK: 0808 2000 247.
                    Australia: 1800RESPECT. International:{" "}
                    <a
                      href="https://findahelpline.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-rose-300 underline hover:text-rose-200"
                    >
                      findahelpline.com
                    </a>
                    . Calls to these services are confidential.
                  </p>
                </div>
              </div>
            </m.div>
          )}

          {/* Quadrant profile */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mb-12 p-6 sm:p-8 rounded-xl border border-accent-gold/25 bg-deep-black/60"
          >
            <div className="text-center mb-6">
              <div className="text-accent-gold text-[10px] tracking-[0.3em] uppercase mb-2">
                Combined read
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
                  What this means
                </h3>
                <p>{profile.whatItMeans}</p>
              </div>
              <div>
                <h3 className="text-white text-sm uppercase tracking-wider mb-2 font-medium">
                  What to do with this
                </h3>
                <p>{profile.whatToDo}</p>
              </div>
              <div>
                <h3 className="text-white text-sm uppercase tracking-wider mb-2 font-medium">
                  Notes
                </h3>
                <ul className="space-y-2 list-disc pl-5 marker:text-accent-gold/60">
                  {profile.notes.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              </div>
            </div>
          </m.div>

          {/* Book pitch (this quiz is built directly from the book) */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="mb-12 p-6 rounded-xl border border-accent-gold/40 bg-gradient-to-br from-accent-gold/5 to-deep-black/60"
          >
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full flex items-center justify-center bg-accent-gold/15 shrink-0">
                <BookOpen size={18} className="text-accent-gold" />
              </div>
              <div className="flex-1">
                <h3 className="text-white font-light text-lg mb-2">
                  This quiz is the surface. The book is the depth.
                </h3>
                <p className="text-text-gray text-sm leading-relaxed mb-4">
                  Twenty scenarios is what fits in a quiz. The
                  Sociopathic Dating Bible is 70,000 words on the same
                  territory, what each red flag actually looks like
                  across months of a relationship, why each one
                  matters, what the literature says about leaving
                  safely. Written by an author with the diagnosis the
                  partner side of this quiz is built to detect.
                </p>
                <Link
                  href="/book"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent-gold/15 hover:bg-accent-gold/25 text-accent-gold border border-accent-gold/40 rounded text-sm tracking-wider uppercase transition-all"
                >
                  Read the book
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </m.div>

          {/* Related */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="grid sm:grid-cols-2 gap-4 mb-12"
          >
            <Link
              href="/quiz/sociopath"
              className="block p-5 bg-deep-black/40 border border-accent-gold/15 rounded-xl hover:border-accent-gold/40 hover:bg-deep-black/60 transition-all group"
            >
              <RefreshCw size={18} className="text-accent-gold/70 mb-2" />
              <div className="text-accent-gold/70 text-[10px] uppercase tracking-[0.2em] mb-1">
                Self-test
              </div>
              <h3 className="text-white text-base font-light mb-2 group-hover:text-accent-gold transition-colors">
                The Sociopath Test (LSRP)
              </h3>
              <p className="text-text-gray text-sm leading-relaxed">
                A self-assessment for the partner this quiz cannot
                directly score. The construct is the same; the unit
                of analysis is different.
              </p>
            </Link>
            <Link
              href="/quiz/daughter"
              className="block p-5 bg-deep-black/40 border border-accent-gold/15 rounded-xl hover:border-accent-gold/40 hover:bg-deep-black/60 transition-all group"
            >
              <RefreshCw size={18} className="text-accent-gold/70 mb-2" />
              <div className="text-accent-gold/70 text-[10px] uppercase tracking-[0.2em] mb-1">
                Sister quiz
              </div>
              <h3 className="text-white text-base font-light mb-2 group-hover:text-accent-gold transition-colors">
                The Daughter Pattern Assessment
              </h3>
              <p className="text-text-gray text-sm leading-relaxed">
                If you grew up in an NPD-trait-heavy household, the
                partner-pattern you keep ending up with often maps onto
                the household. The upstream read.
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
              href="/quiz/dating-sociopath/take"
              className="hover:text-accent-gold transition-colors"
            >
              Retake the assessment
            </Link>
            <span className="mx-3 text-text-gray/30">·</span>
            <Link
              href="/quiz/dating-sociopath"
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
              Source: {DATING_QUIZ_INFO.basedOn}
            </p>
          </m.div>
        </div>
      </main>
    </>
  );
}
