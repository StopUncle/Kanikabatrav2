/**
 * POST /api/cron/pact-week
 *
 * Daily. Two passes over the Blood Pact:
 *
 *   1. Resolve: any week that ended while still "open" becomes a scar.
 *      The same write happens lazily in lib/pact/read.ts when a member
 *      looks, so this pass is for the members who did not look, which is
 *      exactly who the scar is about.
 *   2. Advance: members whose derived week number has moved get their new
 *      PactEntry row and one push. The entry row doubles as the dedupe:
 *      if it already exists (the member visited first and the lazy read
 *      created it), there is nothing to announce, because they saw it.
 *
 * Idempotent by construction; a manual workflow_dispatch re-run is
 * harmless.
 */

import { NextResponse, type NextRequest } from "next/server";
import { verifyCronSecret } from "@/lib/cron-auth";
import { prisma } from "@/lib/prisma";
import { sendPushToUser } from "@/lib/push";
import { daysLeft, NUDGE_DAYS_LEFT } from "@/lib/pact/reflection";
import { logger } from "@/lib/logger";
import {
  currentWeekFor,
  cycleWeekFor,
  scarOverdueEntries,
  weekEndsAt,
} from "@/lib/pact/read";

export const dynamic = "force-dynamic";

// Same 24h ACTIVE grace as checkPactMembership (lib/pact/membership.ts):
// weekly billing means expiresAt-passed-but-invoice-in-flight recurs every
// week, and the daily cron must not skip a paying member's week over
// ordinary billing lag. Without the grace, a member who also did not
// visit that day simply never got a row for the week.
const EXPIRY_GRACE_MS = 24 * 60 * 60 * 1000;

function isLive(
  m: { status: string; expiresAt: Date | null } | null,
  now: Date,
): boolean {
  if (!m) return false;
  if (m.status === "ACTIVE") {
    return (
      !m.expiresAt ||
      m.expiresAt.getTime() > now.getTime() - EXPIRY_GRACE_MS
    );
  }
  if (m.status === "CANCELLED") return !!m.expiresAt && m.expiresAt > now;
  return false;
}

export async function POST(request: NextRequest) {
  if (!verifyCronSecret(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const now = new Date();

    // Content-aware: a week whose challenge was never published cannot
    // scar (lib/pact/read.ts scarOverdueEntries, shared with the lazy
    // read so the two passes agree).
    const scarredCount = await scarOverdueEntries(null, now);

    const [pacts, published] = await Promise.all([
      prisma.pact.findMany({
        // startedAt not null: a signed-but-unactivated pact has no clock
        // to advance and nothing to announce. Activation starts the drip.
        where: { brokenAt: null, startedAt: { not: null } },
        select: {
          id: true,
          userId: true,
          preset: true,
          startedAt: true,
          user: {
            select: {
              pactMembership: { select: { status: true, expiresAt: true } },
              communityMembership: {
                select: { status: true, expiresAt: true },
              },
            },
          },
        },
      }),
      prisma.pactWeek.findMany({
        where: { isPublished: true },
        select: { preset: true, cycleWeek: true, title: true },
      }),
    ]);
    const challengeTitle = new Map(
      published.map((w) => [`${w.preset}:${w.cycleWeek}`, w.title]),
    );

    let advanced = 0;
    let pushed = 0;
    /** Weeks still open with two days left, reminded before they scar. */
    let nudged = 0;
    let dormantBilling = 0;
    let errored = 0;

    for (const p of pacts) {
      // One member's bad row must not silence every pact after theirs in
      // the loop: the failure is logged and the sweep moves on.
      try {
        // A pact whose billing has lapsed stops advancing rather than
        // stacking silent scars: SUSPENDED and EXPIRED members find their
        // week where they left it. The pact only BREAKS via the webhook.
        const entitled =
          isLive(p.user.pactMembership, now) ||
          isLive(p.user.communityMembership, now);
        if (!entitled) {
          dormantBilling++;
          continue;
        }

        if (!p.startedAt) continue;
        const started = { startedAt: p.startedAt };
        const weekNumber = currentWeekFor(started, now);
        if (weekNumber < 1) continue;

        const existing = await prisma.pactEntry.findUnique({
          where: { pactId_weekNumber: { pactId: p.id, weekNumber } },
          select: { id: true, status: true, weekEndsAt: true },
        });
        if (existing) {
          // The week is already open and running. Nothing to announce, but
          // this is where the nudge lives.
          //
          // Most misses are not refusals, they are the week getting away
          // from somebody, and until now the first they heard about it was
          // a scar that had already happened. Fires exactly once per week:
          // the sweep runs daily, so the remaining-days count steps down by
          // one each pass and only one pass sees NUDGE_DAYS_LEFT. No state
          // to store, and no risk of nudging every morning.
          if (
            existing.status === "open" &&
            daysLeft(existing.weekEndsAt, now) === NUDGE_DAYS_LEFT
          ) {
            const title =
              challengeTitle.get(`${p.preset}:${cycleWeekFor(weekNumber)}`) ??
              null;
            const delivered = await sendPushToUser(p.userId, "pactWeek", {
              title: "Two days left on week " + weekNumber,
              body: title
                ? `${title} Still open.`
                : "The week is still open.",
              url: "/app/pact/week",
              tag: `pact-nudge-${weekNumber}`,
            }).catch(() => 0);
            if (delivered > 0) nudged++;
          }
          continue;
        }

        // Claim first, push second: a repeated push is worse than a lost
        // one. A P2002 here means the lazy read created the row between
        // the check and the write, i.e. the member is looking at the week
        // right now, and there is nothing to announce.
        try {
          await prisma.pactEntry.create({
            data: {
              pactId: p.id,
              userId: p.userId,
              weekNumber,
              weekEndsAt: weekEndsAt(started, weekNumber),
            },
          });
        } catch (err) {
          const raced =
            typeof err === "object" &&
            err !== null &&
            (err as { code?: string }).code === "P2002";
          if (raced) continue;
          throw err;
        }
        advanced++;

        const prev = weekNumber > 1
          ? await prisma.pactEntry.findUnique({
              where: {
                pactId_weekNumber: { pactId: p.id, weekNumber: weekNumber - 1 },
              },
              select: { status: true },
            })
          : null;
        const title =
          challengeTitle.get(`${p.preset}:${cycleWeekFor(weekNumber)}`) ??
          "This week is open. The challenge is still being written.";
        const body =
          prev?.status === "scarred"
            ? `Last week scarred. ${title}`
            : title;

        const delivered = await sendPushToUser(p.userId, "pactWeek", {
          title: `Week ${weekNumber} is open`,
          body,
          url: "/app/pact/week",
          tag: `pact-week-${weekNumber}`,
        }).catch(() => 0);
        if (delivered > 0) pushed++;
      } catch (err) {
        errored++;
        logger.error(
          `[pact-week] pact ${p.id} failed`,
          err instanceof Error ? err : new Error(String(err)),
        );
      }
    }

    return NextResponse.json({
      ok: true,
      pacts: pacts.length,
      scarred: scarredCount,
      advanced,
      pushed,
      nudged,
      dormantBilling,
      errored,
    });
  } catch (err) {
    logger.error(
      "[pact-week] failed",
      err instanceof Error ? err : new Error(String(err)),
    );
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
