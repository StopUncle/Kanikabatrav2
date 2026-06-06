import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import AdminFigureEditor, { type EditorInitial } from "@/components/board/AdminFigureEditor";

export const dynamic = "force-dynamic";

export default async function AdminFigureEditPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const figure = await prisma.figure.findUnique({
    where: { slug },
    include: {
      scores: { orderBy: { scoredAt: "desc" } },
      sources: { orderBy: { sortOrder: "asc" } },
    },
  });
  if (!figure) notFound();

  const initial: EditorInitial = {
    slug: figure.slug,
    name: figure.name,
    descriptor: figure.descriptor ?? "",
    archetype: figure.archetype ?? "",
    status: figure.status,
    isCalibration: figure.isCalibration,
    featuredRequest: figure.featuredRequest,
    photoUrl: figure.photoUrl ?? "",
    sources: figure.sources.map((s) => ({ label: s.label, url: s.url })),
    history: figure.scores.map((s) => ({
      id: s.id,
      composite: s.composite,
      factor1: s.factor1,
      factor2: s.factor2,
      triggerEvent: s.triggerEvent,
      scoredAt: s.scoredAt.toISOString(),
    })),
  };

  return <AdminFigureEditor initial={initial} />;
}
