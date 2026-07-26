import { requireServerAuth } from "@/lib/auth/server-auth";
import KanikaThread from "@/components/app-shell/KanikaThread";

export const metadata = {
  title: "Kanika | Consilium",
};

// The thread is live: never serve a cached view of someone's private line.
export const dynamic = "force-dynamic";

export default async function KanikaPage() {
  await requireServerAuth("/app/kanika");
  return <KanikaThread />;
}
