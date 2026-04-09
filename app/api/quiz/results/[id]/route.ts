import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyAccessToken } from "@/lib/auth/jwt";
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
 * Returns null when there's no valid session — quiz results are designed to
 * be viewable by an anonymous taker too (the immediately-after-quiz landing
 * page), so missing auth is not itself an error.
 */
async function getViewerUserId(): Promise<string | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;
  if (!token) return null;
  try {
    const payload = verifyAccessToken(token);
    return payload.userId;
  } catch {
    return null;
  }
}

export async function GET(_request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;

    const quizResult = await prisma.quizResult.findUnique({
      where: { id },
    });

    if (!quizResult) {
      return NextResponse.json({ error: "Result not found" }, { status: 404 });
    }

    // Ownership check: a logged-in viewer can ONLY read their own result.
    // Anonymous viewers can read any result (the post-submit page needs this
    // before the user has an account), but we redact the email for them so
    // result IDs can't be enumerated to harvest emails.
    const viewerUserId = await getViewerUserId();
    const isOwner =
      viewerUserId !== null && quizResult.userId === viewerUserId;
    const isAnonymousViewer = viewerUserId === null;

    if (!isOwner && !isAnonymousViewer) {
      // Logged in but viewing someone else's result — block.
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
      // Only return the email to its owner — anonymous viewers see null so a
      // result ID can't be used as an email lookup.
      email: isOwner ? quizResult.email : null,
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
    // auth — anyone with a result ID could change the email or shared flag.
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
