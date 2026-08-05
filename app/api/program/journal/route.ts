import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth/middleware";
import { getAccess, canTrain } from "@/lib/access/tier";
import { readProgram } from "@/lib/program/read";
import { classifyEntry, CRISIS_CARD } from "@/lib/program/ai/safety";
import { getEnrollment } from "@/lib/program/ai/state";
import { logger } from "@/lib/logger";

/**
 * The journal: one entry per week, written once, after the work.
 *
 * The crisis classifier runs BEFORE storage. A flagged entry stores with
 * the fixed card as its reply immediately, in full, and never enters the
 * generation queue: there is no window where a crisis entry sits waiting
 * for a machine to answer it in her voice.
 *
 * A clean entry stores with a reply due 40 to 70 minutes out. The delay is
 * a design decision, not a queue artefact: an instant reply reads as
 * processed, a delayed one as read. The draw is deterministic per entry so
 * retries cannot reroll it.
 */

const MIN_BODY = 20;
const MAX_BODY = 8000;

/** 40 to 70 minutes, deterministic from the entry's identity. */
function replyDelayMs(userId: string, weekNumber: number): number {
  let hash = 0;
  const key = `${userId}:${weekNumber}`;
  for (let i = 0; i < key.length; i++) {
    hash = (hash * 31 + key.charCodeAt(i)) >>> 0;
  }
  return (40 + (hash % 31)) * 60 * 1000;
}

export async function POST(request: NextRequest) {
  return requireAuth(request, async (req, user) => {
    // A4 decision: MEMBER-ONLY, same gate as the rest of The Twelve.
    const access = await getAccess(user.id);
    if (!canTrain(access)) {
      return NextResponse.json({ error: "Membership required" }, { status: 403 });
    }
    const enrollment = await getEnrollment(prisma, user.id);
    if (!enrollment) {
      return NextResponse.json({ error: "Not enrolled" }, { status: 409 });
    }

    const body = await req.json().catch(() => null);
    const weekNumber = Number(body?.weekNumber);
    const text = String(body?.body ?? "").trim();

    if (!Number.isInteger(weekNumber) || weekNumber < 1 || weekNumber > 12) {
      return NextResponse.json({ error: "Bad week" }, { status: 400 });
    }
    if (text.length < MIN_BODY) {
      return NextResponse.json(
        { error: "An entry is a few honest sentences, minimum" },
        { status: 400 },
      );
    }
    if (text.length > MAX_BODY) {
      return NextResponse.json({ error: "Entries are capped at 8000 characters" }, { status: 400 });
    }

    // The entry belongs to a crossed Threshold: the door is the commitment,
    // the entry is the account of keeping it.
    const threshold = await prisma.programThreshold.findUnique({
      where: { userId_weekNumber: { userId: user.id, weekNumber } },
      select: { crossedAt: true },
    });
    if (!threshold?.crossedAt) {
      return NextResponse.json(
        { error: "Cross this week's Threshold before you write about it" },
        { status: 403 },
      );
    }
    const program = await readProgram(prisma, user.id);
    const week = program.weeks.find((w) => w.weekNumber === weekNumber);
    if (!week || week.state !== "open") {
      return NextResponse.json({ error: "Week not open" }, { status: 403 });
    }

    const existing = await prisma.journalEntry.findUnique({
      where: { userId_weekNumber: { userId: user.id, weekNumber } },
      select: { id: true },
    });
    if (existing) {
      return NextResponse.json(
        { error: "This week's entry is written. It is a ritual, not a thread." },
        { status: 409 },
      );
    }

    const classification = await classifyEntry(text);

    if (classification.crisis) {
      const entry = await prisma.journalEntry.create({
        data: {
          userId: user.id,
          weekNumber,
          body: text,
          flagged: true,
          reply: CRISIS_CARD,
          replyModel: "fixed-card",
          replyDueAt: new Date(),
        },
      });
      logger.warn("[program/journal] crisis-flagged entry", { entryId: entry.id });
      return NextResponse.json({ id: entry.id, reply: CRISIS_CARD, flagged: true });
    }

    const dueAt = new Date(Date.now() + replyDelayMs(user.id, weekNumber));
    const entry = await prisma.journalEntry.create({
      data: {
        userId: user.id,
        weekNumber,
        body: text,
        replyDueAt: dueAt,
        // Targeting is not a crisis: the entry stores clean and the reply
        // generator receives the classification and redirects to
        // observation. Recorded via reviewedAt staying null + admin queue.
      },
    });

    // The delivery layer's completion row keeps Standing, the Today card and
    // graduation working exactly as before; the journal entry is the AI
    // layer's record of the same act.
    await prisma.weekCompletion.upsert({
      where: { userId_weekNumber: { userId: user.id, weekNumber } },
      create: { userId: user.id, weekNumber, reflection: null },
      update: {},
    });

    return NextResponse.json({
      id: entry.id,
      replyDueAt: dueAt,
      targeting: classification.targeting,
    });
  });
}
