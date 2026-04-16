import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";
import { sendBookDelivery, sendInnerCircleWelcomeNewUser, sendMembershipRenewed, sendMembershipSuspended, sendMembershipCancelled } from "@/lib/email";
import jwt from "jsonwebtoken";
import crypto from "crypto";

function getJwtSecretForReset(): string {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    if (process.env.NODE_ENV === "production") {
      throw new Error("JWT_SECRET is required in production");
    }
    return "dev-only-secret-do-not-use-in-production";
  }
  return secret;
}

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
        // Normalize email to lowercase — register/login do this, but Stripe
        // preserves whatever casing the buyer typed at checkout. Without this,
        // a buyer who registered as alice@gmail.com but typed Alice@Gmail.com
        // at checkout would get a duplicate user or a missed findUnique.
        const rawEmail = session.customer_email || session.customer_details?.email;
        const email = rawEmail?.toLowerCase();
        const name = session.customer_details?.name || email;
        const productKey = session.metadata?.product_key;
        const sessionId = session.id;
        const amount = (session.amount_total || 0) / 100;

        if (!email || !productKey) break;

        if (productKey === "BOOK") {
          // Idempotency: Stripe retries failed (and occasionally successful)
          // webhooks. Without this guard a duplicate event would create a
          // second Purchase row, send a second download email, and double-
          // enroll the buyer in the email sequence. We use the Stripe session
          // id (mapped to paypalOrderId for legacy compatibility) as the
          // idempotency key.
          const idempotencyKey = `ST-${sessionId}`;
          const existing = await prisma.purchase.findUnique({
            where: { paypalOrderId: idempotencyKey },
          });

          if (existing) {
            console.log(
              `[stripe-webhook] BOOK purchase ${idempotencyKey} already processed — skipping`,
            );
            break;
          }

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
              paypalOrderId: idempotencyKey,
              downloadToken,
              expiresAt,
              maxDownloads: 10,
              metadata: { source: "stripe", sessionId, productKey },
            },
          });

          const emailSent = await sendBookDelivery(
            email,
            name || "Customer",
            downloadToken,
            null,
            expiresAt,
          );

          // Flag the purchase if book delivery email silently failed so
          // cron/retry-emails can pick it up. sendBookDelivery returns
          // false (doesn't throw) after exhausting 3 retries.
          if (!emailSent) {
            await prisma.purchase.update({
              where: { paypalOrderId: idempotencyKey },
              data: {
                metadata: {
                  source: "stripe",
                  sessionId,
                  productKey,
                  emailDeliveryFailed: true,
                },
              },
            });
            console.error(
              `[stripe-webhook] BOOK delivery email failed for ${email} (session ${sessionId}) — flagged for retry`,
            );
          }

          // Auto-unlock any existing quiz result for this buyer.
          // Without this, a logged-out quiz taker who later buys the book
          // stays locked out of their full results until /api/quiz/my-results
          // happens to run its second-order Purchase lookup.
          try {
            await prisma.quizResult.updateMany({
              where: { email, paid: false },
              data: { paid: true },
            });
          } catch (err) {
            console.error("Failed to auto-unlock quiz for book buyer:", err);
          }

          // Auto-enroll in email sequence (idempotent — checks the queue
          // first; the outer Purchase guard above already prevents repeat
          // processing on retry, but this stays as a belt-and-braces check).
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
          } catch (err) {
            console.error(
              "[stripe-webhook] book buyer sequence enrollment failed:",
              err,
            );
          }
        } else if (productKey === "QUIZ" || productKey === "DARK_MIRROR") {
          // Idempotency: create a Purchase row (just like BOOK/COACHING) so
          // Stripe retries don't double-unlock quizzes and so the refund
          // handler can find the purchase. The old code skipped this, meaning
          // a retry would find the original quiz already paid and fall through
          // to the fallback which would unlock a DIFFERENT unpaid quiz.
          const idempotencyKey = `ST-${sessionId}`;
          const existingQuizPurchase = await prisma.purchase.findUnique({
            where: { paypalOrderId: idempotencyKey },
          });
          if (existingQuizPurchase) {
            console.log(
              `[stripe-webhook] QUIZ purchase ${idempotencyKey} already processed — skipping`,
            );
            break;
          }

          await prisma.purchase.create({
            data: {
              type: "BOOK",
              productVariant: productKey,
              customerEmail: email,
              customerName: name || "Customer",
              amount,
              status: "COMPLETED",
              paypalOrderId: idempotencyKey,
              metadata: { source: "stripe", sessionId, productKey },
            },
          });

          const quizResultId = session.metadata?.quizResultId;
          if (quizResultId) {
            await prisma.quizResult.update({
              where: { id: quizResultId },
              data: { paid: true, paypalOrderId: idempotencyKey },
            });
          } else {
            const quizResult = await prisma.quizResult.findFirst({
              where: { email, paid: false },
              orderBy: { createdAt: "desc" },
            });
            if (quizResult) {
              await prisma.quizResult.update({
                where: { id: quizResult.id },
                data: { paid: true, paypalOrderId: idempotencyKey },
              });
            }
          }
        } else if (
          ["COACHING_SINGLE", "COACHING_INTENSIVE", "COACHING_CAREER", "COACHING_RETAINER"].includes(productKey)
        ) {
          const idempotencyKey = `ST-${sessionId}`;
          const existing = await prisma.purchase.findUnique({
            where: { paypalOrderId: idempotencyKey },
          });
          if (existing) {
            console.log(
              `[stripe-webhook] COACHING purchase ${idempotencyKey} already processed — skipping`,
            );
            break;
          }

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

          // Wrap purchase + coaching session creation in a transaction so a
          // failure halfway through doesn't leave an orphaned Purchase row.
          await prisma.$transaction(async (tx) => {
            const purchase = await tx.purchase.create({
              data: {
                type: "COACHING",
                customerEmail: email,
                customerName: name || "Customer",
                amount,
                status: "COMPLETED",
                paypalOrderId: idempotencyKey,
                metadata: { source: "stripe", sessionId, productKey },
              },
            });

            await tx.coachingSession.create({
              data: {
                purchaseId: purchase.id,
                packageName: packageNames[productKey] || "Coaching",
                sessionCount: sessionCounts[productKey] || 1,
              },
            });
          });
        } else if (
          ["ASK_WRITTEN_1Q", "ASK_WRITTEN_3Q", "ASK_VOICE_1Q", "ASK_VOICE_3Q"].includes(productKey)
        ) {
          const idempotencyKey = `ST-${sessionId}`;
          const existing = await prisma.purchase.findUnique({
            where: { paypalOrderId: idempotencyKey },
          });
          if (existing) {
            console.log(
              `[stripe-webhook] ASK_KANIKA purchase ${idempotencyKey} already processed — skipping`,
            );
            break;
          }

          await prisma.purchase.create({
            data: {
              type: "BOOK",
              productVariant: "ASK_KANIKA",
              customerEmail: email,
              customerName: name || "Customer",
              amount,
              status: "COMPLETED",
              paypalOrderId: idempotencyKey,
              metadata: {
                source: "stripe",
                sessionId,
                productKey,
                questions: session.metadata?.questions,
              },
            },
          });
        } else if (productKey === "INNER_CIRCLE") {
          // Subscription — Stripe webhook gives us the subscription id; we
          // upsert membership here for immediate access. Renewals are then
          // handled by invoice.payment_succeeded above.
          const subscriptionId = session.subscription as string;
          if (!subscriptionId) {
            console.error(
              "[stripe-webhook] INNER_CIRCLE checkout has no subscription id",
              { sessionId },
            );
            break;
          }

          // Idempotency: if a membership row already exists with this exact
          // subscription id and is ACTIVE, the webhook already ran. Skip.
          const alreadyActive = await prisma.communityMembership.findFirst({
            where: {
              paypalSubscriptionId: `ST-${subscriptionId}`,
              status: "ACTIVE",
            },
          });
          if (alreadyActive) {
            console.log(
              `[stripe-webhook] INNER_CIRCLE subscription ST-${subscriptionId} already active — skipping`,
            );
            break;
          }

          let user = await prisma.user.findUnique({ where: { email } });
          let isNewUser = false;
          let tempPassword: string | null = null;
          if (!user) {
            const { hashPassword } = await import("@/lib/auth/password");
            tempPassword = crypto.randomBytes(12).toString("base64url");
            user = await prisma.user.create({
              data: {
                email: email.toLowerCase(),
                password: await hashPassword(tempPassword),
                name: name || null,
              },
            });
            isNewUser = true;
          }

          // Read the actual subscription period from Stripe rather than
          // assuming +1 month.
          let expiresAt: Date;
          try {
            const sub = await stripe.subscriptions.retrieve(subscriptionId);
            const periodEnd = (sub as { current_period_end?: number })
              .current_period_end;
            expiresAt = periodEnd
              ? new Date(periodEnd * 1000)
              : (() => {
                  const d = new Date();
                  d.setMonth(d.getMonth() + 1);
                  return d;
                })();
          } catch {
            expiresAt = new Date();
            expiresAt.setMonth(expiresAt.getMonth() + 1);
          }

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

          // Inner Circle members get the premium book bundled. Create a
          // download token + Purchase row just like the standalone BOOK
          // branch so they get working download links.
          try {
            const bookToken = crypto.randomBytes(32).toString("hex");
            const bookExpiry = new Date();
            bookExpiry.setDate(bookExpiry.getDate() + 30);

            await prisma.purchase.create({
              data: {
                type: "BOOK",
                customerEmail: user.email,
                customerName: user.name || "Member",
                amount: 0,
                status: "COMPLETED",
                paypalOrderId: `IC-BOOK-${sessionId}`,
                downloadToken: bookToken,
                expiresAt: bookExpiry,
                maxDownloads: 10,
                metadata: { source: "inner-circle-bundle", sessionId },
              },
            });

            await sendBookDelivery(
              user.email,
              user.name || "Member",
              bookToken,
              "PREMIUM",
              bookExpiry,
            );
            console.log(`[stripe-webhook] book delivery sent to INNER_CIRCLE member ${user.email}`);
          } catch (err) {
            console.error("[stripe-webhook] INNER_CIRCLE book delivery failed:", err);
          }

          // If we just created the account, the user has no idea they have
          // one. Send them a welcome email containing their login email and
          // a password-reset link so they can set their own password.
          if (isNewUser) {
            try {
              // New user has tokenVersion=0 by default; reset route verifies
              // this `v` field matches before allowing reset, so this token
              // is self-invalidating after first use.
              const resetToken = jwt.sign(
                { userId: user.id, type: "password-reset", v: 0 },
                getJwtSecretForReset(),
                { expiresIn: "7d" },
              );
              await sendInnerCircleWelcomeNewUser(
                user.email,
                user.name || "Member",
                resetToken,
              );
            } catch (err) {
              console.error(
                "[stripe-webhook] failed to send INNER_CIRCLE welcome email to new user:",
                err,
              );
            }
          }
          // Suppress unused-var warning when we don't end up using tempPassword
          void tempPassword;
        }
        break;
      }

      case "invoice.payment_succeeded": {
        // Subscription renewal — extend membership to the actual paid-through
        // date, not a hardcoded +1 month. The previous code added 30 days
        // regardless of billing cycle, which would have shortchanged annual
        // subscribers by 11 months on every renewal.
        const invoice = event.data.object as {
          subscription?: string | null;
          period_end?: number;
          lines?: { data?: Array<{ period?: { end?: number } }> };
        };
        const subscriptionId = invoice.subscription as string;
        if (!subscriptionId) break;

        const membership = await prisma.communityMembership.findFirst({
          where: { paypalSubscriptionId: `ST-${subscriptionId}` },
        });
        if (!membership) break;

        // Prefer the line-item period (which reflects the actual billing
        // interval) over the invoice-level period. Fall back to subscription
        // lookup, then finally +1 month if all else fails.
        let newExpiresAt: Date | null = null;
        const lineEnd = invoice.lines?.data?.[0]?.period?.end;
        if (lineEnd) {
          newExpiresAt = new Date(lineEnd * 1000);
        } else if (invoice.period_end) {
          newExpiresAt = new Date(invoice.period_end * 1000);
        } else {
          try {
            const sub = await stripe.subscriptions.retrieve(subscriptionId);
            // current_period_end is unix seconds
            const periodEnd = (sub as { current_period_end?: number }).current_period_end;
            if (periodEnd) newExpiresAt = new Date(periodEnd * 1000);
          } catch (err) {
            console.error(
              "[stripe-webhook] failed to look up subscription for renewal:",
              err,
            );
          }
        }
        if (!newExpiresAt) {
          newExpiresAt = new Date();
          newExpiresAt.setMonth(newExpiresAt.getMonth() + 1);
        }

        // Idempotency: if the existing expiresAt is already at or past the
        // new value (e.g. duplicate webhook delivery for the same invoice),
        // don't extend further. Only update if the new period actually
        // advances past what we already have.
        if (membership.expiresAt && membership.expiresAt >= newExpiresAt) {
          console.log(
            `[stripe-webhook] renewal for ${membership.id} is not newer than current expiresAt — skipping`,
          );
          break;
        }

        // Don't blindly flip SUSPENDED→ACTIVE — if the user paused, we want
        // to leave them paused. Only re-activate from a payment-failed
        // suspension. And NEVER extend a CANCELLED membership — the sub was
        // cancelled (by user or refund) and a late invoice event shouldn't
        // grant extra access.
        if (membership.status === "CANCELLED") {
          console.log(
            `[stripe-webhook] ignoring renewal for CANCELLED membership ${membership.id}`,
          );
          break;
        }

        const shouldReactivate =
          membership.status === "ACTIVE" ||
          membership.suspendReason === "payment-failed";

        await prisma.communityMembership.update({
          where: { id: membership.id },
          data: {
            expiresAt: newExpiresAt,
            ...(shouldReactivate
              ? { status: "ACTIVE", suspendReason: null, suspendedAt: null }
              : {}),
          },
        });

        // Notify the member their subscription renewed successfully.
        try {
          const user = await prisma.user.findUnique({
            where: { id: membership.userId },
            select: { email: true, name: true },
          });
          if (user?.email) {
            const formattedDate = newExpiresAt.toLocaleDateString("en-US", {
              month: "long", day: "numeric", year: "numeric",
            });
            sendMembershipRenewed(user.email, user.name || "Member", formattedDate)
              .catch((err) => console.error("[stripe-webhook] renewal email failed:", err));
          }
        } catch { /* non-blocking */ }
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

          try {
            const user = await prisma.user.findUnique({
              where: { id: membership.userId },
              select: { email: true, name: true },
            });
            if (user?.email) {
              const accessUntil = membership.expiresAt
                ? membership.expiresAt.toLocaleDateString("en-US", {
                    month: "long", day: "numeric", year: "numeric",
                  })
                : undefined;
              sendMembershipCancelled(user.email, user.name || "Member", accessUntil)
                .catch((err) => console.error("[stripe-webhook] cancellation email failed:", err));
            }
          } catch { /* non-blocking */ }
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

        // Resolve the charge back to the original checkout session via the
        // payment_intent. This is the proper Stripe linkage and replaces the
        // earlier "loop the last 50 purchases" approach which silently
        // missed older refunds.
        let sessionId: string | null = null;
        try {
          if (charge.payment_intent) {
            const stripeClient = stripe;
            const sessions = await stripeClient.checkout.sessions.list({
              payment_intent: charge.payment_intent as string,
              limit: 1,
            });
            sessionId = sessions.data[0]?.id ?? null;
          }
        } catch (err) {
          console.error(
            "[stripe-webhook] failed to look up session for refunded charge:",
            err,
          );
        }

        if (!sessionId) {
          console.error(
            "[stripe-webhook] could not resolve session for charge.refunded",
            charge.id,
          );
          break;
        }

        const purchase = await prisma.purchase.findUnique({
          where: { paypalOrderId: `ST-${sessionId}` },
        });

        if (!purchase) {
          console.error(
            `[stripe-webhook] no purchase found for refunded session ST-${sessionId}`,
          );
          break;
        }

        await prisma.purchase.update({
          where: { id: purchase.id },
          data: { status: "REFUNDED" },
        });

        // INNER_CIRCLE refunds also need to cancel the membership — otherwise
        // a refunded user keeps community access until expiresAt naturally
        // lapses. Find the membership via the userId on the purchase, or via
        // email lookup if userId is null.
        const meta = purchase.metadata as Record<string, string> | null;
        if (meta?.productKey === "INNER_CIRCLE") {
          const user = purchase.userId
            ? await prisma.user.findUnique({ where: { id: purchase.userId } })
            : await prisma.user.findUnique({ where: { email: purchase.customerEmail } });

          if (user) {
            await prisma.communityMembership.updateMany({
              where: { userId: user.id },
              data: { status: "CANCELLED", cancelledAt: new Date() },
            });
            console.log(
              `[stripe-webhook] cancelled membership for refunded INNER_CIRCLE user ${user.email}`,
            );
          }
        }
        break;
      }

      case "invoice.payment_failed": {
        // Failed renewal — suspend the membership immediately so we don't
        // keep granting access to a user whose card declined. Stripe will
        // also retry the charge per the dunning settings; if it eventually
        // succeeds, invoice.payment_succeeded above will flip status back to
        // ACTIVE.
        const invoice = event.data.object as { subscription?: string | null };
        const subscriptionId = invoice.subscription as string;
        if (!subscriptionId) break;

        const membership = await prisma.communityMembership.findFirst({
          where: { paypalSubscriptionId: `ST-${subscriptionId}` },
        });
        if (membership && membership.status === "ACTIVE") {
          await prisma.communityMembership.update({
            where: { id: membership.id },
            data: {
              status: "SUSPENDED",
              suspendedAt: new Date(),
              suspendReason: "payment-failed",
            },
          });
          console.log(
            `[stripe-webhook] suspended membership ${membership.id} after payment_failed`,
          );

          // Let the member know their payment failed so they can fix it.
          try {
            const user = await prisma.user.findUnique({
              where: { id: membership.userId },
              select: { email: true, name: true },
            });
            if (user?.email) {
              sendMembershipSuspended(user.email, user.name || "Member")
                .catch((err) => console.error("[stripe-webhook] suspension email failed:", err));
            }
          } catch { /* non-blocking */ }
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
