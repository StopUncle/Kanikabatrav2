/**
 * Seed the content pipeline:
 *   1. Update the 16 existing CONCEPT/APPROVED ideas with structural metadata
 *      (hook type, mechanisms, frame, format) — text stays empty for Kanika to fill.
 *   2. Insert ~20 new ideas with the same structural pre-fill, designed to round
 *      out the rotation: more interior monologue, more shorts, more close-mechanism
 *      diversity, and shock-and-awe slot suggestions in `notes`.
 *
 * Run: DATABASE_URL=<prod> npx tsx scripts/seed-content-plan.ts
 */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type Plan = {
  // Match by exact title prefix for updates; new rows insert as-is.
  title: string;
  hookType: string;
  line2Mechanism: string;
  line3Mechanism: string;       // = payoff mechanism
  deepeningMechanism?: string;
  closeMechanism: string;
  frame: string;
  videoFormat: string;          // LONG | SHORT
  notes?: string;
};

// --- 16 existing ideas, mapped to recommended structure ---
const EXISTING: Plan[] = [
  {
    title: 'Never accept same-day plans',
    hookType: 'DIAGNOSTIC_CORRECTION',
    line2Mechanism: 'INVALIDATE',
    line3Mechanism: 'SPECIFIC_MECHANISM',
    deepeningMechanism: 'OBJECTION_HANDLE',
    closeMechanism: 'PROTECTIVE_HANDOFF',
    frame: 'PROTECTIVE',
    videoFormat: 'LONG',
    notes: 'Correct the "be flexible" myth. Frame: how same-day plans signal where you sit in his priority stack.',
  },
  {
    title: "Having options isn't about sleeping around",
    hookType: 'DIAGNOSTIC_CORRECTION',
    line2Mechanism: 'INVALIDATE',
    line3Mechanism: 'SPECIFIC_MECHANISM',
    deepeningMechanism: 'OBJECTION_HANDLE',
    closeMechanism: 'DIAGNOSTIC_QUESTION',
    frame: 'PROTECTIVE',
    videoFormat: 'LONG',
    notes: 'Reclaim "options" from the slut-shame frame. About abundance mindset, not bodies.',
  },
  {
    title: 'Make men invest in 5 escalating stages before you give anything back',
    hookType: 'METHOD_EXPOSURE',
    line2Mechanism: 'SPECIFICITY_ESCALATION',
    line3Mechanism: 'SPECIFIC_MECHANISM',
    deepeningMechanism: 'SECOND_EXAMPLE',
    closeMechanism: 'FRAMEWORK_SUMMARY',
    frame: 'NEUTRAL',
    videoFormat: 'LONG',
    notes: 'High save-rate candidate. Numbered framework lands in C1 close.',
  },
  {
    title: 'The right relationship feels calm, not chaotic',
    hookType: 'DIAGNOSTIC_CORRECTION',
    line2Mechanism: 'INVALIDATE',
    line3Mechanism: 'DIAGNOSTIC',
    deepeningMechanism: 'OBJECTION_HANDLE',
    closeMechanism: 'DIAGNOSTIC_QUESTION',
    frame: 'PROTECTIVE',
    videoFormat: 'LONG',
    notes: 'Comment-driver. The diagnostic in close ("which one are you in right now") triggers self-disclosure threads.',
  },
  {
    title: 'Control your body language deliberately',
    hookType: 'METHOD_EXPOSURE',
    line2Mechanism: 'SPECIFICITY_ESCALATION',
    line3Mechanism: 'SPECIFIC_MECHANISM',
    deepeningMechanism: 'SECOND_EXAMPLE',
    closeMechanism: 'FRAMEWORK_SUMMARY',
    frame: 'NEUTRAL',
    videoFormat: 'LONG',
    notes: 'Tactical. Pure save-rate play.',
  },
  {
    title: 'Adapt your personality to the situation using different personas',
    hookType: 'FIRST_PERSON_MECHANISM',
    line2Mechanism: 'PERSONAL_STAKE',
    line3Mechanism: 'DIAGNOSTIC',
    deepeningMechanism: 'PERSONAL_DISCLOSURE',
    closeMechanism: 'IMPLIED_CATALOGUE',
    frame: 'NEUTRAL',
    videoFormat: 'LONG',
    notes: 'SHOCK & AWE candidate — deepening slot, draw from PERFORMING_EMOTIONS bank. Legend potential.',
  },
  {
    title: 'Sexual scarcity increases your perceived value',
    hookType: 'METHOD_EXPOSURE',
    line2Mechanism: 'SPECIFICITY_ESCALATION',
    line3Mechanism: 'SPECIFIC_MECHANISM',
    deepeningMechanism: 'OBJECTION_HANDLE',
    closeMechanism: 'FRAMEWORK_SUMMARY',
    frame: 'NEUTRAL',
    videoFormat: 'LONG',
    notes: 'Sensitive topic — objection handle in deepening pre-empts "isn\'t this manipulative" pushback.',
  },
  {
    title: "Casual sex bonds women neurochemically while men don't bond the same way",
    hookType: 'DIAGNOSTIC_CORRECTION',
    line2Mechanism: 'INVALIDATE',
    line3Mechanism: 'SPECIFIC_MECHANISM',
    deepeningMechanism: 'SECOND_EXAMPLE',
    closeMechanism: 'PROTECTIVE_HANDOFF',
    frame: 'PROTECTIVE',
    videoFormat: 'LONG',
    notes: 'High-share. Protective close: "if your friend keeps doing this, send her this video."',
  },
  {
    title: 'Butterflies are anxiety, not attraction',
    hookType: 'DIAGNOSTIC_CORRECTION',
    line2Mechanism: 'INVALIDATE',
    line3Mechanism: 'DIAGNOSTIC',
    deepeningMechanism: 'OBJECTION_HANDLE',
    closeMechanism: 'DIAGNOSTIC_QUESTION',
    frame: 'PROTECTIVE',
    videoFormat: 'LONG',
    notes: 'Strong loop opener. Counter-intuitive, dislodges existing belief, lands hard.',
  },
  {
    title: "The Specific Way A Sociopath Apologizes (You Won't Notice It)",
    hookType: 'FIRST_PERSON_MECHANISM',
    line2Mechanism: 'PERSONAL_STAKE',
    line3Mechanism: 'PROTECTIVE_INVERSION',
    deepeningMechanism: 'SECOND_EXAMPLE',
    closeMechanism: 'PROTECTIVE_HANDOFF',
    frame: 'PROTECTIVE',
    videoFormat: 'LONG',
    notes: 'Workhorse format. Self-implicated reveal → protective frame in payoff → handoff close.',
  },
  {
    title: 'The Gift A Sociopath Gives Means The Opposite Of What You Think',
    hookType: 'FIRST_PERSON_MECHANISM',
    line2Mechanism: 'PERSONAL_STAKE',
    line3Mechanism: 'PROTECTIVE_INVERSION',
    deepeningMechanism: 'SECOND_EXAMPLE',
    closeMechanism: 'PROTECTIVE_HANDOFF',
    frame: 'PROTECTIVE',
    videoFormat: 'LONG',
  },
  {
    title: 'The One Fear A Sociopath Actually Has',
    hookType: 'INTERIOR_MONOLOGUE',
    line2Mechanism: 'REFRAME',
    line3Mechanism: 'DIAGNOSTIC',
    deepeningMechanism: 'PERSONAL_DISCLOSURE',
    closeMechanism: 'IMPLIED_CATALOGUE',
    frame: 'NEUTRAL',
    videoFormat: 'LONG',
    notes: 'SHOCK & AWE candidate — the disclosure carries the video. Confession from NOT_FEELING_EXPECTED_THINGS bank.',
  },
  {
    title: 'The 5-Second Rule That Outs A Sociopath',
    hookType: 'METHOD_EXPOSURE',
    line2Mechanism: 'SPECIFICITY_ESCALATION',
    line3Mechanism: 'SPECIFIC_MECHANISM',
    deepeningMechanism: 'SECOND_EXAMPLE',
    closeMechanism: 'PROTECTIVE_HANDOFF',
    frame: 'PROTECTIVE',
    videoFormat: 'LONG',
    notes: 'Numbered + protective inversion in close. Saves AND shares.',
  },
  {
    title: 'What A Sociopath Notices First When You Walk Into A Room',
    hookType: 'FIRST_PERSON_MECHANISM',
    line2Mechanism: 'PERSONAL_STAKE',
    line3Mechanism: 'DIAGNOSTIC',
    deepeningMechanism: 'SECOND_EXAMPLE',
    closeMechanism: 'DIAGNOSTIC_QUESTION',
    frame: 'PROTECTIVE',
    videoFormat: 'LONG',
    notes: 'Diagnostic close: "what do YOU think a sociopath would notice about you" — comment-driver.',
  },
  {
    title: 'The One Thing A Sociopath Will Remember About You For Years',
    hookType: 'INTERIOR_MONOLOGUE',
    line2Mechanism: 'REFRAME',
    line3Mechanism: 'DIAGNOSTIC',
    deepeningMechanism: 'PERSONAL_DISCLOSURE',
    closeMechanism: 'IMPLIED_CATALOGUE',
    frame: 'NEUTRAL',
    videoFormat: 'LONG',
    notes: 'SHOCK & AWE — disclosure dimension on memory texture. Confession from EXPLOITING_VULNERABILITY bank.',
  },
  {
    title: "The 3-Word Phrase A Sociopath Says When You're Crying",
    hookType: 'FIRST_PERSON_MECHANISM',
    line2Mechanism: 'PERSONAL_STAKE',
    line3Mechanism: 'PROTECTIVE_INVERSION',
    deepeningMechanism: 'OBJECTION_HANDLE',
    closeMechanism: 'PROTECTIVE_HANDOFF',
    frame: 'PROTECTIVE',
    videoFormat: 'LONG',
    notes: 'High-stakes content — handle the "isn\'t this just bad communication" objection in deepening.',
  },
];

// --- ~20 new ideas to round out the rotation ---
const NEW_IDEAS: Array<Plan & { source?: string }> = [
  // Long-format — first-person mechanism reveals
  {
    title: 'The exact moment a sociopath decides whether you\'re worth their time',
    hookType: 'FIRST_PERSON_MECHANISM',
    line2Mechanism: 'PERSONAL_STAKE',
    line3Mechanism: 'PROTECTIVE_INVERSION',
    deepeningMechanism: 'SECOND_EXAMPLE',
    closeMechanism: 'PROTECTIVE_HANDOFF',
    frame: 'PROTECTIVE',
    videoFormat: 'LONG',
    notes: 'SHOCK & AWE candidate — deepening slot, MANIPULATING_LOVED_ONES or CALCULATED_KINDNESS bank.',
  },
  {
    title: 'The compliment that\'s actually a test',
    hookType: 'FIRST_PERSON_MECHANISM',
    line2Mechanism: 'PERSONAL_STAKE',
    line3Mechanism: 'PROTECTIVE_INVERSION',
    deepeningMechanism: 'SECOND_EXAMPLE',
    closeMechanism: 'DIAGNOSTIC_QUESTION',
    frame: 'PROTECTIVE',
    videoFormat: 'LONG',
    notes: 'Comment-driver. Pair w/ "if you\'ve been told X compliment, share what you said back."',
  },
  {
    title: 'Why crying in front of a sociopath is the worst thing you can do',
    hookType: 'FIRST_PERSON_MECHANISM',
    line2Mechanism: 'PERSONAL_STAKE',
    line3Mechanism: 'PROTECTIVE_INVERSION',
    deepeningMechanism: 'ESCALATION',
    closeMechanism: 'PROTECTIVE_HANDOFF',
    frame: 'PROTECTIVE',
    videoFormat: 'LONG',
    notes: 'SHOCK & AWE candidate — deepening, INDIFFERENCE_TO_HARM bank.',
  },

  // Long-format — diagnostic corrections
  {
    title: 'Why a sociopath love-bombs on day 3, not day 1',
    hookType: 'DIAGNOSTIC_CORRECTION',
    line2Mechanism: 'INVALIDATE',
    line3Mechanism: 'SPECIFIC_MECHANISM',
    deepeningMechanism: 'OBJECTION_HANDLE',
    closeMechanism: 'PROTECTIVE_HANDOFF',
    frame: 'PROTECTIVE',
    videoFormat: 'LONG',
    notes: 'Pre-empts the "all sociopaths love-bomb immediately" myth.',
  },
  {
    title: 'How to tell if a man is performing emotions or actually feeling them',
    hookType: 'DIAGNOSTIC_CORRECTION',
    line2Mechanism: 'INVALIDATE',
    line3Mechanism: 'SPECIFIC_MECHANISM',
    deepeningMechanism: 'OBJECTION_HANDLE',
    closeMechanism: 'PROTECTIVE_HANDOFF',
    frame: 'PROTECTIVE',
    videoFormat: 'LONG',
  },
  {
    title: 'What genuine empathy actually looks like — and why most people fake it',
    hookType: 'DIAGNOSTIC_CORRECTION',
    line2Mechanism: 'INVALIDATE',
    line3Mechanism: 'DIAGNOSTIC',
    deepeningMechanism: 'PERSONAL_DISCLOSURE',
    closeMechanism: 'DIAGNOSTIC_QUESTION',
    frame: 'NEUTRAL',
    videoFormat: 'LONG',
    notes: 'SHOCK & AWE — high legendary potential. Confession from FINDING_VULNERABILITY_BORING bank.',
  },
  {
    title: 'The compliment a narcissist gives that a sociopath would never give',
    hookType: 'DIAGNOSTIC_CORRECTION',
    line2Mechanism: 'INVALIDATE',
    line3Mechanism: 'SPECIFIC_MECHANISM',
    deepeningMechanism: 'OBJECTION_HANDLE',
    closeMechanism: 'DIAGNOSTIC_QUESTION',
    frame: 'NEUTRAL',
    videoFormat: 'LONG',
    notes: 'Compare/contrast format — appeals to the typology-curious portion of the audience.',
  },
  {
    title: 'What a sociopath wants you to think they want — and what they actually want',
    hookType: 'DIAGNOSTIC_CORRECTION',
    line2Mechanism: 'INVALIDATE',
    line3Mechanism: 'DIAGNOSTIC',
    deepeningMechanism: 'ESCALATION',
    closeMechanism: 'IMPLIED_CATALOGUE',
    frame: 'PROTECTIVE',
    videoFormat: 'LONG',
  },

  // Long-format — interior monologue (the legend-builder format)
  {
    title: 'What a sociopath thinks during sex',
    hookType: 'INTERIOR_MONOLOGUE',
    line2Mechanism: 'REFRAME',
    line3Mechanism: 'DIAGNOSTIC',
    deepeningMechanism: 'PERSONAL_DISCLOSURE',
    closeMechanism: 'IMPLIED_CATALOGUE',
    frame: 'NEUTRAL',
    videoFormat: 'LONG',
    notes: 'SHOCK & AWE — top legendary candidate. PERFORMING_EMOTIONS / MIMICKING_GRIEF_OR_LOVE bank. Use sparingly.',
  },
  {
    title: 'Why I never tell my fiancé about my feelings — and why he prefers it',
    hookType: 'INTERIOR_MONOLOGUE',
    line2Mechanism: 'REFRAME',
    line3Mechanism: 'DIAGNOSTIC',
    deepeningMechanism: 'PERSONAL_DISCLOSURE',
    closeMechanism: 'IMPLIED_CATALOGUE',
    frame: 'NEUTRAL',
    videoFormat: 'LONG',
    notes: 'Couples-content. Humanizes Kanika via fiancé mention. High follow-conversion.',
  },
  {
    title: 'The internal experience of meeting someone you\'ll exploit',
    hookType: 'INTERIOR_MONOLOGUE',
    line2Mechanism: 'REFRAME',
    line3Mechanism: 'DIAGNOSTIC',
    deepeningMechanism: 'PERSONAL_DISCLOSURE',
    closeMechanism: 'IMPLIED_CATALOGUE',
    frame: 'PROTECTIVE',
    videoFormat: 'LONG',
    notes: 'SHOCK & AWE — hook OR tail slot, EXPLOITING_VULNERABILITY bank. High risk of edgelord read — protective close mandatory.',
  },
  {
    title: 'Why I disappear from group chats for months at a time',
    hookType: 'INTERIOR_MONOLOGUE',
    line2Mechanism: 'REFRAME',
    line3Mechanism: 'DIAGNOSTIC',
    deepeningMechanism: 'PERSONAL_DISCLOSURE',
    closeMechanism: 'DIAGNOSTIC_QUESTION',
    frame: 'NEUTRAL',
    videoFormat: 'LONG',
    notes: 'SHOCK & AWE — relatable surface, alien interior. NOT_FEELING_EXPECTED_THINGS bank.',
  },

  // Long-format — method exposure
  {
    title: 'The one thing every sociopath does at parties (and why you should too)',
    hookType: 'METHOD_EXPOSURE',
    line2Mechanism: 'SPECIFICITY_ESCALATION',
    line3Mechanism: 'SPECIFIC_MECHANISM',
    deepeningMechanism: 'SECOND_EXAMPLE',
    closeMechanism: 'FRAMEWORK_SUMMARY',
    frame: 'NEUTRAL',
    videoFormat: 'LONG',
  },
  {
    title: 'The text message rhythm that exposes attachment style in 24 hours',
    hookType: 'METHOD_EXPOSURE',
    line2Mechanism: 'SPECIFICITY_ESCALATION',
    line3Mechanism: 'SPECIFIC_MECHANISM',
    deepeningMechanism: 'SECOND_EXAMPLE',
    closeMechanism: 'FRAMEWORK_SUMMARY',
    frame: 'PROTECTIVE',
    videoFormat: 'LONG',
    notes: 'Tactical save-rate play. Numbered framework lands cleanly in summary close.',
  },
  {
    title: 'The 3 questions that reveal someone\'s real values in under a minute',
    hookType: 'METHOD_EXPOSURE',
    line2Mechanism: 'SPECIFICITY_ESCALATION',
    line3Mechanism: 'SPECIFIC_MECHANISM',
    deepeningMechanism: 'SECOND_EXAMPLE',
    closeMechanism: 'FRAMEWORK_SUMMARY',
    frame: 'PROTECTIVE',
    videoFormat: 'LONG',
  },
  {
    title: 'Why your friend group has a quiet manipulator (and how to find them)',
    hookType: 'METHOD_EXPOSURE',
    line2Mechanism: 'SPECIFICITY_ESCALATION',
    line3Mechanism: 'SPECIFIC_MECHANISM',
    deepeningMechanism: 'OBJECTION_HANDLE',
    closeMechanism: 'PROTECTIVE_HANDOFF',
    frame: 'PROTECTIVE',
    videoFormat: 'LONG',
  },
  {
    title: 'What I notice in 30 seconds that takes therapists 3 months',
    hookType: 'METHOD_EXPOSURE',
    line2Mechanism: 'SPECIFICITY_ESCALATION',
    line3Mechanism: 'SPECIFIC_MECHANISM',
    deepeningMechanism: 'SECOND_EXAMPLE',
    closeMechanism: 'IMPLIED_CATALOGUE',
    frame: 'NEUTRAL',
    videoFormat: 'LONG',
    notes: 'Authority play. Drives traffic to coaching page.',
  },
  {
    title: 'How a sociopath fakes interest — and the giveaway no one teaches you',
    hookType: 'DIAGNOSTIC_CORRECTION',
    line2Mechanism: 'INVALIDATE',
    line3Mechanism: 'PROTECTIVE_INVERSION',
    deepeningMechanism: 'SECOND_EXAMPLE',
    closeMechanism: 'PROTECTIVE_HANDOFF',
    frame: 'PROTECTIVE',
    videoFormat: 'LONG',
  },

  // Short format (15-25s) — hook → payoff → tail
  {
    title: 'Compliment timing tells you if it\'s real',
    hookType: 'DIAGNOSTIC_CORRECTION',
    line2Mechanism: 'INVALIDATE',
    line3Mechanism: 'SPECIFIC_MECHANISM',
    closeMechanism: 'FRAMEWORK_SUMMARY',
    frame: 'PROTECTIVE',
    videoFormat: 'SHORT',
    notes: 'One-liner. Compress to: hook + payoff + the tail observation.',
  },
  {
    title: 'How a sociopath says "I love you"',
    hookType: 'FIRST_PERSON_MECHANISM',
    line2Mechanism: 'PERSONAL_STAKE',
    line3Mechanism: 'PROTECTIVE_INVERSION',
    closeMechanism: 'PROTECTIVE_HANDOFF',
    frame: 'PROTECTIVE',
    videoFormat: 'SHORT',
  },
  {
    title: 'The text response that reveals attachment style',
    hookType: 'METHOD_EXPOSURE',
    line2Mechanism: 'SPECIFICITY_ESCALATION',
    line3Mechanism: 'SPECIFIC_MECHANISM',
    closeMechanism: 'FRAMEWORK_SUMMARY',
    frame: 'PROTECTIVE',
    videoFormat: 'SHORT',
  },
  {
    title: 'What a sociopath thinks at funerals',
    hookType: 'INTERIOR_MONOLOGUE',
    line2Mechanism: 'REFRAME',
    line3Mechanism: 'DIAGNOSTIC',
    closeMechanism: 'IMPLIED_CATALOGUE',
    frame: 'NEUTRAL',
    videoFormat: 'SHORT',
    notes: 'SHOCK & AWE — very high legendary potential. MIMICKING_GRIEF_OR_LOVE bank. Place line in hook OR tail.',
  },
  {
    title: 'Sociopaths can\'t fake one specific emotion',
    hookType: 'DIAGNOSTIC_CORRECTION',
    line2Mechanism: 'INVALIDATE',
    line3Mechanism: 'DIAGNOSTIC',
    closeMechanism: 'DIAGNOSTIC_QUESTION',
    frame: 'PROTECTIVE',
    videoFormat: 'SHORT',
  },
  {
    title: 'The 4-second rule for first impressions',
    hookType: 'METHOD_EXPOSURE',
    line2Mechanism: 'SPECIFICITY_ESCALATION',
    line3Mechanism: 'SPECIFIC_MECHANISM',
    closeMechanism: 'FRAMEWORK_SUMMARY',
    frame: 'NEUTRAL',
    videoFormat: 'SHORT',
  },
];

async function main() {
  console.log('=== UPDATING 16 EXISTING IDEAS WITH STRUCTURE ===\n');
  let updated = 0;
  for (const plan of EXISTING) {
    // Match by title — these are the seeds.
    const existing = await prisma.contentIdea.findFirst({
      where: { title: plan.title, status: 'APPROVED' },
    });
    if (!existing) {
      console.log(`  ⚠ no match for: "${plan.title}"`);
      continue;
    }
    await prisma.contentIdea.update({
      where: { id: existing.id },
      data: {
        hookType: plan.hookType,
        line2Mechanism: plan.line2Mechanism,
        line3Mechanism: plan.line3Mechanism,
        deepeningMechanism: plan.deepeningMechanism ?? null,
        closeMechanism: plan.closeMechanism,
        frame: plan.frame,
        videoFormat: plan.videoFormat,
        // Preserve any existing notes; append shock-and-awe slot info.
        notes: plan.notes
          ? existing.notes
            ? `${existing.notes}\n\n${plan.notes}`
            : plan.notes
          : existing.notes,
      },
    });
    console.log(`  ✓ ${plan.title.substring(0, 70)}`);
    updated++;
  }
  console.log(`\n  ${updated}/${EXISTING.length} updated`);

  console.log('\n\n=== INSERTING NEW IDEAS ===\n');
  let inserted = 0;
  for (const plan of NEW_IDEAS) {
    // Skip if a row already exists with the same title — idempotent.
    const dup = await prisma.contentIdea.findFirst({
      where: { title: plan.title },
    });
    if (dup) {
      console.log(`  · skip (exists): ${plan.title.substring(0, 70)}`);
      continue;
    }
    await prisma.contentIdea.create({
      data: {
        title: plan.title,
        source: plan.source ?? 'plan-2026-04-28',
        status: 'APPROVED',
        developmentStage: 'CONCEPT',
        hookType: plan.hookType,
        line2Mechanism: plan.line2Mechanism,
        line3Mechanism: plan.line3Mechanism,
        deepeningMechanism: plan.deepeningMechanism ?? null,
        closeMechanism: plan.closeMechanism,
        frame: plan.frame,
        videoFormat: plan.videoFormat,
        notes: plan.notes ?? null,
      },
    });
    console.log(`  ✓ ${plan.title.substring(0, 70)}`);
    inserted++;
  }
  console.log(`\n  ${inserted}/${NEW_IDEAS.length} inserted`);

  // Summary by hook type / format / close mechanism
  console.log('\n\n=== ROTATION CHECK (APPROVED only) ===');
  const byHook = await prisma.contentIdea.groupBy({
    by: ['hookType'],
    where: { status: 'APPROVED', hookType: { not: null } },
    _count: true,
  });
  console.log('By hook type:');
  byHook.forEach((r) => console.log(`  ${(r.hookType ?? '-').padEnd(28)} ${r._count}`));

  const byFormat = await prisma.contentIdea.groupBy({
    by: ['videoFormat'],
    where: { status: 'APPROVED' },
    _count: true,
  });
  console.log('\nBy format:');
  byFormat.forEach((r) => console.log(`  ${r.videoFormat.padEnd(8)} ${r._count}`));

  const byClose = await prisma.contentIdea.groupBy({
    by: ['closeMechanism'],
    where: { status: 'APPROVED', closeMechanism: { not: null } },
    _count: true,
  });
  console.log('\nBy close mechanism (engagement target):');
  byClose.forEach((r) => {
    const target =
      r.closeMechanism === 'FRAMEWORK_SUMMARY' ? 'saves'
      : r.closeMechanism === 'PROTECTIVE_HANDOFF' ? 'shares'
      : r.closeMechanism === 'DIAGNOSTIC_QUESTION' ? 'comments'
      : r.closeMechanism === 'IMPLIED_CATALOGUE' ? 'follows'
      : '?';
    console.log(`  ${(r.closeMechanism ?? '-').padEnd(22)} ${String(r._count).padStart(2)}  (for ${target})`);
  });

  const byDeepening = await prisma.contentIdea.groupBy({
    by: ['deepeningMechanism'],
    where: { status: 'APPROVED', deepeningMechanism: { not: null } },
    _count: true,
  });
  console.log('\nBy deepening mechanism (1 in 5 should be PERSONAL_DISCLOSURE):');
  byDeepening.forEach((r) => console.log(`  ${(r.deepeningMechanism ?? '-').padEnd(22)} ${r._count}`));

  const byFrame = await prisma.contentIdea.groupBy({
    by: ['frame'],
    where: { status: 'APPROVED', frame: { not: null } },
    _count: true,
  });
  console.log('\nBy frame:');
  byFrame.forEach((r) => console.log(`  ${(r.frame ?? '-').padEnd(12)} ${r._count}`));

  const shockSlots = await prisma.contentIdea.count({
    where: { status: 'APPROVED', notes: { contains: 'SHOCK & AWE' } },
  });
  const totalApproved = await prisma.contentIdea.count({ where: { status: 'APPROVED' } });
  console.log(`\nShock & awe slots tagged: ${shockSlots} / ${totalApproved} (~1 in ${Math.round(totalApproved / Math.max(shockSlots, 1))})`);

  await prisma.$disconnect();
}

main().catch((e) => { console.error(e); process.exit(1); });
