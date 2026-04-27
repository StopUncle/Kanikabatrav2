import Link from "next/link";
import { requireServerAuth } from "@/lib/auth/server-auth";
import { getLeaderboard } from "@/lib/simulator/leaderboard";
import type { LeaderboardEntry } from "@/lib/simulator/leaderboard";
import MemberBadge from "@/components/consilium/MemberBadge";
import { ArrowLeft, ArrowRight, Crown, Trophy, Medal, Flame } from "lucide-react";

export const metadata = {
  title: "Leaderboard — Dark Mirror | Kanika Batra",
  description:
    "The Consilium's simulator standings — XP earned, scenarios mastered.",
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

function PodiumCard({
  entry,
  height,
  accent,
  icon,
}: {
  entry: LeaderboardEntry | undefined;
  height: string;
  accent: "gold" | "silver" | "bronze";
  icon: React.ReactNode;
}) {
  if (!entry) return null;

  const accentRing =
    accent === "gold"
      ? "border-warm-gold/50 bg-gradient-to-b from-warm-gold/[0.08] to-transparent"
      : accent === "silver"
        ? "border-pale-silver/40 bg-gradient-to-b from-white/[0.05] to-transparent"
        : "border-copper/40 bg-gradient-to-b from-orange-500/[0.05] to-transparent";

  const rankColor =
    accent === "gold"
      ? "text-warm-gold"
      : accent === "silver"
        ? "text-text-light"
        : "text-orange-300";

  return (
    <div
      className={`relative flex flex-col items-center justify-end rounded-2xl border ${accentRing} px-4 pt-6 pb-5 ${height}`}
    >
      <div className="absolute -top-3 left-1/2 -translate-x-1/2">
        <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-deep-black border border-warm-gold/30 text-warm-gold text-[10px] uppercase tracking-[0.25em]">
          {icon}
          <span>#{entry.rank}</span>
        </div>
      </div>

      <div className="mb-3">
        <MemberBadge tier={entry.tier} size="sm" />
      </div>

      <p
        // line-clamp-2 + break-words so a long display name (e.g.
        // "Mistress Quintessa") wraps to a second line instead of
        // ellipsis-clipping. leading-tight keeps two-line names from
        // pushing the XP figure past the card bottom.
        className={`text-base font-light tracking-wide text-center mb-1 leading-tight line-clamp-2 break-words w-full ${rankColor}`}
        title={entry.name}
      >
        {entry.isViewer ? `${entry.name} (you)` : entry.name}
      </p>

      <div className="flex items-baseline gap-1">
        <span className="text-2xl font-extralight text-text-light tabular-nums">
          {entry.xp.toLocaleString()}
        </span>
        <span className="text-[10px] uppercase tracking-[0.25em] text-text-gray/60">
          XP
        </span>
      </div>
      <p className="text-text-gray/60 text-[11px] mt-1">
        {entry.completed} completed
      </p>
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

      {/* Podium — only render when we have at least one entry. The
          ordering on screen is 2nd / 1st / 3rd so the tallest middle
          column draws the eye. */}
      {podium.length > 0 && (
        <div className="grid grid-cols-3 gap-3 sm:gap-5 mb-10 items-end">
          <PodiumCard
            entry={podium[1]}
            height="h-44 sm:h-52"
            accent="silver"
            icon={<Medal className="w-3 h-3" strokeWidth={2} />}
          />
          <PodiumCard
            entry={podium[0]}
            height="h-52 sm:h-60"
            accent="gold"
            icon={<Crown className="w-3 h-3" strokeWidth={2} />}
          />
          <PodiumCard
            entry={podium[2]}
            height="h-40 sm:h-48"
            accent="bronze"
            icon={<Trophy className="w-3 h-3" strokeWidth={2} />}
          />
        </div>
      )}

      <div className="space-y-2">
        {rest.map((entry) => (
          <Row key={entry.id} entry={entry} />
        ))}
      </div>

      {/* Pinned "Your standing" card — only when the viewer didn't make
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
          scenario yet — points them straight at the simulator catalog
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
