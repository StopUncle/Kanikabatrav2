"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { m } from "framer-motion";
import Link from "next/link";
import Header from "@/components/Header";
import BackgroundEffects from "@/components/BackgroundEffects";
import QuizEmailCapture from "@/components/quiz/QuizEmailCapture";
import {
  BPDDiagnosis,
  BPDScores,
  TIER_PROFILES,
  BPD_QUIZ_INFO,
  ZANARINI_CUTOFF,
} from "@/lib/quiz-bpd-data";
import {
  ShieldAlert,
  Activity,
  ArrowRight,
  RefreshCw,
  BookOpen,
  Crown,
  Phone,
} from "lucide-react";

interface StoredResult {
  scores: BPDScores;
  diagnosis: BPDDiagnosis;
  answers: Record<number, "yes" | "no">;
  completedAt: string;
}

const TIER_LABELS: Record<string, string> = {
  low: "Low",
  average: "Sub-clinical",
  high: "Threshold",
  "very-high": "At/Above Cutoff",
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

export default function BPDResultsPage() {
  const router = useRouter();
  const [result, setResult] = useState<StoredResult | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const raw = sessionStorage.getItem("bpdQuizResults");
    if (!raw) {
      router.replace("/quiz/bpd");
      return;
    }
    try {
      const parsed = JSON.parse(raw) as StoredResult;
      setResult(parsed);
    } catch {
      router.replace("/quiz/bpd");
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
  const fillPct = Math.round((diagnosis.rawScore / 10) * 100);

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
              The MSI-BPD is a screening instrument, not a diagnostic
              one. Cutoff (≥{ZANARINI_CUTOFF}) flags a likely BPD
              pattern with 81% sensitivity and 85% specificity in the
              Zanarini 2003 validation. Only a licensed clinician with
              a full history can diagnose Borderline Personality
              Disorder.
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

          {/* Score card with cutoff line */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mb-12 p-6 rounded-xl border border-accent-gold/20 bg-deep-black/50"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full flex items-center justify-center bg-accent-gold/10">
                  <Activity size={16} className="text-accent-gold" />
                </div>
                <div>
                  <div className="text-white text-sm font-light">
                    MSI-BPD Score
                  </div>
                  <div className="text-text-gray/60 text-[10px] uppercase tracking-wider">
                    Yes responses across 10 items
                  </div>
                </div>
              </div>
              <span
                className={`px-2 py-0.5 rounded-full text-[10px] uppercase tracking-wider border ${tierColor.text} ${tierColor.bg} ${tierColor.border}`}
              >
                {TIER_LABELS[diagnosis.tier]!}
              </span>
            </div>

            <div className="flex items-baseline gap-2 mb-3">
              <span className="text-4xl font-extralight text-white tabular-nums">
                {diagnosis.rawScore}
              </span>
              <span className="text-text-gray/60 text-xs">/ 10</span>
              <span
                className={`ml-auto text-xs tabular-nums ${
                  diagnosis.meetsCutoff ? "text-rose-300" : "text-text-gray"
                }`}
              >
                {diagnosis.meetsCutoff
                  ? `At or above the Zanarini cutoff (≥${ZANARINI_CUTOFF})`
                  : `Below the Zanarini cutoff (≥${ZANARINI_CUTOFF})`}
              </span>
            </div>

            {/* Bar with cutoff marker */}
            <div className="relative">
              <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                <m.div
                  className={`h-full rounded-full ${tierColor.bar}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${fillPct}%` }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                />
              </div>
              {/* Cutoff line at 70% (7/10) */}
              <div
                className="absolute top-0 bottom-0 w-px bg-rose-300/60"
                style={{ left: "70%" }}
                aria-label="Zanarini cutoff line at 7"
              />
              <div
                className="absolute -top-1 -translate-x-1/2 text-[9px] text-rose-300/70 tabular-nums"
                style={{ left: "70%", transform: "translate(-50%, -100%)" }}
              >
                cutoff
              </div>
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
                  What to do with this
                </h3>
                <p>{profile.whatNext}</p>
              </div>
            </div>
          </m.div>

          {/* Crisis resources for very-high tier with self-harm item flagged */}
          {(diagnosis.tier === "very-high" ||
            result.answers[2] === "yes") && (
            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mb-12 p-5 rounded-xl border border-rose-400/30 bg-rose-400/5"
            >
              <div className="flex items-start gap-3">
                <Phone
                  size={18}
                  strokeWidth={1.5}
                  className="text-rose-300/80 shrink-0 mt-1"
                />
                <div>
                  <h3 className="text-rose-300/90 text-sm font-medium uppercase tracking-wider mb-2">
                    If you are in crisis
                  </h3>
                  <p className="text-text-gray text-sm leading-relaxed">
                    Item 2 covers self-harm and suicide attempts. If
                    that pattern is currently active for you, the right
                    next step is not this assessment, it is a crisis
                    line or a clinician you can see this week. In the
                    US: 988 (Suicide &amp; Crisis Lifeline). In the UK:
                    Samaritans 116 123. International:{" "}
                    <a
                      href="https://findahelpline.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-rose-300 underline hover:text-rose-200"
                    >
                      findahelpline.com
                    </a>
                    . The score here will still be here when you come
                    back.
                  </p>
                </div>
              </div>
            </m.div>
          )}

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
                    The Consilium has BPD-aware threads.
                  </h3>
                  <p className="text-text-gray text-sm leading-relaxed mb-4">
                    BPD is one of the most treatable Cluster B
                    disorders when treated by clinicians who actually
                    know the construct. Most therapy frames misread it.
                    The Consilium is not a substitute for that
                    treatment, it is a room where the construct is
                    read accurately and the cultural shorthand
                    (&ldquo;BPD = manipulative woman&rdquo;) is not the
                    register.
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

          <QuizEmailCapture
            source="bpd-quiz"
            tags={[`tier:${diagnosis.tier}`]}
            resultLabel={profile.name}
          />

          {/* Related */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="grid sm:grid-cols-2 gap-4 mb-12"
          >
            <Link
              href="/quiz"
              className="block p-5 bg-deep-black/40 border border-accent-gold/15 rounded-xl hover:border-accent-gold/40 hover:bg-deep-black/60 transition-all group"
            >
              <RefreshCw size={18} className="text-accent-gold/70 mb-2" />
              <div className="text-accent-gold/70 text-[10px] uppercase tracking-[0.2em] mb-1">
                Wide map
              </div>
              <h3 className="text-white text-base font-light mb-2 group-hover:text-accent-gold transition-colors">
                The Dark Mirror Assessment
              </h3>
              <p className="text-text-gray text-sm leading-relaxed">
                Six Cluster B types instead of one. Take this to see
                how the BPD axis sits next to the other personality
                patterns it sometimes co-occurs with.
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
                The chapters on the BPD pattern in relationships are
                the longer-form companion. Written without the cultural
                shorthand the diagnosis is usually given.
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
              href="/quiz/bpd/take"
              className="hover:text-accent-gold transition-colors"
            >
              Retake the screen
            </Link>
            <span className="mx-3 text-text-gray/30">·</span>
            <Link
              href="/quiz/bpd"
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
              Cutoff calibration: {BPD_QUIZ_INFO.basedOn}
            </p>
          </m.div>
        </div>
      </main>
    </>
  );
}
