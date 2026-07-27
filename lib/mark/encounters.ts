import type { MarkSource, Prisma, PrismaClient } from "@prisma/client";
import type { Operator, Tactic } from "./taxonomy";

/**
 * The ONE writer for The Mark's ledger.
 *
 * Every graded moment anywhere in the Consilium lands here: baseline
 * items now, Tells now, scenarios and Receipts later. Surfaces do not
 * write MarkEncounter rows directly, so the tagging rules and the
 * dedupe rules stay in one place.
 *
 * Self-protecting, the same way grantStanding is: every caller sits on
 * a path the member cares about (submitting an answer, finishing a
 * test), so a ledger hiccup must never 500 the thing that triggered it.
 * It logs and returns 0 written instead of throwing.
 */

type Db = PrismaClient | Prisma.TransactionClient;

/**
 * One graded moment. At least one of tactic/operatorType must be set:
 * "what is being run here" items carry a tactic, "which cluster is this"
 * items carry only the operator, most carry both. Rows with neither are
 * dropped, since a row that cannot name what it measured is noise.
 */
export interface EncounterInput {
  tactic?: Tactic | null;
  operatorType?: Operator | null;
  correct: boolean;
  /** The originating row: tellId, baseline item id, scenarioId. */
  sourceId?: string | null;
  answerMs?: number | null;
}

export async function recordEncounters(
  prisma: Db,
  opts: {
    userId: string;
    source: MarkSource;
    encounters: EncounterInput[];
    /**
     * One-shot per (userId, source, sourceId). Set for content a member
     * can revisit (a replayed Tell), left off for sittings that are meant
     * to repeat and be compared (a monthly Baseline Read).
     */
    dedupe?: boolean;
  },
): Promise<number> {
  const { userId, source, encounters, dedupe } = opts;
  if (encounters.length === 0) return 0;

  try {
    let rows = encounters.filter((e) => e.tactic || e.operatorType);
    if (rows.length === 0) return 0;

    if (dedupe) {
      const sourceIds = rows
        .map((e) => e.sourceId)
        .filter((id): id is string => Boolean(id));
      if (sourceIds.length > 0) {
        const seen = await prisma.markEncounter.findMany({
          where: { userId, source, sourceId: { in: sourceIds } },
          select: { sourceId: true },
        });
        const taken = new Set(seen.map((r) => r.sourceId));
        rows = rows.filter((e) => !e.sourceId || !taken.has(e.sourceId));
      }
      if (rows.length === 0) return 0;
    }

    const result = await prisma.markEncounter.createMany({
      data: rows.map((e) => ({
        userId,
        tactic: e.tactic ?? null,
        operatorType: e.operatorType ?? null,
        correct: e.correct,
        source,
        sourceId: e.sourceId ?? null,
        answerMs: e.answerMs ?? null,
      })),
    });
    return result.count;
  } catch (error) {
    console.error("[mark] recordEncounters failed", {
      userId,
      source,
      count: encounters.length,
      error,
    });
    return 0;
  }
}
