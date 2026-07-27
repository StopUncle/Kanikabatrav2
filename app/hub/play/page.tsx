import { requireServerAuth } from "@/lib/auth/server-auth";
import { prisma } from "@/lib/prisma";
import { getArcadeData } from "@/lib/games/arcade";
import { getBentoData } from "@/lib/games/bento";
import DailySetCard from "@/components/app-shell/play/DailySetCard";
import ArcadeBento from "@/components/app-shell/play/ArcadeBento";

export const metadata = {
  title: "Arcade | Consilium",
};

/**
 * The Arcade: today's set, then the bento.
 *
 * The Simulator is the hero because it is the deepest thing here and the
 * only tile that can lead with a line of real scene text rather than a
 * description of itself. The rest are squares on a rail, ordered by what
 * the member has left undone today and then by what the room has been
 * playing this week. The Lab gets a strip: it is open-ended and does not
 * belong in a grid of timed things.
 */
export default async function ArcadePage() {
  const userId = await requireServerAuth("/app/play");

  const [{ set, streak }, bento] = await Promise.all([
    getArcadeData(prisma, userId),
    getBentoData(prisma, userId),
  ]);

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

      <div className="mt-6">
        <ArcadeBento data={bento} />
      </div>
    </div>
  );
}
