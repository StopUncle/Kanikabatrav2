import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendBookDelivery } from "@/lib/email";

export async function POST(request: NextRequest) {
  // Verify cron secret to prevent unauthorized access
  const authHeader = request.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET || process.env.ADMIN_SECRET;

  if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Find all purchases where email delivery failed and haven't exceeded retry limit
    const failedPurchases = await prisma.purchase.findMany({
      where: {
        type: "BOOK",
        status: "COMPLETED",
        downloadToken: { not: null },
        metadata: {
          path: ["emailDeliveryFailed"],
          equals: true,
        },
      },
      orderBy: { createdAt: "desc" },
      take: 5,
    });

    const results: { id: string; email: string; success: boolean }[] = [];

    for (const purchase of failedPurchases) {
      const metadata = (purchase.metadata as Record<string, unknown>) || {};
      const retryCount = (metadata.emailRetryCount as number) || 0;

      // Stop retrying after 5 total attempts
      if (retryCount >= 5) continue;

      const sent = await sendBookDelivery(
        purchase.customerEmail,
        purchase.customerName,
        purchase.downloadToken!,
        purchase.productVariant ?? null,
        purchase.expiresAt || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      );

      await prisma.purchase.update({
        where: { id: purchase.id },
        data: {
          metadata: {
            ...metadata,
            emailDeliveryFailed: !sent,
            emailRetryCount: retryCount + 1,
            lastRetryAt: new Date().toISOString(),
            ...(sent ? { emailDeliveredAt: new Date().toISOString() } : {}),
          },
        },
      });

      results.push({
        id: purchase.id,
        email: purchase.customerEmail,
        success: sent,
      });
    }

    return NextResponse.json({
      processed: results.length,
      succeeded: results.filter((r) => r.success).length,
      failed: results.filter((r) => !r.success).length,
      results,
    });
  } catch (error) {
    console.error("Cron retry-emails error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
