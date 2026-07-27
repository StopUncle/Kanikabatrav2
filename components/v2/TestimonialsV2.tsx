import { TESTIMONIALS } from "@/lib/constants";

export default function TestimonialsV2() {
  return (
    <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent-burgundy/[0.08] to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-14 sm:mb-16">
          <p className="text-accent-gold uppercase tracking-[0.3em] text-xs sm:text-sm mb-4">
            What Readers Say
          </p>
          <h2 className="font-serif font-light text-4xl sm:text-5xl lg:text-6xl text-text-light tracking-tight">
            The <span className="gradient-text">response</span> speaks for itself.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          {TESTIMONIALS.map((t) => (
            <blockquote
              key={t.id}
              className="group relative p-6 sm:p-8 rounded-2xl bg-deep-black/60 border border-white/[0.06] hover:border-accent-gold/30 transition-colors duration-500"
            >
              <div className="text-accent-burgundy/40 text-5xl font-serif leading-none mb-3 select-none">
                &ldquo;
              </div>

              <p className="text-text-light/90 text-base sm:text-[17px] leading-relaxed font-light mb-6">
                {t.text}
              </p>

              <footer className="flex items-center justify-between pt-4 border-t border-white/[0.05]">
                <cite className="not-italic text-accent-gold text-[11px] sm:text-xs tracking-[0.25em] uppercase">
                  {t.author}
                </cite>
                <div
                  className="flex gap-0.5 text-accent-gold"
                  aria-label={`${t.rating} out of 5`}
                >
                  {Array.from({ length: t.rating }).map((_, idx) => (
                    <svg
                      key={idx}
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 16.8 5.8 21.3l2.4-7.4L2 9.4h7.6z" />
                    </svg>
                  ))}
                </div>
              </footer>
            </blockquote>
          ))}
        </div>

        {/* Press strip under testimonials — reinforces credibility */}
        <div className="mt-14 sm:mt-16 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 pt-8 border-t border-white/[0.05]">
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-text-gray/60">
            Press coverage
          </span>
          <div className="flex items-center gap-5 sm:gap-8 text-text-gray/80">
            <span className="font-serif italic text-base sm:text-lg">LADbible</span>
            <span className="text-text-gray/25">·</span>
            <span className="font-serif italic text-base sm:text-lg">Unilad</span>
            <span className="text-text-gray/25">·</span>
            <span className="font-serif italic text-base sm:text-lg">Yahoo</span>
          </div>
        </div>
      </div>
    </section>
  );
}
