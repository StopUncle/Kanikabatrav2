import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendBookDelivery, sendEmail } from "@/lib/email";
import { logger } from "@/lib/logger";

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
      orderBy: { createdAt: "asc" },
      take: 10,
    });

    const results: { id: string; email: string; success: boolean }[] = [];

    for (const purchase of failedPurchases) {
      const metadata = (purchase.metadata as Record<string, unknown>) || {};
      const retryCount = (metadata.emailRetryCount as number) || 0;

      // Stop retrying after 5 total attempts AND escalate to admin so the
      // customer doesn't sit forever with a paid order and no book.
      if (retryCount >= 5) {
        if (!metadata.adminAlertSent) {
          try {
            const adminEmail = process.env.ADMIN_EMAIL || "Kanika@kanikarose.com";
            await sendEmail({
              to: adminEmail,
              subject: `Customer hasn't received their book — ${purchase.customerName}`,
              html: `
                <p style="font-family: Georgia, serif; font-size: 16px; color: #f5f0ed;">Hey Kanika,</p>
                <p style="font-family: Georgia, serif; font-size: 15px; color: #94a3b8; line-height: 1.6;">
                  A customer paid for the book but we couldn't get the download email delivered after several tries. They've been waiting.
                </p>
                <table style="font-family: Georgia, serif; font-size: 14px; color: #94a3b8; background: #1a0d11; padding: 16px; border-radius: 8px; margin: 16px 0;">
                  <tr><td style="padding: 4px 12px 4px 0;"><strong style="color: #d4af37;">Name:</strong></td><td>${purchase.customerName}</td></tr>
                  <tr><td style="padding: 4px 12px 4px 0;"><strong style="color: #d4af37;">Email:</strong></td><td>${purchase.customerEmail}</td></tr>
                  <tr><td style="padding: 4px 12px 4px 0;"><strong style="color: #d4af37;">Amount:</strong></td><td>$${purchase.amount}</td></tr>
                  <tr><td style="padding: 4px 12px 4px 0;"><strong style="color: #d4af37;">Ordered:</strong></td><td>${new Date(purchase.createdAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</td></tr>
                </table>
                <p style="font-family: Georgia, serif; font-size: 15px; color: #94a3b8; line-height: 1.6;">
                  Go to the <strong>Admin → Purchases</strong> page and click "Resend Download" next to their name to manually send it. Or reply to their email directly.
                </p>
              `,
            });
            await prisma.purchase.update({
              where: { id: purchase.id },
              data: {
                metadata: { ...metadata, adminAlertSent: true, adminAlertAt: new Date().toISOString() },
              },
            });
            logger.error(
              "[retry-emails] permanent delivery failure — admin alerted",
              undefined,
              { purchaseId: purchase.id, email: purchase.customerEmail },
            );
          } catch (err) {
            logger.error(
              "[retry-emails] failed to send admin alert for permanent delivery failure",
              err as Error,
              { purchaseId: purchase.id, email: purchase.customerEmail },
            );
          }
        }
        continue;
      }

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
