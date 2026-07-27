import Image from "next/image";
import Link from "next/link";
import { SOCIAL_METRICS } from "@/lib/constants";

export default function HeroV2() {
  return (
    <section className="relative min-h-[calc(100vh-5rem)] flex items-center pt-8 pb-16 sm:pt-12 sm:pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-10 lg:gap-16 items-center">
        {/* Left: copy */}
        <div className="text-center lg:text-left">
          {/* Proof strip — above fold, tight, weight-bearing */}
          <div className="inline-flex items-center gap-3 mb-6 sm:mb-8 px-4 py-2 rounded-full border border-accent-gold/25 bg-deep-black/40 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-gold animate-pulse" />
            <span className="text-accent-gold text-[11px] sm:text-xs tracking-[0.25em] uppercase font-medium">
              {SOCIAL_METRICS.combined.totalFollowers} followers ·{" "}
              {SOCIAL_METRICS.combined.totalViews} views
            </span>
          </div>

          {/* ONE dominant headline — no competing italic rotator */}
          <h1 className="font-serif font-light text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] leading-[0.95] tracking-tight mb-6 sm:mb-8">
            <span className="block text-text-light">The strategy</span>
            <span className="block gradient-text">they don&apos;t teach you.</span>
          </h1>

          <p className="text-text-gray text-base sm:text-lg md:text-xl max-w-xl lg:max-w-lg mx-auto lg:mx-0 mb-8 sm:mb-10 leading-relaxed">
            Dark psychology, power dynamics, and the playbook being run on you
            right now — taught by a clinically diagnosed sociopath.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start items-stretch sm:items-center">
            <Link
              href="/book"
              className="btn-primary rounded-full text-white inline-flex items-center justify-center px-7 py-4 text-sm sm:text-base font-medium tracking-wide"
            >
              Read the Book — $24.99
            </Link>
            <Link
              href="/quiz"
              className="inline-flex items-center justify-center px-7 py-4 text-sm sm:text-base font-medium tracking-wide rounded-full border border-accent-gold/40 text-accent-gold hover:bg-accent-gold/10 transition-colors"
            >
              Take the Free Quiz
            </Link>
          </div>

          {/* As seen on — credibility close to the CTA */}
          <div className="mt-10 sm:mt-12 pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-center gap-3 sm:gap-6 justify-center lg:justify-start">
            <span className="text-[10px] sm:text-xs tracking-[0.3em] uppercase text-text-gray/70">
              As featured on
            </span>
            <div className="flex items-center gap-4 sm:gap-6 text-text-gray/80">
              <span className="text-sm sm:text-base font-serif italic">
                LADbible
              </span>
              <span className="text-text-gray/30">·</span>
              <span className="text-sm sm:text-base font-serif italic">
                Unilad
              </span>
              <span className="text-text-gray/30">·</span>
              <span className="text-sm sm:text-base font-serif italic">
                Yahoo
              </span>
            </div>
          </div>
        </div>

        {/* Right: book as visual anchor */}
        <div className="relative flex items-center justify-center lg:justify-end">
          <div className="relative w-[220px] sm:w-[280px] lg:w-[340px] xl:w-[380px] aspect-[2/3]">
            {/* Glow behind the book — pure CSS, no JS dependency */}
            <div className="absolute -inset-10 bg-gradient-radial from-accent-burgundy/30 via-accent-burgundy/5 to-transparent blur-2xl" />
            <div className="absolute -inset-6 bg-gradient-radial from-accent-gold/20 via-transparent to-transparent blur-xl" />

            <div className="relative w-full h-full animate-float">
              <Image
                src="/books/book-cover.webp"
                alt="Sociopathic Dating Bible — A Cure For Empathy"
                fill
                priority
                sizes="(max-width: 1024px) 280px, 380px"
                className="object-contain drop-shadow-[0_25px_50px_rgba(114,33,57,0.5)]"
              />
            </div>

            {/* Floating pill tag */}
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-deep-black/80 border border-accent-gold/30 backdrop-blur-sm whitespace-nowrap">
              <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-accent-gold">
                70,000 words · 17 chapters
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
