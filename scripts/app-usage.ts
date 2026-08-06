/**
 * Read-only snapshot: how many people are actually using the app (/app).
 *
 * Two lenses, because one alone lies:
 *   1. Sign-in liveness (User.lastSeenAt) covers everyone, app or consilium.
 *   2. App-only surfaces (The Mark, Arcade, check-ins, the path, the Pact,
 *      the program) prove someone was inside /app rather than /consilium.
 */

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type Row = { metric: string; n: bigint | number };

async function main() {
  const liveness = await prisma.$queryRaw<Row[]>`
    SELECT 'humans total' AS metric, COUNT(*) AS n FROM "User" WHERE NOT "isBot" AND NOT "isTrainingBot"
    UNION ALL SELECT 'bots', COUNT(*) FROM "User" WHERE "isBot" OR "isTrainingBot"
    UNION ALL SELECT 'seen last 24h', COUNT(*) FROM "User" WHERE NOT "isBot" AND NOT "isTrainingBot" AND "lastSeenAt" > now() - interval '1 day'
    UNION ALL SELECT 'seen last 7d',  COUNT(*) FROM "User" WHERE NOT "isBot" AND NOT "isTrainingBot" AND "lastSeenAt" > now() - interval '7 days'
    UNION ALL SELECT 'seen last 30d', COUNT(*) FROM "User" WHERE NOT "isBot" AND NOT "isTrainingBot" AND "lastSeenAt" > now() - interval '30 days'
    UNION ALL SELECT 'never seen',    COUNT(*) FROM "User" WHERE NOT "isBot" AND NOT "isTrainingBot" AND "lastSeenAt" IS NULL
  `;

  console.log("\n=== SIGN-IN LIVENESS (all surfaces) ===\n");
  for (const r of liveness) console.log(`  ${r.metric.padEnd(16)} ${Number(r.n)}`);

  const surfaces = await prisma.$queryRaw<
    { surface: string; users: bigint | number; events: bigint | number; first: Date | null; last: Date | null }[]
  >`
    WITH h AS (SELECT id FROM "User" WHERE NOT "isBot" AND NOT "isTrainingBot")
    SELECT 'The Mark (encounters)' AS surface, COUNT(DISTINCT t."userId") AS users, COUNT(*) AS events,
           MIN(t."createdAt") AS first, MAX(t."createdAt") AS last FROM "MarkEncounter" t JOIN h ON h.id = t."userId"
    UNION ALL SELECT 'Baseline Read', COUNT(DISTINCT t."userId"), COUNT(*), MIN(t."takenAt"), MAX(t."takenAt") FROM "BaselineAttempt" t JOIN h ON h.id = t."userId"
    UNION ALL SELECT 'Mirror (in-app)', COUNT(DISTINCT t."userId"), COUNT(*), MIN(t."takenAt"), MAX(t."takenAt") FROM "MirrorReading" t JOIN h ON h.id = t."userId"
    UNION ALL SELECT 'Arcade / games', COUNT(DISTINCT t."userId"), COUNT(*), MIN(t."playedAt"), MAX(t."playedAt") FROM "GameSession" t JOIN h ON h.id = t."userId"
    UNION ALL SELECT 'Daily check-in', COUNT(DISTINCT t."userId"), COUNT(*), MIN(t."createdAt"), MAX(t."createdAt") FROM "DailyCheckIn" t JOIN h ON h.id = t."userId"
    UNION ALL SELECT 'Path steps', COUNT(DISTINCT t."userId"), COUNT(*), MIN(t."completedAt"), MAX(t."completedAt") FROM "UserPathProgress" t JOIN h ON h.id = t."userId"
    UNION ALL SELECT 'Pacts signed', COUNT(DISTINCT t."userId"), COUNT(*), MIN(t."signedAt"), MAX(t."signedAt") FROM "Pact" t JOIN h ON h.id = t."userId"
    UNION ALL SELECT 'Pact entries', COUNT(DISTINCT t."userId"), COUNT(*), MIN(t."createdAt"), MAX(t."createdAt") FROM "PactEntry" t JOIN h ON h.id = t."userId"
    UNION ALL SELECT 'Program enrolled', COUNT(DISTINCT t."userId"), COUNT(*), MIN(t."startedAt"), MAX(t."startedAt") FROM "ProgramEnrollment" t JOIN h ON h.id = t."userId"
    UNION ALL SELECT 'Lesson views', COUNT(DISTINCT t."userId"), COUNT(*), MIN(t."viewedAt"), MAX(t."viewedAt") FROM "LessonView" t JOIN h ON h.id = t."userId"
    UNION ALL SELECT 'Journal entries', COUNT(DISTINCT t."userId"), COUNT(*), MIN(t."createdAt"), MAX(t."createdAt") FROM "JournalEntry" t JOIN h ON h.id = t."userId"
    UNION ALL SELECT 'Simulator runs', COUNT(DISTINCT t."userId"), COUNT(*), MIN(t."startedAt"), MAX(t."startedAt") FROM "SimulatorProgress" t JOIN h ON h.id = t."userId"
    UNION ALL SELECT 'Tell responses', COUNT(DISTINCT t."userId"), COUNT(*), MIN(t."answeredAt"), MAX(t."answeredAt") FROM "TellResponse" t JOIN h ON h.id = t."userId"
    UNION ALL SELECT 'Receipts', COUNT(DISTINCT t."userId"), COUNT(*), MIN(t."createdAt"), MAX(t."createdAt") FROM "Receipt" t JOIN h ON h.id = t."userId"
  `;

  console.log("\n=== SURFACE ACTIVITY (all time) ===\n");
  console.log("  surface               users  events  first        last");
  for (const s of surfaces) {
    const f = s.first ? s.first.toISOString().slice(0, 10) : "-";
    const l = s.last ? s.last.toISOString().slice(0, 10) : "-";
    console.log(
      `  ${s.surface.padEnd(21)} ${String(Number(s.users)).padStart(5)}  ${String(Number(s.events)).padStart(6)}  ${f.padEnd(11)}  ${l}`
    );
  }

  // App-only surfaces, unioned, so one person counts once no matter how
  // many app things they touched.
  const appOnly = await prisma.$queryRaw<Row[]>`
    WITH h AS (SELECT id FROM "User" WHERE NOT "isBot" AND NOT "isTrainingBot"),
    raw_events AS (
      SELECT "userId", "createdAt" AS at FROM "MarkEncounter"
      UNION ALL SELECT "userId", "takenAt" FROM "BaselineAttempt"
      UNION ALL SELECT "userId", "takenAt" FROM "MirrorReading"
      UNION ALL SELECT "userId", "playedAt" FROM "GameSession"
      UNION ALL SELECT "userId", "createdAt" FROM "DailyCheckIn"
      UNION ALL SELECT "userId", "completedAt" FROM "UserPathProgress"
      UNION ALL SELECT "userId", "signedAt" FROM "Pact"
      UNION ALL SELECT "userId", "createdAt" FROM "PactEntry"
      UNION ALL SELECT "userId", "viewedAt" FROM "LessonView"
    ),
    app_events AS (SELECT r.* FROM raw_events r JOIN h ON h.id = r."userId")
    SELECT 'app users all time' AS metric, COUNT(DISTINCT "userId") AS n FROM app_events
    UNION ALL SELECT 'app users last 24h', COUNT(DISTINCT "userId") FROM app_events WHERE at > now() - interval '1 day'
    UNION ALL SELECT 'app users last 7d',  COUNT(DISTINCT "userId") FROM app_events WHERE at > now() - interval '7 days'
    UNION ALL SELECT 'app users last 30d', COUNT(DISTINCT "userId") FROM app_events WHERE at > now() - interval '30 days'
  `;

  console.log("\n=== APP-ONLY SURFACES (deduped people) ===\n");
  for (const r of appOnly) console.log(`  ${r.metric.padEnd(20)} ${Number(r.n)}`);

  const daily = await prisma.$queryRaw<{ day: Date; users: bigint | number }[]>`
    WITH h AS (SELECT id FROM "User" WHERE NOT "isBot" AND NOT "isTrainingBot"),
    raw_events AS (
      SELECT "userId", "createdAt" AS at FROM "MarkEncounter"
      UNION ALL SELECT "userId", "takenAt" FROM "BaselineAttempt"
      UNION ALL SELECT "userId", "takenAt" FROM "MirrorReading"
      UNION ALL SELECT "userId", "playedAt" FROM "GameSession"
      UNION ALL SELECT "userId", "createdAt" FROM "DailyCheckIn"
      UNION ALL SELECT "userId", "completedAt" FROM "UserPathProgress"
      UNION ALL SELECT "userId", "signedAt" FROM "Pact"
      UNION ALL SELECT "userId", "createdAt" FROM "PactEntry"
      UNION ALL SELECT "userId", "viewedAt" FROM "LessonView"
    ),
    app_events AS (SELECT r.* FROM raw_events r JOIN h ON h.id = r."userId")
    SELECT date_trunc('day', at) AS day, COUNT(DISTINCT "userId") AS users
    FROM app_events WHERE at > now() - interval '14 days'
    GROUP BY 1 ORDER BY 1
  `;

  console.log("\n=== APP DAILY ACTIVE (last 14 days) ===\n");
  if (daily.length === 0) console.log("  no app activity in the window");
  for (const d of daily) {
    console.log(`  ${d.day.toISOString().slice(0, 10)}  ${Number(d.users)}`);
  }
  console.log();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
