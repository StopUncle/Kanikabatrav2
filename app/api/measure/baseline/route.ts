/**
 * POST /api/measure/baseline
 *
 * Submit a sitting of the Baseline Read. The server grades it, stores
 * the attempt, seeds The Mark's ledger, and returns the reveal. The
 * client never holds the answer key, so it cannot mark its own work.
 *
 * Body: { answers: [{ itemId, choiceId, answerMs? }] }
 */

import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth/middleware";
import { checkMembership } from "@/lib/community/membership";
import { gradeBaseline } from "@/lib/mark/baseline";
import { BASELINE_ITEMS_VERSION } from "@/lib/mark/baseline-items";
import { recordEncounters } from "@/lib/mark/encounters";
import { grantStanding } from "@/lib/standing/grant";
import { STANDING } from "@/lib/standing/config";
import { logger } from "@/lib/logger";

/**
 * A first sitting is always allowed. A retake waits three weeks: the
 * Baseline Read only means something if it is the same test taken from
 * a genuinely different position, and a member who can grind it daily
 * ends up measuring their memory of twelve items instead of their read.
 * Daily reps are what Tells are for.
 */
const RETAKE_COOLDOWN_DAYS = 21;

const Body = z.object({
  answers: z
    .array(
      z.object({
        itemId: z.string().min(1).max(120),
        choiceId: z.string().min(1).max(40).nullable(),
        answerMs: z
          .number()
          .int()
          .min(0)
          .max(10 * 60 * 1000)
          .nullable()
          .optional(),
      }),
    )
    .min(1)
    .max(60),
});

export async function POST(request: NextRequest) {
  return requireAuth(request, async (req, user) => {
    const { isMember } = await checkMembership(user.id);
    if (!isMember) {
      return NextResponse.json(
        { error: "Membership required" },
        { status: 403 },
      );
    }

    let body: z.infer<typeof Body>;
    try {
      body = Body.parse(await req.json());
    } catch {
      return NextResponse.json({ error: "Invalid submission" }, { status: 400 });
    }

    const last = await prisma.baselineAttempt.findFirst({
      where: { userId: user.id },
      orderBy: { takenAt: "desc" },
      select: { takenAt: true },
    });
    if (last) {
      const nextAvailableAt = new Date(
        last.takenAt.getTime() + RETAKE_COOLDOWN_DAYS * 24 * 60 * 60 * 1000,
      );
      if (nextAvailableAt > new Date()) {
        return NextResponse.json(
          {
            error: "Too soon for another read",
            nextAvailableAt: nextAvailableAt.toISOString(),
          },
          { status: 429 },
        );
      }
    }

    const grade = gradeBaseline(body.answers);

    const attempt = await prisma.baselineAttempt.create({
      data: {
        userId: user.id,
        itemsVersion: BASELINE_ITEMS_VERSION,
        answers: grade.records as unknown as Prisma.InputJsonValue,
        correctCount: grade.correctCount,
        itemCount: grade.itemCount,
      },
      select: { id: true },
    });

    // Ledger and Standing both hang off a finished sitting and neither
    // may take the response down with it: the member has already done
    // the work, so they see their reveal even if a write behind it
    // stumbles. recordEncounters swallows its own errors by design.
    await recordEncounters(prisma, {
      userId: user.id,
      source: "BASELINE",
      encounters: grade.encounters,
    });

    // Standing pays for the sitting, never for the result. The Mark
    // measures the read; Standing measures showing up; they do not talk.
    let standing = null;
    try {
      standing = await grantStanding(prisma, {
        userId: user.id,
        source: "BASELINE",
        amount: STANDING.BASELINE,
        refId: attempt.id,
        dedupe: true,
      });
    } catch (error) {
      logger.error("[baseline] standing grant failed", error as Error);
    }

    return NextResponse.json({
      attemptId: attempt.id,
      headline: grade.headline,
      subline: grade.subline,
      correctCount: grade.correctCount,
      itemCount: grade.itemCount,
      reveal: grade.reveal,
      rangUp: standing?.rangUp ?? null,
    });
  });
}
