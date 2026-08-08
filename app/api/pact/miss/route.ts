import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth/middleware";
import { prisma } from "@/lib/prisma";
import { readPact } from "@/lib/pact/read";
import { getAccess } from "@/lib/access/tier";
import { classifyEntry, CRISIS_CARD } from "@/lib/program/ai/safety";
import { captureServerAsync } from "@/lib/analytics/server";
import { ANALYTICS_EVENTS } from "@/lib/analytics/events";
import {
  isValidDifficulty,
  isValidMissReason,
  MISS_NOTE_MAX,
} from "@/lib/pact/reflection";

/**
 * "No. I didn't keep it."
 *
 * Before this route the only way to miss a week was to say nothing and let
 * it lapse: `scarOverdueEntries` flipped the row on a cron or a lazy read
 * and the member was never asked. That threw away the only data that
 * explains why people fail, and it turned the most salvageable moment in
 * the product into the least engaged one. Somebody who tells you they
 * missed is still in the pact. Somebody who goes quiet has already left.
 *
 * THE SCAR IS THE SAME SCAR. Owning it does not earn a lighter mark, and
 * that is not harshness, it is the only way the mark keeps meaning
 * anything: the moment honesty is cheaper than silence, the honest answer
 * becomes the strategic one and the record stops being true. What owning
 * it buys is that the record shows you faced it, and that Kanika learns
 * what stopped you.
 *
 * The note runs through the same crisis classifier as the journal. "What
 * was hard" is precisely the field where a serious disclosure lands, and
 * an unmonitored channel for exactly those disclosures would be worse than
 * not asking at all.
 */
export async function POST(request: NextRequest) {
  return requireAuth(request, async (req, user) => {
    const access = await getAccess(user.id);
    if (!access.pactEntitled) {
      return NextResponse.json(
        { error: "The Pact is not active on this account" },
        { status: 403 },
      );
    }

    const body = (await req.json().catch(() => null)) as {
      reason?: unknown;
      note?: unknown;
      difficulty?: unknown;
    } | null;

    if (!isValidMissReason(body?.reason)) {
      return NextResponse.json(
        { error: "Pick what happened" },
        { status: 400 },
      );
    }
    const reason = body.reason;
    const note =
      typeof body?.note === "string" && body.note.trim().length > 0
        ? body.note.trim().slice(0, MISS_NOTE_MAX)
        : null;
    const difficulty = isValidDifficulty(body?.difficulty)
      ? body.difficulty
      : null;

    const read = await readPact(user.id);
    if (!read.pact || !read.entry) {
      return NextResponse.json({ error: "No pact to mark" }, { status: 404 });
    }
    if (read.entry.status === "kept") {
      // Undo the keep first; two contradictory statements about one week
      // is not a state the record should be able to hold.
      return NextResponse.json(
        { error: "You marked this week kept. Undo that first." },
        { status: 409 },
      );
    }
    // An already-scarred week can still be claimed: the lapse may have beaten
    // them to it by hours, and the whole point is to let them say what
    // happened. Only a week already claimed is refused.
    if (read.entry.claimedAt) {
      return NextResponse.json(
        { error: "You have already answered for this week" },
        { status: 409 },
      );
    }

    // Fails closed: a classifier error flags rather than waves through.
    const classification = await classifyEntry(note ?? "");
    const flagged = note !== null && classification.crisis;

    // Guarded on the two statuses a miss can be claimed from, so a racing
    // keep cannot be overwritten by a miss submitted at the same moment.
    const updated = await prisma.pactEntry.updateMany({
      where: { id: read.entry.id, status: { in: ["open", "scarred"] } },
      data: {
        status: "scarred",
        claimedAt: new Date(),
        missReason: reason,
        missNote: note,
        ...(difficulty !== null ? { difficulty } : {}),
        ...(flagged ? { flagged: true } : {}),
      },
    });
    if (updated.count === 0) {
      return NextResponse.json(
        { error: "That week has already been answered for" },
        { status: 409 },
      );
    }

    // Alongside PACT_WEEK_SCARRED, never instead of it. The scar pass fires
    // that one for lapses; this route's week may never have lapsed at all,
    // so the churn metric needs it here too or an owned miss goes uncounted.
    if (read.entry.status === "open") {
      captureServerAsync(user.id, ANALYTICS_EVENTS.PACT_WEEK_SCARRED, {
        pact_preset: read.pact.preset,
        week_number: read.weekNumber,
      });
    }
    captureServerAsync(user.id, ANALYTICS_EVENTS.PACT_WEEK_MISSED_OWNED, {
      pact_preset: read.pact.preset,
      week_number: read.weekNumber,
      miss_reason: reason,
      difficulty,
      wrote_note: note !== null,
    });

    if (flagged) {
      return NextResponse.json({ success: true, flagged: true, card: CRISIS_CARD });
    }
    return NextResponse.json({ success: true, flagged: false });
  });
}
