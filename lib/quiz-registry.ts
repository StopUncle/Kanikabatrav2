// Quiz suite registry, single source of truth for the seven quizzes.
//
// Used by the dashboard's QuizSuiteSection (client-side) and by any
// future server surface that needs to enumerate the suite (sitemap
// generation, internal-link audits, the hub page on /quiz). Keep
// this file the canonical list. Adding a new quiz means adding an
// entry here AND adding the route under app/quiz/<slug>/.

export interface QuizRegistryEntry {
  slug: string;
  /** /quiz path. */
  href: string;
  /** Full title shown on cards. */
  title: string;
  /** Short caption under the title (≤ 60 chars renders cleanly). */
  caption: string;
  /** One-line description of what it actually measures. */
  blurb: string;
  /** Underlying instrument label (e.g. "LSRP-26", "NPI-40", "HSNS"). */
  instrument: string;
  /** Approx minutes to complete. */
  minutes: number;
  /** Number of items the take flow shows. */
  itemCount: number;
  /** Badge tone, drives the card accent. */
  tone: "blue" | "amber" | "rose" | "indigo" | "emerald" | "purple" | "gold";
  /** Lucide icon name to render. Resolved at render-site so we don't
   *  pull all icons into every consumer of the registry. */
  iconKey:
    | "snowflake"
    | "crown"
    | "eye-off"
    | "skull"
    | "activity"
    | "heart"
    | "mirror"
    | "family";
}

export const QUIZ_REGISTRY: readonly QuizRegistryEntry[] = [
  {
    slug: "quiz",
    href: "/quiz",
    title: "Dark Mirror Assessment",
    caption: "Six Cluster B types · the wide map",
    blurb:
      "20 scenarios across six personality types. The original suite quiz; most users start here.",
    instrument: "Original (Cluster B framework)",
    minutes: 7,
    itemCount: 20,
    tone: "gold",
    iconKey: "mirror",
  },
  {
    slug: "sociopath",
    href: "/quiz/sociopath",
    title: "The Sociopath Test",
    caption: "Primary + Secondary subscales",
    blurb:
      "26 items, calibrated to published norms. Splits the cold core from the impulsive shell.",
    instrument: "LSRP-26 (Levenson 1995)",
    minutes: 5,
    itemCount: 26,
    tone: "blue",
    iconKey: "snowflake",
  },
  {
    slug: "narcissist",
    href: "/quiz/narcissist",
    title: "The Narcissist Test",
    caption: "Grandiose + Predatory subscales",
    blurb:
      "40 forced-choice items, the field-standard NPI. Seven-factor breakdown plus quadrant interpretation.",
    instrument: "NPI-40 (Raskin & Terry 1988)",
    minutes: 7,
    itemCount: 40,
    tone: "amber",
    iconKey: "crown",
  },
  {
    slug: "covert-narcissist",
    href: "/quiz/covert-narcissist",
    title: "The Covert Narcissist Test",
    caption: "Vulnerable narcissism · the quiet version",
    blurb:
      "10 items measuring vulnerable narcissism, hypersensitivity, shame-based grandiosity. The pattern the NPI underreads.",
    instrument: "HSNS (Hendin & Cheek 1997)",
    minutes: 3,
    itemCount: 10,
    tone: "purple",
    iconKey: "eye-off",
  },
  {
    slug: "dark-triad",
    href: "/quiz/dark-triad",
    title: "The Dark Triad Test",
    caption: "Mach + Narc + Psych, the wide map",
    blurb:
      "27 items across Machiavellianism, Narcissism, and Psychopathy. Configuration archetype interpretation.",
    instrument: "SD3 (Jones & Paulhus 2014)",
    minutes: 5,
    itemCount: 27,
    tone: "indigo",
    iconKey: "skull",
  },
  {
    slug: "bpd",
    href: "/quiz/bpd",
    title: "The BPD Test",
    caption: "DSM-5 criteria · 10 yes/no items",
    blurb:
      "The screen the field actually uses. Established cutoff (≥7) flags a likely BPD pattern.",
    instrument: "MSI-BPD (Zanarini 2003)",
    minutes: 2,
    itemCount: 10,
    tone: "rose",
    iconKey: "activity",
  },
  {
    slug: "dating-sociopath",
    href: "/quiz/dating-sociopath",
    title: "Are You Dating a Sociopath?",
    caption: "Behavioural + Internal red flags",
    blurb:
      "20 partner-detection scenarios. Two axes, what you have seen, what your body has registered.",
    instrument: "From the Sociopathic Dating Bible",
    minutes: 6,
    itemCount: 20,
    tone: "emerald",
    iconKey: "heart",
  },
  {
    slug: "daughter",
    href: "/quiz/daughter",
    title: "The Daughter Pattern Assessment",
    caption: "For daughters of narcissistic mothers",
    blurb:
      "20 scenarios mapping six daughter profiles. Plus a Mother Signal axis reading how strongly her behaviour matches the NPD pattern.",
    instrument: "Original (DSM + family-systems-derived)",
    minutes: 7,
    itemCount: 20,
    tone: "purple",
    iconKey: "family",
  },
] as const;

export const QUIZ_REGISTRY_BY_SLUG: Record<string, QuizRegistryEntry> =
  Object.fromEntries(QUIZ_REGISTRY.map((q) => [q.slug, q]));

/** All quizzes other than the Dark Mirror, used by the dashboard's
 *  Quiz Suite section (Dark Mirror has its own dedicated card). */
export const ADDITIONAL_QUIZZES: readonly QuizRegistryEntry[] =
  QUIZ_REGISTRY.filter((q) => q.slug !== "quiz");
