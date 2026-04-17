"use client";

import { useState, useEffect } from "react";
import { m, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { SITE_CONFIG, SOCIAL_METRICS } from "@/lib/constants";

export default function Hero() {
  const [quoteIndex, setQuoteIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % SITE_CONFIG.viralQuotes.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="hero-viewport min-h-screen flex items-center justify-center pt-20 pb-20 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto text-center w-full">
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-accent-burgundy uppercase tracking-[0.2em] sm:tracking-[0.3em] lg:tracking-[0.4em] text-xs sm:text-sm mb-4 sm:mb-6 animate-glow px-2">
            <span className="block sm:inline">
              {SOCIAL_METRICS.combined.totalFollowers} Followers
            </span>
            <span className="hidden sm:inline mx-1 sm:mx-2">&middot;</span>
            <span className="block sm:inline">
              {SOCIAL_METRICS.combined.totalViews} Views
            </span>
          </p>
        </m.div>

        <m.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light leading-tight mb-6 sm:mb-8"
        >
          <span className="block gradient-text animate-gradient text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl">
            The Psychology of Power
          </span>
          <span className="block text-text-light text-2xl sm:text-3xl md:text-4xl mt-2">
            The strategy they don&apos;t teach you
          </span>
        </m.h1>

        {/* Rotating Quotes — now outcome-driven */}
        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="h-16 mb-8 sm:mb-12"
        >
          <AnimatePresence mode="wait">
            <m.p
              key={quoteIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="text-gold-400 text-lg sm:text-xl md:text-2xl italic font-light px-4"
            >
              &quot;{SITE_CONFIG.viralQuotes[quoteIndex]}&quot;
            </m.p>
          </AnimatePresence>
        </m.div>

        <m.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-text-gray text-base sm:text-lg md:text-xl max-w-2xl lg:max-w-3xl mx-auto mb-8 sm:mb-12 font-light px-4"
        >
          A private council for people done being the ones who get played.
          Dark psychology, power dynamics, and the strategy behind it all —
          taught by a clinically diagnosed sociopath.
        </m.p>

        <m.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center px-4"
        >
          <Link
            href="/consilium"
            className="btn-primary rounded-full text-white inline-block px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base w-full sm:w-auto max-w-xs"
          >
            Join The Consilium
          </Link>
          <Link
            href="/quiz"
            className="btn-secondary rounded-full inline-block px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base w-full sm:w-auto max-w-xs"
          >
            Take The Free Quiz
          </Link>
          <Link
            href="/book"
            className="rounded-full inline-block px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base w-full sm:w-auto max-w-xs border border-accent-gold/50 text-accent-gold hover:bg-accent-gold/10 transition-colors"
          >
            Read The Book
          </Link>
        </m.div>

        {/* Scroll Indicator */}
        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-5 sm:bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-0.5 h-16 bg-gradient-to-b from-accent-gold to-transparent animate-pulse" />
        </m.div>
      </div>
    </section>
  );
}
