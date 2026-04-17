/**
 * Scenario registry. Add new scenarios here as they're ported.
 *
 * Each scenario is a self-contained module exporting a `Scenario` default.
 * Lazy-load if the catalog ever crosses ~10 scenarios (tree-shake keeps
 * bundle size down today).
 */

import type { Scenario } from "../types";
import mission11 from "./mission-1-1";

export const ALL_SCENARIOS: Scenario[] = [mission11];

export const SCENARIO_BY_ID: Record<string, Scenario> = Object.fromEntries(
  ALL_SCENARIOS.map((s) => [s.id, s]),
);

export function getScenario(id: string): Scenario | null {
  return SCENARIO_BY_ID[id] ?? null;
}

/** Scenarios accessible to a given Consilium tier (free/premium/vip). */
export function scenariosForTier(tier: "free" | "premium" | "vip"): Scenario[] {
  if (tier === "vip") return ALL_SCENARIOS;
  if (tier === "premium")
    return ALL_SCENARIOS.filter((s) => s.tier === "free" || s.tier === "premium");
  return ALL_SCENARIOS.filter((s) => s.tier === "free");
}
