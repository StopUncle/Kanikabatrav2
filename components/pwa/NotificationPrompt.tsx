"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const DISMISS_KEY = "consilium-push-dismissed-v1";
const DISMISS_DURATION_DAYS = 14;
const SUBSCRIBED_KEY = "consilium-push-subscribed-v1";

/**
 * Fired by training surfaces the moment a first completion lands
 * (SimulatorPageClient dispatches it on a successful /complete POST).
 * The server-computed `unlocked` prop covers every later page load;
 * this event covers the load the moment actually happens on, without
 * betting the one permission prompt on router.refresh timing.
 */
export const PUSH_MOMENT_EVENT = "kb:push-moment";

/**
 * Raised while the push banner holds the bottom of the screen, so the
 * install banner can step aside for it (InstallPrompt listens). The two
 * occupy the same slot, and before this existed the install banner won
 * by simply being there first: push waited for a banner that shows on
 * every visit for fourteen days, which on Android meant it never showed
 * at all. Install can be offered on any visit; the push prompt only has
 * the one moment it was earned in, so that moment takes the floor.
 */
export const PUSH_PROMPT_OPEN_EVENT = "kb:push-prompt-open";
export const PUSH_PROMPT_CLOSED_EVENT = "kb:push-prompt-closed";

/**
 * How long to let the install banner keep the floor before asking
 * anyway. Long enough that someone actively reading the install offer
 * is not interrupted, short enough that it resolves inside the session
 * the moment happened in.
 */
const INSTALL_YIELD_MS = 12000;

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
 *
 * Timing (`unlocked`): the caller decides when this member has earned the
 * question, and today that means they have finished a Baseline Read. Asking
 * for notification permission on arrival spends the one prompt a browser
 * gives you on someone with nothing yet to be notified about, and a denial
 * is close to permanent. Asked after the Baseline Read, it lands on someone
 * who just spent five minutes and has a result they want moved.
 */
export default function NotificationPrompt({
  unlocked = false,
  message = "Get a tap on the shoulder when Kanika answers your question or posts a new voice note.",
}: {
  unlocked?: boolean;
  message?: string;
}) {
  const pathname = usePathname();
  const [shouldShow, setShouldShow] = useState(false);
  const [busy, setBusy] = useState(false);
  const [earnedNow, setEarnedNow] = useState(false);

  // The moment can arrive mid-session: the layout computed `unlocked`
  // before the first completion existed. Training surfaces announce it.
  useEffect(() => {
    if (unlocked) return;
    const onMoment = () => setEarnedNow(true);
    window.addEventListener(PUSH_MOMENT_EVENT, onMoment);
    return () => window.removeEventListener(PUSH_MOMENT_EVENT, onMoment);
  }, [unlocked]);

  const earned = unlocked || earnedNow;

  useEffect(() => {
    if (typeof window === "undefined") return;

    // 0. Has this member reached the moment worth asking at?
    if (!earned) return;

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

    // Show the prompt after a small delay, preferring to let the install
    // banner clear first so two gold banners never stack. That preference
    // is now BOUNDED: any iOS visitor who could not grant push already
    // returned at gate 7, so everyone still here (Android, desktop,
    // installed PWA) can subscribe without installing anything. Waiting
    // forever on a banner that reappears for fourteen days meant the
    // earned moment expired unasked. Past the deadline we take the floor
    // and the install banner yields (it listens for the open event).
    let interval: number | undefined;
    const handle = window.setTimeout(() => {
      const installBannerUp = () =>
        document.querySelector('[data-pwa-banner="install"]') !== null;
      if (!installBannerUp()) {
        setShouldShow(true);
        return;
      }
      const deadline = Date.now() + INSTALL_YIELD_MS;
      interval = window.setInterval(() => {
        if (!installBannerUp() || Date.now() >= deadline) {
          window.clearInterval(interval);
          setShouldShow(true);
        }
      }, 1000);
    }, 4500);
    return () => {
      window.clearTimeout(handle);
      if (interval) window.clearInterval(interval);
    };
  }, [earned]);

  // Tell the install banner to stand down while this one is up, and to
  // come back when it resolves either way.
  useEffect(() => {
    if (!shouldShow) return;
    window.dispatchEvent(new Event(PUSH_PROMPT_OPEN_EVENT));
    return () => {
      window.dispatchEvent(new Event(PUSH_PROMPT_CLOSED_EVENT));
    };
  }, [shouldShow]);

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

  // Inside the app shell the tab bar owns the bottom edge; sit above it
  // (same rule as InstallPrompt) instead of covering the tabs.
  const inAppShell = pathname === "/app" || pathname?.startsWith("/app/");
  const position = inAppShell ? "bottom-24" : "bottom-4 sm:bottom-6";

  return (
    <div className={`fixed ${position} left-4 right-4 z-40 mx-auto max-w-md rounded-2xl border border-warm-gold/30 bg-deep-black/95 p-4 shadow-2xl backdrop-blur sm:left-1/2 sm:right-auto sm:-translate-x-1/2`}>
      <div className="flex items-start gap-3">
        <div className="flex-1">
          <p className="text-warm-gold text-[10px] uppercase tracking-[0.3em] mb-1.5">
            Notifications
          </p>
          <p className="text-text-light text-sm font-light leading-relaxed mb-3">
            {message}
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
