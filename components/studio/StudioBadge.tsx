"use client";

import { useCallback, useEffect } from "react";

/**
 * Keeps the home-screen icon badge in step with the inbox, the way
 * Messages does it.
 *
 * Two halves, and this is only one of them. While the app is open this
 * component syncs the count on mount and whenever the tab regains focus.
 * While it is CLOSED nothing here runs, so the service worker sets the
 * badge from the push payload instead (see public/sw.js). Both call the
 * same Badging API, so whichever ran last wins and they cannot disagree.
 *
 * Platform truth: the badge only appears on an INSTALLED app. In a normal
 * browser tab `setAppBadge` resolves and does nothing visible, and on iOS
 * it additionally requires notification permission. That is Apple's rule,
 * not a bug here, which is why the inbox also shows the count on screen.
 */
export default function StudioBadge() {
  const sync = useCallback(async () => {
    if (typeof navigator === "undefined" || !("setAppBadge" in navigator)) {
      return;
    }
    try {
      const res = await fetch("/api/studio/badge", { cache: "no-store" });
      if (!res.ok) return;
      const { waiting } = (await res.json()) as { waiting: number };
      if (waiting > 0) {
        await navigator.setAppBadge(waiting);
      } else {
        await navigator.clearAppBadge();
      }
    } catch {
      // A badge is a nicety. It must never surface an error to her.
    }
  }, []);

  useEffect(() => {
    void sync();
    const onVisible = () => {
      if (document.visibilityState === "visible") void sync();
    };
    document.addEventListener("visibilitychange", onVisible);
    window.addEventListener("focus", onVisible);
    return () => {
      document.removeEventListener("visibilitychange", onVisible);
      window.removeEventListener("focus", onVisible);
    };
  }, [sync]);

  return null;
}
