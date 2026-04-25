"use client";

import { useEffect, useState } from "react";
import { m } from "framer-motion";
import Link from "next/link";
import {
  ShieldAlert,
  Eye,
  Heart,
  ListChecks,
  AlertTriangle,
  Crown,
  Compass,
  ArrowRight,
  RotateCcw,
  type LucideIcon,
} from "lucide-react";
import Header from "@/components/Header";
import BackgroundEffects from "@/components/BackgroundEffects";
import DaughterEmailCapture from "@/components/quiz/DaughterEmailCapture";
import {
  DAUGHTER_PROFILES,
  DAUGHTER_QUIZ_INFO,
  MOTHER_BAND_COPY,
  type DaughterType,
  type DaughterScores,
  type DaughterDiagnosis,
} from "@/lib/quiz-daughter-data";

interface DaughterResultsData {
  scores: DaughterScores;
  primaryType: DaughterType;
  secondaryType: DaughterType;
  diagnosis: DaughterDiagnosis;
  answers: Record<number, string>;
  completedAt: string;
}

const TYPE_ICONS: Record<DaughterType, LucideIcon> = {
  hypervigilant: Eye,
  fawn: Heart,
  "over-functioner": ListChecks,
  scapegoat: AlertTriangle,
  "golden-cage": Crown,
  sovereign: Compass,
};

const MOTHER_BAND_COLOR: Record<string, string> = {
  "likely-npd": "border-red-500/40 bg-red-500/5",
  "trait-heavy": "border-amber-500/40 bg-amber-500/5",
  difficult: "border-yellow-500/30 bg-yellow-500/5",
  unlikely: "border-green-500/30 bg-green-500/5",
};

export default function DaughterQuizResultsPage() {
  const [data, setData] = useState<DaughterResultsData | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem("daughterQuizResults");
      if (raw) {
        const parsed = JSON.parse(raw) as DaughterResultsData;
        setData(parsed);
      }
    } catch {
      // Ignore parse errors — null state will render the no-results screen
    }
    setLoaded(true);
  }, []);

  if (!loaded) {
    return (
      <>
        <BackgroundEffects />
        <Header />
        <main className="min-h-screen pt-24 pb-16 relative z-10">
          <div className="container mx-auto px-4 max-w-3xl text-center">
            <p className="text-text-gray text-sm">Loading your results...</p>
          </div>
        </main>
      </>
    );
  }

  if (!data) {
    return (
      <>
        <BackgroundEffects />
        <Header />
        <main className="min-h-screen pt-24 pb-16 relative z-10">
          <div className="container mx-auto px-4 max-w-2xl text-center">
            <h1 className="text-3xl font-extralight text-white mb-4">
              No Results Found
            </h1>
            <p className="text-text-gray mb-8">
              The Daughter Pattern Assessment hasn&apos;t been completed in this
              browser session. Take the assessment to see your result.
            </p>
            <Link href="/quiz/daughter">
              <m.button
                whileHover={{ scale: 1.05 }}
                className="px-8 py-3 bg-accent-gold text-deep-black font-medium tracking-wider uppercase rounded"
              >
                Take the Assessment
              </m.button>
            </Link>
          </div>
        </main>
      </>
    );
  }

  const profile = DAUGHTER_PROFILES[data.primaryType];
  const secondaryProfile = DAUGHTER_PROFILES[data.secondaryType];
  const motherBand = MOTHER_BAND_COPY[data.diagnosis.motherSignal];
  const PrimaryIcon = TYPE_ICONS[data.primaryType];
  const motherBandClass = MOTHER_BAND_COLOR[data.diagnosis.motherSignal] ?? "";

  return (
    <>
      <BackgroundEffects />
      <Header />
      <main className="min-h-screen pt-24 pb-16 relative z-10">
        <div className="container mx-auto px-4 max-w-3xl">
          {/* Disclaimer banner — same as the landing page, surfaced again
              on results because Daisy required disclaimers visible on every
              page including the answer surface. */}
          <m.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8 flex items-start gap-3 rounded-lg border border-accent-burgundy/40 bg-accent-burgundy/5 px-4 py-3"
          >
            <ShieldAlert
              size={16}
              strokeWidth={1.5}
              className="text-accent-burgundy/80 shrink-0 mt-0.5"
            />
            <p className="text-text-gray text-xs leading-relaxed">
              <span className="text-accent-burgundy/90 font-medium">
                Educational only.
              </span>{" "}
              The result below is a reflective read, not a clinical diagnosis,
              not medical advice, and not a substitute for professional
              evaluation. If anything in the result feels wrong, trust your
              own read of your life over the assessment.
            </p>
          </m.div>

          {/* Primary type — the headline result */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <p className="text-accent-gold/80 text-xs uppercase tracking-[0.3em] mb-3">
              Your Primary Profile
            </p>
            <div className="inline-flex items-center justify-center w-20 h-20 mb-6 rounded-full border border-accent-gold/40 bg-accent-gold/5">
              <PrimaryIcon size={32} className="text-accent-gold" strokeWidth={1.25} />
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extralight text-white mb-4 tracking-wide">
              {profile.name}
            </h1>
            <p className="text-xl text-accent-gold font-light italic mb-8">
              &ldquo;{profile.tagline}&rdquo;
            </p>
            <p className="text-text-gray text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              {profile.description}
            </p>
          </m.div>

          {/* Composite label + recovery stage */}
          <m.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12 p-6 border border-accent-gold/20 rounded-xl bg-deep-black/50 text-center"
          >
            <p className="text-[10px] uppercase tracking-[0.3em] text-accent-gold/70 mb-2">
              Composite Read
            </p>
            <p className="text-white text-lg font-light mb-3">
              {data.diagnosis.compositeLabel}
            </p>
            <p className="text-text-gray text-sm leading-relaxed">
              {data.diagnosis.description}
            </p>
          </m.div>

          {/* Childhood + adult pattern */}
          <m.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid md:grid-cols-2 gap-4 mb-12"
          >
            <div className="p-5 bg-deep-black/40 border border-accent-gold/15 rounded-xl">
              <p className="text-[10px] uppercase tracking-[0.25em] text-accent-gold/70 mb-2">
                The Childhood Pattern
              </p>
              <p className="text-text-gray text-sm leading-relaxed">
                {profile.childhoodPattern}
              </p>
            </div>
            <div className="p-5 bg-deep-black/40 border border-accent-gold/15 rounded-xl">
              <p className="text-[10px] uppercase tracking-[0.25em] text-accent-gold/70 mb-2">
                The Adult Pattern
              </p>
              <p className="text-text-gray text-sm leading-relaxed">
                {profile.adultPattern}
              </p>
            </div>
          </m.div>

          {/* Blind spots */}
          <m.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-12 p-6 bg-deep-black/40 border border-accent-burgundy/30 rounded-xl"
          >
            <p className="text-[10px] uppercase tracking-[0.25em] text-accent-burgundy/80 mb-3">
              Blind Spots
            </p>
            <ul className="space-y-2">
              {profile.blindSpots.map((spot, i) => (
                <li
                  key={i}
                  className="text-text-gray text-sm leading-relaxed flex items-start gap-3"
                >
                  <span className="text-accent-burgundy/70 mt-1.5">·</span>
                  <span>{spot}</span>
                </li>
              ))}
            </ul>
          </m.div>

          {/* Mother signal — the second axis */}
          <m.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className={`mb-12 p-6 border rounded-xl ${motherBandClass}`}
          >
            <p className="text-[10px] uppercase tracking-[0.3em] text-text-light/80 mb-2">
              Mother Signal · The Second Axis
            </p>
            <h3 className="text-xl text-white font-light mb-3">
              {motherBand.name}
            </h3>
            <p className="text-text-gray text-sm leading-relaxed mb-3">
              {motherBand.description}
            </p>
            <p className="text-text-gray/70 text-xs italic">
              Raw signal score: {data.diagnosis.motherSignalScore} / 60. Higher
              numbers = more NPD-coded behaviours recognised across the
              assessment.
            </p>
          </m.div>

          {/* Recovery move — the practical takeaway */}
          <m.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mb-12 p-6 bg-gradient-to-br from-accent-gold/10 to-transparent border border-accent-gold/30 rounded-xl"
          >
            <p className="text-[10px] uppercase tracking-[0.3em] text-accent-gold mb-3">
              Your Recovery Move
            </p>
            <p className="text-text-light text-base leading-relaxed mb-4">
              {profile.recoveryMove}
            </p>
            <div className="pt-4 border-t border-accent-gold/15">
              <p className="text-[10px] uppercase tracking-[0.25em] text-accent-gold/70 mb-2">
                The Twelve-Month Arc
              </p>
              <p className="text-text-gray text-sm leading-relaxed italic">
                {profile.twelveMonthArc}
              </p>
            </div>
          </m.div>

          {/* Email capture — soft opt-in. Surfaces after the recovery
              move (the most useful piece of content) so the user has
              already received their full free result before being asked.
              Tags the Subscriber with primary + secondary daughter type
              for future segmented email sequences. Reuses /api/newsletter
              — no new endpoint, no schema change. */}
          <DaughterEmailCapture
            primaryType={data.primaryType}
            secondaryType={data.secondaryType}
            primaryProfileName={profile.name}
          />

          {/* Secondary profile — the runner-up */}
          {data.primaryType !== data.secondaryType && (
            <m.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.55 }}
              className="mb-12 p-5 bg-deep-black/30 border border-accent-gold/10 rounded-xl"
            >
              <p className="text-[10px] uppercase tracking-[0.25em] text-accent-gold/70 mb-2">
                Secondary Pattern
              </p>
              <p className="text-white text-base font-light mb-1">
                {secondaryProfile.name}
              </p>
              <p className="text-text-gray text-sm leading-relaxed italic mb-2">
                &ldquo;{secondaryProfile.tagline}&rdquo;
              </p>
              <p className="text-text-gray/80 text-xs leading-relaxed">
                Your secondary scoring suggests this pattern is also active —
                often in different rooms (work vs family vs partner). Worth
                reading the {secondaryProfile.name} profile after you sit with
                the primary.
              </p>
            </m.div>
          )}

          {/* Where to go from here */}
          <m.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-light text-white text-center mb-3 tracking-wide">
              Where to Go from Here
            </h2>
            <p className="text-text-gray text-center text-sm max-w-xl mx-auto mb-8">
              The result is the recognition. The next moves are how the
              recognition becomes useful.
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              <Link
                href="/blog/narcissistic-mother-signs-daughter-pattern"
                className="group block p-5 bg-deep-black/40 border border-accent-gold/15 rounded-xl hover:border-accent-gold/40 hover:bg-deep-black/60 transition-all"
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <span className="text-[10px] uppercase tracking-[0.25em] text-accent-gold/70">
                    The Long-Form Read
                  </span>
                  <ArrowRight
                    size={14}
                    className="text-accent-gold/40 group-hover:text-accent-gold group-hover:translate-x-1 transition-all shrink-0 mt-0.5"
                    strokeWidth={1.5}
                  />
                </div>
                <h3 className="text-base font-light text-white mb-2 group-hover:text-accent-gold transition-colors leading-snug">
                  Narcissistic Mother: 14 Signs, the Daughter Pattern, and the
                  Specific Move That Cuts the Cord
                </h3>
                <p className="text-text-gray text-sm leading-relaxed">
                  The 4,000-word companion to this assessment. Goes deeper
                  into the household pattern, the no-contact playbook, and
                  what therapy gets right and wrong.
                </p>
              </Link>

              <Link
                href="/quiz"
                className="group block p-5 bg-deep-black/40 border border-accent-gold/15 rounded-xl hover:border-accent-gold/40 hover:bg-deep-black/60 transition-all"
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <span className="text-[10px] uppercase tracking-[0.25em] text-accent-gold/70">
                    Companion Assessment
                  </span>
                  <ArrowRight
                    size={14}
                    className="text-accent-gold/40 group-hover:text-accent-gold group-hover:translate-x-1 transition-all shrink-0 mt-0.5"
                    strokeWidth={1.5}
                  />
                </div>
                <h3 className="text-base font-light text-white mb-2 group-hover:text-accent-gold transition-colors leading-snug">
                  Take the Dark Mirror Assessment
                </h3>
                <p className="text-text-gray text-sm leading-relaxed">
                  This assessment told you what your household built into you.
                  The Dark Mirror tells you what the resulting personality
                  pattern looks like across the six Cluster B axes — including
                  whether you&apos;ve absorbed any of her traits yourself.
                </p>
              </Link>

              <Link
                href="/book"
                className="group block p-5 bg-deep-black/40 border border-accent-gold/15 rounded-xl hover:border-accent-gold/40 hover:bg-deep-black/60 transition-all"
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <span className="text-[10px] uppercase tracking-[0.25em] text-accent-gold/70">
                    The Book
                  </span>
                  <ArrowRight
                    size={14}
                    className="text-accent-gold/40 group-hover:text-accent-gold group-hover:translate-x-1 transition-all shrink-0 mt-0.5"
                    strokeWidth={1.5}
                  />
                </div>
                <h3 className="text-base font-light text-white mb-2 group-hover:text-accent-gold transition-colors leading-snug">
                  The Sociopathic Dating Bible
                </h3>
                <p className="text-text-gray text-sm leading-relaxed">
                  70,000 words on the partner-detection side — how the man you
                  keep ending up with maps onto your mother&apos;s pattern, and how
                  to interrupt the loop. Specifically useful for the
                  Hypervigilant and Fawn profiles.
                </p>
              </Link>

              <Link
                href="/consilium"
                className="group block p-5 bg-deep-black/40 border border-accent-gold/30 rounded-xl hover:border-accent-gold/60 hover:bg-deep-black/60 transition-all"
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <span className="text-[10px] uppercase tracking-[0.25em] text-accent-gold">
                    The Community
                  </span>
                  <ArrowRight
                    size={14}
                    className="text-accent-gold/60 group-hover:text-accent-gold group-hover:translate-x-1 transition-all shrink-0 mt-0.5"
                    strokeWidth={1.5}
                  />
                </div>
                <h3 className="text-base font-light text-white mb-2 group-hover:text-accent-gold transition-colors leading-snug">
                  Join the Consilium
                </h3>
                <p className="text-text-gray text-sm leading-relaxed">
                  $29 a month. Private threads for women in this exact niche.
                  The members-only simulator runs the pc-child track scenarios
                  — practice reps for the conversations you&apos;ve spent years
                  rehearsing alone.
                </p>
              </Link>
            </div>
          </m.div>

          {/* Retake / explore other profiles */}
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="text-center mb-12"
          >
            <Link
              href="/quiz/daughter"
              className="inline-flex items-center gap-2 px-8 py-3 border border-accent-gold/40 text-accent-gold hover:bg-accent-gold/10 font-medium tracking-wider uppercase text-sm rounded-full transition-all"
            >
              <RotateCcw size={14} strokeWidth={1.5} />
              Retake or Read About Other Profiles
            </Link>
          </m.div>

          {/* Full Disclaimer — repeats at the bottom of results because the
              user has just read a deeply personal interpretation of their
              relationship with their mother. The disclaimer here serves as
              the explicit reminder that this is one reading, not a verdict. */}
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.75 }}
          >
            <div className="p-6 bg-deep-black/30 border border-accent-burgundy/20 rounded-lg">
              <p className="text-accent-burgundy/80 text-[11px] uppercase tracking-[0.2em] mb-3 text-center">
                Full Disclaimer
              </p>
              <p className="text-text-gray text-xs leading-relaxed">
                {DAUGHTER_QUIZ_INFO.disclaimer}
              </p>
            </div>
          </m.div>
        </div>
      </main>
    </>
  );
}
