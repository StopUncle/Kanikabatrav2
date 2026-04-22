import Link from "next/link";
import BackgroundEffects from "@/components/BackgroundEffects";
import Header from "@/components/Header";
import HuntPreview from "@/components/demos/HuntPreview";
import MaskPreview from "@/components/demos/MaskPreview";
import WebPreview from "@/components/demos/WebPreview";
import { ArrowRight } from "lucide-react";

/**
 * /try-demos — internal style comparison.
 *
 * Three motion-first concepts replace the previous text-heavy drafts.
 * Each tells a dark-psychology story through pure visual metaphor:
 *   HUNT — a predator's approach and capture
 *   MASK — peeling layers revealing progressively harder faces
 *   WEB  — threads closing in around an unguarded target
 *
 * Near-zero text during playback. At most one verdict word per loop.
 * The motion IS the content.
 *
 * Not linked from public navigation. Delete the route once a style
 * is merged into the homepage teaser.
 */

export const metadata = {
  title: "Demo styles · Consilium",
  description: "Internal comparison of three motion-first demo styles.",
  robots: { index: false, follow: false },
};

export default function TryDemosPage() {
  return (
    <>
      <BackgroundEffects />
      <Header />
      <main className="relative z-10 pt-28 pb-24 min-h-screen">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <p className="text-warm-gold/70 uppercase tracking-[0.4em] text-[10px] mb-4">
              Internal · Motion-first demos
            </p>
            <h1 className="text-4xl sm:text-5xl font-extralight text-text-light tracking-wide mb-5">
              Three ways to <span className="text-warm-gold">show</span>, not tell.
            </h1>
            <p className="text-text-gray text-base sm:text-lg font-light leading-relaxed">
              No dialogue, no tactic cards, no explanations. Each demo
              tells its story through motion alone. Pick the one that
              grabs you in the first three seconds.
            </p>
          </div>

          <section className="mb-24">
            <StyleHeader
              badge="01"
              title="Hunt"
              pitch="A predator approaches. Zig-zag, retreat, circle, pounce. You watch it happen from above. The only word is the one that names it."
            />
            <div className="py-8">
              <HuntPreview />
            </div>
            <StyleCta />
          </section>

          <section className="mb-24">
            <StyleHeader
              badge="02"
              title="Masks"
              pitch="What you see is a face. Behind it, another. Behind that, something you weren't meant to meet. Pure character animation."
            />
            <div className="py-8">
              <MaskPreview />
            </div>
            <StyleCta />
          </section>

          <section className="mb-24">
            <StyleHeader
              badge="03"
              title="Web"
              pitch="Threads extend from the dark. Each touch dims you by a degree. By the sixth, you're surrounded. The seventh pulls."
            />
            <div className="py-8">
              <WebPreview />
            </div>
            <StyleCta />
          </section>

          <div className="max-w-2xl mx-auto text-center pt-10 border-t border-warm-gold/10">
            <p className="text-warm-gold/70 uppercase tracking-[0.35em] text-[10px] mb-4">
              Pick one
            </p>
            <p className="text-text-gray font-light mb-6">
              Winner replaces the homepage teaser and the Consilium
              landing animation. Tell me which direction lands.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-warm-gold hover:text-warm-gold/80 transition-colors text-sm"
            >
              <ArrowRight size={14} className="rotate-180" />
              Back to the homepage
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}

function StyleHeader({
  badge,
  title,
  pitch,
}: {
  badge: string;
  title: string;
  pitch: string;
}) {
  return (
    <div className="max-w-2xl mx-auto text-center mb-2">
      <p className="text-warm-gold/60 text-[10px] uppercase tracking-[0.45em] mb-3">
        {badge}
      </p>
      <h2 className="text-3xl sm:text-4xl font-extralight text-text-light tracking-[0.1em] mb-4">
        {title}
      </h2>
      <p className="text-text-gray/90 font-light leading-relaxed">
        {pitch}
      </p>
    </div>
  );
}

function StyleCta() {
  return (
    <div className="text-center">
      <Link
        href="/consilium/apply?src=demo-compare"
        className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full bg-warm-gold text-deep-black font-medium text-sm tracking-[0.2em] uppercase transition-all hover:bg-warm-gold/90 hover:shadow-[0_12px_40px_-12px_rgba(212,175,55,0.55)]"
      >
        Step inside — $29/mo
        <ArrowRight size={14} />
      </Link>
    </div>
  );
}
