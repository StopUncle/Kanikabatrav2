import fs from "fs";
import path from "path";

/**
 * The Room rail, and the landmine underneath it.
 *
 * `lib/simulator/leaderboard.ts` exports two boards that look
 * interchangeable at a call site and are not. `getLeaderboard` merges
 * FORTY INVENTED PEOPLE into the real rows (`MOCK_LEADERBOARD` at :104-145
 * — "VioletAxis", "Mistress Quiet", "Initiate #084", ids prefixed "mock-",
 * merged at :283). `getStandingBoard` has none.
 *
 * Home now says "N training this week" and shows members by name. Sourcing
 * that from the wrong function would put fabricated people on the front
 * page of a product we charge for, and nothing about the call site would
 * look wrong. So the constraint lives here rather than in a comment
 * somebody can delete without noticing what it was holding.
 */

const ROOM = path.join(process.cwd(), "lib/app/room.ts");
const raw = fs.readFileSync(ROOM, "utf8");

/**
 * Comments stripped before asserting. The file's own doc block names
 * `getLeaderboard` and `MOCK_LEADERBOARD` in order to explain why they must
 * never be used, and that explanation is worth more than a simpler
 * assertion: the next person to touch this file needs to know what the
 * rule is protecting, not just that a rule exists.
 */
const source = raw.replace(/\/\*[\s\S]*?\*\/|\/\/[^\n]*/g, "");

describe("the Room never reads the mocked board", () => {
  it("does not import from the simulator leaderboard at all", () => {
    // The blunt version on purpose. Not "does not call getLeaderboard":
    // no import means no way to reach the mocks by any name.
    expect(source).not.toContain("simulator/leaderboard");
    expect(source).not.toContain("getLeaderboard");
    expect(source).not.toContain("MOCK_LEADERBOARD");
  });

  it("queries users directly rather than borrowing a board", () => {
    // getStandingBoard is mock-free but scans 500 rows and runs a
    // standingEvent groupBy for week-movement that a rail does not use.
    expect(source).not.toContain("getStandingBoard");
    expect(source).toContain("prisma.user");
  });
});

describe("who counts as being in the room", () => {
  it("excludes bots and admins from both reads", () => {
    // Same exclusions the Standing board applies (leaderboard.ts:333-336).
    // Kanika is not a peer and a training bot is not a person.
    expect(source).toContain("isBot: false");
    expect(source).toContain('role: { not: "ADMIN"');
  });

  it("shows only named members, and counts everyone", () => {
    // memberSafeName falls back to the literal string "Member", so an
    // unfiltered list reads "Member, Member, Member" and makes a full
    // room look empty. Named people are SHOWN; everybody is COUNTED.
    expect(source).toContain("displayName: { not: null }");
    // The count must NOT carry that filter.
    const countBlock = source.slice(
      source.indexOf("prisma.user.count"),
      source.indexOf("prisma.user.findMany"),
    );
    expect(countBlock.length).toBeGreaterThan(0);
    expect(countBlock).not.toContain("displayName");
  });

  it("still routes names through the masker", () => {
    // Belt and braces: displayName is guaranteed non-null by the filter,
    // but the rule "never emit a real name" should hold at every exit.
    expect(source).toContain("memberSafeName");
    expect(source).not.toMatch(/name:\s*u\.name\b/);
  });
});

describe("cost", () => {
  it("is cached, because it is the same for every viewer", () => {
    // `standing` carries no index (only isBot and lastSeenAt do), so the
    // ordering is a scan. Viewer-independent means one scan per window
    // rather than one per visitor.
    expect(source).toContain("unstable_cache");
    expect(source).toMatch(/revalidate/);
  });

  it("runs its two reads in parallel", () => {
    expect(source).toContain("Promise.all");
  });

  it("bounds the number of faces it asks for", () => {
    expect(source).toMatch(/take:\s*FACES/);
  });
});
