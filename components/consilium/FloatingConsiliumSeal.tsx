"use client";

import { m } from "framer-motion";
import ConsiliumSeal from "@/components/ConsiliumSeal";

/**
 * The Consilium's section-anchor object — same role as the floating 3D
 * book on `BookShowcase`. Wraps the static `ConsiliumSeal` medallion in
 * four layered animations so the brand mark feels alive and clearly
 * defines a section as a Consilium pitch:
 *
 *   1. Outer pulsing halo  — radial warm-gold glow, scale 1↔1.08, 6s loop
 *   2. Inner dashed ring   — slow forward rotation, 60s/revolution
 *   3. Outer ring + orbital cardinal-point gold dots — counter-rotating,
 *      90s/revolution. Two opposed rings = orbital without busy.
 *   4. Levitation wrap      — gentle vertical bob, 4.5s loop
 *
 * Used both on the homepage ConsiliumOverview block and the /consilium
 * landing hero, with size and label configurable per surface so each
 * page can pitch the seal at the appropriate weight.
 */
type Props = {
  /**
   * Frame size of the wrapping circle (the orbital rings + halo extents).
   * Tailwind size classes — pass the same value for both sm and base
   * breakpoints if no responsive change is needed.
   */
  frameSize?: string;
  /** Inner seal size — overrides ConsiliumSeal's default size buckets. */
  sealSize?: string;
  /** Optional small uppercase label below the seal. */
  label?: string;
};

export default function FloatingConsiliumSeal({
  frameSize = "w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96",
  sealSize = "!w-44 !h-44 sm:!w-56 sm:!h-56",
  label,
}: Props) {
  return (
    <div
      className={`relative ${frameSize} mx-auto flex items-center justify-center`}
    >
      {/* Outer pulsing halo */}
      <m.div
        aria-hidden
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(212,175,55,0.32) 0%, rgba(212,175,55,0.12) 38%, rgba(212,175,55,0) 70%)",
          filter: "blur(8px)",
        }}
        animate={{ scale: [1, 1.08, 1], opacity: [0.7, 1, 0.7] }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Slow inner rotation ring — dashed gold hairline */}
      <m.div
        aria-hidden
        className="absolute inset-6 rounded-full border border-warm-gold/15"
        style={{ borderStyle: "dashed", borderWidth: "1px" }}
        animate={{ rotate: 360 }}
        transition={{
          duration: 60,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Counter-rotating outer ring with cardinal-point dots */}
      <m.div
        aria-hidden
        className="absolute inset-0 rounded-full border border-warm-gold/10"
        animate={{ rotate: -360 }}
        transition={{
          duration: 90,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-warm-gold shadow-[0_0_8px_rgba(212,175,55,0.8)]" />
        <span className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2 w-1.5 h-1.5 rounded-full bg-warm-gold/80 shadow-[0_0_8px_rgba(212,175,55,0.6)]" />
        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-1.5 h-1.5 rounded-full bg-warm-gold shadow-[0_0_8px_rgba(212,175,55,0.8)]" />
        <span className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-warm-gold/80 shadow-[0_0_8px_rgba(212,175,55,0.6)]" />
      </m.div>

      {/* Seal with gentle levitation */}
      <m.div
        animate={{ y: [0, -6, 0] }}
        transition={{
          duration: 4.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="relative z-10"
      >
        <ConsiliumSeal size="xl" className={sealSize} />
      </m.div>

      {label && (
        <p className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-warm-gold/80 text-[10px] sm:text-xs uppercase tracking-[0.4em] font-light whitespace-nowrap">
          {label}
        </p>
      )}
    </div>
  );
}
