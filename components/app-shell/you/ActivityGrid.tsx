import type { StandingActivity } from "@/lib/standing/activity";

/**
 * Twelve weeks of showing up, as a grid.
 *
 * Shading is by opacity on a single gold, never by hue: five colours would
 * invent a scale nobody agreed to read, and opacity degrades gracefully on
 * the cheap panels this will mostly be seen on.
 *
 * Days before the member joined and days that have not happened yet are
 * holes rather than empty cells, so an account three weeks old does not look
 * like an account that stopped showing up in April.
 */

/** Four steps. More would imply a precision a day count does not have. */
function level(amount: number, peak: number): number {
  if (amount <= 0) return 0;
  if (peak <= 0) return 1;
  const ratio = amount / peak;
  if (ratio > 0.66) return 4;
  if (ratio > 0.33) return 3;
  if (ratio > 0.12) return 2;
  return 1;
}

const FILL = [
  "transparent",
  "rgba(212,175,55,0.22)",
  "rgba(212,175,55,0.42)",
  "rgba(212,175,55,0.68)",
  "rgba(212,175,55,0.95)",
];

/** Below this many real days on the board, a grid is mostly holes. */
const MIN_DAYS_TO_DRAW = 14;

export default function ActivityGrid({
  activity,
}: {
  activity: StandingActivity;
}) {
  const { days, weeks, peak, activeDays } = activity;

  // Days that are actually theirs to have used: not future, not before they
  // joined. A four-day-old account has no history to draw yet, and a chart
  // with one data point is not a chart, it is a broken chart.
  const liveDays = days.filter((d) => !d.future && !d.beforeJoining).length;

  if (liveDays < MIN_DAYS_TO_DRAW) {
    return (
      <section>
        <p className="mb-2.5 text-[11px] uppercase tracking-[0.26em] text-[var(--app-dim)]">
          Showing up
        </p>
        <div className="rounded-2xl border border-[var(--app-line-soft)] bg-[var(--app-card)] p-4">
          <p className="text-[13.5px] leading-relaxed text-[var(--app-muted)]">
            {activeDays === 0
              ? "Nothing on the board yet. Anything you do today starts it."
              : `${activeDays} ${activeDays === 1 ? "day" : "days"} on the board so far.`}
          </p>
          <p className="mt-1.5 text-[11.5px] leading-relaxed text-[var(--app-dim)]">
            The grid appears once there are a couple of weeks to draw.
          </p>
        </div>
      </section>
    );
  }

  // Columns of seven, oldest week first: each row is a fixed weekday.
  const columns: (typeof days)[] = [];
  for (let w = 0; w < weeks; w++) {
    columns.push(days.slice(w * 7, w * 7 + 7));
  }

  return (
    <section>
      <div className="mb-2.5 flex items-baseline justify-between">
        <p className="text-[11px] uppercase tracking-[0.26em] text-[var(--app-dim)]">
          Showing up
        </p>
        <p className="text-[11px] tabular-nums text-[var(--app-dim)]">
          {activeDays} {activeDays === 1 ? "day" : "days"} in {weeks} weeks
        </p>
      </div>

      <div className="rounded-2xl border border-[var(--app-line-soft)] bg-[var(--app-card)] p-4">
        {/* Columns are capped as well as flexible. Without the cap, a short
            window (a new member gets four weeks, not twelve) stretches four
            columns across the whole card and every square becomes enormous. */}
        <div className="flex justify-center gap-[3px]">
          {columns.map((week, wi) => (
            <div
              key={wi}
              className="flex flex-1 flex-col gap-[3px]"
              style={{ maxWidth: 32 }}
            >
              {week.map((day) => {
                const hole = day.future || day.beforeJoining;
                const lv = hole ? 0 : level(day.amount, peak);
                return (
                  <div
                    key={day.date}
                    title={
                      hole
                        ? undefined
                        : `${day.date}: ${day.amount} Standing from ${day.count} ${
                            day.count === 1 ? "action" : "actions"
                          }`
                    }
                    className="aspect-square w-full rounded-[2.5px]"
                    style={{
                      background: hole ? "transparent" : FILL[lv],
                      border:
                        hole || lv > 0
                          ? "1px solid transparent"
                          : "1px solid rgba(236,231,222,0.055)",
                    }}
                  />
                );
              })}
            </div>
          ))}
        </div>

        <p className="mt-3 text-[11px] leading-relaxed text-[var(--app-dim)]">
          Every square is a day you earned something new. Replays do not light
          a day up, which is the point.
        </p>
      </div>
    </section>
  );
}
