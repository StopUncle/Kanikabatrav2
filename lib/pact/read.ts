import type { Pact, PactEntry, PactWeek } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { PACT_CYCLE_WEEKS } from "@/lib/pact/presets";

/**
 * The Pact's weekly drip, derived rather than stored, same shape as
 * lib/program/read.ts: week n runs from startedAt + (n-1)*7d to
 * startedAt + n*7d, so there are no unlock rows to backfill and nothing
 * that can drift. The only stored artefact is the PactEntry row per open
 * week, which exists so the journal has somewhere to live and so the
 * resolve pass can find overdue weeks by index.
 *
 * The anchor is startedAt, NOT signedAt: signing is the ceremony,
 * activation is the commitment's first day. A pact with startedAt null
 * has no current week, no entries, no scars, and no pushes; the week
 * screen offers the Activate button instead.
 */

const WEEK_MS = 7 * 24 * 60 * 60 * 1000;

/** A pact whose weekly clock is running. */
type StartedPact = { startedAt: Date };

export function currentWeekFor(
  pact: StartedPact,
  now = new Date(),
): number {
  return Math.floor((now.getTime() - pact.startedAt.getTime()) / WEEK_MS) + 1;
}

export function weekEndsAt(pact: StartedPact, weekNumber: number): Date {
  return new Date(pact.startedAt.getTime() + weekNumber * WEEK_MS);
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
 * "Asked something" is judged against the member's own deadline: the
 * slot must have been published BEFORE that entry's weekEndsAt, i.e.
 * the challenge was on their screen during the week being marked.
 * Publishing a slot months later can therefore never scar the cohorts
 * who lived through it unwritten.
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
      weekEndsAt: true,
      pact: { select: { preset: true } },
    },
  });
  if (overdue.length === 0) return 0;

  const published = await prisma.pactWeek.findMany({
    where: { isPublished: true, publishedAt: { not: null } },
    select: { preset: true, cycleWeek: true, publishedAt: true },
  });
  const publishedAtFor = new Map(
    published.map((w) => [`${w.preset}:${w.cycleWeek}`, w.publishedAt as Date]),
  );

  const ids = overdue
    .filter((e) => {
      const liveSince = publishedAtFor.get(
        `${e.pact.preset}:${cycleWeekFor(e.weekNumber)}`,
      );
      return liveSince !== undefined && liveSince < e.weekEndsAt;
    })
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
  /**
   * Signed but not yet activated: the clock has not started. The week
   * screen shows the Activate button; `challenge` carries the week-one
   * preview so the member can see what they are starting.
   */
  awaitingActivation: boolean;
  /** 1-based week of the live pact. 0 when there is no running clock. */
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
 *
 * `entitled` mirrors the cron's dormant-billing rule: a lapsed or
 * suspended member gets a read-only view (their record, their derived
 * week number) with NEITHER lazy write. Without this, a lapsed member
 * opening the hub minted fresh entries and scarred weeks the entry and
 * keep routes 403'd them out of writing. Defaults to true so the gated
 * write paths (which already verified entitlement) stay unchanged.
 */
export async function readPact(
  userId: string,
  opts: { entitled?: boolean } = {},
): Promise<PactRead> {
  const entitled = opts.entitled ?? true;
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
      awaitingActivation: false,
      weekNumber: 0,
      weekEndsAt: null,
      challenge: null,
      entry: null,
      entries: [],
    };
  }

  // Signed, not activated: no clock, no entries, no scars. The week-one
  // challenge rides along as a preview for the activation screen.
  if (!pact.startedAt) {
    const preview = await prisma.pactWeek.findUnique({
      where: {
        preset_cycleWeek: { preset: pact.preset, cycleWeek: cycleWeekFor(1) },
      },
    });
    return {
      pact,
      pastPacts,
      awaitingActivation: true,
      weekNumber: 0,
      weekEndsAt: null,
      challenge: preview?.isPublished ? preview : null,
      entry: null,
      entries: [],
    };
  }

  const now = new Date();
  const started = { startedAt: pact.startedAt };
  const weekNumber = currentWeekFor(started, now);
  const endsAt = weekEndsAt(started, weekNumber);

  // A clock that has not reached week one (future startedAt, only
  // reachable via manual data) must not mint week-zero rows:
  // cycleWeekFor(0) is 0 under JS remainder and matches nothing.
  if (weekNumber < 1) {
    const entries = await prisma.pactEntry.findMany({
      where: { pactId: pact.id },
      orderBy: { weekNumber: "asc" },
    });
    return {
      pact,
      pastPacts,
      awaitingActivation: false,
      weekNumber: 0,
      weekEndsAt: null,
      challenge: null,
      entry: null,
      entries,
    };
  }

  if (entitled) {
    // Lazy scar: any week that ended while still open is a broken
    // promise, whether or not the cron has said so yet. Content-aware:
    // a week with no published challenge cannot scar (see
    // scarOverdueEntries).
    await scarOverdueEntries(pact.id, now);

    // Lazy open: the current week's row, if the cron has not created it.
    await prisma.pactEntry.upsert({
      where: { pactId_weekNumber: { pactId: pact.id, weekNumber } },
      create: {
        pactId: pact.id,
        userId,
        weekNumber,
        weekEndsAt: endsAt,
      },
      update: {},
    });
  }

  const [entry, entries, challenge] = await Promise.all([
    prisma.pactEntry.findUnique({
      where: { pactId_weekNumber: { pactId: pact.id, weekNumber } },
    }),
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
    awaitingActivation: false,
    weekNumber,
    weekEndsAt: endsAt,
    challenge: challenge?.isPublished ? challenge : null,
    entry,
    entries,
  };
}
