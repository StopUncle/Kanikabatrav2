import { requireServerAuth } from "@/lib/auth/server-auth";
import { memberGate } from "@/lib/access/guard";
import KanikaThread from "@/components/app-shell/KanikaThread";

export const metadata = {
  title: "Kanika | Consilium",
};

// The thread is live: never serve a cached view of someone's private line.
export const dynamic = "force-dynamic";

export default async function KanikaPage() {
  const userId = await requireServerAuth("/app/kanika");
  // Member-only: this is direct access to Kanika, which the plan puts
  // squarely on the paid side.
  const gate = await memberGate(userId);
  if (gate) return gate;
  return <KanikaThread />;
}
