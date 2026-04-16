"use client";

/**
 * Test page for the 12-tier member badge system.
 *
 * Not linked from anywhere in the main site. Visit /test-badges
 * directly to preview and iterate on the badge designs.
 */

import MemberBadge, {
  BADGE_TIERS,
} from "@/components/consilium/MemberBadge";
import BackgroundEffects from "@/components/BackgroundEffects";
import Header from "@/components/Header";

export default function TestBadgesPage() {
  return (
    <>
      <BackgroundEffects />
      <Header />
      <main className="relative z-10 min-h-screen pt-28 pb-20">
        <div className="max-w-6xl mx-auto px-4">
          {/* Heading */}
          <div className="text-center mb-16">
            <p className="text-warm-gold/90 uppercase tracking-[0.3em] text-sm mb-4">
              Consilium · Tenure
            </p>
            <h1
              className="text-5xl md:text-6xl font-extralight tracking-wider uppercase mb-4"
              style={{
                background:
                  "linear-gradient(135deg, #f3d98a 0%, #d4af37 50%, #9c7a1f 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              The Twelve Ranks
            </h1>
            <div className="w-16 h-px bg-warm-gold/50 mx-auto mb-6" />
            <p className="text-text-gray max-w-2xl mx-auto font-light leading-relaxed">
              Every month you stay inside the Consilium, your seal climbs a
              rank. A full year earns the Queen — and there is no rank beyond
              her. Time in the council is the only currency.
            </p>
          </div>

          {/* Feature hero: Queen (tier 12) — largest, centred */}
          <section className="mb-20">
            <div className="max-w-2xl mx-auto text-center p-10 bg-deep-black/50 backdrop-blur-sm border border-warm-gold/30 rounded-2xl">
              <div className="flex justify-center mb-6">
                <MemberBadge tier={12} size="xl" />
              </div>
              <p className="text-warm-gold/90 uppercase tracking-[0.3em] text-xs mb-2">
                {BADGE_TIERS[11].monthLabel} · Rank XII
              </p>
              <h2 className="text-3xl font-extralight tracking-wider uppercase text-text-light mb-3">
                {BADGE_TIERS[11].name}
              </h2>
              <p className="text-text-gray font-light max-w-md mx-auto">
                {BADGE_TIERS[11].tagline}
              </p>
            </div>
          </section>

          {/* Full grid: all 12 tiers */}
          <section className="mb-16">
            <div className="text-center mb-10">
              <p className="text-warm-gold text-xs uppercase tracking-[0.3em] mb-2">
                The Ladder
              </p>
              <h2 className="text-2xl font-extralight tracking-wider uppercase text-text-light">
                All Twelve Ranks
              </h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
              {BADGE_TIERS.map((t) => (
                <div
                  key={t.tier}
                  className="group bg-deep-black/40 backdrop-blur-sm border border-warm-gold/15 rounded-2xl p-6 hover:border-warm-gold/40 hover:shadow-[0_8px_32px_-12px_rgba(212,175,55,0.25)] transition-all duration-300"
                >
                  <div className="flex justify-center mb-4">
                    <MemberBadge tier={t.tier} size="lg" />
                  </div>
                  <div className="text-center">
                    <p className="text-[10px] uppercase tracking-[0.25em] text-text-gray/60 mb-1">
                      {t.monthLabel} · Rank {t.numeral}
                    </p>
                    <p className="text-lg font-light tracking-[0.18em] uppercase text-warm-gold mb-2">
                      {t.name}
                    </p>
                    <p className="text-xs text-text-gray/80 font-light leading-relaxed">
                      {t.tagline}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Size showcase — one tier at each size for calibration */}
          <section className="mb-16">
            <div className="text-center mb-10">
              <p className="text-warm-gold text-xs uppercase tracking-[0.3em] mb-2">
                Size Showcase
              </p>
              <h2 className="text-2xl font-extralight tracking-wider uppercase text-text-light mb-2">
                The Queen at every size
              </h2>
              <p className="text-text-gray/70 text-sm">
                sm · md · lg · xl — for avatars, list badges, cards, and hero
                lockups.
              </p>
            </div>

            <div className="flex flex-wrap items-end justify-center gap-10 p-8 bg-deep-black/40 border border-warm-gold/15 rounded-2xl">
              <div className="flex flex-col items-center gap-2">
                <MemberBadge tier={12} size="sm" />
                <p className="text-xs text-text-gray/70 uppercase tracking-widest">
                  sm
                </p>
              </div>
              <div className="flex flex-col items-center gap-2">
                <MemberBadge tier={12} size="md" />
                <p className="text-xs text-text-gray/70 uppercase tracking-widest">
                  md
                </p>
              </div>
              <div className="flex flex-col items-center gap-2">
                <MemberBadge tier={12} size="lg" />
                <p className="text-xs text-text-gray/70 uppercase tracking-widest">
                  lg
                </p>
              </div>
              <div className="flex flex-col items-center gap-2">
                <MemberBadge tier={12} size="xl" />
                <p className="text-xs text-text-gray/70 uppercase tracking-widest">
                  xl
                </p>
              </div>
            </div>
          </section>

          {/* Inline usage preview — how they'll look next to member names */}
          <section>
            <div className="text-center mb-10">
              <p className="text-warm-gold text-xs uppercase tracking-[0.3em] mb-2">
                In Context
              </p>
              <h2 className="text-2xl font-extralight tracking-wider uppercase text-text-light mb-2">
                Beside a member&apos;s name
              </h2>
              <p className="text-text-gray/70 text-sm">
                How the badge reads when shown on feed posts, comments, and
                forum replies.
              </p>
            </div>

            <div className="max-w-lg mx-auto space-y-3 p-6 bg-deep-black/40 border border-warm-gold/15 rounded-2xl">
              {[1, 3, 6, 9, 11, 12].map((tier) => {
                const b = BADGE_TIERS[tier - 1];
                return (
                  <div
                    key={tier}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-warm-gold/5 transition-colors"
                  >
                    <MemberBadge tier={tier} size="sm" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline gap-2">
                        <p className="text-text-light font-light">
                          Anonymous member
                        </p>
                        <p className="text-[10px] uppercase tracking-[0.2em] text-warm-gold/80">
                          {b.name}
                        </p>
                      </div>
                      <p className="text-xs text-text-gray/70 truncate">
                        {b.tagline}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
