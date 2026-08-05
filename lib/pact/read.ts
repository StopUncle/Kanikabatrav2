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

/**
 * Scar overdue open weeks, but only weeks that actually asked something.
 * A week whose challenge slot had no published PactWeek content cannot
 * be failed: the member's screen only ever showed a placeholder, and a
 * permanent scar for our own missing content would be the product lying
 * about them. Those weeks stay open and consequence-free.
 *
 * Caveat, deliberate: publishing a slot's content AFTER a cohort's week
 * already lapsed makes those stale open entries scar on the next pass.
 * Seed each preset's content before its first cohort reaches that week.
 *
 * Shared by the daily cron (all pacts) and the lazy read (one pact), so
 * the two paths can never disagree about what a scar means.
 */
export async function scarOverdueEntries(
  pactId: string | null,
  now = new Date(),
): Promise<number> {
  const overdue = await prisma.pactEntry.findMany({
    where: {
      ...(pactId ? { pactId } : {}),
      status: "open",
      weekEndsAt: { lt: now },
    },
    select: {
      id: true,
      weekNumber: true,
      pact: { select: { preset: true } },
    },
  });
  if (overdue.length === 0) return 0;

  const published = await prisma.pactWeek.findMany({
    where: { isPublished: true },
    select: { preset: true, cycleWeek: true },
  });
  const hasContent = new Set(
    published.map((w) => `${w.preset}:${w.cycleWeek}`),
  );

  const ids = overdue
    .filter((e) =>
      hasContent.has(`${e.pact.preset}:${cycleWeekFor(e.weekNumber)}`),
    )
    .map((e) => e.id);
  if (ids.length === 0) return 0;

  // Status re-checked in the write so a concurrent keep wins cleanly.
  const res = await prisma.pactEntry.updateMany({
    where: { id: { in: ids }, status: "open" },
    data: { status: "scarred" },
  });
  return res.count;
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
  // whether or not the cron has said so yet. Content-aware: a week with
  // no published challenge cannot scar (see scarOverdueEntries).
  await scarOverdueEntries(pact.id, now);

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
