"use client";

import { useEffect, useState } from "react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

const DISMISS_KEY = "studio-install-dismissed-v1";

/**
 * The install offer, inline at the top of the inbox rather than as a
 * floating banner: this app has one screen and nothing to cover.
 *
 * It only appears here, on a page that links studio.webmanifest, because
 * a browser will only ever offer to install the app whose manifest the
 * current page declares. The admin panel links the member manifest, so
 * its "Open Studio" cards can lead here but can never install from there.
 *
 * Two paths, as always. Chromium fires beforeinstallprompt and we can
 * show a real button; iOS has no install API at all, so it gets the
 * Share sheet walkthrough. On iPhone that walkthrough is load-bearing
 * rather than a nicety: the home-screen badge does not exist until the
 * app is installed AND notifications are allowed.
 */
export default function StudioInstall() {
  const [deferred, setDeferred] = useState<BeforeInstallPromptEvent | null>(null);
  const [isIOS, setIsIOS] = useState(false);
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Already installed: this is the installed window. Nothing to offer.
    const standalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as Navigator & { standalone?: boolean }).standalone === true;
    if (standalone) return;

    try {
      if (window.localStorage.getItem(DISMISS_KEY) === "1") return;
    } catch {
      // private mode
    }

    const ua = window.navigator.userAgent;
    if (/iPad|iPhone|iPod/.test(ua) && !("MSStream" in window)) {
      setIsIOS(true);
      setHidden(false);
      return;
    }

    function onPrompt(e: Event) {
      e.preventDefault();
      setDeferred(e as BeforeInstallPromptEvent);
      setHidden(false);
    }
    window.addEventListener("beforeinstallprompt", onPrompt);
    return () => window.removeEventListener("beforeinstallprompt", onPrompt);
  }, []);

  function dismiss() {
    setHidden(true);
    try {
      window.localStorage.setItem(DISMISS_KEY, "1");
    } catch {
      // ignore
    }
  }

  async function install() {
    if (!deferred) return;
    await deferred.prompt();
    await deferred.userChoice;
    setDeferred(null);
    setHidden(true);
  }

  if (hidden) return null;

  return (
    <div className="mb-6 rounded-2xl border border-[#d4af37]/25 bg-[#4a1426]/15 p-4">
      <p className="mb-1 text-[10px] uppercase tracking-[0.2em] text-[#d4af37]">
        Put Studio on your home screen
      </p>
      {isIOS ? (
        <p className="text-[14px] font-light leading-relaxed text-[#d6cfc4]">
          Tap the Share button, then{" "}
          <strong className="font-normal text-[#f5f0ed]">Add to Home Screen</strong>.
          Open it from the icon and allow notifications, or the unread count
          will not show on the badge.
        </p>
      ) : (
        <>
          <p className="mb-3 text-[14px] font-light leading-relaxed text-[#d6cfc4]">
            One tap to your inbox, and the unread count sits on the icon.
          </p>
          <button
            onClick={install}
            className="rounded-full bg-[#d4af37] px-5 py-2 text-xs font-medium uppercase tracking-[0.16em] text-[#0a0908]"
          >
            Install
          </button>
        </>
      )}
      <button
        onClick={dismiss}
        className="mt-3 block text-[12px] font-light text-[#7a6f60]"
      >
        Not now
      </button>
    </div>
  );
}
