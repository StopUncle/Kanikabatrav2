"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Sparkles, ChevronRight, X } from "lucide-react";

/**
 * The sequenced 7-day onboarding pill. Sits above FirstMovesChecklist
 * on /consilium/feed. Shows ONE move per day so a brand new member
 * never lands on the feed and faces decision paralysis across the
 * 6-surface Consilium app (feed/voice notes/classroom/forum/chat/
 * simulator).
 *
 * Day number is computed client-side from the membership's
 * activatedAt timestamp (server-fetched), capped at 7. After day 7
 * the pill auto-hides; the longer-tail FirstMovesChecklist below
 * keeps doing the unsequenced "do these eventually" job.
 *
 * Completion signals are a hybrid: four moves use server-tracked
 * Prisma counts (passed in via `signals`, same shape FirstMoves uses);
 * three moves are localStorage-stamped on click because we don't
 * server-track route visits to those surfaces.
 *
 * Dismissal is per-device localStorage and permanent. Members who
 * close the pill don't see it again on this device.
 *
 * Source: research/20-alex-hormozi-applied.md, action item #2 —
 * Value Equation lever to fix the Effort/Sacrifice variable on the
 * Consilium product (the highest-LTV product with the lowest score
 * on that variable).
 */

interface ServerSignals {
  hasDisplayName: boolean;
  hasQuizResult: boolean;
  hasSimulatorProgress: boolean;
  hasComment: boolean;
}

type CompletionRule =
  | { type: "server"; key: keyof ServerSignals }
  | { type: "local"; key: string };

interface DayMove {
  day: number;
  title: string;
  description: string;
  href: string;
  completedBy: CompletionRule;
}

const DAILY_MOVES: DayMove[] = [
  {
    day: 1,
    title: "Run your first scenario",
    description:
      "Mission 1-1 in the Dark Mirror Simulator. About 5 minutes. The training is the product.",
    href: "/consilium/simulator/mission-1-1",
    completedBy: { type: "server", key: "hasSimulatorProgress" },
  },
  {
    day: 2,
    title: "Listen to a voice note",
    description:
      "Open the voice notes surface and play the most recent one. Kanika unfiltered, in your ear.",
    href: "/consilium/voice-notes",
    completedBy: { type: "local", key: "consilium:visitedVoiceNotes" },
  },
  {
    day: 3,
    title: "Take the Dark Mirror",
    description:
      "Six axes, 60 seconds. Find out exactly where you sit on the personality map.",
    href: "/consilium/quiz",
    completedBy: { type: "server", key: "hasQuizResult" },
  },
  {
    day: 4,
    title: "Comment on a discussion prompt",
    description:
      "Find today's prompt in the feed. One sentence is enough. Members who comment in week one retain four times longer.",
    href: "/consilium/feed",
    completedBy: { type: "server", key: "hasComment" },
  },
  {
    day: 5,
    title: "Walk into the classroom",
    description:
      "Pick one course. Watch one lesson. The full library is included in your membership.",
    href: "/consilium/classroom",
    completedBy: { type: "local", key: "consilium:7d:visitedClassroom" },
  },
  {
    day: 6,
    title: "Open the forum",
    description:
      "Read one thread. Members talking to members about the patterns they're seeing in real life.",
    href: "/consilium/forum",
    completedBy: { type: "local", key: "consilium:7d:visitedForum" },
  },
  {
    day: 7,
    title: "Pick your display name",
    description:
      "Last move of week one. Pick what you want the council to call you. Anonymous is allowed.",
    href: "/consilium/profile",
    completedBy: { type: "server", key: "hasDisplayName" },
  },
];

const DISMISSED_KEY = "consilium:7d:dismissed";

export default function FirstSevenDays({
  activatedAt,
  signals,
}: {
  activatedAt: string | null;
  signals: ServerSignals;
}) {
  const [hydrated, setHydrated] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [localCompletion, setLocalCompletion] = useState<
    Record<string, boolean>
  >({});

  useEffect(() => {
    try {
      setDismissed(window.localStorage.getItem(DISMISSED_KEY) === "1");
      const local: Record<string, boolean> = {};
      for (const m of DAILY_MOVES) {
        if (m.completedBy.type === "local") {
          local[m.completedBy.key] =
            window.localStorage.getItem(m.completedBy.key) === "1";
        }
      }
      setLocalCompletion(local);
    } catch {
      /* private mode / quota, defaults are fine */
    }
    setHydrated(true);
  }, []);

  // Day math. Floor((now - activatedAt) / 24h) + 1, capped at 7. If
  // activatedAt is null (legacy member, gift not yet activated, etc.)
  // treat as day 1, the worst case is the pill nudges someone who's
  // been here a while; the FirstMovesChecklist below picks up the
  // slack for them.
  const startTs = activatedAt
    ? new Date(activatedAt).getTime()
    : Date.now();
  const msSince = Math.max(0, Date.now() - startTs);
  const isPostFirstWeek = msSince >= 7 * 86_400_000;
  const dayNumber = Math.min(7, Math.floor(msSince / 86_400_000) + 1);

  if (isPostFirstWeek) return null;
  if (hydrated && dismissed) return null;

  function isDone(move: DayMove): boolean {
    if (move.completedBy.type === "server") {
      return signals[move.completedBy.key];
    }
    return localCompletion[move.completedBy.key] ?? false;
  }

  const todaysMove = DAILY_MOVES.find((m) => m.day === dayNumber)!;
  const completedCount = hydrated
    ? DAILY_MOVES.filter(isDone).length
    : DAILY_MOVES.filter(
        (m) => m.completedBy.type === "server" && isDone(m),
      ).length;

  const handleDismiss = () => {
    try {
      window.localStorage.setItem(DISMISSED_KEY, "1");
    } catch {
      /* in-memory only is fine */
    }
    setDismissed(true);
  };

  const handleClick = () => {
    // Stamp localStorage for routes we don't server-track (voice
    // notes / classroom / forum). The route visit itself is enough
    // signal for a sequenced-onboarding pill.
    if (todaysMove.completedBy.type === "local") {
      const key = todaysMove.completedBy.key;
      try {
        window.localStorage.setItem(key, "1");
      } catch {
        /* decorative, safe to ignore */
      }
      setLocalCompletion((prev) => ({ ...prev, [key]: true }));
    }
  };

  return (
    <div className="relative mb-4 rounded-2xl border border-warm-gold/40 bg-gradient-to-br from-warm-gold/[0.06] via-deep-burgundy/15 to-deep-navy/20 p-4 sm:p-5 overflow-hidden">
      <button
        onClick={handleDismiss}
        aria-label="Dismiss the 7-day path"
        className="absolute top-3 right-3 w-7 h-7 rounded-full flex items-center justify-center text-text-gray/50 hover:text-text-light hover:bg-white/5 transition-colors"
      >
        <X size={14} strokeWidth={1.8} />
      </button>

      <div className="flex items-baseline gap-3 mb-2 pr-8">
        <Sparkles
          size={14}
          className="text-warm-gold shrink-0 self-center"
          strokeWidth={1.8}
        />
        <p className="text-warm-gold text-[10px] uppercase tracking-[0.25em]">
          Day {dayNumber} of 7
        </p>
        <p className="text-text-gray/60 text-[10px] uppercase tracking-[0.2em] tabular-nums">
          {completedCount}/7 done
        </p>
      </div>

      <Link
        href={todaysMove.href}
        onClick={handleClick}
        className="group block rounded-xl border border-warm-gold/30 bg-deep-black/40 hover:bg-deep-black/60 hover:border-warm-gold/50 transition-all px-4 py-3.5 mb-3"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <p className="text-text-light font-light text-base leading-snug mb-1">
              {todaysMove.title}
            </p>
            <p className="text-text-gray/85 font-light text-sm leading-relaxed">
              {todaysMove.description}
            </p>
          </div>
          <ChevronRight
            size={20}
            strokeWidth={1.5}
            className="text-warm-gold shrink-0 mt-0.5 group-hover:translate-x-1 transition-transform"
          />
        </div>
      </Link>

      {/* 7-segment progress bar. Done = solid gold, today = mid gold,
          past-not-done = faint, future = grey. Members who blow past
          a day without completing it see it as faint, a quiet nudge
          rather than a guilt trip. */}
      <div
        className="flex items-center gap-1.5"
        role="progressbar"
        aria-label={`${completedCount} of 7 first-week moves completed`}
        aria-valuenow={completedCount}
        aria-valuemin={0}
        aria-valuemax={7}
      >
        {DAILY_MOVES.map((m) => {
          const done = hydrated && isDone(m);
          const isToday = m.day === dayNumber;
          const isPast = m.day < dayNumber;
          return (
            <div
              key={m.day}
              className={`flex-1 h-1 rounded-full transition-colors ${
                done
                  ? "bg-warm-gold"
                  : isToday
                    ? "bg-warm-gold/60"
                    : isPast
                      ? "bg-warm-gold/15"
                      : "bg-white/[0.06]"
              }`}
              title={`Day ${m.day}: ${m.title}`}
            />
          );
        })}
      </div>
    </div>
  );
}
