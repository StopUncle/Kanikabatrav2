/**
 * View-model types for The Board. These are the shapes the db layer
 * returns and the pages/components consume, deliberately decoupled from
 * the raw Prisma rows so the UI never has to know about denormalised
 * pointers or JSON columns.
 *
 * Pure types only (no prisma import beyond enums), so client components
 * can import freely.
 */

import type { Archetype, FigureStatus, Tier, BoardEventType } from "@prisma/client";

/** One scored observation under a factor (grandiosity, empathy, affect...). */
export interface Sector {
  name: string;
  /** 0-100 read on this single observation. */
  score: number;
  note?: string;
}

/** One (re)scoring event. The list of these IS the living timeline. */
export interface ScoreEntry {
  id: string;
  composite: number;
  factor1: number;
  factor2: number;
  tier: Tier;
  verdict: string;
  sectors: Sector[];
  /** What news prompted this re-score. Null on the debut score. */
  triggerEvent: string | null;
  scoredAt: Date;
}

/** Aggregate of member crowd votes for one figure. */
export interface CrowdAggregate {
  /** Weighted average /100, rounded. Null when no votes yet. */
  average: number | null;
  /** Number of distinct member votes. */
  count: number;
}

/** A single row on the ranked board. */
export interface BoardRow {
  id: string;
  slug: string;
  name: string;
  descriptor: string | null;
  photoUrl: string | null;
  archetype: Archetype | null;
  status: FigureStatus;
  composite: number;
  factor1: number;
  factor2: number;
  tier: Tier;
  lastScoredAt: Date;
  crowd: CrowdAggregate;
  /** 1-indexed rank by composite among ON_BOARD figures. */
  rank: number;
}

/** A figure awaiting a debut or re-score, shown on the Most Requested rail. */
export interface RequestedRow {
  id: string;
  slug: string;
  name: string;
  descriptor: string | null;
  status: FigureStatus;
  petitionCount: number;
}

/** A calibration anchor (Keanu floor, Kemper ceiling). */
export interface CalibrationAnchor {
  id: string;
  slug: string;
  name: string;
  descriptor: string | null;
  photoUrl: string | null;
  composite: number;
  factor1: number;
  factor2: number;
  tier: Tier;
  verdict: string;
}

/** Full dossier for /board/[slug]. */
export interface FigureDossier {
  id: string;
  slug: string;
  name: string;
  descriptor: string | null;
  photoUrl: string | null;
  archetype: Archetype | null;
  status: FigureStatus;
  isCalibration: boolean;
  current: ScoreEntry;
  /** Re-score history, newest first. Includes the current score. */
  history: ScoreEntry[];
  sources: { id: string; label: string; url: string }[];
  crowd: CrowdAggregate;
  petitionCount: number;
}

/** One entry in the live activity ticker. */
export interface ActivityItem {
  id: string;
  type: BoardEventType;
  figureName: string | null;
  figureSlug: string | null;
  actorHandle: string | null;
  metadata: Record<string, unknown> | null;
  createdAt: Date;
}

/** Sort keys exposed by the board controls. */
export type BoardSort =
  | "composite"
  | "factor1"
  | "factor2"
  | "contested"
  | "recent";

/** Filter selections from the board controls. */
export interface BoardFilter {
  tier?: Tier;
  archetype?: Archetype;
}
