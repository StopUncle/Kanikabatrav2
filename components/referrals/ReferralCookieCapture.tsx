"use client";

import { useEffect } from "react";

/**
 * Captures ?ref=<code> from the URL and POSTs it to the cookie-track
 * endpoint so the cookie is set httpOnly server-side. First-touch wins:
 * if the user already has a cookie set, the endpoint silently replaces
 * it with the new code (member's choice to override). The cookie itself
 * holds the precedence rule on the next visit.
 *
 * Mounted once in the root layout so any page that receives ?ref= is
 * captured. After capture, removes the query param from the URL so
 * the share link doesn't leak through to subsequent shares.
 *
 * Renders nothing.
 */
export default function ReferralCookieCapture() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const url = new URL(window.location.href);
    const ref = url.searchParams.get("ref");
    if (!ref) return;

    // Strip the param from the URL first so a fast click-back doesn't
    // re-fire the POST.
    url.searchParams.delete("ref");
    window.history.replaceState(
      window.history.state,
      "",
      url.pathname + url.search + url.hash,
    );

    fetch("/api/community/referral/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ref }),
    }).catch(() => {
      // Silent fail. A network glitch on the tracker is recoverable on
      // the next page load if they revisit the link.
    });
  }, []);

  return null;
}
