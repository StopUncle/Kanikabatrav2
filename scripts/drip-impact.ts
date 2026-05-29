import { PrismaClient } from "@prisma/client";

const p = new PrismaClient();

async function main() {
  const since = new Date(Date.now() - 72 * 3600 * 1000);

  // Recent Consilium activations
  const memberships = await p.communityMembership.findMany({
    where: { activatedAt: { gte: since } },
    include: {
      user: {
        select: {
          id: true,
          email: true,
          name: true,
          createdAt: true,
          lastSeenAt: true,
          utmSource: true,
          utmMedium: true,
          utmCampaign: true,
          utmContent: true,
          referrer: true,
          landingPage: true,
        },
      },
    },
    orderBy: { activatedAt: "desc" },
  });

  console.log("\n=== RECENT CONSILIUM ACTIVATIONS (last 72h) ===");
  console.log("total:", memberships.length);
  for (const r of memberships) {
    console.log("---");
    console.log("email:", r.user.email);
    console.log("name:", r.user.name);
    console.log("status:", r.status);
    console.log("activatedAt:", r.activatedAt?.toISOString());
    console.log("expiresAt:", r.expiresAt?.toISOString());
    console.log("userCreatedAt:", r.user.createdAt.toISOString());
    console.log("utm:", `${r.user.utmSource || "-"} / ${r.user.utmMedium || "-"} / ${r.user.utmCampaign || "-"} / ${r.user.utmContent || "-"}`);
    console.log("referrer:", r.user.referrer || "-");
    console.log("landingPage:", r.user.landingPage || "-");
  }

  // EmailQueue SENT stats for the new drip sequences over the last 7d
  const sentSince = new Date(Date.now() - 7 * 24 * 3600 * 1000);
  const queueStats = await p.emailQueue.groupBy({
    by: ["sequence", "status"],
    where: {
      createdAt: { gte: sentSince },
      sequence: {
        in: [
          "consilium-cart-abandonment",
          "inner-circle-welcome",
          "quiz-unlock-abandonment",
          "consilium-winback",
          "dormant-member-reengagement",
          "mini-dark-mirror-drip",
          "starter-pack-drip",
        ],
      },
    },
    _count: { _all: true },
  });
  console.log("\n=== EMAIL QUEUE (last 7d, drip sequences) ===");
  for (const s of queueStats) {
    console.log(`${s.sequence.padEnd(32)} ${s.status.padEnd(12)} ${s._count._all}`);
  }

  // For each new ACTIVE member, check what emails they received from our drips before joining
  console.log("\n=== DRIP EMAILS RECEIVED BY EACH NEW MEMBER (before activation) ===");
  for (const r of memberships) {
    if (!r.user.email || !r.activatedAt) continue;
    const emails = await p.emailQueue.findMany({
      where: {
        recipientEmail: r.user.email.toLowerCase(),
        status: "SENT",
        sentAt: { lt: r.activatedAt },
      },
      select: { sequence: true, step: true, subject: true, sentAt: true },
      orderBy: { sentAt: "asc" },
    });
    console.log("---");
    console.log(`${r.user.email}  (activated ${r.activatedAt.toISOString()})`);
    if (emails.length === 0) {
      console.log("  (no prior drip emails)");
    } else {
      for (const e of emails) {
        console.log(`  ${e.sentAt?.toISOString()}  ${e.sequence}#${e.step}  "${e.subject}"`);
      }
    }
  }

  await p.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
