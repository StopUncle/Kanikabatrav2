import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  calculateScores,
  getPersonalityTypes,
  PersonalityType,
} from "@/lib/quiz-data";
import { enforceRateLimit, getClientIp, limits } from "@/lib/rate-limit";
import {
  buildAttributionRecord,
  type AttributionPayload,
} from "@/lib/attribution";

/**
 * Quiz-unlock abandonment drip. Only fires when the taker provided an
 * email; anonymous takes are unreachable. Idempotent per email: a
 * re-take within the drip window won't double-enqueue.
 */
async function enqueueAbandonmentDrip(
  recipientEmail: string,
  name: string,
  quizResultId: string,
): Promise<void> {
  try {
    const existing = await prisma.emailQueue.findFirst({
      where: {
        recipientEmail,
        sequence: "quiz-unlock-abandonment",
        status: "PENDING",
      },
      select: { id: true },
    });
    if (existing) return;

    const { buildQuizUnlockAbandonmentDrip } = await import(
      "@/lib/email-sequences"
    );
    const entries = buildQuizUnlockAbandonmentDrip(
      recipientEmail,
      name,
      quizResultId,
    );
    await prisma.emailQueue.createMany({ data: entries });
  } catch (err) {
    console.error("[quiz/submit] abandonment enqueue failed:", err);
  }
}

export async function POST(request: NextRequest) {
  try {
    // Quiz is public (no auth) so limit by IP. 10/day is more than enough
    // for legitimate retakes but stops bot farms from spamming the DB.
    const ip = getClientIp(request);
    const rateLimited = await enforceRateLimit(limits.quizSubmit, ip);
    if (rateLimited) return rateLimited;

    const { answers, email, attribution, resultId } =
      (await request.json()) as {
        answers?: Record<number, PersonalityType>;
        email?: string;
        attribution?: AttributionPayload;
        resultId?: string;
      };

    // Second call for the same anonymous take. The visitor finished the
    // quiz (row already written on results-page load) and has now handed
    // over an email at the auth gate. Attach it to the existing row
    // rather than writing a duplicate take.
    if (typeof resultId === "string" && resultId.length > 0) {
      const row = await prisma.quizResult.findFirst({
        where: { id: resultId, userId: null },
        select: {
          id: true,
          email: true,
          primaryType: true,
          secondaryType: true,
          scores: true,
        },
      });

      if (!row) {
        return NextResponse.json({ error: "Result not found" }, { status: 404 });
      }

      if (email && !row.email) {
        const recipientEmail = email.toLowerCase();
        await prisma.quizResult.update({
          where: { id: row.id },
          data: { email: recipientEmail },
        });
        await enqueueAbandonmentDrip(recipientEmail, "there", row.id);
      }

      return NextResponse.json({
        resultId: row.id,
        primaryType: row.primaryType,
        secondaryType: row.secondaryType,
        scores: row.scores,
      });
    }

    if (!answers || typeof answers !== "object") {
      return NextResponse.json(
        { error: "Invalid answers format" },
        { status: 400 },
      );
    }

    const scores = calculateScores(answers as Record<number, PersonalityType>);
    const types = getPersonalityTypes(scores);

    // Anonymous quiz takes are the cleanest pre-funnel attribution
    // signal. Most quiz takers aren't registered yet, so this row
    // captures source for visitors who would otherwise be invisible
    // until they convert.
    const attrRecord = buildAttributionRecord(attribution, request.headers);

    const quizResult = await prisma.quizResult.create({
      data: {
        email: email ? email.toLowerCase() : null,
        primaryType: types.primary,
        secondaryType: types.secondary,
        scores: JSON.parse(JSON.stringify(scores)),
        answers: JSON.parse(JSON.stringify(answers)),
        paid: false,
        emailSent: false,
        shared: false,
        ...attrRecord,
      },
    });

    if (email) {
      await enqueueAbandonmentDrip(email.toLowerCase(), "there", quizResult.id);
    }

    return NextResponse.json({
      resultId: quizResult.id,
      primaryType: types.primary,
      secondaryType: types.secondary,
      scores,
    });
  } catch (error) {
    console.error("Error submitting quiz:", error);
    return NextResponse.json(
      { error: "Failed to submit quiz" },
      { status: 500 },
    );
  }
}
