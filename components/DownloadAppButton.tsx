"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ANALYTICS_EVENTS } from "@/lib/analytics/events";
import { capture } from "@/lib/analytics/client";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

const PILL =
  "inline-flex items-center gap-3 px-8 py-3 text-sm font-medium uppercase tracking-wider text-deep-black bg-accent-gold rounded-full hover:bg-accent-gold/90 transition-colors duration-300";

/**
 * The homepage download button. Progressive: it server-renders as a
 * plain link to /start so it works before hydration and in browsers
 * with no install API, upgrades to the native install dialog on
 * Android/Chromium when the browser offers one, and on iOS (no API
 * exists) reveals the same Add to Home Screen hint the in-app
 * InstallPrompt banner uses.
 */
export default function DownloadAppButton() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [isIOS, setIsIOS] = useState(false);
  const [showIOSHint, setShowIOSHint] = useState(false);

  useEffect(() => {
    const standalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as Navigator & { standalone?: boolean })
        .standalone === true;
    if (standalone) return;

    const ua = window.navigator.userAgent;
    setIsIOS(/iPad|iPhone|iPod/.test(ua) && !("MSStream" in window));

    function handleBeforeInstall(e: Event) {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    }
    window.addEventListener("beforeinstallprompt", handleBeforeInstall);
    return () =>
      window.removeEventListener("beforeinstallprompt", handleBeforeInstall);
  }, []);

  async function handleClick() {
    if (deferredPrompt) {
      await deferredPrompt.prompt();
      const choice = await deferredPrompt.userChoice;
      if (choice.outcome === "accepted") {
        capture(ANALYTICS_EVENTS.INSTALL_PROMPT_ACCEPTED, {
          surface: "homepage",
        });
      }
      setDeferredPrompt(null);
      return;
    }
    setShowIOSHint(true);
  }

  if (!deferredPrompt && !isIOS) {
    return (
      <Link href="/start" className={PILL}>
        Open the app
        <span>&rarr;</span>
      </Link>
    );
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <button type="button" onClick={handleClick} className={PILL}>
        Download the app
      </button>
      {showIOSHint && (
        <Link
          href="/start"
          className="text-sm font-light text-accent-gold underline underline-offset-4 hover:text-accent-gold/80 transition-colors"
        >
          Or open the app in your browser
        </Link>
      )}
      {showIOSHint && (
        <p className="max-w-[260px] text-center text-text-gray text-sm font-light leading-relaxed">
          Tap{" "}
          <span className="inline-flex items-center justify-center align-middle text-accent-gold">
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
          then{" "}
          <strong className="font-medium text-accent-gold/90">
            Add to Home Screen
          </strong>
          .
        </p>
      )}
    </div>
  );
}
