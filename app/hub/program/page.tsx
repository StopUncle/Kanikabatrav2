import Link from "next/link";
import { requireServerAuth } from "@/lib/auth/server-auth";
import { prisma } from "@/lib/prisma";
import { readProgram } from "@/lib/program/read";
import { TOTAL_WEEKS } from "@/lib/program/curriculum";
import { isGauntletWeek, arcOf } from "@/lib/program/ai/arcs";
import { getEnrollment } from "@/lib/program/ai/state";
import WeekCard from "@/components/program/WeekCard";
import ThresholdJournal from "@/components/program/ThresholdJournal";
import { trainingGate } from "@/lib/access/guard";
import { EmptyState, PageHeader, PageShell } from "@/components/app-shell/ui";

export const metadata = {
  title: "The Twelve | Consilium",
};

/**
 * The Twelve: the program spine.
 *
 * Two layers on one page. The delivery layer (weeks, lessons, reading,
 * time drip) is unchanged from the original build. The AI layer sits on
 * top for enrolled members: the Read, the Threshold on the actionable
 * week, the journal and her replies. A member who has not done the intake
 * sees the door to it; everything else about their program still works.
 */
export default async function ProgramPage() {
  const userId = await requireServerAuth("/app/program");
  // Training-tier surface (Pact or Consilium). The shell no longer gates for us (A2), and this
  // page reads its data straight from Prisma, so the gate has to be here
  // and above the queries.
  const gate = await trainingGate(userId, {
    trigger: "locked-nav",
    surfaceLabel: "The Twelve",
  });
  if (gate) return gate;

  const [program, enrollment, entries] = await Promise.all([
    readProgram(prisma, userId),
    getEnrollment(prisma, userId),
    prisma.journalEntry.findMany({
      where: { userId },
      select: {
        weekNumber: true,
        body: true,
        reply: true,
        replyDueAt: true,
        flagged: true,
      },
    }),
  ]);
  const entryBy = new Map(entries.map((e) => [e.weekNumber, e]));

  return (
    <PageShell>
      <PageHeader
        title="The Twelve"
        lede="Three arcs. Nine weeks that build, three that test. Read it, watch it, then go and do the thing, and write down what it cost."
      />

      {!program.enrolled ? (
        <EmptyState line="The program opens with your membership." />
      ) : program.weeks.length === 0 ? (
        <EmptyState
          line="Week one lands shortly."
          hint="You will get a notification the moment it opens."
        />
      ) : !enrollment ? (
        <>
          {/* The door to the intake. The program works without it, but the
              Read is what makes the twelve weeks theirs. */}
          <Link
            href="/app/program/intake"
            className="mb-5 block rounded-2xl border border-[var(--app-gold-soft)] bg-[var(--app-card)] px-4 py-5"
          >
            <p className="text-app-eyebrow uppercase tracking-app-label text-[var(--app-gold)]">
              Start with the Read
            </p>
            <p className="mt-2 text-app-body leading-relaxed text-[var(--app-text)]">
              Four questions about the situation you keep losing. She reads
              them once and writes you a letter: the pattern she sees, and
              your twelve weeks in the order that fits it. Then every week is
              worded for your life, not the general case.
            </p>
            <p className="mt-3 text-app-caption uppercase tracking-app-wide text-[var(--app-gold)]">
              Begin &rarr;
            </p>
          </Link>
          <WeeksList program={program} entryBy={entryBy} aiActive={false} />
        </>
      ) : (
        <>
          {enrollment.readLetter && (
            <details className="mb-5 rounded-2xl border border-[var(--app-line)] bg-[var(--app-card)] px-4 py-4">
              <summary className="cursor-pointer list-none text-app-eyebrow uppercase tracking-app-label text-[var(--app-gold-soft)]">
                Your Read
              </summary>
              <div
                className="mt-3 whitespace-pre-wrap text-app-lead font-light leading-relaxed text-[var(--app-text)]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {enrollment.readLetter}
              </div>
              <p className="mt-3 text-right text-app-body text-[var(--app-gold-soft)]">
                — Kanika
              </p>
            </details>
          )}
          <WeeksList program={program} entryBy={entryBy} aiActive />
        </>
      )}
    </PageShell>
  );
}

function WeeksList({
  program,
  entryBy,
  aiActive,
}: {
  program: Awaited<ReturnType<typeof readProgram>>;
  entryBy: Map<
    number,
    {
      weekNumber: number;
      body: string;
      reply: string | null;
      replyDueAt: Date;
      flagged: boolean;
    }
  >;
  aiActive: boolean;
}) {
  return (
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
        {program.weeks.map((w) => {
          const entry = entryBy.get(w.weekNumber) ?? null;
          const actionable = program.actionable?.weekNumber === w.weekNumber;
          const gauntlet = isGauntletWeek(w.weekNumber);
          return (
            <div key={w.weekNumber}>
              {/* Arc breaks: the shape of the thing, visible in the list. */}
              {aiActive && w.weekNumber % 4 === 1 && (
                <p className="mb-2 mt-3 text-app-tiny uppercase tracking-app-label text-[var(--app-dim)] first:mt-0">
                  Arc {arcOf(w.weekNumber)}
                </p>
              )}
              {aiActive && gauntlet && w.state !== "locked" && (
                <p className="mb-1.5 text-app-tiny uppercase tracking-app-wide text-[var(--app-rose)]">
                  Gauntlet week: no new behaviour, all three at once
                </p>
              )}
              <WeekCard week={w} defaultOpen={actionable && !aiActive} />
              {/* The AI surface for the working week, and the record for
                  the weeks already written. */}
              {aiActive && w.state === "open" && (actionable || entry) && (
                <ThresholdJournal
                  weekNumber={w.weekNumber}
                  initialEntry={
                    entry
                      ? {
                          body: entry.body,
                          reply: entry.reply,
                          replyDueAt: entry.replyDueAt.toISOString(),
                          flagged: entry.flagged,
                        }
                      : null
                  }
                />
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}
