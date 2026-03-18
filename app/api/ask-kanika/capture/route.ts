import { NextRequest, NextResponse } from "next/server";
import { paypalService } from "@/lib/paypal";
import { prisma } from "@/lib/prisma";
import { sendEmail } from "@/lib/email";
import { ASK_KANIKA_PACKAGES } from "@/lib/constants";

interface CaptureRequest {
  orderId: string;
  packageId: string;
  customerName: string;
  customerEmail: string;
  questions: string[];
}

export async function POST(request: NextRequest) {
  try {
    const body: CaptureRequest = await request.json();

    if (
      !body.orderId ||
      !body.packageId ||
      !body.customerEmail ||
      !body.questions?.length
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const pkg = ASK_KANIKA_PACKAGES.find((p) => p.id === body.packageId);
    if (!pkg) {
      return NextResponse.json(
        { error: "Invalid package ID" },
        { status: 400 },
      );
    }

    // Get order details to check status
    let orderDetails = await paypalService.getOrderDetails(body.orderId);

    // If already completed (card auto-capture), skip capture
    if (orderDetails.status !== "COMPLETED") {
      if (orderDetails.status === "APPROVED") {
        const captureResponse = await paypalService.captureOrder(body.orderId);
        if (captureResponse.status !== "COMPLETED") {
          return NextResponse.json(
            { error: "Payment capture failed" },
            { status: 400 },
          );
        }
        orderDetails = captureResponse as unknown as typeof orderDetails;
      } else {
        return NextResponse.json(
          {
            error: `Order not ready for capture. Status: ${orderDetails.status}`,
          },
          { status: 400 },
        );
      }
    }

    // Check for duplicate
    const existing = await prisma.purchase.findFirst({
      where: { paypalOrderId: body.orderId },
    });
    if (existing) {
      return NextResponse.json(
        {
          success: true,
          message: "Already processed",
          purchaseId: existing.id,
        },
        { status: 200 },
      );
    }

    // Save purchase
    const purchase = await prisma.purchase.create({
      data: {
        type: "COACHING",
        productVariant: `ASK_KANIKA_${pkg.format.toUpperCase()}_${pkg.questions}`,
        customerEmail: body.customerEmail,
        customerName: body.customerName || "Anonymous",
        amount: pkg.price,
        status: "COMPLETED",
        paypalOrderId: body.orderId,
        metadata: {
          askKanika: true,
          format: pkg.format,
          questionCount: pkg.questions,
          questions: body.questions,
          ip:
            request.headers.get("x-forwarded-for") ||
            request.headers.get("x-real-ip") ||
            "unknown",
        },
      },
    });

    console.log("Ask Kanika purchase saved:", purchase.id);

    // Format questions for email
    const questionsHtml = body.questions
      .map(
        (q, i) =>
          `<div style="background: #1a1a2e; padding: 16px; border-left: 3px solid #d4af37; margin-bottom: 12px; border-radius: 4px;">
            <p style="color: #d4af37; font-size: 12px; margin: 0 0 8px 0; text-transform: uppercase;">Question ${i + 1}</p>
            <p style="color: #f5f0ed; margin: 0; line-height: 1.6;">${q.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</p>
          </div>`,
      )
      .join("");

    const formatLabel =
      pkg.format === "voice" ? "Voice Answer" : "Written Answer";

    // Email to Kanika
    await sendEmail({
      to: process.env.ADMIN_EMAIL || "Kanika@kanikarose.com",
      subject: `New Ask Kanika: ${formatLabel} (${pkg.questions} question${pkg.questions > 1 ? "s" : ""}) - $${pkg.price}`,
      html: `
        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; background: #050511; color: #f5f0ed;">
          <div style="background: linear-gradient(135deg, #1a0d11, #0a1628); padding: 30px; border-radius: 10px 10px 0 0;">
            <h1 style="color: #d4af37; margin: 0; font-size: 24px;">New Question Received</h1>
            <p style="color: #94a3b8; margin: 8px 0 0 0;">${formatLabel} &bull; ${pkg.questions} question${pkg.questions > 1 ? "s" : ""} &bull; $${pkg.price}</p>
          </div>
          <div style="padding: 30px;">
            <div style="margin-bottom: 24px;">
              <p style="color: #94a3b8; font-size: 12px; text-transform: uppercase; margin: 0 0 4px 0;">From</p>
              <p style="color: #f5f0ed; margin: 0; font-size: 16px;">${body.customerName || "Anonymous"}</p>
              <p style="color: #d4af37; margin: 4px 0 0 0;">${body.customerEmail}</p>
            </div>
            <div style="margin-bottom: 24px;">
              <p style="color: #94a3b8; font-size: 12px; text-transform: uppercase; margin: 0 0 12px 0;">Questions</p>
              ${questionsHtml}
            </div>
            <div style="background: #0a1628; padding: 16px; border-radius: 8px;">
              <p style="color: #94a3b8; font-size: 12px; margin: 0;">Purchase ID: ${purchase.id}</p>
              <p style="color: #94a3b8; font-size: 12px; margin: 4px 0 0 0;">Reply directly to this email or to: ${body.customerEmail}</p>
            </div>
          </div>
        </div>
      `,
      replyTo: body.customerEmail,
    });

    // Confirmation email to customer
    await sendEmail({
      to: body.customerEmail,
      subject: "Your question has been received - Kanika Batra",
      html: `
        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; background: #050511; color: #f5f0ed;">
          <div style="background: linear-gradient(135deg, #1a0d11, #0a1628); padding: 30px; border-radius: 10px 10px 0 0;">
            <h1 style="color: #d4af37; margin: 0; font-size: 24px;">Question Received</h1>
          </div>
          <div style="padding: 30px;">
            <p style="color: #f5f0ed; line-height: 1.8; margin: 0 0 20px 0;">
              ${body.customerName ? `Hi ${body.customerName},` : "Hi,"}
            </p>
            <p style="color: #f5f0ed; line-height: 1.8; margin: 0 0 20px 0;">
              Your ${pkg.questions > 1 ? `${pkg.questions} questions have` : "question has"} been received. You purchased a <strong style="color: #d4af37;">${formatLabel}</strong> and can expect a response within <strong>48 hours</strong>.
            </p>
            <div style="margin-bottom: 24px;">
              <p style="color: #94a3b8; font-size: 12px; text-transform: uppercase; margin: 0 0 12px 0;">Your Question${pkg.questions > 1 ? "s" : ""}</p>
              ${questionsHtml}
            </div>
            <p style="color: #94a3b8; font-size: 14px; line-height: 1.6;">
              If you have any issues, reply to this email or contact <a href="mailto:Kanika@kanikarose.com" style="color: #d4af37;">Kanika@kanikarose.com</a>.
            </p>
          </div>
          <div style="background: #0a1628; padding: 20px; text-align: center; border-radius: 0 0 10px 10px;">
            <p style="color: #94a3b8; font-size: 12px; margin: 0;">Kanika Batra &bull; kanikarose.com</p>
          </div>
        </div>
      `,
    });

    return NextResponse.json(
      {
        success: true,
        purchaseId: purchase.id,
        message: "Payment captured and question submitted successfully.",
      },
      { status: 200 },
    );
  } catch (error: unknown) {
    console.error("Ask Kanika capture error:", error);

    if (error instanceof Error && error.message.includes("PayPal")) {
      return NextResponse.json(
        {
          error: "Payment capture failed. Contact support if you were charged.",
        },
        { status: 503 },
      );
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
