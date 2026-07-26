import { RINGS, ringByLevel } from "@/lib/standing/config";

/**
 * The rank emblem: four concentric circles read from the outside in.
 * The member's current rank is lit; ranks already passed through sit as
 * faint gold traces; ranks not yet earned are sealed (dashed,
 * near-invisible).
 *
 * Pure SVG, no client hooks, so it renders in server components (the
 * ceremony, the identity strip, profiles) without a hydration cost.
 * The glow is a second, wider stroke rather than an SVG blur filter:
 * one cheap layer, per the mobile performance rule.
 */

type Props = {
  /** The rank being displayed as held, 4 (outermost) … 1 (innermost). */
  level: number;
  /** Rendered square size in px. */
  size?: number;
  className?: string;
};

/** Rank level → circle radius in the 100×100 viewBox. */
function radiusFor(level: number): number {
  return 14 + (level - 1) * 11;
}

const GOLD = "#d4af37";

export default function RingEmblem({ level, size = 96, className }: Props) {
  const held = ringByLevel(level);

  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={className}
      role="img"
      aria-label={`${held.name} emblem`}
    >
      {RINGS.map((ring) => {
        const r = radiusFor(ring.level);
        if (ring.level === held.level) {
          return (
            <g key={ring.level}>
              <circle
                cx="50"
                cy="50"
                r={r}
                fill="none"
                stroke="rgba(212,175,55,0.22)"
                strokeWidth="4.5"
              />
              <circle
                cx="50"
                cy="50"
                r={r}
                fill="none"
                stroke={GOLD}
                strokeWidth="1.6"
              />
            </g>
          );
        }
        if (ring.level > held.level) {
          return (
            <circle
              key={ring.level}
              cx="50"
              cy="50"
              r={r}
              fill="none"
              stroke="rgba(212,175,55,0.30)"
              strokeWidth="1"
            />
          );
        }
        return (
          <circle
            key={ring.level}
            cx="50"
            cy="50"
            r={r}
            fill="none"
            stroke="rgba(245,240,237,0.10)"
            strokeWidth="1"
            strokeDasharray="1.5 3.5"
            strokeLinecap="round"
          />
        );
      })}
      <circle cx="50" cy="50" r="4.5" fill="none" stroke="rgba(212,175,55,0.18)" strokeWidth="1" />
      <circle cx="50" cy="50" r="1.8" fill="rgba(212,175,55,0.55)" />
    </svg>
  );
}
