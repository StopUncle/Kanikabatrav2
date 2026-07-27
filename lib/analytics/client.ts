"use client";

import type { PostHog } from "posthog-js";
import { ANALYTICS_EVENTS } from "./events";
import type { AnalyticsEvent, AnalyticsProperties } from "./events";

/**
 * Browser-side PostHog.
 *
 * posthog-js is imported dynamically and only when a key is configured,
 * so the library never enters the main bundle and unconfigured
 * environments (local, dev, anyone's fork) download nothing at all. The
 * marketing pages carry enough JavaScript already.
 *
 * Everything here is safe to call before init finishes: events fired
 * early are queued and replayed once the library lands.
 */

let clientPromise: Promise<PostHog | null> | null = null;
const queued: Array<{
  event: AnalyticsEvent;
  properties: AnalyticsProperties;
}> = [];

function key(): string | undefined {
  return process.env.NEXT_PUBLIC_POSTHOG_KEY;
}

export function analyticsEnabled(): boolean {
  return Boolean(key());
}

/** Load and initialise posthog-js once. Resolves null when unconfigured. */
export function initAnalytics(): Promise<PostHog | null> {
  if (clientPromise) return clientPromise;

  const apiKey = key();
  if (!apiKey || typeof window === "undefined") {
    clientPromise = Promise.resolve(null);
    return clientPromise;
  }

  clientPromise = import("posthog-js")
    .then(({ default: posthog }) => {
      posthog.init(apiKey, {
        api_host:
          process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com",
        // Pageviews are captured by the provider on route change instead:
        // this is an app-router app, so the automatic listener would miss
        // client-side navigations and double-count the first load.
        capture_pageview: false,
        capture_pageleave: true,
        // Members are reading about manipulation and abuse. Recording
        // their screens would be a betrayal of that, whatever the funnel
        // insight would be worth.
        disable_session_recording: true,
        persistence: "localStorage+cookie",
      });
      for (const q of queued.splice(0)) {
        posthog.capture(q.event, q.properties);
      }
      return posthog;
    })
    .catch(() => null);

  return clientPromise;
}

/** Record an event. No-ops silently when analytics is not configured. */
export function capture(
  event: AnalyticsEvent,
  properties: AnalyticsProperties = {},
): void {
  if (!analyticsEnabled()) return;
  if (!clientPromise) {
    // Fired before the provider mounted. Hold it rather than drop it.
    queued.push({ event, properties });
    void initAnalytics();
    return;
  }
  void clientPromise.then((posthog) => posthog?.capture(event, properties));
}

/**
 * Kanika's welcome video played to the end.
 *
 * Lives here rather than being fired inline so the Arrival screen needs
 * one import and one call:
 *
 *   <video onEnded={captureWelcomeVideoCompleted} ... />
 *
 * NOT yet wired. The Arrival is being reworked for the welcome-video
 * config in the same release, so the call belongs to whoever lands that,
 * rather than to a merge conflict.
 */
export function captureWelcomeVideoCompleted(): void {
  capture(ANALYTICS_EVENTS.WELCOME_VIDEO_COMPLETED);
}

/**
 * Pageview. Separate from capture() because "$pageview" is PostHog's own
 * reserved name rather than one of ours, and widening AnalyticsEvent to
 * admit it would let any string through.
 */
export function capturePageview(url: string): void {
  if (!analyticsEnabled()) return;
  void initAnalytics().then((posthog) =>
    posthog?.capture("$pageview", { $current_url: url }),
  );
}

/**
 * Tie this browser to a User id, so server events and browser events
 * describe one person instead of two halves of a funnel.
 */
export function identify(userId: string): void {
  if (!analyticsEnabled()) return;
  void initAnalytics().then((posthog) => posthog?.identify(userId));
}
