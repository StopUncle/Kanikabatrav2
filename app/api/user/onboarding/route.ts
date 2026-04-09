import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth/middleware";

/**
 * Marks the current user's Inner Circle onboarding tour as seen. Called
 * when the user dismisses the welcome modal. Idempotent — calling it
 * multiple times just re-sets the timestamp, no harm.
 */
export async function POST(request: NextRequest) {
  return requireAuth(request, async (_req, user) => {
    await prisma.user.update({
      where: { id: user.id },
      data: { onboardingSeenAt: new Date() },
    });
    return NextResponse.json({ success: true });
  });
}
