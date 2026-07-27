import type { PrismaClient } from "@prisma/client";

/**
 * What the room has been playing this week, and therefore what leads the
 * rail.
 *
 * Ordering purely by plays has two problems worth naming, because both
 * make the feature quietly useless rather than visibly broken.
 *
 * The first is that it ossifies. Whatever sits first gets played most,
 * which keeps it first, so after a fortnight the "popular" order is just
 * a record of what was popular once. The second is sample size: with
 * around fifteen members active in a week, one person doing five drills
 * flips the order. That is churn, not information.
 *
 * So popularity decides two things and not the whole screen:
 *
 *   1. It breaks ties in the ordering, AFTER what the member has not
 *      done today. Something you can do right now beats something other
 *      people did, every time. A Daily Tell you have not opened is worth
 *      more to you than the most-played game you already finished.
 *   2. It puts a visible "Most played" mark on the leader. If popularity
 *      only reshuffles an order, nobody can tell it happened; a label
 *      says it out loud, which is the part that is actually interesting.
 *
 * Counted across everybody, not per member, and bots excluded: the point
 * is what the room is doing.
 */

export type PopularKey =
  | "speed-drill"
  | "daily-tell"
  | "adventures"
  | "receipts";

export interface Popularity {
  plays: Record<PopularKey, number>;
  /** The single most-played game this week, or null if nothing was. */
  leader: PopularKey | null;
}

const WEEK_MS = 7 * 24 * 60 * 60 * 1000;

/** A leader needs a real margin, otherwise the badge flickers weekly. */
const LEADER_MIN_PLAYS = 3;

export async function readPopularity(db: PrismaClient): Promise<Popularity> {
  const since = new Date(Date.now() - WEEK_MS);
  const human = { user: { isBot: false } };

  const [drill, tell, adventures, receipts] = await Promise.all([
    db.gameSession.count({
      where: { gameKey: "speed-drill", playedAt: { gte: since }, ...human },
    }),
    db.tellResponse.count({
      where: { answeredAt: { gte: since }, userId: { not: null }, ...human },
    }),
    db.adventureProgress.count({
      where: { startedAt: { gte: since }, ...human },
    }),
    db.receipt.count({
      where: { createdAt: { gte: since }, ...human },
    }),
  ]);

  const plays: Record<PopularKey, number> = {
    "speed-drill": drill,
    "daily-tell": tell,
    adventures,
    receipts,
  };

  let leader: PopularKey | null = null;
  let best = LEADER_MIN_PLAYS - 1;
  for (const key of Object.keys(plays) as PopularKey[]) {
    if (plays[key] > best) {
      best = plays[key];
      leader = key;
    }
  }

  return { plays, leader };
}

/**
 * The rail order: anything the member has left undone today first, then
 * by what the room played this week, then anything already done.
 *
 * `pending` is the member's own state and always outranks popularity.
 * Games with no daily state (Adventures, Receipts) are never "done", so
 * they sort purely on plays and sit between the two groups.
 */
export function orderByPopularity<T extends { key: PopularKey }>(
  games: T[],
  popularity: Popularity,
  doneToday: (g: T) => boolean,
): T[] {
  return [...games].sort((a, b) => {
    const aDone = doneToday(a);
    const bDone = doneToday(b);
    if (aDone !== bDone) return aDone ? 1 : -1;
    return popularity.plays[b.key] - popularity.plays[a.key];
  });
}
