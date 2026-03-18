import { NextRequest, NextResponse } from "next/server";
import { paypalService, createAskKanikaOrder } from "@/lib/paypal";
import { ASK_KANIKA_PACKAGES } from "@/lib/constants";
import { logger } from "@/lib/logger";

interface CreateOrderRequest {
  packageId: string;
}

export async function POST(request: NextRequest) {
  try {
    logger.apiRequest("POST", "/api/ask-kanika/create-order");
    const body: CreateOrderRequest = await request.json();

    if (!body.packageId) {
      return NextResponse.json(
        { error: "Package ID is required" },
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

    const paypalOrder = createAskKanikaOrder(
      pkg.price,
      pkg.format,
      pkg.questions,
    );

    const orderResponse = await paypalService.createOrder(paypalOrder);

    logger.info("Ask Kanika PayPal order created", {
      orderId: orderResponse.id,
      packageId: pkg.id,
      amount: pkg.price,
    });

    return NextResponse.json(
      {
        success: true,
        orderId: orderResponse.id,
        status: orderResponse.status,
      },
      { status: 201 },
    );
  } catch (error: unknown) {
    console.error("Ask Kanika order creation error:", error);

    if (error instanceof Error && error.message.includes("PayPal")) {
      return NextResponse.json(
        { error: "Payment system temporarily unavailable. Please try again." },
        { status: 503 },
      );
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
