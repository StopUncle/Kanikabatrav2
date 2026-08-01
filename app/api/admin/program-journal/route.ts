import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdminSession } from "@/lib/admin/auth";

/**
 * The admin review queue for The Twelve's journal.
 *
 * Flagged entries first, then the weekly sample of clean exchanges. Her
 * name is on every generated word, so the queue is not optional plumbing:
 * it is the standing check that the voice has not drifted, and the place a
 * crisis flag is seen by a human.
 */

export async function GET(request: NextRequest) {
  const unauthorized = await requireAdminSession();
  if (unauthorized) return unauthorized;

  const filter = request.nextUrl.searchParams.get("filter") ?? "unreviewed";
  const where =
    filter === "flagged"
      ? { flagged: true }
      : filter === "all"
        ? {}
        : { reviewedAt: null };

  const entries = await prisma.journalEntry.findMany({
    where,
    orderBy: [{ flagged: "desc" }, { createdAt: "desc" }],
    take: 50,
    include: {
      user: { select: { email: true, name: true } },
    },
  });

  return NextResponse.json({
    entries: entries.map((e) => ({
      id: e.id,
      weekNumber: e.weekNumber,
      member: e.user.name || e.user.email,
      body: e.body,
      reply: e.reply,
      replyModel: e.replyModel,
      flagged: e.flagged,
      reviewedAt: e.reviewedAt,
      createdAt: e.createdAt,
    })),
  });
}

export async function PATCH(request: NextRequest) {
  const unauthorized = await requireAdminSession();
  if (unauthorized) return unauthorized;

  const body = await request.json().catch(() => null);
  const id = String(body?.id ?? "");
  if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });

  await prisma.journalEntry.update({
    where: { id },
    data: { reviewedAt: new Date() },
  });
  return NextResponse.json({ ok: true });
}
