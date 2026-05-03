/**
 * Handle pool for Tells training bots.
 *
 * Three families: first-name diminutives, two-word brand-voice compounds,
 * and oblique noun phrases. The mix keeps a leaderboard reading like a
 * cohort of people, not a generated dataset. Skewed female-coded because
 * the audience is 80%+ female; generic-coded handles included so a male
 * member never feels conspicuous.
 *
 * Curation rule: every handle has to fit Kanika's voice register —
 * declarative, slightly ominous, never cute. "marina-k" yes. "happy-girl"
 * no. Test: would this name show up in a Joan Didion essay?
 *
 * Collision-safe: all candidates conform to the handle regex enforced
 * server-side (`^[a-z0-9](?:[a-z0-9-]{1,28}[a-z0-9])?$`). The seeder
 * de-dupes against existing User.handle and the RESERVED list.
 */

const FIRST_NAMES: ReadonlyArray<string> = [
  // Female-coded. Avoid overlap with existing BOT_PERSONAS slugs.
  "marina", "rhea", "cleo", "mira", "nikita", "elin", "wren", "ines",
  "nadia", "juno", "freya", "ada", "sloane", "esme", "lila", "neve",
  "romy", "talia", "vesper", "willa", "zara", "lena", "anya", "isla",
  "ophelia", "vera", "nell", "june", "indigo", "ramona", "fenella",
  "sasha", "imogen", "saskia", "calla", "darya", "leila", "marlowe",
  "nina", "octavia", "petra", "saoirse", "tamsin", "una", "vita", "yara",
  "agnes", "clio", "eira", "freja", "halle", "isadora", "linnea", "mercy",
  "philippa", "rosalind", "stevie", "taryn", "verity",
  // More-neutral / softer-male coded. Keeps the bracket from reading
  // 100% feminine.
  "august", "soren", "ezra", "rune", "kit", "ash", "rowe", "blake",
  "darcy", "emery", "hollis", "lennox", "reese", "sage",
];

/**
 * Two-word compounds. Each word is brand-voice-ish: a tiny ominous beat
 * or an observation that a careful reader would name. Mixed manually
 * with the first-name list so the bracket doesn't telegraph "this is
 * a generated cohort."
 */
const COMPOUNDS: ReadonlyArray<string> = [
  "softvoice", "paperthin", "halfmoon", "feverdream", "small-mercies",
  "blacktea", "dryeyed", "sharptongue", "pearlcap", "slowburn",
  "shorthand", "nightsoft", "oddrhythm", "finework", "longwinter",
  "deepcut", "falsestart", "redhanded", "plainspoken", "secondread",
  "thirdperson", "nearsight", "latefebruary", "coastlight", "nightshift",
  "plainface", "thinair", "lowlight", "northroom", "dimmer-switch",
  "afterhours", "bone-china", "bluehour", "saltline", "quietmonth",
  "ribbon-cut", "flintlock", "matte-finish", "second-hand", "openhouse",
  "smokedglass", "wax-paper", "loose-thread", "grace-note", "hairtrigger",
  "gloved-hand", "pin-drop", "side-eye", "small-talk",
];

/**
 * Suffix shapes for first-name handles. Constrained to the handle regex
 * (lowercase a-z, 0-9, hyphens only — no dots or underscores). Bare
 * names dominate; an initial or two-digit cohort marker breaks ties when
 * the bare name collides with a real user.
 */
type Suffix =
  | { kind: "bare" }
  | { kind: "initial-dash"; letter: string }
  | { kind: "two-digit-dash"; n: number };

/** Lowercase letters minus i/l/o for visual clarity. */
const INITIALS: ReadonlyArray<string> = [
  "a", "b", "c", "d", "e", "f", "g", "h", "j", "k", "m", "n",
  "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z",
];

/**
 * Deterministic-given-seed shuffle. Used so re-running the seeder with
 * the same seed produces the same bot cohort (idempotent re-runs) but a
 * fresh seed produces a fresh cohort.
 */
function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function pick<T>(rng: () => number, arr: ReadonlyArray<T>): T {
  return arr[Math.floor(rng() * arr.length)];
}

function suffixFor(rng: () => number): Suffix {
  // Distribution: 50% bare, 30% initial-dash, 20% two-digit-dash. Bare
  // wins because a leaderboard full of suffixes feels generated.
  const r = rng();
  if (r < 0.5) return { kind: "bare" };
  if (r < 0.8) return { kind: "initial-dash", letter: pick(rng, INITIALS) };
  return { kind: "two-digit-dash", n: 10 + Math.floor(rng() * 88) };
}

function applySuffix(name: string, suffix: Suffix): string {
  switch (suffix.kind) {
    case "bare":
      return name;
    case "initial-dash":
      return `${name}-${suffix.letter}`;
    case "two-digit-dash":
      return `${name}-${suffix.n}`;
  }
}

/**
 * Generate a candidate handle pool. Caller de-dupes against existing
 * User.handle + RESERVED. Pool size is intentionally larger than the
 * desired bot count so the seeder can throw away conflicts without
 * starving on names.
 */
export function generateHandleCandidates(
  count: number,
  seed: number,
): string[] {
  const rng = mulberry32(seed);
  const out = new Set<string>();
  // Cap the loop generously to stop pathological RNG seeds spinning forever.
  const maxAttempts = count * 8;

  for (let i = 0; i < maxAttempts && out.size < count; i++) {
    // 60% first-name + suffix, 40% bare compound. The compound family
    // skews more distinctive, so over-using it makes the cohort feel
    // performative. First-names dominate.
    const useFirst = rng() < 0.6;
    const candidate = useFirst
      ? applySuffix(pick(rng, FIRST_NAMES), suffixFor(rng))
      : pick(rng, COMPOUNDS);

    if (HANDLE_RE.test(candidate) && candidate.length <= 30) {
      out.add(candidate);
    }
  }

  return Array.from(out);
}

/** Same regex used server-side in app/api/instincts/handle/route.ts. */
const HANDLE_RE = /^[a-z0-9](?:[a-z0-9-]{1,28}[a-z0-9])?$/;
