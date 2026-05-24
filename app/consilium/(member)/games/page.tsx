import { requireServerAuth } from "@/lib/auth/server-auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { ArrowRight, Brain, Flame, Sparkles, Trophy } from "lucide-react";
import {
  readGamesStreak,
  readGamePersonalBest,
} from "@/lib/games/status";

export const metadata = {
  title: "Daily Training. Games | Kanika Batra",
  description:
    "Sixty-second daily training in red flag recognition. Speed Drill and the games to come.",
};

/**
 * Games catalog. The Consilium's daily-training surface, separate from the
 * Simulator (long-form scenario work) by intent: this is the snack, that
 * is the meal. Lumosity-style: one daily session per game family counts
 * for the streak; replays are practice.
 *
 * v1 ships Speed Drill only. The layout has room for more games to land
 * as cards next to it (Daily Tell, Screenshot Decoder, Read the Room
 * are the obvious next ports from the dark-mirror-app).
 */
export default async function GamesIndex() {
  const userId = await requireServerAuth("/consilium/games");

  const [streak, speedDrillBest] = await Promise.all([
    readGamesStreak(prisma, userId),
    readGamePersonalBest(prisma, userId, "speed-drill"),
  ]);

  const isNew = speedDrillBest.totalSessions === 0;

  return (
    <main className="min-h-screen px-4 sm:px-8 py-10 max-w-5xl mx-auto">
      <header className="mb-10">
        <p className="text-warm-gold/70 uppercase tracking-[0.3em] text-xs mb-3">
          The Consilium · Daily Training
        </p>
        <h1 className="text-4xl sm:text-5xl font-extralight text-white mb-4 tracking-wide">
          <span className="text-warm-gold">Games</span>
        </h1>
        <p className="text-text-gray text-base sm:text-lg font-light max-w-2xl leading-relaxed">
          Sixty seconds, ten calls. Train the instinct that tells you, at
          speed, when a line is manipulation and when a line is clean. The
          long-form work is in the Simulator; this is the muscle that fires
          before you have time to think.
        </p>

        {/* Streak banner. Mirrors the simulator's streak card but cites the
            games streak. Empty state on first visit shows a teaser. */}
        <div className="mt-7 p-4 rounded-xl border border-warm-gold/15 bg-deep-black/40 flex items-center gap-4">
          <div
            className={`shrink-0 w-11 h-11 rounded-full flex items-center justify-center ${
              streak.current > 0
                ? "bg-warm-gold/15 border border-warm-gold/40"
                : "bg-white/5 border border-warm-gold/15"
            }`}
          >
            <Flame
              size={18}
              strokeWidth={1.6}
              className={
                streak.current > 0 ? "text-warm-gold" : "text-text-gray/60"
              }
            />
          </div>
          <div className="flex-1 min-w-0">
            {streak.current > 0 ? (
              <>
                <p className="text-white text-lg font-light tracking-wide">
                  {streak.current}-day streak
                  {streak.isAtRisk && (
                    <span className="ml-2 text-burgundy text-xs uppercase tracking-[0.2em]">
                      at risk
                    </span>
                  )}
                </p>
                <p className="text-text-gray/70 text-xs font-light mt-1">
                  {streak.playedToday
                    ? "Today is done. Replay any game for practice."
                    : streak.isAtRisk
                      ? "Play one game today to keep it."
                      : `Best: ${streak.longest} days. Keep going.`}
                </p>
              </>
            ) : (
              <>
                <p className="text-white text-lg font-light tracking-wide">
                  Start your streak
                </p>
                <p className="text-text-gray/70 text-xs font-light mt-1">
                  One game a day. Sixty seconds. The streak builds the
                  instinct.
                </p>
              </>
            )}
          </div>
        </div>
      </header>

      <div className="mb-3 flex items-baseline justify-between">
        <p className="text-warm-gold/70 uppercase tracking-[0.3em] text-[10px]">
          Available games · 1 live
        </p>
        <p className="text-text-gray/50 text-[10px] uppercase tracking-[0.25em] hidden sm:block">
          More coming
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Speed Drill card */}
        <Link
          href="/consilium/games/speed-drill"
          className="group relative flex flex-col p-5 rounded-xl border border-warm-gold/15 bg-deep-black/40 transition-all hover:border-warm-gold/50 hover:bg-warm-gold/[0.04] hover:-translate-y-0.5"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="text-warm-gold/60 uppercase tracking-[0.3em] text-[10px]">
                {streak.playedToday ? "Today, done" : "Daily training"}
              </span>
              {isNew && (
                <span className="inline-flex items-center gap-1.5 text-[9px] uppercase tracking-[0.2em] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-400/30">
                  <span aria-hidden className="relative inline-flex w-1.5 h-1.5">
                    <span className="absolute inset-0 rounded-full bg-emerald-400/40 animate-ping" />
                    <span className="relative inline-block w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  </span>
                  New
                </span>
              )}
            </div>
            <ArrowRight
              size={14}
              className="text-warm-gold/40 group-hover:text-warm-gold group-hover:translate-x-0.5 transition-all"
              strokeWidth={1.6}
            />
          </div>

          <div className="flex items-center gap-3 mb-3">
            <div className="shrink-0 w-10 h-10 rounded-lg bg-warm-gold/10 border border-warm-gold/30 flex items-center justify-center">
              <Brain size={18} className="text-warm-gold" strokeWidth={1.6} />
            </div>
            <div>
              <p className="text-white text-lg font-light tracking-wide">
                Speed Drill
              </p>
              <p className="text-text-gray/60 text-xs font-light leading-snug">
                10 calls · 60 seconds · binary read
              </p>
            </div>
          </div>

          <p className="text-text-gray/80 text-sm font-light leading-relaxed mb-4">
            Each card is one line someone said to you. Manipulation, or clean?
            Trust the first instinct. Strings of correct calls build a combo.
          </p>

          {/* Personal-best strip */}
          {!isNew && speedDrillBest.bestScore !== null && (
            <div className="mt-auto pt-3 border-t border-warm-gold/10 grid grid-cols-3 gap-2 text-center">
              <div>
                <p className="text-warm-gold/60 uppercase tracking-[0.2em] text-[9px]">
                  Best
                </p>
                <p className="text-white text-base font-extralight mt-0.5 tabular-nums">
                  {speedDrillBest.bestScore}
                  <span className="text-text-gray/50">/10</span>
                </p>
              </div>
              <div>
                <p className="text-warm-gold/60 uppercase tracking-[0.2em] text-[9px]">
                  Accuracy
                </p>
                <p className="text-white text-base font-extralight mt-0.5 tabular-nums">
                  {speedDrillBest.bestAccuracy}%
                </p>
              </div>
              <div>
                <p className="text-warm-gold/60 uppercase tracking-[0.2em] text-[9px]">
                  Plays
                </p>
                <p className="text-white text-base font-extralight mt-0.5 tabular-nums">
                  {speedDrillBest.totalSessions}
                </p>
              </div>
            </div>
          )}
        </Link>

        {/* Coming Soon teaser card */}
        <div className="relative flex flex-col p-5 rounded-xl border border-dashed border-warm-gold/15 bg-deep-black/30 opacity-70">
          <p className="text-warm-gold/50 uppercase tracking-[0.3em] text-[10px] mb-3">
            Coming soon
          </p>
          <div className="flex items-center gap-3 mb-3">
            <div className="shrink-0 w-10 h-10 rounded-lg bg-white/5 border border-warm-gold/15 flex items-center justify-center">
              <Sparkles size={18} className="text-warm-gold/40" strokeWidth={1.6} />
            </div>
            <div>
              <p className="text-text-light/80 text-lg font-light tracking-wide">
                Three more
              </p>
              <p className="text-text-gray/40 text-xs font-light leading-snug">
                Daily Tell · Read the Room · Screenshot Decoder
              </p>
            </div>
          </div>
          <p className="text-text-gray/50 text-sm font-light leading-relaxed">
            One-question morning calibration. Photograph-based instinct
            reading. Tactic-naming from a chat screenshot. Porting from the
            Dark Mirror app, one game at a time.
          </p>
        </div>
      </div>

      {/* Why train daily — soft pitch under the games */}
      <div className="mt-12 p-5 rounded-xl border border-dashed border-warm-gold/15 bg-deep-black/30">
        <p className="inline-flex items-center justify-center gap-1.5 text-warm-gold/60 uppercase tracking-[0.3em] text-[10px] mb-2">
          <Trophy size={10} strokeWidth={1.8} />
          Why daily
        </p>
        <p className="text-text-gray/80 text-sm font-light max-w-2xl leading-relaxed">
          The Simulator teaches you to read a person across a scene. Games
          train the snap-call underneath that read. Sixty seconds compounds.
          A week of daily Speed Drill makes you faster at the moments the
          Simulator scenes spend twelve scenes earning.
        </p>
      </div>
    </main>
  );
}
