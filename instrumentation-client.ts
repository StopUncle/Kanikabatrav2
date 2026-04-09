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

    // Session replay on errors only — captures the last ~30s of interaction
    // when something breaks so you can see what the user was doing. Zero
    // replay on successful sessions to keep quota low.
    replaysOnErrorSampleRate: 1.0,
    replaysSessionSampleRate: 0,

    integrations: [
      Sentry.replayIntegration({
        // Mask all inputs and text by default — avoids leaking PII from
        // form fields into replay recordings.
        maskAllText: true,
        maskAllInputs: true,
        blockAllMedia: true,
      }),
    ],

    ignoreErrors: [
      // Browser extensions throwing into window.onerror
      /extension\//,
      /^chrome:\/\//,
      // Network failures from the user going offline — not actionable
      "NetworkError",
      "Failed to fetch",
      // Ad/tracker blockers
      "Blocked by client",
    ],
  });
}

// Router transition capture for performance monitoring
export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
