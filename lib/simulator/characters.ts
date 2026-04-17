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
