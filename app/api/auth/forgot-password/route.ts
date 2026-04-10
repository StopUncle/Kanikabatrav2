import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { PrismaUserDatabase } from "@/lib/auth/prisma-database";
import { prisma } from "@/lib/prisma";
import { sendEmail } from "@/lib/email";
import { enforceRateLimit, getClientIp, limits } from "@/lib/rate-limit";

function getJwtSecret(): string {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    if (process.env.NODE_ENV === "production") {
      throw new Error(
        "CRITICAL: JWT_SECRET environment variable is required in production",
      );
    }
    return "dev-only-secret-do-not-use-in-production";
  }
  return secret;
}

function buildResetEmail(resetUrl: string): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background-color:#0a0a0a;font-family:Georgia,'Times New Roman',serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#0a0a0a;">
    <tr>
      <td align="center" style="padding:40px 20px;">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#3d0f1a,#4a1426);padding:32px 40px;border-radius:12px 12px 0 0;text-align:center;">
              <h1 style="margin:0;color:#d4af37;font-size:24px;font-weight:300;letter-spacing:2px;">
                KANIKA BATRA
              </h1>
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="background-color:#111111;padding:40px;border-left:1px solid rgba(212,175,55,0.2);border-right:1px solid rgba(212,175,55,0.2);">
              <h2 style="margin:0 0 16px;color:#e5e5e5;font-size:20px;font-weight:300;">
                Reset Your Password
              </h2>
              <p style="margin:0 0 24px;color:#a0a0a0;font-size:15px;line-height:1.6;">
                Click the button below to reset your password. This link expires in 1 hour.
              </p>
              <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 auto 24px;">
                <tr>
                  <td style="border-radius:50px;background:linear-gradient(135deg,#722139,#4a1426);">
                    <a href="${resetUrl}" target="_blank" style="display:inline-block;padding:14px 32px;color:#d4af37;font-size:15px;font-weight:400;text-decoration:none;letter-spacing:1px;">
                      Reset Password
                    </a>
                  </td>
                </tr>
              </table>
              <p style="margin:0 0 8px;color:#a0a0a0;font-size:13px;line-height:1.5;">
                If you didn&rsquo;t request this, you can safely ignore this email.
              </p>
              <p style="margin:0;color:#666666;font-size:12px;line-height:1.5;word-break:break-all;">
                ${resetUrl}
              </p>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="background-color:#0a0a0a;padding:24px 40px;border-top:1px solid rgba(212,175,55,0.1);border-radius:0 0 12px 12px;text-align:center;">
              <p style="margin:0;color:#666666;font-size:12px;">
                &copy; ${new Date().getFullYear()} Kanika Batra. All rights reserved.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body as { email: string };

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 },
      );
    }

    // Normalize for lookup — register stores lowercase, so we must too.
    const normalizedEmail = email.toLowerCase().trim();

    // Rate limit by IP + email (prevents both IP-based flooding AND
    // targeted attacks against a single account from distributed IPs).
    const ip = getClientIp(request);
    const ipLimited = await enforceRateLimit(limits.authForgot, ip);
    if (ipLimited) return ipLimited;
    const emailLimited = await enforceRateLimit(
      limits.authForgot,
      `email:${normalizedEmail}`,
    );
    if (emailLimited) return emailLimited;
    const user = await PrismaUserDatabase.findByEmail(normalizedEmail);

    if (user) {
      // Look up the current tokenVersion so the issued token can be
      // invalidated after first use (reset-password increments it).
      const fullUser = await prisma.user.findUnique({
        where: { id: user.id },
        select: { tokenVersion: true },
      });
      const resetToken = jwt.sign(
        {
          userId: user.id,
          type: "password-reset",
          v: fullUser?.tokenVersion ?? 0,
        },
        getJwtSecret(),
        { expiresIn: "1h" },
      );

      const baseUrl =
        process.env.NEXT_PUBLIC_BASE_URL || "https://kanikarose.com";
      const resetUrl = `${baseUrl}/reset-password?token=${resetToken}`;

      // Wrap in try/catch so a sendEmail failure (SMTP down) returns
      // the same 200 as a nonexistent email — preventing an attacker
      // from distinguishing known vs unknown accounts by observing
      // 500 vs 200 response codes.
      try {
        await sendEmail({
          to: user.email,
          subject: "Reset Your Password \u2014 Kanika Batra",
          html: buildResetEmail(resetUrl),
          text: `Reset your password by visiting: ${resetUrl}\n\nThis link expires in 1 hour.\n\nIf you didn't request this, you can safely ignore this email.`,
        });
      } catch (err) {
        console.error("[forgot-password] failed to send reset email:", err);
      }
    }

    return NextResponse.json({
      success: true,
      message:
        "If an account exists with that email, you'll receive a reset link.",
    });
  } catch (error: unknown) {
    console.error("Forgot password error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
