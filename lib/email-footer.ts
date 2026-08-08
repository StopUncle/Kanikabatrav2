import {
  buildUnsubscribeUrl,
  signUnsubscribeToken,
  type UnsubscribeType,
} from "@/lib/unsubscribe-token";

/**
 * Footer block and headers for marketing emails.
 *
 * Rendered inline at enqueue time so the queue processor can call plain
 * `sendEmail` without having to know about preferences. Two flavors:
 *
 *   - `marketingFooterHtml(userId, type, email)` for recipients who
 *     already have a User row.
 *   - `marketingFooterByEmailHtml(email, type)` for mini-quiz
 *     subscribers, pre-account book buyers, newsletter sign-ups, and
 *     anyone else who hasn't created an account yet. The unsubscribe
 *     handler resolves the email to a User and/or Subscriber at click time.
 *
 * `marketingEmailExtras` returns the footer AND the RFC 8058 headers
 * together. Direct senders in `lib/email.ts` were shipping the footer
 * without the headers, so Gmail and Yahoo saw bulk mail with no native
 * unsubscribe button. Handing both back from one call is what stops the
 * two drifting apart again.
 *
 * Lives in its own file (rather than `email-marketing.ts`) to stay free of
 * the `email.ts` import chain: the email senders need this footer too, and
 * a circular import would break the dynamic `sendEmail` lookup.
 */

function baseUrl(): string {
  return process.env.NEXT_PUBLIC_BASE_URL || "https://kanikarose.com";
}

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

export interface MarketingTarget {
  userId?: string;
  email: string;
  type: UnsubscribeType;
  campaign?: string;
}

/**
 * The RFC 8058 headers that put a native Unsubscribe button in the inbox
 * UI. Mirrors what the queue processor already sends, so a direct send and
 * a queued send look identical to a mailbox provider.
 */
export function marketingUnsubscribeHeaders({
  userId,
  email,
  type,
  campaign,
}: MarketingTarget): Record<string, string> {
  const url = baseUrl();
  const token = signUnsubscribeToken(userId ? { userId, type } : { email, type });
  const oneClickUrl = `${url}/api/marketing/unsubscribe-oneclick?token=${encodeURIComponent(token)}`;
  return {
    "List-Unsubscribe": `<${oneClickUrl}>, <mailto:unsubscribe@kanikarose.com>`,
    "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
    "List-ID": `<marketing.${url.replace(/^https?:\/\//, "")}>`,
    "X-Marketing-Campaign": campaign ?? "uncategorised",
  };
}

/** Footer HTML and headers for one recipient, from one call. */
export function marketingEmailExtras(target: MarketingTarget): {
  footerHtml: string;
  headers: Record<string, string>;
} {
  return {
    footerHtml: target.userId
      ? marketingFooterHtml(target.userId, target.type, target.email)
      : marketingFooterByEmailHtml(target.email, target.type),
    headers: marketingUnsubscribeHeaders(target),
  };
}

/**
 * Type size here is deliberate. This used to be 12px grey on near-black,
 * which is the size a footer is when it would rather not be read. An
 * unsubscribe control that people cannot find does not reduce
 * unsubscribes, it produces spam complaints, and those cost the whole
 * sending domain. So the link is 14px, the same size as body copy, gold
 * on dark, underlined, and it says what it does.
 */
function renderFooter(unsubLink: string, recipientEmail: string): string {
  const preferencesLink = `${baseUrl()}/preferences`;
  return `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin: 36px 0 0 0; border-top: 1px solid #d4af3722; padding-top: 24px;">
      <tr>
        <td align="center" style="padding: 0 16px;">
          <p style="margin: 0 0 12px 0; font-size: 13px; color: #8a7f70; line-height: 1.7; text-align: center;">
            You're receiving this because you signed up at kanikarose.com.
          </p>
          <p style="margin: 0 0 14px 0; font-size: 14px; line-height: 1.8; text-align: center;">
            <a href="${unsubLink}" style="color: #d4af37; text-decoration: underline; font-size: 14px;">Unsubscribe</a>
            <span style="color: #4f463c; margin: 0 8px;">&middot;</span>
            <a href="${preferencesLink}" style="color: #d4af37; text-decoration: underline; font-size: 14px;">Choose which emails you get</a>
          </p>
          <p style="margin: 0; font-size: 12px; color: #6b625a; line-height: 1.6; text-align: center;">
            kanikarose.com &middot; sent to ${recipientEmail}
          </p>
        </td>
      </tr>
    </table>
  `;
}
