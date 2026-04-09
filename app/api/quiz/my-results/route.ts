import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth/middleware";
import { generateDiagnosis, PersonalityType } from "@/lib/quiz-data";
import { logger } from "@/lib/logger";

export async function GET(request: NextRequest) {
  return requireAuth(request, async (_req, user) => {
    const quizResult = await prisma.quizResult.findFirst({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
    });

    if (!quizResult) {
      return NextResponse.json({ error: "No quiz results found" }, { status: 404 });
    }

    // Match by lowercased email — register stores lowercase, but historical
    // QuizResult rows may have whatever the user typed at quiz time.
    const hasBookPurchase = await prisma.purchase.findFirst({
      where: {
        customerEmail: user.email.toLowerCase(),
        type: "BOOK",
        status: "COMPLETED",
      },
    });

    const isUnlocked = quizResult.paid || !!hasBookPurchase;

    // Side-effect: lazily flip the paid flag when a book purchase exists.
    // Wrap in try/catch so a transient DB error here doesn't crash the
    // whole GET — the unlock will retry next page load.
    if (hasBookPurchase && !quizResult.paid) {
      try {
        await prisma.quizResult.update({
          where: { id: quizResult.id },
          data: { paid: true },
        });
      } catch (err) {
        logger.error(
          "[my-results] failed to lazily flip paid flag",
          err as Error,
          { userId: user.id, quizResultId: quizResult.id },
        );
      }
    }

    const diagnosis = generateDiagnosis(
      quizResult.answers as Record<number, PersonalityType>,
    );

    if (!isUnlocked) {
      return NextResponse.json({
        success: true,
        unlocked: false,
        preview: {
          primaryType: quizResult.primaryType,
          secondaryType: quizResult.secondaryType,
          scores: quizResult.scores,
        },
        quizResultId: quizResult.id,
      });
    }

    return NextResponse.json({
      success: true,
      unlocked: true,
      result: {
        id: quizResult.id,
        primaryType: quizResult.primaryType,
        secondaryType: quizResult.secondaryType,
        scores: quizResult.scores,
        diagnosis,
        createdAt: quizResult.createdAt,
      },
    });
  });
}
