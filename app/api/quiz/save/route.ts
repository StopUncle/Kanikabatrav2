import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth/middleware";

export async function POST(request: NextRequest) {
  return requireAuth(request, async (_req, user) => {
    const body = await request.json();
    const { scores, primaryType, secondaryType, answers } = body;

    if (!scores || !primaryType || !answers) {
      return NextResponse.json({ error: "Missing quiz data" }, { status: 400 });
    }

    const existing = await prisma.quizResult.findFirst({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
    });

    let quizResult;
    if (existing) {
      quizResult = await prisma.quizResult.update({
        where: { id: existing.id },
        data: { scores, primaryType, secondaryType, answers, email: user.email },
      });
    } else {
      quizResult = await prisma.quizResult.create({
        data: {
          userId: user.id,
          email: user.email,
          scores,
          primaryType,
          secondaryType: secondaryType || null,
          answers,
          paid: false,
          emailSent: false,
          shared: false,
        },
      });
    }

    return NextResponse.json({ success: true, quizResultId: quizResult.id });
  });
}
