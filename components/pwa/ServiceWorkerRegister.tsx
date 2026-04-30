"use client";

import { useEffect } from "react";

/**
 * Registers /sw.js once on mount. Idempotent — the browser caches
 * the registration, so re-running this on every page load is a
 * no-op after the first install.
 *
 * Mounted in the Consilium member layout so it only runs for
 * authenticated members. We don't register the SW for the marketing
 * site because there's no benefit yet (no push, no caching) and a
 * stray service worker interferes with debugging.
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
