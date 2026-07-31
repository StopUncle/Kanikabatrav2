import Link from "next/link";
import RingEmblem from "@/components/rings/RingEmblem";
import ProgressRing from "@/components/app-shell/juice/ProgressRing";
import { ringByLevel, standingToNextRing } from "@/lib/standing/config";

/**
 * The identity chip in the app shell header: a progress donut around the
 * rank emblem, rank name, distance to the next rank. Server component that
 * renders one client ring.
 */

type Props = {
  standing: number;
  ringLevel: number;
  /** Free tier at the Analyst ceiling; the You page carries the pitch. */
  atCap?: boolean;
};

export default function RankChip({ standing, ringLevel, atCap = false }: Props) {
  const rank = ringByLevel(ringLevel);
  const next = standingToNextRing(standing);

  let pct = 1;
  if (next) {
    const floor = rank.threshold;
    const span = next.next.threshold - floor;
    pct = span > 0 ? Math.min(1, Math.max(0, (standing - floor) / span)) : 1;
  }

  return (
    <Link href="/app/you" className="flex items-center gap-3">
      <ProgressRing value={pct} size={44} strokeWidth={2.5}>
        <RingEmblem level={ringLevel} size={26} />
      </ProgressRing>
      <span className="min-w-0">
        <span className="block text-app-lead font-medium leading-tight">
          {rank.name}
        </span>
        <span
          className={`mt-0.5 block text-app-eyebrow tracking-[0.04em] ${
            atCap ? "text-[var(--app-gold-soft)]" : "text-[var(--app-dim)]"
          }`}
        >
          {atCap
            ? "At the free ceiling"
            : next
              ? `${next.remaining.toLocaleString()} to ${next.next.name}`
              : "Inner Circle"}
        </span>
      </span>
    </Link>
  );
}
