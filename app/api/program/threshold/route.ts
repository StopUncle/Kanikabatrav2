import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth/middleware";
import { getAccess, canAccessMemberOnly } from "@/lib/access/tier";
import { readProgram } from "@/lib/program/read";
import { isGauntletWeek } from "@/lib/program/ai/arcs";
import {
  getEnrollment,
  ensureThreshold,
  journalGateOpen,
} from "@/lib/program/ai/state";
import { logger } from "@/lib/logger";

/**
 * The Threshold: the doors for a week, and the crossing of one.
 *
 * GET generates the door texts on first touch (a few seconds, once per
 * member per week; the client shows a wait state). POST records the
 * crossing: which door, when. Both enforce the two gates together, the
 * time drip AND the journal gate; a door that is not open cannot be
 * fetched, let alone crossed.
 */

type GateResult =
  | { ok: false; res: NextResponse }
  | { ok: true; enrollment: NonNullable<Awaited<ReturnType<typeof getEnrollment>>> };

async function gates(userId: string, weekNumber: number): Promise<GateResult> {
  const refuse = (error: string, status: number): GateResult => ({
    ok: false,
    res: NextResponse.json({ error }, { status }),
  });
  const access = await getAccess(userId);
  // A4 decision: MEMBER-ONLY, same gate as intake.
  if (!canAccessMemberOnly(access)) return refuse("Membership required", 403);
  const enrollment = await getEnrollment(prisma, userId);
  if (!enrollment) return refuse("Not enrolled", 409);
  if (enrollment.pausedAt) return refuse("Program paused", 409);
  if (!Number.isInteger(weekNumber) || weekNumber < 1 || weekNumber > 12) {
    return refuse("Bad week", 400);
  }
  const program = await readProgram(prisma, userId);
  const week = program.weeks.find((w) => w.weekNumber === weekNumber);
  if (!week || week.state !== "open") return refuse("Week not open yet", 403);
  if (!(await journalGateOpen(prisma, userId, weekNumber))) {
    return refuse("Last week's journal entry opens this door", 403);
  }
  return { ok: true, enrollment };
}

export async function GET(request: NextRequest) {
  return requireAuth(request, async (req, user) => {
    const weekNumber = Number(req.nextUrl.searchParams.get("week"));
    const gate = await gates(user.id, weekNumber);
    if (!gate.ok) return gate.res;

    try {
      const threshold = await ensureThreshold(prisma, user.id, gate.enrollment, weekNumber);
      if (!threshold) {
        return NextResponse.json({ error: "Week not found" }, { status: 404 });
      }
      return NextResponse.json({
        weekNumber,
        gauntlet: isGauntletWeek(weekNumber),
        standardText: threshold.standardText,
        deeperText: threshold.deeperText,
        depth: threshold.depth,
        crossedAt: threshold.crossedAt,
      });
    } catch (err) {
      logger.error(
        "[program/threshold] door generation failed",
        err instanceof Error ? err : undefined,
      );
      return NextResponse.json(
        { error: "The doors are not ready. Try again in a minute." },
        { status: 503 },
      );
    }
  });
}

export async function POST(request: NextRequest) {
  return requireAuth(request, async (req, user) => {
    const body = await req.json().catch(() => null);
    const weekNumber = Number(body?.weekNumber);
    const depth = String(body?.depth ?? "");
    const gate = await gates(user.id, weekNumber);
    if (!gate.ok) return gate.res;

    const gauntlet = isGauntletWeek(weekNumber);
    const allowed = gauntlet ? ["gauntlet"] : ["standard", "deeper"];
    if (!allowed.includes(depth)) {
      return NextResponse.json({ error: "Bad depth" }, { status: 400 });
    }

    const existing = await prisma.programThreshold.findUnique({
      where: { userId_weekNumber: { userId: user.id, weekNumber } },
    });
    if (!existing) {
      return NextResponse.json({ error: "Fetch the doors first" }, { status: 409 });
    }
    if (existing.crossedAt) {
      // Crossing is once. A double tap is a no-op, not an error.
      return NextResponse.json({ ok: true, alreadyCrossed: true });
    }

    await prisma.programThreshold.update({
      where: { id: existing.id },
      data: { depth, crossedAt: new Date() },
    });
    return NextResponse.json({ ok: true });
  });
}
