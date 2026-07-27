import type { AnalyticsEvent, AnalyticsProperties } from "./events";

/**
 * Server-side PostHog capture.
 *
 * A direct POST to the capture endpoint rather than posthog-node, on
 * purpose. The Node SDK keeps a background flush timer and an in-process
 * queue, which is a real source of hung shutdowns and lost events in a
 * long-lived server; at this volume a single fetch per event is both
 * simpler and more predictable.
 *
 * Silent no-op when unconfigured, so local and dev environments never
 * emit anything and nobody has to remember to guard a call site. Failures
 * are swallowed: analytics must never take down the thing it measures.
 */

const HOST =
  process.env.NEXT_PUBLIC_POSTHOG_HOST?.replace(/\/$/, "") ||
  "https://us.i.posthog.com";

/**
 * Server key falls back to the public one. A PostHog project key is
 * write-only by design and is already in the client bundle, so there is
 * nothing to protect here; the separate var exists only for setups that
 * prefer to keep the two configurable apart.
 */
function apiKey(): string | null {
  return process.env.POSTHOG_KEY || process.env.NEXT_PUBLIC_POSTHOG_KEY || null;
}

export function analyticsEnabled(): boolean {
  return Boolean(apiKey());
}

/**
 * Record one event against a person.
 *
 * `distinctId` must match what the browser uses for the same human, or
 * the funnel splits in two. We use the User id everywhere, and the client
 * calls posthog.identify with the same id on login.
 */
export async function captureServer(
  distinctId: string,
  event: AnalyticsEvent,
  properties: AnalyticsProperties = {},
): Promise<void> {
  const key = apiKey();
  if (!key) return;

  try {
    await fetch(`${HOST}/i/v0/e/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        api_key: key,
        event,
        distinct_id: distinctId,
        properties: { ...properties, $lib: "kanikarose-server" },
        timestamp: new Date().toISOString(),
      }),
      // Never let a slow analytics host hold a member's request open.
      signal: AbortSignal.timeout(3000),
    });
  } catch {
    /* analytics is never worth an error path */
  }
}

/**
 * Fire and forget. The normal way to call this from a route handler:
 * the member is waiting on a response and an event is not worth a
 * millisecond of it.
 */
export function captureServerAsync(
  distinctId: string,
  event: AnalyticsEvent,
  properties: AnalyticsProperties = {},
): void {
  void captureServer(distinctId, event, properties);
}
