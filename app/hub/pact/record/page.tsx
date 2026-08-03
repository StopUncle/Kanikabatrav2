import Link from "next/link";
import { redirect } from "next/navigation";
import { requireServerAuth } from "@/lib/auth/server-auth";
import { memberGate } from "@/lib/access/guard";
import { prisma } from "@/lib/prisma";
import { readPact } from "@/lib/pact/read";
import { presetLabel } from "@/lib/pact/presets";
import { PageShell, PageHeader } from "@/components/app-shell/ui";
import SignatureView from "@/components/app-shell/pact/SignatureView";
import type { SignatureStrokes } from "@/lib/pact/signature";

export const metadata = {
  title: "The record | Consilium",
};

function WeekMark({ status }: { status: string }) {
  if (status === "kept") {
    return (
      <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--app-gold-soft)] bg-[var(--app-card)] text-[var(--app-gold)]">
        <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current [stroke-width:2]">
          <path d="M5 12.5l4.5 4.5L19 7.5" />
        </svg>
      </span>
    );
  }
  if (status === "scarred") {
    return (
      <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--pact-blood-dried)] bg-[var(--app-card)] text-[var(--pact-blood)]">
        <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current [stroke-width:2]">
          <path d="M6 6l12 12M18 6L6 18" />
        </svg>
      </span>
    );
  }
  return (
    <span className="h-9 w-9 rounded-lg border border-dashed border-[var(--app-line-soft)]" />
  );
}

/**
 * The record: every week of the live pact, the scars included, and the
 * broken pacts beneath it. Also the evidence screen: the break flow links
 * FROM here, so nobody breaks a pact without having just looked at it.
 */
export default async function PactRecordPage() {
  const userId = await requireServerAuth("/app/pact/record");
  const wall = await memberGate(userId, {
    trigger: "locked-nav",
    returnHref: "/app/pact/record",
    surfaceLabel: "The Pact",
  });
  if (wall) return wall;

  const read = await readPact(userId);
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

  return (
    <PageShell>
      <PageHeader
        title="The record"
        lede={
          read.pact
            ? `Pact ${read.pact.number} · ${presetLabel(read.pact.preset)} · week ${read.weekNumber}`
            : "No live pact. What stands below is what happened."
        }
      />

      {read.pact && Array.isArray(read.pact.goals) ? (
        <ul className="mb-4 flex flex-col gap-1.5">
          {(read.pact.goals as string[]).map((g) => (
            <li
              key={g}
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
            {read.entries.map((e) => (
              <WeekMark key={e.id} status={e.status} />
            ))}
          </div>
        </>
      )}

      {read.pastPacts.length > 0 && (
        <>
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
        </>
      )}

      {read.pact ? (
        <div className="mt-10 border-t border-[var(--app-line-soft)] pt-4">
          <Link
            href="/app/pact/break"
            className="block text-center text-app-micro uppercase tracking-app-label text-[var(--app-dim)]"
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
