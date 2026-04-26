import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendEmail } from "@/lib/email";
import { requireAdminSession } from "@/lib/admin/auth";
import { buildUnsubscribeUrl } from "@/lib/unsubscribe-token";
import crypto from "crypto";

interface QueueMetadata {
  isMarketing?: boolean;
  unsubscribeType?: "marketing" | "productUpdates" | "sessionReminders" | "weeklyDigest";
  campaign?: string;
}

/**
 * For marketing rows, re-check the opt-out preference at SEND time
 * (not enqueue time) and skip if the user has opted out since the
 * row was queued. Also computes the List-Unsubscribe headers needed
 * for inbox-level unsubscribe rendering. Returns null when the row
 * should be sent normally (opt-out check passed or this is a
 * transactional row), or `{ skip: true }` when the row should be
 * marked CANCELLED instead of SENT.
 */
async function marketingPreflight(
  row: { recipientEmail: string; metadata: unknown },
): Promise<
  | { skip: false; headers?: Record<string, string> }
  | { skip: true }
> {
  const meta = (row.metadata as QueueMetadata | null) ?? {};
  if (!meta.isMarketing) return { skip: false };

  const user = await prisma.user.findUnique({
    where: { email: row.recipientEmail.toLowerCase() },
    select: { id: true, emailPreferences: true, isBanned: true, isBot: true },
  });
  if (!user || user.isBanned || user.isBot) return { skip: true };
  const prefs = user.emailPreferences as { marketing?: boolean } | null;
  const type = meta.unsubscribeType ?? "marketing";
  const optedOut = prefs && (prefs as Record<string, unknown>)[type] === false;
  if (optedOut) return { skip: true };

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://kanikarose.com";
  // POST one-click endpoint for RFC 8058. The clickable link in the
  // email body footer (already baked into htmlBody at enqueue time)
  // points at /unsubscribe; this header points at the API endpoint.
  const token = buildUnsubscribeUrl(
    { userId: user.id, type },
    baseUrl,
  ).split("token=")[1];
  const oneClickUrl = `${baseUrl}/api/marketing/unsubscribe-oneclick?token=${token}`;
  return {
    skip: false,
    headers: {
      "List-Unsubscribe": `<${oneClickUrl}>, <mailto:unsubscribe@kanikarose.com>`,
      "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
      "List-ID": `<marketing.${baseUrl.replace(/^https?:\/\//, "")}>`,
      "X-Marketing-Campaign": meta.campaign ?? "uncategorised",
    },
  };
}

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
    let skipped = 0;

    for (const email of pendingEmails) {
      try {
        // Late-bound opt-out + List-Unsubscribe header injection for
        // marketing rows. A user who opts out 3 days after we
        // enqueued their drip email shouldn't still receive it.
        const preflight = await marketingPreflight(email);
        if (preflight.skip) {
          await prisma.emailQueue.update({
            where: { id: email.id },
            data: { status: "CANCELLED", sentAt: new Date() },
          });
          skipped++;
          continue;
        }

        const ok = await sendEmail({
          to: email.recipientEmail,
          subject: email.subject,
          html: email.htmlBody,
          headers: preflight.headers,
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
      skipped, // marketing rows where the user opted out post-enqueue
    });
  } catch (error) {
    console.error("Error processing email queue:", error);
    return NextResponse.json(
      { error: "Failed to process email queue" },
      { status: 500 },
    );
  }
}
