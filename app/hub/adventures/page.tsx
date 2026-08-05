import Link from "next/link";
import { requireServerAuth } from "@/lib/auth/server-auth";
import { prisma } from "@/lib/prisma";
import { ArrowRight, Check, Clock } from "lucide-react";
import { EmptyState, PageHeader, PageShell } from "@/components/app-shell/ui";

export const metadata = {
  title: "Adventures | Consilium",
  description:
    "Multi-scenario arcs. One narrative thread, played a chapter at a time. Pick a journey.",
};

/** The adventure index in the app skin: one column of doors, app tokens. */
export default async function AdventuresIndex() {
  const userId = await requireServerAuth("/app/adventures");

  const [adventures, progresses] = await Promise.all([
    prisma.adventure.findMany({
      where: { publishedAt: { not: null } },
      orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
    }),
    prisma.adventureProgress.findMany({ where: { userId } }),
  ]);

  const progressByAdventure = new Map(progresses.map((p) => [p.adventureId, p]));

  // Counted, not claimed. The lede said "five to seven" while the cards
  // underneath it read 8, 5 and 9, and a page that disagrees with itself in
  // the space of one scroll teaches the reader to stop believing the copy.
  const lengths = adventures.map((a) => a.scenarioIds.length).filter((n) => n > 0);
  const shortest = lengths.length ? Math.min(...lengths) : 0;
  const longest = lengths.length ? Math.max(...lengths) : 0;
  const span =
    lengths.length === 0
      ? "A single story told across several chapters."
      : shortest === longest
        ? `A single story told across ${longest} chapters.`
        : `A single story told across ${shortest} to ${longest} chapters.`;

  return (
    <PageShell>
      <PageHeader
        title="Adventures"
        lede={`${span} Progress saves between chapters: step in once a day, finish across a week.`}
      />

      {adventures.length === 0 ? (
        <EmptyState line="No adventures published yet. Check back soon." />
      ) : (
        <div className="flex flex-col gap-3">
          {adventures.map((adv) => {
            const progress = progressByAdventure.get(adv.id);
            const total = adv.scenarioIds.length;
            const stepLabel = progress
              ? progress.completedAt
                ? "Completed"
                : `Step ${Math.min(progress.currentStep + 1, total)} of ${total}`
              : `${total} chapters`;
            const isCompleted = !!progress?.completedAt;
            return (
              <Link
                key={adv.id}
                href={`/app/adventures/${adv.slug}`}
                className={`group flex flex-col rounded-2xl border p-4 transition-colors active:bg-[var(--app-card-2)] ${
                  isCompleted
                    ? "border-[var(--app-line-soft)] bg-transparent opacity-70"
                    : "border-[var(--app-line)] bg-[var(--app-card)]"
                }`}
              >
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-app-tiny uppercase tracking-app-label text-[var(--app-gold)] opacity-70">
                    {stepLabel}
                  </span>
                  <div className="flex items-center gap-2">
                    {adv.isNew && !progress && (
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-2 py-0.5 text-app-micro uppercase tracking-app-label text-emerald-300">
                        <span aria-hidden className="relative inline-flex h-1.5 w-1.5">
                          <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400/40" />
                          <span className="relative inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />
                        </span>
                        New
                      </span>
                    )}
                    {isCompleted ? (
                      <Check
                        size={14}
                        strokeWidth={1.8}
                        className="text-[var(--app-gold)] opacity-70"
                      />
                    ) : (
                      <ArrowRight
                        size={14}
                        strokeWidth={1.6}
                        className="text-[var(--app-dim)]"
                      />
                    )}
                  </div>
                </div>
                <h2
                  className="mb-1 text-app-title font-light text-[var(--app-text)]"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {adv.title}
                </h2>
                <p className="mb-3 text-app-body text-[var(--app-muted)]">
                  {adv.tagline}
                </p>
                <div className="mt-auto flex items-center gap-3 text-app-tiny uppercase tracking-app-label text-[var(--app-dim)]">
                  <span className="inline-flex items-center gap-1">
                    <Clock size={10} strokeWidth={1.6} />
                    {adv.estimatedMinutes} min
                  </span>
                  <span aria-hidden>.</span>
                  <span>{adv.difficulty}</span>
                </div>
              </Link>
            );
          })}
        </div>
      )}

      <p className="mt-8 text-center text-app-caption text-[var(--app-dim)]">
        Each adventure reuses scenarios from the catalog. Replay any single
        chapter from the{" "}
        <Link
          href="/app/train/climb"
          className="text-[var(--app-gold)] opacity-80 transition-opacity active:opacity-100"
        >
          simulator
        </Link>
        .
      </p>
    </PageShell>
  );
}
