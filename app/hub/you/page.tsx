import { requireServerAuth } from "@/lib/auth/server-auth";
import { prisma } from "@/lib/prisma";
import { readDailyStreak } from "@/lib/streak/daily";
import { readMark } from "@/lib/mark/read";
import { getStandingActivity } from "@/lib/standing/activity";
import { getBadgeWall } from "@/lib/badges/wall";
import MarkPanel from "@/components/mark/MarkPanel";
import Move from "@/components/app-shell/Move";
import StatTile from "@/components/app-shell/juice/StatTile";
import RankHero from "@/components/app-shell/you/RankHero";
import ActivityGrid from "@/components/app-shell/you/ActivityGrid";
import StandingBreakdown from "@/components/app-shell/you/StandingBreakdown";
import BadgeWall from "@/components/app-shell/you/BadgeWall";
import RankLadder from "@/components/app-shell/you/RankLadder";

export const metadata = {
  title: "You | Consilium",
};

/**
 * You: the progression page.
 *
 * Two halves that must not be confused, per docs/THE-MARK-PLAN.md. Standing,
 * rank, streaks and badges measure showing up, so they are allowed to be
 * numbers and are the flashy half. The Mark measures skill, so it is only
 * ever sentences and a shrinking list of what gets past you.
 *
 * That is why there is no aggregate accuracy anywhere on this page, no
 * radar, and no composite score. A single number claiming to be "how good
 * you are at reading people" would become the thing members trained instead
 * of the skill, and it is a claim nobody can stand behind.
 */
export default async function YouPage() {
  const userId = await requireServerAuth("/app/you");

  const [viewer, dailyStreak, simStats, mark, activity, wall] =
    await Promise.all([
      prisma.user.findUnique({
        where: { id: userId },
        select: {
          displayName: true,
          standing: true,
          ringLevel: true,
          createdAt: true,
        },
      }),
      readDailyStreak(prisma, userId),
      prisma.simulatorProgress.aggregate({
        where: { userId, completedAt: { not: null } },
        _count: { _all: true },
      }),
      readMark(prisma, userId),
      getStandingActivity(prisma, userId),
      getBadgeWall(prisma, userId),
    ]);

  const standing = viewer?.standing ?? 0;
  const ringLevel = viewer?.ringLevel ?? 4;

  const memberSince = viewer?.createdAt
    ? viewer.createdAt.toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      })
    : null;

  return (
    <div className="px-5 pb-28 pt-6">
      <h1
        className="text-[28px] font-light"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {viewer?.displayName || "You"}
      </h1>
      <p className="mb-5 mt-1 text-[13px] text-[var(--app-muted)]">
        {memberSince ? `Here since ${memberSince}.` : "Measured. Earned. Yours."}
      </p>

      <RankHero standing={standing} ringLevel={ringLevel} />

      <div className="mb-7 mt-3 grid grid-cols-3 gap-2.5">
        <StatTile
          value={dailyStreak.current}
          label="day streak"
          delayMs={0}
          hint={
            dailyStreak.longest > dailyStreak.current
              ? `best ${dailyStreak.longest}`
              : undefined
          }
        />
        <StatTile
          value={simStats._count._all}
          label="scenarios run"
          tone="rose"
          delayMs={110}
        />
        <StatTile
          value={wall.earned}
          label="badges"
          tone="green"
          delayMs={220}
          hint={`of ${wall.total}`}
        />
      </div>

      {/* The Mark: the skill half, and the only half that speaks in
          sentences. Left exactly where the measurement work put it. */}
      <div className="mb-7">
        <MarkPanel read={mark} />
      </div>

      <div className="mb-7">
        <ActivityGrid activity={activity} />
      </div>

      <div className="mb-7">
        <StandingBreakdown sources={activity.bySource} />
      </div>

      <div className="mb-7">
        <RankLadder standing={standing} ringLevel={ringLevel} />
      </div>

      <div className="mb-7">
        <BadgeWall wall={wall} />
      </div>

      {/* The rest of the house */}
      <div className="flex flex-col gap-2.5">
        <Move
          href="/app/ranks"
          title="Leaderboards"
          sub="Standing and Simulator XP."
          cta="OPEN"
          icon={
            <svg viewBox="0 0 24 24">
              <path d="M8 21h8m-4-4v4M5 4h14v5a7 7 0 0 1-14 0z" />
              <path d="M5 6H3v2a3 3 0 0 0 2 2.8M19 6h2v2a3 3 0 0 1-2 2.8" />
            </svg>
          }
        />
        <Move
          href="/app/book"
          title="The book"
          sub="The Sociopathic Dating Bible, inside."
          cta="READ"
          icon={
            <svg viewBox="0 0 24 24">
              <path d="M5 4h11a3 3 0 0 1 3 3v13H8a3 3 0 0 0-3 3z" />
              <path d="M5 4v16" />
            </svg>
          }
        />
        <Move
          href="/app/videos"
          title="Videos"
          sub="The video library."
          cta="WATCH"
          icon={
            <svg viewBox="0 0 24 24">
              <rect x="3" y="5" width="18" height="14" rx="3" />
              <path d="M10 9.5l5 2.5-5 2.5z" />
            </svg>
          }
        />
        <Move
          href="/app/voice-notes"
          title="Voice notes"
          sub="Kanika, in your ear."
          cta="LISTEN"
          icon={
            <svg viewBox="0 0 24 24">
              <rect x="9" y="3" width="6" height="11" rx="3" />
              <path d="M5 11a7 7 0 0 0 14 0M12 18v3" />
            </svg>
          }
        />
        <Move
          href="/app/profile"
          title="Profile & settings"
          sub="Name, avatar, notifications."
          cta="EDIT"
          icon={
            <svg viewBox="0 0 24 24">
              <circle cx="12" cy="8.5" r="3.5" />
              <path d="M5 20c1.2-3.5 3.8-5 7-5s5.8 1.5 7 5" />
            </svg>
          }
        />
      </div>
    </div>
  );
}
