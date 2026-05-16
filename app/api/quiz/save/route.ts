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

    // Only stamp attribution on CREATE, never overwrite on update.
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
      const attrRecord = buildAttributionRecord(attribution, request.headers);
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

    // Quiz-unlock abandonment drip. Save endpoint runs for logged-in
    // takers whose email is always present. Skip if the user already
    // unlocked this (or a prior) result; the drip is purely for
    // unpaid quizzes. Idempotent on PENDING entries.
    if (!quizResult.paid) {
      try {
        const recipientEmail = user.email.toLowerCase();
        const existing = await prisma.emailQueue.findFirst({
          where: {
            recipientEmail,
            sequence: "quiz-unlock-abandonment",
            status: "PENDING",
          },
          select: { id: true },
        });
        if (!existing) {
          // UserSession from requireAuth doesn't carry name; look it
          // up so the drip greeting isn't a generic "there" for every
          // logged-in quiz taker.
          const dbUser = await prisma.user.findUnique({
            where: { id: user.id },
            select: { name: true },
          });
          const { buildQuizUnlockAbandonmentDrip } = await import(
            "@/lib/email-sequences"
          );
          const entries = buildQuizUnlockAbandonmentDrip(
            recipientEmail,
            dbUser?.name || "there",
            quizResult.id,
          );
          await prisma.emailQueue.createMany({ data: entries });
        }
      } catch (err) {
        console.error("[quiz/save] abandonment enqueue failed:", err);
      }
    }

    return NextResponse.json({ success: true, quizResultId: quizResult.id });
  });
}
