import type { ScenarioTrack } from "./types";
import { ringByLevel } from "@/lib/standing/config";

/**
 * Rank-gated tracks: the spine is always open, themed tracks are doors
 * that open as the member ranks up. Locked tracks stay VISIBLE (name +
 * tease + "Opens at Analyst"), which converts the overwhelming catalog
 * into the progression reward system.
 *
 * Hard rules, in order:
 *  1. The spine (your gender's main line) is always open.
 *  2. The check-in override: today's situation-matched track is open
 *     regardless of rank. Need trumps progression.
 *  3. A track you have already started stays open. Ranks gate DOORS,
 *     they never confiscate rooms someone is inside.
 *  4. Otherwise a track opens at the rank below.
 *
 * Tier gating (free/premium/vip) is untouched underneath: ranks gate
 * tracks, tiers gate depth within tracks.
 */

/** Rank at which each non-spine track opens (ranks count DOWN, 4 → 1). */
export const TRACK_OPENS_AT: Record<ScenarioTrack, number> = {
  // Spines: listed for completeness, resolved by gender below.
  female: 4,
  "male-dating": 4,
  "male-business": 4,
  // Analyst: the universally-useful pair.
  anxiety: 3,
  "toxic-narc": 3,
  // Profiler: the deep-work and aftermath tracks.
  "cluster-b-lab": 2,
  "divorce-arc": 2,
  "loving-mira": 2,
  "after-him": 2,
  "after-her": 2,
  // IC: the full catalog.
  "pc-child": 1,
};

export function spineTracks(gender: "MALE" | "FEMALE" | null): ScenarioTrack[] {
  return gender === "MALE" ? ["male-dating", "male-business"] : ["female"];
}

/**
 * The rank a track opens at for THIS member. The other gender's spine is
 * treated as a deep-catalog unlock at IC rather than a default door.
 */
export function opensAtRingFor(
  track: ScenarioTrack,
  gender: "MALE" | "FEMALE" | null,
): number {
  if (spineTracks(gender).includes(track)) return 4;
  const spine = TRACK_OPENS_AT[track] === 4;
  return spine ? 1 : TRACK_OPENS_AT[track];
}

export interface TrackAccess {
  open: boolean;
  /** Set when closed: the rank that opens it (display: ringByLevel). */
  opensAtRing?: number;
  /** Why it's open, for UI accents ("recommended" gets the gold pulse). */
  reason?: "spine" | "ring" | "recommended" | "started";
}

export function trackAccess(
  track: ScenarioTrack,
  opts: {
    gender: "MALE" | "FEMALE" | null;
    ringLevel: number;
    /** Today's check-in recommendation, if any. */
    recommendedTrack?: ScenarioTrack | null;
    /** Tracks the member already has progress in. */
    startedTracks?: ReadonlySet<ScenarioTrack>;
  },
): TrackAccess {
  if (spineTracks(opts.gender).includes(track)) {
    return { open: true, reason: "spine" };
  }
  if (opts.recommendedTrack === track) {
    return { open: true, reason: "recommended" };
  }
  if (opts.startedTracks?.has(track)) {
    return { open: true, reason: "started" };
  }
  const opensAt = opensAtRingFor(track, opts.gender);
  if (opts.ringLevel <= opensAt) {
    return { open: true, reason: "ring" };
  }
  return { open: false, opensAtRing: opensAt };
}

/** Display line for a sealed track: "Opens at Analyst". */
export function sealedLine(opensAtRing: number): string {
  return `Opens at ${ringByLevel(opensAtRing).name}`;
}

/**
 * Tracks whose door opens AT `ringLevel` (the ceremony's "doors open"
 * line). Gender-agnostic on purpose: the ceremony announces the common
 * schedule; the catalog is the authority on any per-gender nuance.
 */
export function tracksOpeningAt(ringLevel: number): ScenarioTrack[] {
  return (Object.keys(TRACK_OPENS_AT) as ScenarioTrack[]).filter(
    (t) => TRACK_OPENS_AT[t] === ringLevel && TRACK_OPENS_AT[t] !== 4,
  );
}

/**
 * Display labels for the ceremony's unlock line. Kept HERE (not
 * TRACK_META) because the ceremony is a client component and the
 * scenario index would pull the whole catalog into the bundle. Keep in
 * sync with TRACK_META labels in lib/simulator/scenarios.
 */
export const TRACK_LABELS: Record<ScenarioTrack, string> = {
  female: "Feminine",
  "male-business": "Business Line",
  "male-dating": "Dating Line",
  anxiety: "Self-Regulation",
  "toxic-narc": "Toxic Narcissist",
  "pc-child": "Psychopath Child",
  "cluster-b-lab": "Cluster-B Lab",
  "divorce-arc": "Divorce Arc",
  "loving-mira": "Loving Mira",
  "after-him": "After Him",
  "after-her": "After Her",
};
