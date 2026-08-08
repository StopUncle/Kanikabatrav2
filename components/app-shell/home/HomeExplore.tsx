import Link from "next/link";
import {
  HOME_SECTIONS,
  surfaceLocked,
  requiresLabel,
  type AppSurface,
  type ViewerTier,
} from "@/lib/app/nav";
import {
  BookOpen,
  Brain,
  CalendarCheck,
  Eye,
  FlaskConical,
  Map,
  MessageSquare,
  Mic,
  Mountain,
  Receipt,
  Route,
  Timer,
  Trophy,
  User,
  Video,
  Waypoints,
} from "lucide-react";
import Sheen from "@/components/app-shell/juice/Sheen";

/**
 * Home's explore zone: everything the app owns, browsable without a menu.
 * Renders below the action zone, one section per Home rail in the nav
 * config. The config owns WHAT appears and in which section; this owns how
 * a card looks.
 *
 * Sizing is the whole design. There is no artwork in this app and there is
 * not going to be, so a browsable catalogue cannot be built out of poster
 * images; it is built out of SIZE DIFFERENCE and accent colour, which is
 * the lesson ArcadeBento already records: "when every tile is the same size
 * nothing is important." Three tiers, declared per surface in nav.ts:
 *
 *   hero    - full width, accent gradient. At most three on the page, or
 *             the tier stops meaning anything.
 *   default - the 164px rail card. The workhorse.
 *   compact - glyph and label, no hook. For destinations people NAVIGATE
 *             to rather than browse (their own progress, the boards).
 *
 * This is a SERVER component and must stay one. Home is the most-visited
 * page in the app; a framer-motion stagger here would buy an entrance and
 * cost a client boundary across sixteen cards. Motion is CSS, plus Sheen,
 * which is a client leaf a server component may render.
 */

const ICONS: Record<string, React.ReactNode> = {
  "/app/quizzes": <Brain size={19} />,
  "/app/measure": <Waypoints size={19} />,
  "/app/train/climb": <Mountain size={19} />,
  "/app/play/drill": <Timer size={19} />,
  "/app/play/tell": <Eye size={19} />,
  "/app/adventures": <Map size={19} />,
  "/app/lab": <FlaskConical size={19} />,
  "/app/receipts": <Receipt size={19} />,
  "/app/feed": <MessageSquare size={19} />,
  "/app/videos": <Video size={19} />,
  "/app/voice-notes": <Mic size={19} />,
  "/app/book": <BookOpen size={19} />,
  "/app/program": <CalendarCheck size={19} />,
  "/app/path": <Route size={19} />,
  "/app/you": <User size={19} />,
  "/app/ranks": <Trophy size={19} />,
};

/**
 * One accent per card, from the Arcade's game palette, so the rails read as
 * distinct doors rather than a run of identical gold tiles. The Train cards
 * use their game's exact colour; everything else borrows from the same six
 * so the page stays one system.
 */
const ACCENT: Record<string, string> = {
  "/app/quizzes": "var(--game-lab)",
  "/app/measure": "var(--game-scenario)",
  "/app/train/climb": "var(--game-scenario)",
  "/app/play/drill": "var(--game-drill)",
  "/app/play/tell": "var(--game-tell)",
  "/app/adventures": "var(--game-adventures)",
  "/app/lab": "var(--game-lab)",
  "/app/receipts": "var(--game-receipts)",
  "/app/feed": "var(--app-rose)",
  "/app/videos": "var(--app-rose)",
  "/app/voice-notes": "var(--game-lab)",
  "/app/book": "var(--game-adventures)",
  "/app/program": "var(--app-gold)",
  "/app/path": "var(--game-scenario)",
  "/app/you": "var(--game-receipts)",
  "/app/ranks": "var(--app-gold)",
};

function accentFor(href: string): string {
  return ACCENT[href] ?? "var(--app-gold)";
}

/**
 * The card's own weather, from ArcadeBento's hero recipe with the radial
 * swapped to the surface accent. A distinct-looking card per feature and
 * not one image in the repo.
 */
function surfaceBackground(accent: string, strength = 12): string {
  return [
    `radial-gradient(115% 90% at 82% 6%, color-mix(in srgb, ${accent} ${strength}%, transparent), transparent 58%)`,
    "linear-gradient(168deg, #1b1815, #0d0b0a 76%)",
  ].join(", ");
}

/**
 * The one lock treatment, matching MoreSheet's and ArcadeBento's.
 *
 * Two rules live here and both are deliberate. The card KEEPS everything —
 * accent, glyph, label, hook — and only the trailing affordance changes,
 * because a locked card is a doorway and a greyed one is a refusal. And
 * there is NO PADLOCK GLYPH: the pill carries the word, "Pact" or
 * "Members". A word names a price; a padlock names a refusal, and
 * ChapterTrail already learned that a wall of padlocks reads as exclusion.
 *
 * The card still links. The page behind renders UpgradeWall, which names
 * the surface and sells the right rung via offerForSurface, so the copy
 * law at UpgradeSheet.tsx ("name what continues, never what is withheld")
 * is enforced in one place rather than forked into every card.
 */
function LockPill({ surface }: { surface: AppSurface }) {
  return (
    <span className="shrink-0 rounded-full border border-[var(--app-gold-soft)] px-1.5 py-0.5 text-app-micro uppercase tracking-app-wide text-[var(--app-gold-soft)]">
      {requiresLabel(surface)}
    </span>
  );
}

function HeroCard({
  surface,
  locked,
  index,
}: {
  surface: AppSurface;
  locked: boolean;
  index: number;
}) {
  const accent = accentFor(surface.href);
  return (
    <Link
      href={surface.href}
      className="app-rise relative mx-5 flex items-center gap-4 overflow-hidden rounded-2xl border border-[var(--app-line)] px-[18px] py-[22px] transition-colors active:bg-[var(--app-card-2)]"
      style={{
        background: surfaceBackground(accent, 14),
        animationDelay: `${index * 60}ms`,
      }}
    >
      <Sheen trigger="once" delayMs={index * 90} />
      <span
        className="flex h-[46px] w-[46px] shrink-0 items-center justify-center rounded-xl"
        style={{
          color: accent,
          background: `color-mix(in srgb, ${accent} 12%, transparent)`,
        }}
      >
        {ICONS[surface.href]}
      </span>
      <span className="min-w-0 flex-1">
        <span
          className="block text-[18px]"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {surface.label}
        </span>
        <span className="mt-1 block text-[12.5px] leading-snug text-[var(--app-muted)]">
          {surface.home?.hook}
        </span>
      </span>
      {locked ? (
        <LockPill surface={surface} />
      ) : (
        <span className="shrink-0 text-[13px] tracking-[0.1em] text-[var(--app-gold)]">
          OPEN →
        </span>
      )}
    </Link>
  );
}

function RailCard({
  surface,
  locked,
  index,
}: {
  surface: AppSurface;
  locked: boolean;
  index: number;
}) {
  const accent = accentFor(surface.href);
  return (
    <Link
      href={surface.href}
      className="app-rise relative flex w-[164px] shrink-0 snap-start flex-col overflow-hidden rounded-2xl border border-[var(--app-line-soft)] p-4 transition-colors active:bg-[var(--app-card-2)]"
      style={{
        background: surfaceBackground(accent),
        animationDelay: `${index * 45}ms`,
      }}
    >
      {index === 0 && <Sheen trigger="once" delayMs={120} />}
      <span className="mb-3 flex items-start justify-between">
        <span
          className="flex h-[38px] w-[38px] items-center justify-center rounded-xl"
          style={{
            color: accent,
            background: `color-mix(in srgb, ${accent} 10%, transparent)`,
          }}
        >
          {ICONS[surface.href]}
        </span>
        {locked && <LockPill surface={surface} />}
      </span>
      <span
        className="block text-[15.5px] leading-tight"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {surface.label}
      </span>
      <span className="mt-1 block text-[11.5px] leading-snug text-[var(--app-dim)]">
        {surface.home?.hook}
      </span>
    </Link>
  );
}

/** Glyph and label. For the four surfaces people navigate to rather than
 *  browse: their own progress does not need selling to them. */
function CompactCard({
  surface,
  locked,
  index,
}: {
  surface: AppSurface;
  locked: boolean;
  index: number;
}) {
  const accent = accentFor(surface.href);
  return (
    <Link
      href={surface.href}
      className="app-rise flex w-[118px] shrink-0 snap-start flex-col items-start gap-2.5 rounded-2xl border border-[var(--app-line-soft)] bg-[var(--app-card)] px-3.5 py-3.5 transition-colors active:bg-[var(--app-card-2)]"
      style={{ animationDelay: `${index * 45}ms` }}
    >
      <span
        className="flex h-[32px] w-[32px] items-center justify-center rounded-lg"
        style={{
          color: accent,
          background: `color-mix(in srgb, ${accent} 10%, transparent)`,
        }}
      >
        {ICONS[surface.href]}
      </span>
      <span className="flex w-full items-center justify-between gap-1.5">
        <span className="truncate text-[13px] leading-tight text-[var(--app-text)]">
          {surface.label}
        </span>
        {locked && <LockPill surface={surface} />}
      </span>
    </Link>
  );
}

function tierOf(surface: AppSurface): "hero" | "default" | "compact" {
  return surface.home?.tier ?? "default";
}

export default function HomeExplore({
  viewerTier,
}: {
  viewerTier: ViewerTier;
}) {
  return (
    <div className="mt-8 flex flex-col gap-7">
      {HOME_SECTIONS.map((section) => {
        // A hero is full width and cannot sit inside a horizontal rail, so
        // a section splits: heroes stack above, everything else rides the
        // rail beneath. A section of one non-hero card still renders as a
        // rail rather than being special-cased into full width, because
        // the old "one item means full width" rule made a card's size
        // depend on how many neighbours it happened to have.
        const heroes = section.items.filter((s) => tierOf(s) === "hero");
        const rail = section.items.filter((s) => tierOf(s) !== "hero");
        return (
          <section key={section.title}>
            <p className="mx-5 mb-2.5 text-app-eyebrow uppercase tracking-app-label text-[var(--app-dim)]">
              {section.title}
            </p>

            {heroes.map((surface, i) => (
              <div key={surface.href} className={i > 0 ? "mt-2.5" : undefined}>
                <HeroCard
                  surface={surface}
                  locked={surfaceLocked(surface, viewerTier)}
                  index={i}
                />
              </div>
            ))}

            {rail.length > 0 && (
              <div
                className={`scrollbar-hide flex snap-x gap-2.5 overflow-x-auto px-5 ${
                  heroes.length > 0 ? "mt-2.5" : ""
                }`}
              >
                {rail.map((surface, i) => {
                  const locked = surfaceLocked(surface, viewerTier);
                  return tierOf(surface) === "compact" ? (
                    <CompactCard
                      key={surface.href}
                      surface={surface}
                      locked={locked}
                      index={i}
                    />
                  ) : (
                    <RailCard
                      key={surface.href}
                      surface={surface}
                      locked={locked}
                      index={i}
                    />
                  );
                })}
              </div>
            )}
          </section>
        );
      })}
    </div>
  );
}
