import { redirect } from "next/navigation";
import { requireServerAuth } from "@/lib/auth/server-auth";
import { getAccess } from "@/lib/access/tier";
import { readPact } from "@/lib/pact/read";
import { PageShell } from "@/components/app-shell/ui";
import BreakClient from "@/components/app-shell/pact/BreakClient";
import type { SignatureStrokes } from "@/lib/pact/signature";

export const metadata = {
  title: "Breaking the pact | Consilium",
};

/** The cancel interstitial. Reached from the record only, on purpose. */
export default async function PactBreakPage() {
  const userId = await requireServerAuth("/app/pact/break");
  // No training wall: sealing the record is a right that survives a
  // lapse. Breaking needs no entitlement, only a pact to break.
  const access = await getAccess(userId);
  const read = await readPact(userId, { entitled: access.pactEntitled });
  if (!read.pact) {
    redirect("/app/pact");
  }

  return (
    <PageShell>
      <BreakClient
        pactNumber={read.pact.number}
        kept={read.entries.filter((e) => e.status === "kept").length}
        scars={read.entries.filter((e) => e.status === "scarred").length}
        weekNumber={read.weekNumber}
        signature={(read.pact.signatureData as SignatureStrokes | null) ?? null}
        goals={Array.isArray(read.pact.goals) ? (read.pact.goals as string[]) : []}
      />
    </PageShell>
  );
}
