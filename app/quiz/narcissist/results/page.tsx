"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { m } from "framer-motion";
import Link from "next/link";
import Header from "@/components/Header";
import BackgroundEffects from "@/components/BackgroundEffects";
import {
  NarcissistDiagnosis,
  NarcissistScores,
  QUADRANT_PROFILES,
  getNarcissistTierInterpretation,
  NARCISSIST_QUIZ_INFO,
  NarcissistFactor,
} from "@/lib/quiz-narcissist-data";
import {
  ShieldAlert,
  Crown,
  Eye,
  ArrowRight,
  RefreshCw,
  BookOpen,
  type LucideIcon,
} from "lucide-react";

interface StoredResult {
  scores: NarcissistScores;
  diagnosis: NarcissistDiagnosis;
  answers: Record<number, "a" | "b">;
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
  { text: string; bg: string; border: string }
> = {
  low: {
    text: "text-emerald-300",
    bg: "bg-emerald-400/10",
    border: "border-emerald-400/30",
  },
  average: {
    text: "text-text-gray",
    bg: "bg-white/5",
    border: "border-white/15",
  },
  high: {
    text: "text-amber-300",
    bg: "bg-amber-400/10",
    border: "border-amber-400/30",
  },
  "very-high": {
    text: "text-rose-300",
    bg: "bg-rose-400/10",
    border: "border-rose-400/30",
  },
};

const FACTOR_LABELS: Record<NarcissistFactor, string> = {
  authority: "Authority",
  "self-sufficiency": "Self-sufficiency",
  superiority: "Superiority",
  exhibitionism: "Exhibitionism",
  exploitativeness: "Exploitativeness",
  vanity: "Vanity",
  entitlement: "Entitlement",
};

const FACTOR_MAX: Record<NarcissistFactor, number> = {
  authority: 8,
  "self-sufficiency": 6,
  superiority: 5,
  exhibitionism: 7,
  exploitativeness: 5,
  vanity: 3,
  entitlement: 6,
};

const FACTOR_GROUP: Record<NarcissistFactor, "grandiose" | "predatory"> = {
  authority: "grandiose",
  "self-sufficiency": "grandiose",
  superiority: "grandiose",
  exhibitionism: "predatory",
  exploitativeness: "predatory",
  vanity: "predatory",
  entitlement: "predatory",
};

export default function NarcissistResultsPage() {
  const router = useRouter();
  const [result, setResult] = useState<StoredResult | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const raw = sessionStorage.getItem("narcissistQuizResults");
    if (!raw) {
      router.replace("/quiz/narcissist");
      return;
    }
    try {
      const parsed = JSON.parse(raw) as StoredResult;
      setResult(parsed);
    } catch {
      router.replace("/quiz/narcissist");
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
  const grandioseInterp = getNarcissistTierInterpretation(
    "grandiose",
    diagnosis.grandiose.tier,
  );
  const predatoryInterp = getNarcissistTierInterpretation(
    "predatory",
    diagnosis.predatory.tier,
  );

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
              The NPI-40 measures grandiose narcissism and is a research
              instrument, not a diagnostic one. Calibrated against
              published population norms (Raskin & Terry 1988; M=15.3,
              SD=6.8). Only a licensed clinician can diagnose NPD.
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
            <p className="mt-6 text-text-gray text-sm">
              Total NPI score:{" "}
              <span className="text-white font-light tabular-nums">
                {diagnosis.total.rawScore}
              </span>
              <span className="text-text-gray/60"> / 40</span>
              <span className="mx-2 text-text-gray/40">·</span>
              <span className="tabular-nums">
                {diagnosis.total.percentile}th percentile
              </span>
            </p>
          </m.div>

          {/* Two subscale bars */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="grid sm:grid-cols-2 gap-4 mb-12"
          >
            <SubscaleCard
              icon={Crown}
              iconColor="text-amber-300"
              iconBg="bg-amber-400/10"
              name="Grandiose Confidence"
              short="Loud"
              rawScore={diagnosis.grandiose.rawScore}
              minScore={0}
              maxScore={19}
              percentile={diagnosis.grandiose.percentile}
              tier={diagnosis.grandiose.tier}
            />
            <SubscaleCard
              icon={Eye}
              iconColor="text-rose-300"
              iconBg="bg-rose-400/10"
              name="Predatory Pattern"
              short="Costly"
              rawScore={diagnosis.predatory.rawScore}
              minScore={0}
              maxScore={21}
              percentile={diagnosis.predatory.percentile}
              tier={diagnosis.predatory.tier}
            />
          </m.div>

          {/* Subscale interpretations */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="space-y-4 mb-12"
          >
            <SubscaleInterpretation
              label="Grandiose · Loud"
              labelColor="text-amber-300"
              tierLabel={TIER_LABELS[diagnosis.grandiose.tier]!}
              meaning={grandioseInterp.meaning}
              inLife={grandioseInterp.inLife}
            />
            <SubscaleInterpretation
              label="Predatory · Costly"
              labelColor="text-rose-300"
              tierLabel={TIER_LABELS[diagnosis.predatory.tier]!}
              meaning={predatoryInterp.meaning}
              inLife={predatoryInterp.inLife}
            />
          </m.div>

          {/* Per-factor breakdown */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-12 p-6 rounded-xl border border-accent-gold/20 bg-deep-black/40"
          >
            <div className="text-center mb-5">
              <div className="text-accent-gold text-[10px] tracking-[0.3em] uppercase mb-1">
                Per-factor breakdown
              </div>
              <div className="text-text-gray text-xs">
                Raskin &amp; Terry 1988 seven-factor solution
              </div>
            </div>
            <div className="space-y-2.5">
              {(Object.keys(FACTOR_LABELS) as NarcissistFactor[]).map(
                (factor) => {
                  const score = diagnosis.factors[factor];
                  const max = FACTOR_MAX[factor];
                  const pct = (score / max) * 100;
                  const group = FACTOR_GROUP[factor];
                  return (
                    <div key={factor} className="flex items-center gap-3">
                      <div className="w-32 sm:w-40 shrink-0 flex items-center gap-2">
                        <span
                          className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                            group === "grandiose"
                              ? "bg-amber-400/70"
                              : "bg-rose-400/70"
                          }`}
                        />
                        <span className="text-text-gray text-xs">
                          {FACTOR_LABELS[factor]}
                        </span>
                      </div>
                      <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <m.div
                          className={`h-full rounded-full ${
                            group === "grandiose"
                              ? "bg-amber-400/70"
                              : "bg-rose-400/70"
                          }`}
                          initial={{ width: 0 }}
                          animate={{ width: `${pct}%` }}
                          transition={{ duration: 0.7, delay: 0.4 }}
                        />
                      </div>
                      <div className="w-12 text-right text-xs text-text-gray tabular-nums shrink-0">
                        {score}/{max}
                      </div>
                    </div>
                  );
                },
              )}
            </div>
          </m.div>

          {/* Quadrant profile */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
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
                  Three places this shows up you may not have noticed
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

          {/* Covert nudge for Charmer + Full Pattern */}
          {(diagnosis.quadrant === "the-charmer" ||
            diagnosis.quadrant === "the-full-pattern") && (
            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="mb-12 p-5 rounded-xl border border-accent-gold/30 bg-accent-gold/5"
            >
              <p className="text-text-gray text-sm leading-relaxed">
                <span className="text-accent-gold font-medium">
                  Suggested next step:
                </span>{" "}
                Take the{" "}
                <Link
                  href="/quiz/covert-narcissist"
                  className="text-accent-gold hover:text-accent-gold/80 underline"
                >
                  Covert Narcissist Test
                </Link>
                . The NPI-40 measures grandiose narcissism specifically;
                the Charmer and Full Pattern configurations sometimes
                co-occur with vulnerable / covert narcissism, which the
                HSNS-based companion test reads better.
              </p>
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
                Long-form chapters on the narcissist&rsquo;s interior, written
                by an author with an adjacent diagnosis. Familiar or
                accusatory depending on where in the configuration you
                currently are.
              </p>
            </Link>
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
                The wide map: profiles you across six Cluster B types
                instead of one. Take this if you want to see how your
                narcissism axis sits in the broader personality
                landscape.
              </p>
            </Link>
          </m.div>

          {/* Retake / about */}
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.65 }}
            className="text-center text-sm text-text-gray/70"
          >
            <Link
              href="/quiz/narcissist/take"
              className="hover:text-accent-gold transition-colors"
            >
              Retake the assessment
            </Link>
            <span className="mx-3 text-text-gray/30">·</span>
            <Link
              href="/quiz/narcissist"
              className="hover:text-accent-gold transition-colors"
            >
              About this test
            </Link>
          </m.div>

          {/* Source */}
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.75 }}
            className="mt-8 text-center"
          >
            <p className="text-text-gray/50 text-[11px] leading-relaxed max-w-xl mx-auto">
              Norms calibrated against {NARCISSIST_QUIZ_INFO.basedOn}{" "}
              College and adult-population samples; clinical samples
              score higher.
            </p>
          </m.div>
        </div>
      </main>
    </>
  );
}

// Reusable card components mirroring the Sociopath result layout.

interface SubscaleCardProps {
  icon: LucideIcon;
  iconColor: string;
  iconBg: string;
  name: string;
  short: string;
  rawScore: number;
  minScore: number;
  maxScore: number;
  percentile: number;
  tier: "low" | "average" | "high" | "very-high";
}

function SubscaleCard(props: SubscaleCardProps) {
  const fillPct =
    props.maxScore - props.minScore === 0
      ? 0
      : Math.round(
          ((props.rawScore - props.minScore) /
            (props.maxScore - props.minScore)) *
            100,
        );
  const tierColor = TIER_COLORS[props.tier]!;
  const Icon = props.icon;
  return (
    <div className="p-5 rounded-xl border border-accent-gold/20 bg-deep-black/50">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div
            className={`w-9 h-9 rounded-full flex items-center justify-center ${props.iconBg}`}
          >
            <Icon size={16} className={props.iconColor} />
          </div>
          <div>
            <div className="text-white text-sm font-light">{props.name}</div>
            <div className="text-text-gray/60 text-[10px] uppercase tracking-wider">
              {props.short}
            </div>
          </div>
        </div>
        <span
          className={`px-2 py-0.5 rounded-full text-[10px] uppercase tracking-wider border ${tierColor.text} ${tierColor.bg} ${tierColor.border}`}
        >
          {TIER_LABELS[props.tier]!}
        </span>
      </div>
      <div className="flex items-baseline gap-2 mb-2">
        <span className="text-3xl font-extralight text-white tabular-nums">
          {props.rawScore}
        </span>
        <span className="text-text-gray/60 text-xs">
          / {props.maxScore}
        </span>
        <span className="ml-auto text-text-gray text-xs tabular-nums">
          {props.percentile}th percentile
        </span>
      </div>
      <div className="h-2 bg-white/5 rounded-full overflow-hidden">
        <m.div
          className={`h-full rounded-full ${
            props.tier === "very-high"
              ? "bg-rose-400/70"
              : props.tier === "high"
                ? "bg-amber-400/70"
                : "bg-accent-gold/70"
          }`}
          initial={{ width: 0 }}
          animate={{ width: `${fillPct}%` }}
          transition={{ duration: 0.8, delay: 0.3 }}
        />
      </div>
    </div>
  );
}

interface SubscaleInterpretationProps {
  label: string;
  labelColor: string;
  tierLabel: string;
  meaning: string;
  inLife: string;
}

function SubscaleInterpretation(props: SubscaleInterpretationProps) {
  return (
    <div className="p-5 rounded-xl border border-accent-gold/15 bg-deep-black/40">
      <div className="flex items-center gap-2 mb-2">
        <span className={`text-xs uppercase tracking-wider ${props.labelColor}`}>
          {props.label}
        </span>
        <span className="text-text-gray/40">·</span>
        <span className="text-text-gray text-xs uppercase tracking-wider">
          {props.tierLabel}
        </span>
      </div>
      <p className="text-white text-base font-light mb-2 leading-relaxed">
        {props.meaning}
      </p>
      <p className="text-text-gray text-sm leading-relaxed">{props.inLife}</p>
    </div>
  );
}
