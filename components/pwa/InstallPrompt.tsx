"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { ANALYTICS_EVENTS } from "@/lib/analytics/events";
import { capture } from "@/lib/analytics/client";

// v2: rotated at the public beta launch (2026-08-05). Everyone who
// dismissed v1 during the testing months gets one fresh offer of the
// launched app; their next dismissal sticks for 14 days as before.
const DISMISS_KEY = "consilium-install-dismissed-v2";
const DISMISS_DURATION_DAYS = 14; // Don't re-prompt for 2 weeks if dismissed.

/**
 * The Chromium / Android "beforeinstallprompt" event interface that
 * isn't in lib.dom yet. Typed locally so we don't carry an extra dep.
 */
interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

/**
 * Install prompt for the Consilium PWA.
 *
 * Two paths:
 *   - Android / Chromium: listens for "beforeinstallprompt", shows
 *     a tasteful banner, and on click calls .prompt() — the native
 *     browser dialog handles the rest.
 *   - iOS Safari: no install API exists, so we show a manual hint
 *     ("Tap Share, then Add to Home Screen") to iOS users only.
 *
 * Both paths are dismissible. Dismissals are stored in localStorage
 * with a 14-day TTL so we don't pester members on every page load.
 *
 * Already-installed users see nothing — we detect display-mode
 * standalone and bail out of rendering entirely.
 */
export default function InstallPrompt() {
  const pathname = usePathname();
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [dismissed, setDismissed] = useState(true); // start hidden, reveal after checks

  // The Arrival owns its install moment (InstallSheet); stacking this
  // banner on top of it left two overlapping offers fighting for the
  // same taps and blocking the Begin button underneath.
  const onArrival = pathname === "/app/welcome";

  useEffect(() => {
    if (typeof window === "undefined") return;

    // 0. Phones only. Desktop Chromium fires beforeinstallprompt too,
    // but the desktop offer is the handoff panel's QR code; a floating
    // banner there just intercepts clicks meant for the app frame.
    if (window.matchMedia("(min-width: 1024px)").matches) return;

    // 1. Already installed? Bail.
    const standaloneQuery = window.matchMedia("(display-mode: standalone)");
    const standalone =
      standaloneQuery.matches ||
      // iOS Safari uses a non-standard navigator.standalone
      (window.navigator as Navigator & { standalone?: boolean }).standalone === true;
    if (standalone) {
      setIsStandalone(true);
      return;
    }

    // 2. Recently dismissed? Bail.
    try {
      const stored = window.localStorage.getItem(DISMISS_KEY);
      if (stored) {
        const dismissedAt = Number.parseInt(stored, 10);
        const ageDays = (Date.now() - dismissedAt) / (1000 * 60 * 60 * 24);
        if (ageDays < DISMISS_DURATION_DAYS) {
          return;
        }
      }
    } catch {
      // localStorage access can throw in private mode. Ignore.
    }

    // 3. Detect iOS for the manual-instruction path.
    const ua = window.navigator.userAgent;
    const isIOSDevice = /iPad|iPhone|iPod/.test(ua) && !("MSStream" in window);
    setIsIOS(isIOSDevice);

    if (isIOSDevice) {
      // No native event on iOS; show the manual prompt after a small
      // delay so it doesn't crash into the page-load layout shift.
      const handle = window.setTimeout(() => setDismissed(false), 2500);
      return () => window.clearTimeout(handle);
    }

    // 4. Android / Chromium: capture the install event.
    function handleBeforeInstall(e: Event) {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setDismissed(false);
    }
    window.addEventListener("beforeinstallprompt", handleBeforeInstall);
    return () =>
      window.removeEventListener("beforeinstallprompt", handleBeforeInstall);
  }, []);

  function handleDismiss() {
    setDismissed(true);
    try {
      window.localStorage.setItem(DISMISS_KEY, String(Date.now()));
    } catch {
      // ignore
    }
  }

  // One shot when the banner actually becomes visible. Firing in render
  // would count a re-render as another impression.
  const visible = !isStandalone && !dismissed && (isIOS || Boolean(deferredPrompt));
  const reportedShown = useRef(false);
  useEffect(() => {
    if (visible && !reportedShown.current) {
      reportedShown.current = true;
      capture(ANALYTICS_EVENTS.INSTALL_PROMPT_SHOWN, {
        surface: isIOS ? "banner-ios" : "banner",
      });
    }
  }, [visible, isIOS]);

  async function handleInstall() {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const choice = await deferredPrompt.userChoice;
    if (choice.outcome === "accepted") {
      capture(ANALYTICS_EVENTS.INSTALL_PROMPT_ACCEPTED, { surface: "banner" });
      setDismissed(true);
    } else {
      // Treat a dismiss in the native dialog the same as a tap-X.
      handleDismiss();
    }
    setDeferredPrompt(null);
  }

  if (isStandalone || dismissed || onArrival) return null;
  if (!isIOS && !deferredPrompt) return null;

  // Inside the app shell the banner sits ABOVE the tab bar instead of on
  // top of it; the marketing/consilium surfaces have no bottom chrome.
  const inAppShell = pathname === "/app" || pathname?.startsWith("/app/");
  const position = inAppShell ? "bottom-24" : "bottom-4 sm:bottom-6";

  // iOS path — manual instructions, no API call.
  if (isIOS) {
    return (
      <div className={`fixed ${position} left-4 right-4 z-50 mx-auto max-w-md rounded-2xl border border-warm-gold/30 bg-deep-black/95 p-4 shadow-2xl backdrop-blur sm:left-1/2 sm:right-auto sm:-translate-x-1/2`}>
        <div className="flex items-start gap-3">
          <div className="flex-1">
            <p className="text-warm-gold text-[10px] uppercase tracking-[0.3em] mb-1.5">
              Install the Consilium
            </p>
            <p className="text-text-light text-sm font-light leading-relaxed">
              Add to your home screen for one-tap access. Tap{" "}
              <span className="inline-flex items-center justify-center align-middle text-warm-gold">
                <svg
                  width="14"
                  height="18"
                  viewBox="0 0 14 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="inline"
                >
                  <path
                    d="M7 1V11M7 1L3 5M7 1L11 5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M1 9V15C1 16.1046 1.89543 17 3 17H11C12.1046 17 13 16.1046 13 15V9"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>{" "}
              then <strong className="text-warm-gold/90">Add to Home Screen</strong>.
            </p>
          </div>
          <button
            onClick={handleDismiss}
            aria-label="Dismiss"
            className="text-text-gray hover:text-text-light text-lg leading-none"
          >
            ×
          </button>
        </div>
      </div>
    );
  }

  // Android / Chromium path — native install button.
  return (
    <div className={`fixed ${position} left-4 right-4 z-50 mx-auto max-w-md rounded-2xl border border-warm-gold/30 bg-deep-black/95 p-4 shadow-2xl backdrop-blur sm:left-1/2 sm:right-auto sm:-translate-x-1/2`}>
      <div className="flex items-start gap-3">
        <div className="flex-1">
          <p className="text-warm-gold text-[10px] uppercase tracking-[0.3em] mb-1.5">
            Install the Consilium
          </p>
          <p className="text-text-light text-sm font-light leading-relaxed mb-3">
            One-tap from your home screen. No browser, no clutter.
          </p>
          <div className="flex gap-2">
            <button
              onClick={handleInstall}
              className="px-4 py-2 rounded-full bg-warm-gold text-deep-black text-xs uppercase tracking-[0.2em] font-medium hover:bg-warm-gold/90 transition-colors"
            >
              Install
            </button>
            <button
              onClick={handleDismiss}
              className="px-4 py-2 rounded-full border border-warm-gold/30 text-warm-gold text-xs uppercase tracking-[0.2em] font-light hover:bg-warm-gold/10 transition-colors"
            >
              Not now
            </button>
          </div>
        </div>
        <button
          onClick={handleDismiss}
          aria-label="Dismiss"
          className="text-text-gray hover:text-text-light text-lg leading-none"
        >
          ×
        </button>
      </div>
    </div>
  );
}
