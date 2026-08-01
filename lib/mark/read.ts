import type { Prisma, PrismaClient } from "@prisma/client";
import {
  OPERATOR_KEYS,
  OPERATOR_LABELS,
  TACTIC_DEFINITION,
  TACTIC_KEYS,
  TACTIC_LABELS,
  asOperator,
  asTactic,
  type Tactic,
} from "./taxonomy";
import {
  crossSentence,
  operatorSentence,
  tacticSentence,
  untestedSentence,
} from "./verdicts";

/**
 * Reading The Mark: turn the encounter ledger into sentences.
 *
 * The honesty rule governs everything below. A cell that has not been
 * tested enough says so and names the number, rather than guessing from
 * one lucky answer. That is not a limitation to work around: a member
 * who catches us inventing a verdict never believes the real ones, and
 * the empty cells are also the content forge's marching orders.
 */

type Db = PrismaClient | Prisma.TransactionClient;

/** Below this a cell stays silent. Two answers is a coin, not a read. */
const MIN_TO_SPEAK = 3;
/** At or above this the read is settled rather than early. */
const MIN_TO_SETTLE = 6;
/** A tactic-by-operator cell is noisier, so it needs more before it talks. */
const MIN_PER_CELL = 5;
/** Only flag a cross-cell when the member is otherwise good at the tactic. */
const CROSS_TACTIC_FLOOR = 0.65;
/** And reliably loses that tactic to this one operator. */
const CROSS_CELL_CEILING = 0.5;
/** A tactic below this is a blind spot worth naming. */
const BLIND_SPOT_CEILING = 0.6;
const MAX_BLIND_SPOTS = 4;
/**
 * Ledger rows read per member. A daily answerer takes a year to reach
 * 400, so this only ever bites on a bot or a bug, and it fails safe:
 * the most recent encounters are the ones that describe them now.
 */
const MAX_ROWS = 4000;

export type CellState = "UNTESTED" | "EARLY" | "SETTLED";

export interface LedgerRow {
  key: string;
  label: string;
  /** Encounters logged. Shown verbatim when the cell is untested. */
  seen: number;
  caught: number;
  /** Null while untested, so no caller can accidentally render a guess. */
  rate: number | null;
  state: CellState;
  /** The verdict in words; the bars carry the numbers. */
  sentence: string;
  /**
   * Percentage-point movement: the last 30 days against the record
   * before them. Null until BOTH windows hold enough answers to compare
   * (the honesty rule again; a two-answer week is not a trend).
   */
  delta: number | null;
}

export interface BlindSpot {
  key: string;
  headline: string;
  line: string;
  /**
   * True when this came from a single sitting rather than a settled
   * pattern. The panel labels these so one bad morning never reads as a
   * verdict about who someone is.
   */
  provisional: boolean;
}

export interface MarkRead {
  totalEncounters: number;
  /**
   * The headline: the Mark score. Catch rate across every graded moment,
   * recency-weighted (45-day half-life) so it reads who the member is
   * NOW rather than averaging this month against last year. Movement is
   * the last 30 days against the record before them. Null until the
   * record can speak at all.
   */
  overall: { seen: number; rate: number | null; delta: number | null };
  /** How broadly the record has actually tested them. */
  coverage: {
    tactics: number;
    tacticsTotal: number;
    operators: number;
    operatorsTotal: number;
  };
  tactics: LedgerRow[];
  operators: LedgerRow[];
  /** The cross-cell lines, the ones worth the whole exercise. */
  insights: string[];
  blindSpots: BlindSpot[];
  /** True when nothing in either ledger has enough data to speak yet. */
  quiet: boolean;
  baseline: {
    takenAt: Date;
    attempts: number;
  } | null;
}

interface Tally {
  seen: number;
  caught: number;
  /** The two comparison windows behind the +/- movement chip. */
  recentSeen: number;
  recentCaught: number;
  priorSeen: number;
  priorCaught: number;
}

/** Minimum answers PER WINDOW before a movement chip renders. */
const MIN_PER_WINDOW = 3;

function bump(
  map: Map<string, Tally>,
  key: string,
  correct: boolean,
  recent: boolean,
): void {
  const t =
    map.get(key) ??
    ({
      seen: 0,
      caught: 0,
      recentSeen: 0,
      recentCaught: 0,
      priorSeen: 0,
      priorCaught: 0,
    } satisfies Tally);
  t.seen += 1;
  if (correct) t.caught += 1;
  if (recent) {
    t.recentSeen += 1;
    if (correct) t.recentCaught += 1;
  } else {
    t.priorSeen += 1;
    if (correct) t.priorCaught += 1;
  }
  map.set(key, t);
}

/** Percentage points of movement, or null when either window is thin. */
function deltaFor(t: Tally | undefined): number | null {
  if (!t) return null;
  if (t.recentSeen < MIN_PER_WINDOW || t.priorSeen < MIN_PER_WINDOW) {
    return null;
  }
  return Math.round(
    (t.recentCaught / t.recentSeen - t.priorCaught / t.priorSeen) * 100,
  );
}

function stateFor(seen: number): CellState {
  if (seen >= MIN_TO_SETTLE) return "SETTLED";
  if (seen >= MIN_TO_SPEAK) return "EARLY";
  return "UNTESTED";
}

function buildRow(
  key: string,
  label: string,
  tally: Tally | undefined,
  sentenceFor: (rate: number) => string,
): LedgerRow {
  const seen = tally?.seen ?? 0;
  const caught = tally?.caught ?? 0;
  const state = stateFor(seen);
  if (state === "UNTESTED") {
    return {
      key,
      label,
      seen,
      caught,
      rate: null,
      state,
      sentence: untestedSentence(seen),
      delta: null,
    };
  }
  const rate = caught / seen;
  return {
    key,
    label,
    seen,
    caught,
    rate,
    state,
    sentence: sentenceFor(rate),
    delta: deltaFor(tally),
  };
}

export async function readMark(db: Db, userId: string): Promise<MarkRead> {
  const [rows, lastBaseline, baselineCount] = await Promise.all([
    db.markEncounter.findMany({
      where: { userId },
      select: {
        tactic: true,
        operatorType: true,
        correct: true,
        createdAt: true,
      },
      orderBy: { createdAt: "desc" },
      take: MAX_ROWS,
    }),
    db.baselineAttempt.findFirst({
      where: { userId },
      orderBy: { takenAt: "desc" },
      select: { takenAt: true, answers: true },
    }),
    db.baselineAttempt.count({ where: { userId } }),
  ]);

  const byTactic = new Map<string, Tally>();
  const byOperator = new Map<string, Tally>();
  const byCell = new Map<string, Tally>();
  const overallTally = new Map<string, Tally>();
  const now = Date.now();
  const windowStart = new Date(now - 30 * 24 * 60 * 60 * 1000);
  // The score's memory. Each graded moment loses half its weight every
  // 45 days, so the headline tracks current form and a member who
  // improves actually watches the number move.
  const HALF_LIFE_DAYS = 45;
  let weightedSeen = 0;
  let weightedCaught = 0;

  for (const row of rows) {
    const recent = row.createdAt >= windowStart;
    const ageDays = (now - row.createdAt.getTime()) / 86_400_000;
    const weight = Math.pow(0.5, ageDays / HALF_LIFE_DAYS);
    weightedSeen += weight;
    if (row.correct) weightedCaught += weight;
    // Rows carrying a label the taxonomy no longer knows are dropped
    // rather than rendered. Silence beats a cell nobody can name. A row
    // feeds only the ledgers it actually carries a label for, so an
    // operator-only item counts once, in the right place.
    const tactic = asTactic(row.tactic);
    const operator = asOperator(row.operatorType);
    if (tactic) bump(byTactic, tactic, row.correct, recent);
    if (operator) bump(byOperator, operator, row.correct, recent);
    if (tactic && operator) {
      bump(byCell, `${tactic}|${operator}`, row.correct, recent);
    }
    // Every graded moment counts once toward the headline, whether it
    // carries one label or two.
    bump(overallTally, "all", row.correct, recent);
  }

  const tactics = TACTIC_KEYS.map((t) =>
    buildRow(t, TACTIC_LABELS[t], byTactic.get(t), (rate) =>
      tacticSentence(t, rate),
    ),
  );
  const operators = OPERATOR_KEYS.map((o) =>
    buildRow(o, OPERATOR_LABELS[o], byOperator.get(o), (rate) =>
      operatorSentence(o, rate),
    ),
  );

  const insights = buildInsights(byTactic, byCell);
  const blindSpots = buildBlindSpots(tactics, lastBaseline?.answers ?? null);

  const all = overallTally.get("all");
  const overall = {
    seen: all?.seen ?? 0,
    rate:
      all && all.seen >= MIN_TO_SPEAK && weightedSeen > 0
        ? weightedCaught / weightedSeen
        : null,
    delta: deltaFor(all),
  };
  const coverage = {
    tactics: tactics.filter((r) => r.state !== "UNTESTED").length,
    tacticsTotal: TACTIC_KEYS.length,
    operators: operators.filter((r) => r.state !== "UNTESTED").length,
    operatorsTotal: OPERATOR_KEYS.length,
  };

  return {
    totalEncounters: rows.length,
    overall,
    coverage,
    tactics,
    operators,
    insights,
    blindSpots,
    quiet: tactics.every((r) => r.state === "UNTESTED"),
    baseline: lastBaseline
      ? { takenAt: lastBaseline.takenAt, attempts: baselineCount }
      : null,
  };
}

/**
 * The crown jewel: a narcissist's gaslighting is not a borderline's
 * gaslighting. Only speaks where the member is genuinely good at the
 * tactic and one operator still runs it on them, because anything less
 * than that contrast is just noise dressed as an insight.
 */
function buildInsights(
  byTactic: Map<string, Tally>,
  byCell: Map<string, Tally>,
): string[] {
  const out: string[] = [];
  for (const [cellKey, cell] of Array.from(byCell.entries())) {
    if (cell.seen < MIN_PER_CELL) continue;
    const [tacticKey, operatorKey] = cellKey.split("|");
    const tactic = asTactic(tacticKey);
    const operator = asOperator(operatorKey);
    if (!tactic || !operator) continue;

    const overall = byTactic.get(tactic);
    if (!overall || overall.seen < MIN_TO_SETTLE) continue;

    const overallRate = overall.caught / overall.seen;
    const cellRate = cell.caught / cell.seen;
    if (overallRate < CROSS_TACTIC_FLOOR) continue;
    if (cellRate > CROSS_CELL_CEILING) continue;

    out.push(crossSentence(tactic, operator));
  }
  return out.slice(0, 3);
}

/**
 * The list that matters: what reliably gets past you, shortest form
 * possible. Falls back to the last Baseline Read when the ledger is
 * still too thin to speak, clearly labelled as one sitting so a member
 * is never handed a verdict built from a single answer.
 */
function buildBlindSpots(
  tactics: LedgerRow[],
  baselineAnswers: unknown,
): BlindSpot[] {
  const settled = tactics
    .filter((r) => r.state !== "UNTESTED" && (r.rate ?? 1) < BLIND_SPOT_CEILING)
    .sort((a, b) => (a.rate ?? 1) - (b.rate ?? 1))
    .slice(0, MAX_BLIND_SPOTS)
    .map<BlindSpot>((r) => ({
      key: r.key,
      headline: r.label,
      line: r.sentence,
      provisional: r.state === "EARLY",
    }));

  if (settled.length > 0) return settled;
  return blindSpotsFromBaseline(baselineAnswers);
}

/** The day-one list, drawn straight from the misses in one sitting. */
function blindSpotsFromBaseline(answers: unknown): BlindSpot[] {
  if (!Array.isArray(answers)) return [];
  const missed: Tactic[] = [];
  for (const entry of answers) {
    if (!entry || typeof entry !== "object") continue;
    const record = entry as { tactic?: unknown; correct?: unknown };
    if (record.correct !== false) continue;
    const tactic = asTactic(
      typeof record.tactic === "string" ? record.tactic : null,
    );
    if (tactic && !missed.includes(tactic)) missed.push(tactic);
  }
  return missed.slice(0, MAX_BLIND_SPOTS).map((t) => ({
    key: t,
    headline: TACTIC_LABELS[t],
    line: TACTIC_DEFINITION[t],
    provisional: true,
  }));
}
