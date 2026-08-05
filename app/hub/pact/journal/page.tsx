import { redirect } from "next/navigation";
import { requireServerAuth } from "@/lib/auth/server-auth";
import { trainingGate } from "@/lib/access/guard";
import { readPact } from "@/lib/pact/read";
import { PageShell, PageHeader, EmptyState } from "@/components/app-shell/ui";

export const metadata = {
  title: "Pact journal | Consilium",
};

/**
 * The private entries, newest first. Nothing on this page is or can become
 * public: the wall only ever sees the separate share box, and this page
 * does not even render that box's contents.
 */
export default async function PactJournalPage() {
  const userId = await requireServerAuth("/app/pact/journal");
  const wall = await trainingGate(userId, {
    trigger: "locked-nav",
    returnHref: "/app/pact/journal",
    surfaceLabel: "The Pact",
  });
  if (wall) return wall;

  const read = await readPact(userId);
  if (!read.pact) {
    redirect("/app/pact");
  }

  const written = read.entries
    .filter((e) => e.journalBody)
    .sort((a, b) => b.weekNumber - a.weekNumber);

  return (
    <PageShell>
      <PageHeader
        title="The journal"
        lede="Private, all of it, always. Week by week, in your own words."
      />

      {written.length === 0 ? (
        <EmptyState
          line="Nothing written yet."
          hint="The record holds what you did; this holds what it was like."
          action={{ label: "Write this week", href: "/app/pact/week" }}
        />
      ) : (
        <div className="flex flex-col gap-3">
          {written.map((e) => (
            <article
              key={e.id}
              className="rounded-2xl border border-[var(--app-line)] bg-[var(--app-card)] px-4 py-4"
            >
              <div className="flex items-baseline justify-between">
                <p className="text-app-eyebrow uppercase tracking-app-label text-[var(--app-dim)]">
                  Week {e.weekNumber}
                </p>
                <p
                  className={`text-app-micro uppercase tracking-app-label ${
                    e.status === "kept"
                      ? "text-[var(--app-gold)]"
                      : e.status === "scarred"
                        ? "text-[var(--pact-blood)]"
                        : "text-[var(--app-dim)]"
                  }`}
                >
                  {e.status}
                </p>
              </div>
              <p className="mt-2 whitespace-pre-line text-[13.5px] leading-relaxed text-[var(--app-text)]">
                {e.journalBody}
              </p>
              {e.aiReply && !e.flagged && (
                <p
                  className="mt-3 border-t border-[var(--app-line-soft)] pt-3 text-[13px] italic leading-relaxed text-[var(--app-muted)]"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {e.aiReply}
                </p>
              )}
            </article>
          ))}
        </div>
      )}
    </PageShell>
  );
}
