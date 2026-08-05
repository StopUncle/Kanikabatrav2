"use client";

import { m } from "framer-motion";

interface TestimonialProps {
  /** Real testimonial from the admin-managed pool. Falls back to the
   *  original reader quote when the pool has nothing quotable. */
  quote?: string | null;
  author?: string | null;
  role?: string | null;
}

export default function Testimonial({ quote, author, role }: TestimonialProps) {
  const displayQuote =
    quote ||
    "She doesn't teach you to play nice, she teaches you to play smart. This book fundamentally changed how I navigate power dynamics in every aspect of my life.";
  const displayAuthor = quote ? author || "Consilium Member" : "Verified Reader";
  return (
    <section className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent-burgundy/10 to-transparent" />

      <m.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto text-center relative z-10"
      >
        {/* Large Quote Mark */}
        <div className="text-accent-burgundy/20 text-6xl sm:text-8xl lg:text-9xl font-serif absolute -top-6 sm:-top-8 lg:-top-10 left-1/2 transform -translate-x-1/2">
          &ldquo;
        </div>

        <blockquote className="relative">
          <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light text-text-light italic leading-relaxed mb-6 sm:mb-8 px-4">
            {displayQuote}
          </p>
          <footer className="text-accent-gold tracking-[0.2em] sm:tracking-[0.3em] uppercase text-xs sm:text-sm">
            {displayAuthor}
            {quote && role ? (
              <span className="text-text-gray/70 normal-case tracking-normal">
                {" "}
                &middot; {role}
              </span>
            ) : null}
          </footer>
        </blockquote>
      </m.div>
    </section>
  );
}
