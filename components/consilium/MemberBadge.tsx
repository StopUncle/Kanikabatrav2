"use client";

/**
 * MemberBadge — the 12-tier tenure badge for Consilium members.
 *
 * Members earn a new tier every month they stay active, capped at
 * tier 12 (Queen) after a full year. Tenure is calculated from the
 * CommunityMembership.activatedAt timestamp — see `tierFromMonths()`
 * in `./badge-tiers` for the mapping.
 *
 * Design language: all badges share the same core structure (circular
 * metal seal with concentric rings + Roman numeral at centre), and
 * decorative elements accrue as the tier climbs. Early tiers read
 * austere; the Queen is fully ornate.
 *
 *   1–2   rings only
 *   3–4   + four cardinal dots
 *   5–6   + laurel sprigs flanking the seal
 *   7–8   + eight gemstones around the main ring
 *   9–10  + double outer ring + corner flourishes
 *   11    + small crown above the seal
 *   12    + full queen crown + radiant rays behind
 *
 * Metal tone progresses bronze -> copper -> silver -> gold -> rose
 * gold -> radiant. Each tier's gradient is tuned to read distinct
 * from the one before it.
 *
 * Pure data + tenure math lives in ./badge-tiers (no "use client")
 * so server components can import tierFromMonths / monthsSince /
 * getBadge without tripping the RSC boundary.
 */

import { METALS, getBadge } from "./badge-tiers";

// Re-export so existing callers that did `import { BADGE_TIERS } from
// "@/components/consilium/MemberBadge"` keep working. New server-side
// callers should import from ./badge-tiers directly.
export {
  BADGE_TIERS,
  getBadge,
  tierFromMonths,
  monthsSince,
  daysToNextTier,
} from "./badge-tiers";
export type { BadgeTier, MetalKey } from "./badge-tiers";

// ---------------------------------------------------------------------------
// Rendering
// ---------------------------------------------------------------------------

const SIZE_MAP = {
  sm: 64,
  md: 96,
  lg: 128,
  xl: 176,
} as const;

interface MemberBadgeProps {
  tier: number; // 1..12
  size?: keyof typeof SIZE_MAP;
  className?: string;
  /** Show tier name + Roman numeral below the mark. */
  showLabel?: boolean;
}

export default function MemberBadge({
  tier,
  size = "md",
  className = "",
  showLabel = false,
}: MemberBadgeProps) {
  const badge = getBadge(tier);
  const metal = METALS[badge.metal];
  const d = SIZE_MAP[size];
  const isQueen = tier === 12;

  // Feature flags — drives progressive complexity
  const showCardinals = tier >= 3;
  const showLaurels = tier >= 5;
  const showGems = tier >= 7;
  const showOuterFlourish = tier >= 9;
  const showSmallCrown = tier === 11;
  const showQueenCrown = tier === 12;

  // Unique gradient ids per tier so multiple badges can render on the
  // same page without clobbering each other's <defs>.
  const gradId = `mb-metal-${tier}`;
  const haloId = `mb-halo-${tier}`;
  const crownId = `mb-crown-${tier}`;

  return (
    <figure className={`inline-flex flex-col items-center gap-2 ${className}`}>
      <svg
        width={d}
        height={d}
        viewBox="0 0 120 120"
        aria-label={`${badge.name} badge — ${badge.monthLabel}`}
      >
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={metal.light} />
            <stop offset="45%" stopColor={metal.mid} />
            <stop offset="100%" stopColor={metal.dark} />
          </linearGradient>
          <radialGradient id={haloId} cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor={metal.halo} stopOpacity="0.45" />
            <stop offset="55%" stopColor={metal.halo} stopOpacity="0.1" />
            <stop offset="100%" stopColor={metal.halo} stopOpacity="0" />
          </radialGradient>
          <linearGradient id={crownId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={metal.light} />
            <stop offset="100%" stopColor={metal.mid} />
          </linearGradient>
        </defs>

        {/* Halo */}
        <circle cx="60" cy="60" r="58" fill={`url(#${haloId})`} />

        {/* Queen-only radiant rays behind the seal */}
        {isQueen && <RadiantRays fill={metal.halo} />}

        {/* Double outer ring for tiers 9+ */}
        {showOuterFlourish && (
          <>
            <circle
              cx="60"
              cy="60"
              r="56"
              fill="none"
              stroke={`url(#${gradId})`}
              strokeWidth="0.6"
              opacity="0.55"
            />
            <CornerFlourishes fill={`url(#${gradId})`} />
          </>
        )}

        {/* Outer hairline ring */}
        <circle
          cx="60"
          cy="60"
          r="52"
          fill="none"
          stroke={`url(#${gradId})`}
          strokeWidth="0.7"
          opacity="0.55"
        />

        {/* Main ring */}
        <circle
          cx="60"
          cy="60"
          r="48"
          fill="none"
          stroke={`url(#${gradId})`}
          strokeWidth="2"
        />

        {/* Inner ring */}
        <circle
          cx="60"
          cy="60"
          r="42"
          fill="none"
          stroke={`url(#${gradId})`}
          strokeWidth="0.5"
          opacity="0.45"
        />

        {/* Four cardinal dots */}
        {showCardinals && (
          <g fill={`url(#${gradId})`}>
            <circle cx="60" cy="8" r="1.6" />
            <circle cx="112" cy="60" r="1.6" />
            <circle cx="60" cy="112" r="1.6" />
            <circle cx="8" cy="60" r="1.6" />
          </g>
        )}

        {/* Laurel sprigs flanking the seal */}
        {showLaurels && <LaurelSprigs stroke={`url(#${gradId})`} />}

        {/* Eight gemstone dots around the main ring */}
        {showGems && <Gemstones fill={`url(#${gradId})`} />}

        {/* Small crown above (tier 11) */}
        {showSmallCrown && <SmallCrown fill={`url(#${crownId})`} />}

        {/* Queen crown (tier 12) */}
        {showQueenCrown && (
          <QueenCrown fill={`url(#${crownId})`} jewelFill={metal.halo} />
        )}

        {/* Roman numeral */}
        <text
          x="60"
          y="60"
          textAnchor="middle"
          dominantBaseline="central"
          fill={`url(#${gradId})`}
          fontFamily="Didot, 'Bodoni MT', 'Playfair Display', Georgia, 'Times New Roman', serif"
          fontWeight="500"
          fontSize={numeralSize(badge.numeral)}
          style={{ fontStyle: "normal" }}
        >
          {badge.numeral}
        </text>
      </svg>

      {showLabel && (
        <figcaption className="text-center">
          <p className="text-[10px] uppercase tracking-[0.25em] text-text-gray/60">
            {badge.monthLabel}
          </p>
          <p className="text-base font-light tracking-[0.18em] uppercase text-warm-gold mt-0.5">
            {badge.name}
          </p>
        </figcaption>
      )}
    </figure>
  );
}

// Roman numerals get narrower as they get longer — shrink VIII/XII so
// they don't overflow the seal.
function numeralSize(numeral: string): number {
  if (numeral.length >= 4) return 28; // VIII
  if (numeral.length === 3) return 32; // III, VII, XII
  if (numeral.length === 2) return 38; // II, IV, VI, IX, XI
  return 46; // I, V, X
}

// ---------------------------------------------------------------------------
// Decoration pieces
// ---------------------------------------------------------------------------

function LaurelSprigs({ stroke }: { stroke: string }) {
  // Two mirrored laurel sprigs on the left/right. Each sprig is a stem
  // with three leaf-curves. Coordinates hand-tuned so the sprigs hug
  // the main ring at radius 48 without overlapping the numeral.
  return (
    <g fill="none" stroke={stroke} strokeWidth="1" strokeLinecap="round" opacity="0.85">
      {/* Left sprig */}
      <path d="M 16 62 Q 10 52 16 42" />
      <path d="M 16 50 Q 8 48 6 52" />
      <path d="M 15 56 Q 6 58 6 63" />
      <path d="M 17 46 Q 10 42 10 38" />
      {/* Right sprig (mirror) */}
      <path d="M 104 62 Q 110 52 104 42" />
      <path d="M 104 50 Q 112 48 114 52" />
      <path d="M 105 56 Q 114 58 114 63" />
      <path d="M 103 46 Q 110 42 110 38" />
    </g>
  );
}

function Gemstones({ fill }: { fill: string }) {
  // Eight gemstones at 22.5° offsets around the main ring at radius 48.
  // Offset from cardinal so they don't collide with cardinal dots.
  const points: Array<[number, number]> = [];
  for (let i = 0; i < 8; i++) {
    const angle = (i * Math.PI) / 4 + Math.PI / 8; // 22.5° offset
    points.push([60 + Math.cos(angle) * 48, 60 + Math.sin(angle) * 48]);
  }
  return (
    <g fill={fill}>
      {points.map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="1.8" />
          <circle cx={x} cy={y} r="0.9" fill="#fff" opacity="0.55" />
        </g>
      ))}
    </g>
  );
}

function CornerFlourishes({ fill }: { fill: string }) {
  // Small decorative strokes at the 4 diagonals — read as scrollwork.
  return (
    <g fill="none" stroke={fill} strokeWidth="0.9" opacity="0.7" strokeLinecap="round">
      <path d="M 21 21 Q 28 22 28 28" />
      <path d="M 99 21 Q 92 22 92 28" />
      <path d="M 21 99 Q 28 98 28 92" />
      <path d="M 99 99 Q 92 98 92 92" />
    </g>
  );
}

function SmallCrown({ fill }: { fill: string }) {
  // Simple 3-peak crown sitting just above the seal.
  return (
    <g fill={fill}>
      <path d="M 50 10 L 54 4 L 60 10 L 66 4 L 70 10 L 70 15 L 50 15 Z" />
    </g>
  );
}

function QueenCrown({ fill, jewelFill }: { fill: string; jewelFill: string }) {
  // Five-peak crown. Taller centre, flanking mid peaks, low outer peaks.
  // Base bar sits at y=14; peaks reach up to y=-2 at the centre.
  return (
    <g>
      <path
        d="
          M 38 14
          L 42 6
          L 48 12
          L 54 0
          L 60 10
          L 66 0
          L 72 12
          L 78 6
          L 82 14
          Z
        "
        fill={fill}
      />
      {/* Crown jewels at the peaks */}
      <g fill={jewelFill}>
        <circle cx="42" cy="6" r="1.4" />
        <circle cx="54" cy="0" r="1.6" />
        <circle cx="60" cy="10" r="1.2" />
        <circle cx="66" cy="0" r="1.6" />
        <circle cx="78" cy="6" r="1.4" />
      </g>
    </g>
  );
}

function RadiantRays({ fill }: { fill: string }) {
  // Twelve thin rays radiating from behind the seal. Subtle, not
  // competing with the crown.
  const rays: React.ReactElement[] = [];
  for (let i = 0; i < 12; i++) {
    const angle = (i * Math.PI) / 6;
    const x1 = 60 + Math.cos(angle) * 54;
    const y1 = 60 + Math.sin(angle) * 54;
    const x2 = 60 + Math.cos(angle) * 62;
    const y2 = 60 + Math.sin(angle) * 62;
    rays.push(
      <line
        key={i}
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke={fill}
        strokeWidth="0.8"
        opacity="0.5"
        strokeLinecap="round"
      />,
    );
  }
  return <g>{rays}</g>;
}
