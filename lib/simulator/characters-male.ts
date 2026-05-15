/**
 * Male-version character registry. The male simulator splits into two
 * tracks — Business Line and Dating Line — and reuses cast across
 * scenarios within a track for continuity. Same pattern as `characters.ts`
 * for the female simulator.
 *
 * Tone guide for writers:
 *   BUSINESS LINE
 *   - DAMIEN (rival-superior, factor-1 traits) — polished, charming in
 *     public, knife in private. Default: cold. Warms to "smirking" when
 *     you're losing ground.
 *   - HALE (credit-thief director) — affable, quick to "team" language
 *     when things go well, deflective when they don't. Default: neutral.
 *   - SAGE (covert peer) — smiles, says yes, plants stories. Default:
 *     curious. Breaks character to "concerned" when caught.
 *   - RYKER (charming cofounder) — magnetic, fast-moving, pressure-happy.
 *     Love-bombs in business register. Default: seductive (business
 *     charisma version).
 *   - VAUGHN (predator investor) — slow, patrician, friendly. The term
 *     sheet is the teeth. Default: knowing.
 *   - THEO (ally — CFO type) — spare, exact, loyal. Default: knowing.
 *
 *   DATING LINE
 *   - CHASE (alpha-tester) — higher status, tests you publicly. Default:
 *     smirking.
 *   - LIV (BPD/HPD — "exciting one") — idealises fast, intense, chaotic.
 *     Default: seductive. Shifts to "angry" on perceived slights.
 *   - SCARLETT (gaslighter) — calm, certain, reality-inverting. Default:
 *     cold. Becomes "concerned" when you push back.
 *   - EMBER (the hoover — ex-partner) — remorseful, tearful, reformed.
 *     Default: sad. Pleads and pivots to anger if you resist.
 *   - NOOR (secure one) — direct, calm, emotionally regulated. Default:
 *     neutral. Curious when you open up.
 *   - COLE (wingman / ally) — the friend who's been burned and learned.
 *     Default: knowing.
 */

import type { Character } from "./types";

// =====================================================================
// BUSINESS LINE
// =====================================================================

export const DAMIEN: Character = {
  id: "damien",
  name: "Damien Vance",
  description:
    "Two levels above you. Ex-McKinsey, reads rooms like sheet music. Respected publicly, feared privately. Runs the power meetings. You don't win against him — you survive him, then outlast him.",
  traits: ["cunning", "charming", "political", "ruthless"],
  defaultEmotion: "cold",
  gender: "male",
  personalityType: "factor-1",
  silhouetteType: "male-imposing",
};

export const HALE: Character = {
  id: "hale",
  name: "Marcus Hale",
  description:
    "Your director. Takes credit easily, redirects blame smoothly. Says 'team effort' when it went well; names you when it didn't. Not malicious — just optimised for his own ascent.",
  traits: ["narcissistic", "credit-thief", "political"],
  defaultEmotion: "neutral",
  gender: "male",
  personalityType: "workplace-narcissist",
  silhouetteType: "male-imposing",
};

export const SAGE: Character = {
  id: "sage-m",
  name: "Sage Ortiz",
  description:
    "Coworker at your level. Quiet, agreeable, excellent at taking notes — and knowing whose ideas those notes get attributed to. You won't hear the knife; you'll hear the leak three weeks later.",
  traits: ["covert", "observer", "opportunistic", "reputation-warrior"],
  defaultEmotion: "curious",
  gender: "male",
  personalityType: "covert-narcissist",
  silhouetteType: "male-lean",
};

export const RYKER: Character = {
  id: "ryker",
  name: "Ryker Cole",
  description:
    "Potential cofounder. Magnetic, accomplished on paper, says all the right things inside four minutes. Wants the LLC signed this week. His references 'are travelling'. Business love-bomber — the dating pattern in a pitch deck.",
  traits: ["charming", "urgent", "future-faking", "pressure-applying"],
  defaultEmotion: "seductive",
  gender: "male",
  personalityType: "dark-triad-founder",
  silhouetteType: "male-athletic",
};

export const VAUGHN: Character = {
  id: "vaughn",
  name: "Lawrence Vaughn",
  description:
    "Investor. Patrician, warm, references 'the long game'. The term sheet is the teeth — clauses 14-19 route control to him on any adverse event. He knows you won't read it carefully. Most founders don't.",
  traits: ["patient", "predatory", "paternal-seeming"],
  defaultEmotion: "knowing",
  gender: "male",
  personalityType: "predator-capital",
  silhouetteType: "male-imposing",
};

export const THEO: Character = {
  id: "theo",
  name: "Theo Nakamura",
  description:
    "Your CFO / co-founder. Spare, exact, sees three moves ahead. Saved you from the Ryker deal by asking one question. The kind of ally most founders don't know to keep close.",
  traits: ["analytical", "loyal", "spare"],
  defaultEmotion: "knowing",
  gender: "male",
  personalityType: "strategic-ally",
  silhouetteType: "male-lean",
};

// =====================================================================
// DATING LINE
// =====================================================================

export const CHASE: Character = {
  id: "chase",
  name: "Chase Whitaker",
  description:
    "Higher social status. Old money, knows everyone at the bar. Tests new men in front of the group — cutting remarks disguised as jokes. If you react, you're branded. If you handle it, he respects you and the room scores you.",
  traits: ["alpha-testing", "public-cutter", "status-protective"],
  defaultEmotion: "smirking",
  gender: "male",
  personalityType: "dominant",
  silhouetteType: "male-imposing",
};

export const LIV: Character = {
  id: "liv",
  name: "Liv Marchetti",
  description:
    "Magnetic, chaotic, fast-moving. Idealises you inside a week. Jealousy dressed as love. Sex on fire. The exciting one — BPD/HPD markers visible by week three if you're trained to see them. Your body is loud; your trained eye is quiet.",
  traits: ["intense", "idealising", "cluster-b"],
  defaultEmotion: "seductive",
  gender: "female",
  personalityType: "bpd-hpd",
  silhouetteType: "female-elegant",
};

export const SCARLETT: Character = {
  id: "scarlett",
  name: "Scarlett Voss",
  description:
    "Three months in. Calm, certain, polished. Gaslights with affection — rewrites events with quiet confidence, makes you apologise for things that didn't happen. You leave conversations feeling wrong without knowing why.",
  traits: ["gaslighting", "DARVO", "reality-inverting"],
  defaultEmotion: "cold",
  gender: "female",
  personalityType: "covert-narcissist",
  silhouetteType: "female-soft",
};

export const EMBER: Character = {
  id: "ember",
  name: "Ember",
  description:
    "The ex you left six weeks ago after she crossed the line she'd crossed ten times before. Now she's back. New texts. New tears. 'I've been in therapy.' The hoovering cycle runs on the old nervous-system grooves — she knows which ones.",
  traits: ["hoovering", "remorseful-performing", "trauma-bond-exploiting"],
  defaultEmotion: "sad",
  gender: "female",
  personalityType: "hoover",
  silhouetteType: "female-elegant",
};

export const NOOR: Character = {
  id: "noor",
  name: "Noor Rahimi",
  description:
    "Secure, direct, low drama. Asks questions you don't have practised answers to. Doesn't play. Doesn't chase. Doesn't withhold. You notice a quiet part of you is asking if she's boring — and that's the part that's going to decide whether you get the life you want.",
  traits: ["secure", "direct", "emotionally-regulated"],
  defaultEmotion: "neutral",
  gender: "female",
  personalityType: "secure",
  silhouetteType: "female-soft",
};

export const COLE: Character = {
  id: "cole",
  name: "Cole Ferrari",
  description:
    "Your best friend. Divorced at 34 from a woman who matched Liv's pattern. Now pays child support and reads everything by Kanika Batra. Your mirror when you're being stupid.",
  traits: ["loyal", "burnt-and-learned", "plain-spoken"],
  defaultEmotion: "knowing",
  gender: "male",
  personalityType: "ally",
  silhouetteType: "male-athletic",
};

// =====================================================================
// BUSINESS LINE, L6+ characters
// =====================================================================

/**
 * Cal Renner. Fourth hire of the protagonist's company. Senior engineer.
 * Hired when the stack was Rails. Did not pick up Go when the migration
 * happened. Likable, well-regarded internally, no longer technically
 * central. Not a villain: the discipline in b6 is firing someone who
 * is not a villain. Forty-one, married, six-year-old daughter.
 */
export const CAL: Character = {
  id: "cal",
  name: "Cal Renner",
  description:
    "Senior engineer. Fourth hire. The one who signed before the lawyer made you fix the option grant. The team has tolerated the technical drift because Cal is well-liked. You have tolerated it because he was the first person to bet on you. Forty-one. Wife. A daughter who starts first grade in September.",
  traits: ["likable", "loyal", "technically-drifted"],
  defaultEmotion: "neutral",
  gender: "male",
  personalityType: "long-tenure-employee",
  silhouetteType: "male-average",
};

// =====================================================================
// BUSINESS LINE, L9+ characters
// =====================================================================

/**
 * Renat Ivanov. CEO of Forge Labs, $400M ARR, Series C. Russian-born,
 * Stanford MBA, ten years operating. Calm, deliberate, slow blinker.
 * Speaks in three-sentence units. Verbal tic: opens with "tell me
 * where you are" before any pitch. The acquihire-dressed-as-acquisition
 * antagonist in b9. Not malicious. Just optimised for Forge.
 */
export const RENAT: Character = {
  id: "renat",
  name: "Renat Ivanov",
  description:
    "CEO of Forge Labs, Series C, $400M ARR. Speaks in three-sentence units. Opens every pitch with tell me where you are. The acquihire-dressed-as-acquisition antagonist. Optimised for Forge, not malicious about it.",
  traits: ["deliberate", "patient", "structurally-aware"],
  defaultEmotion: "knowing",
  gender: "male",
  personalityType: "predator-capital",
  silhouetteType: "male-imposing",
};

/**
 * Anika Patel. Theo's replacement CFO from b8's GOOD ending. South-
 * Asian, mid-thirties, ex-Stripe finance. The CFO who flags the
 * structure before you do. Direct, fast, structural. Verbal tic:
 * texts complete sentences with periods.
 */
export const ANIKA: Character = {
  id: "anika",
  name: "Anika Patel",
  description:
    "Your CFO. Theo's referral, came in on the ninety-day transition. Ex-Stripe finance, mid-thirties, direct in a register that reads as procedural rather than blunt. Flags structural anomalies before they are obvious. Texts complete sentences with periods.",
  traits: ["structural", "fast", "loyal-by-evidence"],
  defaultEmotion: "knowing",
  gender: "female",
  personalityType: "strategic-ally",
  silhouetteType: "female-elegant",
};

// =====================================================================
// SHARED, inner voice (imported from female registry's pattern)
// =====================================================================

export const INNER_VOICE_M: Character = {
  id: "inner-voice",
  name: "Inner Voice",
  description: "Your gut. Louder every time you listen.",
  traits: ["intuitive"],
  defaultEmotion: "neutral",
};
