import type { EncounterInput } from "../encounters";
import type { Operator, Tactic } from "../taxonomy";

/**
 * Lab sessions as Mark evidence.
 *
 * The judge grades a whole session, not individual moments, so this is
 * the coarsest evidence in the ledger: a held session counts as catching
 * the persona's signature tactics, a played session as missing them, and
 * a mixed session writes nothing because splitting the difference would
 * be a guess. Volume is naturally capped by the one-session-a-day quota.
 *
 * The persona table is editorial: each persona's operator cluster and
 * the tactics its script actually runs. A new persona must be added here
 * or its sessions write nothing (the unit test enforces the pairing).
 */
export const LAB_PERSONA_MARKS: Record<
  string,
  { operatorType: Operator; tactics: Tactic[] }
> = {
  "love-bomber": {
    operatorType: "NARCISSIST",
    tactics: ["LOVE_BOMBING", "FUTURE_FAKING", "GUILT"],
  },
  "credit-thief": {
    operatorType: "COVERT_NARCISSIST",
    tactics: ["SMEAR"],
  },
  "guilt-weaver": {
    operatorType: "COVERT_NARCISSIST",
    tactics: ["GUILT", "DARVO", "TRIANGULATION"],
  },
  "cold-controller": {
    operatorType: "PSYCHOPATH",
    tactics: ["GASLIGHTING", "STONEWALLING"],
  },
};

export function encountersFromLabScore(
  personaKey: string,
  sessionId: string,
  outcome: "held" | "mixed" | "played",
): EncounterInput[] {
  if (outcome === "mixed") return [];
  const marks = LAB_PERSONA_MARKS[personaKey];
  if (!marks) return [];

  const correct = outcome === "held";
  return marks.tactics.map((tactic) => ({
    tactic,
    operatorType: marks.operatorType,
    correct,
    sourceId: sessionId,
  }));
}
