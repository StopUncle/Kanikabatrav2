import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/lib/auth/password";
import {
  generateAccessToken,
  generateRefreshToken,
} from "@/lib/auth/jwt";

function errorPage(message: string): Response {
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Invalid Link | Kanika Batra</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #0a0a0a;
      color: #e5e5e5;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    }
    .container {
      max-width: 480px;
      padding: 3rem 2rem;
      text-align: center;
    }
    h1 {
      font-size: 1.5rem;
      font-weight: 300;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: #d4af37;
      margin-bottom: 1.5rem;
    }
    p {
      font-size: 1rem;
      line-height: 1.7;
      color: #a0a0a0;
      margin-bottom: 2rem;
    }
    a {
      display: inline-block;
      padding: 0.75rem 2rem;
      border: 1px solid #d4af37;
      color: #d4af37;
      text-decoration: none;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      font-size: 0.85rem;
      transition: background 0.3s, color 0.3s;
    }
    a:hover { background: #d4af37; color: #0a0a0a; }
  </style>
</head>
<body>
  <div class="container">
    <h1>Invalid Link</h1>
    <p>${message}</p>
    <a href="/">Return Home</a>
  </div>
</body>
</html>`;

  return new Response(html, {
    status: 400,
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get("token");

    if (!token) {
      return errorPage(
        "No invitation token was provided. Please use the link from your email.",
      );
    }

    // Look up the email queue entry that has this trial token
    const queueEntry = await prisma.emailQueue.findFirst({
      where: {
        sequence: "book-buyer-welcome",
        metadata: {
          path: ["trialToken"],
          equals: token,
        },
      },
    });

    if (!queueEntry) {
      return errorPage(
        "This invitation link is invalid or has expired. If you purchased the book, please contact support for assistance.",
      );
    }

    const recipientEmail = queueEntry.recipientEmail;
    const recipientName = queueEntry.recipientName;

    // Check if the token was already claimed
    const metadata = (queueEntry.metadata as Record<string, unknown>) || {};
    if (metadata.claimed === true) {
      // Already claimed — just redirect to feed (they'll need to log in)
      return NextResponse.redirect(new URL("/inner-circle/feed", request.url));
    }

    // Find or create user
    let user = await prisma.user.findUnique({
      where: { email: recipientEmail },
    });

    if (!user) {
      const tempPassword = crypto.randomBytes(16).toString("hex");
      const hashedPassword = await hashPassword(tempPassword);
      user = await prisma.user.create({
        data: {
          email: recipientEmail,
          password: hashedPassword,
          name: recipientName,
        },
      });
    }

    // Check existing membership
    const existingMembership = await prisma.communityMembership.findUnique({
      where: { userId: user.id },
    });

    if (
      existingMembership &&
      (existingMembership.billingCycle === "trial" ||
        existingMembership.status === "ACTIVE")
    ) {
      const accessToken = generateAccessToken({
        userId: user.id,
        email: user.email,
      });
      const refreshToken = generateRefreshToken({
        userId: user.id,
        email: user.email,
      });

      const redirectUrl =
        existingMembership.status === "ACTIVE"
          ? "/inner-circle/feed"
          : "/inner-circle?message=trial-already-used";

      const response = NextResponse.redirect(
        new URL(redirectUrl, request.url),
      );
      response.cookies.set("accessToken", accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        maxAge: 15 * 60,
        path: "/",
      });
      response.cookies.set("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60,
        path: "/",
      });
      return response;
    }

    // Create membership with 30-day trial (first time only)
    const thirtyDaysFromNow = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

    await prisma.communityMembership.upsert({
      where: { userId: user.id },
      create: {
        userId: user.id,
        status: "ACTIVE",
        billingCycle: "trial",
        activatedAt: new Date(),
        expiresAt: thirtyDaysFromNow,
        applicationData: {
          source: "book-buyer-free-trial",
          claimedAt: new Date().toISOString(),
        },
      },
      update: {
        status: "ACTIVE",
        billingCycle: "trial",
        activatedAt: new Date(),
        expiresAt: thirtyDaysFromNow,
        applicationData: {
          source: "book-buyer-free-trial",
          claimedAt: new Date().toISOString(),
        },
      },
    });

    // Mark the queue entry as claimed
    await prisma.emailQueue.update({
      where: { id: queueEntry.id },
      data: {
        metadata: {
          ...metadata,
          claimed: true,
          claimedAt: new Date().toISOString(),
        },
      },
    });

    // Generate auth tokens so the user is logged in
    const accessToken = generateAccessToken({
      userId: user.id,
      email: user.email,
    });
    const refreshToken = generateRefreshToken({
      userId: user.id,
      email: user.email,
    });

    const response = NextResponse.redirect(
      new URL("/inner-circle/feed", request.url),
    );
    response.cookies.set("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: 15 * 60,
      path: "/",
    });
    response.cookies.set("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Claim trial error:", error);
    return errorPage(
      "Something went wrong while processing your invitation. Please try again or contact support.",
    );
  }
}
