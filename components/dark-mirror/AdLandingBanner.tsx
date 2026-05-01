"use client";

import { useEffect, useState } from "react";

/**
 * Ad-landing welcome banner for /dark-mirror.
 *
 * Reads URL params on mount and surfaces a personalised acknowledgement
 * when the visitor arrived from a paid ad or a tagged organic post.
 * Closes the cognitive gap between "I clicked an ad about X" and
 * "I'm on a page that shows me three options", without that gap,
 * paid-ad ROAS leaks 20-40% to bouncing.
 *
 * The banner is intentionally thin (single-line strip) so it doesn't
 * push the three-card hub below the fold on mobile.
 *
 * Triggered when utm_source matches a paid channel (instagram / tiktok
 * / youtube / facebook). Hidden otherwise. Dismissible via the X.
 */

interface CampaignMatch {
  /** Headline shown in the banner. Should reference the implied
   *  promise of the ad creative without being so specific that it
   *  fights with whatever the actual ad said. */
  headline: string;
  /** Short subline, optional, adds context without crowding the
   *  banner. Skip on mobile-tight builds. */
  subline?: string;
}

/**
 * Map utm_campaign prefixes to tailored banner copy. Match longest-
 * prefix-first so a "mirror-bonding-launch-v2" entry would beat
 * "mirror-bonding-launch" if both existed. Add new campaign names
 * here as ads launch, no code change needed downstream.
 */
const CAMPAIGN_OVERRIDES: Record<string, CampaignMatch> = {
  "mirror-bonding": {
    headline: "Want to know if you've been Mirror-Bonded?",
    subline: "The mini quiz will tell you which axis you sit on.",
  },
  "darvo": {
    headline: "Spot DARVO in your relationships.",
    subline: "Start with the Starter Pack or the mini quiz.",
  },
  "soulmate-scam": {
    headline: "The love-bomb pattern, named.",
    subline: "Three ways in, all free or under $10.",
  },
};

/** Default fallback when utm_source matches but no campaign override
 *  fires. Keeps the banner useful even for untagged general-traffic
 *  ads. */
const DEFAULT_BY_SOURCE: Record<string, CampaignMatch> = {
  instagram: {
    headline: "From Instagram. Pick where to start.",
  },
  tiktok: {
    headline: "From TikTok. Pick where to start.",
  },
  youtube: {
    headline: "From YouTube. Pick where to start.",
  },
  facebook: {
    headline: "From Facebook. Pick where to start.",
  },
};

const DISMISS_KEY = "dark-mirror:ad-banner-dismissed";

export default function AdLandingBanner() {
  const [match, setMatch] = useState<CampaignMatch | null>(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    try {
      // Per-tab dismissal via sessionStorage rather than localStorage:
      // someone bouncing back tomorrow from a different ad shouldn't
      // permanently silence the welcome.
      if (window.sessionStorage.getItem(DISMISS_KEY) === "1") {
        setDismissed(true);
        return;
      }

      const params = new URLSearchParams(window.location.search);
      const source = (params.get("utm_source") ?? "").trim().toLowerCase();
      const campaign = (
        params.get("utm_campaign") ?? ""
      ).trim().toLowerCase();

      if (!source) return;

      // Look for a campaign-specific override first (longest-prefix
      // wins). This lets us tailor copy per ad creative without
      // adding components.
      let resolved: CampaignMatch | null = null;
      const sortedKeys = Object.keys(CAMPAIGN_OVERRIDES).sort(
        (a, b) => b.length - a.length,
      );
      for (const key of sortedKeys) {
        if (campaign.startsWith(key)) {
          resolved = CAMPAIGN_OVERRIDES[key];
          break;
        }
      }

      // Fall back to source-only default.
      if (!resolved && DEFAULT_BY_SOURCE[source]) {
        resolved = DEFAULT_BY_SOURCE[source];
      }

      if (resolved) setMatch(resolved);
    } catch {
      // SSR or storage-blocked browsers; banner just doesn't show.
    }
  }, []);

  if (!match || dismissed) return null;

  function handleDismiss() {
    try {
      window.sessionStorage.setItem(DISMISS_KEY, "1");
    } catch {
      /* in-memory dismiss is fine */
    }
    setDismissed(true);
  }

  return (
    <div
      role="region"
      aria-label="Welcome from your ad source"
      className="relative bg-gradient-to-r from-warm-gold/[0.08] via-warm-gold/[0.05] to-warm-gold/[0.08] border-b border-warm-gold/20"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 pr-12 flex items-center justify-center gap-3 text-center">
        <div>
          <p className="text-warm-gold text-sm sm:text-base font-light">
            {match.headline}
          </p>
          {match.subline && (
            <p className="text-text-gray/85 text-xs sm:text-sm font-light mt-0.5">
              {match.subline}
            </p>
          )}
        </div>
      </div>
      <button
        type="button"
        onClick={handleDismiss}
        aria-label="Dismiss"
        className="absolute top-1/2 -translate-y-1/2 right-3 sm:right-5 w-8 h-8 inline-flex items-center justify-center rounded-full text-text-gray/60 hover:text-warm-gold hover:bg-warm-gold/10 transition-colors text-lg leading-none"
      >
        ×
      </button>
    </div>
  );
}
