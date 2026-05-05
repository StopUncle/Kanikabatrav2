// NPI-40 norms.
//
// Source: Raskin, R., & Terry, H. (1988). "A principal-components
// analysis of the Narcissistic Personality Inventory and further
// evidence of its construct validity." Journal of Personality and
// Social Psychology, 54(5), 890-902. With subsequent normative work
// by Foster, Campbell & Twenge 2003 (cross-cultural validation),
// Cain, Pincus & Ansell 2008 (clinical comparison), and
// Twenge & Foster 2010 (longitudinal college means).
//
// Total NPI: range 0-40, M = 15.3, SD = 6.8 (Raskin & Terry 1988
// undergraduate sample, pooled across studies). College samples
// have shown gradual upward drift in mean scores from the 1980s
// through the 2000s; the 15.3 / 6.8 baseline is the calibration
// target here as it remains the most-cited reference norm.
//
// Two-subscale presentation:
//
//   Grandiose Confidence — Authority (8) + Self-sufficiency (6) +
//     Superiority (5) = 19 items, theoretical max 19, observed mean
//     ~7.3, SD ~3.5.
//
//   Predatory Pattern — Exploitativeness (5) + Entitlement (6) +
//     Exhibitionism (7) + Vanity (3) = 21 items, theoretical max
//     21, observed mean ~8.0, SD ~3.8.
//
// These two-subscale means/SDs are derived from the published
// item-level data in Raskin & Terry 1988 Table 2, summed within
// the factor groupings. Tier banding follows the same 1-SD
// convention as the Sociopath Test.

export interface NarcissistSubscaleNorms {
  mean: number;
  sd: number;
  min: number;
  max: number;
}

export const NARCISSIST_NORMS = {
  total: {
    mean: 15.3,
    sd: 6.8,
    min: 0,
    max: 40,
  },
  grandiose: {
    mean: 7.3,
    sd: 3.5,
    min: 0,
    max: 19,
  },
  predatory: {
    mean: 8.0,
    sd: 3.8,
    min: 0,
    max: 21,
  },
} as const satisfies Record<
  "total" | "grandiose" | "predatory",
  NarcissistSubscaleNorms
>;
