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

export async function POST(request: NextRequest) {
  try {
    // Quiz is public (no auth) so limit by IP. 10/day is more than enough
    // for legitimate retakes but stops bot farms from spamming the DB.
    const ip = getClientIp(request);
    const rateLimited = await enforceRateLimit(limits.quizSubmit, ip);
    if (rateLimited) return rateLimited;

    const { answers, email, attribution } = (await request.json()) as {
      answers: Record<number, PersonalityType>;
      email?: string;
      attribution?: AttributionPayload;
    };

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
        email: email || null,
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
