import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const H = `NOT "isBot" AND NOT "isTrainingBot"`;

async function q<T>(label: string, sql: string): Promise<T[]> {
  const rows = await prisma.$queryRawUnsafe<T[]>(sql);
  console.log(`\n### ${label}`);
  for (const r of rows) console.log("  " + JSON.stringify(r));
  return rows;
}

async function main() {
  await q(
    "SIGNUPS BY HOUR TODAY (UTC)",
    `SELECT date_trunc('hour', "createdAt") AS hour, COUNT(*)::int AS signups
     FROM "User" WHERE ${H} AND "createdAt" > now() - interval '36 hours'
     GROUP BY 1 ORDER BY 1`
  );

  await q(
    "ATTRIBUTION: last 2 days signups",
    `SELECT COALESCE("utmSource",'(none)') AS utm_source,
            COALESCE("utmCampaign",'(none)') AS campaign,
            COUNT(*)::int AS n
     FROM "User" WHERE ${H} AND "createdAt" > now() - interval '2 days'
     GROUP BY 1,2 ORDER BY 3 DESC LIMIT 12`
  );

  await q(
    "REFERRER: last 2 days",
    `SELECT COALESCE(NULLIF(split_part(regexp_replace("referrer",'^https?://',''),'/',1),''),'(direct)') AS host,
            COUNT(*)::int AS n
     FROM "User" WHERE ${H} AND "createdAt" > now() - interval '2 days'
     GROUP BY 1 ORDER BY 2 DESC LIMIT 12`
  );

  await q(
    "LANDING PAGE: last 2 days",
    `SELECT COALESCE(split_part("landingPage",'?',1),'(none)') AS page, COUNT(*)::int AS n
     FROM "User" WHERE ${H} AND "createdAt" > now() - interval '2 days'
     GROUP BY 1 ORDER BY 2 DESC LIMIT 12`
  );

  await q(
    "COUNTRY: last 2 days",
    `SELECT COALESCE("ipCountry",'(unknown)') AS country, COUNT(*)::int AS n
     FROM "User" WHERE ${H} AND "createdAt" > now() - interval '2 days'
     GROUP BY 1 ORDER BY 2 DESC LIMIT 12`
  );

  await q(
    "DEVICE: last 2 days",
    `SELECT CASE
              WHEN "userAgent" ILIKE '%iphone%' OR "userAgent" ILIKE '%android%'
                   OR "userAgent" ILIKE '%mobile%' THEN 'mobile'
              WHEN "userAgent" ILIKE '%ipad%' OR "userAgent" ILIKE '%tablet%' THEN 'tablet'
              WHEN "userAgent" IS NULL THEN '(unknown)'
              ELSE 'desktop' END AS device,
            COUNT(*)::int AS n
     FROM "User" WHERE ${H} AND "createdAt" > now() - interval '2 days'
     GROUP BY 1 ORDER BY 2 DESC`
  );

  await q(
    "ACTIVATION LATENCY: signup to first action (last 2 days)",
    `WITH h AS (SELECT id, "createdAt" FROM "User" WHERE ${H} AND "createdAt" > now() - interval '2 days'),
     ev AS (
       SELECT "userId", "startedAt" AS at FROM "SimulatorProgress"
       UNION ALL SELECT "userId", "playedAt" FROM "GameSession"
       UNION ALL SELECT "userId", "createdAt" FROM "DailyCheckIn"
       UNION ALL SELECT "userId", "takenAt" FROM "MirrorReading"
     ),
     f AS (SELECT h.id, h."createdAt" AS signed, MIN(ev.at) AS first_at
           FROM h LEFT JOIN ev ON ev."userId" = h.id GROUP BY 1,2)
     SELECT CASE WHEN first_at IS NULL THEN 'never acted'
                 WHEN first_at - signed < interval '2 minutes' THEN 'under 2 min'
                 WHEN first_at - signed < interval '10 minutes' THEN '2-10 min'
                 WHEN first_at - signed < interval '1 hour' THEN '10-60 min'
                 ELSE 'over an hour' END AS bucket,
            COUNT(*)::int AS n
     FROM f GROUP BY 1 ORDER BY 2 DESC`
  );

  await q(
    "ACTIVITY BY HOUR, last 36h (all app surfaces)",
    `WITH h AS (SELECT id FROM "User" WHERE ${H}),
     ev AS (
       SELECT "userId", "startedAt" AS at FROM "SimulatorProgress"
       UNION ALL SELECT "userId", "playedAt" FROM "GameSession"
       UNION ALL SELECT "userId", "createdAt" FROM "MarkEncounter"
       UNION ALL SELECT "userId", "createdAt" FROM "DailyCheckIn"
       UNION ALL SELECT "userId", "takenAt" FROM "MirrorReading"
     )
     SELECT date_trunc('hour', ev.at) AS hour, COUNT(DISTINCT ev."userId")::int AS people,
            COUNT(*)::int AS events
     FROM ev JOIN h ON h.id = ev."userId"
     WHERE ev.at > now() - interval '36 hours' GROUP BY 1 ORDER BY 1`
  );

  await q(
    "WHICH SCENARIOS (last 2 days)",
    `SELECT s."scenarioId", COUNT(*)::int AS runs,
            COUNT(s."completedAt")::int AS completed,
            COUNT(DISTINCT s."userId")::int AS people
     FROM "SimulatorProgress" s JOIN "User" u ON u.id = s."userId"
     WHERE ${H.replace(/"is/g, 'u."is')} AND s."startedAt" > now() - interval '2 days'
     GROUP BY 1 ORDER BY 2 DESC LIMIT 15`
  );

  await q(
    "PUSH: subscriptions created",
    `SELECT date_trunc('day', p."createdAt") AS day, COUNT(*)::int AS subs,
            COUNT(DISTINCT p."userId")::int AS people
     FROM "PushSubscription" p JOIN "User" u ON u.id = p."userId"
     WHERE ${H.replace(/"is/g, 'u."is')} AND p."createdAt" > now() - interval '9 days'
     GROUP BY 1 ORDER BY 1 DESC`
  );

  await q(
    "QUIZ: results created vs paid, last 2 days",
    `SELECT date_trunc('day', "createdAt") AS day, COUNT(*)::int AS results,
            COUNT(*) FILTER (WHERE paid)::int AS paid
     FROM "QuizResult" WHERE "createdAt" > now() - interval '2 days'
     GROUP BY 1 ORDER BY 1 DESC`
  );

  await q(
    "BOOK BUYERS TODAY: do they also use the app?",
    `WITH b AS (SELECT DISTINCT p."userId" FROM "Purchase" p
                WHERE p."createdAt" > now() - interval '2 days'
                  AND p."type"::text = 'BOOK' AND p."userId" IS NOT NULL),
     ev AS (
       SELECT "userId" FROM "SimulatorProgress"
       UNION ALL SELECT "userId" FROM "GameSession"
       UNION ALL SELECT "userId" FROM "MarkEncounter"
     )
     SELECT (SELECT COUNT(*)::int FROM b) AS book_buyers_with_account,
            (SELECT COUNT(*)::int FROM b WHERE EXISTS (SELECT 1 FROM ev WHERE ev."userId" = b."userId")) AS also_used_app`
  );

  await q(
    "STANDING / XP spread among recent actors",
    `SELECT CASE WHEN u.standing = 0 THEN '0'
                 WHEN u.standing < 50 THEN '1-49'
                 WHEN u.standing < 200 THEN '50-199'
                 ELSE '200+' END AS standing_band,
            COUNT(*)::int AS people
     FROM "User" u
     WHERE ${H.replace(/"is/g, 'u."is')} AND u."createdAt" > now() - interval '2 days'
     GROUP BY 1 ORDER BY 2 DESC`
  );

  await q(
    "SIMULATOR MODE: story vs gauntlet (last 3 days)",
    `SELECT COALESCE(s.mode,'(null)') AS mode, COUNT(*)::int AS runs,
            COUNT(s."completedAt")::int AS completed
     FROM "SimulatorProgress" s JOIN "User" u ON u.id = s."userId"
     WHERE ${H.replace(/"is/g, 'u."is')} AND s."startedAt" > now() - interval '3 days'
     GROUP BY 1 ORDER BY 2 DESC`
  );

  await q(
    "EMAIL LIST: subscribers added",
    `SELECT date_trunc('day', "createdAt") AS day, COUNT(*)::int AS n
     FROM "Subscriber" WHERE "createdAt" > now() - interval '9 days'
     GROUP BY 1 ORDER BY 1 DESC`
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
