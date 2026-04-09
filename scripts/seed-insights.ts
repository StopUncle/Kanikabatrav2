const { PrismaClient } = require("@prisma/client");
const { dailyInsights } = require("../prisma/seeds/daily-insights");
const { discussionPrompts } = require("../prisma/seeds/discussion-prompts");

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding daily insights...");

  let insightCount = 0;
  for (const insight of dailyInsights) {
    const existing = await prisma.dailyInsight.findFirst({
      where: {
        dayOfYear: insight.dayOfYear,
        category: insight.category,
      },
    });

    if (!existing) {
      await prisma.dailyInsight.create({ data: insight });
      insightCount++;
    }
  }

  console.log(`Seeded ${insightCount} daily insights (${dailyInsights.length - insightCount} already existed)`);

  console.log("Seeding discussion prompts...");

  let promptCount = 0;
  for (const prompt of discussionPrompts) {
    const existing = await prisma.discussionPrompt.findFirst({
      where: {
        theme: prompt.theme,
        variation: prompt.variation,
      },
    });

    if (!existing) {
      await prisma.discussionPrompt.create({ data: prompt });
      promptCount++;
    }
  }

  console.log(`Seeded ${promptCount} discussion prompts (${discussionPrompts.length - promptCount} already existed)`);
  console.log("Content seeding complete!");
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e: unknown) => {
    console.error("Seed failed:", e);
    await prisma.$disconnect();
    process.exit(1);
  });
