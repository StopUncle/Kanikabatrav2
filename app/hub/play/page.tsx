import { requireServerAuth } from "@/lib/auth/server-auth";
import { prisma } from "@/lib/prisma";
import { getArcadeData } from "@/lib/games/arcade";
import DailySetCard from "@/components/app-shell/play/DailySetCard";
import GameCard from "@/components/app-shell/play/GameCard";

export const metadata = {
  title: "Arcade | Consilium",
};

/**
 * The Arcade: the daily set, then one card per game.
 *
 * Deliberately no coming-soon grid. Two finished cards read as curated; two
 * cards plus a row of grey rectangles reads as unfinished, and naming games
 * that do not exist is a promise nobody agreed to make.
 */
export default async function ArcadePage() {
  const userId = await requireServerAuth("/app/play");
  const { games, set, streak } = await getArcadeData(prisma, userId);

  return (
    <div className="px-5 pb-8 pt-6">
      <h1
        className="text-[28px] font-light"
        style={{ fontFamily: "var(--font-display)" }}
      >
        Arcade
      </h1>
      <p className="mb-5 mt-1 text-[13px] text-[var(--app-muted)]">
        The snap-call underneath the read. A minute each.
      </p>

      <DailySetCard set={set} streak={streak} href={null} />

      <p className="mb-2.5 mt-7 text-[11px] uppercase tracking-[0.26em] text-[var(--app-dim)]">
        Games
      </p>
      <div className="flex flex-col gap-3">
        {games.map((game, i) => (
          <GameCard key={game.key} game={game} delayMs={i * 90} />
        ))}
      </div>

      <p className="mt-7 text-center text-[11.5px] leading-relaxed text-[var(--app-dim)]">
        The Simulator teaches you to read a person across a scene. These train
        the instinct that fires before you have time to think.
      </p>
    </div>
  );
}
