import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { bookPurchaseWhere } from "@/lib/book/ownership";
import { sendBookDelivery } from "@/lib/email";
import crypto from "crypto";

// Simple in-memory rate limiter: max 3 requests per email per 15 minutes
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW = 15 * 60 * 1000;
const RATE_LIMIT_MAX = 3;

function isRateLimited(key: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(key);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW });
    return false;
  }

  if (entry.count >= RATE_LIMIT_MAX) return true;

  entry.count++;
  return false;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 },
      );
    }

    const normalizedEmail = email.trim().toLowerCase();

    if (!EMAIL_REGEX.test(normalizedEmail)) {
      return NextResponse.json(
        { error: "Please enter a valid email address" },
        { status: 400 },
      );
    }

    // Rate limit by email
    if (isRateLimited(normalizedEmail)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again in 15 minutes." },
        { status: 429 },
      );
    }

    // Find the most recent completed REAL book purchase for this email.
    // bookPurchaseWhere is load-bearing on this public endpoint: without
    // its variant filter, a subscription row (which also carries type
    // "BOOK") matched here, and anyone submitting a subscriber's email
    // got the full book minted and mailed to that subscriber for free.
    const purchase = await prisma.purchase.findFirst({
      where: bookPurchaseWhere(normalizedEmail),
      orderBy: { createdAt: "desc" },
    });

    if (!purchase) {
      // Intentionally vague to prevent email enumeration
      return NextResponse.json({
        success: true,
        message:
          "If a purchase exists for this email, a new download link will be sent shortly.",
      });
    }

    // Generate a fresh download token
    const downloadToken = crypto.randomBytes(32).toString("hex");
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 30);

    // Send email FIRST, only update DB if email succeeds.
    // Always deliver to the purchase email: sending to a caller-supplied
    // address would let anyone who knows a buyer's email exfiltrate the
    // book (and kill the buyer's live links via token rotation). Buyers
    // who mistyped their checkout email go through the admin panel.
    const sent = await sendBookDelivery(
      normalizedEmail,
      purchase.customerName,
      downloadToken,
      purchase.productVariant ?? null,
      expiresAt,
    );

    if (!sent) {
      return NextResponse.json(
        {
          error:
            "We couldn't send the email right now. Please contact Kanika@kanikarose.com for help.",
        },
        { status: 503 },
      );
    }

    // Email confirmed sent, now persist the new token
    await prisma.purchase.update({
      where: { id: purchase.id },
      data: {
        downloadToken,
        downloadCount: 0,
        expiresAt,
      },
    });

    return NextResponse.json({
      success: true,
      message:
        "If a purchase exists for this email, a new download link will be sent shortly.",
    });
  } catch (error) {
    console.error("Resend download error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please contact Kanika@kanikarose.com" },
      { status: 500 },
    );
  }
}
