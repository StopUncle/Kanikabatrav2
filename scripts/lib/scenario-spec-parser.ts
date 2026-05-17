/**
 * Scenario spec parser. Reads a markdown file with YAML frontmatter and
 * returns a typed ScenarioSpec object plus the raw markdown body.
 *
 * The spec format is intentionally rich: structured frontmatter for things
 * the engine cares about (id, track, characters, endings), free-form markdown
 * body for the editorial intent (the brief, tactical anchors, voice notes).
 * The LLM sees both and produces the prose; the human writes the spec.
 */

import matter from "gray-matter";
import { z } from "zod";

const VALID_TRACKS = [
  "female",
  "male-business",
  "male-dating",
  "anxiety",
  "toxic-narc",
  "pc-child",
  "cluster-b-lab",
  "divorce-arc",
  "loving-mira",
] as const;

const VALID_DIFFICULTIES = ["beginner", "intermediate", "advanced"] as const;
const VALID_TIERS = ["free", "premium", "vip"] as const;

const CharacterSpec = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  description: z.string().min(1),
  traits: z.array(z.string()).default([]),
  defaultEmotion: z.string().default("neutral"),
});

const EndingSpec = z.object({
  outcome: z.enum(["good", "neutral", "bad", "passed", "failed"]),
  summary: z.string().min(1),
});

export const ScenarioSpecSchema = z.object({
  id: z
    .string()
    .min(2)
    .max(80)
    .regex(/^[a-z0-9-]+$/, "id must be lowercase letters, numbers, hyphens"),
  track: z.enum(VALID_TRACKS),
  level: z.number().int().min(1).max(20),
  order: z.number().int().min(1).max(20),
  title: z.string().min(2).max(120),
  tagline: z.string().min(2).max(200),
  difficulty: z.enum(VALID_DIFFICULTIES),
  category: z.string().min(2).max(40),
  estimatedMinutes: z.number().int().min(1).max(120),
  tier: z.enum(VALID_TIERS).default("free"),
  tacticsLearned: z.array(z.string()).default([]),
  redFlagsTaught: z.array(z.string()).default([]),
  characters: z.array(CharacterSpec).min(1),
  setting: z.string().min(2),
  openingBeat: z.string().min(2),
  endings: z.array(EndingSpec).min(2).max(6),
  endingRecapPointer: z.string().optional(),
});

export type ScenarioSpec = z.infer<typeof ScenarioSpecSchema>;

export type ParsedSpec = {
  spec: ScenarioSpec;
  /** The markdown body, everything after the frontmatter fence. */
  body: string;
  /** Path the resulting scenario file will be written to. */
  outputPath: string;
};

/**
 * Map a few frontmatter keys to their normalized names. Kebab-case keys
 * are friendly to write; the parser accepts both. Unknown keys are passed
 * through so zod can flag typos rather than silently dropping them.
 */
function normalizeFrontmatter(raw: Record<string, unknown>): Record<string, unknown> {
  const aliases: Record<string, string> = {
    "tactic-spotlight": "tacticsLearned",
    "tactics-learned": "tacticsLearned",
    "red-flags-taught": "redFlagsTaught",
    "estimated-minutes": "estimatedMinutes",
    "estimatedminutes": "estimatedMinutes",
    "opening-beat": "openingBeat",
    "ending-recap-pointer": "endingRecapPointer",
    "desired-endings": "endings",
  };
  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(raw)) {
    const target = aliases[k] ?? k;
    out[target] = v;
  }

  // tacticsLearned can arrive as a single string when the spec uses
  // `tactic-spotlight: foo`. Coerce to an array so the schema doesn't
  // reject a perfectly reasonable single-tactic spec.
  if (typeof out.tacticsLearned === "string") {
    out.tacticsLearned = [out.tacticsLearned];
  }

  // endings may arrive as a YAML list of "<outcome>: <summary>" maps
  // (each entry has a single key being the outcome). Normalize to the
  // {outcome, summary} shape the schema expects so authors can write the
  // shorter form without changing the parser later.
  if (Array.isArray(out.endings)) {
    out.endings = (out.endings as unknown[]).map((e) => {
      if (e && typeof e === "object" && !Array.isArray(e)) {
        const obj = e as Record<string, unknown>;
        if (obj.outcome && obj.summary) return obj;
        const keys = Object.keys(obj);
        if (keys.length === 1) {
          const k = keys[0];
          return { outcome: k, summary: String(obj[k]) };
        }
      }
      return e;
    });
  }

  return out;
}

/**
 * Parse a markdown spec file. Throws on validation failure with a
 * human-readable message naming the offending field.
 */
export function parseSpec(source: string): { spec: ScenarioSpec; body: string } {
  const parsed = matter(source);
  const normalized = normalizeFrontmatter(parsed.data);
  const result = ScenarioSpecSchema.safeParse(normalized);
  if (!result.success) {
    const issues = result.error.issues
      .map((i) => `  - ${i.path.join(".") || "<root>"}: ${i.message}`)
      .join("\n");
    throw new Error(`Spec validation failed:\n${issues}`);
  }
  return { spec: result.data, body: parsed.content.trim() };
}

export function outputPathForSpec(spec: ScenarioSpec, scenariosRoot: string): string {
  return `${scenariosRoot}/${spec.track}/${spec.id}.ts`;
}
