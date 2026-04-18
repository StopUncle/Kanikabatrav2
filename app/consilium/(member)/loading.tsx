import { Loader2 } from "lucide-react";

/**
 * Loading fallback for every /consilium/(member)/* page during SSR /
 * suspense. Without this, Next.js falls back to a blank screen for the
 * brief moment between route push and content paint — cheap-looking.
 *
 * Kept minimal on purpose: a spinner on-brand colour, centred, with
 * enough vertical space that it doesn't jump when the real content
 * lands.
 */
export default function MemberLoading() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="w-7 h-7 text-warm-gold animate-spin" strokeWidth={1.5} />
        <p className="text-[10px] uppercase tracking-[0.35em] text-warm-gold/60">
          Loading
        </p>
      </div>
    </div>
  );
}
