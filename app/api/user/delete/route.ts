import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyAccessToken } from "@/lib/auth/jwt";
import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";

export async function DELETE(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let payload;
    try {
      payload = verifyAccessToken(accessToken);
    } catch {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const body = await request.json();
    const { confirmEmail } = body;

    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      select: { email: true },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (confirmEmail !== user.email) {
      return NextResponse.json(
        { error: "Email does not match" },
        { status: 400 },
      );
    }

    // Cancel any active Stripe subscription BEFORE deleting the user.
    // The cascade deletes CommunityMembership (which holds the Stripe
    // subscription ID), so we must grab it first. Without this, the
    // user's card keeps getting charged after account deletion.
    const membership = await prisma.communityMembership.findUnique({
      where: { userId: payload.userId },
      select: { paypalSubscriptionId: true, status: true },
    });
    if (
      membership?.paypalSubscriptionId?.startsWith("ST-") &&
      membership.status === "ACTIVE"
    ) {
      try {
        const stripeSubId = membership.paypalSubscriptionId.replace("ST-", "");
        await stripe.subscriptions.cancel(stripeSubId);
      } catch (err) {
        console.error(
          "[user/delete] failed to cancel Stripe subscription:",
          err,
        );
        // Continue with deletion — the user explicitly requested it.
        // A dangling sub will hit dunning and auto-cancel eventually.
      }
    }

    await prisma.user.delete({
      where: { id: payload.userId },
    });

    cookieStore.delete("accessToken");
    cookieStore.delete("refreshToken");

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
