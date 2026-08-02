import { sendPushToUser } from "./index";

/**
 * The rank-up push.
 *
 * Fired from grantStanding, the one writer for Standing, so every surface
 * that can promote someone (a scenario, a Tell, a Receipt, a Path chapter,
 * an answered question) gets it without having to remember.
 *
 * Deliberately fire-and-forget: crossing a threshold happens on the way
 * back from something the member is already doing, and a slow push service
 * must never hold up that response.
 */
export function notifyRankUp(
  userId: string,
  rank: { toLevel: number; ringName: string },
): void {
  void sendPushToUser(userId, "rankUp", {
    title: `You made ${rank.ringName}`,
    body: "New rank. Come and see what opened.",
    url: "/consilium/profile",
    tag: `rank-up-${rank.toLevel}`,
  }).catch(() => {
    /* best effort, never surfaces to the member */
  });
}
