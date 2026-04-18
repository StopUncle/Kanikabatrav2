import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { resolveActiveUserIdFromRequest } from "@/lib/auth/resolve-user";

// Force dynamic rendering to prevent static generation errors
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    // SECURITY: Only allow authenticated users to view their own purchases.
    // resolveActiveUserIdFromRequest returns null for banned /
    // tokenVersion-revoked / deleted accounts so stale tokens can't leak
    // historical purchase history.
    const userId = await resolveActiveUserIdFromRequest(request);
    if (!userId) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 },
      );
    }

    // Look up the canonical email from the DB rather than trusting the
    // (potentially stale) email baked into the JWT at login time.
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { email: true },
    });
    if (!user) {
      return NextResponse.json(
        { error: "Account not found" },
        { status: 404 },
      );
    }
    // Purchase rows store the email as typed at Stripe checkout (mixed
    // case), while User rows normalise to lowercase. Case-insensitive
    // match so a buyer who typed Alice@Gmail.com still sees their books.
    const purchases = await prisma.purchase.findMany({
      where: {
        customerEmail: { equals: user.email, mode: "insensitive" },
        status: "COMPLETED",
      },
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        type: true,
        productVariant: true,
        amount: true,
        downloadToken: true,
        downloadCount: true,
        maxDownloads: true,
        expiresAt: true,
        createdAt: true,
        lastDownloadAt: true,
      },
    });

    // Generate download URLs for book purchases
    const purchasesWithUrls = purchases.map(
      (purchase: (typeof purchases)[0]) => ({
        ...purchase,
        downloadUrl:
          purchase.type === "BOOK" && purchase.downloadToken
            ? `${process.env.NEXT_PUBLIC_BASE_URL}/api/download?token=${purchase.downloadToken}`
            : null,
        isExpired: purchase.expiresAt ? purchase.expiresAt < new Date() : false,
        remainingDownloads: purchase.maxDownloads - purchase.downloadCount,
      }),
    );

    return NextResponse.json(
      {
        success: true,
        purchases: purchasesWithUrls,
      },
      { status: 200 },
    );
  } catch (error: unknown) {
    console.error("Purchases fetch error:", error);

    return NextResponse.json(
      { error: "Failed to fetch purchases" },
      { status: 500 },
    );
  }
}
