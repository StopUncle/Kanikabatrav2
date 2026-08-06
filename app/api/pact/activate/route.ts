import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth/middleware";
import { prisma } from "@/lib/prisma";
import { getAccess } from "@/lib/access/tier";
import { captureServerAsync } from "@/lib/analytics/server";
import { ANALYTICS_EVENTS } from "@/lib/analytics/events";
import { weekEndsAt } from "@/lib/pact/read";
import { sendPushToUser } from "@/lib/push";

/**
 * Start the pact's weekly clock. Signing is the ceremony; this is the
 * commitment's first day. Sets startedAt on the live pact, opens the
 * week-one entry, and fires the week-one push so the member's very
 * first notification arrives the moment they choose to begin.
 *
 * Idempotent: an already-started pact returns ok without moving the
 * clock. Stale open entries from the pre-activation era (a legacy pact
 * signed when the clock ran from signedAt) are cleared IF they hold no
 * journal, so activation always begins a clean week one.
 */
export async function POST(request: NextRequest) {
  return requireAuth(request, async (_req, user) => {
    const access = await getAccess(user.id);
    if (!access.pactEntitled) {
      return NextResponse.json(
        { error: "The Pact starts at the door" },
        { status: 403 },
      );
    }

    const pact = await prisma.pact.findFirst({
      where: { userId: user.id, brokenAt: null },
    });
    if (!pact) {
      return NextResponse.json(
        { error: "No signed pact to activate" },
        { status: 404 },
      );
    }
    if (pact.startedAt) {
      return NextResponse.json({ success: true, alreadyStarted: true });
    }

    const startedAt = new Date();

    await prisma.$transaction(async (tx) => {
      // Entries minted under the old signedAt-anchored clock carry wrong
      // deadlines; journalless open ones are safe to clear so week one
      // starts clean. Anything written survives.
      await tx.pactEntry.deleteMany({
        where: { pactId: pact.id, status: "open", journalBody: null },
      });
      await tx.pact.update({
        where: { id: pact.id },
        data: { startedAt },
      });
      // A surviving OPEN week one (legacy, journaled) moves onto the new
      // clock. A kept or scarred week one is history and is never
      // reopened by pressing Activate.
      await tx.pactEntry.updateMany({
        where: { pactId: pact.id, weekNumber: 1, status: "open" },
        data: { weekEndsAt: weekEndsAt({ startedAt }, 1) },
      });
      const existing = await tx.pactEntry.findUnique({
        where: { pactId_weekNumber: { pactId: pact.id, weekNumber: 1 } },
        select: { id: true },
      });
      if (!existing) {
        await tx.pactEntry.create({
          data: {
            pactId: pact.id,
            userId: user.id,
            weekNumber: 1,
            weekEndsAt: weekEndsAt({ startedAt }, 1),
          },
        });
      }
    });

    // Activation, not signing, is when the product actually starts. The
    // lag between the two is the number that says whether the sealed
    // screen hands people onward or leaves them parked.
    captureServerAsync(user.id, ANALYTICS_EVENTS.PACT_ACTIVATED, {
      pact_preset: pact.preset,
      pact_number: pact.number,
      // Null-guarded: an analytics property must never be the thing that
      // throws inside the one route that starts the product.
      hours_since_signing: pact.signedAt
        ? Math.round(
            (startedAt.getTime() - pact.signedAt.getTime()) / 3_600_000,
          )
        : null,
    });

    // The first notification of the pact, at the moment of most intent.
    // Also proves to the member that pact notifications reach them.
    sendPushToUser(user.id, "pactWeek", {
      title: "Week 1 is open",
      body: "Seven days. The record is watching.",
      url: "/app/pact/week",
      tag: "pact-week-1",
    }).catch(() => 0);

    return NextResponse.json({ success: true });
  });
}
