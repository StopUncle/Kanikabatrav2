import { PrismaClient } from "@prisma/client";

const p = new PrismaClient();

async function main() {
  const since = new Date(Date.now() - 14 * 86400000);
  const recent = await p.communityMembership.findMany({
    where: { appliedAt: { gte: since } },
    orderBy: { appliedAt: "desc" },
    include: {
      user: {
        select: {
          email: true,
          name: true,
          displayName: true,
          gender: true,
          createdAt: true,
        },
      },
    },
  });

  console.log(`\n=== ${recent.length} application(s) in the last 14 days ===\n`);

  for (const m of recent) {
    const data = m.applicationData as Record<string, unknown> | null;
    console.log(
      `[${m.appliedAt.toISOString().slice(0, 16)}]  ${m.status.padEnd(10)} ${m.billingCycle.padEnd(8)}  ${m.user.displayName ?? m.user.name ?? "(no name)"} <${m.user.email}>  gender=${m.user.gender ?? "?"}`,
    );
    console.log(
      `   approved: ${m.approvedAt?.toISOString().slice(0, 16) ?? "—"}    activated: ${m.activatedAt?.toISOString().slice(0, 16) ?? "—"}    expires: ${m.expiresAt?.toISOString().slice(0, 16) ?? "—"}`,
    );
    console.log(`   stripe sub: ${m.paypalSubscriptionId ?? "—"}`);
    if (data && typeof data === "object") {
      const reason =
        (data.reason as string | undefined) ??
        (data.whyJoin as string | undefined) ??
        (data.why as string | undefined) ??
        "";
      const goals = (data.goals as string | undefined) ?? "";
      if (reason) console.log(`   reason: ${reason.slice(0, 160)}`);
      if (goals) console.log(`   goals : ${goals.slice(0, 160)}`);
    }
    console.log();
  }

  await p.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
