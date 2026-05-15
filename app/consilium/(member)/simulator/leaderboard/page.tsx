import Link from "next/link";
import { requireServerAuth } from "@/lib/auth/server-auth";
import { getLeaderboard } from "@/lib/simulator/leaderboard";
import type { LeaderboardEntry } from "@/lib/simulator/leaderboard";
import MemberBadge from "@/components/consilium/MemberBadge";
import { ArrowLeft, ArrowRight, Crown, Trophy, Medal, Flame } from "lucide-react";

export const metadata = {
  title: "Leaderboard. Dark Mirror | Kanika Batra",
  description:
    "The Consilium's simulator standings. XP earned, scenarios mastered.",
};

function lastActiveLabel(days: number): string {
  if (days <= 0) return "Active today";
  if (days === 1) return "Active 1d ago";
  if (days < 7) return `Active ${days}d ago`;
  return `Active ${Math.floor(days / 7)}w ago`;
}

function activityDot(days: number): string {
  if (days <= 1) return "bg-emerald-400";
  if (days <= 3) return "bg-emerald-400/60";
  if (days <= 7) return "bg-amber-300/60";
  return "bg-text-gray/40";
}

// Tier visual identity, kept in a const so the JSX stays declarative.
// Hex values are inlined where Tailwind doesn't have a brand-tuned
// equivalent (the silver and bronze tones are mixed from the existing
// palette to read distinct from the gold without competing with it).
const PODIUM_THEME = {
  gold: {
    roman: "I",
    Icon: Crown,
    iconStroke: 1.6,
    border: "border-warm-gold/70",
    cardBg:
      "bg-[radial-gradient(closest-side_at_50%_0%,rgba(212,175,55,0.18),transparent_70%)] bg-deep-black/40",
    glow:
      "shadow-[0_0_50px_-12px_rgba(212,175,55,0.55),inset_0_1px_0_rgba(212,175,55,0.25)]",
    nameColor: "text-warm-gold",
    accentColor: "rgba(212,175,55,1)",
    accentBarStyle:
      "linear-gradient(90deg, transparent, rgba(212,175,55,0.85), transparent)",
    haloPulse: true,
  },
  silver: {
    roman: "II",
    Icon: Medal,
    iconStroke: 1.5,
    border: "border-slate-300/40",
    cardBg:
      "bg-[radial-gradient(closest-side_at_50%_0%,rgba(203,213,225,0.12),transparent_70%)] bg-deep-black/40",
    glow: "shadow-[0_0_24px_-12px_rgba(203,213,225,0.35)]",
    nameColor: "text-slate-100",
    accentColor: "rgba(203,213,225,0.95)",
    accentBarStyle:
      "linear-gradient(90deg, transparent, rgba(203,213,225,0.60), transparent)",
    haloPulse: false,
  },
  bronze: {
    roman: "III",
    Icon: Trophy,
    iconStroke: 1.5,
    border: "border-amber-700/50",
    cardBg:
      "bg-[radial-gradient(closest-side_at_50%_0%,rgba(180,83,9,0.16),transparent_70%)] bg-deep-black/40",
    glow: "shadow-[0_0_24px_-12px_rgba(180,83,9,0.40)]",
    nameColor: "text-amber-400",
    accentColor: "rgba(217,119,6,0.95)",
    accentBarStyle:
      "linear-gradient(90deg, transparent, rgba(180,83,9,0.65), transparent)",
    haloPulse: false,
  },
} as const;

function PodiumCard({
  entry,
  height,
  accent,
}: {
  entry: LeaderboardEntry | undefined;
  height: string;
  accent: "gold" | "silver" | "bronze";
}) {
  if (!entry) return null;
  const theme = PODIUM_THEME[accent];
  const { Icon } = theme;

  return (
    <div className={`relative ${height}`}>
      {/* Floating medallion above the card. Sits half-outside the
          card's box so the icon reads as a separately-minted award
          ribbon rather than a label baked into the card. Gold gets a
          subtle pulsing halo to reinforce dominance without crossing
          into "gamer leaderboard" territory. */}
      <div className="absolute -top-6 left-1/2 -translate-x-1/2 z-20">
        <div className="relative">
          {theme.haloPulse && (
            <div
              aria-hidden
              className="absolute inset-0 rounded-full animate-glow-pulse"
              style={{
                background:
                  "radial-gradient(closest-side, rgba(212,175,55,0.55), transparent 70%)",
                filter: "blur(8px)",
                transform: "scale(1.6)",
              }}
            />
          )}
          <div
            className={`relative w-12 h-12 rounded-full bg-deep-black border-2 ${theme.border} flex items-center justify-center ${theme.glow}`}
          >
            <Icon
              className="w-5 h-5"
              strokeWidth={theme.iconStroke}
              style={{ color: theme.accentColor }}
            />
          </div>
        </div>
      </div>

      {/* The card itself. Overflow-hidden so the Roman numeral
          watermark and the bottom accent bar both stay clipped to the
          rounded shape. */}
      <div
        className={`relative h-full flex flex-col items-center justify-end rounded-2xl border-2 ${theme.border} ${theme.cardBg} backdrop-blur-sm overflow-hidden px-4 pt-10 pb-6 ${theme.glow}`}
      >
        {/* Decorative Roman numeral watermark — matches the Latin
            "Consilium" naming and adds visual identity per tier
            without leaning on bright color. Top-right, faded, large. */}
        <span
          aria-hidden
          className="absolute top-1 right-3 text-[5rem] leading-none font-extralight pointer-events-none select-none"
          style={{
            color: theme.accentColor,
            opacity: 0.08,
            fontFamily: "Didot, 'Bodoni MT', Georgia, serif",
          }}
        >
          {theme.roman}
        </span>

        {/* Tier-coloured ring around the member badge. Reinforces the
            rank without painting the badge itself. */}
        <div
          className={`relative mb-3 p-[3px] rounded-full border ${theme.border}`}
        >
          <MemberBadge tier={entry.tier} size="sm" />
        </div>

        <p
          // line-clamp-2 + break-words so a long display name (e.g.
          // "Mistress Quintessa") wraps to a second line instead of
          // ellipsis-clipping. Leading-tight keeps two-line names from
          // pushing the XP figure past the card bottom.
          className={`text-base font-light tracking-wide text-center mb-2 leading-tight line-clamp-2 break-words w-full ${theme.nameColor}`}
          title={entry.name}
          style={{ fontFamily: "Didot, 'Bodoni MT', Georgia, serif" }}
        >
          {entry.isViewer ? `${entry.name} (you)` : entry.name}
        </p>

        <div className="flex items-baseline gap-1">
          {accent === "gold" ? (
            <span
              className="text-3xl font-extralight tabular-nums"
              style={{
                background:
                  "linear-gradient(135deg, #f3d98a 0%, #d4af37 50%, #9c7a1f 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {entry.xp.toLocaleString()}
            </span>
          ) : (
            <span className="text-2xl font-extralight text-text-light tabular-nums">
              {entry.xp.toLocaleString()}
            </span>
          )}
          <span className="text-[10px] uppercase tracking-[0.25em] text-text-gray/60">
            XP
          </span>
        </div>
        <p className="text-text-gray/60 text-[11px] mt-1">
          {entry.completed} completed
        </p>

        {/* Bottom accent bar, fades in from both edges to a tier-
            coloured centre. Subtle, ornamental, gives each card a
            "finished" lower edge instead of trailing off. */}
        <div
          aria-hidden
          className="absolute bottom-0 left-0 right-0 h-px"
          style={{ background: theme.accentBarStyle }}
        />
      </div>
    </div>
  );
}

function Row({ entry }: { entry: LeaderboardEntry }) {
  return (
    <div
      className={`flex items-center gap-4 px-4 py-3 sm:px-5 sm:py-4 rounded-xl border transition-colors ${
        entry.isViewer
          ? "bg-warm-gold/[0.08] border-warm-gold/40"
          : "bg-deep-black/40 border-warm-gold/[0.08] hover:border-warm-gold/20"
      }`}
    >
      <div className="w-8 sm:w-10 shrink-0 text-right">
        <span
          className={`text-sm sm:text-base font-light tabular-nums ${
            entry.isViewer ? "text-warm-gold" : "text-text-gray/70"
          }`}
        >
          {entry.rank}
        </span>
      </div>

      <div className="shrink-0">
        <MemberBadge tier={entry.tier} size="xs" />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="text-text-light text-sm font-light truncate">
            {entry.name}
          </p>
          {entry.isViewer && (
            <span className="shrink-0 text-[9px] uppercase tracking-[0.25em] px-1.5 py-0.5 rounded-full bg-warm-gold/15 text-warm-gold border border-warm-gold/30">
              You
            </span>
          )}
        </div>
        <div className="flex items-center gap-2 mt-0.5">
          <span
            className={`w-1.5 h-1.5 rounded-full ${activityDot(entry.lastActiveDays)}`}
          />
          <p className="text-text-gray/60 text-[11px]">
            {lastActiveLabel(entry.lastActiveDays)}
          </p>
        </div>
      </div>

      <div className="text-right shrink-0">
        <div className="flex items-baseline gap-1 justify-end">
          <span className="text-base sm:text-lg font-light tabular-nums text-text-light">
            {entry.xp.toLocaleString()}
          </span>
          <span className="text-[9px] uppercase tracking-[0.2em] text-text-gray/50">
            XP
          </span>
        </div>
        <p className="text-text-gray/60 text-[11px] tabular-nums">
          {entry.completed} done
        </p>
      </div>
    </div>
  );
}

export default async function LeaderboardPage() {
  const userId = await requireServerAuth("/consilium/simulator/leaderboard");
  const { top, viewer } = await getLeaderboard(userId, 50);

  const podium = top.slice(0, 3);
  const rest = top.slice(3);
  const viewerInTop = viewer && top.some((e) => e.id === viewer.id);

  return (
    <main className="min-h-screen px-4 sm:px-8 py-10 max-w-4xl mx-auto">
      <div className="mb-8">
        <Link
          href="/consilium/simulator"
          className="inline-flex items-center gap-2 text-text-gray/70 hover:text-warm-gold text-xs uppercase tracking-[0.25em] transition-colors mb-6"
        >
          <ArrowLeft size={12} />
          Back to simulator
        </Link>

        <p className="text-warm-gold/70 uppercase tracking-[0.3em] text-xs mb-3">
          The Consilium · Standings
        </p>
        <h1 className="text-3xl sm:text-4xl font-extralight text-white mb-3 tracking-wide">
          The <span className="text-warm-gold">Leaderboard</span>
        </h1>
        <p className="text-text-gray font-light max-w-xl">
          XP earned in the Dark Mirror. Mastery counts more than activity —
          good outcomes pay; failure replays cost.
        </p>
      </div>

      {/* Podium, only render when we have at least one entry. The
          ordering on screen is 2nd / 1st / 3rd so the tallest middle
          column draws the eye. Top padding leaves room for the
          medallions that float above each card. */}
      {podium.length > 0 && (
        <div className="grid grid-cols-3 gap-3 sm:gap-5 mb-12 pt-8 items-end">
          <PodiumCard
            entry={podium[1]}
            height="min-h-48 sm:min-h-56"
            accent="silver"
          />
          <PodiumCard
            entry={podium[0]}
            height="min-h-56 sm:min-h-64"
            accent="gold"
          />
          <PodiumCard
            entry={podium[2]}
            height="min-h-48 sm:min-h-52"
            accent="bronze"
          />
        </div>
      )}

      <div className="space-y-2">
        {rest.map((entry) => (
          <Row key={entry.id} entry={entry} />
        ))}
      </div>

      {/* Pinned "Your standing" card, only when the viewer didn't make
          the visible top 50. Gives them a clear answer to "where am I"
          without making them scan. */}
      {viewer && !viewerInTop && (
        <div className="mt-8 pt-6 border-t border-warm-gold/15">
          <p className="text-warm-gold/70 uppercase tracking-[0.3em] text-[10px] mb-3">
            Your standing
          </p>
          <Row entry={viewer} />
        </div>
      )}

      {/* Empty-state CTA for members who haven't started a single
          scenario yet, points them straight at the simulator catalog
          rather than leaving them staring at someone else's leaderboard. */}
      {!viewer && (
        <div className="mt-8 pt-6 border-t border-warm-gold/15 text-center">
          <Flame className="w-8 h-8 text-warm-gold/60 mx-auto mb-3" />
          <p className="text-text-light font-light mb-2">
            You haven&apos;t earned any XP yet.
          </p>
          <p className="text-text-gray/70 text-sm font-light mb-5 max-w-md mx-auto">
            One scenario is enough to land on the board. Mission 1 takes
            about three minutes.
          </p>
          <Link
            href="/consilium/simulator"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs uppercase tracking-[0.25em] text-warm-gold border border-warm-gold/40 rounded-full hover:bg-warm-gold/10 hover:border-warm-gold/70 transition-all"
          >
            Take your first run
            <ArrowRight size={12} />
          </Link>
        </div>
      )}
    </main>
  );
}
