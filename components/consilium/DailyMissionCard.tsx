import Link from "next/link";
import { Target, ArrowRight, Check, Clock, Flame } from "lucide-react";
import type { DailyMission } from "@/lib/streak/daily-mission";

/**
 * The "scenario of the day" card. Sits at the top of the feed as the daily
 * reason-to-return: one shared mission, the streak it protects, and a single
 * tap into the runner. Server component — pure data + a link, no client JS.
 */
interface Props {
  mission: DailyMission;
  doneToday: boolean;
  /** Effective unified streak (0 once lapsed). */
  streakCurrent: number;
  /** Last play was yesterday — one more day breaks the streak. */
  atRisk: boolean;
}

export default function DailyMissionCard({
  mission,
  doneToday,
  streakCurrent,
  atRisk,
}: Props) {
  return (
    <div className="rounded-2xl border border-warm-gold/20 bg-gradient-to-br from-warm-gold/[0.06] to-transparent p-5">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Target size={14} strokeWidth={1.6} className="text-warm-gold" />
          <span className="text-[11px] uppercase tracking-[0.2em] text-warm-gold/90">
            Today&apos;s Mission
          </span>
        </div>
        {streakCurrent > 0 && (
          <span
            className={`inline-flex items-center gap-1 text-[11px] uppercase tracking-[0.15em] ${
              atRisk && !doneToday ? "text-amber-300" : "text-text-gray/70"
            }`}
          >
            <Flame size={12} strokeWidth={1.6} />
            {streakCurrent} day{streakCurrent === 1 ? "" : "s"}
          </span>
        )}
      </div>

      <h3 className="text-lg font-light text-text-light leading-snug">
        {mission.title}
      </h3>
      <p className="text-sm text-text-gray/80 mt-1">{mission.tagline}</p>

      <div className="flex items-center gap-3 mt-2 text-[11px] uppercase tracking-wider text-text-gray/55">
        <span>Level {mission.level}</span>
        <span className="inline-flex items-center gap-1">
          <Clock size={11} strokeWidth={1.6} />
          {mission.estimatedMinutes} min
        </span>
      </div>

      {doneToday ? (
        <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 text-sm text-emerald-300">
          <Check size={14} strokeWidth={2} />
          Completed today
        </div>
      ) : (
        <Link
          href={mission.href}
          className="mt-4 inline-flex items-center gap-2 rounded-full border border-warm-gold/40 bg-warm-gold/10 px-4 py-2 text-sm text-warm-gold transition-colors hover:bg-warm-gold/20"
        >
          {atRisk && streakCurrent > 0
            ? "Keep your streak alive"
            : "Begin today’s mission"}
          <ArrowRight size={14} strokeWidth={1.6} />
        </Link>
      )}
    </div>
  );
}
