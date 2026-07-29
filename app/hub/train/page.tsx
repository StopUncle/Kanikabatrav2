import { requireServerAuth } from "@/lib/auth/server-auth";
import { prisma } from "@/lib/prisma";
import { getArcadeData } from "@/lib/games/arcade";
import { getBentoData } from "@/lib/games/bento";
import DailySetCard from "@/components/app-shell/play/DailySetCard";
import ArcadeBento from "@/components/app-shell/play/ArcadeBento";

export const metadata = {
  title: "Train | Consilium",
};

/**
 * Train: the room every way to practise opens off.
 *
 * There were two menus for one idea. Train listed the Simulator and then
 * pointed at the Arcade; the Arcade listed the Simulator and everything else
 * over again. So the Arcade is the room now and it lives here, on the tab
 * members already reach for. Today's set sits on top because it is the only
 * thing here with a clock on it; the bento holds the doors.
 *
 * Every tile opens that game's own menu, never the middle of a game. The
 * Simulator's menu is the climb, one door deeper.
 */
export default async function TrainPage() {
  const userId = await requireServerAuth("/app/train");

  const [{ set, streak }, bento] = await Promise.all([
    getArcadeData(prisma, userId),
    getBentoData(prisma, userId),
  ]);

  return (
    <div className="px-5 pb-8 pt-6">
      <h1
        className="text-app-hero font-light"
        style={{ fontFamily: "var(--font-display)" }}
      >
        Train
      </h1>
      <p className="mb-5 mt-1 text-app-body text-[var(--app-muted)]">
        Practice reads people faster than theory ever will.
      </p>

      <DailySetCard set={set} streak={streak} href={null} />

      <div className="mt-6">
        <ArcadeBento data={bento} />
      </div>
    </div>
  );
}
