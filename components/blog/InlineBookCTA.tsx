"use client";

import Link from "next/link";
import { BOOK_INFO } from "@/lib/constants";

export default function InlineBookCTA() {
  return (
    <div className="my-10 pl-6 border-l-4 border-accent-gold bg-gradient-to-r from-accent-gold/5 to-transparent rounded-r-lg py-6 pr-6">
      <p className="text-white font-light text-lg mb-2">
        Want the full playbook?
      </p>
      <p className="text-text-gray text-base mb-4">
        The Sociopathic Dating Bible gives you the complete framework — 17
        chapters of strategy most dating advice won&apos;t touch.
      </p>
      <div className="flex flex-wrap gap-4">
        <Link
          href="/book"
          className="text-sm text-accent-gold hover:text-accent-gold/80 underline underline-offset-4 decoration-accent-gold/50 transition-colors"
        >
          Learn more
        </Link>
        <a
          href={BOOK_INFO.kdpLink}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-text-gray hover:text-white underline underline-offset-4 decoration-white/30 transition-colors"
        >
          Get it on Amazon — ${BOOK_INFO.kdpPrice}
        </a>
      </div>
    </div>
  );
}
