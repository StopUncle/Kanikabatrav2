/**
 * Idempotent adventure seeder. Inserts the three launch arcs (or updates
 * their non-key fields if they already exist) so a fresh DB or a CI
 * environment can stand the catalog up with one command.
 *
 * Run via: tsx scripts/seed-adventures.ts
 */

import { PrismaClient } from "@prisma/client";
import { scenariosForTrack } from "../lib/simulator/scenarios";

const prisma = new PrismaClient();

type Seed = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  scenarioIds: string[];
  tier: "free" | "premium" | "vip";
  estimatedMinutes: number;
  difficulty: "beginner" | "intermediate" | "advanced";
  endingRecap: string;
  isNew: boolean;
};

async function main() {
  // Enumerate scenarios from ALL_SCENARIOS at runtime so the seed always
  // reflects what is actually shipping in code, no hardcoded id lists.
  const mira = scenariosForTrack("loving-mira").map((s) => s.id);
  const clusterB = scenariosForTrack("cluster-b-lab").map((s) => s.id);
  const business = scenariosForTrack("male-business")
    .slice(0, 8)
    .map((s) => s.id);

  if (mira.length === 0) {
    console.warn("loving-mira track has zero scenarios. Adventure will be skipped.");
  }
  if (clusterB.length === 0) {
    console.warn("cluster-b-lab track has zero scenarios. Adventure will be skipped.");
  }
  if (business.length < 8) {
    console.warn(
      `male-business has ${business.length} scenarios, seeded with what exists.`,
    );
  }

  const seeds: Seed[] = [];

  if (mira.length > 0) {
    seeds.push({
      slug: "the-long-game-with-mira",
      title: "The Long Game with Mira",
      tagline: "How you stay in love without losing yourself.",
      description:
        "A long-form BPD narrative played across every chapter of the loving-mira track. The friend you cannot save, the love that costs you if you do not learn the moves. Five scenes of escalation. Five scenes of return.",
      scenarioIds: mira,
      tier: "premium",
      estimatedMinutes: 70,
      difficulty: "advanced",
      isNew: true,
      endingRecap:
        "Loving someone with a Cluster B pattern is not about fixing them. It is about learning where you end and they begin, then holding that line with steadiness, not anger. You read the apology morning, the devaluation, the therapy ask, the recovery. You saw the rhythm. The next time it lands in your real life, you will know it before the first text.",
    });
  }

  if (clusterB.length > 0) {
    seeds.push({
      slug: "cluster-b-diagnostic-week",
      title: "Cluster-B Diagnostic Week",
      tagline: "Short drills. Real patterns. Audit, diagnose, prescribe.",
      description:
        "A diagnostic ladder through the cluster-b-lab track. Each scenario is a single artifact: a voicemail, a meeting note, an engagement post, a Slack message. Your job is to spot the pattern before it spots you.",
      scenarioIds: clusterB,
      tier: "premium",
      estimatedMinutes: 40,
      difficulty: "intermediate",
      isNew: true,
      endingRecap:
        "Diagnosis is not gossip. It is the cost of admission to the rooms where people lie professionally. You have run the drills. The voicemail, the lunch, the meeting notes, the engagement, the Slack. Next time the artifact lands in your real inbox, the read will be faster than the feeling.",
    });
  }

  if (business.length > 0) {
    seeds.push({
      slug: "founders-gauntlet",
      title: "Founder's Gauntlet",
      tagline: "The first eight rooms that decide whether you keep the company.",
      description:
        "Eight chapters of the male-business track played as one arc. The first win, the credit thief, the covert peer, the charming cofounder, the predatory term sheet, the first firing, the board seat, the cofounder offer. Power, capital, and the dark psych in rooms that matter.",
      scenarioIds: business,
      tier: "premium",
      estimatedMinutes: 95,
      difficulty: "advanced",
      isNew: true,
      endingRecap:
        "The gauntlet is not the deals. It is how you carry yourself when the deal is on the table and someone else is anchoring the math. You learned silence as a tool, asymmetry as a tell, charm as a vector. The next room is real. The posture goes with you.",
    });
  }

  let created = 0;
  let updated = 0;
  for (const seed of seeds) {
    const existing = await prisma.adventure.findUnique({
      where: { slug: seed.slug },
    });
    if (existing) {
      await prisma.adventure.update({
        where: { slug: seed.slug },
        data: {
          title: seed.title,
          tagline: seed.tagline,
          description: seed.description,
          scenarioIds: seed.scenarioIds,
          tier: seed.tier,
          estimatedMinutes: seed.estimatedMinutes,
          difficulty: seed.difficulty,
          endingRecap: seed.endingRecap,
          isNew: seed.isNew,
          // First-time publish only. Subsequent runs leave publish state
          // alone so a manual unpublish in admin survives a re-seed.
          publishedAt: existing.publishedAt ?? new Date(),
        },
      });
      updated++;
    } else {
      await prisma.adventure.create({
        data: {
          slug: seed.slug,
          title: seed.title,
          tagline: seed.tagline,
          description: seed.description,
          scenarioIds: seed.scenarioIds,
          tier: seed.tier,
          estimatedMinutes: seed.estimatedMinutes,
          difficulty: seed.difficulty,
          endingRecap: seed.endingRecap,
          isNew: seed.isNew,
          publishedAt: new Date(),
        },
      });
      created++;
    }
    console.log(
      `  - ${seed.slug}: ${seed.scenarioIds.length} chapter${
        seed.scenarioIds.length === 1 ? "" : "s"
      }`,
    );
  }

  console.log(`\nDone. ${created} created, ${updated} updated.`);
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
