import type { Metadata } from "next";
import { requireServerAuth } from "@/lib/auth/server-auth";
import { getReceiptsQuota, listReceipts } from "@/lib/receipts/db";
import ReceiptsClient from "@/components/receipts/ReceiptsClient";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Receipts | Train Your Instincts",
  description:
    "Paste a message exchange. Get the read in Kanika's voice. Member-only.",
};

export default async function ReceiptsPage() {
  const userId = await requireServerAuth("/consilium/receipts");

  const [items, quota] = await Promise.all([
    listReceipts(userId, { limit: 30 }),
    getReceiptsQuota(userId, "member"),
  ]);

  return (
    <div className="min-h-screen px-4 py-10 sm:py-14">
      <div className="max-w-3xl mx-auto">
        <header className="mb-10">
          <p className="text-accent-gold/70 text-[10px] uppercase tracking-[0.4em] mb-3">
            Receipts
          </p>
          <h1 className="text-3xl sm:text-4xl font-extralight tracking-wider uppercase text-text-light mb-3">
            Paste it. Read it.
          </h1>
          <p className="text-text-gray text-sm sm:text-base font-light max-w-2xl leading-relaxed">
            Paste a message, drop a screenshot, or do both. You&rsquo;ll get
            a 3-section read in Kanika&rsquo;s voice: what they&rsquo;re
            doing, what they want, and the structurally clean response.
            Trained on Kanika&rsquo;s frameworks. Your input is not stored,
            only the read is saved.
          </p>
        </header>

        <ReceiptsClient
          initialItems={items.map((i) => ({
            id: i.id,
            label: i.label,
            response: i.response,
            createdAt: i.createdAt.toISOString(),
          }))}
          initialQuota={quota}
        />

        <p className="text-text-gray/50 text-xs mt-12 leading-relaxed">
          Receipts is pattern recognition training. Not medical, legal,
          or therapeutic advice. Not a substitute for professional
          evaluation. If you are in immediate distress, call 988 (US) or
          your local crisis line.
        </p>
      </div>
    </div>
  );
}
