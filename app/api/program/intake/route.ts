import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth/middleware";
import { getAccess, canTrain } from "@/lib/access/tier";
import { generateRead } from "@/lib/program/ai/generate";
import { logger } from "@/lib/logger";

/**
 * Enrollment in The Twelve: the four intake questions in, the Read out.
 *
 * The intake stores free text as given and nothing else. There is no
 * clinical field and none may be added here: the distinction between what a
 * member volunteers and what a screen administers is the load-bearing wall
 * of the whole compliance design (docs/AI-PROGRAM-SPEC.md).
 *
 * Generation is synchronous. The letter takes a handful of seconds and the
 * intake screen holds a "she is reading" state for it; that wait is a
 * product moment, not a defect. Day 0 is one sitting: intake, the Read,
 * the first Threshold.
 */

const MAX_ANSWER = 2000;

export async function POST(request: NextRequest) {
  return requireAuth(request, async (req, user) => {
    // A4 decision: TRAINING TIER (Pact or Consilium). The Twelve's
    // standalone-purchase wiring is a later lane; until it exists, any paid
    // rung is the gate.
    const access = await getAccess(user.id);
    if (!canTrain(access)) {
      return NextResponse.json(
        { error: "This needs an active subscription. The Pact opens it." },
        { status: 403 },
      );
    }

    const existing = await prisma.programEnrollment.findUnique({
      where: { userId: user.id },
      select: { id: true },
    });
    if (existing) {
      return NextResponse.json({ error: "Already enrolled" }, { status: 409 });
    }

    const body = await req.json().catch(() => null);
    const situation = String(body?.situation ?? "").trim();
    const counterpart = String(body?.counterpart ?? "").trim();
    const lastFailure = String(body?.lastFailure ?? "").trim();
    const goal = String(body?.goal ?? "").trim();
    // The Threshold disclosure and the age gate are both required and both
    // recorded. Enrollment cannot exist without the deliberate yes.
    const agreed = body?.agreedAiTerms === true;
    const adult = body?.confirmedAdult === true;

    if (!situation || !counterpart || !lastFailure || !goal) {
      return NextResponse.json(
        { error: "All four questions need an answer" },
        { status: 400 },
      );
    }
    if ([situation, counterpart, lastFailure, goal].some((a) => a.length > MAX_ANSWER)) {
      return NextResponse.json({ error: "Answers are capped at 2000 characters" }, { status: 400 });
    }
    if (!agreed || !adult) {
      return NextResponse.json(
        { error: "The program needs the disclosure accepted and your confirmation you are 18 or over" },
        { status: 400 },
      );
    }

    // Background for the Read, never recited back: the axis names of their
    // latest quiz result, if one is linked to this account.
    const quiz = await prisma.quizResult.findFirst({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
      select: { primaryType: true },
    });

    try {
      const { letter, model } = await generateRead(
        { situation, counterpart, lastFailure, goal },
        quiz?.primaryType ? `primary axis ${quiz.primaryType}` : null,
      );

      const enrollment = await prisma.programEnrollment.create({
        data: {
          userId: user.id,
          situation,
          counterpart,
          lastFailure,
          goal,
          readLetter: letter,
          readModel: model,
          agreedAiTermsAt: new Date(),
        },
      });

      return NextResponse.json({ id: enrollment.id, readLetter: letter });
    } catch (err) {
      logger.error(
        "[program/intake] read generation failed",
        err instanceof Error ? err : undefined,
      );
      return NextResponse.json(
        { error: "She could not finish your Read. Nothing was saved; try again in a minute." },
        { status: 503 },
      );
    }
  });
}
