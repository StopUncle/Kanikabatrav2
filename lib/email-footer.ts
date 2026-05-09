import {
  buildUnsubscribeUrl,
  type UnsubscribeType,
} from "@/lib/unsubscribe-token";

/**
 * Footer block for marketing emails. Rendered inline at enqueue
 * time so the queue processor can call plain `sendEmail` without
 * having to know about preferences. Two flavors:
 *
 *   - `marketingFooterHtml(userId, type, email)` for recipients
 *     who already have a User row.
 *   - `marketingFooterByEmailHtml(email, type)` for mini-quiz
 *     subscribers, pre-account book buyers, newsletter sign-ups,
 *     and anyone else who hasn't created an account yet. The
 *     unsubscribe handler resolves the email to a User and/or
 *     Subscriber at click time.
 *
 * Lives in its own file (rather than `email-marketing.ts`) to
 * stay free of the `email.ts` import chain — the email senders
 * need this footer too, and a circular import would break the
 * dynamic `sendEmail` lookup.
 */
export function marketingFooterHtml(
  userId: string,
  type: UnsubscribeType,
  recipientEmail: string,
): string {
  return renderFooter(buildUnsubscribeUrl({ userId, type }), recipientEmail);
}

export function marketingFooterByEmailHtml(
  recipientEmail: string,
  type: UnsubscribeType,
): string {
  return renderFooter(
    buildUnsubscribeUrl({ email: recipientEmail, type }),
    recipientEmail,
  );
}

function renderFooter(unsubLink: string, recipientEmail: string): string {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://kanikarose.com";
  const profileLink = `${baseUrl}/profile`;
  return `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin: 36px 0 0 0; border-top: 1px solid #d4af3722; padding-top: 24px;">
      <tr>
        <td align="center" style="padding: 0 16px;">
          <p style="margin: 0 0 10px 0; font-size: 12px; color: #7a6f60; line-height: 1.7; text-align: center;">
            You're receiving this because you signed up at kanikarose.com. Don't want these?
          </p>
          <p style="margin: 0 0 14px 0; font-size: 12px; line-height: 1.7; text-align: center;">
            <a href="${unsubLink}" style="color: #d4af37; text-decoration: underline;">One-click unsubscribe</a>
            <span style="color: #4f463c; margin: 0 6px;">·</span>
            <a href="${profileLink}" style="color: #d4af37; text-decoration: underline;">Manage preferences</a>
          </p>
          <p style="margin: 0; font-size: 11px; color: #56504a; line-height: 1.6; text-align: center;">
            kanikarose.com &middot; sent to ${recipientEmail}
          </p>
        </td>
      </tr>
    </table>
  `;
}
