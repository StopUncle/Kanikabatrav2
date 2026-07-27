import type { PrismaClient } from "@prisma/client";
import { getTrainData } from "@/lib/simulator/train-data";
import { readPopularity, orderByPopularity } from "./popular";
import type { PopularKey, Popularity } from "./popular";

/**
 * The Arcade as a bento: one hero, a sliding rail of squares, one strip.
 *
 * The hero is the Simulator, always. It is the deepest thing in here and
 * the only one that can lead with a line of real scene text, which is
 * what makes the screen look like a place rather than a menu. The rail
 * is everything with a snap-call shape to it. The Lab is the strip,
 * because it is open-ended and does not belong in a grid of timed
 * things.
 */

export interface BentoHero {
  title: string;
  /** A line of the actual scenario, not a description of scenarios. */
  fragment: string;
  blurb: string;
  meta: string;
  href: string;
}

export interface BentoSquare {
  key: PopularKey;
  name: string;
  /** The numeral that carries the tile. */
  numeral: string;
  duration: string;
  meta: string;
  href: string;
  doneToday: boolean;
  /** Most played across the room this week. At most one is true. */
  popular: boolean;
}

export interface BentoStrip {
  name: string;
  line: string;
  href: string;
  cta: string;
}

export interface BentoData {
  hero: BentoHero;
  squares: BentoSquare[];
  strip: BentoStrip;
}

function startOfUtcToday(): Date {
  const d = new Date();
  d.setUTCHours(0, 0, 0, 0);
  return d;
}

export async function getBentoData(
  db: PrismaClient,
  userId: string,
): Promise<BentoData> {
  const since = startOfUtcToday();

  const [train, popularity, drillToday, tellToday, drillBest, adventures, receipts] =
    await Promise.all([
      getTrainData(db, userId),
      readPopularity(db),
      db.gameSession.count({
        where: { userId, gameKey: "speed-drill", playedAt: { gte: since } },
      }),
      db.tellResponse.count({
        where: { userId, answeredAt: { gte: since } },
      }),
      db.gameSession.aggregate({
        where: { userId, gameKey: "speed-drill" },
        _max: { score: true },
      }),
      db.adventureProgress.count({ where: { userId } }),
      db.receipt.count({ where: { userId } }),
    ]);

  const nextUp = train.nextUp;

  const hero: BentoHero = {
    title: "Simulator",
    // Falls back to the invitation rather than an empty quote: a hero
    // with nothing in it is worse than a hero that asks.
    fragment: nextUp?.title ?? "Read a person across a whole scene.",
    blurb: nextUp
      ? nextUp.reason === "resume"
        ? "You left this one unfinished."
        : nextUp.reason === "checkin"
          ? "Picked from how you said today is going."
          : "Start here."
      : "Read a person across a whole scene.",
    meta: nextUp?.trackLabel ?? "Simulator",
    href: nextUp ? `/app/train/${nextUp.scenarioId}` : "/app/train",
  };

  const best = drillBest._max.score;

  const squares: BentoSquare[] = [
    {
      key: "speed-drill",
      name: "Speed Drill",
      numeral: "60",
      duration: "60s",
      meta: best !== null ? `${best}/10 best` : "Never played",
      href: "/app/play/drill",
      doneToday: drillToday > 0,
      popular: false,
    },
    {
      key: "daily-tell",
      name: "Daily Tell",
      numeral: "01",
      duration: "Daily",
      meta: "One a day",
      href: "/app/play/tell",
      doneToday: tellToday > 0,
      popular: false,
    },
    {
      key: "adventures",
      name: "Adventures",
      numeral: "06",
      duration: "Chapters",
      meta: adventures > 0 ? `${adventures} started` : "Multi-night arcs",
      href: "/consilium/adventures",
      // No daily reset, so it is never "done today" and sorts on plays.
      doneToday: false,
      popular: false,
    },
    {
      key: "receipts",
      name: "Receipts",
      numeral: "01",
      duration: "2 min",
      meta: receipts > 0 ? `${receipts} read` : "Paste what they sent",
      href: "/consilium/receipts",
      doneToday: false,
      popular: false,
    },
  ];

  markPopular(squares, popularity);

  return {
    hero,
    squares: orderByPopularity(squares, popularity, (g) => g.doneToday),
    strip: {
      name: "The Lab",
      line: "Freeform. Say anything, see what it costs you.",
      href: "/consilium/lab",
      cta: "Open",
    },
  };
}

function markPopular(squares: BentoSquare[], popularity: Popularity): void {
  if (!popularity.leader) return;
  const winner = squares.find((s) => s.key === popularity.leader);
  if (winner) winner.popular = true;
}
