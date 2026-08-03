import { redirect } from "next/navigation";
import { requireServerAuth } from "@/lib/auth/server-auth";
import { memberGate } from "@/lib/access/guard";
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
  const wall = await memberGate(userId, {
    trigger: "locked-nav",
    returnHref: "/app/pact/record",
    surfaceLabel: "The Pact",
  });
  if (wall) return wall;

  const read = await readPact(userId);
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
