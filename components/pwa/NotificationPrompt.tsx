"use client";

import { useEffect, useState } from "react";

const DISMISS_KEY = "consilium-push-dismissed-v1";
const DISMISS_DURATION_DAYS = 14;
const SUBSCRIBED_KEY = "consilium-push-subscribed-v1";

/**
 * Notification permission + subscription prompt for the Consilium PWA.
 *
 * Two-step UX:
 *   1. Tasteful banner asking the member to enable push notifications.
 *      Sibling of InstallPrompt — same visual language, same dismissal
 *      pattern (14-day localStorage TTL).
 *   2. On click "Enable", request the browser permission, subscribe via
 *      PushManager with the VAPID key from env, POST the subscription
 *      to /api/push/subscribe.
 *
 * Hidden conditions (don't render):
 *   - Browser doesn't support Notification or PushManager
 *   - VAPID public key not configured (env-not-set)
 *   - Permission already granted AND a subscription already exists for
 *     this device (we cache that fact in localStorage to avoid the
 *     30ms async check on every page load)
 *   - Permission denied (user said no in the past — don't pester)
 *   - Recently dismissed (14-day TTL)
 *
 * iOS Safari note: web-push works on iOS 16.4+, but ONLY when the page
 * is launched from the installed home-screen PWA, not in plain Safari.
 * We detect "standalone display-mode" and only show the prompt on iOS
 * if the app is installed. Plain-Safari iOS visitors see the
 * InstallPrompt instead, which converts the right way.
 */
export default function NotificationPrompt() {
  const [shouldShow, setShouldShow] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // 1. API support gate.
    if (!("Notification" in window)) return;
    if (!("serviceWorker" in navigator)) return;
    if (!("PushManager" in window)) return;

    // 2. VAPID key configured?
    const vapidKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
    if (!vapidKey) return;

    // 3. Already subscribed on this device? Bail.
    try {
      if (window.localStorage.getItem(SUBSCRIBED_KEY) === "1") return;
    } catch {
      // private mode — ignore
    }

    // 4. Already-denied permission? Don't pester.
    if (Notification.permission === "denied") return;

    // 5. Permission already granted? Skip the banner; we'll attempt
    //    a silent re-subscribe on mount instead (handles the case
    //    where the user installed the PWA cleanly and granted
    //    permission via the OS).
    if (Notification.permission === "granted") {
      void silentResubscribe();
      return;
    }

    // 6. Recently dismissed? Bail.
    try {
      const stored = window.localStorage.getItem(DISMISS_KEY);
      if (stored) {
        const ageDays =
          (Date.now() - Number.parseInt(stored, 10)) /
          (1000 * 60 * 60 * 24);
        if (ageDays < DISMISS_DURATION_DAYS) return;
      }
    } catch {
      // ignore
    }

    // 7. iOS Safari: web-push only works in standalone mode on iOS.
    const ua = window.navigator.userAgent;
    const isIOS =
      /iPad|iPhone|iPod/.test(ua) && !("MSStream" in window);
    if (isIOS) {
      const standalone =
        (
          window.navigator as Navigator & { standalone?: boolean }
        ).standalone === true;
      if (!standalone) return;
    }

    // Show the prompt after a small delay so it doesn't crash into
    // the install banner if both are eligible. Install banner is
    // higher priority — once the PWA is installed, push prompts on
    // the next visit.
    const handle = window.setTimeout(() => setShouldShow(true), 4500);
    return () => window.clearTimeout(handle);
  }, []);

  function dismiss() {
    setShouldShow(false);
    try {
      window.localStorage.setItem(DISMISS_KEY, String(Date.now()));
    } catch {
      // ignore
    }
  }

  async function enable() {
    setBusy(true);
    try {
      const ok = await subscribe();
      if (ok) {
        try {
          window.localStorage.setItem(SUBSCRIBED_KEY, "1");
        } catch {
          // ignore
        }
        setShouldShow(false);
      } else {
        // Either denied or sub failed — treat as dismiss so we don't
        // immediately re-prompt next page load.
        dismiss();
      }
    } finally {
      setBusy(false);
    }
  }

  if (!shouldShow) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-40 mx-auto max-w-md rounded-2xl border border-warm-gold/30 bg-deep-black/95 p-4 shadow-2xl backdrop-blur sm:bottom-6 sm:left-1/2 sm:right-auto sm:-translate-x-1/2">
      <div className="flex items-start gap-3">
        <div className="flex-1">
          <p className="text-warm-gold text-[10px] uppercase tracking-[0.3em] mb-1.5">
            Notifications
          </p>
          <p className="text-text-light text-sm font-light leading-relaxed mb-3">
            Get a tap on the shoulder when Kanika answers your question
            or posts a new voice note.
          </p>
          <div className="flex gap-2">
            <button
              onClick={enable}
              disabled={busy}
              className="px-4 py-2 rounded-full bg-warm-gold text-deep-black text-xs uppercase tracking-[0.2em] font-medium hover:bg-warm-gold/90 transition-colors disabled:opacity-50"
            >
              {busy ? "Enabling…" : "Enable"}
            </button>
            <button
              onClick={dismiss}
              disabled={busy}
              className="px-4 py-2 rounded-full border border-warm-gold/30 text-warm-gold text-xs uppercase tracking-[0.2em] font-light hover:bg-warm-gold/10 transition-colors disabled:opacity-50"
            >
              Not now
            </button>
          </div>
        </div>
        <button
          onClick={dismiss}
          aria-label="Dismiss"
          className="text-text-gray hover:text-text-light text-lg leading-none"
        >
          ×
        </button>
      </div>
    </div>
  );
}

/**
 * Run a silent subscribe attempt when the browser already has
 * permission. Catches the case where the user granted at the OS
 * level (e.g. installed the PWA, said yes to push during install)
 * but no DB row exists yet for this device. Idempotent — the
 * /api/push/subscribe endpoint upserts on endpoint.
 *
 * Failures are silent. If this doesn't work, the next page load
 * tries again.
 */
async function silentResubscribe(): Promise<void> {
  try {
    if (window.localStorage.getItem(SUBSCRIBED_KEY) === "1") return;
  } catch {
    // ignore
  }
  try {
    const ok = await subscribe();
    if (ok) {
      try {
        window.localStorage.setItem(SUBSCRIBED_KEY, "1");
      } catch {
        // ignore
      }
    }
  } catch {
    // silent
  }
}

/**
 * The actual subscription flow. Asks permission if not yet granted,
 * registers a PushSubscription with the SW, POSTs it to the server.
 * Returns true on a complete round-trip, false if any step bailed.
 */
async function subscribe(): Promise<boolean> {
  const vapidKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
  if (!vapidKey) return false;

  // Permission gate. If already granted, this returns "granted"
  // without re-prompting.
  let permission: NotificationPermission;
  if (Notification.permission === "default") {
    permission = await Notification.requestPermission();
  } else {
    permission = Notification.permission;
  }
  if (permission !== "granted") return false;

  // Service worker must be ready before we can subscribe.
  const reg = await navigator.serviceWorker.ready;

  // Check for an existing subscription on this device first. The
  // browser will hand it back if it exists; otherwise we make one.
  let sub = await reg.pushManager.getSubscription();
  if (!sub) {
    sub = await reg.pushManager.subscribe({
      userVisibleOnly: true,
      // PushManager wants BufferSource. Uint8Array is one, but the
      // current lib.dom typings narrow it through ArrayBufferLike,
      // which doesn't match cleanly — cast to satisfy the compiler.
      applicationServerKey: urlBase64ToUint8Array(
        vapidKey,
      ) as unknown as BufferSource,
    });
  }

  // Extract the keys in the shape the server expects.
  const json = sub.toJSON();
  const endpoint = json.endpoint;
  const p256dh = json.keys?.p256dh;
  const auth = json.keys?.auth;
  if (!endpoint || !p256dh || !auth) return false;

  const res = await fetch("/api/push/subscribe", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      endpoint,
      keys: { p256dh, auth },
    }),
  });

  return res.ok;
}

/**
 * Convert the URL-safe base64 VAPID public key into the Uint8Array
 * shape PushManager.subscribe expects. Standard helper across
 * web-push tutorials, factored here so we don't pull a dep just for
 * twelve lines of base64 decoding.
 */
function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const raw = window.atob(base64);
  const out = new Uint8Array(raw.length);
  for (let i = 0; i < raw.length; i += 1) {
    out[i] = raw.charCodeAt(i);
  }
  return out;
}
