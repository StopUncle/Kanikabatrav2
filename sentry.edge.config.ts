import * as Sentry from "@sentry/nextjs";

/**
 * Edge-runtime Sentry init. Used by middleware.ts and any route handlers
 * running on the edge runtime. Currently we only use edge for the CSP
 * middleware, so this is minimal.
 */
Sentry.init({
  dsn: process.env.SENTRY_DSN,
  tracesSampleRate: 0.1,
  sampleRate: 1.0,
  environment: process.env.NODE_ENV || "development",
});
