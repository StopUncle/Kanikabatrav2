/**
 * Quick read-only verification that the Tells migration + seed landed.
 * Lists every Tell row with track, status, schedule date, slug.
 *
 * Run: DATABASE_URL=<prod-url> npx tsx scripts/verify-tells.ts
 */

import { config } from "dotenv";
import { PrismaClient } from "@prisma/client";

config();

async function main() {
  const p = new PrismaClient();
  const all = await p.tell.findMany({
    orderBy: { number: "asc" },
    select: {
      number: true,
      slug: true,
      track: true,
      status: true,
      scheduleDate: true,
    },
  });
  console.log(`Total Tells: ${all.length}`);
  for (const t of all) {
    console.log(
      `  #${String(t.number).padStart(3, "0")} ${t.track.padEnd(12)} ${t.status.padEnd(10)} ${t.scheduleDate
        ?.toISOString()
        .slice(0, 10)} ${t.slug}`,
    );
  }
  await p.$disconnect();
}

main().catch((e) => {
  console.error("Fatal:", e);
  process.exit(1);
});
