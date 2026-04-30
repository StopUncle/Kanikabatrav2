/**
 * Server-side Web Push delivery helper.
 *
 * Wraps the web-push library with:
 *   - VAPID key bootstrap from env
 *   - Per-user fan-out (a member can have multiple devices)
 *   - Automatic pruning of expired endpoints (404/410 from the
 *     push service means the subscription is gone — delete the row)
 *   - Notification-category preference gate so members can opt out
 *     per-category without revoking the whole subscription
 *
 * Public API:
 *   sendPushToUser(userId, category, payload)   — fire-and-forget
 *   sendPushToUsers(userIds, category, payload) — same, batch
 *
 * Categories: "questionAnswered" | "voiceNote" | "forumReply" |
 *             "mention" | "broadcast"
 *
 * The web-push library uses fetch under the hood and works fine on
 * Vercel/Railway/any modern Node 18+ runtime. No native deps.
 */

import webpush from "web-push";
import { prisma } from "@/lib/prisma";

export type PushCategory =
  | "questionAnswered"
  | "voiceNote"
  | "forumReply"
  | "mention"
  | "broadcast";

export interface PushPayload {
  title: string;
  body: string;
  /** Path to navigate to when tapped. Defaults to /consilium/feed. */
  url?: string;
  /** Optional small icon (defaults to /images/kanikarose-logo.png). */
  icon?: string;
  /**
   * Optional tag — notifications with the same tag replace each other
   * instead of stacking. Useful for "you have a new voice note"
   * collapsing to a single entry on the lock screen.
   */
  tag?: string;
  /** Keep notification on screen until tapped. Default false. */
  requireInteraction?: boolean;
}

/**
 * Default per-category opt-in. When a user has no pushPreferences
 * stored (i.e. the JSON column is null), we treat them as opted-in
 * to all categories shipping today. Members opt OUT explicitly via
 * the prefs UI; this matches the email pattern in the project.
 */
const DEFAULT_OPT_IN: Record<PushCategory, boolean> = {
  questionAnswered: true,
  voiceNote: true,
  forumReply: true,
  mention: true,
  broadcast: false, // Broadcast pushes are admin-initiated; default off.
};

let configured = false;

function configureVapid(): boolean {
  if (configured) return true;
  const publicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
  const privateKey = process.env.VAPID_PRIVATE_KEY;
  const subject = process.env.VAPID_SUBJECT || "mailto:hello@kanikarose.com";
  if (!publicKey || !privateKey) {
    // eslint-disable-next-line no-console
    console.warn("[push] VAPID keys missing — push delivery disabled");
    return false;
  }
  webpush.setVapidDetails(subject, publicKey, privateKey);
  configured = true;
  return true;
}

function userIsOptedIn(
  prefs: unknown,
  category: PushCategory,
): boolean {
  if (!prefs || typeof prefs !== "object") {
    return DEFAULT_OPT_IN[category];
  }
  const obj = prefs as Record<string, unknown>;
  if (category in obj) {
    return Boolean(obj[category]);
  }
  return DEFAULT_OPT_IN[category];
}

/**
 * Send a push notification to one user, across all their device
 * subscriptions, respecting their per-category preference. Returns
 * the number of successful deliveries.
 *
 * Failures are logged but do not throw — push is best-effort. A
 * permanent failure (404/410) deletes the offending subscription.
 */
export async function sendPushToUser(
  userId: string,
  category: PushCategory,
  payload: PushPayload,
): Promise<number> {
  if (!configureVapid()) return 0;

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      pushPreferences: true,
      pushSubscriptions: {
        select: {
          id: true,
          endpoint: true,
          p256dh: true,
          auth: true,
        },
      },
    },
  });

  if (!user) return 0;
  if (!userIsOptedIn(user.pushPreferences, category)) return 0;
  if (user.pushSubscriptions.length === 0) return 0;

  const json = JSON.stringify({
    title: payload.title,
    body: payload.body,
    icon: payload.icon || "/images/kanikarose-logo.png",
    badge: payload.icon || "/images/kanikarose-logo.png",
    tag: payload.tag,
    requireInteraction: payload.requireInteraction ?? false,
    data: { url: payload.url || "/consilium/feed" },
  });

  let delivered = 0;
  const expiredIds: string[] = [];

  await Promise.all(
    user.pushSubscriptions.map(async (sub) => {
      try {
        await webpush.sendNotification(
          {
            endpoint: sub.endpoint,
            keys: { p256dh: sub.p256dh, auth: sub.auth },
          },
          json,
        );
        delivered += 1;
      } catch (err: unknown) {
        const status =
          typeof err === "object" && err !== null && "statusCode" in err
            ? (err as { statusCode: number }).statusCode
            : 0;
        if (status === 404 || status === 410) {
          // Subscription is permanently gone — prune.
          expiredIds.push(sub.id);
        } else {
          // eslint-disable-next-line no-console
          console.warn("[push] delivery failed", { userId, status, err });
        }
      }
    }),
  );

  if (expiredIds.length > 0) {
    await prisma.pushSubscription
      .deleteMany({ where: { id: { in: expiredIds } } })
      .catch(() => {
        /* non-fatal */
      });
  }

  // Bump lastUsedAt on the surviving subs (best-effort).
  if (delivered > 0) {
    await prisma.pushSubscription
      .updateMany({
        where: {
          userId,
          id: { notIn: expiredIds },
        },
        data: { lastUsedAt: new Date() },
      })
      .catch(() => {
        /* non-fatal */
      });
  }

  return delivered;
}

/**
 * Batch fan-out. Used by broadcast pushes (e.g. "Kanika just posted
 * a new voice note") where many members get the same payload. Runs
 * sendPushToUser for each, in parallel with a modest concurrency cap.
 */
export async function sendPushToUsers(
  userIds: string[],
  category: PushCategory,
  payload: PushPayload,
): Promise<{ attempted: number; delivered: number }> {
  if (!configureVapid()) return { attempted: 0, delivered: 0 };

  // Modest concurrency to avoid spiking the push service.
  const CONCURRENCY = 10;
  let delivered = 0;
  let i = 0;
  async function worker() {
    while (i < userIds.length) {
      const myIndex = i++;
      const userId = userIds[myIndex];
      delivered += await sendPushToUser(userId, category, payload);
    }
  }
  const workers: Promise<void>[] = [];
  for (let w = 0; w < CONCURRENCY; w++) workers.push(worker());
  await Promise.all(workers);

  return { attempted: userIds.length, delivered };
}
