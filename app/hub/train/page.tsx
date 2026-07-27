import Link from "next/link";
import { requireServerAuth } from "@/lib/auth/server-auth";
import { prisma } from "@/lib/prisma";
import { getTrainData } from "@/lib/simulator/train-data";
import Move from "@/components/app-shell/Move";
import TrackLadder from "@/components/app-shell/train/TrackLadder";

export const metadata = {
  title: "Train | Consilium",
};

/**
 * Train: recommendation-first. One scenario is THE next move; the tracks sit
 * under it as compact rows (sealed ones as teasers); every other way to
 * practise is one door each. The old wall-of-catalog survives behind the
 * "Browse everything" link until it is retired.
 */

const REASON_CHIP: Record<string, string> = {
  checkin: "Matched to your check-in",
  resume: "Continue where you left off",
  start: "Start here",
};

export default async function TrainPage() {
  const userId = await requireServerAuth("/app/train");
  const { nextUp, tracks, freshFiles } = await getTrainData(prisma, userId);

  return (
    <div className="pb-8 pt-6">
      <div className="px-5">
        <h1
          className="text-[28px] font-light"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Train
        </h1>
        <p className="mt-1 text-[13px] text-[var(--app-muted)]">
          Practice reads people faster than theory ever will.
        </p>
      </div>

      {/* The next move */}
      {nextUp && (
        <Link
          href={`/app/train/${nextUp.scenarioId}`}
          className="relative mx-5 mt-5 flex flex-col justify-end overflow-hidden rounded-[22px] border border-[var(--app-line)]"
          style={{
            aspectRatio: "16 / 9",
            background:
              "radial-gradient(90% 130% at 70% 20%, rgba(183,110,121,0.35), transparent 60%), linear-gradient(150deg, #241c13, #0b0908 75%)",
          }}
        >
          <span
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, transparent 35%, rgba(6,5,4,0.85))",
            }}
          />
          <span className="relative p-5">
            <span className="mb-2 block text-[11px] uppercase tracking-[0.16em] text-[var(--app-gold-soft)]">
              {REASON_CHIP[nextUp.reason]}
            </span>
            <span
              className="block text-[22px] leading-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {nextUp.title}
            </span>
            <span className="mt-2 flex items-center justify-between">
              <span className="text-[12.5px] text-[var(--app-muted)]">
                {nextUp.trackLabel}
              </span>
              <span className="text-xs tracking-[0.1em] text-[var(--app-gold)]">
                PLAY →
              </span>
            </span>
          </span>
        </Link>
      )}

      {/* Tracks: open rows tap through, sealed rows tease */}
      <p className="mx-5 mb-1 mt-7 text-[11px] uppercase tracking-[0.26em] text-[var(--app-dim)]">
        The climb
      </p>
      <div className="mx-5">
        <TrackLadder tracks={tracks} />
      </div>

      {/* Fresh Files */}
      {freshFiles.length > 0 && (
        <>
          <p className="mx-5 mb-2.5 mt-7 text-[11px] uppercase tracking-[0.26em] text-[var(--app-dim)]">
            Fresh files
          </p>
          <div className="flex gap-2.5 overflow-x-auto px-5 pb-1 [scrollbar-width:none]">
            {freshFiles.map((f) => (
              <Link
                key={f.scenarioId}
                href={`/app/train/${f.scenarioId}`}
                className="w-[200px] shrink-0 rounded-2xl border border-[var(--app-line-soft)] bg-[var(--app-card)] p-4"
              >
                <span
                  className="block text-[15px] leading-snug"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {f.title}
                </span>
                <span className="mt-1.5 line-clamp-2 block text-[11.5px] leading-relaxed text-[var(--app-dim)]">
                  {f.tagline}
                </span>
              </Link>
            ))}
          </div>
        </>
      )}

      {/* Other ways to train */}
      <p className="mx-5 mb-2.5 mt-7 text-[11px] uppercase tracking-[0.26em] text-[var(--app-dim)]">
        More ways in
      </p>
      <div className="mx-5 flex flex-col gap-2.5">
        <Move
          href="/consilium/adventures"
          title="Adventures"
          sub="Multi-chapter arcs. Long games."
          cta="OPEN"
          icon={
            <svg viewBox="0 0 24 24">
              <path d="M4 19V6l6-2 4 2 6-2v13l-6 2-4-2z" />
              <path d="M10 4v13m4-11v13" />
            </svg>
          }
        />
        <Move
          href="/app/play"
          title="Arcade"
          sub="Speed Drill and the Daily Tell."
          cta="OPEN"
          icon={
            <svg viewBox="0 0 24 24">
              <rect x="2" y="7" width="20" height="12" rx="4" />
              <path d="M7 11.5v3M5.5 13h3" />
              <circle cx="16" cy="12" r="0.9" />
              <circle cx="18.4" cy="14.4" r="0.9" />
            </svg>
          }
        />
        <Move
          href="/consilium/lab"
          title="The Lab"
          sub="Freeform roleplay. Say anything."
          cta="OPEN"
          icon={
            <svg viewBox="0 0 24 24">
              <path d="M10 2v7l-5 9a2 2 0 0 0 1.8 3h10.4a2 2 0 0 0 1.8-3l-5-9V2" />
              <path d="M8.5 2h7" />
            </svg>
          }
        />
        <Move
          href="/consilium/receipts"
          title="Receipts"
          sub="Paste the messages. Get the read."
          cta="OPEN"
          icon={
            <svg viewBox="0 0 24 24">
              <path d="M6 2h12v20l-3-2-3 2-3-2-3 2z" />
              <path d="M9 8h6m-6 4h6" />
            </svg>
          }
        />
      </div>

    </div>
  );
}
