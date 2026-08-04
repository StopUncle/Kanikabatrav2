import { DRILL_BANK } from "@/lib/games/speed-drill/content";
import type { EncounterInput } from "../encounters";
import type { Tactic } from "../taxonomy";
import { DRILL_TIER_WEIGHT } from "../weights";

/**
 * Speed Drill answers as Mark evidence.
 *
 * Every drill card names its tactic, but the display tags are a looser
 * vocabulary than the Mark's, so the mapping is by stable card id. Cards
 * whose tactic has no taxonomy cell (threats, isolation, surveillance,
 * control) and all clean cards write nothing. Correctness is re-derived
 * from the bank, never trusted from the client.
 */
export const DRILL_CARD_TACTIC: Record<string, Tactic> = {
  "m-obligation": "GUILT",
  "m-guilt": "GUILT",
  "m-martyr": "GUILT",
  "m-disappointed": "GUILT",
  "m-notice": "GUILT",
  "m-ledger": "GUILT",
  "m-hardship": "GUILT",
  "m-blameshift": "DARVO",
  "m-darvolite": "DARVO",
  "m-knewreact": "DARVO",
  "m-nonapology": "DARVO",
  "m-triangulate": "TRIANGULATION",
  "m-consensus": "TRIANGULATION",
  "m-comparecharm": "TRIANGULATION",
  "m-grateful": "TRIANGULATION",
  "m-sulk": "STONEWALLING",
  "m-finesulk": "STONEWALLING",
  "m-withhold": "STONEWALLING",
  "m-agreesulk": "STONEWALLING",
  "m-gaslight": "GASLIGHTING",
  "m-softgaslight": "GASLIGHTING",
  "m-preempt": "GASLIGHTING",
  "m-idealize": "LOVE_BOMBING",
};

export interface DrillAnswerInput {
  cardId: string;
  picked: boolean;
  answerMs?: number | null;
}

const BANK_BY_ID = new Map(DRILL_BANK.map((card) => [card.id, card]));

/**
 * One encounter per answered manipulative card with a mapped tactic.
 * sourceId is the card id: the first time a member ever faces a card is
 * the read that counts, every later appearance is memory.
 */
export function encountersFromDrillAnswers(
  answers: DrillAnswerInput[],
): EncounterInput[] {
  const seen = new Set<string>();
  const out: EncounterInput[] = [];

  for (const answer of answers) {
    if (seen.has(answer.cardId)) continue;
    seen.add(answer.cardId);
    const card = BANK_BY_ID.get(answer.cardId);
    if (!card) continue;
    const tactic = DRILL_CARD_TACTIC[answer.cardId];
    if (!tactic) continue;

    out.push({
      tactic,
      correct: answer.picked === card.manipulative,
      sourceId: answer.cardId,
      answerMs: answer.answerMs ?? null,
      weight: DRILL_TIER_WEIGHT[card.tier],
    });
  }

  return out;
}
