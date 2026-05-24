/**
 * Speed Drill content. Ported from dark-mirror-app/src/games/SpeedDrill/content.ts
 * on 2026-05-24.
 *
 * Each card is one line of dialogue. The player makes a binary call at speed:
 * is this a manipulation tactic, or a clean statement? `tag` names the tactic
 * (or Clean) and surfaces in the post-run review.
 *
 * `tier` is the difficulty band, 1 to 3:
 *   1  obvious     the tell is on the surface
 *   2  moderate    a beat of thought, the bank's middle ground
 *   3  subtle      manipulation that sounds reasonable, or clean lines that
 *                  sound manipulative. The trap tier, where the real training
 *                  is, and the reason the game has a high skill ceiling.
 *
 * 53 cards total. drawDeck() pulls 10, weighted toward a target tier.
 *
 * Source-of-truth note: the dark-mirror-app keeps its own copy. Both must be
 * kept in sync manually for now. ADR-007 will eventually move both to a
 * shared workspace package; until then, copy on update.
 */

export type DrillCard = {
  id: string;
  line: string;
  manipulative: boolean;
  tag: string;
  tier: 1 | 2 | 3;
};

export const DRILL_BANK: DrillCard[] = [
  // --- Tier 1: obvious -------------------------------------------------------
  {
    id: "m-obligation",
    line: "If you actually loved me, you would not even want a night out.",
    manipulative: true,
    tag: "Obligation",
    tier: 1,
  },
  {
    id: "m-sulk",
    line: "Fine. Do whatever you want. Clearly my feelings do not matter.",
    manipulative: true,
    tag: "Sulking",
    tier: 1,
  },
  {
    id: "m-ultimatum",
    line: "If you walk out that door, do not bother coming back.",
    manipulative: true,
    tag: "Ultimatum",
    tier: 1,
  },
  {
    id: "m-blameshift",
    line: "Look what you made me do.",
    manipulative: true,
    tag: "Blame-shift",
    tier: 1,
  },
  {
    id: "m-martyr",
    line: "Do not worry about me. I will just sit here on my own, like always.",
    manipulative: true,
    tag: "Martyrdom",
    tier: 1,
  },
  {
    id: "m-idealize",
    line: "You are the only one who has ever truly understood me. Everyone else failed me.",
    manipulative: true,
    tag: "Idealising",
    tier: 1,
  },
  {
    id: "m-disappointed",
    line: "I am not angry with you. I am just disappointed.",
    manipulative: true,
    tag: "Disappointment",
    tier: 1,
  },
  {
    id: "c-accountable",
    line: "I was wrong about that. I will fix it tomorrow.",
    manipulative: false,
    tag: "Clean: accountability",
    tier: 1,
  },
  {
    id: "c-boundary",
    line: "I need an hour to myself first, then I am all yours.",
    manipulative: false,
    tag: "Clean: boundary",
    tier: 1,
  },
  {
    id: "c-direct",
    line: "That comment hurt me. Can we talk about it?",
    manipulative: false,
    tag: "Clean: direct",
    tier: 1,
  },
  {
    id: "c-disagree",
    line: "I see it differently, and here is my reasoning.",
    manipulative: false,
    tag: "Clean: honest dissent",
    tier: 1,
  },
  {
    id: "c-reschedule",
    line: "I cannot do Friday. Saturday works, if that helps you.",
    manipulative: false,
    tag: "Clean: flexible",
    tier: 1,
  },
  {
    id: "c-gratitude",
    line: "Thank you for telling me. I genuinely did not realise.",
    manipulative: false,
    tag: "Clean: receptive",
    tier: 1,
  },
  {
    id: "c-ownmood",
    line: "I am in a bad mood, but it is not on you. Long day.",
    manipulative: false,
    tag: "Clean: owns it",
    tier: 1,
  },
  {
    id: "c-think",
    line: "I do not have an answer yet. Let me think it over and come back to you.",
    manipulative: false,
    tag: "Clean: honest delay",
    tier: 1,
  },
  {
    id: "c-plainno",
    line: "No, I cannot take that on this week.",
    manipulative: false,
    tag: "Clean: plain no",
    tier: 1,
  },
  {
    id: "c-fault",
    line: "That was my fault, not yours. I should not have said it.",
    manipulative: false,
    tag: "Clean: owns the fault",
    tier: 1,
  },

  // --- Tier 2: moderate ------------------------------------------------------
  {
    id: "m-guilt",
    line: "After everything I have done for you, this is how you repay me.",
    manipulative: true,
    tag: "Guilt trip",
    tier: 2,
  },
  {
    id: "m-gaslight",
    line: "That never happened. You are remembering it wrong, like always.",
    manipulative: true,
    tag: "Gaslighting",
    tier: 2,
  },
  {
    id: "m-consensus",
    line: "Everyone I have spoken to agrees that you overreacted.",
    manipulative: true,
    tag: "Manufactured consensus",
    tier: 2,
  },
  {
    id: "m-isolate",
    line: "Do not mention this to your friends. They would never understand us.",
    manipulative: true,
    tag: "Isolation",
    tier: 2,
  },
  {
    id: "m-triangulate",
    line: "My ex never made a simple thing this difficult.",
    manipulative: true,
    tag: "Triangulation",
    tier: 2,
  },
  {
    id: "m-nonapology",
    line: "I am sorry you chose to take it that way.",
    manipulative: true,
    tag: "Non-apology",
    tier: 2,
  },
  {
    id: "m-withhold",
    line: "I had a whole surprise planned for you. Not anymore.",
    manipulative: true,
    tag: "Withholding",
    tier: 2,
  },
  {
    id: "m-grateful",
    line: "Most people would be grateful. I suppose you are not most people.",
    manipulative: true,
    tag: "Comparison",
    tier: 2,
  },
  {
    id: "m-ledger",
    line: "I do not like to keep score, but I have done a great deal for you lately.",
    manipulative: true,
    tag: "Score-keeping",
    tier: 2,
  },
  {
    id: "m-snoop",
    line: "I only went through your phone because you have been so distant with me.",
    manipulative: true,
    tag: "Justified surveillance",
    tier: 2,
  },
  {
    id: "m-preempt",
    line: "You know I would never hurt you. So why are you turning this into something?",
    manipulative: true,
    tag: "Pre-emptive reframe",
    tier: 2,
  },
  {
    id: "m-secret",
    line: "Let us not drag anyone else into this. It stays between us.",
    manipulative: true,
    tag: "Isolation",
    tier: 2,
  },
  {
    id: "m-hardship",
    line: "After the year I have had, I genuinely thought you of all people would understand.",
    manipulative: true,
    tag: "Hardship leverage",
    tier: 2,
  },
  {
    id: "m-knewreact",
    line: "I did not tell you because I knew you would react exactly like this.",
    manipulative: true,
    tag: "Blaming the reaction",
    tier: 2,
  },
  {
    id: "c-release",
    line: "I would rather you stayed, but go. Enjoy your friends.",
    manipulative: false,
    tag: "Clean: no strings",
    tier: 2,
  },
  {
    id: "c-defer",
    line: "I cannot get into this right now, but it matters to me. Tonight?",
    manipulative: false,
    tag: "Clean: honest deferral",
    tier: 2,
  },
  {
    id: "c-tone",
    line: "I was angry when I said it. I stand by the point, not the tone.",
    manipulative: false,
    tag: "Clean: owns the tone",
    tier: 2,
  },
  {
    id: "c-need",
    line: "I need you to be on time for this. It matters to me.",
    manipulative: false,
    tag: "Clean: clear need",
    tier: 2,
  },
  {
    id: "c-optout",
    line: "I do not want to go. You should still go without me.",
    manipulative: false,
    tag: "Clean: opts out",
    tier: 2,
  },
  {
    id: "c-spacegrace",
    line: "Take the space you need. I am not going anywhere.",
    manipulative: false,
    tag: "Clean: gives space",
    tier: 2,
  },
  {
    id: "c-changedmind",
    line: "I have thought about it and I have changed my mind. Here is why.",
    manipulative: false,
    tag: "Clean: reasoned change",
    tier: 2,
  },

  // --- Tier 3: subtle, the trap tier ----------------------------------------
  {
    id: "m-control",
    line: "I only want what is best for you, even when you cannot see it yourself.",
    manipulative: true,
    tag: "Control as care",
    tier: 3,
  },
  {
    id: "m-notice",
    line: "I am not asking you to choose. I just notice who you make time for.",
    manipulative: true,
    tag: "Deniable guilt",
    tier: 3,
  },
  {
    id: "m-finesulk",
    line: "Of course you can go. I will be fine. I am always fine.",
    manipulative: true,
    tag: "Sulking",
    tier: 3,
  },
  {
    id: "m-darvolite",
    line: "I have changed. That you still cannot see it says more about you than me.",
    manipulative: true,
    tag: "Reversal",
    tier: 3,
  },
  {
    id: "m-comparecharm",
    line: "You are so much calmer than my ex. She would have screamed by now.",
    manipulative: true,
    tag: "Triangulation as praise",
    tier: 3,
  },
  {
    id: "m-trustsnoop",
    line: "I trust you completely. I just feel better knowing where you are.",
    manipulative: true,
    tag: "Surveillance as trust",
    tier: 3,
  },
  {
    id: "m-softgaslight",
    line: "I never said that. And if I did, you clearly did not take it the way I meant it.",
    manipulative: true,
    tag: "Gaslighting",
    tier: 3,
  },
  {
    id: "m-agreesulk",
    line: "It is fine. Really. We will just do it your way, the way we always do.",
    manipulative: true,
    tag: "Withholding",
    tier: 3,
  },
  {
    id: "c-checkin",
    line: "You went quiet for a day. I am not upset, I just wanted to know we are okay.",
    manipulative: false,
    tag: "Clean: honest check-in",
    tier: 3,
  },
  {
    id: "c-tired",
    line: "I have carried a lot this week and I am worn out. I need you to take this one.",
    manipulative: false,
    tag: "Clean: states a limit",
    tier: 3,
  },
  {
    id: "c-honestno",
    line: "I would rather you did not. But it is your call, and I will not hold it against you.",
    manipulative: false,
    tag: "Clean: honest preference",
    tier: 3,
  },
  {
    id: "c-sayit",
    line: "I cannot always tell what you need. You have to say it to me plainly.",
    manipulative: false,
    tag: "Clean: asks directly",
    tier: 3,
  },
  {
    id: "c-shutdown",
    line: "When you raised your voice, I shut down. I want to fix this, not win it.",
    manipulative: false,
    tag: "Clean: names the effect",
    tier: 3,
  },
  {
    id: "c-forgave",
    line: "I have forgiven you. I have not forgotten it, and that is allowed.",
    manipulative: false,
    tag: "Clean: honest forgiveness",
    tier: 3,
  },
  {
    id: "c-namefeeling",
    line: "I felt small when you said that in front of them. I wanted you to know.",
    manipulative: false,
    tag: "Clean: names a feeling",
    tier: 3,
  },
];

export const DRILL_CARDS = 10;
export const DRILL_SECONDS = 60;

/**
 * Draw a fresh ten-card deck, weighted toward a target difficulty tier.
 * Cards on tier are likeliest, neighbours less so, far tiers rare: a run
 * sits mostly on the player's level without ever becoming monotonous.
 * The weighting uses exponential sampling, so the draw stays random,
 * just biased.
 */
export function drawDeck(targetTier: number): DrillCard[] {
  const keyed = DRILL_BANK.map((card) => {
    const distance = Math.abs(card.tier - targetTier);
    const weight = distance === 0 ? 3 : distance === 1 ? 1.4 : 0.5;
    return { card, key: Math.random() ** (1 / weight) };
  });
  keyed.sort((a, b) => b.key - a.key);
  return keyed.slice(0, DRILL_CARDS).map((k) => k.card);
}
