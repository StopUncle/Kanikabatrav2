/**
 * The badge wall.
 *
 * Reads `SimulatorBadge` only. There are three badge-ish systems in the
 * schema and only this one is alive: `Achievement`/`UserAchievement` is a
 * legacy generic table nothing writes any more, and the tenure tiers in
 * components/consilium/badge-tiers.ts answer a different question (how long
 * you have been here, not what you have done).
 *
 * `AchievementMeta.slug` is documented to match `SimulatorBadge.badgeKey`,
 * and `getAchievementMeta` falls back to generic bronze metadata for keys
 * that have not been registered yet, so the join can never crash on a badge
 * a scenario ships ahead of the catalogue.
 */

import type { PrismaClient } from "@prisma/client";
import {
  CATEGORY_LABELS,
  CATEGORY_ORDER,
  SIMULATOR_ACHIEVEMENT_CATALOGUE,
  getAchievementMeta,
  type AchievementCategory,
  type AchievementMeta,
  type AchievementRarity,
} from "@/lib/simulator/achievements";

export interface WallBadge {
  slug: string;
  name: string;
  description: string;
  rarity: AchievementRarity;
  earned: boolean;
  earnedAt: Date | null;
  /** Shown on locked medallions. Secrets deliberately withhold theirs. */
  hint: string | null;
  secret: boolean;
}

export interface WallGroup {
  category: AchievementCategory;
  label: string;
  earned: number;
  total: number;
  badges: WallBadge[];
}

export interface BadgeWall {
  earned: number;
  total: number;
  /** Most recent first, for the strip at the top. */
  latest: WallBadge[];
  groups: WallGroup[];
}

export async function getBadgeWall(
  prisma: PrismaClient,
  userId: string,
): Promise<BadgeWall> {
  const rows = await prisma.simulatorBadge.findMany({
    where: { userId },
    select: { badgeKey: true, earnedAt: true },
    orderBy: { earnedAt: "desc" },
  });

  const earnedAtByKey = new Map(rows.map((r) => [r.badgeKey, r.earnedAt]));

  const toWallBadge = (meta: AchievementMeta): WallBadge => {
    const earnedAt = earnedAtByKey.get(meta.slug) ?? null;
    return {
      slug: meta.slug,
      name: meta.name,
      description: meta.description,
      rarity: meta.rarity,
      earned: earnedAt !== null,
      earnedAt,
      hint: earnedAt === null ? (meta.unlockHint ?? null) : null,
      secret: meta.secret,
    };
  };

  const all = SIMULATOR_ACHIEVEMENT_CATALOGUE.map(toWallBadge);

  // A badge the member holds whose key is not in the catalogue still belongs
  // on their wall: it is theirs, the catalogue just has not caught up.
  const known = new Set(all.map((b) => b.slug));
  for (const row of rows) {
    if (!known.has(row.badgeKey)) {
      all.push(toWallBadge(getAchievementMeta(row.badgeKey)));
    }
  }

  const byCategory = new Map<AchievementCategory, WallBadge[]>();
  for (const meta of SIMULATOR_ACHIEVEMENT_CATALOGUE) {
    const list = byCategory.get(meta.category) ?? [];
    list.push(all.find((b) => b.slug === meta.slug)!);
    byCategory.set(meta.category, list);
  }

  const groups: WallGroup[] = CATEGORY_ORDER.map((category) => {
    const badges = byCategory.get(category) ?? [];
    // Secrets stay hidden until earned, so the wall never spoils a fail-path
    // or an easter egg by listing it.
    const visible = badges.filter((b) => !b.secret || b.earned);
    return {
      category,
      label: CATEGORY_LABELS[category],
      earned: badges.filter((b) => b.earned).length,
      total: badges.length,
      badges: visible.sort((a, b) => {
        if (a.earned !== b.earned) return a.earned ? -1 : 1;
        return a.name.localeCompare(b.name);
      }),
    };
  }).filter((g) => g.badges.length > 0);

  const earnedBadges = all.filter((b) => b.earned);

  return {
    earned: earnedBadges.length,
    total: all.length,
    latest: earnedBadges
      .sort(
        (a, b) => (b.earnedAt?.getTime() ?? 0) - (a.earnedAt?.getTime() ?? 0),
      )
      .slice(0, 4),
    groups,
  };
}
