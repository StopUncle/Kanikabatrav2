import { PrismaClient } from "@prisma/client";

const p = new PrismaClient();

async function main() {
  const since = new Date(Date.now() - 14 * 24 * 3600 * 1000);

  const welcomeStats = await p.emailQueue.groupBy({
    by: ["sequence", "status"],
    where: { sequence: "inner-circle-welcome", createdAt: { gte: since } },
    _count: { _all: true },
  });
  console.log("inner-circle-welcome (14d):", JSON.stringify(welcomeStats));

  const welcomeSamples = await p.emailQueue.findMany({
    where: { sequence: "inner-circle-welcome" },
    orderBy: { createdAt: "desc" },
    take: 12,
    select: { recipientEmail: true, step: true, status: true, scheduledAt: true, sentAt: true, subject: true },
  });
  console.log("--- inner-circle-welcome recent ---");
  for (const s of welcomeSamples) console.log(JSON.stringify(s));

  const cart = await p.emailQueue.findMany({
    where: { sequence: "consilium-cart-abandonment" },
    orderBy: { createdAt: "desc" },
    take: 12,
    select: { recipientEmail: true, step: true, status: true, scheduledAt: true, sentAt: true, createdAt: true },
  });
  console.log("--- consilium-cart-abandonment recent ---");
  for (const s of cart) console.log(JSON.stringify(s));

  const winback = await p.emailQueue.findMany({
    where: { sequence: "consilium-winback" },
    orderBy: { createdAt: "desc" },
    take: 8,
    select: { recipientEmail: true, step: true, status: true, scheduledAt: true, sentAt: true },
  });
  console.log("--- consilium-winback recent ---");
  for (const s of winback) console.log(JSON.stringify(s));

  await p.$disconnect();
}

main().catch((e) => { console.error(e); process.exit(1); });
