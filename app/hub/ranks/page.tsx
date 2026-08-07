import Link from "next/link";
import { EmptyState, PageHeader, PageShell } from "@/components/app-shell/ui";
import { requireServerAuth } from "@/lib/auth/server-auth";
import {
  getLeaderboard,
  getStandingBoard,
  BIG_MOVE_SPOTS,
} from "@/lib/simulator/leaderboard";
import { ringByLevel } from "@/lib/standing/config";

export const metadata = {
  title: "Leaderboards | Consilium",
};

/**
 * Leaderboards: two boards behind one toggle. Standing is the room's
 * pecking order (everything you do feeds it); Simulator XP is the
 * scenario-specific score. The viewer's own row is always visible, pinned
 * below the list when they sit outside the top.
 */
export default async function RanksPage({
  searchParams,
}: {
  searchParams: Promise<{ board?: string }>;
}) {
  const userId = await requireServerAuth("/app/ranks");
  const params = await searchParams;
  const board = params.board === "xp" ? "xp" : "standing";

  const [standing, xp] = await Promise.all([
    board === "standing" ? getStandingBoard(userId, 50) : null,
    board === "xp" ? getLeaderboard(userId, 50) : null,
  ]);

  return (
    <PageShell>
      <PageHeader
        title="Leaderboards"
        lede="Earned in the open. Nobody is placed here."
      />

      <div className="mb-5 flex rounded-full border border-[var(--app-line-soft)] p-1">
        <Tab href="/app/ranks" active={board === "standing"}>
          Standing
        </Tab>
        <Tab href="/app/ranks?board=xp" active={board === "xp"}>
          Simulator XP
        </Tab>
      </div>

      {board === "standing" && standing && (
        <>
          {standing.top.length === 0 ? (
            <EmptyState
              line="The board is empty because Standing just launched."
              hint="Everyone starts from zero; whoever shows up first owns it."
            />
          ) : (
            <div className="overflow-hidden rounded-2xl border border-[var(--app-line-soft)] bg-[var(--app-card)]">
              {standing.top.map((e, i) => (
                <Row
                  key={e.id}
                  first={i === 0}
                  rank={e.rank}
                  name={e.name}
                  sub={ringByLevel(e.ringLevel).name}
                  value={e.standing.toLocaleString()}
                  isViewer={e.isViewer}
                  change={e.change}
                  bigMove={(e.change ?? 0) >= BIG_MOVE_SPOTS}
                />
              ))}
            </div>
          )}
          {standing.viewer && !standing.top.some((e) => e.isViewer) && (
            <PinnedViewer
              rank={standing.viewer.rank}
              name={standing.viewer.name}
              value={standing.viewer.standing.toLocaleString()}
              change={standing.viewer.change}
            />
          )}
        </>
      )}

      {board === "xp" && xp && (
        <>
          <div className="overflow-hidden rounded-2xl border border-[var(--app-line-soft)] bg-[var(--app-card)]">
            {xp.top.map((e, i) => (
              <Row
                key={e.id}
                first={i === 0}
                rank={e.rank}
                name={e.name}
                sub={`${e.completed} completed`}
                value={`${e.xp.toLocaleString()} XP`}
                isViewer={e.isViewer}
                change={e.change}
                bigMove={(e.change ?? 0) >= BIG_MOVE_SPOTS}
              />
            ))}
          </div>
          {xp.viewer && !xp.top.some((e) => e.isViewer) && (
            <PinnedViewer
              rank={xp.viewer.rank}
              name={xp.viewer.name}
              value={`${xp.viewer.xp.toLocaleString()} XP`}
              change={xp.viewer.change}
            />
          )}
        </>
      )}
    </PageShell>
  );
}

function Tab({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={`flex-1 rounded-full py-2 text-center text-xs tracking-[0.08em] transition-colors ${
        active
          ? "bg-[var(--app-line)] text-[var(--app-gold)]"
          : "text-[var(--app-dim)]"
      }`}
    >
      {children}
    </Link>
  );
}

/**
 * The top three get a struck medallion rather than a number: metal
 * gradients, a matching ring, and a soft bloom under first place only, so
 * the podium reads at a glance without three competing glows.
 */
const MEDALS: Record<number, { bg: string; ring: string; ink: string; glow?: string }> = {
  1: {
    bg: "linear-gradient(160deg,#f4dd8a 0%,#d4af37 48%,#a67c14 100%)",
    ring: "rgba(212,175,55,0.55)",
    ink: "#2a1e05",
    glow: "0 0 18px rgba(212,175,55,0.32)",
  },
  2: {
    bg: "linear-gradient(160deg,#eef1f4 0%,#c3c9d1 48%,#8d949d 100%)",
    ring: "rgba(197,203,211,0.45)",
    ink: "#23262a",
  },
  3: {
    bg: "linear-gradient(160deg,#e8b489 0%,#c07f4a 48%,#8a5527 100%)",
    ring: "rgba(192,127,74,0.45)",
    ink: "#2e1a0b",
  },
};

function RankMark({ rank }: { rank: number }) {
  const medal = MEDALS[rank];
  if (!medal) {
    return (
      <span className="w-9 shrink-0 text-center text-app-body tabular-nums text-[var(--app-dim)]">
        {rank}
      </span>
    );
  }
  return (
    <span className="flex w-9 shrink-0 justify-center">
      <span
        className="flex h-7 w-7 items-center justify-center rounded-full text-[13px] font-semibold tabular-nums"
        style={{
          background: medal.bg,
          color: medal.ink,
          boxShadow: `inset 0 0 0 1px ${medal.ring}${medal.glow ? `, ${medal.glow}` : ""}`,
          fontFamily: "var(--font-display)",
        }}
      >
        {rank}
      </span>
    </span>
  );
}

/**
 * Which way the row has travelled this week. A new entry says so rather
 * than showing a meaningless zero, and a row that held its place gets a
 * dash: absence of a chip would read as missing data.
 */
function Movement({ change }: { change: number | null }) {
  if (change === null) {
    return (
      <span className="text-app-tiny uppercase tracking-app-wide text-[var(--app-gold-soft)]">
        New
      </span>
    );
  }
  if (change === 0) {
    return <span className="text-app-tiny text-[var(--app-dim)]">—</span>;
  }
  const up = change > 0;
  return (
    <span
      className="text-app-tiny tabular-nums"
      style={{ color: up ? "#6ee7a8" : "#e0796f" }}
    >
      {up ? "▲" : "▼"}
      {Math.abs(change)}
    </span>
  );
}

function Row({
  first,
  rank,
  name,
  sub,
  value,
  isViewer,
  change,
  bigMove,
}: {
  first: boolean;
  rank: number;
  name: string;
  sub: string;
  value: string;
  isViewer: boolean;
  change: number | null;
  bigMove: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-3 px-4 py-3 ${
        first ? "" : "border-t border-[var(--app-line-soft)]"
      } ${isViewer ? "bg-[rgba(212,175,55,0.07)]" : ""}`}
    >
      <RankMark rank={rank} />
      <span className="min-w-0 flex-1">
        <span className="flex items-center gap-1.5 truncate text-app-lead font-medium">
          <span className="truncate">{name}</span>
          {/* Earned by climbing, so it sits with the name rather than in the
              movement column where it would just restate the number. */}
          {bigMove && (
            <span aria-label="Climbing fast" title="Climbing fast">
              🔥
            </span>
          )}
          {isViewer && (
            <span className="shrink-0 text-app-tiny uppercase tracking-app-wide text-[var(--app-gold-soft)]">
              You
            </span>
          )}
        </span>
        <span className="block text-app-eyebrow text-[var(--app-dim)]">{sub}</span>
      </span>
      <span className="flex shrink-0 flex-col items-end gap-0.5">
        <span className="text-app-body tabular-nums text-[var(--app-muted)]">
          {value}
        </span>
        <Movement change={change} />
      </span>
    </div>
  );
}

function PinnedViewer({
  rank,
  name,
  value,
  change,
}: {
  rank: number;
  name: string;
  value: string;
  change: number | null;
}) {
  return (
    <div className="mt-3 flex items-center gap-3 rounded-2xl border border-[var(--app-line)] bg-[rgba(212,175,55,0.07)] px-4 py-3">
      <RankMark rank={rank} />
      <span className="min-w-0 flex-1">
        <span className="block truncate text-app-lead font-medium">
          {name}
          <span className="ml-2 text-app-tiny uppercase tracking-app-wide text-[var(--app-gold-soft)]">
            You
          </span>
        </span>
      </span>
      <span className="flex shrink-0 flex-col items-end gap-0.5">
        <span className="text-app-body tabular-nums text-[var(--app-muted)]">
          {value}
        </span>
        <Movement change={change} />
      </span>
    </div>
  );
}
