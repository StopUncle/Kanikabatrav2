/**
 * Insert the "Shock & Awe" framework as a pinned research note.
 * Run: DATABASE_URL=<prod> npx tsx scripts/add-research-note-shock-and-awe.ts
 */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const NOTE = `SHOCK & AWE — THE LEGEND-BUILDING PARALLEL SYSTEM

Structured pipeline builds AUTHORITY + SAVES.
Shock-and-awe builds LEGEND + SHARES.
Both needed for the brand to operate at full strength.

WHY "MY GRANDMA HAS DIED SIX TIMES" WORKED

Four things stacked into one sentence:
1. Norm violation with specificity. Not "I lie sometimes" — "six times". Specific norm violations are unforgettable. Vague ones forgettable.
2. Casual delivery of dark content. Mismatch between dark content + matter-of-fact tone is the engine. Theatrical delivery kills it.
3. Self-implication. She's not telling you what bad people do — she's telling you what SHE does. Removes defensive distance.
4. Verifiability. Diagnosed psychopath saying it = genuine self-disclosure. Neurotypical saying it = performative dark humor. The diagnosis does the work.

Formula: specific norm violation + casual delivery + self-implication + verified source = "did she really just say that"

WHY THESE MOMENTS MATTER DISPROPORTIONATELY

Structured payoff content builds authority. Shock-and-awe builds LEGEND. The audience will remember 3-4 specific lines from a body of 50+ videos — those lines will BE Kanika to them. Everything else is texture.

Distribution mechanism: shock-and-awe lines get quoted in OTHER people's content. Reddit threads, group chats, commentary videos, Twitter screenshots. Free distribution that structured content can't generate. Nobody quotes a tactical framework — they quote a confession.

THE 5 LEVERS

LEVER 1: Confess to something most people would hide.
Categories Kanika can speak to from the inside: lying without guilt, calculated kindness, exploiting vulnerability, indifference to harm, performing emotions, finding vulnerability boring, mimicking grief or love, manipulating loved ones, treating relationships as systems, not feeling expected things. Each = a vein with 30-50 specific lines.

LEVER 2: Make it specific and scaled.
"I've lied about my grandma dying" = confession. "My grandma has died six times" = moment. The number transforms it.
"I don't really feel guilt" = generic. "I cried at my own grandfather's funeral by thinking about a sad movie" = moment.

LEVER 3: Land it casually.
Theatrical signals performance signals fakeness. Should sound like commenting on the weather. Audience does the emotional work — she doesn't.
Kanika's actual flat affect is structurally protective here. She doesn't have to fake calmness about dark content. Most creators trying this have to fake the casualness; audiences detect the fake.

LEVER 4: Don't apologize, don't explain, don't soften.
"My grandma has died six times — I know, I'm a horrible person" = dies.
"My grandma has died six times" = lands.
The line should end on the sharpest word.

LEVER 5: Self-implication only.
"Psychopaths lie to get time off work" = category claim. Weaker.
"I lie to get time off work, my grandma has died six times" = self-disclosure. Stronger.

PLACEMENT (same line does different work in different slots)

HOOK (0-3s): Generates curiosity. Loop opens itself.
TAIL (55-60s): Generates rewatches. Recontextualizes the whole video.
DEEPENING (30-45s): Generates parasocial investment. Adds dimension to tactical content.

The pipeline must specify which slot the shock-and-awe line is targeting BEFORE the line is written.

FREQUENCY

~1 in 3-4 videos contains a genuine shock-and-awe moment. Other 75% = tactical / framework / conversational.
Portfolio target: across 20 videos, 3-4 LEGENDARY lines (quotable, screenshot-worthy, brand-defining).
Goal isn't max shock per video. Goal is a small number of definitive lines across a body of work.

THE RISK — SHOCK-AND-AWE vs EDGELORD

Shock-and-awe = honest disclosure that violates norms.
Edgelord = performed transgression for its own sake.
Audiences detect the difference. Once read as edgelord, entire body of work becomes suspect.

SAFEGUARD: every line must be TRUE. Not embellished. Actually something she's done or thinks. Fabricated material erodes the brand over time.
Diagnosis is structurally protective: she has access to genuine internal experience that violates norms. The bank can be built entirely on real disclosure.

SYSTEMATIZE GENERATION

Step 1: Map confession categories (the 10 named above + custom)
Step 2: For each, find specific scaled instance (recall, not invention — recalled specificity has the texture of real memory)
Step 3: Strip the softening (line ends on sharpest word)
Step 4: Tag for placement (HOOK / TAIL / DEEPENING)
Step 5: Tier (STANDARD / STRONG / LEGENDARY)

PIPELINE INTEGRATION

The /admin/content → Confessions tab is the bank.
- Group by category
- Tier each line
- Tag placement suggestion
- Track usage count + last-used (don't burn the same legendary line twice in 6 months)
- Pull from the bank when scripting — don't generate on the fly during a shoot

Once the bank has 8-12 categories with 5-10 instances each = a year's worth of legend-building material.

Full version: docs/content-research/shock-and-awe-framework.md`;

async function main() {
  const note = await prisma.researchNote.create({
    data: {
      content: NOTE,
      source: 'strategy-framework',
      tags: ['hook-framework', 'shock-and-awe', 'legend-building', 'pinned'],
    },
  });
  console.log(`✓ Inserted research note: ${note.id}`);
  console.log(`  Length: ${note.content.length} chars`);
  await prisma.$disconnect();
}

main().catch((e) => { console.error(e); process.exit(1); });
