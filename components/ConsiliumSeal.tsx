"use client";

/**
 * ConsiliumSeal — the mark for "The Consilium"
 *
 * A Roman medallion: concentric gold rings, four cardinal points,
 * and a serif "C" monogram at centre. Uses the site's existing
 * `font-serif` family (see tailwind.config) so the "C" matches the
 * classical typography without loading an extra webfont.
 *
 * The seal is its own gold circle — no need to wrap it in another one.
 */
interface ConsiliumSealProps {
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  /** When true, adds a subtle glow halo behind the seal (use in the Header). */
  haloed?: boolean;
}

export default function ConsiliumSeal({
  size = "md",
  className = "",
  haloed = false,
}: ConsiliumSealProps) {
  const sizeMap = {
    sm: 28,
    md: 40,
    lg: 56,
    xl: 80,
  };
  const d = sizeMap[size];

  return (
    <span
      className={`relative inline-flex items-center justify-center ${className}`}
      style={{ width: d, height: d }}
    >
      {haloed && (
        <span
          aria-hidden
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(212,175,55,0.28) 0%, rgba(212,175,55,0.08) 45%, rgba(212,175,55,0) 70%)",
            filter: "blur(6px)",
          }}
        />
      )}
      <svg
        width={d}
        height={d}
        viewBox="0 0 100 100"
        className="relative"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="cs-gold" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#f3d98a" />
            <stop offset="50%" stopColor="#d4af37" />
            <stop offset="100%" stopColor="#9c7a1f" />
          </linearGradient>
        </defs>

        {/* Outer hairline ring */}
        <circle
          cx="50"
          cy="50"
          r="48"
          fill="none"
          stroke="url(#cs-gold)"
          strokeWidth="0.8"
          opacity="0.55"
        />

        {/* Primary ring */}
        <circle
          cx="50"
          cy="50"
          r="44"
          fill="none"
          stroke="url(#cs-gold)"
          strokeWidth="1.8"
        />

        {/* Inner ring */}
        <circle
          cx="50"
          cy="50"
          r="39"
          fill="none"
          stroke="url(#cs-gold)"
          strokeWidth="0.5"
          opacity="0.35"
        />

        {/* Four cardinal points (N / E / S / W) — senate compass */}
        <circle cx="50" cy="3.5" r="1.4" fill="url(#cs-gold)" />
        <circle cx="96.5" cy="50" r="1.4" fill="url(#cs-gold)" />
        <circle cx="50" cy="96.5" r="1.4" fill="url(#cs-gold)" />
        <circle cx="3.5" cy="50" r="1.4" fill="url(#cs-gold)" />

        {/* Short serif bars flanking the C (like Roman inscription markers) */}
        <line
          x1="15"
          y1="50"
          x2="20"
          y2="50"
          stroke="url(#cs-gold)"
          strokeWidth="0.9"
          opacity="0.7"
        />
        <line
          x1="80"
          y1="50"
          x2="85"
          y2="50"
          stroke="url(#cs-gold)"
          strokeWidth="0.9"
          opacity="0.7"
        />

        {/* Serif "C" monogram */}
        <text
          x="50"
          y="50"
          textAnchor="middle"
          dominantBaseline="central"
          fill="url(#cs-gold)"
          fontFamily="Didot, 'Bodoni MT', 'Playfair Display', Georgia, 'Times New Roman', serif"
          fontWeight="500"
          fontSize="56"
          style={{ fontStyle: "normal" }}
        >
          C
        </text>
      </svg>
    </span>
  );
}
