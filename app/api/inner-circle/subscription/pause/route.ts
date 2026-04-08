import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth/middleware";

export async function POST(request: NextRequest) {
  return requireAuth(request, async (_req, user) => {
    const membership = await prisma.communityMembership.findUnique({
      where: { userId: user.id },
    });

    if (!membership || membership.status !== "ACTIVE") {
      return NextResponse.json({ error: "No active membership to pause" }, { status: 400 });
    }

    const pauseUntil = new Date();
    pauseUntil.setDate(pauseUntil.getDate() + 30);

    await prisma.communityMembership.update({
      where: { userId: user.id },
      data: {
        status: "SUSPENDED",
        suspendedAt: new Date(),
        suspendReason: "member-requested-pause",
        expiresAt: pauseUntil,
      },
    });

    return NextResponse.json({
      success: true,
      pausedUntil: pauseUntil.toISOString(),
      message: "Your membership has been paused for 30 days. You can resume anytime.",
    });
  });
}
