import Link from "next/link";
import { requireServerAuth } from "@/lib/auth/server-auth";
import {
  getLeaderboard,
  getStandingBoard,
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
    <div className="px-5 pb-28 pt-6">
      <h1
        className="text-[28px] font-light"
        style={{ fontFamily: "var(--font-display)" }}
      >
        Leaderboards
      </h1>
      <p className="mb-5 mt-1 text-[13px] text-[var(--app-muted)]">
        Earned in the open. Nobody is placed here.
      </p>

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
            <p className="rounded-2xl border border-[var(--app-line-soft)] bg-[var(--app-card)] px-4 py-6 text-center text-[13px] leading-relaxed text-[var(--app-muted)]">
              The board is empty because Standing just launched. Everyone
              starts from zero; whoever shows up first owns it.
            </p>
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
                />
              ))}
            </div>
          )}
          {standing.viewer && !standing.top.some((e) => e.isViewer) && (
            <PinnedViewer
              rank={standing.viewer.rank}
              name={standing.viewer.name}
              value={standing.viewer.standing.toLocaleString()}
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
              />
            ))}
          </div>
          {xp.viewer && !xp.top.some((e) => e.isViewer) && (
            <PinnedViewer
              rank={xp.viewer.rank}
              name={xp.viewer.name}
              value={`${xp.viewer.xp.toLocaleString()} XP`}
            />
          )}
        </>
      )}
    </div>
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
          ? "bg-[rgba(212,175,55,0.12)] text-[var(--app-gold)]"
          : "text-[var(--app-dim)]"
      }`}
    >
      {children}
    </Link>
  );
}

function Row({
  first,
  rank,
  name,
  sub,
  value,
  isViewer,
}: {
  first: boolean;
  rank: number;
  name: string;
  sub: string;
  value: string;
  isViewer: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-3 px-4 py-3 ${
        first ? "" : "border-t border-[var(--app-line-soft)]"
      } ${isViewer ? "bg-[rgba(212,175,55,0.07)]" : ""}`}
    >
      <span
        className={`w-7 shrink-0 text-center text-[13px] tabular-nums ${
          rank <= 3
            ? "font-semibold text-[var(--app-gold)]"
            : "text-[var(--app-dim)]"
        }`}
        style={rank <= 3 ? { fontFamily: "var(--font-display)" } : undefined}
      >
        {rank}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-[14px] font-medium">
          {name}
          {isViewer && (
            <span className="ml-2 text-[10px] uppercase tracking-[0.14em] text-[var(--app-gold-soft)]">
              You
            </span>
          )}
        </span>
        <span className="block text-[11px] text-[var(--app-dim)]">{sub}</span>
      </span>
      <span className="shrink-0 text-[13px] tabular-nums text-[var(--app-muted)]">
        {value}
      </span>
    </div>
  );
}

function PinnedViewer({
  rank,
  name,
  value,
}: {
  rank: number;
  name: string;
  value: string;
}) {
  return (
    <div className="mt-3 flex items-center gap-3 rounded-2xl border border-[var(--app-line)] bg-[rgba(212,175,55,0.07)] px-4 py-3">
      <span className="w-7 shrink-0 text-center text-[13px] tabular-nums text-[var(--app-gold)]">
        {rank}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-[14px] font-medium">
          {name}
          <span className="ml-2 text-[10px] uppercase tracking-[0.14em] text-[var(--app-gold-soft)]">
            You
          </span>
        </span>
      </span>
      <span className="shrink-0 text-[13px] tabular-nums text-[var(--app-muted)]">
        {value}
      </span>
    </div>
  );
}
