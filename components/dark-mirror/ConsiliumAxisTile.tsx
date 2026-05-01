"use client";

import { m } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  AXIS_CONSILIUM_TIES,
  type MiniDarkMirrorResult,
} from "@/lib/mini-quiz";

/**
 * Axis-tailored Consilium tile. Surfaces below the clinical card
 * on the Mini Dark Mirror result page. Each of the 6 dominant
 * axes gets a different tile — different headline, different 3
 * bullets naming actual Consilium content relevant to that
 * pattern.
 *
 * Reveal: fades in 1.0s after the radar starts, so it's the last
 * piece of the choreographed reveal — first the visual, then the
 * substance, then the funnel ask.
 */

interface Props {
  result: MiniDarkMirrorResult;
}

export default function ConsiliumAxisTile({ result }: Props) {
  const tie = AXIS_CONSILIUM_TIES[result.dominantType];

  return (
    <m.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.0, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="relative overflow-hidden rounded-2xl border border-warm-gold/35 bg-gradient-to-br from-deep-burgundy/25 via-deep-navy/30 to-deep-black/80 p-7 sm:p-9"
    >
      {/* Premium-tier glow */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(212,175,55,0.10), transparent 65%)",
        }}
      />

      <div className="relative">
        <div className="flex items-baseline justify-between mb-4 gap-4 flex-wrap">
          <p className="text-warm-gold uppercase tracking-[0.3em] text-[10px]">
            The next step
          </p>
          <p className="text-warm-gold text-base font-light tabular-nums">
            $29<span className="text-text-gray/70 text-xs">/mo</span>
          </p>
        </div>

        <h3 className="text-xl sm:text-2xl font-extralight text-text-light tracking-wide mb-5 leading-snug">
          {tie.headline}
        </h3>

        <ul className="space-y-3 mb-7">
          {tie.bullets.map((bullet, i) => (
            <li
              key={i}
              className="text-text-gray/95 font-light text-[14px] sm:text-sm leading-relaxed flex gap-3"
            >
              <span
                aria-hidden
                className="text-warm-gold/70 mt-0.5 flex-shrink-0"
              >
                ◆
              </span>
              <span>{bullet}</span>
            </li>
          ))}
        </ul>

        <Link
          href="/consilium"
          className="inline-flex items-center justify-center gap-2 py-3.5 px-7 rounded-full bg-warm-gold text-deep-black font-medium text-sm tracking-wider uppercase transition-all hover:bg-warm-gold/90 hover:shadow-[0_8px_24px_-4px_rgba(212,175,55,0.45)] active:scale-95"
        >
          {tie.cta}
          <ArrowRight size={16} strokeWidth={1.8} />
        </Link>

        <p className="text-text-gray/55 text-[11px] mt-5 leading-relaxed">
          The book is bundled in. Cancel anytime, one click.
        </p>
      </div>
    </m.div>
  );
}
