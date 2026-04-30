import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { paypalService } from "@/lib/paypal";
import {
  sendOrderConfirmation,
  sendBookDelivery,
  sendCoachingScheduling,
} from "@/lib/email";
import { BOOK_INFO, COACHING_PACKAGES } from "@/lib/constants";
import crypto from "crypto";
import jwt from "jsonwebtoken";

interface PayPalWebhookEvent {
  id: string;
  event_type: string;
  resource?: {
    id?: string;
    supplementary_data?: {
      related_ids?: {
        order_id?: string;
      };
    };
  };
}

async function verifyWebhookSignature(
  body: string,
  headers: Headers,
): Promise<boolean> {
  const webhookId = process.env.PAYPAL_WEBHOOK_ID;
  const transmissionId = headers.get("paypal-transmission-id");
  const transmissionTime = headers.get("paypal-transmission-time");
  const certUrl = headers.get("paypal-cert-url");
  const authAlgo = headers.get("paypal-auth-algo");
  const transmissionSig = headers.get("paypal-transmission-sig");

  if (process.env.NODE_ENV === "development" && !webhookId) {
    console.warn(
      "DEVELOPMENT MODE: Webhook verification bypassed - set PAYPAL_WEBHOOK_ID to enable",
    );
    return true;
  }

  if (
    !webhookId ||
    !transmissionId ||
    !transmissionTime ||
    !transmissionSig ||
    !certUrl ||
    !authAlgo
  ) {
    console.error(
      "Missing required PayPal webhook headers or PAYPAL_WEBHOOK_ID",
    );
    return false;
  }

  try {
    const accessToken = await paypalService.getAccessToken();
    const verifyUrl =
      process.env.NODE_ENV === "production"
        ? "https://api-m.paypal.com/v1/notifications/verify-webhook-signature"
        : "https://api-m.sandbox.paypal.com/v1/notifications/verify-webhook-signature";

    const response = await fetch(verifyUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        auth_algo: authAlgo,
        cert_url: certUrl,
        transmission_id: transmissionId,
        transmission_sig: transmissionSig,
        transmission_time: transmissionTime,
        webhook_id: webhookId,
        webhook_event: JSON.parse(body),
      }),
    });

    if (!response.ok) {
      console.error("PayPal verification API error:", response.status);
      return false;
    }

    const result = await response.json();
    const verified = result.verification_status === "SUCCESS";

    if (!verified) {
      console.error(
        "PayPal webhook signature verification failed:",
        result.verification_status,
      );
    }

    return verified;
  } catch (error) {
    console.error("PayPal webhook verification error:", error);
    return false;
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const event = JSON.parse(body);

    const isValid = await verifyWebhookSignature(body, request.headers);
    if (!isValid) {
      return NextResponse.json(
        { error: "Invalid webhook signature" },
        { status: 401 },
      );
    }

    switch (event.event_type) {
      case "CHECKOUT.ORDER.COMPLETED":
      case "PAYMENT.CAPTURE.COMPLETED":
        await handleOrderCompleted(event);
        break;

      case "PAYMENT.CAPTURE.DENIED":
      case "PAYMENT.CAPTURE.REFUNDED":
        await handlePaymentFailed(event);
        break;

      default:
        break;
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook processing error:", error);
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 },
    );
  }
}

async function handleOrderCompleted(event: PayPalWebhookEvent) {
  // For PAYMENT.CAPTURE.COMPLETED, the resource.id is the capture ID, not the order ID
  const orderId =
    event.event_type === "PAYMENT.CAPTURE.COMPLETED"
      ? event.resource?.supplementary_data?.related_ids?.order_id
      : event.resource?.id;

  if (!orderId) {
    console.error("No order ID in webhook event");
    return;
  }

  // Atomic idempotency: if capture-order already created this, skip
  const existingPurchase = await prisma.purchase.findFirst({
    where: { paypalOrderId: orderId },
  });

  if (existingPurchase) {
    // If capture-order already handled this, the purchase exists with a valid token.
    // Nothing more to do, email was already sent by capture-order.
    return;
  }

  // Get full order details from PayPal
  let orderDetails;
  try {
    orderDetails = await paypalService.getOrderDetails(orderId);
  } catch (error) {
    console.error("Failed to get order details from webhook:", error);
    return;
  }

  if (orderDetails.status !== "COMPLETED") {
    return;
  }

  const purchaseUnit = orderDetails.purchase_units?.[0];
  const amount = parseFloat(purchaseUnit?.amount?.value || "0");
  const payerEmail = orderDetails.payer?.email_address || "";
  const payerName =
    `${orderDetails.payer?.name?.given_name || ""} ${orderDetails.payer?.name?.surname || ""}`.trim();
  const referenceId = purchaseUnit?.reference_id || "";

  const isBookPurchase =
    referenceId === "book-purchase" || amount === BOOK_INFO.price;
  const purchaseType = isBookPurchase ? "BOOK" : "COACHING";

  // Generate token consistently with capture-order (crypto, not JWT)
  const downloadToken = crypto.randomBytes(32).toString("hex");
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 30);

  // Use upsert to handle race condition with capture-order atomically
  let purchase;
  try {
    purchase = await prisma.purchase.upsert({
      where: { paypalOrderId: orderId },
      create: {
        paypalOrderId: orderId,
        type: purchaseType,
        amount,
        status: "COMPLETED",
        customerEmail: payerEmail,
        customerName: payerName,
        downloadToken,
        expiresAt,
        metadata: {
          webhookEventId: event.id,
          webhookEventType: event.event_type,
          source: "webhook",
        },
      },
      // If capture-order already created this row, don't overwrite anything
      update: {},
    });
  } catch (error) {
    console.error("Failed to upsert purchase from webhook:", error);
    return;
  }

  // Only send emails if we created the row (webhook won the race)
  // Check if the token we generated is the one stored, if so, we created it
  if (purchase.downloadToken === downloadToken) {
    if (purchaseType === "BOOK") {
      await sendOrderConfirmation({
        customerEmail: payerEmail,
        customerName: payerName,
        orderNumber: orderId,
        purchaseType: "book",
        amount,
        itemName: BOOK_INFO.title,
      });

      await sendBookDelivery(
        payerEmail,
        payerName,
        downloadToken,
        null,
        expiresAt,
      );
    }

    if (purchaseType === "COACHING") {
      const coachingPackage = COACHING_PACKAGES.find(
        (pkg) => pkg.price === amount,
      );

      if (coachingPackage) {
        const session = await prisma.coachingSession.create({
          data: {
            purchaseId: purchase.id,
            packageName: coachingPackage.name,
            sessionCount: coachingPackage.sessions || 1,
            status: "PENDING_SCHEDULING",
          },
        });

        if (process.env.JWT_SECRET) {
          const schedulingToken = jwt.sign(
            { sessionId: session.id, purchaseId: purchase.id },
            process.env.JWT_SECRET,
            { expiresIn: "30d" },
          );
          const schedulingUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/coaching/schedule?token=${schedulingToken}`;

          await sendOrderConfirmation({
            customerEmail: payerEmail,
            customerName: payerName,
            orderNumber: orderId,
            purchaseType: "coaching",
            amount,
            itemName: coachingPackage.name,
            packageDetails: {
              sessions: coachingPackage.sessions,
              duration: coachingPackage.duration,
            },
          });

          await sendCoachingScheduling(
            payerEmail,
            payerName,
            coachingPackage.name,
            schedulingUrl,
          );
        }
      }
    }
  }
}

async function handlePaymentFailed(event: PayPalWebhookEvent) {
  const orderId =
    event.event_type === "PAYMENT.CAPTURE.COMPLETED"
      ? event.resource?.supplementary_data?.related_ids?.order_id
      : event.resource?.id;

  if (!orderId) {
    console.error("No order ID in failed payment webhook");
    return;
  }

  const purchase = await prisma.purchase.findFirst({
    where: { paypalOrderId: orderId },
  });

  if (purchase) {
    await prisma.purchase.update({
      where: { id: purchase.id },
      data: {
        status: "FAILED",
        metadata: {
          ...((purchase.metadata as Record<string, unknown>) || {}),
          failedEventId: event.id,
          failedEventType: event.event_type,
          failedAt: new Date().toISOString(),
        },
      },
    });
  }
}
