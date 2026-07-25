import Link from "next/link";
import { ArrowRight, Scroll } from "lucide-react";
import { requireServerAuth } from "@/lib/auth/server-auth";
import { prisma } from "@/lib/prisma";
import { getPathState } from "@/lib/path/progress";
import RingStrip from "@/components/rings/RingStrip";
import PathCard from "@/components/path/PathCard";
import TodayBlock from "@/components/consilium/TodayBlock";
import { getTellStreak } from "@/lib/tells/db";
import { getTodaysGeneratedDrop } from "@/lib/simulator/generated";
import { readDailyStreak } from "@/lib/streak/daily";
import {
  getDailyMission,
  getMissionCouncilToday,
  isDailyMissionDoneToday,
} from "@/lib/streak/daily-mission";
import { utcDateKey } from "@/lib/tells/streak";

export const metadata = {
  title: "The Chamber. The Consilium | Kanika Batra",
  description: "Your ring, today's moves, and the next step on the Path.",
};

/**
 * The Chamber (plan §6.1): the member home. One screen, four zones,
 * strict order: identity strip, Today, the Path card, Kanika. Replaces
 * feed-as-front-door; the feed stays at /consilium/feed as her room.
 */
export default async function ChamberPage() {
  const userId = await requireServerAuth("/consilium/chamber");

  const viewer = await prisma.user.findUnique({
    where: { id: userId },
    select: { gender: true, standing: true, ringLevel: true },
  });

  const dailyMission = getDailyMission();
  const [
    pathState,
    tellStreak,
    missionDone,
    dailyStreak,
    freshDrop,
    council,
    latestFromKanika,
  ] = await Promise.all([
    getPathState(prisma, userId, {
      gender: viewer?.gender ?? null,
      ringLevel: viewer?.ringLevel ?? 7,
    }),
    getTellStreak(userId),
    isDailyMissionDoneToday(prisma, userId),
    readDailyStreak(prisma, userId),
    getTodaysGeneratedDrop(),
    getMissionCouncilToday(prisma),
    prisma.feedPost.findFirst({
      where: { author: { role: "ADMIN" } },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        title: true,
        type: true,
        createdAt: true,
        voiceNoteUrl: true,
      },
    }),
  ]);

  const tellDoneToday = tellStreak?.lastTellDate === utcDateKey();

  return (
    <div className="max-w-2xl mx-auto px-3 sm:px-4 py-6 sm:py-8 lg:py-12">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-extralight tracking-wider uppercase gradient-text-gold mb-2">
          The Chamber
        </h1>
        <div className="w-12 h-px bg-warm-gold/40" />
      </div>

      <RingStrip
        standing={viewer?.standing ?? 0}
        ringLevel={viewer?.ringLevel ?? 7}
      />

      <TodayBlock
        mission={dailyMission}
        missionDone={missionDone}
        streakCurrent={dailyStreak.current}
        atRisk={dailyStreak.isAtRisk}
        tellDoneToday={tellDoneToday}
        freshDrop={freshDrop}
        council={council}
      />

      <PathCard state={pathState} gender={viewer?.gender ?? null} />

      {latestFromKanika && (
        <Link
          href="/consilium/feed"
          className="group flex items-center gap-4 rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3.5 transition-colors hover:border-warm-gold/30"
        >
          <div className="shrink-0 w-9 h-9 rounded-full bg-warm-gold/10 border border-warm-gold/25 flex items-center justify-center">
            <Scroll className="w-4 h-4 text-warm-gold" strokeWidth={1.6} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-warm-gold/80 text-[10px] uppercase tracking-[0.25em] mb-0.5">
              {latestFromKanika.voiceNoteUrl ? "New voice note" : "From Kanika"}
            </p>
            <p className="text-text-light text-sm font-light truncate">
              {latestFromKanika.title}
            </p>
          </div>
          <ArrowRight
            size={16}
            className="shrink-0 text-text-gray/50 group-hover:text-warm-gold transition-colors"
          />
        </Link>
      )}
    </div>
  );
}
