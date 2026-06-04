"use client";

import { useState, useEffect } from "react";
import { m, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { SITE_CONFIG } from "@/lib/constants";
import FocusReveal from "./FocusReveal";
import HeroParticles from "./HeroParticles";

/**
 * V3 hero. Editorial, centred, weighty, over a quiet field of drifting
 * gold dust. A thin kicker, a Didot headline that pulls into focus, the
 * rotating viral quote crossfading in, a glowing gold pill primary CTA,
 * and an underline-draw secondary link. No element ever chases the
 * cursor.
 */
export default function V3Hero() {
  const [quoteIndex, setQuoteIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % SITE_CONFIG.viralQuotes.length);
    }, 5200);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative isolate flex min-h-[calc(100svh-5rem)] items-center justify-center overflow-hidden px-5 pb-24 pt-8">
      <HeroParticles />
      <div className="relative z-10 mx-auto w-full max-w-4xl text-center">
        <FocusReveal
          immediate
          className="mb-8 flex items-center justify-center gap-4 text-[10px] uppercase tracking-[0.45em] text-slate-400/80"
        >
          <span className="h-px w-8 bg-slate-400/40" />
          Diagnosed Sociopath · Author
          <span className="h-px w-8 bg-slate-400/40" />
        </FocusReveal>

        <FocusReveal
          immediate
          as="h1"
          delay={0.1}
          y={32}
          className="font-serif text-5xl font-light leading-[0.95] tracking-tight text-text-light sm:text-7xl lg:text-[7.5rem]"
        >
          The Psychology
          <span className="mt-1 block italic text-warm-gold/90">of Power</span>
        </FocusReveal>

        <FocusReveal
          immediate
          as="p"
          delay={0.34}
          className="mx-auto mt-8 max-w-md text-xs uppercase tracking-[0.32em] text-text-gray sm:text-sm"
        >
          The strategy they don&apos;t teach you
        </FocusReveal>

        <div className="mt-8 flex h-12 items-center justify-center">
          <AnimatePresence mode="wait">
            <m.p
              key={quoteIndex}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.6 }}
              className="max-w-xl px-4 font-serif text-base italic text-slate-300/80 sm:text-lg"
            >
              &ldquo;{SITE_CONFIG.viralQuotes[quoteIndex]}&rdquo;
            </m.p>
          </AnimatePresence>
        </div>

        <FocusReveal
          immediate
          delay={0.5}
          className="mt-10 flex flex-col items-center justify-center gap-5 sm:flex-row"
        >
          <Link
            href="/book"
            className="v3-pill px-9 py-4 text-xs font-medium uppercase tracking-[0.25em]"
          >
            Read the Book
          </Link>
          <Link
            href="/consilium"
            className="group inline-flex items-center gap-2 py-2 text-xs font-medium uppercase tracking-[0.25em] text-slate-200 transition-colors hover:text-white"
          >
            <span className="v3-link">Enter the Consilium</span>
            <span aria-hidden className="transition-transform group-hover:translate-x-1">
              &rarr;
            </span>
          </Link>
        </FocusReveal>
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute bottom-7 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 sm:flex"
      >
        <span className="text-[9px] uppercase tracking-[0.4em] text-slate-400/60">
          Scroll
        </span>
        <span className="h-10 w-px bg-gradient-to-b from-slate-400/50 to-transparent" />
      </div>
    </section>
  );
}
