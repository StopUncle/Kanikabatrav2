// DB-only revocation. Use when Stripe has already been cancelled (e.g.,
// via the Stripe MCP) and you just need to close the DB side of the loop.
// Marks CommunityMembership CANCELLED with expiresAt=now (immediate
// access revocation).

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const userId = process.argv[2];
  if (!userId) {
    console.error("usage: tsx scripts/revoke-db-only.ts <userId>");
    process.exit(1);
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      email: true,
      displayName: true,
      communityMembership: {
        select: { id: true, status: true, expiresAt: true },
      },
    },
  });

  if (!user?.communityMembership) {
    console.error(`No membership for ${userId}.`);
    process.exit(1);
  }

  const now = new Date();
  await prisma.communityMembership.update({
    where: { id: user.communityMembership.id },
    data: {
      status: "CANCELLED",
      cancelledAt: now,
      expiresAt: now,
    },
  });

  console.log(`Revoked ${user.email} (${user.displayName ?? "no name"}).`);
  console.log(`  was: status=${user.communityMembership.status} expires=${user.communityMembership.expiresAt?.toISOString() ?? "(null)"}`);
  console.log(`  now: status=CANCELLED expires=${now.toISOString()}`);
}

main()
  .then(() => prisma.$disconnect())
  .catch((err) => {
    console.error(err);
    return prisma.$disconnect().then(() => process.exit(1));
  });
