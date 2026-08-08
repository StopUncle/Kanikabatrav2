import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth/middleware";
import { prisma } from "@/lib/prisma";
import { readPact } from "@/lib/pact/read";
import { getAccess } from "@/lib/access/tier";
import { captureServerAsync } from "@/lib/analytics/server";
import { ANALYTICS_EVENTS } from "@/lib/analytics/events";
import { isValidDifficulty, canUndoKeep } from "@/lib/pact/reflection";

/**
 * "I kept it." Self-reported on purpose: the signature is a commitment to
 * honesty, and the product's whole bet is that a promise to yourself with
 * your name on it is worth more than a checkbox someone verifies. Only the
 * current, still-open week can be kept; a week that has ended is a scar
 * and stays one.
 */
export async function POST(request: NextRequest) {
  return requireAuth(request, async (req, user) => {
    // Optional: how hard the week was, 1-10. Rates the challenge, not the
    // member. A bad value is dropped rather than 400ing, because losing a
    // rating must never cost somebody the keep it came attached to.
    const body = (await req.json().catch(() => null)) as {
      difficulty?: unknown;
    } | null;
    const difficulty = isValidDifficulty(body?.difficulty)
      ? body.difficulty
      : null;

    // A lapsed subscription keeps its record readable but not writable.
    const access = await getAccess(user.id);
    if (!access.pactEntitled) {
      return NextResponse.json(
        { error: "The Pact is not active on this account" },
        { status: 403 },
      );
    }

    const read = await readPact(user.id);
    if (!read.pact || !read.entry) {
      return NextResponse.json({ error: "No pact to keep" }, { status: 404 });
    }
    if (read.entry.status === "kept") {
      return NextResponse.json({ success: true, status: "kept" });
    }
    if (read.entry.status !== "open") {
      return NextResponse.json(
        { error: "That week has already closed" },
        { status: 409 },
      );
    }

    // Guarded on status so a racing scar pass cannot be overwritten after
    // the week has ended.
    const updated = await prisma.pactEntry.updateMany({
      where: { id: read.entry.id, status: "open" },
      data: { status: "kept", ...(difficulty !== null ? { difficulty } : {}) },
    });
    if (updated.count === 0) {
      return NextResponse.json(
        { error: "That week has already closed" },
        { status: 409 },
      );
    }

    // The retention metric. Week one kept is the number that says whether
    // the product works; the same event at week five says whether it lasts.
    captureServerAsync(user.id, ANALYTICS_EVENTS.PACT_WEEK_KEPT, {
      pact_preset: read.pact.preset,
      week_number: read.weekNumber,
      difficulty,
    });

    return NextResponse.json({ success: true, status: "kept", difficulty });
  });
}

/**
 * "That was a mistake." Takes a keep back, while the week is still running.
 *
 * Keep is not a destructive action, so this is not a safety net; it is about
 * the record being TRUE. A mis-tapped keep is a lie sitting permanently in
 * the one artefact whose entire value is that it does not lie, and the
 * member has no other way to correct it.
 *
 * Bounded to the live week on purpose. Once the week closes the row is
 * history, and history does not get edited: allowing a late undo would make
 * every kept week provisional and the record worth nothing.
 */
export async function DELETE(request: NextRequest) {
  return requireAuth(request, async (_req, user) => {
    const access = await getAccess(user.id);
    if (!access.pactEntitled) {
      return NextResponse.json(
        { error: "The Pact is not active on this account" },
        { status: 403 },
      );
    }

    const read = await readPact(user.id);
    if (!read.pact || !read.entry || !read.weekEndsAt) {
      return NextResponse.json({ error: "No pact to undo" }, { status: 404 });
    }
    if (read.entry.status === "open") {
      return NextResponse.json({ success: true, status: "open" });
    }
    if (read.entry.status !== "kept") {
      return NextResponse.json(
        { error: "A scar cannot be undone" },
        { status: 409 },
      );
    }
    if (!canUndoKeep(read.weekEndsAt)) {
      return NextResponse.json(
        { error: "That week has closed. It stands as it is." },
        { status: 409 },
      );
    }

    // Guarded on "kept" so a racing scar pass cannot be reopened, which
    // would hand back a week the member had already lost.
    const updated = await prisma.pactEntry.updateMany({
      where: { id: read.entry.id, status: "kept" },
      data: { status: "open", difficulty: null },
    });
    if (updated.count === 0) {
      return NextResponse.json(
        { error: "That week has closed. It stands as it is." },
        { status: 409 },
      );
    }

    captureServerAsync(user.id, ANALYTICS_EVENTS.PACT_KEEP_UNDONE, {
      pact_preset: read.pact.preset,
      week_number: read.weekNumber,
    });

    return NextResponse.json({ success: true, status: "open" });
  });
}
