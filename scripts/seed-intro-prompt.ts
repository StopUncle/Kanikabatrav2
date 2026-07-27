/**
 * Seed the pinned Day-0 intro prompt, run once per environment.
 *
 * The Day-0 checklist's third item sends new members here to say their
 * first word. Idempotent: keyed by metadata.marker, re-running is a
 * no-op. Authored by the first ADMIN user so it renders as Kanika.
 *
 * Usage:
 *   npx tsx scripts/seed-intro-prompt.ts
 *   DATABASE_URL=<prod> npx tsx scripts/seed-intro-prompt.ts
 */

import { PrismaClient } from "@prisma/client";
import { INTRO_PROMPT_MARKER } from "../lib/day0/checklist";

const prisma = new PrismaClient();

async function main() {
  const existing = await prisma.feedPost.findFirst({
    where: { metadata: { path: ["marker"], equals: INTRO_PROMPT_MARKER } },
    select: { id: true, isPinned: true },
  });
  if (existing) {
    console.log(
      `Intro prompt already seeded (${existing.id}, pinned=${existing.isPinned}). Nothing to do.`,
    );
    return;
  }

  const admin = await prisma.user.findFirst({
    where: { role: "ADMIN", isBot: false },
    orderBy: { createdAt: "asc" },
    select: { id: true, email: true },
  });
  if (!admin) {
    throw new Error("No ADMIN user found; refusing to seed an authorless prompt.");
  }

  const post = await prisma.feedPost.create({
    data: {
      authorId: admin.id,
      type: "DISCUSSION_PROMPT",
      isPinned: true,
      title: "The tactic that got you",
      content: [
        "Everyone in this room has been played at least once. That's why you're here.",
        "",
        "So introduce yourself the only way that matters: name the tactic that worked on you. The guilt trip you mistook for love. The future they kept promising. The crisis that always arrived right when you found your spine.",
        "",
        "One comment. What it was, and the moment you finally saw it.",
        "",
        "I read every single one.",
      ].join("\n"),
      metadata: { marker: INTRO_PROMPT_MARKER },
    },
    select: { id: true },
  });

  console.log(`Seeded intro prompt ${post.id} (author ${admin.email}).`);
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
