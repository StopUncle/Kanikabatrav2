import { Flame } from "lucide-react";

type Props = {
  current: number;
  longest: number;
  isAtRisk: boolean;
};

/**
 * Top-of-page streak callout for the simulator catalog. Server-rendered —
 * passed read-only props from the page component, no client state.
 *
 * Visual hierarchy:
 *   - 0 streaks: muted "start a streak today" copy. Low pressure.
 *   - 1-6: building-momentum chip with day count. Warm gold.
 *   - 7+: prominent ring + glow. Personal best shown alongside.
 *   - At risk: amber pulse + "Don't break it" copy. Loss-aversion mode.
 *
 * The number is the message, the copy is mostly reinforcement. We don't
 * count "streak freezes used" or week-state here; v1 keeps the mechanic
 * brutally simple. If a player wants to extend their streak, they play.
 */
export default function StreakBanner({ current, longest, isAtRisk }: Props) {
  if (current === 0) {
    return (
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/[0.02] text-text-gray text-xs">
        <Flame size={13} className="text-text-gray/50" strokeWidth={1.5} />
        <span className="uppercase tracking-[0.2em] text-[10px]">
          Start a streak, play one scenario today
        </span>
      </div>
    );
  }

  const isHigh = current >= 7;
  const tone = isAtRisk
    ? {
        bg: "bg-amber-500/10",
        border: "border-amber-500/40",
        text: "text-amber-300",
        glow: "shadow-[0_0_24px_-4px_rgba(245,158,11,0.4)]",
      }
    : isHigh
      ? {
          bg: "bg-accent-gold/10",
          border: "border-accent-gold/50",
          text: "text-accent-gold",
          glow: "shadow-[0_0_28px_-4px_rgba(212,175,55,0.55)]",
        }
      : {
          bg: "bg-accent-gold/5",
          border: "border-accent-gold/25",
          text: "text-accent-gold/85",
          glow: "",
        };

  return (
    <div
      className={`inline-flex items-center gap-3 px-5 py-2.5 rounded-full border ${tone.bg} ${tone.border} ${tone.glow}`}
    >
      <Flame size={16} className={tone.text} strokeWidth={1.5} />
      <div className="flex items-center gap-2">
        <span className={`tabular-nums text-2xl font-light ${tone.text}`}>
          {current}
        </span>
        <span className="text-[10px] uppercase tracking-[0.25em] text-text-gray/80">
          day{current === 1 ? "" : "s"}
        </span>
      </div>
      {isAtRisk ? (
        <span className="text-[10px] uppercase tracking-[0.25em] text-amber-300/90">
          · Don&apos;t break it
        </span>
      ) : longest > current ? (
        <span className="text-[10px] uppercase tracking-[0.25em] text-text-gray/60">
          · best {longest}
        </span>
      ) : isHigh ? (
        <span className="text-[10px] uppercase tracking-[0.25em] text-accent-gold/80">
          · personal best
        </span>
      ) : null}
    </div>
  );
}
