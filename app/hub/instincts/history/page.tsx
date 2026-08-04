import Link from "next/link";
import type { Metadata } from "next";
import { Check, X } from "lucide-react";
import { requireServerAuth } from "@/lib/auth/server-auth";
import { getResponseHistory } from "@/lib/tells/db";
import { EmptyState, PageHeader, PageShell } from "@/components/app-shell/ui";
import { TRACK_LABELS, type InstinctTrack } from "@/lib/tells/types";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Tell history | Consilium",
  description: "Every Tell you have answered, with your score per axis.",
};

export default async function InstinctsHistoryPage() {
  const userId = await requireServerAuth("/app/instincts/history");
  const responses = await getResponseHistory(userId, { limit: 60 });

  return (
    <PageShell>
      <PageHeader
        title="Every Tell, every answer"
        lede="Most recent first. Re-reading the misses is where the rating moves."
      />

      {responses.length === 0 ? (
        <EmptyState line="No answers yet. Today's Tell is waiting." />
      ) : (
        <div className="overflow-hidden rounded-2xl border border-[var(--app-line-soft)]">
          <ul className="divide-y divide-[var(--app-line-soft)]">
            {responses.map((r) => (
              <li
                key={r.id}
                className="flex items-center gap-3 px-3.5 py-3 active:bg-[var(--app-card)]"
              >
                <span className="shrink-0">
                  {r.isCorrect ? (
                    <Check size={15} className="text-[var(--app-green)]" />
                  ) : (
                    <X size={15} className="text-[var(--app-rose)]" />
                  )}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-app-body text-[var(--app-text)]">
                    {r.tell.question}
                  </p>
                  <p className="mt-0.5 text-app-tiny text-[var(--app-dim)]">
                    Tell {String(r.tell.number).padStart(3, "0")} &middot;{" "}
                    {TRACK_LABELS[r.tell.track as InstinctTrack]} &middot;{" "}
                    {r.answeredAt.toISOString().slice(0, 10)}
                  </p>
                </div>
                <span
                  className={`text-app-caption tabular-nums ${
                    r.scoreImpact > 0
                      ? "text-[var(--app-green)]"
                      : r.scoreImpact < 0
                        ? "text-[var(--app-rose)]"
                        : "text-[var(--app-dim)]"
                  }`}
                >
                  {r.scoreImpact > 0 ? "+" : ""}
                  {r.scoreImpact}
                </span>
                <Link
                  href={`/tells/${r.tell.slug}`}
                  className="text-app-tiny uppercase tracking-app-label text-[var(--app-dim)] active:text-[var(--app-gold)]"
                >
                  Open
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      <p className="mt-5 text-app-micro text-[var(--app-dim)]">
        Showing the last {responses.length} scored response
        {responses.length === 1 ? "" : "s"}. Replays do not appear here.
      </p>
    </PageShell>
  );
}
