import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth/middleware";
import {
  buildAttributionRecord,
  type AttributionPayload,
} from "@/lib/attribution";

export async function POST(request: NextRequest) {
  return requireAuth(request, async (_req, user) => {
    const body = await request.json();
    const { scores, primaryType, secondaryType, answers, attribution } =
      body as {
        scores: unknown;
        primaryType: string;
        secondaryType?: string;
        answers: unknown;
        attribution?: AttributionPayload;
      };

    if (!scores || !primaryType || !answers) {
      return NextResponse.json({ error: "Missing quiz data" }, { status: 400 });
    }

    const existing = await prisma.quizResult.findFirst({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
    });

    // Only stamp attribution on CREATE — never overwrite on update.
    // First-touch wins (same rule as the localStorage TTL on the
    // client). Otherwise a returning user retaking the quiz would
    // lose their original source.
    let quizResult;
    if (existing) {
      quizResult = await prisma.quizResult.update({
        where: { id: existing.id },
        data: { scores, primaryType, secondaryType, answers, email: user.email },
      });
    } else {
      const attrRecord = buildAttributionRecord(attribution, request);
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
          ...attrRecord,
        },
      });
    }

    return NextResponse.json({ success: true, quizResultId: quizResult.id });
  });
}
