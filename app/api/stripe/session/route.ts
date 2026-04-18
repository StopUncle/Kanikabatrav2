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
    const isBook = type === "BOOK";
    const isCoaching = type.startsWith("COACHING");

    // For book purchases, find the purchase record with download token
    let downloadToken: string | null = null;
    if (isBook && email) {
      // The webhook may or may not have fired yet — poll up to 20 seconds.
      // Case-insensitive match because Stripe returns the email exactly
      // as the buyer typed it at checkout, while the webhook normalises
      // to lowercase before writing Purchase.customerEmail. A buyer who
      // typed Alice@Gmail.com used to miss the token entirely and only
      // get it from the email; now the success page can render the
      // immediate-download button regardless of email casing.
      for (let i = 0; i < 10; i++) {
        const purchase = await prisma.purchase.findFirst({
          where: {
            customerEmail: { equals: email, mode: "insensitive" },
            type: "BOOK",
            status: "COMPLETED",
            paypalOrderId: { startsWith: "ST-" },
          },
          orderBy: { createdAt: "desc" },
          select: { downloadToken: true },
        });

        if (purchase?.downloadToken) {
          downloadToken = purchase.downloadToken;
          break;
        }

        // Wait 2 seconds before retrying
        if (i < 9) {
          await new Promise((resolve) => setTimeout(resolve, 2000));
        }
      }
    }

    // Find coaching package name if applicable
    let packageName = "Purchase";
    if (isCoaching) {
      const coachingNames: Record<string, string> = {
        COACHING_SINGLE: "Single Session",
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
      orderId: sessionId.slice(0, 20),
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
