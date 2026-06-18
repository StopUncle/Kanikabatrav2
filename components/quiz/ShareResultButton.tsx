"use client";

import { useState } from "react";
import { Share2, Check } from "lucide-react";

interface Props {
  resultId: string;
  typeName: string;
}

/**
 * Share the public quiz result card. Uses the native share sheet on mobile
 * (where Instagram / WhatsApp / iMessage are one tap away) and falls back to
 * copy-link on desktop. Points at /quiz/results/[id], the PII-free public
 * page whose link preview renders /api/og/quiz/[id].
 */
export default function ShareResultButton({ resultId, typeName }: Props) {
  const [copied, setCopied] = useState(false);

  async function share() {
    const url = `${window.location.origin}/quiz/results/${resultId}`;
    const shareData = {
      title: "Dark Mirror Assessment",
      text: `My Dark Mirror type is ${typeName}. What's yours?`,
      url,
    };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
        return;
      } catch {
        // User dismissed the sheet, or share failed; fall through to copy.
      }
    }
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard blocked; nothing more we can do gracefully.
    }
  }

  return (
    <button
      onClick={share}
      className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-accent-gold/40 text-accent-gold text-xs uppercase tracking-[0.2em] hover:bg-accent-gold/10 transition-colors"
    >
      {copied ? <Check size={14} /> : <Share2 size={14} />}
      {copied ? "Link copied" : "Share your results"}
    </button>
  );
}
