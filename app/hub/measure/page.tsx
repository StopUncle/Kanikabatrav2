import Link from "next/link";
import { requireServerAuth } from "@/lib/auth/server-auth";
import { prisma } from "@/lib/prisma";
import { readMark, type LedgerRow } from "@/lib/mark/read";
import { MARK_FRAME_LINE } from "@/lib/mark/verdicts";

export const metadata = {
  title: "The Mark | Consilium",
};

/**
 * The Mark, in full: both ledgers, every cell, including the ones with
 * nothing to say yet.
 *
 * Showing the untested cells is the point rather than an omission. A
 * member who can see where the record is thin trusts the parts that are
 * not, and the gaps are the training that is still ahead of them.
 */
export default async function MeasurePage() {
  const userId = await requireServerAuth("/app/measure");
  const read = await readMark(prisma, userId);

  return (
    <div className="px-5 pb-28 pt-6">
      <h1
        className="text-[28px] font-light"
        style={{ fontFamily: "var(--font-display)" }}
      >
        The Mark
      </h1>
      <p className="mb-6 mt-1.5 text-[13px] leading-relaxed text-[var(--app-muted)]">
        {MARK_FRAME_LINE}
      </p>

      {!read.baseline && read.totalEncounters === 0 ? (
        <div className="rounded-[18px] border border-[var(--app-line)] bg-[var(--app-card)] p-[18px]">
          <p className="text-[14.5px] leading-relaxed text-[var(--app-muted)]">
            There is nothing to read yet. Start with the Baseline Read and
            this fills in from there.
          </p>
          <Link
            href="/app/measure/baseline"
            className="mt-4 inline-block rounded-full bg-[var(--app-gold)] px-5 py-2.5 text-[13.5px] font-semibold text-[#17130a]"
          >
            Take the Baseline Read
          </Link>
        </div>
      ) : (
        <>
          {read.insights.length > 0 && (
            <section className="mb-7 rounded-[18px] border border-[var(--app-line)] bg-[var(--app-card)] p-[18px]">
              <p className="mb-3 text-[11px] uppercase tracking-[0.22em] text-[var(--app-gold-soft)]">
                The thing worth knowing
              </p>
              <div className="flex flex-col gap-2.5">
                {read.insights.map((line) => (
                  <p
                    key={line}
                    className="text-[15px] font-light leading-relaxed text-[var(--app-text)]"
                  >
                    {line}
                  </p>
                ))}
              </div>
            </section>
          )}

          <Ledger
            title="By tactic"
            caption="What is being run on you."
            rows={read.tactics}
          />
          <Ledger
            title="By who is running it"
            caption="The same move lands differently depending on who makes it."
            rows={read.operators}
          />

          {read.baseline && (
            <p className="mt-7 text-center text-[12.5px] leading-relaxed text-[var(--app-dim)]">
              Last Baseline Read{" "}
              {read.baseline.takenAt.toLocaleDateString("en-AU", {
                day: "numeric",
                month: "long",
              })}
              {read.baseline.attempts > 1
                ? `, ${read.baseline.attempts} sittings so far.`
                : "."}
            </p>
          )}
        </>
      )}
    </div>
  );
}

function Ledger({
  title,
  caption,
  rows,
}: {
  title: string;
  caption: string;
  rows: LedgerRow[];
}) {
  return (
    <section className="mb-7">
      <h2
        className="text-[19px] font-light"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {title}
      </h2>
      <p className="mb-3.5 mt-1 text-[12.5px] text-[var(--app-dim)]">
        {caption}
      </p>
      <ul className="flex flex-col gap-2">
        {rows.map((row) => (
          <li
            key={row.key}
            className={`rounded-2xl border border-[var(--app-line-soft)] px-4 py-3.5 ${
              row.state === "UNTESTED"
                ? "bg-transparent"
                : "bg-[var(--app-card)]"
            }`}
          >
            <div className="flex items-baseline justify-between gap-3">
              <p
                className={`text-[14.5px] font-medium ${
                  row.state === "UNTESTED"
                    ? "text-[var(--app-dim)]"
                    : "text-[var(--app-text)]"
                }`}
              >
                {row.label}
              </p>
              {row.state === "EARLY" && (
                <span className="shrink-0 text-[10px] uppercase tracking-[0.18em] text-[var(--app-gold-soft)]">
                  Early read
                </span>
              )}
            </div>
            <p
              className={`mt-1 text-[13.5px] leading-relaxed ${
                row.state === "UNTESTED"
                  ? "text-[var(--app-dim)]"
                  : "text-[var(--app-muted)]"
              }`}
            >
              {row.sentence}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
