/**
 * The Mark: the shared vocabulary.
 *
 * Every graded moment in the Consilium can be tagged two ways: which
 * tactic was being run, and which kind of operator was running it. The
 * whole measurement layer is built on that pair, so the vocabulary lives
 * in exactly one file and nothing else is allowed to invent a label.
 *
 * The Mark answers "how easily are you played". It is a different
 * instrument from The Mirror (the Dark Mirror quiz, "who are you") and
 * from Standing (showing up). The three never mix.
 */

/**
 * What was being run, in the order the ledgers render. The list is the
 * source of truth and the union type is derived from it, so a tactic
 * cannot exist in one and be missing from the other.
 */
export const TACTIC_KEYS = [
  "GASLIGHTING",
  "DARVO",
  "GUILT",
  "TRIANGULATION",
  "LOVE_BOMBING",
  "HOOVERING",
  "FUTURE_FAKING",
  "SMEAR",
  "STONEWALLING",
  "URGENCY",
  "GOALPOSTS",
] as const;

export type Tactic = (typeof TACTIC_KEYS)[number];

/** Who was running it. */
export const OPERATOR_KEYS = [
  "NARCISSIST",
  "COVERT_NARCISSIST",
  "PSYCHOPATH",
  "SOCIOPATH",
  "BORDERLINE",
  "HISTRIONIC",
  "AVOIDANT",
] as const;

export type Operator = (typeof OPERATOR_KEYS)[number];

/** Where a graded moment came from. Mirrors the MarkSource enum. */
export type MarkSource = "BASELINE" | "TELL" | "SCENARIO" | "LAB" | "RECEIPT";

/** Member-facing names. Plain nouns, no clinical framing. */
export const TACTIC_LABELS: Record<Tactic, string> = {
  GASLIGHTING: "Gaslighting",
  SMEAR: "Smear campaigns",
  TRIANGULATION: "Triangulation",
  LOVE_BOMBING: "Love bombing",
  GUILT: "Guilt levers",
  DARVO: "DARVO",
  HOOVERING: "Hoovering",
  FUTURE_FAKING: "Future faking",
  STONEWALLING: "Stonewalling",
  URGENCY: "Urgency pressure",
  GOALPOSTS: "Moving goalposts",
};

/**
 * Singular form, for sentences that need "gaslighting gets past you"
 * rather than "gaslightings get past you". Lowercase on purpose: these
 * land mid-sentence far more often than they start one.
 */
export const TACTIC_PHRASE: Record<Tactic, string> = {
  GASLIGHTING: "gaslighting",
  SMEAR: "a smear campaign",
  TRIANGULATION: "triangulation",
  LOVE_BOMBING: "love bombing",
  GUILT: "a guilt lever",
  DARVO: "DARVO",
  HOOVERING: "a hoover",
  FUTURE_FAKING: "future faking",
  STONEWALLING: "stonewalling",
  URGENCY: "urgency pressure",
  GOALPOSTS: "a moved goalpost",
};

/** One line on what the tactic actually is. Observation, not advice. */
export const TACTIC_DEFINITION: Record<Tactic, string> = {
  GASLIGHTING: "Rewriting what happened until you doubt your own memory.",
  SMEAR: "Getting to the people around you before you do.",
  TRIANGULATION: "Putting a third person in the room to move you.",
  LOVE_BOMBING: "Flooding you early so leaving later costs more.",
  GUILT: "Making your reasonable request feel like cruelty.",
  DARVO: "Deny, attack, then swap who the victim is.",
  HOOVERING: "Coming back warm, right when you had stopped waiting.",
  FUTURE_FAKING: "Paying you in a future that never arrives.",
  STONEWALLING: "Withdrawing until you negotiate against yourself.",
  URGENCY: "Collapsing your thinking time on purpose.",
  GOALPOSTS: "Changing the standard the moment you meet it.",
};

export const OPERATOR_LABELS: Record<Operator, string> = {
  PSYCHOPATH: "Psychopaths",
  NARCISSIST: "Narcissists",
  COVERT_NARCISSIST: "Covert narcissists",
  SOCIOPATH: "Sociopaths",
  BORDERLINE: "Borderlines",
  HISTRIONIC: "Histrionics",
  AVOIDANT: "Avoidants",
};

/** Singular, for "a narcissist's gaslighting". */
export const OPERATOR_PHRASE: Record<Operator, string> = {
  PSYCHOPATH: "a psychopath",
  NARCISSIST: "a narcissist",
  COVERT_NARCISSIST: "a covert narcissist",
  SOCIOPATH: "a sociopath",
  BORDERLINE: "a borderline",
  HISTRIONIC: "a histrionic",
  AVOIDANT: "an avoidant",
};

const TACTIC_SET = new Set<string>(TACTIC_KEYS);
const OPERATOR_SET = new Set<string>(OPERATOR_KEYS);

/**
 * Narrow a raw string (a nullable Prisma column, an admin form field)
 * to a Tactic. Anything unrecognised returns null and the caller drops
 * the row: untagged content is silently absent from the ledger, which
 * the honesty rule already covers.
 */
export function asTactic(value: string | null | undefined): Tactic | null {
  return value && TACTIC_SET.has(value) ? (value as Tactic) : null;
}

export function asOperator(value: string | null | undefined): Operator | null {
  return value && OPERATOR_SET.has(value) ? (value as Operator) : null;
}
