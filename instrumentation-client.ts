import * as Sentry from "@sentry/nextjs";

/**
 * Client-side Sentry init. Runs once when the browser bundle boots.
 * NEXT_PUBLIC_SENTRY_DSN is intentionally exposed to the client — Sentry
 * DSNs are public by design (they only accept events, not read them).
 *
 * If NEXT_PUBLIC_SENTRY_DSN is unset, Sentry is a no-op on the client.
 */
if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
  Sentry.init({
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

    // Lower client-side sample rate — browsers generate a lot of noise
    // (network hiccups, extension errors, etc.)
    tracesSampleRate: 0.05,
    sampleRate: 1.0,

    environment: process.env.NODE_ENV || "development",

    // Session Replay removed — the replay integration adds a large chunk
    // to the client bundle that was showing up in Lighthouse's "reduce
    // unused JS" warnings. We weren't regularly reviewing replays anyway.
    // Errors still report normally; just no DOM recording attached.
    replaysOnErrorSampleRate: 0,
    replaysSessionSampleRate: 0,

    integrations: [],

    ignoreErrors: [
      // Browser extensions throwing into window.onerror
      /extension\//,
      /^chrome:\/\//,
      // Network failures from the user going offline — not actionable
      "NetworkError",
      "Failed to fetch",
      // Ad/tracker blockers
      "Blocked by client",
      // React hydration mismatches — almost always caused by browser
      // extensions (Grammarly, translate, reading mode) injecting DOM
      // nodes before React hydrates. Not actionable code bugs.
      "Hydration",
      "Minified React error #418",
      "Minified React error #423",
      "Minified React error #425",
    ],
  });
}

// Router transition capture for performance monitoring
export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
