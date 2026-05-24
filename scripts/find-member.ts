// One-off: find a user by partial handle/name/email match, with their
// current CommunityMembership row. Read-only. Used to identify a member
// before a manual admin action (refund + revoke).
//
// Usage:
//   DATABASE_URL=<prod> npx tsx scripts/find-member.ts <search>
//
// The search is lowercased and matched against handle, displayName,
// name, and email (substring).

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const search = process.argv[2]?.toLowerCase();
  if (!search) {
    console.error("usage: tsx scripts/find-member.ts <search>");
    process.exit(1);
  }

  const users = await prisma.user.findMany({
    where: {
      OR: [
        { handle: { contains: search, mode: "insensitive" } },
        { displayName: { contains: search, mode: "insensitive" } },
        { name: { contains: search, mode: "insensitive" } },
        { email: { contains: search, mode: "insensitive" } },
      ],
    },
    select: {
      id: true,
      email: true,
      name: true,
      displayName: true,
      handle: true,
      createdAt: true,
      communityMembership: {
        select: {
          status: true,
          activatedAt: true,
          expiresAt: true,
          cancelledAt: true,
          paypalSubscriptionId: true,
          billingCycle: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
    take: 20,
  });

  if (users.length === 0) {
    console.log(`No users matched "${search}".`);
    return;
  }

  for (const u of users) {
    console.log("─────────────────────────────────────────────");
    console.log(`id          ${u.id}`);
    console.log(`email       ${u.email}`);
    console.log(`name        ${u.name ?? "(null)"}`);
    console.log(`displayName ${u.displayName ?? "(null)"}`);
    console.log(`handle      ${u.handle ?? "(null)"}`);
    console.log(`createdAt   ${u.createdAt.toISOString()}`);
    if (u.communityMembership) {
      console.log(`membership  ${u.communityMembership.status}`);
      console.log(`activated   ${u.communityMembership.activatedAt?.toISOString() ?? "(null)"}`);
      console.log(`expires     ${u.communityMembership.expiresAt?.toISOString() ?? "(null)"}`);
      console.log(`cancelledAt ${u.communityMembership.cancelledAt?.toISOString() ?? "(null)"}`);
      console.log(`subId       ${u.communityMembership.paypalSubscriptionId ?? "(null)"}`);
      console.log(`billing     ${u.communityMembership.billingCycle}`);
    } else {
      console.log(`membership  (no row)`);
    }
  }
  console.log("─────────────────────────────────────────────");
  console.log(`${users.length} match(es).`);
}

main()
  .then(() => prisma.$disconnect())
  .catch((err) => {
    console.error(err);
    return prisma.$disconnect().then(() => process.exit(1));
  });
