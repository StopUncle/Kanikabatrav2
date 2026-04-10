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
              subject: `[ACTION REQUIRED] Book delivery permanently failed for ${purchase.customerEmail}`,
              html: `
                <p>The retry-emails cron has exhausted 5 attempts to deliver the book to:</p>
                <ul>
                  <li><strong>Customer:</strong> ${purchase.customerName}</li>
                  <li><strong>Email:</strong> ${purchase.customerEmail}</li>
                  <li><strong>Purchase ID:</strong> ${purchase.id}</li>
                  <li><strong>Amount:</strong> $${purchase.amount}</li>
                  <li><strong>Created:</strong> ${purchase.createdAt}</li>
                </ul>
                <p>Manual follow-up required. The customer paid but never received the download link.</p>
                <p>Use <code>/admin/purchases</code> or <code>/api/admin/send-download-link</code> to resend manually.</p>
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
