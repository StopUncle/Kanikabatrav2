/**
 * Fixture accounts: the states real people are actually in.
 *
 * Every screen in this app has only ever been looked at as `dev-admin`, which
 * is an ACTIVE member with full progress and everything unlocked. That is the
 * rarest state any real person will ever occupy, and it is the only one we
 * ever see. Zero-states in particular have never been looked at by anyone,
 * and with a free tier arriving, empty is about to become the first thing
 * most new people see.
 *
 * So: six accounts, each frozen in a state worth designing for.
 *
 *   npx tsx scripts/fixtures.ts list
 *   npx tsx scripts/fixtures.ts up          # create or reset all of them
 *   npx tsx scripts/fixtures.ts up day1     # just one
 *   npx tsx scripts/fixtures.ts down        # remove them all
 *
 * LOCAL ONLY. The script refuses to run against a non-local database, because
 * a fixture account on production is a real account that Kanika would have to
 * explain. Log in with the email below and the shared password.
 */

import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

/** Every fixture email ends with this, which is also how `down` finds them. */
const DOMAIN = "@fixture.local";
const PASSWORD = "fixture-1234";

type Persona = {
  key: string;
  name: string;
  /** What this account is for. Printed by `list`. */
  purpose: string;
  build: (userId: string) => Promise<void>;
};

const day = (n: number) => new Date(Date.now() - n * 24 * 60 * 60 * 1000);

async function setMembership(
  userId: string,
  status: "ACTIVE" | "EXPIRED" | "CANCELLED" | "SUSPENDED",
  opts: { billingCycle?: string; expiresAt?: Date | null; activatedAt?: Date } = {},
) {
  const data = {
    status,
    billingCycle: opts.billingCycle ?? "monthly",
    expiresAt: opts.expiresAt ?? null,
    // Real memberships get this stamped by the Stripe webhook, and the 12
    // Week program counts from it: a null here makes every member persona
    // look like they never started. Default to the persona's age.
    activatedAt: opts.activatedAt ?? new Date(),
  };
  await prisma.communityMembership.upsert({
    where: { userId },
    create: { userId, ...data },
    update: data,
  });
}

const PERSONAS: Persona[] = [
  {
    key: "anon",
    name: "Ana Free",
    purpose:
      "Signed up seconds ago, no membership, nothing done. The zero-state of every screen, and the state the surge will arrive in.",
    build: async (userId) => {
      await prisma.user.update({
        where: { id: userId },
        data: { createdAt: new Date(), lastSeenAt: new Date(), standing: 0, ringLevel: 4 },
      });
    },
  },
  {
    key: "day1",
    name: "Dana Day-One",
    purpose:
      "Paid yesterday, played one scenario. First-run states with just enough data to not be empty, which is where layouts usually break.",
    build: async (userId) => {
      await setMembership(userId, "ACTIVE", { activatedAt: day(1) });
      await prisma.user.update({
        where: { id: userId },
        data: { createdAt: day(1), lastSeenAt: new Date(), standing: 40, ringLevel: 4, initiationAt: day(1) },
      });
      await prisma.simulatorProgress.create({
        data: { userId, scenarioId: "mission-1-1", currentSceneId: "done", completedAt: day(1), outcome: "good", xpEarned: 100 },
      });
    },
  },
  {
    key: "day30",
    name: "Mara Month-In",
    purpose:
      "A month in, mid-climb, Analyst rank, a live streak. The state most paying members are actually in.",
    build: async (userId) => {
      await setMembership(userId, "ACTIVE", { activatedAt: day(30) });
      await prisma.user.update({
        where: { id: userId },
        data: { createdAt: day(30), lastSeenAt: new Date(), standing: 900, ringLevel: 3, initiationAt: day(30) },
      });
      const done = ["mission-1-1", "mission-1-2", "mission-2-1", "mission-2-2"];
      for (let i = 0; i < done.length; i++) {
        await prisma.simulatorProgress.create({
          data: { userId, scenarioId: done[i], currentSceneId: "done", completedAt: day(28 - i * 5), outcome: "good", xpEarned: 120 },
        });
      }
      await prisma.simulatorProgress.create({
        data: { userId, scenarioId: "mission-3-1", currentSceneId: "jordan-text", xpEarned: 20 },
      });
    },
  },
  {
    key: "dormant",
    name: "Dot Dormant",
    purpose:
      "Paying and gone 45 days. The single largest real cohort, and the one the winback cron targets. Nobody has ever looked at what she comes back to.",
    build: async (userId) => {
      await setMembership(userId, "ACTIVE", { activatedAt: day(120) });
      await prisma.user.update({
        where: { id: userId },
        data: { createdAt: day(120), lastSeenAt: day(45), standing: 300, ringLevel: 3, initiationAt: day(120) },
      });
      await prisma.simulatorProgress.create({
        data: { userId, scenarioId: "mission-1-1", currentSceneId: "done", completedAt: day(100), outcome: "good", xpEarned: 100 },
      });
    },
  },
  {
    key: "lapsed",
    name: "Elle Expired",
    purpose:
      "Membership ended, account intact. Under the free tier this is a free user with history, which is a state that has never existed before.",
    build: async (userId) => {
      await setMembership(userId, "EXPIRED", { expiresAt: day(10), activatedAt: day(200) });
      await prisma.user.update({
        where: { id: userId },
        data: { createdAt: day(200), lastSeenAt: day(11), standing: 620, ringLevel: 3, initiationAt: day(200) },
      });
    },
  },
  {
    key: "suspended",
    name: "Sasha Suspended",
    purpose:
      "Card failed, membership suspended, Stripe subscription still in dunning. The account the portal recovery path exists for.",
    build: async (userId) => {
      const data = {
        status: "SUSPENDED" as const,
        billingCycle: "monthly",
        expiresAt: day(-20),
        suspendReason: "payment-failed",
        paypalSubscriptionId: `ST-fixture-${userId.slice(0, 8)}`,
      };
      await prisma.communityMembership.upsert({
        where: { userId },
        create: { userId, ...data },
        update: data,
      });
      await prisma.user.update({
        where: { id: userId },
        data: { createdAt: day(90), lastSeenAt: day(2), standing: 480, ringLevel: 3, initiationAt: day(90) },
      });
    },
  },
  {
    key: "power",
    name: "Vera Veteran",
    purpose:
      "Profiler rank, long streak, deep into the climb. Catches the opposite failure: layouts that only break when the numbers get big.",
    build: async (userId) => {
      await setMembership(userId, "ACTIVE", { billingCycle: "annual", activatedAt: day(300) });
      await prisma.user.update({
        where: { id: userId },
        data: { createdAt: day(300), lastSeenAt: new Date(), standing: 4200, ringLevel: 2, initiationAt: day(300) },
      });
      const ids = ["mission-1-1", "mission-1-2", "mission-2-1", "mission-2-2", "mission-3-1", "mission-3-2", "mission-4-1", "mission-4-2"];
      for (let i = 0; i < ids.length; i++) {
        await prisma.simulatorProgress.create({
          data: { userId, scenarioId: ids[i], currentSceneId: "done", completedAt: day(60 - i * 3), outcome: "good", xpEarned: 150 },
        });
      }
    },
  },
];

function assertLocalDatabase() {
  const url = process.env.DATABASE_URL ?? "";
  let host = "";
  try {
    host = new URL(url).hostname;
  } catch {
    throw new Error("DATABASE_URL is unset or unparseable. Refusing to run.");
  }
  if (host !== "localhost" && host !== "127.0.0.1") {
    throw new Error(
      `Refusing to run against ${host}. Fixtures are local only: on production these are real accounts someone would have to explain.`,
    );
  }
}

async function up(only?: string) {
  const chosen = only ? PERSONAS.filter((p) => p.key === only) : PERSONAS;
  if (chosen.length === 0) throw new Error(`No persona called "${only}".`);
  const passwordHash = await bcrypt.hash(PASSWORD, 10);

  for (const persona of chosen) {
    const email = `${persona.key}${DOMAIN}`;
    // Reset rather than accumulate: a fixture that drifts is worse than none.
    await prisma.user.deleteMany({ where: { email } });
    const user = await prisma.user.create({
      data: { email, name: persona.name, password: passwordHash },
      select: { id: true },
    });
    await persona.build(user.id);
    console.log(`  ${email.padEnd(22)} ${persona.name}`);
  }
}

async function down() {
  const gone = await prisma.user.deleteMany({
    where: { email: { endsWith: DOMAIN } },
  });
  console.log(`removed ${gone.count} fixture accounts`);
}

async function main() {
  const [cmd, arg] = process.argv.slice(2);

  if (cmd === "list") {
    for (const p of PERSONAS) {
      console.log(`\n${p.key}${DOMAIN}\n  ${p.name}: ${p.purpose}`);
    }
    console.log(`\npassword for all: ${PASSWORD}`);
    return;
  }

  assertLocalDatabase();

  if (cmd === "down") return down();
  if (cmd === "up") {
    console.log("fixtures:");
    await up(arg);
    console.log(`\npassword for all: ${PASSWORD}`);
    return;
  }

  console.log("usage: npx tsx scripts/fixtures.ts <list|up [key]|down>");
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (err) => {
    console.error(err instanceof Error ? err.message : err);
    await prisma.$disconnect();
    process.exit(1);
  });
