import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth/middleware";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  return requireAuth(request, async (_req, user) => {
    const { subscriptionId } = await request.json();

    if (!subscriptionId) {
      return NextResponse.json({ error: "Missing subscriptionId" }, { status: 400 });
    }

    const membership = await prisma.communityMembership.findUnique({
      where: { userId: user.id },
    });

    if (!membership || membership.paypalSubscriptionId !== subscriptionId) {
      return NextResponse.json({ error: "Subscription mismatch" }, { status: 400 });
    }

    const now = new Date();
    const expiresAt = new Date(now);
    expiresAt.setMonth(expiresAt.getMonth() + 1);

    await prisma.communityMembership.update({
      where: { userId: user.id },
      data: {
        status: "ACTIVE",
        activatedAt: now,
        expiresAt,
      },
    });

    try {
      const existingWelcome = await prisma.feedPost.findFirst({
        where: { type: "AUTOMATED", metadata: { path: ["type"], equals: "welcome" } },
      });

      if (!existingWelcome) {
        await prisma.feedPost.create({
          data: {
            title: "Welcome to The Inner Circle",
            content: "This is your space. A private community of women navigating power dynamics, dark psychology, and the realities no one else talks about.\n\nHere's what to explore:\n\n\u2022 **The Feed** \u2014 Posts, discussions, and announcements\n\u2022 **Voice Notes** \u2014 Raw, unfiltered insights from Kanika\n\u2022 **The Classroom** \u2014 Courses on dark psychology, pattern recognition, and career strategy\n\nThis community is vetted and moderated. Every member is here for a reason. Every comment is reviewed.\n\nWelcome to the other side.",
            type: "ANNOUNCEMENT",
            isPinned: true,
            metadata: { type: "welcome", automated: true },
          },
        });
      }
    } catch {
      // Non-critical -- don't break activation
    }

    return NextResponse.json({ success: true, status: "ACTIVE" });
  });
}
