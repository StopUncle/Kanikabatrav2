import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth/middleware";
import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import { logger } from "@/lib/logger";

/**
 * Stripe Customer Portal for the Blood Pact.
 *
 * The pact bills weekly, which means fifty-two charges a year and a card
 * failure for somebody more or less constantly. Until this route existed
 * a failed payment was terminal: the member went SUSPENDED, the write
 * routes refused them, the create route answered a 409 telling the client
 * to open a portal that only Consilium had, and nothing in the app could
 * take a new card. The subscription then died in dunning and the revenue
 * with it.
 *
 * Deliberately separate from the Consilium portal route rather than
 * generalised: that one reads CommunityMembership and its legacy
 * paypalSubscriptionId column, and merging the two would put the pact's
 * recovery path behind that history.
 *
 * Requires the one-time Customer Portal setup in the Stripe dashboard,
 * the same one the Consilium route documents.
 */
export async function POST(request: NextRequest) {
  return requireAuth(request, async (_req, user) => {
    const membership = await prisma.pactMembership.findUnique({
      where: { userId: user.id },
      select: { stripeSubscriptionId: true, status: true },
    });

    // Consilium-entitled signers never had a pact subscription; their
    // billing lives on the Consilium portal, so say so rather than 404.
    if (!membership?.stripeSubscriptionId) {
      return NextResponse.json(
        { error: "No pact subscription to manage" },
        { status: 404 },
      );
    }

    try {
      const subscription = await stripe.subscriptions.retrieve(
        membership.stripeSubscriptionId,
      );
      const customerId =
        typeof subscription.customer === "string"
          ? subscription.customer
          : subscription.customer.id;

      const baseUrl =
        process.env.NEXT_PUBLIC_BASE_URL || "https://kanikarose.com";

      const session = await stripe.billingPortal.sessions.create({
        customer: customerId,
        // Back to the door: a suspended member returns there, and a
        // recovered one is redirected on to their week by the door.
        return_url: `${baseUrl}/app/pact`,
      });

      return NextResponse.json({ url: session.url });
    } catch (err) {
      logger.error(
        "[pact/portal] failed to create portal session",
        err as Error,
        { userId: user.id },
      );
      const message =
        err instanceof Error && err.message.includes("configuration")
          ? "The billing portal is not configured yet. Reply to any email from us and we will sort it."
          : "Could not open billing. Please try again.";
      return NextResponse.json({ error: message }, { status: 502 });
    }
  });
}
