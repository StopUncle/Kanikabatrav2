import type { ScenarioTrack } from "./types";
import { ringByLevel } from "@/lib/standing/config";

/**
 * Ring-gated tracks (plan §3.2): the spine is always open, themed tracks
 * are doors that open as the member moves inward. Locked tracks stay
 * VISIBLE (name + tease + "opens at the Fifth Ring"), which converts the
 * overwhelming catalog into the progression reward system.
 *
 * Hard rules, in order:
 *  1. The spine (your gender's main line) is always open.
 *  2. The check-in override: today's situation-matched track is open
 *     regardless of Ring. Need trumps progression.
 *  3. A track you have already started stays open. Rings gate DOORS,
 *     they never confiscate rooms someone is inside.
 *  4. Otherwise a track opens at the ring below.
 *
 * Tier gating (free/premium/vip) is untouched underneath: Rings gate
 * tracks, tiers gate depth within tracks.
 */

/** Ring at which each non-spine track opens (rings count DOWN). */
export const TRACK_OPENS_AT: Record<ScenarioTrack, number> = {
  // Spines: listed for completeness, resolved by gender below.
  female: 7,
  "male-dating": 7,
  "male-business": 7,
  // The Sixth Ring: the universally-useful pair.
  anxiety: 6,
  "toxic-narc": 6,
  // The Fifth Ring.
  "cluster-b-lab": 5,
  "divorce-arc": 5,
  // The Fourth Ring: the aftermath and long-form tracks.
  "loving-mira": 4,
  "after-him": 4,
  "after-her": 4,
  // The Third Ring.
  "pc-child": 3,
};

export function spineTracks(gender: "MALE" | "FEMALE" | null): ScenarioTrack[] {
  return gender === "MALE" ? ["male-dating", "male-business"] : ["female"];
}

/**
 * The ring a track opens at for THIS member. The other gender's spine is
 * treated as a deep-catalog unlock at the Third Ring rather than a
 * default door.
 */
export function opensAtRingFor(
  track: ScenarioTrack,
  gender: "MALE" | "FEMALE" | null,
): number {
  if (spineTracks(gender).includes(track)) return 7;
  const spine = TRACK_OPENS_AT[track] === 7;
  return spine ? 3 : TRACK_OPENS_AT[track];
}

export interface TrackAccess {
  open: boolean;
  /** Set when closed: the ring that opens it (display: ringByLevel). */
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

/** Display line for a sealed track: "Opens at The Fifth Ring". */
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
    (t) => TRACK_OPENS_AT[t] === ringLevel && TRACK_OPENS_AT[t] !== 7,
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
