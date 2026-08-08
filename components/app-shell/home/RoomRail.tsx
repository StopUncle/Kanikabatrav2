import Link from "next/link";
import type { RoomState } from "@/lib/app/room";

/**
 * The room: how many people are in here, and a few of them by name.
 *
 * Home lists what the product contains; this is the half that says other
 * people are using it. It sits at the bottom of the explore zone on
 * purpose, after somebody has seen what there is to do: "here is the
 * place, and here is who is in it" reads better than the reverse.
 *
 * Not a nav section. It renders below the config-driven rails rather than
 * being an entry in HOME_SECTION_ORDER, because a Home section name must
 * also be a More section name (moreSectionFor falls back to home.section),
 * and "The room" is not a menu destination. The boards are; the card at
 * the end of the rail goes there.
 *
 * There are no avatars in this app, so a face is a monogram tinted by the
 * member's ring. That is the whole visual, and it is enough: the point is
 * that the names are real.
 */

/** Ring colour, coarse. Matches the standing palette's broad bands. */
function ringTint(ringLevel: number): string {
  if (ringLevel <= 1) return "var(--app-gold)";
  if (ringLevel === 2) return "var(--game-receipts)";
  if (ringLevel === 3) return "var(--game-scenario)";
  return "var(--app-muted)";
}

function monogram(name: string): string {
  const c = name.trim().charAt(0);
  return c ? c.toUpperCase() : "M";
}

export default function RoomRail({ room }: { room: RoomState }) {
  // Nobody named yet and nobody seen: a brand-new install or an empty
  // week. Say nothing rather than render an empty room, which sells the
  // opposite of what this is for.
  if (room.trainingThisWeek === 0 && room.faces.length === 0) return null;

  return (
    <section>
      <div className="mx-5 mb-2.5 flex items-baseline justify-between gap-3">
        <p className="text-app-eyebrow uppercase tracking-app-label text-[var(--app-dim)]">
          The room
        </p>
        {room.trainingThisWeek > 0 && (
          <p className="text-app-tiny tabular-nums text-[var(--app-dim)]">
            {room.trainingThisWeek} training this week
          </p>
        )}
      </div>

      <div className="scrollbar-hide flex snap-x gap-2.5 overflow-x-auto px-5">
        {room.faces.map((face, i) => {
          const tint = ringTint(face.ringLevel);
          return (
            <div
              key={face.id}
              className="app-rise flex w-[104px] shrink-0 snap-start flex-col items-start gap-2.5 rounded-2xl border border-[var(--app-line-soft)] bg-[var(--app-card)] px-3.5 py-3.5"
              style={{ animationDelay: `${i * 45}ms` }}
            >
              <span
                className="flex h-[34px] w-[34px] items-center justify-center rounded-full text-[15px]"
                style={{
                  color: tint,
                  background: `color-mix(in srgb, ${tint} 12%, transparent)`,
                  fontFamily: "var(--font-display)",
                }}
                aria-hidden
              >
                {monogram(face.name)}
              </span>
              <span className="w-full">
                <span className="block truncate text-[13px] leading-tight text-[var(--app-text)]">
                  {face.name}
                </span>
                <span className="mt-0.5 block text-app-micro tabular-nums text-[var(--app-dim)]">
                  {face.standing.toLocaleString()}
                </span>
              </span>
            </div>
          );
        })}

        {/* The rail ends in the door rather than just stopping. */}
        <Link
          href="/app/ranks"
          className="app-rise flex w-[104px] shrink-0 snap-start flex-col justify-center rounded-2xl border border-dashed border-[var(--app-line)] px-3.5 py-3.5 text-app-caption leading-snug text-[var(--app-muted)] transition-colors active:bg-[var(--app-card-2)]"
          style={{ animationDelay: `${room.faces.length * 45}ms` }}
        >
          See the boards →
        </Link>
      </div>
    </section>
  );
}
