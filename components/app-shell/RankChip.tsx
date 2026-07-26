import Link from "next/link";
import RingEmblem from "@/components/rings/RingEmblem";
import { ringByLevel, standingToNextRing } from "@/lib/standing/config";

/**
 * The identity chip in the app shell header: a progress donut around the
 * rank emblem, rank name, distance to the next rank. Server component.
 */

type Props = {
  standing: number;
  ringLevel: number;
};

const R = 20;
const C = 2 * Math.PI * R;

export default function RankChip({ standing, ringLevel }: Props) {
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
      <span className="relative block h-11 w-11 shrink-0">
        <svg viewBox="0 0 44 44" className="h-11 w-11 -rotate-90">
          <circle
            cx="22"
            cy="22"
            r={R}
            fill="none"
            stroke="rgba(212,175,55,0.15)"
            strokeWidth="2.5"
          />
          <circle
            cx="22"
            cy="22"
            r={R}
            fill="none"
            stroke="var(--app-gold)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray={C}
            strokeDashoffset={C * (1 - pct)}
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center">
          <RingEmblem level={ringLevel} size={26} />
        </span>
      </span>
      <span className="min-w-0">
        <span className="block text-[15px] font-medium leading-tight">
          {rank.name}
        </span>
        <span className="mt-0.5 block text-[11.5px] tracking-[0.04em] text-[var(--app-dim)]">
          {next
            ? `${next.remaining.toLocaleString()} to ${next.next.name}`
            : "Inner Circle"}
        </span>
      </span>
    </Link>
  );
}
