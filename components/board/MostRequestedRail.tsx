import Link from "next/link";
import type { RequestedRow } from "@/lib/board/types";

/**
 * Deliberate incompleteness made visible. The "how is X not on here?!"
 * surface that fires the comment-nomination engine. Debut nominations
 * happen in YouTube comments (top comment debuts); this rail just
 * reflects the queue and lets signed-in members petition.
 */
export default function MostRequestedRail({ rows }: { rows: RequestedRow[] }) {
  if (rows.length === 0) return null;
  return (
    <section className="rounded-sm border border-white/[0.07] bg-white/[0.015] p-4">
      <h2 className="mb-1 text-[11px] uppercase tracking-[0.25em] text-text-gray/70">
        Coming to the board
      </h2>
      <p className="mb-4 text-xs leading-relaxed text-text-gray/60">
        Top comment on the next episode decides who debuts. Most requested
        first.
      </p>
      <ul className="space-y-2.5">
        {rows.map((r) => (
          <li key={r.id}>
            <Link
              href={`/board/${r.slug}`}
              className="flex items-center justify-between gap-3 rounded-sm px-2 py-1.5 transition-colors hover:bg-white/[0.03]"
            >
              <div className="min-w-0">
                <div className="truncate font-serif text-sm text-text-light">
                  {r.name}
                </div>
                {r.descriptor && (
                  <div className="truncate text-[11px] text-text-gray/60">
                    {r.descriptor}
                  </div>
                )}
              </div>
              <span className="shrink-0 text-[10px] uppercase tracking-[0.15em] text-warm-gold/70 tabular-nums">
                {r.petitionCount} {r.petitionCount === 1 ? "call" : "calls"}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
