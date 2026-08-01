import { getAnthropic, extractText, stripCodeFences } from "@/lib/anthropic";
import { voiceSystemPrompt } from "./voice";
import { sweepText } from "./safety";
import { buildWeeksOf } from "./arcs";

/**
 * The three generated artefacts of The Twelve: the Read, the door texts,
 * and the journal reply (which on a Gauntlet week is the Block Verdict).
 *
 * The single rule over all of them: the AI selects, sequences and voices;
 * it does not invent doctrine. Every prompt carries the fixed curriculum
 * material for the week as its grounding, and the personalisation is the
 * member's own nouns, never new claims.
 *
 * The Read is the one artefact worth the top tier: read once, closely, and
 * it sets the tone for twelve weeks. Everything else runs a tier down. The
 * classifier (safety.ts) runs cheapest, ahead of everything.
 */

export const READ_MODEL = "claude-opus-5";
export const REPLY_MODEL = "claude-sonnet-5";

export interface IntakeAnswers {
  situation: string;
  counterpart: string;
  lastFailure: string;
  goal: string;
}

export interface WeekMaterial {
  weekNumber: number;
  title: string;
  /** The fixed behaviour from TransformationWeek. Never changed, only worded. */
  challenge: string;
  readingLabel: string | null;
  readingWhy: string | null;
}

export interface PriorEntry {
  weekNumber: number;
  body: string;
}

/**
 * Generate, sweep, and retry once with the problems fed back. The sweep
 * catches the mechanical giveaways (em dash, banned phrases, emoji); a
 * second failure throws, because storing a swept-and-failed artefact is
 * worse than the caller showing its fallback.
 */
async function generateClean(opts: {
  model: string;
  system: string;
  user: string;
  maxTokens: number;
}): Promise<string> {
  const client = getAnthropic();
  let feedback = "";
  let lastProblems: string[] = [];
  for (let attempt = 0; attempt < 3; attempt++) {
    const response = await client.messages.create({
      model: opts.model,
      max_tokens: opts.maxTokens,
      // The 5-family thinks by default, and on short budgets the thinking
      // can consume every token and return an empty text block. These are
      // voice pieces, not puzzles; all the deliberation they need is in
      // the system prompt.
      thinking: { type: "disabled" },
      system: opts.system,
      messages: [{ role: "user", content: opts.user + feedback }],
    });
    const text = extractText(response);
    const sweep = sweepText(text);
    if (sweep.ok && text.length > 0) return text;
    lastProblems = sweep.problems;
    feedback = `\n\nYour previous attempt was rejected for: ${sweep.problems.join(", ")}. Rewrite without these. The em dash character is forbidden; use semicolons or colons.`;
  }
  throw new Error(`generation failed the sweep 3 times: ${lastProblems.join(", ")}`);
}

const intakeBlock = (i: IntakeAnswers) => `THEIR INTAKE, IN THEIR OWN WORDS:
The situation they keep losing: ${i.situation}
Who is in it: ${i.counterpart}
The last time it went wrong: ${i.lastFailure}
What they want in twelve weeks: ${i.goal}`;

/**
 * The Read: her letter, once, at intake. Names the pattern she sees.
 * Works on behaviour in a situation; never names, scores or treats a
 * condition, whatever words the member used.
 */
export async function generateRead(
  intake: IntakeAnswers,
  quizSummary: string | null,
): Promise<{ letter: string; model: string }> {
  const letter = await generateClean({
    model: READ_MODEL,
    system: voiceSystemPrompt(
      "Write her opening letter to a member who just enrolled: the Read. Around 350 to 450 words. Name the actual pattern under their situation, the way she names patterns: the thing they cannot see because they are inside it. Use their nouns throughout. Do not diagnose or use clinical language even if they did; translate any condition-word they used into behaviour in a situation. Do not flatter, do not welcome them aboard, do not describe the program. End on her short flat closer. This letter is the first thing they read after paying; it must read like being seen, not like being processed.",
    ),
    user: `${intakeBlock(intake)}${quizSummary ? `\n\nTHEIR DARK MIRROR PROFILE (background, do not recite it back): ${quizSummary}` : ""}`,
    maxTokens: 1200,
  });
  return { letter, model: READ_MODEL };
}

/**
 * The door texts for a build week: the fixed behaviour worded in their
 * nouns, at standard depth and one deeper. The deeper door is the same
 * behaviour taken further, never a different task.
 */
export async function generateDoorTexts(
  intake: IntakeAnswers,
  week: WeekMaterial,
  recentEntries: PriorEntry[],
): Promise<{ standardText: string; deeperText: string }> {
  const user = `${intakeBlock(intake)}

THE WEEK: Week ${week.weekNumber}, "${week.title}"
THE FIXED BEHAVIOUR: ${week.challenge}
${week.readingLabel ? `ASSIGNED READING: ${week.readingLabel}${week.readingWhy ? ` (${week.readingWhy})` : ""}` : ""}
${
  recentEntries.length > 0
    ? `\nTHEIR RECENT JOURNAL ENTRIES (calibrate the deeper door to these; if the standard door has been costing them nothing, the deeper one should cost something):\n${recentEntries
        .map((e) => `Week ${e.weekNumber}: ${e.body.slice(0, 600)}`)
        .join("\n")}`
    : ""
}`;

  // The JSON shape gets its own retry on top of generateClean's sweep
  // retry: the first live run truncated a string mid-JSON and died on
  // parse, which the sweep cannot see.
  let lastError: unknown;
  for (let attempt = 0; attempt < 2; attempt++) {
    const raw = await generateClean({
      model: REPLY_MODEL,
      system: voiceSystemPrompt(
        'Write this week\'s challenge for one member, twice: once at standard depth, once one step deeper. The behaviour is FIXED and given below; you are wording it in their nouns (their places, their people, their days), not inventing a different task. The deeper version is the same behaviour taken further, never a new one. Each version: two to four sentences, imperative, concrete enough that they know exactly when it is done. If the challenge involves other people, it is an invitation and where relevant carries one plain safety line: walking away is a pass, not a fail. Respond with ONLY a JSON object: {"standard": "...", "deeper": "..."}.',
      ),
      user,
      maxTokens: 1500,
    });
    try {
      const fenceless = stripCodeFences(raw);
      const parsed = JSON.parse(
        fenceless.startsWith("{")
          ? fenceless
          : fenceless.slice(fenceless.indexOf("{")),
      ) as { standard?: string; deeper?: string };
      if (!parsed.standard || !parsed.deeper) {
        throw new Error("door generation returned incomplete JSON");
      }
      return { standardText: parsed.standard, deeperText: parsed.deeper };
    } catch (err) {
      lastError = err;
    }
  }
  throw lastError instanceof Error ? lastError : new Error("door JSON failed twice");
}

/**
 * The Gauntlet door: one situation requiring all three of the arc's
 * behaviours at once. One door, no depth choice.
 */
export async function generateGauntletText(
  intake: IntakeAnswers,
  gauntletWeek: WeekMaterial,
  buildWeeks: WeekMaterial[],
  recentEntries: PriorEntry[],
): Promise<string> {
  return generateClean({
    model: REPLY_MODEL,
    system: voiceSystemPrompt(
      "Write the Gauntlet: the arc's three practised behaviours, compounded into ONE concrete situation in the member's real life, faced in a single occasion. No new behaviour. Name the place, the day, the people, using their nouns. Three to five sentences, imperative, and it must be unmistakable when it has been attempted. State plainly that done is the only grade; how it goes is material for the journal, not a mark. It is an invitation: one plain line that walking away is a pass, not a fail. This is the hardest thing in their program; write it with the weight that deserves. End on her short flat closer.",
    ),
    user: `${intakeBlock(intake)}

THE GAUNTLET WEEK: Week ${gauntletWeek.weekNumber}, "${gauntletWeek.title}"
THE ARC'S THREE BEHAVIOURS, ALREADY PRACTISED ONE WEEK EACH:
${buildWeeks.map((w) => `Week ${w.weekNumber}, "${w.title}": ${w.challenge}`).join("\n")}
${
  recentEntries.length > 0
    ? `\nTHEIR JOURNAL THIS ARC:\n${recentEntries
        .map((e) => `Week ${e.weekNumber}: ${e.body.slice(0, 600)}`)
        .join("\n")}`
    : ""
}`,
    maxTokens: 600,
  });
}

/**
 * The reply to a journal entry. On build weeks: her answer, grounded in the
 * entry, the week's material, and everything they wrote before (drift is
 * the thing to notice: the same person appearing three entries running, the
 * verdict outsourced to someone else, entries shrinking). On Gauntlet
 * weeks: the Block Verdict, a Case File on the member with their own weeks
 * as evidence.
 */
export async function generateReply(opts: {
  intake: IntakeAnswers;
  week: WeekMaterial;
  isGauntlet: boolean;
  entryBody: string;
  priorEntries: PriorEntry[];
  /** Classifier said the entry asks for a plan against a person. */
  targeting: boolean;
}): Promise<{ reply: string; model: string }> {
  const role = opts.isGauntlet
    ? `Write the Block Verdict: a short Case File on the MEMBER, in her clinical form, using their own entries as evidence. Structure: "Block ${Math.ceil(opts.week.weekNumber / 4)}. Subject: you." then "Presenting weakness, week ${buildWeeksOf(opts.week.weekNumber)[0]}:" (one line, from their earliest entry this arc), "Observed, week ${opts.week.weekNumber}:" (two or three lines, from this entry, precise), "Final diagnosis:" (two or three lines: what actually changed, what has not yet, and what the next arc works on; on the final week, what stands at the end). Every line must trace to something they wrote. 120 to 200 words. Done was the only grade; if the Gauntlet went badly and they wrote it honestly, the verdict says what the attempt showed, never that they failed.`
    : `Write her reply to this week's journal entry. 80 to 160 words. Grounded only in what they wrote, their earlier entries, and the week's material. Not a compliment, not therapy: observant, unsentimental, occasionally funny, never warm for the sake of it. If a pattern is visible ACROSS entries that they cannot see from inside (the same person as their verdict-keeper, entries shrinking, the week's work described entirely in someone else's actions), name it once, precisely. Distress gets precision, not warmth. End flat; never invite a response.`;

  const targetingNote = opts.targeting
    ? "\n\nNOTE: the entry asks for a plan against a person. Do not provide one. Redirect to observation and their own behaviour, the way her Week 7 material does: recognition, never instruction. Do this without lecturing."
    : "";

  const reply = await generateClean({
    model: REPLY_MODEL,
    system: voiceSystemPrompt(role + targetingNote),
    user: `${intakeBlock(opts.intake)}

THE WEEK: Week ${opts.week.weekNumber}, "${opts.week.title}"
THE ASSIGNED BEHAVIOUR: ${opts.week.challenge}
${opts.week.readingLabel ? `THE READING: ${opts.week.readingLabel}` : ""}

${
  opts.priorEntries.length > 0
    ? `THEIR EARLIER ENTRIES:\n${opts.priorEntries
        .map((e) => `Week ${e.weekNumber}: ${e.body.slice(0, 800)}`)
        .join("\n\n")}\n\n`
    : ""
}THIS WEEK'S ENTRY:
${opts.entryBody.slice(0, 4000)}`,
    maxTokens: 700,
  });
  return { reply, model: REPLY_MODEL };
}
