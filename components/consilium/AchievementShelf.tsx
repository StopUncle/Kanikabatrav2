/**
 * AchievementShelf, the trophy case for the Dark Mirror simulator.
 *
 * Server component. Reads the user's SimulatorBadge rows directly, joins
 * against the static catalogue in lib/simulator/achievements.ts, groups by
 * category, and renders hex medallions. No JS shipped for the shelf itself
 *, the hover detail is a pure CSS `group-hover` overlay.
 *
 * Visual language is deliberately different from the round tenure MemberBadge
 * (the 12-tier ranking system). This shelf uses hex plates with burgundy +
 * bronze palettes and four rarity tiers (bronze, silver, gold, obsidian),
 * so both systems coexist on the profile without reading as the same thing.
 */

import { prisma } from "@/lib/prisma";
import {
  SIMULATOR_ACHIEVEMENT_CATALOGUE,
  CATEGORY_LABELS,
  CATEGORY_ORDER,
  getAchievementMeta,
  type AchievementMeta,
  type AchievementRarity,
  type AchievementCategory,
} from "@/lib/simulator/achievements";
import type { SimulatorBadgeDef } from "@/lib/simulator/badges";
import {
  Award,
  Crown,
  Eye,
  Flame,
  Shield,
  Sparkles,
  Star,
  Skull,
  Lock,
} from "lucide-react";

// ---------------------------------------------------------------------------
// Rarity palettes. Tuned to differ clearly from the tenure-gold #d4af37 of
// MemberBadge, so the two seal languages don't compete on the profile.
// ---------------------------------------------------------------------------

type Palette = {
  /** Hex fill gradient, light / mid / dark stops. */
  light: string;
  mid: string;
  dark: string;
  /** Rim + inner engraved line. */
  rim: string;
  /** Central icon tint when earned. */
  icon: string;
  /** Hover halo (subtle glow). */
  halo: string;
  /** Short label for the tooltip rarity pill. */
  label: string;
};

const PALETTES: Record<AchievementRarity, Palette> = {
  bronze: {
    light: "#c79670",
    mid: "#8B5A3C",
    dark: "#4a2e1d",
    rim: "#722139", // accent-burgundy, ties the medallion to the brand
    icon: "#e8c4a3",
    halo: "rgba(139,90,60,0.45)",
    label: "Bronze",
  },
  silver: {
    light: "#d4d6e0",
    mid: "#8d8f9e",
    dark: "#3e4049",
    rim: "#2a2b33",
    icon: "#ecedf3",
    halo: "rgba(141,143,158,0.4)",
    label: "Silver",
  },
  gold: {
    light: "#e8c877",
    mid: "#a27a1d",
    dark: "#5a4310",
    rim: "#4d2818",
    icon: "#f4d988",
    halo: "rgba(162,122,29,0.5)",
    label: "Gold",
  },
  obsidian: {
    light: "#4a3f55",
    mid: "#1e1825",
    dark: "#05030a",
    rim: "#5a2238", // obsidian deep-burgundy
    icon: "#e6c8f0",
    halo: "rgba(90,34,56,0.6)",
    label: "Obsidian",
  },
};

// Points for a pointy-top hex on a 100x115 viewBox.
const HEX_POINTS = "50,2 96,28 96,86 50,112 4,86 4,28";
const HEX_INNER = "50,10 88,32 88,84 50,105 12,84 12,32";

function iconFor(name: SimulatorBadgeDef["icon"], color: string, size = 26) {
  const props = { size, strokeWidth: 1.5, color } as const;
  switch (name) {
    case "shield":   return <Shield {...props} />;
    case "crown":    return <Crown {...props} />;
    case "eye":      return <Eye {...props} />;
    case "sparkles": return <Sparkles {...props} />;
    case "flame":    return <Flame {...props} />;
    case "skull":    return <Skull {...props} />;
    case "award":    return <Award {...props} />;
    case "star":
    default:         return <Star {...props} />;
  }
}

// ---------------------------------------------------------------------------
// One medallion.
// ---------------------------------------------------------------------------

type MedallionProps = {
  meta: AchievementMeta;
  earned: boolean;
  earnedAt: Date | null;
};

function Medallion({ meta, earned, earnedAt }: MedallionProps) {
  const palette = PALETTES[meta.rarity];
  const hideIdentity = meta.secret && !earned;
  const displayName = hideIdentity ? "?????" : meta.name;
  const displayDesc = hideIdentity
    ? "A secret path. Earn it to reveal."
    : meta.description;

  // useId is client-only; for an SSR-safe unique id we splice the slug.
  const safeId = meta.slug.replace(/[^a-z0-9_-]/gi, "");
  const fillId = `hex-fill-${safeId}`;
  const haloId = `hex-halo-${safeId}`;

  return (
    // `tabIndex=0` + focus-within tooltip, gives mobile users a way to see
    // the description via tap (which focuses the element) since pure CSS
    // `:hover` doesn't fire on touch. Desktop keyboard users get tab-stop
    // too. Aria-label carries the full semantic for screen readers.
    <div
      className="group relative focus:outline-none"
      tabIndex={0}
      role="button"
      aria-label={`${displayName}${earned ? ". Earned." : ". Locked."} ${displayDesc}`}
    >
      <div
        className={`relative transition-transform duration-200 ${
          earned ? "hover:-translate-y-0.5 group-focus:-translate-y-0.5" : ""
        }`}
      >
        <svg
          viewBox="0 0 100 115"
          className={`w-full h-auto ${earned ? "" : "opacity-40 grayscale"}`}
          aria-label={`${displayName}, ${palette.label} achievement${earned ? ", earned" : ", locked"}`}
        >
          <defs>
            <linearGradient id={fillId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={palette.light} />
              <stop offset="50%" stopColor={palette.mid} />
              <stop offset="100%" stopColor={palette.dark} />
            </linearGradient>
            <radialGradient id={haloId} cx="50%" cy="50%" r="55%">
              <stop offset="0%" stopColor={palette.halo} stopOpacity="0.9" />
              <stop offset="100%" stopColor={palette.halo} stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Halo (only on earned), soft rarity glow, mobile-safe single layer. */}
          {earned && <polygon points={HEX_POINTS} fill={`url(#${haloId})`} />}

          {/* Main plate */}
          <polygon
            points={HEX_POINTS}
            fill={`url(#${fillId})`}
            stroke={palette.rim}
            strokeWidth="1.5"
          />

          {/* Engraved inner line */}
          <polygon
            points={HEX_INNER}
            fill="none"
            stroke={palette.rim}
            strokeWidth="0.7"
            opacity="0.6"
          />

          {/* Rarity notch at bottom. Four small pips for obsidian, three for gold, etc. */}
          <RarityPips rarity={meta.rarity} fill={palette.rim} />

          {/* Central icon */}
          <foreignObject x="30" y="38" width="40" height="40">
            <div
              style={{ width: 40, height: 40 }}
              className="flex items-center justify-center"
            >
              {iconFor(meta.icon, earned ? palette.icon : "#3a3a40", 24)}
            </div>
          </foreignObject>

          {/* Lock overlay on locked. Icon colour chosen for contrast against
              the desaturated + 40%-opacity plate, a near-black lock on a
              dark-burgundy background was invisible (~2:1 ratio), so we use
              a light warm-gray instead. */}
          {!earned && (
            <foreignObject x="40" y="78" width="20" height="20">
              <div
                style={{ width: 20, height: 20 }}
                className="flex items-center justify-center"
              >
                <Lock size={12} strokeWidth={2} color="#c9c4bd" />
              </div>
            </foreignObject>
          )}
        </svg>
      </div>

      {/* Medallion label */}
      <p
        className={`mt-2 text-[10px] uppercase tracking-[0.18em] text-center leading-tight line-clamp-2 min-h-[1.75rem] ${
          earned ? "text-text-light" : "text-text-gray/50"
        }`}
      >
        {displayName}
      </p>

      {/* Hover / focus tooltip. CSS only, no JS. `group-focus:` makes it
          work for keyboard-tab and for mobile-tap (tap triggers focus on a
          tabIndex=0 element). `group-focus-within:` covers nested focusable
          children too. */}
      <div className="pointer-events-none absolute left-1/2 top-full z-20 w-56 -translate-x-1/2 translate-y-2 rounded-xl border border-accent-burgundy/40 bg-deep-black/95 p-3 text-left opacity-0 shadow-[0_12px_32px_-16px_rgba(0,0,0,0.9)] transition-opacity group-hover:opacity-100 group-focus:opacity-100 group-focus-within:opacity-100">
        <div className="mb-1.5 flex items-center gap-1.5">
          <span
            className="inline-flex h-1.5 w-1.5 rounded-full"
            style={{ background: palette.mid }}
          />
          <span
            className="text-[9px] uppercase tracking-[0.25em]"
            style={{ color: palette.light }}
          >
            {palette.label}
          </span>
        </div>
        <p
          className={`text-sm font-light mb-1 ${
            earned ? "text-text-light" : "text-text-gray"
          }`}
        >
          {displayName}
        </p>
        <p className="text-xs font-light leading-relaxed text-text-gray">
          {displayDesc}
        </p>
        {earned && earnedAt && (
          <p className="mt-2 text-[9px] uppercase tracking-[0.25em] text-warm-gold/70">
            Earned {earnedAt.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
          </p>
        )}
        {!earned && meta.unlockHint && !hideIdentity && (
          <p className="mt-2 text-[10px] font-light italic text-text-gray/60">
            {meta.unlockHint}
          </p>
        )}
      </div>
    </div>
  );
}

function RarityPips({ rarity, fill }: { rarity: AchievementRarity; fill: string }) {
  const count = rarity === "bronze" ? 1 : rarity === "silver" ? 2 : rarity === "gold" ? 3 : 4;
  const spacing = 5;
  const startX = 50 - ((count - 1) * spacing) / 2;
  return (
    <g fill={fill} opacity="0.85">
      {Array.from({ length: count }, (_, i) => (
        <circle key={i} cx={startX + i * spacing} cy={98} r={1.3} />
      ))}
    </g>
  );
}

// ---------------------------------------------------------------------------
// The shelf.
// ---------------------------------------------------------------------------

type AchievementShelfProps = {
  userId: string;
  /** When true, render inside a parent card surface instead of full-bleed. */
  embedded?: boolean;
};

export default async function AchievementShelf({
  userId,
  embedded = false,
}: AchievementShelfProps) {
  const earnedRows = await prisma.simulatorBadge.findMany({
    where: { userId },
    select: { badgeKey: true, earnedAt: true },
  });

  const earnedMap = new Map(
    earnedRows.map((r) => [r.badgeKey, r.earnedAt]),
  );

  // Pick up any user-earned keys that aren't in the catalogue (e.g. male-track
  // scenario badges whose reward keys aren't registered in badges.ts yet).
  // They render as generic bronze fallbacks rather than disappearing.
  const extraEarned: AchievementMeta[] = [];
  // Array.from(...) instead of spread/iterator for-of. Railway's TS target
  // doesn't enable downlevelIteration, so `for (const k of map.keys())`
  // errors in build even though it runs locally. Same gotcha that tripped
  // `measure-path-lengths.ts` recently.
  const earnedKeys = Array.from(earnedMap.keys());
  for (const key of earnedKeys) {
    if (!SIMULATOR_ACHIEVEMENT_CATALOGUE.some((m) => m.slug === key)) {
      extraEarned.push(getAchievementMeta(key));
    }
  }

  // Visible = catalogue entries that are either (a) not secret OR (b) earned.
  // Secret-locked entries stay hidden; once earned they slide in.
  const visibleCatalogue = SIMULATOR_ACHIEVEMENT_CATALOGUE.filter(
    (m) => !m.secret || earnedMap.has(m.slug),
  );
  const entries = [...visibleCatalogue, ...extraEarned];

  // Group by category preserving CATEGORY_ORDER
  const byCategory = new Map<AchievementCategory, AchievementMeta[]>();
  for (const c of CATEGORY_ORDER) byCategory.set(c, []);
  for (const entry of entries) {
    byCategory.get(entry.category)?.push(entry);
  }

  const totalEarned = earnedRows.length;
  const totalCatalogue = SIMULATOR_ACHIEVEMENT_CATALOGUE.length;
  const pct = Math.round((Math.min(totalEarned, totalCatalogue) / totalCatalogue) * 100);

  return (
    <section className={embedded ? "" : "mb-12"}>
      <div className="text-center mb-6">
        <p className="text-accent-burgundy/90 text-xs uppercase tracking-[0.3em] mb-2">
          Dark Mirror · Trophy Case
        </p>
        <h2 className="text-2xl sm:text-3xl font-extralight tracking-wider uppercase text-text-light mb-2">
          Achievements
        </h2>
        <p className="text-text-gray text-sm max-w-xl mx-auto">
          Scenario wins, mastery runs, cross-track discipline. The tenure
          seal climbs with months; these are earned with runs.
        </p>
        <p className="mt-4 text-xs text-text-gray/70 tracking-wide">
          <span className="text-warm-gold/80 tabular-nums">{totalEarned}</span>
          <span className="mx-2 text-text-gray/40">/</span>
          <span className="tabular-nums">{totalCatalogue}</span>
          <span className="ml-3 text-text-gray/50">· {pct}%</span>
        </p>
      </div>

      <div className="space-y-10">
        {CATEGORY_ORDER.map((cat) => {
          const items = byCategory.get(cat) ?? [];
          if (items.length === 0) return null;
          return (
            <div key={cat}>
              <header className="mb-4 flex items-baseline justify-between">
                <h3 className="text-[11px] uppercase tracking-[0.35em] text-warm-gold/80">
                  {CATEGORY_LABELS[cat]}
                </h3>
                <span className="text-[10px] uppercase tracking-[0.25em] text-text-gray/50 tabular-nums">
                  {items.filter((i) => earnedMap.has(i.slug)).length} / {items.length}
                </span>
              </header>
              {/* Breakpoints: 3-wide on phones (≤640px), 5 on ≥640px,
                  6 on ≥768px, 8 on ≥1024px. The `xs:` prefix isn't a
                  configured breakpoint in this project's tailwind.config.js
                  (`xs` there is a border-radius token, not a screen), so
                  don't reach for `xs:grid-cols-4`, it would silently
                  resolve to nothing and has already been removed. */}
              <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 gap-4 sm:gap-5">
                {items.map((meta) => (
                  <Medallion
                    key={meta.slug}
                    meta={meta}
                    earned={earnedMap.has(meta.slug)}
                    earnedAt={earnedMap.get(meta.slug) ?? null}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
