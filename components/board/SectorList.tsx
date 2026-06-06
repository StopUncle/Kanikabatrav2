import type { Sector } from "@/lib/board/types";

/**
 * The sector reads under a factor: the ~6 observations Kanika scored
 * (grandiosity, empathy markers, affect, control, image management,
 * response under criticism). Data-viz styling, each a thin labelled bar.
 */
export default function SectorList({ sectors }: { sectors: Sector[] }) {
  if (sectors.length === 0) return null;
  return (
    <div className="space-y-3">
      {sectors.map((s) => (
        <div key={s.name}>
          <div className="mb-1 flex items-baseline justify-between gap-3">
            <span className="text-xs text-text-gray">{s.name}</span>
            <span className="font-serif text-xs text-text-light tabular-nums">
              {s.score}
            </span>
          </div>
          <div className="h-1 w-full overflow-hidden rounded-full bg-white/[0.06]">
            <div
              className="h-full rounded-full bg-text-gray/60"
              style={{ width: `${Math.max(0, Math.min(100, s.score))}%` }}
            />
          </div>
          {s.note && (
            <p className="mt-1 text-[11px] leading-relaxed text-text-gray/60">
              {s.note}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
