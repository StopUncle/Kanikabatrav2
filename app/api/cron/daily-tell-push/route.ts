/**
 * POST /api/cron/daily-tell-push
 *
 * Hourly cron. For each user who has opted in to the dailyTell push
 * category, decides whether right now is their preferred hour in their
 * local timezone, and if so, sends a push notification pointing them
 * at today's Tell.
 *
 * Auth: x-cron-secret header, or ADMIN_SECRET fallback to match the
 * existing pattern.
 *
 * Idempotency: each user has `dailyTellLastSent` (YYYY-MM-DD in their
 * local TZ) stored on pushPreferences JSON. Sending sets it to today's
 * local date; the next call within the same day skips them.
 *
 * Safe re-runs: even if the cron is hit twice in the same hour, the
 * dedup gate prevents double-sending.
 */

import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { sendPushToUser } from "@/lib/push";
import { getLocalTimePointSafe, shouldSendDailyTellPush } from "@/lib/push/timezone";
import { getTodaysTellRow } from "@/lib/tells/db";
import { logger } from "@/lib/logger";

interface DailyTellPrefs {
  enabled: boolean;
  hour: number;
  lastSent: string | null;
}

const DEFAULT_HOUR = 8;

function readDailyTellPrefs(raw: Prisma.JsonValue | null): DailyTellPrefs {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) {
    return { enabled: false, hour: DEFAULT_HOUR, lastSent: null };
  }
  const obj = raw as Record<string, unknown>;
  return {
    enabled: obj.dailyTell === true,
    hour:
      typeof obj.dailyTellHour === "number" &&
      Number.isInteger(obj.dailyTellHour) &&
      (obj.dailyTellHour as number) >= 0 &&
      (obj.dailyTellHour as number) <= 23
        ? (obj.dailyTellHour as number)
        : DEFAULT_HOUR,
    lastSent:
      typeof obj.dailyTellLastSent === "string"
        ? (obj.dailyTellLastSent as string)
        : null,
  };
}

function authorize(request: NextRequest): boolean {
  const secret = request.headers.get("x-cron-secret");
  return (
    secret === process.env.CRON_SECRET ||
    secret === process.env.ADMIN_SECRET
  );
}

export async function POST(request: NextRequest) {
  if (!authorize(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Bail early if no Tell is currently published — no point pinging anyone.
  const todaysTell = await getTodaysTellRow();
  if (!todaysTell) {
    return NextResponse.json({
      ok: true,
      skipped: "no-published-tell",
      sent: 0,
      considered: 0,
    });
  }

  // Pull every user with a push subscription (so we only consider users
  // who *can* receive a push). Cheaper than scanning the whole User table
  // when most members never installed the PWA.
  const candidates = await prisma.user.findMany({
    where: {
      pushSubscriptions: { some: {} },
      isBanned: false,
      // Only members with active community membership get the daily push.
      // Anonymous /tells visitors don't have push subs anyway, but this
      // hardens against a lapsed-member edge case where the sub still
      // exists but the value isn't there.
      communityMembership: { status: "ACTIVE" },
    },
    select: {
      id: true,
      timezone: true,
      pushPreferences: true,
    },
  });

  const now = new Date();
  let considered = 0;
  let sent = 0;
  let skippedNotEnabled = 0;
  let skippedNotMyHour = 0;
  let skippedAlreadySent = 0;

  for (const user of candidates) {
    considered++;
    const prefs = readDailyTellPrefs(user.pushPreferences);

    if (!prefs.enabled) {
      skippedNotEnabled++;
      continue;
    }

    const local = getLocalTimePointSafe(user.timezone, now);
    const newLastSent = shouldSendDailyTellPush({
      preferredHour: prefs.hour,
      lastSentDate: prefs.lastSent,
      currentLocal: local,
    });

    if (newLastSent === null) {
      if (prefs.lastSent === local.date) skippedAlreadySent++;
      else skippedNotMyHour++;
      continue;
    }

    // Send the push. tag-by-date so the same notification on the user's
    // lock screen replaces the previous (rather than stacking) if they
    // have multiple devices firing within the window.
    try {
      const delivered = await sendPushToUser(user.id, "dailyTell", {
        title: "Today's Tell is ready",
        body: "Sixty seconds. One artifact, one read. Train your instincts.",
        url: "/consilium/instincts/today",
        tag: `daily-tell-${newLastSent}`,
      });

      if (delivered > 0) {
        sent++;
        // Persist the lastSent date so the same user is not pinged
        // again today. Re-merge the existing JSON so we don't clobber
        // the boolean toggles.
        const merged = {
          ...(user.pushPreferences && typeof user.pushPreferences === "object"
            ? (user.pushPreferences as Record<string, unknown>)
            : {}),
          dailyTellLastSent: newLastSent,
        };
        await prisma.user.update({
          where: { id: user.id },
          data: { pushPreferences: merged as Prisma.InputJsonValue },
        });
      }
    } catch (err) {
      logger.error(
        "[cron daily-tell-push] send failed",
        err instanceof Error ? err : new Error(String(err)),
        { userId: user.id, hour: prefs.hour },
      );
    }
  }

  return NextResponse.json({
    ok: true,
    considered,
    sent,
    skippedNotEnabled,
    skippedNotMyHour,
    skippedAlreadySent,
  });
}
