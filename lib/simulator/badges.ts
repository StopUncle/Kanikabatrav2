/**
 * Dark Mirror simulator badges.
 *
 * Three tiers:
 *   - SCENARIO: earned per scenario outcome (good / neutral / bad / mastery)
 *   - LEVEL: awarded for clearing all scenarios in a level with a good run
 *   - MASTERY: all-optimal runs and special milestones
 *
 * Badge keys are stable slugs — once shipped, never rename (earned rows
 * reference them). Add new badges, don't mutate existing.
 */

import type { Scenario, SimulatorState } from "./types";

export type SimulatorBadgeDef = {
  key: string;
  title: string;
  description: string;
  tier: "scenario" | "level" | "mastery";
  icon:
    | "shield"
    | "crown"
    | "eye"
    | "sparkles"
    | "flame"
    | "skull"
    | "star"
    | "award";
};

/**
 * Build the three-badge set for a scenario (good / neutral / bad endings +
 * mastery). Keeps copy consistent across all 10 scenarios.
 */
function scenarioBadges(
  scenarioId: string,
  names: { good: string; neutral: string; bad: string; mastery: string },
  descriptions: {
    good: string;
    neutral: string;
    bad: string;
    mastery: string;
  },
): SimulatorBadgeDef[] {
  return [
    {
      key: `${scenarioId}-good`,
      title: names.good,
      description: descriptions.good,
      tier: "scenario",
      icon: "shield",
    },
    {
      key: `${scenarioId}-neutral`,
      title: names.neutral,
      description: descriptions.neutral,
      tier: "scenario",
      icon: "sparkles",
    },
    {
      key: `${scenarioId}-bad`,
      title: names.bad,
      description: descriptions.bad,
      tier: "scenario",
      icon: "flame",
    },
    {
      key: `${scenarioId}-mastery`,
      title: names.mastery,
      description: descriptions.mastery,
      tier: "mastery",
      icon: "eye",
    },
  ];
}

export const SIMULATOR_BADGES: SimulatorBadgeDef[] = [
  // ---------- Level 1 — Awareness ----------
  ...scenarioBadges(
    "mission-1-1",
    {
      good: "Reputation Intact",
      neutral: "Morning Survivor",
      bad: "Lesson Learned",
      mastery: "The Unspent Currency",
    },
    {
      good: "Passed Mission 1-1 without bragging or leaking. Information discipline learned.",
      neutral: "Made it through Mission 1-1. Some scars, nothing fatal.",
      bad: "Mission 1-1 ended badly. Every loss is a study session.",
      mastery: "All-optimal run. Information is currency — you didn't spend any.",
    },
  ),
  ...scenarioBadges(
    "mission-1-2",
    {
      good: "Love-Bomb Spotted",
      neutral: "Draw",
      bad: "Cast as Yourself",
      mastery: "The Pattern Held",
    },
    {
      good: "Recognized the pattern before the second drink.",
      neutral: "Held ground, didn't gain any. She'll try again.",
      bad: "Took the seat, the drink, the role. She didn't choose you — she cast you.",
      mastery: "Every optimal choice. Love-bombing only works on people who want to be chosen. You didn't.",
    },
  ),

  // ---------- Level 2 — Information Discipline ----------
  ...scenarioBadges(
    "mission-2-1",
    {
      good: "Info Held",
      neutral: "Nothing Leaked",
      bad: "You Became the Source",
      mastery: "Three Rules",
    },
    {
      good: "Kept the chat boring. Morgan moved on with nothing.",
      neutral: "Survived without loss. Also without gain.",
      bad: "Spoke. Got quoted. Maris knows you talked.",
      mastery: "Understood every rule: public documents, never author, 'just between us' doesn't exist.",
    },
  ),
  ...scenarioBadges(
    "mission-2-2",
    {
      good: "Channel Closed",
      neutral: "Proxy Survived",
      bad: "Network Mapped",
      mastery: "The Proxy Was Wasted",
    },
    {
      good: "Killed the triangulation channel cleanly.",
      neutral: "Dana left without your intel but hasn't given up.",
      bad: "Told the proxy about your allies. Map is out there now.",
      mastery: "All-optimal. Dana arrived full, left empty. Maris loses a delivery system.",
    },
  ),

  // ---------- Level 3 — Boundary Warfare ----------
  ...scenarioBadges(
    "mission-3-1",
    {
      good: "Boundary Held",
      neutral: "Partial Hold",
      bad: "Trained as Utility",
      mastery: "Pattern Uninstalled",
    },
    {
      good: "Said no without explaining. It stayed no.",
      neutral: "Got out, but gave ground along the way.",
      bad: "Became the Saturday chauffeur. The next ask will be bigger.",
      mastery: "All-optimal. Every no free of justification. She won't try the same play again.",
    },
  ),
  ...scenarioBadges(
    "mission-3-2",
    {
      good: "Guilt Held",
      neutral: "Brushed It Off",
      bad: "Hired",
      mastery: "The Mask Dropped",
    },
    {
      good: "Refused to audition for the rescue role.",
      neutral: "Held shape but absorbed some of the performance.",
      bad: "Took the therapy job. It has no hours, no pay, no exit.",
      mastery: "All-optimal. You saw the fragility performance and refused the contract before it was offered.",
    },
  ),

  // ---------- Level 4 — Defense ----------
  ...scenarioBadges(
    "mission-4-1",
    {
      good: "Smear Survived",
      neutral: "Mixed Result",
      bad: "Megaphone Used",
      mastery: "The Long Silence",
    },
    {
      good: "Right audience, right one-on-ones, right receipt.",
      neutral: "Partial flip — some trust restored, some lingering.",
      bad: "Public defense amplified the rumor to everyone who hadn't heard it.",
      mastery: "All-optimal. A month of silence starved the rumor. Your work spoke louder.",
    },
  ),
  ...scenarioBadges(
    "mission-4-2",
    {
      good: "DARVO Recognized",
      neutral: "Dignified But Late",
      bad: "The Speech Killed You",
      mastery: "The Room Turned",
    },
    {
      good: "Refused the stage. Left the room.",
      neutral: "Exited, but only after feeding the trap briefly.",
      bad: "Stayed to defend point-by-point. Now the speech is the memory.",
      mastery: "All-optimal. Named the staging. The audience left talking about the tactic, not the accusation.",
    },
  ),

  // ---------- Level 5 — Mastery ----------
  ...scenarioBadges(
    "mission-5-1",
    {
      good: "Shift Recognized",
      neutral: "Principled No",
      bad: "Absorbed",
      mastery: "She Waits Now",
    },
    {
      good: "Took the leverage without taking the frame.",
      neutral: "Refused on principle. Closed a door that may have been useful.",
      bad: "Said yes to a vague offer. She'll define the terms in her favor.",
      mastery: "All-optimal. The polarity flipped. She's the petitioner now.",
    },
  ),
  ...scenarioBadges(
    "mission-5-2",
    {
      good: "Throne Held",
      neutral: "Walked",
      bad: "Gave the Map",
      mastery: "Coalition",
    },
    {
      good: "Saw yourself in the target seat and chose consciously.",
      neutral: "Refused the engagement. Bought nothing, owed nothing.",
      bad: "She asked how you did it. You told her.",
      mastery: "All-optimal. Recognized, recruited, inherited the threat as a lieutenant.",
    },
  ),

  // ---------- Level-clear badges ----------
  {
    key: "level-1-complete",
    title: "Awareness — Cleared",
    description: "You've passed every scenario in Level 1 with a good ending.",
    tier: "level",
    icon: "crown",
  },
  {
    key: "level-2-complete",
    title: "Information Discipline — Cleared",
    description: "Level 2 complete, every scenario with a good ending.",
    tier: "level",
    icon: "crown",
  },
  {
    key: "level-3-complete",
    title: "Boundary Warfare — Cleared",
    description: "Level 3 complete. Your no is real now.",
    tier: "level",
    icon: "crown",
  },
  {
    key: "level-4-complete",
    title: "Defense — Cleared",
    description: "Level 4 complete. Smears don't land. DARVO doesn't stage.",
    tier: "level",
    icon: "crown",
  },
  {
    key: "level-5-complete",
    title: "Mastery — Cleared",
    description: "Level 5 complete. You've done every scenario with a good ending.",
    tier: "level",
    icon: "crown",
  },
];

export const BADGE_BY_KEY: Record<string, SimulatorBadgeDef> =
  Object.fromEntries(SIMULATOR_BADGES.map((b) => [b.key, b]));

/**
 * Compute the scenario-level badges a completed state earns. Level-clear
 * badges are awarded separately (see `levelCompleteBadgesFor` below) because
 * they require cross-scenario state that this function doesn't have.
 */
export function badgesEarnedFromState(
  scenario: Scenario,
  state: SimulatorState,
): string[] {
  if (!state.outcome || !state.endedAt) return [];

  const keys: string[] = [];
  const outcome = state.outcome;

  if (outcome === "good" || outcome === "passed") {
    keys.push(`${scenario.id}-good`);
  } else if (outcome === "bad" || outcome === "failed") {
    keys.push(`${scenario.id}-bad`);
  } else {
    keys.push(`${scenario.id}-neutral`);
  }

  if (
    (outcome === "good" || outcome === "passed") &&
    state.choicesMade.length > 0 &&
    state.choicesMade.every((c) => c.wasOptimal)
  ) {
    keys.push(`${scenario.id}-mastery`);
  }

  return keys.filter((k) => BADGE_BY_KEY[k] !== undefined);
}

/**
 * Given a level + the set of scenario-good badge keys the user currently holds,
 * returns the level-complete badge key IF all scenarios in that level have a
 * good-or-mastery badge. Else returns null. Caller layers this on top of
 * scenario-badge awarding.
 */
export function levelCompleteBadgeFor(
  level: number,
  scenarioIdsInLevel: string[],
  heldBadgeKeys: Set<string>,
): string | null {
  const key = `level-${level}-complete`;
  if (!BADGE_BY_KEY[key]) return null;
  if (heldBadgeKeys.has(key)) return null;
  const allClean = scenarioIdsInLevel.every(
    (id) => heldBadgeKeys.has(`${id}-good`) || heldBadgeKeys.has(`${id}-mastery`),
  );
  return allClean ? key : null;
}
