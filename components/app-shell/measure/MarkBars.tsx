"use client";

import { m } from "framer-motion";
import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";
import type { LedgerRow } from "@/lib/mark/read";

/**
 * The Mark, drawn. The ledger's sentences stay (they are the verdicts),
 * and the bars over them carry the numbers: catch rate per tactic and
 * per operator, with a +/- chip for the last 30 days against the record
 * before them.
 *
 * The honesty rule renders too: an untested cell gets no bar and no
 * percentage, only its "seen N, needs M" line. A bar drawn from two
 * answers would be a costume, not a measurement.
 */

/** Rate bands in the house palette: trouble warms rose, mastery is gold. */
function bandColor(rate: number): string {
  if (rate < 0.6) return "var(--app-rose)";
  if (rate < 0.8) return "var(--app-gold-soft)";
  return "var(--app-gold)";
}

function DeltaChip({ delta }: { delta: number | null }) {
  if (delta === null || delta === 0) return null;
  const up = delta > 0;
  return (
    <span
      className="shrink-0 rounded-full px-1.5 py-0.5 text-app-micro font-medium tabular-nums"
      style={{
        color: up ? "var(--app-green)" : "var(--app-rose)",
        background: up
          ? "rgba(107,173,120,0.12)"
          : "rgba(183,110,121,0.14)",
      }}
      aria-label={`${up ? "Up" : "Down"} ${Math.abs(delta)} points over the last 30 days`}
    >
      {up ? "+" : "−"}
      {Math.abs(delta)}
    </span>
  );
}

function Bar({
  rate,
  color,
  delay,
  animate,
}: {
  rate: number;
  color: string;
  delay: number;
  animate: boolean;
}) {
  const width = `${Math.max(3, Math.round(rate * 100))}%`;
  return (
    <div className="h-[5px] w-full overflow-hidden rounded-full bg-white/[0.06]">
      <m.div
        className="h-full rounded-full"
        style={{ background: color }}
        initial={animate ? { width: 0 } : false}
        animate={{ width }}
        transition={{ duration: 0.7, delay, ease: [0.4, 0, 0.2, 1] }}
      />
    </div>
  );
}

/**
 * The verdict a score carries. The product's question is "how easily
 * are you played"; a bare percentage dodges it, so the number wears its
 * answer. Thresholds sit on the same bands the bars color by.
 */
function bandFor(pct: number): string {
  if (pct >= 90) return "Ghost";
  if (pct >= 80) return "Hard to play";
  if (pct >= 65) return "Guarded";
  if (pct >= 50) return "Easy read";
  return "Open target";
}

/**
 * The headline card: the Mark score. Recency-weighted server-side, so
 * this is the member NOW; the band names what the number means and the
 * coverage line keeps a narrow record from masquerading as mastery.
 */
export function MarkScoreCard({
  overall,
  coverage,
}: {
  overall: { seen: number; rate: number | null; delta: number | null };
  coverage: {
    tactics: number;
    tacticsTotal: number;
    operators: number;
    operatorsTotal: number;
  };
}) {
  const reducedMotion = useReducedMotion();
  const pct = overall.rate === null ? null : Math.round(overall.rate * 100);
  return (
    <section className="mb-7 rounded-[18px] border border-[var(--app-line)] bg-[var(--app-card)] p-[18px]">
      <div className="flex items-baseline justify-between gap-3">
        <p className="text-app-eyebrow uppercase tracking-app-label text-[var(--app-gold-soft)]">
          The Mark reads you at
        </p>
        <DeltaChip delta={overall.delta} />
      </div>
      {pct === null ? (
        <p className="mt-2 text-app-body text-[var(--app-dim)]">
          Not enough on the record to score yet.
        </p>
      ) : (
        <>
          <div className="mt-1 flex items-baseline gap-3">
            <p
              className="text-[44px] font-light leading-none tabular-nums text-[var(--app-text)]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {pct}
              <span className="text-app-title text-[var(--app-dim)]">%</span>
            </p>
            <p
              className="text-app-title font-light"
              style={{ color: bandColor((pct ?? 0) / 100) }}
            >
              {bandFor(pct)}
            </p>
          </div>
          <div className="mt-3">
            <Bar
              rate={overall.rate ?? 0}
              color={bandColor(overall.rate ?? 0)}
              delay={0.1}
              animate={!reducedMotion}
            />
          </div>
          <p className="mt-2 text-app-caption text-[var(--app-dim)]">
            Weighted to your last few weeks: this is you now, not your
            history.
          </p>
          <p className="mt-1 text-app-caption text-[var(--app-dim)]">
            {overall.seen} graded moments · tested across {coverage.tactics} of{" "}
            {coverage.tacticsTotal} tactics, {coverage.operators} of{" "}
            {coverage.operatorsTotal} operators
          </p>
        </>
      )}
    </section>
  );
}

export function MarkLedger({
  title,
  caption,
  rows,
}: {
  title: string;
  caption: string;
  rows: LedgerRow[];
}) {
  const reducedMotion = useReducedMotion();
  // Tested rows first, best rate leading; the untested tail stays in
  // taxonomy order so the gaps read as a curriculum, not a ranking.
  const tested = rows.filter((r) => r.rate !== null);
  const untested = rows.filter((r) => r.rate === null);
  tested.sort((a, b) => (b.rate ?? 0) - (a.rate ?? 0));

  return (
    <section className="mb-7">
      <h2
        className="text-app-title font-light"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {title}
      </h2>
      <p className="mb-3.5 mt-1 text-app-caption text-[var(--app-dim)]">
        {caption}
      </p>
      <ul className="flex flex-col gap-2">
        {tested.map((row, i) => {
          const pct = Math.round((row.rate ?? 0) * 100);
          const color = bandColor(row.rate ?? 0);
          return (
            <li
              key={row.key}
              className="rounded-2xl border border-[var(--app-line-soft)] bg-[var(--app-card)] px-4 py-3.5"
            >
              <div className="flex items-baseline justify-between gap-3">
                <p className="min-w-0 truncate text-app-lead font-medium text-[var(--app-text)]">
                  {row.label}
                </p>
                <span className="flex shrink-0 items-baseline gap-2">
                  <DeltaChip delta={row.delta} />
                  <span
                    className="text-app-lead font-light tabular-nums"
                    style={{ color }}
                  >
                    {pct}%
                  </span>
                </span>
              </div>
              <div className="mt-2.5">
                <Bar
                  rate={row.rate ?? 0}
                  color={color}
                  delay={0.08 + i * 0.05}
                  animate={!reducedMotion}
                />
              </div>
              <div className="mt-2 flex items-baseline justify-between gap-3">
                <p className="text-app-caption leading-relaxed text-[var(--app-muted)]">
                  {row.sentence}
                </p>
                {row.state === "EARLY" && (
                  <span className="shrink-0 text-app-tiny uppercase tracking-app-wide text-[var(--app-gold-soft)]">
                    Early read
                  </span>
                )}
              </div>
            </li>
          );
        })}
        {untested.map((row) => (
          <li
            key={row.key}
            className="rounded-2xl border border-[var(--app-line-soft)] px-4 py-3"
          >
            <div className="flex items-baseline justify-between gap-3">
              <p className="text-app-body font-medium text-[var(--app-dim)]">
                {row.label}
              </p>
              <span className="shrink-0 text-app-tiny uppercase tracking-app-wide text-[var(--app-dim)]">
                Untested
              </span>
            </div>
            <p className="mt-1 text-app-caption leading-relaxed text-[var(--app-dim)]">
              {row.sentence}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
