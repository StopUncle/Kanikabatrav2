/**
 * Weekly resolution: rank every member of every unresolved league,
 * stamp finalRank + outcome (PROMOTED / DEMOTED / HELD), and set the
 * league's resolvedAt.
 *
 * Idempotent: leagues with resolvedAt set are skipped, so re-running
 * the cron after a partial failure picks up where it left off.
 *
 * Invariants enforced here:
 *   - A training bot can never finish #1 in a bracket that contains
 *     at least one human. If the natural rank-1 is a bot and any
 *     human exists, swap the bot's score-rank with the top human's.
 *     Cosmetic — preserves the brand promise that the leaderboard
 *     shows real people winning.
 *   - Promotion and demotion thresholds are percentage-based so a
 *     6-person bracket doesn't try to promote 5. Top 20% promote
 *     (capped at 5, min 1). Bottom 20% demote (capped at 5, min 1,
 *     skipped entirely on brackets smaller than 8).
 *   - The bottom tier doesn't demote (DEMOTED outcome on a bottom-tier
 *     resolved membership is treated as HELD by the assignment math).
 *     We still write DEMOTED so analytics can spot "would-have-been-
 *     demoted" cohorts.
 */

import { prisma } from "@/lib/prisma";

interface ResolveResult {
  leaguesResolved: number;
  membersRanked: number;
  promoted: number;
  demoted: number;
  held: number;
  botSwapsApplied: number;
}

/** Minimum bracket size before the demotion mechanic engages. */
const MIN_SIZE_FOR_DEMOTION = 8;

/**
 * Resolve every unresolved league with a weekKey older than the given
 * cutoff. Default cutoff is "the current ISO week" — i.e. all weeks
 * up to and including last week. The cron passes the cutoff explicitly
 * so a manual mid-week run won't accidentally finalize the week-in-
 * progress.
 */
export async function resolveLeagues(opts: {
  cutoffWeekKey: string;
}): Promise<ResolveResult> {
  const result: ResolveResult = {
    leaguesResolved: 0,
    membersRanked: 0,
    promoted: 0,
    demoted: 0,
    held: 0,
    botSwapsApplied: 0,
  };

  // Pull all unresolved leagues older than the cutoff. Cutoff is
  // exclusive: a league with weekKey == cutoffWeekKey is the live
  // week and stays live.
  const leagues = await prisma.league.findMany({
    where: {
      resolvedAt: null,
      weekKey: { lt: opts.cutoffWeekKey },
    },
    select: { id: true, tierName: true, weekKey: true },
  });

  for (const league of leagues) {
    const breakdown = await resolveOne(league.id);
    result.leaguesResolved++;
    result.membersRanked += breakdown.ranked;
    result.promoted += breakdown.promoted;
    result.demoted += breakdown.demoted;
    result.held += breakdown.held;
    result.botSwapsApplied += breakdown.botSwap ? 1 : 0;
  }

  return result;
}

interface OneResult {
  ranked: number;
  promoted: number;
  demoted: number;
  held: number;
  botSwap: boolean;
}

async function resolveOne(leagueId: string): Promise<OneResult> {
  const memberships = await prisma.leagueMembership.findMany({
    where: { leagueId },
    select: {
      id: true,
      userId: true,
      weeklyScore: true,
      weeklyAnswered: true,
      joinedAt: true,
      user: { select: { isTrainingBot: true } },
    },
    orderBy: [
      { weeklyScore: "desc" },
      { weeklyAnswered: "desc" },
      { joinedAt: "asc" },
    ],
  });

  if (memberships.length === 0) {
    // Nothing to rank; just stamp the league as resolved so the cron
    // doesn't keep finding it.
    await prisma.league.update({
      where: { id: leagueId },
      data: { resolvedAt: new Date() },
    });
    return { ranked: 0, promoted: 0, demoted: 0, held: 0, botSwap: false };
  }

  // Bot-cannot-be-#1 swap. Find the top human; if it isn't already at
  // rank 1, swap the array positions so the human takes #1.
  let botSwap = false;
  if (memberships[0].user.isTrainingBot) {
    const firstHumanIdx = memberships.findIndex(
      (m) => !m.user.isTrainingBot,
    );
    if (firstHumanIdx > 0) {
      const human = memberships[firstHumanIdx];
      memberships[firstHumanIdx] = memberships[0];
      memberships[0] = human;
      botSwap = true;
    }
  }

  const total = memberships.length;
  const promoteCount = Math.min(5, Math.max(1, Math.floor(total * 0.2)));
  const demoteCount =
    total >= MIN_SIZE_FOR_DEMOTION
      ? Math.min(5, Math.max(1, Math.floor(total * 0.2)))
      : 0;

  let promoted = 0;
  let demoted = 0;
  let held = 0;

  // Stamp ranks + outcomes in order. Done as a single transaction so
  // partial failures don't leave half a league finalised.
  await prisma.$transaction(async (tx) => {
    for (let i = 0; i < memberships.length; i++) {
      const m = memberships[i];
      const rank = i + 1;
      let outcome: "PROMOTED" | "DEMOTED" | "HELD";
      if (rank <= promoteCount) {
        outcome = "PROMOTED";
        promoted++;
      } else if (rank > total - demoteCount && demoteCount > 0) {
        outcome = "DEMOTED";
        demoted++;
      } else {
        outcome = "HELD";
        held++;
      }
      await tx.leagueMembership.update({
        where: { id: m.id },
        data: { finalRank: rank, outcome },
      });
    }
    await tx.league.update({
      where: { id: leagueId },
      data: { resolvedAt: new Date() },
    });
  });

  return { ranked: total, promoted, demoted, held, botSwap };
}
