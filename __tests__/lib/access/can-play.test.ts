import { canPlay } from "@/lib/simulator/access";
import type { Access } from "@/lib/access/tier";

const free: Access = {
  tier: "free", userId: "u", isMember: false, isBanned: false,
  status: null, membership: null, reason: null,
};
const member: Access = { ...free, tier: "member", isMember: true };

describe("canPlay", () => {
  it("free account may play a tier:free catalog scenario", () => {
    expect(canPlay({ id: "b1-first-win", tier: "free" }, free)).toBe(true);
  });
  it("free account may NOT play a tier:premium catalog scenario", () => {
    expect(canPlay({ id: "after-her-1-1", tier: "premium" }, free)).toBe(false);
  });
  it("member may play premium", () => {
    expect(canPlay({ id: "after-her-1-1", tier: "premium" }, member)).toBe(true);
  });
  it("free account may NOT play a generated scenario despite tier:free", () => {
    expect(canPlay({ id: "gen-not-in-catalog", tier: "free" }, free)).toBe(false);
  });
});
