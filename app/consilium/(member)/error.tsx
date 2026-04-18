"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RotateCcw } from "lucide-react";

/**
 * Error boundary for every /consilium/(member)/* page. Without this,
 * a thrown error inside a server component renders the default
 * unstyled Next.js error page — embarrassing and off-brand.
 *
 * The user can either retry (re-runs the server component) or bail
 * back to the feed.
 */
export default function MemberError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log to the browser console at least — Sentry (when configured)
    // auto-captures errors from error boundaries.
    console.error("[consilium/member] boundary caught:", error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center rounded-3xl border border-red-500/20 bg-deep-black/60 p-8 sm:p-10">
        <div className="flex justify-center mb-5">
          <div className="w-14 h-14 rounded-full bg-red-500/10 border border-red-500/25 flex items-center justify-center">
            <AlertTriangle className="w-6 h-6 text-red-400" strokeWidth={1.5} />
          </div>
        </div>
        <p className="text-red-400/80 uppercase tracking-[0.3em] text-[10px] mb-3">
          Something broke
        </p>
        <h1 className="text-xl sm:text-2xl font-extralight tracking-wide text-text-light mb-3">
          This page hit an error
        </h1>
        <p className="text-text-gray text-sm font-light leading-relaxed mb-6">
          We logged it. Try the button below — most of the time it&apos;s a
          transient hiccup and one retry fixes it. If not, bail to the feed
          and the rest of the Consilium still works.&nbsp;
        </p>
        {error.digest && (
          <p className="text-text-gray/40 text-[10px] font-mono mb-6 tracking-wider">
            ref · {error.digest}
          </p>
        )}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={reset}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-warm-gold text-deep-black rounded-full text-sm font-medium tracking-wider uppercase hover:bg-warm-gold/90 transition-all"
          >
            <RotateCcw size={14} strokeWidth={1.8} />
            Try Again
          </button>
          <Link
            href="/consilium/feed"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-white/15 text-text-gray rounded-full text-sm font-light tracking-wider uppercase hover:text-accent-gold hover:border-accent-gold/30 transition-all"
          >
            Back to Feed
          </Link>
        </div>
      </div>
    </div>
  );
}
