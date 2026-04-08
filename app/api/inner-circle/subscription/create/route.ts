import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth/middleware";
import { prisma } from "@/lib/prisma";
import { createLemonCheckout, LS_VARIANTS } from "@/lib/lemonsqueezy";

export async function POST(request: NextRequest) {
  return requireAuth(request, async (_req, user) => {
    const membership = await prisma.communityMembership.findUnique({
      where: { userId: user.id },
    });

    if (!membership || membership.status === "PENDING") {
      return NextResponse.json(
        { error: "Application must be approved before subscribing" },
        { status: 403 },
      );
    }

    if (membership.status === "ACTIVE" && membership.billingCycle !== "trial") {
      return NextResponse.json(
        { error: "Already an active subscriber" },
        { status: 400 },
      );
    }

    if (membership.status === "SUSPENDED") {
      return NextResponse.json(
        { error: "Membership suspended" },
        { status: 403 },
      );
    }

    const dbUser = await prisma.user.findUnique({
      where: { id: user.id },
      select: { email: true, name: true },
    });

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://kanikarose.com";

    try {
      const result = await createLemonCheckout(LS_VARIANTS.INNER_CIRCLE, {
        email: dbUser?.email || user.email,
        name: dbUser?.name || undefined,
        customData: { userId: user.id },
        redirectUrl: `${baseUrl}/inner-circle/success`,
      });

      const checkoutUrl = result.data?.data?.attributes?.url;

      if (!checkoutUrl) {
        return NextResponse.json(
          { error: "Failed to create checkout" },
          { status: 500 },
        );
      }

      return NextResponse.json({
        success: true,
        checkoutUrl,
      });
    } catch (error) {
      console.error("Lemon Squeezy subscription error:", error);
      return NextResponse.json(
        { error: "Failed to create subscription checkout" },
        { status: 500 },
      );
    }
  });
}
