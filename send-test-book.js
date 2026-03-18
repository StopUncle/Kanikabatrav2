// Script to send a test book email WITH database purchase record
require("dotenv").config({ path: ".env.local" });
require("dotenv").config({ path: ".env" });
const { PrismaClient } = require("@prisma/client");
const nodemailer = require("nodemailer");
const crypto = require("crypto");

const prisma = new PrismaClient();

async function sendTestBook() {
  const email = "sdmatheson@outlook.com";
  const name = "SD";
  const isPremium = true;

  // Generate token
  const token = crypto.randomBytes(32).toString("hex");
  const baseUrl = "https://kanikarose.com";

  // Expiry date (30 days from now)
  const expiryDate = new Date();
  expiryDate.setDate(expiryDate.getDate() + 30);

  try {
    // Create purchase record in database
    console.log("Creating purchase record in database...");
    const purchase = await prisma.purchase.create({
      data: {
        type: "BOOK",
        productVariant: isPremium ? "PREMIUM" : "KDP",
        customerEmail: email,
        customerName: name,
        amount: isPremium ? 24.99 : 9.99,
        status: "COMPLETED",
        paypalOrderId: `TEST-${Date.now()}`,
        downloadToken: token,
        downloadCount: 0,
        maxDownloads: 10,
        expiresAt: expiryDate,
        metadata: {
          source: "test-script",
          createdBy: "claude",
          timestamp: new Date().toISOString(),
        },
      },
    });
    console.log("Purchase created:", purchase.id);

    // Download URLs
    const pdfUrl = `${baseUrl}/api/download?token=${token}&format=pdf`;
    const epubUrl = `${baseUrl}/api/download?token=${token}&format=epub`;
    const bonusNarcissistsUrl = `${baseUrl}/api/download?token=${token}&format=bonus-narcissists`;
    const bonusAvoidantsUrl = `${baseUrl}/api/download?token=${token}&format=bonus-avoidants`;

    const formattedExpiry = expiryDate.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });

    const premiumBonuses = isPremium
      ? `
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background: linear-gradient(135deg, #1a0d11 0%, #2a1a1f 100%); border-radius: 10px; margin: 0 0 25px 0; border: 2px solid #d4af37; box-shadow: 0 4px 15px rgba(212, 175, 55, 0.2);">
        <tr>
          <td style="padding: 25px;">
            <h3 style="color: #d4af37; margin: 0 0 20px 0; font-size: 18px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; text-align: center;">
              Your Premium Edition Bonuses
            </h3>
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
              <tr>
                <td style="padding: 12px 0; color: #f5f0ed; font-size: 14px; line-height: 1.6; border-bottom: 1px solid rgba(212, 175, 55, 0.2);">
                  <strong style="color: #d4af37;">Bonus Chapter 1:</strong> Understanding Narcissists
                  <br>
                  <a href="${bonusNarcissistsUrl}" style="color: #d4af37; text-decoration: underline; font-size: 13px;">Download PDF</a>
                </td>
              </tr>
              <tr>
                <td style="padding: 12px 0; color: #f5f0ed; font-size: 14px; line-height: 1.6; border-bottom: 1px solid rgba(212, 175, 55, 0.2);">
                  <strong style="color: #d4af37;">Bonus Chapter 2:</strong> The Avoidant Playbook
                  <br>
                  <a href="${bonusAvoidantsUrl}" style="color: #d4af37; text-decoration: underline; font-size: 13px;">Download PDF</a>
                </td>
              </tr>
              <tr>
                <td style="padding: 12px 0; color: #f5f0ed; font-size: 14px; line-height: 1.6; border-bottom: 1px solid rgba(212, 175, 55, 0.2);">
                  <strong style="color: #d4af37;">Private Telegram Community:</strong> Lifetime Access to Exclusive Group
                </td>
              </tr>
              <tr>
                <td style="padding: 12px 0; color: #f5f0ed; font-size: 14px; line-height: 1.6;">
                  <strong style="color: #d4af37;">$100 Discount:</strong> On your first 1-on-1 consultation
                </td>
              </tr>
            </table>
            <p style="color: #94a3b8; margin: 20px 0 0 0; font-size: 12px; text-align: center; line-height: 1.6;">
              Bonus chapter links use the same token as your main book download.
            </p>
          </td>
        </tr>
      </table>
    `
      : "";

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
              <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="max-width: 600px; width: 100%; background-color: #050511; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 40px rgba(212, 175, 55, 0.15);">

                <tr>
                  <td style="background: linear-gradient(135deg, #720921 0%, #0a1628 100%); padding: 40px 30px; text-align: center;">
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
                      Dear ${name},
                    </p>

                    <p style="color: #94a3b8; line-height: 1.8; margin: 0 0 30px 0; font-size: 15px;">
                      Your payment has been successfully processed. You now have instant access to:
                    </p>

                    <div style="background: linear-gradient(135deg, #1a0d11 0%, #0f0a0f 100%); padding: 25px; border-radius: 10px; margin: 0 0 30px 0; border: 1px solid #d4af37;">
                      <h2 style="color: #d4af37; margin: 0 0 15px 0; font-size: 20px; font-weight: 600;">
                        Sociopathic Dating Bible: A Cure For Empathy${isPremium ? " (Premium Edition)" : ""}
                      </h2>
                      <p style="color: #94a3b8; margin: 0; font-size: 14px; line-height: 1.6;">
                        70,000 words of strategic dating psychology from a diagnosed sociopath
                      </p>
                    </div>

                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin: 0 0 30px 0;">
                      <tr>
                        <td align="center">
                          <h3 style="color: #d4af37; margin: 0 0 20px 0; font-size: 16px; font-weight: 600;">
                            Choose Your Format
                          </h3>
                        </td>
                      </tr>
                      <tr>
                        <td align="center" style="padding-bottom: 15px;">
                          <a href="${pdfUrl}" style="display: inline-block; background: linear-gradient(135deg, #d4af37 0%, #b8941f 100%); color: #050511; padding: 18px 50px; text-decoration: none; border-radius: 50px; font-weight: 700; font-size: 16px; letter-spacing: 1px; text-transform: uppercase; box-shadow: 0 4px 15px rgba(212, 175, 55, 0.4);">
                            📄 Download PDF
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <td align="center">
                          <a href="${epubUrl}" style="display: inline-block; background: linear-gradient(135deg, #722139 0%, #4a1426 100%); color: #d4af37; padding: 18px 50px; text-decoration: none; border-radius: 50px; font-weight: 700; font-size: 16px; letter-spacing: 1px; text-transform: uppercase; box-shadow: 0 4px 15px rgba(114, 33, 57, 0.4); border: 2px solid #d4af37;">
                            📱 Download EPUB
                          </a>
                        </td>
                      </tr>
                    </table>

                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background: #0a0a0a; border-radius: 8px; margin: 0 0 25px 0; border: 1px solid #333;">
                      <tr>
                        <td style="padding: 20px;">
                          <h3 style="color: #d4af37; margin: 0 0 15px 0; font-size: 16px; font-weight: 600;">
                            Important Download Information
                          </h3>
                          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                            <tr>
                              <td style="padding: 8px 0; color: #94a3b8; font-size: 14px; line-height: 1.6;">
                                ✓ Link expires: <strong style="color: #d4af37;">${formattedExpiry}</strong>
                              </td>
                            </tr>
                            <tr>
                              <td style="padding: 8px 0; color: #94a3b8; font-size: 14px; line-height: 1.6;">
                                ✓ Maximum downloads: <strong style="color: #d4af37;">10 times total</strong>
                              </td>
                            </tr>
                            <tr>
                              <td style="padding: 8px 0; color: #94a3b8; font-size: 14px; line-height: 1.6;">
                                ✓ Both PDF &amp; EPUB formats available
                              </td>
                            </tr>
                            <tr>
                              <td style="padding: 8px 0; color: #94a3b8; font-size: 14px; line-height: 1.6;">
                                ✓ Save locally for permanent access
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
                            The Beautiful Sociopath
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

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || "587"),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    console.log("Sending email to:", email);

    const result = await transporter.sendMail({
      from: `"Kanika Batra" <${process.env.SMTP_USER}>`,
      to: email,
      subject: `Download Your Book - Sociopathic Dating Bible (Premium Edition)`,
      html: html,
    });

    console.log("Email sent:", result.messageId);
    console.log("\nDownload token:", token);
    console.log("Purchase ID:", purchase.id);
    console.log("\nThe download links should now work on the production site!");
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await prisma.$disconnect();
  }
}

sendTestBook();
