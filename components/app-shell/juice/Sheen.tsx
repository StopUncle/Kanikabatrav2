"use client";

/**
 * A specular band that sweeps once across a card, the way light crosses foil.
 *
 * Softness comes from the gradient stops, never from `filter: blur()`, which
 * is the single most reliable way to drop frames on a mid-range phone. The
 * band itself only ever moves on `transform`.
 *
 * The parent must be `relative overflow-hidden`, otherwise the band escapes
 * its card and sweeps the whole column. For `trigger="hover"` the parent also
 * needs Tailwind's `group` class.
 */

export interface SheenProps {
  /** "once" sweeps on mount, "hover" sweeps on parent hover. Default "once". */
  trigger?: "once" | "hover";
  /** Hold before the mount sweep, for staggering a stack of cards. */
  delayMs?: number;
  className?: string;
}

const BAND =
  "linear-gradient(105deg, transparent 20%, rgba(236,231,222,0.09) 45%, rgba(212,175,55,0.16) 50%, rgba(236,231,222,0.09) 55%, transparent 80%)";

export default function Sheen({
  trigger = "once",
  delayMs = 0,
  className = "",
}: SheenProps) {
  if (trigger === "hover") {
    return (
      <span
        aria-hidden
        className={`pointer-events-none absolute inset-y-0 -left-full w-[200%] -translate-x-1/2 transition-transform duration-[900ms] ease-out group-hover:translate-x-full ${className}`}
        style={{ backgroundImage: BAND }}
      />
    );
  }

  return (
    <span
      aria-hidden
      className={`app-sheen pointer-events-none absolute inset-y-0 -left-full w-[200%] ${className}`}
      style={{ backgroundImage: BAND, animationDelay: `${delayMs}ms` }}
    />
  );
}
