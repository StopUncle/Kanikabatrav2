/**
 * The Board DB layer. Server-only (imports prisma).
 *
 * Three concerns:
 *   1. Reads for the public surfaces (ranked board, dossier, calibration
 *      rail, Most Requested rail, activity ticker).
 *   2. Account-gated writes (crowd vote, re-score petition) with their
 *      real activity-log side effects.
 *   3. Vote weighting by Consilium tenure (the anti-brigade defence).
 *
 * Ranking rule: rank is always by composite among ON_BOARD figures, and
 * calibration anchors are excluded from the ranking entirely (they live
 * on the ruler, not in it). The requested display sort is applied AFTER
 * rank is assigned, so a "sort by Factor 1" view still shows each row's
 * true overall rank number.
 */

import { prisma } from "@/lib/prisma";
import { Prisma, type Tier, type Archetype } from "@prisma/client";
import { tierForComposite } from "./tiers";
import type {
  ActivityItem,
  BoardFilter,
  BoardRow,
  BoardSort,
  CalibrationAnchor,
  CrowdAggregate,
  FigureDossier,
  RequestedRow,
  ScoreEntry,
  Sector,
} from "./types";

/* -------------------------------------------------------------------------- */
/* Crowd aggregates (weighted)                                                */
/* -------------------------------------------------------------------------- */

/**
 * Weighted crowd average + count per figure, in a single query. Weighting
 * is SUM(composite * weight) / SUM(weight), so a longer-standing member's
 * vote pulls the average harder than a fresh free account's. Figures with
 * no votes simply do not appear in the result and default to empty.
 */
async function getCrowdAggregates(
  figureIds?: string[],
): Promise<Map<string, CrowdAggregate>> {
  if (figureIds && figureIds.length === 0) return new Map();

  const rows = await prisma.$queryRaw<
    { figureId: string; avg: string | number | null; cnt: bigint | number }[]
  >(Prisma.sql`
    SELECT "figureId",
           SUM("composite" * "weight") / NULLIF(SUM("weight"), 0) AS avg,
           COUNT(*) AS cnt
    FROM "CrowdVote"
    ${figureIds ? Prisma.sql`WHERE "figureId" IN (${Prisma.join(figureIds)})` : Prisma.empty}
    GROUP BY "figureId"
  `);

  const map = new Map<string, CrowdAggregate>();
  for (const r of rows) {
    map.set(r.figureId, {
      average: r.avg == null ? null : Math.round(Number(r.avg)),
      count: Number(r.cnt),
    });
  }
  return map;
}

/* -------------------------------------------------------------------------- */
/* The ranked board                                                           */
/* -------------------------------------------------------------------------- */

/**
 * The ranked board. Returns ON_BOARD, non-calibration figures that have a
 * current score, ranked by composite, then sorted/filtered for display.
 */
export async function getBoardRows(
  opts: { sort?: BoardSort; filter?: BoardFilter } = {},
): Promise<BoardRow[]> {
  const figures = await prisma.figure.findMany({
    where: {
      isCalibration: false,
      status: "ON_BOARD",
      currentScoreId: { not: null },
    },
    include: { currentScore: true },
  });

  const aggregates = await getCrowdAggregates(figures.map((f) => f.id));

  // Build rows, then assign rank by composite (the canonical ordering)
  // before applying the requested display sort.
  const ranked = figures
    .filter((f) => f.currentScore)
    .map((f) => {
      const s = f.currentScore!;
      return {
        id: f.id,
        slug: f.slug,
        name: f.name,
        descriptor: f.descriptor,
        photoUrl: f.photoUrl,
        archetype: f.archetype,
        status: f.status,
        composite: s.composite,
        factor1: s.factor1,
        factor2: s.factor2,
        tier: s.tier,
        lastScoredAt: s.scoredAt,
        crowd: aggregates.get(f.id) ?? { average: null, count: 0 },
        rank: 0,
      } as BoardRow;
    })
    .sort((a, b) => b.composite - a.composite);

  ranked.forEach((row, i) => {
    row.rank = i + 1;
  });

  // Filter (tier / archetype).
  let rows = ranked;
  if (opts.filter?.tier) rows = rows.filter((r) => r.tier === opts.filter!.tier);
  if (opts.filter?.archetype) {
    rows = rows.filter((r) => r.archetype === opts.filter!.archetype);
  }

  // Display sort.
  const sort = opts.sort ?? "composite";
  const sorted = [...rows];
  switch (sort) {
    case "factor1":
      sorted.sort((a, b) => b.factor1 - a.factor1);
      break;
    case "factor2":
      sorted.sort((a, b) => b.factor2 - a.factor2);
      break;
    case "recent":
      sorted.sort((a, b) => b.lastScoredAt.getTime() - a.lastScoredAt.getTime());
      break;
    case "contested":
      // Biggest crowd-vs-official gap first. Rows with no crowd votes have
      // no gap to measure, so they sort to the bottom.
      sorted.sort((a, b) => contestGap(b) - contestGap(a));
      break;
    case "composite":
    default:
      sorted.sort((a, b) => a.rank - b.rank);
      break;
  }
  return sorted;
}

function contestGap(row: BoardRow): number {
  if (row.crowd.average == null) return -1;
  return Math.abs(row.crowd.average - row.composite);
}

/* -------------------------------------------------------------------------- */
/* Calibration anchors + Most Requested rail                                  */
/* -------------------------------------------------------------------------- */

/** Keanu floor / Kemper ceiling. Always separated from the ranking. */
export async function getCalibrationAnchors(): Promise<CalibrationAnchor[]> {
  const figures = await prisma.figure.findMany({
    where: { isCalibration: true, currentScoreId: { not: null } },
    include: { currentScore: true },
  });
  return figures
    .filter((f) => f.currentScore)
    .map((f) => {
      const s = f.currentScore!;
      return {
        id: f.id,
        slug: f.slug,
        name: f.name,
        descriptor: f.descriptor,
        photoUrl: f.photoUrl,
        composite: s.composite,
        factor1: s.factor1,
        factor2: s.factor2,
        tier: s.tier,
        verdict: s.verdict,
      };
    })
    .sort((a, b) => a.composite - b.composite);
}

/**
 * The "Most Requested / Coming to the board" rail. Figures explicitly
 * marked MOST_REQUESTED or pinned via featuredRequest, ordered by how
 * many re-score petitions they have gathered. Deliberate incompleteness:
 * this is the surface that fires the "how is X not on here?!" instinct.
 */
export async function getMostRequested(limit = 8): Promise<RequestedRow[]> {
  const figures = await prisma.figure.findMany({
    where: {
      OR: [{ status: "MOST_REQUESTED" }, { featuredRequest: true }],
    },
    include: { _count: { select: { petitions: true } } },
  });
  return figures
    .map((f) => ({
      id: f.id,
      slug: f.slug,
      name: f.name,
      descriptor: f.descriptor,
      status: f.status,
      petitionCount: f._count.petitions,
    }))
    .sort((a, b) => b.petitionCount - a.petitionCount)
    .slice(0, limit);
}

/* -------------------------------------------------------------------------- */
/* The dossier                                                                */
/* -------------------------------------------------------------------------- */

function toScoreEntry(s: {
  id: string;
  composite: number;
  factor1: number;
  factor2: number;
  tier: Tier;
  verdict: string;
  sectors: Prisma.JsonValue;
  triggerEvent: string | null;
  scoredAt: Date;
}): ScoreEntry {
  return {
    id: s.id,
    composite: s.composite,
    factor1: s.factor1,
    factor2: s.factor2,
    tier: s.tier,
    verdict: s.verdict,
    sectors: (s.sectors as unknown as Sector[]) ?? [],
    triggerEvent: s.triggerEvent,
    scoredAt: s.scoredAt,
  };
}

/** Full dossier for /board/[slug], or null if the figure has no score yet. */
export async function getFigureDossier(slug: string): Promise<FigureDossier | null> {
  const figure = await prisma.figure.findUnique({
    where: { slug },
    include: {
      currentScore: true,
      scores: { orderBy: { scoredAt: "desc" } },
      sources: { orderBy: { sortOrder: "asc" } },
      _count: { select: { petitions: true } },
    },
  });
  if (!figure || !figure.currentScore) return null;

  const aggregate = (await getCrowdAggregates([figure.id])).get(figure.id);

  return {
    id: figure.id,
    slug: figure.slug,
    name: figure.name,
    descriptor: figure.descriptor,
    photoUrl: figure.photoUrl,
    archetype: figure.archetype,
    status: figure.status,
    isCalibration: figure.isCalibration,
    current: toScoreEntry(figure.currentScore),
    history: figure.scores.map(toScoreEntry),
    sources: figure.sources.map((s) => ({ id: s.id, label: s.label, url: s.url })),
    crowd: aggregate ?? { average: null, count: 0 },
    petitionCount: figure._count.petitions,
  };
}

/** All figure slugs for static-param generation / sitemaps. */
export async function getAllFigureSlugs(): Promise<string[]> {
  const rows = await prisma.figure.findMany({
    where: { currentScoreId: { not: null } },
    select: { slug: true },
  });
  return rows.map((r) => r.slug);
}

/* -------------------------------------------------------------------------- */
/* Vote weighting                                                             */
/* -------------------------------------------------------------------------- */

/**
 * Vote weight by Consilium tenure. Free accounts weigh 1.0. Active members
 * start at 2.0 and gain 0.1 per month since activation, capped at 4.0. The
 * heavier weight for longer-standing members is the anti-brigade defence:
 * a flood of fresh free accounts cannot swamp the established cohort.
 */
export async function computeVoteWeight(userId: string): Promise<number> {
  const membership = await prisma.communityMembership.findUnique({
    where: { userId },
    select: { status: true, activatedAt: true },
  });
  if (!membership || membership.status !== "ACTIVE") return 1.0;

  const since = membership.activatedAt;
  const months = since
    ? (Date.now() - since.getTime()) / (30 * 24 * 60 * 60 * 1000)
    : 0;
  return Math.min(4.0, 2.0 + Math.max(0, months) * 0.1);
}

/* -------------------------------------------------------------------------- */
/* Gated writes                                                               */
/* -------------------------------------------------------------------------- */

export class BoardInputError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "BoardInputError";
  }
}

/** Public @handle for activity attribution, or null if not public. */
async function publicHandle(userId: string): Promise<string | null> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { handle: true, profilePublic: true },
  });
  return user?.profilePublic && user.handle ? user.handle : null;
}

/**
 * Cast or update a member's crowd score for a figure. One row per
 * (figure, user); re-voting overwrites. Logs a VOTE activity event and
 * returns the fresh aggregate for optimistic-UI reconciliation.
 */
export async function recordCrowdVote(args: {
  figureId: string;
  userId: string;
  composite: number;
}): Promise<{ crowd: CrowdAggregate }> {
  if (!Number.isFinite(args.composite) || args.composite < 0 || args.composite > 100) {
    throw new BoardInputError("Vote must be a number between 0 and 100");
  }
  const composite = Math.round(args.composite);

  const figure = await prisma.figure.findUnique({
    where: { id: args.figureId },
    select: { id: true, name: true, slug: true, isCalibration: true },
  });
  if (!figure) throw new BoardInputError("Figure not found");
  if (figure.isCalibration) {
    throw new BoardInputError("Calibration anchors are not votable");
  }

  const weight = await computeVoteWeight(args.userId);

  await prisma.crowdVote.upsert({
    where: { figureId_userId: { figureId: args.figureId, userId: args.userId } },
    update: { composite, weight },
    create: { figureId: args.figureId, userId: args.userId, composite, weight },
  });

  await logActivity({
    type: "VOTE",
    figureId: figure.id,
    figureName: figure.name,
    figureSlug: figure.slug,
    actorHandle: await publicHandle(args.userId),
    metadata: { composite },
  });

  const crowd = (await getCrowdAggregates([args.figureId])).get(args.figureId);
  return { crowd: crowd ?? { average: composite, count: 1 } };
}

/**
 * Sign a re-score petition. Citation required. One signature per
 * (figure, user). Logs a PETITION activity event and returns the new
 * signature count.
 */
export async function signPetition(args: {
  figureId: string;
  userId: string;
  sourceUrl: string;
}): Promise<{ petitionCount: number; alreadySigned: boolean }> {
  const url = args.sourceUrl.trim();
  if (!/^https?:\/\/.+/i.test(url)) {
    throw new BoardInputError("A valid source link is required to petition");
  }

  const figure = await prisma.figure.findUnique({
    where: { id: args.figureId },
    select: { id: true, name: true, slug: true },
  });
  if (!figure) throw new BoardInputError("Figure not found");

  let alreadySigned = false;
  try {
    await prisma.rescorePetition.create({
      data: { figureId: args.figureId, userId: args.userId, sourceUrl: url },
    });
    await logActivity({
      type: "PETITION",
      figureId: figure.id,
      figureName: figure.name,
      figureSlug: figure.slug,
      actorHandle: await publicHandle(args.userId),
      metadata: null,
    });
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2002") {
      alreadySigned = true;
    } else {
      throw err;
    }
  }

  const petitionCount = await prisma.rescorePetition.count({
    where: { figureId: args.figureId },
  });
  return { petitionCount, alreadySigned };
}

/* -------------------------------------------------------------------------- */
/* Admin authoring                                                            */
/* -------------------------------------------------------------------------- */

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

/**
 * Create a figure (admin). Slug derives from the name; a numeric suffix is
 * appended on collision. A figure with no score yet is fine, it sits as a
 * MOST_REQUESTED stub until its debut score lands.
 */
export async function createFigure(args: {
  name: string;
  descriptor?: string | null;
  archetype?: Archetype | null;
  status?: "ON_BOARD" | "RESCORE_PENDING" | "MOST_REQUESTED";
  isCalibration?: boolean;
  featuredRequest?: boolean;
  photoUrl?: string | null;
}): Promise<{ slug: string }> {
  const base = slugify(args.name) || "figure";
  let slug = base;
  for (let i = 2; await prisma.figure.findUnique({ where: { slug }, select: { id: true } }); i++) {
    slug = `${base}-${i}`;
  }
  await prisma.figure.create({
    data: {
      slug,
      name: args.name,
      descriptor: args.descriptor ?? null,
      archetype: args.archetype ?? null,
      status: args.status ?? "MOST_REQUESTED",
      isCalibration: args.isCalibration ?? false,
      featuredRequest: args.featuredRequest ?? false,
      photoUrl: args.photoUrl ?? null,
    },
  });
  return { slug };
}

/**
 * Add a (re)score to a figure (admin). Creates the Score row, points the
 * figure's currentScore at it, derives the tier from the composite, flips
 * the figure ON_BOARD, and logs the real DEBUT / RESCORE_REVEALED event
 * that surfaces in the live ticker.
 */
export async function addScore(args: {
  figureId: string;
  composite: number;
  factor1: number;
  factor2: number;
  verdict: string;
  sectors: Sector[];
  triggerEvent?: string | null;
}): Promise<void> {
  const figure = await prisma.figure.findUnique({
    where: { id: args.figureId },
    select: { id: true, name: true, slug: true },
  });
  if (!figure) throw new BoardInputError("Figure not found");

  const priorCount = await prisma.score.count({ where: { figureId: figure.id } });

  const score = await prisma.score.create({
    data: {
      figureId: figure.id,
      composite: args.composite,
      factor1: args.factor1,
      factor2: args.factor2,
      tier: tierForComposite(args.composite),
      verdict: args.verdict,
      sectors: args.sectors as unknown as Prisma.InputJsonValue,
      triggerEvent: args.triggerEvent ?? null,
    },
  });

  await prisma.figure.update({
    where: { id: figure.id },
    data: { currentScoreId: score.id, status: "ON_BOARD" },
  });

  await logActivity({
    type: priorCount === 0 ? "DEBUT" : "RESCORE_REVEALED",
    figureId: figure.id,
    figureName: figure.name,
    figureSlug: figure.slug,
    metadata: { composite: args.composite },
  });
}

/* -------------------------------------------------------------------------- */
/* Activity ticker (real events only)                                         */
/* -------------------------------------------------------------------------- */

export async function logActivity(args: {
  type: ActivityItem["type"];
  figureId?: string | null;
  figureName?: string | null;
  figureSlug?: string | null;
  actorHandle?: string | null;
  metadata?: Record<string, unknown> | null;
}): Promise<void> {
  await prisma.boardActivityEvent.create({
    data: {
      type: args.type,
      figureId: args.figureId ?? null,
      figureName: args.figureName ?? null,
      figureSlug: args.figureSlug ?? null,
      actorHandle: args.actorHandle ?? null,
      metadata: (args.metadata ?? undefined) as Prisma.InputJsonValue | undefined,
    },
  });
}

/** Most recent real activity events for the ticker. */
export async function getRecentActivity(limit = 12): Promise<ActivityItem[]> {
  const rows = await prisma.boardActivityEvent.findMany({
    orderBy: { createdAt: "desc" },
    take: limit,
  });
  return rows.map((r) => ({
    id: r.id,
    type: r.type,
    figureName: r.figureName,
    figureSlug: r.figureSlug,
    actorHandle: r.actorHandle,
    metadata: (r.metadata as Record<string, unknown> | null) ?? null,
    createdAt: r.createdAt,
  }));
}

/**
 * The logged-in viewer's own state on a figure: their existing crowd vote
 * (if any) and whether they have already signed the re-score petition.
 * Drives the dossier's vote controls so a returning member sees their
 * prior vote pre-filled rather than a blank slider.
 */
export async function getViewerVoteState(
  figureId: string,
  userId: string | null,
): Promise<{ myVote: number | null; hasPetitioned: boolean }> {
  if (!userId) return { myVote: null, hasPetitioned: false };
  const [vote, petition] = await Promise.all([
    prisma.crowdVote.findUnique({
      where: { figureId_userId: { figureId, userId } },
      select: { composite: true },
    }),
    prisma.rescorePetition.findUnique({
      where: { figureId_userId: { figureId, userId } },
      select: { id: true },
    }),
  ]);
  return { myVote: vote?.composite ?? null, hasPetitioned: !!petition };
}

/** Headline live counters for the board header. All real tallies. */
export async function getBoardStats(): Promise<{
  figureCount: number;
  voteCount: number;
  petitionCount: number;
}> {
  const [figureCount, voteCount, petitionCount] = await Promise.all([
    prisma.figure.count({ where: { isCalibration: false, status: "ON_BOARD" } }),
    prisma.crowdVote.count(),
    prisma.rescorePetition.count(),
  ]);
  return { figureCount, voteCount, petitionCount };
}
