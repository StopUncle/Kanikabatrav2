const baseUrl =
  process.env.NEXT_PUBLIC_BASE_URL || "https://kanikarose.com";

export interface EmailQueueEntry {
  recipientEmail: string;
  recipientName: string;
  sequence: string;
  step: number;
  subject: string;
  htmlBody: string;
  scheduledAt: Date;
  metadata: Record<string, string>;
}

function emailShell(title: string, subtitle: string, body: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} - Kanika Batra</title>
</head>
<body style="margin: 0; padding: 0; background-color: #0a0a0a; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #0a0a0a;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="max-width: 600px; width: 100%; background-color: #050511; border-radius: 12px; overflow: hidden;">

          <tr>
            <td bgcolor="#3d0f1a" style="padding: 40px 30px; text-align: center;">
              <h1 style="color: #d4af37; margin: 0 0 10px 0; font-size: 28px; font-weight: 300; letter-spacing: 2px; text-transform: uppercase;">
                ${title}
              </h1>
              <p style="color: #94a3b8; margin: 0; font-size: 14px; letter-spacing: 1px;">
                ${subtitle}
              </p>
            </td>
          </tr>

          <tr>
            <td style="padding: 40px 30px; border-left: 1px solid #d4af37; border-right: 1px solid #d4af37; border-bottom: 1px solid #d4af37;">
              ${body}

              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin: 30px 0 0 0; padding: 25px 0 0 0; border-top: 1px solid #333;">
                <tr>
                  <td style="text-align: center;">
                    <p style="color: #d4af37; margin: 0 0 5px 0; font-size: 16px; font-style: italic; font-weight: 500;">
                      Embrace your power,
                    </p>
                    <p style="color: #d4af37; margin: 0; font-size: 18px; font-weight: 600; letter-spacing: 1px;">
                      Kanika Batra
                    </p>
                    <p style="color: #666; margin: 5px 0 0 0; font-size: 12px; letter-spacing: 0.5px;">
                      The Psychology of Power
                    </p>
                  </td>
                </tr>
              </table>

              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin: 25px 0 0 0;">
                <tr>
                  <td bgcolor="#1a0d11" style="text-align: center; padding: 20px; border-radius: 8px;">
                    <p style="color: #94a3b8; margin: 0; font-size: 13px; line-height: 1.6;">
                      Issues? Contact us at <a href="mailto:Kanika@kanikarose.com" style="color: #d4af37; text-decoration: none; font-weight: 600;">Kanika@kanikarose.com</a>
                    </p>
                  </td>
                </tr>
              </table>

            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function goldButton(text: string, href: string): string {
  return `<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin: 25px 0;">
  <tr>
    <td align="center">
      <table role="presentation" cellspacing="0" cellpadding="0" border="0">
        <tr>
          <td bgcolor="#d4af37" style="border-radius: 50px; border: 2px solid #d4af37;" align="center">
            <a href="${href}" target="_blank" style="display: inline-block; color: #050511; background-color: #d4af37; padding: 18px 50px; text-decoration: none; font-weight: 700; font-size: 16px; letter-spacing: 1px; text-transform: uppercase; border-radius: 50px;">${text}</a>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>`;
}

function buildWelcomeHtml(name: string): string {
  const body = `
    <p style="color: #f5f0ed; font-size: 18px; margin: 0 0 20px 0; line-height: 1.6;">
      Dear ${name},
    </p>

    <p style="color: #94a3b8; line-height: 1.8; margin: 0 0 20px 0; font-size: 15px;">
      Welcome. You just made a decision most people never will &mdash; investing in the kind of knowledge that actually changes how you move through the world.
    </p>

    <p style="color: #94a3b8; line-height: 1.8; margin: 0 0 25px 0; font-size: 15px;">
      I wrote the Sociopathic Dating Bible to hand you the playbook I wish I had years ago. Here are three tips to get the absolute most from it:
    </p>

    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin: 0 0 25px 0;">
      <tr>
        <td bgcolor="#1a0d11" style="padding: 25px; border-radius: 10px; border: 1px solid #d4af37;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
            <tr>
              <td style="padding: 12px 0; color: #f5f0ed; font-size: 14px; line-height: 1.6; border-bottom: 1px solid #3d2030;">
                <strong style="color: #d4af37;">1.</strong> Start with Chapter 3. It lays the psychological foundation everything else builds on. Read it first, even before Chapter 1.
              </td>
            </tr>
            <tr>
              <td style="padding: 12px 0; color: #f5f0ed; font-size: 14px; line-height: 1.6; border-bottom: 1px solid #3d2030;">
                <strong style="color: #d4af37;">2.</strong> Keep a journal as you read. Write down every pattern you recognise from your own life &mdash; the awareness alone will shift how you operate.
              </td>
            </tr>
            <tr>
              <td style="padding: 12px 0; color: #f5f0ed; font-size: 14px; line-height: 1.6;">
                <strong style="color: #d4af37;">3.</strong> After you finish the main chapters, go back and read the addendums. They hit differently once you have the full framework.
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>

    <p style="color: #94a3b8; line-height: 1.8; margin: 0 0 0 0; font-size: 15px;">
      Take your time with it. This isn&rsquo;t a book you rush through &mdash; it&rsquo;s one you live with.
    </p>`;

  return emailShell("Welcome to the Dark Side", "Your journey begins now", body);
}

function buildTrialOfferHtml(name: string, trialToken: string): string {
  const claimUrl = `${baseUrl}/api/consilium/claim-trial?token=${trialToken}`;

  const body = `
    <p style="color: #f5f0ed; font-size: 18px; margin: 0 0 20px 0; line-height: 1.6;">
      ${name},
    </p>

    <p style="color: #94a3b8; line-height: 1.8; margin: 0 0 20px 0; font-size: 15px;">
      Because you invested in the premium edition, I&rsquo;m giving you something I don&rsquo;t offer publicly &mdash; a free month inside The Consilium.
    </p>

    <p style="color: #94a3b8; line-height: 1.8; margin: 0 0 25px 0; font-size: 15px;">
      No payment required. No card on file. Just claim it.
    </p>

    ${goldButton("Claim Your Free Month", claimUrl)}

    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin: 0 0 25px 0;">
      <tr>
        <td bgcolor="#1a0d11" style="padding: 25px; border-radius: 10px; border: 1px solid #d4af37;">
          <h3 style="color: #d4af37; margin: 0 0 20px 0; font-size: 18px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; text-align: center;">
            What&rsquo;s Inside The Consilium
          </h3>
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
            <tr>
              <td style="padding: 12px 0; color: #f5f0ed; font-size: 14px; line-height: 1.6; border-bottom: 1px solid #3d2030;">
                <strong style="color: #d4af37;">Weekly Voice Notes</strong> &mdash; raw, unfiltered audio directly from me on psychology, power, and strategy
              </td>
            </tr>
            <tr>
              <td style="padding: 12px 0; color: #f5f0ed; font-size: 14px; line-height: 1.6; border-bottom: 1px solid #3d2030;">
                <strong style="color: #d4af37;">Course Library</strong> &mdash; structured lessons you won&rsquo;t find on my public channels
              </td>
            </tr>
            <tr>
              <td style="padding: 12px 0; color: #f5f0ed; font-size: 14px; line-height: 1.6; border-bottom: 1px solid #3d2030;">
                <strong style="color: #d4af37;">Community Feed</strong> &mdash; women-only, troll-free space for real conversations
              </td>
            </tr>
            <tr>
              <td style="padding: 12px 0; color: #f5f0ed; font-size: 14px; line-height: 1.6;">
                <strong style="color: #d4af37;">Private Community</strong> &mdash; a space where you can actually be honest about what you want
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>

    <p style="color: #94a3b8; line-height: 1.8; margin: 0 0 0 0; font-size: 15px;">
      After the free month, you can subscribe at $29/month or simply let it expire &mdash; no obligation, no hidden charges.
    </p>`;

  return emailShell(
    "You&rsquo;ve Been Invited",
    "The Consilium &mdash; free month",
    body,
  );
}

function buildReminderHtml(name: string, trialToken: string): string {
  const claimUrl = `${baseUrl}/api/consilium/claim-trial?token=${trialToken}`;

  const body = `
    <p style="color: #f5f0ed; font-size: 18px; margin: 0 0 20px 0; line-height: 1.6;">
      ${name},
    </p>

    <p style="color: #94a3b8; line-height: 1.8; margin: 0 0 20px 0; font-size: 15px;">
      Quick reminder &mdash; your free month inside The Consilium is still waiting for you, but the invitation won&rsquo;t be open forever.
    </p>

    <p style="color: #94a3b8; line-height: 1.8; margin: 0 0 25px 0; font-size: 15px;">
      Over 2,000 women are already inside. The conversations happening right now are the ones you won&rsquo;t see on any public platform.
    </p>

    ${goldButton("Claim Your Free Month", claimUrl)}

    <p style="color: #94a3b8; line-height: 1.8; margin: 0 0 0 0; font-size: 15px;">
      No payment needed. No card required. One click and you&rsquo;re in for 30 days.
    </p>`;

  return emailShell(
    "Your Free Month Expires Soon",
    "The Consilium invitation",
    body,
  );
}

function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

export function buildBookBuyerSequence(
  recipientEmail: string,
  recipientName: string,
  trialToken: string,
): EmailQueueEntry[] {
  const now = new Date();

  return [
    {
      recipientEmail,
      recipientName,
      sequence: "book-buyer-welcome",
      step: 1,
      subject: `Welcome to the dark side, ${recipientName}`,
      htmlBody: buildWelcomeHtml(recipientName),
      scheduledAt: now,
      metadata: { type: "welcome", trialToken },
    },
    {
      recipientEmail,
      recipientName,
      sequence: "book-buyer-welcome",
      step: 2,
      subject: "You've been invited \u2014 The Consilium (free month)",
      htmlBody: buildTrialOfferHtml(recipientName, trialToken),
      scheduledAt: addDays(now, 3),
      metadata: { type: "trial-offer", trialToken },
    },
    {
      recipientEmail,
      recipientName,
      sequence: "book-buyer-welcome",
      step: 3,
      subject: "Your free month expires soon \u2014 The Consilium",
      htmlBody: buildReminderHtml(recipientName, trialToken),
      scheduledAt: addDays(now, 7),
      metadata: { type: "trial-reminder", trialToken },
    },
  ];
}
