import type { Metadata } from "next";
import { requireServerAuth } from "@/lib/auth/server-auth";
import { getReceiptsQuota, listReceipts } from "@/lib/receipts/db";
import AppReceiptsClient from "@/components/app-shell/receipts/AppReceiptsClient";
import { trainingGate } from "@/lib/access/guard";
import { PageHeader, PageShell } from "@/components/app-shell/ui";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Receipts | Consilium",
  description:
    "Paste a message exchange. Get the read in Kanika's voice. Member-only.",
};

export default async function ReceiptsPage() {
  const userId = await requireServerAuth("/app/receipts");
  // Member-only surface. The shell no longer gates for us (A2), and this
  // page reads its data straight from Prisma, so the gate has to be here
  // and above the queries.
  const gate = await trainingGate(userId, {
    trigger: "locked-nav",
    surfaceLabel: "Receipts",
  });
  if (gate) return gate;

  const [items, quota] = await Promise.all([
    listReceipts(userId, { limit: 30 }),
    getReceiptsQuota(userId, "member"),
  ]);

  return (
    <PageShell>
      <PageHeader
        title="Receipts"
        lede="Paste a message or drop a screenshot. You get a 3-section read in Kanika's voice: what they're doing, what they want, and the clean response."
      />

      <AppReceiptsClient
        initialItems={items.map((i) => ({
          id: i.id,
          label: i.label,
          response: i.response,
          createdAt: i.createdAt.toISOString(),
        }))}
        initialQuota={quota}
      />

      <p className="mt-8 text-app-micro leading-relaxed text-[var(--app-dim)]">
        Receipts is pattern recognition training. Not medical, legal, or
        therapeutic advice. Not a substitute for professional evaluation. If
        you are in immediate distress, call 988 (US) or your local crisis
        line.
      </p>
    </PageShell>
  );
}
