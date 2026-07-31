import Link from "next/link";
import { redirect } from "next/navigation";
import { requireServerAuth } from "@/lib/auth/server-auth";
import { prisma } from "@/lib/prisma";
import { getPathState } from "@/lib/path/progress";
import { appStepHref } from "@/lib/path/curriculum";
import { getTellStreak, getTodaysTellRow } from "@/lib/tells/db";
import { buildDailySet } from "@/lib/games/arcade";
import { getTodaysGeneratedDrop } from "@/lib/simulator/generated";
import { readDailyStreak } from "@/lib/streak/daily";
import {
  getDailyMissionFor,
  isDailyMissionDoneToday,
} from "@/lib/streak/daily-mission";
import { utcDateKey } from "@/lib/tells/streak";
import { getDay0Checklist } from "@/lib/day0/checklist";
import { readProgram } from "@/lib/program/read";
import RankChip from "@/components/app-shell/RankChip";
import Move from "@/components/app-shell/Move";
import DailySetCard from "@/components/app-shell/play/DailySetCard";
import ChecklistCard from "@/components/day0/ChecklistCard";
import MembershipTodayCard from "@/components/app-shell/upgrade/MembershipTodayCard";
import { getAccess } from "@/lib/access/tier";
import { FREE_STANDING_CEILING } from "@/lib/standing/config";

export const metadata = {
  title: "Today | Consilium",
};

/**
 * Today: the app shell home. Header (rank + streak), the hero card
 * (latest from Kanika; becomes the weekly session once the video
 * pipeline exists), today's moves, and the Path continue card.
 */
export default async function TodayPage() {
  const userId = await requireServerAuth("/app");

  const [viewer, access] = await Promise.all([
    prisma.user.findUnique({
      where: { id: userId },
      select: {
        gender: true,
        standing: true,
        ringLevel: true,
        arrivalAt: true,
        createdAt: true,
      },
    }),
    getAccess(userId),
  ]);

  // A fresh free account gets the Arrival once. Members are handled by
  // the layout's initiation redirect; this lives here rather than in the
  // layout because the layout wraps /app/welcome and would loop.
  const WEEK_MS = 7 * 24 * 60 * 60 * 1000;
  if (
    !access.isMember &&
    viewer &&
    !viewer.arrivalAt &&
    Date.now() - viewer.createdAt.getTime() < WEEK_MS
  ) {
    redirect("/app/welcome");
  }

  const dailyMission = getDailyMissionFor(access.isMember);
  const startOfUtcToday = new Date();
  startOfUtcToday.setUTCHours(0, 0, 0, 0);

  const [
    pathState,
    tellStreak,
    missionDone,
    dailyStreak,
    freshDrop,
    latestFromKanika,
    drillsToday,
    todaysTell,
    day0,
    program,
  ] = await Promise.all([
    getPathState(prisma, userId, {
      gender: viewer?.gender ?? null,
      ringLevel: viewer?.ringLevel ?? 4,
      isMember: access.isMember,
    }),
    getTellStreak(userId),
    isDailyMissionDoneToday(prisma, userId, { isMember: access.isMember }),
    readDailyStreak(prisma, userId),
    access.isMember ? getTodaysGeneratedDrop() : Promise.resolve(null),
    prisma.feedPost.findFirst({
      where: { author: { role: "ADMIN" } },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        title: true,
        createdAt: true,
        voiceNoteUrl: true,
        videoPosterUrl: true,
      },
    }),
    prisma.gameSession.count({
      where: {
        userId,
        gameKey: "speed-drill",
        playedAt: { gte: startOfUtcToday },
      },
    }),
    getTodaysTellRow(),
    getDay0Checklist(prisma, userId, { isMember: access.isMember }),
    readProgram(prisma, userId),
  ]);

  const tellDoneToday = tellStreak?.lastTellDate === utcDateKey();
  const dailySet = buildDailySet({
    drillDone: drillsToday > 0,
    tellDone: tellDoneToday,
    tellAvailable: todaysTell !== null,
  });
  const current = pathState.current;
  const chapterProgress = current
    ? pathState.chapters.find((c) => c.chapter.id === current.chapter.id)
    : null;
  const pathPct = chapterProgress
    ? Math.round(
        (chapterProgress.completedSteps /
          Math.max(1, chapterProgress.totalSteps)) *
          100,
      )
    : 0;

  return (
    <div className="pb-8 pt-4">
      {/* Header: identity left, streak right */}
      <div className="flex items-center justify-between px-5 pb-5 pt-2">
        <RankChip
          standing={viewer?.standing ?? 0}
          ringLevel={viewer?.ringLevel ?? 4}
          atCap={
            !access.isMember &&
            (viewer?.standing ?? 0) >= FREE_STANDING_CEILING
          }
        />
        <div
          className="flex items-center gap-2 text-app-lead font-medium"
          aria-label={`${dailyStreak.current}-day streak`}
        >
          <svg viewBox="0 0 16 16" className="h-4 w-4">
            <path
              d="M8 1c1 2.6 4 3.8 4 7.2A4.2 4.2 0 0 1 8 12.5 4.2 4.2 0 0 1 4 8.2C4 6.4 5.2 5.4 5.6 4c.9.8 1.2 1.5 1.2 2.6C7.8 5.4 8 3.4 8 1z"
              fill="var(--app-gold)"
            />
          </svg>
          {dailyStreak.current}
        </div>
      </div>

      {/* First week: shown until the window closes or all three are done */}
      {day0 && <ChecklistCard checklist={day0} />}

      {/* The transformation. Sits above everything else on Today because it
          is the reason the app is worth opening on a given week, and it
          disappears the moment the week's challenge is done. */}
      {program.actionable && (
        <Link
          href="/app/program"
          className="mb-4 block rounded-[18px] border border-[var(--app-gold)]/30 bg-[var(--app-gold)]/[0.05] px-[18px] py-4"
        >
          <div className="flex items-baseline justify-between gap-3">
            <p className="text-app-tiny uppercase tracking-app-label text-[var(--app-gold)]">
              Week {program.actionable.weekNumber} of 12
            </p>
            <p className="shrink-0 text-app-eyebrow tracking-app-wide text-[var(--app-gold)]">
              OPEN →
            </p>
          </div>
          <p
            className="mt-1.5 text-app-title leading-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {program.actionable.title}
          </p>
          <p className="mt-1.5 text-app-caption leading-relaxed text-[var(--app-muted)]">
            {program.actionable.lede}
          </p>
        </Link>
      )}

      {/* Hero: latest from Kanika. Becomes the weekly session later. */}
      {latestFromKanika && (
        <Link
          href={`/app/feed/${latestFromKanika.id}`}
          className="relative mx-5 mb-6 flex flex-col justify-end overflow-hidden rounded-[22px] border border-[var(--app-line)]"
          style={{
            aspectRatio: "16 / 10.5",
            background:
              "radial-gradient(90% 120% at 75% 15%, rgba(183,110,121,0.35), transparent 55%), radial-gradient(120% 140% at 20% 100%, rgba(212,175,55,0.22), transparent 55%), linear-gradient(160deg, #211a13, #0d0b09 70%)",
          }}
        >
          {/* The clip's own frame when it has one. Anchored high because
              the subject of every one of these is a face, and a face sits
              in the top third. Without one the card keeps its gradient,
              which is a designed empty rather than a broken image. */}
          {latestFromKanika.videoPosterUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={latestFromKanika.videoPosterUrl}
              alt=""
              aria-hidden
              className="absolute inset-0 h-full w-full object-cover"
              style={{ objectPosition: "center 25%" }}
            />
          )}
          <span
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, transparent 30%, rgba(6,5,4,0.85))",
            }}
          />
          {latestFromKanika.voiceNoteUrl && (
            <span className="absolute left-1/2 top-[34%] flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[rgba(212,175,55,0.7)] bg-[rgba(10,9,8,0.55)] backdrop-blur-sm">
              <svg width="20" height="20" viewBox="0 0 20 20">
                <path d="M6 3.5v13l11-6.5z" fill="var(--app-gold)" />
              </svg>
            </span>
          )}
          <span className="relative p-5">
            <span className="mb-2 block text-app-eyebrow uppercase tracking-app-wide text-[var(--app-gold-soft)]">
              {latestFromKanika.voiceNoteUrl
                ? "New voice note"
                : "New from Kanika"}
            </span>
            <span
              className="block text-app-display font-normal leading-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {latestFromKanika.title}
            </span>
            <span className="mt-1.5 block text-app-caption text-[var(--app-muted)]">
              Kanika ·{" "}
              {latestFromKanika.createdAt.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}
            </span>
          </span>
        </Link>
      )}

      {/* Today's moves */}
      <p className="mx-5 mb-2.5 text-app-eyebrow uppercase tracking-app-label text-[var(--app-dim)]">
        Today
      </p>
      <div className="mx-5 flex flex-col gap-2.5">
        {dailyMission && (
          <Move
            href={`/app/train/${dailyMission.scenarioId}`}
            title="Daily mission"
            sub={dailyMission.title}
            cta="PLAY"
            done={missionDone}
            icon={
              <svg viewBox="0 0 24 24">
                <path d="M12 3l7 4v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V7z" />
              </svg>
            }
          />
        )}
        <DailySetCard
          set={dailySet}
          streak={{
            current: dailyStreak.current,
            longest: dailyStreak.longest,
            atRisk: dailyStreak.isAtRisk,
          }}
        />
        {freshDrop && (
          <Move
            href={`/app/train/${freshDrop.scenarioId}`}
            title={`Fresh drop: ${freshDrop.title}`}
            sub={freshDrop.tagline}
            cta="PLAY"
            icon={
              <svg viewBox="0 0 24 24">
                <path d="M12 3v3m0 12v3m9-9h-3M6 12H3m14.5-6.5l-2 2m-9 9l-2 2m13 0l-2-2m-9-9l-2-2" />
              </svg>
            }
          />
        )}
      </div>

      {/* The membership, pitched by invitation. Free accounts only. */}
      {!access.isMember && (
        <div className="mx-5 mt-4">
          <MembershipTodayCard />
        </div>
      )}

      {/* Path continue card */}
      {current && (
        <Link
          href={appStepHref(current.step, viewer?.gender ?? null, access.isMember)}
          className="mx-5 mt-4 flex items-center gap-3.5 rounded-[18px] border border-[var(--app-line)] px-[18px] py-[18px]"
          style={{
            background:
              "linear-gradient(140deg, rgba(212,175,55,0.09), rgba(212,175,55,0.02))",
          }}
        >
          <span className="min-w-0 flex-1">
            <span className="mb-1.5 block text-app-eyebrow uppercase tracking-app-label text-[var(--app-gold-soft)]">
              The Path · Chapter {current.chapter.number}
            </span>
            <span
              className="block truncate text-app-title"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {current.chapter.title}
            </span>
            <span className="mt-3 block h-[3px] overflow-hidden rounded-full bg-[var(--app-line)]">
              <span
                className="block h-full rounded-full bg-[var(--app-gold)]"
                style={{ width: `${pathPct}%` }}
              />
            </span>
          </span>
          <span className="shrink-0 text-xs tracking-app-wide text-[var(--app-gold)]">
            CONTINUE →
          </span>
        </Link>
      )}
    </div>
  );
}
