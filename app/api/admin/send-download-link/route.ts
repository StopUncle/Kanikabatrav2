import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";
import { requireAdminSession } from "@/lib/admin/auth";
import { sendBookDelivery } from "@/lib/email";
import { BOOK_MAX_DOWNLOADS } from "@/lib/constants";

// Last-resort recovery path: when automated delivery + the retry cron have
// both given up, the admin panel calls this to mint a fresh purchase +
// token and email it. It MUST send through the same sendBookDelivery
// facade as every other path (Resend with retries and rate-limit backoff).
// The original implementation hand-rolled a nodemailer transport against
// the legacy SMTP_USER/SMTP_PASS env vars, which meant the rescue button
// depended on credentials nothing else used anymore.
export async function POST(request: NextRequest) {
  const unauthorized = await requireAdminSession();
  if (unauthorized) return unauthorized;

  try {
    const body = await request.json();
    const { email, name, isPremium, isUpdate } = body;

    if (!email || !name) {
      return NextResponse.json(
        { error: "Email and name are required" },
        { status: 400 },
      );
    }

    const normalizedEmail = String(email).trim().toLowerCase();
    const token = crypto.randomBytes(32).toString("hex");
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 30);

    const purchase = await prisma.purchase.create({
      data: {
        type: "BOOK",
        productVariant: isPremium ? "PREMIUM" : "KDP",
        customerEmail: normalizedEmail,
        customerName: name,
        amount: isUpdate ? 0 : isPremium ? 34.99 : 17.99,
        status: "COMPLETED",
        paypalOrderId: `MANUAL-${Date.now()}`,
        downloadToken: token,
        downloadCount: 0,
        maxDownloads: BOOK_MAX_DOWNLOADS,
        expiresAt: expiryDate,
        metadata: {
          source: isUpdate ? "book-update" : "admin-panel",
          createdBy: "admin",
          timestamp: new Date().toISOString(),
        },
      },
    });

    const sent = await sendBookDelivery(
      normalizedEmail,
      name,
      token,
      isPremium ? "PREMIUM" : null,
      expiryDate,
    );

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://kanikarose.com";
    const pdfUrl = `${baseUrl}/api/download?token=${token}&format=pdf`;
    const epubUrl = `${baseUrl}/api/download?token=${token}&format=epub`;

    if (!sent) {
      // Flag for cron/retry-emails and surface the failure to the admin
      // instead of pretending it went out. The links in this response
      // still work, so the admin can paste them to the customer directly.
      await prisma.purchase.update({
        where: { id: purchase.id },
        data: {
          metadata: {
            source: isUpdate ? "book-update" : "admin-panel",
            createdBy: "admin",
            timestamp: new Date().toISOString(),
            emailDeliveryFailed: true,
          },
        },
      });
      return NextResponse.json(
        {
          error:
            "The email failed to send after retries. It's been queued for automatic retry. You can also copy the links below and send them to the customer directly.",
          purchaseId: purchase.id,
          pdfUrl,
          epubUrl,
          expiresAt: expiryDate.toISOString(),
        },
        { status: 502 },
      );
    }

    return NextResponse.json({
      success: true,
      purchaseId: purchase.id,
      pdfUrl,
      epubUrl,
      expiresAt: expiryDate.toISOString(),
      message: `Download link sent to ${normalizedEmail}`,
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
