import Link from "next/link";
import { redirect } from "next/navigation";
import { requireServerAuth } from "@/lib/auth/server-auth";
import { getAccess } from "@/lib/access/tier";
import { prisma } from "@/lib/prisma";
import { readPact } from "@/lib/pact/read";
import { presetLabel } from "@/lib/pact/presets";
import { PageShell, PageHeader } from "@/components/app-shell/ui";
import SignatureView from "@/components/app-shell/pact/SignatureView";
import type { SignatureStrokes } from "@/lib/pact/signature";

export const metadata = {
  title: "The record | Consilium",
};

function WeekMark({
  status,
  weekNumber,
  index,
}: {
  status: string;
  weekNumber: number;
  index: number;
}) {
  // The wall arrives left to right, and each mark's stroke draws itself a
  // beat after its tile lands. All CSS; reduced motion collapses to static.
  const tileDelay = { animationDelay: `${index * 45}ms` };
  const strokeDelay = { animationDelay: `${index * 45 + 180}ms` };
  const label = `Week ${weekNumber}: ${
    status === "kept" ? "kept" : status === "scarred" ? "scarred" : "open"
  }`;
  if (status === "kept") {
    return (
      <span
        className="pact-mark-in flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--app-gold-soft)] bg-[var(--app-card)] text-[var(--app-gold)]"
        style={tileDelay}
        role="img"
        aria-label={label}
        title={label}
      >
        <svg viewBox="0 0 24 24" aria-hidden className="h-4 w-4 fill-none stroke-current [stroke-width:2]">
          <path d="M5 12.5l4.5 4.5L19 7.5" pathLength={1} className="pact-draw" style={strokeDelay} />
        </svg>
      </span>
    );
  }
  if (status === "scarred") {
    return (
      <span
        className="pact-mark-in flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--pact-blood-dried)] bg-[var(--app-card)] text-[var(--pact-blood)]"
        style={tileDelay}
        role="img"
        aria-label={label}
        title={label}
      >
        <svg viewBox="0 0 24 24" aria-hidden className="h-4 w-4 fill-none stroke-current [stroke-width:2]">
          <path d="M6 6l12 12M18 6L6 18" pathLength={1} className="pact-draw" style={strokeDelay} />
        </svg>
      </span>
    );
  }
  return (
    <span
      className="pact-mark-in flex h-9 w-9 items-center justify-center rounded-lg border border-dashed border-[var(--app-line-soft)] text-app-micro text-[var(--app-dim)]"
      style={tileDelay}
      role="img"
      aria-label={label}
      title={label}
    >
      {weekNumber}
    </span>
  );
}

/**
 * The record: every week of the live pact, the scars included, and the
 * broken pacts beneath it. Also the evidence screen: the break flow links
 * FROM here, so nobody breaks a pact without having just looked at it.
 */
export default async function PactRecordPage() {
  const userId = await requireServerAuth("/app/pact/record");
  // No training wall here, on purpose: the record is the member's own
  // history and stays readable after a lapse or a break. That is the
  // contract the keep/entry routes state ("readable but not writable"),
  // and it is where the winback email sends people. The entitled flag
  // keeps the read passive for anyone who cannot currently write.
  const access = await getAccess(userId);
  const read = await readPact(userId, { entitled: access.pactEntitled });
  if (!read.pact && read.pastPacts.length === 0) {
    redirect("/app/pact");
  }

  const pastEntries =
    read.pastPacts.length > 0
      ? await prisma.pactEntry.groupBy({
          by: ["pactId", "status"],
          where: { pactId: { in: read.pastPacts.map((p) => p.id) } },
          _count: true,
        })
      : [];
  const countFor = (pactId: string, status: string) =>
    pastEntries.find((e) => e.pactId === pactId && e.status === status)?._count ??
    0;

  const kept = read.entries.filter((e) => e.status === "kept").length;
  const scars = read.entries.filter((e) => e.status === "scarred").length;

  // The wall is indexed by week number, not by row position: a missing
  // row (billing lapse, cron gap) renders as an unmarked week instead of
  // silently compressing the wall so week 7 reads as week 5.
  const statusByWeek = new Map(read.entries.map((e) => [e.weekNumber, e.status]));
  const lastEntryWeek = read.entries[read.entries.length - 1]?.weekNumber ?? 0;
  const wallLength = Math.max(read.weekNumber, lastEntryWeek);
  const wallWeeks = Array.from({ length: wallLength }, (_, i) => ({
    weekNumber: i + 1,
    status: statusByWeek.get(i + 1) ?? "open",
  }));

  return (
    <PageShell>
      <PageHeader
        title="The record"
        lede={
          read.pact
            ? read.awaitingActivation || read.weekNumber < 1
              ? `Pact ${read.pact.number} · ${presetLabel(read.pact.preset)} · signed, not started`
              : `Pact ${read.pact.number} · ${presetLabel(read.pact.preset)} · week ${read.weekNumber}`
            : "No live pact. What stands below is what happened."
        }
      />

      {read.pact && Array.isArray(read.pact.goals) ? (
        <ul className="mb-4 flex flex-col gap-1.5">
          {(read.pact.goals as string[]).map((g, i) => (
            <li
              key={i}
              className="flex gap-2.5 text-[13.5px] leading-snug text-[var(--app-text)]"
            >
              <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-[var(--pact-blood)]" />
              <span>{g}</span>
            </li>
          ))}
        </ul>
      ) : null}

      {read.pact?.signatureData ? (
        <div className="rounded-2xl border border-[var(--app-line)] bg-[var(--app-card)] px-4 py-2">
          <SignatureView
            strokes={read.pact.signatureData as SignatureStrokes}
            animate
          />
          <p className="pb-2 text-center text-app-micro uppercase tracking-app-label text-[var(--app-dim)]">
            Signed {read.pact.signedAt.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
          </p>
        </div>
      ) : null}

      {read.pact && (
        <>
          <div className="mt-5 flex gap-4 text-app-caption text-[var(--app-muted)]">
            <span>
              <span className="text-[var(--app-gold)]">{kept}</span> kept
            </span>
            <span>
              <span className="text-[var(--pact-blood)]">{scars}</span>{" "}
              {scars === 1 ? "scar" : "scars"}
            </span>
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            {wallWeeks.map((w, i) => (
              <WeekMark
                key={w.weekNumber}
                status={w.status}
                weekNumber={w.weekNumber}
                index={i}
              />
            ))}
          </div>
        </>
      )}

      {read.pastPacts.length > 0 && (
        <div className="app-rise" style={{ animationDelay: "500ms" }}>
          <p className="mt-8 text-app-eyebrow uppercase tracking-app-label text-[var(--app-dim)]">
            Broken pacts
          </p>
          <div className="mt-2 flex flex-col gap-2">
            {read.pastPacts.map((p) => (
              <div
                key={p.id}
                className="rounded-2xl border border-[var(--pact-blood-dried)] bg-[var(--app-card)] px-4 py-3.5"
              >
                <div className="flex items-baseline justify-between">
                  <span className="text-[13.5px]">
                    Pact {p.number} · {presetLabel(p.preset)}
                  </span>
                  <span className="text-app-micro uppercase tracking-app-label text-[var(--pact-blood)]">
                    Broken
                  </span>
                </div>
                <p className="mt-1 text-app-micro text-[var(--app-dim)]">
                  {countFor(p.id, "kept")} kept · {countFor(p.id, "scarred")}{" "}
                  scarred ·{" "}
                  {p.brokenAt?.toLocaleDateString("en-US", {
                    month: "short",
                    year: "numeric",
                  })}
                </p>
                {p.signatureData ? (
                  <SignatureView
                    strokes={p.signatureData as SignatureStrokes}
                    broken
                    className="mt-1 h-[56px]"
                  />
                ) : null}
              </div>
            ))}
          </div>
        </div>
      )}

      {read.pact ? (
        <div className="mt-10 border-t border-[var(--app-line-soft)] pt-4">
          {/* The journal's only door: nothing else in the shell links it. */}
          <Link
            href="/app/pact/journal"
            className="block text-center text-app-micro uppercase tracking-app-label text-[var(--app-gold-soft)]"
          >
            The journal
          </Link>
          <Link
            href="/app/pact/break"
            className="mt-3 block text-center text-app-micro uppercase tracking-app-label text-[var(--app-dim)]"
          >
            Break the pact
          </Link>
        </div>
      ) : (
        <Link
          href="/app/pact"
          className="mt-8 block w-full rounded-full bg-[var(--pact-blood)] px-5 py-3.5 text-center text-[13px] uppercase tracking-[0.16em] text-[var(--app-text)]"
        >
          Sign a new pact
        </Link>
      )}
    </PageShell>
  );
}
