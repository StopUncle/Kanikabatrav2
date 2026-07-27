import Link from "next/link";
import type { MarkRead } from "@/lib/mark/read";

/**
 * The Mark, compact: what reliably gets past you, in plain sentences.
 *
 * No score, no chart, no hexagon. A number here would be the one thing
 * members trained instead of the skill, and it would be a claim nobody
 * can stand behind. Sentences about named tactics are both honest and
 * the only version anyone can act on.
 */
export default function MarkPanel({ read }: { read: MarkRead }) {
  if (!read.baseline && read.totalEncounters === 0) {
    return (
      <Shell>
        <p className="text-[14px] leading-relaxed text-[var(--app-muted)]">
          Nothing measured yet. The Baseline Read is twelve rooms and five
          minutes, and it is the before picture everything later gets
          compared against.
        </p>
        <Link
          href="/app/measure/baseline"
          className="mt-4 inline-block rounded-full bg-[var(--app-gold)] px-5 py-2.5 text-[13.5px] font-semibold text-[#17130a]"
        >
          Take the Baseline Read
        </Link>
      </Shell>
    );
  }

  return (
    <Shell>
      {read.insights.length > 0 && (
        <div className="mb-4 flex flex-col gap-2.5">
          {read.insights.map((line) => (
            <p
              key={line}
              className="text-[15px] font-light leading-relaxed text-[var(--app-text)]"
            >
              {line}
            </p>
          ))}
        </div>
      )}

      {read.blindSpots.length > 0 ? (
        <>
          <p className="mb-3 text-[11px] uppercase tracking-[0.2em] text-[var(--app-rose)]">
            {read.quiet ? "From your Baseline Read" : "What gets past you"}
          </p>
          <ul className="flex flex-col gap-3">
            {read.blindSpots.map((spot) => (
              <li key={spot.key}>
                <p className="text-[14.5px] font-medium text-[var(--app-text)]">
                  {spot.headline}
                </p>
                <p className="mt-0.5 text-[13.5px] leading-relaxed text-[var(--app-muted)]">
                  {spot.line}
                </p>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p className="text-[14px] leading-relaxed text-[var(--app-muted)]">
          Nothing is reliably getting past you yet. That changes as the
          rooms get harder.
        </p>
      )}

      {read.quiet && (
        <p className="mt-4 text-[12.5px] leading-relaxed text-[var(--app-dim)]">
          One sitting, so this is a first impression rather than a verdict.
          Face each of these a few more times and it settles.
        </p>
      )}

      <Link
        href="/app/measure"
        className="mt-5 inline-block text-[13px] font-medium text-[var(--app-gold)]"
      >
        See the full read
      </Link>
    </Shell>
  );
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <section className="rounded-[18px] border border-[var(--app-line)] bg-[var(--app-card)] p-[18px]">
      <p className="mb-3 text-[11px] uppercase tracking-[0.22em] text-[var(--app-gold-soft)]">
        The Mark
      </p>
      {children}
    </section>
  );
}
