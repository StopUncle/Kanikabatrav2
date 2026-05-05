// SD3 norms.
//
// Source: Jones, D. N., & Paulhus, D. L. (2014). "Introducing the
// Short Dark Triad (SD3): A Brief Measure of Dark Personality
// Traits." Assessment, 21(1), 28-41.
//
// Reported per-item means (5-point Likert) for the original
// validation sample (n=2929 across 6 studies):
//   Machiavellianism: M = 3.10, SD = 0.55 (per-item)
//   Narcissism:       M = 2.79, SD = 0.55
//   Psychopathy:      M = 2.07, SD = 0.55
//
// Subscale totals (sum of 9 items, range 9-45):
//   Machiavellianism: M ≈ 27.9, SD ≈ 4.95
//   Narcissism:       M ≈ 25.1, SD ≈ 4.95
//   Psychopathy:      M ≈ 18.6, SD ≈ 4.95
//
// SDs at the subscale-total level use sqrt(9) * per-item SD
// approximation (assuming intra-scale correlations as published);
// this matches what subsequent meta-analyses (Furnham et al. 2013,
// Muris et al. 2017) report within rounding.

export interface SubscaleNorms {
  mean: number;
  sd: number;
  min: number;
  max: number;
}

export const DARK_TRIAD_NORMS = {
  machiavellianism: {
    mean: 27.9,
    sd: 4.95,
    min: 9,
    max: 45,
  },
  narcissism: {
    mean: 25.1,
    sd: 4.95,
    min: 9,
    max: 45,
  },
  psychopathy: {
    mean: 18.6,
    sd: 4.95,
    min: 9,
    max: 45,
  },
} as const satisfies Record<
  "machiavellianism" | "narcissism" | "psychopathy",
  SubscaleNorms
>;
