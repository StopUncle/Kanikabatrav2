import {
  OPERATOR_LABELS,
  OPERATOR_PHRASE,
  TACTIC_PHRASE,
  type Operator,
  type Tactic,
} from "./taxonomy";

/**
 * The Mark speaks in sentences. There is no score, no composite number
 * and no radar anywhere in this layer, on purpose: an abstract rating
 * means nothing to the person holding it, and a number invites claims
 * nobody can stand behind.
 *
 * Every sentence here is scoped to what happened inside the training.
 * The panel carries the frame line once so the sentences can stay short,
 * but nothing in this file may promise real-world transfer and nothing
 * may read as clinical.
 */

export type Band = "SHARP" | "MOSTLY" | "HALF" | "OPEN";

export function bandFor(rate: number): Band {
  if (rate >= 0.85) return "SHARP";
  if (rate >= 0.65) return "MOSTLY";
  if (rate >= 0.4) return "HALF";
  return "OPEN";
}

function cap(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

/** "Gaslighting still works on you." */
export function tacticSentence(tactic: Tactic, rate: number): string {
  const phrase = TACTIC_PHRASE[tactic];
  switch (bandFor(rate)) {
    case "SHARP":
      return `You see ${phrase} coming.`;
    case "MOSTLY":
      return `${cap(phrase)} lands on you now and then.`;
    case "HALF":
      return `${cap(phrase)} gets past you about half the time.`;
    case "OPEN":
      return `${cap(phrase)} still works on you.`;
  }
}

/** "Borderlines play you." */
export function operatorSentence(operator: Operator, rate: number): string {
  const label = OPERATOR_LABELS[operator];
  switch (bandFor(rate)) {
    case "SHARP":
      return `You handle ${label.toLowerCase()} well.`;
    case "MOSTLY":
      return `${label} get past you now and then.`;
    case "HALF":
      return `${label} play you about half the time.`;
    case "OPEN":
      return `${label} play you.`;
  }
}

/**
 * The cross-cell line: the same tactic behaves differently depending on
 * who is running it. Only produced when the member is decent at the
 * tactic overall and reliably loses it to one operator, which is the
 * only case where the sentence tells them something they did not know.
 */
export function crossSentence(tactic: Tactic, operator: Operator): string {
  return `You catch ${TACTIC_PHRASE[tactic]}, except when it comes from ${OPERATOR_PHRASE[operator]}.`;
}

/** The honesty rule, said out loud. */
export function untestedSentence(seen: number): string {
  if (seen === 0) return "Not yet tested.";
  return `Not yet tested. ${seen} encounter${seen === 1 ? "" : "s"} so far.`;
}

/**
 * The frame that sits above every ledger. Said once, plainly, so the
 * sentences underneath do not each have to hedge.
 */
export const MARK_FRAME_LINE =
  "Measured on what you have faced in here. It is a training record, not a diagnosis and not a prediction.";
