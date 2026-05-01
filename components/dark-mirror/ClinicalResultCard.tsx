"use client";

import { m } from "framer-motion";
import {
  AXIS_CLINICAL,
  type MiniDarkMirrorResult,
} from "@/lib/mini-quiz";

/**
 * The clinical synthesis card. Reads like an intake summary, not a
 * Buzzfeed quiz result. Composes primary + secondary axis content
 * so the same six axes generate 30 distinct readable variants
 * across all dominant×secondary pairings.
 *
 * Voice: clinical-detached. Kanika-personal voice lives in the
 * follow-up email instead, keeps the page feeling like a real
 * clinical artifact.
 *
 * Animated reveal: card fades in 200ms after the radar starts
 * drawing, so the visual hits first and the reading lands when
 * the radar polygon is mostly resolved.
 */

interface Props {
  result: MiniDarkMirrorResult;
}

export default function ClinicalResultCard({ result }: Props) {
  const primaryClinical = AXIS_CLINICAL[result.dominantType];
  const secondaryClinical = AXIS_CLINICAL[result.secondaryType];

  return (
    <m.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="bg-gradient-to-br from-deep-burgundy/10 to-deep-navy/15 backdrop-blur-sm border border-warm-gold/20 rounded-2xl p-7 sm:p-9"
    >
      {/* Eyebrow */}
      <div className="flex items-center justify-between mb-5">
        <p className="text-warm-gold/70 text-[10px] uppercase tracking-[0.35em]">
          Your dominant axis
        </p>
        <p className="text-text-gray/55 text-[10px] uppercase tracking-[0.25em] hidden sm:block">
          Clinical synthesis
        </p>
      </div>

      {/* Archetype name + DSM label */}
      <div className="mb-7">
        <h2
          className="text-3xl sm:text-4xl md:text-5xl font-extralight tracking-wider uppercase leading-tight mb-2"
          style={{
            background:
              "linear-gradient(135deg, #f3d98a 0%, #d4af37 50%, #9c7a1f 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          {result.dominantName}
        </h2>
        <p className="text-warm-gold/85 italic text-sm sm:text-base font-light mb-3">
          {result.dominantTagline}
        </p>
        <p className="text-text-gray/60 text-[11px] sm:text-xs uppercase tracking-[0.18em] font-light">
          {result.dominantDsmLabel}
        </p>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-warm-gold/25 to-transparent mb-7" />

      {/* Primary clinical paragraph */}
      <p className="text-text-light/95 font-light leading-[1.85] text-[15px] sm:text-base mb-9">
        {primaryClinical.primarySynthesis}
      </p>

      {/* Secondary axis */}
      <div className="bg-deep-black/30 border-l-2 border-warm-gold/40 pl-5 py-4 rounded-r-md">
        <div className="flex items-baseline gap-3 mb-2 flex-wrap">
          <p className="text-warm-gold/70 text-[10px] uppercase tracking-[0.3em]">
            Secondary axis
          </p>
          <p className="text-warm-gold text-base font-light tracking-wide">
            {result.secondaryName}
          </p>
        </div>
        <p className="text-text-gray/90 font-light leading-[1.8] text-sm">
          {secondaryClinical.secondaryNote}
        </p>
      </div>
    </m.div>
  );
}
