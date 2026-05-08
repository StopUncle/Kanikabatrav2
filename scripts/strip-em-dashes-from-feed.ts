/**
 * One-shot script to strip em-dashes (and en-dashes / &mdash; entities) out
 * of every Consilium feed surface that the cron pulls from or has already
 * created.
 *
 * Why: source TS files were authored with em-dashes, seeded to prod
 * (DailyInsight, DiscussionPrompt rows on 2026-04-24), and the cron has
 * been creating FeedPost rows from that seed data ever since. Em-dashes
 * read as "AI tell" so the user wants them gone from member-visible
 * content. Source files are now clean; this script catches up the DB.
 *
 * Tables touched:
 *   - DailyInsight.content                     (cron source pool)
 *   - DiscussionPrompt.title + content         (cron source pool)
 *   - FeedPost.title + content                 (already-fired posts)
 *
 * Replacement order matters: longest matches first so we don't double-
 * count a space-padded em-dash as a bare one.
 *
 * Run against prod:
 *   railway link --project f5ad660c-3afc-4ccd-b8b3-23f4dc47d190 \
 *     --environment production --service Postgres-Bzm4
 *   railway variables --kv | grep "^DATABASE_PUBLIC_URL="
 *   DATABASE_URL="<that-value>" npx tsx scripts/strip-em-dashes-from-feed.ts
 *
 * Idempotent: running twice does nothing on the second pass (no em-dashes
 * left to replace). Wrapped in a transaction so a partial failure rolls
 * back. Reports per-table affected-row counts so you can sanity-check.
 */

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Ordered most-specific to least-specific. Earlier replacements consume
// the spaces, so bare-dash rules at the bottom fire only on residue.
const REPLACEMENTS: Array<{ from: string; to: string }> = [
  { from: " — ", to: ", " },
  { from: " —", to: "," },
  { from: "— ", to: ", " },
  { from: "—", to: "," },
  { from: " – ", to: ", " },
  { from: " –", to: "," },
  { from: "– ", to: ", " },
  { from: "–", to: "," },
  { from: "&mdash;", to: "," },
  { from: "&ndash;", to: "," },
];

/**
 * Build a chained REPLACE() expression for a column.
 * Postgres REPLACE is left-associative so the deepest call runs first;
 * we therefore reverse the rule order so most-specific matches fire
 * before less-specific residue rules.
 */
function buildReplaceExpr(column: string): string {
  let expr = column;
  for (const { from, to } of REPLACEMENTS) {
    // Single-quotes inside Postgres string literals are escaped by doubling.
    const safeFrom = from.replace(/'/g, "''");
    const safeTo = to.replace(/'/g, "''");
    expr = `REPLACE(${expr}, '${safeFrom}', '${safeTo}')`;
  }
  return expr;
}

function containsAnyDash(text: string): boolean {
  return REPLACEMENTS.some((r) => text.includes(r.from));
}

async function main() {
  console.log("Stripping em-dashes / en-dashes / &mdash; from feed content...\n");

  await prisma.$transaction(async (tx) => {
    // 1. DailyInsight
    const dailyBefore = await tx.dailyInsight.findMany({
      select: { id: true, content: true },
    });
    const dailyToFix = dailyBefore.filter((r) => containsAnyDash(r.content));
    if (dailyToFix.length === 0) {
      console.log("DailyInsight: 0 rows need cleaning");
    } else {
      const replaceExpr = buildReplaceExpr('"content"');
      const result = await tx.$executeRawUnsafe(
        `UPDATE "DailyInsight" SET "content" = ${replaceExpr}`,
      );
      console.log(
        `DailyInsight: ${result} rows updated (${dailyToFix.length} contained em/en-dashes)`,
      );
    }

    // 2. DiscussionPrompt — title AND content
    const promptBefore = await tx.discussionPrompt.findMany({
      select: { id: true, title: true, content: true },
    });
    const promptToFix = promptBefore.filter(
      (r) => containsAnyDash(r.title) || containsAnyDash(r.content),
    );
    if (promptToFix.length === 0) {
      console.log("DiscussionPrompt: 0 rows need cleaning");
    } else {
      const titleExpr = buildReplaceExpr('"title"');
      const contentExpr = buildReplaceExpr('"content"');
      const result = await tx.$executeRawUnsafe(
        `UPDATE "DiscussionPrompt" SET "title" = ${titleExpr}, "content" = ${contentExpr}`,
      );
      console.log(
        `DiscussionPrompt: ${result} rows updated (${promptToFix.length} contained em/en-dashes)`,
      );
    }

    // 3. FeedPost — only the cron-fed types so we don't accidentally
    //    rewrite Kanika's hand-authored posts where em-dashes might be
    //    deliberate (signature lines, etc.). AUTOMATED + DISCUSSION_PROMPT
    //    cover the cron output; ANNOUNCEMENT covers launch-day seed posts
    //    that were also authored with em-dashes.
    const feedTypes = ["AUTOMATED", "DISCUSSION_PROMPT", "ANNOUNCEMENT"];
    const feedBefore = await tx.feedPost.findMany({
      where: { type: { in: feedTypes as never } },
      select: { id: true, title: true, content: true },
    });
    const feedToFix = feedBefore.filter(
      (r) => containsAnyDash(r.title) || containsAnyDash(r.content),
    );
    if (feedToFix.length === 0) {
      console.log("FeedPost (cron + announcement types): 0 rows need cleaning");
    } else {
      const titleExpr = buildReplaceExpr('"title"');
      const contentExpr = buildReplaceExpr('"content"');
      const inList = feedTypes.map((t) => `'${t}'`).join(", ");
      const result = await tx.$executeRawUnsafe(
        `UPDATE "FeedPost" SET "title" = ${titleExpr}, "content" = ${contentExpr} WHERE "type" IN (${inList})`,
      );
      console.log(
        `FeedPost: ${result} rows updated (${feedToFix.length} contained em/en-dashes)`,
      );
    }
  });

  console.log("\nDone. Run a second time to confirm idempotency (should report 0/0/0).");
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (err) => {
    console.error("Failed:", err);
    await prisma.$disconnect();
    process.exit(1);
  });
