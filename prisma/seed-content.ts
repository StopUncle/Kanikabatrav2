import { PrismaClient } from "@prisma/client";
import { dailyInsights } from "./seeds/daily-insights";
import { discussionPrompts } from "./seeds/discussion-prompts";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding daily insights and discussion prompts...\n");

  // Seed DailyInsight table
  const existingInsights = await prisma.dailyInsight.count();
  if (existingInsights > 0) {
    console.log(`DailyInsight already has ${existingInsights} rows — skipping`);
  } else {
    let created = 0;
    for (const insight of dailyInsights) {
      await prisma.dailyInsight.create({
        data: {
          content: insight.content,
          category: insight.category,
          dayOfYear: insight.dayOfYear,
        },
      });
      created++;
    }
    console.log(`Created ${created} daily insights`);
  }

  // Seed DiscussionPrompt table
  const existingPrompts = await prisma.discussionPrompt.count();
  if (existingPrompts > 0) {
    console.log(`DiscussionPrompt already has ${existingPrompts} rows — skipping`);
  } else {
    let created = 0;
    for (const prompt of discussionPrompts) {
      // Spread the full seed object — it matches the Prisma schema fields
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await prisma.discussionPrompt.create({ data: prompt as any });
      created++;
    }
    console.log(`Created ${created} discussion prompts`);
  }

  // Create a few launch-day feed posts so the feed isn't empty
  const existingPosts = await prisma.feedPost.count();
  if (existingPosts > 0) {
    console.log(`\nFeedPost already has ${existingPosts} rows — skipping initial posts`);
  } else {
    // Find admin user to attribute posts to
    const admin = await prisma.user.findFirst({
      where: { role: "ADMIN" },
      select: { id: true },
    });
    if (!admin) {
      console.log("\nNo ADMIN user found — skipping feed posts (create one first)");
    } else {
      const launchPosts = [
        {
          title: "Welcome to The Consilium",
          content:
            "This is the space I've been building for you. No filters. No algorithms. Just psychology that works, from someone who thinks differently.\n\nHere's what you're getting:\n\n**The Feed** — daily insights, psychology breakdowns, and posts from me that I'd never put on social media.\n\n**Voice Notes** — raw, unfiltered audio. The kind of thing I'd only say behind closed doors.\n\n**The Classroom** — structured courses on dark psychology, pattern recognition, and strategic influence.\n\n**The Forum** — your space to discuss, debate, and connect with people who see what you see.\n\nWelcome. You earned this. Now use it.",
          type: "ANNOUNCEMENT" as const,
          isPinned: true,
        },
        {
          title: "The Doctrine of Cold Reading",
          content:
            "Most people think cold reading is a party trick. It's not. It's the single most powerful social skill you'll ever learn.\n\nWithin 30 seconds of meeting someone, their shoes tell you their income bracket. Their posture tells you their confidence level. The speed they speak tells you if they're trying to impress you.\n\nToday's insight: **watch the gap between what someone says and what their body does.** That gap is where the truth lives.\n\nComment below with what you noticed about the last person you spoke to.",
          type: "ANNOUNCEMENT" as const,
          isPinned: false,
        },
        {
          title: "Why They Pull Away (And What You Should Actually Do)",
          content:
            "When someone pulls away, your instinct is to chase. That instinct is wrong.\n\nThe pull-away is a test. Not always conscious, but always a test. They want to see if you'll spiral. If you'll double-text. If you'll abandon your frame.\n\nThe correct response to distance is **matching it** — not with petty games, but with genuine self-sufficiency. The person who can sit in the discomfort of silence without flinching is the one holding all the power.\n\nThis is Chapter 7 energy. If you've read it, you know.",
          type: "ANNOUNCEMENT" as const,
          isPinned: false,
        },
      ];

      for (const post of launchPosts) {
        await prisma.feedPost.create({
          data: {
            title: post.title,
            content: post.content,
            type: post.type,
            isPinned: post.isPinned,
            authorId: admin.id,
          },
        });
      }
      console.log(`\nCreated ${launchPosts.length} launch-day feed posts`);
    }
  }

  console.log("\nDone.");
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error("Seed failed:", e);
    await prisma.$disconnect();
    process.exit(1);
  });
