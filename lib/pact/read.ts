import type { Pact, PactEntry, PactWeek } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { PACT_CYCLE_WEEKS } from "@/lib/pact/presets";

/**
 * The Pact's weekly drip, derived rather than stored, same shape as
 * lib/program/read.ts: week n runs from signedAt + (n-1)*7d to
 * signedAt + n*7d, so there are no unlock rows to backfill and nothing
 * that can drift. The only stored artefact is the PactEntry row per open
 * week, which exists so the journal has somewhere to live and so the
 * resolve pass can find overdue weeks by index.
 */

const WEEK_MS = 7 * 24 * 60 * 60 * 1000;

export function currentWeekFor(
  pact: Pick<Pact, "signedAt">,
  now = new Date(),
): number {
  return Math.floor((now.getTime() - pact.signedAt.getTime()) / WEEK_MS) + 1;
}

export function weekEndsAt(
  pact: Pick<Pact, "signedAt">,
  weekNumber: number,
): Date {
  return new Date(pact.signedAt.getTime() + weekNumber * WEEK_MS);
}

/** Which authored challenge slot a calendar week maps to. Cycles ramp. */
export function cycleWeekFor(weekNumber: number): number {
  return ((weekNumber - 1) % PACT_CYCLE_WEEKS) + 1;
}

export interface PactRead {
  /** The live covenant. Null when none has ever been signed. */
  pact: Pact | null;
  /** Broken pacts, newest first. The scars survive on these. */
  pastPacts: Pact[];
  /** 1-based week of the live pact. 0 when there is no live pact. */
  weekNumber: number;
  weekEndsAt: Date | null;
  /** The published challenge for this week's slot, if it is written. */
  challenge: PactWeek | null;
  /** This week's entry row, created on first read if the cron is behind. */
  entry: PactEntry | null;
  /** Every entry of the live pact, ascending. The record. */
  entries: PactEntry[];
}

/**
 * Resolve everything the pact surfaces render from, with two lazy writes:
 * overdue open weeks get scarred, and the current week's entry row is
 * created if the daily cron has not run yet. Both are idempotent, so the
 * cron and this read can race without harm.
 */
export async function readPact(userId: string): Promise<PactRead> {
  const pacts = await prisma.pact.findMany({
    where: { userId },
    orderBy: { number: "desc" },
  });
  const pact = pacts.find((p) => p.brokenAt === null) ?? null;
  const pastPacts = pacts.filter((p) => p.brokenAt !== null);

  if (!pact) {
    return {
      pact: null,
      pastPacts,
      weekNumber: 0,
      weekEndsAt: null,
      challenge: null,
      entry: null,
      entries: [],
    };
  }

  const now = new Date();
  const weekNumber = currentWeekFor(pact, now);
  const endsAt = weekEndsAt(pact, weekNumber);

  // Lazy scar: any week that ended while still open is a broken promise,
  // whether or not the cron has said so yet. Guarded on status so a
  // concurrent keep or cron pass wins cleanly.
  await prisma.pactEntry.updateMany({
    where: { pactId: pact.id, status: "open", weekEndsAt: { lt: now } },
    data: { status: "scarred" },
  });

  // Lazy open: the current week's row, if the cron has not created it.
  const entry = await prisma.pactEntry.upsert({
    where: { pactId_weekNumber: { pactId: pact.id, weekNumber } },
    create: {
      pactId: pact.id,
      userId,
      weekNumber,
      weekEndsAt: endsAt,
    },
    update: {},
  });

  const [entries, challenge] = await Promise.all([
    prisma.pactEntry.findMany({
      where: { pactId: pact.id },
      orderBy: { weekNumber: "asc" },
    }),
    prisma.pactWeek.findUnique({
      where: {
        preset_cycleWeek: {
          preset: pact.preset,
          cycleWeek: cycleWeekFor(weekNumber),
        },
      },
    }),
  ]);

  return {
    pact,
    pastPacts,
    weekNumber,
    weekEndsAt: endsAt,
    challenge: challenge?.isPublished ? challenge : null,
    entry,
    entries,
  };
}
