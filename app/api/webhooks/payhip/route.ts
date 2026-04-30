import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { prisma } from "@/lib/prisma";
import { sendBookDelivery } from "@/lib/email";
import { PAYHIP_PRODUCTS } from "@/lib/payhip";

function verifySignature(payload: string, signature: string): boolean {
  const apiKey = process.env.PAYHIP_API_KEY;
  if (!apiKey) return false;
  const hmac = crypto.createHmac("sha256", apiKey);
  const digest = hmac.update(payload).digest("hex");
  try {
    return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(digest));
  } catch {
    return false;
  }
}

export async function POST(request: NextRequest) {
  const rawBody = await request.text();
  const signature = request.headers.get("x-payhip-signature") || "";

  // Verify signature (skip in dev if no API key configured)
  if (process.env.PAYHIP_API_KEY && !verifySignature(rawBody, signature)) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  const payload = JSON.parse(rawBody);
  const eventType = payload.type;

  try {
    switch (eventType) {
      case "paid": {
        const email = payload.email;
        const name = payload.name || email;
        const amount = (payload.price || 0) / 100; // cents to dollars
        const transactionId = payload.id;
        const items = payload.items || [];
        const productId = items[0]?.product_id || "";

        // Match product ID to our products
        if (productId === PAYHIP_PRODUCTS.BOOK) {
          const downloadToken = crypto.randomBytes(32).toString("hex");
          const expiresAt = new Date();
          expiresAt.setDate(expiresAt.getDate() + 30);

          await prisma.purchase.create({
            data: {
              type: "BOOK",
              customerEmail: email,
              customerName: name,
              amount,
              status: "COMPLETED",
              paypalOrderId: `PH-${transactionId}`,
              downloadToken,
              expiresAt,
              maxDownloads: 10,
              metadata: { source: "payhip", transactionId, productId },
            },
          });

          await sendBookDelivery(email, name, downloadToken, null, expiresAt);

          // Auto-enroll in email sequence
          try {
            const { buildBookBuyerSequence } = await import(
              "@/lib/email-sequences"
            );
            const existingSeq = await prisma.emailQueue.findFirst({
              where: {
                recipientEmail: email,
                sequence: "book-buyer-welcome",
              },
            });
            if (!existingSeq) {
              const seqToken = crypto.randomBytes(24).toString("hex");
              const entries = buildBookBuyerSequence(email, name, seqToken);
              await prisma.emailQueue.createMany({ data: entries });
            }
          } catch {
            /* non-critical */
          }
        } else if (productId === PAYHIP_PRODUCTS.QUIZ) {
          // Quiz unlock, find the most recent unpaid quiz result for this email
          const quizResult = await prisma.quizResult.findFirst({
            where: { email, paid: false },
            orderBy: { createdAt: "desc" },
          });
          if (quizResult) {
            await prisma.quizResult.update({
              where: { id: quizResult.id },
              data: { paid: true, paypalOrderId: `PH-${transactionId}` },
            });
          }
        } else if (
          [
            PAYHIP_PRODUCTS.COACHING_SINGLE,
            PAYHIP_PRODUCTS.COACHING_INTENSIVE,
            PAYHIP_PRODUCTS.COACHING_CAREER,
            PAYHIP_PRODUCTS.COACHING_RETAINER,
          ].includes(productId)
        ) {
          const packageNames: Record<string, string> = {
            [PAYHIP_PRODUCTS.COACHING_SINGLE]: "Single Session",
            [PAYHIP_PRODUCTS.COACHING_INTENSIVE]: "Intensive (3 Sessions)",
            [PAYHIP_PRODUCTS.COACHING_CAREER]: "Career Coaching (4 Sessions)",
            [PAYHIP_PRODUCTS.COACHING_RETAINER]: "Coaching Retainer",
          };
          const sessionCounts: Record<string, number> = {
            [PAYHIP_PRODUCTS.COACHING_SINGLE]: 1,
            [PAYHIP_PRODUCTS.COACHING_INTENSIVE]: 3,
            [PAYHIP_PRODUCTS.COACHING_CAREER]: 4,
            [PAYHIP_PRODUCTS.COACHING_RETAINER]: 4,
          };

          const purchase = await prisma.purchase.create({
            data: {
              type: "COACHING",
              customerEmail: email,
              customerName: name,
              amount,
              status: "COMPLETED",
              paypalOrderId: `PH-${transactionId}`,
              metadata: { source: "payhip", transactionId, productId },
            },
          });

          await prisma.coachingSession.create({
            data: {
              purchaseId: purchase.id,
              packageName: packageNames[productId] || "Coaching",
              sessionCount: sessionCounts[productId] || 1,
            },
          });
        } else if (
          [
            PAYHIP_PRODUCTS.ASK_WRITTEN_1Q,
            PAYHIP_PRODUCTS.ASK_WRITTEN_3Q,
            PAYHIP_PRODUCTS.ASK_VOICE_1Q,
            PAYHIP_PRODUCTS.ASK_VOICE_3Q,
          ].includes(productId)
        ) {
          await prisma.purchase.create({
            data: {
              type: "BOOK",
              productVariant: "ASK_KANIKA",
              customerEmail: email,
              customerName: name,
              amount,
              status: "COMPLETED",
              paypalOrderId: `PH-${transactionId}`,
              metadata: { source: "payhip", transactionId, productId },
            },
          });
        }
        break;
      }

      case "refunded": {
        const transactionId = payload.id;
        const purchase = await prisma.purchase.findFirst({
          where: { paypalOrderId: `PH-${transactionId}` },
        });
        if (purchase) {
          await prisma.purchase.update({
            where: { id: purchase.id },
            data: { status: "REFUNDED" },
          });
        }
        break;
      }

      case "subscription.created": {
        const email = payload.email;
        const name = payload.customer_first_name
          ? `${payload.customer_first_name} ${payload.customer_last_name || ""}`.trim()
          : email;
        const subscriptionId = payload.subscription_id;

        // Find or create user
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
            paypalSubscriptionId: `PH-${subscriptionId}`,
            billingCycle: "monthly",
            activatedAt: new Date(),
            expiresAt,
          },
          update: {
            status: "ACTIVE",
            paypalSubscriptionId: `PH-${subscriptionId}`,
            activatedAt: new Date(),
            expiresAt,
          },
        });
        break;
      }

      case "subscription.deleted": {
        const subscriptionId = payload.subscription_id;
        const membership = await prisma.communityMembership.findFirst({
          where: { paypalSubscriptionId: `PH-${subscriptionId}` },
        });
        if (membership) {
          await prisma.communityMembership.update({
            where: { id: membership.id },
            data: { status: "CANCELLED", cancelledAt: new Date() },
          });
        }
        break;
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Payhip webhook error:", error);
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 },
    );
  }
}
