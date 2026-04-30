import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { prisma } from "@/lib/prisma";
import {
  sendBookDelivery,
  sendEmail,
  sendInnerCircleWelcomeNewUser,
} from "@/lib/email";
import { logger } from "@/lib/logger";

// JWT signing for the welcome-email reset token. Must match the
// secret the webhook used so reset-password validates it.
function getJwtSecretForReset(): string {
  const s = process.env.JWT_SECRET;
  if (!s) throw new Error("JWT_SECRET not configured");
  return s;
}

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
              subject: `Customer hasn't received their book, ${purchase.customerName}`,
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
              "[retry-emails] permanent delivery failure, admin alerted",
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

    // Second pass: welcome-email failures (INNER_CIRCLE + BOOK_CONSILIUM
    // bundles). When an auto-created user's welcome email fails silently,
    // they pay monthly but can never log in. The webhook flags these by
    // setting metadata.emailDeliveryFailed + welcomeEmailRecipient; this
    // loop regenerates the password-reset JWT and retries.
    const failedWelcomeEmails = await prisma.purchase.findMany({
      where: {
        status: "COMPLETED",
        metadata: {
          path: ["emailDeliveryFailed"],
          equals: true,
        },
        // downloadToken null → BOOK-branch already handled above. This
        // matches membership/bundle rows where the email is a welcome-
        // not-delivery email.
        NOT: { downloadToken: { not: null } },
      },
      orderBy: { createdAt: "asc" },
      take: 10,
    });

    const welcomeResults: {
      id: string;
      email: string;
      success: boolean;
    }[] = [];

    for (const purchase of failedWelcomeEmails) {
      const metadata = (purchase.metadata as Record<string, unknown>) || {};
      const retryCount = (metadata.emailRetryCount as number) || 0;
      const userId = metadata.welcomeEmailUserId as string | undefined;
      const recipient = metadata.welcomeEmailRecipient as string | undefined;
      const recipientName =
        (metadata.welcomeEmailRecipientName as string | undefined) || "Member";

      // Missing metadata → can't retry. Skip silently; admin will need
      // to resend manually from the admin panel.
      if (!userId || !recipient) continue;

      if (retryCount >= 5) {
        if (!metadata.adminAlertSent) {
          try {
            const adminEmail =
              process.env.ADMIN_EMAIL || "Kanika@kanikarose.com";
            await sendEmail({
              to: adminEmail,
              subject: `Member locked out, welcome email failed (${purchase.customerEmail})`,
              html: `
                <p style="font-family: Georgia, serif; font-size: 16px; color: #f5f0ed;">Hey Kanika,</p>
                <p style="font-family: Georgia, serif; font-size: 15px; color: #94a3b8; line-height: 1.6;">
                  A member paid but the welcome email containing their password-reset link never delivered after several tries. Their account exists with a random password, they can't log in.
                </p>
                <table style="font-family: Georgia, serif; font-size: 14px; color: #94a3b8; background: #1a0d11; padding: 16px; border-radius: 8px; margin: 16px 0;">
                  <tr><td style="padding: 4px 12px 4px 0;"><strong style="color: #d4af37;">Name:</strong></td><td>${recipientName}</td></tr>
                  <tr><td style="padding: 4px 12px 4px 0;"><strong style="color: #d4af37;">Email:</strong></td><td>${recipient}</td></tr>
                  <tr><td style="padding: 4px 12px 4px 0;"><strong style="color: #d4af37;">Product:</strong></td><td>${(metadata.productKey as string) || "unknown"}</td></tr>
                  <tr><td style="padding: 4px 12px 4px 0;"><strong style="color: #d4af37;">Amount:</strong></td><td>$${purchase.amount}</td></tr>
                </table>
                <p style="font-family: Georgia, serif; font-size: 15px; color: #94a3b8; line-height: 1.6;">
                  Go to the <strong>Admin → Purchases</strong> page and manually send a password-reset link. Or reach out directly.
                </p>
              `,
            });
            await prisma.purchase.update({
              where: { id: purchase.id },
              data: {
                metadata: {
                  ...metadata,
                  adminAlertSent: true,
                  adminAlertAt: new Date().toISOString(),
                },
              },
            });
          } catch (err) {
            logger.error(
              "[retry-emails] failed to send admin alert for welcome-email failure",
              err as Error,
              { purchaseId: purchase.id, email: recipient },
            );
          }
        }
        continue;
      }

      // Regenerate a fresh 7-day reset token, the original is likely
      // expired by the time we're retrying (the cron runs infrequently).
      let sent = false;
      try {
        const resetToken = jwt.sign(
          { userId, type: "password-reset", v: 0 },
          getJwtSecretForReset(),
          { expiresIn: "7d" },
        );
        sent = await sendInnerCircleWelcomeNewUser(
          recipient,
          recipientName,
          resetToken,
        );
      } catch (err) {
        logger.error(
          "[retry-emails] welcome email retry threw",
          err as Error,
          { purchaseId: purchase.id, email: recipient },
        );
      }

      await prisma.purchase.update({
        where: { id: purchase.id },
        data: {
          metadata: {
            ...metadata,
            emailDeliveryFailed: !sent,
            emailRetryCount: retryCount + 1,
            lastRetryAt: new Date().toISOString(),
            ...(sent
              ? { welcomeEmailDeliveredAt: new Date().toISOString() }
              : {}),
          },
        },
      });

      welcomeResults.push({
        id: purchase.id,
        email: recipient,
        success: sent,
      });
    }

    return NextResponse.json({
      processed: results.length + welcomeResults.length,
      succeeded:
        results.filter((r) => r.success).length +
        welcomeResults.filter((r) => r.success).length,
      failed:
        results.filter((r) => !r.success).length +
        welcomeResults.filter((r) => !r.success).length,
      bookResults: results,
      welcomeResults,
    });
  } catch (error) {
    console.error("Cron retry-emails error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
