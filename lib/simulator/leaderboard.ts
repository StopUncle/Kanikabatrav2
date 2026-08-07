/**
 * Simulator leaderboard assembly.
 *
 * Real users' XP + completion counts are queried from SimulatorProgress,
 * then merged with a stable set of mock entries so the board feels
 * populated during launch. Mocks are tier 1-3 only — keeps things
 * plausible for a young community.
 *
 * Sort: XP desc, then completed desc, then a stable name hash so order
 * is deterministic across refreshes (no jiggle when XP ties).
 */

import { prisma } from "@/lib/prisma";
import { tierForMember } from "@/components/consilium/badge-tiers";
import { memberSafeName } from "@/lib/community/privacy";

/** How long "recently" is when working out which way someone is moving. */
export const MOVEMENT_WINDOW_DAYS = 7;

/** Climbing this many places or more is worth marking on the row. */
export const BIG_MOVE_SPOTS = 3;

/**
 * Where a row sat a week ago, and which way it has travelled since.
 *
 * Nothing stores a rank history, so this is reconstructed rather than
 * read: both boards keep an append-only record of what they award
 * (StandingEvent for Standing, per-scenario xpEarned for XP), so
 * subtracting the last week's awards from today's total gives the score
 * each member held a week ago, and re-sorting on that gives the board as
 * it stood. Exact for Standing. For XP it attributes a scenario's points
 * to its completion date, so replaying an old scenario reads as new
 * movement, which is the honest answer anyway.
 */
export interface RankMovement {
  /** Rank a week ago. Null when they were not on the board at all. */
  previousRank: number | null;
  /** Places gained; negative is places lost. Null for a new entry. */
  change: number | null;
}

function assignMovement<T extends { id: string; rank: number }>(
  entries: T[],
  previousValueById: Map<string, number>,
): Array<T & RankMovement> {
  // Anyone whose prior score was zero was not on the board a week ago,
  // so they are new rather than having climbed from the bottom.
  const wereRanked = entries
    .filter((e) => (previousValueById.get(e.id) ?? 0) > 0)
    .sort(
      (a, b) =>
        (previousValueById.get(b.id) ?? 0) - (previousValueById.get(a.id) ?? 0),
    );

  const previousRankById = new Map<string, number>();
  wereRanked.forEach((e, i) => previousRankById.set(e.id, i + 1));

  return entries.map((e) => {
    const previousRank = previousRankById.get(e.id) ?? null;
    return {
      ...e,
      previousRank,
      // A smaller number is a better rank, so the gain is previous minus now.
      change: previousRank === null ? null : previousRank - e.rank,
    };
  });
}

export interface LeaderboardEntry {
  /** Stable id — userId for real entries, "mock-XXX" for seeded ones. */
  id: string;
  rank: number;
  name: string;
  tier: number;
  xp: number;
  completed: number;
  /** Days since last activity. Used for the activity dot in the UI. */
  lastActiveDays: number;
  /** True for the currently viewing member's own row. */
  isViewer: boolean;
  /** Internal — not rendered, just lets the UI treat real members
   *  slightly differently (e.g. linkable profile in a future revision). */
  isReal: boolean;
}

interface MockSeed {
  handle: string;
  tier: number;
  xp: number;
  completed: number;
  lastActiveDays: number;
}

/**
 * Mock cohort. Forty entries, lightly distributed:
 *   - top: 1300-1750 XP, 16-21 completed
 *   - mid: 450-1200 XP, 7-15 completed
 *   - low: 80-400 XP, 1-6 completed
 *
 * Tiers stay 1-3 because the community itself is young — anyone showing
 * tier 5+ would be implausible right now. Names are a mix of short
 * handles, two-word combos, and "Initiate #NNN" style anonymous picks
 * that read like real members who haven't set a displayName yet.
 */
const MOCK_LEADERBOARD: MockSeed[] = [
  { handle: "VioletAxis",      tier: 3, xp: 1745, completed: 21, lastActiveDays: 1 },
  { handle: "Mistress Quiet",  tier: 3, xp: 1620, completed: 19, lastActiveDays: 2 },
  { handle: "Vesper",          tier: 2, xp: 1488, completed: 18, lastActiveDays: 1 },
  { handle: "Azura73",         tier: 3, xp: 1402, completed: 17, lastActiveDays: 3 },
  { handle: "Calm Threat",     tier: 2, xp: 1356, completed: 16, lastActiveDays: 1 },

  { handle: "Initiate #084",   tier: 1, xp: 1198, completed: 14, lastActiveDays: 2 },
  { handle: "ForkedTongue",    tier: 2, xp: 1142, completed: 14, lastActiveDays: 4 },
  { handle: "Ivory_K",         tier: 2, xp: 1077, completed: 13, lastActiveDays: 2 },
  { handle: "TheNorth",        tier: 3, xp:  998, completed: 12, lastActiveDays: 5 },
  { handle: "Mirror28",        tier: 2, xp:  942, completed: 12, lastActiveDays: 3 },
  { handle: "Praxis",          tier: 2, xp:  883, completed: 11, lastActiveDays: 1 },
  { handle: "BrightShadow",    tier: 1, xp:  827, completed: 10, lastActiveDays: 6 },
  { handle: "EmberAndIvy",     tier: 2, xp:  794, completed: 10, lastActiveDays: 2 },
  { handle: "Kestrel",         tier: 2, xp:  741, completed:  9, lastActiveDays: 4 },
  { handle: "Initiate #117",   tier: 1, xp:  693, completed:  9, lastActiveDays: 2 },
  { handle: "GlassRoom",       tier: 1, xp:  654, completed:  8, lastActiveDays: 1 },
  { handle: "Severance",       tier: 2, xp:  617, completed:  8, lastActiveDays: 7 },
  { handle: "Lyra V.",         tier: 1, xp:  574, completed:  7, lastActiveDays: 3 },
  { handle: "OrchidIron",      tier: 2, xp:  531, completed:  7, lastActiveDays: 4 },
  { handle: "QuietCoup",       tier: 1, xp:  498, completed:  7, lastActiveDays: 2 },

  { handle: "Initiate #042",   tier: 1, xp:  447, completed:  6, lastActiveDays: 1 },
  { handle: "Sable",           tier: 1, xp:  410, completed:  6, lastActiveDays: 5 },
  { handle: "MidnightGild",    tier: 1, xp:  378, completed:  5, lastActiveDays: 8 },
  { handle: "K-S",             tier: 2, xp:  342, completed:  5, lastActiveDays: 3 },
  { handle: "Whetstone",       tier: 1, xp:  308, completed:  4, lastActiveDays: 2 },
  { handle: "Initiate #209",   tier: 1, xp:  281, completed:  4, lastActiveDays: 4 },
  { handle: "Marlowe",         tier: 1, xp:  254, completed:  4, lastActiveDays: 6 },
  { handle: "TwoOfCups",       tier: 1, xp:  227, completed:  3, lastActiveDays: 2 },
  { handle: "Niamh",           tier: 1, xp:  204, completed:  3, lastActiveDays: 3 },
  { handle: "VelvetEdge",      tier: 1, xp:  182, completed:  3, lastActiveDays: 1 },

  { handle: "Asher_M",         tier: 1, xp:  163, completed:  2, lastActiveDays: 2 },
  { handle: "Initiate #167",   tier: 1, xp:  144, completed:  2, lastActiveDays: 9 },
  { handle: "Petrichor",       tier: 1, xp:  127, completed:  2, lastActiveDays: 4 },
  { handle: "Wren",            tier: 1, xp:  111, completed:  2, lastActiveDays: 3 },
  { handle: "TheArchivist",    tier: 1, xp:   98, completed:  2, lastActiveDays: 7 },
  { handle: "GrayRoom",        tier: 1, xp:   83, completed:  1, lastActiveDays: 2 },
  { handle: "Initiate #093",   tier: 1, xp:   76, completed:  1, lastActiveDays: 5 },
  { handle: "Solene",          tier: 1, xp:   62, completed:  1, lastActiveDays: 1 },
  { handle: "ColdHands",       tier: 1, xp:   48, completed:  1, lastActiveDays: 6 },
  { handle: "Initiate #058",   tier: 1, xp:   31, completed:  1, lastActiveDays: 4 },
];

/**
 * Stable hash of a string — used as a final tiebreaker so identical
 * (xp, completed) pairs always sort the same way across requests.
 */
function nameHash(s: string): number {
  let h = 5381;
  for (let i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) | 0;
  return h >>> 0;
}

function sortEntries(a: LeaderboardEntry, b: LeaderboardEntry): number {
  if (b.xp !== a.xp) return b.xp - a.xp;
  if (b.completed !== a.completed) return b.completed - a.completed;
  return nameHash(a.id) - nameHash(b.id);
}

export interface LeaderboardSnapshot {
  /** Ranked top-N rows ready to render. */
  top: Array<LeaderboardEntry & RankMovement>;
  /** The viewer's own row + rank, regardless of whether they're in `top`.
   *  null when the viewer has no simulator activity at all. */
  viewer: (LeaderboardEntry & RankMovement) | null;
}

/**
 * Assemble the leaderboard.
 *
 * Real users contribute their actual XP/completion sums. The viewer's
 * row is always resolved (even if they're outside the visible window)
 * so the page can pin it as a "Your standing" card.
 *
 * @param viewerId  The currently logged-in user.
 * @param limit     Number of top rows to return. Default 50.
 */
export async function getLeaderboard(
  viewerId: string,
  limit = 50,
): Promise<LeaderboardSnapshot> {
  // Pull every user with at least one SimulatorProgress row, plus the
  // membership timestamp we need to derive their badge tier.
  const rawProgress = await prisma.simulatorProgress.groupBy({
    by: ["userId"],
    _sum: { xpEarned: true },
    _count: { _all: true },
    _max: { startedAt: true },
  });

  const since = new Date(
    Date.now() - MOVEMENT_WINDOW_DAYS * 24 * 60 * 60 * 1000,
  );

  // XP banked in the movement window, so today's total can be rewound to
  // what each member held a week ago.
  const recentXp = await prisma.simulatorProgress.groupBy({
    by: ["userId"],
    where: { completedAt: { gte: since } },
    _sum: { xpEarned: true },
  });
  const recentXpByUser = new Map(
    recentXp.map((r) => [r.userId, r._sum.xpEarned ?? 0]),
  );

  const completedCounts = await prisma.simulatorProgress.groupBy({
    by: ["userId"],
    where: { completedAt: { not: null } },
    _count: { _all: true },
  });
  const completedByUser = new Map<string, number>();
  for (const row of completedCounts) {
    completedByUser.set(row.userId, row._count._all);
  }

  const userIds = rawProgress.map((r) => r.userId);
  const users = await prisma.user.findMany({
    where: { id: { in: userIds } },
    select: {
      id: true,
      name: true,
      displayName: true,
      role: true,
      communityMembership: { select: { activatedAt: true } },
    },
  });
  const userById = new Map(users.map((u) => [u.id, u]));

  const realEntries: LeaderboardEntry[] = rawProgress.map((row) => {
    const u = userById.get(row.userId);
    const tier = tierForMember({
      role: u?.role ?? null,
      activatedAt: u?.communityMembership?.activatedAt ?? null,
    });
    const lastTouch = row._max.startedAt;
    const lastActiveDays = lastTouch
      ? Math.max(
          0,
          Math.floor((Date.now() - lastTouch.getTime()) / (1000 * 60 * 60 * 24)),
        )
      : 99;
    return {
      id: row.userId,
      rank: 0, // assigned after sort
      name: memberSafeName(u ?? null),
      tier,
      xp: row._sum.xpEarned ?? 0,
      completed: completedByUser.get(row.userId) ?? 0,
      lastActiveDays,
      isViewer: row.userId === viewerId,
      isReal: true,
    };
  });

  // The mock cohort exists so the board doesn't read as an empty room
  // pre-surge. Once enough real members are on it, the mocks retire in
  // one go rather than being slowly out-scored, which would look like a
  // wave of members going silent.
  const REAL_ENTRIES_TO_RETIRE_MOCKS = 20;
  const mockEntries: LeaderboardEntry[] =
    realEntries.length >= REAL_ENTRIES_TO_RETIRE_MOCKS
      ? []
      : MOCK_LEADERBOARD.map((m, idx) => ({
          id: `mock-${idx.toString().padStart(3, "0")}`,
          rank: 0,
          name: m.handle,
          tier: m.tier,
          xp: m.xp,
          completed: m.completed,
          lastActiveDays: m.lastActiveDays,
          isViewer: false,
          isReal: false,
        }));

  // Merge + sort.
  const merged = [...realEntries, ...mockEntries].sort(sortEntries);

  // Assign ranks.
  merged.forEach((e, i) => {
    e.rank = i + 1;
  });

  // Mocks are static, so they carry their whole score into the past and
  // simply hold still while real members climb past them, which is
  // exactly how a seeded board should behave.
  const previousXpById = new Map(
    merged.map((e) => [e.id, e.xp - (recentXpByUser.get(e.id) ?? 0)]),
  );
  const withMovement = assignMovement(merged, previousXpById);

  const top = withMovement.slice(0, limit);
  const viewer = withMovement.find((e) => e.isViewer) ?? null;

  return { top, viewer };
}

export interface StandingEntry {
  id: string;
  rank: number;
  name: string;
  standing: number;
  ringLevel: number;
  isViewer: boolean;
}

export interface StandingBoard {
  top: Array<StandingEntry & RankMovement>;
  /** The viewer's row + rank even when outside `top`; null at 0 Standing. */
  viewer: (StandingEntry & RankMovement) | null;
}

/**
 * How many rows to pull before slicing to `limit`. Movement needs the
 * whole board, not the visible window: someone entering the top ten came
 * from outside it, and a query capped at ten can never see where from.
 * Standing-holding members are in the dozens, so this is one cheap read.
 */
const STANDING_SCAN_LIMIT = 500;

/**
 * The Standing board: lifetime Standing across members, no mocks. Standing
 * launches at zero for everyone on the same day, so an empty board here is
 * a starting line, not a dead room.
 */
export async function getStandingBoard(
  viewerId: string,
  limit = 50,
): Promise<StandingBoard> {
  const rows = await prisma.user.findMany({
    where: { isBot: false, role: { not: "ADMIN" }, standing: { gt: 0 } },
    orderBy: { standing: "desc" },
    take: STANDING_SCAN_LIMIT,
    select: {
      id: true,
      name: true,
      displayName: true,
      role: true,
      standing: true,
      ringLevel: true,
    },
  });

  // Standing is only ever written by appending a StandingEvent, so the
  // sum of the last week's events is exactly what to subtract to recover
  // the score each member held then.
  const since = new Date(
    Date.now() - MOVEMENT_WINDOW_DAYS * 24 * 60 * 60 * 1000,
  );
  const recent = await prisma.standingEvent.groupBy({
    by: ["userId"],
    where: { userId: { in: rows.map((u) => u.id) }, createdAt: { gte: since } },
    _sum: { amount: true },
  });
  const recentByUser = new Map(
    recent.map((r) => [r.userId, r._sum.amount ?? 0]),
  );

  const ranked: StandingEntry[] = rows.map((u, i) => ({
    id: u.id,
    rank: i + 1,
    name: memberSafeName(u),
    standing: u.standing,
    ringLevel: u.ringLevel,
    isViewer: u.id === viewerId,
  }));

  const previousStandingById = new Map(
    rows.map((u) => [u.id, u.standing - (recentByUser.get(u.id) ?? 0)]),
  );
  const withMovement = assignMovement(ranked, previousStandingById);
  const top = withMovement.slice(0, limit);

  // Search the whole scan, not just the visible slice: a viewer at rank 30
  // is already here with their movement worked out, and re-querying would
  // hand them a row that claims they have never moved.
  let viewer = withMovement.find((e) => e.isViewer) ?? null;
  if (!viewer) {
    const me = await prisma.user.findUnique({
      where: { id: viewerId },
      select: {
        id: true,
        name: true,
        displayName: true,
        role: true,
        standing: true,
        ringLevel: true,
      },
    });
    if (me && me.standing > 0) {
      const ahead = await prisma.user.count({
        where: {
          isBot: false,
          role: { not: "ADMIN" },
          standing: { gt: me.standing },
        },
      });
      viewer = {
        id: me.id,
        rank: ahead + 1,
        name: memberSafeName(me),
        standing: me.standing,
        ringLevel: me.ringLevel,
        isViewer: true,
        // Past the scan window, so there is no board to compare against.
        // Better a row with no movement chip than an invented one.
        previousRank: null,
        change: null,
      };
    }
  }

  return { top, viewer };
}
