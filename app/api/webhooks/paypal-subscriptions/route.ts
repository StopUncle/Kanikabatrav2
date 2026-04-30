import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { paypalService } from "@/lib/paypal";

// Verify PayPal webhook signature
async function verifyWebhookSignature(
  body: string,
  headers: Headers,
): Promise<boolean> {
  const webhookId =
    process.env.PAYPAL_SUBSCRIPTION_WEBHOOK_ID || process.env.PAYPAL_WEBHOOK_ID;
  const transmissionId = headers.get("paypal-transmission-id");
  const transmissionTime = headers.get("paypal-transmission-time");
  const certUrl = headers.get("paypal-cert-url");
  const authAlgo = headers.get("paypal-auth-algo");
  const transmissionSig = headers.get("paypal-transmission-sig");

  // In development without webhook ID, allow for testing
  if (process.env.NODE_ENV === "development" && !webhookId) {
    console.warn(
      "DEVELOPMENT MODE: Subscription webhook verification bypassed",
    );
    return true;
  }

  // In production, ALL required fields must be present
  if (
    !webhookId ||
    !transmissionId ||
    !transmissionTime ||
    !transmissionSig ||
    !certUrl ||
    !authAlgo
  ) {
    console.error("Missing required PayPal subscription webhook headers");
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
      console.error(
        "PayPal subscription verification API error:",
        response.status,
      );
      return false;
    }

    const result = await response.json();
    return result.verification_status === "SUCCESS";
  } catch (error) {
    console.error("PayPal subscription webhook verification error:", error);
    return false;
  }
}

// Safely parse custom_id with format "user:USER_ID:course:COURSE_ID"
function parseCustomId(
  customId: string | undefined,
): { userId: string; courseId: string } | null {
  if (!customId) return null;

  const parts = customId.split(":");
  // Expected format: "user:USER_ID:course:COURSE_ID"
  if (parts.length < 4 || parts[0] !== "user" || parts[2] !== "course") {
    console.error("Invalid custom_id format:", customId);
    return null;
  }

  const userId = parts[1];
  const courseId = parts[3];

  if (!userId || !courseId) {
    console.error("Missing userId or courseId in custom_id:", customId);
    return null;
  }

  return { userId, courseId };
}

export async function POST(request: NextRequest) {
  try {
    const bodyText = await request.text();

    // Verify webhook signature first
    const isValid = await verifyWebhookSignature(bodyText, request.headers);
    if (!isValid) {
      return NextResponse.json(
        { error: "Invalid webhook signature" },
        { status: 401 },
      );
    }

    const body = JSON.parse(bodyText);
    const eventType = body.event_type;
    const resource = body.resource;

    console.log(`PayPal Subscription Webhook: ${eventType}`);

    switch (eventType) {
      case "BILLING.SUBSCRIPTION.ACTIVATED": {
        const subscriptionId = resource.id;
        const customId = resource.custom_id;
        const parsed = parseCustomId(customId);

        if (parsed) {
          const { userId, courseId } = parsed;

          await prisma.subscription.upsert({
            where: { paypalSubscriptionId: subscriptionId },
            create: {
              userId,
              courseId,
              paypalSubscriptionId: subscriptionId,
              paypalPlanId: resource.plan_id,
              status: "ACTIVE",
              currentPeriodStart: new Date(resource.start_time),
              currentPeriodEnd: resource.billing_info?.next_billing_time
                ? new Date(resource.billing_info.next_billing_time)
                : undefined,
            },
            update: {
              status: "ACTIVE",
              currentPeriodStart: new Date(resource.start_time),
              currentPeriodEnd: resource.billing_info?.next_billing_time
                ? new Date(resource.billing_info.next_billing_time)
                : undefined,
            },
          });

          const subscription = await prisma.subscription.findUnique({
            where: { paypalSubscriptionId: subscriptionId },
          });

          if (subscription) {
            await prisma.courseEnrollment.upsert({
              where: {
                courseId_userId: { courseId, userId },
              },
              create: {
                courseId,
                userId,
                subscriptionId: subscription.id,
                status: "ACTIVE",
                startedAt: new Date(),
              },
              update: {
                subscriptionId: subscription.id,
                status: "ACTIVE",
              },
            });
          }
        }
        break;
      }

      case "BILLING.SUBSCRIPTION.CANCELLED": {
        const subscriptionId = resource.id;

        await prisma.subscription.updateMany({
          where: { paypalSubscriptionId: subscriptionId },
          data: {
            status: "CANCELLED",
            cancelledAt: new Date(),
          },
        });

        // Sync CommunityMembership
        const cancelledCM = await prisma.communityMembership.findFirst({
          where: { paypalSubscriptionId: subscriptionId },
        });
        if (cancelledCM) {
          await prisma.communityMembership.update({
            where: { id: cancelledCM.id },
            data: { status: "CANCELLED", cancelledAt: new Date() },
          });
        }
        break;
      }

      case "BILLING.SUBSCRIPTION.EXPIRED": {
        const subscriptionId = resource.id;

        const subscription = await prisma.subscription.findUnique({
          where: { paypalSubscriptionId: subscriptionId },
        });

        if (subscription) {
          await prisma.subscription.update({
            where: { id: subscription.id },
            data: { status: "EXPIRED" },
          });

          await prisma.courseEnrollment.updateMany({
            where: { subscriptionId: subscription.id },
            data: { status: "CANCELLED" },
          });
        }

        // Sync CommunityMembership
        const expiredCM = await prisma.communityMembership.findFirst({
          where: { paypalSubscriptionId: subscriptionId },
        });
        if (expiredCM) {
          await prisma.communityMembership.update({
            where: { id: expiredCM.id },
            data: { status: "EXPIRED" },
          });
        }
        break;
      }

      case "BILLING.SUBSCRIPTION.SUSPENDED": {
        const subscriptionId = resource.id;

        await prisma.subscription.updateMany({
          where: { paypalSubscriptionId: subscriptionId },
          data: { status: "PAUSED" },
        });

        // Sync CommunityMembership
        const suspendedCM = await prisma.communityMembership.findFirst({
          where: { paypalSubscriptionId: subscriptionId },
        });
        if (suspendedCM) {
          await prisma.communityMembership.update({
            where: { id: suspendedCM.id },
            data: { status: "SUSPENDED", suspendedAt: new Date() },
          });
        }
        break;
      }

      case "BILLING.SUBSCRIPTION.RE-ACTIVATED": {
        const subscriptionId = resource.id;

        const subscription = await prisma.subscription.findUnique({
          where: { paypalSubscriptionId: subscriptionId },
        });

        if (subscription) {
          await prisma.subscription.update({
            where: { id: subscription.id },
            data: { status: "ACTIVE" },
          });

          await prisma.courseEnrollment.updateMany({
            where: { subscriptionId: subscription.id },
            data: { status: "ACTIVE" },
          });
        }

        // Sync CommunityMembership
        const reactivatedCM = await prisma.communityMembership.findFirst({
          where: { paypalSubscriptionId: subscriptionId },
        });
        if (reactivatedCM) {
          await prisma.communityMembership.update({
            where: { id: reactivatedCM.id },
            data: { status: "ACTIVE" },
          });
        }
        break;
      }

      case "PAYMENT.SALE.COMPLETED": {
        const billingAgreementId = resource.billing_agreement_id;

        if (billingAgreementId) {
          await prisma.subscription.updateMany({
            where: { paypalSubscriptionId: billingAgreementId },
            data: {
              currentPeriodStart: new Date(),
              currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
            },
          });

          // Sync CommunityMembership, extend by 1 month
          const paymentCM = await prisma.communityMembership.findFirst({
            where: { paypalSubscriptionId: billingAgreementId },
          });
          if (paymentCM) {
            await prisma.communityMembership.update({
              where: { id: paymentCM.id },
              data: {
                expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
              },
            });
          }
        }
        break;
      }

      case "BILLING.SUBSCRIPTION.PAYMENT.FAILED":
        console.error("Subscription payment failed:", resource.id || resource.billing_agreement_id);
        // Don't immediately revoke. PayPal will retry and eventually suspend
        break;

      default:
        console.log(`Unhandled subscription webhook event: ${eventType}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Subscription webhook error:", error);
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 },
    );
  }
}
