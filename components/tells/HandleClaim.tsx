"use client";

import { useState } from "react";
import Link from "next/link";
import { Loader2, Check, ExternalLink, Copy } from "lucide-react";

/**
 * Two-state UI on /consilium/instincts/score:
 *   - No handle yet:   prompt to claim one (validates server-side, async)
 *   - Has handle:      show the share URL, copy button, public/private toggle,
 *                      open-in-new-tab link to /u/[handle]
 */
export default function HandleClaim({
  initialHandle,
  initialPublic,
}: {
  initialHandle: string | null;
  initialPublic: boolean;
}) {
  const [handle, setHandle] = useState<string | null>(initialHandle);
  const [profilePublic, setProfilePublic] = useState(initialPublic);
  const [draft, setDraft] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  async function claim() {
    setError(null);
    setSubmitting(true);
    try {
      const res = await fetch("/api/instincts/handle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          handle: draft.trim().toLowerCase(),
          profilePublic: true,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Could not claim handle.");
        setSubmitting(false);
        return;
      }
      setHandle(data.handle);
      setProfilePublic(data.profilePublic);
      setDraft("");
    } catch {
      setError("Network error. Try again.");
    } finally {
      setSubmitting(false);
    }
  }

  async function togglePublic(next: boolean) {
    const prev = profilePublic;
    setProfilePublic(next);
    try {
      const res = await fetch("/api/instincts/handle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ profilePublic: next }),
      });
      if (!res.ok) {
        setProfilePublic(prev);
      }
    } catch {
      setProfilePublic(prev);
    }
  }

  function copyUrl() {
    if (!handle) return;
    const url = `${window.location.origin}/u/${handle}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  }

  if (!handle) {
    return (
      <div className="rounded-lg border border-gray-800 bg-deep-black/60 p-5 sm:p-6">
        <p className="text-[10px] uppercase tracking-[0.4em] text-accent-gold/70 mb-3">
          Public profile
        </p>
        <p className="text-text-light text-sm font-light leading-relaxed mb-4">
          Claim a handle and share your hex. Drop the link in a tweet, a
          DM, or a TikTok bio.
        </p>
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="flex items-center bg-deep-black/40 border border-gray-800 rounded px-3 py-2 text-sm text-text-gray flex-1">
            <span className="text-text-gray/60 mr-1">@</span>
            <input
              type="text"
              value={draft}
              onChange={(e) => setDraft(e.target.value.toLowerCase())}
              placeholder="your-handle"
              maxLength={30}
              minLength={3}
              pattern="^[a-z0-9](?:[a-z0-9-]{1,28}[a-z0-9])?$"
              className="flex-1 bg-transparent focus:outline-none text-text-light"
              disabled={submitting}
            />
          </div>
          <button
            onClick={claim}
            disabled={submitting || draft.length < 3}
            className="inline-flex items-center justify-center gap-2 px-5 py-2 rounded-full bg-accent-gold text-deep-black font-medium tracking-wider uppercase text-xs hover:bg-accent-gold/90 transition-all disabled:opacity-50"
          >
            {submitting ? (
              <Loader2 size={12} className="animate-spin" />
            ) : null}
            Claim
          </button>
        </div>
        {error && (
          <p className="text-accent-burgundy text-xs mt-2">{error}</p>
        )}
        <p className="text-text-gray/60 text-[10px] uppercase tracking-[0.3em] mt-3">
          3-30 chars &middot; lowercase, digits, hyphens
        </p>
      </div>
    );
  }

  const url =
    typeof window === "undefined"
      ? `https://kanikarose.com/u/${handle}`
      : `${window.location.origin}/u/${handle}`;

  return (
    <div className="rounded-lg border border-gray-800 bg-deep-black/60 p-5 sm:p-6">
      <p className="text-[10px] uppercase tracking-[0.4em] text-accent-gold/70 mb-3">
        Your public profile
      </p>
      <div className="flex items-center gap-2 mb-4">
        <code className="flex-1 text-text-light text-sm font-mono bg-deep-black/40 border border-gray-800 rounded px-3 py-2 truncate">
          {url}
        </code>
        <button
          onClick={copyUrl}
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded border border-gray-800 text-text-gray hover:text-accent-gold text-xs uppercase tracking-[0.3em]"
          title="Copy URL"
        >
          {copied ? <Check size={12} /> : <Copy size={12} />}
          {copied ? "Copied" : "Copy"}
        </button>
        <Link
          href={`/u/${handle}`}
          target="_blank"
          rel="noopener"
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded border border-gray-800 text-text-gray hover:text-accent-gold text-xs uppercase tracking-[0.3em]"
          title="Open in new tab"
        >
          <ExternalLink size={12} />
          Open
        </Link>
      </div>

      <label className="flex items-center justify-between cursor-pointer">
        <span className="text-text-gray text-sm font-light">
          {profilePublic
            ? "Visible to anyone with the link."
            : "Profile is private. Only you can see your hex."}
        </span>
        <input
          type="checkbox"
          checked={profilePublic}
          onChange={(e) => togglePublic(e.target.checked)}
          className="w-9 h-5 appearance-none bg-gray-700 rounded-full relative cursor-pointer transition-colors checked:bg-accent-gold/70 before:absolute before:left-0.5 before:top-0.5 before:w-4 before:h-4 before:bg-white before:rounded-full before:transition-transform checked:before:translate-x-4"
        />
      </label>
    </div>
  );
}
