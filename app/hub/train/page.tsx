import { requireServerAuth } from "@/lib/auth/server-auth";
import { prisma } from "@/lib/prisma";
import { getAccess } from "@/lib/access/tier";
import { getArcadeData } from "@/lib/games/arcade";
import { getBentoData } from "@/lib/games/bento";
import DailySetCard from "@/components/app-shell/play/DailySetCard";
import ArcadeBento from "@/components/app-shell/play/ArcadeBento";
import { PageHeader, PageShell } from "@/components/app-shell/ui";

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

  const [{ set, streak }, bento, access] = await Promise.all([
    getArcadeData(prisma, userId),
    getBentoData(prisma, userId),
    getAccess(userId),
  ]);

  return (
    <PageShell>
      <PageHeader
        title="Train"
        lede="Practice reads people faster than theory ever will."
      />

      <DailySetCard set={set} streak={streak} href={null} />

      <div className="mt-6">
        <ArcadeBento data={bento} isMember={access.isMember} />
      </div>
    </PageShell>
  );
}
