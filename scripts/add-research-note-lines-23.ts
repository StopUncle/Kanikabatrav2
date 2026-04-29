/**
 * Insert the "Lines 2-3" framework as a pinned research note so it appears in
 * /admin/content → Research Hub alongside the Stakes & Source framework.
 *
 * Run: DATABASE_URL=<prod> npx tsx scripts/add-research-note-lines-23.ts
 */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const NOTE = `LINES 2-3 — HOW RETENTION IS ACTUALLY WON

The hook gets all the discourse. Lines 2-3 are where retention is decided.

THE MODEL
Short-form retention is a series of micro-decisions. The hook opens a loop. Loops have half-lives — by second 5 the viewer's brain is recalculating whether the payoff is worth it. If line 2 doesn't re-energize the loop, they swipe. Most common failure: strong hook, weak middle.

Line 2 = re-energize the loop (extends willingness to wait)
Line 3 = close the loop with a payoff that creates secondary engagement (saves, shares, comments, follows)

LINE 2 — FOUR MECHANISMS

M1 INVALIDATE THE ASSUMED ANSWER
"Most women think the red flag is the ex question. It's not."
Use when: saturated topic the audience has heard takes on before. Pre-emptively dismisses recycled material. Credibility move.

M2 SPECIFICITY ESCALATION
"I've used it on every man I've dated since 19. It's worked every time."
Use when: payoff is genuinely strong and you fear hook undersold it. Commitment escalation. Risk: if line 3 doesn't deliver, engagement craters.

M3 PERSONAL STAKE
"I figured this out at 22, after I'd manipulated my way through three relationships..."
Use when: topic is sensitive or claim provocative. Earns the right to make the claim. Parasocial deepening — strongest predictor of follow conversion. For Kanika specifically: her real biography keeps generating credible personal stakes.

M4 THE REFRAME
"The question doesn't matter. It's about something most people don't realize is happening on every first date."
Use when: payoff is more conceptual than tactical. Promotion of perceived value — viewer came for tip, gets framework. Frameworks get saved more than tips.

LINE 3 — FOUR MECHANISMS

M1 SPECIFIC MECHANISM
Timing thresholds, behavioural cues, internal logic. Transmissible knowledge.
Triggers saves: humans save what they don't trust themselves to remember. Specific = harder to remember = more likely to save.
Triggers shares: sending to a friend feels like giving a gift.
The workhorse line 3.

M2 THE DIAGNOSTIC
"...if you answered under two seconds, you've been performing this part of yourself for so long you don't know it's a performance."
Converts viewer from observer to subject. Self-relevant content = highest engagement on every platform.
Triggers: "okay this is me," "called out," tagging friends. Strongest comment signals on IG/TikTok.

M3 PROTECTIVE INVERSION
"So if a man asks you about your mom on a first date — pay attention to what he does with it."
Two-level effect:
1) Converts predatory-coded content to protective-coded → women share warnings, not manipulation tactics
2) Gives viewer a job to do → engagement extends past the video
Algorithm protection: platforms suppress predatory-coded content. Protective inversion signals educational, not instructional.

M4 IMPLICATION THAT DEMANDS A FOLLOW
"This is one of about thirty things I do without thinking about it."
Implicit continuation loop. Self-decided action is stickier than "follow for more."
Risk: only works if grid actually delivers variations. New followers churn fast otherwise.

THE PAIRING MATRIX (operational core)

Hook type "First-person mechanism reveal" (When I do X, I'm actually doing Y)
  → L2: Personal stake (M3)
  → L3: Diagnostic (M2) OR Protective inversion (M3)

Hook type "Diagnostic correction" (Most people think X. Truth is Y.)
  → L2: Invalidate the assumed answer (M1)
  → L3: Specific mechanism (M1)

Hook type "Interior monologue" (Here's what's going through my head when...)
  → L2: Reframe (M4)
  → L3: Diagnostic (M2)

Hook type "Method exposure" (I'll teach you the exact thing I do to X)
  → L2: Specificity escalation (M2)
  → L3: Specific mechanism (M1) + Protective inversion (M3)

WHY THIS COMPOUNDS
Videos where hook + L2 + L3 are deliberately chosen to compliment each other outperform improvised middle/end by 3-5x on completion rate. Completion compounds — more reach, more data, next video pushed harder.

Most creators improvise everything after the hook. Systematizing the 30-second arc is the lever almost no one is using.

Full version: docs/content-research/lines-2-3-framework.md
Pair with: docs/content-research/stakes-and-source-framework.md`;

async function main() {
  const note = await prisma.researchNote.create({
    data: {
      content: NOTE,
      source: 'strategy-framework',
      tags: ['hook-framework', 'lines-2-3', 'retention', 'pinned'],
    },
  });
  console.log(`✓ Inserted research note: ${note.id}`);
  console.log(`  Tags: ${note.tags.join(', ')}`);
  console.log(`  Length: ${note.content.length} chars`);
  await prisma.$disconnect();
}

main().catch((e) => { console.error(e); process.exit(1); });
