import { FACTOR_LABELS } from "@/lib/board/tiers";

/**
 * The operator-vs-trainwreck split at a glance: Factor 1 (interpersonal /
 * affective) over Factor 2 (lifestyle / antisocial), as two mini bars.
 * The single most important visual on a board row. Compact variant for
 * rows, labelled variant for the scorecard.
 */

function Bar({ value, accent }: { value: number; accent: boolean }) {
  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/[0.07]">
      <div
        className={`h-full rounded-full ${accent ? "bg-warm-gold" : "bg-text-gray/70"}`}
        style={{ width: `${Math.max(0, Math.min(100, value))}%` }}
      />
    </div>
  );
}

export default function FactorBars({
  factor1,
  factor2,
  labelled = false,
}: {
  factor1: number;
  factor2: number;
  labelled?: boolean;
}) {
  if (labelled) {
    return (
      <div className="space-y-4">
        {[
          { label: FACTOR_LABELS.factor1, value: factor1, accent: true },
          { label: FACTOR_LABELS.factor2, value: factor2, accent: false },
        ].map((f) => (
          <div key={f.label}>
            <div className="mb-1.5 flex items-baseline justify-between">
              <span className="text-[11px] uppercase tracking-[0.2em] text-text-gray">
                {f.label}
              </span>
              <span className="font-serif text-sm text-text-light tabular-nums">
                {f.value}
              </span>
            </div>
            <Bar value={f.value} accent={f.accent} />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2" aria-hidden>
      <div className="flex-1">
        <Bar value={factor1} accent />
      </div>
      <div className="flex-1">
        <Bar value={factor2} accent={false} />
      </div>
    </div>
  );
}
