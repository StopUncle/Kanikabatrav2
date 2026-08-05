import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const sessionId = request.nextUrl.searchParams.get("session_id");
  const productKey = request.nextUrl.searchParams.get("product");

  if (!sessionId) {
    return NextResponse.json({ error: "Session ID required" }, { status: 400 });
  }

  try {
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    const email = session.customer_email || session.customer_details?.email;
    const name = session.customer_details?.name || email;
    const amount = ((session.amount_total || 0) / 100).toFixed(2);

    // Determine type from product key or metadata
    const type = productKey || session.metadata?.product_key || "purchase";
    // BOOK_CONSILIUM_*MO bundles also deliver the book, they need the
    // same download-token surfacing on the success page so buyers see
    // the immediate-download button rather than only relying on email.
    const isBook =
      type === "BOOK" ||
      type === "BOOK_CONSILIUM_1MO" ||
      type === "BOOK_CONSILIUM_3MO";
    const isCoaching = type.startsWith("COACHING");

    // For book purchases, find the purchase record with download token.
    // Looked up by THIS session's idempotency key, never by email: the
    // old most-recent-BOOK-purchase-for-this-email lookup meant any leaked
    // session id (history, referrer, analytics) surrendered a live
    // download token for a purchase it did not pay for.
    let downloadToken: string | null = null;
    if (isBook && email) {
      // The webhook may or may not have fired yet; poll briefly. Webhooks
      // typically land within a second or two, and the delivery email is
      // the backstop, so six seconds of spinner is the ceiling, not the
      // twenty the old loop held the request open for.
      for (let i = 0; i < 6; i++) {
        const purchase = await prisma.purchase.findUnique({
          where: { paypalOrderId: `ST-${sessionId}` },
          select: { downloadToken: true, status: true },
        });

        if (purchase?.downloadToken && purchase.status === "COMPLETED") {
          downloadToken = purchase.downloadToken;
          break;
        }

        // Wait 1 second before retrying
        if (i < 5) {
          await new Promise((resolve) => setTimeout(resolve, 1000));
        }
      }
    }

    // Find coaching package name if applicable
    let packageName = "Purchase";
    if (isCoaching) {
      const coachingNames: Record<string, string> = {
        COACHING_SINGLE: "Single Session",
        COACHING_CLARITY: "Clarity Pack (2 Sessions)",
        COACHING_INTENSIVE: "Intensive (3 Sessions)",
        COACHING_CAREER: "Career Coaching (4 Sessions)",
        COACHING_RETAINER: "Coaching Retainer",
      };
      packageName = coachingNames[type] || "Coaching Package";
    } else if (isBook) {
      packageName = "Sociopathic Dating Bible";
    }

    return NextResponse.json({
      success: true,
      type: isBook ? "book" : isCoaching ? "coaching" : "purchase",
      amount,
      // Full session id (not truncated). The coaching questionnaire endpoint
      // matches this against Purchase.paypalOrderId (stored as `ST-${sessionId}`
      // by the Stripe webhook); a truncated id silently broke that lookup and
      // dropped every coaching questionnaire submission.
      orderId: sessionId,
      customerName: name,
      customerEmail: email,
      packageName,
      downloadToken,
    });
  } catch (error) {
    console.error("Stripe session lookup error:", error);
    return NextResponse.json(
      { error: "Failed to retrieve session" },
      { status: 500 },
    );
  }
}
