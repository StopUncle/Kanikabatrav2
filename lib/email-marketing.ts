/**
 * Marketing-email subsystem.
 *
 * Builds on the EXISTING granular preferences system already wired
 * into this codebase:
 *
 *   - `User.emailPreferences` (JSONB) holds per-type toggles:
 *       { marketing, productUpdates, sessionReminders, weeklyDigest }
 *     Default is all-true; null is treated as default.
 *   - `lib/unsubscribe-token.ts` signs scoped JWTs and exposes
 *     `buildUnsubscribeUrl({ userId, type })`.
 *   - `app/unsubscribe/page.tsx` consumes those tokens, flips the
 *     pref, and renders a confirmation. No login required.
 *   - `app/api/user/settings/route.ts` GET/PUT lets the profile UI
 *     read + write the prefs.
 *
 * This module ties those together with two helpers every marketing
 * send MUST go through:
 *
 *   - `sendMarketingEmail({ to, subject, html, type })` — looks up
 *     the recipient's pref, skips if opted out, otherwise wraps
 *     the HTML in a luxury shell + attaches RFC 8058 List-Unsubscribe
 *     headers + appends an unsubscribe + manage-preferences footer.
 *
 *   - `marketingFooterHtml(userId, type, recipientEmail)` — the
 *     standardized footer block, exposed for legacy templates that
 *     can't (yet) flow through `sendMarketingEmail`.
 *
 * Transactional sends — book delivery, password reset, coaching
 * receipts — keep using `sendEmail` directly. CAN-SPAM permits them
 * without unsubscribe; we don't want to give people a way to lose
 * their book download links by clicking the wrong button.
 */
import { prisma } from "@/lib/prisma";
import { sendEmail } from "@/lib/email";
import { logger } from "@/lib/logger";
import {
  buildUnsubscribeUrl,
  type UnsubscribeType,
} from "@/lib/unsubscribe-token";
import {
  marketingFooterHtml,
  marketingFooterByEmailHtml,
} from "@/lib/email-footer";

// Re-exported for compatibility with existing call sites that
// imported from this module.
export { marketingFooterHtml, marketingFooterByEmailHtml };

interface EmailPreferences {
  marketing?: boolean;
  productUpdates?: boolean;
  sessionReminders?: boolean;
  weeklyDigest?: boolean;
}

/** Default = opted-in (matches DEFAULT_PREFERENCES in /api/user/settings). */
function isOptedIn(prefs: unknown, type: UnsubscribeType): boolean {
  if (!prefs || typeof prefs !== "object") return true;
  const p = prefs as EmailPreferences;
  return p[type] !== false;
}

/**
 * Standardized footer for marketing emails. Renders:
 *   - "You're getting this because..." line
 *   - One-click unsubscribe (signed token, no login)
 *   - Manage preferences (links to /profile)
 *   - Sender legal line (kanikarose.com + recipient email)
 *
 * The `type` is what gets switched off — usually "marketing", but
 * "productUpdates" or "weeklyDigest" can also flow through here.
 */
interface MarketingEmailOptions {
  to: string;
  subject: string;
  /** Inner HTML body — the footer is appended automatically. */
  html: string;
  /** Plain-text fallback. Auto-generated from html if omitted. */
  text?: string;
  /**
   * Which preference key gates this send. Defaults to "marketing".
   * Use "productUpdates" for changelog-style sends, "weeklyDigest"
   * for the digest, etc. The unsubscribe link in the footer
   * targets the SAME key, so opting out of a productUpdates email
   * only switches off productUpdates — marketing keeps flowing.
   */
  type?: UnsubscribeType;
  /**
   * Internal campaign tag for analytics — recorded as the
   * X-Marketing-Campaign header. Free-form short string like
   * "drip-quiz-week-1".
   */
  campaign?: string;
}

interface SendResult {
  sent: boolean;
  reason?:
    | "no-user"
    | "banned"
    | "bot"
    | "opted-out"
    | "transport-failed";
}

/**
 * Send a marketing email IF the recipient is opted in. Non-throwing
 * — callers iterating over a recipient list can rely on a clean
 * per-recipient outcome.
 */
export async function sendMarketingEmail(
  options: MarketingEmailOptions,
): Promise<SendResult> {
  const email = options.to.toLowerCase();
  const type: UnsubscribeType = options.type ?? "marketing";

  const user = await prisma.user.findUnique({
    where: { email },
    select: {
      id: true,
      emailPreferences: true,
      isBanned: true,
      isBot: true,
    },
  });

  if (!user) return { sent: false, reason: "no-user" };
  if (user.isBanned) return { sent: false, reason: "banned" };
  if (user.isBot) return { sent: false, reason: "bot" };
  if (!isOptedIn(user.emailPreferences, type)) {
    return { sent: false, reason: "opted-out" };
  }

  const footer = marketingFooterHtml(user.id, type, email);
  const fullHtml = options.html.includes("</body>")
    ? options.html.replace("</body>", `${footer}</body>`)
    : `${options.html}\n${footer}`;

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://kanikarose.com";
  // RFC 8058 List-Unsubscribe URL must accept POST. We have a
  // dedicated /api/marketing/unsubscribe-oneclick endpoint for that.
  // The clickable footer link in the email body still points at
  // /unsubscribe (a rendered confirmation page) — header and body
  // intentionally use different URLs to satisfy both flows.
  const oneClickToken = buildUnsubscribeUrl(
    { userId: user.id, type },
    baseUrl,
  ).split("token=")[1];
  const oneClickUrl = `${baseUrl}/api/marketing/unsubscribe-oneclick?token=${oneClickToken}`;

  try {
    const ok = await sendEmail({
      to: email,
      subject: options.subject,
      html: fullHtml,
      text: options.text,
      headers: {
        "List-Unsubscribe": `<${oneClickUrl}>, <mailto:unsubscribe@kanikarose.com>`,
        "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
        "List-ID": `<marketing.${baseUrl.replace(/^https?:\/\//, "")}>`,
        "X-Marketing-Campaign": options.campaign ?? "uncategorised",
      },
    });
    if (!ok) return { sent: false, reason: "transport-failed" };
    return { sent: true };
  } catch (e) {
    logger.error(
      `sendMarketingEmail failed for ${email}`,
      e instanceof Error ? e : new Error(String(e)),
    );
    return { sent: false, reason: "transport-failed" };
  }
}

/**
 * Helper for batch sends. Iterates with a small concurrency limit
 * (5 at a time) so we don't blow up the SMTP / Resend quotas. Returns
 * a tally of outcomes.
 */
export async function sendMarketingEmailBatch(
  recipients: Array<{ email: string; name?: string }>,
  build: (recipient: { email: string; name?: string }) => MarketingEmailOptions,
  concurrency = 5,
): Promise<Record<string, number>> {
  const tally: Record<string, number> = {
    sent: 0,
    "no-user": 0,
    banned: 0,
    bot: 0,
    "opted-out": 0,
    "transport-failed": 0,
  };

  const queue = [...recipients];
  async function worker() {
    while (queue.length > 0) {
      const r = queue.shift();
      if (!r) return;
      const result = await sendMarketingEmail(build(r));
      const key = result.sent ? "sent" : (result.reason ?? "transport-failed");
      tally[key] = (tally[key] ?? 0) + 1;
    }
  }
  await Promise.all(Array.from({ length: concurrency }, worker));
  return tally;
}
