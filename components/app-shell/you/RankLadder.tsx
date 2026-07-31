import { RINGS } from "@/lib/standing/config";

/**
 * All four ranks, counted inward, with the thresholds stated.
 *
 * Named on purpose. A progress bar to an unnamed "next level" is a slot
 * machine; naming Profiler and what it costs is a thing a member can decide
 * to go and get.
 */

export default function RankLadder({
  standing,
  ringLevel,
}: {
  standing: number;
  ringLevel: number;
}) {
  return (
    <section>
      <p className="mb-2.5 text-app-eyebrow uppercase tracking-app-label text-[var(--app-dim)]">
        The ranks
      </p>
      <div className="overflow-hidden rounded-2xl border border-[var(--app-line-soft)] bg-[var(--app-card)]">
        {RINGS.map((r, i) => {
          const held = standing >= r.threshold;
          const current = r.level === ringLevel;
          return (
            <div
              key={r.level}
              className={`flex items-center gap-3.5 px-4 py-3 ${
                i > 0 ? "border-t border-[var(--app-line-soft)]" : ""
              }`}
              style={{
                background: current ? "rgba(212,175,55,0.06)" : undefined,
              }}
            >
              <span
                aria-hidden
                className="h-1.5 w-1.5 shrink-0 rounded-full"
                style={{
                  background: current
                    ? "var(--app-gold)"
                    : held
                      ? "var(--app-gold-soft)"
                      : "var(--app-dim)",
                  opacity: held || current ? 1 : 0.45,
                }}
              />
              <span className="min-w-0 flex-1">
                <span
                  className="block text-app-lead"
                  style={{
                    color: current
                      ? "var(--app-gold)"
                      : held
                        ? "var(--app-text)"
                        : "var(--app-muted)",
                  }}
                >
                  {r.name}
                  {current && (
                    <span className="ml-2 text-app-tiny uppercase tracking-app-wide text-[var(--app-gold-soft)]">
                      you are here
                    </span>
                  )}
                </span>
              </span>
              <span className="shrink-0 text-app-eyebrow tabular-nums text-[var(--app-dim)]">
                {r.threshold === 0
                  ? "the door"
                  : `${r.threshold.toLocaleString()}`}
              </span>
            </div>
          );
        })}
      </div>
      <p className="mt-2 px-1 text-app-eyebrow leading-relaxed text-[var(--app-dim)]">
        Standing only goes up. It measures showing up, not skill, and the
        Inner Circle is a job with duties rather than a badge.
      </p>
    </section>
  );
}
