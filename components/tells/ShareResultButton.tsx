"use client";

import { useState } from "react";
import { Share2, Check } from "lucide-react";

/**
 * Share button for a result. Uses the native share sheet on mobile and
 * falls back to copying the link on desktop. The url carries result
 * params so the social preview renders the brag OG card.
 */
export default function ShareResultButton({
  url,
  title,
  text,
  label = "Share result",
}: {
  url: string;
  title: string;
  text: string;
  label?: string;
}) {
  const [copied, setCopied] = useState(false);

  async function handleShare() {
    const nav = typeof navigator !== "undefined" ? navigator : undefined;
    if (nav && typeof nav.share === "function") {
      try {
        await nav.share({ title, text, url });
      } catch {
        // user cancelled or share failed, leave it, do not fall back to copy
      }
      return;
    }
    try {
      await nav?.clipboard?.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard blocked, nothing more we can do gracefully
    }
  }

  return (
    <button
      type="button"
      onClick={handleShare}
      className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full border border-accent-gold/40 text-accent-gold font-medium tracking-wider uppercase text-sm hover:bg-accent-gold/10 transition-all"
    >
      {copied ? (
        <>
          <Check size={16} strokeWidth={1.8} />
          Link copied
        </>
      ) : (
        <>
          <Share2 size={16} strokeWidth={1.6} />
          {label}
        </>
      )}
    </button>
  );
}
