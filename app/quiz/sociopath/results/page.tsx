"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { m } from "framer-motion";
import Link from "next/link";
import Header from "@/components/Header";
import BackgroundEffects from "@/components/BackgroundEffects";
import {
  SociopathDiagnosis,
  SociopathScores,
  QUADRANT_PROFILES,
  getTierInterpretation,
  SOCIOPATH_QUIZ_INFO,
} from "@/lib/quiz-sociopath-data";
import {
  ShieldAlert,
  Snowflake,
  Flame,
  ArrowRight,
  RefreshCw,
  BookOpen,
  Crown,
  type LucideIcon,
} from "lucide-react";

interface StoredResult {
  scores: SociopathScores;
  diagnosis: SociopathDiagnosis;
  answers: Record<number, 1 | 2 | 3 | 4>;
  completedAt: string;
}

// Tier label for the on-bar chip. Mirrors the human-readable bands the
// scoring engine uses: low / average / high / very high.
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

export default function SociopathResultsPage() {
  const router = useRouter();
  const [result, setResult] = useState<StoredResult | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const raw = sessionStorage.getItem("sociopathQuizResults");
    if (!raw) {
      // No result in session, send back to landing. This mirrors the
      // Daughter quiz: we never deep-link a results page that has no
      // session data, the assessment has to have been taken in the
      // current browser session.
      router.replace("/quiz/sociopath");
      return;
    }
    try {
      const parsed = JSON.parse(raw) as StoredResult;
      setResult(parsed);
    } catch {
      router.replace("/quiz/sociopath");
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
  const primaryInterp = getTierInterpretation("primary", diagnosis.primary.tier);
  const secondaryInterp = getTierInterpretation(
    "secondary",
    diagnosis.secondary.tier,
  );

  return (
    <>
      <BackgroundEffects />
      <Header />
      <main className="min-h-screen pt-24 pb-16 relative z-10">
        <div className="container mx-auto px-4 max-w-3xl">
          {/* Disclaimer above-the-fold, same pattern as the landing.
              Visible at the top of the result page so users see the
              educational-only framing before they read the score. */}
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
              The LSRP is a research instrument, not a diagnostic one.
              This result is calibrated against published college-sample
              norms (Levenson 1995, n=487). Only a licensed clinician
              with a full history can diagnose any personality disorder.
            </p>
          </m.div>

          {/* Headline result */}
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

          {/* Two subscale bars, side by side on desktop, stacked on mobile.
              Bar widths reflect raw score within the theoretical range
              (16-64 for Primary, 10-40 for Secondary), so the visual is
              honest about where the score sits, not just relative to
              norms. Percentile chip surfaces the population comparison. */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="grid sm:grid-cols-2 gap-4 mb-12"
          >
            <SubscaleCard
              icon={Snowflake}
              iconColor="text-blue-300"
              iconBg="bg-blue-400/10"
              name="Primary Psychopathy"
              short="Cold core"
              rawScore={diagnosis.primary.rawScore}
              minScore={16}
              maxScore={64}
              percentile={diagnosis.primary.percentile}
              tier={diagnosis.primary.tier}
            />
            <SubscaleCard
              icon={Flame}
              iconColor="text-amber-300"
              iconBg="bg-amber-400/10"
              name="Secondary Psychopathy"
              short="Hot wire"
              rawScore={diagnosis.secondary.rawScore}
              minScore={10}
              maxScore={40}
              percentile={diagnosis.secondary.percentile}
              tier={diagnosis.secondary.tier}
            />
          </m.div>

          {/* Tier-specific subscale interpretations */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="space-y-4 mb-12"
          >
            <SubscaleInterpretation
              label="Primary · Cold core"
              labelColor="text-blue-300"
              tierLabel={TIER_LABELS[diagnosis.primary.tier]!}
              meaning={primaryInterp.meaning}
              inLife={primaryInterp.inLife}
            />
            <SubscaleInterpretation
              label="Secondary · Hot wire"
              labelColor="text-amber-300"
              tierLabel={TIER_LABELS[diagnosis.secondary.tier]!}
              meaning={secondaryInterp.meaning}
              inLife={secondaryInterp.inLife}
            />
          </m.div>

          {/* Combined quadrant profile, the long-form interpretation */}
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

          {/* Consilium nudge, only surfaces for the two configurations
              where the room is actually built for the result. The nudge
              is contextual, not a blanket pitch. */}
          {(diagnosis.quadrant === "the-calculator" ||
            diagnosis.quadrant === "the-full-pattern") && (
            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="mb-12 p-6 rounded-xl border border-accent-gold/40 bg-gradient-to-br from-accent-gold/5 to-deep-black/60"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-accent-gold/15 shrink-0">
                  <Crown size={18} className="text-accent-gold" />
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-light text-lg mb-2">
                    The Consilium is built for this result.
                  </h3>
                  <p className="text-text-gray text-sm leading-relaxed mb-4">
                    A higher concentration of the {profile.name} configuration
                    than the general population, by deliberate design. The room
                    is not safer because it&rsquo;s gentler. It&rsquo;s safer
                    because it&rsquo;s read. $29/month. The first month is
                    typically the most useful.
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

          {/* Related reading + book pitch */}
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
              <BookOpen
                size={18}
                className="text-accent-gold/70 mb-2"
              />
              <div className="text-accent-gold/70 text-[10px] uppercase tracking-[0.2em] mb-1">
                Long form
              </div>
              <h3 className="text-white text-base font-light mb-2 group-hover:text-accent-gold transition-colors">
                The Sociopathic Dating Bible
              </h3>
              <p className="text-text-gray text-sm leading-relaxed">
                70,000 words. The chapters on the predator&rsquo;s interior were
                written by someone who configured similarly to high Primary
                scorers, and they will read as either familiar or accusatory
                depending on where in the pattern you currently are.
              </p>
            </Link>

            <Link
              href="/quiz"
              className="block p-5 bg-deep-black/40 border border-accent-gold/15 rounded-xl hover:border-accent-gold/40 hover:bg-deep-black/60 transition-all group"
            >
              <RefreshCw size={18} className="text-accent-gold/70 mb-2" />
              <div className="text-accent-gold/70 text-[10px] uppercase tracking-[0.2em] mb-1">
                Companion quiz
              </div>
              <h3 className="text-white text-base font-light mb-2 group-hover:text-accent-gold transition-colors">
                The Dark Mirror Assessment
              </h3>
              <p className="text-text-gray text-sm leading-relaxed">
                The wide map: profiles you across six Cluster B types instead
                of one. If the Sociopath Test was the calibrated read on a
                specific axis, the Dark Mirror is the cartography around it.
              </p>
            </Link>
          </m.div>

          {/* Retake / share row */}
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.65 }}
            className="text-center text-sm text-text-gray/70"
          >
            <Link
              href="/quiz/sociopath/take"
              className="hover:text-accent-gold transition-colors"
            >
              Retake the assessment
            </Link>
            <span className="mx-3 text-text-gray/30">·</span>
            <Link
              href="/quiz/sociopath"
              className="hover:text-accent-gold transition-colors"
            >
              About this test
            </Link>
          </m.div>

          {/* Source footnote, keeps the calibration honest */}
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.75 }}
            className="mt-8 text-center"
          >
            <p className="text-text-gray/50 text-[11px] leading-relaxed max-w-xl mx-auto">
              Norms calibrated against {SOCIOPATH_QUIZ_INFO.basedOn}{" "}
              College-sample norms; forensic and clinical samples score
              higher.
            </p>
          </m.div>
        </div>
      </main>
    </>
  );
}

// -----------------------------------------------------------------------
// Subscale card, the bar + score + percentile chip
// -----------------------------------------------------------------------

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
  const fillPct = Math.round(
    ((props.rawScore - props.minScore) / (props.maxScore - props.minScore)) *
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

      {/* Score */}
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

      {/* Bar */}
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

// -----------------------------------------------------------------------
// Subscale interpretation, the two-sentence read under each bar
// -----------------------------------------------------------------------

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
