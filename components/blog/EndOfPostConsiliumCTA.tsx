"use client";

import Link from "next/link";

interface Props {
  slug?: string;
}

export default function EndOfPostConsiliumCTA({ slug }: Props) {
  const params = new URLSearchParams({
    utm_source: "blog",
    utm_medium: "organic",
    utm_campaign: "consilium-blog-2026",
    utm_content: slug ? `end-of-post-${slug}` : "end-of-post",
  });

  return (
    <div className="relative overflow-hidden rounded-2xl border border-accent-gold/30 bg-gradient-to-br from-deep-black via-deep-navy/40 to-accent-burgundy/20 p-8 sm:p-10">
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-accent-gold/[0.08] rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-accent-burgundy/15 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative">
        <p className="text-accent-gold uppercase tracking-[0.3em] text-[10px] font-medium mb-4">
          The Consilium &middot; $29/mo
        </p>

        <h3 className="text-2xl sm:text-3xl font-extralight text-white leading-tight tracking-tight mb-4">
          You read this far. <br className="hidden sm:block" />
          You don&rsquo;t belong on the outside.
        </h3>

        <p className="text-text-gray text-sm sm:text-base font-light leading-relaxed mb-6 max-w-xl">
          The Consilium is the council. Kanika&rsquo;s daily voice notes, the
          live simulator, the forum where women run real situations through
          each other before they make the move. The book is the prologue. This
          is the work.
        </p>

        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-text-gray/90 text-sm font-light mb-7">
          <li className="flex gap-2">
            <span className="text-accent-gold">&rsaquo;</span>
            Daily voice notes from Kanika
          </li>
          <li className="flex gap-2">
            <span className="text-accent-gold">&rsaquo;</span>
            The simulator. Live scenarios.
          </li>
          <li className="flex gap-2">
            <span className="text-accent-gold">&rsaquo;</span>
            Ask Kanika directly
          </li>
          <li className="flex gap-2">
            <span className="text-accent-gold">&rsaquo;</span>
            Members-only book pricing ($9.99)
          </li>
          <li className="flex gap-2">
            <span className="text-accent-gold">&rsaquo;</span>
            Forum. Chat rooms. The council.
          </li>
          <li className="flex gap-2">
            <span className="text-accent-gold">&rsaquo;</span>
            Cancel any time. No questions.
          </li>
        </ul>

        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href={`/consilium?${params.toString()}`}
            className="inline-flex items-center justify-center px-7 py-3.5 rounded-lg bg-accent-gold text-deep-black font-semibold text-[12px] tracking-[0.2em] uppercase hover:bg-accent-gold/90 transition"
          >
            Join the Consilium &rsaquo;
          </Link>
          <Link
            href={`/consilium?${new URLSearchParams({
              ...Object.fromEntries(params),
              utm_content: slug
                ? `end-of-post-secondary-${slug}`
                : "end-of-post-secondary",
            }).toString()}`}
            className="inline-flex items-center justify-center px-5 py-3.5 text-[11px] tracking-[0.22em] uppercase text-text-gray hover:text-accent-gold transition"
          >
            What&rsquo;s inside
          </Link>
        </div>
      </div>
    </div>
  );
}
