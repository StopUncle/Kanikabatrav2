/**
 * The Blood Pact's transformation presets. Three at launch, deliberately
 * few: the journal data decides which tracks get added, not guesswork.
 *
 * Keys are stored on Pact.preset and PactWeek.preset, so a key change is a
 * data migration, not a rename. Labels and lines are display copy and free
 * to change.
 *
 * "Depression" is intentionally absent: it is a medical territory, not a
 * challenge track. The disclaimer and the crisis classifier exist for the
 * same reason.
 */
export const PACT_PRESETS = [
  {
    key: "confidence",
    label: "Confidence",
    line: "Stop rehearsing yourself. Weekly challenges that put you in the room before you feel ready.",
  },
  {
    key: "fear-anxiety",
    label: "Fear & Anxiety",
    line: "Fear shrinks when it is scheduled. One deliberate exposure a week, on your terms.",
  },
  {
    key: "relationships",
    label: "Relationships & Boundaries",
    line: "Say the thing. Hold the line. Weekly practice in the conversations you keep postponing.",
  },
] as const;

export type PactPresetKey = (typeof PACT_PRESETS)[number]["key"];

export function isPactPreset(value: unknown): value is PactPresetKey {
  return PACT_PRESETS.some((p) => p.key === value);
}

export function presetLabel(key: string): string {
  return PACT_PRESETS.find((p) => p.key === key)?.label ?? key;
}

/** Challenges ramp inside a repeating cycle of this many weeks. */
export const PACT_CYCLE_WEEKS = 4;

/**
 * The three goal slots every pact is signed against. Structured on purpose:
 * three blank boxes produce "be more confident" three times, and a vague
 * goal cannot scar you. Each slot has a fixed frame and a per-track
 * suggestion shown as the placeholder, so the member writes their own words
 * into a shape that can actually be kept or broken.
 */
export interface PactGoalSlot {
  key: "change" | "proof" | "cost";
  label: string;
  frame: string;
  suggestion: Record<PactPresetKey, string>;
}

export const PACT_GOAL_SLOTS: PactGoalSlot[] = [
  {
    key: "change",
    label: "The change",
    frame: "In twelve weeks I will...",
    suggestion: {
      confidence:
        "speak first in the meeting without rehearsing it in the car",
      "fear-anxiety":
        "have done the thing I keep planning around instead of doing",
      relationships:
        "say no to my family without writing a paragraph about it",
    },
  },
  {
    key: "proof",
    label: "The proof",
    frame: "The act that will prove it...",
    suggestion: {
      confidence: "I give the toast, take the room, and do not debrief it for days",
      "fear-anxiety": "I book it, show up alone, and stay past the urge to leave",
      relationships: "I have the conversation I have postponed for a year",
    },
  },
  {
    key: "cost",
    label: "The cost I stop paying",
    frame: "I am no longer willing to...",
    suggestion: {
      confidence: "run every decision past three people before I act on it",
      "fear-anxiety": "let the spiral pick my plans for the week",
      relationships: "apologize to keep a peace that costs me the whole day",
    },
  },
];

export const PACT_GOAL_COUNT = PACT_GOAL_SLOTS.length;
export const PACT_GOAL_MAX_CHARS = 200;

/** Exactly three non-empty goals, trimmed, each within the cap. */
export function parsePactGoals(value: unknown): string[] | null {
  if (!Array.isArray(value) || value.length !== PACT_GOAL_COUNT) return null;
  const goals: string[] = [];
  for (const g of value) {
    if (typeof g !== "string") return null;
    const t = g.trim();
    if (!t || t.length > PACT_GOAL_MAX_CHARS) return null;
    goals.push(t);
  }
  return goals;
}

/**
 * The launch switch. False = the Pact is deployed dark: every page and API
 * works at its URL (so it can be verified in production), but nothing in
 * the UI leads there. No tab, no hub hero, no upgrade-sheet routing. Flip
 * to true, one line, when Sam confirms it all works. The tab is hidden for
 * everyone while dark; a member who already holds a live pact still gets
 * their week card on Home, because hiding a signed member's own pact would
 * be a different and worse decision.
 */
export const PACT_LAUNCHED = false;

/**
 * Display copy only. The amounts Stripe actually charges live on the price
 * objects behind STRIPE_PRICES.PACT_WEEKLY / PACT_ANNUAL; nothing connects
 * the two automatically, so if one changes, change the other.
 */
export const PACT_PRICING = {
  weeklyDisplay: "$4.99 a week",
  annualDisplay: "$149 a year",
  annualSaveLine: "43% off the weekly price",
} as const;
