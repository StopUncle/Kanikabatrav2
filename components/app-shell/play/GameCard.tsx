import Link from "next/link";
import Sheen from "@/components/app-shell/juice/Sheen";
import type { ArcadeGame } from "@/lib/games/arcade";

/**
 * One game in the Arcade. Bigger than a `Move` row on purpose: a game needs
 * to look like somewhere you go, not another item on a list.
 *
 * Each game owns an accent so the two are told apart at a glance before the
 * titles are read. Gold is the drill (speed, the clock), rose is the Tell
 * (reading a person). Server component; the sheen is the only client bit.
 */

const ART: Record<
  string,
  { accent: string; glow: string; icon: React.ReactNode }
> = {
  "speed-drill": {
    accent: "var(--app-gold)",
    glow: "radial-gradient(85% 120% at 82% 12%, rgba(212,175,55,0.20), transparent 62%), linear-gradient(150deg, #1d1810, #100d0a 78%)",
    icon: (
      <svg viewBox="0 0 24 24">
        <circle cx="12" cy="13" r="8" />
        <path d="M12 9v4l2.5 2.5M9 2h6" />
      </svg>
    ),
  },
  "daily-tell": {
    accent: "var(--app-rose)",
    glow: "radial-gradient(85% 120% at 82% 12%, rgba(183,110,121,0.20), transparent 62%), linear-gradient(150deg, #1d1315, #100b0c 78%)",
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M2 12s3.8-6 10-6 10 6 10 6-3.8 6-10 6-10-6-10-6z" />
        <circle cx="12" cy="12" r="2.6" />
      </svg>
    ),
  },
};

const FALLBACK = ART["speed-drill"];

export default function GameCard({
  game,
  delayMs = 0,
}: {
  game: ArcadeGame;
  delayMs?: number;
}) {
  const art = ART[game.key] ?? FALLBACK;
  const locked = Boolean(game.unavailable);

  const inner = (
    <>
      <Sheen delayMs={delayMs + 260} />
      <span className="relative flex items-start gap-3.5">
        <span
          className="flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-xl [&>svg]:h-[21px] [&>svg]:w-[21px] [&>svg]:fill-none [&>svg]:stroke-current [&>svg]:[stroke-width:1.5]"
          style={{
            color: art.accent,
            background: "rgba(255,255,255,0.045)",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          {art.icon}
        </span>

        <span className="min-w-0 flex-1">
          <span className="flex items-center gap-2">
            <span
              className="truncate text-[19px] leading-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {game.title}
            </span>
            {game.isNew && !locked && (
              <span className="shrink-0 rounded-full bg-[rgba(127,184,144,0.15)] px-2 py-0.5 text-[9px] uppercase tracking-[0.14em] text-[var(--app-green)]">
                New
              </span>
            )}
          </span>
          <span className="mt-1 block text-[12.5px] leading-relaxed text-[var(--app-muted)]">
            {game.unavailable ?? game.blurb}
          </span>
        </span>

        {!locked && (
          <span
            className="shrink-0 text-[11px] tracking-[0.12em]"
            style={{ color: game.doneToday ? "var(--app-green)" : art.accent }}
          >
            {game.doneToday ? "✓ DONE" : `${game.cta} →`}
          </span>
        )}
      </span>

      {game.stats.length > 0 && (
        <span className="relative mt-4 flex items-center gap-5 border-t border-[rgba(255,255,255,0.05)] pt-3">
          {game.stats.map((s) => (
            <span key={s.label} className="flex items-baseline gap-1.5">
              <span className="text-[14px] tabular-nums text-[var(--app-text)]">
                {s.value}
              </span>
              <span className="text-[10px] uppercase tracking-[0.14em] text-[var(--app-dim)]">
                {s.label}
              </span>
            </span>
          ))}
        </span>
      )}
    </>
  );

  const shell =
    "relative block overflow-hidden rounded-[22px] border border-[var(--app-line)] p-[18px]";

  if (locked) {
    return (
      <div
        className={`${shell} opacity-55`}
        style={{ background: art.glow }}
        aria-disabled
      >
        {inner}
      </div>
    );
  }

  return (
    <Link
      href={game.href}
      className={`${shell} transition-transform active:scale-[0.985] ${
        game.doneToday ? "opacity-70" : ""
      }`}
      style={{ background: art.glow }}
    >
      {inner}
    </Link>
  );
}
