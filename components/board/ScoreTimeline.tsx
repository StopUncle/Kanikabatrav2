import type { ScoreEntry } from "@/lib/board/types";
import { monthYear } from "@/lib/board/format";

/**
 * The re-score history. The single best "alive" element: it shows the
 * board responds to reality. Newest first. Each entry carries the
 * movement from the prior score and the news event that prompted it.
 */
export default function ScoreTimeline({ history }: { history: ScoreEntry[] }) {
  if (history.length <= 1) {
    return (
      <p className="text-sm text-text-gray/60">
        Scored once. The history will grow here as the read is revisited.
      </p>
    );
  }

  return (
    <ol className="relative space-y-5 border-l border-white/10 pl-5">
      {history.map((entry, i) => {
        // history is newest-first, so the "previous" score is the next index.
        const prev = history[i + 1];
        const delta = prev ? entry.composite - prev.composite : null;
        return (
          <li key={entry.id} className="relative">
            <span className="absolute -left-[23px] top-1.5 h-2.5 w-2.5 rounded-full border border-warm-gold/60 bg-deep-black" />
            <div className="flex items-baseline gap-2">
              <span className="font-serif text-lg text-text-light tabular-nums">
                {entry.composite}
              </span>
              {delta != null && delta !== 0 && (
                <span
                  className={`text-xs tabular-nums ${
                    delta > 0 ? "text-warm-gold/80" : "text-text-purple/80"
                  }`}
                >
                  {delta > 0 ? "▲" : "▼"} {Math.abs(delta)}
                </span>
              )}
              <span className="text-[11px] uppercase tracking-[0.15em] text-text-gray/50">
                {monthYear(entry.scoredAt)}
              </span>
            </div>
            {entry.triggerEvent ? (
              <p className="mt-0.5 text-sm text-text-gray">
                Re-scored after {entry.triggerEvent}.
              </p>
            ) : (
              <p className="mt-0.5 text-sm text-text-gray/60">Debut score.</p>
            )}
          </li>
        );
      })}
    </ol>
  );
}
