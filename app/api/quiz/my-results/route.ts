import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth/middleware";
import { generateDiagnosis, PersonalityType } from "@/lib/quiz-data";

export async function GET(request: NextRequest) {
  return requireAuth(request, async (_req, user) => {
    const quizResult = await prisma.quizResult.findFirst({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
    });

    if (!quizResult) {
      return NextResponse.json({ error: "No quiz results found" }, { status: 404 });
    }

    const hasBookPurchase = await prisma.purchase.findFirst({
      where: {
        customerEmail: user.email,
        type: "BOOK",
        status: "COMPLETED",
      },
    });

    const isUnlocked = quizResult.paid || !!hasBookPurchase;

    if (hasBookPurchase && !quizResult.paid) {
      await prisma.quizResult.update({
        where: { id: quizResult.id },
        data: { paid: true },
      });
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
