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

  // ---------- Level 6 — Career Power ----------
  ...scenarioBadges(
    "mission-6-1",
    {
      good: "Credit Reclaimed",
      neutral: "Victory With Interest",
      bad: "It's His Model Now",
      mastery: "The Ambush Paid",
    },
    {
      good: "Corrected the frame early; defended the work in the room that mattered.",
      neutral: "You got the credit. You also made a political enemy.",
      bad: "By next quarter, your work is canonically his.",
      mastery: "All-optimal. You made the room reassign the work consciously.",
    },
  ),
  ...scenarioBadges(
    "mission-6-2",
    {
      good: "Raise Won",
      neutral: "Capped Early",
      bad: "Split the Difference",
      mastery: "Priced Yourself Correctly",
    },
    {
      good: "Refused his anchors, held external data, walked out with a real bump.",
      neutral: "You accepted his ceiling as your aspiration.",
      bad: "You anchored first. He halved you.",
      mastery: "All-optimal. You made him name a number, anchored with data, bundled progression with salary.",
    },
  ),

  // ---------- Level 7 — Dating Strategy ----------
  ...scenarioBadges(
    "mission-7-1",
    {
      good: "Rotation Mastered",
      neutral: "Equal Time, Unequal Energy",
      bad: "Funded the Pattern",
      mastery: "The Calibrated Test",
    },
    {
      good: "Investment proportional to evidence. Pattern named on the way out.",
      neutral: "You held shape but gave equal time to unequal energies.",
      bad: "'No worries' became the subscription renewal.",
      mastery: "All-optimal. You tested the rise, rewarded directness, let evidence weight attention.",
    },
  ),
  ...scenarioBadges(
    "mission-7-2",
    {
      good: "Clean Exit",
      neutral: "Ambiguous Close",
      bad: "The Fade",
      mastery: "End The Shape",
    },
    {
      good: "Rehearsed delivery, specific about the shape not the person.",
      neutral: "Couldn't commit to the reason — they'll be back in a month.",
      bad: "You became the avoidant you spent six months describing.",
      mastery: "All-optimal. Honest answer to an honest question. No landmines left behind.",
    },
  ),

  // ---------- Level 8 — Family ----------
  ...scenarioBadges(
    "mission-8-1",
    {
      good: "Triangulation Refused",
      neutral: "Dinner Survived",
      bad: "Auditioned and Lost",
      mastery: "The Engine Stalled",
    },
    {
      good: "You refused the role in her hierarchy.",
      neutral: "You got through the dinner without winning or losing much.",
      bad: "You competed for her approval on her terms. She cut you off mid-sentence.",
      mastery: "All-optimal. The triangulation engine couldn't find a foothold.",
    },
  ),
  ...scenarioBadges(
    "mission-8-2",
    {
      good: "No Contact Held",
      neutral: "Belated Narrative",
      bad: "Channel Reopened",
      mastery: "The Cut That Held",
    },
    {
      good: "Minimum-viable exit. No material for the smear to quote.",
      neutral: "Disappeared first, managed the narrative late.",
      bad: "One reply after no-contact declared the rule negotiable.",
      mastery: "All-optimal. Pre-empted the smear, blocked without reading, allies informed first.",
    },
  ),

  // ---------- Level 9 — The Long Game ----------
  ...scenarioBadges(
    "mission-9-1",
    {
      good: "Long Game Seen",
      neutral: "Results Eventually",
      bad: "Cards Shown",
      mastery: "The Trap Laid",
    },
    {
      good: "Found out about the campaign. Didn't react — responded.",
      neutral: "Chose the patient path. Paid the year in invisible tax.",
      bad: "DMed her to say you knew. She moved to rooms you can't see.",
      mastery: "All-optimal. Four months of discipline; her behavior became the argument against her.",
    },
  ),
  ...scenarioBadges(
    "mission-9-2",
    {
      good: "Long Game Won",
      neutral: "Partial Hold",
      bad: "Drawn Publicly",
      mastery: "The Work Closed It",
    },
    {
      good: "Outmaneuvered a six-month covert campaign without engaging it publicly.",
      neutral: "Mixed outcome — held some rooms, lost others.",
      bad: "She set the stage. You stepped onto it.",
      mastery: "All-optimal. The undeniable result made her attacks obsolete.",
    },
  ),

  // ---------- Level 10 — Endgame ----------
  ...scenarioBadges(
    "mission-10-1",
    {
      good: "Gate Held Fairly",
      neutral: "Polite No",
      bad: "You Became the Door",
      mastery: "Protégé Built",
    },
    {
      good: "Mentor, specific, generous without spending credibility.",
      neutral: "Not-ready without reason. Neutral, wasted.",
      bad: "You said the exact sentence you once resented.",
      mastery: "All-optimal. You built the next generation at Kaya-level depth.",
    },
  ),
  ...scenarioBadges(
    "mission-10-2",
    {
      good: "Legacy",
      neutral: "Unprepared",
      bad: "Loyalty Over Judgment",
      mastery: "The Final Mastery",
    },
    {
      good: "Named someone strong. Meant it.",
      neutral: "Proposed breadth without prepared specifics.",
      bad: "Nominated your protégé. Kaya marked it.",
      mastery: "All-optimal. Named the person who will surpass you. Elevated anyway.",
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
  {
    key: "level-6-complete",
    title: "Career Power — Cleared",
    description: "Level 6 complete. You price yourself now.",
    tier: "level",
    icon: "crown",
  },
  {
    key: "level-7-complete",
    title: "Dating Strategy — Cleared",
    description: "Level 7 complete. Evidence-weighted, clean-ending dating.",
    tier: "level",
    icon: "crown",
  },
  {
    key: "level-8-complete",
    title: "Family Dynamics — Cleared",
    description: "Level 8 complete. Twenty-nine-year scripts, broken.",
    tier: "level",
    icon: "crown",
  },
  {
    key: "level-9-complete",
    title: "The Long Game — Cleared",
    description: "Level 9 complete. Covert campaigns outmaneuvered.",
    tier: "level",
    icon: "crown",
  },
  {
    key: "level-10-complete",
    title: "Endgame — Cleared",
    description: "Level 10 complete. You built a legacy worth inheriting.",
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
