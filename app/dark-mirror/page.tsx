import Link from "next/link";
import Header from "@/components/Header";
import BackgroundEffects from "@/components/BackgroundEffects";
import StarterPackForm from "@/components/dark-mirror/StarterPackForm";
import AdLandingBanner from "@/components/dark-mirror/AdLandingBanner";
import { ArrowRight, Eye, FileText, Sparkles } from "lucide-react";

/**
 * Dark Mirror hub. Three paths surfaced at the top, ranked by
 * email-capture priority per the multimillion-roadmap (research/
 * multimillion-roadmap/11-phase-1-detailed.md week 4):
 *
 *   1. Mini Dark Mirror — free, 7-question quiz, email-gated full result
 *   2. Pattern Recognition Starter Pack — free, inline email form,
 *      delivers 5 named patterns to inbox
 *   3. Full Dark Mirror Assessment — paid $9.99, 20 questions, the
 *      comprehensive 6-axis radar with functioning analysis
 *
 * All three are "email-capture" surfaces: the paid quiz captures email
 * before payment via the existing Stripe flow. The free two are the
 * primary acquisition surfaces; the paid is the upsell tier surfaced
 * for visitors who want comprehensive results immediately.
 */

export const metadata = {
  title: "The Dark Mirror | Kanika Batra",
  description:
    "Three free or paid ways to get your personality-pattern read: the 90-second mini quiz, the Pattern Recognition Starter Pack, or the full 20-question Dark Mirror Assessment.",
};

export default function DarkMirrorHubPage() {
  return (
    <>
      <BackgroundEffects />
      <Header />
      {/* AdLandingBanner reads UTM params client-side and conditionally
          shows a tailored welcome strip. Renders nothing for
          non-paid-source visitors, so it's safe to mount here for
          all viewers. */}
      <AdLandingBanner />
      <div className="min-h-screen pt-28 pb-16 relative z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          {/* Hero */}
          <div className="text-center mb-12 sm:mb-16">
            <p className="text-warm-gold/70 text-[11px] uppercase tracking-[0.4em] mb-4">
              The Dark Mirror
            </p>
            <h1
              className="text-5xl sm:text-6xl md:text-7xl font-extralight tracking-wider uppercase leading-tight mb-5"
              style={{
                background:
                  "linear-gradient(135deg, #f3d98a 0%, #d4af37 50%, #9c7a1f 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Find your axis.
            </h1>
            <p className="text-text-gray text-base sm:text-lg font-light leading-relaxed max-w-2xl mx-auto">
              A clinical-grade read on which of six personality patterns
              you sit closest to. Three ways in, depending on how deep
              you want to go.
            </p>
          </div>

          {/* The three paths.
              Ranked left to right by depth and price: free quick read,
              free reference pack, paid comprehensive. Mobile stacks
              with the free options first since email capture is the
              primary funnel goal. */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-16">
            {/* PATH 1 — Mini Dark Mirror, free, 7 questions */}
            <div className="bg-gradient-to-br from-deep-burgundy/15 to-deep-navy/20 backdrop-blur-sm border border-warm-gold/30 rounded-2xl p-6 sm:p-7 flex flex-col">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-warm-gold/15 border border-warm-gold/40 mb-4">
                <Sparkles
                  size={18}
                  strokeWidth={1.6}
                  className="text-warm-gold"
                />
              </div>
              <p className="text-warm-gold/70 text-[10px] uppercase tracking-[0.3em] mb-2">
                Free, 90 seconds
              </p>
              <h3 className="text-xl font-extralight tracking-wider uppercase text-text-light mb-3">
                Mini Dark Mirror
              </h3>
              <p className="text-text-gray font-light text-sm leading-relaxed mb-5 flex-1">
                Seven scenarios. We tell you which of six personality
                patterns you score highest on, and what that means for
                the way you operate in relationships.
              </p>
              <Link
                href="/dark-mirror/mini"
                className="inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-full bg-warm-gold text-deep-black font-medium text-sm tracking-wider uppercase transition-all hover:bg-warm-gold/90 hover:shadow-[0_8px_24px_-4px_rgba(212,175,55,0.45)] active:scale-95"
              >
                Take the quiz
                <ArrowRight size={16} strokeWidth={1.8} />
              </Link>
            </div>

            {/* PATH 2 — Starter Pack, free, inline form */}
            <div className="bg-gradient-to-br from-deep-burgundy/15 to-deep-navy/20 backdrop-blur-sm border border-warm-gold/30 rounded-2xl p-6 sm:p-7 flex flex-col">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-warm-gold/15 border border-warm-gold/40 mb-4">
                <FileText
                  size={18}
                  strokeWidth={1.6}
                  className="text-warm-gold"
                />
              </div>
              <p className="text-warm-gold/70 text-[10px] uppercase tracking-[0.3em] mb-2">
                Free, in your inbox
              </p>
              <h3 className="text-xl font-extralight tracking-wider uppercase text-text-light mb-3">
                Starter Pack
              </h3>
              <p className="text-text-gray font-light text-sm leading-relaxed mb-5 flex-1">
                Five named manipulator tactics, each with a clinical
                definition, three examples, and the tell. Reference
                document. Read once, recognise forever.
              </p>
              <Link
                href="/dark-mirror/starter-pack"
                className="inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-full bg-deep-black/60 border border-warm-gold/40 text-warm-gold font-medium text-sm tracking-wider uppercase transition-all hover:bg-warm-gold/10 hover:border-warm-gold/70 active:scale-95"
              >
                Get the pack
                <ArrowRight size={16} strokeWidth={1.8} />
              </Link>
            </div>

            {/* PATH 3 — Full Dark Mirror Assessment, paid, 20 questions */}
            <div className="bg-gradient-to-br from-deep-burgundy/30 to-deep-navy/30 backdrop-blur-sm border border-warm-gold/40 rounded-2xl p-6 sm:p-7 flex flex-col relative overflow-hidden">
              {/* Subtle premium-tier glow */}
              <div
                aria-hidden
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(ellipse at 50% 0%, rgba(212,175,55,0.08), transparent 60%)",
                }}
              />
              <div className="relative">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-warm-gold/20 border border-warm-gold/50 mb-4">
                  <Eye
                    size={18}
                    strokeWidth={1.6}
                    className="text-warm-gold"
                  />
                </div>
                <p className="text-warm-gold text-[10px] uppercase tracking-[0.3em] mb-2">
                  Comprehensive, $9.99
                </p>
                <h3 className="text-xl font-extralight tracking-wider uppercase text-text-light mb-3">
                  Full Assessment
                </h3>
                <p className="text-text-gray font-light text-sm leading-relaxed mb-5">
                  20 scenarios. Full 6-axis radar chart. Functioning
                  analysis. Clinical-style diagnostic. Includes a $9.99
                  credit toward a Consilium membership if you ever want
                  to go further.
                </p>
                <Link
                  href="/quiz"
                  className="inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-full bg-warm-gold/15 border border-warm-gold text-warm-gold font-medium text-sm tracking-wider uppercase transition-all hover:bg-warm-gold/25 active:scale-95"
                >
                  Take the full version
                  <ArrowRight size={16} strokeWidth={1.8} />
                </Link>
              </div>
            </div>
          </div>

          {/* Soft divider with explainer copy. Helps visitors who land
              here cold understand WHY the assessment exists, without
              putting it above the conversion options. */}
          <div className="max-w-2xl mx-auto text-center mb-16 px-4">
            <p className="text-warm-gold/60 text-[10px] uppercase tracking-[0.35em] mb-3">
              What this is
            </p>
            <p className="text-text-gray font-light leading-relaxed text-sm sm:text-base">
              The Dark Mirror Assessment maps you against six personality
              patterns, five of which sit on the Cluster B spectrum.
              It&apos;s not a diagnosis. It&apos;s a reference for
              understanding the way you respond to threat, intimacy,
              and conflict, and whether the patterns you carry serve
              you or run you.
            </p>
            <p className="text-text-gray/60 font-light text-xs mt-4">
              Built by Kanika Batra. Drawn from the same clinical
              framework used in The Sociopathic Dating Bible and the
              Consilium simulator.
            </p>
          </div>

          {/* Final email-capture surface, the Starter Pack inline so
              visitors who scrolled the cards without picking get one
              more low-friction option. */}
          <div className="max-w-xl mx-auto">
            <p className="text-center text-warm-gold/60 text-[10px] uppercase tracking-[0.35em] mb-5">
              Or grab the pack from here
            </p>
            <StarterPackForm />
          </div>
        </div>
      </div>
    </>
  );
}
