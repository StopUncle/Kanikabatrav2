import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ALL_SCENARIOS } from "@/lib/simulator/scenarios";
import AdventureForm from "@/components/admin/AdventureForm";

export const dynamic = "force-dynamic";

export default async function EditAdventurePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const adv = await prisma.adventure.findUnique({ where: { id } });
  if (!adv) notFound();

  const scenarios = ALL_SCENARIOS.map((s) => ({
    id: s.id,
    title: s.title,
    track: s.track ?? "female",
  }));

  return (
    <div className="max-w-3xl">
      <header className="mb-8">
        <p className="text-accent-gold/70 text-[10px] uppercase tracking-[0.4em] mb-2">
          Edit
        </p>
        <h1 className="text-3xl font-extralight tracking-wider uppercase text-text-light">
          {adv.title}
        </h1>
      </header>
      <AdventureForm
        mode="edit"
        scenarios={scenarios}
        initial={{
          id: adv.id,
          slug: adv.slug,
          title: adv.title,
          tagline: adv.tagline,
          description: adv.description,
          scenarioIds: adv.scenarioIds,
          tier: adv.tier as "free" | "premium" | "vip",
          estimatedMinutes: adv.estimatedMinutes,
          difficulty: adv.difficulty as
            | "beginner"
            | "intermediate"
            | "advanced",
          coverArt: adv.coverArt,
          endingRecap: adv.endingRecap,
          isNew: adv.isNew,
          publishedAt: adv.publishedAt ? adv.publishedAt.toISOString() : null,
        }}
      />
    </div>
  );
}
