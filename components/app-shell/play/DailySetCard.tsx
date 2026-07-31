import Link from "next/link";
import ProgressRing from "@/components/app-shell/juice/ProgressRing";
import Sheen from "@/components/app-shell/juice/Sheen";
import type { ArcadeStreak, DailySet } from "@/lib/games/arcade";

/**
 * The object that turns two separate games into one thing you finish.
 *
 * A set with a visible remainder ("one left") is a far stronger pull than two
 * unrelated cards, and it is honest here: both games really do take about a
 * minute, and both really do feed the same daily streak.
 */

function Flame() {
  return (
    <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 shrink-0" aria-hidden>
      <path
        d="M8 1c1 2.6 4 3.8 4 7.2A4.2 4.2 0 0 1 8 12.5 4.2 4.2 0 0 1 4 8.2C4 6.4 5.2 5.4 5.6 4c.9.8 1.2 1.5 1.2 2.6C7.8 5.4 8 3.4 8 1z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function DailySetCard({
  set,
  streak,
  href = "/app/train",
}: {
  set: DailySet;
  streak: ArcadeStreak;
  /**
   * Where the whole card goes when there is nothing left to start. On the
   * Arcade itself that is nowhere; on Today it is Train.
   */
  href?: string | null;
}) {
  const complete = set.total > 0 && set.done === set.total;

  let line: string;
  if (set.total === 0) line = "Nothing to train today. Rare, and not your doing.";
  else if (complete) line = "Both done. Today is banked.";
  else if (set.done === 0) line = "Two games, two minutes.";
  else line = `One left: ${set.nextTitle}.`;

  const body = (
    <>
      <Sheen delayMs={180} />
      <span className="relative flex items-center gap-4">
        <ProgressRing
          value={set.total > 0 ? set.done / set.total : 0}
          size={62}
          strokeWidth={3}
          color={complete ? "var(--app-green)" : "var(--app-gold)"}
          label={`${set.done} of ${set.total} done today`}
        >
          <span className="text-app-lead tabular-nums text-[var(--app-text)]">
            {set.done}
            <span className="text-app-eyebrow text-[var(--app-dim)]">
              /{set.total}
            </span>
          </span>
        </ProgressRing>

        <span className="min-w-0 flex-1">
          <span className="block text-app-eyebrow uppercase tracking-app-label text-[var(--app-gold-soft)]">
            Daily set
          </span>
          <span
            className="mt-1 block text-app-title leading-snug"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {line}
          </span>
          {streak.current > 0 && (
            <span
              className={`mt-1.5 flex items-center gap-1.5 text-app-eyebrow ${
                streak.atRisk ? "text-[var(--app-rose)]" : "text-[var(--app-dim)]"
              }`}
            >
              <Flame />
              {streak.atRisk
                ? `${streak.current} day streak, keep it today`
                : `${streak.current} day streak`}
            </span>
          )}
        </span>

        {!complete && set.nextHref && (
          <span className="shrink-0 self-center text-app-eyebrow tracking-app-wide text-[var(--app-gold)]">
            {set.done === 0 ? "START" : "NEXT"} →
          </span>
        )}
      </span>
    </>
  );

  const shell =
    "relative block overflow-hidden rounded-[22px] border border-[var(--app-line)] p-[18px]";
  const background = complete
    ? "linear-gradient(140deg, rgba(127,184,144,0.10), rgba(127,184,144,0.02))"
    : "linear-gradient(140deg, rgba(212,175,55,0.11), rgba(212,175,55,0.02))";

  // Straight into the next game when there is one, otherwise wherever the
  // caller wants a finished set to lead (nowhere, on Train itself).
  const target = set.nextHref ?? href;

  if (!target) {
    return (
      <div className={shell} style={{ background }}>
        {body}
      </div>
    );
  }

  return (
    <Link
      href={target}
      className={`${shell} transition-transform active:scale-[0.985]`}
      style={{ background }}
    >
      {body}
    </Link>
  );
}
