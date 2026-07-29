import UpgradeWall from "@/components/app-shell/upgrade/UpgradeWall";
import type { UpgradeTrigger } from "@/components/app-shell/upgrade/UpgradeSheet";
import { getAccess, canAccessMemberOnly } from "./tier";

/**
 * Page-level membership gate.
 *
 * Why this exists: until the free tier, `app/hub/layout.tsx` was the single
 * gate and every page under /app inherited member-only for free. Opening the
 * shell to free accounts (A2) removed that inheritance, and the pages fetch
 * their own data through Prisma rather than through the API routes A4 gated,
 * so an ungated page will happily server-render member content to a free
 * account. The API gates do not protect a page render.
 *
 * Call it FIRST, above the queries, so a free account costs no reads:
 *
 *   const userId = await requireServerAuth("/app/feed");
 *   const gate = await memberGate(userId);
 *   if (gate) return gate;
 *
 * Returns null when the caller may proceed, or the wall to render when they
 * may not. The wall names what continues rather than refusing, which is the
 * whole point of showing it instead of redirecting.
 */
export async function memberGate(
  userId: string,
  opts: { trigger?: UpgradeTrigger; returnHref?: string } = {},
): Promise<React.ReactNode | null> {
  const access = await getAccess(userId);
  if (canAccessMemberOnly(access)) return null;
  return (
    <UpgradeWall
      trigger={opts.trigger ?? "chapter-end"}
      returnHref={opts.returnHref ?? "/app"}
    />
  );
}
