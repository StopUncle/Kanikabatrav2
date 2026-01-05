// Email helper for Edge Functions using Resend
// Requires RESEND_API_KEY environment variable

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');
const FROM_EMAIL = Deno.env.get('FROM_EMAIL') || 'The Dark Mirror <noreply@thedarkmirror.app>';

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

export async function sendEmail(options: EmailOptions): Promise<boolean> {
  if (!RESEND_API_KEY) {
    console.warn('RESEND_API_KEY not configured - email not sent');
    return false;
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: options.to,
        subject: options.subject,
        html: options.html,
        text: options.text,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('Failed to send email:', error);
      return false;
    }

    console.log('Email sent successfully to:', options.to);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
}

// Pre-built email templates
export const emailTemplates = {
  paymentFailed: (email: string) => ({
    to: email,
    subject: 'Action Required: Payment Failed - The Dark Mirror',
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #C9A961; margin-bottom: 24px;">Payment Failed</h1>
        <p style="color: #333; font-size: 16px; line-height: 1.6;">
          We were unable to process your subscription payment. Your premium access will be paused until the payment is resolved.
        </p>
        <p style="color: #333; font-size: 16px; line-height: 1.6;">
          Please update your payment method to continue enjoying your subscription benefits.
        </p>
        <div style="margin: 32px 0;">
          <a href="https://thedarkmirror.app/settings/subscription"
             style="background-color: #C9A961; color: #000; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: 600;">
            Update Payment Method
          </a>
        </div>
        <p style="color: #666; font-size: 14px;">
          If you have any questions, reply to this email and we'll help you out.
        </p>
        <hr style="border: none; border-top: 1px solid #eee; margin: 32px 0;" />
        <p style="color: #999; font-size: 12px;">
          The Dark Mirror - Master the psychology of influence
        </p>
      </div>
    `,
    text: `Payment Failed

We were unable to process your subscription payment. Your premium access will be paused until the payment is resolved.

Please update your payment method at: https://thedarkmirror.app/settings/subscription

If you have any questions, reply to this email and we'll help you out.

The Dark Mirror`,
  }),
};
