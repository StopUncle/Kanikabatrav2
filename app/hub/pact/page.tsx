import { redirect } from "next/navigation";
import { requireServerAuth } from "@/lib/auth/server-auth";
import { getAccess } from "@/lib/access/tier";
import { readPact } from "@/lib/pact/read";
import { isPactCheckoutOpen } from "@/lib/stripe";
import { PageShell } from "@/components/app-shell/ui";
import PactDoor from "@/components/app-shell/pact/PactDoor";

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
  const [access, read] = await Promise.all([
    getAccess(userId),
    readPact(userId),
  ]);

  if (read.pact) {
    redirect("/app/pact/week");
  }

  return (
    <PageShell>
      <PactDoor
        entitled={access.pactEntitled}
        rejoining={read.pastPacts.length > 0}
        // An entitled member needs no checkout, so an unpriced Stripe does
        // not close the door for them.
        checkoutOpen={access.pactEntitled || isPactCheckoutOpen()}
      />
    </PageShell>
  );
}
