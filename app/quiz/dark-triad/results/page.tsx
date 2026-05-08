"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { m } from "framer-motion";
import Link from "next/link";
import Header from "@/components/Header";
import BackgroundEffects from "@/components/BackgroundEffects";
import QuizEmailCapture from "@/components/quiz/QuizEmailCapture";
import {
  DarkTriadDiagnosis,
  DarkTriadScores,
  DarkTriadAxis,
  ARCHETYPE_PROFILES,
  AXIS_DISPLAY_LABELS,
  getAxisTierInterpretation,
  DARK_TRIAD_QUIZ_INFO,
} from "@/lib/quiz-dark-triad-data";
import {
  ShieldAlert,
  Crown,
  Snowflake,
  Eye,
  ArrowRight,
  RefreshCw,
  BookOpen,
  type LucideIcon,
} from "lucide-react";

interface StoredResult {
  scores: DarkTriadScores;
  diagnosis: DarkTriadDiagnosis;
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
  low: { text: "text-emerald-300", bg: "bg-emerald-400/10", border: "border-emerald-400/30", bar: "bg-emerald-400/70" },
  average: { text: "text-text-gray", bg: "bg-white/5", border: "border-white/15", bar: "bg-accent-gold/70" },
  high: { text: "text-amber-300", bg: "bg-amber-400/10", border: "border-amber-400/30", bar: "bg-amber-400/70" },
  "very-high": { text: "text-rose-300", bg: "bg-rose-400/10", border: "border-rose-400/30", bar: "bg-rose-400/70" },
};

const AXIS_ICONS: Record<DarkTriadAxis, LucideIcon> = {
  machiavellianism: Eye,
  narcissism: Crown,
  psychopathy: Snowflake,
};

const AXIS_ICON_COLORS: Record<DarkTriadAxis, { text: string; bg: string }> = {
  machiavellianism: { text: "text-indigo-300", bg: "bg-indigo-400/10" },
  narcissism: { text: "text-amber-300", bg: "bg-amber-400/10" },
  psychopathy: { text: "text-blue-300", bg: "bg-blue-400/10" },
};

const AXIS_DEEP_LINKS: Record<DarkTriadAxis, { href: string; label: string }> = {
  machiavellianism: {
    href: "/quiz",
    label: "There is no dedicated Mach instrument here yet; the Dark Mirror covers it as part of the wider personality landscape.",
  },
  narcissism: {
    href: "/quiz/narcissist",
    label: "Take the NPI-40 deeper read on the Narcissism axis →",
  },
  psychopathy: {
    href: "/quiz/sociopath",
    label: "Take the LSRP-based Sociopath Test for the deeper Psychopathy read →",
  },
};

export default function DarkTriadResultsPage() {
  const router = useRouter();
  const [result, setResult] = useState<StoredResult | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const raw = sessionStorage.getItem("darkTriadQuizResults");
    if (!raw) {
      router.replace("/quiz/dark-triad");
      return;
    }
    try {
      const parsed = JSON.parse(raw) as StoredResult;
      setResult(parsed);
    } catch {
      router.replace("/quiz/dark-triad");
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
  const profile = ARCHETYPE_PROFILES[diagnosis.archetype];

  const axisResults = [
    diagnosis.machiavellianism,
    diagnosis.narcissism,
    diagnosis.psychopathy,
  ];

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
              Calibrated against the SD3 reference norms (Jones &amp;
              Paulhus 2014, n=2929). The dark triad is a
              personality-psychology construct, not a DSM diagnosis.
            </p>
          </m.div>

          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-block mb-4 px-4 py-2 border border-accent-gold/30 rounded-full">
              <span className="text-accent-gold text-xs tracking-[0.25em] uppercase">
                Your archetype
              </span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extralight text-white mb-3 tracking-wide">
              {diagnosis.headline}
            </h1>
            <p className="text-lg sm:text-xl text-accent-gold font-light italic">
              {diagnosis.tagline}
            </p>
          </m.div>

          {/* Three axis cards */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="grid sm:grid-cols-3 gap-3 mb-8"
          >
            {axisResults.map((res) => (
              <AxisCard key={res.axis} result={res} />
            ))}
          </m.div>

          {/* Axis tier interpretations */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="space-y-4 mb-12"
          >
            {axisResults.map((res) => {
              const interp = getAxisTierInterpretation(res.axis, res.tier);
              const colors = AXIS_ICON_COLORS[res.axis];
              return (
                <div
                  key={res.axis}
                  className="p-5 rounded-xl border border-accent-gold/15 bg-deep-black/40"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className={`text-xs uppercase tracking-wider ${colors.text}`}
                    >
                      {AXIS_DISPLAY_LABELS[res.axis]}
                    </span>
                    <span className="text-text-gray/40">·</span>
                    <span className="text-text-gray text-xs uppercase tracking-wider">
                      {TIER_LABELS[res.tier]!}
                    </span>
                  </div>
                  <p className="text-white text-base font-light mb-2 leading-relaxed">
                    {interp.meaning}
                  </p>
                  <p className="text-text-gray text-sm leading-relaxed mb-3">
                    {interp.inLife}
                  </p>
                  {(res.tier === "high" || res.tier === "very-high") && (
                    <Link
                      href={AXIS_DEEP_LINKS[res.axis].href}
                      className="text-accent-gold/80 hover:text-accent-gold text-xs underline"
                    >
                      {AXIS_DEEP_LINKS[res.axis].label}
                    </Link>
                  )}
                </div>
              );
            })}
          </m.div>

          {/* Archetype profile */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mb-12 p-6 sm:p-8 rounded-xl border border-accent-gold/25 bg-deep-black/60"
          >
            <div className="text-center mb-6">
              <div className="text-accent-gold text-[10px] tracking-[0.3em] uppercase mb-2">
                Configuration
              </div>
              <h2 className="text-2xl sm:text-3xl font-light text-white mb-2">
                {diagnosis.headline}
              </h2>
              <p className="text-accent-gold/80 italic text-sm">
                {diagnosis.tagline}
              </p>
            </div>

            <div className="space-y-5 text-text-gray text-sm sm:text-[15px] leading-relaxed">
              <p dangerouslySetInnerHTML={{ __html: profile.description }} />
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

          <QuizEmailCapture
            source="dark-triad-quiz"
            tags={[`archetype:${diagnosis.archetype}`]}
            resultLabel={diagnosis.headline}
          />

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
                Long-form chapters on the predator&rsquo;s interior, written
                by an author who configures similarly to the Full Triad
                result.
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
                Six Cluster B types instead of three. Sister to the
                dark triad with broader coverage.
              </p>
            </Link>
          </m.div>

          {(diagnosis.archetype === "full-triad" ||
            diagnosis.highAxes.length >= 2) && (
            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mb-12 p-6 rounded-xl border border-accent-gold/40 bg-gradient-to-br from-accent-gold/5 to-deep-black/60"
            >
              <h3 className="text-white font-light text-lg mb-2">
                The Consilium is built for this configuration.
              </h3>
              <p className="text-text-gray text-sm leading-relaxed mb-4">
                Higher-than-population concentration of users with
                dual-axis or Full-Triad configurations, by deliberate
                design. The room is not safer because it&rsquo;s gentler. It
                is safer because it has been read.
              </p>
              <Link
                href="/consilium"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent-gold/15 hover:bg-accent-gold/25 text-accent-gold border border-accent-gold/40 rounded text-sm tracking-wider uppercase transition-all"
              >
                See the Consilium
                <ArrowRight size={14} />
              </Link>
            </m.div>
          )}

          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.65 }}
            className="text-center text-sm text-text-gray/70"
          >
            <Link
              href="/quiz/dark-triad/take"
              className="hover:text-accent-gold transition-colors"
            >
              Retake the assessment
            </Link>
            <span className="mx-3 text-text-gray/30">·</span>
            <Link
              href="/quiz/dark-triad"
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
              Norms calibrated against {DARK_TRIAD_QUIZ_INFO.basedOn}
            </p>
          </m.div>
        </div>
      </main>
    </>
  );
}

interface AxisCardProps {
  result: { axis: DarkTriadAxis; rawScore: number; percentile: number; tier: "low" | "average" | "high" | "very-high" };
}

function AxisCard({ result }: AxisCardProps) {
  const Icon = AXIS_ICONS[result.axis];
  const colors = AXIS_ICON_COLORS[result.axis];
  const tierColor = TIER_COLORS[result.tier]!;
  const fillPct = Math.round(((result.rawScore - 9) / (45 - 9)) * 100);
  return (
    <div className="p-4 rounded-xl border border-accent-gold/20 bg-deep-black/50">
      <div className="flex items-center justify-between mb-3">
        <div className={`w-9 h-9 rounded-full flex items-center justify-center ${colors.bg}`}>
          <Icon size={16} className={colors.text} />
        </div>
        <span
          className={`px-2 py-0.5 rounded-full text-[10px] uppercase tracking-wider border ${tierColor.text} ${tierColor.bg} ${tierColor.border}`}
        >
          {TIER_LABELS[result.tier]!}
        </span>
      </div>
      <div className="text-white text-sm font-light mb-1">
        {AXIS_DISPLAY_LABELS[result.axis]}
      </div>
      <div className="flex items-baseline gap-2 mb-2">
        <span className="text-2xl font-extralight text-white tabular-nums">
          {result.rawScore}
        </span>
        <span className="text-text-gray/60 text-xs">/ 45</span>
        <span className="ml-auto text-text-gray text-xs tabular-nums">
          {result.percentile}th
        </span>
      </div>
      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
        <m.div
          className={`h-full rounded-full ${tierColor.bar}`}
          initial={{ width: 0 }}
          animate={{ width: `${fillPct}%` }}
          transition={{ duration: 0.8, delay: 0.3 }}
        />
      </div>
    </div>
  );
}
