/**
 * Seed the PactWeek challenge library. Idempotent: rows upsert on
 * (preset, cycleWeek), copy edits re-run safely, and isPublished is only
 * set on create (false), never touched on update, so re-seeding after
 * launch cannot unpublish a live week.
 *
 * Cycle one only for now: weeks 1 to 4 of each preset, intensity ramping
 * 1 to 4. The arc follows docs/TRANSFORMATION-36-WEEK.md Act I; the three
 * presets are the same beat through three different doors. Voice pass by
 * Kanika before any row is published.
 *
 * Run: npx tsx scripts/seed-pact-weeks.ts
 * Publish (after voice pass): npx tsx scripts/seed-pact-weeks.ts --publish
 */

import { prisma } from "../lib/prisma";

interface WeekSeed {
  preset: string;
  cycleWeek: number;
  intensity: number;
  title: string;
  challenge: string;
  journalPrompt: string;
  /** Required reading: assigned, never enforced. */
  readingLabel: string;
  /** Why the reading matters, in Kanika's voice. */
  readingWhy: string;
}

const WEEKS: WeekSeed[] = [
  /* ------------------------------------------------------- confidence */
  {
    preset: "confidence",
    cycleWeek: 1,
    intensity: 1,
    title: "Be the stillest person in the room.",
    challenge:
      "In every conversation this week, be the one who moves less. No fidgeting, no filler nodding, no reaching for your phone in the pause. Take one full beat of silence before every answer. Nobody will know you are doing anything. Everybody will feel it.",
    journalPrompt:
      "Who treated you differently by the end of the week, and what exactly did they do?",
    readingLabel: "Ch. 1: The Doctrine of Cold, first half",
    readingWhy:
      "Read it before the challenge. You will stop wondering why the quiet one runs the room.",
  },
  {
    preset: "confidence",
    cycleWeek: 2,
    intensity: 2,
    title: "Hold the gaze.",
    challenge:
      "Three times this week, with three different people, hold eye contact one beat past the moment it gets comfortable to look away. Do not glare. Do not perform. Just decline to be the first to break. The beat after comfortable is where the entire game is played.",
    journalPrompt:
      "What did each of them do in that extra beat? Write all three.",
    readingLabel: "Ch. 1: The Doctrine of Cold, finish it",
    readingWhy:
      "The gaze drill is in there, in my words. I learned it in a mirror so you could learn it on live faces.",
  },
  {
    preset: "confidence",
    cycleWeek: 3,
    intensity: 3,
    title: "Own the threshold.",
    challenge:
      "Every room you enter this week: stop at the threshold for one breath, scan the room once, then walk to where you are going without checking a single face for permission. And in at least one meeting or gathering, speak within the first two minutes. Not the best line. Just the first.",
    journalPrompt:
      "Which room was hardest to enter that way, and what were you afraid would happen that did not?",
    readingLabel: "Ch. 4: The Transformation Protocol, first half",
    readingWhy:
      "You move like prey or you move like me. Read the difference before the threshold shows it to you.",
  },
  {
    preset: "confidence",
    cycleWeek: 4,
    intensity: 4,
    title: "The first seven seconds.",
    challenge:
      "People decide who you are in seven seconds, then spend the rest of the conversation confirming it. This week, run the audit: one deliberate upgrade to how you look, worn every day, explained to nobody. Then walk into one situation that matters and let the entrance you built in weeks one to three do the talking before you say a word.",
    journalPrompt:
      "What did you upgrade, who noticed without being told, and what did the seven seconds buy you?",
    readingLabel: "Ch. 4: The Transformation Protocol, finish it",
    readingWhy:
      "Seven seconds is all anyone gives you. The chapter is how you spend them on purpose.",
  },

  /* ----------------------------------------------------- fear-anxiety */
  {
    preset: "fear-anxiety",
    cycleWeek: 1,
    intensity: 1,
    title: "Stay five more minutes.",
    challenge:
      "Pick the situation you usually escape early: the gathering, the call, the crowded place, the conversation. Go, and when the urge to leave arrives, stay exactly five more minutes, on the clock. Then you may go. You are not proving you can stay forever. You are proving the urge is not in charge.",
    journalPrompt:
      "What did the urge tell you would happen in those five minutes, and what actually happened?",
    readingLabel: "Ch. 1: The Doctrine of Cold, first half",
    readingWhy:
      "My alarm system is quieter than yours. Read what that feels like, then borrow it for five minutes.",
  },
  {
    preset: "fear-anxiety",
    cycleWeek: 2,
    intensity: 2,
    title: "Look it in the eye.",
    challenge:
      "Once this week, hold eye contact with a person who intimidates you until they look away first. The boss, the loud one in the group, anyone your body has decided outranks you. Say nothing special. Just do not be the one who breaks.",
    journalPrompt:
      "Where did you feel it in your body before, and where did it go after?",
    readingLabel: "Ch. 1: The Doctrine of Cold, finish it",
    readingWhy:
      "Your body broadcasts fear before you say a word. The chapter teaches you to end the broadcast.",
  },
  {
    preset: "fear-anxiety",
    cycleWeek: 3,
    intensity: 3,
    title: "Enter on schedule.",
    challenge:
      "The place you have been avoiding: the gym floor, the meeting, the venue, the room. Choose the day and the hour now, write them in the journal, and enter that place at that time. Fear negotiates hardest in the hour before, and it is not allowed to move the appointment.",
    journalPrompt:
      "What did the hour before feel like compared to the first two minutes inside?",
    readingLabel: "Ch. 4: The Transformation Protocol, first half",
    readingWhy:
      "Anxiety hates analysis. Read the reframe before you walk in, then use it inside.",
  },
  {
    preset: "fear-anxiety",
    cycleWeek: 4,
    intensity: 4,
    title: "The thing you keep rescheduling.",
    challenge:
      "There is a task you have moved at least three times: the appointment, the application, the message, the ask. This week it happens. Book it on a specific day and do it. Anxiety's favourite trick is calling postponement planning. Take the trick away.",
    journalPrompt:
      "How many times had you moved it, and what did doing it actually cost, measured honestly?",
    readingLabel: "Ch. 4: The Transformation Protocol, finish it",
    readingWhy:
      "Weakness is a choice is not an insult. It is the exit. Read it like one.",
  },

  /* ---------------------------------------------------- relationships */
  {
    preset: "relationships",
    cycleWeek: 1,
    intensity: 1,
    title: "Kill the cushion.",
    challenge:
      "This week, when you say a thing, let it stand. No sorry, that came out wrong. No does that make sense. No paragraph after the sentence. Say it, hold one full beat of silence, and let them respond to what you actually said instead of the softened remix.",
    journalPrompt:
      "Which sentence was hardest to leave alone, and how did they take it compared to how you feared?",
    readingLabel: "Ch. 1: The Doctrine of Cold, first half",
    readingWhy:
      "The pause you keep filling is where your power leaks. The chapter shows you what silence buys.",
  },
  {
    preset: "relationships",
    cycleWeek: 2,
    intensity: 2,
    title: "The unpadded no.",
    challenge:
      "Say no once this week with no reason attached. No, I can't make it. Full stop. Not a lie, not an excuse, not a three-line apology with your childhood in it. The person who needs a paragraph from you is exactly the person who should get the full stop.",
    journalPrompt:
      "Who did you say it to, what did you want to add, and what happened when you did not?",
    readingLabel: "Ch. 1: The Doctrine of Cold, finish it",
    readingWhy:
      "Authority is a vocal pattern before it is a personality. Learn the pattern, then say no in it.",
  },
  {
    preset: "relationships",
    cycleWeek: 3,
    intensity: 3,
    title: "State the preference.",
    challenge:
      "Three times this week, say what you want as a statement, not a question. I want the corner table. I would rather stay in. I want to leave by ten. No question mark, no if that's okay. People cannot respect preferences you keep disguising as polls.",
    journalPrompt:
      "Write the three statements. Which one felt least like you, and whose voice does the question mark usually belong to?",
    readingLabel: "Ch. 4: The Transformation Protocol, first half",
    readingWhy:
      "You are the prize. Read it until the sentence stops feeling like a costume.",
  },
  {
    preset: "relationships",
    cycleWeek: 4,
    intensity: 4,
    title: "The postponed conversation.",
    challenge:
      "You know which one. The conversation you have been drafting in the shower for weeks. This week you have it: one sentence prepared, said early, plainly, and then silence while they respond. Not the fight, not the essay. The sentence.",
    journalPrompt:
      "Write the sentence you actually said, and the difference between the conversation you rehearsed and the one that happened.",
    readingLabel: "Ch. 4: The Transformation Protocol, finish it",
    readingWhy:
      "The shutdown technique is on those pages, and this week you will need it.",
  },
];

async function main() {
  const publish = process.argv.includes("--publish");
  let created = 0;
  let updated = 0;
  for (const w of WEEKS) {
    const existing = await prisma.pactWeek.findUnique({
      where: {
        preset_cycleWeek: { preset: w.preset, cycleWeek: w.cycleWeek },
      },
      select: { id: true },
    });
    // publishedAt drives the retro-scar guard (a week only scars if its
    // content was live before that member's deadline), so it is stamped
    // at publish and never moved by a later copy re-seed.
    await prisma.pactWeek.upsert({
      where: {
        preset_cycleWeek: { preset: w.preset, cycleWeek: w.cycleWeek },
      },
      create: {
        ...w,
        isPublished: publish,
        publishedAt: publish ? new Date() : null,
      },
      update: {
        title: w.title,
        challenge: w.challenge,
        journalPrompt: w.journalPrompt,
        intensity: w.intensity,
        readingLabel: w.readingLabel,
        readingWhy: w.readingWhy,
        ...(publish ? { isPublished: true } : {}),
      },
    });
    if (publish) {
      await prisma.pactWeek.updateMany({
        where: {
          preset: w.preset,
          cycleWeek: w.cycleWeek,
          publishedAt: null,
        },
        data: { publishedAt: new Date() },
      });
    }
    if (existing) updated += 1;
    else created += 1;
  }
  console.log(
    `pact weeks: ${created} created, ${updated} updated` +
      (publish ? " (published)" : " (drafts, unpublished)"),
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
