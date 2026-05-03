import Link from "next/link";
import { Flame, ChevronRight, Snowflake } from "lucide-react";
import InstinctsHex from "@/components/tells/InstinctsHex";
import { AXIS_KEYS } from "@/lib/tells/types";

interface Score {
  read: number;
  spot: number;
  reply: number;
  refuse: number;
  calibrate: number;
  hold: number;
  totalAnswered: number;
}

interface Streak {
  currentDays: number;
  longestDays: number;
  freezesAvail: number;
  lastTellDate: string | null;
}

/**
 * InstinctsFeedCard, the cross-promo widget rendered on the
 * /consilium/feed page so members who came for the feed see their
 * Tells score and remember the streak.
 *
 * Three states:
 *   - never-played: prompt to start
 *   - day-not-done: prompt to do today's Tell with streak preserved
 *   - done-today:   show progress + composite + small hex
 */
export default function InstinctsFeedCard({
  score,
  streak,
  doneToday,
}: {
  score: Score;
  streak: Streak;
  doneToday: boolean;
}) {
  const composite = Math.round(
    AXIS_KEYS.reduce((sum, a) => sum + (score[axisKey(a)] as number), 0) / 6,
  );

  const ctaHref = "/consilium/instincts/today";
  const neverPlayed = score.totalAnswered === 0;

  return (
    <Link
      href={ctaHref}
      className="block rounded-lg border border-gray-800 bg-deep-black/60 hover:border-accent-gold/50 transition-colors overflow-hidden group"
    >
      <div className="flex items-center gap-4 p-5">
        {/* Mini hex on the left, no labels */}
        <div className="flex-shrink-0 w-[88px] h-[88px]">
          <InstinctsHex
            score={{
              read: score.read,
              spot: score.spot,
              reply: score.reply,
              refuse: score.refuse,
              calibrate: score.calibrate,
              hold: score.hold,
            }}
            size={88}
            showLabels={false}
          />
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-accent-gold/70 text-[10px] uppercase tracking-[0.4em] mb-1.5">
            Train Your Instincts
          </p>

          {neverPlayed ? (
            <>
              <p className="text-text-light font-light text-sm leading-relaxed">
                Sixty seconds. One artifact, one question, one read.
                Begin your streak.
              </p>
            </>
          ) : doneToday ? (
            <div className="flex items-baseline gap-3">
              <span className="text-2xl text-text-light font-extralight">
                {composite}
              </span>
              <span className="text-text-gray text-xs uppercase tracking-[0.3em]">
                composite
              </span>
              <StreakChip streak={streak} />
            </div>
          ) : (
            <div>
              <p className="text-text-light font-light text-sm">
                Today&rsquo;s Tell is waiting.
                {streak.currentDays > 0 ? (
                  <span className="text-accent-gold">
                    {" "}
                    Keep your {streak.currentDays}-day streak.
                  </span>
                ) : (
                  ""
                )}
              </p>
              <div className="mt-2">
                <StreakChip streak={streak} />
              </div>
            </div>
          )}
        </div>

        <ChevronRight
          size={18}
          className="flex-shrink-0 text-text-gray group-hover:text-accent-gold"
        />
      </div>
    </Link>
  );
}

function StreakChip({ streak }: { streak: Streak }) {
  if (streak.currentDays === 0) {
    return (
      <span className="text-text-gray/70 text-[10px] uppercase tracking-[0.3em]">
        Day one starts now
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.3em]">
      <Flame size={11} className="text-accent-gold" strokeWidth={1.6} />
      <span className="text-accent-gold">
        {streak.currentDays} {streak.currentDays === 1 ? "day" : "days"}
      </span>
      {streak.freezesAvail === 0 && (
        <Snowflake
          size={10}
          strokeWidth={1.6}
          className="text-text-gray/70"
          aria-label="Freeze used this week"
        />
      )}
    </span>
  );
}

function axisKey(axis: string): keyof Score {
  return axis.toLowerCase() as keyof Score;
}
