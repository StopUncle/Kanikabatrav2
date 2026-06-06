import Link from "next/link";
import { Plus, Pencil } from "lucide-react";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

const STATUS_COLOR: Record<string, string> = {
  ON_BOARD: "text-emerald-400 bg-emerald-500/10",
  RESCORE_PENDING: "text-warm-gold bg-warm-gold/10",
  MOST_REQUESTED: "text-text-gray bg-gray-800/40",
};

export default async function AdminBoardPage() {
  const figures = await prisma.figure.findMany({
    orderBy: [{ isCalibration: "asc" }, { createdAt: "asc" }],
    include: {
      currentScore: true,
      _count: { select: { scores: true, votes: true, petitions: true } },
    },
    take: 300,
  });

  return (
    <div className="max-w-6xl">
      <header className="mb-10 flex items-start justify-between">
        <div>
          <p className="mb-2 text-[10px] uppercase tracking-[0.4em] text-accent-gold/70">
            The Board
          </p>
          <h1 className="text-3xl font-extralight uppercase tracking-wider text-text-light">
            Figures
          </h1>
          <p className="mt-2 text-sm text-text-gray">
            {figures.length} figure{figures.length === 1 ? "" : "s"} on file
          </p>
        </div>
        <Link
          href="/admin/board/new"
          className="inline-flex items-center gap-2 rounded-full bg-accent-gold px-5 py-2.5 text-xs font-medium uppercase tracking-wider text-deep-black transition-all hover:bg-accent-gold/90"
        >
          <Plus size={14} /> New figure
        </Link>
      </header>

      <div className="overflow-hidden rounded-lg border border-gray-800">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-gray-800 text-[10px] uppercase tracking-[0.15em] text-text-gray/60">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Score</th>
              <th className="px-4 py-3 text-right">Scores</th>
              <th className="px-4 py-3 text-right">Votes</th>
              <th className="px-4 py-3 text-right">Petitions</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800/60">
            {figures.map((f) => (
              <tr key={f.id} className="hover:bg-white/[0.02]">
                <td className="px-4 py-3">
                  <Link href={`/admin/board/${f.slug}`} className="text-text-light hover:text-accent-gold">
                    {f.name}
                  </Link>
                  {f.isCalibration && (
                    <span className="ml-2 text-[10px] uppercase tracking-[0.15em] text-warm-gold/60">
                      anchor
                    </span>
                  )}
                  {f.descriptor && (
                    <div className="text-xs text-text-gray/60">{f.descriptor}</div>
                  )}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] uppercase tracking-[0.12em] ${STATUS_COLOR[f.status] ?? ""}`}
                  >
                    {f.status.replace("_", " ").toLowerCase()}
                  </span>
                </td>
                <td className="px-4 py-3 text-right font-serif text-warm-gold tabular-nums">
                  {f.currentScore ? f.currentScore.composite : "·"}
                </td>
                <td className="px-4 py-3 text-right text-text-gray tabular-nums">{f._count.scores}</td>
                <td className="px-4 py-3 text-right text-text-gray tabular-nums">{f._count.votes}</td>
                <td className="px-4 py-3 text-right text-text-gray tabular-nums">{f._count.petitions}</td>
                <td className="px-4 py-3 text-right">
                  <Link href={`/admin/board/${f.slug}`} className="text-text-gray hover:text-accent-gold">
                    <Pencil size={14} />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
