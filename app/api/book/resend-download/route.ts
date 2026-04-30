import { NextResponse } from "next/server";
import crypto from "crypto";
import { optionalServerAuth } from "@/lib/auth/server-auth";
import { checkMembership } from "@/lib/community/membership";
import { prisma } from "@/lib/prisma";
import { sendBookDelivery } from "@/lib/email";

/**
 * Resend the book's download links to the authenticated member.
 *
 * Only available to ACTIVE Consilium members. For each qualifying member
 * we locate their most recent BOOK purchase, rotate the downloadToken to
 * a fresh value, extend the download window to now + 30 days, reset the
 * downloadCount to zero so the 10-download limit starts fresh, and fire
 * the standard sendBookDelivery email to their address.
 *
 * Rotation (rather than reuse) protects against a leaked old token still
 * being useful after the member requested a reset, useful if they ever
 * suspected the email was forwarded or accessed from a shared inbox.
 */
export async function POST() {
  const userId = await optionalServerAuth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const membership = await checkMembership(userId);
  if (!membership.isMember || membership.status !== "ACTIVE") {
    return NextResponse.json(
      { error: "Active Consilium membership required" },
      { status: 403 },
    );
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { email: true, name: true },
  });
  if (!user?.email) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  // Pick the most recent non-refunded BOOK purchase for this email.
  // Covers both the old bundled purchases (paypalOrderId: IC-BOOK-…) and
  // any standalone BOOK purchases, including the new $9.99 member ones.
  // Case-insensitive. Purchase rows carry the email as entered at
  // checkout, often mixed-case. User.email is lowercased at register.
  const existing = await prisma.purchase.findFirst({
    where: {
      customerEmail: { equals: user.email, mode: "insensitive" },
      type: "BOOK",
      status: "COMPLETED",
    },
    orderBy: { createdAt: "desc" },
  });

  if (!existing) {
    return NextResponse.json(
      { error: "No book purchase found on this account" },
      { status: 404 },
    );
  }

  const freshToken = crypto.randomBytes(32).toString("hex");
  const freshExpiry = new Date();
  freshExpiry.setDate(freshExpiry.getDate() + 30);

  await prisma.purchase.update({
    where: { id: existing.id },
    data: {
      downloadToken: freshToken,
      expiresAt: freshExpiry,
      downloadCount: 0,
    },
  });

  const emailSent = await sendBookDelivery(
    user.email,
    user.name || "Member",
    freshToken,
    null,
    freshExpiry,
  );

  if (!emailSent) {
    return NextResponse.json(
      { error: "Download links were refreshed but the email failed to send, contact Kanika@kanikarose.com" },
      { status: 502 },
    );
  }

  return NextResponse.json({
    success: true,
    message: `Fresh download links sent to ${user.email}`,
  });
}
