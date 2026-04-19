import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendEmail } from "@/lib/email";
import { requireAdminSession } from "@/lib/admin/auth";
import crypto from "crypto";

/**
 * Accepts either:
 *  - `x-cron-secret: <CRON_SECRET>` header — for scheduled cron callers.
 *    Must match CRON_SECRET specifically; we deliberately do NOT fall back
 *    to ADMIN_SECRET because that secret has broader semantics (it's the
 *    legacy admin-panel guard) and a leak there would also blast real
 *    transactional emails to every queued recipient. Cron and admin
 *    secrets must be distinct.
 *  - `admin_session` httpOnly cookie — for manual admin-panel triggering.
 *
 * Uses constant-time comparison to avoid timing oracle on the cron secret.
 *
 * Returns null on success (caller proceeds) or a 401 NextResponse on
 * failure.
 */
async function authorize(request: NextRequest): Promise<NextResponse | null> {
  const cronHeader = request.headers.get("x-cron-secret");
  const expected = process.env.CRON_SECRET;
  if (cronHeader && expected) {
    const a = Buffer.from(cronHeader);
    const b = Buffer.from(expected);
    if (a.length === b.length && crypto.timingSafeEqual(a, b)) {
      return null;
    }
  }
  return await requireAdminSession();
}

export async function POST(request: NextRequest) {
  const unauthorized = await authorize(request);
  if (unauthorized) return unauthorized;

  try {
    const body = await request.json().catch(() => ({}));
    const dryRun = body.dryRun !== false;

    const pendingEmails = await prisma.emailQueue.findMany({
      where: {
        status: "PENDING",
        scheduledAt: { lte: new Date() },
      },
      orderBy: { scheduledAt: "asc" },
      take: 50,
    });

    if (dryRun) {
      return NextResponse.json({
        success: true,
        dryRun: true,
        processed: pendingEmails.length,
        sent: 0,
        failed: 0,
        emails: pendingEmails.map((e) => ({
          id: e.id,
          recipientEmail: e.recipientEmail,
          subject: e.subject,
          sequence: e.sequence,
          step: e.step,
          scheduledAt: e.scheduledAt,
        })),
      });
    }

    let sent = 0;
    let failed = 0;

    for (const email of pendingEmails) {
      try {
        const ok = await sendEmail({
          to: email.recipientEmail,
          subject: email.subject,
          html: email.htmlBody,
        });

        if (ok) {
          await prisma.emailQueue.update({
            where: { id: email.id },
            data: { status: "SENT", sentAt: new Date() },
          });
          sent++;
        } else {
          // sendEmail returns false (doesn't throw) when all retries
          // are exhausted. Previously this was not caught, so the row
          // was marked SENT despite zero delivery.
          console.error(
            `[email-queue] sendEmail returned false for ${email.id} to ${email.recipientEmail}`,
          );
          await prisma.emailQueue.update({
            where: { id: email.id },
            data: { status: "FAILED" },
          });
          failed++;
        }
      } catch (error) {
        console.error(
          `[email-queue] exception sending ${email.id} to ${email.recipientEmail}:`,
          error,
        );

        await prisma.emailQueue.update({
          where: { id: email.id },
          data: { status: "FAILED" },
        });

        failed++;
      }
    }

    return NextResponse.json({
      success: true,
      dryRun: false,
      processed: pendingEmails.length,
      sent,
      failed,
    });
  } catch (error) {
    console.error("Error processing email queue:", error);
    return NextResponse.json(
      { error: "Failed to process email queue" },
      { status: 500 },
    );
  }
}
