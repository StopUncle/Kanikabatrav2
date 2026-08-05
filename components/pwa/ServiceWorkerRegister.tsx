"use client";

import { useEffect } from "react";

/**
 * Registers /sw.js once on mount. Idempotent — the browser caches
 * the registration, so re-running this on every page load is a
 * no-op after the first install.
 *
 * Mounted in both app shells AND on the homepage: Chrome only fires
 * beforeinstallprompt once a service worker is registered, and the
 * homepage's "Download the app" button needs that event to offer the
 * native install to a first-time visitor. The worker's fetch handler
 * is a deliberate no-op, so registering site-wide caches nothing and
 * cannot serve a stale shell.
 */
export default function ServiceWorkerRegister() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!("serviceWorker" in navigator)) return;

    // Wait for the page to settle before registering. The browser
    // throttles SW registration during initial paint anyway, but
    // this makes the timing explicit and survives strict-mode double
    // mounts in dev cleanly.
    const handle = window.setTimeout(() => {
      navigator.serviceWorker
        .register("/sw.js", { scope: "/" })
        .catch((err) => {
          // Service worker registration failures are non-fatal —
          // the app still works, just no push, no install. Log to
          // console but don't surface to the user.
          // eslint-disable-next-line no-console
          console.warn("[pwa] service worker registration failed:", err);
        });
    }, 1500);

    return () => window.clearTimeout(handle);
  }, []);

  return null;
}
