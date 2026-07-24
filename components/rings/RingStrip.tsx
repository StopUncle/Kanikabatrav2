import Link from "next/link";
import RingEmblem from "./RingEmblem";
import { ringByLevel, standingToNextRing } from "@/lib/standing/config";

/**
 * The identity strip: the member's Ring, Standing, and distance to the
 * next ring inward. Phase 1 mounts it atop the feed; Phase 2 moves it
 * into the Chamber. Server component, one render, no client JS.
 */

type Props = {
  standing: number;
  ringLevel: number;
};

export default function RingStrip({ standing, ringLevel }: Props) {
  const ring = ringByLevel(ringLevel);
  const next = standingToNextRing(standing);

  // Progress through the current ring's segment, 0-100. The First Ring
  // has no threshold above it; render the bar full.
  let pct = 100;
  if (next) {
    const floor = ring.threshold;
    const span = next.next.threshold - floor;
    pct = span > 0 ? Math.min(100, ((standing - floor) / span) * 100) : 100;
  }

  return (
    <Link
      href="/consilium/simulator"
      className="group mb-6 flex items-center gap-4 rounded-xl border border-warm-gold/20 bg-warm-gold/[0.03] px-4 py-3.5 transition-colors hover:border-warm-gold/40"
    >
      <RingEmblem level={ring.level} size={52} className="shrink-0" />
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline justify-between gap-3">
          <p className="text-warm-gold text-sm font-light uppercase tracking-[0.2em] truncate">
            {ring.name}
          </p>
          <p className="text-text-gray text-[11px] tabular-nums shrink-0">
            {standing.toLocaleString()} Standing
          </p>
        </div>
        <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-white/[0.06]">
          <div
            className="h-full rounded-full bg-warm-gold/70"
            style={{ width: `${pct}%` }}
          />
        </div>
        <p className="mt-1.5 text-text-gray/70 text-[10px]">
          {next
            ? `${next.remaining.toLocaleString()} to ${next.next.name}`
            : "The innermost ring. The Seat is not earned, it is offered."}
        </p>
      </div>
    </Link>
  );
}
