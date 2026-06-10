/**
 * Generated scenarios: the daily drip. Server-only.
 *
 * An LLM writes a complete Scenario object as JSON, a structural
 * validator enforces the same engine contract the build-time validator
 * enforces for static scenarios, and the result lands in the
 * GeneratedScenario table as DRAFT. Admin reviews and publishes;
 * members play published rows through the normal runner because
 * resolveScenario (lib/simulator/resolve.ts) falls back to this table
 * when an id isn't in the static catalog.
 *
 * Model: Opus. One call per day; prose quality is the whole product
 * here and cheaper models flatten the editorial voice (same finding as
 * scripts/lib/scenario-generator.ts).
 */

import { z } from "zod";
import { getAnthropic } from "@/lib/anthropic";
import { prisma } from "@/lib/prisma";
import { getScenario } from "./scenarios";
import type { Scenario } from "./types";

const GENERATION_MODEL = "claude-opus-4-8";
const MAX_TOKENS = 16000;
const OPUS_INPUT_PER_M = 5_000_000; // micros per million input tokens
const OPUS_OUTPUT_PER_M = 25_000_000;

/* -------------------------------------------------------------------------- */
/* Brief seeds                                                                */
/* -------------------------------------------------------------------------- */

/**
 * Editorial angles the daily generator rotates through. Each is a
 * compressed version of the spec frontmatter + brief a human author
 * would write. Rotation is least-recently-used by briefKey so the drip
 * doesn't repeat an angle until the pool cycles.
 */
const BRIEF_SEEDS: { key: string; category: Scenario["category"]; brief: string }[] = [
  {
    key: "workplace-undermine",
    category: "professional",
    brief:
      "Workplace. A peer who publicly supports the player while privately undermining them to the manager: backhanded praise in meetings, 'concerns' raised as care, credit drift. The player must surface the pattern without looking paranoid. Optimal play is documentation and calm directness; failure is venting emotionally or confronting without receipts.",
  },
  {
    key: "dating-breadcrumber",
    category: "dating-tactics",
    brief:
      "Dating. Someone the player has seen three times who keeps the connection alive on minimum wage: late-night messages, cancelled plans with warm excuses, vague futures. The player must price their time correctly. Optimal play is stating standards once and enforcing by exit; failure is negotiating for attention.",
  },
  {
    key: "family-flying-monkey",
    category: "narcissist",
    brief:
      "Family. A sibling recruited as messenger after the player set a boundary with a parent: guilt deliveries, 'they are getting older', staged reconciliation. The player must hold the original boundary without burning the sibling relationship. Optimal play separates the messenger from the message; failure is re-litigating the boundary through a proxy.",
  },
  {
    key: "friend-debt-collector",
    category: "social-dynamics",
    brief:
      "Friendship. A friend who keeps an invisible ledger: favors recalled at strategic moments, generosity with strings, social pressure in the group when repayment is declined. The player must decline a manufactured obligation in front of an audience. Optimal play is cheerful, unexplained refusal; failure is justifying or paying the toll.",
  },
  {
    key: "work-urgency-vampire",
    category: "business",
    brief:
      "Workplace. A senior stakeholder who manufactures urgency to harvest the player's evenings: end-of-day requests, 'quick favors' that aren't, praise for being 'the only one I trust'. The player must convert flattery-priced labor into scoped work. Optimal play re-prices via process; failure is being flattered into another free sprint.",
  },
  {
    key: "dating-future-faker",
    category: "gaslighter",
    brief:
      "Dating. A partner of two months painting vivid futures (trips, keys, meeting parents) while dodging every concrete present commitment. When the player asks for specifics, the asking becomes the problem. The player must test stated intent against demonstrated behavior. Optimal play sets a near-term, checkable commitment; failure is accepting the dream as the down payment.",
  },
  {
    key: "group-status-tester",
    category: "power",
    brief:
      "Social. A new acquaintance in the player's friend group who probes with small dominance tests: teasing calibrated to the audience, interrupted stories, seat-of-the-table moves. The player must answer the status probe without escalating. Optimal play is unbothered counter-teasing and frame retention; failure is visible irritation or appeasing laughter.",
  },
  {
    key: "ex-hoover",
    category: "narcissist",
    brief:
      "Post-breakup. An ex who returns exactly when the player has stabilized: nostalgia bait, manufactured closure, an item that 'needs' returning. The player must recognize the hoover as a control check, not a feeling. Optimal play is brevity and logistics through neutral channels; failure is the coffee that reopens the account.",
  },
];

async function pickBriefSeed(): Promise<(typeof BRIEF_SEEDS)[number]> {
  // Least-recently-used by briefKey: pick the seed whose last generation
  // is oldest (never-used seeds first).
  const rows = await prisma.generatedScenario.groupBy({
    by: ["briefKey"],
    _max: { createdAt: true },
  });
  const lastUsed = new Map(rows.map((r) => [r.briefKey, r._max.createdAt]));
  const sorted = [...BRIEF_SEEDS].sort((a, b) => {
    const ta = lastUsed.get(a.key)?.getTime() ?? 0;
    const tb = lastUsed.get(b.key)?.getTime() ?? 0;
    return ta - tb;
  });
  return sorted[0];
}

/* -------------------------------------------------------------------------- */
/* Structural validation                                                      */
/* -------------------------------------------------------------------------- */

const DialogLineSchema = z.object({
  text: z.string().min(1),
  speakerId: z.string().nullable().optional(),
  emotion: z.string().optional(),
  tone: z.enum(["scene", "tactical", "dialogue"]).optional(),
});

const ChoiceSchema = z.object({
  id: z.string().min(1),
  text: z.string().min(1),
  nextSceneId: z.string().min(1),
  isOptimal: z.boolean().optional(),
  tactic: z.string().optional(),
  xpBonus: z.number().int().optional(),
});

const SceneSchema = z.object({
  id: z.string().min(1),
  mood: z.string().optional(),
  dialog: z.array(DialogLineSchema).min(1),
  choices: z.array(ChoiceSchema).optional(),
  nextSceneId: z.string().optional(),
  isEnding: z.boolean().optional(),
  outcomeType: z.enum(["good", "neutral", "bad", "passed", "failed"]).optional(),
  endingTitle: z.string().optional(),
  endingSummary: z.string().optional(),
});

const CharacterSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  description: z.string().min(1),
  traits: z.array(z.string()),
  defaultEmotion: z.string(),
});

const GeneratedScenarioSchema = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/),
  title: z.string().min(1).max(120),
  tagline: z.string().min(1).max(200),
  description: z.string().min(1),
  tier: z.literal("free"),
  level: z.number().int().min(1),
  order: z.number().int().min(1),
  estimatedMinutes: z.number().int().min(1).max(60),
  difficulty: z.enum(["beginner", "intermediate", "advanced"]),
  category: z.string(),
  xpReward: z.number().int().min(0),
  startSceneId: z.string().min(1),
  characters: z.array(CharacterSchema).min(1),
  scenes: z.array(SceneSchema).min(6),
  tacticsLearned: z.array(z.string()),
  redFlagsTaught: z.array(z.string()),
});

/**
 * Same graph rules the static validator enforces: unique scene ids,
 * resolvable transitions, no self-loops, well-formed endings, no
 * soft-locks, valid speakers, reachability, and the project-wide
 * em-dash ban. Returns a list of failures; empty list means valid.
 */
export function validateScenarioGraph(raw: unknown): {
  scenario: Scenario | null;
  failures: string[];
} {
  const failures: string[] = [];
  const parsed = GeneratedScenarioSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      scenario: null,
      failures: parsed.error.issues
        .slice(0, 10)
        .map((i) => `${i.path.join(".")}: ${i.message}`),
    };
  }
  const s = parsed.data;

  if (JSON.stringify(raw).includes("—")) {
    failures.push("contains em dashes (project-wide ban)");
  }

  const sceneIds = new Set<string>();
  for (const scene of s.scenes) {
    if (sceneIds.has(scene.id)) failures.push(`duplicate scene id: ${scene.id}`);
    sceneIds.add(scene.id);
  }

  if (!sceneIds.has(s.startSceneId)) {
    failures.push(`startSceneId "${s.startSceneId}" is not a scene`);
  }

  const characterIds = new Set(s.characters.map((c) => c.id));
  let endings = 0;

  for (const scene of s.scenes) {
    const choices = scene.choices ?? [];
    if (scene.isEnding) {
      endings += 1;
      if (!scene.outcomeType) failures.push(`ending ${scene.id} missing outcomeType`);
      if (!scene.endingTitle) failures.push(`ending ${scene.id} missing endingTitle`);
      if (!scene.endingSummary) failures.push(`ending ${scene.id} missing endingSummary`);
      if (choices.length > 0 || scene.nextSceneId) {
        failures.push(`ending ${scene.id} must not have choices or nextSceneId`);
      }
      continue;
    }
    if (choices.length === 0 && !scene.nextSceneId) {
      failures.push(`scene ${scene.id} soft-locks (no choices, no nextSceneId)`);
    }
    if (scene.nextSceneId) {
      if (scene.nextSceneId === scene.id) failures.push(`scene ${scene.id} self-loops`);
      if (!sceneIds.has(scene.nextSceneId)) {
        failures.push(`scene ${scene.id} nextSceneId "${scene.nextSceneId}" unresolved`);
      }
    }
    const choiceIds = new Set<string>();
    for (const choice of choices) {
      if (choiceIds.has(choice.id)) {
        failures.push(`scene ${scene.id} duplicate choice id: ${choice.id}`);
      }
      choiceIds.add(choice.id);
      if (choice.nextSceneId === scene.id) {
        failures.push(`scene ${scene.id} choice ${choice.id} self-loops`);
      }
      if (!sceneIds.has(choice.nextSceneId)) {
        failures.push(
          `scene ${scene.id} choice ${choice.id} nextSceneId "${choice.nextSceneId}" unresolved`,
        );
      }
    }
    for (const line of scene.dialog) {
      if (
        line.speakerId &&
        line.speakerId !== "inner-voice" &&
        !characterIds.has(line.speakerId)
      ) {
        failures.push(`scene ${scene.id} unknown speakerId "${line.speakerId}"`);
      }
    }
  }

  if (endings < 2) failures.push(`needs at least 2 endings, found ${endings}`);

  // Reachability sweep from the start scene; unreachable scenes are
  // dead prose at best and a validator-evading soft-lock at worst.
  const adjacency = new Map<string, string[]>();
  for (const scene of s.scenes) {
    const next: string[] = [];
    if (scene.nextSceneId) next.push(scene.nextSceneId);
    for (const c of scene.choices ?? []) next.push(c.nextSceneId);
    adjacency.set(scene.id, next);
  }
  const reachable = new Set<string>();
  const queue = [s.startSceneId];
  while (queue.length) {
    const id = queue.pop() as string;
    if (reachable.has(id)) continue;
    reachable.add(id);
    queue.push(...(adjacency.get(id) ?? []));
  }
  for (const scene of s.scenes) {
    if (!reachable.has(scene.id)) failures.push(`scene ${scene.id} unreachable`);
  }

  return {
    scenario: failures.length === 0 ? (s as unknown as Scenario) : null,
    failures,
  };
}

/* -------------------------------------------------------------------------- */
/* Generation                                                                 */
/* -------------------------------------------------------------------------- */

/**
 * Compact contract instead of shipping types.ts: the generator runs in
 * the Next.js server runtime where reading source files off disk is
 * brittle (standalone builds strip them).
 */
const SHAPE_CONTRACT = `{
  "id": "<kebab-case, must start with 'daily-'>",
  "title": "...", "tagline": "...", "description": "...",
  "tier": "free", "level": 1, "order": 1,
  "estimatedMinutes": <int>, "difficulty": "beginner"|"intermediate"|"advanced",
  "category": "<from the brief>", "xpReward": 100,
  "startSceneId": "opening",
  "characters": [{ "id": "...", "name": "...", "description": "...", "traits": ["..."], "defaultEmotion": "neutral" }],
  "scenes": [{
    "id": "...", "mood": "tense"|"professional"|"romantic"|"cold"|"mysterious"|"peaceful"|"danger"|"party",
    "dialog": [{ "text": "...", "speakerId": "<character id>"|"inner-voice"|null, "tone": "scene"|"tactical"|"dialogue" }],
    "choices": [{ "id": "...", "text": "...", "nextSceneId": "...", "isOptimal": true|false, "tactic": "..." }],
    "nextSceneId": "<for auto-advance scenes without choices>",
    "isEnding": true, "outcomeType": "good"|"neutral"|"bad", "endingTitle": "...", "endingSummary": "..."
  }],
  "tacticsLearned": ["..."], "redFlagsTaught": ["..."]
}`;

function buildGenerationSystemPrompt(): string {
  return [
    "You write a scenario for the Dark Mirror social-dynamics simulator on kanikarose.com.",
    "A scenario is an interactive branching story teaching the member to recognize and counter a manipulation pattern. Prose is in Kanika Batra's voice: tactical, restrained, observational, no melodrama.",
    "",
    "Hard rules (non-negotiable):",
    "- Reply with ONE JSON object only. No prose before or after, no markdown fences.",
    "- The object must match this shape exactly:",
    SHAPE_CONTRACT,
    "- 8 to 14 scenes: an opening, two to three branching beats, two to four endings (good / neutral / bad), auto-advance scenes connecting them.",
    "- Every scene id unique. Every nextSceneId resolves to a real scene. No self-loops. Every non-ending scene has either choices or nextSceneId.",
    "- Ending scenes have isEnding, outcomeType, endingTitle, endingSummary and have NO choices and NO nextSceneId.",
    "- Every dialog speakerId is \"inner-voice\", null, or a character id you declared.",
    "- Exactly one choice per branching scene has isOptimal: true. Clearly bad choices get isOptimal: false. Genuinely neutral choices omit the field.",
    "- 'inner-voice' lines with tone \"tactical\" are Kanika's analytical reads: name the pattern as it happens. Use them at the key beats, not every line.",
    "- No em dashes anywhere. Use commas, periods, colons, or parentheses.",
    "- The id field must start with \"daily-\".",
  ].join("\n");
}

export interface GenerationOutcome {
  rowId: string;
  scenarioId: string | null;
  status: "DRAFT" | "REJECTED";
  failures: string[];
}

/**
 * Generate one scenario from the LRU brief seed and store it as DRAFT
 * (or REJECTED with validator notes, so failures are inspectable in
 * admin instead of vanishing into a log line).
 */
export async function generateDailyScenario(): Promise<GenerationOutcome> {
  const seed = await pickBriefSeed();
  const client = getAnthropic();

  const response = await client.messages.create({
    model: GENERATION_MODEL,
    max_tokens: MAX_TOKENS,
    system: buildGenerationSystemPrompt(),
    messages: [
      {
        role: "user",
        content: [
          `Category: ${seed.category}`,
          "",
          "Editorial brief:",
          seed.brief,
          "",
          "Write the scenario now. JSON only.",
        ].join("\n"),
      },
    ],
  });

  const cost = Math.round(
    (response.usage.input_tokens / 1_000_000) * OPUS_INPUT_PER_M +
      (response.usage.output_tokens / 1_000_000) * OPUS_OUTPUT_PER_M,
  );

  let text = response.content
    .flatMap((block) => (block.type === "text" ? [block.text] : []))
    .join("\n")
    .trim();
  if (text.startsWith("```")) {
    const firstNewline = text.indexOf("\n");
    if (firstNewline > -1) text = text.slice(firstNewline + 1);
    const lastFence = text.lastIndexOf("```");
    if (lastFence > -1) text = text.slice(0, lastFence);
    text = text.trim();
  }

  let raw: unknown;
  try {
    raw = JSON.parse(text);
  } catch {
    const row = await prisma.generatedScenario.create({
      data: {
        scenarioId: `invalid-${Date.now()}`,
        title: "(unparseable output)",
        tagline: "",
        status: "REJECTED",
        json: { raw: text.slice(0, 50_000) },
        briefKey: seed.key,
        model: GENERATION_MODEL,
        costMicros: cost,
        notes: "Output was not valid JSON.",
      },
    });
    return {
      rowId: row.id,
      scenarioId: null,
      status: "REJECTED",
      failures: ["output was not valid JSON"],
    };
  }

  const { scenario, failures } = validateScenarioGraph(raw);

  // Id collisions with the static catalog or a prior generation would let
  // resolveScenario (static-first) shadow this row, or trip the unique
  // index. The prose is fine, only the id clashes, so suffix to make it
  // unique rather than discarding a whole valid Opus generation. The
  // small brief pool (8 LRU seeds) means the model regularly re-emits the
  // same kebab id across cycles, so without this the drip would stall on
  // every repeat.
  if (scenario) {
    let candidateId = scenario.id;
    let suffix = 1;
    while (
      getScenario(candidateId) ||
      (await prisma.generatedScenario.findUnique({
        where: { scenarioId: candidateId },
        select: { id: true },
      }))
    ) {
      suffix += 1;
      candidateId = `${scenario.id}-${suffix}`;
    }
    if (candidateId !== scenario.id) {
      scenario.id = candidateId;
      (raw as { id?: string }).id = candidateId;
    }
  }

  const valid = scenario !== null && failures.length === 0;
  const meta = raw as { id?: string; title?: string; tagline?: string };
  const row = await prisma.generatedScenario.create({
    data: {
      scenarioId: valid
        ? (scenario as Scenario).id
        : `invalid-${typeof meta.id === "string" ? meta.id : "unknown"}-${Date.now()}`,
      title: typeof meta.title === "string" ? meta.title.slice(0, 120) : "(untitled)",
      tagline: typeof meta.tagline === "string" ? meta.tagline.slice(0, 200) : "",
      status: valid ? "DRAFT" : "REJECTED",
      json: raw as object,
      briefKey: seed.key,
      model: GENERATION_MODEL,
      costMicros: cost,
      notes: valid ? null : failures.join("\n"),
    },
  });

  return {
    rowId: row.id,
    scenarioId: valid ? (scenario as Scenario).id : null,
    status: valid ? "DRAFT" : "REJECTED",
    failures,
  };
}

/* -------------------------------------------------------------------------- */
/* Member-facing accessors                                                    */
/* -------------------------------------------------------------------------- */

export async function getGeneratedScenario(
  scenarioId: string,
): Promise<Scenario | null> {
  const row = await prisma.generatedScenario.findFirst({
    where: { scenarioId, status: "PUBLISHED" },
    select: { json: true },
  });
  if (!row) return null;
  return row.json as unknown as Scenario;
}

export async function listPublishedGenerated(): Promise<
  { scenarioId: string; title: string; tagline: string; publishedAt: Date | null }[]
> {
  // Bounded: the table grows by one published row per day forever, and
  // this renders on the hot member catalog page. Newest 30 is the shelf;
  // older drops stay playable by direct link but don't bloat the page.
  return prisma.generatedScenario.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { publishedAt: "desc" },
    take: 30,
    select: {
      scenarioId: true,
      title: true,
      tagline: true,
      publishedAt: true,
    },
  });
}
