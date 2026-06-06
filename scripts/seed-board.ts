/**
 * Seed THE BOARD with a dense, browsable launch set.
 *
 * Two calibration anchors (Keanu Reeves floor, Ed Kemper ceiling) are the
 * only real named individuals here, both named by Kanika in the build
 * spec: the floor example, and a convicted, deceased, heavily documented
 * case that defines the practical ceiling. They sit on the ruler
 * (isCalibration=true), never inside the ranking.
 *
 * The ranked roster below is ARCHETYPAL and illustrative on purpose.
 * Every score on the board is Kanika's to assign; these placeholders
 * exist so the instrument is dense and fully browsable for development
 * and QA. Replace them with real figures + real reads through the admin
 * panel at /admin/board. Do not treat these numbers as editorial.
 *
 * Idempotent: upserts by slug, and rewrites each figure's score history
 * and sources on every run so re-seeding is safe.
 *
 * Run: npm run seed:board
 */

import { PrismaClient, Prisma, type Tier, type Archetype, type FigureStatus } from "@prisma/client";

const prisma = new PrismaClient();

function tierFor(composite: number): Tier {
  if (composite <= 19) return "NEGLIGIBLE";
  if (composite <= 39) return "LOW";
  if (composite <= 59) return "MODERATE";
  if (composite <= 79) return "ELEVATED";
  return "HIGH";
}

const DAY = 24 * 60 * 60 * 1000;

interface SeedSector {
  name: string;
  score: number;
  note?: string;
}
interface SeedScore {
  composite: number;
  factor1: number;
  factor2: number;
  verdict: string;
  sectors: SeedSector[];
  triggerEvent?: string;
  /** Days ago this score was assigned. Largest = the debut. */
  daysAgo: number;
}
interface SeedFigure {
  slug: string;
  name: string;
  descriptor: string;
  archetype?: Archetype;
  isCalibration?: boolean;
  status?: FigureStatus;
  featuredRequest?: boolean;
  sources?: { label: string; url: string }[];
  scores: SeedScore[];
}

function sectors(
  grandiosity: number,
  empathy: number,
  affect: number,
  control: number,
  image: number,
  criticism: number,
): SeedSector[] {
  return [
    { name: "Grandiosity", score: grandiosity },
    { name: "Empathy markers", score: empathy },
    { name: "Affect / shallowness", score: affect },
    { name: "Control / manipulation", score: control },
    { name: "Image management", score: image },
    { name: "Response under criticism", score: criticism },
  ];
}

const FIGURES: SeedFigure[] = [
  // ---- Calibration anchors (on the ruler, not in the ranking) ----
  {
    slug: "keanu-reeves",
    name: "Keanu Reeves",
    descriptor: "The floor anchor",
    isCalibration: true,
    scores: [
      {
        composite: 6,
        factor1: 4,
        factor2: 8,
        daysAgo: 140,
        verdict:
          "The floor of the scale. Decades in the most ego-inflating industry on earth and the through-line is deference, generosity, and a near-total absence of the traits this board measures. He is here to show you what a low read actually looks like, so the high ones mean something.",
        sectors: sectors(8, 92, 10, 6, 14, 9),
      },
    ],
    sources: [
      { label: "Long-form career interviews, 1994 to present", url: "https://en.wikipedia.org/wiki/Keanu_Reeves" },
    ],
  },
  {
    slug: "ed-kemper",
    name: "Ed Kemper",
    descriptor: "The ceiling anchor",
    isCalibration: true,
    scores: [
      {
        composite: 97,
        factor1: 96,
        factor2: 98,
        daysAgo: 140,
        verdict:
          "Both factors maxed. Articulate, self-narrativizing, and entirely documented in his own words across decades of recorded interviews. Convicted and deceased: the safest possible teaching case, and the practical ceiling of the instrument. Same Factor 1 machinery you will recognise in figures the world adores. The only difference is what he did with it.",
        sectors: sectors(90, 2, 95, 98, 88, 70),
      },
    ],
    sources: [
      { label: "Recorded prison interviews (multiple, 1980s)", url: "https://en.wikipedia.org/wiki/Edmund_Kemper" },
    ],
  },

  // ---- HIGH (80-100) ----
  {
    slug: "the-spotlight-predator",
    name: "The Spotlight Predator",
    descriptor: "Once-untouchable industry power broker",
    archetype: "OPERATOR",
    scores: [
      {
        composite: 86,
        factor1: 88,
        factor2: 84,
        daysAgo: 95,
        verdict:
          "A textbook Factor 1 operator who weaponised access. Charm as a tool, never a trait. The image was managed with the same cold precision as the predation, which is exactly why it held for so long.",
        sectors: sectors(82, 6, 80, 92, 90, 78),
      },
    ],
    sources: [{ label: "Court filings and investigative reporting", url: "https://example.com/sources" }],
  },
  {
    slug: "the-ponzi-architect",
    name: "The Ponzi Architect",
    descriptor: "Finance's most trusted name, until it wasn't",
    archetype: "OPERATOR",
    scores: [
      {
        composite: 83,
        factor1: 85,
        factor2: 80,
        daysAgo: 88,
        verdict:
          "Calm, grandfatherly, devastating. The shallow affect reads as steadiness to a mark. He did not feel the harm because the wiring to feel it was never there. A pure Factor 1 read with just enough lifestyle recklessness to tip into the top band.",
        sectors: sectors(70, 8, 88, 90, 84, 72),
      },
    ],
  },

  // ---- ELEVATED (60-79, the clinical-threshold range) ----
  {
    slug: "the-startup-messiah",
    name: "The Startup Messiah",
    descriptor: "Visionary founder, serial flameout",
    archetype: "OPERATOR",
    scores: [
      {
        composite: 64,
        factor1: 72,
        factor2: 56,
        daysAgo: 120,
        verdict:
          "The debut read. Grandiosity dressed as vision. The reality-distortion field is real, and so is the trail of people who believed it. Sits just over the line into the elevated band on the strength of Factor 1 alone.",
        sectors: sectors(80, 22, 60, 74, 82, 58),
      },
      {
        composite: 71,
        factor1: 78,
        factor2: 62,
        daysAgo: 9,
        triggerEvent: "deposition transcripts released",
        verdict:
          "Re-scored upward. The deposition removed any doubt about the manipulation being deliberate rather than delusional. Image management cracked under oath, which is where these reads always sharpen.",
        sectors: sectors(84, 18, 64, 80, 70, 48),
      },
    ],
    sources: [
      { label: "Deposition transcripts, 2026", url: "https://example.com/sources" },
      { label: "Long-form profile, 2024", url: "https://example.com/sources" },
    ],
  },
  {
    slug: "the-political-brawler",
    name: "The Political Brawler",
    descriptor: "Built a movement on grievance",
    archetype: "OPERATOR",
    scores: [
      {
        composite: 68,
        factor1: 74,
        factor2: 60,
        daysAgo: 60,
        verdict:
          "Reads the room better than anyone in it and feels almost none of what he performs. The grievance is a product. Criticism doesn't wound, it fuels, which is the tell that the affect underneath is genuinely shallow.",
        sectors: sectors(78, 20, 70, 76, 72, 34),
      },
    ],
  },
  {
    slug: "the-daytime-confessor",
    name: "The Daytime Confessor",
    descriptor: "Beloved host, chaos behind the curtain",
    archetype: "TRAINWRECK",
    scores: [
      {
        composite: 63,
        factor1: 54,
        factor2: 72,
        daysAgo: 45,
        verdict:
          "The rare elevated read driven by Factor 2, not Factor 1. Impulsive, volatile, self-sabotaging in cycles. The warmth on camera is real in the moment and gone by the parking lot. A trainwreck, not an operator, and the split bars show it.",
        sectors: sectors(58, 40, 66, 50, 74, 30),
      },
    ],
  },

  // ---- MODERATE (40-59) ----
  {
    slug: "the-method-actor",
    name: "The Method Actor",
    descriptor: "Genius reputation, difficult set",
    archetype: "OPERATOR",
    scores: [
      {
        composite: 56,
        factor1: 62,
        factor2: 48,
        daysAgo: 70,
        verdict:
          "Right on the subclinical line. The control is real and the empathy is selective, switched on for the work and off for the crew. Not a dangerous read, a demanding one, but the Factor 1 machinery is clearly present.",
        sectors: sectors(64, 44, 50, 70, 60, 46),
      },
    ],
  },
  {
    slug: "the-reformed-wolf",
    name: "The Reformed Wolf",
    descriptor: "Ex-trader turned motivational brand",
    archetype: "OPERATOR",
    scores: [
      {
        composite: 51,
        factor1: 58,
        factor2: 44,
        daysAgo: 40,
        verdict:
          "The redemption arc is itself the manipulation. He sells the recovery with the same instincts that drove the original damage. Subclinical, but the pattern never actually left, it just found a more marketable channel.",
        sectors: sectors(66, 38, 46, 64, 78, 42),
      },
    ],
  },
  {
    slug: "the-reality-lead",
    name: "The Reality Lead",
    descriptor: "Franchise villain, off-screen unknown",
    archetype: "TRAINWRECK",
    scores: [
      {
        composite: 46,
        factor1: 38,
        factor2: 54,
        daysAgo: 30,
        verdict:
          "More mess than menace. The on-screen villainy is partly edit, partly genuine impulse-control trouble. Factor 2 leads. The empathy is intact when the cameras are off, which is the line between this read and the elevated band.",
        sectors: sectors(44, 52, 48, 40, 56, 36),
      },
    ],
  },

  // ---- LOW (20-39) ----
  {
    slug: "the-peoples-host",
    name: "The People's Host",
    descriptor: "Stadium-filling everyman",
    archetype: "TRAINWRECK",
    scores: [
      {
        composite: 29,
        factor1: 24,
        factor2: 34,
        daysAgo: 55,
        verdict:
          "Low across the board. The ego is normal-sized, the empathy reads as real, and the occasional mess is ordinary human mess, not a pattern. A useful low-end calibration point that is still a living, applicable figure.",
        sectors: sectors(30, 72, 26, 22, 40, 20),
      },
    ],
  },
  {
    slug: "the-quiet-veteran",
    name: "The Quiet Veteran",
    descriptor: "Four decades, zero scandal",
    archetype: "TRAINWRECK",
    scores: [
      {
        composite: 23,
        factor1: 18,
        factor2: 28,
        daysAgo: 50,
        verdict:
          "A near-floor read on a living figure. Steady, self-effacing, and conspicuously without the image-management reflex that defines the higher bands. The boring answer, which is the point: most people are down here.",
        sectors: sectors(20, 80, 22, 18, 24, 16),
      },
    ],
  },

  // ---- NEGLIGIBLE (0-19) ----
  {
    slug: "the-childrens-author",
    name: "The Children's Author",
    descriptor: "Generational storyteller",
    archetype: "TRAINWRECK",
    scores: [
      {
        composite: 12,
        factor1: 8,
        factor2: 16,
        daysAgo: 65,
        verdict:
          "Negligible traits. The warmth is not a performance and there is no machinery underneath it to find. Sits near Keanu on the floor, here to keep the bottom of the scale honest and populated.",
        sectors: sectors(10, 88, 12, 8, 18, 10),
      },
    ],
  },
  {
    slug: "the-volunteer-medic",
    name: "The Volunteer Medic",
    descriptor: "Frontline humanitarian",
    archetype: "TRAINWRECK",
    scores: [
      {
        composite: 8,
        factor1: 5,
        factor2: 11,
        daysAgo: 62,
        verdict:
          "About as low as a real person reads. High-empathy, low-grandiosity, no image game. The anti-pattern to everything the top of this board measures.",
        sectors: sectors(6, 94, 8, 5, 9, 7),
      },
    ],
  },

  // ---- Most Requested rail (no score yet, fires the nomination engine) ----
  {
    slug: "the-tech-oracle",
    name: "The Tech Oracle",
    descriptor: "Most requested. Not yet scored.",
    status: "MOST_REQUESTED",
    featuredRequest: true,
    scores: [],
  },
  {
    slug: "the-pop-sovereign",
    name: "The Pop Sovereign",
    descriptor: "Most requested. Not yet scored.",
    status: "MOST_REQUESTED",
    featuredRequest: true,
    scores: [],
  },
];

async function seedFigure(fig: SeedFigure): Promise<void> {
  const figure = await prisma.figure.upsert({
    where: { slug: fig.slug },
    update: {
      name: fig.name,
      descriptor: fig.descriptor,
      archetype: fig.archetype ?? null,
      isCalibration: fig.isCalibration ?? false,
      status: fig.status ?? "ON_BOARD",
      featuredRequest: fig.featuredRequest ?? false,
      currentScoreId: null, // detach before rewriting history
    },
    create: {
      slug: fig.slug,
      name: fig.name,
      descriptor: fig.descriptor,
      archetype: fig.archetype ?? null,
      isCalibration: fig.isCalibration ?? false,
      status: fig.status ?? "ON_BOARD",
      featuredRequest: fig.featuredRequest ?? false,
    },
  });

  // Rewrite history + sources for idempotent re-seeding.
  await prisma.score.deleteMany({ where: { figureId: figure.id } });
  await prisma.source.deleteMany({ where: { figureId: figure.id } });

  let latestId: string | null = null;
  let latestDaysAgo = Number.POSITIVE_INFINITY;
  for (const sc of fig.scores) {
    const row = await prisma.score.create({
      data: {
        figureId: figure.id,
        composite: sc.composite,
        factor1: sc.factor1,
        factor2: sc.factor2,
        tier: tierFor(sc.composite),
        verdict: sc.verdict,
        sectors: sc.sectors as unknown as Prisma.InputJsonValue,
        triggerEvent: sc.triggerEvent ?? null,
        scoredAt: new Date(Date.now() - sc.daysAgo * DAY),
      },
    });
    if (sc.daysAgo < latestDaysAgo) {
      latestDaysAgo = sc.daysAgo;
      latestId = row.id;
    }
  }

  if (latestId) {
    await prisma.figure.update({
      where: { id: figure.id },
      data: { currentScoreId: latestId },
    });
  }

  if (fig.sources?.length) {
    await prisma.source.createMany({
      data: fig.sources.map((s, i) => ({
        figureId: figure.id,
        label: s.label,
        url: s.url,
        sortOrder: i,
      })),
    });
  }
}

async function main(): Promise<void> {
  console.log("Seeding THE BOARD...");
  for (const fig of FIGURES) {
    await seedFigure(fig);
    console.log(`  ${fig.slug} (${fig.scores.length} score${fig.scores.length === 1 ? "" : "s"})`);
  }
  const total = await prisma.figure.count();
  console.log(`Done. ${FIGURES.length} figures seeded, ${total} figures total.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
