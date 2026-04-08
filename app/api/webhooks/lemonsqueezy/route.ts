import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { prisma } from "@/lib/prisma";
import { sendBookDelivery } from "@/lib/email";
import { LS_VARIANTS } from "@/lib/lemonsqueezy";

function verifyWebhookSignature(
  rawBody: string,
  signature: string,
): boolean {
  const secret = process.env.LEMONSQUEEZY_WEBHOOK_SECRET;
  if (!secret) return false;
  const hmac = crypto.createHmac("sha256", secret);
  const digest = hmac.update(rawBody).digest("hex");
  return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(digest));
}

const COACHING_VARIANTS = [
  LS_VARIANTS.COACHING_SINGLE,
  LS_VARIANTS.COACHING_INTENSIVE,
  LS_VARIANTS.COACHING_CAREER,
  LS_VARIANTS.COACHING_RETAINER,
] as const;

const ASK_VARIANTS = [
  LS_VARIANTS.ASK_WRITTEN_1Q,
  LS_VARIANTS.ASK_WRITTEN_3Q,
  LS_VARIANTS.ASK_VOICE_1Q,
  LS_VARIANTS.ASK_VOICE_3Q,
] as const;

const COACHING_PACKAGE_NAMES: Record<string, string> = {
  [LS_VARIANTS.COACHING_SINGLE]: "Single Session",
  [LS_VARIANTS.COACHING_INTENSIVE]: "Intensive (3 Sessions)",
  [LS_VARIANTS.COACHING_CAREER]: "Career Coaching (4 Sessions)",
  [LS_VARIANTS.COACHING_RETAINER]: "Coaching Retainer",
};

const COACHING_SESSION_COUNTS: Record<string, number> = {
  [LS_VARIANTS.COACHING_SINGLE]: 1,
  [LS_VARIANTS.COACHING_INTENSIVE]: 3,
  [LS_VARIANTS.COACHING_CAREER]: 4,
  [LS_VARIANTS.COACHING_RETAINER]: 4,
};

async function handleBookPurchase(
  email: string,
  name: string,
  total: number,
  orderId: string,
  variantId: string,
) {
  const downloadToken = crypto.randomBytes(32).toString("hex");
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 30);

  await prisma.purchase.create({
    data: {
      type: "BOOK",
      customerEmail: email,
      customerName: name,
      amount: total,
      status: "COMPLETED",
      paypalOrderId: `LS-${orderId}`,
      downloadToken,
      expiresAt,
      maxDownloads: 10,
      metadata: { source: "lemonsqueezy", orderId, variantId },
    },
  });

  await sendBookDelivery(email, name, downloadToken, null, expiresAt);

  try {
    const { buildBookBuyerSequence } = await import("@/lib/email-sequences");
    const existingSeq = await prisma.emailQueue.findFirst({
      where: { recipientEmail: email, sequence: "book-buyer-welcome" },
    });
    if (!existingSeq) {
      const seqToken = crypto.randomBytes(24).toString("hex");
      const entries = buildBookBuyerSequence(email, name, seqToken);
      await prisma.emailQueue.createMany({ data: entries });
    }
  } catch {
    // Email sequence enrollment is non-critical
  }
}

async function handleQuizPurchase(customData: Record<string, string>) {
  if (customData?.quizResultId) {
    await prisma.quizResult.update({
      where: { id: customData.quizResultId },
      data: { paid: true },
    });
  }
}

async function handleCoachingPurchase(
  email: string,
  name: string,
  total: number,
  orderId: string,
  variantId: string,
) {
  const purchase = await prisma.purchase.create({
    data: {
      type: "COACHING",
      customerEmail: email,
      customerName: name,
      amount: total,
      status: "COMPLETED",
      paypalOrderId: `LS-${orderId}`,
      metadata: { source: "lemonsqueezy", orderId, variantId },
    },
  });

  await prisma.coachingSession.create({
    data: {
      purchaseId: purchase.id,
      packageName: COACHING_PACKAGE_NAMES[variantId] || "Coaching",
      sessionCount: COACHING_SESSION_COUNTS[variantId] || 1,
    },
  });
}

async function handleAskKanikaPurchase(
  email: string,
  name: string,
  total: number,
  orderId: string,
  variantId: string,
  customData: Record<string, string>,
) {
  await prisma.purchase.create({
    data: {
      type: "BOOK",
      productVariant: "ASK_KANIKA",
      customerEmail: email,
      customerName: name,
      amount: total,
      status: "COMPLETED",
      paypalOrderId: `LS-${orderId}`,
      metadata: {
        source: "lemonsqueezy",
        orderId,
        variantId,
        questions: customData?.questions,
      },
    },
  });
}

async function handleOrderCreated(
  data: Record<string, unknown>,
  customData: Record<string, string>,
) {
  const attrs = data?.attributes as Record<string, unknown> | undefined;
  if (!attrs) return;

  const email = attrs.user_email as string;
  const name = (attrs.user_name as string) || email;
  const total = (attrs.total as number) / 100;
  const firstItem = attrs.first_order_item as
    | Record<string, unknown>
    | undefined;
  const variantId = String(
    firstItem?.variant_id || customData?.variant_id || "",
  );
  const orderId = String((data as Record<string, unknown>).id);

  if (variantId === LS_VARIANTS.BOOK) {
    await handleBookPurchase(email, name, total, orderId, variantId);
  } else if (variantId === LS_VARIANTS.QUIZ) {
    await handleQuizPurchase(customData);
  } else if (
    (COACHING_VARIANTS as readonly string[]).includes(variantId)
  ) {
    await handleCoachingPurchase(email, name, total, orderId, variantId);
  } else if ((ASK_VARIANTS as readonly string[]).includes(variantId)) {
    await handleAskKanikaPurchase(
      email,
      name,
      total,
      orderId,
      variantId,
      customData,
    );
  }
}

async function handleSubscriptionCreated(data: Record<string, unknown>) {
  const attrs = data?.attributes as Record<string, unknown> | undefined;
  if (!attrs) return;

  const email = attrs.user_email as string;
  const name = (attrs.user_name as string) || email;
  const subscriptionId = String(data.id);
  const variantId = String(attrs.variant_id || "");

  if (variantId !== LS_VARIANTS.INNER_CIRCLE) return;

  let user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    const { hashPassword } = await import("@/lib/auth/password");
    const tempPass = crypto.randomBytes(16).toString("hex");
    user = await prisma.user.create({
      data: { email, password: await hashPassword(tempPass), name },
    });
  }

  const expiresAt = new Date();
  expiresAt.setMonth(expiresAt.getMonth() + 1);

  await prisma.communityMembership.upsert({
    where: { userId: user.id },
    create: {
      userId: user.id,
      status: "ACTIVE",
      paypalSubscriptionId: `LS-${subscriptionId}`,
      billingCycle: "monthly",
      activatedAt: new Date(),
      expiresAt,
    },
    update: {
      status: "ACTIVE",
      paypalSubscriptionId: `LS-${subscriptionId}`,
      activatedAt: new Date(),
      expiresAt,
    },
  });
}

async function handleSubscriptionUpdated(data: Record<string, unknown>) {
  const attrs = data?.attributes as Record<string, unknown> | undefined;
  if (!attrs) return;

  const subscriptionId = String(data.id);
  const status = attrs.status as string;
  const lsId = `LS-${subscriptionId}`;

  const membership = await prisma.communityMembership.findFirst({
    where: { paypalSubscriptionId: lsId },
  });
  if (!membership) return;

  if (status === "cancelled" || status === "expired") {
    await prisma.communityMembership.update({
      where: { id: membership.id },
      data: { status: "CANCELLED", cancelledAt: new Date() },
    });
  } else if (status === "paused") {
    await prisma.communityMembership.update({
      where: { id: membership.id },
      data: {
        status: "SUSPENDED",
        suspendedAt: new Date(),
        suspendReason: "payment-paused",
      },
    });
  } else if (status === "active") {
    const expiresAt = new Date();
    expiresAt.setMonth(expiresAt.getMonth() + 1);
    await prisma.communityMembership.update({
      where: { id: membership.id },
      data: {
        status: "ACTIVE",
        activatedAt: new Date(),
        expiresAt,
        suspendedAt: null,
        suspendReason: null,
      },
    });
  }
}

async function handleSubscriptionPaymentSuccess(
  data: Record<string, unknown>,
) {
  const subscriptionId = String(data.id);
  const lsId = `LS-${subscriptionId}`;

  const membership = await prisma.communityMembership.findFirst({
    where: { paypalSubscriptionId: lsId },
  });
  if (!membership) return;

  const expiresAt = new Date();
  expiresAt.setMonth(expiresAt.getMonth() + 1);
  await prisma.communityMembership.update({
    where: { id: membership.id },
    data: { expiresAt },
  });
}

export async function POST(request: NextRequest) {
  const rawBody = await request.text();
  const signature = request.headers.get("x-signature") || "";

  if (
    process.env.LEMONSQUEEZY_WEBHOOK_SECRET &&
    !verifyWebhookSignature(rawBody, signature)
  ) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  const payload = JSON.parse(rawBody);
  const eventName = payload.meta?.event_name as string | undefined;
  const customData = (payload.meta?.custom_data || {}) as Record<
    string,
    string
  >;
  const data = payload.data as Record<string, unknown>;

  console.log("Lemon Squeezy webhook:", eventName);

  try {
    switch (eventName) {
      case "order_created":
        await handleOrderCreated(data, customData);
        break;
      case "subscription_created":
        await handleSubscriptionCreated(data);
        break;
      case "subscription_updated":
        await handleSubscriptionUpdated(data);
        break;
      case "subscription_payment_success":
        await handleSubscriptionPaymentSuccess(data);
        break;
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 },
    );
  }
}
