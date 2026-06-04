"use client";

import { useState, useEffect } from "react";
import { m, AnimatePresence, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { SITE_CONFIG, SOCIAL_METRICS } from "@/lib/constants";
import CountUp from "@/components/motion/CountUp";
import Magnetic from "@/components/motion/Magnetic";

/**
 * Hero v2, first paint on /.
 *
 * The promise leads. A layered gold/burgundy mesh and two slow-drifting
 * blobs give the dark field depth; the H1 wipes up line by line behind a
 * mask; the reach numbers count up the first time they land; and the two
 * flagship offers (Book + Consilium) sit as co-equal, lightly magnetic
 * CTAs. Everything heavy collapses to a static layout under reduced
 * motion, so the cinematic layer is pure enhancement.
 */
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const headlineVariant = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};

const lineVariant = {
  hidden: { y: "110%" },
  show: { y: "0%", transition: { duration: 0.9, ease: EASE } },
};

export default function Hero() {
  const [quoteIndex, setQuoteIndex] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    const id = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % SITE_CONFIG.viralQuotes.length);
    }, 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="hero-viewport relative isolate flex items-center justify-center overflow-hidden px-4 pb-24 pt-4 sm:px-6 sm:pb-28 lg:px-8">
      {/* Depth field. Static mesh base + two drifting blooms. */}
      <div aria-hidden className="mesh-gold absolute inset-0 -z-10" />
      {!reduce && (
        <>
          <m.div
            aria-hidden
            className="absolute left-[12%] top-[22%] -z-10 h-72 w-72 rounded-full blur-3xl"
            style={{
              background:
                "radial-gradient(closest-side, rgba(212,175,55,0.16), transparent)",
            }}
            animate={{ x: [0, 40, -20, 0], y: [0, -30, 20, 0] }}
            transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          />
          <m.div
            aria-hidden
            className="absolute bottom-[18%] right-[10%] -z-10 h-80 w-80 rounded-full blur-3xl"
            style={{
              background:
                "radial-gradient(closest-side, rgba(114,9,33,0.22), transparent)",
            }}
            animate={{ x: [0, -30, 25, 0], y: [0, 25, -15, 0] }}
            transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
          />
        </>
      )}

      <div className="relative mx-auto w-full max-w-5xl text-center">
        {/* Reach signal, animated on first view. */}
        <m.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6 text-[10px] uppercase tracking-[0.35em] text-warm-gold/70 sm:text-xs"
        >
          <CountUp value={SOCIAL_METRICS.combined.totalFollowers} /> followers
          <span className="mx-3 text-warm-gold/40">·</span>
          <CountUp value={SOCIAL_METRICS.combined.totalViews} /> views
        </m.p>

        {/* Headline. Mask-reveal line by line, or static under reduced motion. */}
        {reduce ? (
          <h1 className="mb-6 font-light leading-[1.05] sm:mb-8">
            <span className="block gradient-text animate-gradient text-4xl sm:text-6xl md:text-7xl lg:text-8xl">
              The Psychology of Power
            </span>
            <span className="mt-3 block text-xl font-extralight tracking-wide text-text-light sm:mt-4 sm:text-2xl md:text-3xl">
              The strategy they don&apos;t teach you
            </span>
          </h1>
        ) : (
          <m.h1
            variants={headlineVariant}
            initial="hidden"
            animate="show"
            className="mb-6 font-light leading-[1.05] sm:mb-8"
          >
            <span className="block overflow-hidden pb-1">
              <m.span
                variants={lineVariant}
                className="block gradient-text animate-gradient text-4xl sm:text-6xl md:text-7xl lg:text-8xl"
              >
                The Psychology of Power
              </m.span>
            </span>
            <span className="mt-3 block overflow-hidden pb-1 sm:mt-4">
              <m.span
                variants={lineVariant}
                className="block text-xl font-extralight tracking-wide text-text-light sm:text-2xl md:text-3xl"
              >
                The strategy they don&apos;t teach you
              </m.span>
            </span>
          </m.h1>
        )}

        {/* Rotating viral quote, on-brand, stays. */}
        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mb-10 flex h-14 items-center justify-center sm:mb-12 sm:h-16"
        >
          <AnimatePresence mode="wait">
            <m.p
              key={quoteIndex}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.5 }}
              className="max-w-2xl px-4 text-base font-light italic text-warm-gold/90 sm:text-lg md:text-xl"
            >
              &ldquo;{SITE_CONFIG.viralQuotes[quoteIndex]}&rdquo;
            </m.p>
          </AnimatePresence>
        </m.div>

        {/* Two co-equal CTAs. Book is the easy yes (solid gold); the
            Consilium is the deeper commitment (gold-edged, soft glow).
            Both lightly magnetic on mouse pointers. */}
        <m.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="mx-auto flex max-w-md flex-col items-stretch justify-center gap-3 sm:max-w-none sm:flex-row sm:items-center sm:gap-4"
        >
          <Magnetic className="inline-flex">
            <Link
              href="/book"
              className="inline-flex w-full items-center justify-center rounded-full bg-warm-gold px-8 py-3.5 text-sm font-medium uppercase tracking-[0.2em] text-deep-black transition-all hover:bg-warm-gold/90 hover:shadow-[0_14px_44px_-12px_rgba(212,175,55,0.6)] sm:w-auto"
            >
              Read the Book
            </Link>
          </Magnetic>
          <Magnetic className="inline-flex">
            <Link
              href="/consilium"
              className="inline-flex w-full items-center justify-center rounded-full border border-warm-gold/50 bg-warm-gold/[0.06] px-8 py-3.5 text-sm font-medium uppercase tracking-[0.2em] text-warm-gold transition-all hover:border-warm-gold hover:bg-warm-gold/10 hover:shadow-[0_14px_44px_-14px_rgba(212,175,55,0.5)] sm:w-auto"
            >
              Join the Consilium
            </Link>
          </Magnetic>
        </m.div>

        <m.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-6 text-xs font-light tracking-wide text-text-gray/60 sm:text-sm"
        >
          Read the playbook. Practice it inside the community.
        </m.p>
      </div>

      {/* Scroll cue, desktop only. */}
      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.3 }}
        className="pointer-events-none absolute bottom-6 left-1/2 hidden -translate-x-1/2 sm:block"
        aria-hidden
      >
        <div className="h-12 w-px animate-pulse bg-gradient-to-b from-warm-gold/60 to-transparent" />
      </m.div>
    </section>
  );
}
