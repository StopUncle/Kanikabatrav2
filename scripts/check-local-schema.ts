import { config } from "dotenv";
import { PrismaClient } from "@prisma/client";
config();
async function main() {
  const p = new PrismaClient();
  const cols = await p.$queryRawUnsafe<Array<{ column_name: string }>>(
    `SELECT column_name FROM information_schema.columns
     WHERE table_name = 'User'
       AND column_name IN ('handle', 'profilePublic')`,
  );
  console.log("User new columns:", cols.map((c) => c.column_name));

  const tables = await p.$queryRawUnsafe<Array<{ table_name: string }>>(
    `SELECT table_name FROM information_schema.tables
     WHERE table_schema = 'public'
       AND table_name IN ('Tell', 'TellResponse', 'InstinctScore', 'TellStreak', 'Receipt')`,
  );
  console.log("Tells/Receipts tables:", tables.map((t) => t.table_name));

  await p.$disconnect();
}
main();
