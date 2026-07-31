import { requireServerAuth } from "@/lib/auth/server-auth";
import { prisma } from "@/lib/prisma";
import { readProgram } from "@/lib/program/read";
import { TOTAL_WEEKS } from "@/lib/program/curriculum";
import WeekCard from "@/components/program/WeekCard";
import { memberGate } from "@/lib/access/guard";
import { EmptyState, PageHeader, PageShell } from "@/components/app-shell/ui";

export const metadata = {
  title: "The 12 Weeks | Consilium",
};

/**
 * The 12 Week Transformation.
 *
 * Twelve dated reasons to come back. The whole ladder is visible from day
 * one, because seeing the road is most of why anyone stays on it; only the
 * weeks that have opened can actually be worked.
 */
export default async function ProgramPage() {
  const userId = await requireServerAuth("/app/program");
  // Member-only surface. The shell no longer gates for us (A2), and this
  // page reads its data straight from Prisma, so the gate has to be here
  // and above the queries.
  const gate = await memberGate(userId, {
    trigger: "locked-nav",
    surfaceLabel: "The 12 Weeks",
  });
  if (gate) return gate;
  const program = await readProgram(prisma, userId);

  return (
    <PageShell>
      <PageHeader
        title="The 12 Weeks"
        lede="One week at a time. Read it, watch it, then go and do the thing."
      />

      {!program.enrolled ? (
        <EmptyState line="The program opens with your membership." />
      ) : program.weeks.length === 0 ? (
        <EmptyState
          line="Week one lands shortly."
          hint="You will get a notification the moment it opens."
        />
      ) : (
        <>
          <div className="mb-5 rounded-2xl border border-[var(--app-line)] bg-[var(--app-card)] px-4 py-3.5">
            <div className="flex items-baseline justify-between">
              <p className="text-app-tiny uppercase tracking-app-label text-[var(--app-gold-soft)]">
                Your progress
              </p>
              <p className="text-app-caption text-[var(--app-dim)]">
                {program.completedCount} of {TOTAL_WEEKS} done
              </p>
            </div>
            <div className="mt-2.5 h-[3px] overflow-hidden rounded-full bg-[var(--app-line)]">
              <div
                className="h-full rounded-full bg-[var(--app-gold)]"
                style={{
                  width: `${(program.completedCount / TOTAL_WEEKS) * 100}%`,
                }}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2.5">
            {program.weeks.map((w) => (
              <WeekCard
                key={w.weekNumber}
                week={w}
                defaultOpen={
                  program.actionable?.weekNumber === w.weekNumber
                }
              />
            ))}
          </div>
        </>
      )}
    </PageShell>
  );
}
