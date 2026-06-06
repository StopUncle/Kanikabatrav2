import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import BackgroundEffects from "@/components/BackgroundEffects";
import { getCalibrationAnchors } from "@/lib/board/db";
import { TIERS, FACTOR_LABELS, BOARD_DISCLAIMER } from "@/lib/board/tiers";
import EditorialPhoto from "@/components/board/EditorialPhoto";
import FactorBars from "@/components/board/FactorBars";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "How to read the scale | The Board | Kanika Batra",
  description:
    "The Board measures a trait, not a verdict on how dangerous someone is. Five bands, two factors, and two fixed anchors that define the floor and ceiling of the instrument.",
  alternates: { canonical: "https://kanikarose.com/board/scale" },
};

export default async function ScalePage() {
  const anchors = await getCalibrationAnchors();
  const ceiling = anchors[anchors.length - 1];

  return (
    <>
      <BackgroundEffects />
      <Header />
      <main className="relative z-10 min-h-screen px-4 pb-20 pt-28">
        <div className="mx-auto max-w-3xl">
          <Link
            href="/board"
            className="mb-6 inline-block text-[11px] uppercase tracking-[0.25em] text-text-gray/60 transition-colors hover:text-text-light"
          >
            &larr; The Board
          </Link>

          <header className="mb-10">
            <p className="mb-3 text-[10px] uppercase tracking-[0.5em] text-warm-gold/60">
              How to read the scale
            </p>
            <h1 className="font-serif text-3xl font-thin tracking-wide text-text-light sm:text-4xl">
              It measures a trait, not a sentence
            </h1>
            <p className="mt-4 text-sm font-light leading-relaxed text-text-gray">
              The number is a read on a pattern of traits, scored against a
              two-factor model. {FACTOR_LABELS.factor1} is the cold core,
              charm, grandiosity, shallow affect. {FACTOR_LABELS.factor2} is
              the behaviour, impulsivity, recklessness, a trail of damage. A
              high score is not a diagnosis and not a prediction of harm. It is
              an observation about wiring.
            </p>
          </header>

          {/* The five bands */}
          <section className="mb-12">
            <h2 className="mb-4 text-[11px] uppercase tracking-[0.25em] text-text-gray/70">
              The five bands
            </h2>
            <div className="space-y-2.5">
              {[...TIERS].reverse().map((t) => (
                <div
                  key={t.key}
                  className={`flex items-center gap-4 rounded-sm border px-4 py-3 ${
                    t.isTopTier
                      ? "border-warm-gold/25 bg-accent-burgundy/[0.06]"
                      : "border-white/[0.07] bg-white/[0.01]"
                  }`}
                >
                  <span className="w-16 shrink-0 text-[11px] uppercase tracking-[0.15em] text-text-gray/50 tabular-nums">
                    {t.range[0]}&ndash;{t.range[1]}
                  </span>
                  <span className="font-serif text-base text-text-light">
                    {t.label}
                  </span>
                  {t.key === "ELEVATED" && (
                    <span className="ml-auto text-[10px] uppercase tracking-[0.15em] text-warm-gold/60">
                      clinical-threshold range
                    </span>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* The anchors */}
          <section className="mb-12">
            <h2 className="mb-1 text-[11px] uppercase tracking-[0.25em] text-warm-gold/70">
              The ruler&rsquo;s anchors
            </h2>
            <p className="mb-5 text-sm leading-relaxed text-text-gray">
              These two are reference points, not rankings. They are kept off
              the board on purpose: they exist to define the floor and the
              ceiling so every score in between means something.
            </p>
            <div className="space-y-4">
              {anchors.map((a) => (
                <div
                  key={a.id}
                  className="rounded-sm border border-white/[0.07] bg-white/[0.01] p-5"
                >
                  <div className="flex items-start gap-4">
                    <EditorialPhoto name={a.name} photoUrl={a.photoUrl} size="md" />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-baseline justify-between gap-3">
                        <h3 className="font-serif text-lg text-text-light">
                          {a.name}
                        </h3>
                        <span className="font-serif text-2xl text-warm-gold tabular-nums">
                          {a.composite}
                        </span>
                      </div>
                      {a.descriptor && (
                        <p className="text-[11px] uppercase tracking-[0.15em] text-text-gray/50">
                          {a.descriptor}
                        </p>
                      )}
                      <div className="mt-3 max-w-xs">
                        <FactorBars factor1={a.factor1} factor2={a.factor2} />
                      </div>
                    </div>
                  </div>
                  <p className="mt-4 font-serif text-sm font-light leading-relaxed text-text-light/80">
                    {a.verdict}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Teaching line */}
          {ceiling && (
            <section className="mb-12 rounded-sm border border-warm-gold/15 bg-gradient-to-b from-accent-burgundy/[0.08] to-transparent p-6 text-center">
              <p className="font-serif text-lg font-light leading-relaxed text-text-light">
                The same Factor 1 core sits behind figures the world adores.
                The only difference is what they did with it.
              </p>
            </section>
          )}

          <p className="border-t border-white/[0.06] pt-5 text-xs italic text-text-gray/50">
            {BOARD_DISCLAIMER}
          </p>
        </div>
      </main>
    </>
  );
}
