/**
 * Psychopath-Child track — parental POV, written with clinical
 * restraint. See reference/TRACK-pc-child.md for full design and
 * content-gate policy.
 *
 * Phase 1: L1-1 only. L2-L5 are skeletons in the design doc.
 *
 * Every scenario in this track opens with a mandatory content gate
 * as its startScene. The gate is part of the scenario, not a
 * wrapper — it allows the player to opt out cleanly.
 */

import type { Scenario } from "../../types";
import pcChild11 from "./l1-1-the-hamster";

export const PC_CHILD_SCENARIOS: Scenario[] = [pcChild11];

export const PC_CHILD_LEVEL_TITLES: Record<
  number,
  { title: string; blurb: string }
> = {
  1: {
    title: "Age 5 — The First Time You Knew",
    blurb: "The specific morning the pattern resolves into a picture. Ninety minutes that shape fifteen years.",
  },
  2: {
    title: "Age 10 — The School Calls",
    blurb: "Recurring school incidents. The teacher who doesn't believe you. The principal who wants to.",
  },
  3: {
    title: "Age 15 — The Manipulation Inversion",
    blurb: "Adolescence. The child reads you better than you read them. They triangulate you against your partner.",
  },
  4: {
    title: "Age 18 — The Marriage Question",
    blurb: "The marriage under strain. The partner who has cracked. A 6:47 a.m. conversation across a kitchen table.",
  },
  5: {
    title: "Age 20 — The Legal Adult",
    blurb: "The interventions that worked. The interventions that did not. The boundary you did not think you'd have to set.",
  },
};
