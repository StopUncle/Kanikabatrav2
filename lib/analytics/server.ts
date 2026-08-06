import { after } from "next/server";
import type { AnalyticsEvent, AnalyticsProperties } from "./events";

/**
 * Server-side PostHog capture.
 *
 * A direct POST keeps each event independent of an in-process queue.
 * Next.js after() keeps the request alive until the send settles without
 * delaying the response.
 *
 * Silent no-op when unconfigured, so local and dev environments never
 * emit anything and nobody has to remember to guard a call site. Failures
 * are swallowed: analytics must never take down the thing it measures.
 */

const HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST?.replace(/\/$/, "");

/**
 * Server key falls back to the public one. A PostHog project key is
 * write-only by design and is already in the client bundle, so there is
 * nothing to protect here; the separate var exists only for setups that
 * prefer to keep the two configurable apart.
 */
function apiKey(): string | null {
  return (
    process.env.POSTHOG_KEY ||
    process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN ||
    null
  );
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
  if (!key || !HOST) return;

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
 * Schedule capture after the response without risking serverless teardown.
 *
 * `after` only exists inside a request scope and THROWS outside one, so a
 * bare call here would put an analytics crash inside whatever it measures:
 * a cron sweep, a script, or a helper that a page happens to share with
 * one. The fallback keeps the event and drops the guarantee, which is the
 * right way round for something this file already promises is never worth
 * an error path.
 */
export function captureServerAsync(
  distinctId: string,
  event: AnalyticsEvent,
  properties: AnalyticsProperties = {},
): void {
  try {
    after(() => captureServer(distinctId, event, properties));
  } catch {
    void captureServer(distinctId, event, properties);
  }
}
