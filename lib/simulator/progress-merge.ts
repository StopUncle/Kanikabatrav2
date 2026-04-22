/**
 * Server-side "best-of" merge for SimulatorProgress rows.
 *
 * Shared between `/api/simulator/progress` (mid-run + end-of-run saves)
 * and `/api/simulator/complete` (the dedicated completion endpoint).
 * Both endpoints must agree on the merge semantics — otherwise a
 * worse replay completion via /complete would overwrite a better
 * prior completion (defeating the best-of logic /progress enforces).
 *
 * Rules:
 *   A) mid-run save (body.endedAt falsy)
 *      - advance currentSceneId + choicesMade pointer
 *      - DO NOT touch outcome / completedAt / xpEarned if the player
 *        already has a completion — those are their personal best
 *      - xpEarned on an uncompleted row bumps only upward
 *
 *   B) first-ever completion (existing null OR existing.completedAt null)
 *      - write the whole thing
 *
 *   C) replay completion (both existing.completedAt and body.endedAt set)
 *      - keep the HIGHER xpEarned
 *      - keep the BETTER outcome (good > passed > neutral > failed > bad)
 *      - keep the ORIGINAL completedAt — first-completion timestamp is
 *        load-bearing for "when did you beat this"
 *      - advance currentSceneId pointer
 */

import type { Prisma } from "@prisma/client";
import type { OutcomeType } from "./types";

// Prisma.InputJsonValue covers every JSON-serializable value the
// schema's Json column accepts. Matches the type Prisma expects for
// choicesMade in create/update ops.
type ChoicesPayload = Prisma.InputJsonValue;

export type ProgressRow = {
  currentSceneId: string;
  choicesMade: Prisma.JsonValue; // what Prisma returns on read
  xpEarned: number;
  outcome: string | null;
  completedAt: Date | null;
};

export type IncomingProgress = {
  currentSceneId: string;
  choicesMade: ChoicesPayload;
  xpEarned: number;
  outcome: OutcomeType | null;
  endedAt: string | null;
};

/**
 * Outcome quality ranking. Higher = better. Unknown outcomes rank
 * below everything so any real outcome wins against a prior null.
 */
export function outcomeRank(o: string | null): number {
  if (o === "good") return 4;
  if (o === "passed") return 3;
  if (o === "neutral") return 2;
  if (o === "failed") return 1;
  if (o === "bad") return 0;
  return -1;
}

export type MergeUpdate = {
  currentSceneId: string;
  choicesMade: ChoicesPayload;
  xpEarned: number;
  outcome: string | null;
  completedAt: Date | null;
};

export type MergeCreate = {
  currentSceneId: string;
  choicesMade: ChoicesPayload;
  xpEarned: number;
  outcome: string | null;
  completedAt: Date | null;
};

/**
 * Compute the create + update payloads for a SimulatorProgress upsert
 * given the existing row (may be null) and the incoming progress.
 * Consumers feed these straight into `prisma.simulatorProgress.upsert`.
 */
export function mergeProgress(
  existing: ProgressRow | null,
  incoming: IncomingProgress,
): { create: MergeCreate; update: MergeUpdate } {
  const hadCompletion = !!existing?.completedAt;
  const isCompletingNow = !!incoming.endedAt;
  const isMidRunSave = !isCompletingNow;

  // Best-of XP across runs.
  const bestXp = Math.max(existing?.xpEarned ?? 0, incoming.xpEarned);

  // Best-of outcome across runs.
  let bestOutcome: string | null = existing?.outcome ?? null;
  if (incoming.outcome) {
    if (outcomeRank(incoming.outcome) > outcomeRank(bestOutcome)) {
      bestOutcome = incoming.outcome;
    }
  }

  // completedAt is sticky to the first completion.
  const keptCompletedAt: Date | null = hadCompletion
    ? existing!.completedAt!
    : isCompletingNow
      ? new Date(incoming.endedAt!)
      : null;

  const create: MergeCreate = {
    currentSceneId: incoming.currentSceneId,
    choicesMade: incoming.choicesMade,
    xpEarned: incoming.xpEarned,
    outcome: incoming.outcome ?? null,
    completedAt: incoming.endedAt ? new Date(incoming.endedAt) : null,
  };

  const update: MergeUpdate = {
    currentSceneId: incoming.currentSceneId,
    choicesMade: incoming.choicesMade,
    xpEarned:
      isMidRunSave && hadCompletion
        ? // Mid-run save on an already-completed row must not touch the
          // player's best XP.
          existing!.xpEarned
        : bestXp,
    outcome:
      isMidRunSave && hadCompletion
        ? existing!.outcome
        : bestOutcome,
    completedAt: keptCompletedAt,
  };

  return { create, update };
}
