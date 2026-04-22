import Link from "next/link";
import { ArrowRight, Sparkles, Target, PlayCircle } from "lucide-react";
import SimulatorPreview from "./SimulatorPreview";

/**
 * The Consilium's flagship sales surface. Used on both the Consilium
 * landing (/consilium) and the site homepage (/), so the live
 * SimulatorPreview + the "Duolingo for dark psychology" framing is
 * reused without duplication.
 *
 * The `variant` prop controls the emphasis:
 *   - "homepage" — cold traffic. Leads with a "free demo · 10 min · no
 *     signup" chip, makes "Try it free" the primary CTA, keeps "Step
 *     inside" as the secondary.
 *   - "landing"  — warm traffic. Leads with the "the only place you can
 *     practice this" superlative and makes "Step Inside" the primary.
 *
 * Both variants render the same SimulatorPreview loop, the same depth
 * stats row, and the same three-track chip row. The surface is designed
 * to be the single most converting block on the site — everything else
 * is supporting material.
 */

type Variant = "homepage" | "landing";

type Props = {
  variant?: Variant;
};

export default function ConsiliumSimulatorTeaser({
  variant = "homepage",
}: Props) {
  const isHomepage = variant === "homepage";

  return (
    <section className="py-20 sm:py-24 px-4 relative">
      <div className="max-w-5xl mx-auto">
        <div className="relative overflow-hidden rounded-3xl border border-warm-gold/30 bg-gradient-to-br from-deep-burgundy/30 via-deep-black/70 to-deep-navy/40 backdrop-blur-sm">
          {/* Radial highlight behind the headline — pulls the eye up and
              sets the "flagship surface" tone. Pointer-events off so the
              gradient can't intercept clicks on mobile. */}
          <div
            aria-hidden
            className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-[540px] h-[540px] rounded-full"
            style={{
              background:
                "radial-gradient(closest-side, rgba(212,175,55,0.18), transparent 70%)",
            }}
          />

          <div className="relative p-6 sm:p-10 lg:p-12">
            <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
              {/* Eyebrow — variant-specific framing */}
              <div className="flex items-center gap-2 mb-5">
                <Sparkles
                  className="w-4 h-4 text-warm-gold"
                  strokeWidth={1.6}
                />
                <p className="text-warm-gold text-xs uppercase tracking-[0.3em]">
                  {isHomepage
                    ? "The Consilium · flagship"
                    : "The only place you can practice this"}
                </p>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extralight tracking-wider text-text-light mb-4">
                Duolingo for{" "}
                <span
                  style={{
                    background:
                      "linear-gradient(135deg, #f3d98a 0%, #d4af37 50%, #9c7a1f 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  dark psychology
                </span>
              </h2>

              <p className="text-text-gray text-base sm:text-lg font-light leading-relaxed mb-6 max-w-2xl">
                Books tell you what manipulation looks like. The Dark Mirror
                Simulator drops you inside it. Every scene is a choice. Every
                choice branches. Every ending shows you what a trained eye
                would have caught — and what it costs you if you missed it.
              </p>

              {/* Free-demo affordance chip — only on homepage. Signals that
                  there's a zero-friction way to actually feel the product
                  before any paywall. The chip is quiet so it doesn't
                  compete with the headline. */}
              {isHomepage && (
                <div className="inline-flex items-center gap-2 mb-8 px-4 py-1.5 rounded-full border border-warm-gold/25 bg-warm-gold/5 text-warm-gold/90">
                  <PlayCircle className="w-3.5 h-3.5" strokeWidth={1.8} />
                  <span className="text-[11px] uppercase tracking-[0.25em] font-light">
                    Free demo · 10 min · no signup
                  </span>
                </div>
              )}

              {/* Live preview — three real scenes auto-playing on a loop.
                  The viewer watches the optimal choice get picked, sees the
                  tactic reveal, hears the inner-voice line. Sells the
                  dopamine without spoiling the actual scenarios. */}
              <div className="w-full mb-10">
                <SimulatorPreview />
              </div>

              {/* Depth, as one narrative line.
                  The previous 4-card stat grid (30 / 526 / 83 / 79) read
                  as the generic "our product in numbers" SaaS slab and
                  added visual weight to an already busy section. A
                  single prose sentence with the real numbers inlined
                  carries the same information calmer — the gold-coloured
                  numerals still carry the quantitative punch without a
                  grid of bordered cards behind them. */}
              <p className="text-text-gray/80 text-sm sm:text-base font-light leading-relaxed max-w-2xl mb-8">
                <span className="text-warm-gold tabular-nums">30</span> scenarios across three tracks.{" "}
                <span className="text-warm-gold tabular-nums">526</span> branching scenes.{" "}
                <span className="text-warm-gold tabular-nums">83</span> manipulation tactics to learn to spot,{" "}
                <span className="text-warm-gold tabular-nums">79</span> red flags catalogued. Enough to play for months without repeating yourself.
              </p>

              {/* Three-track chip row. Each track is a deck of scenarios
                  aimed at a specific audience — same engine, different
                  situations. Compacted from the original three-card grid
                  to a single chip row so it reads as a menu (not another
                  features grid) and saves vertical space. */}
              <div className="flex flex-wrap justify-center gap-2 mb-10 max-w-2xl">
                {[
                  { title: "Relationships", blurb: "Narcissists, love-bombers, gaslighters" },
                  { title: "Career", blurb: "Credit thieves, power plays, soft sabotage" },
                  { title: "Dating (men)", blurb: "Reading intent, holding frame" },
                ].map((track) => (
                  <div
                    key={track.title}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.02]"
                    title={track.blurb}
                  >
                    <Target
                      className="w-3 h-3 text-warm-gold/80"
                      strokeWidth={2}
                    />
                    <span className="text-[11px] uppercase tracking-[0.2em] text-warm-gold/90 font-light">
                      {track.title}
                    </span>
                  </div>
                ))}
              </div>

              {/* Dual CTA on homepage — lowers the barrier by giving cold
                  traffic a no-commit entry (Try Free) alongside the
                  conversion button. On the landing page, the single
                  "Step Inside" CTA wins because the visitor is already
                  mid-funnel. */}
              {isHomepage ? (
                <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
                  <Link
                    href="/try"
                    className="flex-1 inline-flex items-center justify-center gap-2 py-3.5 px-6 bg-warm-gold text-deep-black font-medium text-sm tracking-wider uppercase rounded-full transition-all hover:bg-warm-gold/90 hover:shadow-[0_8px_24px_-4px_rgba(212,175,55,0.45)]"
                  >
                    Try it free
                    <ArrowRight size={16} />
                  </Link>
                  <Link
                    href="/consilium"
                    className="flex-1 inline-flex items-center justify-center gap-2 py-3.5 px-6 border border-warm-gold/40 text-warm-gold font-medium text-sm tracking-wider uppercase rounded-full transition-all hover:bg-warm-gold/10"
                  >
                    Step inside
                    <ArrowRight size={16} />
                  </Link>
                </div>
              ) : (
                <Link
                  href="/consilium/apply"
                  className="inline-flex items-center justify-center gap-2 py-3.5 px-8 bg-warm-gold text-deep-black font-medium text-sm tracking-wider uppercase rounded-full transition-all hover:bg-warm-gold/90 hover:shadow-[0_8px_24px_-4px_rgba(212,175,55,0.45)]"
                >
                  Start Practicing
                  <ArrowRight size={16} />
                </Link>
              )}

              <p className="text-text-gray/50 text-xs mt-4">
                {isHomepage
                  ? "Plays in your browser · nothing to install · full Level 1 scenario"
                  : "Included with every Consilium membership."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
