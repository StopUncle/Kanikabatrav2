import { NextRequest, NextResponse } from "next/server";
import { paypalService } from "@/lib/paypal";
import { prisma } from "@/lib/prisma";
import { sendBookDelivery } from "@/lib/email";
import crypto from "crypto";

interface CaptureOrderRequest {
  orderId: string;
}

interface OrderDetails {
  orderId: string;
  status: string;
  paymentId?: string;
  amount?: string;
  currency?: string;
  payerEmail?: string;
  payerName?: string;
}

/**
 * Single function that handles a completed order: creates the purchase record
 * and sends exactly ONE delivery email. Returns the existing purchase if
 * this order was already processed (idempotent).
 */
async function handleCompletedOrder(
  orderId: string,
  orderData: OrderDetails,
  request: NextRequest,
): Promise<{
  purchase: {
    id: string;
    downloadToken: string | null;
    amount: number;
    customerEmail: string;
    expiresAt: Date | null;
    paypalCaptureId: string | null;
    productVariant: string | null;
  };
  alreadyExisted: boolean;
  emailSent: boolean;
}> {
  // Always check for existing purchase FIRST — prevents duplicates
  const existingPurchase = await prisma.purchase.findFirst({
    where: { paypalOrderId: orderId },
    select: {
      id: true,
      downloadToken: true,
      amount: true,
      customerEmail: true,
      expiresAt: true,
      paypalCaptureId: true,
      productVariant: true,
    },
  });

  if (existingPurchase) {
    return { purchase: existingPurchase, alreadyExisted: true, emailSent: false };
  }

  // Determine product type and variant
  let productType: "BOOK" | "COACHING" | "COURSE" = "BOOK";
  let productVariant: string | null = null;

  // Check PayPal order description for product info
  try {
    const fullOrder = await paypalService.getOrderDetails(orderId);
    const purchaseUnit = fullOrder.purchase_units?.[0];
    const desc = (purchaseUnit as { description?: string })?.description || "";

    if (desc.toLowerCase().includes("premium")) {
      productVariant = "PREMIUM";
    } else if (
      desc.toLowerCase().includes("kdp") ||
      parseFloat(orderData.amount || "0") <= 18
    ) {
      productVariant = "KDP";
    }

    if (desc.toLowerCase().includes("coaching")) {
      productType = "COACHING";
    }
  } catch {
    // Fall back to amount-based detection
    if (parseFloat(orderData.amount || "0") <= 18) {
      productVariant = "KDP";
    }
  }

  // Generate token and expiry exactly once
  const downloadToken = crypto.randomBytes(32).toString("hex");
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 30);

  // Create purchase record
  const purchase = await prisma.purchase.create({
    data: {
      type: productType,
      productVariant,
      customerEmail: orderData.payerEmail || "unknown@email.com",
      customerName: orderData.payerName || "Unknown",
      amount: parseFloat(orderData.amount || "0"),
      status: "COMPLETED",
      paypalOrderId: orderId,
      paypalCaptureId: orderData.paymentId || orderId,
      downloadToken,
      expiresAt,
      metadata: {
        currency: orderData.currency,
        ip:
          request.headers.get("x-forwarded-for") ||
          request.headers.get("x-real-ip") ||
          "unknown",
        userAgent: request.headers.get("user-agent") || "unknown",
      },
    },
    select: {
      id: true,
      downloadToken: true,
      amount: true,
      customerEmail: true,
      expiresAt: true,
      paypalCaptureId: true,
      productVariant: true,
    },
  });

  console.log("Purchase saved to database:", {
    purchaseId: purchase.id,
    type: productType,
    variant: productVariant,
    email: orderData.payerEmail,
  });

  // Send exactly ONE delivery email
  let emailSent = true;
  if (productType === "BOOK") {
    try {
      await sendBookDelivery(
        orderData.payerEmail || "unknown@email.com",
        orderData.payerName || "Customer",
        downloadToken,
        productVariant,
        expiresAt,
      );
    } catch (error) {
      console.error(
        "CRITICAL: Failed to send book delivery email for purchase:",
        purchase.id,
        error,
      );
      emailSent = false;
      await prisma.purchase.update({
        where: { id: purchase.id },
        data: {
          metadata: {
            currency: orderData.currency,
            ip:
              request.headers.get("x-forwarded-for") ||
              request.headers.get("x-real-ip") ||
              "unknown",
            emailDeliveryFailed: true,
            emailFailedAt: new Date().toISOString(),
          },
        },
      });
    }
  }

  // Auto-enroll in book buyer email sequence
  try {
    const { buildBookBuyerSequence } = await import("@/lib/email-sequences");
    const existingSequence = await prisma.emailQueue.findFirst({
      where: { recipientEmail: orderData.payerEmail || "", sequence: "book-buyer-welcome" },
    });
    if (!existingSequence) {
      const seqTrialToken = crypto.randomBytes(24).toString("hex");
      const entries = buildBookBuyerSequence(
        orderData.payerEmail || "unknown@email.com",
        orderData.payerName || "Customer",
        seqTrialToken,
      );
      await prisma.emailQueue.createMany({ data: entries });
    }
  } catch (seqError) {
    console.error("Failed to enroll in email sequence:", seqError);
  }

  return { purchase, alreadyExisted: false, emailSent };
}

function buildSuccessResponse(
  purchase: {
    id: string;
    downloadToken: string | null;
    amount: number;
    customerEmail: string;
    expiresAt: Date | null;
    paypalCaptureId: string | null;
    productVariant: string | null;
  },
  orderData: OrderDetails,
  emailSent: boolean,
  alreadyExisted: boolean,
) {
  return NextResponse.json(
    {
      success: true,
      paymentId: purchase.paypalCaptureId || orderData.orderId,
      purchaseId: purchase.id,
      status: "COMPLETED",
      amount: orderData.amount || purchase.amount.toString(),
      currency: orderData.currency || "USD",
      customerEmail: purchase.customerEmail,
      downloadUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/api/download?token=${purchase.downloadToken}`,
      downloadToken: purchase.downloadToken,
      expiresAt: purchase.expiresAt?.toISOString(),
      emailSent,
      message: alreadyExisted
        ? "Payment already processed successfully."
        : emailSent
          ? "Payment completed successfully. Check your email for download instructions."
          : "Payment completed successfully. Your download link is below. If you don't receive an email, please contact support.",
    },
    { status: 200 },
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function extractOrderData(orderDetails: any, orderId: string): OrderDetails {
  const orderData: OrderDetails = {
    orderId: orderDetails.id || orderId,
    status: orderDetails.status,
  };

  if (orderDetails.purchase_units?.length > 0) {
    const purchaseUnit = orderDetails.purchase_units[0];

    // Try to get amount from captures first, then from purchase unit
    if (purchaseUnit.payments?.captures?.length) {
      const capture = purchaseUnit.payments.captures[0];
      orderData.paymentId = capture.id;
      orderData.amount = capture.amount?.value;
      orderData.currency = capture.amount?.currency_code;
    } else if (purchaseUnit.amount) {
      orderData.amount = purchaseUnit.amount.value;
      orderData.currency = purchaseUnit.amount.currency_code;
    }
  }

  const payer = orderDetails.payer;
  if (payer) {
    orderData.payerEmail = payer.email_address;
    orderData.payerName =
      payer.name?.given_name && payer.name?.surname
        ? `${payer.name.given_name} ${payer.name.surname}`
        : payer.email_address;
  }

  return orderData;
}

export async function POST(request: NextRequest) {
  try {
    const body: CaptureOrderRequest = await request.json();

    if (!body.orderId || typeof body.orderId !== "string" || body.orderId.length < 10) {
      return NextResponse.json(
        { error: "Valid Order ID is required" },
        { status: 400 },
      );
    }

    // Get order details
    let orderDetails;
    try {
      orderDetails = await paypalService.getOrderDetails(body.orderId);
    } catch (error) {
      console.error("Failed to get order details:", error);
      return NextResponse.json(
        { error: "Invalid order ID or order not found" },
        { status: 404 },
      );
    }

    console.log("Order status before capture:", orderDetails.status);

    // Poll for order to reach capturable state
    let pollAttempts = 0;
    const maxPollAttempts = 5;

    while (
      orderDetails.status !== "COMPLETED" &&
      orderDetails.status !== "APPROVED" &&
      pollAttempts < maxPollAttempts
    ) {
      console.log(
        `Waiting for order... Attempt ${pollAttempts + 1}/${maxPollAttempts}, Status: ${orderDetails.status}`,
      );
      await new Promise((resolve) => setTimeout(resolve, 2000));
      try {
        orderDetails = await paypalService.getOrderDetails(body.orderId);
        pollAttempts++;
      } catch {
        pollAttempts++;
      }
    }

    // === ALREADY COMPLETED (e.g. card auto-capture) ===
    if (orderDetails.status === "COMPLETED") {
      console.log("Order already completed, skipping capture");
      const orderData = extractOrderData(orderDetails, body.orderId);
      const { purchase, alreadyExisted, emailSent } = await handleCompletedOrder(
        body.orderId,
        orderData,
        request,
      );
      return buildSuccessResponse(purchase, orderData, emailSent, alreadyExisted);
    }

    // === NOT CAPTURABLE ===
    if (orderDetails.status !== "APPROVED") {
      console.error("Order not capturable after polling:", orderDetails.status);

      if (orderDetails.status === "PAYER_ACTION_REQUIRED") {
        return NextResponse.json(
          { error: "Payment requires additional authentication. Please complete the payment process." },
          { status: 400 },
        );
      }

      if (orderDetails.status === "CREATED") {
        return NextResponse.json(
          { error: "Payment is still processing. Please wait a moment and try again.", retryable: true },
          { status: 202 },
        );
      }

      return NextResponse.json(
        { error: `Order cannot be captured. Current status: ${orderDetails.status}. Please try again or contact support.` },
        { status: 400 },
      );
    }

    // === CAPTURE THE PAYMENT ===
    let captureResponse;
    try {
      captureResponse = await paypalService.captureOrder(body.orderId);
    } catch (error) {
      console.error("PayPal capture API error:", error);

      // Capture failed — check if it was already captured (race condition)
      try {
        const recheckOrder = await paypalService.getOrderDetails(body.orderId);
        if (recheckOrder.status === "COMPLETED") {
          console.log("Order was already captured on recheck");
          const orderData = extractOrderData(recheckOrder, body.orderId);
          const { purchase, alreadyExisted, emailSent } = await handleCompletedOrder(
            body.orderId,
            orderData,
            request,
          );
          return buildSuccessResponse(purchase, orderData, emailSent, alreadyExisted);
        }
      } catch (recheckError) {
        console.error("Failed to recheck order status:", recheckError);
      }

      throw error;
    }

    console.log("PayPal payment captured:", {
      orderId: captureResponse.id,
      status: captureResponse.status,
      timestamp: new Date().toISOString(),
    });

    // === CAPTURE SUCCEEDED ===
    if (captureResponse.status === "COMPLETED") {
      const orderData = extractOrderData(captureResponse, body.orderId);
      const { purchase, alreadyExisted, emailSent } = await handleCompletedOrder(
        body.orderId,
        orderData,
        request,
      );
      return buildSuccessResponse(purchase, orderData, emailSent, alreadyExisted);
    }

    // === CAPTURE RETURNED NON-COMPLETED STATUS ===
    const orderData = extractOrderData(captureResponse, body.orderId);
    await prisma.purchase.create({
      data: {
        type: "BOOK",
        customerEmail: orderData.payerEmail || "unknown@email.com",
        customerName: orderData.payerName || "Unknown",
        amount: parseFloat(orderData.amount || "0"),
        status: "PENDING",
        paypalOrderId: orderData.orderId,
        metadata: { captureStatus: orderData.status },
      },
    });

    return NextResponse.json(
      { success: false, status: orderData.status, message: "Payment processing incomplete" },
      { status: 202 },
    );
  } catch (error: unknown) {
    console.error("PayPal capture error:", error);

    if (error instanceof Error) {
      if (error.message.includes("PayPal")) {
        return NextResponse.json(
          {
            error: "Payment capture failed. Please contact support if you were charged.",
            details: process.env.NODE_ENV === "development" ? error.message : undefined,
          },
          { status: 503 },
        );
      }

      if (error.message.includes("already")) {
        return NextResponse.json(
          { error: "This payment has already been processed" },
          { status: 409 },
        );
      }
    }

    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
