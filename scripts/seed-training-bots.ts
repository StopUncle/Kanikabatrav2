/**
 * Seed Tells training bots into the database.
 *
 * Run:
 *   npx tsx scripts/seed-training-bots.ts                  # local
 *   DATABASE_URL=<prod-public> npx tsx scripts/seed-training-bots.ts
 *
 * Idempotent. Checks the existing training-bot count and tops up to the
 * target without duplicating handles. Re-running the script on a fresh
 * day produces the same cohort if the seed env var is fixed; defaults
 * to a fresh seed each run.
 *
 * Flags via env:
 *   BOTS_TARGET=80             # how many training bots to end up with
 *   BOTS_SEED=42               # deterministic cohort if set
 *   BOTS_HISTORY_DAYS=30       # backfill horizon
 *   BOTS_DRY_RUN=true          # plan only, no DB writes
 */

import bcrypt from "bcryptjs";
import crypto from "node:crypto";
import { PrismaClient } from "@prisma/client";
import { generateHandleCandidates } from "../lib/tells/bots/names";
import { generateProfile, botSeedFromId } from "../lib/tells/bots/profiles";
import { backfillBotHistory } from "../lib/tells/bots/seed-history";
import type { BotProfile } from "../lib/tells/bots/profiles";

const prisma = new PrismaClient();

const TARGET_TOTAL = Number(process.env.BOTS_TARGET ?? 80);
const COHORT_SEED = Number(process.env.BOTS_SEED ?? Date.now());
const HISTORY_DAYS = Number(process.env.BOTS_HISTORY_DAYS ?? 30);
const DRY_RUN = process.env.BOTS_DRY_RUN === "true";

async function main(): Promise<void> {
  console.log(
    `[seed-training-bots] target=${TARGET_TOTAL} seed=${COHORT_SEED} history=${HISTORY_DAYS}d dry-run=${DRY_RUN}`,
  );

  const existing = await prisma.user.count({ where: { isTrainingBot: true } });
  console.log(`[seed-training-bots] existing training bots: ${existing}`);

  const need = Math.max(0, TARGET_TOTAL - existing);
  if (need === 0) {
    console.log("[seed-training-bots] target met, nothing to do.");
    await prisma.$disconnect();
    return;
  }

  // Generate ~3x the candidate handles needed so collisions don't
  // starve the cohort. Filter against existing User.handle to avoid
  // colliding with real members or earlier bot batches.
  const candidates = generateHandleCandidates(need * 3, COHORT_SEED);
  const taken = await prisma.user.findMany({
    where: { handle: { in: candidates } },
    select: { handle: true },
  });
  const takenSet = new Set(taken.map((t) => t.handle));
  const available = candidates.filter((h) => !takenSet.has(h));

  if (available.length < need) {
    console.warn(
      `[seed-training-bots] only ${available.length} unique handles for ${need} bots — try a different BOTS_SEED.`,
    );
  }

  const handlesToUse = available.slice(0, need);
  console.log(
    `[seed-training-bots] will create ${handlesToUse.length} bots`,
  );

  if (DRY_RUN) {
    for (const h of handlesToUse) console.log(`  + ${h}`);
    await prisma.$disconnect();
    return;
  }

  let created = 0;
  let backfilledRows = 0;
  for (const handle of handlesToUse) {
    try {
      const { userId, profile } = await createOneBot(handle);
      const result = await backfillBotHistory({
        botUserId: userId,
        profile,
        days: HISTORY_DAYS,
      });
      backfilledRows += result.responsesWritten;
      created++;
      console.log(
        `  + ${handle} (${profile.archetype}) backfilled ${result.responsesWritten}/${result.daysWalked} days`,
      );
    } catch (err) {
      console.error(
        `  ! ${handle} failed:`,
        err instanceof Error ? err.message : err,
      );
    }
  }

  console.log(
    `[seed-training-bots] done. created=${created} backfilled=${backfilledRows} responses`,
  );
  await prisma.$disconnect();
}

async function createOneBot(handle: string): Promise<{
  userId: string;
  profile: BotProfile;
}> {
  // Per-bot integer seed for the profile. Deterministic given the
  // handle, so re-running the seeder for an existing handle (impossible
  // here, but a defence in depth) would produce the same archetype.
  const profileSeed = botSeedFromId(`pre|${handle}`);
  const profile = generateProfile(profileSeed);

  // Random opaque password (never used — bots can't log in). bcrypt
  // hashed so the column type matches the human-user shape.
  const password = await bcrypt.hash(
    crypto.randomBytes(48).toString("hex"),
    10,
  );

  const user = await prisma.user.create({
    data: {
      email: `tells-bot-${handle}@training.local`,
      password,
      handle,
      // profilePublic must be true for /u/[handle] to surface the bot.
      // The leaderboard / hex-card share artefacts depend on this.
      profilePublic: true,
      role: "MEMBER",
      isTrainingBot: true,
      // Distinct from `isBot` (community-engagement bots).
      isBot: false,
      botProfile: {
        archetype: profile.archetype,
        activityProb: profile.activityProb,
        baseAccuracy: profile.baseAccuracy,
        originDay: profile.originDay,
        preferredHourUtc: profile.preferredHourUtc,
      },
      // Seed the InstinctScore row up-front with the profile's per-axis
      // starting Elo so the very first backfilled answer applies the
      // correct K-factor adjustments around a believable baseline.
      instinctScore: {
        create: {
          read: profile.startingElo.READ,
          spot: profile.startingElo.SPOT,
          reply: profile.startingElo.REPLY,
          refuse: profile.startingElo.REFUSE,
          calibrate: profile.startingElo.CALIBRATE,
          hold: profile.startingElo.HOLD,
          totalAnswered: 0,
        },
      },
      createdAt: new Date(`${profile.originDay}T00:00:00.000Z`),
    },
    select: { id: true },
  });

  return { userId: user.id, profile };
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
