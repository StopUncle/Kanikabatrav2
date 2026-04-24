/**
 * Catalogue stats computed at module load from ALL_SCENARIOS.
 *
 * Marketing copy on /consilium, /, /consilium/apply, and the member
 * landing all cited fixed numbers ("30 scenarios across 3 tracks" etc.)
 * that drifted the moment Phase 1 of V3 shipped. This module is the
 * single source of truth so every surface reads the same live count.
 *
 * Numbers derive from the actual Scenario objects — if a scenario gets
 * added, removed, or its tacticsLearned / redFlagsTaught lists change,
 * every marketing surface updates on the next build without anyone
 * editing copy.
 */

import { ALL_SCENARIOS } from "./scenarios";

const CATALOGUE_STATS = {
  scenarios: ALL_SCENARIOS.length,
  tracks: new Set(ALL_SCENARIOS.map((s) => s.track ?? "female")).size,
  scenes: ALL_SCENARIOS.reduce((total, s) => total + s.scenes.length, 0),
  tacticsTaught: ALL_SCENARIOS.reduce(
    (total, s) => total + s.tacticsLearned.length,
    0,
  ),
  redFlagsTaught: ALL_SCENARIOS.reduce(
    (total, s) => total + s.redFlagsTaught.length,
    0,
  ),
} as const;

export const catalogueStats = CATALOGUE_STATS;

/**
 * Human-facing rounded scenarios count. "52 scenarios" reads more
 * catalogue-like than "54" once scenarios keep shipping; this keeps the
 * stats line feeling stable across deploys.
 */
export function roundedScenarios(): number {
  // Exact count is fine at current scale; revisit if we ever want to
  // round down to the nearest 5 or 10 for marketing smoothness.
  return CATALOGUE_STATS.scenarios;
}

/**
 * Public-facing track descriptors for the teaser chip row. Maps the
 * internal track ID to the label a cold-traffic visitor should see.
 * Order matches a visual hierarchy: foundational tracks first, depth
 * tracks next, diagnostic lab last.
 *
 * `pc-child` is deliberately excluded — the psychopath-child register
 * is too heavy and niche for a first-touch marketing surface; members
 * discover it once they're inside. Present via the track selector,
 * absent from the homepage chip row.
 */
export const PUBLIC_TRACK_CHIPS: ReadonlyArray<{
  title: string;
  blurb: string;
}> = [
  { title: "Relationships", blurb: "Narcissists, love-bombers, gaslighters" },
  { title: "Career", blurb: "Credit thieves, power plays, soft sabotage" },
  { title: "Dating (men)", blurb: "Reading intent, holding frame" },
  { title: "Self-Regulation", blurb: "3 a.m. spirals, the pre-authored reply, the read-receipt loop" },
  { title: "Toxic Families", blurb: "Narc parent, boss, sibling, spouse, in-law, friend" },
  { title: "Cluster-B Lab", blurb: "Short drills · BPD / NPD / ASPD / HPD" },
];
