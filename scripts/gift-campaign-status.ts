/**
 * Read-only report: status of the 97-buyer gift-Consilium campaign.
 *
 * Shows, for every user whose membership is on a "gift" billingCycle:
 *   - whether they've CLAIMED (membership ACTIVE + activatedAt set)
 *   - whether they've actually USED it (first-visit onboarding dismissed,
 *     or any feed comment, any lesson progress, any simulator run)
 *   - when their 30 days expires
 *
 * Run:
 *   DATABASE_URL="<railway public url>" npx tsx scripts/gift-campaign-status.ts
 */

import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";

dotenv.config({ path: ".env.production" });
dotenv.config({ path: ".env.local", override: false });
dotenv.config({ path: ".env", override: false });

const prisma = new PrismaClient();

async function main() {
  // Every CommunityMembership created by the gift campaign uses
  // billingCycle = "gift". Pull them all with the signals we care about.
  const gifts = await prisma.communityMembership.findMany({
    where: { billingCycle: "gift" },
    include: {
      user: {
        select: {
          id: true,
          email: true,
          displayName: true,
          createdAt: true,
          onboardingSeenAt: true,
          _count: {
            select: {
              feedComments: true,
              feedPostLikes: true,
              commentLikes: true,
              enrollments: true,
              simulatorProgress: true,
            },
          },
        },
      },
    },
    orderBy: { activatedAt: "asc" },
  });

  const now = Date.now();

  type Row = {
    email: string;
    displayName: string | null;
    status: string;
    claimed: boolean;
    activatedAt: Date | null;
    expiresAt: Date | null;
    daysLeft: number | null;
    expired: boolean;
    usageScore: number;
    onboardingDismissed: boolean;
    comments: number;
    likes: number;
    courseEnrollments: number;
    simulatorRuns: number;
  };

  const rows: Row[] = gifts.map((m) => {
    const u = m.user;
    const expiresAt = m.expiresAt;
    const expired = expiresAt ? expiresAt.getTime() < now : false;
    const daysLeft = expiresAt
      ? Math.ceil((expiresAt.getTime() - now) / (1000 * 60 * 60 * 24))
      : null;
    const likes = u._count.feedPostLikes + u._count.commentLikes;
    // Any of these imply they logged in AND did something — not just
    // "opened the welcome page and left". Onboarding-dismissed alone is
    // a weaker signal but still proves they loaded the feed in-app.
    const usageScore =
      (u.onboardingSeenAt ? 1 : 0) +
      u._count.feedComments +
      likes +
      u._count.enrollments +
      u._count.simulatorProgress;

    return {
      email: u.email,
      displayName: u.displayName,
      status: m.status,
      // A "claimed" gift is one where the magic-claim flow actually ran:
      // status flips from PENDING to ACTIVE and activatedAt is stamped.
      // Unclaimed gifts never get an activatedAt so they're easy to spot.
      claimed: !!m.activatedAt && m.status === "ACTIVE",
      activatedAt: m.activatedAt,
      expiresAt,
      daysLeft,
      expired,
      usageScore,
      onboardingDismissed: !!u.onboardingSeenAt,
      comments: u._count.feedComments,
      likes,
      courseEnrollments: u._count.enrollments,
      simulatorRuns: u._count.simulatorProgress,
    };
  });

  const claimed = rows.filter((r) => r.claimed);
  const unclaimed = rows.filter((r) => !r.claimed);
  const activeAndUsing = claimed.filter((r) => !r.expired && r.usageScore > 0);
  const activeLurkers = claimed.filter(
    (r) => !r.expired && r.usageScore === 0,
  );
  const expired = claimed.filter((r) => r.expired);

  // --- Headline ------------------------------------------------------
  console.log("");
  console.log("─────────────────────────────────────────────────────────");
  console.log("  GIFT-CONSILIUM CAMPAIGN STATUS");
  console.log("─────────────────────────────────────────────────────────");
  console.log(`  Total gift memberships in DB:   ${rows.length}`);
  console.log(`  Claimed (activatedAt set):      ${claimed.length}`);
  console.log(`  Unclaimed (still pending):      ${unclaimed.length}`);
  console.log("");
  console.log(`  Of those claimed:`);
  console.log(`    Active + actually using:      ${activeAndUsing.length}`);
  console.log(`    Active but lurking (no acts): ${activeLurkers.length}`);
  console.log(`    Expired:                      ${expired.length}`);
  console.log("");

  // --- Actively using ------------------------------------------------
  if (activeAndUsing.length > 0) {
    console.log("─────────────────────────────────────────────────────────");
    console.log("  ACTIVELY USING (claimed + doing something)");
    console.log("─────────────────────────────────────────────────────────");
    activeAndUsing
      .sort((a, b) => b.usageScore - a.usageScore)
      .forEach((r, i) => {
        const name = r.displayName || "(no display name)";
        const signals: string[] = [];
        if (r.comments) signals.push(`${r.comments} cmt`);
        if (r.likes) signals.push(`${r.likes} likes`);
        if (r.courseEnrollments) signals.push(`${r.courseEnrollments} courses`);
        if (r.simulatorRuns) signals.push(`${r.simulatorRuns} sim-runs`);
        if (r.onboardingDismissed && signals.length === 0)
          signals.push("onboarded only");
        console.log(
          `  ${String(i + 1).padStart(2)}. ${r.email.padEnd(38)} ` +
            `${String(r.daysLeft ?? "?").padStart(2)}d left  ` +
            `[${signals.join(", ")}]  ${name}`,
        );
      });
    console.log("");
  }

  // --- Claimed but lurking ------------------------------------------
  if (activeLurkers.length > 0) {
    console.log("─────────────────────────────────────────────────────────");
    console.log("  CLAIMED BUT LURKING (clicked claim, no actions yet)");
    console.log("─────────────────────────────────────────────────────────");
    activeLurkers.forEach((r, i) => {
      console.log(
        `  ${String(i + 1).padStart(2)}. ${r.email.padEnd(38)} ` +
          `${String(r.daysLeft ?? "?").padStart(2)}d left`,
      );
    });
    console.log("");
  }

  // --- Unclaimed ----------------------------------------------------
  if (unclaimed.length > 0) {
    console.log("─────────────────────────────────────────────────────────");
    console.log(`  UNCLAIMED (${unclaimed.length}) — received email, never clicked through`);
    console.log("─────────────────────────────────────────────────────────");
    unclaimed.slice(0, 20).forEach((r, i) => {
      console.log(`  ${String(i + 1).padStart(2)}. ${r.email}`);
    });
    if (unclaimed.length > 20) {
      console.log(`  … and ${unclaimed.length - 20} more`);
    }
    console.log("");
  }

  // --- Expired ------------------------------------------------------
  if (expired.length > 0) {
    console.log("─────────────────────────────────────────────────────────");
    console.log("  EXPIRED (30 days elapsed, no renewal)");
    console.log("─────────────────────────────────────────────────────────");
    expired.forEach((r, i) => {
      console.log(
        `  ${String(i + 1).padStart(2)}. ${r.email.padEnd(38)} usage=${r.usageScore}`,
      );
    });
    console.log("");
  }

  await prisma.$disconnect();
}

main().catch(async (err) => {
  console.error(err);
  await prisma.$disconnect();
  process.exit(1);
});
