import Link from "next/link";
import { Plus, Pencil } from "lucide-react";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminAdventuresPage() {
  const adventures = await prisma.adventure.findMany({
    orderBy: [{ createdAt: "desc" }],
  });

  return (
    <div className="max-w-6xl">
      <header className="flex items-start justify-between mb-10">
        <div>
          <p className="text-accent-gold/70 text-[10px] uppercase tracking-[0.4em] mb-2">
            The Dark Mirror
          </p>
          <h1 className="text-3xl font-extralight tracking-wider uppercase text-text-light">
            Adventures
          </h1>
          <p className="text-text-gray text-sm mt-2">
            {adventures.length} arc{adventures.length === 1 ? "" : "s"} .{" "}
            {adventures.filter((a) => a.publishedAt).length} published
          </p>
        </div>
        <Link
          href="/admin/adventures/new"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-accent-gold text-deep-black font-medium tracking-wider uppercase text-xs hover:bg-accent-gold/90 transition-all"
        >
          <Plus size={14} /> New adventure
        </Link>
      </header>

      <div className="rounded-lg border border-gray-800 overflow-x-auto">
        <table className="w-full min-w-[760px] text-sm">
          <thead className="bg-deep-black/60">
            <tr className="text-[10px] uppercase tracking-[0.3em] text-text-gray">
              <th className="text-left px-4 py-3">Title</th>
              <th className="text-left px-4 py-3">Slug</th>
              <th className="text-left px-4 py-3">Chapters</th>
              <th className="text-left px-4 py-3">Diff</th>
              <th className="text-left px-4 py-3">Status</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {adventures.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="px-4 py-12 text-center text-text-gray italic"
                >
                  No adventures yet. Create one to get started.
                </td>
              </tr>
            ) : (
              adventures.map((a) => (
                <tr key={a.id} className="hover:bg-deep-black/40">
                  <td className="px-4 py-3 text-text-light max-w-md truncate">
                    {a.title}
                  </td>
                  <td className="px-4 py-3 text-text-gray font-mono text-xs">
                    {a.slug}
                  </td>
                  <td className="px-4 py-3 text-text-gray tabular-nums">
                    {a.scenarioIds.length}
                  </td>
                  <td className="px-4 py-3 text-text-gray">{a.difficulty}</td>
                  <td className="px-4 py-3">
                    {a.publishedAt ? (
                      <span className="px-2 py-0.5 rounded text-[10px] uppercase tracking-[0.2em] text-emerald-400 bg-emerald-500/10">
                        Published
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded text-[10px] uppercase tracking-[0.2em] text-text-gray bg-gray-800/40">
                        Draft
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Link
                      href={`/admin/adventures/${a.id}/edit`}
                      className="inline-flex items-center gap-1.5 text-accent-gold hover:text-accent-gold/80 text-xs uppercase tracking-[0.2em]"
                    >
                      <Pencil size={12} /> Edit
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
