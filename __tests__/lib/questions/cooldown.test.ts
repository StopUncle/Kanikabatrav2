/**
 * @jest-environment node
 */

jest.mock("@/lib/prisma", () => ({
  prisma: {
    memberQuestion: { findMany: jest.fn() },
    memberQuestionSettings: { upsert: jest.fn() },
  },
}));

import { checkAskCooldown } from "@/lib/questions/cooldown";
import { clearQuestionSettingsCache } from "@/lib/questions/settings";
import { prisma } from "@/lib/prisma";

describe("checkAskCooldown", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    clearQuestionSettingsCache();
    (prisma.memberQuestionSettings.upsert as jest.Mock).mockResolvedValue({
      dailyCap: 1,
      maxLength: 500,
    });
  });

  it("allows when no recent submissions", async () => {
    (prisma.memberQuestion.findMany as jest.Mock).mockResolvedValue([]);
    const r = await checkAskCooldown("u1");
    expect(r.allowed).toBe(true);
    expect(r.remainingToday).toBe(1);
    expect(r.dailyCap).toBe(1);
    expect(r.nextAvailableAt).toBeUndefined();
  });

  it("blocks when cap=1 and one submission in last 24h", async () => {
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
    (prisma.memberQuestion.findMany as jest.Mock).mockResolvedValue([
      { createdAt: oneHourAgo },
    ]);
    const r = await checkAskCooldown("u1");
    expect(r.allowed).toBe(false);
    expect(r.remainingToday).toBe(0);
    expect(r.nextAvailableAt).toBeInstanceOf(Date);
    // 23h ahead of "now" (24h after the 1h-ago submission)
    const expectedMs = oneHourAgo.getTime() + 24 * 60 * 60 * 1000;
    expect(r.nextAvailableAt!.getTime()).toBe(expectedMs);
  });

  it("respects raised cap (cap=3, 2 submissions → still allowed)", async () => {
    (prisma.memberQuestionSettings.upsert as jest.Mock).mockResolvedValue({
      dailyCap: 3,
      maxLength: 500,
    });
    (prisma.memberQuestion.findMany as jest.Mock).mockResolvedValue([
      { createdAt: new Date(Date.now() - 60 * 60 * 1000) },
      { createdAt: new Date(Date.now() - 30 * 60 * 1000) },
    ]);
    const r = await checkAskCooldown("u1");
    expect(r.allowed).toBe(true);
    expect(r.remainingToday).toBe(1);
    expect(r.dailyCap).toBe(3);
  });

  it("uses OLDEST submission in window for nextAvailableAt", async () => {
    // cap=2, three subs but only the most recent two are in window
    (prisma.memberQuestionSettings.upsert as jest.Mock).mockResolvedValue({
      dailyCap: 2,
      maxLength: 500,
    });
    const tenHoursAgo = new Date(Date.now() - 10 * 60 * 60 * 1000);
    const twoHoursAgo = new Date(Date.now() - 2 * 60 * 60 * 1000);
    (prisma.memberQuestion.findMany as jest.Mock).mockResolvedValue([
      { createdAt: tenHoursAgo },
      { createdAt: twoHoursAgo },
    ]);
    const r = await checkAskCooldown("u1");
    expect(r.allowed).toBe(false);
    // nextAvailableAt = tenHoursAgo + 24h = 14h from now
    expect(r.nextAvailableAt!.getTime()).toBe(tenHoursAgo.getTime() + 24 * 60 * 60 * 1000);
  });

  it("queries only submissions inside the 24h window", async () => {
    (prisma.memberQuestion.findMany as jest.Mock).mockResolvedValue([]);
    await checkAskCooldown("u1");
    const callArg = (prisma.memberQuestion.findMany as jest.Mock).mock.calls[0][0];
    expect(callArg.where.userId).toBe("u1");
    expect(callArg.where.createdAt.gte).toBeInstanceOf(Date);
    const cutoff = callArg.where.createdAt.gte.getTime();
    // Should be within ~1s of (now - 24h)
    expect(Math.abs(cutoff - (Date.now() - 24 * 60 * 60 * 1000))).toBeLessThan(1000);
  });
});
