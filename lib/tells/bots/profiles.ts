/**
 * Profile generation for Tells training bots.
 *
 * Each bot has a deterministic profile that drives:
 *   - starting Elo per axis (so the leaderboard has visible spread)
 *   - daily activity probability (so streaks read as varied)
 *   - per-Tell accuracy (so misses happen in believable proportion)
 *
 * The math is intentionally simple. The point is "looks like real people"
 * not "matches an econometric model of human attention."
 */

import type { InstinctAxis } from "@/lib/tells/types";
import { AXIS_KEYS } from "@/lib/tells/types";

/* -------------------------------------------------------------------------- */
/* Archetype mix                                                              */
/* -------------------------------------------------------------------------- */

export type BotArchetype = "active" | "regular" | "casual" | "sporadic";

interface ArchetypeSpec {
  /** Probability the bot solves the daily Tell on any given day. */
  activityProb: number;
  /** Centre of the per-axis starting Elo distribution. */
  baseElo: number;
  /** Spread (stddev-ish) around baseElo per axis. */
  eloSpread: number;
  /** 0..1 baseline accuracy at the bot's Elo on a difficulty-3 Tell. */
  baseAccuracy: number;
}

const ARCHETYPE_SPEC: Record<BotArchetype, ArchetypeSpec> = {
  // The serious-trainer cohort. Long streaks, high accuracy, top of the
  // bracket. ~20% of the cohort.
  active: {
    activityProb: 0.92,
    baseElo: 1450,
    eloSpread: 120,
    baseAccuracy: 0.78,
  },
  // The median member. Solves most days, decent accuracy. ~40%.
  regular: {
    activityProb: 0.78,
    baseElo: 1200,
    eloSpread: 110,
    baseAccuracy: 0.66,
  },
  // The "I forget some weekdays" member. Lower streaks, mid accuracy. ~28%.
  casual: {
    activityProb: 0.55,
    baseElo: 1050,
    eloSpread: 90,
    baseAccuracy: 0.55,
  },
  // The "I joined and only check in twice a week" cohort. Floor of the
  // bracket. ~12%.
  sporadic: {
    activityProb: 0.28,
    baseElo: 920,
    eloSpread: 80,
    baseAccuracy: 0.46,
  },
};

const ARCHETYPE_WEIGHTS: ReadonlyArray<[BotArchetype, number]> = [
  ["active", 0.2],
  ["regular", 0.4],
  ["casual", 0.28],
  ["sporadic", 0.12],
];

/* -------------------------------------------------------------------------- */
/* Generation                                                                 */
/* -------------------------------------------------------------------------- */

export interface BotProfile {
  archetype: BotArchetype;
  /** Daily probability this bot answers the main Tell. */
  activityProb: number;
  /** Starting per-axis Elo. Drift over time follows the same Elo math humans use. */
  startingElo: Record<InstinctAxis, number>;
  /** 0..1 accuracy at this bot's Elo on a difficulty-3 Tell, before adjustments. */
  baseAccuracy: number;
  /** Day the bot "joined" — caps the back-fillable streak length. */
  originDay: string; // YYYY-MM-DD UTC
  /**
   * Hour of day (0-23 UTC) the bot tends to solve at. Mostly cosmetic;
   * keeps `answeredAt` from clustering at the cron tick.
   */
  preferredHourUtc: number;
}

/** Mulberry32 — same generator the names file uses. Pure deterministic. */
export function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function pickArchetype(rng: () => number): BotArchetype {
  const r = rng();
  let acc = 0;
  for (const [arch, w] of ARCHETYPE_WEIGHTS) {
    acc += w;
    if (r < acc) return arch;
  }
  return "regular";
}

/**
 * Box-Muller-ish: a roughly-normal sample from a uniform pair. We don't
 * need the real Gaussian; close enough for "spread bots around an Elo."
 */
function approxNormal(rng: () => number): number {
  const u1 = Math.max(rng(), 1e-9);
  const u2 = rng();
  return Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
}

/**
 * Build one profile. Seed is per-bot (e.g. global seed + bot index)
 * so the cohort is deterministic for a given run but each bot is unique.
 */
export function generateProfile(seed: number): BotProfile {
  const rng = mulberry32(seed);
  const archetype = pickArchetype(rng);
  const spec = ARCHETYPE_SPEC[archetype];

  // One axis is "their thing" — slightly elevated. One axis is weaker.
  // Gives every bot a visible identity on the hex chart instead of a
  // boring round shape.
  const strongAxis = AXIS_KEYS[Math.floor(rng() * AXIS_KEYS.length)];
  let weakAxis = AXIS_KEYS[Math.floor(rng() * AXIS_KEYS.length)];
  if (weakAxis === strongAxis) {
    weakAxis = AXIS_KEYS[(AXIS_KEYS.indexOf(strongAxis) + 1) % AXIS_KEYS.length];
  }

  const startingElo = {} as Record<InstinctAxis, number>;
  for (const axis of AXIS_KEYS) {
    const drift = approxNormal(rng) * spec.eloSpread * 0.5;
    let elo = spec.baseElo + drift;
    if (axis === strongAxis) elo += 80;
    if (axis === weakAxis) elo -= 80;
    // Clamp to a believable range. Below 700 / above 2000 reads as a
    // glitch on a leaderboard.
    elo = Math.max(720, Math.min(1900, Math.round(elo)));
    startingElo[axis] = elo;
  }

  // Origin day: between 14 and 180 days ago. Caps how long their streak
  // can be when we backfill, so a "new joiner" doesn't show up with a
  // 60-day streak that exceeds the platform's age in their bracket.
  const ageDays = 14 + Math.floor(rng() * 167);
  const origin = new Date();
  origin.setUTCDate(origin.getUTCDate() - ageDays);
  const originDay = origin.toISOString().slice(0, 10);

  return {
    archetype,
    activityProb: spec.activityProb,
    startingElo,
    baseAccuracy: spec.baseAccuracy,
    originDay,
    preferredHourUtc: Math.floor(rng() * 24),
  };
}

/* -------------------------------------------------------------------------- */
/* Tick-time decisions                                                        */
/* -------------------------------------------------------------------------- */

/**
 * Did this bot solve today? Stable across calls in the same day —
 * derived from the bot's seed + the calendar date. Re-running the
 * cron in the same day must produce the same answer.
 */
export function decidesToSolve(
  profileSeed: number,
  utcDate: string,
  activityProb: number,
): boolean {
  const seed = stableHash(`${profileSeed}|${utcDate}|solve`);
  const rng = mulberry32(seed);
  return rng() < activityProb;
}

/**
 * Probability this bot picks the correct choice on a given Tell.
 * Anchored to baseAccuracy, then adjusted by Tell difficulty (harder
 * Tells lower the bot's chance) and by a small noise term so the same
 * bot doesn't get every difficulty-3 Tell right and every difficulty-4
 * Tell wrong.
 */
export function correctnessProb(
  baseAccuracy: number,
  difficulty: number,
  noise: number,
): number {
  // Difficulty 1 = +0.10 adjustment, difficulty 5 = -0.20.
  const diffAdj = (3 - difficulty) * 0.075;
  const p = baseAccuracy + diffAdj + noise;
  // Floor at 0.20 / ceiling at 0.95: even a beginner on hard mode gets
  // some right; even an active bot on easy mode misses occasionally.
  return Math.max(0.2, Math.min(0.95, p));
}

/**
 * Stable hash from a string seed to a 32-bit int. Used so a bot's
 * decisions on the same Tell on the same day are reproducible.
 */
export function stableHash(input: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

/**
 * Per-bot integer seed used as the entropy anchor for everything: the
 * profile, the daily decisions, the choice picks. Derived from the bot
 * userId so it's stable across deploys.
 */
export function botSeedFromId(userId: string): number {
  return stableHash(`tells-bot|${userId}`);
}
