"use client";

import RingEmblem from "@/components/rings/RingEmblem";
import ProgressRing from "@/components/app-shell/juice/ProgressRing";
import Sheen from "@/components/app-shell/juice/Sheen";
import { useCountUp } from "@/lib/hooks/use-count-up";
import { ringByLevel, standingToNextRing } from "@/lib/standing/config";

/**
 * The top of the progression page: rank, and how far into it you are.
 *
 * Standing counts up on arrival because it is the one number here a member
 * actually watches. The ring draws itself in behind the emblem, so the
 * distance to the next rank is legible before a word is read.
 */

export default function RankHero({
  standing,
  ringLevel,
}: {
  standing: number;
  ringLevel: number;
}) {
  const rank = ringByLevel(ringLevel);
  const next = standingToNextRing(standing);

  let pct = 1;
  if (next) {
    const span = next.next.threshold - rank.threshold;
    pct =
      span > 0
        ? Math.min(1, Math.max(0, (standing - rank.threshold) / span))
        : 1;
  }

  const shownStanding = useCountUp(standing, { durationMs: 1100 });

  return (
    <div
      className="relative overflow-hidden rounded-[22px] border border-[var(--app-line)] p-[18px]"
      style={{
        background:
          "radial-gradient(90% 130% at 78% 10%, rgba(212,175,55,0.16), transparent 62%), linear-gradient(150deg, #1d1810, #100d0a 78%)",
      }}
    >
      <Sheen delayMs={260} />
      <div className="relative flex items-center gap-5">
        <ProgressRing
          value={pct}
          size={92}
          strokeWidth={3}
          delayMs={180}
          durationMs={1100}
          label={`${rank.name}, ${Math.round(pct * 100)} percent to the next rank`}
        >
          <RingEmblem level={ringLevel} size={58} />
        </ProgressRing>

        <div className="min-w-0 flex-1">
          <p className="text-[11px] uppercase tracking-[0.22em] text-[var(--app-gold-soft)]">
            Your rank
          </p>
          <p
            className="mt-0.5 text-[26px] leading-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {rank.name}
          </p>
          <p className="mt-2 text-[12.5px] tabular-nums text-[var(--app-text)]">
            {shownStanding.toLocaleString()}
            <span className="text-[var(--app-dim)]"> Standing</span>
          </p>
          <p className="mt-0.5 text-[11.5px] text-[var(--app-dim)]">
            {next
              ? `${next.remaining.toLocaleString()} to ${next.next.name}`
              : "The innermost ring"}
          </p>
        </div>
      </div>
    </div>
  );
}
