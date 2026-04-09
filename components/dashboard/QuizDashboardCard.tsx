"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Loader2, ArrowRight, Lock, ChevronDown, ChevronUp } from "lucide-react";
import { PERSONALITY_PROFILES, type PersonalityType } from "@/lib/quiz-data";

interface QuizPreview {
  primaryType: string;
  secondaryType: string;
  completedAt: string;
}

interface QuizFullResult {
  primaryType: string;
  secondaryType: string;
  scores: Record<string, number>;
  completedAt: string;
}

interface QuizApiResponse {
  unlocked: boolean;
  preview?: QuizPreview;
  result?: QuizFullResult;
}

const SCORE_AXES: { key: PersonalityType; label: string }[] = [
  { key: "psychopathic", label: "Psychopathic" },
  { key: "sociopathic", label: "Sociopathic" },
  { key: "narcissistic", label: "Narcissistic" },
  { key: "borderline", label: "Borderline" },
  { key: "histrionic", label: "Histrionic" },
  { key: "neurotypical", label: "Neurotypical" },
];

function formatType(type: string): string {
  return type.charAt(0).toUpperCase() + type.slice(1);
}

function isPersonalityType(value: string): value is PersonalityType {
  return value in PERSONALITY_PROFILES;
}

// Build a radar (hexagon) chart inline so we don't pull in a heavy chart lib.
// All 6 axes are normalised against the highest score in the set so the shape
// is readable even when raw scores cluster low.
function RadarChart({
  scores,
  primaryType,
}: {
  scores: Record<string, number>;
  primaryType: string;
}) {
  const size = 220;
  const center = size / 2;
  const radius = 80;
  const levels = 4;

  const maxScore = Math.max(
    ...SCORE_AXES.map((axis) => scores[axis.key] ?? 0),
    1,
  );

  const points = SCORE_AXES.map((axis, i) => {
    const angle = (Math.PI * 2 * i) / SCORE_AXES.length - Math.PI / 2;
    const value = (scores[axis.key] ?? 0) / maxScore;
    const x = center + Math.cos(angle) * radius * value;
    const y = center + Math.sin(angle) * radius * value;
    return { x, y, axis, angle, value };
  });

  const polygonPoints = points.map((p) => `${p.x},${p.y}`).join(" ");

  // Background concentric polygons (the grid)
  const gridPolygons = Array.from({ length: levels }, (_, level) => {
    const r = (radius * (level + 1)) / levels;
    return SCORE_AXES.map((_, i) => {
      const angle = (Math.PI * 2 * i) / SCORE_AXES.length - Math.PI / 2;
      return `${center + Math.cos(angle) * r},${center + Math.sin(angle) * r}`;
    }).join(" ");
  });

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      className="w-full max-w-[260px] mx-auto"
      role="img"
      aria-label={`Radar chart of personality scores, primary type ${primaryType}`}
    >
      {/* Grid */}
      {gridPolygons.map((pts, i) => (
        <polygon
          key={`grid-${i}`}
          points={pts}
          fill="none"
          stroke="#d4af37"
          strokeOpacity={0.12}
          strokeWidth={1}
        />
      ))}

      {/* Axis lines */}
      {SCORE_AXES.map((_, i) => {
        const angle = (Math.PI * 2 * i) / SCORE_AXES.length - Math.PI / 2;
        const x = center + Math.cos(angle) * radius;
        const y = center + Math.sin(angle) * radius;
        return (
          <line
            key={`axis-${i}`}
            x1={center}
            y1={center}
            x2={x}
            y2={y}
            stroke="#d4af37"
            strokeOpacity={0.15}
            strokeWidth={1}
          />
        );
      })}

      {/* Score polygon */}
      <polygon
        points={polygonPoints}
        fill="#d4af37"
        fillOpacity={0.25}
        stroke="#d4af37"
        strokeWidth={1.5}
      />

      {/* Score dots */}
      {points.map((p, i) => (
        <circle
          key={`dot-${i}`}
          cx={p.x}
          cy={p.y}
          r={3}
          fill="#d4af37"
        />
      ))}

      {/* Axis labels */}
      {SCORE_AXES.map((axis, i) => {
        const angle = (Math.PI * 2 * i) / SCORE_AXES.length - Math.PI / 2;
        const labelRadius = radius + 18;
        const x = center + Math.cos(angle) * labelRadius;
        const y = center + Math.sin(angle) * labelRadius;
        const isPrimary = axis.key === primaryType;
        return (
          <text
            key={`label-${i}`}
            x={x}
            y={y}
            fontSize={9}
            fill={isPrimary ? "#d4af37" : "#94a3b8"}
            fontWeight={isPrimary ? 700 : 400}
            textAnchor="middle"
            dominantBaseline="middle"
            style={{ textTransform: "uppercase", letterSpacing: "0.5px" }}
          >
            {axis.label}
          </text>
        );
      })}
    </svg>
  );
}

function ScoreBars({
  scores,
  primaryType,
}: {
  scores: Record<string, number>;
  primaryType: string;
}) {
  const total =
    SCORE_AXES.reduce((sum, axis) => sum + (scores[axis.key] ?? 0), 0) || 1;

  // Sort highest first so the dominant traits read top-to-bottom
  const sorted = [...SCORE_AXES].sort(
    (a, b) => (scores[b.key] ?? 0) - (scores[a.key] ?? 0),
  );

  return (
    <div className="space-y-2.5">
      {sorted.map((axis) => {
        const score = scores[axis.key] ?? 0;
        const pct = Math.round((score / total) * 100);
        const isPrimary = axis.key === primaryType;
        return (
          <div key={axis.key}>
            <div className="flex justify-between items-baseline mb-1">
              <span
                className={`text-xs uppercase tracking-wider ${isPrimary ? "text-accent-gold font-semibold" : "text-text-gray"}`}
              >
                {axis.label}
              </span>
              <span
                className={`text-xs tabular-nums ${isPrimary ? "text-accent-gold" : "text-text-gray"}`}
              >
                {pct}%
              </span>
            </div>
            <div className="h-1 bg-white/5 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${isPrimary ? "bg-accent-gold" : "bg-accent-gold/40"}`}
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function QuizDashboardCard() {
  const [data, setData] = useState<QuizApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    fetch("/api/quiz/my-results")
      .then((res) => {
        if (res.status === 404) return null;
        return res.json();
      })
      .then((result) => setData(result))
      .catch(() => null)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <Loader2 className="w-6 h-6 text-accent-gold animate-spin" />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="text-center py-8">
        <p className="text-text-gray mb-4">
          Discover which personality type drives your behavior.
        </p>
        <Link
          href="/quiz"
          className="inline-flex items-center gap-2 px-6 py-2 bg-accent-gold text-deep-black rounded-full font-medium hover:bg-accent-gold/90 transition-all"
        >
          Take The Assessment
          <ArrowRight size={16} />
        </Link>
      </div>
    );
  }

  // Locked state — show primary type tease + unlock CTA
  if (!data.unlocked) {
    const preview = data.preview;
    return (
      <div className="text-center py-6">
        <p className="text-accent-gold text-xs uppercase tracking-wider mb-1">
          Your Primary Type
        </p>
        <p className="text-text-light text-2xl font-extralight tracking-wider uppercase mb-4">
          {preview ? formatType(preview.primaryType) : "Unknown"}
        </p>
        <div className="flex items-center justify-center gap-2 text-text-gray text-sm mb-4">
          <Lock size={14} />
          <span>Full results locked</span>
        </div>
        <Link
          href="/quiz/results"
          className="inline-flex items-center gap-2 px-6 py-2 bg-accent-gold/10 text-accent-gold border border-accent-gold/20 rounded-full text-sm hover:bg-accent-gold/20 transition-all"
        >
          Unlock Full Profile
          <ArrowRight size={14} />
        </Link>
      </div>
    );
  }

  const result = data.result;
  if (!result) {
    return (
      <div className="text-center py-6">
        <p className="text-text-gray text-sm">No quiz results found.</p>
      </div>
    );
  }

  const primaryProfile = isPersonalityType(result.primaryType)
    ? PERSONALITY_PROFILES[result.primaryType]
    : null;

  return (
    <div className="py-2">
      {/* Header — primary type with name + tagline */}
      <div className="text-center mb-5">
        <p className="text-accent-gold text-xs uppercase tracking-[0.2em] mb-1">
          Your Primary Type
        </p>
        <p className="text-text-light text-2xl font-extralight tracking-wider uppercase">
          {primaryProfile?.name || formatType(result.primaryType)}
        </p>
        {primaryProfile?.tagline && (
          <p className="text-accent-gold/70 text-xs italic mt-1 tracking-wide">
            {primaryProfile.tagline}
          </p>
        )}
        {result.secondaryType && (
          <p className="text-text-gray text-[11px] mt-2 uppercase tracking-wider">
            Secondary: {formatType(result.secondaryType)}
          </p>
        )}
      </div>

      {/* Radar chart */}
      <div className="mb-5">
        <RadarChart scores={result.scores} primaryType={result.primaryType} />
      </div>

      {/* Expand toggle */}
      <button
        onClick={() => setExpanded((v) => !v)}
        className="w-full flex items-center justify-center gap-1.5 text-accent-gold/80 hover:text-accent-gold text-xs uppercase tracking-wider py-2 transition-colors"
      >
        {expanded ? "Hide" : "Show"} Score Breakdown
        {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
      </button>

      {/* Expanded breakdown */}
      {expanded && (
        <div className="mt-3 pt-4 border-t border-white/5 space-y-4">
          <ScoreBars scores={result.scores} primaryType={result.primaryType} />

          {primaryProfile?.description && (
            <div className="pt-3 border-t border-white/5">
              <p className="text-accent-gold text-[10px] uppercase tracking-wider mb-1.5">
                Profile Summary
              </p>
              <p className="text-text-gray text-xs leading-relaxed">
                {primaryProfile.description}
              </p>
            </div>
          )}
        </div>
      )}

      <div className="mt-4 text-center">
        <Link
          href="/quiz/results"
          className="inline-flex items-center gap-2 text-accent-gold text-xs hover:underline uppercase tracking-wider"
        >
          View Full Profile
          <ArrowRight size={12} />
        </Link>
      </div>
    </div>
  );
}
