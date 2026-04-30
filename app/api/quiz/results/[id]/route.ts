import { NextRequest, NextResponse } from "next/server";
import { resolveActiveUserId } from "@/lib/auth/resolve-user";
import { prisma } from "@/lib/prisma";
import {
  PERSONALITY_PROFILES,
  PersonalityType,
  QuizScores,
} from "@/lib/quiz-data";

interface RouteParams {
  params: Promise<{ id: string }>;
}

/**
 * Look up the current viewer (if any) from the access-token cookie.
 * Uses the ban-aware resolver so banned / tokenVersion-revoked / deleted
 * accounts can't read their historical quiz results with a stale JWT.
 * Returns null when there's no valid session.
 */
async function getViewerUserId(): Promise<string | null> {
  return resolveActiveUserId();
}

export async function GET(_request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;

    // Quiz results are personal data. A logged-in user can only read their
    // own row; anonymous viewers get nothing. (We used to let anonymous
    // viewers see results with the email redacted, that's been removed
    // because owners want their results strictly private, and the post-
    // submit landing flow can rely on sessionStorage + /api/quiz/save
    // instead of a public result-by-id endpoint.)
    const viewerUserId = await getViewerUserId();
    if (!viewerUserId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const quizResult = await prisma.quizResult.findUnique({
      where: { id },
    });

    if (!quizResult || quizResult.userId !== viewerUserId) {
      // Same 404 for missing + not-yours so IDs aren't enumerable.
      return NextResponse.json({ error: "Result not found" }, { status: 404 });
    }

    const primaryType = quizResult.primaryType as PersonalityType;
    const secondaryType = quizResult.secondaryType as PersonalityType | null;
    const scores = quizResult.scores as unknown as QuizScores;

    const primaryProfile = PERSONALITY_PROFILES[primaryType];
    const secondaryProfile = secondaryType
      ? PERSONALITY_PROFILES[secondaryType]
      : null;

    return NextResponse.json({
      id: quizResult.id,
      email: quizResult.email,
      primaryType,
      secondaryType,
      scores,
      primaryProfile,
      secondaryProfile,
      paid: quizResult.paid,
      shared: quizResult.shared,
      createdAt: quizResult.createdAt,
    });
  } catch (error) {
    console.error("Error fetching quiz result:", error);
    return NextResponse.json(
      { error: "Failed to fetch result" },
      { status: 500 },
    );
  }
}

export async function PATCH(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;

    // Mutations require auth + ownership. Previously this endpoint had ZERO
    // auth, anyone with a result ID could change the email or shared flag.
    const viewerUserId = await getViewerUserId();
    if (!viewerUserId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 },
      );
    }

    const existing = await prisma.quizResult.findUnique({
      where: { id },
      select: { userId: true },
    });
    if (!existing) {
      return NextResponse.json({ error: "Result not found" }, { status: 404 });
    }
    if (existing.userId !== viewerUserId) {
      return NextResponse.json({ error: "Result not found" }, { status: 404 });
    }

    const { email, shared } = await request.json();

    const updateData: { email?: string; shared?: boolean } = {};
    if (email !== undefined) {
      // Validate email format before storing.
      if (typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return NextResponse.json(
          { error: "Invalid email format" },
          { status: 400 },
        );
      }
      updateData.email = email.toLowerCase().trim();
    }
    if (shared !== undefined) {
      if (typeof shared !== "boolean") {
        return NextResponse.json(
          { error: "shared must be a boolean" },
          { status: 400 },
        );
      }
      updateData.shared = shared;
    }

    const quizResult = await prisma.quizResult.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json({ success: true, result: quizResult });
  } catch (error) {
    console.error("Error updating quiz result:", error);
    return NextResponse.json(
      { error: "Failed to update result" },
      { status: 500 },
    );
  }
}
