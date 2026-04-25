import {
  pickCommentCount,
  pickLikeCount,
  drawCommentSchedule,
  selectBotsWeighted,
  type SeedRng,
} from "@/lib/bots/scheduling";
import { BOT_PERSONAS, type PostTypeAffinity } from "@/lib/bots/personas";

function makeRng(seed: number): SeedRng {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

describe("pickCommentCount", () => {
  const cases: Array<[PostTypeAffinity, number, number]> = [
    ["AUTOMATED", 3, 5],
    ["ANNOUNCEMENT", 5, 9],
    ["DISCUSSION_PROMPT", 7, 12],
    ["VOICE_NOTE", 6, 10],
    ["VIDEO", 6, 10],
  ];
  it.each(cases)("returns within range for %s", (type, lo, hi) => {
    const rng = makeRng(42);
    for (let i = 0; i < 50; i++) {
      const n = pickCommentCount(type, false, rng);
      expect(n).toBeGreaterThanOrEqual(lo);
      expect(n).toBeLessThanOrEqual(hi);
    }
  });

  it("uses pinned-range for pinned ANNOUNCEMENT", () => {
    const rng = makeRng(7);
    for (let i = 0; i < 50; i++) {
      const n = pickCommentCount("ANNOUNCEMENT", true, rng);
      expect(n).toBeGreaterThanOrEqual(2);
      expect(n).toBeLessThanOrEqual(4);
    }
  });
});

describe("pickLikeCount", () => {
  it("returns between 12 and 20 for ANNOUNCEMENT", () => {
    const rng = makeRng(11);
    for (let i = 0; i < 50; i++) {
      const n = pickLikeCount("ANNOUNCEMENT", false, rng);
      expect(n).toBeGreaterThanOrEqual(12);
      expect(n).toBeLessThanOrEqual(20);
    }
  });
});

describe("drawCommentSchedule", () => {
  const postCreatedAt = new Date("2026-04-25T10:00:00Z");

  it("returns N timestamps", () => {
    const rng = makeRng(1);
    const ts = drawCommentSchedule(8, postCreatedAt, rng);
    expect(ts).toHaveLength(8);
    ts.forEach((t) => expect(t).toBeInstanceOf(Date));
  });

  it("places ~70% within first 90 min (statistical, large N)", () => {
    const rng = makeRng(2);
    const ts = drawCommentSchedule(1000, postCreatedAt, rng);
    const cutoff = postCreatedAt.getTime() + 90 * 60 * 1000;
    const inFirst = ts.filter((t) => t.getTime() <= cutoff).length;
    const ratio = inFirst / ts.length;
    expect(ratio).toBeGreaterThan(0.6);
    expect(ratio).toBeLessThan(0.8);
  });

  it("never schedules before postCreatedAt", () => {
    const rng = makeRng(3);
    const ts = drawCommentSchedule(50, postCreatedAt, rng);
    ts.forEach((t) =>
      expect(t.getTime()).toBeGreaterThanOrEqual(postCreatedAt.getTime()),
    );
  });

  it("never schedules more than 72h after postCreatedAt", () => {
    const rng = makeRng(4);
    const ts = drawCommentSchedule(50, postCreatedAt, rng);
    const max = postCreatedAt.getTime() + 72 * 60 * 60 * 1000;
    ts.forEach((t) => expect(t.getTime()).toBeLessThanOrEqual(max));
  });
});

describe("selectBotsWeighted", () => {
  it("returns N distinct bots", () => {
    const rng = makeRng(5);
    const picked = selectBotsWeighted(BOT_PERSONAS, "ANNOUNCEMENT", 8, [], rng);
    expect(picked).toHaveLength(8);
    expect(new Set(picked.map((p) => p.slug)).size).toBe(8);
  });

  it("excludes recently-active bots when alternatives exist (statistical)", () => {
    let overlapAcrossRuns = 0;
    const recent = ["damon", "marisol", "yuki", "ana", "kai"];
    for (let seed = 1; seed <= 30; seed++) {
      const rng = makeRng(seed);
      const picked = selectBotsWeighted(BOT_PERSONAS, "ANNOUNCEMENT", 5, recent, rng);
      overlapAcrossRuns += picked.filter((p) => recent.includes(p.slug)).length;
    }
    const avgOverlap = overlapAcrossRuns / 30;
    expect(avgOverlap).toBeLessThan(2.0);
  });

  it("returns up to pool size when N exceeds active pool", () => {
    const rng = makeRng(7);
    const tinyPool = BOT_PERSONAS.slice(0, 3);
    const picked = selectBotsWeighted(tinyPool, "ANNOUNCEMENT", 10, [], rng);
    expect(picked.length).toBe(3);
  });
});
