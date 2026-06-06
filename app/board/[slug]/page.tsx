import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import BackgroundEffects from "@/components/BackgroundEffects";
import { optionalServerAuth } from "@/lib/auth/server-auth";
import {
  getFigureDossier,
  getViewerVoteState,
  getCalibrationAnchors,
} from "@/lib/board/db";
import { tierMeta, ARCHETYPE_LABELS, BOARD_DISCLAIMER } from "@/lib/board/tiers";
import { monthYear } from "@/lib/board/format";
import EditorialPhoto from "@/components/board/EditorialPhoto";
import FactorBars from "@/components/board/FactorBars";
import TierBadge from "@/components/board/TierBadge";
import ScaleStrip from "@/components/board/ScaleStrip";
import SectorList from "@/components/board/SectorList";
import ScoreTimeline from "@/components/board/ScoreTimeline";
import VotePanel from "@/components/board/VotePanel";
import PetitionForm from "@/components/board/PetitionForm";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const dossier = await getFigureDossier(slug);
  if (!dossier) return { title: "Not found | The Board" };
  const title = `${dossier.name} | The Board | Kanika Batra`;
  const desc = `${dossier.name} scored ${dossier.current.composite}/100 on the dark-trait framework. ${tierMeta(dossier.current.tier).label}. Read the verdict and score them yourself.`;
  const og = `/api/og?title=${encodeURIComponent(dossier.name)}&subtitle=${encodeURIComponent(`${dossier.current.composite}/100 · ${tierMeta(dossier.current.tier).badge}`)}`;
  return {
    title,
    description: desc,
    alternates: { canonical: `https://kanikarose.com/board/${slug}` },
    openGraph: { title, description: desc, url: `https://kanikarose.com/board/${slug}`, type: "profile", images: [{ url: og, width: 1200, height: 630 }] },
    twitter: { card: "summary_large_image", title, description: desc, images: [og] },
  };
}

export default async function DossierPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const dossier = await getFigureDossier(slug);
  if (!dossier) notFound();

  const userId = await optionalServerAuth();
  const [viewer, anchors] = await Promise.all([
    getViewerVoteState(dossier.id, userId),
    getCalibrationAnchors(),
  ]);

  const cur = dossier.current;
  const scaleAnchors = anchors.map((a) => ({
    label: a.name.split(" ")[0],
    value: a.composite,
  }));

  return (
    <>
      <BackgroundEffects />
      <Header />
      <main className="relative z-10 min-h-screen px-4 pb-20 pt-28">
        <div className="mx-auto max-w-5xl">
          <Link
            href="/board"
            className="mb-6 inline-block text-[11px] uppercase tracking-[0.25em] text-text-gray/60 transition-colors hover:text-text-light"
          >
            &larr; The Board
          </Link>

          <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
            {/* Main dossier */}
            <article>
              {/* Header */}
              <header className="flex items-start gap-5">
                <EditorialPhoto name={dossier.name} photoUrl={dossier.photoUrl} size="lg" />
                <div className="min-w-0 flex-1">
                  <h1 className="font-serif text-3xl font-thin tracking-wide text-text-light sm:text-4xl">
                    {dossier.name}
                  </h1>
                  {dossier.descriptor && (
                    <p className="mt-1 text-sm text-text-gray">{dossier.descriptor}</p>
                  )}
                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    <TierBadge tier={cur.tier} full />
                    {dossier.archetype && (
                      <span className="rounded-full border border-white/15 px-2.5 py-0.5 text-[10px] uppercase tracking-[0.18em] text-text-gray">
                        {ARCHETYPE_LABELS[dossier.archetype]}
                      </span>
                    )}
                    <span className="text-[11px] uppercase tracking-[0.15em] text-text-gray/50">
                      Last scored {monthYear(cur.scoredAt)}
                    </span>
                  </div>
                </div>
                <div className="hidden shrink-0 text-right sm:block">
                  <div className="font-serif text-5xl text-warm-gold tabular-nums">
                    {cur.composite}
                  </div>
                  <div className="text-[10px] uppercase tracking-[0.2em] text-text-gray/50">
                    / 100
                  </div>
                </div>
              </header>

              {/* Scale strip */}
              <section className="mt-8">
                <ScaleStrip value={cur.composite} anchors={scaleAnchors} />
              </section>

              {/* Factor breakdown */}
              <section className="mt-4 grid gap-8 sm:grid-cols-2">
                <div>
                  <h2 className="mb-4 text-[11px] uppercase tracking-[0.25em] text-text-gray/70">
                    The two factors
                  </h2>
                  <FactorBars factor1={cur.factor1} factor2={cur.factor2} labelled />
                </div>
                <div>
                  <h2 className="mb-4 text-[11px] uppercase tracking-[0.25em] text-text-gray/70">
                    Sector reads
                  </h2>
                  <SectorList sectors={cur.sectors} />
                </div>
              </section>

              {/* Verdict */}
              <section className="mt-10">
                <h2 className="mb-3 text-[11px] uppercase tracking-[0.25em] text-warm-gold/70">
                  The verdict
                </h2>
                <p className="font-serif text-lg font-light leading-relaxed text-text-light/90">
                  {cur.verdict}
                </p>
              </section>

              {/* Sources */}
              {dossier.sources.length > 0 && (
                <section className="mt-10">
                  <h2 className="mb-3 text-[11px] uppercase tracking-[0.25em] text-text-gray/70">
                    Sources
                  </h2>
                  <ul className="space-y-1.5">
                    {dossier.sources.map((s) => (
                      <li key={s.id}>
                        <a
                          href={s.url}
                          target="_blank"
                          rel="noopener noreferrer nofollow"
                          className="text-sm text-text-gray underline-offset-4 transition-colors hover:text-text-light hover:underline"
                        >
                          {s.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {/* Re-score history */}
              <section className="mt-10">
                <h2 className="mb-4 text-[11px] uppercase tracking-[0.25em] text-text-gray/70">
                  Re-score history
                </h2>
                <ScoreTimeline history={dossier.history} />
              </section>

              {/* Disclaimer, always rendered. */}
              <p className="mt-10 border-t border-white/[0.06] pt-5 text-xs italic text-text-gray/50">
                {BOARD_DISCLAIMER}
              </p>
            </article>

            {/* Action sidebar */}
            <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
              <VotePanel
                slug={dossier.slug}
                isLoggedIn={!!userId}
                initialVote={viewer.myVote}
                initialAverage={dossier.crowd.average}
                initialCount={dossier.crowd.count}
                official={cur.composite}
              />
              <PetitionForm
                slug={dossier.slug}
                name={dossier.name}
                isLoggedIn={!!userId}
                initialCount={dossier.petitionCount}
                alreadySigned={viewer.hasPetitioned}
              />
            </aside>
          </div>
        </div>
      </main>
    </>
  );
}
