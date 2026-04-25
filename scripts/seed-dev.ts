/**
 * Dev environment seeder. Creates a test user that's a fully-active
 * Consilium member + admin, plus a handful of feed posts so the
 * member surfaces aren't barren when you dogfood locally.
 *
 * Idempotent — re-running upserts everything.
 *
 * Run:
 *   DATABASE_URL=<local> npx tsx scripts/seed-dev.ts
 *
 * Login:
 *   email:    dev@kanikarose.com
 *   password: password123
 *   admin pin: 736473 (set in .env)
 */
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();
const DEV_EMAIL = "dev@kanikarose.com";
const DEV_PASSWORD = "password123";

async function main() {
  console.log(`\n=== Dev seeder ===\n`);

  const hashedPassword = await bcrypt.hash(DEV_PASSWORD, 12);

  const user = await prisma.user.upsert({
    where: { email: DEV_EMAIL },
    update: {
      password: hashedPassword,
      role: "ADMIN",
      name: "Dev User",
      displayName: "DevUser",
      onboardingSeenAt: new Date(),
    },
    create: {
      email: DEV_EMAIL,
      password: hashedPassword,
      name: "Dev User",
      displayName: "DevUser",
      role: "ADMIN",
      onboardingSeenAt: new Date(),
    },
  });
  console.log(`✓ User: ${user.email} (id: ${user.id}, role: ${user.role})`);

  const now = new Date();
  const inOneMonth = new Date(now.getTime() + 30 * 86400_000);

  const membership = await prisma.communityMembership.upsert({
    where: { userId: user.id },
    update: {
      status: "ACTIVE",
      billingCycle: "monthly",
      activatedAt: now,
      expiresAt: inOneMonth,
    },
    create: {
      userId: user.id,
      status: "ACTIVE",
      billingCycle: "monthly",
      activatedAt: now,
      expiresAt: inOneMonth,
    },
  });
  console.log(`✓ Membership: ${membership.status} / ${membership.billingCycle}`);

  // Promote one DailyInsight + one DiscussionPrompt into FeedPosts so
  // /consilium/feed isn't empty on first render. Pick the first of each.
  const insight = await prisma.dailyInsight.findFirst();
  if (insight) {
    await prisma.feedPost.upsert({
      where: { id: `dev-seed-insight-${insight.id}` },
      update: {},
      create: {
        id: `dev-seed-insight-${insight.id}`,
        type: "AUTOMATED",
        author: { connect: { id: user.id } },
        title: "Today's Dark Insight",
        content: insight.content,
      },
    });
    console.log(`✓ FeedPost: insight (${insight.category})`);
  }

  const prompt = await prisma.discussionPrompt.findFirst();
  if (prompt) {
    await prisma.feedPost.upsert({
      where: { id: `dev-seed-prompt-${prompt.id}` },
      update: {},
      create: {
        id: `dev-seed-prompt-${prompt.id}`,
        type: "DISCUSSION_PROMPT",
        author: { connect: { id: user.id } },
        title: prompt.title ?? prompt.theme ?? "Discussion",
        content: prompt.content,
      },
    });
    console.log(`✓ FeedPost: prompt "${prompt.theme?.slice(0, 50)}..."`);
  }

  await prisma.feedPost.upsert({
    where: { id: "dev-seed-welcome" },
    update: {},
    create: {
      id: "dev-seed-welcome",
      type: "ANNOUNCEMENT",
      author: { connect: { id: user.id } },
      title: "Welcome to The Consilium (Dev)",
      content:
        "This is a local dev environment. Real members see Kanika's actual welcome post here. Use the simulator, leaderboard, and badges to dogfood the experience.",
    },
  });
  console.log(`✓ FeedPost: welcome announcement`);

  console.log(`\n=== Done ===\n`);
  console.log(`Login at:    http://localhost:3000/login`);
  console.log(`  email:     ${DEV_EMAIL}`);
  console.log(`  password:  ${DEV_PASSWORD}`);
  console.log(``);
  console.log(`Admin panel: http://localhost:3000/admin-login`);
  console.log(`  PIN:       736473`);
  console.log(``);
  console.log(`Consilium:   http://localhost:3000/consilium/feed`);
  console.log(``);

  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
