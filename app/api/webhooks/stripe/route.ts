import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";
import { sendBookDelivery } from "@/lib/email";
import crypto from "crypto";

export async function POST(request: NextRequest) {
  const rawBody = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "No signature" }, { status: 401 });
  }

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      rawBody,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );
  } catch (err) {
    console.error("Stripe webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object;
        const email = session.customer_email || session.customer_details?.email;
        const name = session.customer_details?.name || email;
        const productKey = session.metadata?.product_key;
        const sessionId = session.id;
        const amount = (session.amount_total || 0) / 100;

        if (!email || !productKey) break;

        if (productKey === "BOOK") {
          const downloadToken = crypto.randomBytes(32).toString("hex");
          const expiresAt = new Date();
          expiresAt.setDate(expiresAt.getDate() + 30);

          await prisma.purchase.create({
            data: {
              type: "BOOK",
              customerEmail: email,
              customerName: name || "Customer",
              amount,
              status: "COMPLETED",
              paypalOrderId: `ST-${sessionId}`,
              downloadToken,
              expiresAt,
              maxDownloads: 10,
              metadata: { source: "stripe", sessionId, productKey },
            },
          });

          await sendBookDelivery(
            email,
            name || "Customer",
            downloadToken,
            null,
            expiresAt,
          );

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
              const entries = buildBookBuyerSequence(
                email,
                name || "Customer",
                seqToken,
              );
              await prisma.emailQueue.createMany({ data: entries });
            }
          } catch {
            /* non-critical */
          }
        } else if (productKey === "QUIZ") {
          const quizResultId = session.metadata?.quizResultId;
          if (quizResultId) {
            await prisma.quizResult.update({
              where: { id: quizResultId },
              data: { paid: true, paypalOrderId: `ST-${sessionId}` },
            });
          } else {
            // Fallback: find most recent unpaid quiz for this email
            const quizResult = await prisma.quizResult.findFirst({
              where: { email, paid: false },
              orderBy: { createdAt: "desc" },
            });
            if (quizResult) {
              await prisma.quizResult.update({
                where: { id: quizResult.id },
                data: { paid: true, paypalOrderId: `ST-${sessionId}` },
              });
            }
          }
        } else if (
          ["COACHING_SINGLE", "COACHING_INTENSIVE", "COACHING_CAREER", "COACHING_RETAINER"].includes(productKey)
        ) {
          const packageNames: Record<string, string> = {
            COACHING_SINGLE: "Single Session",
            COACHING_INTENSIVE: "Intensive (3 Sessions)",
            COACHING_CAREER: "Career Coaching (4 Sessions)",
            COACHING_RETAINER: "Coaching Retainer",
          };
          const sessionCounts: Record<string, number> = {
            COACHING_SINGLE: 1,
            COACHING_INTENSIVE: 3,
            COACHING_CAREER: 4,
            COACHING_RETAINER: 4,
          };

          const purchase = await prisma.purchase.create({
            data: {
              type: "COACHING",
              customerEmail: email,
              customerName: name || "Customer",
              amount,
              status: "COMPLETED",
              paypalOrderId: `ST-${sessionId}`,
              metadata: { source: "stripe", sessionId, productKey },
            },
          });

          await prisma.coachingSession.create({
            data: {
              purchaseId: purchase.id,
              packageName: packageNames[productKey] || "Coaching",
              sessionCount: sessionCounts[productKey] || 1,
            },
          });
        } else if (
          ["ASK_WRITTEN_1Q", "ASK_WRITTEN_3Q", "ASK_VOICE_1Q", "ASK_VOICE_3Q"].includes(productKey)
        ) {
          await prisma.purchase.create({
            data: {
              type: "BOOK",
              productVariant: "ASK_KANIKA",
              customerEmail: email,
              customerName: name || "Customer",
              amount,
              status: "COMPLETED",
              paypalOrderId: `ST-${sessionId}`,
              metadata: {
                source: "stripe",
                sessionId,
                productKey,
                questions: session.metadata?.questions,
              },
            },
          });
        } else if (productKey === "INNER_CIRCLE") {
          // Subscription — handled by invoice.payment_succeeded below
          // But create/update membership here for immediate access
          const subscriptionId = session.subscription as string;
          if (subscriptionId) {
            let user = await prisma.user.findUnique({ where: { email } });
            if (!user) {
              const { hashPassword } = await import("@/lib/auth/password");
              const tempPass = crypto.randomBytes(16).toString("hex");
              user = await prisma.user.create({
                data: {
                  email,
                  password: await hashPassword(tempPass),
                  name: name || null,
                },
              });
            }

            const expiresAt = new Date();
            expiresAt.setMonth(expiresAt.getMonth() + 1);

            await prisma.communityMembership.upsert({
              where: { userId: user.id },
              create: {
                userId: user.id,
                status: "ACTIVE",
                paypalSubscriptionId: `ST-${subscriptionId}`,
                billingCycle: "monthly",
                activatedAt: new Date(),
                expiresAt,
              },
              update: {
                status: "ACTIVE",
                paypalSubscriptionId: `ST-${subscriptionId}`,
                activatedAt: new Date(),
                expiresAt,
              },
            });
          }
        }
        break;
      }

      case "invoice.payment_succeeded": {
        // Subscription renewal — extend membership
        const invoice = event.data.object as { subscription?: string | null };
        const subscriptionId = invoice.subscription as string;
        if (!subscriptionId) break;

        const membership = await prisma.communityMembership.findFirst({
          where: { paypalSubscriptionId: `ST-${subscriptionId}` },
        });
        if (membership) {
          const expiresAt = new Date();
          expiresAt.setMonth(expiresAt.getMonth() + 1);
          await prisma.communityMembership.update({
            where: { id: membership.id },
            data: { expiresAt, status: "ACTIVE" },
          });
        }
        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object;
        const membership = await prisma.communityMembership.findFirst({
          where: { paypalSubscriptionId: `ST-${subscription.id}` },
        });
        if (membership) {
          await prisma.communityMembership.update({
            where: { id: membership.id },
            data: { status: "CANCELLED", cancelledAt: new Date() },
          });
        }
        break;
      }

      case "customer.subscription.paused": {
        const subscription = event.data.object;
        const membership = await prisma.communityMembership.findFirst({
          where: { paypalSubscriptionId: `ST-${subscription.id}` },
        });
        if (membership) {
          await prisma.communityMembership.update({
            where: { id: membership.id },
            data: {
              status: "SUSPENDED",
              suspendedAt: new Date(),
              suspendReason: "payment-paused",
            },
          });
        }
        break;
      }

      case "charge.refunded": {
        const charge = event.data.object;
        const paymentIntent = charge.payment_intent as string;
        // Find the purchase by searching metadata
        const purchases = await prisma.purchase.findMany({
          where: {
            paypalOrderId: { startsWith: "ST-" },
            status: "COMPLETED",
          },
          orderBy: { createdAt: "desc" },
          take: 50,
        });
        // Match by amount if possible
        for (const purchase of purchases) {
          const meta = purchase.metadata as Record<string, string> | null;
          if (meta?.sessionId && charge.metadata?.session_id === meta.sessionId) {
            await prisma.purchase.update({
              where: { id: purchase.id },
              data: { status: "REFUNDED" },
            });
            break;
          }
        }
        break;
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Stripe webhook error:", error);
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 },
    );
  }
}
