import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyCronSecret } from "@/lib/cron-auth";
import { sendPushToUser } from "@/lib/push";
import { getDailyMission } from "@/lib/streak/daily-mission";
import { logger } from "@/lib/logger";

/**
 * Cron: daily streak-save / mission nudge — the retention mechanic against
 * dormancy.
 *
 * Sweeps hourly and nudges each member in their own hour, derived from when
 * they last opened the app. At most one nudge per member per UTC day:
 *   - at-risk streak holders (streak > 0, last play = yesterday) get
 *     "your N-day streak breaks tonight"
 *   - everyone else who hasn't played gets a gentler "today's mission is ready"
 *
 * Skipped: anyone who played today, and anyone who merely opened the app
 * today. The second one matters. Someone who has been in already saw the
 * mission card; pushing them is nagging, and nagging is how a product ends
 * up muted.
 *
 * Push only. Email re-engagement for the genuinely-gone cohort is handled by
 * the 14-day dormant-member drip; a *daily* email would be fatiguing. Push
 * reaches PWA-installed members — the engaged-ish cohort whose streaks are
 * worth protecting.
 *
 * Opt-out: sendPushToUser gates on the dailyStreak category (default-on).
 * Idempotency: pushPreferences.dailyStreakNudgeLastSent (YYYY-MM-DD) blocks a
 * second nudge the same day (e.g. a manual re-run over the scheduled one).
 */

/**
 * Fallback send hour (UTC) for members with no lastSeenAt to learn from.
 * The old fixed schedule, kept for anyone we know nothing about yet.
 */
const FALLBACK_SEND_HOUR_UTC = 20;

function utcDateKey(d: Date): string {
  return d.toISOString().slice(0, 10);
}

/**
 * The hour we nudge this member, in UTC.
 *
 * Derived from when they were last actually here. A UTC hour would be a
 * poor guess at someone's evening, but the hour they themselves last
 * opened the app is not a guess: their timezone and their habits are
 * already baked into it. Members we have never seen fall back to the
 * fixed evening slot.
 */
function sendHourFor(lastSeenAt: Date | null): number {
  return lastSeenAt ? lastSeenAt.getUTCHours() : FALLBACK_SEND_HOUR_UTC;
}

export async function POST(request: NextRequest) {
  if (!verifyCronSecret(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const now = new Date();
    const today = utcDateKey(now);
    const yesterday = new Date(now);
    yesterday.setUTCDate(yesterday.getUTCDate() - 1);
    const yesterdayKey = utcDateKey(yesterday);
    const mission = getDailyMission(now);

    // Member count is small; fetch active humans and filter in code so the
    // "hasn't played today" check (including never-played nulls) is exact.
    const members = await prisma.user.findMany({
      where: {
        isBot: false,
        isTrainingBot: false,
        communityMembership: { status: "ACTIVE" },
      },
      select: {
        id: true,
        dailyStreakCurrent: true,
        dailyStreakLastDate: true,
        lastSeenAt: true,
        pushPreferences: true,
      },
    });

    const hourNow = now.getUTCHours();

    let atRiskSent = 0;
    let missionSent = 0;
    let alreadyPlayed = 0;
    let alreadyOpened = 0;
    let notTheirHour = 0;
    let skippedSent = 0;

    for (const m of members) {
      // Already played today — nothing to nudge.
      if (m.dailyStreakLastDate === today) {
        alreadyPlayed++;
        continue;
      }
      // Opened the app today without playing. They have already seen the
      // mission card sitting there, so a push would be nagging rather than
      // reminding. The nudge is for people who have not been back.
      if (m.lastSeenAt && utcDateKey(m.lastSeenAt) === today) {
        alreadyOpened++;
        continue;
      }
      // Their hour, not ours. The cron sweeps hourly and each member is
      // only eligible in the slot their own history points at.
      if (sendHourFor(m.lastSeenAt) !== hourNow) {
        notTheirHour++;
        continue;
      }

      const prefs =
        (m.pushPreferences as Record<string, unknown> | null) ?? {};
      // One nudge per UTC day.
      if (prefs.dailyStreakNudgeLastSent === today) {
        skippedSent++;
        continue;
      }

      const atRisk =
        m.dailyStreakCurrent > 0 && m.dailyStreakLastDate === yesterdayKey;

      const payload = atRisk
        ? {
            title: `Your ${m.dailyStreakCurrent}-day streak breaks tonight`,
            body: mission
              ? `Keep it alive. Today's mission: ${mission.title}`
              : "Play today before midnight to keep it alive.",
            url: mission?.href ?? "/consilium/simulator",
            tag: "daily-streak",
          }
        : {
            title: "Today's mission is ready",
            body: mission ? mission.title : "A fresh scenario is waiting.",
            url: mission?.href ?? "/consilium/simulator",
            tag: "daily-streak",
          };

      const delivered = await sendPushToUser(m.id, "dailyStreak", payload);

      if (delivered > 0) {
        if (atRisk) atRiskSent++;
        else missionSent++;
        // Mark sent only on actual delivery: members with no subscription (or
        // who opted out) aren't written, and a re-run just re-attempts a
        // cheap no-op send for them.
        await prisma.user
          .update({
            where: { id: m.id },
            data: {
              pushPreferences: { ...prefs, dailyStreakNudgeLastSent: today },
            },
          })
          .catch((err) => {
            logger.error(
              "[cron/daily-streak-nudge] mark-sent failed",
              err instanceof Error ? err : undefined,
              { userId: m.id },
            );
          });
      }
    }

    return NextResponse.json({
      success: true,
      candidates: members.length,
      hourUtc: hourNow,
      alreadyPlayed,
      alreadyOpened,
      notTheirHour,
      atRiskSent,
      missionSent,
      skippedSent,
    });
  } catch (error) {
    logger.error(
      "[cron/daily-streak-nudge] error",
      error instanceof Error ? error : undefined,
    );
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
