import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import crypto from "node:crypto";
import { BOT_PERSONAS } from "../lib/bots/personas";

const prisma = new PrismaClient();

const ACTIVATION_SPREAD_DAYS = 180;

function randomPastDate(maxDaysAgo: number): Date {
  const ms = Math.floor(Math.random() * maxDaysAgo * 24 * 60 * 60 * 1000);
  return new Date(Date.now() - ms);
}

async function main() {
  console.log(`Seeding ${BOT_PERSONAS.length} bot users…`);

  for (const persona of BOT_PERSONAS) {
    const email = `${persona.slug}-bot@consilium.local`;
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      console.log(`  ✓ ${persona.slug} already exists`);
      continue;
    }

    const password = await bcrypt.hash(crypto.randomBytes(48).toString("hex"), 10);
    const createdAt = randomPastDate(ACTIVATION_SPREAD_DAYS);
    const points = 50 + Math.floor(Math.random() * 400);
    const level = 1 + Math.floor(points / 100);

    // The schema's Gender enum is MALE | FEMALE only; NON_BINARY personas
    // store null on the User row but keep their NON_BINARY identity in the
    // persona card for the LLM prompt.
    const userGender =
      persona.gender === "NON_BINARY" ? null : persona.gender;

    const user = await prisma.user.create({
      data: {
        email,
        password,
        name: persona.displayName,
        displayName: persona.displayName,
        gender: userGender,
        role: "MEMBER",
        isBot: true,
        botActive: true,
        createdAt,
        points,
        level,
      },
    });

    await prisma.communityMembership.create({
      data: {
        userId: user.id,
        status: "ACTIVE",
        activatedAt: createdAt,
        approvedAt: createdAt,
        expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
        billingCycle: "monthly",
      },
    });

    console.log(`  + ${persona.slug} (${persona.displayName}) created`);
  }

  console.log("Done.");
  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
