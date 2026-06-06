import Link from "next/link";
import type { BoardRow as Row } from "@/lib/board/types";
import { relativeTime } from "@/lib/board/format";
import EditorialPhoto from "./EditorialPhoto";
import FactorBars from "./FactorBars";
import TierBadge from "./TierBadge";

/**
 * One row on the ranked board. Renders as a dense table-row on desktop and
 * a stacked card on mobile. The whole row links into the dossier. The
 * crowd-vs-official gap is shown compactly here; full detail lives on the
 * scorecard.
 */
export default function BoardRow({ row }: { row: Row }) {
  const gap =
    row.crowd.average != null ? row.crowd.average - row.composite : null;

  return (
    <Link
      href={`/board/${row.slug}`}
      className="group block border-b border-white/[0.06] px-3 py-4 transition-colors hover:bg-white/[0.025] sm:px-4"
    >
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Rank */}
        <div className="w-7 shrink-0 text-center font-serif text-base text-text-gray tabular-nums sm:w-9 sm:text-lg">
          {row.rank}
        </div>

        <EditorialPhoto name={row.name} photoUrl={row.photoUrl} size="md" />

        {/* Name + descriptor */}
        <div className="min-w-0 flex-1">
          <div className="truncate font-serif text-base text-text-light group-hover:text-white sm:text-lg">
            {row.name}
          </div>
          {row.descriptor && (
            <div className="truncate text-xs text-text-gray">
              {row.descriptor}
            </div>
          )}
          {/* Factor bars: most important visual, shown under the name so it
              survives the mobile stack. */}
          <div className="mt-2 max-w-[220px]">
            <FactorBars factor1={row.factor1} factor2={row.factor2} />
          </div>
        </div>

        {/* Composite + tier + recency (right rail) */}
        <div className="flex shrink-0 flex-col items-end gap-1.5">
          <div className="flex items-baseline gap-1">
            <span className="font-serif text-2xl text-warm-gold tabular-nums sm:text-3xl">
              {row.composite}
            </span>
            <span className="text-[10px] text-text-gray/60">/100</span>
          </div>
          <TierBadge tier={row.tier} />
          <div className="hidden text-[10px] uppercase tracking-[0.15em] text-text-gray/50 sm:block">
            {gap != null ? (
              <span title="Crowd score vs official">
                crowd {row.crowd.average}
                <span className={gap === 0 ? "" : gap > 0 ? "text-warm-gold/70" : "text-text-purple/70"}>
                  {" "}({gap > 0 ? "+" : ""}{gap})
                </span>
              </span>
            ) : (
              <span>scored {relativeTime(row.lastScoredAt)}</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
