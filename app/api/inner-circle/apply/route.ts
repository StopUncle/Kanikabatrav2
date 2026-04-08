import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth/middleware";
import { z } from "zod";

const applicationSchema = z.object({
  whyJoin: z.string().min(20).max(1000),
  whatHope: z.string().min(20).max(1000),
  howFound: z.string().min(1).max(500),
  agreeToGuidelines: z.literal(true),
});

export async function POST(request: NextRequest) {
  return requireAuth(request, async (_req, user) => {
    const body = await request.json();
    const parsed = applicationSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid application", details: parsed.error.flatten() },
        { status: 400 },
      );
    }

    const existing = await prisma.communityMembership.findUnique({
      where: { userId: user.id },
    });

    if (existing) {
      if (existing.status === "ACTIVE") {
        return NextResponse.json({ error: "Already an active member" }, { status: 400 });
      }
      if (existing.status === "SUSPENDED") {
        return NextResponse.json({ error: "Your membership has been suspended" }, { status: 403 });
      }
      if (existing.status === "PENDING") {
        return NextResponse.json({ error: "Application already submitted — we'll review it soon" }, { status: 400 });
      }
    }

    const membership = await prisma.communityMembership.upsert({
      where: { userId: user.id },
      create: {
        userId: user.id,
        status: "PENDING",
        applicationData: parsed.data,
        appliedAt: new Date(),
      },
      update: {
        status: "PENDING",
        applicationData: parsed.data,
        appliedAt: new Date(),
      },
    });

    return NextResponse.json(
      { success: true, membershipId: membership.id, status: "PENDING" },
      { status: 201 },
    );
  });
}

export async function GET(request: NextRequest) {
  return requireAuth(request, async (_req, user) => {
    const membership = await prisma.communityMembership.findUnique({
      where: { userId: user.id },
      select: {
        id: true,
        status: true,
        appliedAt: true,
        approvedAt: true,
        activatedAt: true,
      },
    });

    return NextResponse.json({ success: true, membership });
  });
}
