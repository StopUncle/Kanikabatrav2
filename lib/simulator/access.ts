import { canTrain, type Access } from "@/lib/access/tier";
import { SCENARIO_BY_ID } from "@/lib/simulator/scenarios";
import type { Scenario } from "@/lib/simulator/types";

/**
 * Who may play what.
 *
 * `Scenario.tier` has been authored on all 131 catalog scenarios since long
 * before the free tier existed and was enforced nowhere. This is the only
 * place that reads it for an access decision, so that the runner page and
 * every `/api/simulator/*` route answer the question identically. A card
 * hidden in the UI is not a gate.
 *
 * The paid side is deliberately flat: the reset leaves exactly one paid
 * membership, so a member plays everything and the historical
 * `premium`/`vip` split no longer separates two paying cohorts. It is left
 * in the data rather than migrated because it still describes the intended
 * depth ordering, and rewriting 120 scenario files to say the same thing is
 * not worth the diff.
 */

/**
 * Generated (LLM-authored, daily) scenarios are member-only.
 *
 * They carry `tier: "free"` because `generated.ts` pins it with
 * `z.literal("free")`, which was written before a free tier existed and
 * means "tier gating does not apply here", NOT "give this away". Reading
 * that literal as a grant would hand every daily generated scenario to free
 * accounts as a side effect of a schema default, so generated scenarios are
 * gated on membership instead of on their tier field.
 *
 * If Sam wants generated dailies to be a free-tier hook, that is a real
 * product decision and belongs in the plan, not in a zod literal.
 */
function isCatalogScenario(scenarioId: string): boolean {
  return !!SCENARIO_BY_ID[scenarioId];
}

/** Whether this caller may play this scenario at all. */
export function canPlay(
  scenario: Pick<Scenario, "id" | "tier">,
  access: Access,
): boolean {
  // Banned and signed-out never play, whatever the scenario says.
  if (access.isBanned || access.tier === "anon") return false;

  // The full catalog is what the training tier buys: any paid rung (the
  // Pact or the Consilium, which includes it) plays everything and the
  // dailies.
  if (canTrain(access)) return true;

  if (!isCatalogScenario(scenario.id)) return false;

  return scenario.tier === "free";
}

/**
 * The reason a scenario is closed, for the surface that has to say so.
 * `null` means it is playable.
 */
export function playBlockReason(
  scenario: Pick<Scenario, "id" | "tier">,
  access: Access,
): "banned" | "signed-out" | "membership" | null {
  if (access.isBanned) return "banned";
  if (access.tier === "anon") return "signed-out";
  if (canPlay(scenario, access)) return null;
  return "membership";
}
