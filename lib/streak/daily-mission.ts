/**
 * Daily Mission — the "scenario of the day."
 *
 * One simulator scenario chosen deterministically from the UTC date, so every
 * member sees the SAME mission on the same day. That shared-challenge property
 * is deliberate: it's what later enables compare / duel / "how did everyone
 * else play today" mechanics. Pulled from the broadly-accessible pool (free +
 * premium tiers) so any active member can play it. Completing it feeds the
 * unified daily streak through the existing simulator-complete path — no
 * special-casing needed there.
 */

import { ALL_SCENARIOS, getTrack } from "@/lib/simulator/scenarios";
import type { Scenario, ScenarioTrack } from "@/lib/simulator/types";
import type { PrismaClient } from "@prisma/client";

function utcDateKey(d: Date): string {
  return d.toISOString().slice(0, 10);
}

function startOfUtcDay(d: Date): Date {
  return new Date(
    Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()),
  );
}

/**
 * FNV-1a 32-bit hash. Deterministic across servers and process restarts
 * (unlike Math.random), so the same date always selects the same scenario
 * everywhere. Date is the only seed.
 */
function hashStr(s: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

// Broadly-accessible pool so any active member can play the day's mission.
// VIP-gated scenarios are excluded to avoid serving a mission some members
// can't open.
const DAILY_POOL: Scenario[] = ALL_SCENARIOS.filter(
  (s) => s.tier === "free" || s.tier === "premium",
);

// The free tier's fallback pool. On days the shared mission is premium, a
// free account gets a deterministic mission from here instead of a wall.
const FREE_POOL: Scenario[] = ALL_SCENARIOS.filter((s) => s.tier === "free");

export interface DailyMission {
  /** YYYY-MM-DD UTC the mission is for. */
  dateKey: string;
  scenarioId: string;
  title: string;
  tagline: string;
  level: number;
  track: ScenarioTrack;
  estimatedMinutes: number;
  /** Deep link into the runner, tagged so we can attribute mission starts. */
  href: string;
}

function toMission(scenario: Scenario, dateKey: string): DailyMission {
  return {
    dateKey,
    scenarioId: scenario.id,
    title: scenario.title,
    tagline: scenario.tagline,
    level: scenario.level,
    track: getTrack(scenario),
    estimatedMinutes: scenario.estimatedMinutes,
    href: `/app/train/${scenario.id}?mission=1`,
  };
}

/** Today's mission, deterministic per UTC day. Null only if the pool is empty. */
export function getDailyMission(now: Date = new Date()): DailyMission | null {
  if (DAILY_POOL.length === 0) return null;
  const dateKey = utcDateKey(now);
  return toMission(DAILY_POOL[hashStr(dateKey) % DAILY_POOL.length], dateKey);
}

/**
 * The mission this account can actually play. Members always get the
 * shared mission. A free account gets it too on days it happens to be
 * free-tier (those days they join the council numbers); otherwise a
 * deterministic pick from the free pool, same label, same +50, so the
 * daily habit never leads with a wall.
 */
export function getDailyMissionFor(
  isMember: boolean,
  now: Date = new Date(),
): DailyMission | null {
  const shared = getDailyMission(now);
  if (!shared) return null;
  if (isMember) return shared;
  const sharedScenario = DAILY_POOL.find((s) => s.id === shared.scenarioId);
  if (sharedScenario?.tier === "free") return shared;
  if (FREE_POOL.length === 0) return null;
  const dateKey = utcDateKey(now);
  return toMission(FREE_POOL[hashStr(dateKey) % FREE_POOL.length], dateKey);
}

/**
 * Best-effort "did this member complete today's mission today" check, derived
 * from SimulatorProgress.completedAt for the mission scenario. A member who
 * completed this scenario on a previous day (and hasn't replayed it today)
 * reads as not-done — which is the correct behaviour for a daily mission.
 */
export async function isDailyMissionDoneToday(
  prisma: PrismaClient,
  userId: string,
  opts: { isMember?: boolean } = {},
  now: Date = new Date(),
): Promise<boolean> {
  const mission = getDailyMissionFor(opts.isMember ?? true, now);
  if (!mission) return false;
  const progress = await prisma.simulatorProgress.findUnique({
    where: {
      userId_scenarioId: { userId, scenarioId: mission.scenarioId },
    },
    select: { completedAt: true },
  });
  return (
    progress?.completedAt != null && progress.completedAt >= startOfUtcDay(now)
  );
}

export interface MissionCouncilToday {
  scenarioId: string;
  /** YYYY-MM-DD UTC the stats are for; lets clients confirm freshness. */
  dateKey: string;
  playedToday: number;
  outcomes: { good: number; neutral: number; bad: number };
}

/**
 * How the council played today's shared mission. Same "completed today"
 * definition as isDailyMissionDoneToday (completedAt is sticky to first
 * completion, so replayers of an old scenario don't count: consistent,
 * slightly conservative). Bots are excluded: this is the one number that
 * claims to be the council's real intelligence.
 */
export async function getMissionCouncilToday(
  prisma: PrismaClient,
  now: Date = new Date(),
): Promise<MissionCouncilToday | null> {
  const mission = getDailyMission(now);
  if (!mission) return null;
  const rows = await prisma.simulatorProgress.groupBy({
    by: ["outcome"],
    where: {
      scenarioId: mission.scenarioId,
      completedAt: { gte: startOfUtcDay(now) },
      user: { isBot: false },
    },
    _count: { _all: true },
  });
  // OutcomeType is five-valued ("good" | "neutral" | "bad" | "passed" |
  // "failed"); fold the pass/fail pair into win/loss the same way
  // EndingScreen does (passed = won, failed = lost). Static scenarios
  // only emit the first three today, but generated scenarios may not.
  const outcomes = { good: 0, neutral: 0, bad: 0 };
  let playedToday = 0;
  for (const row of rows) {
    playedToday += row._count._all;
    if (row.outcome === "good" || row.outcome === "passed") {
      outcomes.good += row._count._all;
    } else if (row.outcome === "bad" || row.outcome === "failed") {
      outcomes.bad += row._count._all;
    } else {
      outcomes.neutral += row._count._all;
    }
  }
  return {
    scenarioId: mission.scenarioId,
    dateKey: mission.dateKey,
    playedToday,
    outcomes,
  };
}
