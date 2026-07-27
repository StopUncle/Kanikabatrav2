import { BASELINE_ITEMS, type BaselineItem } from "./baseline-items";
import type { EncounterInput } from "./encounters";
import { TACTIC_DEFINITION, TACTIC_LABELS } from "./taxonomy";

/**
 * Grading a Baseline Read.
 *
 * Grading is server-side and total: the client posts twelve picks and
 * gets back the key, so the answers cannot be read out of the network
 * tab while the test is still running.
 *
 * The reveal names what got past them and says nothing about a score.
 * Counting concrete misses is honest ("three of twelve got past you");
 * turning that into a rating is not, and the moment there is a number
 * on screen someone starts training the number instead of the skill.
 */

/** What the client posts, one entry per item it showed. */
export interface BaselineSubmissionItem {
  itemId: string;
  /** Null when the member moved on without picking. Counts as a miss. */
  choiceId: string | null;
  answerMs?: number | null;
}

/** What gets stored on BaselineAttempt.answers. */
export interface BaselineAnswerRecord {
  itemId: string;
  tactic: string;
  operatorType: string;
  choiceId: string | null;
  correct: boolean;
  answerMs: number | null;
}

/** One line of the reveal screen. */
export interface BaselineRevealItem {
  itemId: string;
  question: string;
  tacticLabel: string;
  tacticDefinition: string;
  correct: boolean;
  yourChoiceId: string | null;
  yourChoiceText: string | null;
  /** Why their pick was what it was. Empty when they skipped. */
  yourWhy: string | null;
  correctChoiceId: string;
  correctChoiceText: string;
  correctWhy: string;
}

export interface BaselineGrade {
  records: BaselineAnswerRecord[];
  encounters: EncounterInput[];
  reveal: BaselineRevealItem[];
  correctCount: number;
  itemCount: number;
  headline: string;
  subline: string;
}

function correctChoiceOf(item: BaselineItem) {
  // The bank is authored with exactly one correct choice per item and
  // the type comment says so, but a fallback here costs nothing and
  // keeps a bad edit from throwing in front of a member on day one.
  return item.choices.find((c) => c.isCorrect) ?? item.choices[0];
}

export function gradeBaseline(
  submission: BaselineSubmissionItem[],
): BaselineGrade {
  const records: BaselineAnswerRecord[] = [];
  const encounters: EncounterInput[] = [];
  const reveal: BaselineRevealItem[] = [];

  // Iterate the bank, not the submission, so a client that drops, dupes
  // or reorders items still produces exactly one record per item.
  for (const item of BASELINE_ITEMS) {
    const posted = submission.find((s) => s.itemId === item.id);
    const picked = posted?.choiceId
      ? item.choices.find((c) => c.id === posted.choiceId)
      : undefined;
    const correct = Boolean(picked?.isCorrect);
    const key = correctChoiceOf(item);
    const answerMs =
      typeof posted?.answerMs === "number" && posted.answerMs >= 0
        ? Math.min(posted.answerMs, 1000 * 60 * 10)
        : null;

    records.push({
      itemId: item.id,
      tactic: item.tactic,
      operatorType: item.operatorType,
      choiceId: picked?.id ?? null,
      correct,
      answerMs,
    });
    encounters.push({
      tactic: item.tactic,
      operatorType: item.operatorType,
      correct,
      sourceId: item.id,
      answerMs,
    });
    reveal.push({
      itemId: item.id,
      question: item.question,
      tacticLabel: TACTIC_LABELS[item.tactic],
      tacticDefinition: TACTIC_DEFINITION[item.tactic],
      correct,
      yourChoiceId: picked?.id ?? null,
      yourChoiceText: picked?.text ?? null,
      yourWhy: picked?.why ?? null,
      correctChoiceId: key.id,
      correctChoiceText: key.text,
      correctWhy: key.why,
    });
  }

  const correctCount = records.filter((r) => r.correct).length;
  const itemCount = records.length;
  const missed = itemCount - correctCount;

  return {
    records,
    encounters,
    reveal,
    correctCount,
    itemCount,
    headline: headlineFor(missed, itemCount),
    subline: SUBLINE,
  };
}

function headlineFor(missed: number, itemCount: number): string {
  if (missed === 0) {
    return `Nothing got past you. All ${itemCount} rooms, clean.`;
  }
  if (missed === 1) {
    return "One got past you. Here it is.";
  }
  return `${missed} of ${itemCount} got past you. Here they are.`;
}

const SUBLINE =
  "This is your before picture. Keep it. In a month you take the same twelve rooms and we find out what moved.";
