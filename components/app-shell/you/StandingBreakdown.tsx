import type { SourceTotal } from "@/lib/standing/activity";

/**
 * Where the last thirty days of Standing came from.
 *
 * Free from the same query the grid uses, and it answers the question the
 * grid provokes ("doing what?"). Measures presence, not skill, so it is
 * allowed to be a chart.
 */

export default function StandingBreakdown({
  sources,
}: {
  sources: SourceTotal[];
}) {
  if (sources.length === 0) return null;

  const top = sources.slice(0, 6);
  const max = top[0].amount;
  const total = sources.reduce((sum, s) => sum + s.amount, 0);

  return (
    <section>
      <div className="mb-2.5 flex items-baseline justify-between">
        <p className="text-[11px] uppercase tracking-[0.26em] text-[var(--app-dim)]">
          Where it came from
        </p>
        <p className="text-[11px] tabular-nums text-[var(--app-dim)]">
          {total.toLocaleString()} in 30 days
        </p>
      </div>

      <div className="flex flex-col gap-3 rounded-2xl border border-[var(--app-line-soft)] bg-[var(--app-card)] p-4">
        {top.map((s) => (
          <div key={s.source}>
            <div className="mb-1 flex items-baseline justify-between">
              <span className="text-[12.5px] text-[var(--app-text)]">
                {s.label}
              </span>
              <span className="text-[11.5px] tabular-nums text-[var(--app-dim)]">
                {s.amount.toLocaleString()}
              </span>
            </div>
            <div className="h-[3px] overflow-hidden rounded-full bg-[rgba(212,175,55,0.1)]">
              <div
                className="h-full rounded-full bg-[var(--app-gold)]"
                style={{ width: `${Math.max(3, (s.amount / max) * 100)}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
