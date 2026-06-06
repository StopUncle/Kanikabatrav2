import type { Metadata } from "next";
import Header from "@/components/Header";
import BackgroundEffects from "@/components/BackgroundEffects";
import {
  getBoardRows,
  getCalibrationAnchors,
  getMostRequested,
  getRecentActivity,
  getBoardStats,
} from "@/lib/board/db";
import type { Archetype, Tier } from "@prisma/client";
import type { BoardSort } from "@/lib/board/types";
import BoardRow from "@/components/board/BoardRow";
import BoardControls from "@/components/board/BoardControls";
import ActivityTicker from "@/components/board/ActivityTicker";
import CalibrationRail from "@/components/board/CalibrationRail";
import MostRequestedRail from "@/components/board/MostRequestedRail";
import { BOARD_DISCLAIMER } from "@/lib/board/tiers";

// The board responds to real activity (votes, petitions, re-scores), so
// it always renders fresh.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "The Board | Public figures, scored | Kanika Batra",
  description:
    "A ranked instrument scoring public figures against the dark-trait framework, delivered through Kanika's lived-experience read. Browse the board, see the factor split, score them yourself.",
  alternates: { canonical: "https://kanikarose.com/board" },
  openGraph: {
    title: "The Board · Public figures, scored",
    description:
      "A ranked instrument, not a hit-list. See where they sit on the scale and score them yourself.",
    url: "https://kanikarose.com/board",
    type: "website",
    images: [{ url: "/api/og?title=The%20Board&subtitle=Public%20figures%2C%20scored", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Board · Public figures, scored",
    description: "A ranked instrument, not a hit-list.",
    images: ["/api/og?title=The%20Board&subtitle=Public%20figures%2C%20scored"],
  },
};

const SORT_VALUES: BoardSort[] = ["composite", "factor1", "factor2", "contested", "recent"];
const TIER_VALUES: Tier[] = ["NEGLIGIBLE", "LOW", "MODERATE", "ELEVATED", "HIGH"];
const ARCHETYPE_VALUES: Archetype[] = ["OPERATOR", "TRAINWRECK"];

export default async function BoardPage({
  searchParams,
}: {
  searchParams: Promise<{ sort?: string; tier?: string; archetype?: string }>;
}) {
  const sp = await searchParams;
  const sort = (SORT_VALUES as string[]).includes(sp.sort ?? "")
    ? (sp.sort as BoardSort)
    : "composite";
  const tier = (TIER_VALUES as string[]).includes(sp.tier ?? "")
    ? (sp.tier as Tier)
    : undefined;
  const archetype = (ARCHETYPE_VALUES as string[]).includes(sp.archetype ?? "")
    ? (sp.archetype as Archetype)
    : undefined;

  const [rows, anchors, requested, activity, stats] = await Promise.all([
    getBoardRows({ sort, filter: { tier, archetype } }),
    getCalibrationAnchors(),
    getMostRequested(),
    getRecentActivity(12),
    getBoardStats(),
  ]);

  return (
    <>
      <BackgroundEffects />
      <Header />
      <main className="relative z-10 min-h-screen px-4 pb-20 pt-28">
        <div className="mx-auto max-w-6xl">
          {/* Masthead */}
          <header className="mb-8 text-center">
            <p className="mb-3 text-[10px] uppercase tracking-[0.5em] text-warm-gold/60">
              The Board
            </p>
            <h1 className="mx-auto max-w-2xl font-serif text-3xl font-thin tracking-wide text-text-light sm:text-4xl">
              Public figures, scored against the framework
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-sm font-light leading-relaxed text-text-gray">
              An instrument, not a hit-list. Each figure is read against the
              two-factor dark-trait model. Browse the ranking, see the split,
              and cast your own score.
            </p>
          </header>

          <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
            {/* Ranked list */}
            <div>
              <div className="mb-5">
                <BoardControls
                  sort={sort}
                  tier={tier ?? ""}
                  archetype={archetype ?? ""}
                />
              </div>

              <div className="overflow-hidden rounded-sm border border-white/[0.07] bg-white/[0.01]">
                {rows.length === 0 ? (
                  <p className="px-4 py-10 text-center text-sm text-text-gray/60">
                    No figures match this view.
                  </p>
                ) : (
                  rows.map((row) => <BoardRow key={row.id} row={row} />)
                )}
              </div>

              <p className="mt-4 text-center text-[11px] italic text-text-gray/50">
                {BOARD_DISCLAIMER}
              </p>
            </div>

            {/* Sidebar */}
            <aside className="space-y-6">
              <ActivityTicker
                initialActivity={activity.map((a) => ({
                  ...a,
                  createdAt: a.createdAt.toISOString(),
                }))}
                initialStats={stats}
              />
              <CalibrationRail anchors={anchors} />
              <MostRequestedRail rows={requested} />
            </aside>
          </div>
        </div>
      </main>
    </>
  );
}
