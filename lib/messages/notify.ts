/**
 * Off-site notification for a new direct message from Kanika to a member.
 *
 * Fire-and-forget and fully best-effort: a failure here must never block or
 * fail the send itself. Two channels, in order of immediacy:
 *   1. Web push (if the member installed the PWA and opted in) — instant.
 *   2. Email — the durable fallback so a message is never silently missed.
 *
 * Only fires for the admin -> member direction. A member replying notifies
 * Kanika through the admin inbox badge, not push/email.
 */

import { sendPushToUser } from "@/lib/push";
import { sendEmail } from "@/lib/email";

interface NotifyTarget {
  id: string;
  email: string | null;
  displayName: string | null;
  name: string | null;
}

function baseUrl(): string {
  return (
    process.env.NEXT_PUBLIC_BASE_URL?.replace(/\/$/, "") ||
    "https://kanikarose.com"
  );
}

export async function notifyMemberOfDirectMessage(
  member: NotifyTarget,
  preview: string,
): Promise<void> {
  const url = "/consilium/messages";
  const snippet = preview.length > 120 ? `${preview.slice(0, 117)}...` : preview;

  // Push — collapses to a single entry via the shared tag so a burst of
  // messages doesn't stack on the lock screen.
  await sendPushToUser(member.id, "directMessage", {
    title: "Kanika sent you a message",
    body: snippet,
    url,
    tag: "direct-message",
  }).catch(() => {
    /* best-effort */
  });

  if (!member.email) return;

  const firstName = (member.displayName || member.name || "").split(" ")[0];
  const greeting = firstName ? `Hi ${firstName},` : "Hi,";
  const link = `${baseUrl()}${url}`;

  await sendEmail({
    to: member.email,
    subject: "Kanika sent you a private message",
    html: `
      <div style="font-family: -apple-system, Segoe UI, Roboto, sans-serif; max-width: 480px; margin: 0 auto; color: #1a1a1a;">
        <p style="font-size: 16px;">${greeting}</p>
        <p style="font-size: 16px; line-height: 1.6;">
          Kanika just sent you a private message in the Inner Circle.
        </p>
        <p style="font-size: 16px; line-height: 1.6; padding: 16px; background: #f5f3ee; border-left: 3px solid #d4af37; border-radius: 4px; color: #333;">
          ${escapeHtml(snippet)}
        </p>
        <p style="margin: 28px 0;">
          <a href="${link}" style="display: inline-block; background: #0a0a0a; color: #d4af37; text-decoration: none; padding: 12px 28px; border-radius: 999px; font-size: 14px; letter-spacing: 0.05em;">
            Read &amp; reply
          </a>
        </p>
        <p style="font-size: 13px; color: #888;">This is a one-to-one message. Only you and Kanika can see it.</p>
      </div>
    `,
  }).catch(() => {
    /* best-effort */
  });
}

/**
 * Tell Kanika a member has opened a NEW private thread (first contact). Only
 * fires on conversation creation, not on every member reply, so her inbox
 * email doesn't get noisy. Best-effort. Sends to ADMIN_EMAIL.
 */
export async function notifyAdminOfNewThread(
  memberName: string,
  preview: string,
): Promise<void> {
  const to = process.env.ADMIN_EMAIL;
  if (!to) return;
  const snippet = preview.length > 140 ? `${preview.slice(0, 137)}...` : preview;
  const link = `${baseUrl()}/admin/messages`;

  await sendEmail({
    to,
    subject: `New message from ${memberName} in the Inner Circle`,
    html: `
      <div style="font-family: -apple-system, Segoe UI, Roboto, sans-serif; max-width: 480px; margin: 0 auto; color: #1a1a1a;">
        <p style="font-size: 16px; line-height: 1.6;">
          <strong>${escapeHtml(memberName)}</strong> just started a private conversation with you.
        </p>
        <p style="font-size: 16px; line-height: 1.6; padding: 16px; background: #f5f3ee; border-left: 3px solid #d4af37; border-radius: 4px; color: #333;">
          ${escapeHtml(snippet)}
        </p>
        <p style="margin: 28px 0;">
          <a href="${link}" style="display: inline-block; background: #0a0a0a; color: #d4af37; text-decoration: none; padding: 12px 28px; border-radius: 999px; font-size: 14px; letter-spacing: 0.05em;">
            Open your inbox
          </a>
        </p>
      </div>
    `,
  }).catch(() => {
    /* best-effort */
  });
}

/** Minimal HTML-escape so a member display value or message preview can't
 *  break out of the email markup. */
function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
