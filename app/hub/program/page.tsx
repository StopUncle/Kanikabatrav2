import { requireServerAuth } from "@/lib/auth/server-auth";
import { prisma } from "@/lib/prisma";
import { readProgram } from "@/lib/program/read";
import { TOTAL_WEEKS } from "@/lib/program/curriculum";
import WeekCard from "@/components/program/WeekCard";

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
  const program = await readProgram(prisma, userId);

  return (
    <div className="px-5 pb-28 pt-6">
      <h1
        className="text-[28px] font-light"
        style={{ fontFamily: "var(--font-display)" }}
      >
        The 12 Weeks
      </h1>
      <p className="mb-5 mt-1 text-[13px] text-[var(--app-muted)]">
        One week at a time. Read it, watch it, then go and do the thing.
      </p>

      {!program.enrolled ? (
        <p className="rounded-2xl border border-[var(--app-line-soft)] bg-[var(--app-card)] px-4 py-8 text-center text-[13px] text-[var(--app-muted)]">
          The program opens with your membership.
        </p>
      ) : program.weeks.length === 0 ? (
        <p className="rounded-2xl border border-[var(--app-line-soft)] bg-[var(--app-card)] px-4 py-8 text-center text-[13px] text-[var(--app-muted)]">
          Week one lands shortly. You will get a notification the moment it
          opens.
        </p>
      ) : (
        <>
          <div className="mb-5 rounded-2xl border border-[var(--app-line)] bg-[var(--app-card)] px-4 py-3.5">
            <div className="flex items-baseline justify-between">
              <p className="text-[10px] uppercase tracking-[0.22em] text-[var(--app-gold-soft)]">
                Your progress
              </p>
              <p className="text-[12px] text-[var(--app-dim)]">
                {program.completedCount} of {TOTAL_WEEKS} done
              </p>
            </div>
            <div className="mt-2.5 h-[3px] overflow-hidden rounded-full bg-[rgba(212,175,55,0.15)]">
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
    </div>
  );
}
