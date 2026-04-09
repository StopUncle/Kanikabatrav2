import nodemailer from "nodemailer";
import type { Transporter } from "nodemailer";
import { Resend } from "resend";
import { escapeHtml as esc } from "@/lib/escape-html";

const logger = {
  info: (message: string) => console.log(`[EMAIL INFO] ${message}`),
  error: (message: string, error?: Error) =>
    console.error(`[EMAIL ERROR] ${message}`, error),
  warn: (message: string) => console.warn(`[EMAIL WARN] ${message}`),
};

// Primary SMTP Configuration (Gmail or general SMTP)
const SMTP_HOST = process.env.SMTP_HOST || "smtp.gmail.com";
const SMTP_PORT = parseInt(process.env.SMTP_PORT || "587", 10);
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS;
const FROM_EMAIL = process.env.FROM_EMAIL || "noreply@kanikarose.com";

// Resend (transactional email service — preferred when configured)
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const RESEND_FROM_EMAIL = process.env.RESEND_FROM_EMAIL || FROM_EMAIL;
const resendClient = RESEND_API_KEY ? new Resend(RESEND_API_KEY) : null;

// Microsoft SMTP Configuration (for Hotmail/Outlook/Live recipients)
// Uses Outlook.com SMTP: smtp-mail.outlook.com or smtp.office365.com for M365
const MS_SMTP_HOST = process.env.MS_SMTP_HOST || "smtp-mail.outlook.com";
const MS_SMTP_PORT = parseInt(process.env.MS_SMTP_PORT || "587", 10);
const MS_SMTP_USER = process.env.MS_SMTP_USER;
const MS_SMTP_PASS = process.env.MS_SMTP_PASS;
const MS_FROM_EMAIL = process.env.MS_FROM_EMAIL;

// Microsoft email domains that should use the Microsoft transport
const MICROSOFT_DOMAINS = [
  "hotmail.com",
  "hotmail.co.uk",
  "hotmail.fr",
  "hotmail.de",
  "hotmail.it",
  "outlook.com",
  "outlook.co.uk",
  "outlook.fr",
  "outlook.de",
  "live.com",
  "live.co.uk",
  "live.fr",
  "live.de",
  "msn.com",
  "passport.com",
  "windowslive.com",
];

let primaryTransporter: Transporter | null = null;
let microsoftTransporter: Transporter | null = null;

function isMicrosoftEmail(email: string): boolean {
  const domain = email.split("@")[1]?.toLowerCase();
  return domain ? MICROSOFT_DOMAINS.includes(domain) : false;
}

function getPrimaryTransporter(): Transporter | null {
  if (primaryTransporter) return primaryTransporter;

  if (!SMTP_USER || !SMTP_PASS) {
    logger.warn(
      "Primary SMTP credentials not configured - emails will not be sent",
    );
    return null;
  }

  primaryTransporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: SMTP_PORT === 465,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
    tls: {
      rejectUnauthorized: process.env.NODE_ENV === "production",
    },
  });

  return primaryTransporter;
}

function getMicrosoftTransporter(): Transporter | null {
  if (microsoftTransporter) return microsoftTransporter;

  // If no Microsoft credentials, fall back to primary
  if (!MS_SMTP_USER || !MS_SMTP_PASS) {
    logger.info(
      "Microsoft SMTP not configured - using primary transport for all emails",
    );
    return null;
  }

  microsoftTransporter = nodemailer.createTransport({
    host: MS_SMTP_HOST,
    port: MS_SMTP_PORT,
    secure: false, // Outlook.com uses STARTTLS on 587
    auth: {
      user: MS_SMTP_USER,
      pass: MS_SMTP_PASS,
    },
    tls: {
      rejectUnauthorized: process.env.NODE_ENV === "production",
    },
  });

  logger.info("Microsoft SMTP transport initialized");
  return microsoftTransporter;
}

function getTransporter(recipientEmail?: string): {
  transporter: Transporter | null;
  fromEmail: string;
} {
  // Check if recipient is a Microsoft email and we have Microsoft SMTP configured
  if (recipientEmail && isMicrosoftEmail(recipientEmail)) {
    const msTransport = getMicrosoftTransporter();
    if (msTransport) {
      logger.info(`Routing to Microsoft SMTP for: ${recipientEmail}`);
      return {
        transporter: msTransport,
        fromEmail: MS_FROM_EMAIL || FROM_EMAIL,
      };
    }
  }

  // Use primary transport
  return {
    transporter: getPrimaryTransporter(),
    fromEmail: FROM_EMAIL,
  };
}

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
  replyTo?: string;
}

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface OrderConfirmationData {
  customerEmail: string;
  customerName: string;
  orderNumber: string;
  purchaseType: "book" | "coaching";
  amount: number;
  itemName: string;
  packageDetails?: {
    sessions?: number;
    duration?: string;
  };
}

export const sendEmail = async (
  options: EmailOptions,
  maxRetries = 3,
): Promise<boolean> => {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      // Prefer Resend when configured (better deliverability, no SMTP quirks)
      if (resendClient) {
        const { error } = await resendClient.emails.send({
          from: RESEND_FROM_EMAIL,
          to: options.to,
          subject: options.subject,
          html: options.html,
          text: options.text || options.html.replace(/<[^>]*>/g, ""),
          replyTo: options.replyTo,
        });
        if (error) throw new Error(error.message);
        logger.info(`Email sent to ${options.to} via Resend (attempt ${attempt})`);
        return true;
      }

      // Fall back to SMTP
      const { transporter: transport, fromEmail } = getTransporter(options.to);
      if (!transport) {
        logger.warn("No email transport available (set RESEND_API_KEY or SMTP credentials)");
        return false;
      }

      const info = await transport.sendMail({
        from: fromEmail,
        to: options.to,
        subject: options.subject,
        text: options.text || options.html.replace(/<[^>]*>/g, ""),
        html: options.html,
        replyTo: options.replyTo,
      });
      logger.info(
        `Email sent to ${options.to} via ${isMicrosoftEmail(options.to) ? "Microsoft" : "Primary"} SMTP - Message ID: ${info.messageId}`,
      );
      return true;
    } catch (error) {
      logger.error(
        `Failed to send email to ${options.to} (attempt ${attempt}/${maxRetries})`,
        error as Error,
      );
      if (attempt < maxRetries) {
        const delay = 2000 * attempt;
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }
  }

  logger.error(
    `All ${maxRetries} email delivery attempts failed for ${options.to}`,
  );
  return false;
};

export const sendContactNotification = async (
  data: ContactFormData,
): Promise<boolean> => {
  const adminEmail = process.env.ADMIN_EMAIL || "Kanika@kanikarose.com";

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: linear-gradient(135deg, #1a0d11 0%, #0a1628 100%); padding: 30px; border-radius: 10px 10px 0 0;">
        <h1 style="color: #d4af37; margin: 0; font-size: 24px;">New Contact Form Submission</h1>
      </div>
      <div style="background: #050511; padding: 30px; border: 1px solid #d4af37; border-top: none;">
        <h2 style="color: #f5f0ed; margin-top: 0;">Contact Details</h2>
        <div style="background: #0a0a0a; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <p style="color: #94a3b8; margin: 10px 0;"><strong style="color: #d4af37;">Name:</strong> ${esc(data.name)}</p>
          <p style="color: #94a3b8; margin: 10px 0;"><strong style="color: #d4af37;">Email:</strong> ${esc(data.email)}</p>
          <p style="color: #94a3b8; margin: 10px 0;"><strong style="color: #d4af37;">Subject:</strong> ${esc(data.subject)}</p>
        </div>
        <h3 style="color: #f5f0ed;">Message:</h3>
        <div style="background: #0a0a0a; padding: 20px; border-radius: 8px;">
          <p style="color: #94a3b8; line-height: 1.6; white-space: pre-wrap;">${esc(data.message)}</p>
        </div>
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #333;">
          <p style="color: #666; font-size: 12px; margin: 0;">
            This email was sent from the contact form on kanikabatra.com
          </p>
        </div>
      </div>
    </div>
  `;

  await sendEmail({
    to: adminEmail,
    // Subject lines don't render HTML but we still want to strip any
    // control chars that might break the email client header parser.
    subject: `[Contact Form] ${data.subject.replace(/[\r\n]/g, " ")} - from ${data.name.replace(/[\r\n]/g, " ")}`,
    html,
    replyTo: data.email,
  });

  const userHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: linear-gradient(135deg, #1a0d11 0%, #0a1628 100%); padding: 30px; border-radius: 10px 10px 0 0;">
        <h1 style="color: #d4af37; margin: 0; font-size: 24px;">Message Received</h1>
      </div>
      <div style="background: #050511; padding: 30px; border: 1px solid #d4af37; border-top: none;">
        <p style="color: #f5f0ed; font-size: 16px; line-height: 1.6;">
          Dear ${esc(data.name)},
        </p>
        <p style="color: #94a3b8; line-height: 1.6;">
          Thank you for reaching out. I've received your message and will respond within 24-48 hours.
        </p>
        <p style="color: #94a3b8; line-height: 1.6;">
          If your inquiry is urgent, please mention "PRIORITY" in your next message.
        </p>
        <div style="background: #0a0a0a; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p style="color: #666; margin: 5px 0;"><strong>Your Message:</strong></p>
          <p style="color: #94a3b8; white-space: pre-wrap;">${esc(data.message.substring(0, 500))}${data.message.length > 500 ? "..." : ""}</p>
        </div>
        <p style="color: #d4af37; font-style: italic; margin-top: 30px;">
          - Kanika Batra<br>
          The Psychology of Power
        </p>
      </div>
    </div>
  `;

  return await sendEmail({
    to: data.email,
    subject: "Message Received - Kanika Batra",
    html: userHtml,
  });
};

export const sendOrderConfirmation = async (
  data: OrderConfirmationData,
): Promise<boolean> => {
  const isBook = data.purchaseType === "book";

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: linear-gradient(135deg, #1a0d11 0%, #0a1628 100%); padding: 30px; border-radius: 10px 10px 0 0;">
        <h1 style="color: #d4af37; margin: 0; font-size: 24px;">Order Confirmation</h1>
      </div>
      <div style="background: #050511; padding: 30px; border: 1px solid #d4af37; border-top: none;">
        <p style="color: #f5f0ed; font-size: 16px; line-height: 1.6;">
          Dear ${esc(data.customerName)},
        </p>
        <p style="color: #94a3b8; line-height: 1.6;">
          Your payment has been successfully processed.
        </p>

        <div style="background: #0a0a0a; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #d4af37; margin-top: 0;">Order Details</h3>
          <p style="color: #94a3b8; margin: 10px 0;"><strong>Order ID:</strong> ${data.orderNumber}</p>
          <p style="color: #94a3b8; margin: 10px 0;"><strong>Item:</strong> ${data.itemName}</p>
          <p style="color: #94a3b8; margin: 10px 0;"><strong>Amount:</strong> $${data.amount.toFixed(2)}</p>
        </div>

        ${
          isBook
            ? `
          <div style="background: #1a0d11; padding: 20px; border-radius: 8px; margin: 20px 0; border: 1px solid #d4af37;">
            <h3 style="color: #d4af37; margin-top: 0;">📚 Your Book is Ready!</h3>
            <p style="color: #94a3b8; line-height: 1.6;">
              Your copy of "Sociopathic Dating Bible" will be sent to you in a separate email within the next 5 minutes.
            </p>
            <p style="color: #94a3b8; line-height: 1.6;">
              The download link will be valid for 30 days. Please save your copy locally.
            </p>
          </div>
        `
            : `
          <div style="background: #1a0d11; padding: 20px; border-radius: 8px; margin: 20px 0; border: 1px solid #d4af37;">
            <h3 style="color: #d4af37; margin-top: 0;">🎯 Next Steps</h3>
            <p style="color: #94a3b8; line-height: 1.6;">
              You'll receive a separate email with instructions to schedule your coaching session.
            </p>
            <p style="color: #94a3b8; line-height: 1.6;">
              Please complete the pre-session questionnaire to make the most of our time together.
            </p>
          </div>
        `
        }

        <div style="margin-top: 30px; padding: 20px; background: #0a0a0a; border-radius: 8px;">
          <h3 style="color: #d4af37; margin-top: 0;">Need Help?</h3>
          <p style="color: #94a3b8;">
            If you have any questions or issues, please reply to this email or contact us at:
            <br><a href="mailto:Kanika@kanikarose.com" style="color: #d4af37;">Kanika@kanikarose.com</a>
          </p>
        </div>

        <p style="color: #d4af37; font-style: italic; margin-top: 30px;">
          Welcome aboard,<br>
          Kanika Batra
        </p>
      </div>
    </div>
  `;

  return await sendEmail({
    to: data.customerEmail,
    subject: `Order Confirmation #${data.orderNumber} - Kanika Batra`,
    html,
  });
};

export const sendBookDelivery = async (
  customerEmail: string,
  customerName: string,
  downloadToken: string,
  variant: string | null,
  expiresAt: Date,
): Promise<boolean> => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://kanikarose.com";
  const pdfUrl = `${baseUrl}/api/download?token=${downloadToken}&format=pdf`;
  const epubUrl = `${baseUrl}/api/download?token=${downloadToken}&format=epub`;
  const isPremium = variant === "PREMIUM";
  const bookTitle = isPremium
    ? "Sociopathic Dating Bible: A Cure For Empathy (Premium Edition)"
    : "Sociopathic Dating Bible: A Cure For Empathy";

  // Bonus chapter download URLs
  const bonusNarcissistsUrl = `${baseUrl}/api/download?token=${downloadToken}&format=bonus-narcissists`;
  const bonusNarcissistsPdfUrl = `${baseUrl}/api/download?token=${downloadToken}&format=bonus-narcissists-pdf`;
  const bonusAvoidantsUrl = `${baseUrl}/api/download?token=${downloadToken}&format=bonus-avoidants`;
  const bonusAvoidantsPdfUrl = `${baseUrl}/api/download?token=${downloadToken}&format=bonus-avoidants-pdf`;

  const premiumBonuses = isPremium
    ? `
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin: 0 0 25px 0;">
      <tr>
        <td bgcolor="#1a0d11" style="padding: 25px; border-radius: 10px; border: 2px solid #d4af37;">
          <h3 style="color: #d4af37; margin: 0 0 20px 0; font-size: 18px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; text-align: center;">
            Your Premium Edition Bonuses
          </h3>
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
            <tr>
              <td style="padding: 12px 0; color: #f5f0ed; font-size: 14px; line-height: 1.6; border-bottom: 1px solid #3d2030;">
                <strong style="color: #d4af37;">Private Telegram Community:</strong> Lifetime Access to Exclusive Group
              </td>
            </tr>
            <tr>
              <td style="padding: 12px 0; color: #f5f0ed; font-size: 14px; line-height: 1.6;">
                <strong style="color: #d4af37;">$100 Discount:</strong> On your first 1-on-1 consultation
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  `
    : "";

  const expiryDate = new Date(expiresAt).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Your Book Purchase - Kanika Batra</title>
    </head>
    <body style="margin: 0; padding: 0; background-color: #0a0a0a; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #0a0a0a;">
        <tr>
          <td align="center" style="padding: 40px 20px;">
            <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="max-width: 600px; width: 100%; background-color: #050511; border-radius: 12px; overflow: hidden;">

              <tr>
                <td bgcolor="#3d0f1a" style="padding: 40px 30px; text-align: center;">
                  <h1 style="color: #d4af37; margin: 0 0 10px 0; font-size: 28px; font-weight: 300; letter-spacing: 2px; text-transform: uppercase;">
                    Thank You For Your Purchase
                  </h1>
                  <p style="color: #94a3b8; margin: 0; font-size: 14px; letter-spacing: 1px;">
                    Your download is ready
                  </p>
                </td>
              </tr>

              <tr>
                <td style="padding: 40px 30px; border-left: 1px solid #d4af37; border-right: 1px solid #d4af37; border-bottom: 1px solid #d4af37;">

                  <p style="color: #f5f0ed; font-size: 18px; margin: 0 0 20px 0; line-height: 1.6;">
                    Dear ${esc(customerName)},
                  </p>

                  <p style="color: #94a3b8; line-height: 1.8; margin: 0 0 30px 0; font-size: 15px;">
                    Your payment has been successfully processed. You now have instant access to:
                  </p>

                  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin: 0 0 30px 0;">
                    <tr>
                      <td bgcolor="#1a0d11" style="padding: 25px; border-radius: 10px; border: 1px solid #d4af37;">
                        <h2 style="color: #d4af37; margin: 0 0 15px 0; font-size: 20px; font-weight: 600;">
                          ${bookTitle}
                        </h2>
                        <p style="color: #94a3b8; margin: 0; font-size: 14px; line-height: 1.6;">
                          70,000 words of strategic dating psychology from a diagnosed sociopath &mdash; now with 2 bonus addendum chapters
                        </p>
                      </td>
                    </tr>
                  </table>

                  <!-- EPUB - Primary Download -->
                  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin: 0 0 25px 0;">
                    <tr>
                      <td align="center">
                        <h3 style="color: #d4af37; margin: 0 0 20px 0; font-size: 16px; font-weight: 600;">
                          Download Your Book
                        </h3>
                      </td>
                    </tr>
                    <tr>
                      <td align="center" style="padding-bottom: 15px;">
                        <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                          <tr>
                            <td bgcolor="#d4af37" style="border-radius: 50px; border: 2px solid #d4af37;" align="center">
                              <a href="${epubUrl}" target="_blank" style="display: inline-block; color: #050511; background-color: #d4af37; padding: 18px 50px; text-decoration: none; font-weight: 700; font-size: 16px; letter-spacing: 1px; text-transform: uppercase; border-radius: 50px;">DOWNLOAD EPUB</a>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>

                  <!-- Addendum Downloads -->
                  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin: 0 0 25px 0;">
                    <tr>
                      <td bgcolor="#1a0d11" style="padding: 20px; border-radius: 10px; border: 1px solid #d4af37;">
                        <h4 style="color: #d4af37; margin: 0 0 15px 0; font-size: 15px; font-weight: 600; text-align: center;">
                          Addendum Chapters
                        </h4>
                        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                          <tr>
                            <td align="center" style="padding-bottom: 6px;">
                              <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                                <tr>
                                  <td bgcolor="#722139" style="border-radius: 50px; border: 1px solid #d4af37;" align="center">
                                    <a href="${bonusNarcissistsUrl}" target="_blank" style="display: inline-block; color: #d4af37; background-color: #722139; padding: 14px 40px; text-decoration: none; font-weight: 600; font-size: 14px; letter-spacing: 0.5px; border-radius: 50px;">Understanding Narcissists (EPUB)</a>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                          <tr>
                            <td align="center" style="padding-bottom: 16px;">
                              <a href="${bonusNarcissistsPdfUrl}" target="_blank" style="color: #94a3b8; font-size: 13px; text-decoration: underline;">Download PDF version</a>
                            </td>
                          </tr>
                          <tr>
                            <td align="center" style="padding-bottom: 6px;">
                              <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                                <tr>
                                  <td bgcolor="#722139" style="border-radius: 50px; border: 1px solid #d4af37;" align="center">
                                    <a href="${bonusAvoidantsUrl}" target="_blank" style="display: inline-block; color: #d4af37; background-color: #722139; padding: 14px 40px; text-decoration: none; font-weight: 600; font-size: 14px; letter-spacing: 0.5px; border-radius: 50px;">The Avoidant Playbook (EPUB)</a>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                          <tr>
                            <td align="center">
                              <a href="${bonusAvoidantsPdfUrl}" target="_blank" style="color: #94a3b8; font-size: 13px; text-decoration: underline;">Download PDF version</a>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>

                  <!-- PDF - Secondary -->
                  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin: 0 0 30px 0;">
                    <tr>
                      <td align="center" style="padding: 10px 0;">
                        <p style="color: #94a3b8; margin: 0 0 12px 0; font-size: 14px;">Prefer PDF?</p>
                        <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                          <tr>
                            <td bgcolor="#333333" style="border-radius: 50px;" align="center">
                              <a href="${pdfUrl}" target="_blank" style="display: inline-block; color: #d4af37; background-color: #333333; padding: 12px 35px; text-decoration: none; font-weight: 600; font-size: 14px; border-radius: 50px;">Download PDF Version</a>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>

                  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin: 0 0 25px 0;">
                    <tr>
                      <td bgcolor="#0a0a0a" style="padding: 20px; border-radius: 8px; border: 1px solid #333;">
                        <h3 style="color: #d4af37; margin: 0 0 15px 0; font-size: 16px; font-weight: 600;">
                          Important Download Information
                        </h3>
                        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                          <tr>
                            <td style="padding: 8px 0; color: #94a3b8; font-size: 14px; line-height: 1.6;">
                              Link expires: <strong style="color: #d4af37;">${expiryDate}</strong>
                            </td>
                          </tr>
                          <tr>
                            <td style="padding: 8px 0; color: #94a3b8; font-size: 14px; line-height: 1.6;">
                              Maximum downloads: <strong style="color: #d4af37;">10 times total</strong> (across all formats)
                            </td>
                          </tr>
                          <tr>
                            <td style="padding: 8px 0; color: #94a3b8; font-size: 14px; line-height: 1.6;">
                              Save locally for permanent access
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>

                  ${premiumBonuses}

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
                        <p style="color: #94a3b8; margin: 0 0 10px 0; font-size: 13px; line-height: 1.6;">
                          <strong style="color: #d4af37;">Important:</strong> If you don't see this email, please check your junk/spam folder.
                        </p>
                        <p style="color: #94a3b8; margin: 0; font-size: 13px; line-height: 1.6;">
                          Issues with your download? Contact us at <a href="mailto:Kanika@kanikarose.com" style="color: #d4af37; text-decoration: none; font-weight: 600;">Kanika@kanikarose.com</a>
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
    </html>
  `;

  return await sendEmail({
    to: customerEmail,
    subject: `Download Your Book - Sociopathic Dating Bible ${isPremium ? "(Premium Edition)" : ""}`,
    html,
  });
};

export const sendCoachingQuestionnaire = async (data: {
  packageName: string;
  customerName: string;
  customerEmail: string;
  orderId: string;
  sendTo?: string;
  questionnaire: {
    preferredName: string;
    age: string;
    timezone: string;
    availability: string[];
    urgency: string;
    currentSituation: string;
    primaryChallenges: string;
    previousTherapy: string;
    mentalHealthHistory: string;
    currentMedication: string;
    suicidalThoughts: string;
    substanceUse: string;
    traumaHistory: string;
    specificGoals: string;
    successMeasures: string;
    psychologyInterest: string;
    manipulationExperience: string;
    timeCommitment: string;
    expectations: string;
    ethicalUse: string;
    additionalInfo?: string;
  };
}): Promise<boolean> => {
  const adminEmail = data.sendTo || process.env.ADMIN_EMAIL || "Kanika@kanikarose.com";

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto;">
      <div style="background: linear-gradient(135deg, #1a0d11 0%, #0a1628 100%); padding: 30px; border-radius: 10px 10px 0 0;">
        <h1 style="color: #d4af37; margin: 0; font-size: 24px;">New Coaching Questionnaire Submitted</h1>
      </div>
      <div style="background: #050511; padding: 30px; border: 1px solid #d4af37; border-top: none;">

        <div style="background: #0a0a0a; padding: 20px; border-radius: 8px; margin-bottom: 30px;">
          <h2 style="color: #d4af37; margin-top: 0;">Client Overview</h2>
          <p style="color: #94a3b8; margin: 10px 0;"><strong style="color: #d4af37;">Name:</strong> ${esc(data.customerName)}</p>
          <p style="color: #94a3b8; margin: 10px 0;"><strong style="color: #d4af37;">Email:</strong> ${esc(data.customerEmail)}</p>
          <p style="color: #94a3b8; margin: 10px 0;"><strong style="color: #d4af37;">Package:</strong> ${esc(data.packageName)}</p>
          <p style="color: #94a3b8; margin: 10px 0;"><strong style="color: #d4af37;">Order ID:</strong> ${esc(data.orderId)}</p>
          <p style="color: #94a3b8; margin: 10px 0;"><strong style="color: #d4af37;">Urgency:</strong> ${esc(data.questionnaire.urgency)}</p>
        </div>

        <div style="background: #0a0a0a; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h3 style="color: #d4af37; margin-top: 0;">Basic Information</h3>
          <p style="color: #94a3b8;"><strong>Preferred Name:</strong> ${esc(data.questionnaire.preferredName)}</p>
          <p style="color: #94a3b8;"><strong>Age:</strong> ${esc(data.questionnaire.age)}</p>
          <p style="color: #94a3b8;"><strong>Timezone:</strong> ${esc(data.questionnaire.timezone)}</p>
          <p style="color: #94a3b8;"><strong>Available Times:</strong> ${esc(data.questionnaire.availability.join(", "))}</p>
        </div>

        <div style="background: #0a0a0a; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h3 style="color: #d4af37; margin-top: 0;">Current Situation & Challenges</h3>
          <div style="margin-bottom: 15px;">
            <strong style="color: #d4af37;">Current Situation:</strong>
            <p style="color: #94a3b8; margin: 5px 0; padding: 10px; background: #1a1a1a; border-radius: 4px;">${esc(data.questionnaire.currentSituation)}</p>
          </div>
          <div style="margin-bottom: 15px;">
            <strong style="color: #d4af37;">Primary Challenges:</strong>
            <p style="color: #94a3b8; margin: 5px 0; padding: 10px; background: #1a1a1a; border-radius: 4px;">${esc(data.questionnaire.primaryChallenges)}</p>
          </div>
          <div>
            <strong style="color: #d4af37;">Previous Therapy/Coaching:</strong>
            <p style="color: #94a3b8; margin: 5px 0; padding: 10px; background: #1a1a1a; border-radius: 4px;">${esc(data.questionnaire.previousTherapy)}</p>
          </div>
        </div>

        ${
          data.questionnaire.suicidalThoughts !== "Never" ||
          data.questionnaire.traumaHistory !== "None"
            ? `
        <div style="background: #2d1b1b; padding: 20px; border-radius: 8px; margin-bottom: 20px; border: 1px solid #8b0000;">
          <h3 style="color: #ff6b6b; margin-top: 0;">⚠️ Mental Health Screening - ATTENTION REQUIRED</h3>
          <p style="color: #ffccd5;"><strong>Mental Health History:</strong> ${esc(data.questionnaire.mentalHealthHistory)}</p>
          <p style="color: #ffccd5;"><strong>Current Medication:</strong> ${esc(data.questionnaire.currentMedication)}</p>
          <p style="color: #ffccd5;"><strong>Suicidal Thoughts:</strong> <span style="color: ${data.questionnaire.suicidalThoughts === "Currently" ? "#ff4757" : "#ff6b6b"};">${esc(data.questionnaire.suicidalThoughts)}</span></p>
          <p style="color: #ffccd5;"><strong>Substance Use:</strong> ${esc(data.questionnaire.substanceUse)}</p>
          <p style="color: #ffccd5;"><strong>Trauma History:</strong> ${esc(data.questionnaire.traumaHistory)}</p>
        </div>
        `
            : `
        <div style="background: #0a0a0a; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h3 style="color: #d4af37; margin-top: 0;">Mental Health Screening</h3>
          <p style="color: #94a3b8;"><strong>Mental Health History:</strong> ${esc(data.questionnaire.mentalHealthHistory)}</p>
          <p style="color: #94a3b8;"><strong>Current Medication:</strong> ${esc(data.questionnaire.currentMedication)}</p>
          <p style="color: #94a3b8;"><strong>Suicidal Thoughts:</strong> ${esc(data.questionnaire.suicidalThoughts)}</p>
          <p style="color: #94a3b8;"><strong>Substance Use:</strong> ${esc(data.questionnaire.substanceUse)}</p>
          <p style="color: #94a3b8;"><strong>Trauma History:</strong> ${esc(data.questionnaire.traumaHistory)}</p>
        </div>
        `
        }

        <div style="background: #0a0a0a; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h3 style="color: #d4af37; margin-top: 0;">Goals & Psychology Interest</h3>
          <div style="margin-bottom: 15px;">
            <strong style="color: #d4af37;">Specific Goals:</strong>
            <p style="color: #94a3b8; margin: 5px 0; padding: 10px; background: #1a1a1a; border-radius: 4px;">${esc(data.questionnaire.specificGoals)}</p>
          </div>
          <div style="margin-bottom: 15px;">
            <strong style="color: #d4af37;">Success Measures:</strong>
            <p style="color: #94a3b8; margin: 5px 0; padding: 10px; background: #1a1a1a; border-radius: 4px;">${esc(data.questionnaire.successMeasures)}</p>
          </div>
          <div style="margin-bottom: 15px;">
            <strong style="color: #d4af37;">Dark Psychology Interest:</strong>
            <p style="color: #94a3b8; margin: 5px 0; padding: 10px; background: #1a1a1a; border-radius: 4px;">${esc(data.questionnaire.psychologyInterest)}</p>
          </div>
          <div>
            <strong style="color: #d4af37;">Manipulation Experience:</strong>
            <p style="color: #94a3b8; margin: 5px 0; padding: 10px; background: #1a1a1a; border-radius: 4px;">${esc(data.questionnaire.manipulationExperience)}</p>
          </div>
        </div>

        <div style="background: #0a0a0a; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h3 style="color: #d4af37; margin-top: 0;">Expectations & Commitment</h3>
          <p style="color: #94a3b8;"><strong>Time Commitment:</strong> ${esc(data.questionnaire.timeCommitment)}</p>
          <div style="margin: 15px 0;">
            <strong style="color: #d4af37;">Expectations from You:</strong>
            <p style="color: #94a3b8; margin: 5px 0; padding: 10px; background: #1a1a1a; border-radius: 4px;">${esc(data.questionnaire.expectations)}</p>
          </div>
          <div>
            <strong style="color: #d4af37;">Ethical Use Commitment:</strong>
            <p style="color: #94a3b8; margin: 5px 0; padding: 10px; background: #1a1a1a; border-radius: 4px;">${esc(data.questionnaire.ethicalUse)}</p>
          </div>
        </div>

        ${
          data.questionnaire.additionalInfo
            ? `
        <div style="background: #0a0a0a; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h3 style="color: #d4af37; margin-top: 0;">Additional Information</h3>
          <p style="color: #94a3b8; padding: 10px; background: #1a1a1a; border-radius: 4px;">${esc(data.questionnaire.additionalInfo)}</p>
        </div>
        `
            : ""
        }

        <div style="background: #1a0d11; padding: 20px; border-radius: 8px; border: 1px solid #d4af37;">
          <h3 style="color: #d4af37; margin-top: 0;">Next Steps</h3>
          <p style="color: #94a3b8;">
            1. Review the client's mental health screening carefully<br>
            2. Send scheduling link for their ${data.packageName} session<br>
            3. Consider any special preparation based on their responses<br>
            4. ${data.questionnaire.urgency === "ASAP" ? '<strong style="color: #ff6b6b;">Priority scheduling requested</strong>' : "Standard scheduling timeline"}
          </p>
        </div>

        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #333;">
          <p style="color: #666; font-size: 12px; margin: 0;">
            Questionnaire submitted: ${new Date().toLocaleString()}<br>
            This is an automated notification from the coaching booking system.
          </p>
        </div>
      </div>
    </div>
  `;

  return await sendEmail({
    to: adminEmail,
    // Strip CRLF from any user-supplied strings to prevent header injection
    subject: `🎯 New ${data.packageName} Questionnaire - ${data.customerName.replace(/[\r\n]/g, " ")} [${data.questionnaire.urgency}]`,
    html,
    replyTo: data.customerEmail,
  });
};

export const sendCoachingScheduling = async (
  customerEmail: string,
  customerName: string,
  packageName: string,
  schedulingUrl: string,
): Promise<boolean> => {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: linear-gradient(135deg, #720921 0%, #6366f1 100%); padding: 30px; border-radius: 10px 10px 0 0;">
        <h1 style="color: #d4af37; margin: 0; font-size: 24px;">🎯 Schedule Your Transformation</h1>
      </div>
      <div style="background: #050511; padding: 30px; border: 1px solid #d4af37; border-top: none;">
        <p style="color: #f5f0ed; font-size: 16px; line-height: 1.6;">
          ${esc(customerName)},
        </p>
        <p style="color: #94a3b8; line-height: 1.6;">
          Your <strong style="color: #d4af37;">${esc(packageName)}</strong> session is ready to be scheduled.
        </p>

        <div style="text-align: center; margin: 30px 0;">
          <a href="${schedulingUrl}" style="display: inline-block; background: linear-gradient(135deg, #d4af37, #b8941f); color: #050511; padding: 15px 40px; text-decoration: none; border-radius: 30px; font-weight: bold; font-size: 16px;">
            Schedule Your Session
          </a>
        </div>

        <div style="background: #0a0a0a; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #d4af37; margin-top: 0;">📋 Pre-Session Preparation</h3>
          <p style="color: #94a3b8; line-height: 1.6;">
            To maximize our time together, please:
          </p>
          <ul style="color: #94a3b8; line-height: 1.8;">
            <li>Complete the attached questionnaire</li>
            <li>Prepare specific situations you want to discuss</li>
            <li>Be ready to confront uncomfortable truths</li>
            <li>Come with an open mind to transformation</li>
          </ul>
        </div>

        <div style="background: #1a0d11; padding: 20px; border-radius: 8px; margin: 20px 0; border: 1px solid #720921;">
          <h3 style="color: #d4af37; margin-top: 0;">Session Guidelines</h3>
          <ul style="color: #94a3b8; line-height: 1.8;">
            <li><strong>Duration:</strong> 90 minutes of focused transformation</li>
            <li><strong>Format:</strong> One-on-one video session</li>
            <li><strong>Rescheduling:</strong> 24 hours notice required</li>
            <li><strong>Recording:</strong> Sessions can be recorded for your review</li>
          </ul>
        </div>

        <div style="margin-top: 30px; padding: 20px; background: #0a0a0a; border-radius: 8px;">
          <p style="color: #94a3b8; font-style: italic; text-align: center;">
            "I don't teach you to be passive—I teach you to be strategic."
          </p>
        </div>

        <p style="color: #d4af37; font-style: italic; margin-top: 30px;">
          Ready to transform,<br>
          Kanika Batra<br>
          <span style="color: #666; font-size: 12px;">Psychology of Power</span>
        </p>
      </div>
    </div>
  `;

  return await sendEmail({
    to: customerEmail,
    subject: `🎯 Schedule Your ${packageName} Session - Kanika Batra`,
    html,
  });
};

export const verifyEmailConnection = async (): Promise<{
  primary: boolean;
  microsoft: boolean;
}> => {
  const results = { primary: false, microsoft: false };

  // Verify primary transport
  try {
    const primary = getPrimaryTransporter();
    if (primary) {
      await primary.verify();
      logger.info("Primary SMTP connection verified successfully");
      results.primary = true;
    }
  } catch (error) {
    logger.error("Primary SMTP connection verification failed", error as Error);
  }

  // Verify Microsoft transport (if configured)
  try {
    const microsoft = getMicrosoftTransporter();
    if (microsoft) {
      await microsoft.verify();
      logger.info("Microsoft SMTP connection verified successfully");
      results.microsoft = true;
    } else {
      logger.info("Microsoft SMTP not configured - skipping verification");
    }
  } catch (error) {
    logger.error(
      "Microsoft SMTP connection verification failed",
      error as Error,
    );
  }

  return results;
};

// Export helper to check if Microsoft transport is available
export const hasMicrosoftTransport = (): boolean => {
  return !!(MS_SMTP_USER && MS_SMTP_PASS);
};

interface QuizResultsEmailData {
  email: string;
  primaryType: string;
  secondaryType: string;
  scores: Record<string, number>;
  diagnosis?: {
    clinicalLabel: string;
    functioningLevel: "high" | "moderate" | "low";
    functioningScore: number;
    description: string;
  };
  primaryProfile: {
    name: string;
    tagline: string;
    description: string;
    traits: string[];
    strengths: string[];
    blindSpots: string[];
    relationshipPattern: string;
  };
  secondaryProfile: {
    name: string;
    tagline: string;
    description: string;
  };
}

export const sendQuizResults = async (
  data: QuizResultsEmailData,
): Promise<boolean> => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://kanikarose.com";

  const getFunctioningColor = (level: string) => {
    switch (level) {
      case "high":
        return { text: "#22c55e", bg: "#14532d", border: "#166534" };
      case "moderate":
        return { text: "#eab308", bg: "#422006", border: "#854d0e" };
      case "low":
        return { text: "#ef4444", bg: "#450a0a", border: "#991b1b" };
      default:
        return { text: "#94a3b8", bg: "#1a1a1a", border: "#333" };
    }
  };

  const getFunctioningLabel = (level: string) => {
    switch (level) {
      case "high":
        return "High Adaptive Function";
      case "moderate":
        return "Moderate Adaptive Function";
      case "low":
        return "Low Adaptive Function";
      default:
        return "Unknown";
    }
  };

  const scoreRows = Object.entries(data.scores)
    .sort(([, a], [, b]) => b - a)
    .map(([type, score]) => {
      const isPrimary = type === data.primaryType;
      const isSecondary = type === data.secondaryType;
      const isNeurotypical = type === "neurotypical";
      const typeName = type.charAt(0).toUpperCase() + type.slice(1);
      return `
        <tr>
          <td style="padding: 12px; color: ${isNeurotypical ? "#22c55e" : isPrimary ? "#d4af37" : isSecondary ? "#e8c4c4" : "#94a3b8"}; font-weight: ${isPrimary ? "bold" : "normal"};">
            ${typeName}${isPrimary ? " (Primary)" : isSecondary ? " (Secondary)" : ""}
          </td>
          <td style="padding: 12px; text-align: right;">
            <span style="display: inline-block; background: ${isNeurotypical ? "#14532d" : isPrimary ? "#d4af37" : isSecondary ? "#722139" : "#333"}; color: ${isNeurotypical ? "#22c55e" : isPrimary ? "#0a0a0a" : "#fff"}; padding: 4px 12px; border-radius: 20px; font-weight: bold;">
              ${score}%
            </span>
          </td>
        </tr>
      `;
    })
    .join("");

  const traitsList = data.primaryProfile.traits
    .map((t) => `<li style="color: #94a3b8; margin: 8px 0;">${t}</li>`)
    .join("");
  const strengthsList = data.primaryProfile.strengths
    .map(
      (s) =>
        `<li style="color: #94a3b8; margin: 8px 0;"><span style="color: #22c55e;">✓</span> ${s}</li>`,
    )
    .join("");
  const blindSpotsList = data.primaryProfile.blindSpots
    .map(
      (b) =>
        `<li style="color: #94a3b8; margin: 8px 0;"><span style="color: #ef4444;">!</span> ${b}</li>`,
    )
    .join("");

  const diagnosisSection = data.diagnosis
    ? `
    <!-- Clinical Diagnosis -->
    <tr>
      <td style="padding: 30px 30px 20px; border-left: 1px solid #d4af37; border-right: 1px solid #d4af37;">
        <div style="background: linear-gradient(135deg, #0a0a0a 0%, #1a0d11 100%); padding: 30px; border-radius: 10px; border: 2px solid #d4af37; text-align: center;">
          <div style="margin-bottom: 15px;">
            <span style="display: inline-block; background: #d4af37; color: #0a0a0a; padding: 6px 16px; border-radius: 20px; font-size: 11px; text-transform: uppercase; letter-spacing: 2px; font-weight: bold;">
              Clinical Assessment
            </span>
          </div>
          <h2 style="color: #d4af37; margin: 0 0 15px 0; font-size: 24px; font-weight: 600; font-family: 'Courier New', monospace; letter-spacing: 1px;">
            ${data.diagnosis.clinicalLabel}
          </h2>
          <div style="display: inline-block; background: ${getFunctioningColor(data.diagnosis.functioningLevel).bg}; border: 1px solid ${getFunctioningColor(data.diagnosis.functioningLevel).border}; padding: 8px 20px; border-radius: 20px;">
            <span style="color: ${getFunctioningColor(data.diagnosis.functioningLevel).text}; font-size: 13px; font-weight: 600;">
              ${getFunctioningLabel(data.diagnosis.functioningLevel)}
            </span>
          </div>
        </div>
      </td>
    </tr>

    <!-- Functioning Assessment Description -->
    <tr>
      <td style="padding: 0 30px 20px; border-left: 1px solid #d4af37; border-right: 1px solid #d4af37;">
        <div style="background: #0a0a0a; padding: 20px; border-radius: 8px; border: 1px solid #333;">
          <h4 style="color: #d4af37; margin: 0 0 10px 0; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">
            Functioning Assessment
          </h4>
          <p style="color: #94a3b8; margin: 0; line-height: 1.7; font-size: 14px;">
            ${data.diagnosis.description}
          </p>
        </div>
      </td>
    </tr>
  `
    : "";

  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Your Dark Mirror Results - Kanika Batra</title>
    </head>
    <body style="margin: 0; padding: 0; background-color: #0a0a0a; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #0a0a0a;">
        <tr>
          <td align="center" style="padding: 40px 20px;">
            <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="max-width: 600px; width: 100%; background-color: #050511; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 40px rgba(212, 175, 55, 0.15);">

              <!-- Header -->
              <tr>
                <td style="background: linear-gradient(135deg, #720921 0%, #0a1628 100%); padding: 40px 30px; text-align: center;">
                  <h1 style="color: #d4af37; margin: 0 0 10px 0; font-size: 28px; font-weight: 300; letter-spacing: 2px; text-transform: uppercase;">
                    The Dark Mirror Assessment
                  </h1>
                  <p style="color: #94a3b8; margin: 0; font-size: 14px; letter-spacing: 1px;">
                    Your Complete Results
                  </p>
                </td>
              </tr>

              ${diagnosisSection}

              <!-- Primary Type -->
              <tr>
                <td style="padding: 40px 30px 20px; border-left: 1px solid #d4af37; border-right: 1px solid #d4af37;">
                  <div style="background: linear-gradient(135deg, #1a0d11 0%, #0f0a0f 100%); padding: 30px; border-radius: 10px; border: 2px solid #d4af37;">
                    <div style="text-align: center; margin-bottom: 20px;">
                      <span style="display: inline-block; background: #d4af37; color: #0a0a0a; padding: 6px 16px; border-radius: 20px; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; font-weight: bold;">
                        Primary Type
                      </span>
                    </div>
                    <h2 style="color: #d4af37; margin: 0 0 10px 0; font-size: 32px; font-weight: 600; text-align: center;">
                      ${data.primaryProfile.name}
                    </h2>
                    <p style="color: #e8c4c4; margin: 0 0 20px 0; font-size: 16px; font-style: italic; text-align: center;">
                      "${data.primaryProfile.tagline}"
                    </p>
                    <p style="color: #94a3b8; line-height: 1.8; font-size: 15px;">
                      ${data.primaryProfile.description}
                    </p>
                  </div>
                </td>
              </tr>

              <!-- Score Breakdown -->
              <tr>
                <td style="padding: 20px 30px; border-left: 1px solid #d4af37; border-right: 1px solid #d4af37;">
                  <h3 style="color: #d4af37; margin: 0 0 20px 0; font-size: 18px; text-transform: uppercase; letter-spacing: 1px; text-align: center;">
                    Your Score Breakdown
                  </h3>
                  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background: #0a0a0a; border-radius: 8px; overflow: hidden;">
                    ${scoreRows}
                  </table>
                </td>
              </tr>

              <!-- Traits -->
              <tr>
                <td style="padding: 20px 30px; border-left: 1px solid #d4af37; border-right: 1px solid #d4af37;">
                  <h3 style="color: #d4af37; margin: 0 0 15px 0; font-size: 16px; text-transform: uppercase; letter-spacing: 1px;">
                    Defining Traits
                  </h3>
                  <ul style="margin: 0; padding: 0 0 0 20px;">
                    ${traitsList}
                  </ul>
                </td>
              </tr>

              <!-- Strengths & Blind Spots -->
              <tr>
                <td style="padding: 20px 30px; border-left: 1px solid #d4af37; border-right: 1px solid #d4af37;">
                  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                    <tr>
                      <td width="48%" valign="top" style="background: #0a0a0a; padding: 20px; border-radius: 8px;">
                        <h4 style="color: #22c55e; margin: 0 0 15px 0; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">
                          Strengths
                        </h4>
                        <ul style="margin: 0; padding: 0; list-style: none;">
                          ${strengthsList}
                        </ul>
                      </td>
                      <td width="4%"></td>
                      <td width="48%" valign="top" style="background: #0a0a0a; padding: 20px; border-radius: 8px;">
                        <h4 style="color: #ef4444; margin: 0 0 15px 0; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">
                          Blind Spots
                        </h4>
                        <ul style="margin: 0; padding: 0; list-style: none;">
                          ${blindSpotsList}
                        </ul>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              <!-- Relationship Pattern -->
              <tr>
                <td style="padding: 20px 30px; border-left: 1px solid #d4af37; border-right: 1px solid #d4af37;">
                  <div style="background: linear-gradient(135deg, #1a0d11 0%, #0f0a0f 100%); padding: 25px; border-radius: 8px; border: 1px solid #722139;">
                    <h4 style="color: #d4af37; margin: 0 0 15px 0; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">
                      Relationship Pattern
                    </h4>
                    <p style="color: #94a3b8; margin: 0; line-height: 1.8; font-size: 14px;">
                      ${data.primaryProfile.relationshipPattern}
                    </p>
                  </div>
                </td>
              </tr>

              <!-- Secondary Type -->
              <tr>
                <td style="padding: 20px 30px; border-left: 1px solid #d4af37; border-right: 1px solid #d4af37;">
                  <div style="background: #0a0a0a; padding: 25px; border-radius: 8px; border: 1px solid #333;">
                    <div style="text-align: center; margin-bottom: 15px;">
                      <span style="display: inline-block; background: #722139; color: #e8c4c4; padding: 4px 12px; border-radius: 20px; font-size: 11px; text-transform: uppercase; letter-spacing: 1px;">
                        Secondary Type
                      </span>
                    </div>
                    <h3 style="color: #e8c4c4; margin: 0 0 10px 0; font-size: 22px; font-weight: 600; text-align: center;">
                      ${data.secondaryProfile.name}
                    </h3>
                    <p style="color: #94a3b8; margin: 0 0 15px 0; font-size: 14px; font-style: italic; text-align: center;">
                      "${data.secondaryProfile.tagline}"
                    </p>
                    <p style="color: #94a3b8; line-height: 1.7; font-size: 14px; margin: 0;">
                      ${data.secondaryProfile.description}
                    </p>
                  </div>
                </td>
              </tr>

              <!-- Upsell Section -->
              <tr>
                <td style="padding: 30px; border-left: 1px solid #d4af37; border-right: 1px solid #d4af37;">
                  <h3 style="color: #d4af37; margin: 0 0 20px 0; font-size: 18px; text-align: center;">
                    Go Deeper
                  </h3>
                  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                    <tr>
                      <td width="48%" valign="top" style="background: #1a0d11; padding: 20px; border-radius: 8px; border: 1px solid #722139;">
                        <div style="text-align: center;">
                          <span style="font-size: 28px;">📖</span>
                          <h4 style="color: #d4af37; margin: 15px 0 10px 0; font-size: 16px;">
                            The Sociopathic Dating Bible
                          </h4>
                          <p style="color: #94a3b8; margin: 0 0 15px 0; font-size: 13px; line-height: 1.6;">
                            Master the psychology behind attraction and power dynamics.
                          </p>
                          <a href="${baseUrl}/book" style="display: inline-block; background: #d4af37; color: #0a0a0a; padding: 10px 20px; text-decoration: none; border-radius: 20px; font-size: 12px; font-weight: bold; text-transform: uppercase;">
                            Get the Book
                          </a>
                        </div>
                      </td>
                      <td width="4%"></td>
                      <td width="48%" valign="top" style="background: #1a0d11; padding: 20px; border-radius: 8px; border: 1px solid #722139;">
                        <div style="text-align: center;">
                          <span style="font-size: 28px;">🎯</span>
                          <h4 style="color: #d4af37; margin: 15px 0 10px 0; font-size: 16px;">
                            1:1 Coaching
                          </h4>
                          <p style="color: #94a3b8; margin: 0 0 15px 0; font-size: 13px; line-height: 1.6;">
                            Personal guidance from a clinically diagnosed sociopath.
                          </p>
                          <a href="${baseUrl}/coaching" style="display: inline-block; background: transparent; color: #d4af37; padding: 10px 20px; text-decoration: none; border-radius: 20px; font-size: 12px; font-weight: bold; text-transform: uppercase; border: 1px solid #d4af37;">
                            Book a Session
                          </a>
                        </div>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              <!-- Disclaimer -->
              <tr>
                <td style="padding: 20px 30px 30px; border-left: 1px solid #d4af37; border-right: 1px solid #d4af37; border-bottom: 1px solid #d4af37; border-radius: 0 0 12px 12px;">
                  <div style="background: #0a0a0a; padding: 15px; border-radius: 6px;">
                    <p style="color: #666; margin: 0; font-size: 11px; line-height: 1.6; text-align: center;">
                      <strong>Disclaimer:</strong> The Dark Mirror Assessment is for entertainment and educational purposes only. It is not a clinical diagnosis, psychological evaluation, or medical advice. If you have concerns about your mental health, please consult a licensed mental health professional.
                    </p>
                  </div>
                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td style="padding: 30px; text-align: center;">
                  <p style="color: #d4af37; margin: 0 0 5px 0; font-size: 16px; font-style: italic;">
                    Embrace your power,
                  </p>
                  <p style="color: #d4af37; margin: 0; font-size: 18px; font-weight: 600; letter-spacing: 1px;">
                    Kanika Batra
                  </p>
                  <p style="color: #666; margin: 5px 0 0 0; font-size: 12px;">
                    The Psychology of Power
                  </p>
                </td>
              </tr>

            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;

  return await sendEmail({
    to: data.email,
    subject: `Your Dark Mirror Results: ${data.primaryProfile.name}`,
    html,
  });
};

// ============================================
// Inner Circle Application Emails
// ============================================

interface ApplicationDetails {
  applicantName: string;
  applicantEmail: string;
  whyJoin: string;
  whatHope: string;
  howFound: string;
}

const luxuryEmailShell = (innerHtml: string, headerTitle: string, headerSub: string): string => `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${headerTitle}</title>
  </head>
  <body style="margin: 0; padding: 0; background-color: #0a0a0a; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #0a0a0a;">
      <tr>
        <td align="center" style="padding: 40px 20px;">
          <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="max-width: 600px; width: 100%; background-color: #050511; border-radius: 12px; overflow: hidden;">
            <tr>
              <td bgcolor="#3d0f1a" style="padding: 40px 30px; text-align: center;">
                <h1 style="color: #d4af37; margin: 0 0 10px 0; font-size: 26px; font-weight: 300; letter-spacing: 2px; text-transform: uppercase;">
                  ${headerTitle}
                </h1>
                <p style="color: #94a3b8; margin: 0; font-size: 13px; letter-spacing: 1px;">
                  ${headerSub}
                </p>
              </td>
            </tr>
            <tr>
              <td style="padding: 40px 30px; border-left: 1px solid #d4af37; border-right: 1px solid #d4af37; border-bottom: 1px solid #d4af37;">
                ${innerHtml}
                <div style="margin-top: 35px; padding-top: 25px; border-top: 1px solid #2a1820; text-align: center;">
                  <p style="color: #d4af37; margin: 0; font-size: 16px; font-weight: 600; letter-spacing: 1px;">Kanika Batra</p>
                  <p style="color: #666; margin: 5px 0 0 0; font-size: 12px;">The Inner Circle</p>
                </div>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>
`;

export const sendApplicationConfirmation = async (
  applicantEmail: string,
  applicantName: string,
): Promise<boolean> => {
  const inner = `
    <p style="color: #f5f0ed; font-size: 18px; margin: 0 0 20px 0; line-height: 1.6;">
      Dear ${esc(applicantName)},
    </p>
    <p style="color: #94a3b8; line-height: 1.8; margin: 0 0 20px 0; font-size: 15px;">
      Your application to The Inner Circle has been received. Every applicant is reviewed personally — this is not a community you can buy your way into.
    </p>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin: 25px 0;">
      <tr>
        <td bgcolor="#1a0d11" style="padding: 25px; border-radius: 10px; border: 1px solid #d4af37;">
          <h3 style="color: #d4af37; margin: 0 0 12px 0; font-size: 15px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">
            What Happens Next
          </h3>
          <p style="color: #94a3b8; margin: 0; font-size: 14px; line-height: 1.7;">
            We review every application within 24 hours. If you're approved, you'll receive a follow-up email with your subscription link and immediate access to the community feed, daily insights, classroom modules, and Kanika's voice notes.
          </p>
        </td>
      </tr>
    </table>
    <p style="color: #94a3b8; line-height: 1.8; margin: 20px 0 0 0; font-size: 14px;">
      In the meantime, keep an eye on your inbox &mdash; including your spam folder.
    </p>
  `;

  return await sendEmail({
    to: applicantEmail,
    subject: "Your Inner Circle application has been received",
    html: luxuryEmailShell(inner, "Application Received", "We're reviewing your submission"),
  });
};

export const sendAdminApplicationAlert = async (
  details: ApplicationDetails,
): Promise<boolean> => {
  const adminEmail = process.env.ADMIN_EMAIL || "Kanika@kanikarose.com";
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://kanikarose.com";

  const inner = `
    <p style="color: #f5f0ed; font-size: 16px; margin: 0 0 25px 0; line-height: 1.6;">
      A new application has been submitted to The Inner Circle.
    </p>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin: 0 0 25px 0;">
      <tr>
        <td bgcolor="#1a0d11" style="padding: 22px; border-radius: 10px; border: 1px solid #d4af37;">
          <p style="color: #94a3b8; margin: 0 0 8px 0; font-size: 13px;"><strong style="color: #d4af37;">Name:</strong> ${esc(details.applicantName)}</p>
          <p style="color: #94a3b8; margin: 0 0 8px 0; font-size: 13px;"><strong style="color: #d4af37;">Email:</strong> ${esc(details.applicantEmail)}</p>
          <p style="color: #94a3b8; margin: 0; font-size: 13px;"><strong style="color: #d4af37;">How they found us:</strong> ${esc(details.howFound)}</p>
        </td>
      </tr>
    </table>
    <h3 style="color: #d4af37; margin: 25px 0 10px 0; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">Why They Want To Join</h3>
    <div style="background: #0a0a0a; padding: 18px; border-radius: 8px; border-left: 3px solid #d4af37;">
      <p style="color: #f5f0ed; margin: 0; font-size: 14px; line-height: 1.7; white-space: pre-wrap;">${esc(details.whyJoin)}</p>
    </div>
    <h3 style="color: #d4af37; margin: 25px 0 10px 0; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">What They Hope To Gain</h3>
    <div style="background: #0a0a0a; padding: 18px; border-radius: 8px; border-left: 3px solid #d4af37;">
      <p style="color: #f5f0ed; margin: 0; font-size: 14px; line-height: 1.7; white-space: pre-wrap;">${esc(details.whatHope)}</p>
    </div>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin: 30px 0 0 0;">
      <tr>
        <td align="center">
          <table role="presentation" cellspacing="0" cellpadding="0" border="0">
            <tr>
              <td bgcolor="#d4af37" style="border-radius: 50px;" align="center">
                <a href="${baseUrl}/admin/applications" target="_blank" style="display: inline-block; color: #050511; padding: 16px 42px; text-decoration: none; font-weight: 700; font-size: 14px; letter-spacing: 1px; text-transform: uppercase; border-radius: 50px;">Review Application</a>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  `;

  return await sendEmail({
    to: adminEmail,
    // Strip CRLF from user-supplied names to prevent header injection.
    subject: `[Inner Circle] New application from ${details.applicantName.replace(/[\r\n]/g, " ")}`,
    html: luxuryEmailShell(inner, "New Application", `From ${esc(details.applicantName)}`),
    replyTo: details.applicantEmail,
  });
};

// ============================================
// Weekly digest for Inner Circle members
// ============================================

interface DigestPost {
  id: string;
  title: string;
  type: string;
  excerpt: string;
  commentCount: number;
}

interface DigestVoiceNote {
  id: string;
  title: string;
}

interface DigestCourse {
  id: string;
  title: string;
  slug: string;
}

interface WeeklyDigestData {
  memberEmail: string;
  memberName: string;
  weekStart: Date;
  weekEnd: Date;
  newPosts: DigestPost[];
  newVoiceNotes: DigestVoiceNote[];
  newCourses: DigestCourse[];
  newCommentsOnYourPosts: number;
}

export const sendWeeklyDigest = async (
  data: WeeklyDigestData,
): Promise<boolean> => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://kanikarose.com";

  // If there's nothing new this week, send a lightweight nudge instead of
  // a full digest — still valuable for retention but doesn't pretend
  // there's content when there isn't.
  const hasContent =
    data.newPosts.length > 0 ||
    data.newVoiceNotes.length > 0 ||
    data.newCourses.length > 0;

  const weekRange = `${data.weekStart.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  })} – ${data.weekEnd.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  })}`;

  const postsBlock =
    data.newPosts.length > 0
      ? `
    <h3 style="color: #d4af37; margin: 25px 0 12px 0; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">New in the feed</h3>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
      ${data.newPosts
        .slice(0, 5)
        .map(
          (post) => `
        <tr>
          <td style="padding: 0 0 14px 0;">
            <a href="${baseUrl}/inner-circle/feed/${post.id}" style="text-decoration: none; color: inherit;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background: #1a0d11; border: 1px solid rgba(212,175,55,0.15); border-radius: 10px;">
                <tr>
                  <td style="padding: 16px 18px;">
                    <p style="color: #f5f0ed; margin: 0 0 6px 0; font-size: 15px; font-weight: 500;">${esc(post.title)}</p>
                    <p style="color: #94a3b8; margin: 0; font-size: 13px; line-height: 1.5;">${esc(post.excerpt)}</p>
                    ${post.commentCount > 0 ? `<p style="color: #d4af37; margin: 8px 0 0 0; font-size: 11px;">${post.commentCount} comment${post.commentCount === 1 ? "" : "s"}</p>` : ""}
                  </td>
                </tr>
              </table>
            </a>
          </td>
        </tr>
      `,
        )
        .join("")}
    </table>
  `
      : "";

  const voiceNotesBlock =
    data.newVoiceNotes.length > 0
      ? `
    <h3 style="color: #d4af37; margin: 25px 0 12px 0; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">New voice notes</h3>
    <ul style="color: #f5f0ed; font-size: 14px; line-height: 1.8; margin: 0; padding-left: 20px;">
      ${data.newVoiceNotes
        .map(
          (vn) => `
        <li><a href="${baseUrl}/inner-circle/voice-notes" style="color: #d4af37; text-decoration: none;">${esc(vn.title)}</a></li>
      `,
        )
        .join("")}
    </ul>
  `
      : "";

  const coursesBlock =
    data.newCourses.length > 0
      ? `
    <h3 style="color: #d4af37; margin: 25px 0 12px 0; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">New in the classroom</h3>
    <ul style="color: #f5f0ed; font-size: 14px; line-height: 1.8; margin: 0; padding-left: 20px;">
      ${data.newCourses
        .map(
          (c) => `
        <li><a href="${baseUrl}/inner-circle/classroom/${esc(c.slug)}" style="color: #d4af37; text-decoration: none;">${esc(c.title)}</a></li>
      `,
        )
        .join("")}
    </ul>
  `
      : "";

  const nudgeBlock = !hasContent
    ? `
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin: 25px 0;">
      <tr>
        <td bgcolor="#1a0d11" style="padding: 22px; border-radius: 10px; border: 1px solid rgba(212,175,55,0.2); text-align: center;">
          <p style="color: #94a3b8; margin: 0; font-size: 14px; line-height: 1.6;">
            A quiet week inside. Still worth stopping by to catch up on
            conversations in the feed and check on your classroom progress.
          </p>
        </td>
      </tr>
    </table>
  `
    : "";

  const commentsNote =
    data.newCommentsOnYourPosts > 0
      ? `
    <p style="color: #94a3b8; line-height: 1.8; margin: 0 0 18px 0; font-size: 13px;">
      You have <strong style="color: #d4af37;">${data.newCommentsOnYourPosts}</strong> new reply${data.newCommentsOnYourPosts === 1 ? "" : "s"} on your comments this week.
    </p>
  `
      : "";

  const inner = `
    <p style="color: #f5f0ed; font-size: 18px; margin: 0 0 10px 0; line-height: 1.6;">
      Hi ${esc(data.memberName)},
    </p>
    <p style="color: #94a3b8; line-height: 1.8; margin: 0 0 25px 0; font-size: 14px;">
      Here's what happened inside The Inner Circle this past week (${weekRange}).
    </p>

    ${commentsNote}
    ${postsBlock}
    ${voiceNotesBlock}
    ${coursesBlock}
    ${nudgeBlock}

    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin: 30px 0 0 0;">
      <tr>
        <td align="center">
          <table role="presentation" cellspacing="0" cellpadding="0" border="0">
            <tr>
              <td bgcolor="#d4af37" style="border-radius: 50px;" align="center">
                <a href="${baseUrl}/inner-circle/feed" target="_blank" style="display: inline-block; color: #050511; padding: 16px 42px; text-decoration: none; font-weight: 700; font-size: 14px; letter-spacing: 1px; text-transform: uppercase; border-radius: 50px;">Open the feed</a>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>

    <p style="color: #666; line-height: 1.6; margin: 30px 0 0 0; font-size: 11px; text-align: center;">
      You're receiving this because you're an active member of The Inner Circle.
      <br>
      <a href="${baseUrl}/profile" style="color: #888; text-decoration: underline;">Manage preferences</a>
    </p>
  `;

  return await sendEmail({
    to: data.memberEmail,
    subject: `The Inner Circle — this week in review`,
    html: luxuryEmailShell(inner, "Weekly Digest", weekRange),
  });
};

export const sendInnerCircleWelcomeNewUser = async (
  userEmail: string,
  userName: string,
  resetToken: string,
): Promise<boolean> => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://kanikarose.com";
  const setPasswordUrl = `${baseUrl}/reset-password?token=${resetToken}`;

  const inner = `
    <p style="color: #f5f0ed; font-size: 18px; margin: 0 0 20px 0; line-height: 1.6;">
      Welcome ${esc(userName)},
    </p>
    <p style="color: #94a3b8; line-height: 1.8; margin: 0 0 25px 0; font-size: 15px;">
      Your subscription to The Inner Circle is active. Because you checked out
      directly from Stripe, we created an account for you using the email
      address you provided.
    </p>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin: 0 0 25px 0;">
      <tr>
        <td bgcolor="#1a0d11" style="padding: 22px; border-radius: 10px; border: 1px solid #d4af37;">
          <p style="color: #d4af37; margin: 0 0 8px 0; font-size: 13px; text-transform: uppercase; letter-spacing: 1px;">Your Login</p>
          <p style="color: #f5f0ed; margin: 0; font-size: 15px; word-break: break-all;">${esc(userEmail)}</p>
        </td>
      </tr>
    </table>
    <p style="color: #94a3b8; line-height: 1.8; margin: 0 0 25px 0; font-size: 15px;">
      Set your password to log in for the first time. The link below is valid
      for 7 days.
    </p>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin: 0 0 25px 0;">
      <tr>
        <td align="center">
          <table role="presentation" cellspacing="0" cellpadding="0" border="0">
            <tr>
              <td bgcolor="#d4af37" style="border-radius: 50px;" align="center">
                <a href="${setPasswordUrl}" target="_blank" style="display: inline-block; color: #050511; padding: 18px 50px; text-decoration: none; font-weight: 700; font-size: 16px; letter-spacing: 1px; text-transform: uppercase; border-radius: 50px;">Set Your Password</a>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
    <p style="color: #94a3b8; line-height: 1.8; margin: 0 0 0 0; font-size: 13px; text-align: center;">
      Once your password is set, log in at <a href="${baseUrl}/login" style="color: #d4af37;">${baseUrl}/login</a> to access the feed, voice notes, and classroom.
    </p>
  `;

  return await sendEmail({
    to: userEmail,
    subject: "Welcome to The Inner Circle — set your password",
    html: luxuryEmailShell(inner, "Welcome", "Your account is ready"),
  });
};

export const sendApplicationApproved = async (
  applicantEmail: string,
  applicantName: string,
): Promise<boolean> => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://kanikarose.com";

  const inner = `
    <p style="color: #f5f0ed; font-size: 18px; margin: 0 0 20px 0; line-height: 1.6;">
      Dear ${esc(applicantName)},
    </p>
    <p style="color: #94a3b8; line-height: 1.8; margin: 0 0 25px 0; font-size: 15px;">
      You've been approved for The Inner Circle. Welcome to the room you've been trying to enter.
    </p>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin: 0 0 30px 0;">
      <tr>
        <td bgcolor="#1a0d11" style="padding: 25px; border-radius: 10px; border: 2px solid #d4af37;">
          <h3 style="color: #d4af37; margin: 0 0 15px 0; font-size: 17px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; text-align: center;">
            What You're Getting
          </h3>
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
            <tr><td style="padding: 8px 0; color: #f5f0ed; font-size: 14px; line-height: 1.6; border-bottom: 1px solid #2a1820;"><strong style="color: #d4af37;">Daily insights</strong> &mdash; psychology drops curated for your patterns</td></tr>
            <tr><td style="padding: 8px 0; color: #f5f0ed; font-size: 14px; line-height: 1.6; border-bottom: 1px solid #2a1820;"><strong style="color: #d4af37;">Voice notes from Kanika</strong> &mdash; private audio you won't hear anywhere else</td></tr>
            <tr><td style="padding: 8px 0; color: #f5f0ed; font-size: 14px; line-height: 1.6; border-bottom: 1px solid #2a1820;"><strong style="color: #d4af37;">The Classroom</strong> &mdash; structured modules on dark psychology mastery</td></tr>
            <tr><td style="padding: 8px 0; color: #f5f0ed; font-size: 14px; line-height: 1.6;"><strong style="color: #d4af37;">The community</strong> &mdash; people who finally see what you see</td></tr>
          </table>
        </td>
      </tr>
    </table>
    <p style="color: #94a3b8; line-height: 1.8; margin: 0 0 25px 0; font-size: 15px; text-align: center;">
      Complete your subscription below to activate your membership.
    </p>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin: 0 0 25px 0;">
      <tr>
        <td align="center">
          <table role="presentation" cellspacing="0" cellpadding="0" border="0">
            <tr>
              <td bgcolor="#d4af37" style="border-radius: 50px;" align="center">
                <a href="${baseUrl}/inner-circle/apply?status=approved" target="_blank" style="display: inline-block; color: #050511; padding: 18px 50px; text-decoration: none; font-weight: 700; font-size: 16px; letter-spacing: 1px; text-transform: uppercase; border-radius: 50px;">Activate Membership</a>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
    <p style="color: #94a3b8; line-height: 1.8; margin: 20px 0 0 0; font-size: 13px; text-align: center; font-style: italic;">
      You earned this. Now use it.
    </p>
  `;

  return await sendEmail({
    to: applicantEmail,
    subject: "You're in. Welcome to The Inner Circle.",
    html: luxuryEmailShell(inner, "Application Approved", "Welcome to The Inner Circle"),
  });
};
