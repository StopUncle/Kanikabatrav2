import { NextRequest, NextResponse } from "next/server";
import { createLemonCheckout, LS_VARIANTS } from "@/lib/lemonsqueezy";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { variantId, email, name, customData, redirectUrl } = body as {
      variantId?: string;
      email?: string;
      name?: string;
      customData?: Record<string, string>;
      redirectUrl?: string;
    };

    if (!variantId) {
      return NextResponse.json(
        { error: "Variant ID required" },
        { status: 400 },
      );
    }

    const validVariants = Object.values(LS_VARIANTS) as string[];
    if (!validVariants.includes(variantId)) {
      return NextResponse.json({ error: "Invalid variant" }, { status: 400 });
    }

    const result = await createLemonCheckout(variantId, {
      email,
      name,
      customData,
      redirectUrl,
    });

    const checkoutUrl = result.data?.data?.attributes?.url;

    if (!checkoutUrl) {
      return NextResponse.json(
        { error: "Failed to create checkout" },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true, checkoutUrl });
  } catch (error) {
    console.error("Checkout creation error:", error);
    return NextResponse.json(
      { error: "Failed to create checkout" },
      { status: 500 },
    );
  }
}
