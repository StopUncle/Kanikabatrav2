import { TIERS } from "@/lib/board/tiers";

/**
 * The 0-100 ruler. Shows this figure's marker against the five tier bands
 * and the calibration anchors (Keanu floor, Kemper ceiling) as faint
 * ticks, so you instantly read where they sit on the scale and what the
 * scale is anchored to.
 */

interface Anchor {
  label: string;
  value: number;
}

export default function ScaleStrip({
  value,
  anchors = [],
}: {
  value: number;
  anchors?: Anchor[];
}) {
  const pct = Math.max(0, Math.min(100, value));
  return (
    <div className="pt-6 pb-8">
      <div className="relative h-2 w-full rounded-full bg-gradient-to-r from-white/[0.04] via-white/[0.08] to-accent-burgundy/40">
        {/* Tier band dividers at 20-pt intervals. */}
        {TIERS.slice(1).map((t) => (
          <div
            key={t.key}
            className="absolute top-0 h-full w-px bg-deep-black/60"
            style={{ left: `${t.range[0]}%` }}
          />
        ))}

        {/* Calibration anchor ticks. */}
        {anchors.map((a) => (
          <div
            key={a.label}
            className="absolute -top-5 flex -translate-x-1/2 flex-col items-center"
            style={{ left: `${Math.max(0, Math.min(100, a.value))}%` }}
          >
            <span className="whitespace-nowrap text-[9px] uppercase tracking-[0.15em] text-text-gray/60">
              {a.label}
            </span>
            <div className="mt-0.5 h-3 w-px bg-text-gray/40" />
          </div>
        ))}

        {/* This figure's marker. */}
        <div
          className="absolute -top-1 h-4 w-4 -translate-x-1/2 rounded-full border-2 border-warm-gold bg-deep-black shadow-[0_0_12px_rgba(212,175,55,0.5)]"
          style={{ left: `${pct}%` }}
        />
      </div>

      <div className="mt-3 flex justify-between text-[10px] uppercase tracking-[0.2em] text-text-gray/50">
        <span>0</span>
        <span>Negligible</span>
        <span>Elevated</span>
        <span>100</span>
      </div>
    </div>
  );
}
