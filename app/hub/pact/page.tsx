import { redirect } from "next/navigation";
import { requireServerAuth } from "@/lib/auth/server-auth";
import { getAccess, canTrain } from "@/lib/access/tier";
import { readPact } from "@/lib/pact/read";
import { isPactCheckoutOpen } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";
import { PageShell } from "@/components/app-shell/ui";
import PactDoor from "@/components/app-shell/pact/PactDoor";
import ResumeBilling from "@/components/app-shell/pact/ResumeBilling";

export const metadata = {
  title: "The Blood Pact | Consilium",
  description: "A signed commitment to weekly challenges that transform you.",
};

/**
 * The door. For a signed member this page barely exists: their pact IS the
 * week, so the tab lands them there. Everyone else gets the sell, which is
 * also the whole of it: track, terms, oath, signature.
 */
export default async function PactDoorPage() {
  const userId = await requireServerAuth("/app/pact");
  const access = await getAccess(userId);
  // Entitlement rides into the read: this page is exactly where lapsed
  // members land, and their look at the door must not mint entries or
  // scar weeks they were locked out of writing.
  const read = await readPact(userId, { entitled: access.pactEntitled });

  // Only a viewer who can actually train lands on the week. A live pact
  // with a lapsed entitlement (expired membership, ended subscription)
  // used to redirect here anyway, the week walled them, and the wall's
  // CTA led back to this door: a perfect bounce loop. For them the door
  // IS the right room; re-entitling is the way back to their week.
  if (read.pact && canTrain(access)) {
    redirect("/app/pact/week");
  }

  // A pact in dunning: the subscription is alive but the card failed, so
  // the member is here rather than on their week. Signing again would
  // double-bill (the create route refuses it); a new card is the only
  // move, and until this banner existed the app offered no way to make it.
  const billing = await prisma.pactMembership.findUnique({
    where: { userId },
    select: { status: true, stripeSubscriptionId: true },
  });
  const needsCard =
    !!read.pact &&
    !!billing?.stripeSubscriptionId &&
    (billing.status === "SUSPENDED" || billing.status === "EXPIRED");

  return (
    <PageShell>
      {needsCard && <ResumeBilling />}
      <PactDoor
        entitled={access.pactEntitled}
        isMember={access.isMember}
        rejoining={read.pastPacts.length > 0}
        // An entitled member needs no checkout, so an unpriced Stripe does
        // not close the door for them.
        checkoutOpen={access.pactEntitled || isPactCheckoutOpen()}
      />
    </PageShell>
  );
}
