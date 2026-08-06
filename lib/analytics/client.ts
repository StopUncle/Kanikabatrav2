"use client";

import posthog from "posthog-js";
import type { AnalyticsEvent, AnalyticsProperties } from "./events";

/**
 * Browser-side PostHog.
 *
 * instrumentation-client.ts initializes this singleton once at browser
 * startup. These helpers intentionally never initialize a second client.
 */

export function analyticsEnabled(): boolean {
  return Boolean(process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN);
}

/** Record an event. No-ops silently when analytics is not configured. */
export function capture(
  event: AnalyticsEvent,
  properties: AnalyticsProperties = {},
): void {
  if (!analyticsEnabled()) return;
  posthog.capture(event, properties);
}

/**
 * Pageview. Separate from capture() because "$pageview" is PostHog's own
 * reserved name rather than one of ours, and widening AnalyticsEvent to
 * admit it would let any string through.
 */
export function capturePageview(url: string): void {
  if (!analyticsEnabled()) return;
  posthog.capture("$pageview", { $current_url: url });
}

/**
 * Tie this browser to a User id, so server events and browser events
 * describe one person instead of two halves of a funnel.
 */
export function identify(
  userId: string,
  personProperties: Record<string, string> = {},
): void {
  if (!userId) return;
  posthog.identify(userId, personProperties);
}

/** Clear the persisted browser identity when the authenticated session ends. */
export function reset(): void {
  posthog.reset();
}
