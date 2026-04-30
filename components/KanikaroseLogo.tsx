/**
 * KanikaroseLogo, the primary brand mark for kanikarose.com.
 *
 * Design V1 (approved 2026-04-16):
 *   [dense star-field constellation]  |  KANIKAROSE
 *           (gold gradient)           (white)    (gold sans-serif uppercase)
 *
 * Replaces the earlier DoubleEchoLogo "KB" box used everywhere except
 * the Inner Circle area (which keeps its own ConsiliumSeal mark).
 *
 * - `size` scales the whole lockup: sm/md/lg/xl.
 * - `iconOnly` drops the divider + wordmark (for favicons, tight spaces).
 * - `animate` enables staggered star twinkle, for loading states.
 *
 * The animation is pure CSS keyframes on individual SVG circles —
 * zero JS, GPU-accelerated via opacity/transform. Safe to render in
 * server components; the inline <style> block travels with the HTML.
 */

interface KanikaroseLogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  /** When true, renders just the constellation icon with no divider or wordmark. */
  iconOnly?: boolean;
  /** Enables staggered star-twinkle animation. For loading screens. */
  animate?: boolean;
  /**
   * When true, the wordmark renders as the full "KANIKAROSE" word
   * instead of the "KR" monogram. Used in the footer so the footer
   * brand doesn't duplicate the fixed-header "KR" visible above it.
   */
  fullName?: boolean;
  className?: string;
}

// Size table, icon diameter, wordmark font-size, divider height, gap.
const SIZES = {
  sm: { icon: 28, wordmark: 12, divider: 22, gap: 8, wmLetterSpacing: "0.22em" },
  md: { icon: 40, wordmark: 16, divider: 30, gap: 12, wmLetterSpacing: "0.24em" },
  lg: { icon: 52, wordmark: 22, divider: 40, gap: 14, wmLetterSpacing: "0.26em" },
  xl: { icon: 72, wordmark: 30, divider: 54, gap: 18, wmLetterSpacing: "0.28em" },
} as const;

// The 12 stars of the dense field. [x, y, radius]. The two "bright anchors"
// are the larger ones at index 1 and 7. Those are what the eye locks onto.
const STARS: Array<[number, number, number]> = [
  [22, 18, 1.2],
  [44, 26, 2.5], // bright anchor
  [70, 15, 1.4],
  [82, 32, 1.0],
  [56, 44, 1.6],
  [28, 48, 1.2],
  [14, 62, 1.0],
  [38, 68, 2.4], // bright anchor
  [62, 62, 1.3],
  [80, 74, 1.1],
  [50, 86, 1.6],
  [72, 50, 0.9],
];

// Lines connecting the constellation. Pairs of star indices.
const LINES: Array<[number, number]> = [
  [1, 4],
  [4, 7],
  [7, 10],
  [4, 5],
  [4, 8],
];

export default function KanikaroseLogo({
  size = "md",
  iconOnly = false,
  animate = false,
  fullName = false,
  className = "",
}: KanikaroseLogoProps) {
  const s = SIZES[size];

  return (
    <span
      className={`inline-flex items-center ${className}`}
      style={{ gap: s.gap }}
      aria-label="Kanikarose"
    >
      {/* Animation keyframes, inlined so the component is self-contained
          and works in server components. Scoped via a unique class prefix. */}
      {animate && (
        <style>{`
          @keyframes kr-twinkle {
            0%, 100% { opacity: 0.95; transform: scale(1); }
            50%      { opacity: 0.3;  transform: scale(0.85); }
          }
          .kr-star {
            transform-origin: center;
            transform-box: fill-box;
            animation: kr-twinkle 2.6s ease-in-out infinite;
          }
        `}</style>
      )}

      {/* Constellation icon */}
      <svg
        width={s.icon}
        height={s.icon}
        viewBox="0 0 100 100"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={`kr-gold-${size}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#f3d98a" />
            <stop offset="50%" stopColor="#d4af37" />
            <stop offset="100%" stopColor="#9c7a1f" />
          </linearGradient>
        </defs>

        {/* Connecting lines, dim so the stars lead */}
        <g
          stroke={`url(#kr-gold-${size})`}
          strokeWidth="0.7"
          opacity="0.35"
        >
          {LINES.map(([a, b], i) => (
            <line
              key={i}
              x1={STARS[a][0]}
              y1={STARS[a][1]}
              x2={STARS[b][0]}
              y2={STARS[b][1]}
            />
          ))}
        </g>

        {/* Stars, twinkle with staggered delays when animated */}
        <g fill={`url(#kr-gold-${size})`}>
          {STARS.map(([x, y, r], i) => (
            <circle
              key={i}
              cx={x}
              cy={y}
              r={r}
              opacity="0.95"
              className={animate ? "kr-star" : undefined}
              style={
                animate
                  ? { animationDelay: `${(i * 0.21).toFixed(2)}s` }
                  : undefined
              }
            />
          ))}
        </g>
      </svg>

      {/* Divider + wordmark, suppressed in iconOnly mode */}
      {!iconOnly && (
        <>
          <span
            aria-hidden="true"
            style={{
              display: "inline-block",
              width: 1,
              height: s.divider,
              background:
                "linear-gradient(180deg, transparent 0%, #f0eadf 25%, #f0eadf 75%, transparent 100%)",
              opacity: 0.7,
              flexShrink: 0,
            }}
          />
          <span
            className="whitespace-nowrap"
            style={{
              fontFamily: "Inter, 'Helvetica Neue', Arial, sans-serif",
              // Full wordmark is longer; drop a size step so
              // "KANIKAROSE" doesn't overpower the constellation at
              // the same icon size.
              fontSize: fullName ? Math.round(s.wordmark * 0.85) : s.wordmark,
              fontWeight: 500,
              letterSpacing: s.wmLetterSpacing,
              textTransform: "uppercase",
              color: "#d4af37",
              lineHeight: 1,
            }}
          >
            {fullName ? "Kanikarose" : "KR"}
          </span>
        </>
      )}
    </span>
  );
}
