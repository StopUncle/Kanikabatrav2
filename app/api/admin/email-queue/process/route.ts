import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendEmail } from "@/lib/email";
import { requireAdminSession } from "@/lib/admin/auth";
import { buildUnsubscribeUrl } from "@/lib/unsubscribe-token";
import crypto from "crypto";

/**
 * Per-row retry policy. A row only flips to FAILED after its `attempts`
 * counter exceeds this number. Until then, the row stays PENDING and
 * `scheduledAt` is pushed forward by an exponential schedule (see
 * `nextAttemptAt`). 5 attempts across ~155 minutes is enough headroom
 * to absorb every transient I've ever seen from Resend or the wider
 * internet, while still surfacing genuinely permanent failures
 * (hard bounce, malformed address) in a reasonable window.
 */
const MAX_ATTEMPTS = 5;

/**
 * Exponential backoff schedule. attempt=1 → +5min, 2 → +10min,
 * 3 → +20min, 4 → +40min, 5 → +80min. The 15-minute cron tick means
 * a freshly-deferred row generally waits one tick past its scheduledAt
 * before the processor sees it again, which suits this curve well.
 */
function nextAttemptAt(attempts: number): Date {
  const minutes = 5 * Math.pow(2, Math.max(0, attempts - 1));
  return new Date(Date.now() + minutes * 60 * 1000);
}

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

  const email = row.recipientEmail.toLowerCase();
  const type = meta.unsubscribeType ?? "marketing";

  const user = await prisma.user.findUnique({
    where: { email },
    select: { id: true, emailPreferences: true, isBanned: true, isBot: true },
  });

  // Banned or bot accounts always skip. Non-existence is fine —
  // subscribers (mini-quiz capture, pre-account book buyers,
  // newsletter sign-ups) legitimately don't have a User row.
  if (user?.isBanned || user?.isBot) return { skip: true };

  if (user) {
    const prefs = user.emailPreferences as { marketing?: boolean } | null;
    const optedOut = prefs && (prefs as Record<string, unknown>)[type] === false;
    if (optedOut) return { skip: true };
  } else {
    // No User row — fall back to the Subscriber suppression marker
    // written by /unsubscribe. Tag shape: `unsubscribed:<type>`
    // (per-type) or generic `unsubscribed:marketing`.
    const sub = await prisma.subscriber.findUnique({
      where: { email },
      select: { tags: true },
    });
    if (sub?.tags?.some((t) => t === `unsubscribed:${type}`)) {
      return { skip: true };
    }
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://kanikarose.com";
  // POST one-click endpoint for RFC 8058. The clickable link in the
  // email body footer (already baked into htmlBody at enqueue time)
  // points at /unsubscribe; this header points at the API endpoint.
  // Token is keyed by userId when we have one, by email otherwise —
  // the unsubscribe handler resolves either to the right rows.
  const token = buildUnsubscribeUrl(
    user ? { userId: user.id, type } : { email, type },
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
 *  - `x-cron-secret: <CRON_SECRET>` header, for scheduled cron callers.
 *    Must match CRON_SECRET specifically; we deliberately do NOT fall back
 *    to ADMIN_SECRET because that secret has broader semantics (it's the
 *    legacy admin-panel guard) and a leak there would also blast real
 *    transactional emails to every queued recipient. Cron and admin
 *    secrets must be distinct.
 *  - `admin_session` httpOnly cookie, for manual admin-panel triggering.
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
    let deferred = 0;
    let skipped = 0;

    for (const email of pendingEmails) {
      // Per-iteration helper that decides between deferring (still
      // PENDING, future scheduledAt, bumped attempts) and giving up
      // (FAILED). Reused by both the "sendEmail returned false" and
      // the "exception thrown" arms so the policy stays in one place.
      const recordFailure = async (errorMessage: string) => {
        const nextAttempts = email.attempts + 1;
        if (nextAttempts >= MAX_ATTEMPTS) {
          await prisma.emailQueue.update({
            where: { id: email.id },
            data: {
              status: "FAILED",
              attempts: nextAttempts,
              lastErrorAt: new Date(),
              lastError: errorMessage.slice(0, 2000),
            },
          });
          failed++;
        } else {
          await prisma.emailQueue.update({
            where: { id: email.id },
            data: {
              status: "PENDING",
              attempts: nextAttempts,
              scheduledAt: nextAttemptAt(nextAttempts),
              lastErrorAt: new Date(),
              lastError: errorMessage.slice(0, 2000),
            },
          });
          deferred++;
        }
      };

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
            data: {
              status: "SENT",
              sentAt: new Date(),
              // Don't clear `attempts` on success; the row's history is
              // still useful for queue-health dashboards. Do clear the
              // error string so it isn't confusingly stale on a row that
              // ultimately delivered.
              lastError: null,
            },
          });
          sent++;
        } else {
          // sendEmail returns false (doesn't throw) when all retries
          // are exhausted. Pre-2026-05-24 this was a silent loss; we
          // now defer with backoff and only escalate to FAILED after
          // MAX_ATTEMPTS.
          console.error(
            `[email-queue] sendEmail returned false for ${email.id} to ${email.recipientEmail}`,
          );
          await recordFailure("sendEmail returned false (retries exhausted)");
        }
      } catch (error) {
        console.error(
          `[email-queue] exception sending ${email.id} to ${email.recipientEmail}:`,
          error,
        );
        await recordFailure(
          error instanceof Error ? error.message : String(error),
        );
      }
    }

    return NextResponse.json({
      success: true,
      dryRun: false,
      processed: pendingEmails.length,
      sent,
      // `failed` is the count of rows that exhausted MAX_ATTEMPTS this
      // tick and are now permanently marked FAILED. `deferred` is the
      // count of rows that failed this tick but will be retried later.
      // Distinguishing the two lets a queue-health dashboard show
      // transient blips separately from real problems.
      failed,
      deferred,
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
