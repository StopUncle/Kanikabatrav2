import Link from "next/link";
import DailyCheckInCard from "@/components/consilium/DailyCheckInCard";
import type { SituationKey } from "@/lib/checkin/situations";
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

export default async function ClimbPage({
  searchParams,
}: {
  searchParams: Promise<{ cleared?: string }>;
}) {
  const userId = await requireServerAuth("/app/train/climb");
  const [{ nextUp, tracks, freshFiles, checkin }, access, { cleared }] =
    await Promise.all([
      getTrainData(prisma, userId),
      getAccess(userId),
      searchParams,
    ]);

  // The victory lap. Arriving with ?cleared= means the member just beat
  // that scenario and was routed back through the map: open its track and
  // let the trail play the ceremony. Generated scenarios have no track, so
  // this quietly finds nothing and the map opens as normal.
  const clearedTrack = cleared
    ? (tracks.find((t) => t.rungs.some((r) => r.scenarioId === cleared))
        ?.track ?? null)
    : null;

  return (
    <div className="pb-8 pt-6">
      <div className="px-5">
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

      {/* The daily check-in, rehomed from the retired browse catalog. */}
      <div className="mx-5 mt-6">
        <DailyCheckInCard
          gender={checkin.gender}
          nextByTrack={checkin.nextByTrack}
          initial={
            checkin.initial
              ? {
                  situation: checkin.initial.situation as SituationKey,
                  recommendedTrack: checkin.initial.recommendedTrack,
                }
              : null
          }
        />
      </div>

      <SectionHeader eyebrow="The climb" className="mx-5 mb-1 mt-7" />
      <div className="mx-5">
        <TrackLadder
          tracks={tracks}
          isMember={access.isMember}
          initialOpenTrack={clearedTrack}
          celebrateScenarioId={clearedTrack ? (cleared ?? null) : null}
        />
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

    </div>
  );
}
