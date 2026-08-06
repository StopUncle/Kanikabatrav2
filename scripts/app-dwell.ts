/**
 * How long are people spending in the app, on what, and where do they stop?
 *
 * There is no PostHog in prod, so there are no pageviews. Everything here is
 * derived from rows people wrote by doing something. Two consequences worth
 * stating before reading any number below:
 *
 *   1. Reading-only time is invisible. Someone who opens the app, reads a
 *      week card and leaves writes nothing, so they do not exist here. Every
 *      dwell figure is a FLOOR.
 *   2. Session spans are inferred by clustering a person's events with a
 *      30-minute gap rule, the convention every dwell report here uses.
 *      A session with one event has no span, so it is reported separately
 *      rather than counted as zero and dragging the median down.
 *
 * Exact durations exist for three surfaces and are used where available:
 * GameSession.durationSec, SimulatorProgress startedAt->completedAt, and
 * LabSession createdAt->endedAt. MarkEncounter.answerMs gives per-item
 * thinking time.
 *
 * UserPathProgress is deliberately excluded everywhere: those rows are
 * materialised lazily on read, including by the weekly-digest cron, so they
 * measure the cron rather than a person.
 */

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const SESSION_GAP_MS = 30 * 60 * 1000;
const WINDOW_DAYS = 14;

type Ev = {
  userId: string;
  at: Date;
  surface: string;
  durationms: number | null;
};

function fmt(ms: number): string {
  if (!Number.isFinite(ms)) return "n/a";
  const s = Math.round(ms / 1000);
  if (s < 60) return `${s}s`;
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m ${s % 60}s`;
  return `${(m / 60).toFixed(1)}h`;
}

function pct(arr: number[], p: number): number {
  if (arr.length === 0) return NaN;
  const s = [...arr].sort((a, b) => a - b);
  return s[Math.floor((s.length - 1) * p)] ?? NaN;
}

async function main() {
  const events = await prisma.$queryRaw<Ev[]>`
    WITH h AS (SELECT id FROM "User" WHERE NOT "isBot" AND NOT "isTrainingBot")
    SELECT r.* FROM (
      SELECT "userId", "createdAt" AS at, 'mark:' || lower("source"::text) AS surface,
             "answerMs"::double precision AS durationms FROM "MarkEncounter"
      UNION ALL SELECT "userId", "playedAt", 'arcade:' || "gameKey", "durationSec" * 1000.0 FROM "GameSession"
      UNION ALL SELECT "userId", "startedAt", 'simulator',
             CASE WHEN "completedAt" IS NOT NULL
                  THEN EXTRACT(EPOCH FROM ("completedAt" - "startedAt")) * 1000.0 END
             FROM "SimulatorProgress"
      UNION ALL SELECT "userId", "createdAt", 'lab',
             CASE WHEN "endedAt" IS NOT NULL
                  THEN EXTRACT(EPOCH FROM ("endedAt" - "createdAt")) * 1000.0 END
             FROM "LabSession"
      UNION ALL SELECT "userId", "answeredAt", 'tells', NULL FROM "TellResponse"
      UNION ALL SELECT "userId", "createdAt", 'checkin', NULL FROM "DailyCheckIn"
      UNION ALL SELECT "userId", "takenAt", 'mirror', NULL FROM "MirrorReading"
      UNION ALL SELECT "userId", "takenAt", 'baseline', NULL FROM "BaselineAttempt"
      UNION ALL SELECT "userId", "createdAt", 'receipts', NULL FROM "Receipt"
      UNION ALL SELECT "userId", "signedAt", 'pact:sign', NULL FROM "Pact"
      UNION ALL SELECT "userId", "createdAt", 'pact:entry', NULL FROM "PactEntry"
      UNION ALL SELECT "userId", "viewedAt", 'program:lesson', NULL FROM "LessonView"
      UNION ALL SELECT "userId", "startedAt", 'adventure', NULL FROM "AdventureProgress"
      UNION ALL SELECT "authorId", "createdAt", 'consilium:comment', NULL FROM "FeedComment"
      UNION ALL SELECT "userId", "createdAt", 'consilium:question', NULL FROM "MemberQuestion"
    ) r
    JOIN h ON h.id = r."userId"
    WHERE r.at > now() - (${WINDOW_DAYS} || ' days')::interval
    ORDER BY r."userId", r.at
  `;

  console.log(`\nEvents in last ${WINDOW_DAYS}d: ${events.length}`);
  console.log(`Distinct people: ${new Set(events.map((e) => e.userId)).size}\n`);

  // ---- Sessions ----
  type Session = {
    userId: string;
    start: Date;
    end: Date;
    events: number;
    surfaces: Set<string>;
    measuredMs: number;
  };
  const byUser = new Map<string, Ev[]>();
  for (const e of events) {
    const list = byUser.get(e.userId) ?? [];
    list.push(e);
    byUser.set(e.userId, list);
  }
  const sessions: Session[] = [];
  for (const [userId, evs] of Array.from(byUser.entries())) {
    evs.sort((a: Ev, b: Ev) => a.at.getTime() - b.at.getTime());
    let cur: Session | null = null;
    for (const e of evs) {
      if (cur && e.at.getTime() - cur.end.getTime() <= SESSION_GAP_MS) {
        cur.end = e.at;
        cur.events++;
        cur.surfaces.add(e.surface.split(":")[0]!);
        cur.measuredMs += e.durationms ?? 0;
      } else {
        if (cur) sessions.push(cur);
        cur = {
          userId,
          start: e.at,
          end: e.at,
          events: 1,
          surfaces: new Set([e.surface.split(":")[0]!]),
          measuredMs: e.durationms ?? 0,
        };
      }
    }
    if (cur) sessions.push(cur);
  }

  const spans = sessions.map((s) => s.end.getTime() - s.start.getTime());
  const multi = sessions.filter((s) => s.events > 1);
  const multiSpans = multi.map((s) => s.end.getTime() - s.start.getTime());

  console.log("=== SESSIONS (30-min gap rule) ===\n");
  console.log(`  sessions:              ${sessions.length}`);
  console.log(`  single-event sessions: ${sessions.length - multi.length} (no measurable span)`);
  console.log(`  multi-event sessions:  ${multi.length}`);
  console.log(`  span p50 / p75 / p90:  ${fmt(pct(multiSpans, 0.5))} / ${fmt(pct(multiSpans, 0.75))} / ${fmt(pct(multiSpans, 0.9))}`);
  console.log(`  longest span:          ${fmt(Math.max(...spans, 0))}`);
  console.log(`  events per session p50/p90: ${pct(sessions.map((s) => s.events), 0.5)} / ${pct(sessions.map((s) => s.events), 0.9)}`);
  console.log(`  surfaces per session p50:   ${pct(sessions.map((s) => s.surfaces.size), 0.5)}`);

  // Per-person totals: how much time did each person actually put in.
  const perUser = new Map<string, { span: number; sessions: number; days: Set<string> }>();
  for (const s of sessions) {
    const cur = perUser.get(s.userId) ?? { span: 0, sessions: 0, days: new Set<string>() };
    cur.span += s.end.getTime() - s.start.getTime();
    cur.sessions++;
    cur.days.add(s.start.toISOString().slice(0, 10));
    perUser.set(s.userId, cur);
  }
  const totals = Array.from(perUser.values()).map((v) => v.span);
  console.log(`\n  per-person total span p50 / p75 / max: ${fmt(pct(totals, 0.5))} / ${fmt(pct(totals, 0.75))} / ${fmt(Math.max(...totals, 0))}`);
  const dayCounts = Array.from(perUser.values()).map((v) => v.days.size);
  const oneDayOnly = dayCounts.filter((d) => d === 1).length;
  console.log(`  people active on exactly 1 day: ${oneDayOnly} / ${dayCounts.length}`);
  console.log(`  people active on 3+ days:       ${dayCounts.filter((d) => d >= 3).length} / ${dayCounts.length}`);

  // ---- Where the time goes ----
  console.log("\n=== SURFACE POPULARITY (last 14d) ===\n");
  const bySurface = new Map<string, { people: Set<string>; events: number; ms: number }>();
  for (const e of events) {
    const key = e.surface;
    const cur = bySurface.get(key) ?? { people: new Set<string>(), events: 0, ms: 0 };
    cur.people.add(e.userId);
    cur.events++;
    cur.ms += e.durationms ?? 0;
    bySurface.set(key, cur);
  }
  const ranked = Array.from(bySurface.entries()).sort(
    (a, b) => b[1].people.size - a[1].people.size,
  );
  console.log("  surface              people  events  measured time");
  for (const [k, v] of ranked) {
    console.log(
      `  ${k.padEnd(20)} ${String(v.people.size).padStart(6)}  ${String(v.events).padStart(6)}  ${v.ms > 0 ? fmt(v.ms) : "-"}`
    );
  }

  // ---- Exact durations where we have them ----
  console.log("\n=== EXACT DURATIONS ===\n");
  const drills = events.filter((e) => e.surface.startsWith("arcade") && e.durationms);
  const sims = events.filter((e) => e.surface === "simulator" && e.durationms);
  const marks = events.filter((e) => e.surface.startsWith("mark") && e.durationms);
  if (drills.length)
    console.log(`  drill run  p50 ${fmt(pct(drills.map((d) => d.durationms!), 0.5))}  n=${drills.length}`);
  if (sims.length)
    console.log(`  simulator  p50 ${fmt(pct(sims.map((d) => d.durationms!), 0.5))}  n=${sims.length}`);
  if (marks.length)
    console.log(`  mark item  p50 ${fmt(pct(marks.map((d) => d.durationms!), 0.5))}  n=${marks.length}`);

  // Simulator completion rate: started versus finished.
  const simRuns = await prisma.$queryRaw<{ started: bigint; done: bigint }[]>`
    SELECT COUNT(*) AS started, COUNT("completedAt") AS done
    FROM "SimulatorProgress" s JOIN "User" u ON u.id = s."userId"
    WHERE NOT u."isBot" AND NOT u."isTrainingBot"
      AND s."startedAt" > now() - interval '14 days'
  `;
  const sr = simRuns[0]!;
  console.log(
    `\n  simulator runs started ${Number(sr.started)}, completed ${Number(sr.done)} (${Number(sr.started) ? Math.round((Number(sr.done) / Number(sr.started)) * 100) : 0}%)`
  );

  // ---- The podcast wave: what did new signups actually do? ----
  const cohort = await prisma.$queryRaw<
    { day: Date; signups: bigint; did_something: bigint; came_back: bigint }[]
  >`
    WITH h AS (
      SELECT id, "createdAt" FROM "User"
      WHERE NOT "isBot" AND NOT "isTrainingBot" AND "createdAt" > now() - interval '9 days'
    ),
    ev AS (
      SELECT "userId", "createdAt" AS at FROM "MarkEncounter"
      UNION ALL SELECT "userId", "playedAt" FROM "GameSession"
      UNION ALL SELECT "userId", "startedAt" FROM "SimulatorProgress"
      UNION ALL SELECT "userId", "answeredAt" FROM "TellResponse"
      UNION ALL SELECT "userId", "createdAt" FROM "DailyCheckIn"
      UNION ALL SELECT "userId", "takenAt" FROM "MirrorReading"
      UNION ALL SELECT "userId", "createdAt" FROM "LabSession"
      UNION ALL SELECT "userId", "createdAt" FROM "Receipt"
    )
    SELECT date_trunc('day', h."createdAt") AS day,
           COUNT(*) AS signups,
           COUNT(*) FILTER (WHERE EXISTS (SELECT 1 FROM ev WHERE ev."userId" = h.id)) AS did_something,
           COUNT(*) FILTER (WHERE EXISTS (
             SELECT 1 FROM ev WHERE ev."userId" = h.id
               AND ev.at > date_trunc('day', h."createdAt") + interval '1 day'
           )) AS came_back
    FROM h GROUP BY 1 ORDER BY 1
  `;
  console.log("\n=== NEW SIGNUP COHORTS: did they do anything? ===\n");
  console.log("  signup day   signups  acted  acted%  returned a later day");
  for (const c of cohort) {
    const s = Number(c.signups);
    const a = Number(c.did_something);
    console.log(
      `  ${c.day.toISOString().slice(0, 10)}   ${String(s).padStart(7)}  ${String(a).padStart(5)}  ${String(Math.round((a / s) * 100)).padStart(5)}%  ${Number(c.came_back)}`
    );
  }

  // ---- First action: what is the real entry point? ----
  const first = await prisma.$queryRaw<{ surface: string; n: bigint }[]>`
    WITH h AS (SELECT id FROM "User" WHERE NOT "isBot" AND NOT "isTrainingBot"
               AND "createdAt" > now() - interval '9 days'),
    ev AS (
      SELECT "userId", "createdAt" AS at, 'mark' AS surface FROM "MarkEncounter"
      UNION ALL SELECT "userId", "playedAt", 'arcade' FROM "GameSession"
      UNION ALL SELECT "userId", "startedAt", 'simulator' FROM "SimulatorProgress"
      UNION ALL SELECT "userId", "answeredAt", 'tells' FROM "TellResponse"
      UNION ALL SELECT "userId", "createdAt", 'checkin' FROM "DailyCheckIn"
      UNION ALL SELECT "userId", "takenAt", 'mirror' FROM "MirrorReading"
      UNION ALL SELECT "userId", "createdAt", 'lab' FROM "LabSession"
      UNION ALL SELECT "userId", "createdAt", 'receipts' FROM "Receipt"
    ),
    ranked AS (
      SELECT e.*, ROW_NUMBER() OVER (PARTITION BY e."userId" ORDER BY e.at) AS rn
      FROM ev e JOIN h ON h.id = e."userId"
    )
    SELECT surface, COUNT(*) AS n FROM ranked WHERE rn = 1 GROUP BY 1 ORDER BY 2 DESC
  `;
  console.log("\n=== FIRST THING A NEW SIGNUP DID (last 9d) ===\n");
  for (const f of first) console.log(`  ${f.surface.padEnd(12)} ${Number(f.n)}`);
  console.log();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
