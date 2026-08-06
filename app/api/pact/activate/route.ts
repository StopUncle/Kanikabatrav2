import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth/middleware";
import { prisma } from "@/lib/prisma";
import { getAccess } from "@/lib/access/tier";
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

    await prisma.$transaction([
      // Entries minted under the old signedAt-anchored clock carry wrong
      // deadlines; journalless open ones are safe to clear so week one
      // starts clean. Anything written survives.
      prisma.pactEntry.deleteMany({
        where: { pactId: pact.id, status: "open", journalBody: null },
      }),
      prisma.pact.update({
        where: { id: pact.id },
        data: { startedAt },
      }),
      prisma.pactEntry.upsert({
        where: { pactId_weekNumber: { pactId: pact.id, weekNumber: 1 } },
        create: {
          pactId: pact.id,
          userId: user.id,
          weekNumber: 1,
          weekEndsAt: weekEndsAt({ startedAt }, 1),
        },
        update: { weekEndsAt: weekEndsAt({ startedAt }, 1), status: "open" },
      }),
    ]);

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
