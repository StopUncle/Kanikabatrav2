/**
 * Simulator types — ported from SocialApp/content/simulator/types.ts,
 * trimmed to what the web runtime actually needs. Keeps the same shape
 * so scenario .ts files can be copy-pasted without edits.
 */

export type SubscriptionTier = "free" | "premium" | "vip";
export type Difficulty = "beginner" | "intermediate" | "advanced";
export type ScenarioCategory =
  | "narcissist"
  | "avoidant"
  | "gaslighter"
  | "healthy"
  | "professional"
  | "dating-tactics"
  | "social-dynamics"
  | "business"
  | "dating"
  | "power"
  | "self-regulation";

export type ScenarioTrack =
  | "female"
  | "male-business"
  | "male-dating"
  | "anxiety"
  | "toxic-narc"
  | "pc-child"
  | "cluster-b-lab"
  | "divorce-arc"
  | "loving-mira";

export type EmotionType =
  | "neutral"
  | "happy"
  | "angry"
  | "sad"
  | "seductive"
  | "cold"
  | "confused"
  | "smirking"
  | "concerned"
  | "knowing"
  | "serious"
  | "pleading"
  | "curious"
  | "hopeful";

export type MoodType =
  | "romantic"
  | "danger"
  | "party"
  | "cold"
  | "peaceful"
  | "tense"
  | "mysterious"
  | "professional";

/**
 * Full-screen cinematic effect played on scene entry. Rendered by
 * `components/simulator/ImmersionOverlay.tsx`. Use sparingly —
 * these are punctuation, not ambience.
 */
export type ImmersionTrigger =
  | "manipulation-detected"
  | "red-flag-revealed"
  | "cold-moment"
  | "intimate-moment"
  | "shock"
  | "victory"
  | "defeat";

/** Screen-shake preset on scene entry. */
export type ShakePreset = "shock" | "threat" | "revelation";

export type OutcomeType = "good" | "neutral" | "bad" | "passed" | "failed";
export type Gender = "male" | "female" | "non-binary";

export interface Character {
  id: string;
  name: string;
  description: string;
  traits: string[];
  defaultEmotion: EmotionType;
  gender?: Gender;
  personalityType?: string;
  silhouetteType?: string;
  /** Optional portrait image path — set when AI-generated portraits ship. */
  portraitUrl?: string;
}

/**
 * Voice register of a dialog line. Drives renderer styling so the player
 * can visually predict the kind of beat they're about to read:
 *   "scene"     — immersive sensory beat (the moment unfolding)
 *   "tactical"  — Kanika-voice analytical observation (the named pattern)
 *   "dialogue"  — spoken words from a character
 *
 * Authors set this explicitly when a beat is unambiguously analytical.
 * Unset lines default by speaker: inner-voice → scene, named-speaker →
 * dialogue. Existing content without a tone field keeps its prior
 * rendering unchanged.
 */
export type DialogTone = "scene" | "tactical" | "dialogue";

export interface DialogLine {
  text: string;
  speakerId?: string | null;
  emotion?: EmotionType;
  delay?: number;
  /**
   * Voice register override. Optional — defaults from speakerId when
   * unset (inner-voice → scene, named speaker → dialogue). Set to
   * "tactical" on Kanika-voice analytical observations so the
   * renderer gives them a distinct visual register and the player
   * learns to expect "this is a pattern read, not a scene moment."
   */
  tone?: DialogTone;
  /**
   * Optional instrumentation tag fired when the player passes through this
   * dialog line. Read by the achievements evaluator (see
   * `reference/ACHIEVEMENT-HOOKS.md`). Stable slugs like
   * `tactic-named:triangulation` — never free-form sentences.
   */
  event?: string;
}

export interface Choice {
  id: string;
  text: string;
  nextSceneId: string;
  xpBonus?: number;
  isOptimal?: boolean;
  tactic?: string;
  feedback?: string;
  /**
   * Optional instrumentation tag fired when the player picks this choice.
   * Read by the achievements evaluator (see `reference/ACHIEVEMENT-HOOKS.md`).
   * Stable slugs like `optimal-with-grace`, `failure-rejected`,
   * `restraint-shown` — see the hooks doc for the canonical vocabulary.
   */
  event?: string;
}

export interface Scene {
  id: string;
  backgroundId?: string;
  mood?: MoodType;
  dialog: DialogLine[];
  choices?: Choice[];
  nextSceneId?: string;
  /**
   * Characters visible in the scene ("the cast"). When set, the runner
   * renders up to 3 silhouettes side-by-side — the current speaker
   * full-size and rim-lit, others smaller and dimmed. Useful for group
   * scenes (two antagonists + an ally). If omitted, the runner falls
   * back to showing whoever is currently speaking.
   */
  presentCharacterIds?: string[];
  /** Cinematic trigger fired once on scene entry. Purely visual. */
  immersionTrigger?: ImmersionTrigger;
  /** Screen-shake preset on scene entry. Purely visual. */
  shakeOnEntry?: ShakePreset;
  // Ending fields
  isEnding?: boolean;
  outcomeType?: OutcomeType;
  endingTitle?: string;
  endingSummary?: string;
  endingLearnReference?: string;
  endingLearnPrompt?: string;
  /**
   * When a defeat/bad ending maps to an existing blog post, set both
   * fields. The EndingScreen renders a "Read: <title>" CTA linking to
   * `/blog/<slug>`. Leave unset on good endings or endings without a
   * matching post.
   */
  failureBlogSlug?: string;
  failureBlogTitle?: string;
}

/** Alias — scenario files from the Expo port use `ForkScene`. */
export type ForkScene = Scene;

export interface ScenarioReward {
  id: string;
  name: string;
  description: string;
  unlocksScenarioId?: string;
}

export interface Scenario {
  id: string;
  title: string;
  tagline: string;
  description: string;
  tier: SubscriptionTier;
  /**
   * Which simulator track this scenario belongs to. `female` = legacy
   * scenarios (Maris-arc). `male-business` / `male-dating` = male-version
   * branches. Defaults to `female` when omitted for backwards compatibility.
   */
  track?: ScenarioTrack;
  /** 1-based level. Used to group scenarios on the list page. */
  level: number;
  /** 1-based order within the level. */
  order: number;
  estimatedMinutes: number;
  difficulty: Difficulty;
  category: ScenarioCategory;
  xpReward: number;
  badgeId?: string;
  startSceneId: string;

  characters: Character[];
  scenes: Scene[];

  prerequisites?: string[];
  tacticsLearned: string[];
  redFlagsTaught: string[];
  reward?: ScenarioReward;
  /**
   * Marks scenarios recently added to the catalogue. Surfaces a "NEW"
   * pill on the journey card and a track-level NEW indicator on the
   * catalog chooser, but only while the player hasn't completed it
   * yet. Per-user staleness lives in the rendering layer; set this to
   * `true` when authoring, clear it in the next content commit roughly
   * 30 days later.
   */
  isNew?: boolean;
}

/** A player's choice recorded in a run. */
export interface ChoiceRecord {
  sceneId: string;
  choiceId: string;
  wasOptimal: boolean;
  timestamp: string;
}

/** Runtime state machine state. */
export interface SimulatorState {
  scenarioId: string;
  currentSceneId: string;
  choicesMade: ChoiceRecord[];
  outcome?: OutcomeType;
  endedAt?: string;
  xpEarned: number;
}
