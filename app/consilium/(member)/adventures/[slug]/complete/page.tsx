import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { requireServerAuth } from "@/lib/auth/server-auth";
import { prisma } from "@/lib/prisma";
import { ArrowRight, Sparkles, RotateCcw } from "lucide-react";
import { getScenario } from "@/lib/simulator/scenarios";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const adv = await prisma.adventure.findUnique({ where: { slug } });
  if (!adv) return { title: "Adventure complete | Kanika Batra" };
  return {
    title: `${adv.title}. Complete | Kanika Batra`,
    description: adv.tagline,
  };
}

export default async function AdventureComplete({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const userId = await requireServerAuth(`/consilium/adventures/${slug}/complete`);

  const adventure = await prisma.adventure.findUnique({ where: { slug } });
  if (!adventure || !adventure.publishedAt) notFound();

  const progress = await prisma.adventureProgress.findUnique({
    where: { userId_adventureId: { userId, adventureId: adventure.id } },
  });
  if (!progress?.completedAt) {
    redirect(`/consilium/adventures/${slug}`);
  }

  // Sum XP earned across all scenarios in the arc. SimulatorProgress is
  // the authoritative source for per-scenario XP. Scenarios the player
  // never completed standalone (shouldn't happen at this stage) are
  // skipped, not zeroed in, so the number stays honest.
  const rows = await prisma.simulatorProgress.findMany({
    where: { userId, scenarioId: { in: adventure.scenarioIds } },
    select: { scenarioId: true, xpEarned: true, outcome: true },
  });
  const totalXp = rows.reduce((acc, r) => acc + (r.xpEarned ?? 0), 0);
  const goodEndings = rows.filter((r) => r.outcome === "good").length;

  const chapters = adventure.scenarioIds.map((id) => {
    const scenario = getScenario(id);
    const row = rows.find((r) => r.scenarioId === id);
    return {
      id,
      title: scenario?.title ?? id,
      outcome: row?.outcome ?? null,
      xpEarned: row?.xpEarned ?? 0,
    };
  });

  return (
    <main className="min-h-screen px-4 sm:px-8 py-12 max-w-3xl mx-auto">
      <header className="text-center mb-10">
        <p className="text-warm-gold/70 uppercase tracking-[0.3em] text-xs mb-3 inline-flex items-center gap-2">
          <Sparkles size={11} strokeWidth={1.6} />
          Arc complete
        </p>
        <h1 className="text-4xl sm:text-5xl font-extralight text-white mb-4 tracking-wide">
          {adventure.title}
        </h1>
        <p className="text-warm-gold/85 text-lg font-light italic">
          {adventure.tagline}
        </p>
      </header>

      <section className="mb-10 p-6 rounded-xl border border-warm-gold/20 bg-deep-black/40">
        <p className="text-warm-gold/60 uppercase tracking-[0.3em] text-[10px] mb-4">
          The recap
        </p>
        <p className="text-text-light text-base font-light leading-relaxed whitespace-pre-wrap">
          {adventure.endingRecap}
        </p>
      </section>

      <section className="mb-10 grid grid-cols-3 gap-4">
        <Stat label="Total XP" value={totalXp.toLocaleString()} />
        <Stat label="Chapters" value={chapters.length} />
        <Stat label="Optimal endings" value={`${goodEndings} / ${chapters.length}`} />
      </section>

      <section className="mb-12">
        <p className="text-warm-gold/70 uppercase tracking-[0.3em] text-[10px] mb-4">
          The journey
        </p>
        <ol className="space-y-2">
          {chapters.map((ch, i) => (
            <li
              key={ch.id}
              className="flex items-center gap-4 p-3 rounded-lg border border-warm-gold/10 bg-deep-black/30"
            >
              <span className="shrink-0 inline-flex items-center justify-center w-6 h-6 rounded-full bg-warm-gold/15 text-warm-gold text-[10px] tabular-nums">
                {i + 1}
              </span>
              <span className="flex-1 text-white text-sm font-light truncate">
                {ch.title}
              </span>
              {ch.outcome && (
                <span
                  className={`text-[10px] uppercase tracking-[0.25em] px-2 py-0.5 rounded-full ${outcomeStyles(ch.outcome)}`}
                >
                  {ch.outcome}
                </span>
              )}
              <span className="tabular-nums text-warm-gold/80 text-xs">
                +{ch.xpEarned}
              </span>
            </li>
          ))}
        </ol>
      </section>

      <div className="flex flex-wrap gap-3 justify-center">
        <Link
          href="/consilium/adventures"
          className="inline-flex items-center gap-2 py-3.5 px-8 rounded-full bg-warm-gold text-deep-black font-medium tracking-wider uppercase text-sm transition-all hover:bg-warm-gold/90 hover:shadow-[0_8px_24px_-4px_rgba(212,175,55,0.55)]"
        >
          Browse more
          <ArrowRight size={16} />
        </Link>
        <Link
          href={`/consilium/adventures/${slug}`}
          className="inline-flex items-center gap-2 py-3.5 px-8 rounded-full border border-warm-gold/40 text-warm-gold font-light tracking-wider uppercase text-sm transition-all hover:bg-warm-gold/10"
        >
          <RotateCcw size={14} strokeWidth={1.6} />
          See chapters
        </Link>
      </div>
    </main>
  );
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="text-center p-4 rounded-lg border border-warm-gold/15 bg-deep-black/40">
      <p className="text-warm-gold/60 uppercase tracking-[0.25em] text-[9px] mb-1">
        {label}
      </p>
      <p className="text-white text-2xl font-extralight tabular-nums">{value}</p>
    </div>
  );
}

function outcomeStyles(outcome: string): string {
  switch (outcome) {
    case "good":
      return "bg-warm-gold/15 text-warm-gold border border-warm-gold/30";
    case "bad":
    case "failed":
      return "bg-deep-burgundy/40 text-text-light border border-deep-burgundy";
    default:
      return "bg-white/[0.04] text-text-gray border border-white/10";
  }
}
