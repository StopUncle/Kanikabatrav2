import * as Sentry from "@sentry/nextjs";

/**
 * Server-runtime Sentry init.
 * Loaded lazily by instrumentation.ts only when SENTRY_DSN is set.
 */
Sentry.init({
  dsn: process.env.SENTRY_DSN,

  // Sample 10% of transactions for performance monitoring. Bump this up
  // during incident investigations or down to save quota.
  tracesSampleRate: 0.1,

  // Capture all errors. Sampling errors is almost never what you want —
  // an error that only fires once an hour is still an error.
  sampleRate: 1.0,

  // Environment tag so we can distinguish staging / production in Sentry.
  environment: process.env.NODE_ENV || "development",

  // Release tag — use the Railway deployment id if available, else the
  // first 7 chars of the git SHA at build time, else undefined (Sentry
  // auto-assigns).
  release:
    process.env.RAILWAY_DEPLOYMENT_ID ||
    process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 7) ||
    undefined,

  // Don't capture user PII in the default scope — we'll attach it
  // explicitly on authenticated routes where useful.
  sendDefaultPii: false,

  // Ignore noise that isn't actionable.
  ignoreErrors: [
    // Aborted fetches from the client closing the tab
    "AbortError",
    // Next.js internal dynamic-rendering bail-outs (expected during build)
    /DYNAMIC_SERVER_USAGE/,
  ],
});
