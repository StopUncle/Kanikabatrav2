/**
 * One-shot: insert the "Stakes & Source" hook framework as a pinned research
 * note so it shows up in /admin/content → Research Hub for every content session.
 *
 * Run: DATABASE_URL=<prod> npx tsx scripts/add-research-note-stakes-source.ts
 */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const NOTE = `STAKES & SOURCE — HOOK FRAMEWORK (the structural advantage)

Stakes = why should I trust the payoff will be worth my attention?
Specificity opens the loop ("there's a thing"). Stakes determine whether the viewer believes the payoff will be real.

Two hooks, same loop:
- "The one question psychopaths ask on a first date"
- "The one question I ask on a first date to figure out if I can manipulate someone — I'm a diagnosed psychopath"
The second has stakes because the source IS the subject. The viewer isn't getting interpretation — they're getting the actual internal experience.

WHY THIS IS RARE
Most dark-psychology creators are therapists, survivors, or coaches interpreting from outside. They're always one degree removed. Kanika is the primary source. Clinical confirmation + third-party media verification means the claim isn't a personal-brand statement — it's a documented fact. That collapses the audience's "is this person LARPing" skepticism in the first frame.

HOW TO APPLY
Front-load the source. Most creators bury credentials at the end ("...I've studied this for 10 years"). Hers go in the first beat because they reframe everything that follows.

HOOK PROGRESSION
- Weak: "Here's how psychopaths pick their targets."
- Better: "I'm a diagnosed psychopath. Here's how I pick who I talk to at a party."
- Strongest: "I'm a diagnosed psychopath. When I walk into a room, I'm scanning for one specific thing — and once I find it, that person is who I'll talk to all night."
The third has loop + stakes + self-relevance (viewer might be the person she'd pick).

TEMPLATES (these don't work for almost anyone else)

1. FIRST-PERSON MECHANISM
   "When I [normal social situation], I'm actually [internal psychopath-specific process]."
   Example: "When I compliment a woman's outfit, I'm actually testing how she reacts to female attention — it tells me everything about her relationship with her father."

2. DIAGNOSTIC REVEAL
   "Most people think psychopaths [common belief]. The actual thing is [counterintuitive truth from inside]."
   Positions her as authority by correcting the record.

3. INTERIOR MONOLOGUE
   "Here's what's actually going through my head when [situation viewer has been in]."
   Viewer recognizes the situation, gets the alien interior. The gap IS the reason they watch to the end.

4. METHOD EXPOSURE
   "I'll teach you the exact thing I do to [outcome]."
   Other creators describe psychopath behavior. She transmits it. Categorically different value prop.

THE ETHICAL FRAME THAT PROTECTS REACH
Risk: being read as "psychopath teaches manipulation" — platforms suppress, audiences resist sharing.
Inversion: "diagnosed psychopath teaches you to recognize what people like me are doing."
Same content, same loop, same specificity. But viewer is now the protagonist, not the target. Shareable to female friends as a warning, not embarrassing to share as manipulation tactics.

EXAMPLE TRANSFORMATION
Predatory: "I'm a diagnosed psychopath. Here's the question I ask on a first date to figure out if I can manipulate someone."
Protective (scales): "I'm a diagnosed psychopath. Here's the question I ask on a first date — so you know what to look for when someone like me asks you."

CHECKLIST FOR EVERY HOOK
[ ] First beat establishes Kanika as source (diagnosed psychopath, not psychology educator)
[ ] Specific named thing the viewer needs to know (not vague tease)
[ ] Viewer is protagonist (protecting themselves) — not target
[ ] Would viewer screenshot/share this to a friend as a warning?
[ ] Stakes front-loaded, not buried

If any answer is no — rewrite the first beat.

Full version: docs/content-research/stakes-and-source-framework.md`;

async function main() {
  const note = await prisma.researchNote.create({
    data: {
      content: NOTE,
      source: 'strategy-framework',
      tags: ['hook-framework', 'stakes', 'source-authority', 'pinned'],
    },
  });
  console.log(`✓ Inserted research note: ${note.id}`);
  console.log(`  Tags: ${note.tags.join(', ')}`);
  console.log(`  Length: ${note.content.length} chars`);
  console.log(`\nNow visible at /admin/content → Research Hub tab.`);
  await prisma.$disconnect();
}

main().catch((e) => { console.error(e); process.exit(1); });
