"use client";

import Link from "next/link";

export default function InlineCoachingCTA() {
  return (
    <div className="my-10 pl-6 border-l-4 border-accent-sapphire bg-gradient-to-r from-accent-sapphire/5 to-transparent rounded-r-lg py-6 pr-6">
      <p className="text-white font-light text-lg mb-2">
        Need a personal read on your situation?
      </p>
      <p className="text-text-gray text-base mb-4">
        Book a session with Kanika for a direct psychological breakdown of
        what&apos;s happening — and what to do next.
      </p>
      <Link
        href="/coaching"
        className="text-sm text-accent-gold hover:text-accent-gold/80 underline underline-offset-4 decoration-accent-gold/50 transition-colors"
      >
        View coaching options
      </Link>
    </div>
  );
}
