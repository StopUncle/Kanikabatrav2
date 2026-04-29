/**
 * Insert the "Middle-End Architecture" framework as a pinned research note.
 * Run: DATABASE_URL=<prod> npx tsx scripts/add-research-note-middle-end.ts
 */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const NOTE = `MIDDLE-END ARCHITECTURE — THE FULL 60-SECOND TEMPLATE

The 3-line model was compressed. A real 45-60s video has 7 beats:

0-3s    HOOK         open the loop
3-8s    RE-ENERGIZE  extend willingness to wait (line 2)
8-15s   SETUP        orient the viewer to the framework
15-30s  PAYOFF       deliver the promised insight
30-45s  DEEPENING    the part most creators skip
45-55s  CLOSE        trigger secondary action
55-60s  TAIL         optional rewatch trigger

The middle-end (deepening + close + tail) is where videos go from "good watch" to "saved, shared, followed."

DEEPENING — 4 MOVES (30-45s)

D1 SECOND EXAMPLE
"That's the mom question. I have another one I use later — when conversation has settled."
Proves the framework is generative, not a one-off. Systems get saved more than insights. Pattern recognition makes viewer co-construct the framework — and content they've co-constructed is content they share.

D2 OBJECTION HANDLE
"You might be thinking — okay but that's just timing. The thing I'm reading is timing + where the eyes go."
Signals respect for viewer intelligence. Differentially appealing to your sophisticated segment (commenters/sharers/followers). Adds depth without breadth.

D3 PERSONAL DISCLOSURE
"Honestly, the reason I'm so good at this is I've spent my life rehearsing my own answers. Every conversation is partly a performance."
Parasocial deepening at scale. Shifts viewer from "I learned something" to "I know her now." Following = relationship decision, not content decision.
For Kanika: her interior experience is genuinely inaccessible to almost anyone. Disclosure is structurally rare and structurally valuable.
RISK: overuse devalues. ~1 in 4-5 videos.

D4 ESCALATION
"The mom question isn't special. Every conversation I have is structured this way. I'm running ten of these tests in the first 20 minutes — disguised as normal conversation."
Revealed incompleteness. Reframes the video as one piece of a larger puzzle. Drives traffic to your broader work.

CLOSE — 4 MOVES TARGETING SPECIFIC SECONDARY ACTIONS (45-55s)

C1 FOR SAVES — FRAMEWORK SUMMARY
"So the three signals: under 2s = rehearsed, over 5s = buried damage, 3-4s with a laugh = self-aware."
Summaries make content retrievable. Viewer can come back, fast-forward to close, re-extract the framework.

C2 FOR SHARES — PROTECTIVE HANDOFF
"If the man you're seeing has been unusually curious about your relationship with your parents — pay attention to what he does with the answer."
Shares a warning, not advice. Sharing a warning is socially safe and flattering. Shared at much higher rates than informational content.

C3 FOR COMMENTS — DIAGNOSTIC QUESTION
"How long would it take you to answer? Tell me in the comments."
Specific, low-friction thing to say. Self-disclosure comments create comment threads (viewers reply to each other). Algorithm reads inter-comment replies as high-engagement.
50 comments where viewers reply to each other > 200 comments all replying to creator.

C4 FOR FOLLOWS — IMPLIED CATALOGUE
"This is one of about thirty things I do on a first date. I've been working through them, one video at a time."
Positions the video as part of an unfolding series. Viewer follows so they don't miss the rest.
Couples mention humanizes the creator. Stable relationship = non-exploitative reason for the public disclosure.

TAIL — THE REWATCH TRIGGER (55-60s, optional)

A single line that recontextualizes everything before it. Creates "I had to watch it again" comments.

Examples:
- "Even after you know it, you'll still answer the same way. You can't fake the timing. That's why it works."
- "By the way — I asked my fiancé this question on our first date. He took six seconds. That's why I married him."

Mechanism: late recontextualization. Viewer built a mental model over 55s. Tail breaks it, forces a rebuild. Rebuilding requires another watch — or a comment to process out loud. Rewatches are the strongest possible engagement signal on TikTok and Instagram.

USE WHEN: you have a genuine second-order observation. DON'T fabricate — forced tails feel like gimmicks.

HOW IT COMPOUNDS

Strong hook + weak middle = watched not finished.
Strong hook + middle + weak close = finished not engaged.
Strong hook + middle + close, no tail = performs well, doesn't break out.
All four = goes viral.

LONG vs SHORT FORMAT

This whole architecture assumes 45-60s. Short format (15-25s) is different:
0-2s hook → 2-18s payoff → 18-25s tail.
Most of Kanika's content lives in 45-60s — depth doesn't compress. Some content (one-liners, single book quotes, scene reactions) belongs in short.

Full version: docs/content-research/middle-end-architecture.md
The pipeline (/admin/content → Develop tab) walks each beat with its menu.`;

async function main() {
  const note = await prisma.researchNote.create({
    data: {
      content: NOTE,
      source: 'strategy-framework',
      tags: ['hook-framework', 'middle-end', 'full-architecture', 'pinned'],
    },
  });
  console.log(`✓ Inserted research note: ${note.id}`);
  console.log(`  Tags: ${note.tags.join(', ')}`);
  console.log(`  Length: ${note.content.length} chars`);
  await prisma.$disconnect();
}

main().catch((e) => { console.error(e); process.exit(1); });
