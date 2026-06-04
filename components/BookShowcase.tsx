"use client";

import { useState } from "react";
import { m } from "framer-motion";
import { Check, ShieldCheck, Bell, ArrowDown } from "lucide-react";
import StripeButton from "./StripeButton";
import PresaleModal from "./PresaleModal";
import CountdownTimer from "./CountdownTimer";
import Reveal from "@/components/motion/Reveal";
import { BOOK_INFO } from "@/lib/constants";

/**
 * Pillar One, the book. v2 keeps the signature 3D levitating cover and
 * the full commerce path (Stripe checkout, the two book + Consilium
 * bundles, presale fallback) untouched, and tightens everything around
 * them:
 *   - a bracketed "Pillar One" header so it reads as a clear act, in
 *     symmetry with the Consilium's "Pillar Two" header below;
 *   - the repeated "field guide / practice ground" sentence (which also
 *     appears in the hero and the Consilium block) is reduced to a single
 *     quiet cross-link down to the membership;
 *   - the offer card's background and border are restored. The previous
 *     build referenced `burgundy`, `sapphire`, and `gold`, none of which
 *     exist in the theme (the tokens are accent-burgundy / accent-sapphire
 *     / warm-gold), so the card rendered flat with no surface at all.
 */
export default function BookShowcase() {
  const [showPresaleModal, setShowPresaleModal] = useState(false);

  const handlePresaleSignup = async (
    email: string,
    option: "kdp" | "premium" | "both",
  ) => {
    const response = await fetch("/api/presale", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, option }),
    });

    if (!response.ok) {
      throw new Error("Failed to join presale list");
    }

    return response.json();
  };

  const launchDate = new Date(BOOK_INFO.expectedLaunchDate);
  const formattedDate = launchDate.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
  });

  const totalValue = BOOK_INFO.premiumBonuses.reduce(
    (sum, b) => sum + b.value,
    0,
  );

  return (
    <section
      id="book"
      className="relative overflow-hidden px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-28"
    >
      <div className="mx-auto max-w-7xl">
        {/* Pillar One header. Rose accent (the book palette) to set it
            apart from the warm-gold Consilium pillar that follows. */}
        <Reveal className="mb-12 text-center sm:mb-16">
          <div className="flex items-center justify-center gap-4">
            <span className="h-px w-16 bg-gradient-to-r from-transparent to-accent-gold/50 sm:w-24" />
            <span className="whitespace-nowrap text-[10px] font-light uppercase tracking-[0.4em] text-accent-gold/80 sm:text-xs">
              Pillar One · The Field Guide
            </span>
            <span className="h-px w-16 bg-gradient-to-l from-transparent to-accent-gold/50 sm:w-24" />
          </div>
        </Reveal>

        <div className="grid grid-cols-1 items-center gap-8 sm:gap-12 lg:grid-cols-2 lg:gap-16">
          {/* 3D levitating cover. Opacity-only entrance so SSR matches the
              final layout and the slide is never counted as a shift. */}
          <m.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex justify-center"
          >
            <div className="relative mx-auto h-[360px] w-64 max-w-full animate-levitate sm:h-[400px] sm:w-72 md:h-[450px] md:w-80">
              <div className="absolute inset-0 book-3d">
                <div className="translateZ-20 absolute inset-0 flex transform flex-col items-center justify-center rounded-r-2xl book-cover-gradient p-4 shadow-2xl sm:p-6 md:p-8">
                  <h3 className="mb-2 text-center text-lg font-light leading-tight text-text-light sm:mb-4 sm:text-xl md:text-2xl">
                    SOCIOPATHIC
                    <br />
                    DATING
                    <br />
                    BIBLE
                  </h3>
                  <div className="mb-2 h-0.5 w-12 bg-gradient-to-r from-transparent via-warm-gold to-transparent sm:mb-4 sm:w-16 md:w-20" />
                  <p className="mb-2 text-[10px] italic tracking-[0.15em] text-text-gray sm:mb-4 sm:text-xs sm:tracking-[0.2em]">
                    A Cure For Empathy
                  </p>
                  <p className="gradient-text-gold text-sm uppercase tracking-[0.2em] sm:text-base sm:tracking-[0.3em] md:text-lg md:tracking-[0.4em]">
                    Kanika Batra
                  </p>
                </div>

                <div className="translateZ-24 rotateY-90 absolute left-0 top-0 h-full w-8 transform rounded-l-md bg-gradient-to-r from-deep-black to-deep-burgundy sm:w-10 md:w-12">
                  <div className="flex h-full items-center justify-center">
                    <span className="rotate-90 transform whitespace-nowrap text-[10px] tracking-[0.1em] text-warm-gold sm:text-xs sm:tracking-[0.2em]">
                      SOCIOPATHIC DATING BIBLE
                    </span>
                  </div>
                </div>

                <div className="translateZ-10 absolute inset-0 transform rounded-r-2xl bg-black/50 blur-xl" />
              </div>
            </div>
          </m.div>

          {/* Pitch column. */}
          <Reveal delay={0.1} className="space-y-8">
            <div>
              <p className="mb-3 text-xs uppercase tracking-[0.2em] text-accent-burgundy sm:text-sm">
                As featured on LADbible, Unilad &amp; Yahoo
              </p>
              <h2 className="mb-4 text-3xl font-light sm:mb-6 sm:text-4xl lg:text-5xl">
                <span className="gradient-text">The Dating Playbook</span>
                <br />
                <span className="text-text-light">
                  You Were Never Meant to See
                </span>
              </h2>
              <p className="text-base leading-relaxed text-text-gray sm:text-lg">
                {BOOK_INFO.description}
              </p>
            </div>

            <div className="space-y-3">
              {BOOK_INFO.features.slice(0, 4).map((feature, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 border-l-2 bg-gradient-to-r from-accent-burgundy/10 to-accent-sapphire/5 p-3 transition-transform hover:translate-x-1 sm:gap-4 sm:border-l-4 sm:p-4 sm:hover:translate-x-2"
                  style={{ borderColor: "rgba(212,175,55,0.8)" }}
                >
                  <Check className="mt-0.5 shrink-0 text-accent-gold" size={20} />
                  <span className="text-text-light">{feature}</span>
                </div>
              ))}
            </div>

            {/* Social proof snippet */}
            <div className="glass-card border-l-4 border-warm-gold p-4">
              <p className="text-sm italic text-text-light sm:text-base">
                &ldquo;This book decoded the game I didn&apos;t even know I was
                losing. Within 3 weeks I went from being overlooked to being
                pursued.&rdquo;
              </p>
              <p className="mt-2 text-sm text-accent-gold">
                Sarah K., Investment Banker
              </p>
            </div>

            {/* Offer card. Surface restored with real theme tokens. */}
            <div className="sheen relative rounded-2xl border border-warm-gold/25 bg-gradient-to-br from-accent-burgundy/20 via-deep-black/60 to-accent-sapphire/10 p-4 sm:p-6 lg:p-8">
              {BOOK_INFO.isPresale && (
                <div className="mb-6 space-y-4">
                  <div className="rounded-lg border border-accent-gold/30 bg-accent-gold/10 p-3">
                    <div className="mb-2 flex items-center gap-2 text-accent-gold">
                      <Bell size={20} />
                      <span className="font-semibold">
                        Presale - Launching {formattedDate}
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <CountdownTimer targetDate={BOOK_INFO.expectedLaunchDate} />
                  </div>
                </div>
              )}

              <p className="mb-4 text-xs uppercase tracking-[0.2em] text-warm-gold">
                Premium Edition. What You Get
              </p>

              <div className="mb-6 space-y-3">
                {BOOK_INFO.premiumBonuses.map((bonus, i) => (
                  <div
                    key={i}
                    className="flex items-start justify-between gap-3 rounded-lg border border-white/[0.06] bg-white/[0.03] p-3"
                  >
                    <div className="flex items-start gap-3">
                      <Check
                        className="mt-0.5 shrink-0 text-accent-gold"
                        size={16}
                      />
                      <div>
                        <p className="text-sm font-medium text-text-light">
                          {bonus.name}
                        </p>
                        <p className="mt-0.5 text-xs text-text-gray">
                          {bonus.desc}
                        </p>
                      </div>
                    </div>
                    <span className="whitespace-nowrap text-sm text-text-gray">
                      ${bonus.value}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mb-6 flex items-baseline justify-between border-t border-white/10 pt-4">
                <div>
                  <span className="text-sm text-text-gray">Total value: </span>
                  <span className="text-sm text-text-gray line-through">
                    ${totalValue.toFixed(2)}
                  </span>
                </div>
                <div className="text-right">
                  <span className="gradient-text-gold text-3xl font-light tabular-nums">
                    ${BOOK_INFO.price}
                  </span>
                </div>
              </div>

              {BOOK_INFO.isPresale ? (
                <div className="space-y-4">
                  <button
                    onClick={() => setShowPresaleModal(true)}
                    className="btn-primary w-full rounded-full py-3 text-center text-sm font-semibold tracking-wide text-white sm:py-4 sm:text-base"
                  >
                    Join Presale List
                  </button>
                  <p className="text-center text-xs text-text-gray/70">
                    Get notified when the book launches + exclusive presale
                    pricing
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <StripeButton
                    priceKey="BOOK"
                    label="Get Instant Access"
                    price="$24.99"
                    icon="card"
                  />

                  {/* Book + Consilium bundles, matched to the book page so
                      the landing page captures the same upsell. */}
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <StripeButton
                      priceKey="BOOK_CONSILIUM_1MO"
                      label="+ 1 month membership"
                      price="$39"
                      icon="none"
                      className="flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-full border border-warm-gold/40 bg-warm-gold/[0.04] px-5 py-3 text-sm font-medium tracking-wider text-warm-gold transition-all duration-300 hover:border-warm-gold/70 hover:bg-warm-gold/[0.08] disabled:opacity-50"
                    />
                    <StripeButton
                      priceKey="BOOK_CONSILIUM_3MO"
                      label="+ 3 months · save $33"
                      price="$79"
                      icon="none"
                      className="flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-full border border-warm-gold/70 bg-warm-gold/10 px-5 py-3 text-sm font-semibold tracking-wider text-warm-gold shadow-[0_0_20px_-8px_rgba(212,175,55,0.4)] transition-all duration-300 hover:border-warm-gold hover:bg-warm-gold/20 disabled:opacity-50"
                    />
                  </div>

                  <p className="-mt-1 text-center text-[11px] leading-relaxed text-text-gray/70">
                    Bundle covers your first month or three. Then $29/mo · cancel
                    anytime.
                  </p>

                  {/* Single quiet cross-link to the membership pillar. */}
                  <div className="border-y border-warm-gold/10 py-3 text-center">
                    <a
                      href="#consilium"
                      className="group inline-flex items-center gap-2 text-xs font-light tracking-wide text-warm-gold/90 transition-colors hover:text-warm-gold sm:text-sm"
                    >
                      See what members do with it inside the Consilium
                      <ArrowDown
                        size={13}
                        className="transition-transform group-hover:translate-y-0.5"
                      />
                    </a>
                  </div>

                  {/* Guarantee */}
                  <div className="flex items-center justify-center gap-2 text-xs text-text-gray">
                    <ShieldCheck size={14} className="text-accent-gold" />
                    <span>
                      Read 3 chapters. If it doesn&apos;t change how you see
                      dating, full refund.
                    </span>
                  </div>

                  {/* Amazon secondary */}
                  <div className="border-t border-white/5 pt-2 text-center">
                    <a
                      href={BOOK_INFO.kdpLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-text-gray transition-colors hover:text-text-light"
                    >
                      Prefer Kindle? Get it on Amazon for ${BOOK_INFO.kdpPrice}{" "}
                      &rarr;
                    </a>
                  </div>
                </div>
              )}
            </div>
          </Reveal>
        </div>
      </div>

      <PresaleModal
        isOpen={showPresaleModal}
        onClose={() => setShowPresaleModal(false)}
        onEmailSubmit={handlePresaleSignup}
      />
    </section>
  );
}
