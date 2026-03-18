import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import nodemailer from "nodemailer";
import crypto from "crypto";

// Validate admin access
function validateAdminAccess(request: NextRequest): boolean {
  const adminSecret = process.env.ADMIN_SECRET;
  if (!adminSecret) {
    console.error("ADMIN_SECRET not configured");
    return false;
  }
  const providedSecret = request.headers.get("x-admin-secret");
  return providedSecret === adminSecret;
}

export async function POST(request: NextRequest) {
  // Require admin authentication
  if (!validateAdminAccess(request)) {
    return NextResponse.json(
      { error: "Unauthorized - admin credentials required" },
      { status: 401 },
    );
  }

  try {
    const body = await request.json();
    const { email, name, isPremium, isUpdate } = body;

    if (!email || !name) {
      return NextResponse.json(
        { error: "Email and name are required" },
        { status: 400 },
      );
    }

    // Generate secure token
    const token = crypto.randomBytes(32).toString("hex");
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 30);

    // Create purchase record
    const purchase = await prisma.purchase.create({
      data: {
        type: "BOOK",
        productVariant: isPremium ? "PREMIUM" : "KDP",
        customerEmail: email,
        customerName: name,
        amount: isUpdate ? 0 : isPremium ? 34.99 : 17.99,
        status: "COMPLETED",
        paypalOrderId: `MANUAL-${Date.now()}`,
        downloadToken: token,
        downloadCount: 0,
        maxDownloads: 5,
        expiresAt: expiryDate,
        metadata: {
          source: isUpdate ? "book-update" : "admin-panel",
          createdBy: "admin",
          timestamp: new Date().toISOString(),
        },
      },
    });

    // Build URLs
    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL || "https://kanikabatra.com";
    const pdfUrl = `${baseUrl}/api/download?token=${token}&format=pdf`;
    const epubUrl = `${baseUrl}/api/download?token=${token}&format=epub`;

    const formattedExpiry = expiryDate.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });

    // Bonus chapter download URLs
    const bonusNarcissistsUrl = `${baseUrl}/api/download?token=${token}&format=bonus-narcissists`;
    const bonusAvoidantsUrl = `${baseUrl}/api/download?token=${token}&format=bonus-avoidants`;

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

    const updateHeading = isUpdate
      ? "Your Updated Book Is Ready"
      : "Thank You For Your Purchase";
    const updateSubheading = isUpdate
      ? "New content added &mdash; fresh download links inside"
      : "Your download is ready";
    const updateIntro = isUpdate
      ? `We've updated the Sociopathic Dating Bible with new content &mdash; including the addendum chapters. As a valued reader, here are your fresh download links for the latest version.`
      : `Your payment has been successfully processed. You now have instant access to:`;

    const html = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${isUpdate ? "Updated Book" : "Your Book Purchase"} - Kanika Batra</title>
      </head>
      <body style="margin: 0; padding: 0; background-color: #0a0a0a; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #0a0a0a;">
          <tr>
            <td align="center" style="padding: 40px 20px;">
              <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="max-width: 600px; width: 100%; background-color: #050511; border-radius: 12px; overflow: hidden;">

                <tr>
                  <td bgcolor="#3d0f1a" style="padding: 40px 30px; text-align: center;">
                    <h1 style="color: #d4af37; margin: 0 0 10px 0; font-size: 28px; font-weight: 300; letter-spacing: 2px; text-transform: uppercase;">
                      ${updateHeading}
                    </h1>
                    <p style="color: #94a3b8; margin: 0; font-size: 14px; letter-spacing: 1px;">
                      ${updateSubheading}
                    </p>
                  </td>
                </tr>

                <tr>
                  <td style="padding: 40px 30px; border-left: 1px solid #d4af37; border-right: 1px solid #d4af37; border-bottom: 1px solid #d4af37;">

                    <p style="color: #f5f0ed; font-size: 18px; margin: 0 0 20px 0; line-height: 1.6;">
                      Dear ${name},
                    </p>

                    <p style="color: #94a3b8; line-height: 1.8; margin: 0 0 30px 0; font-size: 15px;">
                      ${updateIntro}
                    </p>

                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin: 0 0 30px 0;">
                      <tr>
                        <td bgcolor="#1a0d11" style="padding: 25px; border-radius: 10px; border: 1px solid #d4af37;">
                          <h2 style="color: #d4af37; margin: 0 0 15px 0; font-size: 20px; font-weight: 600;">
                            Sociopathic Dating Bible: A Cure For Empathy${isPremium ? " (Premium Edition)" : ""}
                          </h2>
                          <p style="color: #94a3b8; margin: 0; font-size: 14px; line-height: 1.6;">
                            ${isUpdate ? "Now includes 2 bonus addendum chapters &mdash; Understanding Narcissists &amp; The Avoidant Playbook" : "70,000 words of strategic dating psychology from a diagnosed sociopath"}
                          </p>
                        </td>
                      </tr>
                    </table>

                    <!-- EPUB - Primary Download -->
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin: 0 0 25px 0;">
                      <tr>
                        <td align="center">
                          <h3 style="color: #d4af37; margin: 0 0 20px 0; font-size: 16px; font-weight: 600;">
                            ${isUpdate ? "Download The Updated Version" : "Download Your Book"}
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
                              <td align="center" style="padding-bottom: 12px;">
                                <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                                  <tr>
                                    <td bgcolor="#722139" style="border-radius: 50px; border: 1px solid #d4af37;" align="center">
                                      <a href="${bonusNarcissistsUrl}" target="_blank" style="display: inline-block; color: #d4af37; background-color: #722139; padding: 14px 40px; text-decoration: none; font-weight: 600; font-size: 14px; letter-spacing: 0.5px; border-radius: 50px;">Understanding Narcissists</a>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                            <tr>
                              <td align="center">
                                <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                                  <tr>
                                    <td bgcolor="#722139" style="border-radius: 50px; border: 1px solid #d4af37;" align="center">
                                      <a href="${bonusAvoidantsUrl}" target="_blank" style="display: inline-block; color: #d4af37; background-color: #722139; padding: 14px 40px; text-decoration: none; font-weight: 600; font-size: 14px; letter-spacing: 0.5px; border-radius: 50px;">The Avoidant Playbook</a>
                                    </td>
                                  </tr>
                                </table>
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
                                Link expires: <strong style="color: #d4af37;">${formattedExpiry}</strong>
                              </td>
                            </tr>
                            <tr>
                              <td style="padding: 8px 0; color: #94a3b8; font-size: 14px; line-height: 1.6;">
                                Maximum downloads: <strong style="color: #d4af37;">5 times total</strong> (across all formats)
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

    // Send email
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || "587"),
      secure: parseInt(process.env.SMTP_PORT || "587") === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const subject = isUpdate
      ? `Updated Book Ready — Sociopathic Dating Bible (Now With Addendum)${isPremium ? " — Premium Edition" : ""}`
      : `Download Your Book - Sociopathic Dating Bible${isPremium ? " (Premium Edition)" : ""}`;

    await transporter.sendMail({
      from: `"Kanika Batra" <${process.env.SMTP_USER}>`,
      to: email,
      subject,
      html: html,
    });

    return NextResponse.json({
      success: true,
      purchaseId: purchase.id,
      pdfUrl,
      epubUrl,
      expiresAt: expiryDate.toISOString(),
      message: `Download link sent to ${email}`,
    });
  } catch (error) {
    console.error("Error sending download link:", error);
    return NextResponse.json(
      {
        error: "Failed to send download link",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
