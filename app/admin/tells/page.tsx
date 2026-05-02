import Link from "next/link";
import { Plus, Pencil } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { TRACK_LABELS } from "@/lib/tells/types";
import type { InstinctTrack } from "@/lib/tells/types";

export const dynamic = "force-dynamic";

const STATUS_COLOR: Record<string, string> = {
  DRAFT: "text-text-gray bg-gray-800/40",
  REVIEW: "text-warm-gold bg-warm-gold/10",
  SCHEDULED: "text-accent-gold bg-accent-gold/10",
  PUBLISHED: "text-emerald-400 bg-emerald-500/10",
  ARCHIVED: "text-text-gray/50 bg-gray-800/20",
};

export default async function AdminTellsPage() {
  const [tells, totalScored] = await Promise.all([
    prisma.tell.findMany({
      orderBy: [{ scheduleDate: "desc" }, { createdAt: "desc" }],
      take: 200,
    }),
    prisma.tellResponse.count({ where: { countedScored: true } }),
  ]);

  return (
    <div className="max-w-6xl">
      <header className="flex items-start justify-between mb-10">
        <div>
          <p className="text-accent-gold/70 text-[10px] uppercase tracking-[0.4em] mb-2">
            Train Your Instincts
          </p>
          <h1 className="text-3xl font-extralight tracking-wider uppercase text-text-light">
            Tells
          </h1>
          <p className="text-text-gray text-sm mt-2">
            {tells.length} Tell{tells.length === 1 ? "" : "s"} &middot;{" "}
            {totalScored} answers logged
          </p>
        </div>
        <Link
          href="/admin/tells/new"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-accent-gold text-deep-black font-medium tracking-wider uppercase text-xs hover:bg-accent-gold/90 transition-all"
        >
          <Plus size={14} /> New Tell
        </Link>
      </header>

      <div className="rounded-lg border border-gray-800 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-deep-black/60">
            <tr className="text-[10px] uppercase tracking-[0.3em] text-text-gray">
              <th className="text-left px-4 py-3">#</th>
              <th className="text-left px-4 py-3">Question</th>
              <th className="text-left px-4 py-3">Track</th>
              <th className="text-left px-4 py-3">Diff</th>
              <th className="text-left px-4 py-3">Schedule</th>
              <th className="text-left px-4 py-3">Status</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {tells.map((t) => (
              <tr key={t.id} className="hover:bg-deep-black/40">
                <td className="px-4 py-3 text-text-gray font-mono text-xs">
                  {String(t.number).padStart(3, "0")}
                </td>
                <td className="px-4 py-3 text-text-light max-w-md truncate">
                  {t.question}
                </td>
                <td className="px-4 py-3 text-text-gray">
                  {TRACK_LABELS[t.track as InstinctTrack]}
                </td>
                <td className="px-4 py-3 text-text-gray text-center">
                  {t.difficulty}
                </td>
                <td className="px-4 py-3 text-text-gray text-xs">
                  {t.scheduleDate
                    ? new Date(t.scheduleDate).toISOString().slice(0, 10)
                    : "—"}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-block px-2 py-0.5 rounded text-[10px] uppercase tracking-[0.2em] ${
                      STATUS_COLOR[t.status] ?? ""
                    }`}
                  >
                    {t.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <Link
                    href={`/admin/tells/${t.id}/edit`}
                    className="text-accent-gold hover:text-text-light"
                    aria-label="Edit"
                  >
                    <Pencil size={14} />
                  </Link>
                </td>
              </tr>
            ))}
            {tells.length === 0 && (
              <tr>
                <td
                  colSpan={7}
                  className="px-4 py-12 text-center text-text-gray text-sm"
                >
                  No Tells yet. Run{" "}
                  <code className="text-accent-gold">
                    npx tsx scripts/seed-tells.ts
                  </code>{" "}
                  to seed the starter pool, or click New Tell.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
