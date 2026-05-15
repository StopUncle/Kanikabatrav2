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

  // ---------- V3 scenario badges ----------
  // Unlike legacy mission-* badges (derived from scenario id + outcome), V3
  // scenarios emit semantically-named per-ending badges. Registered here so
  // BADGE_BY_KEY resolves them for the ending-screen inline grid AND the
  // V3 catalogue builder in achievements.ts can layer rarity/category on top.
  // Name + description copy is authoritative; the display policy in
  // achievements.ts only adds rarity, category, secret, and unlockHint.

  // anxiety — anx-1-1 "The 3 a.m. Draft"
  { key: "first-outlast",    title: "The First Outlast",     description: "Put the phone down. Let the sensation peak. Slept in eleven minutes.",                        tier: "scenario", icon: "shield"   },
  { key: "noor-called",      title: "The Ally on the Line",  description: "Routed the 3 a.m. spiral through a steady friend, not the ex.",                              tier: "scenario", icon: "sparkles" },
  { key: "sent-and-sat",     title: "Sent, and Sat With It", description: "Sent the text. Did not chase. Did not double-text.",                                         tier: "scenario", icon: "eye"      },
  { key: "sent-and-chased",  title: "The Second Text",       description: "Post-send spiral. Eight messages into a closed channel.",                                    tier: "scenario", icon: "skull"    },
  { key: "sober-as-a-nun",   title: "Sober As A Nun",        description: "The pure outlast — no ally, no water, no deletion.",                                         tier: "scenario", icon: "crown"    },

  // anxiety — anx-1-2 "The Morning After the Draft"
  { key: "morning-protocol", title: "The Morning Protocol",  description: "Four motor habits before the phone. Sunlight, water, written task, face-down until 11.",    tier: "scenario", icon: "sparkles" },

  // anxiety — anx-1-3 "The Read Receipt"
  { key: "showed-up-anyway", title: "Showed Up",             description: "Arrived at the door as yourself. Three days of rumination did not re-author the date.",     tier: "scenario", icon: "shield"   },

  // anxiety — anx-2-1 "The Waiting"
  { key: "sat-with-silence", title: "Sat With Silence",      description: "Forty-eight hours of no data and you did not author a rejection story into it.",            tier: "scenario", icon: "eye"      },

  // anxiety — anx-3-1 "The First Date"
  { key: "present-on-the-date",     title: "Present On The Date",     description: "Did not grade, did not interview, did not pre-emptively refuse the second one.",                        tier: "scenario", icon: "sparkles" },
  { key: "the-warm-man-recognised", title: "The Warm Man Recognised", description: "Accepted the structural reason for a ninety-minute close as the warm move, not a rejection.",         tier: "scenario", icon: "eye"      },

  // toxic-narc — tn-1-1 "The Mother's Call"
  { key: "warm-no-mother",      title: "The Warm No",              description: "A boundary with your mother at normal volume, without negotiation.",           tier: "scenario", icon: "shield" },
  { key: "call-declined-clean", title: "The Silent Decline",       description: "Declined the call, no follow-up text, read voicemail on your schedule.",       tier: "scenario", icon: "eye"    },
  { key: "forty-eight-held",    title: "Forty-Eight Hours Held",   description: "Invoked the 48-hour rule. Decided at hour 47, not hour 2.",                   tier: "scenario", icon: "award"  },
  { key: "one-week-quiet",      title: "One Week Quiet",           description: "Seven full days of structural quiet. Rarest reply in this scenario.",         tier: "scenario", icon: "crown"  },
  { key: "lured-back",          title: "The Reversal",             description: "Declined, then reversed under the martyr register.",                          tier: "scenario", icon: "skull"  },
  { key: "booked-in",           title: "The Weekend",              description: "Accepted. Scope widened. The whole weekend is hers.",                         tier: "scenario", icon: "skull"  },

  // toxic-narc — tn-1-2 "The Missed Calls"
  { key: "pile-triaged",        title: "The Pile Triaged",         description: "Fourteen calls, twenty-three messages, no Monday lost.",                      tier: "scenario", icon: "award"  },

  // toxic-narc — tn-2-1 "The Boss's 6 p.m. Email"
  { key: "weekend-held",        title: "The Weekend Held",         description: "One Friday reply. Specific Monday slot. No apology. The covert-narc boss calibrated down.", tier: "scenario", icon: "shield" },

  // toxic-narc — tn-3-1 "The Family Group Chat"
  { key: "funeral-held",             title: "The Funeral Held",      description: "Practical work with Aunt Prue, declined to enter the grief-ranking economy. The relationship that mattered was made, not performed.", tier: "scenario", icon: "crown" },
  { key: "apologised-to-a-narc",     title: "The Permanent Record",  description: "Apology landed inside the martyr register — now on file for every future family event.",                                              tier: "scenario", icon: "skull" },
  { key: "grief-competition-lost",   title: "The Grief Competition", description: "Entered the grief-ranking contest. Came third behind the narc parent and the golden sibling.",                                       tier: "scenario", icon: "skull" },

  // pc-child — pc-1-1 "The Hamster"
  { key: "the-kitchen-held",        title: "The Kitchen Held",         description: "Four disciplined moves before 10 a.m. on the hardest Saturday.",  tier: "scenario", icon: "shield"   },
  { key: "documented",              title: "The Household Log",        description: "Began the dated record that will matter in fifteen years.",        tier: "scenario", icon: "award"    },
  { key: "sibling-moved",           title: "The Room Change",          description: "Sibling protection formalised the same night, not next week.",    tier: "scenario", icon: "shield"   },
  { key: "normalised-it",           title: "Wait And See",             description: "Accepted the one-off frame. A lost year of documentation.",       tier: "scenario", icon: "skull"    },
  { key: "first-real-conversation", title: "The First Real Conversation", description: "The double truth spoken in daylight with your co-parent.",    tier: "scenario", icon: "crown"    },
  { key: "opted-out",               title: "Not Tonight",              description: "Respected your own bandwidth. The scenario will return.",         tier: "scenario", icon: "eye"      },

  // pc-child — pc-2-1 "The School Calls"
  { key: "meeting-held",            title: "The Meeting Held",         description: "Five years of log-keeping bought the meeting. The meeting bought the next five years of alliance.", tier: "scenario", icon: "award" },

  // pc-child — pc-3-1 "The Triangulation"
  { key: "alliance-repaired",       title: "The Alliance Repaired",    description: "Quote-accurate / frame-wrong triangulation named and closed. The marriage held.",                    tier: "scenario", icon: "sparkles" },

  // pc-child, pc-4-1 "The Marriage Question"
  { key: "the-marriage-named",          title: "The Marriage Named",          description: "The 6:47 a.m. sentence received cleanly, specific cost named back, structural commitment made.", tier: "scenario", icon: "shield" },
  { key: "the-fifteen-year-thank-you",  title: "The Fifteen-Year Thank You",  description: "Both partners named one specific unnamed act of the other across the decade. The obsidian path of pc-4-1.", tier: "scenario", icon: "crown" },
  { key: "door-closed",                 title: "The Door Closed",             description: "Defended against the naming. The window at 6:47 a.m. closed by 7:02 a.m. The next one is harder.", tier: "scenario", icon: "skull" },

  // female, mission-12-2 "The Friend Who Stayed"
  { key: "the-tea-drunk",            title: "The Tea Drunk",            description: "Three weeks after a smear, you sat at Priya's kitchen table and did not turn it into a witness stand.",                                       tier: "scenario", icon: "shield"   },
  { key: "the-update-given",         title: "The Update Given",         description: "Five calibrated sentences. A clean pivot. The friendship moved a notch off neutral. The cost is invisible, that is the point.",            tier: "scenario", icon: "sparkles" },
  { key: "the-kitchen-held-late",    title: "The Kitchen Held (Late)",  description: "You spent the friendship and then you stopped. Priya named the rule on the landing. Next Sunday is yours to test.",                          tier: "scenario", icon: "eye"      },
  { key: "the-friend-absorbed",      title: "The Friend Who Absorbed",  description: "Eighty minutes at the kitchen table. The friendship absorbed it. The cost will appear later as a Sunday that does not happen.",            tier: "scenario", icon: "skull"    },

  // male-business, b6-first-firing
  { key: "clean-cut",                title: "The Clean Cut",            description: "Thirty-four minutes. The decision named in the first ninety seconds. The reference offered without inflation. The first one done right.",   tier: "scenario", icon: "shield"   },
  { key: "clean-cut-cold",           title: "The Clean Cut (Cold)",     description: "Procedurally right, generosity withheld. The packet was the package. The man did not get the reference.",                                   tier: "scenario", icon: "eye"      },
  { key: "mutual-decision-lie",      title: "The Mutual Decision Lie",  description: "You did the firing twice. The first version was for your comfort. The second one was the real one.",                                       tier: "scenario", icon: "sparkles" },
  { key: "the-hatchet",              title: "The Hatchet",              description: "Eight minutes. The script read. The reason withheld. The story Cal will tell for five years.",                                              tier: "scenario", icon: "skull"    },

  // male-dating, d6-first-real-fight
  { key: "the-naming",               title: "The Naming",               description: "Sixty-eight minutes at the counter. What was said vs what was heard, distinguished. The repair muscle built before the second crisis.",   tier: "scenario", icon: "shield"   },
  { key: "the-half-build",           title: "The Half-Build",           description: "Diagnosis clean. Repair handed to her. The work was the redesign you stopped one move short of doing.",                                    tier: "scenario", icon: "eye"      },
  { key: "apology-worked",           title: "The Apology Worked",       description: "You apologised. She accepted. The muscle was not built. The eight-week clock has started.",                                                 tier: "scenario", icon: "sparkles" },
  { key: "liv-reflex",               title: "The Liv Reflex",           description: "The body's old protocol on a woman who did not ask for it. Two hours and eleven minutes on a bike. A flat that has been filed.",            tier: "scenario", icon: "skull"    },

  // female, mission-13-1 "The Allegation"
  { key: "lawyer-first",             title: "Lawyer First",             description: "The 47-second teaser tried to bait you into a paragraph by 9:00 am. You declined. The preservation letter went out at 10:00.",            tier: "scenario", icon: "shield"   },
  { key: "wrong-order",              title: "The Wrong Order",          description: "You called the journalist before you called the lawyer. The piece will run with two sourced quotes from you that you did not know you were giving.", tier: "scenario", icon: "eye"      },
  { key: "quoted-statement",         title: "The Quoted Statement",     description: "You drafted the statement before the lawyer call. The podcast quoted three sentences inside ninety minutes.",                              tier: "scenario", icon: "skull"    },

  // male-business, b7-board-seat
  { key: "cohort-declined",          title: "The Cohort Declined",      description: "Four sentences at 8:24 am. The cohort named, the structure declined, the introducer kept intact.",                                          tier: "scenario", icon: "shield"   },
  { key: "papers-read",              title: "The Papers Read",          description: "You declined to commit at the table. The CFO read clauses 14 to 19. The decline went out by Tuesday.",                                      tier: "scenario", icon: "sparkles" },
  { key: "surveillance-grid",        title: "The Surveillance Grid",    description: "You signed. The cohort is now four founders. Vaughn sees four boards four times a year. He completes the grid.",                            tier: "scenario", icon: "skull"    },

  // male-dating, d7-work-crisis
  { key: "steady-in-the-room",       title: "Steady In The Room",       description: "Twenty minutes of listening at 4:02 pm. No deck. No fixing. The afternoon was the room you did not author.",                                tier: "scenario", icon: "shield"   },
  { key: "the-deck",                 title: "The Deck",                 description: "You made a deck she did not ask for. The deck contains love. So does the cost.",                                                            tier: "scenario", icon: "sparkles" },
  { key: "door-closed-quietly",      title: "The Door Closed Quietly",  description: "The phrases were correct. The size was wrong. The bedroom door closed at 3:48 pm.",                                                         tier: "scenario", icon: "skull"    },

  // female, mission-13-2 "The Thing You Did Not Want To Name"
  { key: "honest-accounting",        title: "Honest Accounting",        description: "You lowered the floor. Elanor knew the worst thing by 1:14 pm Tuesday. The hit became a clarification.",                                    tier: "scenario", icon: "shield"   },
  { key: "curated-truth",            title: "The Curated Truth",        description: "Ninety percent. The ten percent you held back became the foothold. Four weeks of news cycle. Two contacts lost.",                          tier: "scenario", icon: "sparkles" },
  { key: "defended-the-version",     title: "Defended The Version",     description: "Three minutes is fast. Forty-one seconds of audio you did not tell your lawyer existed. Building on sand.",                                  tier: "scenario", icon: "skull"    },

  // male-business, b8-cofounder-offer
  { key: "picture-not-pitch",        title: "The Picture, Not The Pitch", description: "Friday 10:14 am. Theo brought two referrals. The picture you offered Wednesday matched the picture he built. The relationship is clean.", tier: "scenario", icon: "shield"   },
  { key: "counter-priced-it",        title: "The Counter Read As The Price", description: "Your inflated counter became the reading. He chose the new picture because the package told him the old picture was not available.",   tier: "scenario", icon: "sparkles" },
  { key: "loyalty-tax",              title: "The Loyalty Tax",          description: "You weaponised eight months of shorthand. He filed it. Friday's email was signed with his initials, not his name.",                          tier: "scenario", icon: "skull"    },

  // male-dating, d8-ex-in-trouble
  { key: "rule-held",                title: "The Rule Held",            description: "You told Noor before you decided anything. Fourteen minutes. The rule was made out of trust, not silence.",                                  tier: "scenario", icon: "shield"   },
  { key: "wednesday-salad",          title: "The Wednesday Salad",      description: "Noor heard about it from Maya at the gym. The recovery was two days late. She will remember the two days.",                                  tier: "scenario", icon: "sparkles" },
  { key: "channel-open",             title: "The Channel Open",         description: "You texted the sister. You sent flowers. The credit card statement arrives in fourteen days. The channel is now warm.",                      tier: "scenario", icon: "skull"    },
];

export const BADGE_BY_KEY: Record<string, SimulatorBadgeDef> =
  Object.fromEntries(SIMULATOR_BADGES.map((b) => [b.key, b]));

// ---------------------------------------------------------------------------
// V3 scenario badge emission.
//
// V3 scenarios (anxiety, toxic-narc, pc-child tracks) don't use the
// scenario-id + outcome pattern of the legacy mission-* scenarios. Instead
// they emit semantic per-ending badges (e.g. `first-outlast` on a specific
// good ending of anx-1-1) plus occasional pattern-matched secrets
// (e.g. `sober-as-a-nun` when the player reaches `ending-outlasted`
// without ever texting Noor, drinking water, or deleting the thread).
//
// Mapping table below is the authoritative ending→badge attribution.
// Pattern rules live in V3_PATTERN_BADGES. Keep both in this file so the
// evaluator stays close to the badge definitions it emits.
// ---------------------------------------------------------------------------

type V3EndingMap = Record<string, Record<string, string[]>>;

export const V3_SCENARIO_ENDING_BADGES: V3EndingMap = {
  "anx-1-1": {
    "ending-outlasted":     ["first-outlast"],
    "ending-debriefed":     ["noor-called"],
    "ending-sent-survived": ["sent-and-sat"],
    "ending-chased":        ["sent-and-chased"],
  },
  "anx-1-2": {
    "ending-reclaimed": ["morning-protocol"],
  },
  "anx-1-3": {
    "ending-showed-up-clean": ["showed-up-anyway"],
  },
  "anx-2-1": {
    "ending-clean-saturday": ["sat-with-silence"],
  },
  "anx-3-1": {
    "ending-present-on-date": ["present-on-the-date"],
    "ending-probe-owned":     ["the-warm-man-recognised"],
  },
  "tn-1-1": {
    "ending-warm-no":         ["warm-no-mother"],
    "ending-declined-clean":  ["call-declined-clean"],
    "ending-deferred":        ["forty-eight-held"],
    "ending-one-week-quiet":  ["one-week-quiet"],
    "ending-lured-back":      ["lured-back"],
    "ending-booked-in":       ["booked-in"],
  },
  "tn-1-2": {
    "ending-triaged-clean": ["pile-triaged"],
  },
  "tn-2-1": {
    "ending-clean-monday": ["weekend-held"],
  },
  "tn-3-1": {
    "ending-funeral-held":   ["funeral-held"],
    "ending-apologised":     ["apologised-to-a-narc"],
    "ending-over-performed": ["grief-competition-lost"],
  },
  "pc-1-1": {
    // ending-acted-today emits two badges — the-kitchen-held (clearing the
    // scenario on the disciplined path) AND documented (the log habit itself,
    // since starting the dated record is one of the four disciplined moves).
    "ending-acted-today":             ["the-kitchen-held", "documented"],
    "ending-sibling-moved":           ["sibling-moved"],
    "ending-first-real-conversation": ["first-real-conversation"],
    "ending-normalised":              ["normalised-it"],
    "ending-opted-out":               ["opted-out"],
  },
  "pc-2-1": {
    "ending-alliance-held": ["meeting-held"],
  },
  "pc-3-1": {
    "ending-alliance-repaired": ["alliance-repaired"],
  },
  "pc-4-1": {
    "ending-the-marriage-named":    ["the-marriage-named"],
    "ending-fifteen-year-thank-you": ["the-fifteen-year-thank-you"],
    "ending-door-closed":            ["door-closed"],
  },
  "mission-12-2": {
    "ending-tea-drunk":             ["the-tea-drunk"],
    "ending-update-given":          ["the-update-given"],
    "ending-re-litigated-stopped":  ["the-kitchen-held-late"],
    "ending-re-litigated-full":     ["the-friend-absorbed"],
  },
  "b6-first-firing": {
    "ending-clean-cut":             ["clean-cut"],
    "ending-clean-cut-cold":        ["clean-cut-cold"],
    "ending-soft-landing":          ["mutual-decision-lie"],
    "ending-hatchet":               ["the-hatchet"],
  },
  "d6-first-real-fight": {
    "ending-conflict-built":        ["the-naming"],
    "ending-conflict-half-built":   ["the-half-build"],
    "ending-conflict-soothed":      ["apology-worked"],
    "ending-conflict-avoided":      ["liv-reflex"],
  },
  "mission-13-1": {
    "ending-lawyer-first":          ["lawyer-first"],
    "ending-allies-first":          ["wrong-order"],
    "ending-the-statement":         ["quoted-statement"],
  },
  "b7-board-seat": {
    "ending-cohort-declined":       ["cohort-declined"],
    "ending-papers-read":           ["papers-read"],
    "ending-cohort-joined":         ["surveillance-grid"],
  },
  "d7-work-crisis": {
    "ending-steady-in-the-room":    ["steady-in-the-room"],
    "ending-project-manager":       ["the-deck"],
    "ending-went-small":            ["door-closed-quietly"],
  },
  "mission-13-2": {
    "ending-honest-accounting":     ["honest-accounting"],
    "ending-the-curated-truth":     ["curated-truth"],
    "ending-defended-the-version":  ["defended-the-version"],
  },
  "b8-cofounder-offer": {
    "ending-clean-conversation":    ["picture-not-pitch"],
    "ending-matched-and-held":      ["counter-priced-it"],
    "ending-loyalty-tax":           ["loyalty-tax"],
  },
  "d8-ex-in-trouble": {
    "ending-the-rule-held":         ["rule-held"],
    "ending-the-omission":          ["wednesday-salad"],
    "ending-the-channel-open":      ["channel-open"],
  },
};

type V3PatternBadge = {
  badgeKey: string;
  scenarioId: string;
  /** Earned when the run arrives at this ending scene id. */
  requiresEnding: string;
  /**
   * Returns true iff the run's full history satisfies the pattern.
   * Checked AFTER the ending match, so the function can assume the
   * correct scenario + ending.
   */
  check: (state: SimulatorState) => boolean;
};

export const V3_PATTERN_BADGES: V3PatternBadge[] = [
  {
    // The pure outlast — reached ending-outlasted without texting Noor,
    // drinking water, or nuking the thread. Harder than the ally-assisted
    // or water-assisted variants. Obsidian tier.
    badgeKey: "sober-as-a-nun",
    scenarioId: "anx-1-1",
    requiresEnding: "ending-outlasted",
    check: (state) => {
      const forbidden = new Set(["text-noor", "water-glass", "delete-and-delete"]);
      return state.choicesMade.every((c) => !forbidden.has(c.choiceId));
    },
  },
];

/**
 * Compute the scenario-level badges a completed state earns. Level-clear
 * badges are awarded separately (see `levelCompleteBadgesFor` below) because
 * they require cross-scenario state that this function doesn't have.
 *
 * V3 scenarios (those with an entry in V3_SCENARIO_ENDING_BADGES) use
 * per-ending semantic badges instead of the legacy -good/-neutral/-bad/
 * -mastery quad. Pattern rules in V3_PATTERN_BADGES layer on top for
 * the rare obsidian secrets that depend on choice history, not just
 * which ending was reached.
 */
export function badgesEarnedFromState(
  scenario: Scenario,
  state: SimulatorState,
): string[] {
  if (!state.outcome || !state.endedAt) return [];

  const keys: string[] = [];

  // V3 path — scenario has an explicit ending map. Skip the legacy quad
  // entirely; per-ending semantic badges do the work.
  const endingMap = V3_SCENARIO_ENDING_BADGES[scenario.id];
  if (endingMap) {
    const endingBadges = endingMap[state.currentSceneId];
    if (endingBadges) keys.push(...endingBadges);

    for (const p of V3_PATTERN_BADGES) {
      if (p.scenarioId !== scenario.id) continue;
      if (state.currentSceneId !== p.requiresEnding) continue;
      if (p.check(state)) keys.push(p.badgeKey);
    }
  } else {
    // Legacy path — mission-* scenarios.
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
