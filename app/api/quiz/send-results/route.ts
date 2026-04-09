import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendQuizResults } from "@/lib/email";
import {
  PERSONALITY_PROFILES,
  PersonalityType,
  QuizScores,
  generateDiagnosis,
} from "@/lib/quiz-data";

interface SendResultsRequest {
  quizResultId: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: SendResultsRequest = await request.json();

    if (!body.quizResultId) {
      return NextResponse.json(
        { error: "Missing quizResultId" },
        { status: 400 },
      );
    }

    const quizResult = await prisma.quizResult.findUnique({
      where: { id: body.quizResultId },
    });

    if (!quizResult) {
      return NextResponse.json(
        { error: "Quiz result not found" },
        { status: 404 },
      );
    }

    if (!quizResult.paid) {
      return NextResponse.json(
        { error: "Payment required to send results" },
        { status: 403 },
      );
    }

    if (!quizResult.email) {
      return NextResponse.json(
        { error: "No email address on file" },
        { status: 400 },
      );
    }

    if (quizResult.emailSent) {
      return NextResponse.json({
        success: true,
        message: "Email already sent",
        email: quizResult.email,
      });
    }

    const primaryType = quizResult.primaryType as PersonalityType;
    const secondaryType = quizResult.secondaryType as PersonalityType;
    const scores = quizResult.scores as unknown as QuizScores;
    const answers = quizResult.answers as Record<number, PersonalityType>;

    const primaryProfile = PERSONALITY_PROFILES[primaryType];
    const secondaryProfile = PERSONALITY_PROFILES[secondaryType];
    const diagnosis = generateDiagnosis(answers);

    const emailSent = await sendQuizResults({
      email: quizResult.email,
      primaryType,
      secondaryType,
      scores: scores as unknown as Record<string, number>,
      diagnosis: {
        clinicalLabel: diagnosis.clinicalLabel,
        functioningLevel: diagnosis.functioningLevel,
        functioningScore: diagnosis.functioningScore,
        description: diagnosis.description,
      },
      primaryProfile: {
        name: primaryProfile.name,
        tagline: primaryProfile.tagline,
        description: primaryProfile.description,
        traits: primaryProfile.traits,
        strengths: primaryProfile.strengths,
        blindSpots: primaryProfile.blindSpots,
        relationshipPattern: primaryProfile.relationshipPattern,
      },
      secondaryProfile: {
        name: secondaryProfile.name,
        tagline: secondaryProfile.tagline,
        description: secondaryProfile.description,
      },
    });

    if (emailSent) {
      await prisma.quizResult.update({
        where: { id: body.quizResultId },
        data: { emailSent: true },
      });
      return NextResponse.json({
        success: true,
        email: quizResult.email,
        message: "Results sent successfully",
      });
    }

    // Email transport failed. Returning 200 with success:false meant client
    // code calling `response.ok` would treat it as success — user told to
    // check inbox, no email actually sent. Return 502 so the UI can retry
    // or surface a real error to the user.
    return NextResponse.json(
      {
        success: false,
        email: quizResult.email,
        message: "Email delivery failed. Please try again or contact support.",
      },
      { status: 502 },
    );
  } catch (error) {
    console.error("Error sending quiz results:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
