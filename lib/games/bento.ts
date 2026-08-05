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
  /**
   * The numeral that carries the tile, and the unit it is counted in.
   *
   * These are set together and rendered together for a reason. Four big
   * numerals in one grid, drawn identically, read as one scale: 60 next to
   * 01 next to 06 looks like a score, a rank, or a count of the same thing.
   * They were seconds, a daily allowance, a hardcoded 6 that did not match
   * the 3 published arcs, and a number nobody could name. A numeral without
   * its unit is decoration pretending to be information.
   */
  numeral: string;
  unit: string;
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

  const [
    train,
    popularity,
    drillToday,
    tellToday,
    drillBest,
    adventures,
    publishedAdventures,
    receipts,
  ] = await Promise.all([
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
    // Counted rather than hardcoded: the tile said 06 while three arcs were
    // published, and a number on a menu that disagrees with the room behind
    // it costs more trust than no number would.
    db.adventure.count({ where: { publishedAt: { not: null } } }),
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
    // The climb, not the scenario. Every tile in this room opens a menu, and
    // dropping straight into a run from here would be the one tile that
    // starts something the member has not chosen yet. The climb puts the
    // same scenario one tap further on, under a PLAY button.
    href: "/app/train/climb",
  };

  const best = drillBest._max.score;

  const squares: BentoSquare[] = [
    {
      key: "speed-drill",
      name: "Speed Drill",
      numeral: "60",
      unit: "seconds",
      meta: best !== null ? `${best}/10 best` : "Never played",
      href: "/app/play/drill",
      doneToday: drillToday > 0,
      popular: false,
    },
    {
      key: "daily-tell",
      name: "Daily Tell",
      numeral: "01",
      unit: "a day",
      meta: "One a day",
      href: "/app/play/tell",
      doneToday: tellToday > 0,
      popular: false,
    },
    {
      key: "adventures",
      name: "Adventures",
      numeral: String(publishedAdventures).padStart(2, "0"),
      unit: publishedAdventures === 1 ? "arc" : "arcs",
      meta: adventures > 0 ? `${adventures} started` : "Multi-night arcs",
      href: "/app/adventures",
      // No daily reset, so it is never "done today" and sorts on plays.
      doneToday: false,
      popular: false,
    },
    {
      key: "receipts",
      name: "Receipts",
      numeral: "02",
      unit: "minutes",
      meta: receipts > 0 ? `${receipts} read` : "Paste what they sent",
      href: "/app/receipts",
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
      href: "/app/lab",
      cta: "Open",
    },
  };
}

function markPopular(squares: BentoSquare[], popularity: Popularity): void {
  if (!popularity.leader) return;
  const winner = squares.find((s) => s.key === popularity.leader);
  if (winner) winner.popular = true;
}
