/**
 * Sentry initialization for the server + edge runtimes.
 *
 * Called automatically by Next.js at server startup via the instrumentation
 * hook. Initializes Sentry only when SENTRY_DSN is set, so local dev and
 * early deploys without a Sentry account are a safe no-op.
 *
 * Setup:
 *   1. Create a free Sentry project at sentry.io (Next.js platform)
 *   2. Copy the DSN (format: https://PUBLIC_KEY@oXXX.ingest.sentry.io/PROJECT)
 *   3. Set SENTRY_DSN on Railway service variables
 *   4. (Optional) Set SENTRY_AUTH_TOKEN + SENTRY_ORG + SENTRY_PROJECT to
 *      enable source map uploads during build (better stack traces)
 */

export async function register() {
  if (!process.env.SENTRY_DSN) {
    // No DSN configured — Sentry is a silent no-op. Safe for dev + any
    // deploy that hasn't finished setup yet.
    return;
  }

  if (process.env.NEXT_RUNTIME === "nodejs") {
    await import("./sentry.server.config");
  }

  if (process.env.NEXT_RUNTIME === "edge") {
    await import("./sentry.edge.config");
  }
}

export async function onRequestError(
  err: unknown,
  request: Request,
  context: {
    routerKind: "Pages Router" | "App Router";
    routePath: string;
    routeType: "render" | "route" | "action" | "middleware";
  },
) {
  if (!process.env.SENTRY_DSN) return;
  const Sentry = await import("@sentry/nextjs");
  // Sentry's captureRequestError has a stricter RequestInfo type than the
  // Next.js-supplied Request — the shapes match at runtime but TS complains.
  // Cast is safe here.
  Sentry.captureRequestError(
    err,
    request as unknown as Parameters<typeof Sentry.captureRequestError>[1],
    context,
  );
}
