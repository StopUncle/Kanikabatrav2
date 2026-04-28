"use client";

import Link from "next/link";
import { m } from "framer-motion";
import { Check, ShieldCheck, ArrowRight } from "lucide-react";
import FloatingConsiliumSeal from "@/components/consilium/FloatingConsiliumSeal";

/**
 * Homepage section that pitches The Consilium with the same energy the
 * book gets sold with: pre-headline credential, sharp headline, concrete
 * features in a value stack, real testimonial, anchor pricing, and a
 * matching guarantee.
 *
 * Visual structure mirrors BookShowcase exactly:
 *   - LEFT column: a large floating animated brand object — for the
 *     book that's the 3D levitating cover. For the Consilium it's the
 *     ConsiliumSeal medallion, scaled up, with a slow rotation, a
 *     pulsing halo, and four cardinal-point orbiting particles. Same
 *     "this section has its own object" treatment so visitors know
 *     they've crossed into a new pillar at a glance.
 *   - RIGHT column: entire pitch + offer card (credential, headline,
 *     body, feature blocks, testimonial, value stack, CTA, guarantee).
 *
 * Words "community" and "membership" appear front-and-centre so the
 * brand name "The Consilium" doesn't have to do the explaining alone.
 */
export default function ConsiliumOverview() {
  // What's inside, with concrete numbers and dollar anchors.
  const inside = [
    {
      title: "The Sociopathic Dating Bible",
      detail:
        "Premium edition included — 70,000 words, 15 chapters + 2 bonus chapters on narcissists & avoidants",
      value: "$24.99",
    },
    {
      title: "The Dark Mirror Simulator",
      detail:
        "20 branching scenarios · 342 scenes · 129 endings · 83 manipulation tactics · 79 red flags catalogued",
      value: "Members only",
    },
    {
      title: "Daily Psychology Drops",
      detail:
        "60-card rotating bank — fresh insight every morning. New tactics, power dynamics, real patterns",
      value: "$19/mo elsewhere",
    },
    {
      title: "Voice Notes from Kanika",
      detail:
        "Raw, unfiltered audio dropped when something needs to be said. Not on a schedule — when it matters",
      value: "Members only",
    },
    {
      title: "Discussion Threads, Forum & Chat",
      detail:
        "28 themed weekday prompts · 6 forum categories · live chat with members navigating the same patterns",
      value: "Community access",
    },
    {
      title: "Member-Only Book Pricing",
      detail:
        "If you ever want extra copies of the book — $9.99 each instead of $24.99",
      value: "Save 60%",
    },
  ];

  return (
    <section
      id="consilium"
      className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden relative"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
          {/* LEFT — the section's brand object. Mirrors the floating
              book on BookShowcase: large, animated, gives the section a
              clear visual anchor a visitor can recognise from a thumb-
              flick scroll. */}
          <m.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex justify-center"
          >
            <FloatingConsiliumSeal label="Private Membership" />
          </m.div>

          {/* RIGHT — full pitch column. Single column containing every
              pitch beat (credential → headline → body → features →
              testimonial → value stack → CTA → guarantee), mirroring
              BookShowcase's right column. */}
          <m.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <p className="text-warm-gold uppercase tracking-[0.2em] text-xs sm:text-sm mb-3">
                The Consilium · Private Community + Membership
              </p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light mb-4 sm:mb-6 leading-tight">
                <span className="text-text-light">
                  Where Dark Psychology
                </span>
                <br />
                <span
                  style={{
                    background:
                      "linear-gradient(135deg, #f3d98a 0%, #d4af37 50%, #9c7a1f 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Stops Being Theory
                </span>
              </h2>
              <p className="text-text-gray text-base sm:text-lg leading-relaxed">
                The book teaches you the patterns. The Consilium is where
                you <strong className="text-text-light">practice them</strong>{" "}
                — every day, with members navigating the same situations
                you are. Private. Moderated. Built for women done being
                the ones who get played.
              </p>
            </div>

            {/* Feature blocks */}
            <div className="space-y-3">
              {[
                "342 branching scenes inside the Dark Mirror Simulator — every choice has a consequence",
                "60 daily psychology drops + 28 themed discussion prompts in your feed",
                "Voice notes from Kanika — raw insights you won't hear anywhere else",
                "Premium Sociopathic Dating Bible bundled in, plus member-only $9.99 pricing on extras",
              ].map((feature, index) => (
                <m.div
                  key={index}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 bg-gradient-to-r from-deep-burgundy/20 to-deep-navy/10 border-l-2 sm:border-l-4 border-warm-gold hover:translate-x-1 sm:hover:translate-x-2 transition-transform"
                >
                  <Check
                    className="text-warm-gold mt-0.5 shrink-0"
                    size={20}
                  />
                  <span className="text-text-light">{feature}</span>
                </m.div>
              ))}
            </div>

            {/* Testimonial */}
            <div className="glass-card p-4 border-l-4 border-warm-gold">
              <p className="text-text-light italic text-base sm:text-lg leading-relaxed">
                &ldquo;Life changing.&rdquo;
              </p>
              <p className="text-warm-gold text-sm mt-2">
                — Inner Circle member
              </p>
            </div>

            {/* Offer card — value stack with anchor pricing */}
            <div className="bg-gradient-to-r from-deep-burgundy/30 via-deep-black/70 to-deep-navy/40 p-4 sm:p-6 lg:p-8 rounded-lg border border-warm-gold/30">
              <p className="text-warm-gold uppercase tracking-[0.2em] text-xs mb-4">
                What&apos;s Inside the Membership
              </p>

              <div className="space-y-3 mb-6">
                {inside.map((item) => (
                  <div
                    key={item.title}
                    className="flex items-start justify-between gap-3 p-3 rounded-lg bg-white/[0.03] border border-white/[0.06]"
                  >
                    <div className="flex items-start gap-3 min-w-0">
                      <Check
                        className="text-warm-gold mt-0.5 shrink-0"
                        size={16}
                      />
                      <div className="min-w-0">
                        <p className="text-text-light text-sm font-medium">
                          {item.title}
                        </p>
                        <p className="text-text-gray text-xs mt-0.5 leading-relaxed">
                          {item.detail}
                        </p>
                      </div>
                    </div>
                    <span className="text-text-gray text-xs whitespace-nowrap shrink-0">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex items-baseline justify-between mb-6 pt-4 border-t border-white/10">
                <div>
                  <span className="text-text-gray text-sm">
                    Premium edition value:{" "}
                  </span>
                  <span className="text-text-gray text-sm">
                    $24.99 + community
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-3xl font-light gradient-text-gold tabular-nums">
                    $29
                  </span>
                  <span className="text-text-gray/70 text-sm font-light ml-1">
                    /mo
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                <Link
                  href="/consilium"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 sm:py-4 px-6 rounded-full bg-warm-gold text-deep-black text-sm sm:text-base font-semibold tracking-wide transition-all hover:bg-warm-gold/90 hover:shadow-[0_12px_40px_-12px_rgba(212,175,55,0.55)]"
                >
                  Join the Community — $29/mo
                  <ArrowRight size={16} />
                </Link>

                <p className="text-[11px] text-text-gray/70 text-center leading-relaxed">
                  Instant access · cancel anytime · no application required
                </p>

                <div className="flex items-center justify-center gap-2 text-text-gray text-xs">
                  <ShieldCheck size={14} className="text-warm-gold" />
                  <span>
                    Spend 7 days inside. If it&apos;s not the most useful
                    $29 you&apos;ve spent, full refund.
                  </span>
                </div>

                <div className="text-center pt-2 border-t border-white/5">
                  <p className="text-[11px] text-text-gray/60">
                    Or grab the{" "}
                    <Link
                      href="/book"
                      className="text-warm-gold/90 hover:text-warm-gold transition-colors underline-offset-2 hover:underline"
                    >
                      book + 1 month bundle for $39
                    </Link>
                    .
                  </p>
                </div>
              </div>
            </div>
          </m.div>
        </div>
      </div>
    </section>
  );
}
