import { Fraunces } from "next/font/google";

/**
 * KanikaroseLogo, the primary brand mark for kanikarose.com.
 *
 * Design V2 (chosen 2026-07-29, concept 14 of the logo gallery):
 *   KANIKAROSE as a single word, thin serif, wide tracking, fading from
 *   bone into rose gold across the word. No icon, no divider: the name
 *   is the mark, and the colour shift does the reading for you.
 *
 * Replaces the V1 constellation lockup.
 *
 * - `size` scales the wordmark: sm/md/lg/xl.
 * - `iconOnly` renders a tight "KR" monogram in rose metal, for spaces
 *   too narrow for ten letters.
 * - `animate` sweeps a slow metallic sheen across the word, for loading
 *   states. Pure CSS, no JS.
 * - `fullName` is kept for compatibility; the wordmark already is the
 *   full name, so it changes nothing.
 */

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["300", "500"],
  display: "swap",
});

interface KanikaroseLogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  /** When true, renders the "KR" monogram instead of the full wordmark. */
  iconOnly?: boolean;
  /** Enables the slow metallic sheen sweep. For loading screens. */
  animate?: boolean;
  /** Kept for compatibility; the wordmark is already the full name. */
  fullName?: boolean;
  className?: string;
}

const SIZES = {
  sm: { wordmark: 13, monogram: 17, tracking: "0.24em" },
  md: { wordmark: 16, monogram: 21, tracking: "0.27em" },
  lg: { wordmark: 22, monogram: 28, tracking: "0.29em" },
  xl: { wordmark: 30, monogram: 38, tracking: "0.31em" },
} as const;

/* Bone into rose gold, left to right. The word starts as ink on the
   page and ends as metal. */
const SWEEP =
  "linear-gradient(90deg, #e7ddd3 0%, #e7ddd3 42%, #eec9bd 64%, #b76e79 100%)";

/* Rose gold as a worn metal, for the monogram. */
const ROSE_METAL =
  "linear-gradient(135deg, #8e4a56 0%, #b76e79 38%, #eec9bd 52%, #b76e79 66%, #8e4a56 100%)";

export default function KanikaroseLogo({
  size = "md",
  iconOnly = false,
  animate = false,
  fullName: _fullName = false,
  className = "",
}: KanikaroseLogoProps) {
  const s = SIZES[size];

  return (
    <span
      className={`inline-flex items-center ${className}`}
      aria-label="Kanikarose"
    >
      {animate && (
        <style>{`
          @keyframes kr-sheen {
            0%   { background-position: 0% 50%; }
            50%  { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          .kr-sheen {
            background-size: 200% 100%;
            animation: kr-sheen 3.2s ease-in-out infinite;
          }
        `}</style>
      )}

      <span
        className={`${fraunces.className} whitespace-nowrap ${animate ? "kr-sheen" : ""}`}
        style={{
          fontSize: iconOnly ? s.monogram : s.wordmark,
          fontWeight: iconOnly ? 500 : 300,
          letterSpacing: iconOnly ? "-0.03em" : s.tracking,
          textTransform: "uppercase",
          lineHeight: 1,
          backgroundImage: iconOnly ? ROSE_METAL : SWEEP,
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          color: "transparent",
        }}
      >
        {iconOnly ? "KR" : "Kanikarose"}
      </span>
    </span>
  );
}
