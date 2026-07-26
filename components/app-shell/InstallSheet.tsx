"use client";

import { useEffect, useState } from "react";

/**
 * The install sheet, app skin. Slides up on the Arrival screen once, because
 * that is the moment the offer makes sense: you have just been let in, and
 * the app belongs on your phone.
 *
 * Chromium fires beforeinstallprompt and we hand it straight to the browser.
 * iOS has no such API, so those members get the manual Share instruction.
 * Members already running standalone never see it.
 */

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

const DISMISS_KEY = "consilium-install-dismissed-v1";
const DISMISS_DAYS = 14;

export default function InstallSheet() {
  const [deferred, setDeferred] = useState<BeforeInstallPromptEvent | null>(
    null,
  );
  const [isIOS, setIsIOS] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const standalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as Navigator & { standalone?: boolean }).standalone ===
        true;
    if (standalone) return;

    try {
      const stored = window.localStorage.getItem(DISMISS_KEY);
      if (stored) {
        const ageDays =
          (Date.now() - Number.parseInt(stored, 10)) / (1000 * 60 * 60 * 24);
        if (ageDays < DISMISS_DAYS) return;
      }
    } catch {
      /* private mode: fall through and offer the install */
    }

    const ua = window.navigator.userAgent;
    if (/iPad|iPhone|iPod/.test(ua) && !("MSStream" in window)) {
      setIsIOS(true);
      const t = window.setTimeout(() => setVisible(true), 1600);
      return () => window.clearTimeout(t);
    }

    function onBeforeInstall(e: Event) {
      e.preventDefault();
      setDeferred(e as BeforeInstallPromptEvent);
      setVisible(true);
    }
    window.addEventListener("beforeinstallprompt", onBeforeInstall);
    return () =>
      window.removeEventListener("beforeinstallprompt", onBeforeInstall);
  }, []);

  function dismiss() {
    setVisible(false);
    try {
      window.localStorage.setItem(DISMISS_KEY, String(Date.now()));
    } catch {
      /* ignore */
    }
  }

  async function install() {
    if (!deferred) return;
    await deferred.prompt();
    const choice = await deferred.userChoice;
    if (choice.outcome === "accepted") setVisible(false);
    else dismiss();
    setDeferred(null);
  }

  if (!visible) return null;

  return (
    <div className="app-sheet-up absolute inset-x-0 bottom-0 z-40 translate-y-full rounded-t-[28px] border-t border-[var(--app-line)] bg-[var(--app-card-2)] px-6 pb-[max(28px,env(safe-area-inset-bottom))] pt-3.5">
      <span className="mx-auto mb-5 block h-1 w-10 rounded-full bg-[var(--app-dim)] opacity-50" />

      <div className="mb-5 flex items-center gap-4">
        <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-[var(--app-line)] bg-[radial-gradient(120%_120%_at_30%_20%,#241d12,#100d09)]">
          <svg width="26" height="26" viewBox="0 0 96 96">
            <circle
              cx="48"
              cy="48"
              r="40"
              stroke="#d4af37"
              strokeWidth="4"
              fill="none"
            />
            <circle cx="48" cy="48" r="6" fill="#d4af37" />
          </svg>
        </span>
        <div>
          <h3
            className="text-[19px]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Keep it on your phone
          </h3>
          <p className="mt-1 text-[13px] leading-relaxed text-[var(--app-muted)]">
            {isIOS
              ? "Tap Share, then Add to Home Screen. One tap from then on."
              : "One tap from your home screen. Your streak, your scenarios, no browser."}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {isIOS ? (
          <button
            type="button"
            onClick={dismiss}
            className="flex-1 rounded-full bg-[var(--app-gold)] py-3.5 text-center text-sm font-semibold text-[#17130a]"
          >
            Got it
          </button>
        ) : (
          <>
            <button
              type="button"
              onClick={install}
              className="flex-1 rounded-full bg-[var(--app-gold)] py-3.5 text-center text-sm font-semibold text-[#17130a]"
            >
              Add to Home Screen
            </button>
            <button
              type="button"
              onClick={dismiss}
              className="shrink-0 px-4 py-3.5 text-sm text-[var(--app-dim)]"
            >
              Later
            </button>
          </>
        )}
      </div>
    </div>
  );
}
