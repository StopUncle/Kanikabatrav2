import Link from "next/link";
import { Compass, ArrowRight } from "lucide-react";

/**
 * 404 for /consilium/(member)/* — a deleted post, a mistyped URL, a
 * forum thread that was removed. Points the member back at the feed
 * rather than the default "Page not found" wall.
 */
export default function MemberNotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center rounded-3xl border border-warm-gold/15 bg-deep-black/60 p-8 sm:p-10">
        <div className="flex justify-center mb-5">
          <div className="w-14 h-14 rounded-full bg-warm-gold/10 border border-warm-gold/25 flex items-center justify-center">
            <Compass className="w-6 h-6 text-warm-gold" strokeWidth={1.5} />
          </div>
        </div>
        <p className="text-warm-gold/80 uppercase tracking-[0.3em] text-[10px] mb-3">
          Not Found
        </p>
        <h1 className="text-xl sm:text-2xl font-extralight tracking-wide text-text-light mb-3">
          This page doesn&apos;t exist
        </h1>
        <p className="text-text-gray text-sm font-light leading-relaxed mb-6">
          Deleted, moved, or a bad link. Nothing broken — just nothing here.
        </p>
        <Link
          href="/consilium/feed"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-warm-gold text-deep-black rounded-full text-sm font-medium tracking-wider uppercase hover:bg-warm-gold/90 transition-all"
        >
          Go to the Feed
          <ArrowRight size={14} strokeWidth={1.8} />
        </Link>
      </div>
    </div>
  );
}
