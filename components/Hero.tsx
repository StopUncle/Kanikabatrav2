import Link from "next/link";
import { SOCIAL_METRICS } from "@/lib/constants";
import HeroQuote from "./HeroQuote";

/**
 * Hero, first paint on /.
 *
 * Server component on purpose. The previous version was "use client" and
 * every element (including the H1, the LCP element) started at framer-
 * motion opacity:0 with delays up to 1.2s, so the headline was invisible
 * until hydration: the exact cause of the bad field Core Web Vitals
 * (LCP ~4.1s render-delay-dominated, while the lab trace was ~1.7s).
 *
 * Now the headline, CTAs, and copy are static server-rendered HTML that
 * paint immediately. Only the rotating quote (which genuinely needs an
 * interval) is a small client child. Height uses 100dvh so the mobile
 * URL-bar collapse doesn't resize the fold and shift everything below.
 */
export default function Hero() {
  return (
    <section className="hero-viewport relative min-h-[calc(100dvh-5rem)] flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-4 pb-24 sm:pb-28">
      <div className="max-w-5xl mx-auto text-center w-full">
        {/* Audience signal, kept subtle. warm-gold (true #d4af37 gold)
            ties the hero CTAs visually to the Consilium surfaces below. */}
        <p className="text-warm-gold/70 uppercase tracking-[0.35em] text-[10px] sm:text-xs mb-6">
          {SOCIAL_METRICS.combined.totalFollowers} followers
          <span className="mx-3 text-warm-gold/40">·</span>
          {SOCIAL_METRICS.combined.totalViews} views
        </p>

        <h1 className="font-light leading-[1.05] mb-6 sm:mb-8">
          <span className="block gradient-text animate-gradient text-4xl sm:text-6xl md:text-7xl lg:text-8xl">
            The Psychology of Power
          </span>
          <span className="block text-text-light text-xl sm:text-2xl md:text-3xl mt-3 sm:mt-4 font-extralight tracking-wide">
            The strategy they don&apos;t teach you
          </span>
        </h1>

        <HeroQuote />

        {/* Two primary CTAs. Book first, Consilium second; sibling sizing
            so they read as a pair, not primary + afterthought. */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center max-w-md sm:max-w-none mx-auto">
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
        </div>

        <p className="text-text-gray/60 text-xs sm:text-sm mt-6 font-light tracking-wide">
          Read the playbook. Practice it inside the community.
        </p>
      </div>

      {/* Scroll indicator, desktop only, pinned below the CTA row. */}
      <div
        className="hidden sm:block absolute bottom-6 left-1/2 -translate-x-1/2 pointer-events-none"
        aria-hidden
      >
        <div className="w-px h-12 bg-gradient-to-b from-warm-gold/60 to-transparent animate-pulse" />
      </div>
    </section>
  );
}
