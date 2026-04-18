import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { prisma } from "@/lib/prisma";

/**
 * Legacy book-buyer trial-claim endpoint — now a thin bridge into the
 * current magic-claim flow.
 *
 * History: the old implementation (replaced April 2026) was a GET that
 * created a user account, set session cookies, and activated a 30-day
 * membership — all on a raw URL click. That had two problems:
 *
 *   1. Email pre-scanners (Outlook SafeLinks, Gmail image proxy) GET
 *      the URL before the human clicks → the link could auto-consume.
 *   2. If a user record already existed for the email, the endpoint
 *      took over that account by cookie-setting — even if it was a
 *      paying member or an admin.
 *
 * Both are fixed in /consilium/claim (server-action + existing-account
 * bounce-to-login). Rather than patch this legacy endpoint twice, we
 * now translate whatever trial token arrives into a new magic-claim JWT
 * and redirect. The flow from there is the hardened one.
 */

function errorPage(message: string): Response {
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Invalid Link | Kanika Batra</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { min-height: 100vh; display: flex; align-items: center; justify-content: center; background: #0a0a0a; color: #e5e5e5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }
    .container { max-width: 480px; padding: 3rem 2rem; text-align: center; }
    h1 { font-size: 1.5rem; font-weight: 300; letter-spacing: 0.1em; text-transform: uppercase; color: #d4af37; margin-bottom: 1.5rem; }
    p { font-size: 1rem; line-height: 1.7; color: #a0a0a0; margin-bottom: 2rem; }
    a { display: inline-block; padding: 0.75rem 2rem; border: 1px solid #d4af37; color: #d4af37; text-decoration: none; text-transform: uppercase; letter-spacing: 0.1em; font-size: 0.85rem; transition: background 0.3s, color 0.3s; }
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
    const trialToken = searchParams.get("token");
    if (!trialToken) {
      return errorPage(
        "No invitation token was provided. Please use the link from your email.",
      );
    }

    // Look up the legacy EmailQueue entry that carried this trial token.
    const queueEntry = await prisma.emailQueue.findFirst({
      where: {
        sequence: "book-buyer-welcome",
        metadata: { path: ["trialToken"], equals: trialToken },
      },
    });
    if (!queueEntry) {
      return errorPage(
        "This invitation link is invalid or has expired. If you purchased the book, please contact support.",
      );
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      return errorPage("Server misconfiguration. Please contact support.");
    }

    // Sign a current-format magic-claim JWT and send the user to the
    // new, hardened claim flow. All of the safety properties live there.
    const magicToken = jwt.sign(
      {
        type: "consilium-gift",
        email: queueEntry.recipientEmail.toLowerCase(),
        name: queueEntry.recipientName || "Reader",
        v: 1,
      },
      secret,
      { expiresIn: "90d" },
    );

    return NextResponse.redirect(
      new URL(`/consilium/claim?token=${magicToken}`, request.url),
    );
  } catch {
    return errorPage("Something went wrong. Please try again or contact support.");
  }
}
