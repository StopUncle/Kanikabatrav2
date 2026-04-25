/**
 * @jest-environment node
 */

jest.mock("@/lib/prisma", () => {
  return {
    prisma: {
      feedPost: { findUnique: jest.fn() },
      botAction: { createMany: jest.fn(), findMany: jest.fn() },
      user: { findMany: jest.fn() },
    },
  };
});

jest.mock("@/lib/bots/settings", () => ({
  getBotSettings: jest.fn().mockResolvedValue({ enabled: true, dryRun: true }),
}));

jest.mock("@/lib/logger", () => ({
  logger: { warn: jest.fn(), info: jest.fn(), error: jest.fn() },
}));

import { scheduleBotActions } from "@/lib/bots/scheduler";
import { prisma } from "@/lib/prisma";
import { getBotSettings } from "@/lib/bots/settings";
import { BOT_PERSONAS } from "@/lib/bots/personas";

const post = {
  id: "post-1",
  title: "Today's Dark Insight",
  content: "x",
  type: "AUTOMATED",
  isPinned: false,
  createdAt: new Date("2026-04-25T10:00:00Z"),
};

const allBotUsers = BOT_PERSONAS.map((p, i) => ({
  id: `bot-${i}`,
  email: `${p.slug}-bot@consilium.local`,
}));

describe("scheduleBotActions", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (getBotSettings as jest.Mock).mockResolvedValue({ enabled: true, dryRun: true });
    (prisma.feedPost.findUnique as jest.Mock).mockResolvedValue(post);
    (prisma.user.findMany as jest.Mock).mockResolvedValue(allBotUsers);
    (prisma.botAction.findMany as jest.Mock).mockResolvedValue([]);
    (prisma.botAction.createMany as jest.Mock).mockResolvedValue({ count: 0 });
  });

  it("schedules within the per-type ranges and inserts the right shape", async () => {
    const r = await scheduleBotActions("post-1");
    expect(r.commentsScheduled).toBeGreaterThanOrEqual(3);
    expect(r.commentsScheduled).toBeLessThanOrEqual(5);
    expect(r.likesScheduled).toBeGreaterThanOrEqual(10);
    expect(r.likesScheduled).toBeLessThanOrEqual(18);
    expect(prisma.botAction.createMany).toHaveBeenCalledTimes(1);
    const arg = (prisma.botAction.createMany as jest.Mock).mock.calls[0][0];
    expect(arg.data).toHaveLength(r.commentsScheduled + r.likesScheduled);
    for (const row of arg.data) {
      expect(["COMMENT", "LIKE"]).toContain(row.type);
      expect(row.botId).toBeDefined();
      expect(row.postId).toBe("post-1");
      expect(row.scheduledAt).toBeInstanceOf(Date);
    }
  });

  it("no-ops when settings.enabled is false", async () => {
    (getBotSettings as jest.Mock).mockResolvedValueOnce({ enabled: false, dryRun: false });
    const r = await scheduleBotActions("post-1");
    expect(r.commentsScheduled).toBe(0);
    expect(r.likesScheduled).toBe(0);
    expect(r.reason).toBe("disabled");
    expect(prisma.botAction.createMany).not.toHaveBeenCalled();
  });

  it("returns zero when post does not exist", async () => {
    (prisma.feedPost.findUnique as jest.Mock).mockResolvedValueOnce(null);
    const r = await scheduleBotActions("nonexistent");
    expect(r.commentsScheduled).toBe(0);
    expect(r.reason).toBe("no-post");
  });

  it("returns zero when no bot users exist in DB", async () => {
    (prisma.user.findMany as jest.Mock).mockResolvedValueOnce([]);
    const r = await scheduleBotActions("post-1");
    expect(r.commentsScheduled).toBe(0);
    expect(r.reason).toBe("no-bots");
  });

  it("is idempotent — second call on same post returns 0", async () => {
    (prisma.botAction.findMany as jest.Mock).mockResolvedValueOnce([{ id: "existing" }]);
    const r = await scheduleBotActions("post-1");
    expect(r.commentsScheduled).toBe(0);
    expect(r.reason).toBe("already-scheduled");
    expect(prisma.botAction.createMany).not.toHaveBeenCalled();
  });
});
