"use client";

import { useState, useEffect } from "react";
import Script from "next/script";
import Link from "next/link";
import { X } from "lucide-react";

/**
 * GDPR / ePrivacy cookie consent banner.
 *
 * Previously Google Analytics loaded unconditionally on every page, which
 * is a GDPR violation for EU visitors since analytics cookies aren't
 * strictly necessary. This component:
 *
 *   1. Reads consent state from localStorage on mount
 *   2. If undecided, shows a banner with Accept / Reject
 *   3. Only injects the GA scripts after the user clicks Accept
 *   4. Persists the choice so the banner doesn't reappear
 *
 * The banner is client-only on purpose, it needs localStorage, and we
 * don't want to flash it to returning visitors who've already decided.
 */

const STORAGE_KEY = "cookie-consent";
const GA_MEASUREMENT_ID = "G-DTNLQQ321K";

type ConsentState = "accepted" | "rejected" | "undecided";

function readConsent(): ConsentState {
  if (typeof window === "undefined") return "undecided";
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw === "accepted" || raw === "rejected") return raw;
    return "undecided";
  } catch {
    // localStorage can throw on private-mode Safari etc., treat as undecided.
    return "undecided";
  }
}

function writeConsent(state: "accepted" | "rejected") {
  try {
    localStorage.setItem(STORAGE_KEY, state);
  } catch {
    // Ignore, banner will reappear next visit in this edge case.
  }
}

export default function CookieConsent() {
  const [consent, setConsent] = useState<ConsentState>("undecided");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setConsent(readConsent());
  }, []);

  const accept = () => {
    writeConsent("accepted");
    setConsent("accepted");
  };

  const reject = () => {
    writeConsent("rejected");
    setConsent("rejected");
  };

  // Never render anything until mount, avoids SSR/hydration mismatch
  // (the server has no way to know the consent state).
  if (!mounted) return null;

  return (
    <>
      {/* Inject GA only after explicit consent */}
      {consent === "accepted" && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_MEASUREMENT_ID}', { 'anonymize_ip': true });
            `}
          </Script>
        </>
      )}

      {/* Banner only when undecided */}
      {consent === "undecided" && (
        <div
          role="dialog"
          aria-live="polite"
          aria-label="Cookie consent"
          className="fixed bottom-4 left-4 right-4 md:left-auto md:bottom-6 md:right-6 md:max-w-md z-[100] bg-deep-black/95 backdrop-blur-md border border-accent-gold/30 rounded-xl shadow-2xl p-5"
        >
          <div className="flex items-start gap-3 mb-3">
            <div className="flex-1">
              <p className="text-text-light text-sm font-medium mb-1">
                Cookies
              </p>
              <p className="text-text-gray/80 text-xs leading-relaxed">
                We use analytics cookies to understand how the site is used.
                Essential cookies for login and checkout are always on. You
                can change your mind later in the footer.
              </p>
            </div>
            <button
              onClick={reject}
              aria-label="Reject analytics"
              className="text-text-gray/50 hover:text-text-light transition-colors shrink-0"
            >
              <X size={16} />
            </button>
          </div>
          <div className="flex gap-2 mt-3">
            <button
              onClick={accept}
              className="flex-1 px-4 py-2 bg-accent-gold text-deep-black rounded-full text-xs font-medium hover:bg-accent-gold/90 transition-all uppercase tracking-wider"
            >
              Accept
            </button>
            <button
              onClick={reject}
              className="flex-1 px-4 py-2 bg-white/5 text-text-gray border border-white/10 rounded-full text-xs hover:bg-white/10 transition-all uppercase tracking-wider"
            >
              Essential only
            </button>
          </div>
          <p className="text-[10px] text-text-gray/40 mt-3 text-center">
            <Link href="/privacy" className="hover:text-accent-gold/70 underline">
              Privacy policy
            </Link>
          </p>
        </div>
      )}
    </>
  );
}
