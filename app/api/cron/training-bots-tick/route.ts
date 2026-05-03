/**
 * POST /api/cron/training-bots-tick
 *
 * Daily cron. For each training bot, decides whether they "show up" for
 * today's main Tell based on their archetype's activity probability,
 * and if so writes a TellResponse + applies streak + Elo via the same
 * pipeline real members use.
 *
 * Scheduling: run shortly after the daily Tell goes live in UTC. Once
 * a day is enough — bots resolve their answer for the day in one batch
 * and the leaderboard reads correctly until tomorrow's tick.
 *
 * Idempotent: `recordBotAnswer` short-circuits if the bot already has a
 * response for the Tell, so re-runs are safe.
 *
 * Auth: x-cron-secret header (CRON_SECRET or ADMIN_SECRET fallback).
 */

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { logger } from "@/lib/logger";
import { recordBotAnswer } from "@/lib/tells/bots/answer";
import {
  decidesToSolve,
  botSeedFromId,
  type BotProfile,
} from "@/lib/tells/bots/profiles";
import { utcDateKey } from "@/lib/tells/streak";

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

  const today = utcDateKey();

  // Pick today's main Tell using the same selection rule the live page
  // uses (most recently scheduled PUBLISHED Tell on or before now).
  const tell = await prisma.tell.findFirst({
    where: { status: "PUBLISHED", scheduleDate: { lte: new Date() } },
    orderBy: { scheduleDate: "desc" },
    select: { id: true, difficulty: true, axes: true, choices: true },
  });
  if (!tell) {
    return NextResponse.json({
      ok: true,
      skipped: "no-published-tell",
      considered: 0,
      solved: 0,
    });
  }

  // Pull every training bot. A separate `botProfile` field on the User
  // row tells us each bot's archetype; null profiles are skipped (the
  // seeder always writes one, but defence in depth).
  const bots = await prisma.user.findMany({
    where: { isTrainingBot: true },
    select: { id: true, botProfile: true },
  });

  const counts = { considered: 0, solved: 0, skipped: 0, errored: 0 };

  for (const bot of bots) {
    counts.considered++;
    const profile = bot.botProfile as unknown as BotProfile | null;
    if (!profile) {
      counts.skipped++;
      continue;
    }

    const seed = botSeedFromId(bot.id);
    if (!decidesToSolve(seed, today, profile.activityProb)) {
      counts.skipped++;
      continue;
    }

    try {
      const result = await recordBotAnswer({
        botUserId: bot.id,
        tell,
        baseAccuracy: profile.baseAccuracy,
        utcDate: today,
        preferredHourUtc: profile.preferredHourUtc,
      });
      if (result.inserted) counts.solved++;
      else counts.skipped++; // already-answered (idempotent re-run)
    } catch (err) {
      counts.errored++;
      logger.error(
        "[cron training-bots-tick] bot solve failed",
        err instanceof Error ? err : new Error(String(err)),
        { botUserId: bot.id, tellId: tell.id },
      );
    }
  }

  return NextResponse.json({ ok: true, tellId: tell.id, ...counts });
}
