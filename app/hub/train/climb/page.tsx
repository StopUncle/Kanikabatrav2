import Link from "next/link";
import { requireServerAuth } from "@/lib/auth/server-auth";
import { getAccess } from "@/lib/access/tier";
import { prisma } from "@/lib/prisma";
import { getTrainData } from "@/lib/simulator/train-data";
import TrackLadder from "@/components/app-shell/train/TrackLadder";
import { SectionHeader } from "@/components/app-shell/ui";

export const metadata = {
  title: "The Climb | Consilium",
};

/**
 * The Simulator's own menu: the next move, the climb, today's fresh files.
 *
 * This used to be the whole Train page, which meant the deepest game in the
 * app doubled as the room every other game was listed in. Train is the room
 * now. This is one door off it, and it holds only the Simulator.
 */

const REASON_CHIP: Record<string, string> = {
  checkin: "Matched to your check-in",
  resume: "Continue where you left off",
  start: "Start here",
};

export default async function ClimbPage() {
  const userId = await requireServerAuth("/app/train/climb");
  const [{ nextUp, tracks, freshFiles }, access] = await Promise.all([
    getTrainData(prisma, userId),
    getAccess(userId),
  ]);

  return (
    <div className="pb-8 pt-6">
      <div className="px-5">
        <Link
          href="/app/train"
          className="text-app-eyebrow uppercase tracking-app-wide text-[var(--app-dim)]"
        >
          ← Train
        </Link>
        <h1
          className="mt-2 text-app-hero font-light"
          style={{ fontFamily: "var(--font-display)" }}
        >
          The Simulator
        </h1>
        <p className="mt-1 text-app-body text-[var(--app-muted)]">
          Read a person across a whole scene.
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
            <span className="mb-2 block text-app-eyebrow uppercase tracking-app-wide text-[var(--app-gold-soft)]">
              {REASON_CHIP[nextUp.reason]}
            </span>
            <span
              className="block text-app-display"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {nextUp.title}
            </span>
            <span className="mt-2 flex items-center justify-between">
              <span className="text-app-caption text-[var(--app-muted)]">
                {nextUp.trackLabel}
              </span>
              <span className="text-app-caption tracking-app-wide text-[var(--app-gold)]">
                PLAY →
              </span>
            </span>
          </span>
        </Link>
      )}

      <SectionHeader eyebrow="The climb" className="mx-5 mb-1 mt-7" />
      <div className="mx-5">
        <TrackLadder tracks={tracks} isMember={access.isMember} />
      </div>

      {/* Fresh Files */}
      {freshFiles.length > 0 && (
        <>
          <SectionHeader eyebrow="Fresh files" className="mx-5 mb-2.5 mt-7" />
          <div className="flex gap-2.5 overflow-x-auto px-5 pb-1 [scrollbar-width:none]">
            {freshFiles.map((f) => (
              <Link
                key={f.scenarioId}
                href={`/app/train/${f.scenarioId}`}
                className="w-[200px] shrink-0 rounded-2xl border border-[var(--app-line-soft)] bg-[var(--app-card)] p-4"
              >
                <span
                  className="block text-app-lead"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {f.title}
                </span>
                <span className="mt-1.5 line-clamp-2 block text-app-caption text-[var(--app-dim)]">
                  {f.tagline}
                </span>
              </Link>
            ))}
          </div>
        </>
      )}

      {/* The climb walks a track a chapter at a time, which is the right
          default and a bad way to find one specific scenario. The old flat
          catalog stays reachable for that, and it is the only surface with
          the per-track ?track= views. */}
      <Link
        href="/app/train/browse"
        className="mx-5 mt-7 block rounded-2xl border border-dashed border-[var(--app-line)] px-4 py-3.5 text-center text-app-caption tracking-app-wide text-[var(--app-dim)]"
      >
        BROWSE EVERY SCENARIO
      </Link>
    </div>
  );
}
