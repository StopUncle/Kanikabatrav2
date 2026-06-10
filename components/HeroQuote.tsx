"use client";

import { useState, useEffect } from "react";
import { m, AnimatePresence } from "framer-motion";
import { SITE_CONFIG } from "@/lib/constants";

/**
 * The rotating viral quote, split out of the hero so the rest of the
 * hero (headline, CTAs) can be a static server component that paints
 * immediately. This still server-renders the first quote (a client
 * component's initial render is included in the SSR HTML), so there's
 * no blank flash; it only starts rotating after hydration. The wrapper
 * height is reserved (h-14 / h-16) so the rotation never shifts layout.
 */
export default function HeroQuote() {
  const [quoteIndex, setQuoteIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % SITE_CONFIG.viralQuotes.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-14 sm:h-16 mb-10 sm:mb-12 flex items-center justify-center">
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
    </div>
  );
}
