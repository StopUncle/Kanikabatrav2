/**
 * Shared character registry. Scenarios import the characters they need
 * from here so Maris behaves the same across Levels 1, 2, and 5.
 *
 * Tone guide for writers:
 *   - MARIS (NPD, Factor 1 psychopath) — cold, mirror-polished. Speaks
 *     in rhetorical questions and short declaratives. Never raises her
 *     voice; cuts with calm. Default: seductive.
 *   - DANA (covert narc proxy) — warm, giggly, probes for info. The
 *     "I'm just trying to help" sister of someone in Maris's circle.
 *     Default: happy. Breaks character to "concerned" when caught.
 *   - PRIYA (ally, ex-target) — low-key observer. Been burned, learned.
 *     Speaks sparely, often one-word or silent. Default: knowing.
 *   - ALEX (roommate, insecure) — bro, competitive, jealous. Default:
 *     curious. Shifts to sad when downplayed.
 */

import type { Character } from "./types";

export const MARIS: Character = {
  id: "maris",
  name: "Maris Caldwell",
  description:
    "Primary antagonist. Clinically ASPD/psychopathy Factor 1. Cold, calculated, glib. Runs the table at every gathering. You don't charm her — you survive her.",
  traits: ["cunning", "grandiose", "pathological", "charming"],
  defaultEmotion: "seductive",
  gender: "female",
  personalityType: "psychopath",
  silhouetteType: "maris-caldwell",
};

export const DANA: Character = {
  id: "dana",
  name: "Dana Morrison",
  description:
    "Caleb's sister. Maris-adjacent. Approaches you with warmth and information-probe questions. Runs to group chat the moment you blink.",
  traits: ["covert", "calculating", "charming", "extractor"],
  defaultEmotion: "happy",
  gender: "female",
  personalityType: "narcissist",
  silhouetteType: "female-elegant",
};

export const PRIYA: Character = {
  id: "priya",
  name: "Priya Sharma",
  description:
    "Ally. Tried to crack Maris's circle last year, got publicly humiliated, learned. Watches before she speaks. Rarely wrong.",
  traits: ["observant", "strategic", "loyal"],
  defaultEmotion: "knowing",
  gender: "female",
  personalityType: "friend",
  silhouetteType: "female-athletic",
};

export const ALEX: Character = {
  id: "alex",
  name: "Alex Torres",
  description:
    "Roommate. Didn't get into the gala. Asks too many questions about your life. Jealous under the friendliness.",
  traits: ["competitive", "probing", "insecure"],
  defaultEmotion: "curious",
  gender: "male",
  personalityType: "competitor",
  silhouetteType: "male-athletic",
};

export const INNER_VOICE: Character = {
  id: "inner-voice",
  name: "Inner Voice",
  description: "Your gut. Louder every time you listen.",
  traits: ["intuitive"],
  defaultEmotion: "neutral",
};

/**
 * Level-specific characters (not recurring). Exported so scenarios in
 * later levels can reference them if needed without duplicating.
 */

// Level 2
export const MORGAN: Character = {
  id: "morgan",
  name: "Morgan",
  description:
    "Histrionic edge. Thrives on drama. Will text you 'omg did you hear' within an hour of any event.",
  traits: ["dramatic", "attention-hungry", "unreliable"],
  defaultEmotion: "happy",
  gender: "non-binary",
  personalityType: "histrionic",
  silhouetteType: "hair-styled",
};

// Level 3
export const JORDAN: Character = {
  id: "jordan",
  name: "Jordan",
  description:
    "Borderline features. Intense, escalating asks. Today they need a huge favor and yesterday was the same. Tomorrow will be too.",
  traits: ["intense", "escalating", "emotional"],
  defaultEmotion: "pleading",
  gender: "non-binary",
  personalityType: "borderline",
  silhouetteType: "hair-ponytail",
};

// Level 4
export const AVERY: Character = {
  id: "avery",
  name: "Avery Chen",
  description:
    "Covert narcissist. Quiet, 'nice' — then you hear what she said about you. Plants stories and waits.",
  traits: ["covert", "passive-aggressive", "reputation-warrior"],
  defaultEmotion: "neutral",
  gender: "female",
  personalityType: "covert-narcissist",
  silhouetteType: "female-soft",
};

// Level 5
export const LENNOX: Character = {
  id: "lennox",
  name: "Lennox",
  description:
    "A younger player. Ambitious. Watches you the way you used to watch Maris. Thinks she can replace you.",
  traits: ["ambitious", "watching", "imitator"],
  defaultEmotion: "curious",
  gender: "female",
  personalityType: "aspirant",
  silhouetteType: "hair-ponytail",
};

// Level 6 — Career Power
export const MARCUS: Character = {
  id: "marcus",
  name: "Marcus Hale",
  description:
    "Your director. Takes credit easily, redirects blame smoothly. Says 'team effort' when it went well; names you when it didn't.",
  traits: ["narcissistic", "credit-thief", "politically-savvy"],
  defaultEmotion: "neutral",
  gender: "male",
  personalityType: "workplace-narcissist",
  silhouetteType: "male-imposing",
};

export const SAGE: Character = {
  id: "sage",
  name: "Sage Ortiz",
  description:
    "Coworker at your level. Quiet, agreeable, excellent at taking notes — and knowing whose ideas those notes get attributed to.",
  traits: ["covert", "observer", "opportunistic"],
  defaultEmotion: "neutral",
  gender: "female",
  personalityType: "covert-narcissist",
  silhouetteType: "female-soft",
};

export const KAYA: Character = {
  id: "kaya",
  name: "Kaya Brooks",
  description:
    "Senior peer or mentor figure. Calm, thorough. Knows where the bodies are buried and rarely mentions it.",
  traits: ["seasoned", "strategic", "low-noise"],
  defaultEmotion: "knowing",
  gender: "female",
  personalityType: "mentor",
  silhouetteType: "female-athletic",
};

// Level 7 — Dating Strategy
export const ELIAS: Character = {
  id: "elias",
  name: "Elias",
  description:
    "Dating interest. Avoidant attachment style — interested, then distant, then back. Not malicious; just patterned.",
  traits: ["avoidant", "inconsistent", "interesting"],
  defaultEmotion: "curious",
  gender: "male",
  personalityType: "avoidant",
  silhouetteType: "male-lean",
};

export const NOVA: Character = {
  id: "nova",
  name: "Nova",
  description:
    "Dating interest. Secure, direct, low drama. Doesn't play the game. Asks questions you don't practice the answers to.",
  traits: ["secure", "direct", "calm"],
  defaultEmotion: "neutral",
  gender: "non-binary",
  personalityType: "secure",
  silhouetteType: "hair-styled",
};

// Level 8 — Family
export const THE_MOTHER: Character = {
  id: "mother",
  name: "Mother",
  description:
    "Lifelong primary figure. Covert narcissist. Compares siblings, rewrites history, wields guilt like an inheritance. The scripts ran before you could name them.",
  traits: ["narcissistic", "guilt-engineering", "history-rewriting"],
  defaultEmotion: "neutral",
  gender: "female",
  personalityType: "narc-parent",
  silhouetteType: "female-elegant",
};

export const GOLDEN_SIBLING: Character = {
  id: "sibling",
  name: "Ren",
  description:
    "Your sibling. The 'golden child' — favored without effort, cited in every comparison, sometimes unaware of the role they're playing. Sometimes very aware.",
  traits: ["favored", "triangulated", "ambiguous"],
  defaultEmotion: "neutral",
  gender: "non-binary",
  personalityType: "triangulation-tool",
  silhouetteType: "hair-short",
};

// Level 9 — Long Game
export const ARIA: Character = {
  id: "aria",
  name: "Aria Vale",
  description:
    "A rival with a six-month head start. Covertly campaigning against you in rooms you'll never see. Smart, patient, ruthless.",
  traits: ["patient", "covert", "reputation-warrior"],
  defaultEmotion: "neutral",
  gender: "female",
  personalityType: "covert-narcissist",
  silhouetteType: "female-elegant",
};

// Level 10 — Endgame
export const DEVON: Character = {
  id: "devon",
  name: "Devon",
  description:
    "A newer player, gender-neutral presentation. Reminds you of who you were three years ago — before Maris, before Priya, before you understood any of this.",
  traits: ["earnest", "learning", "promising"],
  defaultEmotion: "hopeful",
  gender: "non-binary",
  personalityType: "aspirant",
  silhouetteType: "hair-short",
};

// ===================================================================
// ANXIETY TRACK — introduced in TRACK-anxiety
// ===================================================================

/**
 * Noor — the steady friend in the anxiety track. Texts in lowercase.
 * Cuts through spirals with one question. Doesn't over-comfort.
 * Verbal tic: leads with "real talk," will say "log off" out loud.
 * Sits in the same voice lineage as Priya (coach/ally) but colder —
 * Priya coaches strategy, Noor coaches self-regulation.
 */
export const NOOR: Character = {
  id: "noor",
  name: "Noor",
  description:
    "Steady friend, two years older, has done her own anxious-attached deprogramming already. Answers texts at 3 a.m. without sounding sleepy. Will say 'log off' in a tone that sounds like a favour.",
  traits: ["steady", "direct", "warm-but-bounded"],
  defaultEmotion: "knowing",
  gender: "female",
  personalityType: "secure-ally",
  silhouetteType: "hair-long",
};

/**
 * The Critic — the toxic self-talk voice that runs the anxious-attached
 * spiral. Distinct from INNER_VOICE (Kanika coaching). Starts sentences
 * with "of course," uses "obviously," predicts catastrophes in
 * second-person present tense. The track teaches the player to notice
 * that this voice and the coaching voice are two different speakers —
 * the on-screen separation is itself the pedagogy.
 */
export const THE_CRITIC: Character = {
  id: "the-critic",
  name: "The Critic",
  description:
    "The internal voice that keeps you awake at 3 a.m. Catastrophising, comparing, predicting rejection. Loud when the room is quiet. Silent when you are with a steady friend. Recognising it as a separate speaker is the first move.",
  traits: ["catastrophising", "comparing", "second-person-present"],
  defaultEmotion: "concerned",
  personalityType: "inner-critic",
  silhouetteType: "inner-voice",
};

/**
 * Theo — the ex. Never on-screen directly. Referenced. May reply in
 * L2. Not a predator — he is a normal emotionally unavailable man
 * who said no. Keeping him flat (and mostly absent) is a deliberate
 * choice: the scenario is not about him, it is about your nervous
 * system's behaviour in his absence.
 */
export const THEO: Character = {
  id: "theo",
  name: "Theo",
  description:
    "The ex. Fifteen days of no contact at scenario start. Not written as a villain — written as a specific person who is no longer part of your life. His replies (or non-replies) happen off-screen.",
  traits: ["emotionally-unavailable", "normal", "not-the-problem"],
  defaultEmotion: "neutral",
  gender: "male",
  personalityType: "avoidant",
  silhouetteType: "male-lean",
};
