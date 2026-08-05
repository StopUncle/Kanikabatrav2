/**
 * Dev-only: give a local account a live PactMembership so the pact tier
 * can be walked in a browser. Never run against prod.
 */
import { prisma } from "../lib/prisma";

async function main() {
  const email = process.argv[2];
  if (!email) throw new Error("usage: tsx scripts/dev-make-pact-persona.ts <email>");
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error(`no user ${email}`);
  const inAMonth = new Date(Date.now() + 30 * 86_400_000);
  await prisma.pactMembership.upsert({
    where: { userId: user.id },
    update: { status: "ACTIVE", expiresAt: inAMonth },
    create: {
      userId: user.id,
      status: "ACTIVE",
      billingCycle: "WEEKLY",
      activatedAt: new Date(),
      expiresAt: inAMonth,
    },
  });
  console.log(`pact persona ready: ${email}`);
}

main().finally(() => prisma.$disconnect());
