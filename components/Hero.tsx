"use client";

import { useState, useEffect } from "react";
import { m, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { SITE_CONFIG, SOCIAL_METRICS } from "@/lib/constants";

/**
 * Hero — first paint on /.
 *
 * Rewritten with a cleaner vertical rhythm and only two primary CTAs
 * (Book + Consilium) because everything else on the homepage funnels
 * through those. The previous version had three CTAs and the scroll
 * indicator dropped a thin gold line right through the middle button on
 * desktop — fixed by dropping the quiz CTA and re-parenting the scroll
 * indicator to the section edge, below the button row with enough
 * breathing room to never overlap.
 *
 * H1 sizing reduced one step (was clipping off the top of shorter
 * viewports). The "clinically diagnosed sociopath" paragraph moved out
 * because it duplicated the Consilium positioning that appears just
 * below the fold — this keeps the hero focused on the promise, not the
 * product description.
 */
export default function Hero() {
  const [quoteIndex, setQuoteIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % SITE_CONFIG.viralQuotes.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="hero-viewport relative min-h-[calc(100vh-5rem)] flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-4 pb-24 sm:pb-28">
      <div className="max-w-5xl mx-auto text-center w-full">
        {/* Audience signal — kept subtle. Social proof without shouting.
            Uses warm-gold (the real #d4af37 gold) because the project
            has two "gold" tokens: accent-gold is actually a dusty rose
            (#B76E79) used on the book/homepage rose palette, while
            warm-gold is the true gold used on Consilium and premium
            surfaces. For the hero CTAs — which introduce the two
            primary offers — we want the real gold so they tie visually
            to the Consilium teaser directly below. */}
        <m.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-warm-gold/70 uppercase tracking-[0.35em] text-[10px] sm:text-xs mb-6"
        >
          {SOCIAL_METRICS.combined.totalFollowers} followers
          <span className="mx-3 text-warm-gold/40">·</span>
          {SOCIAL_METRICS.combined.totalViews} views
        </m.p>

        {/* H1 — one step down from the previous build. Previous size was
            clipping on short viewports once the header + social-proof
            line were accounted for. */}
        <m.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="font-light leading-[1.05] mb-6 sm:mb-8"
        >
          <span className="block gradient-text animate-gradient text-4xl sm:text-6xl md:text-7xl lg:text-8xl">
            The Psychology of Power
          </span>
          <span className="block text-text-light text-xl sm:text-2xl md:text-3xl mt-3 sm:mt-4 font-extralight tracking-wide">
            The strategy they don&apos;t teach you
          </span>
        </m.h1>

        {/* Rotating viral quote — on-brand, stays. */}
        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="h-14 sm:h-16 mb-10 sm:mb-12 flex items-center justify-center"
        >
          <AnimatePresence mode="wait">
            <m.p
              key={quoteIndex}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.5 }}
              className="text-warm-gold/90 text-base sm:text-lg md:text-xl italic font-light px-4 max-w-2xl"
            >
              &ldquo;{SITE_CONFIG.viralQuotes[quoteIndex]}&rdquo;
            </m.p>
          </AnimatePresence>
        </m.div>

        {/* Two primary CTAs. Book first (matches new homepage order),
            Consilium second. Consistent sizing and shape between them so
            they read as siblings, not as primary + afterthought. */}
        <m.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center max-w-md sm:max-w-none mx-auto"
        >
          <Link
            href="/book"
            className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-warm-gold text-deep-black font-medium text-sm tracking-[0.2em] uppercase transition-all hover:bg-warm-gold/90 hover:shadow-[0_12px_40px_-12px_rgba(212,175,55,0.55)]"
          >
            Read the Book
          </Link>
          <Link
            href="/consilium"
            className="inline-flex items-center justify-center px-8 py-3.5 rounded-full border border-warm-gold/40 text-warm-gold font-medium text-sm tracking-[0.2em] uppercase transition-all hover:bg-warm-gold/10 hover:border-warm-gold/70"
          >
            Join the Consilium
          </Link>
        </m.div>

        <m.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="text-text-gray/60 text-xs sm:text-sm mt-6 font-light tracking-wide"
        >
          Read the playbook. Practice it inside the community.
        </m.p>
      </div>

      {/* Scroll indicator — re-parented to the section (not the content
          div) and pinned to bottom with enough margin that it sits below
          the CTA row. Also removed on mobile where short viewports don't
          have room for it and the tap affordance is clear enough anyway. */}
      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="hidden sm:block absolute bottom-6 left-1/2 -translate-x-1/2 pointer-events-none"
        aria-hidden
      >
        <div className="w-px h-12 bg-gradient-to-b from-warm-gold/60 to-transparent animate-pulse" />
      </m.div>
    </section>
  );
}
