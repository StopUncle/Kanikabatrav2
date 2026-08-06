/**
 * The pact drip is derived, not stored: week n runs from startedAt, and the
 * only stored rows are entries. That makes the derivation functions the
 * single place a clock bug can live, and readPact's branches the place a
 * signed-but-unactivated pact could leak entries or scars it must not have.
 *
 * The activation split (startedAt vs signedAt, 2026-08-05) is the risky
 * change these tests pin: an unactivated pact has NO current week, NO lazy
 * entry, NO scar pass, and its challenge is a preview only. Regressing any
 * of those silently scars people whose clock never started.
 */

jest.mock("@/lib/prisma", () => ({
  prisma: {
    pact: { findMany: jest.fn() },
    pactEntry: {
      findMany: jest.fn(),
      upsert: jest.fn(),
      updateMany: jest.fn(),
    },
    pactWeek: { findUnique: jest.fn(), findMany: jest.fn() },
  },
}));

import { prisma } from "@/lib/prisma";
import {
  currentWeekFor,
  weekEndsAt,
  cycleWeekFor,
  scarOverdueEntries,
  readPact,
} from "@/lib/pact/read";
import { PACT_CYCLE_WEEKS } from "@/lib/pact/presets";

/* eslint-disable @typescript-eslint/no-explicit-any */
const db = prisma as any;

const DAY_MS = 24 * 60 * 60 * 1000;
const T0 = new Date("2026-08-01T00:00:00Z");

function daysAfter(n: number): Date {
  return new Date(T0.getTime() + n * DAY_MS);
}

beforeEach(() => {
  jest.clearAllMocks();
  db.pact.findMany.mockResolvedValue([]);
  db.pactEntry.findMany.mockResolvedValue([]);
  db.pactEntry.upsert.mockResolvedValue({ id: "entry_1" });
  db.pactEntry.updateMany.mockResolvedValue({ count: 0 });
  db.pactWeek.findUnique.mockResolvedValue(null);
  db.pactWeek.findMany.mockResolvedValue([]);
});

describe("the derived clock", () => {
  it("is week 1 from the first instant through day six", () => {
    expect(currentWeekFor({ startedAt: T0 }, T0)).toBe(1);
    expect(
      currentWeekFor({ startedAt: T0 }, new Date(daysAfter(7).getTime() - 1)),
    ).toBe(1);
  });

  it("rolls to week 2 exactly at the seven-day mark", () => {
    expect(currentWeekFor({ startedAt: T0 }, daysAfter(7))).toBe(2);
  });

  it("ends week n exactly n weeks after the start", () => {
    expect(weekEndsAt({ startedAt: T0 }, 1)).toEqual(daysAfter(7));
    expect(weekEndsAt({ startedAt: T0 }, 12)).toEqual(daysAfter(84));
  });

  it("maps calendar weeks onto authored slots, cycling after the last", () => {
    expect(cycleWeekFor(1)).toBe(1);
    expect(cycleWeekFor(PACT_CYCLE_WEEKS)).toBe(PACT_CYCLE_WEEKS);
    expect(cycleWeekFor(PACT_CYCLE_WEEKS + 1)).toBe(1);
    expect(cycleWeekFor(2 * PACT_CYCLE_WEEKS)).toBe(PACT_CYCLE_WEEKS);
  });
});

describe("scarOverdueEntries", () => {
  it("does nothing when no open week has lapsed", async () => {
    db.pactEntry.findMany.mockResolvedValue([]);

    expect(await scarOverdueEntries("pact_1", T0)).toBe(0);
    expect(db.pactEntry.updateMany).not.toHaveBeenCalled();
  });

  it("scars a lapsed week whose challenge was published", async () => {
    db.pactEntry.findMany.mockResolvedValue([
      { id: "e1", weekNumber: 1, pact: { preset: "confidence" } },
    ]);
    db.pactWeek.findMany.mockResolvedValue([
      { preset: "confidence", cycleWeek: 1 },
    ]);
    db.pactEntry.updateMany.mockResolvedValue({ count: 1 });

    expect(await scarOverdueEntries("pact_1", T0)).toBe(1);
    expect(db.pactEntry.updateMany).toHaveBeenCalledWith({
      // The status recheck is what lets a concurrent keep win.
      where: { id: { in: ["e1"] }, status: "open" },
      data: { status: "scarred" },
    });
  });

  it("cannot scar a week whose challenge was never published", async () => {
    db.pactEntry.findMany.mockResolvedValue([
      { id: "e1", weekNumber: 1, pact: { preset: "confidence" } },
    ]);
    db.pactWeek.findMany.mockResolvedValue([
      // Content exists for a different preset only.
      { preset: "relationships", cycleWeek: 1 },
    ]);

    expect(await scarOverdueEntries("pact_1", T0)).toBe(0);
    expect(db.pactEntry.updateMany).not.toHaveBeenCalled();
  });
});

describe("readPact", () => {
  it("returns the empty shape when nothing was ever signed", async () => {
    const read = await readPact("user_1");

    expect(read.pact).toBeNull();
    expect(read.awaitingActivation).toBe(false);
    expect(read.weekNumber).toBe(0);
    expect(db.pactEntry.upsert).not.toHaveBeenCalled();
  });

  it("separates the live pact from the scarred past ones", async () => {
    const broken = { id: "old", number: 1, brokenAt: daysAfter(-30) };
    const live = {
      id: "new",
      number: 2,
      brokenAt: null,
      startedAt: T0,
      preset: "confidence",
    };
    db.pact.findMany.mockResolvedValue([live, broken]);

    const read = await readPact("user_1");

    expect(read.pact?.id).toBe("new");
    expect(read.pastPacts.map((p) => p.id)).toEqual(["old"]);
  });

  describe("signed but not activated", () => {
    const unactivated = {
      id: "pact_1",
      number: 1,
      brokenAt: null,
      startedAt: null,
      preset: "confidence",
    };

    it("has no clock, no entry, no scar pass", async () => {
      db.pact.findMany.mockResolvedValue([unactivated]);

      const read = await readPact("user_1");

      expect(read.awaitingActivation).toBe(true);
      expect(read.weekNumber).toBe(0);
      expect(read.weekEndsAt).toBeNull();
      expect(read.entry).toBeNull();
      expect(read.entries).toEqual([]);
      // The load-bearing absences: activation must not mint an entry the
      // cron would later scar, and must not run the scar pass at all.
      expect(db.pactEntry.upsert).not.toHaveBeenCalled();
      expect(db.pactEntry.updateMany).not.toHaveBeenCalled();
      expect(db.pactEntry.findMany).not.toHaveBeenCalled();
    });

    it("previews week one only when its challenge is published", async () => {
      db.pact.findMany.mockResolvedValue([unactivated]);
      db.pactWeek.findUnique.mockResolvedValue({
        id: "week_1",
        isPublished: true,
      });

      expect((await readPact("user_1")).challenge?.id).toBe("week_1");

      db.pactWeek.findUnique.mockResolvedValue({
        id: "week_1",
        isPublished: false,
      });

      expect((await readPact("user_1")).challenge).toBeNull();
    });
  });

  describe("activated", () => {
    it("derives the week from startedAt and lazily opens its entry", async () => {
      const startedAt = new Date(Date.now() - 8 * DAY_MS);
      db.pact.findMany.mockResolvedValue([
        {
          id: "pact_1",
          number: 1,
          brokenAt: null,
          startedAt,
          preset: "confidence",
        },
      ]);

      const read = await readPact("user_1");

      expect(read.awaitingActivation).toBe(false);
      expect(read.weekNumber).toBe(2);
      expect(read.weekEndsAt).toEqual(weekEndsAt({ startedAt }, 2));
      expect(db.pactEntry.upsert).toHaveBeenCalledWith(
        expect.objectContaining({
          where: {
            pactId_weekNumber: { pactId: "pact_1", weekNumber: 2 },
          },
          create: expect.objectContaining({
            weekNumber: 2,
            weekEndsAt: weekEndsAt({ startedAt }, 2),
          }),
          // A pre-existing row must never be touched by the lazy open.
          update: {},
        }),
      );
    });

    it("withholds an unpublished challenge from the runner", async () => {
      db.pact.findMany.mockResolvedValue([
        {
          id: "pact_1",
          number: 1,
          brokenAt: null,
          startedAt: new Date(Date.now() - DAY_MS),
          preset: "confidence",
        },
      ]);
      db.pactWeek.findUnique.mockResolvedValue({
        id: "week_1",
        isPublished: false,
      });

      expect((await readPact("user_1")).challenge).toBeNull();
    });
  });
});
