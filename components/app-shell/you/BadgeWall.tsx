import type { BadgeWall as Wall, WallBadge } from "@/lib/badges/wall";

/**
 * The trophy room.
 *
 * Earned badges carry their rarity colour; locked ones are embossed
 * silhouettes with the unlock hint, so the wall reads as a map of what is
 * still out there rather than a list of failures. Secrets never appear until
 * they are earned, which is what makes finding one worth anything.
 */

const RARITY: Record<string, { ring: string; text: string; fill: string }> = {
  bronze: {
    ring: "rgba(183,110,121,0.45)",
    text: "var(--app-rose)",
    fill: "rgba(183,110,121,0.10)",
  },
  silver: {
    ring: "rgba(214,214,222,0.45)",
    text: "#d6d6de",
    fill: "rgba(214,214,222,0.09)",
  },
  gold: {
    ring: "rgba(212,175,55,0.55)",
    text: "var(--app-gold)",
    fill: "rgba(212,175,55,0.12)",
  },
  obsidian: {
    ring: "rgba(165,180,252,0.5)",
    text: "#a5b4fc",
    fill: "rgba(165,180,252,0.10)",
  },
};

function Medallion({ badge }: { badge: WallBadge }) {
  const tone = RARITY[badge.rarity] ?? RARITY.bronze;

  return (
    <div
      className="flex items-start gap-3 rounded-2xl border p-3"
      style={{
        borderColor: badge.earned ? tone.ring : "var(--app-line-soft)",
        background: badge.earned ? tone.fill : "transparent",
        opacity: badge.earned ? 1 : 0.55,
      }}
    >
      <span
        aria-hidden
        className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[12px]"
        style={{
          border: `1px solid ${badge.earned ? tone.ring : "var(--app-line-soft)"}`,
          color: badge.earned ? tone.text : "var(--app-dim)",
        }}
      >
        {badge.earned ? "✦" : "·"}
      </span>
      <span className="min-w-0 flex-1">
        <span
          className="block text-[13.5px] font-medium leading-snug"
          style={{ color: badge.earned ? "var(--app-text)" : "var(--app-muted)" }}
        >
          {badge.name}
        </span>
        <span className="mt-0.5 block text-[11.5px] leading-relaxed text-[var(--app-dim)]">
          {badge.earned ? badge.description : (badge.hint ?? "Not yet found.")}
        </span>
      </span>
    </div>
  );
}

export default function BadgeWall({ wall }: { wall: Wall }) {
  if (wall.total === 0) return null;

  return (
    <section>
      <div className="mb-2.5 flex items-baseline justify-between">
        <p className="text-[11px] uppercase tracking-[0.26em] text-[var(--app-dim)]">
          Badges
        </p>
        <p className="text-[11px] tabular-nums text-[var(--app-dim)]">
          {wall.earned} of {wall.total}
        </p>
      </div>

      {wall.earned === 0 ? (
        <div className="rounded-2xl border border-[var(--app-line-soft)] bg-[var(--app-card)] p-4">
          <p className="text-[13.5px] leading-relaxed text-[var(--app-muted)]">
            None yet. They come from scenarios: the endings you reach, the
            tactics you name, the ones you walk out of.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-5">
          {wall.groups
            .filter((g) => g.earned > 0)
            .map((group) => (
              <div key={group.category}>
                <p className="mb-2 text-[11.5px] text-[var(--app-muted)]">
                  {group.label}
                  <span className="text-[var(--app-dim)]">
                    {" "}
                    {group.earned}/{group.total}
                  </span>
                </p>
                <div className="flex flex-col gap-2">
                  {group.badges
                    .filter((b) => b.earned)
                    .map((b) => (
                      <Medallion key={b.slug} badge={b} />
                    ))}
                </div>
              </div>
            ))}
        </div>
      )}
    </section>
  );
}
