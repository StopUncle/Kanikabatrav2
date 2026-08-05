import { requireServerAuth } from "@/lib/auth/server-auth";
import { prisma } from "@/lib/prisma";
import { readMark } from "@/lib/mark/read";
import { MARK_FRAME_LINE } from "@/lib/mark/verdicts";
import { trainingGate } from "@/lib/access/guard";
import { EmptyState, PageHeader, PageShell } from "@/components/app-shell/ui";
import {
  MarkLedger,
  MarkScoreCard,
} from "@/components/app-shell/measure/MarkBars";

export const metadata = {
  title: "The Mark | Consilium",
};

/**
 * The Mark, in full: both ledgers, every cell, including the ones with
 * nothing to say yet.
 *
 * Showing the untested cells is the point rather than an omission. A
 * member who can see where the record is thin trusts the parts that are
 * not, and the gaps are the training that is still ahead of them.
 */
export default async function MeasurePage() {
  const userId = await requireServerAuth("/app/measure");
  // Member-only surface. The shell no longer gates for us (A2), and this
  // page reads its data straight from Prisma, so the gate has to be here
  // and above the queries.
  const gate = await trainingGate(userId, {
    trigger: "locked-nav",
    surfaceLabel: "The Mark",
  });
  if (gate) return gate;
  const read = await readMark(prisma, userId);

  return (
    <PageShell>
      <PageHeader title="The Mark" lede={MARK_FRAME_LINE} />

      {!read.baseline && read.totalEncounters === 0 ? (
        <EmptyState
          line="There is nothing to read yet."
          hint="Start with the Baseline Read. After that, every scenario, drill, Tell and Lab session you face in here adds to the record."
          action={{
            label: "Take the Baseline Read",
            href: "/app/measure/baseline",
          }}
        />
      ) : (
        <>
          <MarkScoreCard overall={read.overall} coverage={read.coverage} />

          {read.insights.length > 0 && (
            <section className="mb-7 rounded-[18px] border border-[var(--app-line)] bg-[var(--app-card)] p-[18px]">
              <p className="mb-3 text-app-eyebrow uppercase tracking-app-label text-[var(--app-gold-soft)]">
                The thing worth knowing
              </p>
              <div className="flex flex-col gap-2.5">
                {read.insights.map((line) => (
                  <p
                    key={line}
                    className="text-app-lead font-light leading-relaxed text-[var(--app-text)]"
                  >
                    {line}
                  </p>
                ))}
              </div>
            </section>
          )}

          <MarkLedger
            title="By tactic"
            caption="What is being run on you."
            rows={read.tactics}
          />
          <MarkLedger
            title="By who is running it"
            caption="The same move lands differently depending on who makes it."
            rows={read.operators}
          />

          {read.baseline && (
            <p className="mt-7 text-center text-app-caption leading-relaxed text-[var(--app-dim)]">
              Last Baseline Read{" "}
              {read.baseline.takenAt.toLocaleDateString("en-AU", {
                day: "numeric",
                month: "long",
              })}
              {read.baseline.attempts > 1
                ? `, ${read.baseline.attempts} sittings so far.`
                : "."}
            </p>
          )}
        </>
      )}
    </PageShell>
  );
}
