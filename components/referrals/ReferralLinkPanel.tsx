"use client";

import { useState } from "react";
import { Copy, Check, Share2 } from "lucide-react";

interface Props {
  code: string;
  url: string;
  converted: number;
  pending: number;
  rewardDollars: string;
}

/**
 * The link + counters card. Client component so we can do clipboard
 * copy, share intent fallback, and the brief "Copied!" affordance.
 */
export default function ReferralLinkPanel({
  code,
  url,
  converted,
  pending,
  rewardDollars,
}: Props) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Some browsers (older Safari over http) reject clipboard writes.
      // Fall back to selection + manual copy.
      const el = document.getElementById("ref-url-input") as HTMLInputElement | null;
      if (el) {
        el.select();
        document.execCommand("copy");
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    }
  }

  async function share() {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: "The Consilium",
          text: "I think you'd like this. The Consilium is Kanika Batra's private community for dark psychology + power dynamics. Join with my link and we both get a month free.",
          url,
        });
      } catch {
        // User dismissed; ignore.
      }
    } else {
      copy();
    }
  }

  const totalEarned = (converted * Number(rewardDollars)).toFixed(0);

  return (
    <div className="bg-deep-black/50 backdrop-blur-sm border border-warm-gold/20 rounded-2xl p-6 sm:p-8">
      <div className="text-center mb-6">
        <p className="text-text-gray/70 text-[11px] uppercase tracking-[0.25em] mb-2">
          Your invite link
        </p>
        <div className="text-2xl sm:text-3xl font-mono tabular-nums text-warm-gold tracking-[0.15em]">
          {code}
        </div>
      </div>

      <div className="flex items-stretch gap-2 mb-4">
        <input
          id="ref-url-input"
          readOnly
          value={url}
          onFocus={(e) => e.target.select()}
          className="flex-1 min-w-0 px-3 py-2.5 bg-deep-black/60 border border-warm-gold/20 rounded-lg text-text-light text-sm font-mono focus:outline-none focus:border-warm-gold/40"
        />
        <button
          onClick={copy}
          className="px-4 py-2.5 bg-warm-gold/10 border border-warm-gold/30 hover:bg-warm-gold/20 rounded-lg text-warm-gold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all"
        >
          {copied ? (
            <>
              <Check size={14} strokeWidth={2} />
              Copied
            </>
          ) : (
            <>
              <Copy size={14} strokeWidth={1.5} />
              Copy
            </>
          )}
        </button>
      </div>

      <button
        onClick={share}
        className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-full bg-warm-gold text-deep-black font-medium text-sm uppercase tracking-wider transition-all hover:bg-warm-gold/90"
      >
        <Share2 size={14} strokeWidth={2} />
        Share with a friend
      </button>

      <div className="grid grid-cols-3 gap-3 mt-7 pt-6 border-t border-warm-gold/10">
        <div className="text-center">
          <div className="text-2xl font-light text-warm-gold tabular-nums">
            {converted}
          </div>
          <div className="text-[10px] uppercase tracking-wider text-text-gray/70 mt-1">
            Joined
          </div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-light text-text-light/70 tabular-nums">
            {pending}
          </div>
          <div className="text-[10px] uppercase tracking-wider text-text-gray/70 mt-1">
            Pending
          </div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-light text-emerald-400 tabular-nums">
            ${totalEarned}
          </div>
          <div className="text-[10px] uppercase tracking-wider text-text-gray/70 mt-1">
            Credited
          </div>
        </div>
      </div>
    </div>
  );
}
